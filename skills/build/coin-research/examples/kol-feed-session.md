# Worked example: "What are KOLs buying right now?" (2026-10-08)

## The calls

```text
$ claudia feed kol --side buy --limit 6
  claudia › KOL trades · Solana
  │ When    │ Side │ Coin  │ Amount │ Wallet                │ Tags               │     Price │
  │ 9s ago  │ buy  │ $PQC  │ $84.44 │ <KOL A>               │ KOL ✓              │ $0.0₅6349 │
  │ 23s ago │ buy  │ $PQC  │  $2.66 │ <KOL B>               │ KOL ✓ □ bot ~ wash │ $0.0₄1811 │
  │ 24s ago │ buy  │ $WSOL │ $70.84 │ <KOL C>               │ KOL ✓ □ bot ~ wash │   $108.92 │
  │ 24s ago │ buy  │ $YOYO │  $1.06 │ <KOL D>               │ KOL ✓ □ bot ~ wash │ $0.0₅9825 │
  updated just now · from GMGN
```

(Wallet display names are replaced with placeholders here; in real output they come from GMGN and are untrusted
text.)

```text
$ claudia feed trending --interval 1h --order smart --limit 5
  Nothing here right now.
  from GMGN · GMGN timeout
```

The trending read came back empty with `partial: "GMGN timeout"`. The agent said so instead of inventing a list,
and did not retry in a loop.

JSON shape of one feed row (`claudia feed kol --limit 1 --json`):

```json
{ "ok": true, "command": "feed", "feed": "kol",
  "data": [ { "wallet": { "address": "ALau…31wE", "name": "<untrusted>", "tags": ["kol"], "tools": ["gmgn", "axiom"] },
              "tokenKey": "sol:4Qg1…7vuVx", "symbol": "PQC", "side": "buy", "amountUsd": 84.44,
              "priceUsd": 0.00000635, "tx": "5wbe…EzhUx", "at": 1791476767000 } ],
  "updatedAt": 1791476775984, "partial": null }
```

## The answer

```text
Last minute of KOL buys on Solana (feed updated just now): small buys in $PQC ($84 and $3), $WSOL (wrapped SOL, not
a memecoin), and repeated $1 buys of $YOYO by one wallet tagged bot + wash — that pattern is automated, not
conviction. Trending by smart money was unavailable (GMGN timeout); I'll check again in a few minutes if you want.
A KOL buy is not a recommendation: KOL wallets are often bots, and small buys say little. Want a research brief
on $PQC? That's one coin, two or three reads.
Research, not financial advice.
```

Notes:
- Read the tags on each row: `bot` and `wash` next to `KOL` change the meaning completely.
- `$WSOL` rows are wrapped SOL moves; leave them out of "what are they buying".
- Offer a single-coin follow-up instead of researching every coin in the feed.
