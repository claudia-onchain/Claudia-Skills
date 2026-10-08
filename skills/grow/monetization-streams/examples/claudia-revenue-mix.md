# Worked example: Claudia's revenue mix

Illustrative numbers. Claudia is an AI character (X @claudia_onchain, TikTok); her operator is the legal account holder and
approves every deal, product and spend.

## Starting point (October 2026)

| Platform | Numbers (30/90 days) |
|---|---|
| TikTok | 48,200 followers · 1.9M views/30 d · median 21k views per video |
| X | 9,800 followers · 212 verified followers · 310k Home Timeline impressions/90 d |
| YouTube Shorts | 3,400 subscribers · 2.1M Shorts views/90 d |
| Instagram | 14,600 followers |
| Telegram channel | 1,450 subscribers |
| Discord | 820 members, server 4 months old |
| Monthly costs | X API ~$9, generation ~$60, posting service $16 = $85 |

## Step 1: tracker findings

- **TikTok Creator Rewards**: numbers clear the bar, but Claudia's videos are fully AI-generated, and 2026 reporting says
  those are excluded. The operator checked the in-app terms, then wrote "not pursuing" and moved on. TikTok stays her reach
  engine.
- **X Original Content Rewards**: 288 verified followers and 190k impressions short. Premium would cost money before any
  payout and the automated-account question needs an answer first. Decision: don't buy Premium yet; re-check in a month.
- **YouTube**: 7.9M Shorts views short of YPP. Fan funding (3M) is closer. If growth holds at ~0.7M/month she won't reach 10M
  by 31 January 2027, so the 20M bar from February will apply. Plan YouTube income at $0 for 2026.
- **Telegram**: eligible for the Ad Platform (1,000+ subscribers) and Stars right now.
- **Discord Server Subscriptions**: region eligibility unclear; checking.
- **Creator rewards**: Claudia has no coin of her own and won't launch one for income.

## Step 3: chosen streams

1. **Brand deals**, two a month, lifestyle fits only (headphones, coffee, travel eSIM). Anchor price: median 21k TikTok
   views × $25 CPM ≈ $525 per TikTok; Reel $400; bundle $900 with 30-day usage rights. First deal: Northpine headphones,
   one TikTok + one Reel, `#ad`, AI-labelled. Caption line: "Claudia styled tonight's rooftop look around Northpine's
   Halo headphones (#ad, AI-generated character)". No "I've worn these for weeks".
2. **Rainy City wallpaper pack**, $9: 12 phone + 4 desktop wallpapers from the diaries series. Product page says AI-made,
   personal-use licence, 7-day refunds.
3. **Telegram weekly bonus diary**, a Stars paid post at 150 Stars (~$1.95 at the benchmark rate).
4. **Telegram Ad Platform**: switched on; expected $5–30/month at 1,450 subscribers.

Not chosen: crypto exchange affiliate offers (two arrived; declined: UK and TikTok rules, and off-brand); "AI UGC
testimonial" requests from a skincare brand (declined: fake-review risk; offered labelled character content instead).

## Step 3 totals

```text
$ node scripts/revenue-mix.mjs claudia-plan.csv
Revenue mix — claudia-plan.csv
  Streams            7
  Planned per month  low $765 (eligible streams only) · high $4,230
  Actual last month  $0
  Hours per month    28
  Costs per month    $85 (actual $85)
  Net (low)          $680
  Largest stream     Brand deals (2 per month): 78% of low
  Per hour (low)     $27
  ! One stream is 78% of income. Aim for no stream above 50% after month 6.
```

The concentration warning is expected in month 1. The plan for months 2–6: a second product (presets), and the bonus
diary subscription moved from paid posts to a Star subscription.

## Step 6: announcement, approved

```sh
claudia post telegram "New: the Rainy City wallpaper pack. 12 phone + 4 desktop wallpapers from the diaries. My own pack, made with AI. Link in the pinned post." --media pack-preview.jpg --dry-run
```

Preview showed the `(AI-generated)` label added, 141/1,024 caption characters, no cost on Telegram. Operator approved; posted
once.

## Month 1 actuals (November)

| Stream | Low plan | Actual |
|---|---|---|
| Brand deals | $600 | $900 (Northpine bundle) |
| Wallpaper pack | $120 | $214 (24 sales, 2 refunds) |
| Bonus diary (Stars) | $40 | $31 (≈ 2,400 Stars, withdrawable from day 21) |
| Telegram ads | $5 | $11 |
| **Total** | $765 | **$1,156** |
| Costs | $85 | $93 |

Ledger rows were added on receipt with FX rates; the Stars income was logged at withdrawal value in December because of the
21-day hold, with a note on the November receipt date.
