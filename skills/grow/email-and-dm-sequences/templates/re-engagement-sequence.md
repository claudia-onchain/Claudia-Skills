# Re-engagement sequence (3 emails, then clean the list)

Who gets it: subscribers with no click (and no reply) in the last <90–120> days. Use clicks and replies, not opens:
privacy features in mail apps can load images automatically, so opens overcount.

Goal: bring back the people who still want the emails, and remove the rest so deliverability stays healthy.
Sending to people who never engage teaches inbox providers that your mail is unwanted.

---

## 1. Day 0: "still want these?"

**Subject:** still want these?
**Preview text:** one click either way

Hi {{first_name | fallback: "there"}},

You haven't clicked anything from me in a while, which is fine. Inboxes get busy.

Do you still want <newsletter name>?

- **Yes, keep me on:** <confirm link>
- **Less often:** <monthly digest link>
- **No thanks:** <unsubscribe link>

If I don't hear from you, I'll stop emailing in two weeks.

<sign-off>

---

## 2. Day 5: "the best of what you missed"

**Subject:** 3 things from <newsletter name> worth your 5 minutes
**Preview text:** then you can decide

<Three links to the best recent issues, one line each. Then the same three choices as email 1.>

---

## 3. Day 12: "last email unless you click"

**Subject:** removing you on <date> (unless you want to stay)
**Preview text:** one click keeps you on

Hi {{first_name | fallback: "there"}},

This is the last email unless you click below. On <date>, I'll remove you from the list so I'm not cluttering
your inbox.

**Keep me on:** <confirm link>

Thanks for reading while you did.

<sign-off>

---

## Day 14: clean-up (operator task, not an email)

1. Anyone who clicked "keep me on" or "less often": tag `re-engaged` and move to the right cadence.
2. Anyone who did nothing: unsubscribe or archive them in the platform (most platforms do not bill for unsubscribed
   or archived contacts; check yours). Do not import them back later.
3. Note the numbers in the growth dashboard: sent, re-engaged, removed.
