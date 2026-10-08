---
name: instagram-reels-playbook
description: Plans, packages, labels and publishes Instagram Reels and Threads posts for an AI influencer or an agent-run account, using what Meta's 2026 ranking actually rewards (sends, watch time, originality), Trial Reels for testing on non-followers, collab posts with up to five co-authors, Broadcast channels for the core audience, and Meta's AI info label. Use when a person or agent wants to grow on Instagram or Threads, set up a weekly Reels cadence, test hooks with Trial Reels, run a collab, start a broadcast channel, post through @useclaudia/social with human approval, or check that AI and paid-partnership disclosures are right.
license: MIT
metadata:
  title: "Instagram Reels & Threads Playbook"
  category: "grow"
  summary: "Grow on Instagram Reels and Threads in 2026: sends-first hooks, Trial Reels tests, collabs, broadcast channels, AI labels done right."
  level: "intermediate"
  tags: "instagram, reels, threads, trial reels, collab posts, broadcast channels, ai label, meta"
  uses: "@useclaudia/social, @useclaudia/cli, @useclaudia/media"
  time: "45 min setup, then 30 min a week"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Instagram Reels & Threads Playbook

Run an Instagram + Threads presence for an AI character the way the 2026 ranking systems reward: Reels that people send to
friends, tested on strangers with Trial Reels before followers see them, amplified through collab posts, and kept warm in a
Broadcast channel and on Threads. Every post carries Meta's AI label, every paid post carries "Paid partnership", and nothing
publishes without a person approving the exact preview.

## When to use this

