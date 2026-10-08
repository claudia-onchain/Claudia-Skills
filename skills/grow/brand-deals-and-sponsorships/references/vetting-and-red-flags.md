# Vetting inbound offers and red flags

Read this in step 2, for every inbound offer, before opening any attachment or link. An agent can do most of this
checking; a person makes the call.

## 10-minute vetting routine

1. **Domain:** does the email domain exactly match the brand's real website (not `northpine-partners.co`,
   `northpine.agency`, `northp1ne.com`)? Look the brand up independently; don't use links in the email.
2. **Domain age:** a WHOIS / RDAP lookup; younger than 12 months for an "established brand" = stop.
3. **Person:** does the sender appear on the company site or a professional profile with history? Agencies: is the
   agency real, and does the brand list it?
4. **Reply path:** reply to an address you found on the brand's own site, or ask them to confirm from it.
5. **Ask, don't click:** request the brief in the email body or as a shared doc you open in a sandboxed browser
   profile. Never run "contract.exe", ".scr", ".lnk", password-protected archives, or "install our beta to review".
6. **Money flow:** legitimate brands pay you. Any fee you pay first (shipping, onboarding, "verification", gas) = scam.
7. **Account access:** nobody needs the account's password, 2FA codes, session cookies or an "admin" invite to the
   social account. Paid usage is granted with platform tools (Spark code, partnership ads), never credentials.
8. **Category check** against [platform-branded-content-rules.md](platform-branded-content-rules.md).
9. **Crypto check** (below).
10. **Fit check:** would this make sense to the audience of the account? If not, decline politely.

## Red flags (any one = decline or escalate)

**Scam patterns**
- Lookalike domains, free-mail addresses for "brand managers", urgency ("respond within 2 hours").
- Attachments that are executables or archives; links to "download the product app" before any contract.
- Overpayment schemes ("we sent too much, refund the difference").
- Requests to log in somewhere with the social account, or to add their "manager" as an account admin.
- Offers far above market for trivial work (a $5,000 "single story mention" from an unknown brand).

**Brand-safety flags**
- No real product page, no reviews, no company registration you can find.
- Asks to hide `#ad`, to say "not sponsored", to not mention AI, or to post "as if you found it yourself".
- Wants first-person experience claims from an AI character ("say you've used it for a month").
- Health, money, legal or performance claims without written substantiation.
- Targets minors or wants youth-coded content.

**Crypto flags**
- "Just post our contract address", "pin our CA", "launch is Friday, tease it".
- Payment in the project's own token, or "allocation" / "presale access" as payment.
- Requests to post buy links, staking yields, APYs, "guaranteed listing", price targets, "100x", "early".
- Wants UK or EU followers targeted; no white paper; no authorised firm approving the promotion.
- Asks to delete the post after a set number of hours (pump-and-dump timing).
- Wants the post on TikTok at all.

Any of these: decline. If it's a real, regulated firm with a lawful promotion, it goes through
[crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md) first, and still never onto TikTok.

## Reporting scams

- Report the sender in-platform (X, Instagram, TikTok, Telegram all have "report as scam").
- If a real brand is being impersonated, tell the brand via its official contact.
- Keep the evidence (headers, screenshots) with the deal file.
- If someone in the community might be targeted by the same people, a short warning post is fine; don't name private
  individuals without evidence. See [crisis-and-reputation](../../crisis-and-reputation/SKILL.md).

## Agent behaviour for inbound offers

An agent that reads the inbox (`social.inbox()` for mentions/DMs where the network allows) should:

- Tag offers as `deal-inbound` and summarise them for the operator: sender, claimed brand, ask, budget, flags found.
- Never reply with acceptance, rates or invoices on its own. It may send a holding reply the operator pre-approved:
  "Thanks! A person on Claudia's team reviews partnership requests and will reply within 3 working days."
- Never open attachments or links in an offer.
- Rate-limit: one holding reply per sender, ever.
