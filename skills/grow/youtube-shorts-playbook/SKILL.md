---
name: youtube-shorts-playbook
description: Plans, packages, discloses and uploads YouTube Shorts for an AI influencer or agent-run channel in line with 2026 ranking (viewed-vs-swiped, completion, engaged views), the altered-or-synthetic disclosure, the inauthentic-content policy and YPP thresholds, including the 2027 changes. Use when a person or agent wants to start or grow a Shorts channel, build a Shorts series, link Shorts to long videos, upload through @useclaudia/social with containsSyntheticMedia and private-first review, check monetization eligibility, or avoid demonetization risks for AI personas and finance topics.
license: MIT
metadata:
  title: "YouTube Shorts Playbook"
  category: "grow"
  summary: "Grow a Shorts channel for an AI character: hooks that beat the swipe, honest AI disclosure, safe uploads, YPP and 2027 rules."
  level: "intermediate"
  tags: "youtube, shorts, ypp, monetization, synthetic media, inauthentic content, upload api, series"
  uses: "@useclaudia/social, @useclaudia/cli, @useclaudia/media"
  time: "40 min setup, then 30 min a week"
  version: "1.0.0"
  updated: "2026-10-08"
---

# YouTube Shorts Playbook

Build a Shorts channel for an AI character that YouTube keeps recommending and keeps monetizable: series with a
recognisable face and point of view, Shorts that people don't swipe away from, the "altered or synthetic content"
disclosure on every realistic clip, and an upload flow where the agent sends videos as **private** and a person reviews them
before anything goes public.

## When to use this

- Starting a Shorts channel for Claudia, Juno or the operator's own agent, or reviving one that stalled.
- Turning clips made for TikTok/Reels into Shorts that YouTube treats as original (not a reupload farm).
- Uploading from an agent with `@useclaudia/social` or `claudia post youtube`, with AI disclosure and quotas handled.
- Planning toward the YouTube Partner Program (YPP) or checking the February 2027 rule changes.
- Reviewing a channel for inauthentic-content risk (templated, mass-produced, AI voiceover over stock) or finance-persona
  risk before applying for monetization.

Not for: view bots, sub-for-sub, bought views, reused clips from other channels, or "faceless" channels pumping out 10+
near-identical Shorts a day. Those get channels terminated, not grown.

## What you need

- A YouTube channel (brand account recommended so the operator and the team can share access without sharing a password),
  2-step verification on, phone-verified (needed for custom thumbnails on long videos and longer uploads).
- Channel description and About: says the main character is AI-generated and who runs the channel.
  Example: `Claudia is an AI-generated character. Clips from her city: rooftops, rain, late nights. Run by the useclaudia.xyz team.`
- Vertical (9:16) or square video, up to 3 minutes; see [references/shorts-algorithm-and-specs.md](references/shorts-algorithm-and-specs.md).
- For agent uploads: a Google Cloud project with YouTube Data API v3 enabled, an OAuth **Desktop app** client stored under the
  key name `youtube`, and a `social-vault` key. The operator brings these keys; the agent never prints them.
- A person who reviews each upload in YouTube Studio before it is public.

## Steps

### 1. Set the channel up (once, 20 min)

1. Handle and name match the other platforms (`@claudia_onchain` style handles help people find her).
2. Banner 2560×1440 (safe area 1546×423 in the centre), profile photo = her face, not a logo.
3. About: AI disclosure line, what the channel posts, a link to `useclaudia.xyz/claudia?utm_source=youtube&utm_medium=about`.
4. Settings → Upload defaults: category People & Blogs (22) or Entertainment (24); comments "Hold potentially inappropriate
   comments for review"; license Standard; add the disclosure line to the default description.
5. Settings → Advanced: audience "No, it's not made for kids" (it is a creator channel for adults; never target children).
6. Remix: decide whether others may remix your Shorts (Studio → content → Remix setting per video). Remixes link back,
   which can bring reach; turn it off for any Short that features a collaborator who hasn't agreed.

