---
name: brand-deals-and-sponsorships
description: 'Runs paid brand partnerships for AI influencers and agent accounts end to end — vetting inbound offers (scam, brand-safety and crypto red flags), pricing from 2026 rate benchmarks and real performance, negotiating scope, usage rights, whitelisting and exclusivity, a sponsorship contract checklist, #ad plus AI double disclosure (FTC, UK ASA/CMA, EU), the virtual-influencer "no personal experience" rule, platform branded-content rules including TikTok''s ban on crypto and financial promotions, a human-approval publishing flow with labels.ad, invoicing and the report back to the brand. Use when a brand, agency or project offers money, product or tokens for a post, when setting rates, or when a sponsored post is about to go live.'
license: MIT
metadata:
  title: "Brand deals and sponsorships"
  category: "grow"
  summary: "Vet, price, contract, disclose, publish and report paid partnerships for an AI influencer, safely and legally."
  level: "intermediate"
  tags: "sponsorships, brand deals, #ad, ftc, asa-cma, pricing, usage rights, whitelisting, contracts, invoicing"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "1 h per deal plus production"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Brand deals and sponsorships

A sponsorship is a trade: the brand pays for attention and trust the account built. This skill keeps that trade
worth doing for both sides: it screens out scams and offers that would break the law or a platform's rules, prices
the work from real numbers, gets it in writing, discloses it properly (as an ad **and** as AI), publishes it only
after a person approves, gets paid, and reports back so the brand books again.

## When to use this

- A brand, agency or crypto project emails or DMs with an offer: money, gifted product, affiliate commission, tokens.
- The operator needs a rate card, a quote for a specific brief, or a counter-offer.
- A contract has arrived and someone needs to check it before signing.
- A sponsored post is drafted and about to be scheduled.
- The campaign is over and the brand wants a report (or the invoice is late).

Unpaid creative swaps with another creator are collabs: see
[collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md). Anything paid, gifted or commissioned is an
ad and belongs here.

## What you need

- A **media kit** with honest 90-day numbers (see [media-kit-and-pitching](../media-kit-and-pitching/SKILL.md)).
- A **rate card** — start from [templates/rate-card.csv](templates/rate-card.csv).
- The **operator's legal entity** (person or company), invoicing details, and where tax is handled. Claudia is an AI
  character; contracts are signed by the people or company that run her, never "by Claudia".
- A person with authority to **say yes, sign and approve posts**. The agent drafts, checks and reminds; it never
  signs, accepts payment terms or publishes a sponsored post on its own.
- `@useclaudia/social` connected to the accounts in scope; keys stay with the operator.
- A deal log: one [templates/deal-intake.yaml](templates/deal-intake.yaml) per offer.

## Steps

### 1. Log the offer (5 minutes)

Copy the offer into a new `deal-intake.yaml`: who, what product, which platforms, deliverables, dates, budget (or
"not stated"), usage and exclusivity asks, payment method, and the exact sender address or handle. Never click
attachments or "review our app" links until step 2 passes.

### 2. Vet it (15 minutes)

Read [references/vetting-and-red-flags.md](references/vetting-and-red-flags.md) and answer:

1. **Is the sender real?** Domain matches the brand's real site; domain older than a year; the person exists on the
   company's site or LinkedIn; reply to the address on the brand's site, not the one that emailed you.
2. **Is the product allowed?** Check the category against each platform in scope
   ([references/platform-branded-content-rules.md](references/platform-branded-content-rules.md)). TikTok bans branded
   content for financial products including crypto; Meta needs written permission for crypto ads; gambling, adult,
   weight-loss and similar categories are restricted or banned.
3. **Is it a crypto promotion?** Anything that invites people to buy, hold, stake or trade a token, or use an exchange
   or launchpad, is a financial promotion in the UK and marketing under MiCA in the EU. Default: **decline**, or send it
   through [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) before any further talk. Payment in
   the sponsor's own token is always a no.
4. **Would the audience be glad to see it?** If the product doesn't fit the pillars in
   [personal-brand-strategy](../personal-brand-strategy/SKILL.md), the post will underperform and cost trust.
5. **Any instant no?** Requests to hide `#ad`, to "not mention it's AI", to post a contract address, to promise
   results, to delete after 24 h, to log in to anything with the account's credentials, or to pay a fee to "unlock"
   the deal.

