# Webull version — overview and bot setup

| File | What it is |
|---|---|
| `WEBULL_PLAYBOOK.md` | **Start here.** Trading the rules by hand in Webull Paper Trading, with an entry checklist, order setup and journal |
| `webull_paper_bot.py` | Python bot for Webull's official OpenAPI. **Paper trading only**, and it refuses to send orders to the production host |
| `strategy_core.py` | The rule logic, shared by the bot, with the same `RULE:` tags as the Pine script |
| `test_strategy_core.py` | Offline tests: `python -m unittest test_strategy_core -v` |
| `requirements.txt` | `webull-openapi-python-sdk` |

> **This is not for real money.** The handoff's process still applies: TradingView backtest passes every check → ≥ 2 weeks of paper trading that matches it → only then consider real money. Even then, the handoff says no webhook/bot automation until paper trading is validated. The bot exists to make paper trading consistent, not to replace that step.

---

## How the bot works

Every ~10 seconds it checks whether a new 5‑minute bar has closed. When one has, it fetches the last 200 SPY 5‑minute bars and runs the exact Pine rules (VWAP from today's regular-hours bars, 20 EMA, volume ≥ 1.2× the prior 20 bars, 9:45–11:30 ET window, flat, breaker clear). On a signal:

- **dry-run** (default): simulates the trade from the bars. It fills at the signal close + 1 tick, then checks stop and target on each following bar. If both are hit in one bar, it assumes the **stop** filled first (pessimistic). The time stop is at the 11:30 close. **No orders are sent.**
- **paper**: sends a bracket to the **sandbox** account. The master is a buy LIMIT at close + $0.02, with a STOP_PROFIT limit and a STOP_LOSS stop, using the combo structure from Webull's own SDK sample. If the entry doesn't fill within one bar, it's cancelled. At 11:30 the bot cancels the legs and sends a market close. Broker positions are the source of truth.

Safety behavior:

- **Production guard.** `paper` mode exits if `WEBULL_TRADE_ENDPOINT` is missing or equals `api.webull.com` (the production host in the SDK's `endpoints.json`). It also requires `WEBULL_I_CONFIRM_SANDBOX_KEYS=yes`.
- **Halts instead of guessing.** If it can't read bars, equity, buying power or positions, it **stops taking new entries** and logs why. If it can't confirm a time-stop close, it logs `CLOSE MANUALLY IN WEBULL`.
- **Stale-data guard.** If the newest bar is more than ~90s late (e.g. delayed quotes), entries halt.
- **Daily breaker.** The bot records equity at the start of the day, and while flat compares current equity with it. Once realized day P&L ≤ −$10 → no more entries that day.
- **PDT guard.** Max 3 trades per 5 business days by default (`--pdt-limit 0` turns it off).
- **Sizing.** `floor($5 / $0.20) = 25` shares, capped at what buying power can afford. Under 1 share → skipped, and the decision log says so.
- **No extra rules.** No martingale, no averaging down, no re-entry logic beyond the spec.

Logs go in `logs/`:
- `decisions_<mode>.csv`: every closed bar, with each rule's true/false, so you can audit why it did or didn't trade.
- `trades_<mode>.csv`: the trade journal.
- `bot_<mode>.log`: the run log.

---

## Setup

1. **Python 3.9+** on a computer that stays on and connected from 9:30 to 11:45 ET.
   ```bash
   cd spy-vwap-scalper/webull-version
   python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   python -m unittest test_strategy_core -v              # should print OK
   ```
2. **Webull OpenAPI access.** In your Webull account, apply for OpenAPI and create an App Key/Secret under API management (https://www.webull.com/center#openApiManagement). For **paper**, apply for the **Sandbox / Paper Trading** API in the same place and generate **separate sandbox keys**. Get the **sandbox endpoint hostname** from Webull's developer docs (https://developer.webull.com/apis/docs).
3. **Market data permission.** The bot needs **real-time** US stock quotes through the API. Delayed data makes every signal meaningless, and the stale-data guard will halt the bot.
4. **Environment variables.** Set them in your shell; never commit them, never paste them into chats.

   | Variable | Needed for | Value |
   |---|---|---|
   | `WEBULL_APP_KEY`, `WEBULL_APP_SECRET` | all modes | **Sandbox** keys for paper. (dry-run only needs keys that can read market data) |
   | `WEBULL_DATA_APP_KEY`, `WEBULL_DATA_APP_SECRET` | optional | Separate keys for market data, if the sandbox keys can't read quotes. Data calls never place orders |
   | `WEBULL_DATA_ENDPOINT` | optional | Override the market-data host |
   | `WEBULL_TRADE_ENDPOINT` | probe (account part), paper | The **sandbox** trade host from Webull's docs |
   | `WEBULL_ACCOUNT_ID` | paper | Your sandbox account id (printed by `probe`) |
   | `WEBULL_I_CONFIRM_SANDBOX_KEYS` | paper | `yes` |

   On first run the SDK may ask you to approve a 2FA token in the Webull app. It stores the token in `conf/token.txt` under the working directory. Keep that out of git.

## Run order. Don't skip steps

```bash
python webull_paper_bot.py probe          # 1. inspect raw API responses
python webull_paper_bot.py dry-run        # 2. a few days: signals + simulated trades, no orders
python webull_paper_bot.py paper          # 3. sandbox orders, alongside the manual playbook / TradingView
```

**Step 1, `probe`, matters.** Webull's docs couldn't be reached while this was written, so some response formats were inferred from the SDK source, not confirmed. `probe` prints the raw JSON and what the bot parsed from it. Check:

- **Bars.** Do the last 3 printed bars match Webull's 5m chart (time, O/H/L/C, volume)? If every time is 5 minutes late, Webull stamps bars at their **close**; rerun with `--bar-time-is-end`. If it says "Could NOT parse bars", the response shape differs and the parser needs a fix.
- **Balance.** Is `parsed equity` your total account value and `buying_power` your buying power? If either is `None` or wrong, find the right field name in the printed JSON and pass `--equity-key <name>` / `--cash-key <name>`.
- **Positions.** Buy 1 share in the sandbox by hand and rerun probe; `parsed SPY qty` should say 1. Then sell it.
- **SPY category.** If bars come back empty, try `--category US_ETF`.

`dry-run` defaults to $200 of simulated cash, so it will log `skipped: size<1` on every signal. That's the honest result for $200. To watch simulated trades, use `--dry-run-cash 25000`. Sizing stays at 25 shares/$5 risk either way.

All rule inputs have flags matching the Pine inputs: `--stop-distance`, `--rr-ratio`, `--risk-per-trade`, `--daily-loss-limit`, `--session-start 09:45`, `--session-end 11:30`, `--enable-shorts`, `--volume-multiplier`, `--ema-length`, `--volume-avg-length`, `--slippage`, `--commission`. **Keep them identical to the TradingView backtest**, or the comparison is meaningless.

---

## Assumptions to verify (bot-specific)

- **W1. Not tested against a live Webull account.** The rule logic is unit-tested, and the whole loop was run through simulated trading days with fake data (entries, stops, time stop, breaker, $200 skip). The Webull API calls follow the official SDK (v3.1.2) source and samples, but haven't been run against a real or sandbox account. Treat the first sandbox sessions as testing the bot, not the strategy.
- **W2. Response field names** for bars, balance and positions aren't defined in the SDK. The parser tries common names and halts if it can't find them. Verify them with `probe`.
- **W3. Bracket orders.** The MASTER/STOP_PROFIT/STOP_LOSS combo is copied from Webull's SDK sample (`support_trading_session: "N"` for combo legs, `"CORE"` for the market close, as in the samples). Confirm in the sandbox that the legs appear as one linked order and that cancelling them works.
- **W4. Opening a short** uses side `SELL`. The SDK samples only show long orders, so short orders are unverified. Shorts are off by default.
- **W5. EMA warm-up.** The EMA is computed from the last 200 bars (about 2.5 days) with TradingView's SMA seed. The result agrees with TradingView's EMA to within fractions of a cent, but isn't bit-identical.
- **W6. Fill timing.** The bot sends the entry a few seconds after the bar closes. The backtest fills exactly at the close. That gap, plus the +$0.02 limit, is real slippage. Measure it in the trade log.
- **W7. Daily P&L in paper mode** = change in account equity since the day started, read only while flat. If you trade anything else in the same sandbox account, the breaker sees that P&L too. Use the sandbox account only for this.
- **W8. Holidays and half days.** The bot doesn't read the market calendar. On market holidays there are no new bars, so it does nothing. Half days still include the 9:45–11:30 window.
