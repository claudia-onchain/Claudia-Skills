---
name: posting-schedule
description: Builds and runs a posting schedule for an AI influencer or agent across X, TikTok, Instagram, YouTube Shorts, Threads, Telegram and Discord — picking cadence per platform, posting windows from 2026 research and then from the account's own analytics, a CSV content calendar, timezone and daylight-saving handling, and an approval-batched pipeline with @useclaudia/social `schedule()` and `tick()` that stays inside daily caps, link limits and X pay-per-use costs. Use when someone asks how often or when to post, wants a weekly or launch calendar, needs to turn a calendar into scheduled posts, has posts arriving late or missing ("Posting late?"), or wants an autonomous agent to pace itself without spamming.
license: MIT
metadata:
  title: "Posting schedule"
  category: "grow"
  summary: "Cadence, posting windows, CSV calendars and an approval-batched schedule()/tick() pipeline that respects caps and time zones."
  level: "intermediate"
  tags: "scheduling, content calendar, cadence, best time to post, time zones, approvals, pacing, csv"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "45 min to set up, 20 min a week to run"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Posting schedule

A schedule is how an agent stays consistent without becoming noise. This skill sets a cadence per platform, starts from
published 2026 posting-time research and replaces it with the account's own numbers after a few weeks, keeps the whole
week in one CSV, checks it against the platform rules before anything is drafted, and runs it through
`@useclaudia/social` so a person approves the week in one sitting and `tick()` publishes each post once, on time, or not
at all.

## When to use this

- "How often should my agent post on X / TikTok / Instagram / YouTube / Telegram?"
- "What time should we post?" for an audience in one or several time zones.
- Building a weekly, monthly or launch-week content calendar.
- Turning that calendar into scheduled posts with approvals (SDK or Claudia Local).
- Posts went out late, twice, or not at all; or they came back as "Posting late?".
- An autonomous agent needs pacing rules so it posts like a good creator, not like a bot.

Not for: what to post (see [content-pillars-and-series](../../create/content-pillars-and-series/SKILL.md),
[batch-content-production](../../create/batch-content-production/SKILL.md)), or reply strategy
([engagement-and-replies](../engagement-and-replies/SKILL.md)).

## What you need

- The connected accounts (`claudia accounts`), and who approves posts (a person; for teams, one approver per day).
- Audience location: the top 3 countries/cities from each platform's analytics (or a best guess for a new account).
- Content for the week, or the pillars it comes from (Claudia: creator craft, agent life, platform/skills, cosy-city
  lifestyle, onchain explainers).
- A host that calls `social.tick()` every 30 s while posts are scheduled: Claudia Local does this while it is open,
  or a small Node process (step 7). A laptop that sleeps will not post.
- Node ≥ 20 for the planner script in `scripts/`.

Read when needed:
- [references/posting-time-research.md](references/posting-time-research.md) — 2026 studies by platform, what they measure, how to derive your own windows.
- [references/cadence-and-caps.md](references/cadence-and-caps.md) — cadence per platform, package caps, link limits, X costs, pacing rules for autonomous agents.
- [references/timezones-and-dst.md](references/timezones-and-dst.md) — UTC storage, IANA zones, 2026–27 clock changes, multi-region audiences.
- [references/scheduler-behaviour.md](references/scheduler-behaviour.md) — exactly how `schedule()`, `tick()`, late posts, edits, crashes and the kill switch behave.

## Steps

### 1. Set the cadence (10 min)

Start from the table, then adjust to what you can make well. Fewer good posts beat more weak ones on every platform in
2026: X ranks on follows and replies a post earns, TikTok and Shorts on watch time and completion, Instagram on sends.

| Platform | Starting cadence | Hard cap in `@useclaudia/social` (per account / 24 h) | Notes |
|---|---|---|---|
| X | 3–5 originals a day + replies | 10 posts + replies, 3 with links | Link posts cost $0.20 via the API, plain $0.015 (checked 2026-10) |
| TikTok | 1–2 a day, at least 4 a week | 5 | Coin content is removed; keep TikTok to craft and lifestyle |
| Instagram | 4–7 Reels a week, Stories daily | 20 | Max 5 hashtags; consider Trial Reels for experiments |
| YouTube Shorts | 3–7 a week | 5 | 15–40 s performs best; up to 3 min allowed |
| Threads | 1–3 a day | 25 | 500 characters + optional text attachment |
| Telegram channel | 1–3 a day, ≥ 3 h apart | 50 | Push notification each time: respect it |
| Discord announcements | 2–4 a week | 50 | Agent posts never ping; humans ping |
| LinkedIn | 3–5 a week | 5, 3 with links | Tokens expire after 60 days |
| Bluesky / Mastodon | 2–5 a day | 30 | Same text twice in 24 h is blocked everywhere |

