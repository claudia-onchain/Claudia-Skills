# Approval gates, roles, kill switch drills and pacing

Read when setting up who approves what, when running an autonomous agent through a launch, or when rehearsing the stop
button. Everything here maps to real `@useclaudia/social` behaviour (README checked 8 Oct 2026).

## Roles

| Role | Does | Can't |
|---|---|---|
| Agent | drafts, previews, submits, schedules approved posts, watches streams, writes the report | approve its own posts in a launch; spend over budget; reply to unsolicited posts on X |
| Launch owner (person) | signs G1, G2, G3, G4, G5; approves every preview | delegate approval to the agent during launch week |
| Moderator (person, can be the owner) | watches the community and inbox on launch day; flips the kill switch; writes corrections | publish new campaign posts without the owner |

A host *can* auto-approve in normal operation (the package records who approved), but for launches keep approval human.
The audit log at `~/.claudia/social/audit.jsonl` shows each draft, approval, publish, failure and kill-switch change; the
T+7 report quotes it.

## Gates

| Gate | When | Pass criteria | Fail → |
|---|---|---|---|
| G1 brief | T-14 | every brief field filled; success numbers written; stop rules named; [coin] audiences decided | no assets yet |
| G2 assets | T-8 | checklist ticked; AI labels; alt text; landing page live in staging | fix and re-review |
| G3 drafts | T-5 → T-3 | every preview read; no blocks; costs within budget; per-platform text adapted | edit (sends the post back to `pending_approval`), re-approve |
| G4 go/no-go | T-1 h | go/no-go list in `templates/asset-checklist.md` all yes | move T-0; don't patch live |
| G5 report | T+7 | report filled; lessons logged | — |

Editing an approved or scheduled post returns it to `pending_approval`; this is deliberate. Re-approve after any edit.

## Scheduling behaviour to plan around

- `schedule(id, at)` only works on approved posts; or pass `scheduleAt` in the draft and `approve()` moves it to `scheduled`.
- `tick()` must run every ~30 s in an always-on host (Claudia Local, a server, or the CLI host).
- A post due **more than 10 minutes ago** is not sent: it returns to `pending_approval` with "Posting late? It was due N min
  ago." Re-approve only if it still makes sense (a "starting now" post an hour late doesn't).
- Publishing is once-only per (post, account). If the process dies mid-send, the result is marked `uncertain`; a person checks
  the account and only then calls `publish(id, { retryUncertain: true })`.

## Kill switch drill (do it at G4)

```ts
social.killSwitch(true);          // all publish(), reply() and tick() stop; saved across restarts
console.log(social.killSwitch()); // true
// try a dry-run publish: it should be blocked
await social.publish(someApprovedId, { dryRun: true }).catch((e) => console.log(e.code)); // "blocked"
social.killSwitch(false);
```

Who can flip it: the owner and the moderator. Where: the host's UI or a one-line script on the always-on machine. Write the
command into the moderator's launch-day note.

Stop rules that flip it without discussion:
- a published post contains a wrong link, wrong mint, or a price/return claim;
- a platform warning, rate-limit storm or account lock;
- a security problem (leaked key, compromised account, fake admin wave the team can't contain);
- a real-world event that makes scheduled jokes or hype inappropriate.

After flipping: one human-written correction or holding line (see [crisis-and-reputation](../../crisis-and-reputation/SKILL.md)),
then review the queue (`social.posts({ status: "scheduled" })`), reject what no longer fits, re-approve the rest, turn it off.

## Pacing for autonomous agents (launch week)

| Channel | Package cap / 24 h | Launch-day pace | Rest of week |
|---|---|---|---|
| X | 10 posts, 3 link posts | 3 originals + replies only to @mentions | 1–2/day |
| TikTok | 5 | 1 (never coin) | 1/day |
| Instagram | 20 | 1 Reel + stories | 1 Reel every 2 days |
| Threads | 25 | 2–3 | 1–2/day |
| YouTube | 5 | 1 Short | 3–4 in the week |
| Telegram / Discord | 50 | ≤ 4 / ≤ 3 | 1/day |
| Claudia thread | (room limits) | ≤ 6 messages | 1–3/day |

Reply pacing: ≤ 1 reply per person per hour; stop replying to a person after 3 exchanges unless they're asking for help;
never reply on X to a post that didn't mention the account (blocked anyway). Inbox reads on X cost $0.005 each and are off by
default; if you turn them on for launch week, set a budget: `inboxBudget: { x: { perDay: 40 } }` ≈ $0.20/day.

Agents should also slow down when:
- engagement on a post is mostly negative (stop scheduled hype for 24 h, review);
- a `rate_limited` error arrives (don't retry posts automatically; the package won't);
- an `expiring` account event fires (reconnect before the launch, not during).
