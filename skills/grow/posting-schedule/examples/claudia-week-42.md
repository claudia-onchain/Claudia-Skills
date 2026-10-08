# Example: Claudia's week 42 — from CSV to published, with one late post

Claudia (she) posts on X, TikTok, Instagram, YouTube Shorts, Telegram and Discord. Her audience: 46% US East, 22% UK,
9% US West, the rest spread out. Her operator (one approver, London) plans on Sunday. Fictional run, realistic numbers.

## Sunday 11 Oct, 20 minutes

1. The agent filled `week42.csv` from the cadence plan (`templates/cadence-plan.csv`) with the prompt in SKILL.md.
   22 rows: X 9, TikTok 3, Instagram 3, YouTube 2, Telegram 3, Discord 2. Five slots left empty for reactive posts.
2. Planner:

```sh
node scripts/plan-schedule.mjs week42.csv --now 2026-10-11T19:00:00Z
```

First run: 2 ✗ rows.
- `row 7 tiktok: TikTok: crypto promotion is removed` — the bonding-curve explainer had been copied to TikTok. The
  operator moved it to X only and replaced the TikTok slot with a "3 hooks" video.
- `row 14 near-duplicate of row 9 within 24 h` — the X and Telegram versions were fine, but two X posts had the same
  text. The agent rewrote one.

Second run: 0 ✗, X API cost ≈ $0.51 for the week (2 link posts × $0.20 + 7 plain × $0.015).

3. `--json > plan.json`, then the drafting script from SKILL.md step 5 created 22 drafts with `scheduleAt` and
   submitted them.

## Sunday 11 Oct, 12 minutes — approval batch

The operator went through `templates/approval-batch.md` with the previews:
- 19 approved → `scheduled`.
- 2 edited first (hooks), then approved.
- 1 rejected: "Thu rooftop post — too close to the office-hours reminder; drop it." `reject(id, "stacked with reminder")`.
- The sponsored Northpine post (Sat) showed labels `#ad`, `paid_partnership`, `made_with_ai`; the operator checked the
  copy made no "I tried it" claim and that Northpine's written approval was in the deal folder.

## Monday–Saturday — the host

Claudia Local was open on the operator's laptop during the day; overnight, a small VM ran the same data dir with
`scheduler-host.mjs` (only one of them runs `tick()` at a time; Local was set not to run the scheduler while the VM was up).

## Wednesday 14 Oct — "Posting late?"

The VM was rebooted for an update at 20:50 UTC and came back at 21:14. The 21:00 UTC X post ("rooftop at dusk…") was due
14 minutes earlier, so `tick()` did not send it. The `post` event fired with status `pending_approval` and the note:

```text
Posting late? It was due 14 min ago. Approve again to send now.
```

The host pinged the operator. The rooftop post was evening mood content, still right at 21:20, so:

```ts
social.approve(id);       // → approved (scheduleAt is in the past)
await social.publish(id); // live at 21:21Z
```

Had it been the Discord office-hours "live now" post, it would have been rejected as stale instead.

## Saturday 17 Oct — a reactive slot

A widely shared thread about AI disclosure rules trended in Claudia's niche on Friday. The agent drafted a reply-style
original post for one of the empty reactive slots (Sat 15:00 New York), the operator approved it Friday night (inside
the 24 h rule for timely content). It became the week's best X post: 61 new follows.

## Week in numbers

| | Planned | Published | Late | Rejected | Failed |
|---|---|---|---|---|---|
| Posts | 22 + 1 reactive | 22 | 1 (sent after re-approval) | 1 | 0 |

| Network | Median reach / post | New follows | Notes |
|---|---|---|---|
| X | 3,900 impressions | 214 | Tue 09:30 NY and the reactive post were top slots |
| TikTok | 11,200 views | 390 | 64 s "hooks" video retained 41% to the end |
| Instagram | 2,600 reach | 58 | Trial Reel (Sat) beat baseline, auto-shared to followers |
| YouTube Shorts | 1,900 views | 22 | |
| Telegram | 1,050 views | +86 subscribers | |
| Discord | — | +37 members | Office hours 74 peak listeners |

X API spend: $0.55 (one extra plain post: the reactive one). Next week's change: move the 17:00 New York X slot to
19:00, which was in the bottom third two weeks running (tested via [growth-experiments](../../growth-experiments/SKILL.md)).
