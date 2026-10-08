# Example: Claudia's X reset week

A worked example of running this skill on @claudia_onchain after a flat month. Numbers are illustrative but realistic for an
account of this size (checked against 2026 benchmarks); the account and audience are fictional examples.

## Starting point (30 days before the reset)

| Metric | Value |
|---|---|
| Followers | 18,400 |
| Posts | 212 (7 a day, many near-identical "gm" + chart screenshots) |
| Impressions | 1.31M (≈ 6,200 per post) |
| Net new followers | +290 → 0.22 follows per 1,000 impressions |
| Replies received | 1,480; answered by Claudia: 9% |
| Link posts | 61 (29%) |
| API spend | $14.47 (61 × $0.20 + 151 × $0.015, no reads, no replies) |

Diagnosis using `references/x-algorithm-2026.md`:
- Too many posts competing in the same early windows (some 20 minutes apart).
- 29% link posts: weaker reach and 84% of the spend.
- Replies almost never answered, so the strongest reply signal was wasted.
- "gm + chart" posts with a ticker brushed against coin promotion and added nothing.
- The Automated label was on, but the bio didn't say who runs her.

## The plan (approved by the operator)

1. Bio rewritten: `AI character. Cosy-city creator, agents and onchain culture. Posts are AI-generated, reviewed by a human. useclaudia.xyz`
2. Pinned the intro thread from `templates/x-thread-template.md`.
3. Pace cut to 4 originals a day at 09:30, 13:00, 16:30, 19:30 New York, built from `templates/x-weekly-calendar.csv`.
4. Links: one a day, always in the last part of a thread or the Sunday recap.
5. Chart screenshots dropped. Onchain pillar became one plain-words explainer or safety post a day, no tickers.
6. Inbox budget turned on at 40 reads a day; the operator approves reply drafts twice a day (13:30 and 20:00).

```ts
const social = createSocial({
  keys: chainKeys(envKeys()),
  inboxBudget: { x: { perDay: 40 } },
  // Posts and replies share the X cap: 4 originals + up to 16 approved replies. Raised from 10 with the operator's sign-off;
  // links stay tighter than the default on purpose.
  rules: { caps: { x: 20 }, linksPerDay: { x: 1 } },
});
```

## Monday: one post end to end

Draft (from the post bank, `show-the-work` pillar):

```text
I made 41 videos this month. 6 did 80% of the views. All 6 start with me already mid-sentence.
```

```sh
claudia post x "I made 41 videos this month. 6 did 80% of the views. All 6 start with me already mid-sentence." \
  --media ./room-still.jpg --dry-run
```

The preview showed 96 weighted characters, label `made_with_ai`, cost $0.015, one warning ("Automated account label: on").
The operator approved it in the morning review; it was scheduled for 09:30 and `tick()` published it at 09:30:12.

First hour: 58 replies, mostly "what do you mean mid-sentence?". The operator approved 14 reply drafts at 10:15, e.g.:

```text
Literally starting the clip after I've begun talking. No "hey guys", no wind-up. The first frame is already the point.
```

Each reply cost $0.01. The post reached 41,000 impressions and brought 212 follows (5.2 per 1,000).

## Tuesday: a blocked post

The agent drafted: `Solana launches are about to explode this quarter, don't miss it.` The preview returned
`blocked` ("price or return promise in coin context"). The agent rewrote it as education:

```text
Plain-words explainer: what changed in Solana token launches this quarter, and three checks before you click any launch. Thread ↓
```

The package appended "Not financial advice." The operator approved; the 5-part thread with the guide link in part 5 cost
$0.26.

## Results after 4 weeks

| Metric | Before | After |
|---|---|---|
| Posts | 212 | 118 |
| Impressions per post | 6,200 | 14,900 |
| Total impressions | 1.31M | 1.76M |
| Follows per 1,000 impressions | 0.22 | 1.9 |
| Net new followers | +290 | +3,340 |
| Share of real questions answered within 2 h | 9% | 83% |
| API spend | $14.47 | $16.65 (90 plain posts, 28 link parts, 410 replies, 1,120 reads) |

Lessons recorded in the weekly review:
- Fewer posts, better spaced, each one answered, beat volume.
- "Show the work" images with a specific number were the top pillar three weeks out of four.
- Coin talk moved to explainers lost nothing in reach and removed the compliance risk.
- Spend stayed about the same but moved from link posts (84% before) to replies and reads, which actually grow the account.

Next experiment (logged with [growth-experiments](../../growth-experiments/SKILL.md)): moving the 19:30 slot to 21:00 for two weeks, success =
+15% impressions on that slot with no drop in follows per 1,000.
