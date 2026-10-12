# Example: a 58-minute podcast episode into 11 assets

**Late Desk** is a fictional video podcast about creator tools, hosted by Tomi (they/them), a human creator. Episode 41
(58 minutes, 1080p, two cameras) has one guest: Claudia, an AI character, appearing as a talking avatar on a screen
in the studio, with her operator answering in her voice through an approved script-and-reply setup. Tomi does the
repurposing with an agent drafting and Tomi approving.

## Step 1: rights and consent

- Claudia's operator agreed in writing (DM, 2026-10-05) to clips, quote cards and a carousel, on the condition that
  every asset with Claudia in it carries the AI label. Logged in the plan.
- Skip list:
  - 12:40–13:55: a song playing from Tomi's phone while they laughed about it (claim risk).
  - 31:10–31:40: Tomi mentions a friend's new job before it is public.
  - 44:00–45:30: sponsor read (a microphone brand). Clippable only with `#ad`; Tomi chose not to clip it.

## Step 2: transcript

```sh
ffmpeg -i late-desk-41.mp4 -ar 16000 -ac 1 -c:a pcm_s16le work/ld41.wav
./build/bin/whisper-cli -m models/ggml-large-v3-turbo.bin -f work/ld41.wav -l en -otxt -osrt -ml 60 -sow -of work/ld41
```

Fixes by hand: "useclaudia dot x y z" → `useclaudia.xyz`, "M.C.P." → "MCP", the guest's name spelled "Claudio" in four
places, two numbers ("forty" vs "fourteen").

## Step 3: moments

The agent proposed 20 moments with rubric scores. Tomi watched all 20 and picked 7. Four proposals that looked strong
in the transcript were dropped:

| Proposed | Why dropped |
|---|---|
| "this tool will 10x your channel" (Tomi, joking) | a results promise out of context; risk 2 |
| Claudia's long answer about agent memory (2:40) | no clean 60 s cut; standalone 2 |
| A laugh at 22:10 | funny only with the previous story; standalone 1 |
| Chat question about a coin | price talk; never clipped |

Kept (rubric total in brackets): M03 "I filmed this four times" story (23), M07 "the 3am post" (22), M09 Tomi's
"three things I stopped doing" list (24), M12 Claudia on labels (21), M14 Tomi on burnout (22), M16 one-line take
on thumbnails (20), M18 closing exchange (20).

## Step 4: the 11 assets

| # | Asset | Platforms | Source | AI parts | Label | Day |
|---|---|---|---|---|---|---|
| 1 | Clip "the 3am post" (38 s) | TikTok, Reels, Shorts | M07 | Claudia avatar on screen | AI flag on all three | 1 |
| 2 | Clip "three things I stopped doing" (52 s) | TikTok, Reels, Shorts | M09 | none (Tomi only) | none | 3 |
| 3 | Clip "I filmed this four times" (29 s) | TikTok, Reels | M03 | Claudia avatar | AI flag | 5 |
| 4 | Clip on burnout (44 s) | Reels, Shorts, LinkedIn | M14 | none | none | 6 |
| 5 | Quote card: "If your agent posts it, your name is still on it." (Claudia) | X, Instagram | M12 | Claudia portrait | "AI-generated image:" alt + AI flag | 2 |
| 6 | Quote card: "A thumbnail is a promise. Keep it in the first ten seconds." (Tomi) | X, LinkedIn | M16 | none | none | 4 |
| 7 | Carousel, 8 slides: "Three things I stopped doing" | Instagram, LinkedIn | M09 | none | none | 2 |
| 8 | X thread, 6 parts | X | whole episode | quotes Claudia in text | none needed for text; Claudia's quote attributed as "Claudia (AI character)" | 0 |
| 9 | Newsletter issue | email | whole episode | none | — | 1 |
| 10 | Threads post | Threads | M18 | none | none | 3 |
| 11 | Full episode upload | YouTube | — | Claudia avatar segments | altered or synthetic content: yes | 0 |

## Step 5: one clip, end to end (asset #1)

```sh
ffmpeg -ss 00:27:03.2 -to 00:27:41.4 -i late-desk-41.mp4 -c:v libx264 -crf 18 -c:a aac -b:a 192k work/c1.mp4
# two people side by side: the blurred-background layout (R4) keeps both in frame
# captions from the SRT segment, styled with captions-and-hooks, then:
sh ../short-form-editing/scripts/loudnorm.sh work/c1-cap.mp4 out/c1.mp4
```

The first frame is Tomi already saying "so your agent posted at 3am". The clip ends on Claudia's line and Tomi's laugh.

## Step 8: scheduling with approval

```ts
const clip = social.draft({
  text: "my guest's agent posted at 3am and it did numbers. would you let yours? full episode on the channel",
  media: [{ path: "./out/c1.mp4", alt: "Tomi and Claudia, an AI character shown as an avatar on a studio screen, laughing." }],
  targets: [{ account: tiktok.id }, { account: instagram.id }, { account: youtube.id, text: "my guest's agent posted at 3am" }],
  labels: { ai: true },
  options: { youtube: { title: "my guest's agent posted at 3am", shorts: true } },
});
social.submit(clip.id); // Tomi approves on their phone, then schedule() for day 1, 17:00 local
```

Asset #2 (Tomi only, no AI parts) went out with `labels: { ai: false }`.

## After 7 days

| # | Views | Follows | Clicks to episode | Note |
|---|---|---|---|---|
| 1 | 41,200 | 310 | 620 | best of the week; the AI-guest angle drove comments |
| 2 | 18,900 | 140 | 210 | the list format saved well |
| 7 | 6,400 (reach) | 55 | 90 | 1,100 saves: the carousel outlived the clip |
| 3 | 3,100 | 8 | 15 | the setup was needed after all; rubric "standalone" was too generous |

Lesson for episode 42: score "standalone" after watching the clip cold, not after hearing the episode.
