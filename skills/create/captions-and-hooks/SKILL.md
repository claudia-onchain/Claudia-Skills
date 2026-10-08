---
name: captions-and-hooks
description: "Writes and places the words that make a short work — the 1–2 second hook (visual + on-screen text + first spoken line), on-screen captions (word-by-word highlight or line captions, brand-styled ASS files, sizes and safe zones for 1080×1920), and the post caption for each platform (X, TikTok, Instagram, YouTube, Threads, Bluesky, Telegram) with lengths, hashtags, soft-question CTAs, AI labels, #ad and \"not financial advice\". Includes 60+ hooks in Claudia's voice by content pillar, banned phrases (price/return promises), and a word-timings-to-captions script. Use when scripting a short's opening, captioning a video, or writing any post copy as Claudia or another AI character."
license: MIT
metadata:
  title: "Captions and hooks"
  category: create
  summary: "Hooks that stop the scroll, captions that sit in the safe zone, and post copy per platform — in Claudia's voice, always labelled."
  level: beginner
  tags: "hooks, captions, subtitles, copywriting, ass subtitles, word by word captions, hashtags, cta, ai label, safe zone"
  uses: "@useclaudia/social, @useclaudia/media"
  time: "10–20 min per post"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Captions and hooks

The first second decides whether anyone sees the rest. A hook is three things landing together — what's on screen, the
text on top of it, and the first line she says — and they must agree. After the hook, captions keep sound-off viewers
(most of them) following along, and the post caption gives the algorithm and the reader context. This skill writes all
three in Claudia's voice, places them where no app UI covers them, and keeps them honest: labelled, no price promises,
no fake engagement bait.

## When to use this

- Planning the opening of a short ([../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md) beat 1).
- Captioning a finished edit ([../short-form-editing/SKILL.md](../short-form-editing/SKILL.md) step 8).
- Writing post copy for one or more platforms, especially through `@useclaudia/social`.
- Writing as a different AI character: swap in that character's voice rules from its bible.

## What you need

- Claudia's voice rules: [../claudia-character-bible/references/voice-and-personality.md](../claudia-character-bible/references/voice-and-personality.md).
- The edit (or storyboard) with timings; word timestamps if she speaks (TTS providers and transcription tools return them).
- For burned captions: fonts Barlow Condensed / DM Sans / DM Mono (SIL OFL) and an ffmpeg with libass, or an editor
  (CapCut, Resolve Studio, Premiere 26.3 all do word-by-word captions, checked 2026-10).
- Node ≥ 20 for [scripts/words-to-ass.mjs](scripts/words-to-ass.mjs).
- [references/hook-bank.md](references/hook-bank.md) — 60+ hooks by pillar; [references/platform-caption-rules.md](references/platform-caption-rules.md)
  — limits, hashtag and label rules per platform (checked 2026-10).

## Steps

### 1. Write the hook as a triple

| Layer | Job | Example (lounge sunglasses clip) |
|---|---|---|
| Visual (0–1 s) | start mid-action, face visible | she's already reaching for the sunglasses |
| On-screen text (0.2–1.8 s) | the tease in ≤ 6 words | `SUNGLASSES ON = DO NOT PERCEIVE ME` |
| First spoken line / sound (0–2 s) | confirms or twists the text | (sound) lamp click + a low "mm-hm" laugh |

Hook formulas that suit her voice (pick one per post; examples for every pillar in the hook bank):

1. **Deadpan rule:** "sunglasses on = do not perceive me"
2. **Specific number:** "my agents posted 14 times. I took one nap"
3. **Dare / forecast:** "forecast said stay in" → she's running in the rain
4. **Storytime cliff:** "so my agent did something at 3am"
5. **Wait-for-it:** "wait for the drop" (only if the drop really pays off by 5 s)
6. **Confession:** "I've filmed this four times. the cat ruined all four"
7. **POV:** "POV: you asked your agent for one post"
8. **Question to camera:** "rain or sunset tomorrow? you pick"
9. **Contradiction:** "the outfit is thrifted. the confidence is generated"
10. **Rate it:** "rate the transition. be honest (don't)"

Rules: the text appears by 0.2 s and is readable in 1.5 s (≤ 6 words, ~3 words per second); the visual moves in frame 1;
never promise something the clip doesn't deliver.

### 2. Choose the caption style

