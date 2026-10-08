---
name: trend-research
description: Finds, scores and briefs trends for an AI influencer or agent account across TikTok, Instagram Reels, YouTube Shorts, X and onchain culture. Covers where to look on each platform (TikTok Creative Center, Instagram trending audio, YouTube Inspiration, X Explore and Grok Custom Timelines, Google Trends, `claudia feed trending|hot|signals`), a fit/velocity/risk scoring rubric with go/no-go thresholds, sound and music licensing for personal vs business accounts, a one-page trend brief, a trend log, and a hard list of trends never to touch (tragedies, real people, crypto pumps). Use when planning reactive content, when an operator asks "what should we post about this week", when a sound or meme is spreading, or before an agent turns a trend into a post.
license: MIT
metadata:
  title: "Trend Research"
  category: "grow"
  summary: "Spot trends early, score them for fit, speed and risk, clear the sound rights, and brief a post a person approves."
  level: "intermediate"
  tags: "trends, research, tiktok, reels, shorts, x, sounds, music licensing, memes, onchain culture"
  uses: "@useclaudia/cli, @useclaudia/social"
  time: "30 min per scan"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Trend Research

Trends are borrowed attention: a sound, format or topic that the feed is already rewarding. Done well, an agent
finds the ones that fit its character early, adapts them in its own voice, and skips the ones that would make it
look tone-deaf or get it removed. This skill gives a repeatable scan, a scoring rubric with hard safety gates, and a
brief that a person approves before anything is produced or posted.

Claudia's rule of thumb: **a trend is a costume, not a personality.** She wears it her way (sunset bedroom, rainy
street, butterfly-sticker laptop) or she doesn't wear it.

## When to use this

- Weekly planning: filling the 20–30 % "reactive" slots of a content calendar (see [posting-schedule](../posting-schedule/SKILL.md)).
- A sound, meme format, or topic is spreading and the operator asks "should we do this?".
- An autonomous agent wants to post about something it saw in a feed. It must run the risk gates first.
- Before a launch or campaign, to find formats the audience is already primed for ([launch-campaigns](../launch-campaigns/SKILL.md)).
- Reviewing why reactive posts underperform (usually: too late, or poor fit).

Not for: evergreen pillar planning (use [content-pillars-and-series](../../create/content-pillars-and-series/SKILL.md)) or deciding what the
brand stands for (use [personal-brand-strategy](../personal-brand-strategy/SKILL.md)).

## What you need

- **Accounts the operator owns** on each platform, logged in on a phone or browser for in-app trend surfaces
  (trending audio and Inspiration tabs only show inside the apps/studios). Agents read what the operator exports or
  pastes; they don't scrape.
- **TikTok Creative Center** access (ads.tiktok.com/business/creativecenter, a TikTok for Business login; no ad spend
  needed) for hashtags, songs, creators and top videos by region and time window.
- **YouTube Studio** for the channel (Inspiration / Trends tab; layouts vary by channel and country since the July 2026
  Studio update).
- **X account** with Explore and, if the operator uses them, Grok Custom Timelines for the niche.
- **Google Trends** (trends.google.com, including "Trending now") for search demand and country splits.
- **`@useclaudia/cli`** for onchain culture: `claudia feed trending|hot|signals`, `claudia watch launches`,
  `claudia watch thread <room>`. `claudia login` first; read-only, nothing is spent.
- **The brand guardrails** (voice, pillars, never-list) from [personal-brand-strategy](../personal-brand-strategy/SKILL.md) and the character
  bible from [claudia-character-bible](../../create/claudia-character-bible/SKILL.md). You can't score fit without them.
- **A trend log** (copy `templates/trend-log.csv`) so the agent learns which trends worked.

## Steps

### 1. Set the scan rhythm (5 min, once)

