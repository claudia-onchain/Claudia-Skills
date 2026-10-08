# Worked example: Juno's morning-vs-evening test on X (an honest "no clear winner")

**Account.** Juno (@juno_charts), a fictional AI agent that posts chart-literacy explainers with an 8-second desk clip.
About 4k followers on X, one post a day, typical post 600–2,500 impressions. Run by Dana, who approves every post.
Posts go out through `@useclaudia/social` with the Automated label on the account.

## 1. Why this test

Sprout Social's 2026 data puts X's best window at Tue/Wed 9–11 am (checked 2026-10), but Juno's best five posts all went
out after 17:00 London. Dana wanted to know whether to move the daily slot. ICE 5/4/9 = 6.0 — cheap to run, uncertain
payoff.

## 2. Sizing (before posting)

```sh
node scripts/sigcalc.mjs sd --values 940,1310,620,1880,1020,760,1540,1190,580,1270,880,1460,1720,690,2210,1050,1340,830,1600,2480
# posts 20  log_sd 0.41  geo_mean 1171
node scripts/sigcalc.mjs size-posts --sd 0.41 --lift 0.6
# posts_per_arm 13
node scripts/sigcalc.mjs size-posts --sd 0.41 --lift 0.3
# posts_per_arm 40
```

So a 4-week ABAB (12 per arm) can detect roughly a +60% difference; anything around +30% needs ~40 posts per arm (about
three months at one post a day). Dana accepted: "If evening isn't at least +60%, I don't care enough to move it."

Decision rule written down: switch to evenings if the impressions interval is entirely above 0; otherwise keep mornings
(Dana's preferred working hours for reviewing replies) and log the effect size we can rule out.

## 3. Running it

- Schedule adapted from [abab-schedule.csv](../templates/abab-schedule.csv) for one post a day: Monday to Saturday, the
  slot (08:30 or 18:00 London) alternates by day and the pattern flips each week, so every weekday gets both slots twice in
  4 weeks — 12 slots per arm. Each explainer was different (the variable is time, so the content is matched in
  type — every post was "one chart concept + 8-second clip + no link").
- Each post: `social.draft(...)` → `preview` (cost $0.015, labels: made_with_ai) → Dana approves → `social.schedule(id, at)`,
  with the host calling `social.tick()` every 30 seconds. One post landed 14 minutes late after a laptop sleep: the package
  sent it back to approval ("Posting late?"), Dana re-scheduled it for the next matching slot.
- Total X cost: 24 posts published × $0.015 = $0.36 (11 morning — one slot skipped during an X outage — and 13 evening,
  including the extra slot below).
- One evening post was quoted by a 400k account and hit 15,200 impressions. Per the stop rules it was marked `void`
  (outside shock) and one extra evening slot was added.

## 4. Read-out

```sh
node scripts/sigcalc.mjs posts \
  --a 820,1450,610,2300,980,700,1900,1150,540,1300,890 \
  --b 1200,950,2600,1500,780,3400,1100,1750,690,2050,1400,980
# a_geo_mean 1041  b_geo_mean 1371  b_vs_a +31.6% (approx CI −10.5% to +93.5%)  p 0.177 → not significant
```

(Morning: 11 posts. Evening: 12 valid posts; the quoted outlier is void and excluded.)

Follows per 1,000 impressions, pooled:

```sh
node scripts/sigcalc.mjs rate --a 37/12640 --b 61/18400
# a 0.29%  b 0.33%  relative_lift +13%  p 0.55 → not significant
```

Guardrails: no change in unfollows, negative replies, or warnings.

**Decision: keep mornings for now.** Evening looks about 30% better, but the interval runs from −10% to +94%, so the test
can't separate it from no difference. That's the expected outcome for a test sized to catch +60%. What it does say: time of
day is not a huge lever for Juno; there's no sign of a 2x effect.

What Dana did next:

1. Logged the result with its interval in the experiment log and the monthly KPI report.
2. Kept the morning slot (it suits review hours), but moved the weekly "chart of the week" thread — the post with the most
   follow potential — to 18:00 as a low-cost bet, clearly marked in the log as *not* a test result.
3. Put the agent's effort into a higher-ICE test: keyword-first captions on TikTok (`exp-012`).

## Lessons

- A small account posting once a day can only see big effects in a month. Size the test, then decide if it's worth it.
- "Not significant" with an interval is a real finding: it caps how much time-of-day could matter.
- The void rule and the log scale both protect the test. With the 15,200 outlier included, the plain average of evening
  posts jumps from 1,533 to 2,585 impressions — +125% over mornings' 1,149, the kind of number that gets screenshotted as
  "evenings win". On the log scale it moves far less (+58%, p 0.098, still not significant), and the void rule removes it
  anyway because one quote-post isn't a time-of-day effect.
