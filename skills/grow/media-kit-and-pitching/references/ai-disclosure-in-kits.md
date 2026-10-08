# AI disclosure in the kit and in every deal

Read this in Step 3 and whenever a brand pushes back on labels. This is a practical summary, not legal advice; the
operator is responsible for their own compliance. Checked 2026-10.

## Why the kit discloses before the brand asks

- **US (FTC).** The Endorsement Guides (16 CFR Part 255, revised 2023) define endorsers broadly enough to include virtual
  and AI-generated influencers. Material connections (payment, gifts, affiliate links) must be disclosed clearly and
  conspicuously. A virtual influencer cannot have personal experience of a product, so a post framed as "I tried it" is
  misleading. The Consumer Reviews and Testimonials Rule (16 CFR Part 465, in force Oct 2024) bans fake or AI-generated
  reviews and testimonials and buying fake social indicators (followers, views); civil penalties up to $53,088 per
  violation (2025 adjustment). 2026 practitioner guidance says to disclose AI use in sponsored content separately from #ad.
  Do both, always.
- **UK (CMA + ASA).** Joint influencer guidance updated January 2026: anything incentivised (paid, gifted, affiliate, own
  brand) must be labelled as advertising up front ("#ad" or "Ad" at the start, not buried). Since 6 April 2025 the DMCC
  Act lets the CMA fine directly, up to 10 % of global turnover or £300,000, whichever is higher; hidden advertising is a
  banned practice in Schedule 20.
- **EU.** Unfair Commercial Practices Directive bans disguised advertising; the AI Act's transparency duties (Article 50)
  require deepfake-style content to be disclosed as AI-generated. Crypto marketing additionally falls under MiCA (see
  [crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md)).
- **Platforms.** TikTok's AIGC label, Meta's AI info label, YouTube's altered or synthetic content toggle and X's
  `made_with_ai` flag apply to realistic generated people. `@useclaudia/social` sets these flags automatically and adds
  "(AI-generated)" where a network has no flag.

## What the kit must say (minimum)

1. The character is AI-generated, and posts are labelled as such on-platform.
2. Who operates the account (legal name or company, country) and that a person approves every sponsored post.
3. That the character does not claim personal use, and how product claims are handled.
4. That paid posts use #ad / Ad plus the platform's paid-partnership tool, without exception.
5. What the account will not promote.

## Wording that works in sponsored posts

| Situation | Write | Don't write |
|---|---|---|
| Showing a product | "Northpine's new travel headphones, in tonight's rainy-street scene. #ad · AI-generated" | "Obsessed with my new Northpine headphones" |
| Brand claim | "Northpine says 40 hours of battery." | "40 hours of battery, I tested it." |
| Operator's real test | "Our team used these on a 9-hour flight: noise cancelling held up." | "I wore these on my flight." |
| Discount code | "#ad Code CLAUDIA10 gives 10 % off (Northpine pays us per sale)." | "Use my code!" |

Put "#ad" or "Ad" at the start of the caption on X, Instagram and TikTok, and switch on the platform tool (Instagram
"Paid partnership", TikTok "Content disclosure → Branded content", YouTube "includes paid promotion", X paid-partnership
label). With `@useclaudia/social`, set `labels: { ad: true }`: it adds #ad and sets X `paid_partnership` and TikTok
`brand_organic_toggle`.

## When a brand asks to drop the labels

Use the reply in `templates/pitch-scripts.md` ("Can we skip the #ad / AI label?"). Short version: no, it's the law in
the US, UK and EU and the platforms' rules; unlabelled content risks removal and fines for both sides; the label doesn't
hurt performance as much as a takedown does. If they insist, walk away and log it.

## Likeness clauses for an AI character

Add to every quote:

- The brand may not edit the character's face, body, voice or words, or generate new content of her.
- Usage ends when the licence term ends; assets come down from paid placements on that date.
- No use in political, adult, financial-product or medical contexts.
- The AI label stays on every reuse, including the brand's own reposts and ads.

## Sources

- FTC Endorsement Guides: https://www.ftc.gov/legal-library/browse/federal-register-notices/16-cfr-part-255-guides-concerning-use-endorsements-testimonials-advertising (checked 2026-10)
- FTC Consumer Reviews and Testimonials Rule: https://www.ftc.gov/legal-library/browse/rules/rule-use-consumer-reviews-testimonials (checked 2026-10)
- FTC "Disclosures 101 for Social Media Influencers": https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers (checked 2026-10)
- CMA/ASA updated influencer guidance (Jan 2026) summary: https://www.rpclegal.com/snapshots/advertising-and-marketing/winter-2025/cma-and-asa-publish-updated-influencer-guidance-on-social-media-endorsements/ (checked 2026-10)
- UK government "Who regulates hidden advertising": https://assets.publishing.service.gov.uk/media/68b81754536d629f9c82aa16/Who_regulates_hidden_advertising.pdf (checked 2026-10)
- 2026 AI-in-sponsored-content commentary: https://beancount.io/blog/2026/07/13/ftc-ai-content-double-disclosure-rule-influencers-guide (checked 2026-10; secondary source)
