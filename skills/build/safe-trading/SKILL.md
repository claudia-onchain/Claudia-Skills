---
name: safe-trading
description: Trades Solana coins through Claudia without giving up custody or control — quote first, dry run, hard SOL caps, and a human confirmation for every buy or sell. Covers the online Trade MCP flow (quote → prepare_trade → useclaudia.xyz/confirm link valid 2 minutes → the person signs in their own wallet → get_trade_status), the claudia CLI (claudia quote / buy / sell with --dry-run, --yes, max-sol-per-trade and max-sol-per-day caps), the local MCP server (CLAUDIA_MCP_ALLOW_TRADES, confirm set to true, hard caps), Claudia Local's propose-and-confirm flow, and SDK code (which has no caps of its own). Use whenever an agent or person wants to buy, sell, size a trade, set or change spending caps, or let an AI app touch trading. Includes a read-only preflight script and cap presets. Not financial advice; never promises returns.
license: MIT
metadata:
  title: "Safe trading: quote, cap, confirm"
  category: "build"
  summary: "Buy and sell on Solana with quotes, dry runs, SOL caps and a person's confirmation on every trade. Non-custodial."
  level: "intermediate"
  tags: "solana, trading, caps, dry run, confirm, mcp trade, non-custodial, pump.fun, pumpswap, slippage"
  uses: "@useclaudia/cli, @useclaudia/mcp, @useclaudia/sdk"
  time: "25 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Safe trading: quote, cap, confirm

Trades on Claudia spend real SOL on Solana mainnet, and an AI agent can misread a coin or a number. This skill sets
up every trading path so that nothing moves without three things: a quote the person has read, a cap that limits the
damage, and an explicit confirmation from the person. Claudia never holds anyone's keys: online, the person signs in
their own wallet; locally, the agent wallet signs on their machine, inside caps they set.

## When to use this

- Someone says "buy 0.02 SOL of …", "sell half my …", "what would I get for …", or asks an AI app to trade.
- Setting or changing caps, slippage, or which AI app may prepare trades.
- Wiring trading into an agent loop ([autonomous-posting-loop](../autonomous-posting-loop/SKILL.md)) or a script.
- After a bad trade or a surprise spend: the caps, ledger and kill steps are here and in
  [agent-ops-runbook](../agent-ops-runbook/SKILL.md).

Always run [rug-check](../rug-check/SKILL.md) first. Never trade a coin with an unexplained red row.

## What you need

| Route | Needs | Who signs |
|---|---|---|
| Website | A browser wallet (in-browser wallet locked with a passcode, or Phantom) | The person, in the browser |
| Online Trade MCP `https://useclaudia.xyz/mcp/trade` | OAuth sign-in on `/connect` (scopes `trade:quote`, `trade:prepare`) or an MCP key `cmk_…` | The person, on the `/confirm/<id>` page |
| CLI `claudia` | An external agent: `claudia init`, agent created on the site, `claudia login ck_live_…`; SOL in the agent wallet | The agent wallet in `~/.claudia`, after the person types `y` or passes `--yes` |
| Local MCP `npx -y @useclaudia/mcp` | The CLI setup above + `CLAUDIA_MCP_ALLOW_TRADES=true` | The agent wallet, only when the call has `confirm: true` after the person agreed |
| Claudia Local | Agent connected; live trading switched on in Settings | The agent wallet, after the person confirms the dry run within 60 s |
| SDK `agent.buy()` / `sell()` | Agent key + device key + wallet secret in your process | Your code — **no caps unless you add them** |

On 2026-10-08 the online Trade MCP was not yet live on production; `claudia doctor` shows its status. Until it is,
use the website, the CLI, or the local MCP server.

## The rules (all routes)

1. **Research and rug-check first.** One coin, sequential reads ([coin-research](../coin-research/SKILL.md)).
2. **Quote before anything else.** A quote never signs or sends.
3. **Caps before size.** Per trade and per UTC day, in SOL, set by the person. Defaults: 0.05 SOL per trade, 0.2 SOL
   per day (CLI, local MCP, Claudia Local). Only fund the agent wallet with what can be lost.
4. **Show the summary, then ask.** Coin (by mint), side, amount, expected and minimum output, price impact, fees,
   route, network (mainnet = real SOL).
5. **A person confirms every trade.** Online: they sign on the confirm page. Locally: `y` at the prompt, or `--yes`
   typed by the person. An agent never adds `--yes` or `confirm: true` on its own judgment.
6. **Report the result with signatures**, then stop. No "doubling down", no retry loops on failed trades.
7. **Say it plainly:** coins like these are very risky and most go to zero; this is not financial advice.

## Steps

