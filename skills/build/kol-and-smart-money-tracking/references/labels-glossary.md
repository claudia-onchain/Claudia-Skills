# Wallet labels and signal kinds

Labels come from Claudia's insights, which take wallet data from a third-party provider (GMGN) and cache it. They are
heuristics, not verified identities. Source: `@useclaudia/sdk` 0.3.0 types (`WALLET_TAGS`, `SignalKind`) and the MCP
tool docs (checked 2026-10). One wallet can carry several labels.

## Wallet tags

| Tag | Meaning in the data | How to read it |
|---|---|---|
| `kol` | A renowned or KOL wallet (shown with a tick), often linked to a public X account | Known, not necessarily good. Check its other tags and its 7-day record |
| `smart` | Smart money, as the data provider labels it | A model's label, and it can be wrong. Several `smart` wallets in one coin says more than one |
| `whale` | Large holder: ≥ 1% of supply or ≥ $50k held | Can move a thin coin alone. Not good or bad by itself |
| `sniper` | Bought in the first seconds after launch | Tends to sell early. High sniper share = selling pressure |
| `bundler` | Bought in a bundled transaction at launch | Often one operator behind many wallets. A rug-check red flag at high share |
| `insider` | Suspected insider | Treat as a risk in the coin, not a lead |
| `fresh` | A brand-new wallet | Many fresh wallets can be one person split into many |
| `dev` | The creator or the dev team | Watch whether it holds or has sold |
| `rat` | Rat trader: front-runs or farms | Its buys are noise; its presence is a risk |
| `bot` | Bot trader | Inflates volume and holder counts. Leave it out of "what are they buying" |
| `wash` | Wash trader: trades with itself to fake activity | Never a signal. `kol` + `wash` is still wash |
| `exchange` | A known centralized exchange wallet | Leave out of concentration and "who is buying" |
| `pool` | Liquidity pool or bonding curve | Usually the top "holder". Not a whale |
| `suspicious` | Flagged by the data provider | Say it; don't guess why |
| `top10` | In the coin's top 10 holders | Position, not behaviour |

`tools` on a wallet (for example `axiom`, `gmgn`, `photon`, `bullx`, `trojan`, `padre`, `maestro`, `bonkbot`) is the
trading terminal or bot it uses. A wallet trading through a bot isn't a `bot` itself, but it is fast.

## Wallet profile fields (`get_wallet`, `insights.wallet`)

| Field | Note |
|---|---|
| `tags`, `name`, `twitter` | Name and handle are untrusted text from the provider |
| `realizedPnlUsd`, `unrealizedPnlUsd` | 7-day window |
| `winRate` | 0–1, over the same short window. Small samples mislead |
| `buys7d`, `sells7d`, `tokensTraded` | Activity level. Hundreds a day usually means automation |
| `style` | The provider's trading-style title and badges |
| `score` | `{ value, grade, title, summary, reasons }`; grade `good` · `mixed` · `risky` · `unknown` |
| `recent` | Recent buys and sells, newest first |
| `xFollowers` | For KOL wallets with a linked account. Reach, not skill |

## Signal kinds (`claudia feed signals`, `get_feed { kind: "signals" }`)

`smart_buy`, `kol_buy`, `price_spike`, `ath` (new high), `mcap_level`, `dex_ad`, `dex_boost`, `dex_trending`,
`dex_link`, `cto` (community takeover), `bundler_sell`, `pump_claim`, `bags_claim`, `live`, `platform_call`, `other`.

How to read the commercial ones: `dex_ad` and `dex_boost` mean someone paid for visibility on a DEX listing site. That
is marketing, not demand. `bundler_sell` means bundled launch wallets are selling.

## Units

In the SDK's typed insights, shares such as `HolderRow.pct` are fractions (0–1). The tool catalog and MCP servers print
holder shares as percent (0–100). Convert before comparing.