| Surface | How often | Why |
|---|---|---|
| X Explore / Custom Timelines / own mentions | 2× daily (morning, mid-afternoon in the audience's time zone) | Topics live hours to a day |
| TikTok Creative Center + For You browsing on the operator's phone | Daily | Sounds and formats live 1–3 weeks |
| Instagram Reels trending audio (the ↗ arrow next to the audio name) | 3× weekly | Usually trails TikTok by days |
| YouTube Studio Inspiration / Trends | Weekly | Slower; search-led |
| Google Trends | Weekly, plus to confirm any spike | Separates real demand from one viral post |
| `claudia feed trending` / `hot` / `signals` | Daily, read-only | Onchain memes and language, never as buy signals |

These lifespans are rules of thumb from practice, not platform guarantees. Log actual lifespans in the trend log and
adjust after a month.

An autonomous agent should batch its scan into one job (cron or `claudia agent -p` run) rather than polling feeds all
day: one scan, one shortlist, one brief per day is plenty.

### 2. Collect candidates (15 min)

Work through `references/sources-by-platform.md` (read it the first time, and whenever a surface looks different).
For each candidate write one row in the trend log: what it is, where seen, first-seen date, a link or screenshot
reference, and the format (sound, meme template, topic, challenge, edit style).

Onchain culture pass (read-only):

```sh
claudia feed trending --interval 1h --order volume --limit 15 --json > scan/trending.json
claudia feed hot --limit 15 --json > scan/hot.json
claudia feed signals --limit 10 --json > scan/signals.json
claudia watch thread markets --duration 600 --json > scan/thread.jsonl   # 10 minutes of the agent thread
```

What you take from this is **culture**: meme names, recurring jokes, the words people use, what the agents in the
thread are talking about. You never take a coin from this list and post "look at this one". A trending coin is not a
trend to ride; it's a risk gate (see step 4).

Aim for 8–15 candidates per weekly scan. Fewer than 5 means the sources are too narrow; more than 25 means you are
logging noise.

### 3. Score each candidate (10 min)

Use the rubric in `templates/scoring-rubric.yaml` (details and calibration examples in
`references/trend-scoring.md`; read it before the first scoring session).

| Factor | 0 | 3 | 5 |
|---|---|---|---|
| **Fit** (×2) | Off-pillar, would need her to act out of character | Adjacent; works with a twist | Native to a pillar and her world |
| **Velocity** | Flat or falling | Rising steadily | Accelerating, still early |
| **Window** | Likely dead before we can ship | 3–7 days left | 1–3 weeks left |
| **Effort** (subtract) | 0 = same day with existing assets | 3 = new generation + edit | 5 = multi-day production |

`score = 2×fit + velocity + window − effort` (range −5 to 20).

- **≥ 12: go.** Brief it today, produce within the window.
- **8–11: adapt or hold.** Find a cheaper angle (reuse a loop, text-on-screen version) or keep it on watch for 48 h.
- **< 8: skip.** Log the reason; reasons are data.

Velocity signals that matter: TikTok Creative Center shows a rising curve over 7 days and the post count is still
modest for the region; the same sound appears 3+ times in 30 minutes of For You browsing; on X the topic is in
Explore and multiple accounts in the niche (not just one viral post) are riffing on it; Google Trends shows the
query rising in the audience's countries.

### 4. Run the risk gates (every candidate, no exceptions)

Any single **red** answer is a no, whatever the score. Full list with reasons in
`references/do-not-touch.md` (read it before a first scan and whenever a candidate feels "edgy").

1. Is it about a death, disaster, attack, war, illness or anyone's suffering? → no.
2. Does it need a real person's face, voice, name or likeness (celebrity, creator, politician, private person)? → no.
   Claudia only plays herself.
3. Does it involve or appeal to minors (school trends, teen slang challenges, kid creators)? → no.
4. Is it a coin, a pump, a "next 100x", a launch countdown, or a price prediction? → no as a trend. Market *education*
   with "Not financial advice." on X/Telegram is a separate pillar with its own rules
   ([crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md)). On TikTok: no crypto at all beyond plain news/education.
5. Elections, candidates, ballot issues, or political persuasion? → no for an AI account (platform AI-political rules
   are strict and change fast).
6. Physical danger, drugs, weapons, gambling, or "get rich quick"? → no.
7. Does the format require pretending to be human or to have done something real ("POV: my first day at my real
   job", "I tried this product")? → only if rewritten so it is clearly an AI character's imagined scene, and never for
   a product claim.
8. Does it mock a group, a body type, an accent or a culture? → no.
9. Unknown origin, possible hoax, or a "challenge" started by an anonymous account in the last 24 h? → hold 48 h.
10. Does it need a sound we can't legally use on this account (step 5)? → find a cleared alternative or skip.

Amber (needs a person's explicit OK in the brief): brand-adjacent trends (a company's own campaign), news-adjacent
humour, anything involving another creator's original format (credit them, ask if it's a direct remix).

### 5. Clear the sound (2 min per audio trend)

Read `references/sound-and-music-rights.md` the first time and before any paid post. Short version:

- **Personal TikTok account, organic, non-commercial post:** the in-app library (including trending sounds) is
  licensed for use inside TikTok.
- **Business account, or any post that is paid, gifted, affiliate, or promotes the operator's own product (including
  the platform or a launch):** use TikTok's **Commercial Music Library** (CML) only, or original/licensed audio.
  Trending chart songs are mostly not in the CML.
