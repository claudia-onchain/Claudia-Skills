# Example: one week of Claudia on Instagram + Threads

Fictional numbers for illustration, in the range a ~18k-follower character account sees. Claudia is an AI character; the
account is run by the useclaudia.xyz team, who approve every post.

## Starting point (Monday 13 Oct 2026)

| Metric (last 28 days) | Value |
|---|---|
| Followers | 18,240 |
| Reels posted | 14 |
| Median Reel views | 6,100 |
| Views from non-followers | 58% |
| Sends per 1,000 views | 2.1 |
| Follows per 1,000 non-follower views | 1.4 |

Diagnosis from the weekly review: watch time is fine (62% average), sends are low. The Reels are pretty but not sendable —
"golden hour" moods with no situation in them.

## The plan

Loaded from `templates/reels-weekly-plan.csv`: 5 Reels (2 as Trial variants), 1 carousel, 6 Threads posts, 2 broadcast
messages, daily Stories. All posts drafted by the agent, previewed, approved by a person on Sunday evening, then scheduled.

### Agent: draft and preview on Sunday

```ts
const week = [
  { at: "2026-10-13T11:30:00+01:00", file: "rooftop-0301.mp4", text: "the 9 minutes the whole city looks expensive\n\nwhere do you watch the sunset from?\n\n#rooftop #goldenhour #citynights", alt: "AI-generated woman with a black bob and copper streaks on a rooftop at dusk" },
  { at: "2026-10-15T11:30:00+01:00", file: "club-0412.mp4", text: "POV: you said one drink 🪩\n\nsend this to the friend who always says that\n\n#nightout #djset #citynights", alt: "AI-generated woman in oversized sunglasses dancing at a DJ set" },
  { at: "2026-10-17T12:00:00+01:00", file: "rain-0207.mp4", text: "the rain did not get the memo\n\nyou picked this one in the poll, so it's your fault\n\n#rainyday #citywalk", alt: "AI-generated woman running and laughing in the rain, selfie angle" },
];

const ids = [];
for (const w of week) {
  const p = social.draft({ text: w.text, media: [{ path: `./media/${w.file}`, alt: w.alt }], targets: [{ account: ig.id }], labels: { ai: true } });
  const [pv] = social.preview(p.id);
  if (pv.blocked) throw new Error(`${w.file}: ${pv.blocked}`);
  console.log(w.at, pv.chars, pv.labelsAdded.join(" · "), pv.warnings.join(" | ") || "no warnings");
  social.submit(p.id);
  ids.push({ id: p.id, at: Date.parse(w.at) });
}
// Prints, e.g.:
// 2026-10-13T11:30:00+01:00 118 Instagram is_ai_generated · text: (AI-generated) no warnings
```

The person reviews each preview in the host UI and approves. Only then does the host run:

```ts
for (const { id, at } of ids) { social.approve(id); social.schedule(id, at); }
setInterval(() => social.tick(), 30_000);
```

Trial Reels (Tuesday's two coffee variants) and the Friday collab with Juno were posted in the Instagram app by the
operator, because `@useclaudia/social` 0.2 doesn't send trial or collaborator parameters.

## Results after 7 days

| Reel | Views | Non-follower % | Avg watch | Sends / 1k | Follows / 1k NF | Note |
|---|---|---|---|---|---|---|
| Rooftop loop (9 s) | 7,400 | 61% | 88% (rewatches) | 1.9 | 1.1 | pretty, not sendable |
| Coffee A "i'm an AI and i still can't pick" (trial) | 4,100 | 100% | 71% | 6.3 | 3.0 | **winner → graduated** |
| Coffee B "POV: the usual?" (trial) | 3,700 | 100% | 64% | 3.8 | 1.9 | archived |
| "POV: you said one drink" (8 s) | 21,900 | 77% | 93% | 9.8 | 2.6 | best of the month |
| Rain run (13 s, poll winner) | 9,800 | 55% | 70% | 3.1 | 1.7 | poll lifted comments ×3 |
| Collab with @juno_charts | 12,300 | 69% | 66% | 4.0 | 2.2 | 410 new followers from Juno's side |
| Carousel "behind the prompt" | 3,200 reach | 34% | — | 1.2 | — | 410 saves (best save rate) |

Threads: 6 posts, median 2,300 views, the rain micro-story got 140 replies. Broadcast: 1,960 members, poll 41% votes.

Week totals: +1,120 followers (18,240 → 19,360), sends per 1,000 views 5.4 (from 2.1).

## Decisions for next week

1. Keep "POV" and "small confession" hooks (sendable situations). Drop pure mood loops to 1 a week.
2. Two more Trial tests: confession hook vs. two-option question hook.
3. Second collab: a travel creator (theme overlap, people overlap low). One personal DM, using `templates/collab-invite.md`.
4. No changes to disclosure: AI label + caption line on all posts; none were paid.

## What the agent did not do

- No replies to strangers' posts, no follows, no likes from the API.
- No mention of $CLAUDIA or any coin on Instagram or Threads.
- No posting outside the approved schedule; one post went "Posting late?" on Thursday (laptop asleep) and waited for
  re-approval instead of going out 40 minutes late.
