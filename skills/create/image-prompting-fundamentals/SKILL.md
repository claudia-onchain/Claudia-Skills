---
name: image-prompting-fundamentals
description: Teaches how to write image prompts that work across 2026 image models — the five-block prompt structure, camera/lens/light/film vocabulary, aspect ratios and resolutions, per-model dialects (Nano Banana narrative prompts, GPT Image 2.5 preserve lists and quoted text, FLUX.2 JSON prompts with HEX colours, Seedream batches, Midjourney V7 parameters), where negative prompts work and where they don't, and the estimate → dry run → capped run loop with @useclaudia/media and the claudia CLI. Use when writing any still-image prompt, choosing an image model, translating a prompt between models, or debugging a prompt that keeps producing the wrong thing.
license: MIT
metadata:
  title: "Image prompting fundamentals"
  category: create
  summary: "The prompt structure, vocabulary and per-model dialects that turn an idea into the image you meant, on any 2026 model."
  level: beginner
  tags: "image prompts, nano banana, gpt image, flux, seedream, midjourney, camera, lighting, negative prompts"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "25 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Image prompting fundamentals

A good image prompt is a shot description a photographer could execute: who, wearing what, doing what, where, with
which lens and light, framed how. This skill gives you one structure that works on every current model, the vocabulary
that models actually respond to, and the small dialect changes each model needs — so the first render is close and the
third is publishable.

## When to use this

- Writing a still-image prompt from scratch, with or without Claudia in it.
- Picking which image model to use for a job (photoreal, text in image, edits, batches).
- Porting a prompt that works on one model to another.
- A prompt keeps producing the wrong age, wrong light, wrong framing or garbled text.

## What you need

- `@useclaudia/cli` and `@useclaudia/media` installed (`npm i -g @useclaudia/cli @useclaudia/media`) and at least one
  image key you bring yourself: `claudia keys set google` (Nano Banana), `openai` (GPT Image), `fal` (FLUX.2),
  `byteplus` (Seedream). Midjourney has no API here; you paste prompts into its own app.
- For Claudia: the identity block and wardrobe strings from [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md).
- Read [references/vocabulary.md](references/vocabulary.md) when you need lens, light, film-stock or composition words.
- Read [references/model-dialects.md](references/model-dialects.md) before using a model for the first time.

## Steps

### 1. Write the brief in one sentence first

Before any prompt: "A 4:5 feed photo of Claudia laughing on her bed at golden hour, for a Sunday caption." If you can't
say the format, subject, moment and purpose, the prompt will wander.

### 2. Build the prompt from five blocks, in this order

