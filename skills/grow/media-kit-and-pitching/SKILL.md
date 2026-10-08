---
name: media-kit-and-pitching
description: Builds an honest media kit and rate card for an AI influencer or agent account (Claudia-style characters and the people who run them), pulls the numbers correctly from each platform's analytics, discloses the AI character and its limits up front, prices deliverables from 2026 benchmarks with usage-rights and exclusivity add-ons, and writes brand pitch emails and DMs with a follow-up cadence and case studies. Use when an operator wants to start earning from sponsorships, answer a brand's "send your media kit", refresh a kit each quarter, quote a price, or pitch brands that fit the account.
license: MIT
metadata:
  title: "Media kit and pitching"
  category: "grow"
  summary: "An honest media kit, a 2026 rate card and pitch scripts for AI influencer accounts, with AI disclosure built in."
  level: "intermediate"
  tags: "media kit, rate card, pitching, brand deals, sponsorships, influencer marketing, ai influencer, outreach"
  uses: "@useclaudia/cli, @useclaudia/social"
  time: "90 min first kit, 20 min per quarterly refresh"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Media kit and pitching

A media kit is the one page a brand reads before deciding whether an account is worth a call. This skill produces that page
for an AI character account (numbers pulled honestly, the AI nature stated plainly, prices that hold up against 2026
benchmarks) plus the pitch emails and DMs that get it read. Output: `media-kit.md`, `media-kit.json` (for a website or a PDF
export), `rate-card.csv` and a pitch sequence for 5–15 hand-picked brands.

## When to use this

- A brand asks "can you send your media kit / rates?" and nothing exists yet.
- The account has crossed a milestone (roughly 5k followers on one network, or 50k monthly views) and the operator wants
  to start pitching instead of waiting.
- Quarterly refresh: numbers older than 90 days look stale and brands notice.
- Quoting a custom package (bundle of a Reel + X thread + Telegram post, usage rights, exclusivity).
- Not for: negotiating and contracting a deal that is already moving (use
  [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md)), or choosing which income streams to pursue
  at all ([monetization-streams](../monetization-streams/SKILL.md)).

## What you need

- Read access to each platform's native analytics for the account (TikTok Studio, Instagram Professional dashboard,
  YouTube Studio, X Analytics, Telegram channel statistics, Discord Server Insights where available). Exports or
  screenshots of the last 28/30 and 90 days.
- The KPI sheet from [kpi-reporting](../kpi-reporting/SKILL.md) if it exists (it saves most of Step 2).
- The character bible: who the character is, voice, look, what she will and will not do
  ([../../create/claudia-character-bible/SKILL.md](../../create/claudia-character-bible/SKILL.md)).
- 3–6 best posts with links, and 1–3 past collaborations with results (even unpaid or platform-internal ones count, labelled
  as such).
- The operator's real name or business name and a contact address that a human reads. Brands contract with a person or a
  company, never with a character.
- A rough idea of the operator's floor price (the lowest fee worth the work) and the jurisdictions they operate in (US, UK,
  EU change the disclosure wording you must commit to).
- Nothing is sent without the operator's approval. The agent drafts; a person sends or approves each outbound message.

## Steps

### 1. Decide what the kit is for (5 min)

Write one sentence: "This kit sells <deliverable types> to <brand categories> who want <outcome>." For Claudia:
"This kit sells vertical lifestyle videos and X threads to travel, audio, coffee and creator-tool brands who want reach
with 18–34 city creators and AI-curious audiences." A kit that tries to sell everything to everyone reads as a template.

Pick 3–5 brand categories that fit the content pillars ([../../create/content-pillars-and-series/SKILL.md](../../create/content-pillars-and-series/SKILL.md)).
Write the exclusion list at the same time (see Step 6). For a crypto-adjacent character the exclusions matter as much as
the targets.

### 2. Pull the numbers honestly (30 min)

Read [references/numbers-that-belong-in-a-kit.md](references/numbers-that-belong-in-a-kit.md) for the exact screen and
metric name on each platform. Rules:

1. **Same window everywhere.** Use the last 28 or 30 days for reach and engagement, 90 days for averages. State the
   window and the date pulled: "Last 30 days to 2026-10-01".
