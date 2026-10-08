# Trend scoring: rubric, calibration and lifecycle

Read before the first scoring session, and whenever four weeks of results show high scores not beating low ones.

## The formula

```
score = 2 × fit + velocity + window − effort        (−5 … 20)
go ≥ 12 · adapt/hold 8–11 · skip < 8
```

Risk gates sit **outside** the formula. A trend can score 20 and still be a no. Never let a high score argue a gate
down.

Fit is doubled because it is the factor that compounds: a trend that fits brings followers who stay for the pillars;
a trend that doesn't brings views and unfollows.

## Factor definitions

### Fit (0–5, ×2)
| Score | Meaning | Claudia example |
|---|---|---|
| 5 | Only she would make this version; native to a pillar and her world | "Things in my room that tell you I'm an AI" (butterfly-sticker laptop, a render of a cat that's slightly too symmetrical) |
| 4 | Clearly on-pillar, her setting works without forcing | A "sunset routine" format in the sunset bedroom |
| 3 | Works with a twist; an adjacent audience | A gym-motivation sound turned into "agent shipping motivation" at the laptop |
| 2 | She can do it, but it says nothing about her | A generic dance trend with no setting swap |
| 1 | Out of character; needs her to be someone else | A "my hometown" trend (she has no real hometown) without a reframe |
| 0 | Contradicts the brand or the never-list | Anything that requires her to claim she is human |

Calibration tip: in any batch of 10 candidates, expect at most one or two 5s. If half the batch scores 4–5, the scorer
is inflating; re-score against the examples above.

### Velocity (0–5)
| Score | Signals |
|---|---|
| 5 | Accelerating: Creative Center curve steepening over 3+ days; sound-use count growing daily; multiple niche accounts posting it in the last 24 h |
| 4 | Rising fast, but already visible to mainstream accounts |
| 3 | Rising steadily |
| 2 | Plateau |
| 1 | Falling |
| 0 | Dead or a single viral post with no copies |

### Window (0–5): time left before it's stale
Rules of thumb (log real lifespans in the trend log and replace these after a month):

| Trend type | Typical life | Window score if found at "rising" |
|---|---|---|
| X topic / news-reaction meme | 6–36 h | 1–2 (ship same day or skip) |
| X image/text meme template | 1–3 days | 2–3 |
| TikTok sound | 1–3 weeks | 4–5 |
| TikTok/Reels edit style (transition, captions style) | 2–6 weeks | 5 |
| Seasonal (Halloween, end-of-year recaps) | known dates | 5 if planned 2+ weeks ahead |
| Shorts version of a TikTok trend | lags 3–7 days | 3–4 |

### Effort (0–5, subtracted)
| Score | What it takes |
|---|---|
| 0 | Text post or a re-cut of an existing loop (room, club, lounge, rain clips) |
| 1 | New caption/overlay on existing footage |
| 2 | One new image generation + edit |
| 3 | New short video generation + edit + audio |
| 4 | Multiple shots, lip-sync or voice |
| 5 | Multi-day production, a collab, or anything needing another account's approval |

## Worked scores

| Candidate | Fit | Vel | Win | Eff | Score | Decision |
|---|---|---|---|---|---|---|
| "Tiny victories" sound (rising 4 days) — her version: bangs rendered right first try | 5 | 4 | 4 | 2 | 16 | Go |
| X meme "explain your job badly" | 4 | 4 | 2 | 0 | 14 | Go, text-only, same day |
| Running-in-the-rain slow-mo sound | 4 | 3 | 4 | 0 | 15 | Go, re-cut existing rain loop |
| Generic dance challenge | 2 | 5 | 4 | 3 | 10 | Hold; only if a setting swap appears |
| "My hometown in 3 photos" | 1 | 3 | 3 | 2 | 6 | Skip (would need a reframe as an imagined city) |
| Memecoin naming meme tied to one token | — | — | — | — | — | Gate fail (coin) |
| Celebrity lookalike filter | — | — | — | — | — | Gate fail (real person) |

## Lifecycle stages (write one in the log)

1. **Emerging:** a handful of niche accounts; sound use in the low thousands; no mainstream copies. Best stage for a
   high-fit trend. Risk: it may not take off; keep the effort low.
2. **Rising:** copies across niches, Creative Center curve up. The default target stage.
3. **Peak:** brands and big accounts are doing it. Only go if fit is 5 and production is same-day.
4. **Fading:** recaps and "is this trend dead" posts. Skip.
5. **Ironic revival:** sometimes a dead trend returns as a joke weeks later. Only for fit-5 ideas.

## Reading results (after 4 weeks)

Compare each trend post at 72 h with the account's median for the same format over the previous 30 days:

- `views_ratio = views_72h / median_views_72h`
- `follow_rate = follows_from_post / views_72h × 1000` (follows per 1,000 views)
- `share_rate = (shares + sends) / views_72h × 1000`

Good reactive posts beat the median on views **and** keep a follow rate at or above the account's normal. A trend post
with 5× views and half the normal follow rate attracted the wrong audience: lower that trend type's fit next time.

If, after 10+ trend posts, the correlation between score and `views_ratio` is near zero, the problem is almost always
fit inflation or late entry (window). Tighten those first; velocity estimates rarely fix it.

Metrics definitions are shared with [kpi-reporting](../../kpi-reporting/SKILL.md).
