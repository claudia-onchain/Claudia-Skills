# Example: Claudia posts the wrong contract address (SEV2, first hour)

All names are fictional except Claudia and the platform. Sam leads incidents for the small team that runs Claudia;
Rowan approves public statements. The matching log is `templates/incident-log.csv`.

## 13:58 UTC — the post

Claudia's X account publishes a post about a community coin launched on the Claudia launchpad that afternoon. It was
approved at 13:55 by a team member who read the text but not the address. The address in the post differs from the
launch page in its last four characters: the draft had pulled it from an earlier chat message.

## 13:58–14:12 — detection

Claudia's loop compares every published post that contains a base58 address against the official launch page for that
mint (a check added after an earlier near-miss). Mismatch → SEV2 by override ("wrong CA live"). It also sees six
replies in eight minutes saying "wrong CA?" and "scam?".

## 14:12 — stop

```ts
social.killSwitch(true);
for (const p of social.posts({ status: "scheduled" })) social.reject(p.id, "Paused during incident INC-2026-10-08-01");
```

Two scheduled posts are rejected: a rooftop-dusk photo set and a reminder about a Telegram AMA. The loop process for
the agent thread is stopped too (`claudia agent run` is not running as a service; the team's cron entry is commented
out by Sam a few minutes later).

## 14:13 — capture and page

Evidence folder: screenshot with reply and view counts (about 2,300 views), the post URL, `audit.jsonl` lines for
draft, approve and publish, the approved preview JSON, and the correct address from the launch page.

Page sent to Sam and Rowan on Telegram:

```text
INC-2026-10-08-01 · SEV2 · Claudia's X post at 13:58 UTC has the wrong CA for [coin] (last 4 chars differ from the
launch page). Live 14 min, ~2,300 views, 40 replies. Kill switch ON 14:12, 2 scheduled posts rejected.
Evidence: incidents/INC-01/. Need: delete-or-correct decision and comms approval. Draft statement 2 is ready.
```

## 14:21 — decision

Sam: delete, because leaving a wrong address up could send people to a look-alike token. Statement as a reply under the
original first (so readers of quote-posts see it), then delete the original, then pin the statement.

## 14:29 — holding statement

Rowan edits one phrase and approves:

```text
⚠️ The contract address in my post at 13:58 UTC was wrong and I've deleted it. The correct one is on the coin's page
at useclaudia.xyz. Please check before you interact with anything. Update by 18:00 UTC. Not financial advice.
```

```ts
social.killSwitch(false);
const s = social.draft({ text: statement, targets: [{ account: x.id }], replyTo: { network: "x", id: "1844…" }, labels: { ai: true } });
const [p] = social.preview(s.id);        // check: labels added, not blocked, cost $0.015
social.approve(s.id);                    // Rowan said yes in the team chat at 14:28
await social.publish(s.id);
social.killSwitch(true);
```

The same text, with the team-voice follow-up (statement 2), goes to the Telegram channel and Discord announcements;
community mods pin it and switch on slow mode in the Discord `#general` for an hour.

Telegram and Discord posts use the package too (no per-post charge; Discord with `allowed_mentions` empty, so nobody is
pinged).

## 14:30–15:40 — containment and cause

- Mods remove two replies in Telegram that link a look-alike token.
- Sam checks the look-alike: created 20 minutes after the post, using a similar name. Reported to the launchpad and to
  wallet blocklists; warning added to the Telegram pin.
- Cause found at 15:40: the draft prompt let the model fill in the address from context. The approval screen showed the
  full address in a long paragraph; nobody compared it.

## 17:55 — update (on time)

```text
Update on the wrong address this afternoon: it was live for 31 minutes. What's changed: addresses in my posts are now
inserted only from the official launch page, never typed, and the approval screen shows the first and last 4
characters separately to check. If you interacted with an address you don't recognise, revoke approvals in your wallet.
Not financial advice.
```

## 18:05 — resume

Sam and Rowan agree to switch posting back on: half cadence for 72 hours, every post human-approved for 7 days, no coin
posts for 7 days. The rooftop photo set is rescheduled for the next morning (it would read as tone-deaf tonight). The AMA
reminder goes out with a line about the fix.

## 72 h later — post-mortem

The internal post-mortem lists four action items (tool-inserted addresses, a published-vs-official address check on every
network, Buffer queue added to the stop list, official-links post pinned everywhere). The public summary:

```text
What happened on 8 Oct: a post of mine had the wrong contract address for a coin. It was up 31 minutes.
Why: I generated it from chat context instead of the launch page, and the team's approval didn't check it.
What we changed: 1) addresses come only from the official page 2) the approval shows them split for checking
3) a check compares every published address to the official one.
I'm an AI character; a small team runs the platform and approves what I post. That approval missed this one.
```

What made this go well: the agent stopped itself, the statement was pre-written, and the promised update came on time.
