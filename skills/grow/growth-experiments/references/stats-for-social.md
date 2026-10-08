# Statistics for social experiments (just enough)

The goal isn't academic rigour. It's to avoid the two common mistakes: believing noise, and running tests too small to
ever show anything. Everything here can be computed with `scripts/sigcalc.mjs`.

## 1. Why views are so noisy

Distribution on TikTok, Reels, Shorts and X is recommendation-driven: each post gets a test audience, and strong early
signals unlock larger waves. The result is a long right tail — most posts land near the account's typical number, a few
land at 5–50x. On the log scale, views look roughly normal.

Practical consequences:

- **Use the median or the geometric mean**, not the arithmetic mean, to describe "typical" posts.
- **Compare logs.** `sigcalc.mjs posts` takes raw numbers and compares `log(x + 1)`.
- **Measure your spread.** `sigcalc.mjs sd --values …` on the last 20–30 posts gives the log SD. Typical values: 0.5–0.7
  for a steady account with a loyal audience (Telegram channels, newsletters), 0.8–1.2 for recommendation-heavy feeds
  (TikTok, Shorts).

## 2. Rate metrics are your friend

When the change happens *inside* a post and each viewer is an independent trial (watched to the end or not, followed or
not), the sample is the number of viewers, not the number of posts. That's much bigger, so tests are faster.

Two-proportion sample size per variant (what `size-rate` computes):

```
n = ( z(1−α/2)·√(2·p̄(1−p̄)) + z(power)·√(p1(1−p1) + p2(1−p2)) )² / (p2 − p1)²,  p̄ = (p1 + p2)/2
```

Reference values (alpha 0.05, power 0.8, computed with `sigcalc.mjs size-rate`):

| Metric | Baseline | Target | Viewers per variant |
|---|---|---|---|
| Follows per view | 0.40% | 0.50% (+25%) | 70,321 |
| Shares per view | 2.0% | 2.4% (+20%) | 21,109 |
| Completion | 35% | 38.5% (+10%) | 2,978 |

So: completion and hold-rate tests are cheap; follow-rate tests need a lot of views. If an account averages 3,000 views a
Reel, a follow-rate test needs ~23 Reels per variant — use completion or sends as the primary metric instead and track
follows as secondary.

Caveat: viewers aren't perfectly independent (one person can see a post twice; recommendation waves cluster). Treat a p of
0.03 as "probably real", not "certain".

## 3. Post-level tests need many posts

When the variable is *about* the post (time of day, weekday, format, caption length), each post is one data point.
Sample size per variant for a log-scale comparison:

```
n ≈ 2 · (z(1−α/2) + z(power))² · sd² / ln(1 + lift)²
```

| log SD | +30% | +50% | +100% |
|---|---|---|---|
| 0.5 | 59 | 25 | 10 |
| 0.7 | 113 | 48 | 18 |
| 1.0 | 230 | 97 | 34 |

(posts per variant, all computed with `sigcalc.mjs size-posts`, alpha 0.05, power 0.8.)

That's why "post at 9 am vs 6 pm" tests on a once-a-day account usually end in "no detectable difference" — and that's a
valid, useful result: it means time isn't a big lever for this account and effort should go elsewhere.

## 4. Peeking

Checking results daily and stopping the first time p < 0.05 inflates the false-positive rate. With 10 looks it's roughly
20% instead of 5%. Rules that keep it honest:

- Pre-commit the end (sample or date).
- At most one interim look, at 50%, with a strict threshold (p < 0.005) for an early win.
- Stopping early for **harm** (guardrails) is always fine.

## 5. Multiple comparisons

Testing three hooks against a control is three comparisons. With alpha 0.05 each, the chance that at least one "wins" by
luck is about 14%. Either:

- Use alpha 0.05 / number of comparisons (Bonferroni: 0.0167 for three), or
- Run A vs B first, then the winner vs C.

Platform tools like YouTube Test & Compare handle this internally and report a preferred variant or "performed the same".

## 6. Effects that fade or fake

- **Novelty:** new formats get a bump because they're new to the audience. Re-test winners after 6–8 weeks.
- **Regression to the mean:** after a bad week, any change "works". Compare against a concurrent control, not last week.
- **Seasonality and market moods:** crypto audiences track the market. Don't run tests across a big market move; void and
  extend.
- **Simpson's paradox:** if variant B got more weekend slots and weekends are better, B looks better for the wrong reason.
  Balance slots (that's what the ABAB template does).
- **Survivorship:** don't compare only the posts that "did well enough to boost".

## 7. Reading an interval

`rate` and `posts` print an interval for the difference. Read it like this:

- Entire interval above 0: B probably beats A; the low end is the conservative effect to plan with.
- Interval spans 0: no detectable difference; the ends tell you the largest effect you can rule out.
- Entire interval below 0: B probably loses.

Write the interval in the log, not just the verdict. "+58% (−2% to +155%)" says "promising, unproven"; "+58%" alone says
"proven", which it isn't.

## Sources (checked 2026-10)

- YouTube Shorts distribution (test audience → expanding waves; swipe-away and completion):
  https://outlierkit.com/resources/youtube-shorts-algorithm/
- Instagram reach signals (sends per reach weighted heavily for non-follower reach): https://www.socialpilot.co/blog/instagram-reels-algorithm
- X ranking (open-sourced, ~15 engagement actions scored): https://github.com/xai-org/x-algorithm
- Evan Miller, "How Not To Run an A/B Test" (peeking): https://www.evanmiller.org/how-not-to-run-an-ab-test.html
