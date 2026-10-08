---
name: video-prompting
description: Writes and runs AI video prompts that keep a recurring character (Claudia or your own) on-model in 9:16 shorts — model choice per shot (Gemini Omni Flash, Veo 3.1 until its 2026-10-22 shutdown, Kling 2.6/3, Seedance 2.0, Hailuo 2.3, Wan 2.6, Runway Gen-4.5 and Aleph 2 edits), the image-to-video first-frame workflow, a six-slot prompt formula, camera-move and timing syntax per model, native audio vs. added audio, extension and stitching with ffmpeg, frame QA, and fixes for face drift, melting hands, streak flicker, teenage-looking drift and garbled text. Use when generating any video clip with a character in it, choosing a video model, or repairing a clip that drifted.
license: MIT
metadata:
  title: "Video prompting"
  category: create
  summary: "Prompt AI video that keeps her face: first frames, camera language, timing beats, audio, stitching and fixes per model."
  level: intermediate
  tags: "ai video, image to video, gemini omni, veo, kling, seedance, hailuo, wan, runway, camera moves"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "30 min first clip · 5 min per clip after"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Video prompting

Good character video is 80 % preparation: an approved first frame, one clear action per beat, one camera move, and an
explicit audio instruction. This skill gives you the model map, the prompt formula, per-model syntax and the repair kit,
using Claudia's four reference clips (lounge sunglasses reveal, DJ-booth dance, bedroom vlog, rain selfie) as worked cases.

## When to use this

- Generating any clip where Claudia (or your character) appears.
- Deciding which video model to pay for on a given shot.
- A clip came back with a different face, extra fingers, flickering streaks or a younger-looking her.
- Planning a clip longer than one generation (extension or stitching).

For phone-camera UGC formats (talking to camera, selfie walks, GRWM) go deeper in
[../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md). For multi-shot planning see
[../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md).

## What you need

- `@useclaudia/cli` and `@useclaudia/media`, with at least one video key: `claudia keys set fal` (Kling, Seedance, Hailuo,
  Wan), `google` (Omni Flash, Veo), `runway` or `byteplus`.
- An approved first-frame still at 9:16 for every shot (see [../photoreal-portrait-prompts/SKILL.md](../photoreal-portrait-prompts/SKILL.md)
  and [../lifestyle-scene-prompts/SKILL.md](../lifestyle-scene-prompts/SKILL.md)), scored 7/7 with
  [../character-consistency/SKILL.md](../character-consistency/SKILL.md).
- `ffmpeg` for last-frame extraction, stitching and QA.
- Spend limits set: in scripts `createMedia({ limits: { perJobUsd: 3, perDayUsd: 15, approveAboveUsd: 0.5 } })`; for the
  CLI, the same object under `media.limits` in `~/.claudia/config.json`
  (`{ "media": { "limits": { "perJobUsd": 3, "perDayUsd": 15, "approveAboveUsd": 0.5 } } }`). Video jobs routinely land
  above $0.50 and should wait for a person to approve.
- Read [references/model-cards.md](references/model-cards.md) before using a model for the first time, and
  [references/camera-and-motion-vocabulary.md](references/camera-and-motion-vocabulary.md) when writing camera language.

## Steps

### 1. Pick the model for the shot

Prices and limits are the package's model table and the providers' docs (checked 2026-10). OpenAI makes no video here:
the Sora API shut down on 2026-09-24.

