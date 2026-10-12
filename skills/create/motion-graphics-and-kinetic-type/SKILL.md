---
name: motion-graphics-and-kinetic-type
description: Adds animated text and simple motion to vertical shorts — title cards, lower thirds, word-per-beat kinetic type, end cards and an on-screen AI tag — timed to the music's beat, kept inside the app safe zones and exported to the master spec. Covers four routes (an HTML layer animated with a tested ffmpeg overlay script that works on any build, ASS word slams, ffmpeg drawtext, and editors like CapCut, Resolve and Premiere) plus AI video as a moving background with the text added afterwards. Use when a short needs a title card, a lower third, kinetic captions, animated text, a series intro or end card, or when text has to hit the beat.
license: MIT
metadata:
  title: "Motion graphics and kinetic type"
  category: create
  summary: "Title cards, lower thirds and word-per-beat type for shorts: on the beat, in the safe zone, rendered with any ffmpeg or an editor."
  level: intermediate
  tags: "motion graphics, kinetic type, lower thirds, title cards, animated text, ffmpeg, beat sync, safe zones"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "20–40 min per short (first time 1 h)"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Motion graphics and kinetic type

Good motion type does three jobs in a short: it carries the hook for sound-off viewers, it names who or what is on
screen, and it makes the cut feel musical. This skill plans the text from the script and the beat, builds it as
reusable layers (a title card, a lower third, word slams, an AI tag), lands every move on a beat, and exports a master
that reads cleanly under every app's buttons.

## When to use this

- A short needs a series title card, a "who is this" lower third, or an end card.
- Kinetic captions: one word per beat, popping in time with the music.
- An agent has to add titles headless, on an ffmpeg build without freetype or libass.
- A recurring series needs the same intro look every week.
- Text in a generated video came out garbled and must be replaced with real type.

Not for: full word-by-word speech captions (use [captions-and-hooks](../captions-and-hooks/SKILL.md)) or static
covers ([thumbnails-and-covers](../thumbnails-and-covers/SKILL.md)).

## What you need

- A trimmed, graded vertical clip (1080×1920) from [short-form-editing](../short-form-editing/SKILL.md), and the music
  track with its BPM.
- ffmpeg 6+ and ffprobe. Check what your build can do: `ffmpeg -hide_banner -filters | grep -E " (drawtext|subtitles) "`.
  Neither is required for route A.
- Google Chrome or Chromium for [scripts/render-layer.sh](scripts/render-layer.sh) (HTML → transparent PNG).
- Node ≥ 20 for [scripts/beat-grid.mjs](scripts/beat-grid.mjs).
- Licensed fonts. The template uses Barlow Condensed, DM Sans and DM Mono (SIL Open Font License) from Google Fonts.
- Optional: CapCut, DaVinci Resolve, Premiere or After Effects; a video model key for moving backgrounds
  (`claudia keys set fal|google|runway|byteplus`).
- Read [references/timing-and-beats.md](references/timing-and-beats.md) before placing text, and
  [references/motion-recipes.md](references/motion-recipes.md) when you build it.

## Steps

1. **Write the words before the motion.** List every text element with its exact wording in
   [templates/motion-brief.md](templates/motion-brief.md): series label, title (1–5 words, one accent word at most),
   lower third (name ≤ 24 characters, role ≤ 36), word slams, end card, and the `AI-GENERATED` tag if the visuals are
   AI. In Claudia's voice: lowercase-leaning labels, uppercase only for the display title, no hype words, no price or
   "buy" language. Spell-check now; fixing a typo after rendering costs a full re-render.

2. **Build the beat grid.** Find the BPM and the first downbeat *in the edited clip*, then print the grid:

   ```sh
   node scripts/beat-grid.mjs --bpm 118 --offset 0.42 --beats 16
   ```

   Seconds per beat = 60 ÷ BPM (118 BPM = 0.508 s, 15.3 frames at 30 fps). Arrivals of the main text go on downbeats;
   off-beats are for small accents. Read [references/timing-and-beats.md](references/timing-and-beats.md) for the table
   of what lands where.

3. **Check reading time and position.** Each word needs at least 0.45 s; lines run at about 3 words per second; titles
   stay 1.5–3 s, lower thirds 3–6 s. At 128 BPM or faster, one word per beat is the limit, so slam every 2 beats.
   Place everything inside the centred ~900×1400 area: title centre y = 420–560, word slams y = 760–880, lower third
   top y ≈ 1240 and bottom above y = 1500, nothing right of x = 960 (third-party safe-zone measurements, checked
   2026-10). Only one element moves at a time.

4. **Pick a route and build the layers.** Route A works everywhere and is what agents should use:

   ```sh
   cp templates/title-card.html work/ep12.html              # edit :root values and the text
   sh scripts/render-layer.sh "work/ep12.html?only=title" work/title.png
   sh scripts/render-layer.sh "work/ep12.html?only=l3"    work/l3.png
   sh scripts/render-layer.sh "work/ep12.html?only=aitag" work/aitag.png
   ```

   Word slams: `node scripts/beat-grid.mjs --bpm 118 --offset 0.42 --words "SILVER|FOIL|AND A|DEADLINE" --every 2
   --accent deadline --out work/words.ass` (needs libass to burn, or import into an editor). drawtext and editor
   routes are in [references/motion-recipes.md](references/motion-recipes.md).

