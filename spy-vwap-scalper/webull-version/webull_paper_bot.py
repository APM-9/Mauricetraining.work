#!/usr/bin/env python3
"""
SPY VWAP Reversion Scalper — Webull PAPER-TRADING bot.

  ███  NOT FOR REAL MONEY.  ███
  Your handoff rules: no automation with real money until the TradingView backtest
  passes every check AND at least 2 weeks of paper trading match it. This script
  enforces that by refusing to send orders anywhere except a sandbox endpoint
  you set yourself.

Modes
  probe    Print the raw API responses (accounts, balance, positions, last bars).
           Run this FIRST: the field names Webull returns are not all documented in
           the SDK, and this is how you confirm them. Places no orders.
  dry-run  (default) Live data, rules evaluated on every closed 5-min bar, trades
           SIMULATED locally from the bars. Places no orders. Needs only market data.
  paper    Same rules, but sends real orders to the Webull SANDBOX trade endpoint
           (WEBULL_TRADE_ENDPOINT). Refuses to start if that endpoint is unset or
           is the production host.

Rule logic lives in strategy_core.py (same RULE tags as spy_vwap_scalper.pine).
Configuration is via environment variables (see README_WEBULL.md); secrets are never
hard-coded and never logged.
"""
from __future__ import annotations

import argparse
import csv
import json
import logging
import os
import sys
import time as _time
import uuid
from dataclasses import dataclass
from datetime import date, datetime, time, timedelta
from pathlib import Path
from typing import Any, Iterable, List, Optional

from strategy_core import (NY, Bar, Params, bar_end, bracket_prices, breaker_tripped,
                           evaluate, in_window, position_size, session_end_dt,
                           simulated_exit)

PRODUCTION_TRADE_HOSTS = {"api.webull.com"}   # from the SDK's endpoints.json (US)
REGION = "us"

log = logging.getLogger("vwap-bot")


# ---------------------------------------------------------------------------
# Response parsing — defensive, because the SDK does not pin response shapes.
# Every parser returns None when it cannot find what it needs; callers then HALT
# trading rather than guess.
# ---------------------------------------------------------------------------
def _walk(obj: Any) -> Iterable[Any]:
    yield obj
    if isinstance(obj, dict):
        for v in obj.values():
            yield from _walk(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from _walk(v)


def find_number(obj: Any, keys: List[str]) -> Optional[float]:
    for k in keys:                       # key priority order first
        for node in _walk(obj):
            if isinstance(node, dict) and k in node:
                try:
                    return float(node[k])
                except (TypeError, ValueError):
                    continue
    return None


def parse_time(v: Any) -> Optional[datetime]:
    try:
        if isinstance(v, (int, float)) or (isinstance(v, str) and v.strip().lstrip("-").isdigit()):
            x = float(v)
            if x > 1e11:                 # milliseconds
                x /= 1000.0
            return datetime.fromtimestamp(x, tz=NY)
        if isinstance(v, str):
            dt = datetime.fromisoformat(v.replace("Z", "+00:00"))
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=NY)   # ASSUMPTION: naive strings are New York time
            return dt.astimezone(NY)
    except (ValueError, OSError, OverflowError):
        return None
    return None


TIME_KEYS = ["time", "timestamp", "start_time", "begin_time", "t", "date"]
VOL_KEYS = ["volume", "vol", "v"]


def parse_bars(payload: Any, symbol: str, time_is_end: bool, bar_minutes: int) -> Optional[List[Bar]]:
    # Prefer the block that belongs to our symbol if the response is per-symbol.
    scope = payload
    for node in _walk(payload):
        if isinstance(node, dict) and str(node.get("symbol", "")).upper() == symbol.upper():
            scope = node
            break
    raw = [n for n in _walk(scope) if isinstance(n, dict) and "close" in n and "open" in n]
    if not raw:
        return None
    bars: List[Bar] = []
    for n in raw:
        t = next((parse_time(n[k]) for k in TIME_KEYS if k in n), None)
        vol = next((n[k] for k in VOL_KEYS if k in n), None)
        if t is None or vol is None:
            return None
        if time_is_end:
            t = t - timedelta(minutes=bar_minutes)
        try:
            bars.append(Bar(t, float(n["open"]), float(n["high"]), float(n["low"]),
                            float(n["close"]), float(vol)))
        except (KeyError, TypeError, ValueError):
            return None
    bars.sort(key=lambda b: b.start)
    dedup = {b.start: b for b in bars}               # keep last copy of any duplicate stamp
    return [dedup[k] for k in sorted(dedup)]