### 2. Plan series, not one-offs

Shorts channels grow when viewers can predict what the next Short gives them. Pick 2–3 series with a fixed name and
structure (use [templates/shorts-series-plan.csv](templates/shorts-series-plan.csv)):

| Series (Claudia) | Structure | Length |
|---|---|---|
| Rooftop Hours | one dusk loop + one line of on-screen text | 8–15 s |
| Small Confessions | hook confession → tiny scene → twist | 20–35 s |
| Behind the Prompt | finished frame → how it was made → result again | 35–60 s |

Mix with the long-form plan if there is one: every Short can point to one long video with **Related video** (set in the
Shorts upload flow in the app or in Studio). See [../../create/content-pillars-and-series/SKILL.md](../../create/content-pillars-and-series/SKILL.md).

### 3. Make each Short beat the swipe

YouTube shows each new Short to a small test audience first, then expands in waves. The deciding signals are how many
people choose to watch rather than swipe away ("viewed vs swiped away" in Analytics), completion/average percentage viewed,
rewatches, and engaged views. Build for that:

1. **0–1 s**: the face or the motion, plus on-screen text. No logo intro, no "hey guys".
2. **Length**: 15–40 s is the sweet spot; a 30 s Short at 85% completion usually outperforms a 60 s one at 50%. Use up to
   3 min only when every beat holds.
3. **Loop**: end on a frame that cuts cleanly back to the start for mood clips; rewatches count.
4. **Text**: inside the safe zone (keep the bottom ~20% and right edge clear of channel name, buttons and description).
5. **Audio**: YouTube's audio library or the Shorts sound picker; outside music risks claims that block or demonetize.
6. **Title**: up to 100 characters; the first ~40 show in the feed. Write a curiosity line, not keywords: "she said one
   drink (she lied)". Add `#shorts` only if it reads naturally; it's optional. Max 3 hashtags shown above the title; more than
   15 hashtags makes YouTube ignore all of them.
7. **Description**: first line repeats the hook, second line the AI disclosure, then links (UTM-tagged).
8. **Original export**: clean master, no TikTok/Instagram watermark. A cross-posted clip is fine if it is the creator's own
   original and is natively edited (different text, different cut).

Clip craft: [../../create/short-form-editing/SKILL.md](../../create/short-form-editing/SKILL.md),
[../../create/storyboarding-shorts/SKILL.md](../../create/storyboarding-shorts/SKILL.md),
[../../create/captions-and-hooks/SKILL.md](../../create/captions-and-hooks/SKILL.md).

### 4. Disclose synthetic media on every realistic clip

- YouTube requires creators to disclose **realistic** altered or synthetic content: a realistic person who doesn't exist,
  a synthetic voice, altered real footage. Claudia is a photoreal AI character with a generated voice on some clips: every
  Short gets the disclosure.
- Studio upload → Details → "Altered or synthetic content" → **Yes**. Through the API, `@useclaudia/social` sets
  `status.containsSyntheticMedia: true` whenever the AI label is on (default).
- Since 27 May 2026 YouTube auto-labels untagged synthetic content it detects (SynthID, C2PA); repeated non-disclosure can
  lead to removal or YPP suspension. Disclosing never lowers reach on its own.
- Add the description line too ("Claudia is an AI-generated character."), because the label isn't visible everywhere.
- Policy details: [references/youtube-policies-ai-and-inauthentic.md](references/youtube-policies-ai-and-inauthentic.md);
  provenance workflow: [../../create/ai-disclosure-and-provenance/SKILL.md](../../create/ai-disclosure-and-provenance/SKILL.md).

### 5. Stay clear of inauthentic content and finance-persona risk

Read [references/youtube-policies-ai-and-inauthentic.md](references/youtube-policies-ai-and-inauthentic.md) before applying
for YPP. The short version:

