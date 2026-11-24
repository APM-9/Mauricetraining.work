# Trading the SPY VWAP Scalper by hand on Webull

This is the same rule set as `spy_vwap_scalper.pine`, rewritten as steps you do yourself in the Webull app or desktop platform. Use it for **Paper Trading first** (Webull menu → Paper Trading). Real money comes only after the TradingView backtest passes every check and at least 2 weeks of paper results match it.

Webull can't run Pine Script and has no strategy backtester. TradingView does the testing; Webull is where you place the orders.

---

## 0. Reality check before you start

- **$200 can't buy 25 shares of SPY. It can't buy one.** The sizing rule says `floor($5 ÷ $0.20) = 25 shares`, and SPY costs hundreds of dollars a share. In Webull **Paper Trading**, the paper account has a large balance, so you can practice the full 25-share size there. With real money on $200, the rule says don't trade (fewer than 1 share means no trade).
- **Fractional shares don't fix this.** Webull sells fractional SPY, but the strategy's sizing is whole shares. Advanced orders such as brackets/OTOCO usually aren't available for fractional quantities. Don't improvise a different position size; that is a different strategy.
- **Pattern Day Trader rule.** In a margin account under $25,000 you get **3 day trades per rolling 5 business days**. Every trade here is a day trade. In a cash account there's no PDT limit, but money from a sale has to settle (T+1) before you can reuse it. Practice in paper as if the limit applies: **max 3 trades per 5 trading days**.
- **Shorts are off.** Same as the Pine default. Shorting needs a margin account (generally $2,000+ minimum).

---

## 1. Set up the Webull chart (once)

1. Open **SPY**, choose the **5-minute** chart (5m).
2. **Turn extended hours OFF** in the chart settings. VWAP must start at the 9:30 AM open, not in premarket.
3. Add these indicators and **nothing else**:
   - **VWAP**, colored blue. It resets every day.
   - **EMA**, length **20**, source close, colored orange.
   - **Volume**, with its moving-average line on, length **20**.
4. Set the chart's time zone to **New York (ET)**, or always convert. Every time in this playbook is New York time.

> Webull's volume MA includes the bar that's still forming. The rule compares the closed bar against the average of the **previous** 20 bars. In practice: read the volume MA value from the bar **before** the signal bar.

## 2. Let TradingView spot the signals (recommended)

Watching charts all morning is how rules get bent. Let the Pine strategy tell you when a setup happens:

1. Open the TradingView chart with `spy_vwap_scalper.pine` loaded and the same inputs as your backtest.
2. Click **Alert** (clock icon) → Condition: **SPY VWAP Reversion Scalper** → **Order fills only**.
3. Notifications: turn on **app push** (TradingView mobile app). Expiration: open-ended.
4. When the alert fires, it means "the strategy just entered at this bar's close." Go to Webull and place the order in step 5 within the next ~30 seconds. If you're late by more than a bar, **skip it**.

You'll also get an alert for each exit. Use those to compare your Webull fills with what the strategy did.

## 3. Before 9:45 AM each day

- [ ] Write down today's **daily loss limit: −$10**. When realized P&L reaches it, you're done for the day.
- [ ] PDT count: how many day trades in the last 5 trading days? If 3, **no trades today**.
- [ ] No open SPY position from earlier (there never should be one).
- [ ] Ignore 9:30–9:45. No trades before 9:45.

## 4. Entry checklist (long). Everything must be YES on the bar that just closed

Wait for the 5-minute bar to **close**. Decisions are made on closed bars only.

| # | Rule | Check on the just-closed bar |
|---|------|------------------------------|
| L5 | Time | The bar opened between **9:45 and 11:20**. The 11:25 bar is never an entry; the time stop is at its close |
| L1 | Trend | Close is **above the orange 20 EMA** |
| L2a | Pullback | The bar's **low touched or went below VWAP**, **or** the previous bar **closed at or below VWAP** |
| L2b | Reclaim | The bar **closed above VWAP** |
| L3 | Bullish | Close > open (green candle) |
| L4 | Volume | Bar volume ≥ **1.2 ×** the 20-bar volume average (read the average from the previous bar) |
| L6 | Flat | You have no SPY position |
| X4 | Breaker | Today's realized P&L is above **−$10** |

Any NO means no trade. No "close enough".

## 5. Placing the order in Webull

Use a bracket order (**OTOCO**, sometimes labeled **Bracket**, under advanced order types). That way the stop and target are live the moment you're filled.

Example: the signal bar closed at **$590.40**.

| Leg | Setting | Example |
|---|---|---|
| Entry (primary) | **Buy, Limit**, price = signal close **+ $0.02** | Buy 25 @ limit **590.42** |
| Take-profit | **Sell, Limit**, = entry **+ $0.30** (0.20 × 1.5) | **590.72** |
| Stop-loss | **Sell, Stop** (market), = entry **− $0.20** | **590.22** |
| Quantity | **25** shares (`floor(5 / 0.20)`) | 25 |
| Time in force | **Day** | Day |
| Session | Regular hours only (no extended hours) | — |

Rules for the order:

- The +$0.02 limit stands in for the backtest's assumption of filling at the close plus 1 tick, without chasing. **If the entry doesn't fill within one bar (5 minutes), cancel it.** That signal is gone.
- When the entry fills at a different price than the limit, **move both exit legs** to *fill − $0.20* and *fill + $0.30*. That matches the Pine script, which anchors the bracket to the actual fill.
- **Never move the stop further away. Never add shares. Never re-enter right after a stop** unless a brand-new signal appears and every checklist item passes again.

## 6. While in the trade

- Do nothing. The bracket handles stop and target.
- **11:30 AM time stop.** If you're still in at 11:30, **cancel the bracket legs and sell at market.** No exceptions, no "let it run", no holding to lunch or overnight. Set a phone alarm for **11:29**.

## 7. Daily circuit breaker

After each exit, add up today's **realized** P&L. When it is **−$10 or worse** (two full stop-outs usually does it), **stop for the day.** Close the app. The limit stops new entries only; it never means closing a winning trade early.

## 8. Trade log (every trade, no exceptions)

Keep this in a spreadsheet. The bot (`webull_paper_bot.py`) writes the same columns to `logs/trades_*.csv`.

| date | entry time | side | qty | signal close | fill price | stop | target | exit time | exit reason (stop / target / time) | exit price | P&L $ | all 8 checks yes? | TradingView did the same? | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

## 9. Weekly review

- Compare your Webull paper trades with the TradingView strategy's trade list for the same days:
  - Did you take **every** trade it took, and **only** those?
  - How far were your fills from its fills? That gap is your real slippage. If it's regularly more than 1–2 cents, re-run the backtest with that slippage.
- After 2 weeks: if your paper expectancy is clearly worse than the backtest, or you couldn't follow the rules, **stop and re-evaluate**. If live expectancy diverges from the backtest for 2 consecutive weeks, stop.