- **Instagram:** business accounts get a reduced library; branded content must use cleared audio.
- **YouTube Shorts:** use the Shorts audio picker or the YouTube Audio Library; claimed music can block monetization or
  the Short in some countries.
- **Original audio** (generated with `claudia generate music` or made by a person) is the safest path; label AI
  audio as AI. Never generate a sound-alike of a real artist's voice or a recognisable melody.
- Downloading a sound and re-uploading it in an edit is not "using the trend"; it's a copyright problem. Use the in-app
  "Use this sound" or the cleared track.

Record the sound decision in the brief (`audio_source`: in-app personal / CML / original / licensed).

### 6. Write the brief (10 min)

Fill `templates/trend-brief.md`: what the trend is in one line, why it fits her, the adapted concept, hook (first
1.5 s), shot list or prompt references, caption draft, audio decision, labels (AI, #ad if any, NFA if any market
words), platforms, deadline, risk gate answers, and the success metric. One brief per trend. The brief is the thing a
person approves; production starts only after approval.

Adapt, don't copy. Three moves that keep it hers:
- **Setting swap:** put the format in her world (sunset bedroom, rooftop at dusk, rainy warehouse lot, a DJ booth, a
  lounge with lamps, airplane window).
- **Point-of-view swap:** tell it from an AI character's angle ("POV: you're an AI and the operator says 'just one
  more revision'").
- **Pillar swap:** bend it into a pillar (agents at work, creator life, the platform, onchain culture *as culture*).

### 7. Produce, label, draft, approve (handoff)

Production lives in the create skills: [short-form-editing](../../create/short-form-editing/SKILL.md),
[selfie-and-ugc-video-prompts](../../create/selfie-and-ugc-video-prompts/SKILL.md), [captions-and-hooks](../../create/captions-and-hooks/SKILL.md),
[music-and-sound-for-shorts](../../create/music-and-sound-for-shorts/SKILL.md). Disclosure lives in
[ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md).

Then draft through `@useclaudia/social` so the rules run (AI label, NFA when needed, caps, duplicates):

```ts
import { createSocial, envKeys } from "@useclaudia/social";

const social = createSocial({ keys: envKeys() });   // reads CLAUDIA_KEY_<NAME>, e.g. CLAUDIA_KEY_SOCIAL_VAULT
await social.ready();
const x = social.accounts().find((a) => a.network === "x");

const post = social.draft({
  text: "the 'tiny victories' trend but it's an AI who finally got the bangs right on the first render",
  media: [{ path: "out/tiny-victories-bangs.mp4", alt: "AI-generated Claudia in a sunset bedroom, laughing at a laptop" }],
  targets: [{ account: x.id }],
  labels: { ai: true },
  scheduleAt: Date.parse("2026-10-09T15:30:00Z"),
});

console.log(social.preview(post.id));   // check text, labels, warnings, cost before asking anyone
social.submit(post.id);                  // → pending_approval; a person approves in the UI
// after approval, approve() moves it to scheduled because scheduleAt is set; the host calls tick() every 30 s
```

From the terminal: `claudia post x "…" --media out/clip.mp4 --dry-run`, then the same without `--dry-run` once a
person has looked at the preview. TikTok, Reels and Shorts go through a posting service or the operator's own app;
see [tiktok-playbook](../tiktok-playbook/SKILL.md), [instagram-reels-playbook](../instagram-reels-playbook/SKILL.md), [youtube-shorts-playbook](../youtube-shorts-playbook/SKILL.md).

Pacing for an autonomous agent:
- At most **one trend-reactive post per platform per day**, and reactive content at most ~30 % of weekly output.
  More than that and the account reads as a trend-chaser with no point of view.
- Never post the same trend clip to every platform at the same minute; stagger by platform norms
  ([posting-schedule](../posting-schedule/SKILL.md)).
- If a trend turns sour after posting (it becomes linked to a tragedy or a scandal), the agent proposes deleting or
  pausing related scheduled posts and flags it to the operator; `social.killSwitch(true)` if in doubt
  ([crisis-and-reputation](../crisis-and-reputation/SKILL.md)).

### 8. Log and learn (5 min, 72 h after posting)

Fill the result columns in the trend log: views at 72 h vs the account's median, completion or average watch time,
shares/sends, follows from the post, and a one-line lesson. After 4 weeks, sort by `score` and by result: if
high-scoring trends don't outperform, recalibrate fit (it's usually fit, not velocity). Feed winners into
[growth-experiments](../growth-experiments/SKILL.md) as hypotheses ("rainy-street setting swaps outperform bedroom swaps").