| Shot type | First choice (package id) | Why | Length / cost per clip |
|---|---|---|---|
| Talking to camera with a spoken line | `fal/kling-3-pro` with audio, or `fal/wan-2.6` | native speech + lip movement, 3–15 s | 14 s ≈ $2.35 (Kling, $0.168/s with audio) · 15 s 720p ≈ $1.50 (Wan) |
| Subtle performance (smile, glance, sunglasses) | `fal/hailuo-2.3` | strong micro-expressions, cheap | 6 s $0.28 · 10 s $0.56; no aspect control — feed a 9:16 first frame |
| Dance / body motion | `fal/kling-2.6-pro` or `fal/kling-3-pro` | best body coherence; Kling Motion Control exists on Kling's own host | 10 s with audio $1.40 · 8 s no audio ≈ $0.90 (Kling 3) |
| Cinematic beat with sound design | `google/omni-flash` | native synced audio, timecoded prompts, refs | length set by the model (3–10 s); ≈ $0.10/s at 720p (estimate) |
| Same, until 2026-10-22 | `google/veo-3.1-fast` | 4/6/8 s, audio included, first+last frame, 3 asset refs | 8 s 720p $0.80 · 1080p $0.96 |
| Long single take | `fal/kling-3-pro` (to 15 s) or `fal/seedance-2.0` (4–15 s) | fewer stitches | Seedance 720p $0.30/s — expensive; see its face-ref rule below |
| Precise camera choreography | `runway/gen4.5` | follows sequenced camera instructions | 2–10 s, $0.12/s |
| Fix an existing clip (relight, remove a logo, change an object) | `runway/aleph2` | edits video instead of regenerating | $0.28/s, 56-credit minimum |

**Seedance 2.0 and realistic faces (checked 2026-10):** its API rejects reference images with realistic human faces
(HTTP 400) unless the image is ingested into ModelArk's asset library and referenced by `asset://` id; AI-generated virtual
characters are accepted there. Until you have done that ingestion for Claudia on your own ModelArk account, use Kling,
Omni, Hailuo or Wan for image-to-video of her face, and Seedance for shots where she is small, back-turned or absent.

### 2. Always start from an approved still

Text-to-video of a recurring face drifts every time. The workflow:

1. Generate the opening frame as an image at 9:16 (the exact pose the clip starts in).
2. Score it 7/7. Fix it in an image edit if needed — editing a still is ~20× cheaper than rerolling video.
3. Pass it as the first ref: `--ref first.jpg`. On models with last-frame support (Veo, Kling, Omni) add the end pose:
   `--ref first.jpg,last.jpg`. The package treats refs on video models as first and last frame (Veo: set
   `meta.refMode: "reference"` to use up to three as asset references instead; reference mode requires 8 s on Veo).

### 3. Write the prompt in six slots

```text
1 IDENTITY   Same woman as the first frame: <short ID block> + "her face, bob, copper bang streaks and orange clip stay identical"
2 ACTION     2–3 timed beats, one verb each (sways → slides sunglasses down → holds eye contact)
3 SCENE      the setting string from the bible, 1 sentence
4 CAMERA     ONE move + framing + height ("static medium shot at chest height, very slow push-in")
5 LIGHT      source, colour, grade ("warm tungsten lamp light, soft shadows, 35mm film grain")
6 AUDIO      dialogue in quotes, SFX, ambient, and "no music" unless you want the model's music
```

Keep it 60–120 words for Kling/Wan/Seedance (instructions near the end of long prompts get dropped, checked 2026-10),
40–70 for Hailuo, and use the timecoded form for Omni/Veo. Short identity block for video:

```text
Claudia, 28-year-old woman (adult), glossy black jaw-length bob, heavy straight bangs with copper-orange streak panels,
small orange hair clip, thin gold hoops, light freckles, warm brown eyes
```

### 4. Use each model's timing syntax

| Model | Beat syntax | Dialogue syntax | Notes (checked 2026-10) |
|---|---|---|---|
| Omni Flash | `[0-3s] …` `[3-6s] …` | speaker + line in quotes | order: subject/action → scene → camera/light → audio → structure; say "no music, just room tone" or it scores music |
| Veo 3.1 | `[00:00-00:02] …` | `Claudia says: "…"` · `SFX: …` · `Ambient noise: …` | 4/6/8 s; 1080p, 4K and reference mode need 8 s |
| Kling 3 | "0–3s: … 3–6s: …" or multi-shot "Shot 1 / Shot 2" | `Claudia (warm, amused, English): "…"` | 3–15 s; elements bind look (and voice) on Kling's own API |
| Seedance 2.0 | "Seconds 1-5: … Seconds 6-10: …"; "cut to" between shots | short lines in double quotes | 4–15 s; refs as `@Image1`, `@Video1`, `@Audio1`, one job each; write "no music" |
| Hailuo 2.3 | one sentence of action, then camera | none (treat as silent) | 6 or 10 s (1080p only at 6 s) |
| Wan 2.6 | "First… then… finally…" | quoted line; lip-sync is native | 5/10/15 s, 24 fps, multi-shot in one clip |
| Runway Gen-4.5 | sequenced sentences: "The camera…, then…" | none | 2–10 s; good at ordered camera moves |

