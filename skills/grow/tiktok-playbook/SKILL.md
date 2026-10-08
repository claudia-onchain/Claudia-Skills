---
name: tiktok-playbook
description: Grows an AI influencer or agent on TikTok within TikTok's 2026 rules — account setup, the AI-generated content (AIGC) label, TikTok's strict ban on crypto and financial promotion, watch-time and search signals, hooks and series formats, a sustainable posting cadence, Creator Rewards and LIVE eligibility, and an approval-first upload flow through @useclaudia/social (direct app or a posting service) or the claudia CLI. Use when someone wants to start or grow a TikTok account for an AI character, plan TikTok videos or a series, check whether a TikTok post about crypto, coins or money is allowed, schedule TikTok uploads, or understand why reach dropped.
license: MIT
metadata:
  title: "TikTok playbook for AI influencers"
  category: "grow"
  summary: "Grow an AI character on TikTok in 2026: AIGC labels, the crypto ban, watch-time and search signals, series, cadence and safe uploads."
  level: "intermediate"
  tags: "tiktok, short video, aigc label, algorithm, search, crypto policy, creator rewards, growth"
  uses: "@useclaudia/social, @useclaudia/cli, @useclaudia/media"
  time: "40 min setup, 30–60 min per video"
  version: "1.0.0"
  updated: "2026-10-08"
---

# TikTok playbook for AI influencers

TikTok rewards videos people finish, rewatch and send to friends, and it is the strictest major platform about two things
an AI character touches every day: synthetic media and money. This skill sets up a TikTok account for an AI character so
every video is labelled, nothing promotes crypto or financial products, and the content is built around the signals TikTok
actually ranks. Uploads go through preview and a human approval, once.

Facts checked October 2026 ("checked 2026-10"). TikTok updates its Community Guidelines often; re-read the linked pages
before any campaign.

## When to use this

- Starting a TikTok for an AI character (for example Claudia) or an agent on useclaudia.xyz.
- Planning a TikTok series, a month of videos, or turning existing vertical clips into TikToks.
- Checking whether a TikTok about coins, launches, trading, wallets or "making money" is allowed (usually: not as promotion).
- Reach dropped suddenly, a video was marked "ineligible for For You", or a video was removed.
- Setting up scheduled TikTok uploads with approval.

Not for: buying views or followers, follow-for-follow, comment pods, reposting other creators' videos, or making a second
account after a ban. TikTok removes those and this skill does not teach them.

## What you need

- A TikTok account owned by an adult operator (18+), with the character's name and a bio that says it's AI.
- Personal account if the operator wants Creator Rewards later (it requires a personal account); Business account if the
  priority is commercial music and ads tools. Decide before you grow; read `references/tiktok-monetization-and-live.md`.
- Vertical video: 1080×1920, 9:16, H.264 MP4. Source clips from [video-prompting](../../create/video-prompting/SKILL.md) and
  [selfie-and-ugc-video-prompts](../../create/selfie-and-ugc-video-prompts/SKILL.md), edited per [short-form-editing](../../create/short-form-editing/SKILL.md).
- One of these publishing paths (details in `references/tiktok-specs-and-posting-api.md`):
  1. **Posting service** (Zernio or Buffer) connected to TikTok, with its API key under `zernio` / `buffer`. Easiest path to
     public posts.
  2. **Own TikTok app** (developers.tiktok.com, Login Kit + Content Posting API, Desktop, callback
     `http://127.0.0.1:3939/oauth/callback`), key `tiktok`. Until TikTok audits the app, posts are private (SELF_ONLY).
  3. **Manual**: the agent prepares the file, caption and checklist; the operator uploads in the TikTok app.
- `@useclaudia/social` + `@useclaudia/cli`, and a `social-vault` key. Keys from the operator's store; never printed or committed.

## Steps

### 1. Set up the account (15 min)

1. Username close to the character's other handles (Claudia: X is @claudia_onchain; on TikTok use the same if available to
   register, otherwise a close variant). No real person's name or likeness.
2. Bio (80 chars): `AI character · cosy-city creator · made with AI, run by a small team`. Link: the character page.
3. Profile photo: her face. Turn on two-factor authentication.
4. Settings → Privacy: keep the account public (required for For You and Creator Rewards). Comments: filter keywords
   ("dm me", "whatsapp", "telegram me", "giveaway", "seed phrase", "airdrop") to catch scam replies.
5. Post one intro video that says, out loud or on screen in the first 3 seconds: "I'm Claudia, an AI character."

### 2. Label every video as AI-generated

TikTok requires the **AI-generated content** label on content with realistic AI people or scenes; an AI character's videos
always qualify. Read `references/tiktok-ai-label-and-crypto-rules.md` for the full policy.

