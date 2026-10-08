# Pacing and budgets for an autonomous replier

An agent can answer faster than any person. That's the problem: superhuman reply speed and volume are what platforms read
as a bot farm. Pace like a busy, attentive person.

## Hard limits from `@useclaudia/social` (checked 8 Oct 2026)

These run inside `preview()`, `publish()` and `reply()` and can't be turned off:

- Daily published posts per account per 24 h (`reply()` runs the same cap, so plan replies inside it): X 10, LinkedIn 5, YouTube 5, TikTok 5, Facebook 10,
  Pinterest 10, Farcaster 20, Instagram 20, Threads 25, Bluesky/Mastodon/Nostr 30, Telegram/Discord 50, services 10.
  Change with `rules.caps` only with the operator's written OK.
- Near-duplicate text to the same account within 24 h is blocked — so templates must be personalised.
- Links per account per 24 h: 5 (X 3).
- X replies only to posts that mention or quote the account.
- Kill switch stops every publish, reply and scheduled post.

## Recommended pacing (soft limits the host enforces)

| Setting | Default | Why |
|---|---|---|
| Minimum gap between replies, same account | 4 min | No burst patterns |
| Max replies in any 15 min, same account | 3 | Same |
| Max replies per day on X | what the cap leaves after planned posts (typically 3–5), never more than original posts that day | Replies share the cap; reply-heavy automated accounts look like reply bots |
| Max replies per day on Telegram/Discord (own community) | 40 | Leave room for members to answer each other |
| Jitter on send time | ±90 s | Avoid clockwork timestamps |
| Quiet hours (operator's timezone) | 23:00–08:00 | No one is awake to catch a mistake |
| Max share of praise replies | 1 in 3 praise items | Reply to conversations, not compliments |
| Stale cut-off | skip items older than 48 h unless it's a question | A late "thanks!" reads automated |

In code, a small queue does it:

```ts
const MIN_GAP_MS = 4 * 60_000, WINDOW_MS = 15 * 60_000, WINDOW_MAX = 3;
const sent = new Map(); // account -> timestamps
function canSend(account, now = Date.now()) {
  const ts = (sent.get(account) ?? []).filter((t) => now - t < WINDOW_MS);
  const last = ts.at(-1) ?? 0;
  return now - last >= MIN_GAP_MS && ts.length < WINDOW_MAX && !inQuietHours(now);
}
```

## Cost formulas (X, pay-per-use, checked 2026-10)

```
daily_cost = reads × $0.005 + replies × $0.01 + dms × $0.015 + link_replies × ($0.20 − $0.01)
```

| Account size | Mentions/day | Reads budget | Replies/day | Daily | 30 days |
|---|---|---|---|---|---|
| ~4k followers (Juno) | 8 | 15 | 4 | $0.115 | ~$3.45 |
| ~40k followers | 60 | 40 | 5 | $0.25 | ~$7.50 |
| Launch day spike | 600 | 100 (cap) | 5 | $0.55 | — |

Reads beyond the budget are simply not fetched; the person checks the X app for the rest. Don't raise the read budget on a
spike day "to catch everything" — most spike mentions don't need a reply.

## Response-time targets vs. pacing

Targets in [triage-taxonomy.md](triage-taxonomy.md) are for the *first response*, which can be a person's quick in-app
reply. The agent's queue sorts by risk then age:

1. `safety` (handoff only)
2. `scam-impersonation` (handoff: person hides/reports)
3. `feedback-bug`, `criticism-fair`
4. `question-product`, `question-persona`
5. `content-request`, `collab-business` (template + forward)
6. `praise`

## Errors and backoff

| Code | Do |
|---|---|
| `rate_limited` | wait `retryAfterMs` (or 15 min if unknown), then halve the pace for the rest of the day |
| `blocked` | don't retry; log the reason; fix the draft or drop it |
| `expired` | stop, alert the operator to reconnect |
| `over_budget` | stop X sends for the day; alert |
| `provider_error` with `uncertain: true` | a person checks the account before `publish(id, { retryUncertain: true })` |
