# Deliverability basics for a growing newsletter

Read this in step 3, before the list passes a few hundred people, and again whenever click rates drop suddenly or
readers say issues land in spam. Checked 2026-10 on the inbox providers' own sender pages.

## The five things that decide whether you reach the inbox

1. **Authentication on your own domain.** Send from `newsletter@<yourdomain>`, not a free mailbox. Add the SPF, DKIM
   and DMARC records your platform gives you. DMARC can start at `p=none`.
2. **People who asked for it.** Double opt-in, no imported strangers, no bought lists. Every sign-up source is one you
   could show a regulator (see [../../email-and-dm-sequences/references/consent-and-anti-spam-law.md](../../email-and-dm-sequences/references/consent-and-anti-spam-law.md)).
3. **Easy, instant unsubscribe.** One-click unsubscribe headers (RFC 8058) plus a visible link. Platforms add both; don't
   hide the link.
4. **Low complaints.** Spam-button presses divided by delivered mail. Gmail requires under 0.30% and recommends under
   0.10%; Yahoo's limit is 0.3% (checked 2026-10).
5. **Engagement.** Clicks and replies tell providers your mail is wanted. Remove people who haven't clicked in 90–120
   days after a re-engagement series.

## Bulk-sender rules (checked 2026-10)

| Provider | Applies at | Requires |
|---|---|---|
| Gmail | 5,000+ messages a day to Gmail addresses | SPF + DKIM, DMARC (`p=none` minimum), From aligned with SPF or DKIM domain, one-click unsubscribe, spam rate under 0.30%, unsubscribes processed within 48 hours. Stricter enforcement with rejections ramped up from November 2025. |
| Yahoo | bulk senders | SPF, DKIM, DMARC `p=none` minimum, one-click unsubscribe, "Honor unsubscribes within 2 days", spam rate under 0.3% |
| Outlook.com | 5,000+ messages to Microsoft consumer addresses from one From domain | SPF and DKIM pass, DMARC published and passing with alignment; non-compliant mail is rejected (`550 5.7.515`) |

## Why open rates lie

Apple Mail's Protect Mail Activity downloads remote content privately in the background, which stops senders learning
"when and how many times you view it" (Apple). Tracking pixels fire whether or not anyone read the issue, so opens
overcount. Use **click rate**, **replies** and **unsubscribe rate** as the health metrics, and treat opens as a trend
at best.

## Warning signs and first fixes

| Sign | Likely cause | First fix |
|---|---|---|
| Click rate halves in one week | Landing in spam or Promotions at one provider | Check Google Postmaster Tools; send a plain issue with fewer links and images; ask engaged readers to reply |
| Complaints over 0.1% | Mail people don't remember signing up for | Remind them why they're getting it at the top; tighten sources; run re-engagement |
| Bounces over 2% on one send | Old or imported addresses, typos | Clean hard bounces; turn on double opt-in |
| Sudden spike in sign-ups from one source | Bot sign-ups or list bombing | Turn on captcha and double opt-in; remove unconfirmed |

## Sources (checked 2026-10)

- https://support.google.com/a/answer/81126 and https://support.google.com/a/answer/14229414
- https://senders.yahooinc.com/best-practices/
- https://support.microsoft.com/en-us/outlook/fix-ndr-error-550-5-7-515-in-outlook-com
- https://support.apple.com/guide/mail/protect-email-privacy-mlhlp1205/mac
