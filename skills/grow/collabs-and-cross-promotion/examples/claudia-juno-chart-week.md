# Worked example: Claudia × Juno "chart week" (agent-to-agent, X + TikTok)

All handles other than Claudia's are fictional. Numbers are illustrative but realistic for accounts of this size.

## Starting point (14-day baseline, early October 2026)

| | Claudia | Juno |
|---|---|---|
| TikTok followers / median views | 38,000 / 14,000 | 11,200 / 6,000 |
| X followers / median impressions | 21,000 / 4,800 | 4,100 / 1,900 |
| Avg daily follower gain (TikTok + X) | 140 | 35 |
| Operator | Claudia team | Dana (they/them) |

Goal written by Claudia's operator: *"Between 13 and 19 Oct, 1,000 net new followers across TikTok and X from
chart-curious viewers, via a duet + co-thread series with Juno."*

## Scoring and pitch

Juno scored 85/100 (see the worked score in
[partner-fit-scoring.md](../references/partner-fit-scoring.md)). The pitch (script 2 in
[collab-dm-scripts.md](../templates/collab-dm-scripts.md)) went to Dana by email on 1 Oct, naming Juno's "why wicks
lie" thread. Dana replied the same day with two conditions: no coins at all, and Juno's explainers stay the source of
truth (Claudia's visuals never add claims).

Value exchange: Juno writes and records three 45-second explainers that allow duets; Claudia's team makes three
25-second duet visuals and four X quote visuals, and gives Juno the visual files to reuse.

## The brief

The filled brief is [collab-brief.yaml](../templates/collab-brief.yaml). Key lines both operators signed off:

- Interaction budget per agent: 5 originals, ≤ 6 replies (only to posts that @mention the replier), 2 quotes,
  0 automated likes/reposts/follows, ≤ 10 thread-room turns.
- Disclosure: native AI flags on every post; the first post of each side says "Juno and I are AI characters; our
  operators approve every post."
- Either side can archive shared posts with a message, no reason needed.

## Drafting and approval (Claudia's side)

```ts
const posts = [
  { at: "2026-10-13T17:00:00Z", text: "Juno just explained higher lows better than any textbook. Here it is as a rooftop at dusk: each step up is a floor. @juno_charts" },
  { at: "2026-10-15T17:00:00Z", text: "Day 2 with @juno_charts: volume is the crowd, not the weather. I drew the crowd." },
  { at: "2026-10-17T17:00:00Z", text: "Day 3: why a single candle is a sentence, not a story. Juno's words, my rainy-street visual. @juno_charts" },
];
for (const p of posts) {
  const d = social.draft({
    text: p.text,
    media: [{ path: `./out/chartweek-${p.at.slice(8, 10)}.jpg`, alt: "AI-generated image of Claudia, black bob with copper streaks, sketching a chart on a window at dusk" }],
    targets: [{ account: x.id }],
    labels: { ai: true },
    scheduleAt: Date.parse(p.at),
  });
  const [pv] = social.preview(d.id);
  console.log(pv.network, pv.chars, pv.costUsd, pv.warnings, pv.labelsAdded);
  social.submit(d.id);   // the approver on duty reviews all three in one sitting
}
```

Preview showed `costUsd: 0.015` per post (no links), the `made_with_ai` flag, and a warning reminding the team to keep
X's Automated account label on. No "Not financial advice." was added because no coin, ticker or price is mentioned —
which was the point.

TikTok duets were posted by the operator in the app (Juno's videos allow duets; the AIGC label was switched on in the
post settings), because duets can't be created through the posting API.

## Collab days

- Juno's openers at 15:00 UTC each @mentioned @claudia_onchain, so Claudia's planned replies were allowed by the X
  API reply rule. Claudia replied twice per opener, drafted from the inbox and approved by a person.
- The team polled the X inbox every 15 minutes during 15:00–19:00 only, with `inboxBudget: { x: { perDay: 40 } }`
  for the week (≈ $0.20/day in reads at $0.005 each).
- Bio links on both sides pointed to the tagged URLs in [utm-links.csv](../templates/utm-links.csv).
- Day 4, a commenter asked "which coin should I use this on?". Claudia's approved reply: "Not doing coin picks in
  chart week — Juno's whole point is learning to read any chart yourself."

## Results

| Metric | Claudia | Juno |
|---|---|---|
| Net new followers 13–19 Oct (TikTok + X) | 1,240 | 2,050 |
| Normal week at baseline pace | 980 | 245 |
| Lift above normal | ≈ 260 | ≈ 1,805 (≈ 8×) |
| Best post | Duet #1: 61,000 views | Explainer #1: 88,000 views |
| Tracked clicks (all links) | 312 to Juno's page | 405 to Claudia's page |
| Day-30 retention of the bump | 0.91 | 0.86 |
| X API spend for the week | $0.27 posts + $0.06 replies + $1.40 reads | $0.20 |

Note: Claudia's raw gain looked big but most of it was her normal pace; the honest lift was modest. Juno gained
about 8× its normal week. The collab was worth far more to the smaller partner, which was expected for a 0.43× size
ratio. Claudia's team logged it as a success anyway (goal partly met, strong retention, both sides want to repeat) and
scheduled a second series for early December with a LIVE guest slot to test a different format.

## What they'd change

- Ask Juno to pin the X opener with the bio link the night before, not the morning of.
- Put the three duets on consecutive days; the one-day gap lost momentum on TikTok.
- Write the recap thread-room post in `general` before the week ends, not after.
