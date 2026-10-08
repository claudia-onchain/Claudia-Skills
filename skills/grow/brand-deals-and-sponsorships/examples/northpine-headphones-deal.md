# Worked example: Northpine Arc headphones × Claudia (inbound to report)

Northpine is a fictional headphone brand. Claudia's numbers (October 2026): TikTok 38k followers / 14k median views,
Instagram 12k / 14k median Reel views, X 21k / 4.8k median impressions, Telegram 2.4k.

## Day 0 — the email arrives

Priya at Northpine asks for a TikTok, an Instagram Reel and an X post for the Arc launch, "sharing how you use them
daily", Spark Ads for 30 days and "no other audio brands for 60 days". No budget stated.

The agent logs it in `deals/2026-10-northpine-arc.yaml` (the filled version is
[deal-intake.yaml](../templates/deal-intake.yaml)) and runs the vetting routine:

- `northpine.example` matches the brand site; domain is 6 years old; Priya is on the company's team page.
- The brief came as text in the email; no attachments.
- Category (consumer electronics) is fine on TikTok, Instagram and X.
- No crypto, no fees asked, no account access asked.
- Flag: "how you use them daily" asks an AI character for a personal-experience claim. Rewrite needed.

The agent sends the pre-approved holding reply and summarises for the operator. The operator replies from the
address on Northpine's site with the **clarify** script: budget range, exact usage, competitor list, and a note that
every post will be labelled as an ad and as AI.

## Day 2 — numbers

Priya: budget "around $2,000–2,500", Spark Ads 30 days, competitors = four named audio brands, 60 days exclusivity.

The operator's quote, built with [pricing-and-rate-benchmarks.md](../references/pricing-and-rate-benchmarks.md):

| Line | USD |
|---|---|
| TikTok video 25 s | 900 |
| Instagram collab Reel | 600 |
| X post + 3-part thread | 150 |
| Production (≈ $45 generation on own keys + 5 h editing) | 245 |
| Spark Ads, 30 days (+40% of TikTok) | 360 |
| Exclusivity, 4 named brands, **30** days (+20% of deliverables) | 330 |
| Bundle −10% | −259 |
| **Total** | **2,326** |

Counter on exclusivity: 30 days instead of 60 ("60 days would be another $330"). Northpine accepts 30 days.

## Day 8 — contract

The operator walks [sponsorship-contract-checklist.md](../templates/sponsorship-contract-checklist.md). Changes
requested and accepted:

- Disclosure clause added: "Ad" up front, platform paid-partnership tools, AI labels; brand can't ask to remove them.
- "Creator will share personal experience" → "Creator will present product features supplied in writing by Brand;
  experience statements only from named human testers, attributed."
- Character clause: no generating new content of Claudia, no training on her content.
- Payment 50% on signing, 50% net 15; kill fee 50% after concept approval.
- Morality clause made mutual.

Signed by the operator's company on 14 Oct. Deposit $1,163 received 16 Oct.

## Day 10–20 — production and approvals

Concept (approved first round): *Night bus home in the rain. Claudia, black bob with copper streaks and gold hoops,
olive star-embroidered knit, pulls the Arc headphones on as the bus pulls away; the city noise drops out (sound
design does the work); text overlay: "31 h battery · folds flat". Last shot: real product packshot.*

- The headphones in every frame are composited from Northpine's own product renders, so the product looks exactly
  like the real thing.
- A real team member wore a pair for two weeks; their note ("noise cancelling handled the night bus; I charged them
  twice in 14 days") is the only experience claim, and it's attributed.

Final caption (TikTok and Instagram):

```text
Ad · Paid partnership with @northpine. Claudia is an AI character; this scene is AI-generated.
The Arc headphones are real: 31 h battery, fold-flat hinges (Northpine's specs).
Our editor wore a pair for two weeks: "noise cancelling handled the night bus." Link in bio.
```

Video: "AD · AI-GENERATED" on screen 0–3 s; voice line at 0:01 "This is an ad for Northpine — and yes, I'm an AI."

Northpine approved draft 2 on 28 Oct.

## Day 21 — publishing

```ts
const post = social.draft({
  text: "Ad · Paid partnership with @northpine. Claudia is an AI character; this scene is AI-generated. …",
  media: [{ path: "./deliverables/northpine-arc-v2.mp4", alt: "AI-generated video: Claudia on a rainy night bus putting on Northpine Arc headphones" }],
  targets: [{ account: tiktok.id }, { account: x.id, text: "Ad · Paid partnership with @northpine. Night bus, rain, Arc on. Claudia is an AI character; scene AI-generated, headphones real." }],
  labels: { ai: true, ad: true },
  scheduleAt: Date.parse("2026-11-04T17:00:00Z"),
});
social.preview(post.id).forEach((pv) => console.log(pv.network, pv.labelsAdded, pv.warnings, pv.costUsd));
```

Preview check by the operator:

- TikTok: `is_aigc` set; branded-content flag set. They confirm it's the third-party **branded content** toggle,
  not "your brand".
- X: `made_with_ai`, `paid_partnership`, `costUsd 0.015`; `#ad` was already at the start ("Ad ·"), no duplicate.
- No "Not financial advice." added (no coin talk), no blocks.

`submit()` → the operator compares against Northpine's approved draft → `approve()` → `scheduled`. The Instagram
collab Reel was posted from the Instagram app at 11:30 UTC on 5 Nov with the Paid partnership label and Northpine as
collaborator (accepted in 12 minutes). The Spark Ads code was generated in TikTok for 30 days and sent to Priya.

Proof of posting (URLs + screenshots showing the labels) went to Northpine at 18:10 UTC.

## Day 28 and day 51 — reports

Day-7 numbers in the [campaign report](../templates/campaign-report.md):

| | TikTok | Instagram | X |
|---|---|---|---|
| Views / impressions | 96,000 | 41,000 | 7,900 |
| Non-followers | 79% | 68% | — |
| Avg watch / completion | 14.2 s / 38% | 11.8 s / 34% | — |
| Engagement rate (by views) | 6.1% | 4.8% | 1.9% |
| Tracked clicks | 610 (bio) | 290 (story sticker) | 74 |
| Code redemptions (Northpine data) | 88 total | | |

Top comment themes: "do they fold flat?" (×41), "battery life?" (×27), "wait she's AI?" (×19, answered with "Yes!
I'm an AI character — the headphones are real though."). No complaints about the disclosure.

Invoice CLD-2026-0114 for the remaining $1,163 was sent on 7 Nov, paid on 19 Nov. The Spark Ads authorization was
revoked on its end date. Northpine booked a three-video holiday series in December.
