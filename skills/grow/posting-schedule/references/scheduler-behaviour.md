# How the @useclaudia/social scheduler behaves

Read this when a scheduled post did something you didn't expect, before you write your own host loop, or when you
explain to an approver what "approve" will do. Behaviour described from `@useclaudia/social` 0.2.0 (README and
`src/social.ts`, checked 8 Oct 2026).

## States

```
draft ──submit──▶ pending_approval ──approve──▶ approved ──publish──▶ publishing ──▶ published
  │                    ▲   │                       │                                 ├─▶ partial
  │                    │   └──reject──▶ canceled    └─schedule──▶ scheduled ──tick──▶ └─▶ failed
  └──approve (directly)                                  │
                       └──────── missed by > 10 min ◀────┘  ("Posting late?")
```

## The calls

| Call | From status | Result |
|---|---|---|
| `draft({ …, scheduleAt })` | — | `draft` with a planned time |
| `submit(id)` | `draft` | `pending_approval` |
| `approve(id)` | `draft` or `pending_approval` | `scheduled` if `scheduleAt` is in the future, else `approved`. Throws `blocked` if **every** target is blocked by a rule (cap, duplicate, link limit, promise). |
| `schedule(id, at)` | `approved` / `scheduled` | `scheduled` at `at` |
| `schedule(id, at)` | `draft` / `pending_approval` | keeps the status, note "Scheduled once approved." |
| `schedule(id, at)` with `at` more than 1 min in the past | any | throws `invalid` ("That time is in the past.") |
| `reject(id, why)` | anything not published | `canceled`, note "Rejected: why" |
| `update(id, partial)` on `approved` or `scheduled` | — | back to `pending_approval` (edits need a fresh approval) |
| `publish(id)` | `approved` | sends now; refuses unapproved posts with `needs_approval` |
| `tick()` | — | for each `scheduled` post that is due: publish, unless overdue by more than `lateAfterMin` (default 10) |

## What `tick()` does, in order

1. Skips posts whose `scheduleAt` is still in the future.
2. If a due post is more than `lateAfterMin` minutes overdue: writes `schedule_missed` to the audit log and moves it to
   `pending_approval` with the note `Posting late? It was due N min ago. Approve again to send now.` It does **not** send.
3. If the kill switch is on: skips sending (the post stays `scheduled`; step 2 catches it once it is overdue).
4. Otherwise publishes under a per-post lock, so two overlapping `tick()` calls in one process can't double-send.
5. Fires `account` `expiring` events for connections within 7 days of expiry (LinkedIn's 60-day tokens), once a day.

Call it every 30 s. Calling it every second only burns CPU; calling it every 15 min makes posts up to 15 min late and
risks the late rule.

## Once-only publishing

- Every (post, account) pair has a stable idempotency key. A result is saved as "in flight" before the send.
- If the process dies mid-send, the next start marks that result `failed` with `uncertain: true` and **never resends
  it on its own**. Networks with provider-side idempotency (Mastodon, Neynar, Zernio, Upload-Post, Bluesky record keys,
  Nostr event ids) are retried safely; for others a person checks the account, then calls
  `publish(id, { retryUncertain: true })`.
- Thread parts are saved one by one, so a retry continues after the last live part.
- `partial` = some accounts succeeded, others failed; `post.results[i].error` has the reason per account.

## Handling "Posting late?"

| Situation | Approver action |
|---|---|
| Still relevant, slot not important | `approve(id)` → `approved`, then `await publish(id)` |
| Still relevant, slot matters | `approve(id)` then `schedule(id, nextWindowMs)` → `scheduled` |
| Stale (trend passed, event over, wrong mood) | `reject(id, "stale")` |
| Many late at once (host was off for a day) | Review oldest first; rarely send more than 1–2 per network immediately; spread the rest |

Don't raise `lateAfterMin` to hours to "avoid the nag". The nag is the feature.

## One host, one data dir

Posts, accounts and the kill switch live in `<dataDir>/social/` (default `~/.claudia/social/`). Two processes on the
same data dir can race on file writes; two processes on **different** data dirs each have their own copy of the queue
and will both publish. Pick one host:
- Claudia Local (calls `tick()` while open; fine for a creator who keeps it running during the day), or
- a small always-on process (pm2/systemd/VM) with the same data dir the approver's UI writes to.

## Events worth wiring

```ts
social.on("post", (p) => { /* every status change: published, partial, failed, pending_approval (late), canceled */ });
social.on("warning", (w) => { /* tick errors, inbox notes, kill switch on/off */ });
social.on("account", (e) => { /* expiring connections: reconnect before scheduled posts fail */ });
social.on("audit", (line) => { /* mirror to your own log */ });
```

## Audit log

`<dataDir>/social/audit.jsonl` gets one line per draft, approval, schedule, missed schedule, publish, failure, connect,
refresh and kill-switch change. No secrets. It answers "who approved this and when" and "did it actually go out".
