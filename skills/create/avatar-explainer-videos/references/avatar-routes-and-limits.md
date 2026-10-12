# Avatar routes and limits (checked 2026-10)

Read this in step 3, before choosing a route. Sources: HeyGen API reference (developers.heygen.com, `POST /v3/videos`
and the usage-limits page), the `@useclaudia/media` 0.3.0 docs and model table. Prices are the package's list or
estimate values; your provider dashboard is the source of truth.

## How the package maps a request to HeyGen v3

| `GenerateRequest` field | HeyGen v3 field | Notes |
|---|---|---|
| `meta.avatarId` | `type: "avatar"`, `avatar_id` | a look id from `GET /v3/avatars/looks` |
| face image in `refs` (no `avatarId`) | `type: "image"`, `image` | local files go as base64; https URLs as `url` |
| `text` | `script` | at least 1 character, at most 5,000 |
| `voice` | `voice_id` | required with a script for photo avatars; with an `avatar_id` it can be left out (the look's default voice) |
| audio in `refs` | `audio_url` | must be a public https URL; a local file throws `invalid` |
| `prompt` | `motion_prompt` | body motion and gestures; photo avatars only on Avatar IV |
| `aspect` | `aspect_ratio` | the package passes `16:9`, `9:16`, `4:5`, `1:1` |
| `resolution` | `resolution` | `720p`, `1080p`, `4k` (4k only for Avatar III digital twins and studio avatars) |
| `meta.title` | `title` | the dashboard title |
| `meta.providerOptions` | merged into the body as-is | for the fields below |

Useful `providerOptions` (HeyGen v3 create-video reference):

| Field | Values | Use |
|---|---|---|
| `expressiveness` | `low` (default), `medium`, `high` | photo avatars on Avatar IV; `medium` suits explainers |
| `caption` | `{ style: "default" }` | burns HeyGen captions in; a sidecar SRT is always produced at `subtitle_url`, which the package does not download |
| `voice_settings` | `speed` 0.5–1.5, `pitch` -50 to +50, `volume` 0–1 | only with `script` + `voice_id`, not with uploaded audio |
| `background` | `{ type: "color", value: "#0a0b0d" }` or an image | plain backgrounds help lip-sync and captions |
| `engine` | `avatar_iv` (default), `avatar_v`, `avatar_iii` | `type: "avatar"` only; `motion_prompt` works with video avatars only on `avatar_v` |
| `fit` | `cover`, `contain` | how the source fills the frame |

## HeyGen limits

| Limit | Value |
|---|---|
| Script | 5,000 characters per request |
| Duration | 30 minutes per scene; one avatar or image request is one scene |
| Input image / audio / video | under 2K resolution; image and audio ≤ 50 MB, video ≤ 100 MB |
| Output | 128–4,096 px per side, 1080p default, 25 fps |
| Rate | `POST /v3/videos` 10 requests/s on pay-as-you-go and subscription plans; 429 with `Retry-After` |
| Package concurrency | 1 running HeyGen job at a time (default) |
| Old endpoints | v1/v2 video endpoints retire after 2026-10-31 |
| Price in the package | ~$0.05–0.10 per second, estimated at the upper end (HeyGen shows self-serve API rates in its dashboard) |

## Consent rules

- HeyGen requires proof of consent before generating with a **digital twin** (an avatar trained on a real person's
  footage). The person records a consent statement themselves (webcam flow for all customers; uploaded consent videos
  and waivers are enterprise options). Consent applies to digital twins, not to photo or prompt avatars.
- HeyGen's moderation policy also requires the explicit consent of any individual represented by a custom avatar.
- For photo avatars, use a fictional character's image you own (Claudia's ref pack, your agent's character). A photo of
  a real person without their consent breaks both policies and the library's no-impersonation rule.

## Other routes in the package

| Route | Package id | refs | Price | Limits and notes |
|---|---|---|---|---|
| OmniHuman 1.5 | `fal/omnihuman-1.5` | `[face image, audio]` | $0.16/s of output | ~30 s per job is the safe length; prompt = emotion, gesture, camera; 720p or 1080p |
| Sync lipsync-2 | `fal/lipsync-2` | `[video, audio]` | $3.00/min | needs a source clip with mouth motion, at least as long as the audio |
| VEED lipsync | `fal/veed-lipsync` | `[video, audio]` | $0.40/min | cheaper drafts, less teeth detail |

## Cost examples

| Video | Route | Estimate |
|---|---|---|
| 60 s explainer | A (HeyGen photo avatar) | ~$6.00 (upper-end estimate) |
| 60 s explainer in 2 segments | C (OmniHuman) + ElevenLabs voice | 60 × $0.16 = $9.60 + ~$0.07 voice |
| 45 s talking clip re-synced | D (lipsync-2) | 0.75 min × $3 = $2.25 + the source clip |

Set `perJobUsd` above the largest single segment and `approveAboveUsd` low enough that a person sees every render.
