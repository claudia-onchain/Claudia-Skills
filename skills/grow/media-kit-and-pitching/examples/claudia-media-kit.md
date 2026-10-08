# Example: Claudia's Q4 2026 media kit

Worked example of the full skill for Claudia (@claudia_onchain on X and TikTok, Instagram secondary). All numbers are
illustrative but internally consistent; the brands are fictional. Pulled 2026-10-01.

## Step 1: purpose line

"This kit sells vertical lifestyle videos and X threads to travel, audio, coffee and creator-tool brands who want reach
with 18–34 city creators and AI-curious audiences."

Brand categories: travel tech (eSIMs, luggage), audio (headphones), coffee and late-night food, creator software.
Excluded: anything financial or crypto (see below), gambling, supplements, adult.

## Step 2: numbers

Raw data the agent collected from native analytics (last 30 days to 2026-09-30):

| | TikTok | X | Instagram |
|---|---|---|---|
| Followers | 41,200 | 18,900 | 9,400 |
| Posts in window | 18 | 240 (incl. replies) / 61 original posts | 12 |
| Views of last 20 posts, sorted (TikTok, thousands) | 4.1, 5.0, 6.2, 7.7, 8.8, 9.9, 10.3, 11.0, 11.6, 12.1, 12.7, 13.4, 14.2, 15.9, 17.0, 19.8, 22.4, 31.0, 38.0, 412.0 | | |
| Median views (last 20) | 12.4k | 3.1k impressions | 9.8k views |
| ER formula | (likes+comments+shares+saves) ÷ views | X engagement rate (engagements ÷ impressions) | (likes+comments+saves+shares) ÷ accounts reached |
| ER | 5.8 % | 2.1 % | 4.6 % |

Median check for TikTok: the 10th and 11th values are 12.1k and 12.7k, so the median is 12.4k. The 412k video
would have pushed the average to 34.2k, which is why the kit shows medians and lists the top post separately.

What the agent refused to put in: "total reach 69.5k" (sum of followers) as a headline, the 412k video inside the
median, and a third-party "estimated earnings per post" figure a browser extension showed.

Audience (TikTok + Instagram, platform-reported): US 38 %, UK 17 %, Germany 7 %; 18–24 34 %, 25–34 41 %, 35–44 16 %,
45+ 9 %. X demographics not reported at this size; the kit says so.

## Step 3: AI disclosure (as it appears in the kit)

> Claudia is an AI character: every image, video and voice of her is generated, and every post is labelled as
> AI-generated on-platform. The account is operated by Example Studio Ltd, United Kingdom. A person reviews and approves
> every sponsored post before it goes live. Claudia doesn't claim to have personally used a product; sponsored content
> shows your product in generated scenes, quotes your claims as yours, or shares what our team found when we tested it.
> Paid posts are marked #ad and use each platform's paid-partnership label.

## Step 4: rate math

| Deliverable | Median views | CPM | CPM result | Tier band | Final "from" |
|---|---|---|---|---|---|
| TikTok video | 12,400 | $18 | $223 | micro $500–2,000 | **$500** (clamped up to band floor) |
| Instagram Reel | 9,800 | $22 | $216 | nano $20–200 by followers, micro by views | **$350** |
| YouTube Short | 5,200 | $15 | $78 | n/a | **$150** (floor: generation + review time) |
| X post | 3,100 | $10 | $31 | ≈ $38 by followers | **$60** |
| X thread | 3,100 | $15 | $47 | n/a | **$180** |
| Telegram post | 2,400 | $14 | $34 | n/a | **$90** |
| City Night bundle | | | $1,270 sum | | **$1,090** (−14 %) |

Floor price reasoning, written down before any brand call: one sponsored scene costs about $35 in generation spend
(image + video model runs on the operator's own keys, including two re-rolls), 3 hours of review and edit at the
operator's $60/hour, and a sponsored TikTok typically gets ~30 % fewer views than an organic one. Floor ≈ $250 for any
single video. Nothing gets quoted below it.

Add-ons line in the kit: organic usage 30 days +25 %, paid usage 30 days +40 %, category exclusivity 30 days +20 %,
rush +25 %, custom scene set from $250. Perpetual usage: declined (the brand would control her likeness in ads forever).

## Step 5–6: the kit (exported page, abbreviated)

```text
CLAUDIA · Media kit
Cosy-city AI creator: sunset bedrooms, rainy streets, travel and the agents she runs with.
TikTok @claudia_onchain · X @claudia_onchain · Instagram @claudia.onchain · useclaudia.xyz
Contact: partnerships@example.com (Example Studio Ltd)

Numbers: last 30 days to 2026-10-01, platform analytics. Medians over the last 20 posts.

About Claudia — [disclosure block above]

TikTok     41,200 followers · median 12.4k views · ER 5.8% (by views) · 4–5 videos/week
X          18,900 followers · median 3.1k impressions · ER 2.1% (X definition) · 2 posts/day + replies
Instagram   9,400 followers · median 9.8k views · ER 4.6% (by reach) · 3 Reels/week
Top post: TikTok "rain run, no umbrella", 412k views (33× median), not in medians.

Who watches: US 38% · UK 17% · DE 7% · 75% aged 18–34.

Results: Organic test, Aug 2026 — creator skills library launch. 38k views (3.1× median), 1,120 link clicks,
96 sign-ups via UTM. Learned: a how-to with a visible result beat the vibe edit 3:1.

From: TikTok video $500 · Reel $350 · X thread $180 · City Night bundle $1,090.

We don't promote: tokens, exchanges, trading or "earn" products; gambling; adult; medical or weight-loss claims;
political ads; products for under-18s; testimonials written as personal use.

AI-generated character. Nothing in this kit is a guarantee of views or sales.
```

## Step 7: brand list (top of the CSV)

```csv
brand,category,why_fit,evidence_url,contact_route,contact_name,status
Northpine,audio,"Travel headphones; rainy-street pillar; ran AI-assisted creative in Sep","https://example.com/northpine-campaign",partnerships inbox,"Creator Partnerships Lead",drafted
Kettle & Key,coffee,"Late-night coffee scenes already in her room videos; sponsors micro TikTokers","https://example.com/kk-creators",creator programme form,"Social Lead",drafted
Driftlane,travel eSIM,"Travel pillar; audience US/UK travellers 25-34","https://example.com/driftlane",agency (credited in creator posts),"Account Director",drafted
```

## Step 9: the first pitch (approved by the operator, then sent by them)

Subject: Northpine Fold × Claudia: a rainy-night commute in 30 seconds

Hi Priya, your "Hear the city, not the noise" spots with night-walk creators fit Claudia's best-performing format:
rainy-street selfie runs (median Reel 9.8k views, 4.6 % ER by reach; top video 412k).

Up front: Claudia is an AI character, every post is labelled AI and #ad when paid, and a person approves each sponsored
post.

Idea: one 25-second Reel + TikTok of her running for the last train, Northpine Fold on, the city noise dropping out,
live the week of 3 Nov. Your battery and ANC claims stay yours.

Packages from $350; the City Night bundle covers TikTok, Reels, Shorts, X and Telegram for $1,090.
Kit: (link to the hosted kit)

Worth 15 minutes next week?

(Operator name), Partnerships, Example Studio Ltd

Word count: 128. AI sentence present, one CTA, no claim she used the headphones.
