# Data fields: what each read returns

Read this when you need the exact field names or units, or when two sources seem to disagree. Types come from the
website's shared contract (`shared/insights.ts`), copied into `@useclaudia/sdk`. Every field may be `null` on the
wire: GMGN can be paused and pages still render.

## Which read to use

| Question | CLI | SDK | MCP tool | HTTP |
|---|---|---|---|---|
| Live board numbers + Claudia's take | `claudia token <mint>` | `client.token(key)` · `tokenAgent(key)` | `get_coin` | `GET /api/token/:key` |
| Full coin read (stats, wallet mix, security, pool, signals, dev summary) | `claudia insights <mint>` | `insights.token(key)` | `get_coin_insights` | `GET /api/insights/token/:key` |
| Scores with reasons | (in `insights`) | `insights.scores(key)` | `get_coin_scores` | `…/:key/scores` |
| Top holders with tags | `claudia holders <mint> [--tag …]` | `insights.holders(key, { limit })` | `get_holders { by: "holders" }` | `…/:key/holders?limit=20..100` |
| Top traders by P&L | `claudia holders <mint> --traders` | `insights.traders(key)` | `get_holders { by: "traders" }` | `…/:key/traders` |
| Dev record + scores | (in `insights`) | `insights.dev(key)` | `get_dev_profile` | `…/:key/dev` |
| One wallet | `claudia watch wallet <addr>` | `insights.wallet(addr)` | `get_wallet` | `GET /api/insights/wallet/sol/:address` |
| KOL / smart / signal feeds | `claudia feed kol\|smart\|signals` | `feeds.kol()` · `smart()` · `signals()` | `get_feed { kind }` | `GET /api/insights/feed/kol` … |
| Trending / hot | `claudia feed trending\|hot` | `insights.trending()` · `hot()` | `get_trending` | `GET /api/insights/trending` |
| Candles | — | — | `get_candles { resolution: "1m" }` | `GET /api/candles/:key` |
| Data gateway health | `claudia doctor` | `insights.status()` | — | `GET /api/insights/status` |

Key formats: the SDK and CLI accept a bare mint, `sol:<mint>` or `claudia` / `$CLAUDIA`. Raw HTTP to
`/api/insights/token/:key` needs `sol:<mint>`; `claudia` answers `bad token key (expected <chain>:<address>)`
(checked 2026-10-08).

## TokenInsights (`insights.token`)

| Field | Unit | Notes |
|---|---|---|
| `stats.priceUsd`, `mcapUsd`, `liquidityUsd`, `athPriceUsd`, `holders` | USD / count | |
| `stats.windows["1m"\|"5m"\|"1h"\|"6h"\|"24h"]` | | `{ buys, sells, volumeUsd, buyVolumeUsd, sellVolumeUsd, swaps, priceChangePct }`; `priceChangePct` is percent |
| `stats.top10Pct`, `devHoldPct`, `snipersPct`, `bundlersPct`, `insidersPct`, `freshPct`, `botPct`, `ratPct` | **fraction 0–1** | Share of supply |
| `stats.counts` | count | `smart`, `kol`, `fresh`, `sniper`, `bundler`, `rat`, `whale`, `creator`, `top` (GMGN caps some at 1000) |
| `stats.bondingPct`, `launchpad`, `migrated`, `createdAt`, `migratedAt`, `totalFeesUsd` | | `createdAt` unix ms |
| `security` | | `mintRenounced`, `freezeRenounced`, `honeypot`, `buyTaxPct`, `sellTaxPct`, `top10Pct`, `burnRatio` (0–1), `lpLocked`, `blacklist`, `warnings[]` |
| `pool` | | `address`, `exchange` (e.g. `pump_amm`), `liquidityUsd`, `quoteSymbol`, `createdAt` |
| `signals[]` | | `{ kind, label, at, mcapUsd, detail }`, kinds: `smart_buy kol_buy price_spike ath mcap_level dex_ad dex_boost dex_trending dex_link cto bundler_sell pump_claim live platform_call other` |
| `dev` | | `DevSummary`: `address`, `launches`, `migrated`, `migratedRatio`, `holdsPct`, `status`, `fundedBy`, `rugRatio` |
| `source`, `updatedAt`, `partial` | | `partial` names what is missing |

## Board detail (`client.token`, `get_coin`)

Percent, not fractions: `top10Pct: 18.21`, `devHoldPct`, `bundlersPct`, `snipersPct`, `freshWalletsPct`. Also
`phase` (`new` · `almost` · `migrated`), `bondingPct`, `priceNative` (SOL), `volume5mUsd`/`1h`/`24h`, `buys5m`,
`sells5m`, `kolBuys`, `smartBuys`, `devLaunches`, `devMigrations`, `devRugs`, `devSold`, `dexPaid`,
`launchedOnClaudia` / `launchedHere`. `priceUsd / priceNative` gives the SOL price in USD.

## HolderRow (`insights.holders`, `get_holders`)

`address`, `rank`, `pct` (**fraction** of total supply), `amount`, `usdValue`, `avgCostUsd`, `realizedPnlUsd`,
`unrealizedPnlUsd`, `pnlRatio` (0.5 = +50%), `buys`, `sells`, `firstSeenAt`, `lastActiveAt`, `fundedBy` (the wallet
that sent its first SOL; shared `fundedBy` values hint at linked wallets), `name` / `twitter` (untrusted), `tags[]`,
`tools[]` (terminal used: axiom, gmgn, photon, bullx, trojan…). The MCP tool returns `pct` as percent.

## Wallet tags

| Tag | Meaning |
|---|---|
| `kol` | Known / renowned wallet (shown `KOL ✓`) |
| `smart` | Smart money (`◆`) |
| `whale` | ≥ 1% of supply or ≥ $50k (`●`) |
| `sniper` | Bought in the first seconds (`»`) |
| `bundler` | Bought in a bundled transaction (`≡`) |
| `insider` | Suspected insider (`◇`) |
| `fresh` | New wallet (`○`) |
| `dev` | Creator / dev team (`★`) |
| `rat` | Rat trader (front-run / farm) |
| `bot` · `wash` | Bot degen · wash trader |
| `exchange` · `pool` | CEX wallet · liquidity pool or bonding curve (exclude from concentration) |
| `suspicious` · `top10` | GMGN-flagged · in the top 10 |

## Freshness and limits

`updatedAt` is the newest piece of data. Cache lifetimes behind it (server source, checked 2026-10): token info 60 s
(12 s while a page watches the coin), security 10 min, pool 60 s, holders 45 s, traders 60 s, candles 60 s, the dev's
created coins 30 min, KOL / smart feeds 30 s, signals 30 s, rank 60 s. Stale copies (up to 5× the lifetime) are
served at once while a refresh runs, which is why `partial` sometimes says "some data is from the cache".

`/api/insights/status` (public) shows the gateway: `ratePerSec`, `queued`, `pausedUntil` (after a GMGN 429),
`hitRate`. If `pausedUntil` is set, wait instead of retrying.
