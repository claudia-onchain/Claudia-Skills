# Prompts for merch designs and mockups

Copy, fill the `<placeholders>`, and price every run first (`--dry-run` or `media.estimate()`). Designs are made flat
and transparent; mockups are made separately, from the finished design. Never let a mockup model "improve" the design.

## 1. Flat print design (transparent PNG)

Library (OpenAI images take `background: "transparent"`):

```ts
import { createMedia, envKeys } from "@useclaudia/media";
const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 1, perDayUsd: 10, approveAboveUsd: 0.5 } });
const job = await media.generate({
  kind: "image",
  model: "openai/gpt-image-2.5-flare",
  aspect: "4:5",
  prompt: "<design prompt below>",
  meta: { quality: "high", background: "transparent", format: "png" },
});
if (!("dryRun" in job)) console.log((await media.wait(job.id)).outputs[0]?.path);
await media.close();
```

Design prompt:

```text
Flat vector-style t-shirt graphic on a fully transparent background. <subject, e.g. a large five-point star with softly
rounded points>, <style: bold flat shapes, thick clean outlines, no gradients, no shadows, no glow, no texture>. Colours
only: <#ff9a6b peach>, <#ece9e2 off-white>, <#0a0b0d near-black>. Centred, filling most of the frame, nothing touching
the edges. No text, no letters, no logos, no watermark.
```

Add lettering yourself afterwards in an editor with a licensed font. Image models misspell and warp letters, and you
need the exact text and font for reprints.

Sticker variant: add `with a thick solid off-white border around the whole shape, like a die-cut sticker`.

Embroidery variant: `simple flat badge with 3 colours, large shapes, no fine lines, no small details, no gradients`.

## 2. Template-style mockup from a blank garment photo (edit with references)

Use a photo of the blank product that you shot yourself or have the rights to. If you want to use a provider's blank
product photos, read their terms first. Pass the photo first, the design second.

```sh
claudia generate image "<edit prompt below>" \
  --model openai/gpt-image-2.5-sunburst --ref refs/blank-white-tee.jpg,out/studio-front.png --aspect 4:5 --dry-run
```

Edit prompt:

```text
Place the graphic from the second image onto the chest of the t-shirt in the first image as a screen-printed design,
<9 in> wide, centred, <3 in> below the collar. Keep the graphic's exact shapes and colours; do not redraw, restyle or add
anything to it. It follows the fabric's folds and lighting naturally and looks printed into the cotton, matte, not
glossy. Keep the shirt, background and lighting unchanged. No extra text, labels or logos.
```

Then check the printed area against the print file at 100% zoom. If the model changed the design, paste the real
design over it in an editor (warp it to the folds) instead of re-rolling.

## 3. Lifestyle mockup with the character

For Claudia, paste the identity block from the character bible word for word and keep all five anchors (bob, peach
streak, star clip, headset mic, freckled face). Merch is the outfit for this post; metal stays silver, no tattoos.

```text
[CLAUDIA ID v2] <paste the full identity block>.
She wears a <white heavyweight cotton t-shirt> with <the graphic from the reference image> printed on the chest,
<tucked into a black patent pleated mini skirt>. <White studio: seamless pale grey-white paper, soft daylight from one
side, a soft floor shadow.> Three-quarter view, 50 mm lens, natural skin texture. The printed graphic matches the
reference exactly, flat and matte. No readable logos, no extra text.
```

Library call with references (Nano Banana takes up to 14 image refs):

```ts
await media.generate({
  kind: "image",
  model: "google/nano-banana-2.1",
  aspect: "4:5",
  resolution: "2K",
  refs: ["refs/claudia/01-front-neutral.jpg", "refs/claudia/02-34-left.jpg", "out/studio-front.png"],
  prompt: "<lifestyle prompt above>",
});
```

Other characters: use that character's own identity block and refs. Never a real person.

## 4. Flat lay and product-only shots

```text
Top-down flat lay of a <black> <heavyweight cotton hoodie> on <pale grey seamless paper>, the graphic from the
reference image printed on the chest, matte DTG print. Soft daylight, gentle shadow, a <peach star sticker> and
<a blank folded paper swing tag> beside it. No brand labels, no logos, no text other than the printed design.
```

## Labels to paste

- Alt text: `AI-generated mockup: <product, colour> with <design> printed on the <placement>.`
- On-image tag (small, corner): `AI MOCKUP`
- Listing line: `Images are mockups (<n> AI-generated). Real sample photos: image <n>.`
