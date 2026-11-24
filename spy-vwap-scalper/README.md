# SPY VWAP Reversion Scalper — Usage & Validation Guide

> **Using Webull?** Webull can't run Pine Script. Backtest here in TradingView, then see [`webull-version/`](webull-version/README_WEBULL.md): a manual Webull playbook and a paper-only Python bot.

`spy_vwap_scalper.pine` is a Pine Script v6 **strategy** that implements one rule set: on a SPY 5‑minute chart, 9:45–11:30 AM New York time, buy a VWAP reclaim in an uptrend (price above the 20 EMA) on a bullish bar with above-average volume. It uses a fixed-dollar stop, an R‑multiple target, a hard time stop, and a daily loss circuit breaker. Shorts are a mirror image and are **off** by default.

It is a hypothesis to test, not a proven edge.

---

## 1. Read this first: a $200 account can't buy SPY

With the default inputs, sizing gives `floor($5 / $0.20) = 25 shares`. SPY trades in the hundreds of dollars per share, so **a $200 account can't afford 25 shares, or even 1.** The script checks affordability, as a cash account would, and skips any trade it can't pay for. The label on the last bar counts these skips ("Setups skipped (can't afford 1+ share)").

So with `initial_capital = 200` the backtest will most likely show **0 trades**. That is the correct result for a $200 account trading whole SPY shares.

**How to still test whether the rule set has an edge:**

1. In Strategy Tester → **Properties** → **Initial capital**, set something like **$25,000**. Sizing is risk-based, so the share count stays at 25 and each trade still risks about $5.
2. Judge results in **dollars, not percent**. The checklist's "max drawdown < 15% of starting capital" means **max drawdown < $30** (15% of $200). Read the dollar figure in the Strategy Tester; the percent figure will be against $25k and will look much smaller than it is.
3. Be aware that a rule set that passes this way still can't be traded as specified on $200. See Assumptions A1 and A2.

---

## 2. Paste it into TradingView

1. Open a **SPY** chart, set the timeframe to **5m**, and make sure **extended hours are OFF** (chart settings → Symbol → Session: *Regular trading hours*). VWAP must anchor at the 9:30 open, not the 4:00 AM premarket.
2. Open the **Pine Editor** tab at the bottom, delete the template, and paste the whole contents of `spy_vwap_scalper.pine`.
3. Click **Save**, then **Add to chart**. Fix any compile error before going further. This file was written without access to a Pine compiler (see Assumption A10).
4. You should see a blue VWAP line, an orange 20 EMA line, a light gray shaded 9:45–11:30 window, green triangles for entries, red triangles for exits, a P&L stamp after each session, and a status label on the latest bar.

## 3. Set commission and slippage (Strategy Tester → ⚙ / Properties)

Pine doesn't allow inputs to drive commission or slippage, so **you set them by hand** in Properties:

| Setting | Value | Notes |
|---|---|---|
| Initial capital | 200 (real) / 25,000 (edge test, see §1) | |
| Order size | leave as is | The script sends explicit share quantities |
| Commission | **0** USD per contract | Webull stocks = $0. Per contract = per share |
| Slippage | **1** tick | SPY tick = $0.01, applied on every fill |
| Verify price for limit orders | 0 | default |
| Margin for long/short | 100% | already the script default (no leverage) |

The script also has **Costs (REFERENCE)** inputs (`commission_per_share`, `slippage_ticks`). They only feed the affordability check and the reminder on the status label. **They don't change the backtest.** Keep them matching Properties.

To stress-test costs, try slippage at 2–3 ticks. If the edge vanishes at 2 ticks, it is too thin to survive live fills.

## 4. Set the date range

Strategy Tester → set the range to **at least 6 months**. 6 months of 5‑minute RTH bars is about 9,800 bars. Lower TradingView plans load fewer historical bars, so check that the first trade date in the **List of Trades** really goes back 6 months. If it doesn't, you need a plan with more bars or the **Deep Backtesting** feature.

## 5. Run the validation checklist from the trade list

Open Strategy Tester → **List of Trades**. Export it to CSV (the download icon) so you can check each row in a spreadsheet.

| Check | How to verify |
|---|---|
| Compiles | No red errors in the Pine Editor |
| ≥ 30 trades | "Total closed trades" in Overview / Performance Summary |
| Profit factor > 1.2 | Performance Summary, with your commission and slippage set |
| Max DD < 15% of start | Use the **$ figure**: < $30 against a $200 start |
| Avg trade > 0 | "Avg trade" in Performance Summary |
| Positive expectancy | In the CSV: `(wins/total) × avg win  −  (losses/total) × avg loss  > 0`. Compute it yourself |
| No trade loses > daily limit | Sort the CSV by P&L ascending. The worst single trade should be about −$5 (−$5.25 to −$5.50 with slippage), far above −$10. Then group by date and check that no day's sum is much worse than −$10 − $5 (see A6) |
| No trades outside 9:45–11:30 | Every **entry** time is between 09:45 and 11:25 NY. Every **exit** time is ≤ 11:30 NY. Make sure the chart timezone (bottom-right clock) is New York, or convert |
| No overnight holds | Every row's entry date = exit date. "Time stop" exits should be stamped 11:25 (that bar's close is 11:30) |