| Style | Use for | Spec at 1080×1920 |
|---|---|---|
| **Word-by-word highlight** | she talks to camera, storytime | DM Sans Bold or Barlow Condensed 800, 64–76 px, 1–3 words on screen, active word rose `#ff6fa5`, rest off-white `#ece9e2`, 4 px near-black outline |
| **Line captions** | voice-over, music-only clips with a thought | DM Sans Bold 60–64 px, ≤ 32 characters per line, 1–2 lines, change every 1–2.5 s |
| **Hook title** | first 2 s only | Barlow Condensed 800, 110–140 px, uppercase, one rose word |
| **Boxed** | busy backgrounds (club haze, rain) | DM Sans 60 px on a ~80 % near-black box (ASS BorderStyle 3) |

Industry convention (third-party guides, checked 2026-10) puts caption text at about 60–75 px on 1080×1920; condensed
uppercase can go a little larger.

### 3. Place it in the safe zone

Keep every caption inside the centred **~900×1400** area: nothing in the bottom ~320 px (caption bar, buttons), the
right ~120 px (like/comment/share rail) or the top ~250 px (Reels header). Practical positions used by the template:

- Hook title centred at **y = 520**, series label at **y = 360**.
- Captions centred at **y = 1180** (clear of the bottom UI on TikTok, Reels and Shorts).
- If her face is at y ≈ 1100 in a shot, move captions up to y = 760 for that shot — never over her mouth.

### 4. Make the caption file

Word timings → ASS in one command (tested 2026-10-08; output follows the ASS v4+ format; burning needs libass):

```sh
node scripts/words-to-ass.mjs work/lounge-words.json work/lounge.ass --upper --max-words 3
sh ../short-form-editing/scripts/burn-captions.sh work/lounge-graded.mp4 work/lounge.ass work/lounge-captioned.mp4 fonts/
```

`words.json` is `[{ "word": "sunglasses", "start": 0.20, "end": 0.70 }, …]`. Hand-written captions: copy
[templates/captions.ass](templates/captions.ass) (hook, label, line, boxed and AI-tag styles pre-set) and edit the
`Dialogue` lines. No libass? Make PNG caption cards and overlay them (recipe R9 in
[../short-form-editing/references/ffmpeg-recipes.md](../short-form-editing/references/ffmpeg-recipes.md)), or caption in the editor.

Caption copy rules: write what she says, cleaned (drop "um", keep her rhythm); lowercase for captions, uppercase only for
the hook title; one rose word per screen at most; spell-check; numbers as digits.

### 5. Write the post caption per platform

Structure: **line 1 = the hook restated or twisted** (it's what shows before "more") → optional line 2 (context) →
soft-question CTA → hashtags → labels. Limits and specifics (checked 2026-10; full table in the reference):

| Platform | Limit | Shape for Claudia |
|---|---|---|
| X | 280 chars standard (Premium 25,000; feed shows ~280); links count 23 | one line + label; 0–1 hashtag; at most one `$cashtag` per API post |
| TikTok | 4,000 in-app; **2,200 via API/scheduler** | 1–2 lines, 3–5 specific hashtags, AIGC toggle on |
| Instagram | 2,200; 30 hashtags max (3–5 recommended) | 1–3 lines, 3–5 hashtags, AI info label on |
| YouTube Shorts | title 100, description 5,000 | title = the hook (≤ 60 chars to avoid truncation); 1–3 hashtags in the description |
| Threads 500 · Bluesky 300 · Telegram 4,096 | | one or two lines; Bluesky/Mastodon get the text label `(AI-generated)` |

Example set (lounge clip):

```text
X:        sunglasses on = do not perceive me. sunglasses off = ok fine, hi
TikTok:   sunglasses on = do not perceive me 🖤 which one are you today?  #vintagelounge #thriftedstyle #aicharacter
IG:       grandma's lamp, my sunglasses, our secret. on or off? #vintagestyle #lamplight #aicharacter
YouTube:  title "sunglasses on = do not perceive me" · description "which one are you today? #shorts #aicharacter"
```

`@useclaudia/social` adds the labels for you in `preview()`: native AI flags where they exist (X `made_with_ai`,
YouTube `containsSyntheticMedia`, TikTok `is_aigc`, Instagram `is_ai_generated`) and the text `(AI-generated)` elsewhere,
plus "Not financial advice." when the text mentions a coin, price or contract address. Read the preview; don't strip them.

### 6. Hashtags: few and true

3–5 specific tags beat 30 generic ones. Mix: 1 topic (`#rainyday`), 1 format/community (`#vlog`, `#djset`), 1 identity
(`#aicharacter` or `#aiinfluencer` — honest and searchable). Never trending tags unrelated to the clip, never other
creators' names, never `#fyp`-style spam blocks. YouTube shows up to 3 hashtags above the title.

### 7. CTAs are soft questions

Yes: "rain or sunset tomorrow?", "rate the transition 1–10", "what should my agents make next?". No: "follow for part 2"
when there is no part 2, "comment 🔥 if…", "like if you agree", giveaways for follows, "tag 3 friends" — engagement bait
is down-ranked and against her voice. Never automate likes, follows or reply-farms.

### 8. Run the safety pass

- **AI label** on every post (platform flag + text where no flag exists). See [../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md).
- **Banned phrases** (also blocked by `@useclaudia/social`): "100x", "10x", "guaranteed (returns)", "can't lose",
  "risk-free", "to the moon", "will hit $…", "will pump/moon/double", "easy money", "% daily returns", "not a scam",
  "last chance to buy".
- **Coins:** any coin mention ends with "not financial advice"; no buy calls; TikTok removes crypto promotion (no
  tickers, no calls to buy, education/news only); UK: crypto promotions are FCA-regulated — don't invite UK users to buy;
  EU MiCA: marketing must be fair, clear, marked as marketing. See [../../grow/crypto-marketing-compliance/SKILL.md](../../grow/crypto-marketing-compliance/SKILL.md).
- **Paid or gifted:** `#ad` at the start of the caption plus the platform's paid-partnership toggle.
- **People:** no @-mentions of people who didn't ask (X's API only allows replies when summoned, checked 2026-10).

