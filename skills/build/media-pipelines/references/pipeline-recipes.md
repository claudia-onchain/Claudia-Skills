# Pipeline recipes

All recipes were dry-run against `@useclaudia/media` 0.2.0 on 2026-10-08 (checked 2026-10). Estimates are what the
package printed; providers change prices.

## What `refs` do per model

| Model family | `refs` meaning | Dry-run evidence |
|---|---|---|
| Image (Nano Banana, GPT Image, FLUX Kontext, Seedream) | references or images to edit | GPT Image edits with reference images; `meta.background: "transparent"` for cut-outs |
| Video (Kling, Seedance, Hailuo, Wan, Omni, Runway) | first frame (and last frame if two) | `fal/kling-2.6-pro` + 1 ref → `…/kling-video/v2.6/pro/image-to-video` with `start_image_url` |
| Veo 3.1 | first/last frame, or with `meta.refMode: "reference"` up to 3 asset references | → `referenceImages` in the request |
| Video edit (`runway/aleph2`) | the source video | |
| OmniHuman (`fal/omnihuman-1.5`) | `[face image, audio]` | → `image_url` + `audio_url`; $0.16 per output second |
| Lip-sync (`fal/lipsync-2`, `fal/veed-lipsync`) | `[video, audio]` | |
| HeyGen (`heygen/avatar-iv`) | a face photo, or `meta.avatarId` (a look id from `GET /v3/avatars/looks`) | a photo avatar **needs `voice`** (a HeyGen voice id) or the job is `invalid` |

Local files are sent the way each provider wants them (inline base64 for Google, data URIs for OpenAI/fal/Runway/
BytePlus, base64 for HeyGen); https URLs pass through (or are downloaded first for Google).

## Recipe 1 — keyframe → vertical clip (consistent face)

1. Image: `google/nano-banana-2.1`, `aspect: "9:16"`, `brand: "claudia"` (kit refs keep the face), ~$0.034.
2. Person approves the still.
3. Video: `fal/kling-2.6-pro`, `refs: [still.path]`, `durationSec: 5`, `aspect: "9:16"`, ~$0.70 with audio; with
   `meta.audio: false` the list price halves, though the package still estimates (and caps) at the with-audio rate.
4. Optional square crop + poster with ffmpeg (below).

Why: image models hold identity better than text-to-video; image-to-video then only has to animate.

## Recipe 2 — voiceover → talking avatar

1. Speech: `elevenlabs/flash-v2.5` (or `multilingual-v2`), `text`, `voice: <own voice id>` — about $0.04 per 1,000
   characters.
2. Avatar: `fal/omnihuman-1.5`, `refs: [approved_face.png, speech.mp3]` — $0.16 per second of output; a 20 s clip ≈ $3.20.
   Set `approveAboveUsd` so this waits for a person.
   Or HeyGen: `heygen/avatar-iv`, `text`, `voice: <HeyGen voice id>`, `refs: [face.png]` or `meta.avatarId`.

## Recipe 3 — lip-sync an existing clip

`fal/lipsync-2`, `refs: [clip.mp4, speech.wav]`. Use for dubbing a clip the person already approved.

## Recipe 4 — music bed + SFX

`google/lyria-3.5` (`prompt`, `durationSec` ~30; `meta.format: "wav"` for a WAV) ≈ $0.04–0.08 per song;
`elevenlabs/sfx-v2` with `meta.loop: true` for ambience. Mix in an editor; keep the sidecars.

## ffmpeg post-processing (local, no keys)

```sh
# 720x1280 vertical → 720x720 face-framed square from the upper part of the frame
ffmpeg -i in.mp4 -vf "crop=720:720:0:160" -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -an -movflags +faststart out-sq.mp4

# Poster frame at 1 s, JPEG quality 3 (smaller numbers = higher quality)
ffmpeg -ss 1 -i in.mp4 -frames:v 1 -q:v 3 poster.jpg

# Web-friendly silent loop under ~2 MB: cap bitrate, drop audio, faststart
ffmpeg -i in.mp4 -c:v libx264 -b:v 1200k -maxrate 1500k -bufsize 3000k -pix_fmt yuv420p -an -movflags +faststart web.mp4

# 3:1 banner crop from a 3:2 still
ffmpeg -i still.png -vf "crop=iw:iw/3:0:(ih-iw/3)/2" -q:v 3 banner-3x1.jpg

# Burned-in disclosure for platforms without a native AI flag (bottom-left, small)
ffmpeg -i in.mp4 -vf "drawtext=text='AI-generated':x=24:y=h-48:fontsize=28:fontcolor=white@0.85:box=1:boxcolor=black@0.35" -c:a copy labeled.mp4
```

After any ffmpeg step: copy the source sidecar (`cp in.mp4.json out-sq.mp4.json`) and add a note of what changed.
Re-encoding removes embedded C2PA manifests; Google's SynthID is a pixel watermark and generally survives crops, but
don't rely on watermarks as the disclosure — the post label is.

## Wiring into an agent safely

- Expose `generate_media` (returns a job id + estimate), `get_media_job`, `list_media`; never an `approve` tool.
- `approveAboveUsd` > 0, so paid jobs wait for the person (Claudia Local's Approvals, or `claudia` CLI).
- Daily cap for agent-originated jobs: the local MCP's `CLAUDIA_MCP_MEDIA_PER_DAY_USD` (default $5).
- Log the job id and estimate in the agent's reply so the person can find it.