def parse_position_qty(payload: Any, symbol: str) -> Optional[float]:
    """Signed share quantity of `symbol` (0 if no position row). None if unparseable."""
    if payload is None:
        return None
    for node in _walk(payload):
        if isinstance(node, dict):
            sym = str(node.get("symbol") or node.get("ticker") or "").upper()
            if sym == symbol.upper():
                q = find_number(node, ["quantity", "qty", "position", "holding_quantity", "total_quantity"])
                if q is None:
                    return None
                side = str(node.get("side") or node.get("position_side") or "").upper()
                return -abs(q) if side.startswith("SHORT") else q
    return 0.0


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
@dataclass
class Config:
    mode: str
    symbol: str
    category: str
    params: Params
    slippage_per_share: float
    commission_per_share: float
    entry_limit_offset: float
    bar_time_is_end: bool
    pdt_limit: int
    dry_run_cash: float
    log_dir: Path
    equity_keys: List[str]
    cash_keys: List[str]


def build_config() -> Config:
    a = argparse.ArgumentParser(description="SPY VWAP scalper — Webull paper bot")
    a.add_argument("mode", nargs="?", default="dry-run", choices=["probe", "dry-run", "paper"])
    a.add_argument("--symbol", default="SPY")
    a.add_argument("--category", default="US_STOCK", help="SDK Category for market data (US_STOCK or US_ETF)")
    a.add_argument("--stop-distance", type=float, default=0.20)
    a.add_argument("--rr-ratio", type=float, default=1.5)
    a.add_argument("--risk-per-trade", type=float, default=5.0)
    a.add_argument("--daily-loss-limit", type=float, default=10.0)
    a.add_argument("--session-start", default="09:45", help="HH:MM New York")
    a.add_argument("--session-end", default="11:30", help="HH:MM New York")
    a.add_argument("--enable-shorts", action="store_true")
    a.add_argument("--volume-multiplier", type=float, default=1.2)
    a.add_argument("--ema-length", type=int, default=20)
    a.add_argument("--volume-avg-length", type=int, default=20)
    a.add_argument("--slippage", type=float, default=0.01, help="$/share assumed per fill (1 tick)")
    a.add_argument("--commission", type=float, default=0.0, help="$/share (Webull stocks = 0)")
    a.add_argument("--entry-limit-offset", type=float, default=0.02,
                   help="paper: entry is a LIMIT this many $ through the signal close (caps slippage)")
    a.add_argument("--bar-time-is-end", action="store_true",
                   help="set if probe shows Webull stamps bars with their CLOSE time")
    a.add_argument("--pdt-limit", type=int, default=3,
                   help="max day trades per 5 business days (margin acct < $25k). 0 = off")
    a.add_argument("--dry-run-cash", type=float, default=200.0,
                   help="dry-run buying power. $200 cannot buy SPY; raise it to study signals")
    a.add_argument("--log-dir", default="logs")
    a.add_argument("--equity-key", action="append", default=None,
                   help="balance field for total equity (repeatable, priority order)")
    a.add_argument("--cash-key", action="append", default=None,
                   help="balance field for buying power (repeatable, priority order)")
    ns = a.parse_args()

    def hm(s: str) -> time:
        h, m = s.split(":")
        return time(int(h), int(m))

    p = Params(stop_distance=ns.stop_distance, rr_ratio=ns.rr_ratio, risk_per_trade=ns.risk_per_trade,
               daily_loss_limit=ns.daily_loss_limit, session_start=hm(ns.session_start),
               session_end=hm(ns.session_end), enable_shorts=ns.enable_shorts,
               volume_multiplier=ns.volume_multiplier, ema_length=ns.ema_length,
               volume_avg_length=ns.volume_avg_length)
    return Config(
        mode=ns.mode, symbol=ns.symbol.upper(), category=ns.category, params=p,
        slippage_per_share=ns.slippage, commission_per_share=ns.commission,
        entry_limit_offset=ns.entry_limit_offset, bar_time_is_end=ns.bar_time_is_end,
        pdt_limit=ns.pdt_limit, dry_run_cash=ns.dry_run_cash, log_dir=Path(ns.log_dir),
        equity_keys=ns.equity_key or ["net_liquidation_value", "net_liquidation", "total_net_liquidation_value",
                                      "total_asset", "total_assets", "total_market_value_and_cash"],
        cash_keys=ns.cash_key or ["day_buying_power", "buying_power", "cash_buying_power",
                                  "settled_cash", "total_cash", "cash_balance", "total_cash_balance"],
    )