- In the app: before posting → More options → "AI-generated content" toggle on.
- Through the API: the Claudia package sets `is_aigc` automatically (`labels.ai` defaults to true). Don't turn it off.
- TikTok also auto-labels files carrying C2PA Content Credentials and its own invisible watermark. Keep Content Credentials
  from your generator (../../create/ai-disclosure-and-provenance/SKILL.md); don't strip metadata to dodge the label.
- Unlabelled realistic AI can be removed or made ineligible for For You. Captions or scripts written with AI don't need the
  label on their own, but the character's face does.
- Say it in the content too: a recurring on-screen tag ("AI character") in the corner of every video works and doesn't hurt
  retention.

### 3. Treat money and crypto as off-limits for promotion

This is the step that gets AI-in-crypto accounts removed. TikTok's branded content policy prohibits promoting financial
products and services, crypto included, and its Community Guidelines don't allow promoting high-risk financial products or
"get rich quick" schemes, even in organic posts (checked 2026-10).

| Not allowed on TikTok | Allowed (education, news, culture) |
|---|---|
| Tickers or coin names as a recommendation, "$CLAUDIA is up" | "What is a creator fee on a token launch?" with no coin named |
| "Buy", "ape", "get in early", "link in bio to launch" | Scam awareness: "real support never DMs you first" |
| Returns, price targets, "I made $X" | Her day as a creator, how she makes videos |
| Wallet addresses, contract addresses, QR codes to buy | Plain-words news ("a big exchange changed its rules") without a call to act |
| Paid or gifted promotion of exchanges, wallets, trading apps, launchpads | Safety: seed phrases, phishing, rug-check basics in general terms |
| Disclosing a token promo as "branded content" (still banned) | Platform features that aren't financial (making videos, agents) |

Default rule for an agent: **on TikTok, Claudia never names a coin, never links to a launch, and never mentions earnings.**
The useclaudia.xyz launchpad (where 70% of creator fees go to the creator) is promoted on X and owned channels, not TikTok.
The package adds "Not financial advice." when coin words appear, but on TikTok the right fix is to remove the coin talk.
Wider rules (FCA, MiCA, FTC): [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md).

### 4. Build videos around the signals TikTok ranks

Details and numbers in `references/tiktok-algorithm-and-search.md`. The short version (checked 2026-10):

- **Watch time and completion** carry the most weight, then **rewatches, shares (sends), saves and comments**. A 12 s
  video watched to the end beats a 60 s video abandoned at 5 s; a 60 s video held at 80% beats both.
- **The first hour** of engagement velocity decides the next round of distribution.
- **Search** is a second discovery engine: TikTok reads the caption, on-screen text and spoken words. Put the phrase people
  search ("aesthetic rainy day routine", "how to make AI videos consistent") in all three.
- **For You ineligibility**: unoriginal reposts, undisclosed ads, engagement tricks ("like if…", "follow for part 2" as bait),
  and unlabelled AI.

The 3-part structure that holds attention:

1. **Hook, 0–2 s.** Motion in the first frame, a line of on-screen text that promises something specific, no logo intro.
   `POV: an AI character tries to go for a run in a storm` · `I tested 4 lighting setups on my own face`.
2. **Payoff, 2–20 s.** Deliver the promise fast; a cut every 1.5–3 s; captions on screen (most watch with sound on, but
   text drives retention and search).
3. **Loop or close, last 1–2 s.** End on a frame that flows back into the first (rewatches), or a question that invites a
   comment you will answer. No "follow for more" outros.

Keep text inside the safe zone: away from the bottom ~20% (caption and buttons) and right ~15% (icons).

### 5. Pick series, not one-offs

Series make people follow for the next episode. Two to three recurring series per character; each has a name, a fixed
opening shot and a search phrase. Claudia's:

| Series | Format | Length | Search phrase | Cadence |
|---|---|---|---|---|
| Rainy Run Diaries | selfie run in the rain, voice line + captions | 10–15 s | "rainy day run aesthetic" | 2/week |
| Desk at Dusk | making-of: prompts, edits, before/after | 30–75 s | "how to make AI videos" | 2/week |
| City After Dark | club, lounge, rooftop moods with a trending sound | 7–12 s | "night city aesthetic" | 2/week |
| Ask Claudia | answers a comment with a reply video | 20–45 s | the question itself | 1–2/week |

Series planning: [content-pillars-and-series](../../create/content-pillars-and-series/SKILL.md). Storyboards: [storyboarding-shorts](../../create/storyboarding-shorts/SKILL.md).
Sound: [music-and-sound-for-shorts](../../create/music-and-sound-for-shorts/SKILL.md) (use TikTok's Commercial Music Library on Business accounts;
trending sounds on personal accounts are licensed for personal, non-commercial use — not for paid posts).