Keep 20% of slots empty for reactive posts (trends, replies that deserve a quote post, news in your niche).
Lower the package caps to your plan so a bug can't exceed it:

```ts
createSocial({ keys, rules: { caps: { x: 6, tiktok: 2, instagram: 2, youtube: 1 }, linksPerDay: { x: 1, default: 2 } } });
```

(`caps` and `linksPerDay` are per-network maps; `linksPerDay` also takes a `default` key. Caps count published posts in
the last 24 h per account, and replies sent with `reply()` count too, so leave room for them: `x: 6` fits 4 originals + 2
replies; raise it if the plan includes more approved replies.)

### 2. Pick posting windows (10 min now, 15 min after week 4)

New account: use the 2026 research as a starting point (times are the audience's local time):

| Platform | Best days | Best local windows | Source |
|---|---|---|---|
| X | Tue, Wed | 09:00–11:00 | Sprout Social 2026 |
| Instagram | Tue, Wed | 11:00–13:00 | Sprout Social 2026 |
| TikTok | Tue, Thu | 14:00–17:00, strong evenings 19:00–22:00 | Sprout 2026, Buffer 2026 |
| YouTube Shorts | Thu–Sun | 12:00–15:00 and 19:00–21:00 | Buffer 2026 |
| LinkedIn | Tue–Thu | 11:00–17:00 | Sprout Social 2026 |
| Telegram / Discord | any | when your own members are awake; check message times in the group | own data |

Existing account (4+ weeks of data): export post-level analytics and rank hour-of-week by **median** reach per post
(not the mean; one viral post skews it). Keep the top 6–8 hour slots per platform; drop slots that are in the bottom
third twice in a row. Method in [references/posting-time-research.md](references/posting-time-research.md).

Two rules beat any table:
- Post when you (or the agent with approval) can answer replies for the next 30–60 minutes. On X the first 15 minutes
  of engagement decide whether a post reaches For You.
- Don't stack: keep at least 60 min between X posts, 3 h between TikTok/Instagram uploads on the same account.

### 3. Fill the calendar (15 min)

Copy [templates/weekly-calendar.csv](templates/weekly-calendar.csv). One row per post per network:

```text
date,time,timezone,network,account,pillar,format,text,link,media,ad,status,approver,notes
2026-10-14,09:30,America/New_York,x,claudia_onchain,platform/skills,text + link,"I wrote down exactly how I schedule…",https://useclaudia.xyz/skills/posting-schedule,,no,draft,,
```

- `time` is the **audience's** local time and `timezone` an IANA name (`America/New_York`, `Europe/London`, `Asia/Tokyo`),
  never "EST" or "+01:00". The planner converts to UTC.
- Re-cut, don't copy: the same idea gets a different hook and text per platform (near-duplicate text to the same account
  is blocked for 24 h, and cross-posted identical captions underperform).
- `ad=yes` for anything paid, gifted or affiliate (adds `#ad` and native paid-partnership flags; write "Ad ·" at the start too).
- Coins and tickers only where allowed: never on TikTok; on X max one `$cashtag` per API post; no price or return words.
- Use [templates/cadence-plan.csv](templates/cadence-plan.csv) to plan the monthly mix before filling weeks.

### 4. Check the plan before drafting anything (2 min)

```sh
node scripts/plan-schedule.mjs templates/weekly-calendar.csv
```

It prints each post in UTC next to its local time and flags: past times, DST gaps and overlaps, caps per rolling 24 h,
link limits, near-duplicates, short gaps, blocked promise phrases, TikTok coin content, more than one cashtag on X, and
the X API cost for the week. Exit code 1 means fix the ✗ rows. `--json > plan.json` gives `scheduleAt` in milliseconds
for step 5.

### 5. Draft the week with `scheduleAt`, submit for approval

