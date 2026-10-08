# Model dialects (checked 2026-10)

Read this before you use a model for the first time, or when porting a prompt. Facts come from each provider's docs or,
where marked, a secondary source. Package ids are the ones `@useclaudia/media` uses.

## Google Nano Banana family

| | Nano Banana 2.1 | Nano Banana 2 | Nano Banana Pro | Nano Banana 2 Lite |
|---|---|---|---|---|
| Package id | `google/nano-banana-2.1` | `google/nano-banana-2` | `google/nano-banana-pro` | `google/nano-banana-lite` |
| Provider model | `gemini-nano-banana-2.1` | `gemini-3.1-flash-image` | `gemini-3-pro-image` | `gemini-3.1-flash-lite-image` |
| Refs | 14 total, up to 4 characters, up to 3 style | same | 6 objects, 5 characters | 14, but "not optimized" for multi-ref |
| Resolutions | 1K (default), 2K, 4K | 512, 1K, 2K, 4K | 1K/2K, 4K | 1K only |
| Price (package table) | $0.034 1K · $0.050 2K · $0.113 4K | $0.067 1K | $0.134 1K/2K · $0.24 4K | $0.034 |

- Aspect ratios at the model include 21:9 and, on 2.1 at 2K/4K, 4:1 and 8:1; the package request type exposes
  1:1, 16:9, 9:16, 4:5, 3:2, 2:3. For other ratios pass `meta.providerOptions` per Google's docs or crop.
- Prompt style: rich narrative paragraphs, photographic language ("three-point softbox setup", "45-degree elevated
  shot"), aspect stated in words, multi-turn refinement.
- Negatives: no field. Use positive phrasing ("an empty street").
- Character refs: label them ("Image 1 is Claudia's face reference; image 2 is her outfit"). Send the same 2–4 identity
  refs every call and restate fixed traits.
- Drift: identity slides over long multi-turn edit chains — restart from the anchor every 3–4 edits.
- Provenance: every output has SynthID; NB2 also attaches C2PA Content Credentials.
- Google's pages disagree on NB2's character limit (blog: 5, API doc: 4). Plan for 4.

## OpenAI GPT Image 2 / 2.5

| | GPT Image 2.5 Flare | GPT Image 2.5 Sunburst | GPT Image 2 |
|---|---|---|---|
| Package id | `openai/gpt-image-2.5-flare` (default) | `openai/gpt-image-2.5-sunburst` | `openai/gpt-image-2` |
| Best at | fast general generation, text | precise edits | general |
| Quality | low · medium · high · xhigh · max · auto | same | low · medium · high |
| Price (package) | ~$0.013 medium 1024² (estimate) | ~$0.013 (estimate) | $0.053 medium, $0.211 high |

- Sizes: any WxH with both edges multiples of 16, longest edge ≤ 3840, ratio between 1:3 and 3:1. Via the CLI:
  `--resolution 3072x1024` (3:1), `--resolution 1536x2720` (≈ 9:16). Output above 2560×1440 is "more variable".
- `input_fidelity` errors on gpt-image-2; references are always high fidelity on 2.x.
- Transparent background: `meta.background: "transparent"` with PNG/WebP (`meta.format`).
- Prompting: one anchor image first, then a **preserve list** on every edit ("Preserve exactly: …. Change only: …").
  Change one thing per follow-up. Put literal text in quotes and spell hard words letter by letter ("C-L-A-U-D-I-A").
- Negatives: no parameter; write constraints in plain language.
- Known limit (OpenAI's own docs): may struggle with recurring-character consistency across many generations — use refs.
- Provenance: C2PA on images (plus SynthID per OpenAI's help article titles; their page was not readable to us).
- GPT Image 1.5 and 1 Mini shut down 2026-12-01.

## Black Forest Labs FLUX.2

- Variants: klein, pro, max, flex, dev. Package: `fal/flux-2-pro` (refs: 4 in the package; BFL's API allows 8 —
  plan for 8 if calling BFL directly), `fal/flux-dev` (no refs, `n` up to 4), `fal/flux-kontext-pro` (edit).
- Output up to 4 MP. Price: $0.03 first MP + $0.015 per extra MP (package table).
- Structure: Subject + Action + Style + Context; 30–80 words is the sweet spot; early words weigh most.
- JSON structured prompts for production: `scene`, `subjects[{description, position, action}]`, `style`,
  `color_palette`, `lighting`, `mood`, `background`, `composition`, `camera`.
- HEX colours work when tied to an object: "her jumper is #111111", "the butterfly glows #ff6fa5".
- Refer to refs as "image 1", "image 2".
- Photoreal: name camera, lens and film ("Fujifilm X-T5, 35mm f/1.4"), not "professional photo".
- Negative prompts: not supported. Describe the wanted state.

## ByteDance Seedream

- Package: `byteplus/seedream-4.5` ($0.04), `byteplus/seedream-5-flash` ($0.018), `byteplus/seedream-5-lite`
  ($0.035, provider id unverified). Up to 10 refs through the package.
- Seedream 5.0 (secondary sources): up to 14 refs; batch mode `sequential_image_generation: "auto"` with
  `sequential_image_generation_options.max_images`; refs + outputs ≤ 15. Pass through `meta.providerOptions`.
- Best use: one request that makes a whole shoot (6 frames of the same outfit and light) so identity holds across it.
- Prompt: clear numbered frame list inside one prompt ("Frame 1: … Frame 2: …").
- Negatives: no field found; treat as unsupported.

## Midjourney (manual — no API in the package)

- Versions: V8.2 default since 2026-07-24; V7 selectable (secondary source citing Midjourney's compatibility chart).
- Identity: `--oref <url>` + `--ow 0–1000` (default 100) is **V7 only** → add `--v 7`. Start at `--ow 150–250`; above 400
  can copy the ref's pose/outfit too. `--cref`/`--cw` are legacy (V6) and ignored.
- V8.x alternative: `--edit` with up to 4 image URLs.
- Style: `--sref <url|code>` + `--sw 0–1000`; `--style raw` (V7) / `--raw` (V8) for photographic restraint;
  `--stylize 0–1000` (keep 50–150 for photoreal); `--exp 10–25`; `--p` personalization.
- Format: `--ar 4:5`, `--ar 9:16`, `--ar 3:1` (max 14:1; 4:1 in HD). `--hd` on V8.1 = 2048 px.
- Negatives: `--no text, logo, teen`. Seeds: `--seed n`, ~99 % reproducible on V8.
- Weak spots: real-photo refs (works best with its own generations), hands, editing HD drops to SD.

## Runway Gen-4 Image

- Package `runway/gen4-image`: up to 3 refs, 720p ($0.05) / 1080p ($0.08). Good for quick 16:9 scene plates.

## Porting checklist

1. Keep the ID block identical; change only the wrapper (sentences ↔ JSON ↔ comma phrases).
2. Move negatives: Midjourney `--no` ↔ positive phrasing elsewhere.
3. Re-check aspect support and resolution names.
4. Re-label refs in the model's syntax ("image 1", `--oref`, labelled refs).
5. Run one 1K test and score it before batching.