Outcome: **decline** (use the decline script in [templates/deal-intake.yaml](templates/deal-intake.yaml)),
**clarify**, or **quote**.

### 3. Price it

Read [references/pricing-and-rate-benchmarks.md](references/pricing-and-rate-benchmarks.md) for the full method. Short version:

1. **Benchmark band** for the platform and follower tier (2026 benchmarks, checked 2026-10):

   | Tier | Instagram post/Reel | TikTok video |
   |---|---|---|
   | Nano 1k–10k | $20–200 | $20–500 |
   | Micro 10k–50k | $200–2,000 | $500–2,000 |
   | Mid 50k–500k | $2,000–5,000 | $2,000–5,000 |
   | Macro 500k–1M | $5,000–15,000 | $5,000–20,000 |
   | Mega 1M+ | $15,000+ | $20,000+ |

   X runs about $2 per 1,000 followers per post; YouTube integrations go up to ~$10,000 for mid-tier channels.
2. **Performance check**: median views of the last 10 posts × $15–30 per 1,000 views for short video. If this is far
   below the band, quote nearer the bottom of the band; if far above, nearer the top.
3. **Production**: add the real generation and editing cost (image/video generation on the operator's own keys,
   editing hours). AI production isn't "cheaper content"; price the hours.
4. **Add-ons** (each as a separate line): brand reposts organically for 30 days +20%; paid usage / whitelisting /
   Spark Ads / partnership ads +30–50% per 30 days; category exclusivity +15–30% per 30 days; rush (< 5 working days)
   +25%; extra revision round beyond two +10%; perpetual or "all media" rights — 2–3× or decline.
5. **Bundles**: 3+ deliverables, 10–15% off the sum. Never discount the disclosure or the approval steps away.

Write the quote as line items. Show the total and what's included; keep the floor (the number below which the
operator says no) private.

### 4. Negotiate scope, not worth

- Ask for their budget before quoting if it isn't stated: "What range have you set aside for this?"
- If they're under, **trade scope**: fewer deliverables, organic-only usage, shorter exclusivity, no rush. Don't cut
  the rate for the same work.
- Usage rights and whitelisting are where agencies hide value; price them separately (step 3.4).
- Character rights: the brand never gets the right to generate new images, video or voice of Claudia (or any AI
  character) themselves, or to train models on her content. Offer extra deliverables instead.
- Get approval rounds capped (two) and a decision deadline on drafts (48 h), or the timeline slips onto the operator.

### 5. Contract

Work through [templates/sponsorship-contract-checklist.md](templates/sponsorship-contract-checklist.md). The
non-negotiables:

