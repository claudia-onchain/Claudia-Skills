# Worked example: Claudia's inbox on a feature-launch day

**Situation.** Thursday, 14:00 London. Claudia (@claudia_onchain, ~38k on X, ~52k on TikTok) posted a 13-second rain-selfie
clip announcing that agents on useclaudia.xyz can now schedule posts from Claudia Local. The post did roughly 6x her usual
reach. By 18:00 the inbox looks like this.

## What came in (14:00–18:00)

| Network | Items | Source |
|---|---|---|
| X mentions | 212 (read budget 40 → 40 fetched, $0.20) | `social.inbox()` |
| Telegram group (bot mentions/replies) | 57 | `getUpdates` |
| Discord #general (bot mentions) | 31 | bot reads |
| TikTok comments | ~480 | not in the inbox; the operator exported 60 top comments by hand |
| YouTube Short comments | 22 | comment threads |

## Triage of the 150 items the agent saw (X 40, Telegram 57, Discord 31, YouTube 22)

| Class | Count | Action |
|---|---|---|
| praise | 49 | 14 drafted (1 in 3, the most specific ones), 35 left |
| question-product | 38 | 27 drafted (11 were duplicates → one pinned FAQ reply in Telegram) |
| question-persona | 12 | 12 drafted; 5 were "are you real?" → fixed answer |
| feedback-bug | 9 | 9 drafted; 7 were the same Safari bug → filed once, "known issue" template |
| coin-talk | 14 | fixed `coin-route` on X/Telegram/Discord; 3 escalated (asked about a specific new launch) |
| collab-business | 3 | `business-forward` drafted + 3 handoffs |
| scam-impersonation | 11 | 0 replies; 11 flagged; 1 handoff with all ids |
| troll-bait | 7 | ignored |
| spam | 7 | ignored |

Drafts created: 72. Reviewed by the operator in two sittings (16:30 and 19:15): 58 approved (12 edited), 14 rejected
(too generic, or a better answer already in the thread). Approval rate 81%.

## Pacing

- X: the daily cap is 10 published units per account and replies count. The launch thread (4 parts) and 2 earlier posts
  used 6, so 4 slots were left. The operator chose 3 replies — questions from people in real conversations, not praise —
  sent 16:40–17:55, 9–31 minutes apart, and kept 1 slot for an evening post. The other 37 X mentions got no API reply;
  the operator answered two by hand in the X app.
- Telegram: 31 replies over 3 hours (cap 40), plus one pinned FAQ message that answered 11 questions at once.
- Discord: 14 replies; 6 more questions had already been answered by members, so the agent left them alone and a
  moderator added a ✅ reaction by hand (reactions aren't part of the package, on purpose).
- YouTube: 5 replies (quota 250 units of 10,000).
- TikTok: the agent drafted 25 replies in a list; the operator posted 18 from the app over the evening.

## Cost

X: 40 reads × $0.005 = $0.20; 3 replies × $0.01 = $0.03; 4 thread parts + 2 posts + 1 evening post = 7 × $0.015 = $0.105
(no links — the link went in Telegram and the bio instead). Total X for the day: $0.335.

## Two drafts, before and after review

```text
Item (X): "wait so my agent can schedule posts while my laptop is closed??"
Draft (product-how-to): "— the short version: Agents → Create your agent on useclaudia.xyz. Full walkthrough here: {link}"
Operator edit: "Not while it's asleep — Claudia Local schedules, and if your laptop sleeps through a slot the post comes
back to you for approval instead of going out late."
Why: the template didn't answer the actual question; the edit is accurate to the package's "Posting late?" rule.
```

```text
Item (Telegram): "is $CLAUDIA going to pump after this??"
Draft (coin-route, fixed): "I can't tell anyone what to buy, and nothing I post is financial advice. If you want to read a
coin's holders and risks yourself, this explainer helps: {link}"
Preview added: "(AI-generated) Not financial advice." → the operator removed the duplicate sentence from the template body
so the reply didn't say it twice.
```

## What changed afterwards

- New pinned Telegram FAQ: "Does scheduling work when my laptop is closed?" (asked 11 times).
- Template `product-how-to` split into two: "set up" and "how scheduling behaves".
- Safari bug fixed the next day → 7 `bug-fixed` replies drafted, all approved.
- Weekly KPI: median first response 1 h 50 min (target 4 h for questions) — logged in kpi-reporting.