### 5. Decide audio up front

- **Site loops and edits with music:** generate silent. On fal/BytePlus pass `meta.audio: false` — Kling 3 Pro drops from
  $0.168 to $0.112 per second (checked 2026-10). Add music in edit ([../music-and-sound-for-shorts/SKILL.md](../music-and-sound-for-shorts/SKILL.md)).
- **UGC realism:** keep native ambient audio (room tone, rain, crowd) and lines of dialogue; it is what makes a clip feel
  filmed on a phone. Write it explicitly.
- **Her voice must match across clips:** generate speech separately with her designed voice and lip-sync it
  ([../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md)) — native model voices differ per generation.

### 6. Estimate → dry run → approve → wait

```sh
claudia generate video "<prompt>" --model fal/kling-3-pro --ref frames/lounge-first.jpg \
  --aspect 9:16 --duration 8 --negative "teenager, childlike face, extra fingers, morphing face, flicker, text, logo" --dry-run
# the dry run prints the exact body — check that negative_prompt, duration and the image are in it
claudia generate video "<prompt>" --model fal/kling-3-pro --ref frames/lounge-first.jpg \
  --aspect 9:16 --duration 8 --max-usd 1.50
```

`--negative` is only useful where the model has a negative field (Kling and Wan on fal); Veo, Omni and Runway take none —
phrase exclusions positively ("her hand has five relaxed fingers").

In code (approval stays with a person):

```ts
import { createMedia, envKeys } from "@useclaudia/media";
const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 3, perDayUsd: 15, approveAboveUsd: 0.5 } });
const req = {
  kind: "video" as const, model: "fal/kling-3-pro", aspect: "9:16" as const, durationSec: 8,
  prompt: lounge, negativePrompt: "teenager, childlike face, extra fingers, morphing face, flicker, text, logo",
  refs: ["frames/lounge-first.jpg"], meta: { audio: false }, brand: "claudia",
};
console.log(media.estimate(req));            // ≈ $0.90, basis "$0.112 per second without audio"
const job = await media.generate(req);       // status "needs_approval" (above $0.50)
// a person clicks Approve in Claudia Local, or: await media.approve(job.id)
const done = await media.wait(job.id, { timeoutMs: 15 * 60_000 });
console.log(done.status, done.outputs[0]?.path, done.provenance);
await media.close();
```

Agents never approve their own jobs. Results download straight into `~/.claudia/media/library/YYYY-MM/` with a provenance
sidecar — keep it for the AI label ([../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)).

### 7. Extend or stitch for longer clips

One generation is 3–15 s depending on the model. For a 13–30 s piece:

```sh
# 1) last frame of clip A becomes the first frame of clip B
ffmpeg -sseof -0.2 -i a.mp4 -update 1 -q:v 2 a-last.jpg
claudia generate video "<beat 2 prompt>" --model fal/kling-3-pro --ref a-last.jpg --aspect 9:16 --duration 5 --max-usd 1
# 2) normalise both to the same size/fps, then a short crossfade (offset = length of A minus 0.25)
for f in a b; do ffmpeg -y -i $f.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" -an -c:v libx264 -crf 18 -pix_fmt yuv420p $f-n.mp4; done
ffmpeg -i a-n.mp4 -i b-n.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.25:offset=7.75,format=yuv420p[v]" \
  -map "[v]" -c:v libx264 -crf 18 -movflags +faststart ab.mp4
```

Hide joins on motion (a turn, an arm crossing the lens, a whip pan) rather than on a still face. Re-check the face in
the first second of clip B — a last frame with motion blur makes a weak anchor; step back a few frames
(`-sseof -0.6`) if needed.

### 8. QA every clip before it leaves the machine

```sh
ffmpeg -i clip.mp4 -vf "fps=1,scale=270:-1,tile=8x1" -frames:v 1 clip-sheet.jpg   # 1 frame per second, one strip
ffprobe -v error -show_entries stream=width,height,r_frame_rate:format=duration -of compact clip.mp4
```

