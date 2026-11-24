"""
SPY VWAP Reversion Scalper — pure rule logic (no broker, no network).

This mirrors spy_vwap_scalper.pine rule-for-rule. Each check carries the same
RULE tag as the Pine file so the two can be audited side by side:

  L1..L6  long entry          S1..S6  short entry (toggle, default OFF)
  X1..X4  exits / breaker     P1..P2  position sizing

Everything here is deterministic and unit-tested (test_strategy_core.py).
"""
from __future__ import annotations

import math
from dataclasses import dataclass, field
from datetime import date, datetime, time, timedelta
from typing import Dict, List, Optional
from zoneinfo import ZoneInfo

NY = ZoneInfo("America/New_York")


@dataclass(frozen=True)
class Bar:
    start: datetime  # bar OPEN time, timezone-aware (America/New_York)
    open: float
    high: float
    low: float
    close: float
    volume: float

    @property
    def hlc3(self) -> float:
        return (self.high + self.low + self.close) / 3.0


@dataclass(frozen=True)
class Params:
    stop_distance: float = 0.20        # $ per share
    rr_ratio: float = 1.5
    risk_per_trade: float = 5.0        # $
    daily_loss_limit: float = 10.0     # $
    session_start: time = time(9, 45)  # New York
    session_end: time = time(11, 30)   # New York
    enable_shorts: bool = False
    volume_multiplier: float = 1.2
    ema_length: int = 20
    volume_avg_length: int = 20
    bar_minutes: int = 5


# ---------------------------------------------------------------------------
# Indicators
# ---------------------------------------------------------------------------
def ema_series(values: List[float], length: int) -> List[Optional[float]]:
    """TradingView ta.ema: SMA seed for the first `length` values, then alpha=2/(n+1)."""
    out: List[Optional[float]] = [None] * len(values)
    if len(values) < length:
        return out
    alpha = 2.0 / (length + 1)
    prev = sum(values[:length]) / length
    out[length - 1] = prev
    for i in range(length, len(values)):
        prev = alpha * values[i] + (1 - alpha) * prev
        out[i] = prev
    return out


def session_vwap(bars_today: List[Bar]) -> List[float]:
    """Session-anchored VWAP on hlc3, reset at the first regular-hours bar of the day
    (same as ta.vwap(hlc3) on a TradingView chart with extended hours OFF)."""
    out, pv, vol = [], 0.0, 0.0
    for b in bars_today:
        pv += b.hlc3 * b.volume
        vol += b.volume
        out.append(pv / vol if vol > 0 else b.hlc3)
    return out


# ---------------------------------------------------------------------------
# Session helpers (all in America/New_York)
# ---------------------------------------------------------------------------
def in_window(bar_start: datetime, p: Params) -> bool:
    """Same semantics as Pine time(..., "0945-1130"): the bar's OPEN time is in [start, end)."""
    t = bar_start.astimezone(NY).time()
    return p.session_start <= t < p.session_end


def bar_end(bar_start: datetime, p: Params) -> datetime:
    return bar_start + timedelta(minutes=p.bar_minutes)


def is_last_window_bar(bar_start: datetime, p: Params) -> bool:
    """True for the bar that closes at/after session end (11:25 bar on 5m -> closes 11:30)."""
    if not in_window(bar_start, p):
        return False
    s = bar_start.astimezone(NY)
    end_dt = datetime.combine(s.date(), p.session_end, tzinfo=NY)
    return bar_end(s, p) >= end_dt


def session_end_dt(d: date, p: Params) -> datetime:
    return datetime.combine(d, p.session_end, tzinfo=NY)


# ---------------------------------------------------------------------------
# Sizing
# ---------------------------------------------------------------------------
def position_size(p: Params, buying_power: float, price: float,
                  slippage_per_share: float = 0.01, commission_per_share: float = 0.0) -> int:
    # RULE: P1 — shares = floor(risk_per_trade / stop_distance)
    risk_shares = math.floor(p.risk_per_trade / p.stop_distance + 1e-9)
    # Feasibility guard: you cannot buy shares you cannot pay for (cash, no leverage)
    est = price + slippage_per_share + commission_per_share
    affordable = math.floor(buying_power / est) if est > 0 else 0
    # RULE: P2 — caller must skip the trade if this is < 1
    return max(0, min(risk_shares, affordable))


def bracket_prices(side: str, entry: float, p: Params) -> Dict[str, float]:
    # RULE: X1 — stop = entry ∓ stop_distance ; RULE: X2 — target = entry ± stop × rr
    if side == "long":
        return {"stop": round(entry - p.stop_distance, 2),
                "target": round(entry + p.stop_distance * p.rr_ratio, 2)}
    return {"stop": round(entry + p.stop_distance, 2),
            "target": round(entry - p.stop_distance * p.rr_ratio, 2)}


