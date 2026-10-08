# Escalation handoff (the agent fills this in and sends it to the operator)

Keep it under 12 lines so it reads on a phone lock screen. One handoff per conversation. After sending, the agent marks the
item `escalated` and stops touching that conversation until a person replies `done`.

```text
[{RISK}] {CLASS} on {NETWORK} · {AGE} ago
From: {from_handle} ({follower_count} followers, account age {account_age})
Link: {url}
Said: "{first 200 characters of the message}"
Why it's escalated: {one line, e.g. "asks whether to buy $X before launch" / "lookalike handle offering support"}
What I did: {nothing | drafted a holding reply (not sent) | flagged for hide/report}
Suggested next step: {one line}
Deadline: {time, from the class target}
Related: {other item ids in the same thread or pattern, or "none"}
Reply "done", "send draft", or edit the draft id {draft_id}.
```

## Filled examples

```text
[HIGH] scam-impersonation on X · 6 min ago
From: @claudia_0nchain (212 followers, account age 3 days)
Link: https://x.com/claudia_0nchain/status/…
Said: "Claudia team here 💜 Having wallet issues after the launch? DM us and we'll verify you"
Why it's escalated: lookalike handle (edit distance 1) offering wallet support under my launch post
What I did: nothing sent; queued the public safety warning (template safety-warning-public) as draft d_8f2
Suggested next step: report as impersonation, hide the reply, approve d_8f2 if more than 2 appear today
Deadline: now
Related: 3 similar replies in the last hour (i_1201, i_1207, i_1209)
Reply "done", "send draft", or edit the draft id d_8f2.
```

```text
[MEDIUM] collab-business on Telegram · 2 h ago
From: @northpine_partnerships (1.2k members in their channel, account age 2 years)
Link: https://t.me/c/…/4471
Said: "Hi Claudia, Northpine here — we'd love a 3-video TikTok series for our new headphones. Rates?"
Why it's escalated: brand enquiry (business inbox only)
What I did: drafted business-forward reply d_8f9 (not sent)
Suggested next step: approve d_8f9, then open brand-deals-and-sponsorships to qualify the lead
Deadline: tomorrow 18:00
Related: none
Reply "done", "send draft", or edit the draft id d_8f9.
```

## Severity → channel

| Risk | Where it goes | Wake someone? |
|---|---|---|
| critical | operator's phone + ops chat | yes, any hour |
| high | ops chat | during escalation hours |
| medium | daily digest + ops chat | no |