- YouTube's **inauthentic content** policy (renamed from "repetitious" in July 2025, enforced at channel level in 2026)
  demonetizes or removes channels that look mass-produced: templated videos that differ only in text, AI voiceover over
  stock or clips with no human creative input, 10+ near-identical Shorts a day, sudden topic pivots chasing trends.
- AI is allowed. What protects a channel: a consistent character with a point of view, original scenes, varied structure,
  a human editor making choices, honest disclosure.
- **Finance**: 2026 commentary on the policy update lists AI personas giving health, finance or legal advice among
  non-monetizable patterns. Treat it as real: an AI character must not give financial advice, coin picks, price
  predictions or "how I made X" claims. Juno-style chart *literacy* (how to read, why patterns fail) is the outer limit,
  with "Education, not financial advice." in the description.
- Crypto scams, "giveaways", and promises of returns break YouTube's spam, deceptive practices and scams policy.
  `@useclaudia/social` blocks promise phrases ("100x", "guaranteed returns", "risk-free") in `preview()` and `publish()`.

### 6. Upload from the agent: private first, a person publishes

Unaudited Google Cloud projects can only upload **private** videos, and `@useclaudia/social` uploads private by default
anyway. That gives a natural approval gate: the agent uploads private, the person checks it in Studio (label, Related
video, cover frame, captions) and sets it public or schedules it there.

CLI (title is taken from the first line of the text, up to 100 characters):

```sh
claudia keys set youtube                     # OAuth Desktop client id + secret (JSON or id:secret)
claudia connect youtube                      # browser sign-in; comes back to 127.0.0.1
claudia post youtube "she said one drink (she lied)

Claudia is an AI-generated character. More: https://useclaudia.xyz/claudia?utm_source=youtube&utm_medium=shorts&utm_campaign=night-shift" \
  --media ./exports/club-0412-shorts.mp4 --dry-run   # shows the resumable upload request, sends nothing
claudia post youtube "…same text…" --media ./exports/club-0412-shorts.mp4   # preview → y → uploads once, private
```

Library (full options):

```ts
import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

const social = createSocial({ keys: chainKeys(envKeys()) }); // CLAUDIA_KEY_SOCIAL_VAULT, CLAUDIA_KEY_YOUTUBE
await social.ready();
const yt = social.accounts().find((a) => a.network === "youtube")!;

const short = social.draft({
  text: [
    "she said one drink (she lied)",
    "",
    "Claudia is an AI-generated character.",
    "Night Shift, part 4. More from her city: https://useclaudia.xyz/claudia?utm_source=youtube&utm_medium=shorts&utm_campaign=night-shift",
  ].join("\n"),
  media: [{ path: "./exports/club-0412-shorts.mp4" }],
  targets: [{ account: yt.id }],
  labels: { ai: true },                       // → status.containsSyntheticMedia = true
  options: {
    youtube: {
      title: "she said one drink (she lied)",
      privacyStatus: "private",               // default; unaudited projects can only upload private
      categoryId: "24",                       // Entertainment
      tags: ["night out", "dj set", "ai character"],
      shorts: true,                           // returns a youtube.com/shorts/<id> link
    },
  },
});

const [pv] = social.preview(short.id);
console.log(pv.labelsAdded, pv.warnings, pv.blocked ?? "ok");
// warnings include: "Uploads go out private (draft) unless options.youtube.privacyStatus says otherwise…"
social.submit(short.id);                      // a person approves in the host UI
```

After the person approves:

```ts
social.approve(short.id);
const done = await social.publish(short.id);  // once only; a crash mid-upload is never re-sent on its own
console.log(done.status, done.results[0].url); // "published" https://www.youtube.com/shorts/…  (still private)
```

Then in Studio the person sets visibility (Public now, or Schedule). If the project has passed YouTube's API audit,
`options.youtube.publishAt` with `privacyStatus: "private"` schedules public release from the API instead. Full upload
details, quotas and errors: [references/youtube-api-upload.md](references/youtube-api-upload.md) and
[../../build/social-publishing/SKILL.md](../../build/social-publishing/SKILL.md).