### 6. Write captions for search, not for hashtags

- First 100 characters show in the feed: lead with the search phrase plus a hook.
- 3–5 specific hashtags beat 15 broad ones: `#aicharacter #rainyday #runningvlog`, not `#fyp #viral #foryou`.
- Always include one disclosure tag or words: `#aigenerated` or "made with AI".
- Paid partnership: turn on the content disclosure toggle (the package sets `brand_organic_toggle` via `labels.ad`) and write
  `#ad` in the caption. Never for financial products (step 3).
- Caption limits: 4,000 chars in the app, 2,200 through the API (checked 2026-10).

Caption bank: `templates/tiktok-caption-bank.yaml`.

### 7. Upload with approval

CLI preview first:

```sh
claudia connect zernio            # or: claudia connect tiktok (own app, private until audited)
claudia accounts                  # find the TikTok channel
claudia post tiktok "POV: an AI character tries to run in a storm 🌧 rainy day run aesthetic #aicharacter #rainyday #aigenerated" \
  --media ./rain-ep4.mp4 --dry-run
```

The dry run shows the caption with labels, the length against 2,200, the AI flag, the request it would send, and the cost
(none per post on TikTok; the service bills its own plan). Run without `--dry-run` to be asked, then publish once.

Library, scheduled:

```ts
import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

const social = createSocial({ keys: chainKeys(envKeys()) }); // CLAUDIA_KEY_ZERNIO or CLAUDIA_KEY_TIKTOK, CLAUDIA_KEY_SOCIAL_VAULT
await social.ready();
const tt = social.accounts().find((a) => a.network === "tiktok"); // direct app, or a TikTok channel via a service

const post = social.draft({
  text: "POV: an AI character tries to run in a storm. Rainy Run Diaries ep. 4 · rainy day run aesthetic #aicharacter #rainyday #aigenerated",
  media: [{ path: "./rain-ep4.mp4" }],
  targets: [{ account: tt.id }],
  labels: { ai: true },                                       // is_aigc on TikTok
  options: {
    tiktok: { privacyLevel: "PUBLIC_TO_EVERYONE", allowComment: true, allowDuet: false, allowStitch: true },
    zernio: { privacyLevel: "PUBLIC_TO_EVERYONE" },           // services default to SELF_ONLY unless set
  },
});

console.log(JSON.stringify(social.preview(post.id), null, 2)); // caption, labels, warnings, block reason
social.submit(post.id);                                          // a person watches the file and approves in your UI
// after approval:
social.approve(post.id);
social.schedule(post.id, Date.parse("2026-10-14T19:00:00Z"));   // Tue 15:00 New York
setInterval(() => social.tick(), 30_000);
```

If the own-app path is still unaudited, the post lands as private: the operator opens TikTok, checks it, and changes "Who
can watch" to Everyone, or posts the file in the app directly. Photo carousels can't be posted through the package (they
need a verified domain); post those in the app. Approval shows the actual video file, not only the caption.

### 8. Pace yourself

| Limit | Hard (package) | Recommended |
|---|---|---|
| Videos per account per 24 h | 5 | 1–2, at least 4 h apart |
| Same caption to the same account | blocked 24 h | never; one caption per video |
| Re-uploading the same clip | — | never; TikTok marks duplicates unoriginal |
| Comment replies | approval each | answer the first 20–30 comments in the first hour |
| LIVE | — | operator only, see below |

A new account: one video a day for 30 days, two a day from day 31 if quality holds. Production budget per video: script
10 min, generation 15–30 min, edit 15 min, review 5 min. Batch on two days a week (../../create/batch-content-production/SKILL.md).
Schedule slots from [posting-schedule](../posting-schedule/SKILL.md) (Sprout Social 2026: Tue/Thu 14:00–17:00 local; TikTok also peaks in the
evening). Replace with TikTok Studio data after 4–6 weeks.

### 9. Comments and replies

- TikTok has no inbox in the package; the operator reads comments in TikTok Studio. Approve reply text before posting it.
- Reply-with-video ("Ask Claudia") turns good comments into content and is the best way to answer.
- Delete and filter scam comments (fake support, "DM me to recover your wallet", impersonators). Pin a comment: "I'm an AI
  character. I never DM first or ask for money."
- Never reply to coin or price questions with an opinion: "I don't talk coins on TikTok — I'm an AI character, not an
  adviser." Playbook: [engagement-and-replies](../engagement-and-replies/SKILL.md).

### 10. LIVE and monetization (read before promising anything)

- LIVE needs 18+ and usually ~1,000 followers. TikTok wants real-time interaction; in TikTok Shop LIVEs (US, from 22 June 2026)
  AI voices, recorded audio and still frames are banned, and virtual characters may not cover more than half the screen.
  Don't stream Claudia as a fake-live loop. Fit: the operator goes live as themselves ("how we make Claudia"), with
  Claudia's clips shown and labelled.
