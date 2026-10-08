# Worked session: an AI app with Claudia Trade (confirm-link flow)

Setup: Claude Code with Claudia Data and Claudia Trade added
(`claude mcp add --transport http claudia-trade https://useclaudia.xyz/mcp/trade`, then `/mcp` → authenticate).
On `/connect` the person granted `read trade:quote trade:prepare`, not `launch`. Tool names and fields are from the
shared catalog (`@useclaudia/sdk/tools`). Before relying on this route run `claudia doctor`: on 2026-10-08 the
Trade server was not yet live on production, and the local server
(`CLAUDIA_MCP_ALLOW_TRADES=true npx -y @useclaudia/mcp --server trade`) is the alternative — see the end.

## Conversation

**Person:** Sell a quarter of my $CLAUDIA.

**Assistant** calls `quote`:

```json
{ "coin": "claudia", "side": "sell", "amount": 25, "slippage_bps": 1000 }
```

Result (shape): `{ "coin": { "key": "sol:2j5S…W2ZM", "symbol": "CLAUDIA" }, "side": "sell", "amount": 25,
"quote": { "expectedOut": <SOL>, "minOut": <SOL>, "priceImpactPct": <x>, "feeSol": <x>, "route": "PumpPortal · auto" },
"warnings": [], "dataAgeSec": 4 }`

**Assistant:** "Selling 25% of your $CLAUDIA (sol:2j5S…W2ZM): about <x> SOL, at least <y> SOL with 10% max slippage,
price impact <z>%, fees <f> SOL including PumpPortal's 0.5%. Want me to prepare it? You'll sign it yourself on a
Claudia page. Not financial advice."

**Person:** yes, sell 25%.

**Assistant** calls `prepare_trade` (Claude Code asks the person to allow the call first):

```json
{ "coin": "claudia", "side": "sell", "amount": 25, "slippage_bps": 1000 }
```

Result:

```json
{ "id": "pt_…", "status": "pending", "confirmUrl": "https://useclaudia.xyz/confirm/pt_…",
  "expiresAt": "2026-10-08T14:12:00Z", "summary": { … }, "signatures": [] }
```

Hosts with MCP Apps show the `ui://claudia/confirm-trade` card with a button; others show the link.

**Assistant:** "Open this within 2 minutes: https://useclaudia.xyz/confirm/pt_… — check the coin, side, amount,
slippage and fees, then sign with the wallet you signed in with. If anything looks wrong, just close it."

The person signs. The assistant calls `get_trade_status { "id": "pt_…" }` every few seconds (not in a tight loop):
`pending` → `signed` → `confirmed`, with `signatures: ["…"]`.

**Assistant:** "Confirmed: https://solscan.io/tx/… ."

## If the link expires

`get_trade_status` returns `expired`. The assistant says so and offers a new quote. It never re-prepares on its own.

## Same flow on the local server

`prepare_trade` returns a summary and "Not sent: this sell moves real funds. Show the user this summary, and call
prepare_trade again with confirm: true only if they explicitly agree." After the person's explicit yes, the assistant
repeats the call with `"confirm": true`; the agent wallet in `~/.claudia` signs, inside the caps, and the result
carries the signatures.
