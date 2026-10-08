---
name: short-form-editing
description: Edits AI-generated clips into publishable 9:16 shorts for TikTok, Reels, YouTube Shorts and X — trimming morph frames, cutting on motion, stitching two generations into one take, speed ramps, J/L cuts, seamless loops, matching colour across models with one warm film grade, two-pass loudness to -14 LUFS, burned-in captions, 1:1 face crops, posters and per-platform export presets. Covers CapCut (2026 US status, commercial-asset licence trap), DaVinci Resolve 20/21 (standard vs Studio) and Premiere 26.3, plus a fully scriptable, tested ffmpeg pipeline. Use when turning generated video into a finished short, when automating edits in an agent, or when exports get rejected, crushed or out of sync.
license: MIT
metadata:
  title: "Short-form editing"
  category: create
  summary: "Turn raw AI clips into clean 9:16 shorts: trims, stitches, grade, loudness, captions and exports — in an editor or with ffmpeg."
  level: intermediate
  tags: "editing, ffmpeg, capcut, davinci resolve, premiere, 9:16, shorts, loudness, color grade, export"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "20–40 min per short (editor) · 2 min (scripted)"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Short-form editing

Raw AI clips are not posts. They start with a half-second of "settling", end with a morph or a freeze, differ in colour
from model to model, and arrive silent or at random loudness. This skill takes one or more generations and returns a
finished vertical master — trimmed, stitched, graded, captioned, at -14 LUFS — plus the per-platform exports, a 1:1 face
crop and a poster. Everything can be done in an editor or scripted with the tested ffmpeg recipes in `scripts/` and
[references/ffmpeg-recipes.md](references/ffmpeg-recipes.md).

## When to use this

- You have generated clips (from [../video-prompting/SKILL.md](../video-prompting/SKILL.md) or
  [../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md)) and need a postable short.
- An agent must edit without a GUI (batch runs, an autonomous posting loop).
- Exports are rejected, look soft, have black bars, are too quiet or too loud, or the audio drifts.
- You need the site-style deliverables: a vertical MP4, a `-sq` 1:1 face crop, and a poster JPG.

## What you need

- The clips, each with its `@useclaudia/media` sidecar (`<file>.json` provenance — keep it; disclosure uses it).
- ffmpeg 6+ (`ffmpeg -version`). For burned-in captions or drawn text you need a build with **libass** and **freetype**:
  check with `ffmpeg -hide_banner -filters | grep -E " (subtitles|drawtext) "`. Slim builds (this repo's test machine's
  ffmpeg 8.1 included) lack both — then burn captions in an editor or overlay PNG caption cards (recipe R9).
- Optional editor: CapCut, DaVinci Resolve 21 or Adobe Premiere 26.x (notes in [references/editor-notes.md](references/editor-notes.md)).
- Licensed fonts and music (see [../music-and-sound-for-shorts/SKILL.md](../music-and-sound-for-shorts/SKILL.md) and
  [../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md)).
- Read [references/platform-export-specs.md](references/platform-export-specs.md) before exporting (lengths, sizes, safe zones, checked 2026-10).

## Steps

### 1. Review every clip at quarter speed

AI video fails in a few predictable places. Scrub each clip at 0.25× (or dump frames:
`ffmpeg -i clip.mp4 -vf "fps=4,scale=270:-2,tile=8x2" -frames:v 1 sheet.jpg`) and mark:

| Look for | Where it usually is | Action |
|---|---|---|
| "Settling" — frozen face, then motion starts | first 0.3–0.8 s | trim the head |
| Morph / melt / freeze | last 0.5–1 s, and during fast turns | trim the tail; cut before the turn |
| Hand or phone melting | arm-length selfies, waves | cut on the motion, punch in to crop it out |
| Face drift (eyes, age, streaks) | mid-clip after a big head turn | cut out those frames; score with [../character-consistency/SKILL.md](../character-consistency/SKILL.md) |
| Garbled text/logos | screens, signs, shirts | crop, blur (`boxblur` on a region) or cut |
| Flicker | neon/club scenes | `deflicker=mode=pm:size=5` |

Write the keep-ranges into the edit decision list ([templates/edit-decision-list.csv](templates/edit-decision-list.csv)).

### 2. Conform every clip to one master format

Different models output 720×1280, 1080×1920, 24 or 30 fps, with or without audio. Conform first, edit second:

```sh
sh scripts/conform.sh raw/rain-a.mp4 work/rain-a.mp4 30      # cover-fill crop to 1080x1920, 30 fps, H.264 High, CRF 18
sh scripts/conform.sh raw/lounge.mp4 work/lounge.mp4 24      # keep 24 fps for the filmic lounge clip
```

