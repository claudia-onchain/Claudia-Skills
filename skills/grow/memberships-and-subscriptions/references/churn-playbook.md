# Churn playbook

Read in step 8, the first time you fill the monthly metrics. Churn is members leaving. A membership with steady sign-ups
and high churn is a leaking bucket; fixing churn is usually cheaper than finding new members.

## Measure it the same way every month

```text
members_start   = paying members on the 1st
cancelled       = members who cancelled or failed payment during the month
new             = members who joined during the month
monthly churn   = cancelled ÷ members_start
net growth      = new − cancelled
average life    ≈ 1 ÷ monthly churn   (months; rough)
```

Track **first-60-day churn** separately: cancellations from members who joined in the last two months ÷ members who
joined in that window. That number says whether the welcome and first perks work.

## Where churn comes from

| Pattern | Likely cause | Fix |
|---|---|---|
| Cancel within a week of joining | the page promised more than the first perk delivered | welcome post with the best perk inside; a clear "what's coming this month" |
| Cancel after a missed perk | the calendar slipped | 3 weeks of finished perks banked; a person checks the calendar weekly |
| Slow steady loss | perks feel the same every week | rotate formats inside the same promise; let members vote on the next series |
| Spike after a price change | change felt sudden | 30 days' notice; keep the old price for existing members where possible |
| Failed payments | card expiry, app-store billing issues | the platform's payment-retry and reminder messages; a gentle note in the members channel |
| "I didn't know it was AI" | disclosure too quiet | say it on the membership page, in the welcome, and in the channel description |

## Welcome sequence (first 14 days)

1. **Day 0:** a welcome post or message: what you get, when it arrives, where to find the back catalogue, and that the
   creator is an AI character run by `<person>`.
2. **Day 1–3:** the best existing perk, pinned.
3. **Day 7:** a members-only poll that changes something real (next series, next wallpaper colour).
4. **Day 14:** a short "how's it going?" question; read every answer.

Drafts can come from the agent; a person approves and sends.

## Exit questions

Where the platform allows a cancel reason, keep it to one question with fixed answers plus free text:

```text
What's the main reason you're leaving?
( ) Too expensive  ( ) Not enough time to enjoy it  ( ) Perks weren't what I expected  ( ) Missed perks
( ) I only wanted one thing  ( ) Other: ______
```

Never add friction to cancelling (extra screens, hidden links, "are you sure" loops). Make leaving as easy as joining.

## Win-back

- One message 30 days after cancelling, only if the platform allows it and the person didn't ask for no contact:
  what changed since they left, no discount pressure. Never more than one.

## Healthy ranges

There's no platform-published benchmark for small creator memberships. Use your own trend: churn falling or stable
month over month is healthy; first-60-day churn above the overall rate means the start is weak.
