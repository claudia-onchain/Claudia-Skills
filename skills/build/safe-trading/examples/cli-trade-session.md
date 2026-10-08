# Worked session: a capped CLI buy, start to finish

Setup: an external agent set up with `claudia init` and `claudia login ck_live_…`, default caps (0.05 / 0.2 SOL),
0.05 SOL already spent today. The person asked: "Buy 0.08 SOL of $CLAUDIA."

Preflight and research output below are real runs from 2026-10-08. The quote and buy screens show the CLI's output
**shape** (labels and order from `commands/trade.ts`); the numbers in them are illustrative because no trade was
sent while writing this.

## 1. Preflight (read-only)

```text
$ node scripts/preflight.mjs claudia --side buy --sol 0.08 --spent-today 0.05
Preflight · buy 0.08 SOL · sol:2j5SaS7xy776qCBpyPQbZjyQSAtKiFgrwjfErthnW2ZM
  ✗ Per-trade cap      0.08 SOL vs cap 0.05 SOL
  ✓ Daily cap          0.08 SOL vs 0.15 SOL left today (cap 0.2, spent 0.05)
  ! Wallet balance     not given (--balance); claudia buy checks it before sending
  ✓ Size vs liquidity  ≈ $8.7 against $61,582 liquidity (0.014%) — larger shares mean larger price impact
  ✓ Max slippage       1500 bps (15%) — catalog default 1500
  ✓ Honeypot           not flagged
  ✓ Safety score       81 good · No red flags found
  ✓ Holder score       90 good · Healthy holders
Result: STOP (partial data: some data is from the cache)
$ echo $?
3
```

The agent replied: "0.08 SOL is over your per-trade cap of 0.05 SOL. I can quote 0.05 SOL instead, or you can raise
the cap yourself with `claudia config set max-sol-per-trade 0.08`. I won't change it." The person chose 0.05.

## 2. Rug check (exit 3, one red row)

`node ../rug-check/scripts/rug-check.mjs claudia` → 1 red (chart 12 risky, "slow bleed"), 2 amber (bundlers 10.7%,
bots 53.9%). The agent told the person the red row is price history, not a contract or holder problem.

## 3. Quote (shape)

```text
$ claudia quote claudia buy 0.05 --slippage-bps 1000

  claudia › Quote · buy sol:2j5SaS7xy776qCBpyPQbZjyQSAtKiFgrwjfErthnW2ZM
  ──────────────────────────────────────────────────────────────────────
  You spend     0.05 SOL
  You get       ≈ <expected> tokens (at least <minimum>)
  Price impact  <x>%
  Fees          <fee> SOL
  Route         PumpPortal · auto
  ! <each quote warning, e.g. the PumpPortal 0.5% fee note>
  Transactions  1 to sign with 7xKX…9fQa
  · Just a quote — nothing was signed or sent.
```

`--json` gives `{ "ok": true, "command": "quote", "token": "sol:…", "side": "buy", "amount": 0.05, "quote": {
"expectedOut", "minOut", "priceImpactPct", "feeNative", "route", "warnings" }, "txCount": 1, "signer": "…" }`.

## 4. Dry run

```text
$ claudia buy claudia 0.05 --dry-run --slippage-bps 1000
  claudia › Buy sol:2j5S…W2ZM
  You spend     0.05 SOL
  …
  Network       mainnet — real SOL
  Wallet        7xKX…9fQa · 0.21 SOL
  Caps          0.05 SOL/trade · 0.15 SOL left today
  · Dry run — signed locally to check it, nothing was sent.
```

## 5. Confirmation and send

The agent showed [the confirmation block](../templates/trade-confirmation.md) and the person replied
"yes, buy 0.05". The **person** ran:

```text
$ claudia buy claudia 0.05 --slippage-bps 1000
  …
  ? Spend 0.05 SOL on 2j5S…W2ZM? (y/N) y
  · Sending: buy
  ✓ Bought — confirmed
  · https://solscan.io/tx/<signature>
```

`claudia status` afterwards: `Caps 0.05 SOL/trade · 0.2 SOL/day · spent today 0.1 SOL`.

## What would have been refused

```text
$ claudia buy claudia 0.08 --json --yes
{"ok":false,"command":"buy","error":"cap_exceeded","message":"0.08 SOL is over your per-trade cap of 0.05 SOL"}
$ echo $?
3
$ claudia buy claudia 0.05 --json
{"ok":false,"command":"buy","error":"confirmation_required","message":"Not confirmed: this moves real funds.","hint":"Re-run with --yes to confirm (or --dry-run to only preview)."}
```

Not financial advice.