def breaker_tripped(day_realized_pnl: float, p: Params) -> bool:
    # RULE: X4 — no new entries once realized day P&L <= -daily_loss_limit
    return day_realized_pnl <= -p.daily_loss_limit


# ---------------------------------------------------------------------------
# Signal evaluation on the most recent CLOSED bar
# ---------------------------------------------------------------------------
@dataclass
class Evaluation:
    bar: Optional[Bar]
    long_signal: bool = False
    short_signal: bool = False
    rules: Dict[str, bool] = field(default_factory=dict)
    vwap: Optional[float] = None
    ema: Optional[float] = None
    avg_volume: Optional[float] = None
    note: str = ""


def evaluate(bars: List[Bar], p: Params, flat: bool, breaker: bool) -> Evaluation:
    """`bars` = closed regular-hours bars, oldest first, including prior days (for EMA/volume warm-up)."""
    need = max(p.ema_length, p.volume_avg_length + 1, 2)
    if len(bars) < need:
        return Evaluation(bar=bars[-1] if bars else None, note=f"warm-up: {len(bars)}/{need} bars")

    last, prev = bars[-1], bars[-2]
    today = last.start.astimezone(NY).date()
    bars_today = [b for b in bars if b.start.astimezone(NY).date() == today]
    vw = session_vwap(bars_today)
    vwap_now = vw[-1]
    vwap_prev = vw[-2] if len(vw) >= 2 else None   # prev bar is same day inside the 9:45+ window

    ema_now = ema_series([b.close for b in bars], p.ema_length)[-1]
    # Average of the PRIOR N bars (current bar excluded), like ta.sma(volume, N)[1]
    vols = [b.volume for b in bars[-(p.volume_avg_length + 1):-1]]
    avg_vol = sum(vols) / len(vols)

    r: Dict[str, bool] = {}
    # RULE: L5 / S5 — in 9:45–11:30 NY; last bar excluded (time-stop closes at its close)
    r["L5_S5_time_ok"] = in_window(last.start, p) and not is_last_window_bar(last.start, p)
    # RULE: L6 / S6 — no open position
    r["L6_S6_flat"] = flat
    # RULE: L4 / S4 — volume >= multiplier × prior-N average
    r["L4_S4_volume"] = last.volume >= p.volume_multiplier * avg_vol
    # RULE: X4 — circuit breaker not tripped
    r["X4_breaker_clear"] = not breaker

    # RULE: L1 — close above EMA
    r["L1_above_ema"] = last.close > ema_now
    # RULE: L2a — this bar touched VWAP, or prior bar closed at/below it
    r["L2a_pullback"] = last.low <= vwap_now or (vwap_prev is not None and prev.close <= vwap_prev)
    # RULE: L2b — closes back above VWAP
    r["L2b_reclaim"] = last.close > vwap_now
    # RULE: L3 — bullish bar
    r["L3_bullish"] = last.close > last.open

    # RULE: S1 — close below EMA
    r["S1_below_ema"] = last.close < ema_now
    # RULE: S2a — this bar touched VWAP from below, or prior bar closed at/above it
    r["S2a_pullback"] = last.high >= vwap_now or (vwap_prev is not None and prev.close >= vwap_prev)
    # RULE: S2b — closes back below VWAP
    r["S2b_reject"] = last.close < vwap_now
    # RULE: S3 — bearish bar
    r["S3_bearish"] = last.close < last.open

    common = r["L5_S5_time_ok"] and r["L6_S6_flat"] and r["L4_S4_volume"] and r["X4_breaker_clear"]
    long_sig = common and r["L1_above_ema"] and r["L2a_pullback"] and r["L2b_reclaim"] and r["L3_bullish"]
    short_sig = (p.enable_shorts and common and r["S1_below_ema"] and r["S2a_pullback"]
                 and r["S2b_reject"] and r["S3_bearish"])

    return Evaluation(bar=last, long_signal=long_sig, short_signal=short_sig, rules=r,
                      vwap=vwap_now, ema=ema_now, avg_volume=avg_vol)


# ---------------------------------------------------------------------------
# Bar-replay exit check (used by dry-run simulation)
# ---------------------------------------------------------------------------
def simulated_exit(side: str, stop: float, target: float, bar: Bar) -> Optional[tuple]:
    """Return (reason, price) if this bar hits the bracket. If both levels are hit in one
    bar, assume the STOP filled first (pessimistic)."""
    if side == "long":
        if bar.low <= stop:
            return ("stop", min(stop, bar.open))   # gap-through fills at the open
        if bar.high >= target:
            return ("target", target)
    else:
        if bar.high >= stop:
            return ("stop", max(stop, bar.open))
        if bar.low <= target:
            return ("target", target)
    return None
