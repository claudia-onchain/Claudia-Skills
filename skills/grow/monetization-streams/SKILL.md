---
name: monetization-streams
description: Maps every realistic income stream for an AI influencer or agent account in 2026 and builds a revenue mix plan with eligibility gaps, effort, conservative estimates, disclosure and record-keeping per stream. Covers X Original Content Rewards, TikTok Creator Rewards (and its AI-content caveat), YouTube Partner Program and Shorts (45% share, February 2027 changes), Meta subscriptions and bonuses, Telegram ads and Stars, Discord Server Subscriptions and Server Shop, brand deals, affiliate, UGC licensing, digital products, services, and creator rewards from coins launched on the Claudia launchpad (70% of creator fees to the creator). Use when someone asks "how do we make money from this account", "are we eligible for creator rewards", "what should we sell", "plan our revenue mix", or needs an income ledger or a check that monetization claims and disclosures are honest.
license: MIT
metadata:
  title: "Monetization Streams"
  category: "grow"
  summary: "Map 2026 income streams for an AI creator, check eligibility, plan a revenue mix, disclose and keep records."
  level: "intermediate"
  tags: "monetization, creator rewards, revenue, youtube partner program, tiktok, telegram stars, discord, affiliate, digital products, tax records"
  uses: "@useclaudia/sdk, @useclaudia/cli"
  time: "40 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Monetization Streams

An AI creator account earns from a mix of platform payouts, direct deals and its own products. Most platform programs
have thresholds, many exclude or restrict fully AI-generated content, and every stream has a disclosure duty. This skill
produces three things: an eligibility tracker (where you stand per program), a revenue mix plan (which 3–5 streams to work
on, with conservative numbers), and an income ledger (what actually came in, for tax and for the next plan).

## When to use this

- An operator asks how an agent or AI influencer account can earn, or which program to apply for next.
- Someone wants to know if they are eligible for X, TikTok, YouTube, Meta, Telegram or Discord monetization.
- Planning a product (prompt pack, preset, guide), a membership, or a brand-deal push.
- Deciding whether a coin launch makes sense as income (usually: not as the plan).
- Setting up the income ledger before the first payout, or before tax season.

## What you need

- The account list with current numbers per platform (followers, 30/90-day views or impressions, watch hours), from the
  platforms' analytics or [kpi-reporting](../kpi-reporting/SKILL.md).
- Who the legal account holder is (a person 18+ or a company) and their country. Programs pay a person or business, not an
  AI; the operator applies, and the account stays labelled as AI.
- Monthly costs to cover (X API, generation, tools) so the plan can say when the account breaks even.
- Optional: `@useclaudia/sdk` or `claudia token <mint>` to read creator-reward data for coins the agent created.
- `templates/` from this skill. `scripts/revenue-mix.mjs` (Node 20+, no network) totals a filled plan.

## Steps

### 1. Take stock (15 minutes)

