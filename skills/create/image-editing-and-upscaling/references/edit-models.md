# Edit-capable models in @useclaudia/media (checked 2026-10)

Read this in step 2 when choosing a model. Prices and capabilities are from the `@useclaudia/media` 0.3.0 docs
(prices as of 2026-10-08). `media.models({ kind: "image" })` or `claudia generate models image` returns the live table
with each price's source URL; trust that over this file when they disagree.

## Image models that edit

"Refs" is how many images the package sends. Image 1 is the image being edited.

| Model id | Refs | Output control | Price (list unless noted) | Watermark | Best at |
|---|---|---|---|---|---|
| `openai/gpt-image-2.5-sunburst` | 16 | aspects 1:1, 16:9, 9:16, 4:5, 3:2, 2:3 · `"WxH"` · transparent | ~$0.013 per 1024² medium image (estimate) | C2PA | Precise local edits: hands, small objects, text removal, cut-outs |
| `openai/gpt-image-2.5-flare` | 16 | same as Sunburst | ~$0.013 per 1024² medium image (estimate) | C2PA | Fast general edits; the default OpenAI image model |
| `openai/gpt-image-2` | 16 | same | $0.053 per 1024² medium ($0.006 low, $0.211 high) | C2PA | When 2.5 models aren't on your account |
| `google/nano-banana-2.1` | 14 | six aspects · 1K, 2K, 4K | $0.0336 1K, $0.0504 2K, $0.113 4K | SynthID | Background swaps, relighting, outpainting, 4K re-renders |
| `google/nano-banana-2` | 14 | six aspects · 512, 1K, 2K, 4K | $0.067 per 1K ($0.045 512px, $0.101 2K, $0.151 4K) | SynthID | Same jobs; 512 px drafts |
| `google/nano-banana-lite` | 14 | six aspects · 1K only | $0.0336 per image | SynthID | Cheap tests of an edit instruction |
| `google/nano-banana-pro` | 14 | six aspects · 1K, 2K, 4K | $0.134 per 1K/2K, $0.24 4K | SynthID | Edits the cheaper tiers fail twice |
| `fal/flux-kontext-pro` | 1 | — | $0.04 per image | — | One image, one instruction; needs an image ref |
| `fal/flux-2-pro` | 4 | six aspects | $0.03 first megapixel, $0.015 per extra | — | Edits that combine up to 4 references |
| `byteplus/seedream-4.5` | 10 | six aspects | $0.04 per image | — | Batches of similar edits |
| `byteplus/seedream-5-flash` | 10 | six aspects | $0.018 per image | — | Lowest-cost batch edits |

Not for editing: `fal/flux-dev` (no refs), `runway/gen4-image` (3 refs as style/character references, not an edit
model in the table).

Shutting down: `openai/gpt-image-1.5` and `openai/gpt-image-1-mini` on 2026-12-01 (replacement
`openai/gpt-image-2.5-flare`). `google/gemini-2.5-flash-image` is retired; `generate()` refuses it with `unsupported`.

## Video edit

| Model id | Input | Price | Notes |
|---|---|---|---|
| `runway/aleph2` | the source video in `refs`, 30 s or shorter | $0.28 per second, 56 credits ($0.56) minimum | Applies one instruction across the clip. Concurrency 1 on Runway. Results expire in 24–48 h: download fast |

Video fix prompt pattern: `Keep everything in the clip the same. Change only: <one change>, consistent in every frame.`
If the first frame itself was wrong, fix the still and regenerate the clip from it instead.

## What the package does not do (0.3.0)

- **No mask input.** Describe the region in words, or use crop-edit-composite (step 4 of the skill).
- **No upscaler model.** Upscale locally or re-render at 4K (see `upscaling-and-export.md`).
- **No `refs` on the MCP `generate_media` tool.** Edits run through `claudia generate … --ref` or the library.
- **No `meta` flag on the CLI.** Transparent backgrounds (`meta.background: "transparent"`) need the library.

## Library form of an edit

```ts
import { createMedia, envKeys } from "@useclaudia/media";

const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 0.5, perDayUsd: 5, approveAboveUsd: 0.2 } });
const job = await media.generate({
  kind: "image",
  model: "openai/gpt-image-2.5-sunburst",
  prompt: "Edit image 1. Preserve exactly: <list>. Change only: <one change>. Nothing else changes.",
  refs: ["./still.png", "./refs/claudia/01-front-neutral.jpg"],
  aspect: "4:5",
  meta: { quality: "high", format: "png" },
});
if ("dryRun" in job) throw new Error("unexpected dry run");
const done = await media.wait(job.id);
console.log(done.status, done.outputs[0]?.path, done.provenance.model, done.provenance.costUsd);
await media.close();
```

A job above `approveAboveUsd` waits in `needs_approval`. An agent never approves its own job; a person calls
`media.approve(id)`.

## Cost sanity check

A typical rescue (two Sunburst fixes at medium quality, one Nano Banana 2.1 outpaint at 2K, one local upscale) is
about $0.013 + $0.013 + $0.0504 = **about $0.08** in provider spend (estimate, checked 2026-10). A full reroll at the
same quality, plus the edits it would still need, usually costs more and loses what was right.
