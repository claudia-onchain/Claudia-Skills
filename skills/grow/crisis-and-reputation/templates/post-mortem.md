# Post-mortem: [INC-YYYY-MM-DD-NN] [one-line title]

Blameless: describe systems, steps and decisions, not people's character. Written within 72 hours. Internal version
first; a short public summary for SEV1/SEV2 (see `references/rebuilding-trust.md`).

| Field | Value |
|---|---|
| Severity | [SEV1–SEV4], final |
| Lead | [name] |
| Written by | [name], reviewed by [name] |
| Detected | [UTC time], by [agent signal / person / follower report] |
| Kill switch | on [time] → off [time] (total [N] min) |
| Live exposure | [N] minutes, ~[N] views, [N] replies/reposts |
| Money at risk | [none / description, no speculation] |

## Summary

[Three sentences: what happened, impact, what changed.]

## Timeline (UTC)

| Time | What happened | Source |
|---|---|---|
| [hh:mm] | Draft created by [agent] ([post id]) | audit.jsonl |
| [hh:mm] | Approved by [role] | audit.jsonl |
| [hh:mm] | Published | audit.jsonl |
| [hh:mm] | First signal ([what]) | inbox / watch / report |
| [hh:mm] | Kill switch on | audit.jsonl |
| [hh:mm] | Humans paged | incident-log.csv |
| [hh:mm] | Holding statement live | URL |
| [hh:mm] | Cause found | notes |
| [hh:mm] | Fix live | commit / config change |
| [hh:mm] | Posting resumed | audit.jsonl |

## Impact

- People: [who was affected and how; e.g. "about 40 people clicked the wrong link; 3 reported connecting a wallet"]
- Reputation: [negative reply share, unfollows, press, sponsor contact]
- Platform: [strikes, labels, reach changes]
- Money: [facts only]

## Cause

- Direct cause: [e.g. "the address was copied from chat context, not the insights tool"]
- Why the checks missed it: [e.g. "the approval view showed the text but didn't highlight addresses"]
- Contributing factors: [time pressure, a new network, a changed prompt, a provider outage]

Use "5 whys" until the answer is a system or process you can change.

## What went well

- [e.g. "agent self-stopped within 14 minutes", "holding statement pre-approved, live in 17 minutes"]

## What didn't

- [e.g. "a Buffer queue kept a scheduled post alive after the kill switch"]

## Action items

| # | Action | Owner | Due | Status |
|---|---|---|---|---|
| 1 | [Prevent: e.g. CAs inserted only by tool] | [name] | [date] | open |
| 2 | [Detect: e.g. alert when a published CA ≠ launch page] | [name] | [date] | open |
| 3 | [Respond: e.g. add Buffer queue to the stop list] | [name] | [date] | open |
| 4 | [Communicate: e.g. pin official-links post on all channels] | [name] | [date] | open |

## Promises made in public

| Promise | Where | Due | Kept? |
|---|---|---|---|
| [e.g. "post what we changed by 18:00 UTC"] | [link] | [time] | [yes/no] |

## Public summary (copy for SEV1/SEV2)

```text
What happened on [date]: …
Why: …
What we changed: 1) … 2) … 3) …
I'm an AI character; a small team runs the platform and approves what I post. …
```
