# Example: Claudia turns a rising edit style into her own rain-run post

Week of 2026-10-05. Claudia's operator runs the Monday scan with her agent. Numbers below are illustrative of the
method; they are not platform benchmarks.

## 1. The scan finds it

- **TikTok Creative Center → TikTok Videos (UK + US, 7 days, Apparel & Accessories / Travel):** three of the top ten
  videos open on a slow-motion running shot in rain with the beat landing on a laugh at 0:02.
- **Operator's For You browse (brand account, 25 min):** the same edit style appeared 4 times, with different songs.
  That means the trend is the *edit*, not a sound.
- **Instagram:** not visible yet on Reels. Rule of thumb says it will follow in days.
- **Google Trends:** "rain running edit" isn't a search term people use, which is fine: this is a format trend, not a
  search trend.

Log row: `rainy slow-mo run · edit style · rising · creative-center/videos/rain-slowmo`.

## 2. Score

| Fit | Velocity | Window | Effort | Score |
|---|---|---|---|---|
| 4 (cosy-city pillar; she already has a rain clip) | 3 | 4 (edit styles last weeks) | 0 (re-cut of the existing 13 s rain loop) | **15 → go** |

Why not fit 5: the format isn't something only she would make, but her rainy warehouse lot and laugh fit naturally.

## 3. Gates

All ten clear. Gate 7 (pretending to be human) was the one to think about: the trend's captions are mostly "me
running late to my 9-to-5". Claudia doesn't have a 9-to-5. Reframe: **"me running to the render queue before the
operator says 'one more version'"**, which is true to her as an AI character.

Gate 10 (audio): the post is not commercial (no brand, no product, no platform plug), so the in-app sound would be fine
on her personal account. The operator chooses **original audio** anyway, so the same cut can go to Reels and Shorts
without licence questions, and so the sound can become hers.

## 4. Brief (abridged)

```text
TREND: rainy slow-mo run edit · seen TikTok CC top videos + 4× FYP, 2026-10-05 · stage rising
FIT: cosy city · her rain lot + laugh already exist        SCORE: 4×2 + 3 + 4 − 0 = 15
CONCEPT: point-of-view swap — "running to the render queue before 'one more version'"
HOOK (0–1.5 s): text "when the operator types 'small tweak'" + her glance back over the shoulder
AUDIO: original — 92 bpm lofi, drop at 0:02 on the laugh (claudia generate music; spend capped at $1, approved)
LABELS: AI ✓ (native flags + caption line)  #ad ☐  NFA ☐
GATES: all clear (7 reframed)
SHIP BY: Sun 19:00 Europe/London TikTok; Tue 12:00 Reels; Wed Shorts · SUCCESS: 72 h views ≥ 1.5× median, follows/1k ≥ 2
```

The operator approves the brief and the music spend in chat. The agent runs:

```sh
claudia generate music "warm lofi beat, 92 bpm, soft vinyl crackle, a clear drop at 0:02 for a laugh" --dry-run
claudia generate music "warm lofi beat, 92 bpm, soft vinyl crackle, a clear drop at 0:02 for a laugh" --max-usd 1
```

The edit (re-timed rain loop, caption overlay, audio) follows [short-form-editing](../../../create/short-form-editing/SKILL.md).

## 5. Draft, preview, approve

X gets the clip too, through `@useclaudia/social`:

```ts
const post = social.draft({
  text: "running to the render queue before the operator says 'one more version' 🌧",
  media: [{ path: "out/rain-run-v3.mp4", alt: "AI-generated Claudia running through rain in a warehouse lot, laughing over her shoulder" }],
  targets: [{ account: xAccount.id }],
  labels: { ai: true },
  scheduleAt: Date.parse("2026-10-05T19:05:00Z"),
});
const [pv] = social.preview(post.id);
// pv.labelsAdded → ["made_with_ai"] · pv.warnings → ["X: turn on the account-level Automated label"] (already on)
// pv.costUsd → 0.015 (no link)
social.submit(post.id);
```

The operator checks the preview on the phone and approves; `tick()` publishes at 19:05 UTC. TikTok and Reels go
through the posting service with the AI-generated flag set; Shorts gets the altered/synthetic content disclosure.

## 6. Results at 72 h (logged)

| Platform | Views | 30-day median | Follows | Shares + sends |
|---|---|---|---|---|
| TikTok | 61,700 | 21,000 | 402 | 1,890 |
| Reels | 18,300 | 9,800 | 96 | 610 |
| X | 7,400 | 5,100 | 31 | 40 |

Lesson logged: *"re-cut of existing rain loop; original audio picked up 140 uses."* The agent adds a hypothesis to
[growth-experiments](../../growth-experiments/SKILL.md): "point-of-view swaps that state she's an AI outperform plain setting swaps on
follows per 1,000 views."
