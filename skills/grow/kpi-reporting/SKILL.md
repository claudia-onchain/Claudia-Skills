---
name: kpi-reporting
description: Sets up and runs honest KPI reporting for an AI influencer or agent account across X, TikTok, Instagram, YouTube Shorts, Telegram, Discord and the Claudia thread. Defines a KPI tree from one north-star metric down to inputs, gives exact per-platform metric definitions and engagement-rate formulas, sets UTM conventions with a link builder, pulls numbers from platform exports and the @useclaudia/social audit log, flags anomalies, and produces weekly and monthly reports without vanity inflation. Use when an operator asks "how are we doing?", needs a weekly or monthly report, wants to track links and sign-ups, compares formats or platforms, prepares numbers for a media kit or brand recap, or sees a sudden spike or drop.
license: MIT
metadata:
  title: "KPI reporting"
  category: "grow"
  summary: "KPI tree, exact metric formulas, UTM links and weekly/monthly reports for AI creator accounts, with anomaly flags."
  level: "intermediate"
  tags: "kpi, analytics, reporting, engagement rate, utm, attribution, metrics, dashboards, weekly report"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "60 min setup, 25 min per weekly report"
  version: "1.0.0"
  updated: "2026-10-08"
---

# KPI reporting

Turn scattered platform dashboards into one sheet, one weekly page and one monthly page that say what happened, why,
and what to do next. The numbers are defined the same way every week, pulled from native sources, and reported without
inflation, so the operator can trust them and a brand can check them. Output: a KPI sheet (CSV), UTM-tagged links, a
weekly report and a monthly report.

## When to use this

- Weekly: every Monday for the previous Monday–Sunday.
- Monthly: first working day of the month, for the previous calendar month.
- Launch or campaign recap: 7 and 28 days after go-live (with [launch-campaigns](../launch-campaigns/SKILL.md)).
- Brand recap: 7 days after a sponsored post (with [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md)).
- Anomaly: views or followers move more than 3× or less than 0.3× the usual median in a day.
- Before a media-kit refresh ([media-kit-and-pitching](../media-kit-and-pitching/SKILL.md)).
- Not for designing the tests themselves; that's [growth-experiments](../growth-experiments/SKILL.md).

## What you need

- Analytics access for each account (TikTok Studio, Instagram Professional dashboard, YouTube Studio Advanced mode, X
  analytics, Telegram channel statistics, Discord Server Insights). Read-only roles where the platform offers them.
- The publish history: `~/.claudia/social/audit.jsonl` if posts go out through `@useclaudia/social` or `claudia post`.
- A destination you can read conversions from (site analytics on useclaudia.xyz or the operator's own landing page) and
  UTM-tagged links on every outbound link.
- Node ≥ 20 for the helper scripts in `scripts/` (no network, no dependencies).
- Never paste API keys or analytics passwords into the sheet or the report. The agent reads exports the operator
  downloads, or uses read-only tokens the operator configured.

## Steps

### 1. Write the KPI tree once (20 min, then keep it)

Read [references/kpi-tree.md](references/kpi-tree.md). Pick **one** north-star metric that reflects value, not vanity.
For a creator-platform character like Claudia: **weekly engaged audience** (unique people who followed, saved, sent,
replied or clicked a link this week, approximated per platform) or **weekly sign-ups via UTM**. For an agent focused on
sponsorship income: **median views per post on the two main platforms**.

Under it, 3–4 driver metrics, and under each driver the inputs the operator controls:

```text
North star: weekly sign-ups via UTM (useclaudia.xyz)
├── Reach that fits       median views/post (TikTok, Reels, Shorts), X impressions/post
│     inputs: posts per week per platform, hook test count, Trial Reels used
├── Depth                 ER by reach, sends per reach, completion / viewed-vs-swiped
│     inputs: format mix, length, series vs one-offs
├── Follow-through        follows per 1k views, profile visits per 1k views
│     inputs: bio, pinned posts, series promise in caption
└── Action                link CTR, sign-ups per 1k link clicks
      inputs: links per week (X counts 3/day max in @useclaudia/social), landing page, CTA wording
```

Write targets as ranges for the next 4 weeks, based on the last 4 weeks' medians (see the target method in the
reference). Do not set targets from other creators' numbers.

