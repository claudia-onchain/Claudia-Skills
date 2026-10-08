# Meta AI label, branded content and crypto rules (checked 2026-10)

Read this before posting anything with a realistic AI person, a sponsor, a gift, an affiliate code, or a coin.

## AI info label

- Meta requires the disclosure tool when **organic** content contains photorealistic video or realistic-sounding audio
  that was digitally created or altered, and says it may apply penalties when people don't use it. Realistic images of
  people should be labelled too; Meta also auto-labels when it detects C2PA or IPTC signals in the file.
- The label reads "AI info" (or "Made with AI"/"AI-generated" depending on surface and region) and opens a short explanation.
- What does not need the visible label on its own: AI-written captions, AI-suggested hashtags, colour correction,
  noise reduction. Claudia's content is fully generated, so it always needs it.
- How:
  - App: Advanced settings → "Add AI label" before sharing (Reels, posts, Stories).
  - API: `is_ai_generated` on the media container; `@useclaudia/social` sends it whenever `labels.ai` is true (default).
  - Threads: Threads has no separate API flag in `@useclaudia/social`; the package adds the text disclosure "(AI-generated)".
- Keep a caption line as well ("AI-generated character.") — labels don't survive screenshots, reposts or embeds.
- Never strip C2PA metadata to avoid the label. That is evasion and undermines the trust the account depends on.

## Paid partnerships (branded content)

- Any post where the creator gets money, free product, an affiliate commission, a discount code to share, or promotes
  their own business must be disclosed. US: FTC Endorsement Guides (16 CFR 255). UK: CMA + ASA influencer guidance
  (updated Jan 2026) — label "Ad"/"#ad" upfront; DMCC Act lets the CMA fine directly up to 10% of global turnover or £300,000.
- Use Instagram's **Paid partnership** label (Advanced settings → Add paid partnership label → tag the brand partner) **and**
  start the caption with `#ad` or "Ad ·". The platform label alone is not always prominent enough for UK regulators.
- With `@useclaudia/social`, `labels.ad: true` adds `#ad` to the text. Add the platform Paid partnership tag in the app or the
  posting service if the brand needs it for their ads (partnership ads, formerly whitelisting).
- AI characters and endorsements: a virtual influencer can't have personal experience of a product. Don't write
  "I've used this for a month". Write what is true: "Northpine sent the design, I styled the shoot." The FTC's
  Consumer Reviews and Testimonials Rule (16 CFR 465, from Oct 2024) bans AI-generated fake reviews/testimonials and
  buying fake indicators like followers; civil penalties up to $53,088 per violation.
- 2026 commentary on FTC enforcement says AI use in sponsored content should be disclosed **separately** from the sponsorship.
  Do both: `#ad` for the money, "AI-generated character" for the AI.

## Crypto and financial content on Meta

- **Ads** about crypto (exchanges, wallets, tokens) need Meta's prior written permission and local licensing. A creator
  account can't simply boost a coin post.
- **Organic** posts: allowed, but misleading financial claims, promised returns and "get rich quick" content are removed or
  not recommended. Keep coins off Instagram almost entirely; if mentioned, news-only and "Not financial advice."
- **Branded content** for crypto (a token or exchange paying for a post) falls under Meta's branded content policies and the
  restricted-goods rules; it also becomes a regulated financial promotion in the UK (FCA, since Oct 2023) and a MiCA
  marketing communication in the EU. Don't do it from an AI character account. See
  [../../crypto-marketing-compliance/SKILL.md](../../crypto-marketing-compliance/SKILL.md).
- WhatsApp Business doesn't allow crypto promotion at all; `@useclaudia/social` skips WhatsApp for that reason.

## What to do when a label is missing after posting

1. Edit the post → Advanced settings → add the AI label (available after posting for Reels and posts).
2. If it was a paid post without disclosure, add "Paid partnership" and edit the caption to start with `#ad` immediately;
   tell the brand. Note it in the crisis log ([../../crisis-and-reputation/SKILL.md](../../crisis-and-reputation/SKILL.md)).

## Sources

- Meta, labelling AI-generated images and the disclosure requirement — https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/
- Meta, "Our approach to labeling AI-generated content" (update to "AI info") — https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/
- Meta Branded Content Policies — https://www.facebook.com/business/help/221149188908254
- Meta Advertising Standards, financial products and services — https://transparency.meta.com/policies/ad-standards/
- FTC Endorsement Guides — https://www.ftc.gov/legal-library/browse/rules/guides-concerning-use-endorsements-testimonials-advertising
- FTC Consumer Reviews and Testimonials Rule — https://www.ftc.gov/legal-library/browse/rules/consumer-reviews-testimonials-rule
- CMA/ASA influencer guidance — https://www.asa.org.uk/resource/influencers-guide.html