def env(name: str, required: bool = True) -> Optional[str]:
    v = os.environ.get(name, "").strip()
    if required and not v:
        sys.exit(f"Missing environment variable {name}. See README_WEBULL.md.")
    return v or None


# ---------------------------------------------------------------------------
# Webull clients (official SDK: pip install webull-openapi-python-sdk)
# ---------------------------------------------------------------------------
class Webull:
    def __init__(self, cfg: Config):
        try:
            from webull.core.client import ApiClient
            from webull.data.data_client import DataClient
            from webull.trade.trade_client import TradeClient
        except ImportError:
            sys.exit("Install the official SDK first:  pip install webull-openapi-python-sdk")

        self.cfg = cfg
        # Market data client. Uses WEBULL_DATA_* keys if given, else the main keys.
        dk = env("WEBULL_DATA_APP_KEY", False) or env("WEBULL_APP_KEY")
        ds = env("WEBULL_DATA_APP_SECRET", False) or env("WEBULL_APP_SECRET")
        self.data_api = ApiClient(dk, ds, REGION)
        data_ep = env("WEBULL_DATA_ENDPOINT", False)
        if data_ep:
            self.data_api.add_endpoint(REGION, data_ep)
        # NOTE: creating SDK clients contacts Webull right away (config + 2FA token step;
        # on first run, approve the prompt in the Webull app — the SDK waits up to ~5 min).
        try:
            self.data = DataClient(self.data_api)
        except Exception as e:
            sys.exit(f"Could not start the Webull data client (keys, network or 2FA?): {e}")

        self.trade = None
        self.account_id = None
        if cfg.mode in ("paper", "probe"):
            trade_ep = env("WEBULL_TRADE_ENDPOINT", cfg.mode == "paper")
            if cfg.mode == "paper":
                # ███ Real-money guard ███
                if trade_ep.lower() in PRODUCTION_TRADE_HOSTS:
                    sys.exit("WEBULL_TRADE_ENDPOINT is the PRODUCTION host. This bot only trades the sandbox.")
                if env("WEBULL_I_CONFIRM_SANDBOX_KEYS", False) != "yes":
                    sys.exit("Set WEBULL_I_CONFIRM_SANDBOX_KEYS=yes to confirm WEBULL_APP_KEY/SECRET are "
                             "SANDBOX (paper) keys, not your live-account keys.")
            if trade_ep:
                self.trade_api = ApiClient(env("WEBULL_APP_KEY"), env("WEBULL_APP_SECRET"), REGION)
                self.trade_api.add_endpoint(REGION, trade_ep)
                try:
                    self.trade = TradeClient(self.trade_api)
                except Exception as e:
                    sys.exit(f"Could not start the Webull trade client (sandbox keys/endpoint, 2FA?): {e}")
                self.account_id = env("WEBULL_ACCOUNT_ID", cfg.mode == "paper")

    @staticmethod
    def _json(res) -> Any:
        if res is None:
            return None
        if getattr(res, "status_code", None) != 200:
            body = getattr(res, "text", "")
            log.error("API error %s: %s", getattr(res, "status_code", "?"), str(body)[:500])
            return None
        try:
            return res.json()
        except ValueError:
            return None

    def _call(self, fn, *args, **kw):
        try:
            return self._json(fn(*args, **kw))
        except Exception as e:  # SDK raises its own exception types
            log.error("API call %s failed: %s", getattr(fn, "__name__", fn), e)
            return None

    # --- market data ---
    def bars_raw(self, count: int = 200):
        from webull.data.common.category import Category
        from webull.data.common.timespan import Timespan
        return self._call(self.data.market_data.get_batch_history_bar, [self.cfg.symbol],
                          getattr(Category, self.cfg.category).name, Timespan.M5.name, str(count))

    def bars(self) -> Optional[List[Bar]]:
        raw = self.bars_raw()
        return None if raw is None else parse_bars(raw, self.cfg.symbol, self.cfg.bar_time_is_end,
                                                   self.cfg.params.bar_minutes)

    # --- account ---
    def balance_raw(self):
        return self._call(self.trade.account_v2.get_account_balance, self.account_id)

    def positions_raw(self):
        return self._call(self.trade.account_v2.get_account_position, self.account_id)

    def open_orders_raw(self):
        return self._call(self.trade.order_v3.get_order_open, account_id=self.account_id)

    # --- orders ---
    def _leg(self, coid, combo, side, otype, qty, **px):
        leg = {"client_order_id": coid, "combo_type": combo, "symbol": self.cfg.symbol,
               "instrument_type": "EQUITY", "market": "US", "order_type": otype,
               "quantity": str(int(qty)), "support_trading_session": "N" if combo != "NORMAL" else "CORE",
               "side": side, "entrust_type": "QTY", "time_in_force": "DAY"}
        leg.update({k: f"{v:.2f}" for k, v in px.items()})
        return leg

    def place_bracket(self, side: str, qty: int, entry_limit: float, stop: float, target: float):
        """MASTER (limit entry) + STOP_PROFIT (limit) + STOP_LOSS (stop) — as in the SDK sample."""
        ids = {k: uuid.uuid4().hex for k in ("master", "profit", "loss")}
        open_side, close_side = ("BUY", "SELL") if side == "long" else ("SELL", "BUY")
        legs = [
            self._leg(ids["master"], "MASTER", open_side, "LIMIT", qty, limit_price=entry_limit),
            self._leg(ids["profit"], "STOP_PROFIT", close_side, "LIMIT", qty, limit_price=target),
            self._leg(ids["loss"], "STOP_LOSS", close_side, "STOP_LOSS", qty, stop_price=stop),
        ]
        prev = self._call(self.trade.order_v3.preview_order, self.account_id, legs)
        if prev is None:
            log.error("Bracket preview rejected; not placing.")
            return None
        res = self._call(self.trade.order_v3.place_order, self.account_id, legs)
        return ids if res is not None else None

    def cancel(self, client_order_id: str):
        return self._call(self.trade.order_v3.cancel_order, self.account_id, client_order_id)

    def market_close(self, qty: float):
        side = "SELL" if qty > 0 else "BUY"
        leg = self._leg(uuid.uuid4().hex, "NORMAL", side, "MARKET", abs(qty))
        return self._call(self.trade.order_v3.place_order, self.account_id, [leg])