Pick **one** frame rate per short: 30 for UGC/selfie energy, 24 for cinematic (lounge, sunset). Don't mix. If a model
gives 16:9, put it in 9:16 over a blurred copy of itself (recipe R4) rather than letterboxing in black.

### 3. Cut to the rhythm of short-form

- **Hook (0–1.5 s):** one or two shots of 0.5–1.5 s each. Start mid-action: the laugh, the sunglasses lift, the first
  stride in the rain. Never start on the settling frames.
- **Body:** shots of 1.5–3 s. Cut **on motion** (a hand moving, a head turn, a camera whip) — the eye forgives a cut
  during movement and it hides morph frames.
- **Payoff:** let the best moment run 2–4 s; if the clip loops, end on a frame that matches the first (recipe R7).
- **Jump cuts** in talking-to-camera clips are normal; add a 1.1–1.15× punch-in on alternate cuts so they read as
  intentional (recipe R5).
- Total length: 7–15 s for UGC moments, 20–45 s for storytime/how-to (see [../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md)).

### 4. Stitch two generations into one continuous take

Most models top out at 8–15 s per generation (checked 2026-10). For a 13 s running-in-the-rain take:

1. Generate clip A (8 s). Extract its **last clean frame** (before the tail morph):
   `ffmpeg -sseof -0.6 -i a.mp4 -frames:v 1 -q:v 2 a-last.jpg`.
2. Generate clip B image-to-video **from `a-last.jpg`** with the same prompt and "continuous motion, same pace".
3. Join with a 0.3 s crossfade on motion (recipe R2) or a hard cut during an arm swing.

Full walk-through with commands and costs: [examples/rain-13s-stitch.md](examples/rain-13s-stitch.md).

### 5. Speed ramps, J-cuts and L-cuts

- **Speed ramp:** slow the peak moment (0.5×) and speed the approach (1.5×) — e.g. normal → slow sunglasses lift →
  quick return. Recipe R3. Ramp only segments without lip-sync, or the mouth will drift.
- **L-cut:** the picture cuts, the previous clip's sound carries 0.4–0.8 s under the next shot (her laugh trails into
  the club shot). **J-cut:** the next clip's sound starts before its picture (club bass leaks in under the bedroom shot).
  Recipe R6. These make stitched AI clips feel like one continuous moment.

### 6. Match colour across models, then grade once

Clips from different models disagree on white balance, contrast and saturation. Two passes:

1. **Match:** pull a frame from each (`-ss 2 -frames:v 1`), compare skin on her cheek and the whites. Correct each clip to
   the hero clip with `eq` and `colorbalance` (small steps: ±0.02–0.05).
2. **Grade:** apply the shared Claudia look to everything — warm skin, lifted blacks, gentle grain, soft vignette:

```sh
ffmpeg -i in.mp4 -vf "eq=contrast=1.05:saturation=1.06:gamma=0.98,colorbalance=rs=0.04:bs=-0.04:rm=0.02:bm=-0.03,\
curves=all='0/0.04 1/0.96',noise=alls=7:allf=t+u,vignette=PI/5,format=yuv420p" -c:v libx264 -crf 18 -c:a copy graded.mp4
```

For club/neon clips use `colorbalance=bs=0.03:bm=0.02` instead (keep the blue-violet, push rose highlights) — never
green. If the team has a `.cube` LUT, `lut3d=file=claudia-warm.cube` replaces the eq/colorbalance pair.

### 7. Sound, then loudness

Lay ambience → SFX → music → voice (details in [../music-and-sound-for-shorts/SKILL.md](../music-and-sound-for-shorts/SKILL.md)),
duck the music under speech (recipe R8), then normalise the final mix:

```sh
sh scripts/loudnorm.sh work/mix.mp4 work/mix-norm.mp4     # two-pass, -14 LUFS integrated, -1 dBTP true peak
```

-14 LUFS / -1 dBTP is safe on every platform; YouTube only turns loud audio down, never quiet audio up (checked 2026-10).

### 8. Captions

Burn word-by-word or line captions inside the safe zone (≈900×1400 centred; keep the bottom ~320 px and right ~120 px
clear, checked 2026-10). Styling, ASS template and hook text: [../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md).

```sh
sh scripts/burn-captions.sh work/graded.mp4 captions/rain.ass work/captioned.mp4 fonts/   # needs libass; exits 4 with options if missing
```

### 9. Export the deliverables