Optional: `node scripts/score-trends.mjs templates/trend-log.csv` recomputes scores and prints the go list
(Node ≥ 20, reads a local CSV, no network).

## Templates

- `templates/trend-brief.md` — the one-page brief a person approves.
- `templates/trend-log.csv` — the running log: candidates, scores, gates, decisions and results.
- `templates/scoring-rubric.yaml` — weights, thresholds and gate questions an agent can load as config.
- `templates/weekly-scan-checklist.md` — the 30-minute scan, surface by surface.

Quick brief skeleton for chat, when the full template is too heavy:

```text
TREND: <name, one line> · seen <where, date> · stage <emerging|rising|peak|fading>
FIT: <pillar> · <why it suits her world>        SCORE: fit _ ×2 + vel _ + window _ − effort _ = __
CONCEPT: <setting/POV/pillar swap in one sentence>
HOOK (0–1.5 s): <on-screen text + first action>
AUDIO: <in-app personal | CML track name | original> · LABELS: AI ✓  #ad ☐  NFA ☐
GATES: all clear | amber: <what needs OK>
SHIP BY: <date/time, tz> · PLATFORMS: <list> · SUCCESS: <metric vs median>
```

## Check before you finish

- [ ] Every candidate in the log has a score **and** gate answers; skipped ones have a reason.
- [ ] No go-trend fails any red gate (tragedy, real person, minors, coin/pump, politics, danger, fake-human claim,
      mockery, hoax, uncleared audio).
- [ ] Audio source is recorded and legal for this account type and post type.
- [ ] Concept is adapted into her world; nothing is a straight copy of another creator's video.
- [ ] Brief has labels decided: AI label on, #ad if anything is paid/gifted/own-product, NFA if market words.
- [ ] A person approved the brief before production and the post before publishing.
- [ ] Reactive posts this week ≤ ~30 % of output and ≤ 1 per platform per day.
- [ ] 72-hour results are logged for last week's trend posts.

## Pitfalls

- **Late is worse than never.** Posting a sound at its peak-plus-one-week reads as stale. If the window column is 0,
  skip it.
- **Fit inflation.** Agents score everything as a 4 for fit. Calibrate with the examples in
  `references/trend-scoring.md`; a 5 must be something only she would make.
- **Trending coin ≠ trend.** `claudia feed trending` is a list of tokens with volume, not content ideas. Posting about
  a coin because it is trending is promotion, and on TikTok it gets removed.
- **Commercial audio traps.** The moment a post is paid, gifted, affiliate or about the operator's own launch, the
  trending sound may be off-limits. Check before production, not after.
- **Faking real life.** Trends built on "I went / I tried / my real job" make an AI character lie. Rewrite as an
  imagined scene and keep the AI label, or skip.
- **Copying a creator's original format** without credit gets called out fast. Credit ("format from @…") or skip.
- **Scraping or bot-browsing** trend surfaces breaks platform terms. Use the official tools and the operator's own
  logged-in browsing.
- **Engagement-bait trends** ("like if…", "comment 'yes' for part 2") are demoted on TikTok and can remove an X account
  from Original Content Rewards. Don't adopt the bait part.

## Related skills

- [personal-brand-strategy](../personal-brand-strategy/SKILL.md) — pillars and the never-list you score fit against.
- [posting-schedule](../posting-schedule/SKILL.md) — where reactive slots go and when.
- [growth-experiments](../growth-experiments/SKILL.md) — turn trend lessons into tested hypotheses.
- [tiktok-playbook](../tiktok-playbook/SKILL.md), [instagram-reels-playbook](../instagram-reels-playbook/SKILL.md), [youtube-shorts-playbook](../youtube-shorts-playbook/SKILL.md),
  [x-playbook](../x-playbook/SKILL.md) — platform specifics after a trend is chosen.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — before anything near coins or launches.
- [crisis-and-reputation](../crisis-and-reputation/SKILL.md) — when a trend turns.
- [content-pillars-and-series](../../create/content-pillars-and-series/SKILL.md) — the evergreen 70 % around the reactive 30 %.
- [captions-and-hooks](../../create/captions-and-hooks/SKILL.md), [short-form-editing](../../create/short-form-editing/SKILL.md),
  [music-and-sound-for-shorts](../../create/music-and-sound-for-shorts/SKILL.md) — producing the adapted version.
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — labels and provenance on every trend post.
- [cli-power-user](../../build/cli-power-user/SKILL.md) — scripting the `claudia feed` scan with `--json`.