### 7. Pace the channel

- `@useclaudia/social` caps YouTube at **5 uploads per account per 24 h**; the Google project has 100 uploads/day in its own
  bucket (since June 2026). Neither is a target.
- Recommended for a character channel: **1 Short a day at most, 4–6 a week**, at least 2 different series a week, and no two
  uploads within 3 hours. Consistency for 8–12 weeks beats bursts.
- Evenings local time are strong for YouTube (Buffer 2026); start at 17:00–20:00 and move to the channel's own "When your
  viewers are on YouTube" chart after 4 weeks. See [../posting-schedule/SKILL.md](../posting-schedule/SKILL.md).
- Replies: pull comments with `social.inbox()` (YouTube comment threads, 1 quota unit per read), draft replies, and have a
  person approve them; each reply costs 50 quota units. Never auto-reply to every comment. See
  [../engagement-and-replies/SKILL.md](../engagement-and-replies/SKILL.md).

### 8. Read the analytics weekly

Studio → Analytics → Content → Shorts. For each Short:

| Number | Healthy for a growing character channel | If low |
|---|---|---|
| Viewed (vs swiped away) | ≥ 70% | Fix the first second: face/motion + text |
| Average percentage viewed | ≥ 80% for < 20 s, ≥ 60% for 30–60 s | Trim; move the payoff earlier |
| Engaged views ÷ views | rising week on week | Test new hooks |
| Subscribers gained per 1,000 engaged views | ≥ 1.5 | Make the series name and promise clearer |
| Related video click-through | any non-zero, rising | Link a long video that continues the Short |

Log the numbers in [../kpi-reporting/SKILL.md](../kpi-reporting/SKILL.md) format; test one change at a time
([../growth-experiments/SKILL.md](../growth-experiments/SKILL.md)).

### 9. Monetize when eligible (and plan for 2027)

Read [references/monetization-and-ypp.md](references/monetization-and-ypp.md). Thresholds (checked 2026-10):

- Fan funding (Super Thanks, memberships…): 500 subscribers + 3 M valid public Shorts views in 90 days, or 3,000 watch hours.
- Full YPP (Shorts ad revenue share): 1,000 subscribers + **10 M** Shorts views in 90 days, or 4,000 watch hours in 12 months.
- From **1 Feb 2027**, new applicants need 1,000 subscribers + **20 M** Shorts views in 90 days, or 8,000 watch hours; all
  partners need minimum activity, and a monthly Shorts payout needs 10 M views in the trailing 90 days.
- Shorts ad revenue is pooled; creators get 45% of their allocated share. Income estimates are not promises; never show
  earnings claims to viewers.

## Templates

- [templates/shorts-series-plan.csv](templates/shorts-series-plan.csv) — four weeks of Shorts by series with hook, length,
  related video, disclosure and approval columns.
- [templates/shorts-metadata.json](templates/shorts-metadata.json) — the `draft()` input for one Short, ready to fill.
- [templates/shorts-upload-checklist.md](templates/shorts-upload-checklist.md) — the reviewer's Studio checklist before a
  private upload goes public.

Title + description skeleton:

```text
Title (≤ 100 chars, first ~40 matter): <curiosity line in her voice>

Description:
<hook line again>
<Character> is an AI-generated character.            ← always
[#ad · Paid partnership with <brand>]                ← only if paid/gifted/affiliate (also tick "paid promotion" in Studio)
[Education, not financial advice.]                   ← only for chart-literacy content; never coin picks
<Series name>, part <n>. More: <UTM link>
#tag1 #tag2 #tag3                                     ← ≤ 3 shown; never more than 15
```

Examples: [examples/claudia-night-shift-series.md](examples/claudia-night-shift-series.md) (a 4-week series with
uploads and analytics) and [examples/juno-ypp-readiness-review.md](examples/juno-ypp-readiness-review.md) (an
inauthentic-content and finance-risk review before applying for YPP).

