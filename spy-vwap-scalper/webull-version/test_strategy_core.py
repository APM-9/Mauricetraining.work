"""Offline tests for the rule logic. Run:  python -m unittest test_strategy_core -v"""
import unittest
from datetime import datetime, time, timedelta

from strategy_core import (NY, Bar, Params, bracket_prices, breaker_tripped, ema_series,
                           evaluate, in_window, is_last_window_bar, position_size,
                           session_vwap, simulated_exit)

P = Params()


def day_bars(day, n, start=time(9, 30), price=500.0, vol=1000.0):
    """n flat bars starting at `start` on `day`, slight uptrend so EMA sits below price."""
    out, t = [], datetime.combine(day, start, tzinfo=NY)
    for i in range(n):
        c = price + i * 0.01
        out.append(Bar(t, c, c + 0.05, c - 0.05, c, vol))
        t += timedelta(minutes=5)
    return out


class TestIndicators(unittest.TestCase):
    def test_ema_matches_tradingview_seed(self):
        e = ema_series([1, 2, 3, 4, 5], 3)
        self.assertIsNone(e[1])
        self.assertAlmostEqual(e[2], 2.0)          # SMA seed
        self.assertAlmostEqual(e[3], 0.5 * 4 + 0.5 * 2.0)

    def test_vwap(self):
        d = datetime(2026, 11, 2, 9, 30, tzinfo=NY)
        bars = [Bar(d, 10, 10, 10, 10, 100), Bar(d, 20, 20, 20, 20, 300)]
        self.assertAlmostEqual(session_vwap(bars)[-1], (10 * 100 + 20 * 300) / 400)


class TestSession(unittest.TestCase):
    def t(self, h, m):
        return datetime(2026, 11, 2, h, m, tzinfo=NY)

    def test_window_edges(self):
        self.assertFalse(in_window(self.t(9, 40), P))
        self.assertTrue(in_window(self.t(9, 45), P))
        self.assertTrue(in_window(self.t(11, 25), P))
        self.assertFalse(in_window(self.t(11, 30), P))

    def test_last_bar(self):
        self.assertTrue(is_last_window_bar(self.t(11, 25), P))
        self.assertFalse(is_last_window_bar(self.t(11, 20), P))


class TestSizingAndExits(unittest.TestCase):
    def test_risk_sizing(self):
        self.assertEqual(position_size(P, 1_000_000, 500), 25)      # floor(5/0.20)

    def test_200_account_cannot_buy_spy(self):
        self.assertEqual(position_size(P, 200, 590), 0)             # P2 -> skip trade

    def test_float_edge(self):
        self.assertEqual(position_size(Params(stop_distance=0.10), 1e6, 500), 50)

    def test_bracket(self):
        self.assertEqual(bracket_prices("long", 500.00, P), {"stop": 499.80, "target": 500.30})
        self.assertEqual(bracket_prices("short", 500.00, P), {"stop": 500.20, "target": 499.70})

    def test_breaker(self):
        self.assertFalse(breaker_tripped(-9.99, P))
        self.assertTrue(breaker_tripped(-10.0, P))

    def test_stop_first_when_both_hit(self):
        b = Bar(datetime(2026, 11, 2, 10, 0, tzinfo=NY), 500, 500.5, 499.5, 500, 1)
        self.assertEqual(simulated_exit("long", 499.8, 500.3, b), ("stop", 499.8))


class TestSignal(unittest.TestCase):
    def setUp(self):
        prior = day_bars(datetime(2026, 10, 30).date(), 78)                 # warm-up day
        today = day_bars(datetime(2026, 11, 2).date(), 6, price=501.0)       # 9:30–9:55
        self.base = prior + today

    def signal_bar(self, start, **kw):
        vals = dict(open=500.95, high=501.20, low=500.90, close=501.15, volume=5000.0)
        vals.update(kw)
        return Bar(start, vals["open"], vals["high"], vals["low"], vals["close"], vals["volume"])

    def vwap_today(self, bars):
        d = bars[-1].start.date()
        return session_vwap([b for b in bars if b.start.date() == d])[-1]

    def test_long_signal_fires(self):
        start = datetime(2026, 11, 2, 10, 0, tzinfo=NY)
        bars = self.base + [self.signal_bar(start)]
        # make sure the bar's low is at/below VWAP so L2a holds
        v = self.vwap_today(bars)
        bars[-1] = self.signal_bar(start, low=v - 0.01, close=max(v + 0.05, 501.15))
        ev = evaluate(bars, P, flat=True, breaker=False)
        self.assertTrue(ev.long_signal, ev.rules)

    def test_low_volume_blocks(self):
        start = datetime(2026, 11, 2, 10, 0, tzinfo=NY)
        bars = self.base + [self.signal_bar(start, volume=1100.0)]
        self.assertFalse(evaluate(bars, P, flat=True, breaker=False).long_signal)

    def test_breaker_and_position_block(self):
        start = datetime(2026, 11, 2, 10, 0, tzinfo=NY)
        bars = self.base + [self.signal_bar(start, low=500.0)]
        self.assertFalse(evaluate(bars, P, flat=True, breaker=True).long_signal)
        self.assertFalse(evaluate(bars, P, flat=False, breaker=False).long_signal)

    def test_outside_window_blocks(self):
        start = datetime(2026, 11, 2, 9, 40, tzinfo=NY)
        bars = self.base[:-2] + [self.signal_bar(start, low=500.0)]
        self.assertFalse(evaluate(bars, P, flat=True, breaker=False).rules["L5_S5_time_ok"])

    def test_shorts_off_by_default(self):
        start = datetime(2026, 11, 2, 10, 0, tzinfo=NY)
        bars = self.base + [self.signal_bar(start, open=501.3, high=510, low=490, close=490.0)]
        self.assertFalse(evaluate(bars, P, flat=True, breaker=False).short_signal)


if __name__ == "__main__":
    unittest.main()
