# Lip-sync and talking-head models (checked 2026-10)

| Package id | Input (refs order) | Output | Price | Limits |
|---|---|---|---|---|
| `fal/lipsync-2` (Sync lipsync-2) | `[video, audio]` | the video with re-timed mouth | $3.00 / min | keeps each speaker's own speaking style; needs visible mouth motion in the source; struggles with many cuts or no face; no animals |
| `fal/veed-lipsync` | `[video, audio]` | same | $0.40 / min | cheaper, less mouth/teeth detail |
| `fal/omnihuman-1.5` | `[face image, audio]` + optional prompt | 720p/1080p talking video | $0.16 / s | ~30 s per generation (some hosts quote 35–60 s); prompt = emotion, gesture, camera — never the words |
| `heygen/avatar-iv` | photo ref, or `meta.avatarId` (a look id from `GET /v3/avatars/looks`); script in `text`; voice required | up to 1080p (package lists 720p/1080p/4k), up to 180 s | ~$0.05–0.10 / s (estimate; HeyGen shows API rates in its dashboard) | custom motion prompts double the cost; HeyGen v1/v2 endpoints retire 2026-10-31 (package already uses v3) |

Not in the package but worth knowing: Sync **lipsync-2-pro** (diffusion super-resolution, keeps teeth detail, ~$0.067–0.083/s)
and **sync-3** (native 4K, extreme angles, partial faces). Kling 3 Elements and Wan 2.6 reference-to-video can bind a
voice to a character natively — useful later, but they use the model's voice handling, not your designed voice.

## Getting good results

**Source clip for `lipsync-2`:**
- Generate it with her talking (mouth moving) — "she talks to the camera, animated, natural mouth movement".
- Face visible and mostly frontal (±30°) during speech; no hand over the mouth; no cuts inside the clip.
- At least as long as the audio; trim extra after syncing.
- 24–30 fps, ≥ 720p. Normalise first: `ffmpeg -i in.mp4 -vf "fps=30,scale=1080:-2" -an src.mp4`.

**Still for OmniHuman:**
- MCU or CU, mouth closed or relaxed, eyes open, even light, simple background.
- No sunglasses (eyes drive expression), no hands near the face.
- Prompt: "medium close-up, she smiles knowingly, small head tilts, one slow blink, relaxed shoulders, static camera".

**Audio:**
- Mastered WAV, 48 kHz, -14 LUFS, no music under it (add music after syncing).
- Leading/trailing silence trimmed — models animate silence as mumbling.

## Failure → fix

| Failure | Fix |
|---|---|
| Lips don't close on p/b/m | cleaner audio (no reverb), slightly slower read, try `lipsync-2` instead of VEED |
| Mouth moves during silence | trim silence from audio; cut the frames in edit |
| Teeth smear / blurry mouth | higher-res source, closer framing; pro models off-package |
| Face softens, freckles vanish | sync on a 1080p source; light sharpen in edit; re-score drift |
| Head motion fights the new mouth | calmer source clip (fewer head turns during speech) |
| OmniHuman body warps | tighter crop (MCU), simpler background, shorter line |