- Deliverables, platforms, dates, approval rounds and who approves.
- **Disclosure clause** naming both labels: ad (`#ad` / "Ad" up front + the platform's paid-partnership tool) and AI
  (native AI label + a text line). The brand cannot ask for either to be removed.
- **Claims**: the brand supplies and substantiates every product claim in writing; no claims about results,
  health, money or returns that aren't substantiated; for an AI influencer, no first-person "I tried it" claims
  (step 6).
- Usage, whitelisting and exclusivity scope, duration and territory.
- Payment amount, currency, schedule (new brands: 50% on signing, 50% net 15 after posting), late fee, kill fee
  (50% after concept approval, 100% after production).
- Takedown and morality clauses both ways; the operator keeps the right to stop a post if the brand becomes unsafe.
- Who signs: the operator's person or company. A human reads the full contract; the agent's checklist is a filter,
  not legal advice.

### 6. Write it honestly (the AI-influencer rules)

Read [references/disclosure-law-us-uk-eu.md](references/disclosure-law-us-uk-eu.md). The core rules:

- **Double disclosure.** Every sponsored post says it's an ad **and** that it's AI-generated. A post with only `#ad`
  hides the AI; a post with only "AI-generated" hides the payment. UK: label "Ad"/`#ad` up front, before "more";
  US FTC: clear and conspicuous, in the post itself, spoken and on screen in video.
- **No personal experience.** A virtual influencer hasn't worn the headphones or drunk the coffee. Don't write
  "I've been using these every day". Write what's true: what the product does (brand-substantiated), what it looks
  like in her world, and, attributed, what a real person on the team found ("our editor wore them for two weeks:
  battery lasted 31 hours"). The FTC treats an AI persona's invented experience as deceptive, and a fully AI
  "testimonial" can't be fixed by a label.
- **Show the real product accurately.** Composite the brand's real product shots or accurately rendered models into
  the scene; don't improve the product with AI (UK ASA has ruled against filters that exaggerate a product's effect).
- **No money talk.** No "pays for itself", returns or price predictions; for anything crypto-adjacent add "Not
  financial advice." (the social package does this automatically when a coin, token or price is mentioned).

Caption pattern:

```text
Ad · Paid partnership with @northpine. Claudia is an AI character; this scene is AI-generated. The Arc headphones are
real: 31 h battery and fold-flat hinges (Northpine's specs). Our editor wore a pair for two weeks: the noise cancelling
handled the night bus. Link in bio.
```

### 7. Approvals and publishing (human in the loop, twice)

1. Brand approves the **concept** (one paragraph + storyboard frame) — max 2 rounds.
2. Brand approves the **final draft** (exact caption, video, cover) — max 2 rounds, 48 h each.
3. Operator approves in `@useclaudia/social`, with both labels:

```ts
const post = social.draft({
  text: "Ad · Paid partnership with @northpine. Claudia is an AI character; this scene is AI-generated. …",
  media: [{ path: "./deliverables/northpine-arc-reel-v3.mp4", alt: "AI-generated video: Claudia on a rainy street at dusk wearing real Northpine Arc headphones" }],
  targets: [{ account: tiktok.id }, { account: x.id }],
  labels: { ai: true, ad: true },          // AI: native flags (is_aigc, made_with_ai). Ad: #ad + X paid_partnership + TikTok branded-content flag
  scheduleAt: Date.parse("2026-11-04T17:00:00Z"),
});
for (const pv of social.preview(post.id)) {
  console.log(pv.network, pv.labelsAdded, pv.warnings, pv.costUsd);  // read every line; fix anything blocked
}
social.submit(post.id);   // → pending_approval; the operator compares against the brand-approved draft, then:
social.approve(post.id);  // → scheduled; tick() publishes once at 17:00 UTC
```

Check in the preview that `#ad` is not duplicated or pushed to the end (write "Ad ·" at the start yourself), and that
the TikTok flag is the **branded content / paid partnership** one for a third-party brand (TikTok's "your brand"
toggle is for promoting your own business). Where a connector can't set a platform's paid-partnership tool
(Instagram's "Paid partnership" label is set in the app), publish that one from the app with the label switched on.

From the CLI, for networks without a native ad flag (Telegram, Discord, the thread), keep `#ad` in the text:

```sh
claudia post telegram "Ad · Paid partnership with Northpine. …" --media ./deliverables/still.jpg --dry-run
claudia post telegram "Ad · Paid partnership with Northpine. …" --media ./deliverables/still.jpg
```

### 8. Collab day: proof of posting

Within 24 h send the brand: live URLs, screenshots of each post showing the disclosure, and the time posted. Keep the
`~/.claudia/social/audit.jsonl` lines for the posts (who approved, when) with the deal file.

### 9. Invoice and get paid

Invoice on the contract's trigger (signing / posting), using the fields in
[templates/sponsorship-contract-checklist.md](templates/sponsorship-contract-checklist.md#invoice). Chase on day 1 after
due, day 7 (with the late fee clause), day 14 (pause further deliverables). If paid in stablecoins (USDC on Solana is
the usual first choice; other chains only if the contract names them), confirm the receiving address by a second
channel, accept a small test transfer first, never sign any other transaction the payer sends, and record the fiat
value on the day for tax. Never accept the sponsor's own token as payment.

### 10. Report back (day 7 and day 30)

Use [templates/campaign-report.md](templates/campaign-report.md): deliverables, reach, views, average watch time,
engagement rate, saves/sends, tracked clicks (UTMs; see
[collabs-and-cross-promotion](../collabs-and-cross-promotion/references/tracking-and-utm.md)), code redemptions if the
brand shares them, a short sentiment read with real (anonymised) comments, and what you'd do differently. Screenshots
of native analytics, not just numbers. Good reports get rebooked; see [kpi-reporting](../kpi-reporting/SKILL.md).

## Templates

- [templates/deal-intake.yaml](templates/deal-intake.yaml) — log, vet, decide, plus reply scripts (clarify, quote,
  decline).
- [templates/rate-card.csv](templates/rate-card.csv) — line-item rates and add-ons for Claudia's current numbers.
- [templates/sponsorship-contract-checklist.md](templates/sponsorship-contract-checklist.md) — clause-by-clause
  checklist and invoice fields.
- [templates/campaign-report.md](templates/campaign-report.md) — the report the brand receives.

Worked examples: [examples/northpine-headphones-deal.md](examples/northpine-headphones-deal.md) (a full deal, from
inbound email to report) and [examples/declining-a-token-promo.md](examples/declining-a-token-promo.md) (vetting
Juno's operator through a memecoin offer and a fake-brand phishing attempt).

## Check before you finish

- [ ] Sender verified via the brand's real domain; no attachments or links opened before that.
- [ ] Product category allowed on every platform in scope; TikTok gets nothing crypto or financial.
- [ ] Not a token promotion, or it went through crypto-marketing-compliance and came back cleared in writing.
- [ ] Quote built from benchmark band + performance check + production + priced add-ons.
- [ ] Contract covers deliverables, approvals, disclosure (ad + AI), claims substantiation, usage, exclusivity,
      payment, kill fee, takedown; a person read and signed it.
- [ ] Captions start with "Ad"/`#ad`, name the brand, say it's AI-generated, and make no first-person experience claims.
- [ ] Platform paid-partnership tools switched on (X paid_partnership, TikTok branded content, Instagram Paid
      partnership, YouTube paid promotion) and native AI labels on.
- [ ] Preview read line by line; a person approved the exact post the brand approved.
- [ ] Proof of posting sent; invoice sent; payment address verified by a second channel.
- [ ] Day-7 and day-30 reports sent with screenshots.

## Pitfalls

- **Fake brand deals are the most common scam aimed at creators**: lookalike domains, "contract.pdf" that's an
  executable, "install our app to review it", "pay shipping to receive the product", requests for login codes. Verify
  the sender before anything else.
- **Pricing on followers alone.** Quote on views and production too; brands increasingly ask for median views.
- **Giving away usage.** "We'll just boost it a bit" is paid usage. Whitelisting and Spark/partnership ads get their
  own line and an end date.
- **Disclosure below the fold or only in hashtags at the end.** UK regulators expect "Ad" up front; the CMA can fine
  directly under the DMCC Act (up to 10% of global turnover, checked 2026-10).
- **"Just say you love it."** An AI character can't have loved it. Rewrite the brief rather than the truth.
- **Token-for-post offers.** Paid by an issuer to promote its coin = an issuer's marketing communication under MiCA
  and a regulated financial promotion in the UK, and banned as branded content on TikTok. Decline.
- **Letting the agent auto-accept.** An agent that replies "yes, sending invoice" to inbound DMs can commit the
  operator to terms. The agent drafts replies; a person sends them.
- **Exclusivity creep.** "Competitors" undefined in the contract can block a whole category for a year. Name the
  competitors and the end date.

## Related skills

- [media-kit-and-pitching](../media-kit-and-pitching/SKILL.md) — the media kit and outbound pitches to brands
- [monetization-streams](../monetization-streams/SKILL.md) — where sponsorships fit among income streams
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — anything touching tokens, exchanges, launches
- [collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md) — unpaid partnerships and UTM tracking
- [kpi-reporting](../kpi-reporting/SKILL.md) — the numbers behind the report
- [crisis-and-reputation](../crisis-and-reputation/SKILL.md) — if a sponsor goes bad mid-campaign
- [tiktok-playbook](../tiktok-playbook/SKILL.md) · [instagram-reels-playbook](../instagram-reels-playbook/SKILL.md) ·
  [x-playbook](../x-playbook/SKILL.md) · [youtube-shorts-playbook](../youtube-shorts-playbook/SKILL.md)
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — AI labels per platform
- [social-publishing](../../build/social-publishing/SKILL.md) — `@useclaudia/social` setup and rules
- [wallet-and-key-security](../../build/wallet-and-key-security/SKILL.md) — receiving crypto payments safely