| Deliverable | Spec | Command |
|---|---|---|
| Vertical master | 1080×1920, H.264 High, yuv420p, CRF 18, AAC 192k 48 kHz, `+faststart` | output of steps 2–8 |
| Per-platform files | see the table in [references/platform-export-specs.md](references/platform-export-specs.md) | recipe R10 |
| 1:1 face crop (`-sq`) | 720×720 or 1080×1080, face centred, silent | `ffmpeg -i master.mp4 -vf "crop=1080:1080:0:240,scale=720:720" -an -c:v libx264 -crf 22 -movflags +faststart name-sq.mp4` |
| Poster | JPG q 3, the hero frame | `ffmpeg -ss 1.5 -i master.mp4 -frames:v 1 -q:v 3 name-poster.jpg` (or `-vf thumbnail=n=60` to auto-pick) |
| Provenance | the media sidecar(s) + an edit note | copy `*.mp4.json` next to the master; add `"edit": "trimmed, stitched, graded, captioned"` |

Adjust the crop `y` (240 above) so her face sits in the middle of the square — check the poster before batch exporting.

### 10. Label and hand off

The file is AI-generated: set the platform's AI label at upload (TikTok AIGC toggle, YouTube "altered or synthetic",
Meta "AI info"; `@useclaudia/social` sets the native flags) — see [../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md).
A person approves the final file before anything is published ([../../build/social-publishing/SKILL.md](../../build/social-publishing/SKILL.md)).

## Templates

- [templates/edit-decision-list.csv](templates/edit-decision-list.csv) — shot-by-shot keep ranges, transitions, speed, audio.
- [templates/export-checklist.md](templates/export-checklist.md) — the pre-publish technical and safety checklist.
- [scripts/conform.sh](scripts/conform.sh) · [scripts/loudnorm.sh](scripts/loudnorm.sh) · [scripts/burn-captions.sh](scripts/burn-captions.sh) — POSIX sh, no network, tested with ffmpeg 8.1.
- [references/ffmpeg-recipes.md](references/ffmpeg-recipes.md) — R1–R12, every recipe tested on the owner's clips.
- [examples/rain-13s-stitch.md](examples/rain-13s-stitch.md) — two generations → one 13 s rain selfie, start to export.

## Check before you finish

- [ ] No settling frames at the start, no morph/freeze at the end, no melted hands or garbled text on screen.
- [ ] Every shot scores ≥ 6/7 on the drift check; she reads as a woman in her late twenties throughout.
- [ ] One frame rate, 1080×1920, yuv420p, `+faststart`; plays in QuickTime/VLC and on a phone.
- [ ] Mix measured at about -14 LUFS, true peak ≤ -1 dBTP; music ducked under speech.
- [ ] Captions inside the safe zone; nothing important under the right-hand buttons or bottom caption bar.
- [ ] Every asset (music, SFX, fonts, editor templates/stickers) is cleared for this account type (business vs personal).
- [ ] Provenance sidecars kept; AI label planned for every platform; a person approved the final cut.

## Pitfalls

- **CapCut licence trap.** CapCut's materials are split into personal-use and commercial-use; one personal-only asset
  (a sticker, a template, a track) makes the whole export personal-only, and its built-in music is not cleared for
  commercial use (checked 2026-10). Branded or business accounts: use only commercial-labelled assets or none.
- **Mixed frame rates** cause stutter after concat. Conform first.
- **`-c copy` concat** of clips from different models fails or desyncs — re-encode via conform, then concat.
- **Speed-ramping lip-synced speech** breaks the sync. Ramp B-roll only.
- **Grading before matching** bakes the mismatch in. Match, then grade.
- **Over-grain.** `noise=alls` above ~10 turns into mush after platform compression.
- **"Face Age"/beauty tools** in editors (Resolve 21 Studio has Face Age and Reshaper): never use them to make her look
  younger; keep her adult.
- **Burned captions in the bottom 320 px** get hidden by the caption bar and buttons.
- **Exporting at 720p "because the model did"** — upscale-conform to 1080×1920; platforms compress 720p uploads harder.

## Related skills

- [../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md) · [../video-prompting/SKILL.md](../video-prompting/SKILL.md) · [../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md)
- [../music-and-sound-for-shorts/SKILL.md](../music-and-sound-for-shorts/SKILL.md) · [../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md) · [../thumbnails-and-covers/SKILL.md](../thumbnails-and-covers/SKILL.md)
- [../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md) · [../batch-content-production/SKILL.md](../batch-content-production/SKILL.md) · [../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)
- [../../grow/tiktok-playbook/SKILL.md](../../grow/tiktok-playbook/SKILL.md) · [../../grow/instagram-reels-playbook/SKILL.md](../../grow/instagram-reels-playbook/SKILL.md) · [../../grow/youtube-shorts-playbook/SKILL.md](../../grow/youtube-shorts-playbook/SKILL.md) · [../../grow/x-playbook/SKILL.md](../../grow/x-playbook/SKILL.md)
- [../../build/media-pipelines/SKILL.md](../../build/media-pipelines/SKILL.md)
