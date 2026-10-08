# Reference mechanics per model (checked 2026-10)

Read this the first time you use a model for a character job. "Package" = what `@useclaudia/media` sends today
(`refs` cap from its model table); "Model" = what the provider documents. When they differ, the package is the limit
unless you pass extra fields through `meta.providerOptions`.

## Images

### Google Nano Banana family
- Ids: `google/nano-banana-2.1` (default image model, stable Oct 2026), `google/nano-banana-2`, `-pro`, `-lite`.
- Refs: up to 14 total; Google's API doc says up to **4 character references** (the launch blog says 5 — plan for 4),
  up to 10 objects, up to 3 style refs. Pro: 5 characters, 6 objects. Lite is "not optimized for multiple reference
  inputs" — don't use it for identity.
- How to write it: narrative sentences, not tag lists. Label refs by job: "Image 1 is Claudia's face reference. Image 2
  is her full-body outfit reference. Keep her identical to image 1."
- Negatives: no parameter. Use positive "semantic negatives": "her hair is jet-black except the copper panels" instead
  of "no red hair".
- Resolutions 1K/2K/4K (2.1 defaults to 1K); 21:9 and extreme ratios exist at the model level, but the package's `aspect`
  list is 1:1, 16:9, 9:16, 4:5, 3:2, 2:3 — crop for 3:1 banners.
- Every output carries SynthID; NB2 also attaches C2PA.
- Drift: long multi-turn edit chains slowly change the face. Restart from the anchor every 3–4 edits.
- Price (package table): 2.1 is $0.0336 per 1K, $0.0504 per 2K, $0.113 per 4K image.

### OpenAI GPT Image 2 / 2.5
- Ids: `openai/gpt-image-2.5-flare` (fast, default OpenAI image), `openai/gpt-image-2.5-sunburst` (slower, precise edits),
  `openai/gpt-image-2`. GPT Image 1.5 / 1 Mini retire 2026-12-01.
- Refs: package sends up to 16; OpenAI documents examples with 4 and states no hard max. `gpt-image-2` treats inputs at
  high fidelity always and errors if you pass `input_fidelity`.
- How to write it: one anchor image, then edits with a **preserve list** ("Preserve exactly: face, freckles, hair shape…
  Change only: …"). Change one thing per edit. Literal text in quotes; spell unusual words letter by letter.
- Sizes: any WxH with both edges multiples of 16, max edge 3840, ratio between 1:3 and 3:1 → `--resolution 3072x1024`
  gives a native 3:1 banner.
- Quality: 2.5 has low/medium/high/xhigh/max (`meta.quality`). Transparent backgrounds: `meta.background: "transparent"`.
- OpenAI itself notes the model "may occasionally struggle to maintain visual consistency for recurring characters" —
  always send refs.
- Outputs carry C2PA (and, per OpenAI help titles, SynthID).

### Black Forest Labs FLUX.2
- Ids: `fal/flux-2-pro` (package refs: 4), `fal/flux-kontext-pro` (single-image edit), `fal/flux-dev` (no refs).
- Model: pro/max/flex take up to 8 refs via BFL's API (10 in their playground); 9 MP input+output budget on pro.
- How to write it: Subject → Action → Style → Context; 30–80 words; early words weigh most. Refer to refs as
  "image 1", "image 2". JSON structured prompts work well for production; HEX colours bound to an object
  ("a hair clip in color #FF7A1A").
- Negatives: not supported. Describe the wanted state.
- Price: $0.03 first megapixel + $0.015 per extra MP (package table).

### ByteDance Seedream
- Ids: `byteplus/seedream-4.5` ($0.04), `byteplus/seedream-5-flash` ($0.018), `byteplus/seedream-5-lite` (id unverified).
- Refs: package 10; Seedream 5 documents up to 14 and **sequential batch generation**
  (`sequential_image_generation: "auto"`, refs + outputs ≤ 15) — pass via `meta.providerOptions` to make a whole shoot in
  one consistent batch.
- Negatives: no documented parameter (unconfirmed) — write positively.

### Midjourney (manual; no API in the package)
- V8.2 is the default since 2026-07-24; V7 still selectable.
- `--oref <url>` + `--ow` (0–1000, default 100) is V7-only — pin `--v 7`. 150–400 holds the face; above ~600 it copies
  pose and clothes too. `--cref` is legacy (V6).
- `--sref` + `--sw` for look/grade; `--no` works; `--seed` ~99 % reproducible on V8; `--ar` up to 14:1 (4:1 in HD);
  `--style raw` (V7) / `--raw` (V8) for photoreal.
- Works best with characters it generated itself; hands remain a weak spot.

## Video

| Model (package id) | Identity input | Notes |
|---|---|---|
| Gemini Omni Flash (`google/omni-flash`) | 1–10 refs tagged `<IMAGE_REF_0>`; `<FIRST_FRAME>`/`<LAST_FRAME>`; package sends up to 3 | GA 2026-08-27; 3–10 s per generation, length chosen by the model; native audio; re-anchor "keep all character details exactly" — drifts after ~4 edits |
| Veo 3.1 / fast / lite (`google/veo-3.1*`) | first/last frame, or `meta.refMode: "reference"` with up to 3 "ingredients" (not lite) | **shuts down 2026-10-22**; 4/6/8 s; refs require 8 s |
| Kling 3 Pro (`fal/kling-3-pro`) | first frame (+ last); Elements (2–4 images) in Kling's own app | 3–15 s; dialogue syntax `Name (tone): "line"` |
| Kling 2.6 Pro (`fal/kling-2.6-pro`) | first/last frame | 5/10 s; Motion Control (dance from a reference video) lives on separate endpoints |
| Seedance 2.0 (`fal/seedance-2.0`, `byteplus/seedance-2.0`) | `@Image1…`; realistic faces rejected unless ingested as an asset | 4–15 s, native audio; ref strength ~70–80 % reads natural |
| Hailuo 2.3 (`fal/hailuo-2.3`) | first frame | 6/10 s, no aspect control in the package — feed a 9:16 first frame |
| Wan 2.6 (`fal/wan-2.6`) | first frame; reference video (2–30 s) on Alibaba's API | 5/10/15 s, native audio |
| Runway Gen-4.5 / Gen-4 Turbo (`runway/*`) | first frame (Turbo requires it) | 2–10 s |
| Runway Aleph 2 (`runway/aleph2`) | the source video | edit one frame's look, carried through the clip |

## Avatars and lip-sync

| Model | Input | Use for |
|---|---|---|
| `fal/omnihuman-1.5` | `[face image, audio]` + optional prompt for emotion/camera (don't put the speech in the prompt) | talking-to-camera from one approved still |
| `fal/lipsync-2` / `fal/veed-lipsync` | `[video, audio]` | re-voicing a silent UGC clip; needs visible mouth motion |
| `heygen/avatar-iv` | face photo or `meta.avatarId` + voice | longer talking heads (up to ~180 s) |