- Starting or rebooting an Instagram account for an AI influencer (Claudia, Juno, or the operator's own agent).
- Turning a batch of vertical clips into a week of Reels with hooks, covers, captions and five hashtags.
- Testing two or three hook variants on non-followers with Trial Reels before committing.
- Planning a collab post with another creator, or a launch week that needs Reels + Threads + broadcast in sync.
- Wiring Instagram/Threads posting into an agent with `@useclaudia/social` (approval, schedule, caps, media relay).
- Checking a post that mentions a coin, a sponsor or a realistic AI person before it goes out.

Not for: buying reach, follow/unfollow, engagement pods or comment rings (all violate Meta's rules and the FTC/CMA rules on
fake indicators). For other platforms use the sibling playbooks listed in Related skills.

## What you need

- A **public Professional account** (Creator is right for a character; Business if a company operates it) linked to a
  Facebook Page if posting through Meta's API. Two-factor auth on. The bio says it is an AI character and who runs it:
  `AI character · run by @operator_handle · posts are AI-generated`.
- A **Threads profile** on the same Instagram login (Threads inherits the handle).
- Vertical media: 1080×1920, 9:16, H.264/AAC MP4, 3–90 s for discovery content; JPEG covers 1080×1920 (Instagram's API
  takes JPEG only for images). See [references/reels-algorithm-and-specs.md](references/reels-algorithm-and-specs.md).
- For agent posting, one of:
  - a posting service (Buffer, Zernio or Upload-Post) connected to the Instagram/Threads profiles, its key stored as
    `buffer` / `zernio` / `upload-post`; or
  - the operator's own Meta app (type Business, Instagram API with Instagram Login and/or Threads API), app id + secret
    stored as `instagram` / `threads`, redirect `https://useclaudia.xyz/relay/oauth/callback`, and the Claudia media relay
    configured (Instagram and Threads pull media from a public URL).
- A `social-vault` key (16+ random characters) in the operator's key store. Never print or commit it.
- A person who approves posts. The agent drafts; the person approves.

## Steps

### 1. Set the account up so it can be recommended (once, 20 min)

1. Professional dashboard → Account status: confirm "eligible for recommendations". Anything flagged there blocks Trial
   Reels and Explore; fix it before posting more.
2. Bio (150 chars): who she is, that she is AI, one reason to follow. Example for Claudia:
   `AI creator from a sunset bedroom in the city · clips, rooftops, late nights · AI-generated · run by @useclaudia`
3. Link: one link (`useclaudia.xyz/claudia?utm_source=instagram&utm_medium=bio&utm_campaign=profile`).
4. Highlights: 3 max at start — "Who is she", "Behind the prompts", "Collabs".
5. Turn on Threads with the same handle. Pin a post explaining what the account is.
6. Do not run crypto ads. Meta requires written permission for crypto ads; organic posts must never promise returns.

### 2. Decide the weekly cadence (pace inside the caps)

Recommended for a character account that is under 50k followers (checked 2026-10):

| Surface | Per week | Why |
|---|---|---|
| Reels (main grid) | 4–5 | Reels are the only format that reliably reaches non-followers |
| Trial Reels | 3–6 (hook variants) | Tests on strangers without touching follower metrics |
| Carousel | 1 | Saves and sends from "how I made this" posts |
| Stories | daily, 3–6 frames | Keeps the follower graph warm; polls feed "close" signals |
| Threads | 1–3 a day | Conversation; text-first; cheap to make |
| Broadcast channel | 2–3 messages | The core 1–5% of followers; push notification each time |

`@useclaudia/social` enforces at most **20 Instagram** and **25 Threads** posts per account per 24 h and blocks
near-duplicates within 24 h. Stay far below: an autonomous agent should not exceed 2 Reels a day or 5 Threads posts a day,
and should space posts at least 3 hours apart on Instagram. Use the calendar in
[templates/reels-weekly-plan.csv](templates/reels-weekly-plan.csv). Posting times: start at Tue/Wed 11:00–13:00 local
(Sprout Social 2026) and move to the account's own best hours after 4–6 weeks of data; see
[../posting-schedule/SKILL.md](../posting-schedule/SKILL.md).

### 3. Make every Reel "sendable"

Sends (DM shares) are the strongest signal for reaching non-followers in 2026 (Mosseri: roughly 3–5x a like). Watch time
and completion decide whether a Reel keeps going. Build each Reel to that:

1. **Hook in 0–1.5 s**: movement + a line of on-screen text that names a feeling or a situation people send to friends.
   "POV: you said one drink" beats "Night out vlog".
2. **Length**: 7–15 s for loops and moods (rewatches count), 20–45 s for a mini story, up to 90 s for a how-I-made-it.
   Reels can now be 20 min long, but recommendation to non-followers effectively stops at 3 min.
3. **Original**: post the native file, no other app's watermark, no reposted clips. Accounts that mostly repost within a
   30-day window are classed as aggregators and lose recommendation reach.
4. **Safe zones**: keep text out of the bottom 320 px and top 220 px (UI overlays) and 60 px from each side.
5. **Audio**: trending or original audio; if the clip is silent (like Claudia's loops), add original sound or a licensed
   track from the in-app library. Music from outside the library can get the Reel muted.
6. **Cover**: a clear face frame, 1080×1920, with the 3:4 centre crop still readable (the grid shows 3:4).
7. **Caption**: first 125 characters carry the hook or the question; a keyword phrase people would search ("rainy city
   night walk"); **at most 5 hashtags** (hard cap since Dec 2025). Disclosure lines go at the end of the caption, plus the
   native label.
8. **End with a reason to send**: "send this to the friend who always says one drink" is fine; "like and share!" is
   engagement bait and gets demoted.

Use [templates/reel-brief.md](templates/reel-brief.md) for each Reel. Prompting the clip itself belongs to
[../../create/selfie-and-ugc-video-prompts/SKILL.md](../../create/selfie-and-ugc-video-prompts/SKILL.md) and
[../../create/short-form-editing/SKILL.md](../../create/short-form-editing/SKILL.md); hooks to
[../../create/captions-and-hooks/SKILL.md](../../create/captions-and-hooks/SKILL.md).

### 4. Label AI correctly (every post)

- Meta requires the AI disclosure for **photorealistic video or realistic-sounding audio** that was made or meaningfully
  altered with AI, and may penalise accounts that skip it. Claudia is photoreal, so every Claudia Reel, photo and Story is
  labelled. In the app: Advanced settings → "Add AI label" (shows as "AI info"). Through the API, `@useclaudia/social` sets
  `is_ai_generated` on Instagram automatically and adds "(AI-generated)" to the text where no native flag exists.
- Also keep the caption line `AI-generated character.` so the disclosure survives screenshots and reposts.
- Keep C2PA Content Credentials in exported files when the generator writes them; do not strip metadata to dodge the label.
- Details and edge cases: [references/meta-ai-label-and-branded-content.md](references/meta-ai-label-and-branded-content.md).
  Provenance workflow: [../../create/ai-disclosure-and-provenance/SKILL.md](../../create/ai-disclosure-and-provenance/SKILL.md).

### 5. Test hooks with Trial Reels before followers see them

Trial Reels go to non-followers only; followers and the grid don't see them unless the Reel graduates. Read
[references/trial-reels-collabs-broadcast.md](references/trial-reels-collabs-broadcast.md) for limits before the first test.

1. Make 2–3 variants that differ in **one** thing (hook text, first shot, or length). Same caption, same audio.
2. In the app: create Reel → toggle **Trial** → choose **Manual** graduation (default for testing). Space variants 1–2 h apart.
3. After 24 h read views, average watch time, shares/sends and follows from each variant. Decide at 72 h.
4. Winner rule (tune per account): graduate the variant with the highest sends per 1,000 views if its average watch time
   is at least 60% of the clip length. Discard the rest; never graduate all variants (followers would see near-duplicates).
5. Log it in [../growth-experiments/SKILL.md](../growth-experiments/SKILL.md) format so results compound.

The Instagram API supports trial reels (`trial_params.graduation_strategy` MANUAL or SS_PERFORMANCE), but
`@useclaudia/social` 0.2 publishes Reels with `share_to_feed: true` and doesn't expose trial or collaborator options yet. Post
Trial Reels and collab invites in the Instagram app, or through a posting service that supports them. Say so to the operator
instead of pretending the agent can do it.

### 6. Run collab posts (up to 5 co-authors)

A collab post appears on every co-author's profile (up to six profiles) with shared likes, comments and views. It is the
cheapest legitimate way to borrow an audience. Rules:

1. Pick partners whose audience overlaps by theme but not by people (a travel creator, a music producer, a cosy-desk
   vlogger). Check they are adults, disclose AI if they are AI too, and have no fake-follower pattern (sudden spikes,
   follower count far above typical views).
2. Pitch with [templates/collab-invite.md](templates/collab-invite.md); one personal DM per creator, never a bulk blast.
3. Agree in writing: who posts, which caption, the AI line, whether money or product changed hands (then it is an ad and
   both sides use "Paid partnership" and `#ad`).
4. The post owner adds collaborators (Tag people → Invite collaborator); each must accept before it shows on their profile.
5. Measure on both sides: views from non-followers, follows from the post, sends.

More: [../collabs-and-cross-promotion/SKILL.md](../collabs-and-cross-promotion/SKILL.md).

### 7. Start a Broadcast channel once there is a core audience

Broadcast channels are one-to-many chats in followers' inboxes: text, photos, video, voice notes, polls, prompts, and
reactions/replies; members get a notification per message. Start one when Stories regularly get 300+ views.

- 2–3 messages a week, never daily spam. Mix: a behind-the-scenes frame, a poll that decides the next Reel, a voice note.
- No crypto calls, no "buy", no countdowns to a coin. Broadcasts are still public promotions in law.
- Plan with [templates/broadcast-channel-plan.yaml](templates/broadcast-channel-plan.yaml). Broadcasts are sent in the app;
  there is no publishing API for them.

### 8. Run Threads as the conversation layer

Threads (500 M monthly users, June 2026) rewards replies and conversations, not reposted Reels.

- 500 characters per post, plus a text attachment of up to 10,000 characters, up to 10 photos/videos in the app (20 via the
  API). Use one topic tag per post; join Threads Communities that fit (100+ exist).
- Formats that work for a character: a one-line observation from "her day", a question with two options, a 3-part thread
  of a story, a reply to a creator in the same niche (by hand or approved, never automated mass replies).
- Cross-posting a Reel to Threads is fine once; write a native line for it instead of the Instagram caption.
- Deeper: [references/threads-playbook.md](references/threads-playbook.md).

### 9. Publish through the agent with approval

CLI, one post at a time (preview → the person types y → publishes once):

```sh
claudia connect instagram            # or: claudia connect buffer / zernio / upload-post
claudia connect threads
claudia accounts
claudia post instagram "POV: you said one drink. AI-generated character." \
  --media ~/.claudia/media/library/2026-10/club-0412.mp4 --dry-run   # shows the exact request, sends nothing
claudia post instagram "POV: you said one drink. AI-generated character." \
  --media ~/.claudia/media/library/2026-10/club-0412.mp4             # preview, asks, publishes once
claudia post threads "the rain did not get the memo that i had plans tonight"
```

Exit code 3 means a rule refused it (a promise, a duplicate, a cap). Read the reason; don't rephrase to sneak past it.

Library, for a scheduled week (Node ≥ 20, ESM):

```ts
import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

const social = createSocial({
  keys: chainKeys(envKeys()), // CLAUDIA_KEY_SOCIAL_VAULT, CLAUDIA_KEY_INSTAGRAM, ...
  mediaRelay: {
    url: "https://useclaudia.xyz/relay/media",
    token: async () => process.env.CLAUDIA_ACCESS_TOKEN!, // `claudia login` token or agent key
    ttlMin: 60,                                          // video: give Meta time to fetch
  },
});
await social.ready();
const ig = social.accounts().find((a) => a.network === "instagram")!;
const th = social.accounts().find((a) => a.network === "threads")!;

const post = social.draft({
  text: "POV: you said one drink 🪩\n\nsend this to the friend who always says that\n\n#nightout #citynights #djset",
  media: [{ path: "./club-0412.mp4", alt: "Animated AI character with a black bob and sunglasses dancing at a DJ set" }],
  targets: [
    { account: ig.id },
    { account: th.id, text: "said one drink. the DJ had other plans" }, // native Threads line, not the IG caption
  ],
  labels: { ai: true },
});

for (const p of social.preview(post.id)) {
  console.log(p.network, p.chars, p.labelsAdded, p.warnings, p.blocked ?? "ok");
}
social.submit(post.id); // → pending_approval; the person reviews the preview in the host UI
```

After the person approves in the host UI (not the agent approving itself):

```ts
social.approve(post.id);
social.schedule(post.id, Date.parse("2026-10-14T11:30:00+01:00"));
setInterval(() => social.tick(), 30_000); // host keeps ticking; >10 min late → back to approval ("Posting late?")
social.on("post", (p) => console.log(p.id, p.status, p.results?.map((r) => r.url ?? r.error)));
```

If anything looks wrong mid-week (a backlash, a platform warning), `social.killSwitch(true)` stops every scheduled post.
See [../../build/social-publishing/SKILL.md](../../build/social-publishing/SKILL.md) for the full API and
[../../build/autonomous-posting-loop/SKILL.md](../../build/autonomous-posting-loop/SKILL.md) for loop pacing.

### 10. Review weekly (20 min)

Pull per Reel: views, % from non-followers, average watch time, completion (watched to end), sends, saves, follows. Score:

- **Sends per 1,000 views** — the growth number. Under 2 is weak; 5+ is strong for a character account.
- **Follows per 1,000 non-follower views** — whether people want more of her.
- **Average watch time ÷ length** — under 40% means the hook or the pacing is off.

Keep the 2 best formats, cut the worst, add 1 new test. Log in [../kpi-reporting/SKILL.md](../kpi-reporting/SKILL.md) format.

## Templates

- [templates/reels-weekly-plan.csv](templates/reels-weekly-plan.csv) — a 7-day Reels/Trial/Threads/Broadcast calendar with
  hook, length, audio, labels and approval columns.
- [templates/reel-brief.md](templates/reel-brief.md) — one-page brief per Reel (hook, beats, safe zones, cover, caption,
  disclosures, approval).
- [templates/collab-invite.md](templates/collab-invite.md) — DM and agreement checklist for a collab post.
- [templates/broadcast-channel-plan.yaml](templates/broadcast-channel-plan.yaml) — channel setup and a 4-week message plan.

Caption skeleton (fill it, keep the order):

```text
<hook line: a situation people send to a friend, ≤ 125 chars>

<one line of context or a question>

<keyword phrase people search>  #tag1 #tag2 #tag3        (≤ 5 hashtags total)
AI-generated character.          (+ native AI label)
[#ad · Paid partnership with @brand]   (only when paid/gifted; plus the Paid partnership tool)
[Not financial advice.]                (only if a coin or price is mentioned; avoid on Instagram anyway)
```

Worked examples: [examples/claudia-reels-week.md](examples/claudia-reels-week.md) (a full week with numbers) and
[examples/juno-trial-reels-test.md](examples/juno-trial-reels-test.md) (a 3-variant hook test and a collab).

## Check before you finish

- [ ] Account is public, professional, eligible for recommendations; bio says AI character + who runs it.
- [ ] Every Reel/photo/Story of a realistic AI person has the native AI label **and** a caption line.
- [ ] Paid, gifted, affiliate or own-brand content uses "Paid partnership" + `#ad` at the start or first line.
- [ ] ≤ 5 hashtags; no other app's watermark; native file; text inside safe zones; cover readable at 3:4.
- [ ] No coin tickers, prices, "buy", launch countdowns or return talk on Instagram/Threads posts; if a coin is mentioned
      at all, it is news only with "Not financial advice." and no UK/EU invitation to buy (see
      [../crypto-marketing-compliance/SKILL.md](../crypto-marketing-compliance/SKILL.md)).
- [ ] Every scheduled post was approved by a person after seeing `preview()`; nothing approved itself.
- [ ] Pace: ≤ 2 Reels and ≤ 5 Threads posts a day from the agent; 3 h+ between Instagram posts.
- [ ] Collab partners accepted in writing; Trial Reels decided at 72 h; experiment logged.
- [ ] Kill switch tested once (`social.killSwitch(true)` then `false`).

## Pitfalls

- **Reposting the TikTok export with its watermark.** Recommendation reach drops; export clean from the source.
- **Graduating every Trial Reel.** Followers then see three near-identical Reels in a day. Pick one.
- **Hashtag stuffing out of habit.** Only 5 are allowed; more get stripped or the post is blocked.
- **"Like/share/follow for part 2" bait.** Demoted on Instagram and penalised on Threads. Ask a real question instead.
- **Forgetting the AI label on "just a photo".** The rule covers photoreal images of people, not only video.
- **Claudia "trying" a product.** An AI character can't have used headphones. Write "styled with" / "the brand sent the
  design brief", never "I've been using these for weeks" (FTC: a virtual influencer can't claim personal experience).
- **Using media relay links for permanent hosting.** Relay links expire (15–60 min) and are deleted after publishing.
- **Engagement pods, comment-for-comment groups, follow/unfollow tools, bought followers.** Against Meta's terms and the
  FTC's fake-indicator rule; they also train the ranking system on the wrong audience.
- **Mass-DMing creators for collabs.** Spam limits and blocks; one researched DM beats fifty pasted ones.
- **Crypto ads or "link in bio to buy".** Needs Meta's written permission and, for UK audiences, an FCA-approved promotion.

## Related skills

- [../tiktok-playbook/SKILL.md](../tiktok-playbook/SKILL.md) · [../youtube-shorts-playbook/SKILL.md](../youtube-shorts-playbook/SKILL.md) · [../x-playbook/SKILL.md](../x-playbook/SKILL.md)
- [../posting-schedule/SKILL.md](../posting-schedule/SKILL.md) · [../engagement-and-replies/SKILL.md](../engagement-and-replies/SKILL.md)
- [../growth-experiments/SKILL.md](../growth-experiments/SKILL.md) · [../kpi-reporting/SKILL.md](../kpi-reporting/SKILL.md)
- [../collabs-and-cross-promotion/SKILL.md](../collabs-and-cross-promotion/SKILL.md) · [../brand-deals-and-sponsorships/SKILL.md](../brand-deals-and-sponsorships/SKILL.md)
- [../crypto-marketing-compliance/SKILL.md](../crypto-marketing-compliance/SKILL.md) · [../trend-research/SKILL.md](../trend-research/SKILL.md)
- [../../create/short-form-editing/SKILL.md](../../create/short-form-editing/SKILL.md) · [../../create/thumbnails-and-covers/SKILL.md](../../create/thumbnails-and-covers/SKILL.md) · [../../create/ai-disclosure-and-provenance/SKILL.md](../../create/ai-disclosure-and-provenance/SKILL.md)
- [../../build/social-publishing/SKILL.md](../../build/social-publishing/SKILL.md) · [../../build/autonomous-posting-loop/SKILL.md](../../build/autonomous-posting-loop/SKILL.md)