# ---------------------------------------------------------------------------
# Trade log (handoff step 6: log every trade) + PDT counter
# ---------------------------------------------------------------------------
TRADE_FIELDS = ["date", "mode", "side", "entry_time", "entry_ref_price", "qty", "stop", "target",
                "exit_time", "exit_reason", "exit_price_est", "realized_pnl", "rules"]


class Journal:
    def __init__(self, cfg: Config):
        cfg.log_dir.mkdir(parents=True, exist_ok=True)
        self.trades = cfg.log_dir / f"trades_{cfg.mode}.csv"
        self.bars = cfg.log_dir / f"decisions_{cfg.mode}.csv"
        if not self.trades.exists():
            with self.trades.open("w", newline="") as f:
                csv.writer(f).writerow(TRADE_FIELDS)

    def trade(self, row: dict):
        with self.trades.open("a", newline="") as f:
            csv.DictWriter(f, TRADE_FIELDS).writerow(row)

    def decision(self, ev, extra: str = ""):
        new = not self.bars.exists()
        with self.bars.open("a", newline="") as f:
            w = csv.writer(f)
            if new:
                w.writerow(["bar_start", "close", "vwap", "ema", "avg_vol", "volume",
                            "long_signal", "short_signal", "rules", "note"])
            b = ev.bar
            w.writerow([b.start.isoformat() if b else "", b.close if b else "",
                        _r(ev.vwap), _r(ev.ema), _r(ev.avg_volume), b.volume if b else "",
                        ev.long_signal, ev.short_signal, json.dumps(ev.rules), (ev.note + " " + extra).strip()])

    def day_trades_last_5_business_days(self, today: date) -> int:
        days, d = set(), today
        while len(days) < 5:
            if d.weekday() < 5:
                days.add(d.isoformat())
            d -= timedelta(days=1)
        with self.trades.open() as f:
            return sum(1 for r in csv.DictReader(f) if r["date"] in days)