- Creator Rewards: 10k followers, 100k views in 30 days, personal account, 18+, eligible country, original videos ≥ 1 minute.
  2026 reports say fully AI-generated videos and virtual-influencer accounts aren't eligible; check the in-app terms and
  plan income elsewhere (../monetization-streams/SKILL.md). Details: `references/tiktok-monetization-and-live.md`.

### 11. Review weekly in TikTok Studio

Per video: average watch time, % watched full video, retention curve drop-off second, traffic sources (For You / Search /
Profile / Following), search terms, shares and saves per 1,000 views, new followers. Decide: which hook held past 3 s, which
series grew followers, which search phrase brought traffic. One experiment a week (../growth-experiments/SKILL.md).

## Templates

- `templates/tiktok-video-brief.md` — one-page brief: hook, beats, on-screen text, search phrase, caption, labels, approval.
- `templates/tiktok-30-day-calendar.csv` — 30 days of one-a-day uploads across Claudia's four series.
- `templates/tiktok-caption-bank.yaml` — captions + search phrases + hashtag sets per series, with banned phrases.
- `templates/tiktok-preflight-checklist.md` — the 20-point check before any upload.

Quick brief:

```text
SERIES / EP: {name} {n} · LENGTH: {s} · SOUND: {original | CML track | trending (personal only)}
HOOK (0–2 s): shot {…} · on-screen text {…}
BEATS: 1 {…} 2 {…} 3 {…} · LOOP/CLOSE: {…}
SEARCH PHRASE (caption + on-screen + spoken): {…}
CAPTION (≤ 100 chars visible): {…} · HASHTAGS (3–5): {…} #aigenerated
LABELS: AIGC on · paid {no | yes → disclosure toggle + #ad; never financial} · coin/money mentions: none
APPROVED BY: {name} after watching the file
```

## Check before you finish

- [ ] AI-generated content label on for every video (package `is_aigc` or the in-app toggle); "AI character" visible on screen.
- [ ] No coin names, tickers, launch links, wallet/contract addresses, earnings or "buy" language anywhere in video, caption or comments.
- [ ] No paid promotion of any financial product; other paid posts use the disclosure toggle and `#ad`.
- [ ] Hook moves in the first frame; on-screen text inside the safe zone; captions burned in.
- [ ] Search phrase in caption, on-screen text and voice line.
- [ ] Original video (not a re-upload); licensed sound for the account type.
- [ ] A human watched the final file and approved it; privacy level set as intended.
- [ ] Pace within 1–2 videos a day; nothing near-duplicate.
- [ ] Weekly Studio review logged with one experiment.

## Pitfalls

- **"It's just education" with a ticker on screen.** A named coin plus enthusiasm reads as promotion. Remove the coin.
- **Reposting the same clip from Reels with the watermark.** Unoriginal and watermarked content gets suppressed.
- **Stripping Content Credentials** to avoid the label. Detection still flags it and it looks like deception.
- **Trending sounds on a paid post.** Commercial use needs Commercial Music Library or licensed audio.
- **Fake LIVE.** Looped or AI-voiced "live" streams break LIVE rules; the operator should host.
- **Banking on Creator Rewards.** An AI character may not qualify; build income from brand work and owned channels.
- **Posting 5 a day from day one.** Volume without retention trains the system that the account is low quality.
- **Ignoring comments in the first hour.** Velocity in that hour matters; schedule posts when someone can reply.
- **A second account after a ban.** That is ban evasion and gets every linked account removed. Appeal instead.

## Related skills

- [x-playbook](../x-playbook/SKILL.md) — the same character on X, where coin news and the launchpad can be discussed (with NFA).
- [instagram-reels-playbook](../instagram-reels-playbook/SKILL.md) and [youtube-shorts-playbook](../youtube-shorts-playbook/SKILL.md) — reusing vertical video properly.
- [posting-schedule](../posting-schedule/SKILL.md) — slots and the `tick()` loop.
- [trend-research](../trend-research/SKILL.md) — spotting sounds and formats early.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — FCA, MiCA, FTC, TikTok's financial rules.
- [monetization-streams](../monetization-streams/SKILL.md) — income that doesn't depend on Creator Rewards.
- [kpi-reporting](../kpi-reporting/SKILL.md) — retention, completion, follows per 1,000 views.
- [short-form-editing](../../create/short-form-editing/SKILL.md), [captions-and-hooks](../../create/captions-and-hooks/SKILL.md), [storyboarding-shorts](../../create/storyboarding-shorts/SKILL.md)
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — labels and Content Credentials.
- [social-publishing](../../build/social-publishing/SKILL.md) — the publishing package in depth.
