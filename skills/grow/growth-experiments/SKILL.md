---
name: growth-experiments
description: Runs honest growth experiments for an AI influencer or creator account - turns ideas into scored hypotheses (ICE), sizes each test so the result means something (minimum detectable effect, posts or viewers per variant), picks a design (Instagram Trial Reels, YouTube Test & Compare, alternating ABAB schedules), changes one variable at a time, publishes variants through the approval flow, applies stop rules and guardrails, and writes a read-out with a decision. Use when someone asks "what should we test", wants to compare hooks, formats, posting times, captions or thumbnails, needs to know whether a change actually worked, or wants an experiment log and cadence. Never tests disclosure removal, bought engagement or other manipulation.
license: MIT
metadata:
  title: "Growth experiments"
  category: "grow"
  summary: "Hypothesis to read-out: size tests properly, change one thing, use Trial Reels and ABAB schedules, stop on rules, log every result."
  level: "intermediate"
  tags: "experiments, A/B testing, Trial Reels, hooks, sample size, ICE, analytics, growth"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "30 min to design, 1–4 weeks to run"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Growth experiments

Most "this worked!" moments on social are noise: one post caught a good hour, the next one didn't. This skill makes an
agent and its operator run fewer, better tests — each with one variable, a primary metric, a sample size worked out
in advance, a fixed end date and a written decision — so the account learns things that stay true. It ships a
calculator (`scripts/sigcalc.mjs`), an experiment log and worked examples with Claudia and Juno.

## When to use this

- The operator asks what to try next to grow, or has a list of ideas and no order.
- Someone wants to compare two hooks, captions, thumbnails, posting times, lengths, series formats or CTAs.
- A metric moved and someone claims a cause ("the new bio doubled follows").
- Planning a weekly or monthly test cadence for an account on X, TikTok, Instagram, YouTube or Telegram.

Not for: choosing what the account stands for (use [personal-brand-strategy](../personal-brand-strategy/SKILL.md)),
reporting (use [kpi-reporting](../kpi-reporting/SKILL.md)), or finding trends to ride (use
[trend-research](../trend-research/SKILL.md)).

## What you need

- Analytics access for each platform tested: X post analytics, TikTok Studio, Instagram Professional dashboard (Trial Reels
  need a public professional account), YouTube Studio, Telegram channel stats.
- At least 4–6 weeks of past post data (views, follows, completion where available) to get a baseline and its spread.
- Node ≥ 20 for `scripts/sigcalc.mjs` (no network, no dependencies).
- `@useclaudia/social` or the CLI if variants are published by the agent; every post still goes through
  draft → preview → approve → publish.
- Templates: [templates/ice-backlog.csv](templates/ice-backlog.csv),
  [templates/experiment-brief.md](templates/experiment-brief.md),
  [templates/experiment-log.csv](templates/experiment-log.csv),
  [templates/abab-schedule.csv](templates/abab-schedule.csv).

Read these references when the step needs them:

| Reference | Read it when |
|---|---|
| [references/stats-for-social.md](references/stats-for-social.md) | Step 4 and Step 8: why views are noisy, how to size tests, peeking, multiple comparisons, novelty effects. |
| [references/native-test-tools.md](references/native-test-tools.md) | Step 5: what each platform offers for split tests (checked 2026-10) and how to fake nothing. |
| [references/experiment-ideas.md](references/experiment-ideas.md) | Step 2: 40 ideas by lever, with the metric each one should move. |
| [references/allowed-vs-manipulation.md](references/allowed-vs-manipulation.md) | Before Step 3, every time: the line between testing and gaming a platform. |

## Steps

### 1. Pick one north-star metric and per-test metrics

Raw likes and views are outputs; growth comes from **rates**. Decide the account's north star with the operator, then choose
a primary metric per test that sits close to the change.

| Goal | North star | Good primary metrics per test |
|---|---|---|
| Grow the audience | net follows per week | follows per 1,000 views; profile visits per 1,000 views |
| Reach new people | non-follower reach | Instagram sends per reach; TikTok share rate; Shorts "viewed vs swiped away" |
| Hold attention | average % watched | 3-second hold; completion rate; rewatches |
| Build community | weekly active members (Telegram/Discord) | replies per post; joins per post with the link |
| Earn | qualified revenue (deals, rewards) | link clicks per 1,000 views with UTMs; media-kit requests |

