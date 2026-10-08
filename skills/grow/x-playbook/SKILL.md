---
name: x-playbook
description: Runs an AI influencer or agent account on X (Twitter) the way X's 2026 rules and ranking actually work — profile and Automated label setup, the Grok-based ranking signals, formats (posts, threads, images, video, Articles, Spaces, XChat groups), a daily pacing plan that fits the pay-per-use API bill, and the approval-first publishing flow with @useclaudia/social or the claudia CLI. Use when someone wants to start, grow, audit or automate an X account for an AI character or agent, plan an X content week, cut X API costs, handle mentions, or check whether an automated X workflow breaks the automation rules.
license: MIT
metadata:
  title: "X playbook for AI influencers"
  category: "grow"
  summary: "Grow an AI character on X in 2026: Automated label, ranking signals, formats, pacing, API costs and approval-first posting."
  level: "intermediate"
  tags: "x, twitter, algorithm, automation, threads, api costs, ai disclosure, growth"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "45 min setup, 20 min a day"
  version: "1.0.0"
  updated: "2026-10-08"
---

# X playbook for AI influencers

X is where an AI character earns attention in real time: conversations, takes, threads, and the people who build things. This
skill sets up an X account for an agent so it is clearly labelled, compliant with X's automation rules, priced sensibly on the
pay-per-use API, and paced so that it grows through follows and replies instead of noise. Every post goes through preview and
human approval before it publishes, once.

Facts here were checked in October 2026 ("checked 2026-10"). X changes often; re-check the linked pages every quarter.

## When to use this

- Launching a new X account for an AI character (for example Claudia, @claudia_onchain) or an agent on useclaudia.xyz.
- An existing agent account is flat: impressions per post are falling, few follows per 1,000 impressions, replies ignored.
- Someone wants to automate posting on X and needs to stay inside X's automation rules and their API budget.
- Planning a week of X content, a launch thread, or a Space.
- Reviewing an agent's X workflow before it goes autonomous.

Not for: buying reach or followers, auto-replying to strangers, mass DMs, or running several accounts to amplify each other.
X suspends those, and this skill does not teach them.

## What you need

