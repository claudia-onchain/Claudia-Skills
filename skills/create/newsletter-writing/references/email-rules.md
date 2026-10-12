# Email rules for a creator newsletter (checked 2026-10)

Read before the first issue and whenever the sending setup changes. This is orientation, not legal advice. Your
platform (Substack, beehiiv, Kit, Ghost and others) handles much of the sending side; you still own the content.

## US: CAN-SPAM (FTC compliance guide)

Applies to commercial email, which includes most newsletters that promote anything, including your own products.

1. **Accurate headers.** From, To, Reply-To and routing must identify who sent it.
2. **Honest subject lines.** They can't be deceptive and must reflect the content.
3. **Ads identified.** If the message is an advertisement, disclose it clearly and conspicuously.
4. **Postal address.** Include a valid physical postal address.
5. **Opt-out.** A clear way to stop marketing email (link or reply). It must work for at least 30 days after sending,
   requests must be honoured within 10 business days, and opting out can't cost money, require more than an email
   address, or take more than a reply or one web page visit.
6. **Penalties.** Up to $53,088 per violating email (FTC figure at time of checking).

Source: ftc.gov, "CAN-SPAM Act: A Compliance Guide for Business".

## Gmail sender requirements (Google Workspace Admin Help)

All senders: SPF or DKIM on the sending domain, valid forward and reverse DNS, TLS, a spam rate in Postmaster Tools
below 0.3%, RFC 5322 formatting, no impersonating Gmail From headers.

Bulk senders (5,000+ messages a day to Gmail accounts): SPF, DKIM **and** DMARC (policy may be `none`); From domain
aligned with SPF or DKIM; **one-click unsubscribe** for marketing and subscribed messages (`List-Unsubscribe` and
`List-Unsubscribe-Post: List-Unsubscribe=One-Click` headers) plus a visible unsubscribe link in the body; spam rate
below 0.30%, with Google recommending staying below 0.10%.

Most newsletter platforms set the headers for you; if you send from your own domain, the domain records (SPF, DKIM,
DMARC) are yours to set. Source: support.google.com/a/answer/81126.

## Sponsorships and affiliate links

- US FTC Endorsement Guides: a paid, gifted or affiliate relationship must be disclosed clearly, next to the
  endorsement, in words a reader understands ("Sponsored by", "#ad", "I earn a commission if you buy through this
  link"). A footer note alone is not enough.
- Say what was given: money, product, access, revenue share.
- Deeper rules and contracts: [brand-deals-and-sponsorships](../../../grow/brand-deals-and-sponsorships/SKILL.md).

## AI disclosure

House rule for every Claudia skill: label AI-generated content, always, in plain words. For an issue:

- If a character such as Claudia "writes" it: say she is an AI character and who reviews and sends it.
- If an operator wrote it with AI drafting help: "Drafted with AI, edited by <name>."
- AI images in the issue: alt text starts "AI-generated image:".

The EU AI Act's Article 50 transparency duties apply from 2026-08-02. Details and how they treat text with human
editorial review: [ai-disclosure-and-provenance](../../ai-disclosure-and-provenance/references/laws-and-standards.md).

## Coins and money

- A coin, ticker or contract address appears only as news or education, with "Not financial advice."
- No price predictions, return promises, "buy" calls, countdowns or links that buy a coin.
- UK readers: crypto promotions to UK consumers are regulated financial promotions; EU readers: MiCA marketing must
  be fair, clear and not misleading. Assume both read your list.
- Full decision tree: [crypto-marketing-compliance](../../../grow/crypto-marketing-compliance/SKILL.md).

## Consent

- Email only people who subscribed. Never import followers, buy lists or scrape addresses.
- Keep the unsubscribe link working and visible in every issue, including sponsored ones.