def _r(x):
    return "" if x is None else round(x, 4)


# ---------------------------------------------------------------------------
# The bot
# ---------------------------------------------------------------------------
@dataclass
class Position:
    side: str
    qty: int
    entry_ref: float
    stop: float
    target: float
    entry_time: datetime
    rules: dict
    order_ids: Optional[dict] = None
    confirmed: bool = False                  # paper: broker shows the shares
    exit_reason: Optional[str] = None        # set once a time-stop close has been sent
    exit_sent_at: Optional[datetime] = None


class Bot:
    def __init__(self, cfg: Config):
        self.cfg, self.p = cfg, cfg.params
        self.wb = Webull(cfg)
        self.j = Journal(cfg)
        self.pos: Optional[Position] = None
        self.day: Optional[date] = None
        self.day_start_equity: Optional[float] = None
        self.pnl_before_trade = 0.0          # paper: day P&L before the open trade
        self.sim_realized = 0.0              # dry-run: realized P&L today
        self.sim_cash = cfg.dry_run_cash
        self.breaker = False
        self.last_bar_start: Optional[datetime] = None
        self.last_closed: List[Bar] = []
        self.halted_reason: Optional[str] = None

    # ---- account helpers ----
    def equity(self) -> Optional[float]:
        if self.cfg.mode == "dry-run":
            return self.cfg.dry_run_cash + self.sim_realized
        return find_number(self.wb.balance_raw(), self.cfg.equity_keys)

    def buying_power(self) -> Optional[float]:
        if self.cfg.mode == "dry-run":
            return self.sim_cash
        return find_number(self.wb.balance_raw(), self.cfg.cash_keys)

    def broker_qty(self) -> Optional[float]:
        return parse_position_qty(self.wb.positions_raw(), self.cfg.symbol)

    def halt(self, why: str):
        if self.halted_reason != why:
            log.error("HALT (no new entries): %s", why)
        self.halted_reason = why

    def day_pnl(self) -> Optional[float]:
        # RULE: X4 — realized day P&L. Only read while FLAT, so equity change == realized P&L.
        if self.cfg.mode == "dry-run":
            return self.sim_realized
        eq = self.equity()
        if eq is None or self.day_start_equity is None:
            return None
        return eq - self.day_start_equity

    # ---- RULE: X4 — reset the day's counter before each session ----
    def roll_day(self, now: datetime):
        if self.day == now.date():
            return
        self.day = now.date()
        self.sim_realized, self.pnl_before_trade = 0.0, 0.0
        self.breaker, self.halted_reason = False, None
        self.day_start_equity = self.equity()
        if self.cfg.mode == "paper" and self.day_start_equity is None:
            self.halt("cannot read account equity — run `probe` and pass --equity-key")
        log.info("New day %s. Start equity: %s", self.day, self.day_start_equity)

    # ---- main loop ----
    def run(self):
        log.info("Mode=%s symbol=%s params=%s", self.cfg.mode, self.cfg.symbol, self.p)
        while True:
            now = datetime.now(NY)
            try:
                self.tick(now)
            except Exception:
                log.exception("Unexpected error in tick; continuing")
            _time.sleep(10)

    def tick(self, now: datetime):
        if now.weekday() >= 5:
            return
        self.roll_day(now)
        if self.cfg.mode == "paper":
            self.reconcile_paper(now)
        window_close = session_end_dt(now.date(), self.p)
        if time(9, 30) <= now.time() and now <= window_close + timedelta(minutes=10):
            self.process_new_bar(now)
        # RULE: X3 — time-stop: flatten at session end. Waits ~10s past 11:30 so the final bar
        # (11:25-11:30) has arrived and been bracket-checked first. No exceptions.
        if self.pos and now >= window_close + timedelta(seconds=10):
            self.flatten(now, "time_stop")

    def process_new_bar(self, now: datetime):
        step = timedelta(minutes=self.p.bar_minutes)
        lag = now - timedelta(seconds=8)                       # give the feed ~8s after each bar close
        current_start = lag.replace(second=0, microsecond=0) - timedelta(minutes=lag.minute % self.p.bar_minutes)
        expected = current_start - step                        # newest bar that should be closed by now
        if self.last_bar_start is not None and self.last_bar_start >= expected:
            return                                             # already handled -> no API call
        bars = self.wb.bars()
        if not bars:
            self.halt("no bars parsed — run `probe` and check the bar format")
            return
        closed = [b for b in bars if bar_end(b.start, self.p) <= now]
        if not closed:
            return
        last = closed[-1]
        if last.start < expected:
            # Feed has not delivered the bar yet. Past 90s late -> treat as stale (delayed quotes?)
            if now - (expected + step) > timedelta(seconds=90) and in_window(expected, self.p):
                self.halt(f"stale data: newest closed bar {last.start:%H:%M}, expected {expected:%H:%M}. "
                          "A real-time US quotes permission is needed.")
            return
        if self.halted_reason and self.halted_reason.startswith("stale data"):
            self.halted_reason = None
        self.last_bar_start = last.start
        self.last_closed = closed
        if self.cfg.mode == "dry-run" and self.pos:
            self.sim_manage(last)
        self.on_bar(closed, now)

    def on_bar(self, closed: List[Bar], now: datetime):
        if self.pos is None and not self.breaker:
            pnl = self.day_pnl()
            if pnl is not None and breaker_tripped(pnl, self.p):
                self.breaker = True
                log.warning("CIRCUIT BREAKER: day P&L %.2f <= -%.2f. No new entries today.",
                            pnl, self.p.daily_loss_limit)

        flat = self.pos is None
        if flat and self.cfg.mode == "paper":
            q = self.broker_qty()
            if q is None or q != 0:
                flat = False
                if q:
                    self.halt(f"broker shows {q} {self.cfg.symbol} shares the bot did not open — "
                              "close them manually")

        ev = evaluate(closed, self.p, flat=flat, breaker=self.breaker)
        side = "long" if ev.long_signal else "short" if ev.short_signal else None
        note = ""
        if side and self.halted_reason:
            note, side = f"skipped: halted ({self.halted_reason})", None
        if side and self.cfg.pdt_limit > 0:
            n = self.j.day_trades_last_5_business_days(now.date())
            if n >= self.cfg.pdt_limit:
                note, side = f"skipped: PDT limit ({n}/{self.cfg.pdt_limit} in 5 business days)", None
        if side:
            bp = self.buying_power()
            if bp is None:
                note, side = "skipped: cannot read buying power (run probe, pass --cash-key)", None
            else:
                qty = position_size(self.p, bp, ev.bar.close, self.cfg.slippage_per_share,
                                    self.cfg.commission_per_share)
                # RULE: P2 — fewer than 1 share -> no trade
                if qty < 1:
                    note, side = (f"skipped: size<1 (buying power ${bp:.2f}, "
                                  f"price ${ev.bar.close:.2f})"), None
                else:
                    note = f"ENTER {side} x{qty}" if self.enter(side, qty, ev, now) else "entry failed"
        self.j.decision(ev, note)
        if ev.long_signal or ev.short_signal or note:
            log.info("%s close=%.2f vwap=%.2f ema=%.2f | %s", ev.bar.start.strftime("%H:%M"),
                     ev.bar.close, ev.vwap or 0, ev.ema or 0, note or "signal")

    # ---- entries ----
    def enter(self, side: str, qty: int, ev, now: datetime) -> bool:
        ref = ev.bar.close                  # Pine fills at the signal bar's close
        if self.cfg.mode == "dry-run":      # simulated fill includes slippage; bracket anchors to it (as Pine)
            ref += (1 if side == "long" else -1) * self.cfg.slippage_per_share
        br = bracket_prices(side, ref, self.p)   # RULE: X1 + X2
        pos = Position(side, qty, ref, br["stop"], br["target"], now, ev.rules)
        if self.cfg.mode == "paper":
            off = self.cfg.entry_limit_offset
            ids = self.wb.place_bracket(side, qty, ref + off if side == "long" else ref - off,
                                        br["stop"], br["target"])
            if ids is None:
                self.halt("bracket order rejected — check the log")
                return False
            pos.order_ids = ids
        else:
            self.sim_cash -= ref * qty
        self.pos = pos
        log.info("ENTRY %s x%d ref=%.2f stop=%.2f target=%.2f", side, qty, ref, br["stop"], br["target"])
        return True

    # ---- dry-run exits ----
    def sim_manage(self, bar: Bar):
        if bar_end(bar.start, self.p) <= self.pos.entry_time:
            return                           # the signal bar itself
        hit = simulated_exit(self.pos.side, self.pos.stop, self.pos.target, bar)
        if hit:
            self.close_sim(hit[1], hit[0], bar_end(bar.start, self.p))

    def close_sim(self, px: float, reason: str, when: datetime):
        s = 1 if self.pos.side == "long" else -1
        px = px - s * self.cfg.slippage_per_share
        pnl = s * (px - self.pos.entry_ref) * self.pos.qty - 2 * self.cfg.commission_per_share * self.pos.qty
        self.sim_cash += self.pos.entry_ref * self.pos.qty + pnl
        self.sim_realized += pnl
        self.log_trade(when, reason, px, pnl)

    # ---- RULE: X3 — time-stop ----
    def flatten(self, now: datetime, reason: str):
        if self.cfg.mode == "dry-run":
            px = self.last_closed[-1].close if self.last_closed else self.pos.entry_ref
            self.close_sim(px, reason, now)
            return
        if self.pos.exit_sent_at and now - self.pos.exit_sent_at < timedelta(minutes=2):
            return                           # already sent; wait for reconcile to see it flat
        if self.pos.exit_sent_at:
            self.halt("time-stop close did not complete within 2 min — CLOSE MANUALLY IN WEBULL")
        if self.pos.order_ids:
            for k in ("profit", "loss", "master"):
                self.wb.cancel(self.pos.order_ids[k])
        q = self.broker_qty()
        if q is None:
            self.halt("cannot read position for the time-stop — CLOSE MANUALLY IN WEBULL")
        elif q != 0:
            self.wb.market_close(q)
            log.warning("Time-stop market close sent for %s shares", q)
        elif not self.pos.confirmed:
            log.info("Time-stop: entry never filled; nothing to close")
            self.pos = None
            return
        self.pos.exit_reason, self.pos.exit_sent_at = reason, now

    # ---- paper: broker positions are the source of truth ----
    def reconcile_paper(self, now: datetime):
        if not self.pos:
            return
        q = self.broker_qty()
        if q is None:
            self.halt("cannot read positions — run probe")
            return
        if not self.pos.confirmed:
            if q != 0:
                self.pos.confirmed = True
                log.info("Entry filled (broker shows %s shares)", q)
            elif now - self.pos.entry_time > timedelta(minutes=self.p.bar_minutes):
                # The marketable limit never filled within one bar: drop this signal
                self.wb.cancel(self.pos.order_ids["master"])
                log.warning("Entry not filled within one bar — cancelled")
                self.pos = None
            return
        if q == 0:
            pnl = self.day_pnl()             # flat now -> realized
            trade_pnl = None if pnl is None else pnl - self.pnl_before_trade
            if pnl is not None:
                self.pnl_before_trade = pnl
            self.log_trade(now, self.pos.exit_reason or "bracket (stop or target)", None, trade_pnl)

    def log_trade(self, when: datetime, reason: str, px: Optional[float], pnl: Optional[float]):
        p = self.pos
        self.j.trade({"date": p.entry_time.date().isoformat(), "mode": self.cfg.mode, "side": p.side,
                      "entry_time": p.entry_time.strftime("%H:%M:%S"), "entry_ref_price": f"{p.entry_ref:.2f}",
                      "qty": p.qty, "stop": f"{p.stop:.2f}", "target": f"{p.target:.2f}",
                      "exit_time": when.strftime("%H:%M:%S"), "exit_reason": reason,
                      "exit_price_est": "" if px is None else f"{px:.2f}",
                      "realized_pnl": "" if pnl is None else f"{pnl:.2f}", "rules": json.dumps(p.rules)})
        log.info("EXIT %s (%s) pnl=%s", p.side, reason, "?" if pnl is None else f"{pnl:.2f}")
        self.pos = None