Exit comments in the trade list tell you why each trade closed: the bracket (stop or target), `Time stop`, or `Out-of-session close`. The last one should never appear. If it does, something is wrong with the data or the session settings.

If any check fails, **don't trade it.** Adjust within the allowed ranges only (stop 0.10–0.40, RR 1.0–2.5, session window) and rerun. After 5–10 honest attempts, accept the answer.

---

## 6. Honest disclaimer

A backtest is the best case. TradingView fills your stop and limit at exactly the prices you set, plus the fixed slippage you choose. It assumes your entry fills at the bar's close and that your order never moves the market. Live trading on a small account is worse in ways this test can't show. SPY's bid/ask spread is usually a penny, but in fast moves at a VWAP reclaim it widens, and stops fill past their price. Bracket orders can be partially filled or rejected. Fractional-share and cash-account rules limit what you can do. With a $0.20 stop and a $0.30 target, **one extra cent of slippage per side ($0.02 round trip) makes every loss about 10% bigger and every win about 7% smaller.** That is why costs are treated as the enemy here. Even a backtest that passes every check is only a reason to start paper trading, not evidence that the strategy will make money live. The most likely outcome for a rule set like this is that it fails the profit-factor check after costs. Learning that for $0 is the test working.

---

## 7. Assumptions to verify

**A1. A $200 account can't buy SPY.** See §1. The script blocks unaffordable trades (cash-account realism). This check is the only logic not in the spec, and you can't turn it off. If you raise initial capital, it stops mattering.

**A2. Pattern Day Trader rule.** In a US **margin** account under $25,000 you're limited to 3 day trades per rolling 5 business days. Every trade here is a day trade. In a **cash** account there is no PDT limit, but sale proceeds take a day to settle (T+1), so on $200 you could effectively trade once per day. The backtest models neither. Count trades per week in the trade list and compare with what your account actually allows.

**A3. Shorts on a small account.** US brokers generally require a margin account with a $2,000+ minimum to short. The short toggle is for research only.

**A4. VWAP anchor.** `ta.vwap(hlc3)` resets at the start of each trading session as TradingView defines it for the chart. With RTH only that is 9:30 ET. With extended hours it resets at 4:00 AM ET and gives a different, premarket-weighted VWAP. **Use RTH.** Check on a few days that the blue line "restarts" at 9:30.

**A5. "Pullback to VWAP" interpretation.** Rule 2 is implemented as: *(this bar's low ≤ VWAP **or** the previous bar closed ≤ VWAP) **and** this bar closes > VWAP*. So both a single-bar wick-through-and-reclaim and a one-bar-below-then-reclaim qualify. A pullback that happened two or more bars earlier does **not** qualify. Shorts mirror this using the high.

**A6. Circuit breaker granularity.** The breaker blocks new entries once **realized** day P&L ≤ −$10. Only one position is open at a time and an open trade is never closed early, so the worst normal day is about −$10 minus up to one more stop-out (about −$15). A gap or fast tape can fill a stop worse than −$5. The counter resets at the first bar of each day's session window.

**A7. Volume average excludes the current bar.** "20-bar average volume" is computed over the **previous** 20 bars, so the current bar's spike doesn't inflate its own baseline. Early in the window this lookback includes the 9:30–9:45 bars (and, for the first trade of the day, some of the previous afternoon). Opening bars are heavy, so the filter is strict at 9:45 and loosens over time. The length is an input (`Volume average length`, default 20).

**A8. Fills.** With `process_orders_on_close = true`, entries fill at the **close of the signal bar** (plus slippage). The bracket is placed on the signal bar using that close as the reference, so it is live from the next bar. From then on it is re-anchored to the actual fill price. In practice the first bar's stop and target can sit about 1 tick (the slippage) away from the final levels. If a single bar hits both stop and target, TradingView's broker emulator decides the order from the bar's open/high/low/close sequence. Treat those trades as uncertain.

**A9. Time stop.** On 5‑minute bars the last in-session bar opens at 11:25 and closes at 11:30. The script flattens at that close and takes no new entries on that bar. The trade list shows these exits at 11:25 (bar open time). Exit triangles for time-stop exits are drawn one bar late. The Strategy Tester's own markers are authoritative.

**A10. Not compiled here.** The script was written against the Pine v6 reference without a TradingView compiler in the loop. If the editor reports an error, paste the message back to fix it. Don't let anyone "fix" it by changing the rules.

**A11. Commission and slippage inputs are reference-only.** This is a Pine limitation: `strategy()` arguments must be constants. Properties is the source of truth.

**A12. Session string.** The session window is built from the four hour/minute inputs and evaluated in `America/New_York` whatever your chart's timezone. Half-day sessions (e.g. day after Thanksgiving) still contain the full 9:45–11:30 window.

---

## 8. After the backtest (from the handoff, unchanged)

1. Passes every check → **paper trade at least 2 weeks** with TradingView alerts, not real money. Compare against backtest expectations.
2. Only if paper trading matches the backtest should real money be considered, at the smallest possible size.
3. Log every trade (date, entry, exit, P&L, reason). Review weekly. If live expectancy diverges from the backtest for 2 consecutive weeks, stop.
4. No webhook automation until paper trading is validated.