## Templates

- [templates/captions.ass](templates/captions.ass) — brand ASS styles (Hook, Line, Box, Label, AITag) with positions.
- [templates/post-caption-sheet.md](templates/post-caption-sheet.md) — fill-in sheet: hook triple + per-platform copy + checks.
- [scripts/words-to-ass.mjs](scripts/words-to-ass.mjs) — word timings → word-by-word highlighted ASS.
- [examples/lounge-reveal-captions.md](examples/lounge-reveal-captions.md) — the sunglasses clip, hook to posted copy.

## Check before you finish

- [ ] Hook triple agrees: visual moves in frame 1, text up by 0.2 s and ≤ 6 words, first sound confirms it.
- [ ] Captions inside the centred ~900×1400 zone; nothing over her mouth or under the app rails.
- [ ] Captions match the audio word for word (cleaned), spelled right, one rose word per screen max.
- [ ] Post caption within each platform's limit; line 1 works alone.
- [ ] 3–5 honest hashtags; soft-question CTA; no engagement bait.
- [ ] AI label present (native flag or text); `#ad` if paid/gifted; NFA on any coin mention; no banned phrase.
- [ ] She names no AI model and doesn't claim to be human.
- [ ] A person approved the copy before publishing.

## Pitfalls

- **Text that fights the picture.** If the hook text says "wait for the drop" and the drop is at 9 s, viewers leave at 3.
- **Captions under the UI.** Bottom-third captions look fine in the editor and vanish on the phone.
- **Caption soup.** Five words highlighted in five colours. One accent, one active word.
- **Hook recycled across platforms verbatim with the same video** on the same day can trip near-duplicate rules
  (`@useclaudia/social` blocks same text to the same account within 24 h).
- **Hashtag stuffing** reads as spam and dilutes topic signals.
- **Dropping labels to "look organic".** It breaks platform rules and her own "never" list.
- **Hype voice.** "INSANE", "game-changer", 🚀 — not her.

## Related skills

- [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md) · [../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md) · [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md)
- [../thumbnails-and-covers/SKILL.md](../thumbnails-and-covers/SKILL.md) · [../content-pillars-and-series/SKILL.md](../content-pillars-and-series/SKILL.md) · [../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)
- [../../grow/x-playbook/SKILL.md](../../grow/x-playbook/SKILL.md) · [../../grow/tiktok-playbook/SKILL.md](../../grow/tiktok-playbook/SKILL.md) · [../../grow/instagram-reels-playbook/SKILL.md](../../grow/instagram-reels-playbook/SKILL.md) · [../../grow/youtube-shorts-playbook/SKILL.md](../../grow/youtube-shorts-playbook/SKILL.md)
- [../../grow/engagement-and-replies/SKILL.md](../../grow/engagement-and-replies/SKILL.md) · [../../grow/crypto-marketing-compliance/SKILL.md](../../grow/crypto-marketing-compliance/SKILL.md) · [../../grow/brand-deals-and-sponsorships/SKILL.md](../../grow/brand-deals-and-sponsorships/SKILL.md)