Always add **guardrails**: metrics that must not get worse (unfollows per post, negative-comment share, any platform
warning, AI-label or #ad compliance). A test that wins on views by losing trust is a loss.

### 2. Fill the backlog and score it (ICE)

Collect ideas in [templates/ice-backlog.csv](templates/ice-backlog.csv) — from analytics, comments, competitors' public
posts, [references/experiment-ideas.md](references/experiment-ideas.md) and [trend-research](../trend-research/SKILL.md).
Score each 1–10:

- **Impact:** if it works, how much would the north star move? (10 = doubles it; 3 = a few percent)
- **Confidence:** how sure are we it will work? Evidence counts: our own past data 7–9, a platform's own guidance 6–7,
  a blog listicle 3–4, a hunch 2.
- **Ease:** effort and cost. Can the agent produce variants in under an hour? Does it need paid generation? (10 = trivial)

ICE = (I + C + E) / 3. Run the top 1–2 per platform. Re-score monthly. Kill ideas that break a rule in
[allowed-vs-manipulation.md](references/allowed-vs-manipulation.md) regardless of score.

### 3. Write the hypothesis and pre-register the test

Copy [templates/experiment-brief.md](templates/experiment-brief.md). The hypothesis has one shape:

```text
If we change {one variable} from {A} to {B} for {format/platform/audience},
then {primary metric} will move from {baseline} to {target} within {duration},
because {reason grounded in data or platform behaviour}.
```

Fill in, before anything is posted: primary metric, guardrails, sample size (Step 4), design (Step 5), start and end
dates, stop rules (Step 7), and the decision rule ("ship B if the lift's 95% interval is above 0; tie → keep A, it's
cheaper"). Writing the decision rule first is what stops a team from reading the result they wanted.

**One-variable rule.** Change exactly one thing per test. Hook text *or* first frame *or* length, not all three. If the
operator wants to try a whole new format, that's fine — call it a *format test*, where the variable is "format", and accept
that you won't know which part did it.

### 4. Size it before you start

Social numbers are noisy. Views per post typically follow a long-tailed (log-normal-ish) distribution: the log-scale standard
deviation of a creator's views is usually 0.6–1.2. Run the calculator on the last 20–30 posts:

```sh
node scripts/sigcalc.mjs sd --values 1200,800,3100,950,2200,1900,4100,1300
# log_sd 0.57  geo_mean 1679
```

Then pick the test type:

**Rate tests** (one denominator per viewer: follows per view, completion per view, sends per reach). Size with
`size-rate`:

```sh
node scripts/sigcalc.mjs size-rate --base 0.004 --lift 0.25   # follows/view 0.40% → 0.50%
# per_arm 70321 views per variant (alpha 0.05, power 0.8)
node scripts/sigcalc.mjs size-rate --base 0.35 --lift 0.10    # completion 35% → 38.5%
# per_arm 2978 views per variant
```

**Post-level tests** (one number per post, compared on the log scale). Size with `size-posts`:

| log SD of past posts | Detect +50% | Detect +100% (2x) |
|---|---|---|
| 0.7 | 48 posts per variant | 18 posts per variant |
| 1.0 | 97 posts per variant | 34 posts per variant |

(Computed with `sigcalc.mjs size-posts`, alpha 0.05, power 0.8.)

What this means in practice:

- A posting-time test on an account that posts once a day can only detect **big** effects (2x) within a month. Anything
  smaller needs months or a different design.
- Rate tests inside one post (Trial Reels, Test & Compare) need far fewer *posts* because every viewer is a data point.
- If the needed sample is out of reach, don't run a fake test. Either test a bolder change, pick a metric with a higher base
  rate (completion instead of follows), or treat it as a directional pilot and say so in the log.

### 5. Choose the design

Read [references/native-test-tools.md](references/native-test-tools.md) for the current platform tools. In order of
preference:

1. **Native split tests** — the platform randomises viewers for you.
   - *YouTube Test & Compare*: up to 3 thumbnails, titles, or combinations on long-form videos; the winner is chosen on
     watch-time share. Not available for Shorts (checked 2026-10).
   - *Instagram Trial Reels*: a Reel shown to non-followers first; results after about 24 hours, decision window 72 hours;
     manual or automatic sharing to followers. Post variant A and variant B as two Trial Reels at the same hour and compare
     rates per view. Not a strict randomised split, but the same audience pool and timing.
2. **Alternating schedules (ABAB)** — for posting time, format or caption style on platforms without split tests (X, TikTok,
   Threads, Telegram). Alternate A and B by slot, balanced across weekdays, for a fixed number of posts.
   [templates/abab-schedule.csv](templates/abab-schedule.csv) lays out a 4-week block.
3. **Before/after with a holdout** — for account-level changes (bio, pinned post, profile picture). Weakest design: compare
   against the same weeks on another platform where nothing changed, and read it as a hint, not proof.

Never compare across platforms (TikTok views vs. X impressions) and never compare a weekday post against a weekend post
without balancing.

### 6. Produce and publish the variants

Variants come from the same production run so the only difference is the variable (see
[batch-content-production](../../create/batch-content-production/SKILL.md) and
[captions-and-hooks](../../create/captions-and-hooks/SKILL.md)). Tag every post with its experiment id and variant:

- In the log ([templates/experiment-log.csv](templates/experiment-log.csv)) — one row per post.
- In links: `?utm_source=x&utm_medium=social&utm_campaign=exp-014&utm_content=hook-b`.

For ABAB on networks the package supports, schedule approved drafts:

```ts
import { createSocial, chainKeys, envKeys } from "@useclaudia/social";
const social = createSocial({ keys: chainKeys(envKeys()) });
await social.ready();
const [acct] = social.accounts().filter((a) => a.network === "x");

const slots = [ // from abab-schedule.csv: ISO time, variant, text
  ["2026-10-13T08:30:00Z", "A", "Rooftop at dusk, laptop open, one question: what would your agent post first?"],
  ["2026-10-13T17:30:00Z", "B", "Rooftop at dusk, laptop open, one question: what would your agent post first?"],
  // …
];
for (const [at, variant, text] of slots) {
  const p = social.draft({ text, targets: [{ account: acct.id }], media: [{ path: `./exp-014/${variant}.mp4`, alt: "AI-generated clip of Claudia on a rooftop at dusk" }] });
  console.log(variant, social.preview(p.id)[0]);  // check labels, cost, warnings
  social.submit(p.id);                              // a person approves each one in the review UI…
}
// …after approval: social.schedule(id, Date.parse(at)); the host runs setInterval(() => social.tick(), 30_000).
```

Note the near-duplicate rule: the package blocks the same text to the same account within 24 hours. For a time test, either
space identical posts more than 24 hours apart or keep the content different but matched in type (the variable is time,
not text). One-off checks from the terminal: `claudia post x "…" --media ./exp-014/A.mp4 --dry-run`.

Instagram Trial Reels and YouTube Test & Compare are set up in the apps by a person (the toggle isn't in the posting API
the package uses); the agent prepares the files, captions and the brief.

### 7. Stop rules (decided in Step 3, applied without debate)

- **Fixed end.** The test ends at the planned sample or date, whichever comes first. No early "it's winning, ship it".
  Peeking every day and stopping on the first significant result can push false positives from 5% to over 20%. If an
  interim look is needed, take one, at the halfway point, and only stop for a win if p < 0.005.
- **Harm stops immediately:** any platform warning, strike, or content removal; unfollows per post above 2x baseline for
  3 posts; negative-comment share above 25%; reach down more than 50% for 3 consecutive posts in either arm.
- **Outside shocks void the window:** a viral post, a platform outage, a news event, a crisis. Mark those posts `void` in the
  log and extend the test.
- **Budget stops:** if paid generation or X API costs exceed the brief's budget, pause and ask.

### 8. Read out and decide

Run the matching test:

```sh
node scripts/sigcalc.mjs rate --a 41/10200 --b 63/9800
# relative_lift 59.9%, diff CI 0.041% to 0.441%, p 0.0179 → significant
node scripts/sigcalc.mjs posts --a 1200,800,3100,950,1500,700,2100,1100 --b 2200,1900,4100,1300,1700,2600,900,3000
# b_vs_a +57.9% (CI −2.3% to +155%), p 0.083 → not significant
```

Write the read-out in the brief: result with interval, guardrails, what surprised us, decision (ship / iterate / kill),
and the next test it suggests. Three honest outcomes are all useful:

- **Win:** make B the default; add it to the agent's playbook; re-test in 6–8 weeks (novelty fades).
- **Tie:** keep the cheaper or simpler option; record the effect size you *could* rule out ("not more than +40%").
- **Loss:** keep A; write down why B probably lost.

Move the summary line into [kpi-reporting](../kpi-reporting/SKILL.md)'s monthly report.

### 9. Run a cadence, not a burst

- At most **two concurrent experiments per platform**, and never two that touch the same variable or the same posts.
- Weekly: check stop rules, log new posts, look at guardrails (15 minutes).
- Monthly: close finished tests, re-score the backlog, pick the next two.
- Quarterly: re-run the top 3 past winners to confirm they still hold.

### Pacing for an autonomous agent

An agent may propose experiments, prepare variants, fill the log and compute results on its own. It may not: start a test
without a person approving the brief, publish variants without per-post approval, spend on generation beyond the brief's
budget, or change the decision rule after seeing data. It keeps to the package's daily caps and posts no more than the
account's normal frequency — a test that doubles posting volume is testing volume, not the variable.

## Templates

- [templates/ice-backlog.csv](templates/ice-backlog.csv) — idea backlog with ICE scores and status.
- [templates/experiment-brief.md](templates/experiment-brief.md) — one-page pre-registration + read-out.
- [templates/experiment-log.csv](templates/experiment-log.csv) — one row per post per experiment.
- [templates/abab-schedule.csv](templates/abab-schedule.csv) — balanced 4-week alternating schedule.
- [scripts/sigcalc.mjs](scripts/sigcalc.mjs) — sample sizes and significance (`size-rate`, `rate`, `size-posts`, `posts`, `sd`).

Prompt for the agent to draft a brief from a backlog row:

```text
You are planning a growth experiment for {account} on {platform}. Backlog item: "{idea}" (ICE {i}/{c}/{e}).
Baseline from the last 30 posts: {metric} = {value}, log SD of views = {sd}.
Write an experiment brief using the template: one variable, primary metric, guardrails, hypothesis sentence, design
(native split, ABAB or before/after), sample size from sigcalc (show the command), dates, stop rules, decision rule.
Refuse and explain if the idea involves bought engagement, pods, duplicate accounts, deleting and reposting to re-roll
reach, removing AI or #ad labels, engagement bait, or misleading thumbnails.
```

## Check before you finish

- [ ] The brief names exactly one variable (or is honestly labelled a format test).
- [ ] Primary metric is a rate or a log-scale post metric; guardrails are listed.
- [ ] Sample size comes from `sigcalc.mjs` with the command recorded; the test is feasible in the window, or labelled a pilot.
- [ ] Decision rule and stop rules were written before the first post.
- [ ] A person approved the brief; every variant post went through approval; spend stayed within budget.
- [ ] AI labels, #ad and "Not financial advice." (where a coin is mentioned) are identical across variants — never a variable.
- [ ] Every post is in the experiment log with its variant; void posts are marked.
- [ ] The read-out states the interval, not just "B won", and the next action.

## Pitfalls

- **Testing five things at once.** You'll get a result and no lesson.
- **Calling a test after three posts.** With a log SD of 0.8, three posts can't tell +100% from zero.
- **Peeking and stopping on a good day.** Fix the end before starting.
- **Comparing a viral outlier.** One post at 40x the median swings a mean; that's why the calculator works on logs and why
  void rules exist.
- **Novelty effect.** New formats often win for two weeks because they're new. Re-test winners.
- **Seasonality.** Crypto audiences swing with the market; a test that straddles a market spike is contaminated.
- **Changing the AI label or #ad to "see if reach improves".** Never. Disclosure is a constant, not a variable.
- **Re-posting the same video to re-roll distribution.** Platforms treat it as duplicate or unoriginal content; it isn't a test.

## Related skills

- [kpi-reporting](../kpi-reporting/SKILL.md) — where results land.
- [posting-schedule](../posting-schedule/SKILL.md) — time tests feed the schedule.
- [instagram-reels-playbook](../instagram-reels-playbook/SKILL.md) — Trial Reels in context.
- [youtube-shorts-playbook](../youtube-shorts-playbook/SKILL.md), [tiktok-playbook](../tiktok-playbook/SKILL.md),
  [x-playbook](../x-playbook/SKILL.md) — platform signals worth testing.
- [trend-research](../trend-research/SKILL.md) — a source of hypotheses.
- [captions-and-hooks](../../create/captions-and-hooks/SKILL.md) — producing hook variants.
- [thumbnails-and-covers](../../create/thumbnails-and-covers/SKILL.md) — producing thumbnail variants.
- [autonomous-posting-loop](../../build/autonomous-posting-loop/SKILL.md) — scheduling variants with approval.
