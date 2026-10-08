# Post-caption rules per platform (checked 2026-10)

Limits move; re-check before a campaign. [3P] = third-party source. `@useclaudia/social` enforces several of these in
`preview()`/`publish()` (labels, NFA, banned promises, daily caps, near-duplicates, link frequency, the X reply rule).

| Platform | Text limit | Hashtags | AI label | Notes |
|---|---|---|---|---|
| X | 280 chars on standard accounts; Premium 25,000 (feed collapses after ~280); every URL counts as 23 [3P: unilink.us, eden.so] | 0–1; one `$cashtag` max per API post | native `made_with_ai` via the package; account-level **Automated** label required for bots | API replies only to posts that @mention or quote the account (since Feb 2026); package cap 10 posts/day, 3 link posts/day |
| TikTok | 4,000 in-app; 2,200 through the API/schedulers [3P: recurpost.com] | no hard cap; 3–5 focused tags | AIGC toggle (`is_aigc`); auto-labels C2PA uploads | crypto promotion removed even organically — news/education only; package cap 5/day |
| Instagram | 2,200; 30 hashtags max, 3–5 recommended [3P] | 3–5 | "AI info" (`is_ai_generated`); Meta reads C2PA/IPTC | business accounts: Meta Sound Collection only; package cap 20/day |
| YouTube | title 100, description 5,000, tags 500 combined [3P: howmanywords.app] | up to 3 shown above the title | "altered or synthetic content" (`containsSyntheticMedia`) for realistic AI | keep titles ≤ 60 chars for mobile; package cap 5/day |
| Threads | 500 | 1 topic tag | via Meta | package cap 25/day |
| Bluesky | 300 | inline, few | text `(AI-generated)` | package cap 30/day |
| Mastodon | 500 (instance default) | CamelCase tags for screen readers | bot flag on the account, else text label | |
| Telegram | 4,096 (message) | rarely | text `(AI-generated)` | package cap 50/day |
| LinkedIn | 3,000 | 2–3 | text label | package cap 5/day, 3 link posts/day |

## Labels the package adds (don't remove)

- AI: native flag where one exists; else `(AI-generated)` (configurable with `rules.disclosureText`).
- Finance: `Not financial advice.` whenever the text mentions a `$TICKER`, coin/token, price or contract address.
- Paid: `#ad` with `labels.ad`, plus X `paid_partnership` and TikTok `brand_organic_toggle`.

## Blocked phrases (the package refuses the post)

"100x", "guaranteed returns", "can't lose", "risk-free", "to the moon by Friday", "will hit $1", "easy money",
"% daily returns"; in coin context also "10x", "guaranteed", "will pump", "will moon", "will double".

## Jurisdiction notes for coin content

- UK: promoting cryptoassets to UK consumers is a regulated financial promotion (FCA, since Oct 2023) — needs an
  FCA-authorised approver, the prescribed risk warning and a 24-hour cooling-off for first-time investors. An agent
  account should not invite UK users to buy a coin.
- EU: MiCA (since 30 Dec 2024) — crypto marketing must be fair, clear, not misleading, consistent with the white paper
  and marked as marketing.
- More: [../../../grow/crypto-marketing-compliance/SKILL.md](../../../grow/crypto-marketing-compliance/SKILL.md).
