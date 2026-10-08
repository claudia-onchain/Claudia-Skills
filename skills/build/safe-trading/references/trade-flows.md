# Trade flows, guard by guard

Read this when wiring a new trading path, debugging a refusal, or explaining to a person exactly what happens between
"buy" and a signature. Sources: `@useclaudia/cli` `commands/trade.ts`, `@useclaudia/mcp` `trade.ts`, the online
server's `/mcp/trade` and `/confirm/:id`, Claudia Local's SECURITY.md (all as of v0.2.0, 2026-10-08).

## 1. Online Trade MCP (non-custodial, the person signs)

```
assistant ──quote──────────────▶ /mcp/trade   (scope trade:quote)   → numbers only
assistant ──prepare_trade──────▶ /mcp/trade   (scope trade:prepare) → { id, status: "pending", confirmUrl, expiresAt (+2 min) }
person ─────opens confirmUrl───▶ useclaudia.xyz/confirm/<id>
            sees coin · side · amount · max slippage · fees     (launches: the real fee split too)
            signs with the SAME wallet they signed in with on /connect
assistant ──get_trade_status───▶ pending → signed → confirmed | failed | expired
```

- The server never holds a key and never signs. It stores the request and the summary, nothing else.
- `prepare_trade` / `prepare_launch` / `post_message` are marked `requiresUserInteraction`, so Claude Code asks
  before each call. Other hosts: configure write tools as "always ask" (OpenAI Responses `require_approval:
  "always"`; Cline `autoApprove: []`).
- Directories (Claude, ChatGPT) don't list tools that execute crypto trades; the Trade server is added by hand.
- Status 2026-10-08: not yet live on production (`claudia doctor` → "MCP trade · not live"). Fall back to the CLI or
  the website.

## 2. CLI (`claudia quote | buy | sell`)

Guards, in order, before anything is signed:

1. Logged in with an agent key (`claudia login ck_live_…`), and the agent's status is `active`
   (else `agent_paused` / `agent_quarantined` / `agent_banned`, exit 3).
2. A wallet is registered for the agent (`wallet_required`) and it equals this machine's wallet (`wallet_mismatch`).
3. For buys: `checkCaps(amount)` against `max-sol-per-trade` and what is left of `max-sol-per-day` (`cap_exceeded`).
4. Balance from your RPC ≥ amount + 0.005 SOL reserve (`insufficient_sol`; `balance_unknown` if the RPC fails on
   mainnet).
5. Quote from `POST /api/v1/trade/quote` (signed request). The quote's signer must be this wallet.
6. Summary printed: spend / get (with minimum), price impact, fees, route, warnings, transactions to sign, network
   ("mainnet — real SOL"), wallet + balance, caps left today.
7. Transactions signed locally **even in `--dry-run`** (proves they're complete and for this wallet). `--dry-run`
   stops here.
8. Confirmation: a `y` at "Spend 0.02 SOL on 7xKX…?" or `--yes`. In `--json` mode or without a TTY, nothing is sent
   without `--yes`.
9. Send in order, re-broadcast until confirmed or expired; buys are recorded in `~/.claudia/spend.json`.

Flags: `--slippage-bps <n>`, `--priority-fee <SOL>`, `--dry-run`, `--yes`, `--json`. Exit codes: 0 ok, 1 error,
3 refused (cap, safety check, you said no), 4 not set up, 5 rate limited.

`claudia quote` needs the agent key too (the quote endpoint is part of the signed agent protocol).

## 3. Local MCP server (`npx -y @useclaudia/mcp`)

- Trading tools exist only with `CLAUDIA_MCP_ALLOW_TRADES=true` (and not with `CLAUDIA_MCP_READ_ONLY=true`).
- Caps: the stricter of `CLAUDIA_MCP_MAX_SOL_PER_TRADE` / `_PER_DAY` (defaults 0.05 / 0.2) and `~/.claudia` caps.
- `quote` → "Quote only, nothing was sent … caps: 0.05 SOL per trade, 0.2 SOL per day (spent today 0 SOL)".
- `prepare_trade` without `confirm` → the summary plus "Not sent: this buy moves real funds. Show the user this
  summary, and call prepare_trade again with confirm: true only if they explicitly agree."
- `prepare_trade` with `confirm: true` → checks caps again, signs with the agent wallet, sends, records the spend,
  returns signatures.
- `prepare_launch` follows the same pattern; the dev buy must be ≤ the per-trade cap and the whole launch cost ≤
  what's left of the daily cap.

## 4. Claudia Local

Live trading is off by default (a warning shows when switched on). The chat agent has **no** trading tools; it can
`claudia_quote`, `paper_trade` and `propose_trade`. A real trade: proposal → the person opens it → dry run (quote,
local signature check, simulation on their RPC) → explicit confirm of that exact dry run within 60 seconds → send.
A failed simulation can't be confirmed. Caps 0.05 / 0.2 SOL by default, in a local ledger.

## 5. SDK

`agent.buy(token, sol, wallet)` / `agent.sell(token, pct, wallet)` = quote → sign locally → send → confirm. There is
**no cap, no prompt and no balance reserve** in the SDK. Minimum wrapper:

```ts
import { ClaudiaHome } from "@useclaudia/sdk/node";
const home = new ClaudiaHome();
const agent = await home.client();
const wallet = await home.walletKeypair();
home.checkCaps(amountSol);                                  // throws cap_exceeded
const q = await agent.tradeQuote({ token, side: "buy", amount: amountSol, slippageBps: 1000 });
if (!(await askAPerson(q.quote))) return;                   // your UI: show expectedOut, minOut, impact, fees
const signatures = await agent.executeQuote(q, wallet);
home.recordSpend({ kind: "buy", sol: amountSol, token, signatures });
```

## 6. Website

The browser wallet is created in the browser and encrypted with the person's passcode (PBKDF2 + AES-GCM), or the
person connects Phantom. The server only sees signed transactions.

## Routes and fees

| Coin state | Route label | Extra fee |
|---|---|---|
| On the pump.fun bonding curve | `pump.fun curve` (Claudia builds the transaction) | none beyond pump.fun's protocol + creator fee, shown in the quote |
| Migrated (PumpSwap) and other pools | `PumpPortal · auto` | PumpPortal 0.5% per trade, disclosed in the quote (checked 2026-10) |

Priority fee: optional total SOL on top of the base fee. Jito tips are not applied on these routes.