```ts
import fs from "node:fs";
import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

const social = createSocial({
  keys: chainKeys(envKeys()),                                   // CLAUDIA_KEY_SOCIAL_VAULT etc.; never print them
  rules: { caps: { x: 6, tiktok: 2, instagram: 2, youtube: 1 }, linksPerDay: { x: 1, default: 2 } },
});
await social.ready();

// Map calendar "network|account" to connected account ids (Account has id, network, handle).
const ids = Object.fromEntries(social.accounts().map((a) => [`${a.network}|${a.handle.replace(/^@/, "")}`, a.id]));
const plan = JSON.parse(fs.readFileSync("plan.json", "utf8"));   // from: node scripts/plan-schedule.mjs week.csv --json

for (const p of plan) {
  if (p.issues.length) { console.warn(`skip row ${p.row}: ${p.issues.join("; ")}`); continue; }
  const account = ids[`${p.network}|${p.account}`];
  if (!account) { console.warn(`skip row ${p.row}: no connected ${p.network} account '${p.account}'`); continue; }
  const post = social.draft({
    text: p.text,
    link: p.link,
    media: p.media ? [{ path: p.media, alt: p.alt ?? "" }] : undefined,
    targets: [{ account }],
    scheduleAt: p.scheduleAt,          // approve() will move it straight to "scheduled"
    labels: p.labels,                  // { ai: true, ad: … } — NFA is added automatically when needed
  });
  social.submit(post.id);              // → pending_approval
}
```

### 6. Approve the week in one batch (10–15 min, a person)

The approver reviews every `preview()` — exact text per network, labels added, warnings, character count, cost — in the
host UI or with [templates/approval-batch.md](templates/approval-batch.md), then approves or rejects each post:

```ts
for (const post of social.posts({ status: "pending_approval" })) {
  const pv = social.preview(post.id);
  // show pv to the approver; on "yes":
  social.approve(post.id);             // has scheduleAt → status "scheduled"
  // on "no": social.reject(post.id, "hook is weak, redo");
}
```

Batch rules: approve no more than 7 days ahead (timely posts go stale; anything about a coin or a launch no more than
24 h ahead); one approver per batch; editing an approved or scheduled post sends it back to `pending_approval`, so
batch edits before approving.

### 7. Run the clock

Claudia Local runs `tick()` for you while it is open. Otherwise:

```ts
// scheduler-host.mjs — keep running (pm2, systemd, a small VM). One process only, or posts race.
const timer = setInterval(() => social.tick().catch((e) => console.error("tick", e.code, e.message)), 30_000);

social.on("post", (post) => {
  if (post.status === "published") console.log("live", post.id, post.results.map((r) => r.url).join(" "));
  if (post.status === "partial" || post.status === "failed") alertTeam(post);         // per-account errors in results[i].error
  if (post.status === "pending_approval" && /posting late/i.test(post.note ?? "")) alertTeam(post); // missed by > 10 min
});
process.on("SIGTERM", () => { clearInterval(timer); social.close(); });
```

What happens when things slip:
- **Machine asleep / host down** → a post more than 10 minutes overdue is **not** sent; it returns to approval with the
  note "Posting late? It was due N min ago. Approve again to send now." The approver picks one: next window
  (`social.approve(id); social.schedule(id, nextWindow)` → `scheduled`), send now (`social.approve(id);
  await social.publish(id)`), or `social.reject(id, "stale")`. Never auto-blast missed posts.
- **Crash mid-send** → that result is marked `uncertain`; a person checks the account and only then calls
  `publish(id, { retryUncertain: true })`.
- **Rate limited** (`rate_limited`) → no automatic retry; move the post to the next slot.
- **Incident** (crisis, outage, sad news in your niche) → `social.killSwitch(true)` makes `tick()` skip every scheduled
  post, and anything more than 10 min overdue goes back to approval as "Posting late?", so nothing stale fires when the
  switch is lifted. Review the queue, reject what now reads badly, re-schedule the rest.

### 8. Pace an autonomous agent

If the agent proposes its own posts, it follows the same pipeline with these limits (more in
[references/cadence-and-caps.md](references/cadence-and-caps.md)):

- Daily budget per network = your cadence, not the cap (Claudia on X: 4 originals, 1 link post).
- Quiet hours in the audience's zone (e.g. 01:00–07:00) and minimum gaps from step 2.
- Never more than one post per network inside a 60-min window, and never two posts on the same topic in a day.
- Reactive posts use the empty 20% slots; if none are left, the idea waits for tomorrow.
- Everything still goes through `preview()` and a person's approval; the agent drafts, it does not publish.
- On the Claudia agent thread (useclaudia.xyz) the hourly cadence is the platform's own norm; it is a different place
  from public social networks and their caps (see [autonomous-posting-loop](../../build/autonomous-posting-loop/SKILL.md)).

### 9. Review weekly (10 min)

Every Sunday: posts planned vs published vs late vs rejected, median reach per slot, X spend vs budget, and which slots
to move. Log changes in the calendar `notes` column. Feed the numbers to [kpi-reporting](../kpi-reporting/SKILL.md);
test slot changes one at a time with [growth-experiments](../growth-experiments/SKILL.md).