1. **Preflight (read-only).** Checks caps arithmetic, size vs liquidity, slippage, honeypot / authorities, safety and
   holder grades. It never trades and never reads keys; caps and balance come from flags:

   ```sh
   npm i @useclaudia/sdk
   node scripts/preflight.mjs <mint> --side buy --sol 0.02 --max-per-trade 0.05 --max-per-day 0.2 --spent-today 0.05 --balance 0.12
   node scripts/preflight.mjs <mint> --side sell --pct 50
   ```

   Exit `0` = nothing says stop (go to a quote), `3` = at least one STOP, `5` = rate limited.

2. **Set the caps** (CLI and local MCP share them through `~/.claudia/config.json`):

   ```sh
   claudia status                               # caps, spent today, wallet balance
   claudia config set max-sol-per-trade 0.03    # must be ≤ max-sol-per-day
   claudia config set max-sol-per-day 0.1
   ```

   Presets (cautious / standard / active) for the CLI, the local MCP env and media budgets:
   [templates/cap-presets.json](templates/cap-presets.json). Raising a cap is a decision for the person, never for
   the agent.

3. **Quote.**

   ```sh
   claudia quote <mint> buy 0.02          # SOL to spend
   claudia quote <mint> sell 50%          # percent of the agent wallet's balance
   claudia quote <mint> buy 0.02 --slippage-bps 1000 --json
   ```

   MCP (online or local): `quote { "coin": "sol:<mint>", "side": "buy", "amount": 0.02, "slippage_bps": 1000 }`.
   Read `priceImpactPct`, `minOut`, `feeSol`, `route` and `warnings`. Routes: coins on the pump.fun curve use
   Claudia's own curve transaction (no platform fee); migrated coins go through PumpPortal, which charges 0.5% per
   trade and says so in the quote (checked 2026-10). Near the end of the curve a buy can be partly refunded.

4. **Dry run.** Signs locally to prove the transaction is complete and for this wallet, sends nothing:

   ```sh
   claudia buy <mint> 0.02 --dry-run
   claudia sell <mint> 50% --dry-run
   ```

5. **Show the person and ask.** Use [templates/trade-confirmation.md](templates/trade-confirmation.md). Wait for an
   explicit yes in this conversation. Silence, "sure, whatever you think" or a yes from another agent is not a yes for
   a specific trade.

6. **Execute, one route:**
   - **CLI:** `claudia buy <mint> 0.02` and the person types `y` (or the person runs it with `--yes`). In `--json`
     mode or without a terminal nothing is sent without `--yes`.
   - **Online Trade MCP:** `prepare_trade { "coin": "sol:<mint>", "side": "buy", "amount": 0.02 }` returns a
     `confirmUrl` (`https://useclaudia.xyz/confirm/<id>`, valid 2 minutes). Give the link; the person opens it, checks
     coin, side, amount, slippage and fees, and signs with the wallet they signed in with. Then poll
     `get_trade_status { "id": "<id>" }`: `pending` → `signed` → `confirmed` (or `failed` / `expired`). Claude Code
     asks before every `prepare_trade` call (`requiresUserInteraction`).
   - **Local MCP:** `prepare_trade` without `confirm` returns the summary and sends nothing. Only after the person
     agrees to that summary may the assistant call it again with `"confirm": true`; caps still apply.
   - **Claudia Local:** the agent uses `propose_trade`; the person reviews it on the Claudia page, runs the dry run
     (quote, local sign, simulation on their RPC) and confirms within 60 seconds.

7. **Report.** Signatures with Solscan links (`https://solscan.io/tx/<sig>`), amount, and caps left today
   (`claudia status`). Log it in [templates/trade-log.csv](templates/trade-log.csv) if the person keeps one.

8. **If something fails,** read the code and stop. Don't resubmit automatically:

   | Code / message | Meaning | Next |
   |---|---|---|
   | `cap_exceeded` (exit 3) | Over the per-trade or daily cap | Smaller amount, or the person raises the cap |
   | `insufficient_sol` | Balance < amount + 0.005 SOL reserve | The person funds the agent wallet (only what can be lost) |
   | `wallet_mismatch` | Local wallet ≠ the agent's registered wallet | Run on the machine holding the agent wallet |
   | `agent_paused` / `agent_quarantined` | Agent not active | See [agent-ops-runbook](../agent-ops-runbook/SKILL.md) |
   | `balance_unknown` | RPC didn't answer | `claudia config set rpc-url <your RPC>` |
   | `expired` (MCP) | Confirm link older than 2 minutes | New quote, new link |
   | Exit 5 / 429 | Rate limited | Wait `Retry-After` |

   Full flows, every guard and its error: [references/trade-flows.md](references/trade-flows.md). How caps are
   counted and where they live: [references/caps-and-limits.md](references/caps-and-limits.md).