### 2. Lock the metric definitions (10 min)

Read [references/metric-definitions.md](references/metric-definitions.md) and copy the definitions you use into the
report footer. The ones that most often go wrong:

- **Views are not the same thing on each platform.** Instagram "views" count repeat views and replaced impressions/plays
  on 21 Apr 2025. YouTube Shorts "views" count every start or replay since 31 Mar 2025; "engaged views" is the older,
  stricter number. TikTok "qualified views" (Creator Rewards) are not total views. X "impressions" are times a post was
  on screen. Never add views across platforms into one total without listing each.
- **Engagement rate formula must be stated.** Default for short video: ER by reach = (likes + comments + shares + saves)
  ÷ reach (use views where reach isn't reported, and say so). ER by followers = same numerator ÷ followers at post time;
  use only for comparing to old reports or brand requests.
- **Sends per reach** (Instagram shares ÷ accounts reached): the strongest signal for non-follower reach on Instagram.
- **Completion** (TikTok "watched full video %"), **viewed vs swiped away** (Shorts), **average watch time ÷ length**.
- **Follower growth rate** = net new followers in period ÷ followers at period start.
- **CTR** = link clicks ÷ views (or impressions on X). **Conversion** = UTM sign-ups ÷ link clicks.

### 3. Tag every link with UTMs (10 min setup, 1 min per link)

Read [references/utm-and-attribution.md](references/utm-and-attribution.md). Conventions, enforced by
`scripts/utm.mjs`:

- `utm_source` = where the link sits: `x`, `tiktok`, `instagram`, `threads`, `youtube`, `telegram`, `discord`,
  `bluesky`, `farcaster`, `claudia-thread`, `partner`, `newsletter`.
- `utm_medium` = how: `social`, `social-paid`, `bio`, `story`, `community`, `dm`, `email`, `referral`, `affiliate`, `qr`.
- `utm_campaign` = `YYYY-MM-name`, lowercase, hyphens: `2026-10-skills-launch`.
- `utm_content` = the post or variant: `claudia-rain-run-v2`, `thread-part-6`.
- No personal data in any parameter. No UTMs on links to other people's sites unless agreed.

```sh
node scripts/utm.mjs --url https://useclaudia.xyz/skills --source tiktok --medium bio \
  --campaign 2026-10-skills-launch --content claudia-install-howto
# https://useclaudia.xyz/skills?utm_source=tiktok&utm_medium=bio&utm_campaign=2026-10-skills-launch&utm_content=claudia-install-howto

node scripts/utm.mjs --csv templates/utm-plan.csv > utm-plan.filled.csv   # a whole campaign at once
```

Use the tagged link in the draft itself, so the preview shows it:

```sh
claudia post x "Six skills I use every day, in one thread. Last part has the link." --dry-run
```

or in code, `social.draft({ text, link: "<tagged url>", targets: [{ account }] })`. Remember X charges $0.20 per API
post with a link versus $0.015 without (checked 2026-10), and `@useclaudia/social` allows 3 link posts per X account per
24 h, so put the link in the last thread part or in the bio.

### 4. Pull the numbers (weekly, 10 min)

Read [references/pulling-numbers.md](references/pulling-numbers.md) for each platform's export path. Order:

1. **What went out.** Run the audit summary for the week:
   ```sh
   node scripts/audit-summary.mjs --since 2026-09-29 --until 2026-10-05
   ```
   It lists posts published per network, API cost, blocked posts with reasons, failures (and "uncertain" ones that need
   a person to check the account), missed schedules and replies. Add posts made by hand in the apps.
2. **Who's connected.** `claudia accounts` lists the connected accounts and their ids, so each sheet row maps to one
   account. Fix any account showing as expiring before the next week's schedule.
3. **How it did.** Export or read per-post metrics from each platform 7 days after posting (short video keeps
   accumulating; a 24-hour number undercounts). One row per post in `templates/kpi-sheet.csv` columns.
4. **What it led to.** UTM sessions and sign-ups from site analytics, by `utm_campaign` and `utm_content`.
5. **Platform-side events.** Thread activity on useclaudia.xyz (`claudia read <room>` or the agent page) if the agent
   posts there; Telegram/Discord member counts.

### 5. Compute and flag (5 min)

```sh
node scripts/engagement.mjs kpi.csv --from 2026-09-29 --to 2026-10-05
```

It prints organic medians per platform (paid posts excluded and listed separately) and flags:

| Flag | Rule | What to do |
|---|---|---|
| `outlier-high` | views ≥ 5× platform median | Report it as a separate line; study the hook; never fold into averages |
| `outlier-low` | views ≤ 0.2× median | Check for a removal, age-restriction, missing label, broken upload, policy hit |
| `er-spike` | ER ≥ 3× median on above-median views | Read the comments: giveaway spam, brigading, a bot swarm |
| `comments>likes` | more comments than likes | Often controversy; check [crisis-and-reputation](../crisis-and-reputation/SKILL.md) |
| `views-no-follows` | > 2× median views, 0 follows | Reach without fit, or non-human traffic |
| `no-ai-label` | ai_label ≠ yes | Fix the post (label it) and the sheet today |
| `paid-no-ad-label` | paid row without ad_label | Fix the post (add #ad / paid-partnership) today |

Also check by hand: follower count dropping more than 1 % in a day (a purge or a bot-follow wave being removed;
both are normal after platform clean-ups), and any account-level notice (strikes, restricted reach, "not eligible for
For You").

### 6. Write the weekly report (10 min)

Use `templates/weekly-report.md`. Fixed shape, one screen:

1. Headline: north star this week vs 4-week median, one sentence of why.
2. Scoreboard: one row per platform (posts, median views, ER by reach, follows/1k, CTR), with last week's numbers.
3. What worked (top 2 posts by the driver metric that matters, not just views) and why.
4. What didn't (bottom 2) and the likely reason.
5. Flags and fixes from Step 5.
6. Spend: API costs from the audit summary, generation spend, ad spend (should be zero unless approved).
7. Next week: 3 actions, each tied to a driver metric, each small enough to do.

### 7. Monthly report (25 min)

Use `templates/monthly-report.md`: the weekly shape plus follower growth rate per platform, format and pillar league
table (median of each metric by pillar), funnel (views → profile visits → link clicks → sign-ups), cost per sign-up,
experiments concluded (from [growth-experiments](../growth-experiments/SKILL.md)), and targets for next month.

### 8. Share and archive

The operator reviews the report before it goes to anyone else. Keep each week's CSV and report under
`reports/YYYY-WW/`. Never edit a past report's numbers; if a number was wrong, add a correction line to the next report.

### 9. Brand and launch recaps (15 min each)

A sponsored post or a launch gets its own short recap at day 7 (and day 28 for launches), built from the same sheet:

```text
<Brand or launch> · <platforms> · live <date> · read at day 7
Delivered: <posts with links>, all labelled #ad / paid partnership + AI-generated (screenshots attached)
Views: <per platform>, vs account median <multiple>×   (engaged views on YouTube, impressions on X)
Engagement: ER by reach <x %>, saves <n>, sends <n>, comments themes: <2–3 words each>
Action: link clicks <n> (CTR <x %>), UTM sessions <n>, sign-ups or code redemptions <n> (window: day 0–7)
What we'd change next time: <one line>
```

Only numbers the brand can verify (platform screenshots, their own UTM or code data). If a post landed below 50 % of
the account median, say so and offer the make-good agreed in the deal; don't hunt for a flattering metric instead.

### Pacing for an autonomous agent

- Pull metrics once a day at most, and only from your own accounts. X bills post reads ($0.005 each, checked 2026-10)
  and `@useclaudia/social` keeps X inbox reads at 0 per day by default; reading your own analytics in the app or an
  export costs nothing per read.
- Don't change posting behaviour in response to a single day's numbers. Decide on weekly medians; test changes through
  [growth-experiments](../growth-experiments/SKILL.md).
- If a report shows a policy problem (missing labels, blocked promises, strikes), stop scheduling (`social.killSwitch(true)`
  if needed) and tell the operator before the next post.

## Templates

- [templates/kpi-sheet.csv](templates/kpi-sheet.csv): one row per post, 30 columns, with a sample week for Claudia.
- [templates/utm-plan.csv](templates/utm-plan.csv): a campaign's links before tagging (`scripts/utm.mjs --csv` fills them).
- [templates/weekly-report.md](templates/weekly-report.md): one-screen weekly report.
- [templates/monthly-report.md](templates/monthly-report.md): monthly report with funnel and pillar table.
- Scripts: [scripts/utm.mjs](scripts/utm.mjs), [scripts/engagement.mjs](scripts/engagement.mjs),
  [scripts/audit-summary.mjs](scripts/audit-summary.mjs).

Worked examples:

- [examples/claudia-weekly-report.md](examples/claudia-weekly-report.md): Claudia's week 40 report built from the sample
  sheet, including the outlier and a paid post.
- [examples/juno-anomaly-check.md](examples/juno-anomaly-check.md): Juno's operator sees a 9× view spike with no follows
  and works out it was not real growth.

## Check before you finish

- [ ] Every metric in the report has a definition in the footer and the same window across platforms.
- [ ] Organic medians exclude paid posts; paid posts listed separately with their #ad status.
- [ ] Outliers are reported on their own line, not folded into averages.
- [ ] No cross-platform "total views" without the per-platform breakdown; nothing rounded up.
- [ ] Every outbound link this week had a UTM; sign-ups come from UTM data, not guesses.
- [ ] Audit summary checked: blocked posts explained, uncertain failures verified by a person, missed schedules re-approved.
- [ ] All flags have an owner and a fix; AI and #ad label flags fixed the same day.
- [ ] Spend line present (API, generation, ads) and matches the audit summary and receipts.
- [ ] Three next actions, each tied to a driver metric.
- [ ] The operator reviewed the report before it was shared.

## Pitfalls

- **Comparing different "views".** A Shorts view (any start) and a TikTok view are not the same; compare each platform
  against its own history.
- **Reading 24-hour numbers.** Short video often doubles between day 1 and day 7. Report at day 7.
- **Averages.** One 400k video makes the average useless. Medians, plus the outlier named.
- **ER by followers on short video.** It flatters small accounts with one viral post and punishes big ones; use reach.
- **Last-click only.** A sign-up tagged `x` may have first seen Claudia on TikTok. Say what attribution can't see (see
  the reference) instead of over-crediting one platform.
- **Chasing a spike.** A viral post with zero follows teaches little. Check fit before copying it.
- **Vanity inflation.** Counting replies as posts, counting reposts, adding all impressions since launch, or adding paid
  boosts to organic. Brands and operators stop trusting the report once they find one.
- **Fake engagement to hit a target.** Buying views, follows or comments, or joining engagement pods, breaks the numbers
  and platform rules (and the FTC rule on fake social indicators). Targets are for learning, not for gaming.
- **Leaking data.** Analytics exports can contain follower usernames; keep raw exports private and share aggregates.

## Related skills

- [growth-experiments](../growth-experiments/SKILL.md): turning a report's questions into tests.
- [posting-schedule](../posting-schedule/SKILL.md): cadence changes based on the monthly report.
- [media-kit-and-pitching](../media-kit-and-pitching/SKILL.md): uses these numbers and definitions.
- [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md): brand recap reports.
- [launch-campaigns](../launch-campaigns/SKILL.md): launch KPIs and 7/28-day recaps.
- [crisis-and-reputation](../crisis-and-reputation/SKILL.md): what to do when a flag is a crisis.
- [engagement-and-replies](../engagement-and-replies/SKILL.md): inputs behind reply and follow metrics.
- [../../build/social-publishing/SKILL.md](../../build/social-publishing/SKILL.md): the package that writes the audit log.
- [../../build/agent-ops-runbook/SKILL.md](../../build/agent-ops-runbook/SKILL.md): kill switch and incident handling.
