# Video model cards (checked 2026-10)

Read the card before the first job on a model. "Package" = what `@useclaudia/media` exposes today (its model table);
"Model" = what the provider supports natively. Anything the package doesn't model can be sent with
`meta.providerOptions` (merged as-is into the request body) — always confirm with a `--dry-run` first.

Prices are list prices from the package table unless marked estimate. Prices move; `claudia generate models video` prints
the current table with which keys you have.

---

## Gemini Omni Flash — `google/omni-flash` (key: `google`)

- **Model:** `gemini-omni-1.1-flash`, GA 2026-08-27. 3–10 s per generation (longer requests are cut to 10 s). 9:16 or
  16:9. 360p/720p native; 1080p and 4K are upscaled. 1–10 reference images tagged in the prompt as `<IMAGE_REF_0>` …,
  plus `<FIRST_FRAME>`, `<LAST_FRAME>` and `<VIDEO_REF_0>` (reference videos up to 3 s). Native synced audio.
  Multi-turn conversational edits. Extension cap reported as 30–40 s (sources conflict).
- **Package:** refs up to 3; aspects 16:9, 9:16; resolutions 360p–4k; audio on; **duration is chosen by the model from the
  prompt** — say "an 8-second clip" in the prompt. Price ≈ $0.10/s at 720p (estimate: $17.50 per 1M output tokens).
- **Prompt order:** subject/action → scene → camera/light → audio → shot structure. Timecodes `[0-3s]`. Give each ref one
  job ("<IMAGE_REF_0> is her face; <IMAGE_REF_1> is the lounge").
- **Watch for:** music it adds unasked (write "no music, just room tone"); identity drift after ~4 conversational edits
  (re-anchor with "keep all character details exactly as in <IMAGE_REF_0>"); distorted typography; crowds of 4+ merging;
  complex reveal moves. Real people and brands are blocked.
- **Provenance:** SynthID.

## Veo 3.1 / Fast / Lite — `google/veo-3.1`, `-fast`, `-lite` — **shut down 2026-10-22**

- **Model:** 4, 6 or 8 s; 16:9 or 9:16; 8 s required for 1080p, 4K and reference images. Up to 3 reference images
  ("ingredients"; not on Lite). First and last frame. Native audio. Dialogue in quotes, `SFX:` and `Ambient noise:` lines,
  timestamp blocks `[00:00-00:02]`. No negative-prompt parameter documented.
- **Package:** standard $0.40/s; Fast $0.10/s 720p, $0.12 1080p, $0.30 4K; Lite $0.05/s 720p, $0.08 1080p (audio
  included). `meta.refMode: "reference"` sends refs as ingredients. After 2026-10-22 the package refuses these ids — the
  replacement is `google/omni-flash`.
- **Outputs** are deleted by Google after 2 days — keep the job runner alive until download.

## Kling 2.6 Pro — `fal/kling-2.6-pro` (key: `fal`)

- **Model:** first Kling with native audio (speech, SFX, ambience); Motion Control (drive full-body motion from a 3–30 s
  reference video) is available on Kling's own host and some fal endpoints — not in the package's text/image-to-video id.
- **Package:** 5 or 10 s; 16:9, 9:16, 1:1; refs 2 (first/last); $0.14/s with audio, $0.07/s without (`meta.audio: false`).
- **Good for:** dance and body motion, club scenes.

## Kling 3 Pro — `fal/kling-3-pro`

- **Model:** released 2026-02-04. 3–15 s, 720p/1080p (+4K option), multi-shot storyboards, start/end frames, Elements
  (2–4 images or a video that binds appearance and voice), dialogue `Name (tone, language): "line"` in EN/ZH/JA/KO/ES.
  Kling 3.0 Turbo and Omni (editing) arrived 2026-06-17; Kling 4.0 is in limited preview (no API confirmed).
- **Package:** 3–15 s; 16:9, 9:16, 1:1; refs 2; $0.168/s with audio, $0.112/s without.
- **Good for:** talking-to-camera with a line, long single takes, start→end pose control.

## Kling 2.5 Turbo Pro — `fal/kling-2.5-turbo-pro`

- **Package:** 5 or 10 s; $0.35 for 5 s + $0.07 per extra second; no audio. Cheap drafts of motion before a Kling 3 final.

## Seedance 2.0 — `fal/seedance-2.0`, `byteplus/seedance-2.0`, `byteplus/seedance-2.0-fast`

- **Model:** 4–15 s, up to 2K, native stereo audio; up to 12 refs (9 images, 3 videos ≤ 15 s total, 3 audio) addressed as
  `@Image1`, `@Video1`, `@Audio1`. Timeline as "Seconds 1-5 / 6-10 / 11-15", "cut to" between shots, 60–100 words,
  one camera move per clip, reference strength ~70–80 %. Seedance 2.5 (2026-07-31) goes to 30 s single shots — not in
  the package.
- **Face rule:** reference images with realistic human faces are rejected (HTTP 400) unless ingested into the ModelArk
  asset library and used by `asset://` id; AI-generated virtual characters are accepted there; real people need a
  liveness check. Do not try to get around this.
- **Package:** fal 720p $0.3034/s, 1080p $0.682/s; BytePlus ≈ $0.15/s 720p (estimate; needs account activation), Fast ≈
  $0.12/s. Aspects include 9:16, 4:3, 3:4, 21:9. refs 2. `meta.audio: false` turns off audio.
- **Watch for:** jitter when fast camera + fast cuts + busy scene stack; refs bleeding into each other; garbled text.

## Hailuo 2.3 — `fal/hailuo-2.3`

- **Model:** 6 or 10 s at 768p; 1080p only at 6 s. Strong human motion and facial micro-expressions. Native audio not
  confirmed — treat as silent. Successor MiniMax H3 (2026-07-31, 5–15 s, native audio) is not in the package.
- **Package:** refs 1 (first frame); **no aspect or resolution control** — a 9:16 first frame gives a vertical clip;
  verify with `ffprobe`. $0.28 per 6 s, $0.56 per 10 s.
- **Good for:** the sunglasses reveal, smiles, glances — the cheapest good performance shot.

## Wan 2.6 — `fal/wan-2.6`

- **Model:** up to 15 s, 1080p, 24 fps, native audio with lip-sync, multi-shot in one clip, reference-to-video from a
  2–30 s clip. Wan 2.7 (Apr 2026, dialogue rewrite with re-synced lips) and Wan 3.0 (invite only) are not in the package.
- **Package:** 5, 10 or 15 s; 16:9, 9:16, 1:1; 720p $0.10/s, 1080p $0.15/s; refs 1.
- **Good for:** 15 s talking clips on a budget.

## Runway Gen-4.5 / Gen-4 Turbo / Aleph 2 — `runway/gen4.5`, `runway/gen4-turbo`, `runway/aleph2` (key: `runway`)

- **Gen-4.5** (2025-12-11): 2–10 s, text- or image-to-video, follows sequenced camera/timing instructions well.
  $0.12/s. Native audio unconfirmed — treat as silent.
- **Gen-4 Turbo:** image-to-video only (needs a ref), 2–10 s, $0.05/s — fast drafts.
- **Aleph 2** (2026-05-13): edit a video — edit one frame's content and it carries through; relight, remove objects,
  change wardrobe colour, replace backgrounds. The source video is the ref. $0.28/s, 56-credit minimum. Results expire in
  24–48 h.

## Not available

- **OpenAI Sora:** app closed 2026-04-26, Videos API shut down 2026-09-24. No successor.
- **Imagen / Gemini 2.5 Flash Image** for first frames: retired; use Nano Banana 2.1.