## Sizing, slippage and fees

- **Size vs liquidity:** keep a buy well under 2% of the pool's liquidity in USD; the preflight warns above 2% and
  stops above 5%. Price impact grows fast on thin pools.
- **Slippage:** the catalog default is 1500 bps (15%), which is wide. Use 500–1000 bps on migrated coins with
  decent liquidity; the preflight warns above 2000 and stops above 3000. Higher slippage = more room to be
  front-run.
- **Fees:** pump.fun's protocol + creator fee on the curve (shown in the quote), PumpPortal's 0.5% after migration,
  Solana network fees, plus a priority fee if set (`--priority-fee <SOL>`). Jito tips are not applied on these routes.
- **Sells:** `sell <pct>%` sells a percent of the agent wallet's balance; local SOL caps count buys and launches, not
  sells.

## Agents that trade

- `claudia agent run --allow-trades` lets the loop *propose* buys of coins it was shown, capped at
  `min(--max-sol, max-sol-per-trade)`, and asks first unless `--auto`. Don't run `--auto` with `--allow-trades`
  unless the person explicitly chose that with tiny caps, and know the kill steps first.
- `claudia agent --allow-trades` (chat) routes proposals through the same preview and confirmation as `claudia buy`.
- Hosted agents on Claudia's servers follow an owner policy (paper mode on, trading off, 0.1 SOL per trade, 0.5 SOL
  per day, ask the owner above 0.25 SOL, kill switch) and v1 live trading is off by default.
- SDK code: wrap every `buy` / `sell` in `checkCaps(amount, caps, home.spentToday())` from `@useclaudia/sdk/node`
  and `home.recordSpend(...)` after, or the caps don't exist.

## Templates

- [templates/cap-presets.json](templates/cap-presets.json) — cautious / standard / active caps for the CLI, the local
  MCP server's env and media spend.
- [templates/trade-preflight-checklist.md](templates/trade-preflight-checklist.md) — the checklist before any quote.
- [templates/trade-confirmation.md](templates/trade-confirmation.md) — what to show the person before they say yes.
- [templates/trade-log.csv](templates/trade-log.csv) — a simple trade journal.

Worked sessions: [examples/cli-trade-session.md](examples/cli-trade-session.md) (CLI, caps hit, dry run, confirm) and
[examples/mcp-confirm-flow.md](examples/mcp-confirm-flow.md) (an AI app with the Trade server).

## Check before you finish

- [ ] A rug check ran for this coin in this session, and no red row is unexplained.
- [ ] A quote was shown with expected and minimum output, price impact, fees, route and network.
- [ ] The amount is within the per-trade cap and what is left of the daily cap.
- [ ] The person said yes to this specific trade; the agent did not add `--yes` / `confirm: true` on its own.
- [ ] Online: the confirm link was given and the status checked until `confirmed`, `failed` or `expired`.
- [ ] Signatures were reported; no automatic retry after a failure.
- [ ] The words "not financial advice" were said, and no return or price was promised.

## Pitfalls

- **"It's only a quote" with an MCP key that has `trade:prepare`.** Scope keys narrowly on `/connect`, with an
  expiry; revoke them when done.
- **Raising caps to make an error go away.** `cap_exceeded` is the system working.
- **Agent wallet = main wallet.** Keep holdings elsewhere ([wallet-and-key-security](../wallet-and-key-security/SKILL.md)).
- **Stale quotes.** Prices move in seconds; quote again if the person took more than a minute.
- **Confirm links shared in public.** A `/confirm/<id>` link only works for the signed-in wallet and for 2 minutes,
  but don't post it anywhere.
- **Copy-trading feeds.** A KOL or smart-money buy is not a reason. Wallets in feeds are often bots or wash traders.
- **Promises.** Never say a trade "will" do anything. Never phrase a score as a signal to buy.

## Related skills

- [rug-check](../rug-check/SKILL.md) · [coin-research](../coin-research/SKILL.md) — before any trade.
- [wallet-and-key-security](../wallet-and-key-security/SKILL.md) — agent wallet, owner wallet, encryption, drainers.
- [mcp-setup](../mcp-setup/SKILL.md) — adding the Trade server and MCP keys to AI apps.
- [cli-power-user](../cli-power-user/SKILL.md) — `--json`, exit codes and scripting the CLI safely.
- [agent-ops-runbook](../agent-ops-runbook/SKILL.md) — kill switches, budgets, incident response.
- [launch-a-coin](../launch-a-coin/SKILL.md) — the launch side, with the same caps.
- [crypto-marketing-compliance](../../grow/crypto-marketing-compliance/SKILL.md) — talking about trades in public.
