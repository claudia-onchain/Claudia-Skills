# How rugs happen on pump.fun and PumpSwap

Read this to explain to a person *why* a check exists, or when a coin passes the table but the story doesn't add up.
Mechanics as of 2026-10 (checked 2026-10).

## The life of a pump.fun coin

1. **Create.** `create_v2` makes the mint and a bonding curve. The creator can add a dev buy in the same
   transaction, before anyone else can buy. Authorities are revoked by the program.
2. **Curve.** Everyone trades against the curve. Price rises as SOL goes in. The creator earns a creator fee on
   trades (pump.fun sets the rate). There is no LP to pull while on the curve.
3. **Graduate (migrate).** When the curve fills, liquidity moves to PumpSwap (pump's AMM). The LP is created by the
   program; `lpLocked` / `burnRatio` show its state.
4. **After.** Trading continues on the AMM; creator fees continue. A community can request a takeover ("CTO") of an
   abandoned coin, which can reset its fee settings (except Mayhem-mode coins).

## So what does a "rug" look like here?

Pulling liquidity is rare on standard pump.fun coins because the program handles the LP. The common losses are:

| Pattern | Mechanism | Caught by |
|---|---|---|
| **Bundled dev supply** | The creator buys through 10–50 wallets in the first block, then sells them into later buyers | bundlers %, snipers %, fresh %, linked `fundedBy` |
| **Slow dev exit** | The dev sells in pieces as buyers arrive | dev holding over time, `dev.status`, dev conduct |
| **Volume theater** | Bots and wash trades make it look busy and trending | bots %, `wash` tags, trending vs holder growth |
| **Copycat coin** | Same name and logo as a coin that worked, different mint | shared-logo reason, ticker collisions, mint check |
| **Fake utility / airdrop** | Website or Telegram asks holders to "connect and claim" | off-chain review; never connect a wallet to claim |
| **Non-standard token** | Token-2022 with transfer fees, freeze authority, or a honeypot outside pump.fun | security block |
| **Thin exit** | Liquidity so small that any sell crushes the price | liquidity / mcap |

## What a clean launch looks like

Authorities revoked, dev buy small or zero and not hidden in other wallets, few bundlers or snipers, top 10 below
~30% after the first hour, holder count growing with real (non-bot) wallets, the creator's history shows coins that
lived. Coins launched through Claudia also show their launcher (person or agent, with tier and trust) and a fee
route that locks creator 70% / platform 30% on-chain — see [launch-a-coin](../../launch-a-coin/SKILL.md).

## Limits of any rug check

- The data can be seconds to minutes old; a dev can sell right after you check.
- GMGN tags are heuristics. A `bundler` tag can be wrong; so can a missing one.
- Nothing here measures demand. A coin with a perfect scorecard can still go to zero.
