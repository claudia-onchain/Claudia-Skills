# Example: four weeks of Claudia Shorts, uploaded private and published by a person

Fictional numbers for illustration. Claudia's YouTube channel had 2,300 subscribers and Shorts that were straight TikTok
re-uploads (watermarks included). The team rebuilt it as three series using `templates/shorts-series-plan.csv`.

## Week 0: the audit

| Problem | Evidence | Fix |
|---|---|---|
| TikTok watermark on 19 of 24 Shorts | visible logo bottom-right | Re-export clean masters from the editor |
| No synthetic disclosure on older uploads | Studio Details: "No" | Edited all 24 to "Yes" in Studio (bulk edit isn't available for this field; done one by one) |
| Text hidden under the buttons | right-side captions | Re-cut text to the left/centre safe area |
| One-off moods, no series | 24 unrelated clips | Rooftop Hours, Night Shift, Small Confessions, Behind the Prompt |
| 2 uploads mentioned $CLAUDIA with a chart | "up 40% today" in title | Set to private; never re-published (price talk + AI persona) |

## Each upload

Sunday evening the agent prepares the week. For each row in the plan:

```ts
import plan from "./shorts-week.json" with { type: "json" };

for (const s of plan) {
  const post = social.draft({
    text: `${s.title}\n\nClaudia is an AI-generated character.\n${s.series}, part ${s.part}. More: https://useclaudia.xyz/claudia?utm_source=youtube&utm_medium=shorts&utm_campaign=${s.slug}`,
    media: [{ path: s.file }],
    targets: [{ account: yt.id }],
    labels: { ai: true },
    options: { youtube: { title: s.title, privacyStatus: "private", categoryId: "24", shorts: true, tags: s.tags } },
  });
  const [pv] = social.preview(post.id);
  if (pv.blocked) { console.error(s.title, "blocked:", pv.blocked); continue; }
  social.submit(post.id);
}
```

The operator approves the batch in the host UI; the host publishes them one by one (each lands **private** in Studio). On
each publish day the operator opens the checklist (`templates/shorts-upload-checklist.md`), sets the Related video and
the cover frame, and schedules it for 18:00–19:00 UK. Total person time: ~6 minutes per Short.

Agent pacing held at 4 Shorts a week (cap is 5 a day; nowhere near it), never two the same day.

## Results (28 days)

| Series | Shorts | Avg views | Viewed vs swiped | Avg % viewed | Subs gained |
|---|---|---|---|---|---|
| Rooftop Hours | 4 | 3,900 | 71% | 104% (rewatches) | 38 |
| Night Shift | 4 | 18,700 | 78% | 92% | 412 |
| Small Confessions | 4 | 7,200 | 69% | 81% | 155 |
| Behind the Prompt | 2 | 2,600 | 58% | 63% | 61 |

- Subscribers: 2,300 → 2,966 (+666). Shorts views in the window: 128,000 (valid public).
- Related video clicks from Behind the Prompt → the long "making a rainy city scene" video: 3.1% of viewers.
- "Night Shift part 4" (a callback to part 1's hook) was the best Short of the month: 41,000 views, 81% viewed.

## Decisions

1. Night Shift goes to 2 parts a week; Behind the Prompt drops to every other week but keeps its long-video link.
2. Test: the same Night Shift Short at 8 s vs 14 s (one variable) — logged in the experiment log.
3. Monetization: the channel is far from 10 M Shorts views in 90 days. The plan targets fan funding first (500 subs +
   3 M Shorts views) and treats the 2027 thresholds (20 M or 8,000 hours) as a long-form question for next year.

## What stayed off the channel

- Any Short about $CLAUDIA's price, the launchpad's creator rewards in money terms, or "earn with me" claims.
- Comment auto-replies. The agent drafted 22 replies from `social.inbox()` across the month; the operator approved 15.
