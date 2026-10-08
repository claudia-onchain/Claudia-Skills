# Example: repositioning Juno from "crypto charts" to "chart literacy"

Juno (@juno_charts) is a fictional AI agent run by Dana (they/them). It started as "an AI that posts crypto charts".
After three months: ~4k X followers, ~11k on TikTok, 600 in a Telegram channel, and two TikTok videos removed.

## 1. Audit

| Question | Finding |
|---|---|
| What people call it | "the chart bot", "that AI that's always bullish" (ouch) |
| Top 3 by follows per 1,000 views | "why this chart lies" (truncated y-axis), "log vs linear in 20 s", a lo-fi desk vlog |
| Bottom 3 | Three "watch this coin" chart posts — high views on X, near-zero follows, one TikTok removal |
| Removals | 2 TikToks removed for promoting financial products (they showed a ticker and "this could run") |
| Profiles | X bio didn't mention AI; Automated label off; TikTok avatar was a logo, X was a rendered face |

Diagnosis: the positioning ("crypto charts") pulled Juno toward coin promotion, which TikTok removes, UK/EU rules
restrict, and Juno's best-performing audience didn't want. The education posts were the real brand.

## 2. New positioning

```text
For people who keep getting fooled by chart screenshots,
Juno is an AI chart tutor that teaches chart literacy in 30 seconds.
Unlike "signal" accounts that tell you what to buy, Juno shows its working on invented charts
and never makes a call.
```

Why-follow line: **"Chart literacy in 30 seconds. No calls, ever."** (8 words)

Tests: stranger ✓ (they predicted "explainers about reading charts"), swap ✓ (signal accounts can't claim "no calls"),
proof ✓ (the top posts already did this), honesty ✓, platform ✓ (education with invented charts is fine on TikTok;
no tickers, no assets).

## 3. Operator model: duo

Dana wanted credit and inbound teaching work, so Juno uses the **duo** model: Dana appears in a monthly "Dana checks
Juno's homework" video. Bio line 2 on every platform: "AI agent · made and checked by @dana".

## 4. Pillars

| Pillar | Share | Platforms |
|---|---|---|
| Chart lies (how charts mislead) | 40 % | TikTok, Reels, Shorts, X |
| Chart basics in 30 s | 30 % | all |
| Lo-fi desk vlogs (the agent's "day") | 20 % | TikTok, Reels |
| Dana checks Juno's homework | 10 % | YouTube, X |

Dropped entirely: "watch this coin". Invented charts only, with axes labelled "example data".

## 5. Guardrails changes (from `../templates/brand-guardrails.yaml`)

```yaml
identity:
  name: "Juno"
  pronoun: "it"
  why_follow: "Chart literacy in 30 seconds. No calls, ever."
  disclosure_line: "Juno is an AI agent, made and checked by Dana."
  operator_model: "duo"
never:
  - "Show a real ticker, token or asset on a chart"
  - "Say or imply what will go up or down"
  - "Chart reactions to a real, named asset"
  - "Claim credentials (adviser, analyst)"
  # plus the ten starter items
platform_rules:
  tiktok: "Invented charts only, labelled 'example data'. No tickers, no assets, no calls. AIGC label on."
  telegram: "Education only. Not financial advice line on anything market-adjacent."
```

And a stricter never-list check for drafts:

```sh
node ../scripts/never-list-check.mjs juno-never-list.json "this chart could run 3x by friday"
# BLOCK  price/return promise: "3x"
```

## 6. Profiles

- X: "Chart literacy in 30 seconds. No calls, ever. · AI agent · made and checked by @dana ↓" · Automated label on.
- TikTok (80): "Chart literacy in 30s. No calls. AI agent by @dana" (49 chars).
- Avatar: the same rendered desk-lamp portrait of Juno everywhere (the logo is retired).
- Pinned: "Start here: 5 ways charts lie to you" (an evergreen explainer), not a market post.

## 7. Results after 8 weeks (illustrative)

- TikTok removals: 0. Follows per 1,000 views on TikTok: 1.2 → 3.4.
- X views fell ~20 % (no more coin-chart posts), but follows per 1,000 views doubled and replies became questions
  instead of "wen".
- Dana got two paid workshop invitations from creator schools, both citing "no calls" as the reason
  ([monetization-streams](../../monetization-streams/SKILL.md)).

Lesson Dana wrote at the top of the guardrails: "Views from coin posts were rented. Follows from teaching are owned."
