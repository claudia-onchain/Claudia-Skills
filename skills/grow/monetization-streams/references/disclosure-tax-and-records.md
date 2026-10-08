# Disclosure, tax basics and record keeping

Read when setting up the ledger, before the first sponsored or affiliate post, and before tax season. Summaries, not legal
or tax advice; the operator confirms with a professional where they live (checked 2026-10).

## Disclosure rules per jurisdiction

**US — FTC**
- Endorsement Guides (16 CFR Part 255, revised 2023): any material connection (payment, free product, affiliate commission,
  family/business tie) must be disclosed clearly and conspicuously, close to the claim, in the content itself. "#ad",
  "Ad", "Sponsored", "Paid partnership" work; "#sp", "#collab", "thanks Northpine" alone don't. Virtual influencers are
  endorsers too, and an AI character can't make claims of personal experience it didn't have.
- Consumer Reviews and Testimonials Rule (16 CFR Part 465, in force October 2024): bans fake or AI-generated reviews and
  testimonials, buying or selling fake social-media indicators (followers, views), and suppressing negative reviews. Civil
  penalties up to $53,088 per violation (inflation-adjusted figure, checked 2026-10).
- 2026 practice: disclose AI generation separately from the paid relationship; "#ad" doesn't say "AI" and vice versa.
- Earnings claims: don't tell followers what they can earn using your product or method.
- Source: ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews.

**UK — CMA and ASA**
- Joint influencer guidance updated January 2026: label incentivised content ("#ad" or "Ad") up front, before anyone has to
  click "more"; this covers payment, gifts, affiliate links, discount codes and promoting your own products.
- Since 6 April 2025 the CMA can fine directly under the DMCC Act 2024 for hidden advertising: up to 10% of global turnover or
  £300,000, whichever is higher.
- Crypto: promotion to UK consumers is a regulated financial promotion (FCA). See
  [crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md).
- Sources: gov.uk/government/publications (CMA influencer guidance), asa.org.uk/resource/influencers-guide.html.

**EU**
- Unfair Commercial Practices Directive: hidden advertising is banned; national regulators publish influencer rules
  (labels in the local language help).
- Crypto marketing: MiCA Article 7 (identifiable as marketing, fair/clear/not misleading, mandatory statement, offeror liable).

## Disclosure lines to copy

```text
Sponsored post (any platform): "#ad · AI-generated character. Made with Northpine, who paid for this post."
Gifted product:                "#ad (gifted) · AI-generated."
Affiliate link:                "Affiliate link, I earn a commission: <link>"
Own product:                   "My own pack, made with AI. <link>"
Coin you created:              "I created $<SYMBOL> and receive creator rewards (70% of its creator fees). Not financial advice."
```

In `@useclaudia/social`: `labels: { ad: true }` adds `#ad` and sets X `paid_partnership` and TikTok `brand_organic_toggle`;
`labels.ai` (default on) sets each platform's AI flag. On Instagram also tick Paid partnership in the app or the posting
service.

## Record keeping

Keep for at least 6 years (a common requirement; check yours):
- Every payout: date, platform, stream, gross, platform fee, net, currency, FX rate to your reporting currency on that date,
  payout reference (`templates/income-ledger.csv`).
- Onchain receipts: transaction signature, wallet, token amount, SOL/USD (or token/USD) rate at receipt, and later sweeps or
  sales with their own rates.
- Contracts and briefs for every deal; invoices sent; proof of delivery (post URLs, screenshots with dates).
- Platform monthly statements (download them; dashboards don't keep history forever).
- Costs: X API invoices, posting-service plans, generation spend, tools, hardware.

## Tax basics to raise with an accountant

- Platform tax forms: US platforms ask for W-9 (US persons) or W-8BEN / W-8BEN-E (non-US) before paying; missing forms mean
  withholding. US creators may receive 1099-NEC/1099-K.
- Platform reporting: EU platforms report seller income under DAC7; the UK's digital platform reporting rules (from
  January 2024) have platforms report sellers' income to HMRC. Assume tax authorities see platform payouts.
- Crypto: in the US, the UK and many other places, crypto received as payment or reward is income at its market value when
  received, and a later sale or swap can be a taxable disposal. Keep both values.
- VAT/GST on digital product sales to consumers can apply in the buyer's country; storefronts that act as merchant of record
  handle it, direct sales may not.
- Separate a business bank account and a separate wallet for income; it makes records and audits simpler.

## Monthly records routine (15 minutes)

1. Download statements from each platform and service; save as `YYYY-MM-<platform>.pdf/csv`.
2. Add each payout to the ledger with the day's FX rate.
3. Export the rewards wallet's incoming transfers (`claudia watch wallet` log or an explorer export) and reconcile.
4. Log costs.
5. Update the revenue mix plan actuals and run `node scripts/revenue-mix.mjs`.