Score the first, middle and last frame with the 7-point drift check. Then watch it once at full speed for flicker in the
streaks, hands passing in front of the face, and anything text-like in the background.

### 9. Repair the common failures

| Failure | Cause | Fix |
|---|---|---|
| Face drifts mid-clip | big head turns, long duration, weak first frame | shorter clip (≤ 8 s), keep her facing camera ±30°, add the last frame as `--ref first,last`, or split into two stitched beats |
| Looks younger as she moves | bob + bangs + wide-angle, laughing | "28-year-old woman (adult)" in slot 1, a first frame that clearly reads late twenties, avoid fisheye/ultra-wide; reject and reroll |
| Streak flicker / streaks spread | hair motion, coloured light | "her copper bang streaks stay fixed in place" in slot 1; less hair motion ("hair moves slightly"); in coloured light add "copper streaks remain orange under blue light" |
| Melting hands or phone | hands crossing the face, fast gestures | one gesture per beat, "one hand, five relaxed fingers", keep hands below chin or out of frame; Aleph 2 to repaint a bad second |
| Crowd faces merge (club) | many background people | "crowd softly out of focus, shallow depth of field"; fewer, darker silhouettes; never prompt identifiable people |
| Garbled signs/screens | models can't hold text | "no readable text, no logos"; add text in edit |
| Unwanted music / voice | model defaults | "no music, no dialogue, only room tone" in slot 6, or `meta.audio: false` |
| Camera does two moves at once | stacked camera words | one move per clip; delete every other camera verb |
| Brand logos on gear (CDJs, phones) | training data | "unbranded equipment", or Aleph 2: "remove all logos from the mixer, keep everything else identical" |

## Templates

- [templates/video-prompt-template.md](templates/video-prompt-template.md) — the six-slot form with per-model wrappers.
- [templates/video-job.json](templates/video-job.json) — a `GenerateRequest` you can copy into code or MCP `generate_media`.
- [templates/clip-qa.md](templates/clip-qa.md) — the per-clip QA sheet.
- [examples/four-reference-clips.md](examples/four-reference-clips.md) — Claudia's lounge, club, bedroom and rain clips,
  each with 3–4 model variants, settings and costs.

## Check before you finish

- [ ] The clip started from an approved still scored 7/7.
- [ ] Prompt has all six slots, one camera move, timed beats, an explicit audio line.
- [ ] Estimate checked, dry-run body checked, a person approved anything above the approval threshold.
- [ ] First/middle/last frames scored ≥ 6/7; no age doubt; no extra fingers in any frame.
- [ ] No readable third-party logos; background people are anonymous and out of focus.
- [ ] Output normalised to 1080×1920, H.264, `+faststart`; provenance sidecar kept; the post will carry the AI label.

## Pitfalls

- **Prompting a famous person, place-as-brand or "in the style of" a living director.** Real-person likeness is blocked by
  most providers and off-limits here anyway.
- **Using Veo after 2026-10-22.** The three Veo 3.1 previews shut down that day; the package refuses retired models — move
  to `google/omni-flash`.
- **Duration mismatch.** Asking Kling 2.6 for 8 s (it does 5 or 10), Veo for 5 s (4/6/8) or Hailuo for 9:16 (it has no
  aspect control in the package — the first frame sets it). Read the model card.
- **Long prompts.** Past ~120 words the last instructions (often the camera) get ignored.
- **Paying twice for the same mistake.** If two rerolls fail the same way, the first frame or the prompt is the problem.
- **Expired results.** Veo deletes outputs after 2 days and fal/Runway links expire; keep the process (or Claudia Local)
  running until jobs download.

## Related skills

- [../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md) · [../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md)
- [../character-consistency/SKILL.md](../character-consistency/SKILL.md) · [../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md)
- [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md) · [../music-and-sound-for-shorts/SKILL.md](../music-and-sound-for-shorts/SKILL.md)
- [../batch-content-production/SKILL.md](../batch-content-production/SKILL.md) · [../../build/media-pipelines/SKILL.md](../../build/media-pipelines/SKILL.md)
