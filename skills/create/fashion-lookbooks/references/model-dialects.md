# One look, six models: prompt dialects for lookbooks

Read this in step 4, when picking a model and writing the per-pose prompts. Model ids are `@useclaudia/media` ids;
prices are list prices from the package's model table (checked 2026-10). The look below is Claudia's **Silver night**
from the character bible, written as a lock (step 2 of the skill).

```text
[LOOK silver-night v1] a liquid-silver column gown, floor length, high round neck, long fitted sleeves, fluid satin-metal
fabric that catches light in soft vertical ripples; a white faux-fur stole draped over both elbows; a crystal choker,
three rows of small round crystals; strappy silver heels with thin ankle straps. Metal is silver, never gold.
```

## Which model for which job

| Job | Model | Why | Price hint |
|---|---|---|---|
| Character + look in a new pose, with refs | `google/nano-banana-2.1` | up to 14 refs; pass 2–3 identity refs + the garment ref | ~$0.05 at 2K |
| Keep the outfit identical, change only the pose or crop | `openai/gpt-image-2.5-sunburst` | built for precise edits; explicit "keep" lists | ~$0.013 medium 1024² (estimate) |
| Exact garment colours | `fal/flux-2-pro` | JSON prompts with HEX tied to objects; multi-ref | $0.03 first MP + $0.015/MP |
| A matching set of 4–10 poses in one go | `byteplus/seedream-4.5` | sequential batch generation, refs | $0.04 each |
| Swap one item ("same image, change the shoes") | `fal/flux-kontext-pro` | single image + instruction | $0.04 |
| Mood boards before the shoot | Midjourney V7 (manual, in its own app) | `--oref` and `--sref` for look exploration | your plan |

## The same shot in each dialect

Pose: full-length, three-quarter turn to camera left, one hand lifting the stole, cobalt studio, direct flash.

**Nano Banana 2.1 — a narrative paragraph, positive wording, refs named.**

```text
[CLAUDIA ID v2] … (the full identity block). She wears [LOOK silver-night v1] … (the full lock), matching the gown in
image 3 exactly. Full-length shot, she stands in a three-quarter turn toward camera left, weight on the back foot, one
hand lifting the edge of the white stole, chin level, a cool direct gaze. A deep cobalt-blue paper backdrop and matching
carpet, direct on-camera flash, crisp shadow to the right. 50mm lens at chest height. Cool clean grade, lifted blacks,
gentle film grain, chrome highlights. No text, no readable logos. Vertical 2:3 frame.
```

Refs: `refs/claudia/01-front-neutral.jpg`, `refs/claudia/07-full-body.jpg`, `looks/silver-night/gown-flat.jpg`.

**GPT Image 2.5 Sunburst — edit an approved frame; say what must not change.**

```text
Edit image 1. Change only her pose: she now walks toward the camera mid-stride, the stole sliding off one shoulder.
Keep exactly the same: her face, hair, peach streak, star clip, headset mic, freckles; the silver gown's neckline,
sleeves, length and fabric ripples; the stole; the three-row crystal choker; the heels; the cobalt backdrop and the
flash lighting. Do not add text, logos, jewellery or people.
```

**FLUX.2 pro — JSON, HEX tied to objects, refs by number.**

```json
{
  "subject": "Claudia from image 1: 28-year-old adult woman, glossy jet-black jaw-length blunt bob, heavy straight bangs, one peach-orange streak panel, small peach star hair clip, thin headset mic, light freckles",
  "wardrobe": "the silver column gown from image 2: floor length, high round neck, long fitted sleeves, liquid satin-metal fabric; white faux-fur stole; three-row crystal choker; strappy silver heels",
  "pose": "three-quarter turn toward camera left, one hand lifting the stole",
  "background": "deep cobalt paper backdrop and carpet",
  "color_palette": ["#c9ccd3 gown", "#ece9e2 stole", "#1f3a8a backdrop", "#ff9a6b hair streak"],
  "lighting": "direct on-camera flash, crisp shadow to the right",
  "camera": "50mm, chest height, full length",
  "style": "photoreal fashion lookbook, fine grain, natural skin texture"
}
```

**Seedream 4.5 — ask for the set, numbered, one pose per image.**

```text
A set of 4 fashion lookbook photos of the same woman from the reference images, wearing the same silver column gown,
white faux-fur stole, crystal choker and silver heels in every image, on the same cobalt studio set with direct flash:
1) full-length front, hands relaxed; 2) three-quarter turn, lifting the stole; 3) back view looking over her shoulder;
4) seated on a white cube, legs crossed at the ankle. Identical face, hair, peach streak, star clip and headset mic in
all four. Cool clean grade, gentle film grain. No text, no logos.
```

**FLUX Kontext pro — one change, one sentence.**

```text
Replace the silver heels with white patent platform boots; keep everything else in the image exactly the same.
```

**Midjourney V7 (exploration only, manual).**

```text
full-length fashion photo, adult woman in a liquid-silver column gown and white faux-fur stole, crystal choker, cobalt
studio, direct flash, three-quarter turn --ar 2:3 --style raw --oref <approved-ref-url> --ow 150 --no text, logos, gold --v 7
```

Midjourney runs in its own app under its own terms; nothing here calls it. Use it for mood, then rebuild the keepers
with refs in one of the package models so the identity holds.

## Checks per frame

- Garment: neckline, sleeve length, hem length, fabric finish and colour match the lock and the garment ref.
- Accessories: the right count (one choker, three rows), the right metal (silver).
- Character: five anchors visible unless the pose hides one; reads as a woman in her late twenties.
- Hands and fabric: no extra fingers, no fabric merging into skin, straps that go somewhere.
- Background: same set and light across the lookbook.