2. **Medians beat averages.** One viral video makes an average meaningless. Show median views per post (last 20 posts) and
   mention the outlier separately: "Median 9.8k views; top video 412k".
3. **Engagement rate by reach, not by followers,** for Reels/TikTok/Shorts (followers barely predict views on short video).
   Formula and per-platform definitions are in [kpi-reporting](../kpi-reporting/SKILL.md). State which formula you used.
4. **Platform-native numbers only.** No third-party "estimated reach" tools, no projections, no "potential impressions".
5. **Separate paid from organic.** If any post was boosted, exclude it from organic medians or label it.
6. **Never inflate.** Do not add follower counts across platforms into a single "total reach" headline without also
   listing each one; do not count reposts or duplicates twice; do not round 9.4k up to "10k".
7. **Audience demographics** come from the platform: top countries (top 3 with %), age bands, gender split as the platform
   reports it. AI-character accounts often skew to one country (US/UK) and 18–34; say so even when it is narrow. Brands
   buy fit, not breadth.

Write the numbers into `templates/media-kit.json` (`stats` and `audience` blocks) so the markdown kit and any web render
read the same source.

### 3. Write the AI disclosure block (10 min)

This is not optional and it goes near the top, not in a footer. Read
[references/ai-disclosure-in-kits.md](references/ai-disclosure-in-kits.md). The block must say:

