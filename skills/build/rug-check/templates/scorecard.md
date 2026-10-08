# Rug check scorecard

**Coin:** $<TICKER> · `sol:<full mint>` · launched by <person | agent @slug (tier) | unknown>
**Checked:** <YYYY-MM-DD HH:MM> UTC · data <N> s old · partial: <none | text> · checked by <agent / person>

Level: 🟥 red · 🟧 amber · 🟩 green · ⬜ unknown (never turn unknown into green)

| # | Group | Check | Value | Level | Note |
|---|---|---|---|---|---|
| 1 | Contract | Mint authority renounced | <yes/no> | | |
| 2 | Contract | Freeze authority renounced | <yes/no> | | |
| 3 | Contract | Not a honeypot | <yes/no> | | Honeypot = stop |
| 4 | Contract | Buy / sell tax | <b>% / <s>% | | |
| 5 | Liquidity | LP locked or burned (migrated) | <locked · burned %> | | Curve coins: no LP yet |
| 6 | Liquidity | Liquidity vs mcap | <x>% | | |
| 7 | Holders | Top-10 share (pool excluded) | <x>% | | |
| 8 | Holders | Largest non-pool wallet | <x>% (<tags>) | | |
| 9 | Holders | Dev holding | <x>% · status <holding/sold> | | |
| 10 | Wallet mix | Bundlers | <x>% | | |
| 11 | Wallet mix | Snipers | <x>% | | |
| 12 | Wallet mix | Insiders | <x>% | | |
| 13 | Wallet mix | Fresh wallets | <x>% | | |
| 14 | Wallet mix | Bots | <x>% | | |
| 15 | Dev | Dev rug ratio (GMGN) | <x>% / n/a | | |
| 16 | Dev | Dev total score | <v> <grade> · <title> | | |
| 17 | Age | Coin age | <h/d> | | |
| 18 | Scores | Safety | <v> <grade> · <title> | | top reasons: |
| 19 | Scores | Holders | <v> <grade> · <title> | | |
| 20 | Scores | Chart | <v> <grade> · <pattern> | | price history only |

## Thresholds (fractions of total supply unless noted)

| Check | 🟩 | 🟧 | 🟥 |
|---|---|---|---|
| Tax | 0% | > 0% | ≥ 10% |
| Liquidity / mcap | ≥ 10% | 3–10% | < 3% |
| Top 10 | < 30% | 30–50% | ≥ 50% |
| Largest wallet | < 5% | 5–10% | ≥ 10% |
| Dev holding | < 1% | 1–5% | ≥ 5% |
| Bundlers | < 10% | 10–25% | ≥ 25% |
| Snipers / insiders | < 5% | 5–15% | ≥ 15% |
| Fresh | < 30% | 30–50% | ≥ 50% |
| Bots | < 50% | 50–75% | ≥ 75% |
| Dev rug ratio | < 30% | 30–60% | ≥ 60% |
| Age | ≥ 24 h | 1–24 h | < 1 h |
| Scores | good | mixed | risky |

## Patterns beyond the table
- [ ] Linked holders (same `fundedBy`)  - [ ] Bundlers still holding from block 1  - [ ] Dev sold → fresh wallet bought
- [ ] Gas-less wallets hold a large share  - [ ] Signals: cto / bundler_sell / dex_boost  - [ ] Copycat name or logo
- [ ] Website asks to connect a wallet to "claim"

## Totals and verdict
<r> red · <a> amber · <g> green · <u> unknown

Verdict: <one of: STOP: flagged as a honeypot. · Major red flags. Do not go further without a much deeper look. · Red
flags present. Read each red row before going further. · Caution: several amber rows. · Too little data to judge.
Try again later; unknown is not the same as safe. · No major flags in this data. That is not a safety guarantee.>

Research aid, not financial advice.
