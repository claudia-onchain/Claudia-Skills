# Caps and limits: where they live and how they're counted

Read this before changing a cap, when two tools disagree about what's left today, or when setting budgets for an
automated agent.

## SOL caps

| Where | Setting | Default | Counted from |
|---|---|---|---|
| CLI | `claudia config set max-sol-per-trade <n>` · `max-sol-per-day <n>` (or `claudia init --max-sol-per-trade … --max-sol-per-day …`) | 0.05 · 0.2 | `~/.claudia/spend.json`, per UTC day: buys, agent-loop buys, launches (total cost) |
| Local MCP | `CLAUDIA_MCP_MAX_SOL_PER_TRADE` · `CLAUDIA_MCP_MAX_SOL_PER_DAY` | 0.05 · 0.2 | same ledger; the **stricter** of MCP and CLI caps wins |
| Agent loop | `claudia agent run --allow-trades --max-sol <n>` | per-trade cap | `min(--max-sol, max-sol-per-trade)`; daily cap from the ledger |
| Claudia Local | Settings → Safety | 0.05 · 0.2 | its own local ledger |
| Hosted agents (on Claudia's servers) | owner policy | 0.1 per trade · 0.5 per day · ask above 0.25 · paper on · trading off | server ledger; upper bounds 5 / 20 / 5 SOL |
| SDK | none | — | add `checkCaps()` + `recordSpend()` yourself |

Rules enforced by the CLI: both caps > 0 and `max-sol-per-trade ≤ max-sol-per-day`. Sells are not counted against
SOL caps. A launch counts its whole cost (launch fee + network + dev buy) against the daily cap, and the dev buy
against the per-trade cap.

The day is the UTC day. A cap of 0.2 SOL/day at 23:59 UTC resets a minute later; for real protection pair it with a
small wallet balance.

## Balance reserve

The CLI keeps 0.005 SOL aside for network fees and token-account rent: a 0.02 SOL buy needs about 0.025 SOL in the
wallet.

## Rate limits that affect trading

| What | Limit |
|---|---|
| Agent API (`/api/v1/*`) | 120 requests/min per IP, 60/min per key |
| Signed request clock | timestamp within ±5 min of the server; nonce single use |
| Launch planning | 3 per hour, 10 per day per agent |
| Online MCP heavy data tools | 20 calls/min per connection |
| Confirm link | valid 2 minutes |
| Local launch plan | execute within ~60 s of planning |

## Choosing caps

| Profile | Per trade | Per day | For |
|---|---|---|---|
| Cautious | 0.01 | 0.03 | First week, any automated agent, demos |
| Standard | 0.05 | 0.2 | The defaults; a person confirming each trade |
| Active | 0.1 | 0.5 | Experienced person, confirming each trade, wallet holds only what they accept losing |

Never set caps higher than the agent wallet's balance is meant to be, and never above what the person said they can
lose. Ready-made JSON: [../templates/cap-presets.json](../templates/cap-presets.json).
