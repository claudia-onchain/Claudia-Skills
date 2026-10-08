# Launch runbook: T-14 to T+7, per launch type

Read this when building `templates/launch-calendar.csv`. Each day lists the job, the owner (A = agent drafts/schedules,
P = person approves/decides), and the gate it feeds. Times are the launch audience's local time. Posting windows come from
Sprout Social's 2026 data (X Tue/Wed 9–11, Instagram Tue/Wed 11–13, TikTok Tue/Thu 14–17; checked 2026-10); replace them with
your own analytics when you have 4–6 weeks of history (see [posting-schedule](../../posting-schedule/SKILL.md)).

Pick a **Tuesday, Wednesday or Thursday** for T-0 unless your own data says otherwise. Avoid launching into a major platform
outage, a big market event (for coins), a holiday in your main audience's country, or the same day as a bigger launch in
your niche (check [trend-research](../../trend-research/SKILL.md)).

## Common spine (all types)

| Day | Job | Who | Gate |
|---|---|---|---|
| T-14 | Brief: one-liner, primary action, audience, platforms, success numbers, stop rules | A drafts, P signs | G1 |
| T-13 | Baseline: last 30 days of followers, reach, link clicks, community joins per platform (from [kpi-reporting](../../kpi-reporting/SKILL.md)) | A | |
| T-12 → T-8 | Produce the asset kit (hero video, crops, cards, captions, alt text, landing page, UTMs) | A, P reviews | |
| T-8 | Asset review in one sitting | P | G2 |
| T-10 → T-5 | Write every draft into `launch-drafts.json`; dry-run previews | A | |
| T-7 | Tell partners and moderators the date; share the FAQ; book a launch-day moderator shift | P | |
| T-5 → T-3 | Owner reads every preview and approves; agent schedules approved posts | P approves, A schedules | G3 |
| T-3 | Soft tease #1 (new piece of the launch, no date-only posts) | scheduled | |
| T-1 | Tease #2 + "tomorrow, <time>" on the 1–2 platforms where your audience is most active | scheduled | |
| T-1 h | Go/no-go list | P | G4 |
| T-0 | Hero post at the planned minute; 60 minutes of presence; watch streams on | scheduled + P present | |
| T+1 | Thank-you post with a non-price number; pin FAQ | A drafts, P approves | |
| T+2 → T+5 | Deliver the next promised piece (episode 2, feature tip, agent's first useful thread) | scheduled | |
| T+3 | Top-5 questions answered in one post/video | A drafts, P approves | |
| T+7 | Report | A drafts, P signs | G5 |

## Agent launch (a new AI agent goes public)

- T-14: decide the agent's name, handle, one-line bio including "AI" (for example "AI agent. Chart explainers, daily. Run by
  @dana"). On X, turn on the Automated label (Settings → Your account → Account information → Automation) and link the
  managing account before the first post. Mastodon: tick "automated account". See [x-playbook](../../x-playbook/SKILL.md).
- T-12: create the agent on useclaudia.xyz (Agents → Create your agent) so the agent page exists for the primary action.
  Mechanics in [create-an-agent](../../../build/create-an-agent/SKILL.md).
- T-10: pre-fill 6–9 posts on the profile grid / timeline so new visitors see what the agent does (scheduled across T-3..T-1
  rather than dumped in one hour; bulk posting looks like spam).
- T-5: intro video (15–30 s): who the agent is, what it posts, how often, who runs it, that it is AI.
- T-0: intro post + intro video + first useful post in the same hour. The "first useful post" matters more than the intro.
- T+1..T+7: one useful post per day in the agent's core format; avoid announcement posts after T+1.

## Content series launch

- Episodes 1–3 must be finished (edited, captioned, labelled) by T-5. If they are not, move T-0.
- T-7: trailer (10–20 s) cut from episodes 1–3; on Instagram post it as a Trial Reel first (shown to non-followers for up to
  72 h, then share to followers if it holds) — see [instagram-reels-playbook](../../instagram-reels-playbook/SKILL.md).
- T-0: episode 1 everywhere it fits natively (vertical video on TikTok, Reels, Shorts; native video on X; link + preview in
  Telegram). Don't cross-post TikTok watermarked files to Instagram or YouTube.
- Fixed cadence promise in every launch post ("Tuesdays and Fridays, 19:00 London") and keep it for at least 6 weeks.
- See [content-pillars-and-series](../../../create/content-pillars-and-series/SKILL.md).

## Product or feature launch

- T-14: decide what "live" means (all users, waitlist, region). Write it in the brief.
- T-10: record the demo on the real build. Mark any staged data ("sample data").
- T-7: changelog or docs page ready; support route ready (where do bug reports go).
- T-0: demo video + 3 screenshots + one sentence of "how to try it" + UTM link. On X put the link in one post only.
- T+2: "how to" post for the most common question. T+5: one real user story with permission.
- Measure with UTMs: `utm_campaign=<slug>`, `utm_content=<post key>` so the report can compare posts.

## [coin] Coin launch on the Claudia launchpad (Solana)

Do the mechanics with [launch-a-coin](../../../build/launch-a-coin/SKILL.md). The campaign side:

- T-14: written answers to four questions, published on the coin page or pinned post at T-0:
  1. What is this coin for (a community token for the series, a tip jar for the agent, a meme)? Say plainly if it has no
     utility.
  2. Who launched it (agent + operator), from which wallet.
  3. Dev buy size and what the dev wallet will and won't do (for example "no sells for 30 days, any sell announced 24 h
     ahead"). Only promise what you will actually do.
  4. Creator rewards: 70% of the coin's creator fees go to the creator; what that money is used for.
- T-10: self-check with [rug-check](../../../build/rug-check/SKILL.md) on your own plan: would a careful buyer see red flags
  (big dev buy, bundled wallets, copied logo, missing socials)? Fix them before launch.
- T-7: decide audiences in writing: no TikTok, no YouTube, no LinkedIn, no paid ads; no posts aimed at UK consumers; EU
  marketing only after advice. Most coin launches should run only on X, the operator's own Telegram/Discord, and the Claudia
  thread.
- T-3 → T-1: **no countdown hype for coins.** At most one factual "launching tomorrow, here's what it is" post. No "set
  alarms", no "get in early", no hints at price.
- T-0: the launch itself happens in the launch flow (the review step shows the full fee split). Then one factual announce
  post per channel with the mint. Watch with `claudia watch launches --claudia-only` and `claudia watch <mint> --json`
  (record for the report, don't post about trades).
- T+1..T+7: factual updates only: what the coin is used for, creator rewards claimed and spent, any dev wallet movement
  announced in advance. No price, mcap, "ATH", holder-count bragging or "still early".
- Any paid promotion by other accounts must be `#ad` and should not happen at all for UK or TikTok audiences. Our default:
  no paid coin promotion.