- The character is AI-generated, and every post carries the platform's AI label plus a text disclosure where none exists.
- Who operates the account (person or company) and how decisions are made ("every sponsored post is approved by a person
  before it publishes").
- What the character cannot honestly do: she has not physically used the product. Sponsored content shows the product in
  generated scenes and states the brand's claims as the brand's, or reports the operator's real use.
- That paid posts carry #ad / the platform's paid-partnership tool, and that this is non-negotiable.

Template (adapt, keep every clause):

```text
About Claudia
Claudia is an AI character: every image, video and voice of her is generated, and every post is labelled as AI-generated
on-platform. The account is operated by <Operator name / Company Ltd>, <country>. A person reviews and approves every
sponsored post before it goes live. Claudia doesn't claim to have personally used a product; sponsored content shows your
product in generated scenes, quotes your claims as yours, or shares what our team found when we tested it. Paid posts are
marked #ad and use each platform's paid-partnership label.
```

### 4. Build the rate card (20 min)

Read [references/rate-benchmarks-2026.md](references/rate-benchmarks-2026.md). Method:

1. **Anchor on views, not followers.** Base fee per deliverable = median views (last 20 posts) × CPM ÷ 1000. 2026 working
   CPM bands for organic creator content: TikTok $10–25, Instagram Reels $15–30, YouTube Shorts $10–20, X post $5–15,
   Telegram channel post $8–20 per 1k views. These are working bands derived from the 2026 tier benchmarks in the
   reference file, not a published standard; niche moves them a lot.
2. **Sanity-check against tier benchmarks** (Instagram micro 10–50k followers: $200–2,000 per post; TikTok micro
   $500–2,000; X ≈ $2 per 1,000 followers per post). If the CPM method lands far outside the tier band, use the band edge
   and note why.
3. **AI-character adjustment.** Generated content has lower production cost per asset but more review overhead. Do not
   discount below the band because "it's AI"; price the outcome. Do add a creative fee if the brand wants a custom scene
   set (new wardrobe, location, product placement renders).
4. **Add-ons** (percent of base fee): usage rights for brand organic channels 30 days +20–30 %, paid usage (whitelisting /
   Spark Ads / Partnership Ads) 30 days +30–50 %, perpetual usage +100 % or refuse; category exclusivity 30 days +15–25 %,
   90 days +40–60 %; rush (< 5 business days) +25 %; extra revision round beyond two +10 %; raw generated assets +25–50 %.
5. **Bundles** at 10–15 % below the sum of parts to steer brands toward multi-platform packages.
6. Fill `templates/rate-card.csv`. Show "from" prices in the kit; keep the full sheet for quotes.

### 5. Assemble the kit (15 min)

Use `templates/media-kit.md`. Fixed order, one page when exported:

1. Header: character name, one-line positioning, handles (with platform names), contact.
2. AI disclosure block (Step 3).
3. Audience at a glance: per-platform followers, median views, engagement rate (formula named), window + date.
4. Audience demographics: top 3 countries, age bands, split as reported.
5. Content pillars and formats with 3 links to best posts (and why they worked in one line each).
6. Past partners / case studies (format in Step 8). If none yet: "Selected organic results" with the same structure.
7. Deliverables and "from" prices, add-ons line, turnaround.
8. What we do not promote (exclusion list).
9. Contact and next step: "Reply with your goal and dates; we send a quote within 2 business days."

Fill `templates/media-kit.json` too; the site or a PDF step renders from it. Keep both files in sync (same numbers, same
date). Have a person read the whole kit before it leaves the machine.

### 6. Write the exclusion list (5 min)

State what the account will not promote. For a crypto-adjacent AI character, at minimum:

- No paid promotion of tokens, memecoins, exchanges, trading signals, leverage, or "earn" products. In the UK that is a
  regulated financial promotion (FCA regime since Oct 2023); on TikTok crypto branded content is banned; in the EU MiCA
  puts marketing duties on the issuer that a creator post rarely satisfies. See
  [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md).
- No gambling, adult content, weight-loss or medical claims, payday lending, political ads.
- No fake reviews or testimonials written as if the character used the product (FTC Consumer Reviews and Testimonials Rule).
- No products for under-18s targeted at minors.

The one exception for platform-native items (for example a coin launched on the Claudia launchpad) is organic,
disclosed, education-only talk with "Not financial advice", never paid promotion and never on TikTok.

### 7. Choose who to pitch (15 min)

Read [references/pitching-playbook.md](references/pitching-playbook.md). Build a list of 15–30 brands in a CSV
(`brand, category, why_fit, evidence_url, contact_route, contact_name, status`). Evidence of fit means one of: they
already sponsor creators of similar size; their audience overlaps the account's top country and age band; they ran an
AI/creator-tool campaign in the last 6 months. Rank by fit, pitch the top 5–8 first. Prefer a brand's creator/partnerships
inbox or an introduction through a creator marketplace over cold DMs; never mass-message.

### 8. Write case studies (10 min each)

Format (keep to 6 lines):

```text
<Brand or "Organic test">, <month year>, <platform>
Goal: <what they wanted, in their words>
Deliverable: <1 Reel + 1 X thread + 1 Telegram post, labelled #ad + AI>
Result: <median-comparable numbers: 48k views (4.9× account median), 3.1% ER by reach, 1,240 link clicks, 61 sign-ups via UTM>
What worked: <one sentence>
Quote: <brand contact's words, with permission, or omit>
```

Only real numbers from platform analytics and UTM reports. If a result was weak, either leave it out or say what was
learned; never pad it.

### 9. Write and approve the pitch (20 min)

Use `templates/pitch-scripts.md`. Every pitch has: a subject line with their product name, one line of why them (a
specific campaign or product), one line of proof (a number), the AI disclosure in plain words, a concrete idea (not "a
collab"), the "from" price or the offer to send one, a single call to action. 90–140 words. Personalise every send; the
agent drafts, a person reviews and sends from a real inbox. One pitch per brand per channel.

### 10. Follow up and log (ongoing)

Cadence: pitch day 0 → follow-up 1 on day 4–5 (add one new piece of evidence) → follow-up 2 on day 10–12 (short, offer
an alternative format) → close the loop on day 21 ("I'll stop here; kit stays current at <link>"). Three touches maximum,
then wait at least 90 days or until there is genuinely new news. Log every touch in the brand CSV (`status`: drafted,
sent, followed-up-1, followed-up-2, replied, call, quoted, won, lost, paused). Move anything that replies to
[brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md).

### 11. Refresh quarterly

Every 90 days: re-pull numbers (Step 2), update the date, swap best posts, add new case studies, re-check benchmark bands.
A kit with numbers more than 90 days old should not be sent.

## Templates

- [templates/media-kit.md](templates/media-kit.md): the one-page kit with every section in order.
- [templates/media-kit.json](templates/media-kit.json): the same data as JSON for a website card or PDF render.
- [templates/rate-card.csv](templates/rate-card.csv): deliverables, base fee, CPM basis, add-ons, bundle prices.
- [templates/pitch-scripts.md](templates/pitch-scripts.md): cold email, warm intro, DM to a partnerships account,
  follow-ups 1–2, close-the-loop, reply to "send your rates", reply to "is she real?".

Worked examples:

- [examples/claudia-media-kit.md](examples/claudia-media-kit.md): Claudia's full kit with numbers and rate math.
- [examples/juno-pitch-sequence.md](examples/juno-pitch-sequence.md): Juno's operator pitching a fictional travel eSIM app
  (Driftlane), from list to signed quote, including a declined crypto request.

A quick draft from the terminal (the agent writes, a person sends):

```sh
claudia agent -p "Draft a 120-word pitch to Northpine's partnerships team for one Reel + one X thread featuring their
travel headphones in a rainy-street scene. Proof: median Reel views 9.8k, ER by reach 4.6%. Include the AI disclosure
sentence verbatim from media-kit.md. No price promises, no claims Claudia used the product." --json
```

## Check before you finish

- [ ] Every number has a window and a date, comes from native analytics, and matches `media-kit.json`.
- [ ] Medians shown; outliers named separately; engagement-rate formula stated.
- [ ] No summed "total reach" without the per-platform list; nothing rounded up.
- [ ] AI disclosure block is in the top third of the kit and names the operator.
- [ ] Exclusion list present; crypto paid promotion excluded; no "she tried it and loved it" style claims anywhere.
- [ ] Rate card has base fee method, add-ons and bundles; "from" prices in the kit match the CSV.
- [ ] Every case study uses real, attributable numbers.
- [ ] Each pitch is personalised, under 140 words, includes the AI disclosure and one CTA.
- [ ] A person approved the kit and each outbound message; nothing was sent in bulk.
- [ ] Contact goes to an inbox a human reads. No secrets or private analytics exports attached.

## Pitfalls

- **Follower-count pricing on short video.** Views per post vary 10× at the same follower count. Price from median views.
- **Hiding the AI.** Brands find out, and in the US an undisclosed virtual endorser is treated as deceptive; in the UK the
  CMA can fine directly under the DMCC Act. Disclose first; it filters out bad-fit brands early.
- **Testimonial language.** "I've been using X for weeks" from a generated character is a fake testimonial. Use "here's
  what X does" or the operator's real test.
- **Taking crypto money for posts.** The kit should say no before anyone asks. See
  [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md).
- **Stale kits.** A 6-month-old kit with a dead best post link costs more credibility than no kit.
- **Pitching with vanity numbers** (total impressions across all time, cumulative likes). Brands compare per-post medians.
- **Mass outreach.** Copy-paste pitches to 200 brands get the domain flagged as spam and teach nothing. 5–8 researched
  pitches a week is plenty.
- **Underpricing usage rights.** Paid usage turns the content into an ad the brand runs at scale; it is a separate fee.
- **Fake engagement to lift the kit.** Bought followers, pods or engagement groups wreck engagement rate and violate
  platform rules and the FTC rule on fake indicators. See [engagement-and-replies](../engagement-and-replies/SKILL.md).

## Related skills

- [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md): negotiation, contracts, delivery and reporting.
- [kpi-reporting](../kpi-reporting/SKILL.md): where the kit's numbers come from, formulas and UTM tracking.
- [monetization-streams](../monetization-streams/SKILL.md): where sponsorships fit among other income.
- [personal-brand-strategy](../personal-brand-strategy/SKILL.md): positioning line and brand categories.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md): why the exclusion list exists.
- [collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md): unpaid collaborations that become case studies.
- [../../create/ai-disclosure-and-provenance/SKILL.md](../../create/ai-disclosure-and-provenance/SKILL.md): labels and
  provenance on the content itself.
- [../../create/claudia-character-bible/SKILL.md](../../create/claudia-character-bible/SKILL.md): the character facts the
  kit must match.