# ---------------------------------------------------------------------------
def probe(cfg: Config):
    wb = Webull(cfg)
    print("=== BARS (last 200 x 5m) — check: field names, time format, newest-first?, bar OPEN or CLOSE time")
    raw = wb.bars_raw(200)
    print(json.dumps(raw, indent=2, default=str)[:3000])
    parsed = parse_bars(raw, cfg.symbol, cfg.bar_time_is_end, cfg.params.bar_minutes) if raw else None
    if parsed:
        print(f"\nParsed {len(parsed)} bars. Last 3 (bar OPEN time, New York):")
        for b in parsed[-3:]:
            print(f"  {b.start:%Y-%m-%d %H:%M}  O {b.open} H {b.high} L {b.low} C {b.close} V {b.volume}")
        print("Compare these with a Webull 5m chart. If times are 5 min late, rerun with --bar-time-is-end.")
    else:
        print("\nCould NOT parse bars — paste the JSON above back to get the parser fixed.")
    if wb.trade is None:
        print("\n(WEBULL_TRADE_ENDPOINT not set — skipping account calls)")
        return
    print("\n=== ACCOUNTS"); print(json.dumps(wb._call(wb.trade.account_v2.get_account_list), indent=2, default=str))
    if not wb.account_id:
        print("Set WEBULL_ACCOUNT_ID to one of the account ids above and rerun probe.")
        return
    bal = wb.balance_raw()
    print("\n=== BALANCE"); print(json.dumps(bal, indent=2, default=str))
    print(f"-> parsed equity={find_number(bal, cfg.equity_keys)}  buying_power={find_number(bal, cfg.cash_keys)}")
    pos = wb.positions_raw()
    print("\n=== POSITIONS"); print(json.dumps(pos, indent=2, default=str))
    print(f"-> parsed {cfg.symbol} qty={parse_position_qty(pos, cfg.symbol)}")
    print("\n=== OPEN ORDERS"); print(json.dumps(wb.open_orders_raw(), indent=2, default=str))


def main():
    cfg = build_config()
    cfg.log_dir.mkdir(parents=True, exist_ok=True)
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                        handlers=[logging.StreamHandler(),
                                  logging.FileHandler(cfg.log_dir / f"bot_{cfg.mode}.log")])
    if cfg.mode == "probe":
        probe(cfg)
        return
    if cfg.mode == "paper":
        log.warning("PAPER mode: orders go to the SANDBOX endpoint only. Never point this at a live account.")
    Bot(cfg).run()


if __name__ == "__main__":
    main()
