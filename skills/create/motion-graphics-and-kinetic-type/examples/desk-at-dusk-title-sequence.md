# Worked example: "Desk at Dusk" ep. 12 title sequence

A 12-second vertical short for Claudia's "Desk at Dusk" series: she sits at her desk at dusk, laptop glow with the
chrome star sticker, and the hook is "one question rebuilt my week". The type has to carry the hook with sound off,
name her once, and land on the beat of a 118 BPM lo-fi track. Route A (HTML layer + overlay), because the agent runs
it headless on an ffmpeg without freetype or libass.

## Inputs

- `work/desk-12.mp4`: 12.0 s, 1080×1920, 30 fps, already trimmed and graded
  ([../../short-form-editing/SKILL.md](../../short-form-editing/SKILL.md)). AI-generated video.
- `work/lofi-118.wav`: generated instrumental, 118 BPM, logged in the music licence log. After trimming, the first
  kick lands at 0.42 s.

## 1. Beat grid

```sh
node scripts/beat-grid.mjs --bpm 118 --offset 0.42 --beats 9
```

```text
beat,bar,beat_in_bar,time_s,frame,downbeat
0,1,1,0.42,13,yes
1,1,2,0.928,28,
2,1,3,1.437,43,
3,1,4,1.945,58,
4,2,1,2.454,74,yes
5,2,2,2.962,89,
6,2,3,3.471,104,
7,2,4,3.979,119,
8,3,1,4.488,135,yes
# 118 BPM = 0.508 s per beat = 15.254 frames at 30 fps; a bar of 4 = 2.034 s
```

## 2. Plan (from templates/motion-brief.md)

| # | Element | Text | In | Out | Move |
|---|---|---|---|---|---|
| 1 | Title card + label | `ep. 12 · desk at dusk` / `ONE QUESTION REBUILT MY WEEK` (accent on REBUILT) | beat 0 (0.42 s) | beat 8 (4.49 s) | up 80 px, 0.35 s |
| 2 | Lower third | `Claudia` / `AI character · useclaudia.xyz` | beat 8 (4.49 s) | beat 20 (10.58 s) | left 120 px, 0.35 s |
| 3 | AI tag | `AI-GENERATED` | 0 | end | none |

Five words in the title over 4 s is ~1.2 words per second: easy to read twice. The lower third arrives exactly as the
title leaves, on the same downbeat, so only one element moves at a time.

## 3. Render the layers

The title text in `templates/title-card.html` already matches. One copy of the template per episode:

```sh
cp templates/title-card.html work/ep12.html     # edit the label, title and lower-third text if needed
sh scripts/render-layer.sh "work/ep12.html?only=title" work/title.png
sh scripts/render-layer.sh "work/ep12.html?only=l3"    work/l3.png
sh scripts/render-layer.sh "work/ep12.html?only=aitag" work/aitag.png
```

Each PNG is 1080×1920 RGBA, transparent everywhere except its element (the lower third's box measures x 90–694,
y 1240–1382: inside the safe zone).

## 4. Timings that land on beats

```sh
node scripts/beat-grid.mjs --bpm 118 --offset 0.42 --layer title:0-8 --layer l3:8-20
```

```text
# animate-layer.sh timings: the arrival ends on the first beat, the exit starts on the second
sh scripts/animate-layer.sh <in.mp4> title.png <out.mp4> 0.07 4.838 left 120 0.35   # in on beat 0 (0.42 s), out from beat 8
sh scripts/animate-layer.sh <in.mp4> l3.png <out.mp4> 4.138 10.939 left 120 0.35   # in on beat 8 (4.488 s), out from beat 20
```

## 5. Composite

```sh
sh scripts/animate-layer.sh work/desk-12.mp4 work/title.png work/s1.mp4 0.07 4.838 up 80 0.35
sh scripts/animate-layer.sh work/s1.mp4      work/l3.png    work/s2.mp4 4.138 10.939 left 120 0.35
sh scripts/animate-layer.sh work/s2.mp4      work/aitag.png work/s3.mp4 0 12 none 0 0.2
```

The same three commands were run on a 1080×1920 test pattern on 2026-10-12 (ffmpeg 8.1): a contact sheet at frames 9,
20, 45 and 130 showed the title mid-fade, the title settled, the lower third settled, and the lower third sliding out.

Then mux the music and export with the master spec (H.264 High, yuv420p, AAC 48 kHz, -14 LUFS) from
[../../short-form-editing/SKILL.md](../../short-form-editing/SKILL.md).

## 6. Check on a phone

- Exported frame 2.0 s under the TikTok and Reels UI: title clear of the top bar, lower third clear of the caption
  area and the right rail.
- Read the title out loud at speed: it fits in under 2 s, it stays 4 s.
- Post caption: `one question rebuilt my week. which post made you follow someone?` with the platform's AI label on.
  No hashtags in the burned-in text.

## What changed after review

The first pass used a 0.5 s ease. At 118 BPM it felt late, because the move finished a quarter-beat after the kick.
0.35 s with the arrival computed back from the beat fixed it. The rose accent originally sat on "WEEK"; moved to
"REBUILT" because the verb is the hook.