5. **Land each move on the beat.** Let the script compute start and end so the arrival *finishes* on the beat and the
   exit *starts* on one:

   ```sh
   node scripts/beat-grid.mjs --bpm 118 --offset 0.42 --layer title:0-8 --layer l3:8-20 --ease 0.35
   sh scripts/animate-layer.sh work/clip.mp4 work/title.png work/s1.mp4 0.07 4.838 up 80 0.35
   sh scripts/animate-layer.sh work/s1.mp4   work/l3.png    work/s2.mp4 4.138 10.939 left 120 0.35
   sh scripts/animate-layer.sh work/s2.mp4   work/aitag.png work/s3.mp4 0 12 none 0 0.2
   ```

   `animate-layer.sh` fades the layer's alpha and moves it with a cubic ease-out, then reverses (tested 2026-10-12 on
   ffmpeg 8.1 without freetype or libass). Snappy feel: 0.25–0.3 s and 60–100 px; calm: 0.4–0.5 s and 30–60 px.

6. **Use AI video only behind the type.** Video models still morph letters between frames, so never ship text a
   model drew. Generate a clean moving background with empty space where the title sits ("negative space in the upper
   third, no text, no signs, no logos"), price it first with
   `claudia generate video "<prompt>" --aspect 9:16 --duration 5 --dry-run`, then add the type with step 4. The result
   is AI-generated media: keep the provenance sidecar and the AI tag.

7. **Export and view it on a phone.** Mux the music and export to the master spec from
   [short-form-editing](../short-form-editing/SKILL.md) (1080×1920, H.264 High, yuv420p, AAC 48 kHz, about -14 LUFS).
   Grab frames at each text's midpoint (`ffmpeg -ss 2.0 -i out.mp4 -frames:v 1 check.jpg`) and look at them under the
   TikTok, Reels and Shorts UI. Then set the platform AI label at upload
   ([ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md)) and get a person's approval before it
   posts.

8. **Save the look as a series kit.** Keep the edited HTML, the fonts list, the accent, the ease and offset values and
   the beat-grid command with the episode. Next week only the words change. In an editor, save the lower third as a
   preset or Essential Graphics template. A series look comes from repetition.

## Templates

- [templates/title-card.html](templates/title-card.html) — title card, lower third and AI tag on one transparent
  1080×1920 layer; render one block at a time with `?only=title|l3|aitag`.
- [templates/motion-brief.md](templates/motion-brief.md) — the plan: every element, its words, beats, position, move
  and the checks.
- [scripts/beat-grid.mjs](scripts/beat-grid.mjs) — BPM → beat times and frames, word-per-beat ASS, layer timings.
- [scripts/render-layer.sh](scripts/render-layer.sh) — HTML → PNG with alpha (headless Chrome).
- [scripts/animate-layer.sh](scripts/animate-layer.sh) — eased slide + fade of a layer onto video, any ffmpeg build.
- [examples/desk-at-dusk-title-sequence.md](examples/desk-at-dusk-title-sequence.md) — a 12 s, 118 BPM episode end to
  end.

Quick element line for a brief:

```text
<#> <element> · "<exact text>" · in beat <b> (<s> s) · out beat <b> (<s> s) · y=<px> · <move> <px> · ease <s> · accent: <word or none>
```

## Check before you finish

- [ ] Every word matches the script; names, handles and numbers checked.
- [ ] All text inside the centred ~900×1400 area, clear of the right rail and the bottom caption area, checked on a
      phone-sized frame.
- [ ] Each word on screen ≥ 0.45 s; titles 1.5–3 s; lower thirds 3–6 s; one element moving at a time.
- [ ] Main arrivals land on downbeats (the grid and the frame numbers agree).
- [ ] One display font, one text font, one accent colour; fonts are licensed for commercial use.
- [ ] No model-drawn text left in the frame; garbled signs blurred or cropped.
- [ ] AI tag on screen when the visuals are AI, platform AI label set, provenance kept.
- [ ] No price, return or "buy" wording; `#ad` and the paid-partnership toggle if the post is paid or gifted.
- [ ] A person approved the final export before it published.

## Pitfalls

- **Text that moves on the off-beat by accident.** A 0.5 s ease that *starts* on the beat finishes late. Compute the
  start back from the beat (step 5).
- **Too many moving parts.** Title, lower third and stickers all animating at once reads as noise. One at a time.
- **Word slams at 140 BPM, one per beat.** 0.43 s per word is under the reading floor. Slam every 2 beats.
- **Positions copied from a 16:9 template.** Lower thirds at the very bottom vanish under the caption bar on every app.
- **Trusting AI video for typography.** Even a good first frame drifts by frame 30. Add type afterwards.
- **Font look-alikes of another brand.** Don't imitate a famous channel's or brand's title style; it confuses viewers
  and can raise trademark problems.
- **Animating the AI tag away.** It stays on screen for the whole clip when the visuals are AI.
- **Re-rendering everything for a typo.** Keep each element as its own PNG so a fix is one render and one overlay.

## Related skills

- [short-form-editing](../short-form-editing/SKILL.md) — the cut, grade, loudness and export the type sits on.
- [captions-and-hooks](../captions-and-hooks/SKILL.md) — speech captions and the hook triple.
- [music-and-sound-for-shorts](../music-and-sound-for-shorts/SKILL.md) — tracks, BPM and licences.
- [storyboarding-shorts](../storyboarding-shorts/SKILL.md) — where the title and lower third sit in the beat sheet.
- [sonic-branding-and-jingles](../sonic-branding-and-jingles/SKILL.md) — a series sting to pair with the title card.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels and content credentials.