Models weight early words more (FLUX.2's own guide says so; checked 2026-10), so identity goes first and finish goes last.

| Block | What it says | Example (Claudia) |
|---|---|---|
| 1 Subject / identity | who, with the locked ID block | `[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) …` |
| 2 Wardrobe + action | one look, one action, one expression | `wearing an oversized fuzzy black knit jumper; lying on her front, chin resting on folded arms, looking into the lens with a knowing half-smile` |
| 3 Setting | place, props, time, weather | `on an unmade white duvet in a New York bedroom, floor-to-ceiling window behind her with the Manhattan skyline and a low orange sun` |
| 4 Camera | shot size, angle, lens, aperture, focus | `close-up at mattress height, 35mm lens at f/2, shallow depth of field, focus on her eyes` |
| 5 Light + finish | key light, colour, medium, grade | `warm golden backlight with soft lens flare, window bounce fill on her face, shot on Kodak Portra 400, gentle grain, natural skin texture` |

Write blocks 2–5 as sentences for Nano Banana and GPT Image, as JSON fields for FLUX.2, and as comma phrases plus
parameters for Midjourney (step 5).

### 3. Pick the format before the prompt

The package accepts `--aspect 1:1 | 16:9 | 9:16 | 4:5 | 3:2 | 2:3` (checked 2026-10 in `@useclaudia/media`).

| Use | Aspect | Resolution |
|---|---|---|
| Instagram/Threads feed photo | 4:5 | 2K |
| Reel/TikTok/Shorts cover, story, first frame for a 9:16 video | 9:16 | 2K |
| Studio portrait, Pinterest | 2:3 | 2K |
| X/LinkedIn in-feed image, YouTube thumbnail base | 16:9 | 2K |
| Avatar / profile picture | 1:1 | 1K |
| 3:1 or 4:1 banners | 16:9 at 2K/4K then crop, or GPT Image 2.5 `--resolution 3072x1024` | see [../banner-and-collage-design/SKILL.md](../banner-and-collage-design/SKILL.md) |

Also write the framing into the prompt ("vertical 9:16 frame, her face in the upper third"). Nano Banana's guide
recommends stating the aspect in the prompt (checked 2026-10).

### 4. Choose the model for the job

| Job | First choice (package id) | Why (checked 2026-10) | Price hint |
|---|---|---|---|
| Photoreal Claudia with refs | `google/nano-banana-2.1` | up to 14 refs, up to 4 character refs, 1K/2K/4K | ~$0.034 1K · $0.050 2K · $0.113 4K |
| Precise edit / fix one detail | `openai/gpt-image-2.5-sunburst` | built for edit precision, preserve lists, masks | ~$0.013 medium 1024² (estimate) |
| Text inside the image (wordmark, sign) | `openai/gpt-image-2.5-flare` | quoted text renders most reliably | same |
| Structured art direction, exact colours | `fal/flux-2-pro` | JSON prompts, HEX colours, multi-ref | $0.03 first MP + $0.015/MP |
| A consistent set of 4–10 in one go | `byteplus/seedream-4.5` / `seedream-5-flash` | sequential batch generation, up to 10 refs here | $0.04 / $0.018 per image |
| Stylised mood boards, sref looks | Midjourney V7/V8 (manual) | `--sref`, `--oref` (V7), personalisation | your plan |
| One-line "change only X" edits | `fal/flux-kontext-pro` | single image + instruction | $0.04 |

`claudia generate models image` prints the live table with prices and which keys you have.

### 5. Speak each model's dialect

The same shot, four ways (full side-by-side in [examples/one-scene-five-models.md](examples/one-scene-five-models.md)):

**Nano Banana — narrative paragraph, positive wording.** No negative-prompt field; describe what *is* there
("an empty street", not "no cars"; checked 2026-10).

```text
[CLAUDIA ID v1] … She wears an oversized fuzzy black knit jumper and lies on her front on an unmade white duvet, chin on
her folded arms, looking straight into the lens with a knowing half-smile. Behind her a floor-to-ceiling window frames the
Manhattan skyline at sunset, the sun a low orange disc, pothos plants trailing down the window frame. Close-up from
mattress height on a 35mm lens at f/2, focus on her eyes, warm golden backlight with a soft flare, natural skin texture,
the look of Kodak Portra 400. Vertical 4:5 frame.
```

**GPT Image 2.5 — sentences + explicit constraints; literal text in quotes.** No negative parameter; write exclusions as
plain constraints ("Do not add any text or logos").

**FLUX.2 — JSON for production, HEX tied to objects, refs called "image 1".** No negative prompts (checked 2026-10).

```json
{
  "subject": "Claudia from image 1: 28-year-old adult woman, glossy jet-black jaw-length blunt bob, heavy straight bangs, copper-orange streak panels, small orange hair clip, thin gold hoops, light freckles",
  "action": "lying on her front on a bed, chin on folded arms, knowing half-smile to camera",
  "wardrobe": "oversized fuzzy black knit jumper",
  "background": "floor-to-ceiling window, Manhattan skyline at sunset, low orange sun, trailing pothos",
  "lighting": "warm golden backlight with soft flare, window bounce fill",
  "color_palette": ["#f2a65a sunset sky", "#ff9a6b copper rim light", "#0a0b0d deep shadows"],
  "camera": "35mm lens, f/2, mattress height, shallow depth of field",
  "style": "photoreal, Kodak Portra 400, gentle grain, natural skin texture"
}
```

**Midjourney V7 — comma phrases first, parameters last.** Negatives with `--no`; identity with `--oref` on V7 only.

```text
close-up photo of a 28-year-old woman lying on a bed, glossy jet-black jaw-length bob, heavy straight bangs, copper-orange
streak panels, small orange hair clip, thin gold hoops, freckles, black fuzzy knit jumper, Manhattan skyline window at
sunset, golden backlight, 35mm, Kodak Portra 400 --ar 4:5 --style raw --oref <approved-ref-url> --ow 200 --no text, teen --v 7
```

### 6. Use negatives only where they exist

| Model | Negative support (checked 2026-10) | What to do instead |
|---|---|---|
| Nano Banana (all) | no field | positive "semantic negatives": "clean wall", "bare wrists" |
| GPT Image 2 / 2.5 | no field | a constraints sentence: "Do not add text, logos or extra people." |
| FLUX.2 | not supported | describe the wanted state precisely; move key words earlier |
| Seedream | no field found | positive wording; tighter refs |
| Midjourney | `--no a, b, c` | keep it short (≤ 6 items); don't `--no` things you never mentioned |
| Some fal/Kling/Wan endpoints | `--negative "…"` passes through where the endpoint has one | the CLI drops it silently where unsupported, so check the dry run body |

Check the dry run: `--dry-run` prints the exact request body, so you can see whether `negative_prompt` was sent.

### 7. Run the estimate → dry run → capped run loop

```sh
# 1. see model, estimate and today's spend; nothing is sent
claudia generate image "[CLAUDIA ID v1] …" --model google/nano-banana-2.1 --aspect 4:5 --resolution 2K \
  --ref refs/claudia/01-front-neutral.jpg --dry-run
# 2. run with a hard cap; it asks before spending
claudia generate image "[CLAUDIA ID v1] …" --model google/nano-banana-2.1 --aspect 4:5 --resolution 2K \
  --ref refs/claudia/01-front-neutral.jpg --max-usd 0.10
# 3. explore cheaply: 1K, 4 variations, then upscale the winner by re-running at 2K/4K with it as a ref
claudia generate image "…" --model google/nano-banana-2.1 --resolution 1K --n 4 --max-usd 0.20
```

In code (agents should never approve their own jobs; a person approves above the threshold):

```ts
import { createMedia, envKeys } from "@useclaudia/media";
const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 0.5, perDayUsd: 5, approveAboveUsd: 0.2 } });
const req = { kind: "image", model: "google/nano-banana-2.1", prompt, aspect: "4:5", resolution: "2K",
  refs: ["refs/claudia/01-front-neutral.jpg"], brand: "claudia" } as const;
console.log(media.estimate(req));                  // { usd: 0.0504, basis: "...", confidence: "list" }
const job = await media.generate(req);
if (!("dryRun" in job)) {
  const done = await media.wait(job.id);           // resolves on needs_approval too
  console.log(done.status, done.outputs[0]?.path, done.provenance.watermark);
}
await media.close();
```

### 8. Iterate one variable at a time

Change one block per round (light, or lens, or pose), keep the rest identical, and keep the seed fixed where the model
honours it. Log each round (prompt version, model, seed, verdict) — see [../prompt-library-management/SKILL.md](../prompt-library-management/SKILL.md).

### 9. Fix the usual failures

| Symptom | Fix |
|---|---|
| She looks like a teenager | Keep "28-year-old woman (adult, late twenties)"; use 50–85 mm instead of wide; add "adult facial proportions, defined cheekbones"; remove "cute", "girl", "petite", "school" |
| Plastic skin | "natural skin texture with visible pores, subtle film grain"; drop "flawless", "perfect skin", "8k" |
| Extra copper streaks / red hair all over | "copper-orange streak panels through the front bangs and one side; the rest jet-black" |
| Garbled text in signs/screens | Don't ask for text you don't need ("blank screen glow"); add real text in the edit step |
| Hands warped | Give hands a job ("holding a mug with both hands"); avoid interlaced fingers; fix with an edit (see [../character-consistency/templates/edit-fix-prompts.md](../character-consistency/templates/edit-fix-prompts.md)) |
| Readable brand logos appear | "unbranded", "plain black laptop lid with one butterfly sticker" |
| Composition ignores your framing | Put shot size and angle earlier; state the aspect in words |
| Too glossy / "AI look" | Name a film stock, add "available light", lower stylisation (`--stylize 50` on Midjourney) |

## Templates

- [templates/prompt-skeletons.md](templates/prompt-skeletons.md) — fill-in five-block skeletons per model.
- [templates/flux2-structured.json](templates/flux2-structured.json) — FLUX.2 JSON prompt with every field.
- [examples/one-scene-five-models.md](examples/one-scene-five-models.md) — one shot written for five models, with costs.

Fill-in (any narrative model):

```text
[ID BLOCK]. She wears [ONE WARDROBE STRING] and [ONE ACTION], [EXPRESSION]. [SETTING: place, props, time, weather].
[SHOT SIZE] from [ANGLE] on a [LENS] at [APERTURE], focus on [POINT]. [KEY LIGHT], [FILL/RIM], [FILM STOCK / FINISH],
natural skin texture. [ASPECT] frame. [CONSTRAINTS: no text, no logos, no extra people].
```

## Check before you finish

- [ ] Brief sentence written; aspect and resolution chosen for the destination.
- [ ] Identity block first and verbatim (if Claudia is in it); age stated as an adult in her late twenties.
- [ ] One wardrobe, one action, one setting — no contradictions.
- [ ] Negatives only on models that support them; positive wording elsewhere.
- [ ] Estimate checked, `--max-usd` set; nothing above the approval threshold run without a person's OK.
- [ ] Output scored with the drift check; no real-person likeness, no readable third-party logos, nothing explicit.
- [ ] The post that uses it will carry the AI label ([../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)).

## Pitfalls

- **Keyword soup** ("masterpiece, 8k, ultra detailed, trending") makes generic glossy images. Describe a photograph.
- **Contradictions** ("golden hour, neon club lighting") produce mud. One light story per image.
- **Too many subjects.** Every extra person is a chance for a face to merge with hers. Background people: "softly out of focus".
- **Prompt drift across a series.** Copy from the library; never retype the ID block from memory.
- **Assuming output is unmarked.** Google images carry SynthID; OpenAI images carry C2PA (checked 2026-10). Keep the
  sidecar and label the post anyway.
- **Midjourney V8 with `--oref`.** Omni reference is V7-only; pin `--v 7`.

## Related skills

- [../photoreal-portrait-prompts/SKILL.md](../photoreal-portrait-prompts/SKILL.md) · [../lifestyle-scene-prompts/SKILL.md](../lifestyle-scene-prompts/SKILL.md)
- [../banner-and-collage-design/SKILL.md](../banner-and-collage-design/SKILL.md) · [../thumbnails-and-covers/SKILL.md](../thumbnails-and-covers/SKILL.md)
- [../character-consistency/SKILL.md](../character-consistency/SKILL.md) · [../prompt-library-management/SKILL.md](../prompt-library-management/SKILL.md)
- [../video-prompting/SKILL.md](../video-prompting/SKILL.md) · [../../build/media-pipelines/SKILL.md](../../build/media-pipelines/SKILL.md)