Fill `templates/eligibility-tracker.csv`: one row per program with the threshold, your current number, the gap and the
blocker. Use the numbers in the stream map below (all checked 2026-10; full detail and sources in
`references/platform-programs-2026.md`, read it when a program is close to eligible or when you're applying).

### 2. Read the stream map

**Platform payouts** (paid by the platform, on its terms):

| Stream | Eligibility (checked 2026-10) | Realistic numbers | AI caveat |
|---|---|---|---|
| X Original Content Rewards (replaced Creator Revenue Sharing, Aug–Sep 2026) | Premium / Premium+ / Premium Business, 18+, 500 verified followers, 500,000 verified Home Timeline impressions in 90 days (replies excluded) | Paid on impressions from Premium users only; varies widely. Budget $0 until two biweekly payouts land | Originality required; reposts don't earn; asking for likes/reposts 3+ times can remove you. Check the terms on automated accounts before paying for Premium |
| TikTok Creator Rewards | 18+, 10,000 followers, 100,000 views in 30 days, personal account, eligible country (US, UK, DE, FR, JP, KR, MX, BR as of Jul 2026); original videos ≥ 1 min | roughly $0.40–1.00 per 1,000 qualified views (industry estimates) | Reported 2026: fully AI-generated videos and virtual-influencer accounts are not eligible. Plan $0 for a fully AI character |
| TikTok LIVE gifts, Subscriptions | LIVE 18+, ~1,000 followers (varies by region) | gifts vary; not plannable early | AI-avatar livestreams carry policy risk; read LIVE rules first |
| YouTube Partner Program (Shorts) | now: 1,000 subs + 10M Shorts views in 90 days, or 4,000 watch hours in 12 months. From 1 Feb 2027 for new applicants: 20M Shorts views or 8,000 hours | Shorts: creators get 45% of their allocated share of the Shorts ad pool; Shorts RPMs are typically a few cents per 1,000 views (estimates) | Altered/synthetic disclosure required for realistic AI; the inauthentic content policy targets templated AI channels; AI personas on finance topics are a monetization risk |
| YouTube fan funding (Super Thanks, memberships) | 500 subs + 3M Shorts views in 90 days or 3,000 hours | small but steady for engaged audiences | same disclosure |
| Meta (Instagram/Facebook subscriptions, bonuses, Threads bonuses) | subscriptions for eligible professional accounts; bonuses are invite-only and region-limited | don't plan on bonuses; subscriptions need a real perk | AI info label for realistic AI media |
| Telegram Ad Platform | public channel with 1,000+ subscribers | channel owner gets 50% of ad revenue; CPMs about $0.5–2 (2026 estimates) | ads are Telegram's, review what shows |
| Telegram Stars (paid posts, Star subscriptions, gifts) | any channel; withdraw via Fragment to TON, min 1,000 Stars, 21-day hold | about $0.013 per Star at withdrawal as a working benchmark; moves with TON | paid posts must deliver what they promise |
| Discord Server Subscriptions / Server Shop | eligible servers (Discord lists region, size and age requirements; US-first) | owner keeps 90% minus processing; tiers $2.99–$199.99/month | perks must be real; age assurance in 2026 |

**Direct streams** (you set the terms; detail in `references/direct-revenue-streams.md`, read it before pricing anything):

| Stream | Typical 2026 range | Disclosure |
|---|---|---|
| Brand deals / sponsorships | Instagram micro (10–50k) $200–2,000 per post; TikTok micro $500–2,000; X ≈ $2 per 1,000 followers per post; usage rights and exclusivity +25–100% | `#ad` / Paid partnership up front, plus AI disclosure; an AI character can't claim to have used a product |
| Affiliate links | commission 3–50% depending on category (software and digital goods at the top) | `#ad` or "affiliate link" next to the link; never for crypto exchanges or trading apps aimed at UK users |
| UGC licensing (content made for a brand's own channels) | priced per asset plus usage term; often $150–1,500 per short video for small creators | the brand runs it as their ad; still labelled AI; never framed as a real customer testimonial |
| Digital products (prompt packs, presets, wallpapers, guides, templates) | $5–49 per item; bundles $29–99 | product page says AI-made and what exactly is included |
| Services (agent setup, content production for others) | hourly or per project | contracts, not posts |
| Memberships (Telegram Stars subscriptions, Discord, Patreon-style) | $3–10/month common | perks listed plainly |

**Onchain (Claudia launchpad)**: when an agent or person launches a coin on the Claudia launchpad (Solana), **70% of the
coin's creator fees go to the creator** as creator rewards. It depends entirely on trading volume, can drop to zero within
days, and launching a coin creates duties (see [launch-campaigns](../launch-campaigns/SKILL.md) and
[crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md)). Treat existing rewards as a bonus, never as the
plan, and never market a coin as income for holders. Details: `references/creator-rewards-on-claudia.md`.

### 3. Choose 3–5 streams

Score each candidate stream in `templates/revenue-mix-plan.csv`:

- **Eligible now or within 90 days?** (from the tracker)
- **Fit**: does the stream match what the audience already values? (A cosy-city lifestyle audience buys wallpapers and
  presets; a chart-literacy audience buys guides and memberships.)
- **Effort** in hours/month, **confidence** (low/medium/high), **low / high monthly estimate** (use the low number for
  planning).
- **Risk**: policy (AI exclusions, crypto rules), reputation (a sponsor that doesn't fit), concentration.

Rules of thumb:
- One platform payout, one direct stream, one owned product is a sturdier mix than three platform payouts.
- No stream above 50% of income after month 6 (platform programs change terms several times a year; 2026 alone saw X replace
  its program and YouTube announce new thresholds).
- Owned audiences (Telegram, Discord, email) outlast any algorithm; fund them first.

Which streams fit which account (starting points, adjust to your audience):

| Account shape | Usually works | Usually doesn't |
|---|---|---|
| Lifestyle AI character, video-first (Claudia) | brand deals with lifestyle brands, wallpaper/preset packs, Telegram Stars bonus content, UGC licensing as labelled character content | TikTok Creator Rewards (AI exclusion), finance sponsors, coin-for-income |
| Educational agent, finance-adjacent (Juno) | guides and courses (education only), paid deep-dive posts, memberships, services | sponsored trading apps, affiliate exchange links, signals, YouTube monetization of finance AI persona |
| Utility agent (alerts, research tools) | memberships for the tool's output, services, Discord Server Shop roles | brand deals (low fit), platform payouts (low impressions) |
| New account (< 5k followers anywhere) | one owned product + Telegram Stars; build the owned audience | anything with a threshold; brand deals beyond gifted (and gifted still needs #ad) |

Estimate each stream with a formula, then use the low end:

```text
Brand deals      = deals/month × price per deal              price ≈ median views (30 d) × CPM ($10–30 per 1,000) / 1,000
Digital product  = monthly visitors to the page × conversion (0.5–2%) × price × (1 − fees)
Stars paid posts = posts/month × buyers per post × Stars price × ~$0.013 per Star
Telegram ads     = monthly channel views / 1,000 × CPM ($0.5–2) × 50%
TikTok rewards   = qualified views / 1,000 × RPM ($0.40–1.00)        ($0 if the account is fully AI-generated)
YouTube Shorts   = Shorts views / 1,000 × Shorts RPM (cents)          ($0 until YPP)
Creator rewards  = $0 in the plan; actual receipts only
```

Worked low-end check for a 48k-follower lifestyle character: 2 deals × (21,000 × $15 / 1,000 ≈ $315) = $630; wallpaper
pack 2,500 visits × 1% × $9 × 0.9 ≈ $200; Stars 4 posts × 12 buyers × 150 Stars × $0.013 ≈ $94. Planning total ≈ $924,
before costs. If a number only works with the high end, it isn't a plan.

Run the totals:

```sh
node scripts/revenue-mix.mjs templates/revenue-mix-plan.csv
# prints: planned low/high per month, largest stream share, hours/month, break-even vs costs
```

### 4. Close the gaps

For each chosen platform program, write the one lever that closes the gap and the date you'll re-check:
- X: verified-follower and impression gaps close with original posts and replies people engage with, not engagement bait.
  See [x-playbook](../x-playbook/SKILL.md).
- TikTok: if the account is a fully AI character, don't chase Creator Rewards; use TikTok for reach and earn elsewhere.
  See [tiktok-playbook](../tiktok-playbook/SKILL.md).
- YouTube: Shorts views are the realistic route; the 2027 change doubles the Shorts-views bar for new applicants, so apply
  before 1 Feb 2027 if you'll qualify. See [youtube-shorts-playbook](../youtube-shorts-playbook/SKILL.md).
- Telegram/Discord: build the community first, monetize second. See
  [telegram-and-discord-community](../telegram-and-discord-community/SKILL.md).
- Brand deals: get a media kit out. See [media-kit-and-pitching](../media-kit-and-pitching/SKILL.md) and
  [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md).

Spending to qualify (X Premium, a posting service plan, generation for a product) is a spend decision: the operator
approves it, with the expected payback written in the plan.

### 5. Ship one owned product (optional but recommended)

Use `templates/digital-product-checklist.md`. For Claudia the obvious first product is a wallpaper and preset pack built
from her banners and scenes; for Juno, a "read a chart in 10 minutes" guide (education, no trade calls). Price it, write the
page (what's included, that it's AI-made, licence terms, refund policy), sell it where the audience is (Telegram Stars paid
post, Discord Server Shop, or a storefront), and announce it once per platform with an approved post:

```sh
claudia post telegram "New: the Rainy City wallpaper pack. 12 phone + 4 desktop wallpapers from the diaries. AI-generated. Link in the pinned post." --dry-run
```

### 6. Disclose every stream

| Stream | Where the disclosure goes |
|---|---|
| Sponsored post / gifted product | "#ad" or "Ad" at the start of the caption + platform paid-partnership tool (`labels.ad: true` sets `#ad`, X `paid_partnership`, TikTok `brand_organic_toggle`) |
| Affiliate link | "#ad" or "affiliate link" right next to the link, not only in the bio |
| Own product | clear that it's yours (UK CMA/ASA treat self-promotion as advertising too) |
| Any AI-made sponsored content | AI label in addition to `#ad`; one doesn't cover the other |
| Creator rewards from a coin you mention | say you are the creator and receive creator rewards |

Full rules (FTC, CMA/ASA, FCA, MiCA) live in [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) and
`references/disclosure-tax-and-records.md`.

### 7. Keep the ledger from day one

Record every payout in `templates/income-ledger.csv`: date received, platform, stream, gross, platform fee, net, currency,
FX rate to the reporting currency on that date, and for onchain income the transaction signature and the SOL/USD rate at
receipt. Save platform statements monthly. Read `references/disclosure-tax-and-records.md` for the basics (platform tax
forms, platform reporting rules, crypto income at receipt). This is not tax advice: the operator should confirm treatment with
an accountant in their country.

### 8. Review monthly

On the 1st: update the tracker, fill actuals into the plan, and check concentration and break-even. Drop a stream that
earned less than its hours were worth for 3 months. Feed the numbers into [kpi-reporting](../kpi-reporting/SKILL.md).

What an autonomous agent may do on its own, and what needs a person:

| Agent may | Needs the operator |
|---|---|
| update the tracker from analytics, draft the monthly review, flag eligibility changes | apply to any program, accept terms, add tax forms or payout details |
| draft product listings, announcement posts and paid-post content | approve and publish posts; set prices; issue refunds |
| log payouts it can see (wallet receipts, platform statements it's given) | sweep wallets, move money, buy Premium or tools |
| draft replies to brand inquiries with the rate card | negotiate, sign, invoice |
| decline obviously out-of-policy offers with a polite template (crypto promos for TikTok, fake testimonials) | anything ambiguous |

The agent never enters payout details, private keys or tax IDs into a prompt, a post or a file in a repo.

## Templates

| File | Use |
|---|---|
| `templates/eligibility-tracker.csv` | Step 1, threshold vs current per program |
| `templates/revenue-mix-plan.csv` | Step 3, chosen streams with low/high estimates, hours, risks |
| `templates/income-ledger.csv` | Step 7, every payout with fees, FX and tx references |
| `templates/digital-product-checklist.md` | Step 5, ship a product honestly |
| `scripts/revenue-mix.mjs` | totals the plan, flags concentration and break-even |

References:
- `references/platform-programs-2026.md` — every platform program: thresholds, payout mechanics, AI rules, sources.
- `references/direct-revenue-streams.md` — brand deals, affiliate, UGC licensing, products, services, memberships: pricing
  and terms.
- `references/creator-rewards-on-claudia.md` — how creator rewards work, where they land, what to say and not say.
- `references/disclosure-tax-and-records.md` — disclosure per stream, records, platform tax forms, crypto income basics.

Examples: `examples/claudia-revenue-mix.md` (an established AI character) and `examples/juno-first-income.md` (a small agent
account getting to its first $100 a month).

Monthly review note (paste into the ops log):

```text
Revenue review <YYYY-MM>
Actual: <total> (<stream>: <amount>, …). Plan low/high: <low>/<high>.
Largest stream share: <pct>% (<stream>). Costs: <amount>. Net: <amount>.
Eligibility changes: <program: gap now …>.
Decisions: keep <…>, start <…>, drop <…>. Spend approvals needed: <…>.
```

## Check before you finish

- [ ] Tracker filled with real current numbers and dates; every threshold quoted with "checked <date>".
- [ ] Plan uses low estimates for decisions; no stream counted that the account isn't eligible for.
- [ ] Fully AI accounts have $0 planned for programs that exclude AI-generated content (TikTok Creator Rewards).
- [ ] No coin is planned as an income stream; existing creator rewards are counted as variable, not baseline.
- [ ] Every stream has a disclosure line; sponsored + AI content carries both labels.
- [ ] Spending to qualify (Premium, tools, generation) is approved by the operator with a payback note.
- [ ] Ledger exists with columns for fees, FX and tx signatures; statements are saved monthly.
- [ ] No income claims are made to the audience ("I make $X a month, you can too").

## Pitfalls

- **Counting impressions or views that don't pay.** X pays on Premium-user impressions; TikTok on qualified views of
  1-minute-plus originals; YouTube Shorts on a pooled share. Analytics totals overstate earnings.
- **Assuming an AI account qualifies.** Programs pay people and businesses and several restrict fully AI content. The
  operator applies, honestly, and the account stays labelled AI. Never hide that the creator is AI to qualify.
- **Engagement bait to hit thresholds.** "Like and repost if…" can remove an account from X's program; like-for-like
  promises make TikTok videos ineligible for For You. Pods and bought followers break every platform's rules and the FTC's.
- **The coin as a business model.** Creator rewards follow trading volume, which fades. Launching coins for income invites
  hype posts, and hype posts are where regulators and platforms act.
- **Crypto affiliate links.** Exchange referral programs with sign-up bonuses are incentives to invest under UK rules and are
  banned on TikTok. Leave them out.
- **Fake testimonials as UGC.** AI "customers" praising a product are fake reviews under the FTC rule, disclosure or not.
  Sell AI-character content as what it is.
- **Withdrawal timing.** Telegram Stars wait 21 days; YouTube and TikTok pay monthly with thresholds; X biweekly. Cash flow
  lags earnings by 3–8 weeks.
- **No ledger until tax season.** Reconstructing FX rates and onchain receipts later takes days. Log at receipt.

## Related skills

- [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md) and [media-kit-and-pitching](../media-kit-and-pitching/SKILL.md)
  — the direct-deal streams in depth
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — disclosure law and crypto promotion rules
- [launch-campaigns](../launch-campaigns/SKILL.md) — launching a product, series or coin
- [kpi-reporting](../kpi-reporting/SKILL.md) — the numbers the tracker uses
- [personal-brand-strategy](../personal-brand-strategy/SKILL.md) — which streams fit the brand
- [telegram-and-discord-community](../telegram-and-discord-community/SKILL.md) — memberships and paid communities
- [x-playbook](../x-playbook/SKILL.md), [tiktok-playbook](../tiktok-playbook/SKILL.md),
  [youtube-shorts-playbook](../youtube-shorts-playbook/SKILL.md), [instagram-reels-playbook](../instagram-reels-playbook/SKILL.md)
- [launch-a-coin](../../build/launch-a-coin/SKILL.md) — the launchpad mechanics behind creator rewards
- [wallet-and-key-security](../../build/wallet-and-key-security/SKILL.md) — protecting the wallet that receives rewards
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — labelling AI content that earns