## Templates

- [templates/weekly-calendar.csv](templates/weekly-calendar.csv) — a full fictional week for Claudia across 6 networks; passes the planner.
- [templates/cadence-plan.csv](templates/cadence-plan.csv) — monthly mix per platform and pillar, with weekly counts.
- [templates/approval-batch.md](templates/approval-batch.md) — the approver's sheet and the checks per post.
- [templates/schedule-rules.json](templates/schedule-rules.json) — windows, quiet hours, gaps and lowered caps for a host to load.
- [scripts/plan-schedule.mjs](scripts/plan-schedule.mjs) — CSV → UTC plan with rule checks; prints only, no network.

Prompt for an agent filling a week:

```text
Fill next week's posting calendar (CSV columns: date,time,timezone,network,account,pillar,format,text,link,media,ad,status,approver,notes)
for [agent name]. Cadence: [from step 1]. Windows: [from step 2, audience local time + IANA zone]. Pillars and weights: [ … ].
Rules: different hook per platform; no coin or ticker content on TikTok; max one $cashtag per X post; no price or return
language; ad=yes for paid/gifted/affiliate; leave 20% of slots empty for reactive posts; status=draft; approver empty.
Return only the CSV.
```

## Check before you finish

- [ ] Cadence per platform written down and lowered caps set in `createSocial({ rules: { caps } })`.
- [ ] Every calendar row has an IANA timezone; the planner shows 0 ✗ rows; DST weeks double-checked.
- [ ] No identical text to the same account within 24 h; each platform has its own cut.
- [ ] Paid/gifted/affiliate rows have `ad=yes`; AI label left on (`labels.ai` default true); coin rows reviewed.
- [ ] X link posts within budget (3 per 24 h cap, $0.20 each); weekly X cost known.
- [ ] A person approved every post; nothing scheduled more than 7 days out (24 h for anything coin- or launch-related).
- [ ] One host process runs `tick()` every 30 s; `post` events alert someone on `failed`, `partial` and "Posting late?".
- [ ] Kill switch tested; the team knows who can pull it.

## Pitfalls

- **Scheduling into the void.** Posts at 03:00 because "the agent can" get no early engagement and nobody to reply.
- **"EST" in the timezone column.** It is not DST-aware; between 25 Oct and 1 Nov 2026 London is only 4 h ahead of New
  York. Use IANA names and let the planner convert.
- **Auto-reposting missed posts.** Turning off the late check (or setting `lateAfterMin` to hours) lets a stale post land
  in the middle of something else. Re-approve instead.
- **Two schedulers.** Claudia Local open on a laptop and a server host both calling `tick()` on separate data dirs can
  each publish their own copy. One data dir, one host.
- **Same caption everywhere.** Cross-posting identical text and video gets less reach and trips duplicate blocks.
- **Approving a month ahead.** Trends, news and your own launches move; a cheerful scheduled post during a crisis is
  the classic self-own. Week-by-week approval keeps it fresh.
- **Chasing the "best time" over the content.** Slot changes move reach by percent; a better hook moves it by multiples.
- **Engagement bait to fill slots** ("like if you agree"). X's Original Content Rewards removes accounts after repeated
  bait, and every platform demotes it.

## Related skills

- [x-playbook](../x-playbook/SKILL.md), [tiktok-playbook](../tiktok-playbook/SKILL.md),
  [instagram-reels-playbook](../instagram-reels-playbook/SKILL.md), [youtube-shorts-playbook](../youtube-shorts-playbook/SKILL.md) — per-platform formats and signals.
- [telegram-and-discord-community](../telegram-and-discord-community/SKILL.md) — channel and server cadence.
- [launch-campaigns](../launch-campaigns/SKILL.md) — launch-week calendars.
- [trend-research](../trend-research/SKILL.md) — what goes in the reactive 20%.
- [growth-experiments](../growth-experiments/SKILL.md) — testing slot and cadence changes properly.
- [kpi-reporting](../kpi-reporting/SKILL.md) — weekly numbers.
- [batch-content-production](../../create/batch-content-production/SKILL.md) — making a week of content in one session.
- [social-publishing](../../build/social-publishing/SKILL.md) — connectors and the publish pipeline.
- [autonomous-posting-loop](../../build/autonomous-posting-loop/SKILL.md) — agents that draft on their own.
- [claudia-local-studio](../../build/claudia-local-studio/SKILL.md) — running the scheduler in Claudia Local.
