# Consent and anti-spam law: the basics for creators

Read this before building a sign-up form, importing any list, or sending a launch email to people in the US, UK, EU or
Canada. It is a practical summary, not legal advice; a business with real exposure should ask a lawyer in its own
country. Facts checked 2026-10 on the regulators' own pages (sources at the end).

## The safe default that satisfies all of them

1. Collect email only through a form where the person types their address and actively agrees to a described email
   (no pre-ticked box), then confirms with a double opt-in click.
2. Store the consent record: address, date and time, form URL, the exact wording they agreed to, IP or source.
3. Send only what you described. Every email names the sender, has a working one-click unsubscribe, and has a
   physical postal address.
4. Honour unsubscribes immediately (automatically, in the platform), never later than 2 days.
5. Never buy, rent, scrape or "borrow" a list, and never import contacts who didn't opt in to *your* publication.

Everything below explains why.

## United States: CAN-SPAM (FTC)

CAN-SPAM covers commercial email and applies even to business-to-business mail. The FTC's compliance guide lists seven
main requirements:

1. No false or misleading header information (From, To, Reply-To, routing).
2. No deceptive subject lines.
3. Identify the message as an ad (when it is one).
4. Include a valid physical postal address (street address, PO box, or a registered private mailbox).
5. Tell recipients how to opt out.
6. Honour opt-outs promptly: within **10 business days**, and keep the opt-out mechanism working for at least
   **30 days** after sending.
7. Monitor what others do on your behalf: you can't contract away responsibility (agencies, ghostwriters, agents).

Penalty: up to **$53,088 per separate email** in violation (checked 2026-10; the FTC kept the 2025 level for 2026).

CAN-SPAM is opt-out law: it does not require consent to send. Inbox providers do (see deliverability below), and so do
the platforms (Substack, beehiiv, Kit all require opted-in lists). Treat consent as required in practice.

SMS is different: autodialled marketing texts need **prior express written consent** under the TCPA, and revocations
made in any reasonable way must be honoured within 10 business days (47 CFR 64.1200, checked 2026-10).

## UK: PECR and UK GDPR (ICO)

- "You must not send marketing emails or texts to individuals without specific consent." (ICO)
- **Valid consent** is "freely given, specific, informed and unambiguous". "Silence, pre-ticked boxes or inactivity
  should not therefore constitute consent." You must be able to show that someone consented, and withdrawing must be as
  easy as giving consent.
- **Soft opt-in** (commercial senders only): you may email existing customers without fresh consent if all of these
  hold: they bought or negotiated to buy something from you; you're marketing your own similar products; you gave
  them a simple way to opt out when you collected the address; and every message offers the opt-out again. It does not
  cover prospects, bought lists, or newsletter sign-ups who never bought anything.
- **Corporate subscribers** (companies, LLPs, government bodies) can be emailed without consent, but sole traders and
  some partnerships count as individuals.
- **Fines:** since the Data (Use and Access) Act 2025 took effect for PECR on 5 February 2026, PECR fines can reach
  **£17.5 million or 4% of global turnover** (ICO, checked 2026-10).
- Charities have a new "charitable purpose soft opt-in" since 5 February 2026 (for details collected from that date).

## European Union: GDPR

The same consent standard applies (freely given, specific, informed, unambiguous; provable; easy to withdraw). The
email-marketing rules themselves come from each member state's law under the ePrivacy Directive, so details differ by
country; check the national regulator's guidance for the countries most of your readers live in, and use the safe
default above.

## Canada: CASL

- **Express consent** has no time limit unless withdrawn.
- **Implied consent** lasts up to **2 years** after a purchase or contract, or **6 months** after an inquiry.
- Unsubscribes must be actioned within **10 business days**, at no cost to the recipient; sender contact details must
  stay valid for at least **60 days** after sending.
- The sender must prove consent. Penalties reach $1 million per violation for individuals and $10 million for
  businesses (CRTC).

## What this means for DMs

Platform DMs are governed mostly by each platform's terms (see dm-platform-rules.md), but the same idea holds: the
person asks first, you answer what they asked, and you stop the moment they say stop.

## Deliverability rules that behave like law

Inbox providers enforce these on bulk senders, and newsletter platforms set most of them up for you:

| Provider | Threshold | Must have (checked 2026-10) |
|---|---|---|
| Gmail | 5,000+ messages a day to Gmail | SPF and DKIM; DMARC (`p=none` is enough); From domain aligned with SPF or DKIM; one-click unsubscribe headers (RFC 8058) plus a visible unsubscribe link; spam rate under 0.30% in Postmaster Tools (aim under 0.10%); unsubscribes processed within 48 hours. Enforcement with rejections ramped up from November 2025. |
| Yahoo | bulk senders | SPF, DKIM, DMARC at least `p=none`; one-click List-Unsubscribe and a visible link; "Honor unsubscribes within 2 days"; spam rate under 0.3%. |
| Outlook.com | 5,000+ messages to Microsoft consumer mailboxes from one From domain | SPF and DKIM pass, DMARC published (at least `p=none`) and passing with alignment; otherwise rejected with `550 5.7.515`. |

Even below 5,000 a day, set up SPF, DKIM and DMARC on a custom sending domain: the rules are where all mail is heading.

## Sources (checked 2026-10)

- FTC CAN-SPAM guide: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- FTC 2026 penalty notice: https://www.federalregister.gov/documents/2026/09/15/2026-18853/civil-penalty-inflation-adjustments
- TCPA rule: https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200
- ICO email marketing: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/
- ICO valid consent: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/what-is-valid-consent/
- ICO DUAA commencement: https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/02/statement-on-the-commencement-of-the-data-use-and-access-act-duaa/
- CASL consent: https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en/getting-consent-send-email
- CRTC CASL FAQ: https://crtc.gc.ca/eng/com500/faq500.htm
- Gmail sender guidelines: https://support.google.com/a/answer/81126 and FAQ https://support.google.com/a/answer/14229414
- Yahoo sender best practices: https://senders.yahooinc.com/best-practices/
- Outlook.com high-volume senders: https://support.microsoft.com/en-us/outlook/fix-ndr-error-550-5-7-515-in-outlook-com