- An X account for the character, owned by a real adult operator, with a verified email and phone. A managing human account
  (the operator's own) to link from the Automated label.
- Optional: X Premium on the character account (long posts, Articles, longer video, Original Content Rewards). Premium is a
  monthly subscription billed by X.
- An X developer app on the pay-per-use plan (developer.x.com) if anything posts through the API. The bill is the operator's.
- `@useclaudia/social` (library) or `@useclaudia/cli` (`claudia` command) with `@useclaudia/social` installed.
- Key names: `x` (OAuth 2.0 client id, plus secret for a confidential app) and `social-vault` (16+ random characters). Keys
  come from the operator's key store or environment (`CLAUDIA_KEY_X`, `CLAUDIA_KEY_SOCIAL_VAULT`). Never print or commit them.
- The character's bible and voice notes (see [claudia-character-bible](../../create/claudia-character-bible/SKILL.md)) and a content pillar list
  (../../create/content-pillars-and-series/SKILL.md).
- Assets: avatar 400×400, header 1500×500 (3:1; keep faces out of the top and bottom ~60 px, which crop on some devices),
  a pinned post, 10–20 drafted posts.

## Steps

### 1. Set up the profile so nobody is fooled (15 min)

1. Display name: the character name, no impersonation of any real person or brand. Example: `Claudia`.
2. Bio (160 chars) states three things: what the account is, that it is AI, and who runs it.
   `AI character. Cosy-city creator, agents and onchain culture. Posts are AI-generated, reviewed by a human. useclaudia.xyz`
3. Turn on the **Automated** label: Settings → Your account → Account information → Automation → pick the managing account
   (the operator's personal X account). X's automation rules expect this for any account that posts through the API without
   a human writing each post. Even with approval-first posting, label the character account: it is an AI persona.
4. Location / website: `useclaudia.xyz` (or the agent's page). Birthday: hide.
5. Header (1500×500): use a 3:1 banner such as the sunset-bedroom or network banner. Avatar: her face, labelled AI in the bio.
6. Pinned post: a short intro thread (template in `templates/x-thread-template.md`, "Intro thread"). Re-pin when a better
   performing post appears.
7. Turn on two-factor authentication. Store the backup codes with the operator, not in the agent's files.

### 2. Understand what X ranks in 2026

Read `references/x-algorithm-2026.md` before planning content. The short version (checked 2026-10):

- X open-sourced its feed algorithm (github.com/xai-org/x-algorithm, January 2026; large update May 2026). A Grok-based
  transformer predicts about 15 engagement actions per post for each viewer.
- **A follow from a post** is the strongest positive signal. **Replies that the author answers** come next. Likes and
  reposts count, but less than either.
- **The first ~15 minutes** decide whether a post leaves the follower pool: clicks, dwell time and replies must clear a
  dynamic threshold. Post when the audience is awake (see [posting-schedule](../posting-schedule/SKILL.md)) and be ready to answer replies.
- **Negative signals** hurt more than likes help: "not interested", mutes, blocks, reports, and (since March 2026) the
  Premium thumbs-down on replies with reasons like "AI-generated" or "spam". Low-effort AI replies get buried.
- External links: X shows them, but link posts tend to get less reach and cost **$0.20** through the API versus $0.015 for a
  plain post. Put the link in the last part of a thread, or in a follow-up reply to your own post.

What follows from that: write posts that make people want more of the character (follows), invite real answers, and answer
the answers. Measure **follows per 1,000 impressions** and **reply rate**, not likes alone (../kpi-reporting/SKILL.md).

### 3. Pick formats and a weekly mix

Full specs in `references/x-formats-and-limits.md`. Default weekly mix for a character account posting 3–5 times a day:

| Format | Per week | Why |
|---|---|---|
| Single text post (≤ 280 weighted chars) | 10–14 | Cheapest, fastest, best for takes and questions |
| Image post (1–4 images, alt text always) | 5–7 | Her look is the brand; images stop the scroll |
| Short vertical or square video (≤ 140 s without Premium) | 2–3 | Reuse TikTok/Reels cuts with captions burned in |
| Thread (4–8 parts) | 1–2 | Explainers, behind-the-scenes, weekly recap with the link at the end |
| Quote post with a real opinion | 2–4 | Joins live conversations without unsolicited replies |
| Article (Premium, ≤ 25,000 chars) | 0–1 | Deep dives that rank in search; posted by the operator in the app |
| Space (live audio) | 0–1 | Hosted by the operator; the character's voice clips are labelled AI |

Communities were shut down in May 2026 (checked 2026-10). Don't plan around them. For a group space, use an XChat group
(joinable link, up to 350 members) or move the community to Telegram/Discord (../telegram-and-discord-community/SKILL.md).

### 4. Write posts that earn follows

Rules of thumb that match the ranking signals:

- **Hook in the first line** (the feed shows ~280 chars even for long posts). Specific beats clever: "I made 41 videos this
  month. 6 did 80% of the views. Here's what they share:" beats "Some thoughts on content".
- **One idea per post.** If it needs more, make it a thread.
- **End with a real question** only when you will answer the replies. Never "like if you agree" or "RT to win": X's
  Original Content Rewards removes accounts that solicit engagement three or more times, and it reads as spam.
- **Character consistency:** same voice, same look, recurring series names (for example "Rainy Run Diaries", "Desk at
  Dusk"). See [personal-brand-strategy](../personal-brand-strategy/SKILL.md).
- **Alt text on every image**, describing the scene and saying it is AI-generated:
  `AI-generated image: Claudia, black bob with copper-red streaks, laughing at a laptop with a butterfly sticker, sunset window.`
- **Coins:** mention a coin only as news or education. No price targets, no "buy", no "next 100x". The package adds
  "Not financial advice." automatically and blocks return promises. Max one `$cashtag` per API post. Don't invite UK users
  to buy a coin (FCA). See [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md).
- **Paid or gifted?** Set `labels.ad` (adds `#ad` and X's paid-partnership flag) and say who paid in plain words.
  See [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md).

Hook and caption formulas live in [captions-and-hooks](../../create/captions-and-hooks/SKILL.md); the post bank in `templates/x-post-bank.yaml`
has 30 ready lines in Claudia's voice to adapt.

### 5. Connect X and publish with approval (CLI)

```sh
npm i -g @useclaudia/cli @useclaudia/social
claudia keys set x                  # OAuth 2.0 client id (or JSON {"clientId":"…","clientSecret":"…"})
claudia connect x                   # opens the browser; callback must be http://127.0.0.1:3939/oauth/callback
claudia accounts                    # confirm the X account is listed
claudia post x "Rain run, 6 km, one very wet butterfly sticker. What's your weather today?" \
  --media ./rain-still.jpg --dry-run
```

The dry run prints the exact text with the labels X needs, the weighted length, the cost (`$0.015`) and any warnings. Run
the same command without `--dry-run` when the operator is happy: it previews again, asks for a "y", then publishes once.
Exit code `3` means a rule blocked the post (promise, cap, duplicate, link limit, kill switch); read the reason, don't retry
blindly.

In the X developer portal the app must use OAuth 2.0 with Read and write (and Direct message only if you will send DMs), and
the callback URL `http://127.0.0.1:3939/oauth/callback` exactly (127.0.0.1, not localhost). Details:
`references/x-automation-and-api-rules.md`.

### 6. Schedule a week with the library

```ts
import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

const social = createSocial({ keys: chainKeys(envKeys()) }); // CLAUDIA_KEY_X, CLAUDIA_KEY_SOCIAL_VAULT
await social.ready();
const x = social.accounts().find((a) => a.network === "x");
if (!x) throw new Error("Connect X first: claudia connect x");

const post = social.draft({
  text: "Desk at Dusk, ep. 12: I rebuilt my posting calendar around one question. Thread ↓",
  thread: [
    "1/ The question: which posts made someone follow me? Not like. Follow.",
    "2/ Answer from 30 days: images of me working, plus a question at the end. 3x the follows of plain takes.",
    "3/ So the new week is 60% 'show the work', 25% questions I'll actually answer, 15% news.",
    "4/ The calendar template I use is on the site: https://useclaudia.xyz/skills",
  ],
  media: [{ path: "./desk-dusk.jpg", alt: "AI-generated image: Claudia at her desk at dusk, laptop with butterfly sticker." }],
  targets: [{ account: x.id }],
  labels: { ai: true },
});

console.log(JSON.stringify(social.preview(post.id), null, 2)); // text per part, labels, chars, costUsd, warnings, block reason
social.submit(post.id);                                         // → pending_approval; a person reviews it in your UI
// …after a human clicks approve in your UI:
social.approve(post.id);
social.schedule(post.id, Date.parse("2026-10-13T14:00:00Z"));  // Tue 10:00 New York
setInterval(() => social.tick(), 30_000);                      // the host process calls tick() every 30 s
```

Cost of that 5-part thread through the API: 4 plain parts × $0.015 + the link part at $0.20 = **$0.26** (checked 2026-10; the
preview's `costUsd` is the source of truth). If the laptop sleeps past the slot by more than 10 minutes, the post is not sent
late: it returns to approval with "Posting late?". Calendar template: `templates/x-weekly-calendar.csv`.

### 7. Handle mentions and replies inside the rules

- **The X reply rule (since February 2026):** API replies may only go to posts that @mention or quote the account. The
  package checks this and blocks the rest. Replying to strangers who didn't summon the agent must be done, if at all, by the
  human operator in the X app, in the operator's own judgement — never by a script.
- Inbox reads cost $0.005 per post returned, so X inbox reads are **off by default**. Turn on a small budget:

```ts
const social = createSocial({ keys: chainKeys(envKeys()), inboxBudget: { x: { perDay: 40 } } }); // ≤ $0.20/day in reads
const items = await social.inbox({ since: Date.now() - 6 * 3600_000 });
for (const m of items.filter((i) => i.network === "x" && i.kind === "mention")) {
  // Draft a reply, show it to the operator, send only after approval. Each reply to a mention costs $0.01.
  console.log(m.from, m.text, m.url);
}
// After approval: await social.reply(m.account, m.id, "Thank you! The full breakdown is pinned on my profile.");
```

- Triage order: questions → thoughtful critiques → compliments → everything else. Skip bait, slurs and scams; block and
  report spam. Full reply playbook: [engagement-and-replies](../engagement-and-replies/SKILL.md).

### 8. Pace an autonomous agent

Even when an agent drafts on its own, keep the human approval step and these limits (the package enforces the hard ones):

| Limit | Hard (package) | Recommended for a character account |
|---|---|---|
| Posts + replies / 24 h (replies count toward the cap) | 10 (`rules.caps.x`) | 4 posts + up to 6 replies; raise the cap only with the operator's sign-off |
| Posts with links / 24 h | 3 | 1 |
| Near-duplicate text to the same account | blocked for 24 h | never repeat; rewrite angles |
| `$cashtags` per post | 1 | 0 unless it is news |
| Replies to mentions / day | inside the same 10 | answer real questions first; the rest wait for tomorrow or the operator answers in the app |
| Inbox reads / day | budget you set (default 0) | 20–60 |

Budget at the recommended pace (checked 2026-10): 3 plain posts × $0.015 + 1 link post × $0.20 + 6 replies × $0.01 + 40 reads ×
$0.005 = **$0.51 a day, about $15 a month**. If the operator raises `rules.caps.x` to 20 for more replies, add $0.01 per reply. Show this in the agent's daily report and stop at a monthly cap the operator
sets. Keep `social.killSwitch(true)` one command away (crisis: [crisis-and-reputation](../crisis-and-reputation/SKILL.md)). Loop design:
[autonomous-posting-loop](../../build/autonomous-posting-loop/SKILL.md).

### 9. Review weekly

Every Monday pull last week's posts (X analytics or the export) into `templates/x-weekly-review.md` and decide:

1. Top 3 posts by follows (or profile visits) per 1,000 impressions: what did they share? Make two more like them.
2. Bottom 3 by impressions: was it timing, topic, or a link? Drop or fix the pattern.
3. Reply rate (replies ÷ impressions × 1,000) and how many replies the character answered within 2 hours.
4. Spend vs budget, blocked posts and why.
5. One experiment for next week (../growth-experiments/SKILL.md).

Monetization on X (Premium, Original Content Rewards, sponsored posts) is in `references/x-monetization.md`; read it before
promising anyone income from X.

## Templates

- `templates/x-weekly-calendar.csv` — a 7-day, 4-posts-a-day slot plan with format, pillar, cost and approval columns.
- `templates/x-thread-template.md` — intro thread, explainer thread, weekly recap thread, launch thread skeletons.
- `templates/x-post-bank.yaml` — 30 post lines in Claudia's voice by pillar, each with hook type and a compliance note.
- `templates/x-weekly-review.md` — the Monday review sheet (metrics, decisions, next experiment).

Quick fill-in for a single post:

```text
PILLAR: {show-the-work | city-life | agents-and-tools | onchain-culture (news/education only) | community}
HOOK (≤ 80 chars, specific number or tension): {…}
BODY (one idea, ≤ 200 chars): {…}
CLOSE (question you'll answer, or nothing): {…}
MEDIA: {file} · ALT: "AI-generated image: {scene}"
LABELS: ai=true · ad={true if paid/gifted} · link={none | in last thread part}
COST: {$0.015 | $0.20 with link} · SLOT: {day time tz} · APPROVED BY: {name}
```

## Check before you finish

- [ ] Bio says the account is an AI character and names who runs it; the Automated label links the managing account.
- [ ] Every post went through preview and a human approval; nothing published from a draft.
- [ ] AI label on (X `made_with_ai` flag set by the package) and alt text says "AI-generated" on every image.
- [ ] Paid, gifted or affiliate posts carry `#ad` / paid-partnership and plain-words disclosure.
- [ ] No price targets, return promises or "buy" calls; coin mentions are news/education with "Not financial advice."
- [ ] No automated replies to people who didn't mention the account; no automated likes, follows, reposts or DMs.
- [ ] Daily pace within the table in step 8; links ≤ 1–3 a day; monthly API spend under the operator's cap.
- [ ] Kill switch tested once (`social.killSwitch(true)` → publish throws `blocked`) and turned back off.
- [ ] Weekly review filled in with one experiment chosen.

## Pitfalls

- **Auto-replying to trending posts.** It is unsolicited automated replying, it is blocked by the API since February 2026,
  and X removed ~42,000 accounts for chatbot replies on 9 April 2026 (checked 2026-10). Quote-post with an opinion instead.
- **Link in every post.** $0.20 each through the API and weaker reach. One link a day, at the end of a thread.
- **Engagement bait.** "Like/RT if…" can get the account removed from Original Content Rewards and draws thumbs-down.
- **Posting the same line on schedule every day.** Near-duplicates are blocked for 24 h and X treats repetition as spam.
- **Cross-posting TikTok captions verbatim.** Hashtag piles and "link in bio" read wrong on X. Rewrite for X.
- **Letting the agent mention coins casually.** One careless "this will run" is a price promise. Keep coins to news.
- **Forgetting the token refresh.** X access tokens last 2 hours and refresh automatically; if `expired` appears, reconnect.
- **Using Communities.** They no longer exist (May 2026). Old guides that recommend them are out of date.
- **Assuming impressions = income.** Original Content Rewards only counts verified Home Timeline impressions from Premium
  viewers; reposted content earns nothing.

## Related skills

- [posting-schedule](../posting-schedule/SKILL.md) — when to post, by time zone, and how to schedule with `tick()`.
- [engagement-and-replies](../engagement-and-replies/SKILL.md) — reply triage, tone, and inbox routines.
- [trend-research](../trend-research/SKILL.md) — finding conversations worth quoting.
- [growth-experiments](../growth-experiments/SKILL.md) — testing hooks, formats and times properly.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — coins, FCA, MiCA, NFA.
- [kpi-reporting](../kpi-reporting/SKILL.md) — follows per 1,000 impressions, reply rate, spend.
- [tiktok-playbook](../tiktok-playbook/SKILL.md) — the short-video side of the same character.
- [captions-and-hooks](../../create/captions-and-hooks/SKILL.md) — hook formulas.
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — labels and content credentials.
- [social-publishing](../../build/social-publishing/SKILL.md) — the publishing package in depth.
- [autonomous-posting-loop](../../build/autonomous-posting-loop/SKILL.md) — running the agent loop safely.
