# Red-flag catalog

Read this when the scorecard is mostly green but something still feels off, or when you need to explain a red row in
plain words. Each entry: what it looks like in Claudia's data, why it matters, and how to word it without accusing
anyone.

## Contract and token

| Flag | Where you see it | Why it matters | Say |
|---|---|---|---|
| Mint authority kept | `security.mintRenounced: false` | New supply can be printed and sold | "The mint authority is not renounced, so supply can still be increased." |
| Freeze authority kept | `security.freezeRenounced: false` | Holders' token accounts can be frozen | "Freeze authority is still active." |
| Honeypot | `security.honeypot: true`, safety title "Can't sell" | Buys work, sells fail | "Flagged as a honeypot: sells may fail. Stop here." |
| Transfer tax | `buyTaxPct` / `sellTaxPct` > 0 | Unusual for pump.fun coins; often a Token-2022 fee or a trap | "There is a <x>% tax on sells." |
| Blacklist | `security.blacklist: true` | Specific wallets can be blocked | "The token has a blacklist function." |
| Shared logo | safety reason "Logo is shared with N other tokens" | Copycat or re-launch of an earlier coin | "The image is reused by N other coins." |

Standard pump.fun coins are created with mint and freeze authority revoked; a pump.fun coin showing otherwise
deserves a second look at the mint itself on an explorer (Solscan).

## Liquidity

| Flag | Where | Why |
|---|---|---|
| Unlocked LP (migrated) | `security.lpLocked: false`, `burnRatio` low | Liquidity can be withdrawn |
| Thin liquidity | `liquidityUsd / mcapUsd` < 3–10% | Big price impact; a few sells move it a lot |
| Curve almost full | `bondingPct` > 95, phase `almost` | A buy can be partly refunded; migration volatility |

## Holders

| Flag | Where | Why |
|---|---|---|
| Concentrated top 10 | `stats.top10Pct` ≥ 0.3–0.5 (pool excluded) | A few wallets can dump together |
| One big wallet | largest non-pool `pct` ≥ 0.1 | One seller sets the price |
| Linked wallets | several holders with the same `fundedBy`, or holder reason "linked wallets > 15%" | One operator behind many "holders" |
| Airdrop / zero-cost holders | holder reason "airdrop > 20%" | Tokens handed out to make the holder count look wide |
| Gas-less wallets | holder reason "wallets with no gas left hold x%" | Dormant or farmed wallets that can't even pay fees |
| Contract self-holding | holder reason "contract holds > 10% of itself" | Supply parked where it can be moved later |
| Rat traders | holder rating "Not recommended", rat > 5% | Front-running / farming wallets |

## Launch pattern

| Flag | Where | Why |
|---|---|---|
| Bundled launch | `bundlersPct` high, `--tag bundler` holders bought in the first block | Supply bought by one operator through many wallets |
| Snipers | `snipersPct` high | First-second buyers who tend to exit early |
| Insiders | `insidersPct`, `insider` tag | Wallets linked to the dev |
| Fresh-wallet swarm | `freshPct` ≥ 0.3–0.5 | Many new wallets = likely one person |
| Bot-heavy flow | `botPct` ≥ 0.5 | Volume and holder counts inflated |
| Wash trading | `wash` tags in holders / feeds | Fake volume |

## Dev

| Flag | Where | Why |
|---|---|---|
| Serial launcher | `dev.launches` in the hundreds or more with a low `migratedRatio` | Most coins died; or the address is a launcher bot |
| Rug history | `dev.rugRatio` ≥ 0.3 | GMGN marked earlier coins as rugs |
| Dev sold | `dev.status: "sold"`, `devHoldPct` dropping | Creator exited |
| Dev routed tokens | holder rating reason "dev chips routed to a top-100 wallet" | Dev holdings hidden in another wallet |
| Conduct risky | `dev.conduct.grade: "risky"` | History of dumping on holders |

A creator address with very large launch counts (the $CLAUDIA creator showed 171,280 launches on 2026-10-08) is
usually a launcher program wallet, not a person. Say so; don't read it as a human's track record.

## Signals worth reading

`cto` (pump.fun community takeover: fee settings can be reset), `bundler_sell` (bundled wallets started selling),
`dex_ad` / `dex_boost` (paid promotion), `pump_claim` (creator fees claimed), `price_spike`, `ath`.

## Off-chain

- The coin's own links (X, Telegram, website) are claims. Check whether the X account is new and whether the website
  asks visitors to connect a wallet to "claim" anything (a drainer pattern — see
  [wallet-and-key-security](../../wallet-and-key-security/SKILL.md)).
- A coin using Claudia's name or face that is not $CLAUDIA (`2j5SaS7xy776qCBpyPQbZjyQSAtKiFgrwjfErthnW2ZM`) is not
  hers. $CLAUDIA is the only official token.