## Check before you finish

- [ ] Channel About and every description say the character is AI-generated and who runs the channel.
- [ ] "Altered or synthetic content" = Yes on every realistic Claudia/Juno Short (`containsSyntheticMedia` true via API).
- [ ] Paid, gifted, affiliate or own-brand → Studio "includes paid promotion" ticked + `#ad` in the first description line.
- [ ] No financial advice, coin picks, price predictions, giveaways or return promises; chart education carries
      "Education, not financial advice."; nothing invites UK/EU viewers to buy a cryptoasset
      ([../crypto-marketing-compliance/SKILL.md](../crypto-marketing-compliance/SKILL.md)).
- [ ] Uploads went up private; a person reviewed each in Studio before setting it public or scheduling.
- [ ] ≤ 1 Short a day, ≥ 3 h apart, at least two series in rotation; no near-identical templated uploads.
- [ ] Audio from YouTube's library or owned; no other platform's watermark.
- [ ] Not marked "made for kids"; nothing aimed at minors.
- [ ] Weekly analytics logged; one experiment running.

## Pitfalls

- **Assuming the API upload is public.** Unaudited projects upload private only; the video sits private until a person
  publishes it. That is the approval gate — use it, don't work around it.
- **Refresh token expiry in "Testing".** OAuth apps in Testing get refresh tokens that expire after 7 days; reconnect
  weekly or publish the consent screen.
- **A faceless AI farm by accident.** Same template, same voice, 8 uploads a day → inauthentic content at channel level.
  Vary structure, keep the character on screen, keep a person making creative choices.
- **AI persona giving money tips.** Non-monetizable and a scam-policy risk. Education only, no picks.
- **Skipping the synthetic toggle because "everyone knows she's AI".** The rule is about realistic content, and YouTube
  labels it anyway when detected; non-disclosure counts against the channel.
- **More than 15 hashtags.** YouTube ignores all of them.
- **Reuploading the TikTok file with its watermark.** Low originality signal; export a clean master.
- **View bots, sub4sub, "engagement groups".** Fake engagement policy: removal and termination, plus FTC rules on fake
  indicators for any commercial use.
- **Auto-replying to every comment from the API.** 50 quota units each and reads as spam; reply selectively and approved.

## Related skills

- [../tiktok-playbook/SKILL.md](../tiktok-playbook/SKILL.md) · [../instagram-reels-playbook/SKILL.md](../instagram-reels-playbook/SKILL.md) · [../x-playbook/SKILL.md](../x-playbook/SKILL.md)
- [../posting-schedule/SKILL.md](../posting-schedule/SKILL.md) · [../engagement-and-replies/SKILL.md](../engagement-and-replies/SKILL.md) · [../kpi-reporting/SKILL.md](../kpi-reporting/SKILL.md)
- [../monetization-streams/SKILL.md](../monetization-streams/SKILL.md) · [../brand-deals-and-sponsorships/SKILL.md](../brand-deals-and-sponsorships/SKILL.md) · [../crypto-marketing-compliance/SKILL.md](../crypto-marketing-compliance/SKILL.md)
- [../growth-experiments/SKILL.md](../growth-experiments/SKILL.md) · [../trend-research/SKILL.md](../trend-research/SKILL.md)
- [../../create/short-form-editing/SKILL.md](../../create/short-form-editing/SKILL.md) · [../../create/thumbnails-and-covers/SKILL.md](../../create/thumbnails-and-covers/SKILL.md) · [../../create/music-and-sound-for-shorts/SKILL.md](../../create/music-and-sound-for-shorts/SKILL.md) · [../../create/voice-and-lip-sync/SKILL.md](../../create/voice-and-lip-sync/SKILL.md)
- [../../build/social-publishing/SKILL.md](../../build/social-publishing/SKILL.md) · [../../build/autonomous-posting-loop/SKILL.md](../../build/autonomous-posting-loop/SKILL.md)
