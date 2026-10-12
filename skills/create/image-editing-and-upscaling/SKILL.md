---
name: image-editing-and-upscaling
description: Fixes and extends AI images by editing instead of regenerating — inpainting a region, outpainting to a new aspect, background swaps, relighting, face and hand fixes, text and logo removal, and upscaling for print or 4K — with the edit-capable models in @useclaudia/media (GPT Image 2.5 Sunburst, Nano Banana 2.1 and Pro, FLUX Kontext, FLUX.2, Seedream, Runway Aleph 2 for video), a crop-edit-composite method for exact regions, local upscalers, and a provenance chain that survives every edit. Use when an image is mostly right but one part is wrong, when a still must be widened or cut down for another format, when a background, light or outfit detail needs to change, when an image needs more pixels, or when someone asks "can you fix this instead of making a new one".
license: MIT
metadata:
  title: "Image editing and upscaling"
  category: "create"
  summary: "Edit, don't reroll: inpaint, outpaint, swap backgrounds, relight, fix hands and upscale, with a provenance chain per edit."
  level: "intermediate"
  tags: "image editing, inpainting, outpainting, background swap, relighting, upscaling, hands, provenance, c2pa"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "5–15 min per image"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Image editing and upscaling

A reroll throws away everything that was right to fix one thing that was wrong. This skill edits instead: one change per
call, with a preserve list, on the model best suited to that change, and then upscales only as far as the destination
needs. Every edit is logged parent to child so the final file still has a provenance trail and an honest AI label.

## When to use this

- An image scores well on identity and composition but has one defect: a hand, an extra hair streak, garbled text, a
  stray logo, a crooked horizon.
- A square still must become a 16:9 banner, a 9:16 cover or a 3:1 header without losing the subject (outpainting).
- The scene is right but the place or light is wrong: swap the background, move the key light, change day to night.
- A file is too small for where it is going (print, 4K banner, a 2048 px avatar master).
- A short video clip has one bad stretch and the rest is good (Runway Aleph 2).

Not for: changing who a real person is, putting a real person in a scene they were never in, removing someone else's
watermark or AI label, or "cleaning" a photo you don't have the rights to. Those are refused here.

## What you need

- `@useclaudia/media` (library) or `@useclaudia/cli` (`claudia generate`), with at least one key for an edit-capable
  provider: `openai`, `google`, `fal` or `byteplus` (`claudia keys set openai`, and so on). Keys stay in the environment
  or keychain; never print them.
- The source image and, if it came from the library, its `.json` provenance sidecar
  (`~/.claudia/media/library/YYYY-MM/<jobId>-1.png.json`).
- For characters: the reference anchor (for Claudia, `refs/claudia/01-front-neutral.jpg`) and the preserve list from
  [character-consistency](../character-consistency/SKILL.md).
- `ffmpeg` for padding, cropping, compositing and resizing. Optional: a local upscaler (Real-ESRGAN ncnn or Upscayl)
  and `c2patool` to inspect Content Credentials.
- Spend limits set before any agent edits: `limits: { perJobUsd: 0.5, perDayUsd: 5, approveAboveUsd: 0.2 }`.

## Steps

1. **Decide: edit or regenerate.** Score the image first (identity, composition, light, hands, text). Edit when the
   subject and framing are right and at most two things are wrong. Regenerate when identity broke (a different face,
   the wrong hair colour all over), when the pose or framing is wrong, or after three failed edits on the same defect.
   Edits on top of edits drift: restart from the best clean version every 3–4 edits.

2. **Pick the model for the job.** Full table with prices in [references/edit-models.md](references/edit-models.md)
   (prices from the package docs, checked 2026-10). Short version:

   | Job | First choice | Why |
   |---|---|---|
   | Precise local fix (hand, text, small object) | `openai/gpt-image-2.5-sunburst` | Best for precise edits; transparent backgrounds; C2PA |
   | Background swap, relight, outpaint | `google/nano-banana-2.1` | Keeps the subject well; 1K/2K/4K output; up to 14 refs |
   | An edit 2.1 failed twice | `google/nano-banana-pro` | Higher-priced Google tier, 14 refs; $0.134 per 1K/2K image |
   | One image, one instruction, low cost | `fal/flux-kontext-pro` | Single-ref edit model, $0.04 per image |
   | Batch of similar edits | `byteplus/seedream-5-flash` | Edit with up to 10 refs, $0.018 per image |
   | Video: one bad stretch | `runway/aleph2` | Edits a source clip of 30 s or less; $0.28 per second, 56 credits minimum |

   `fal/flux-dev` takes no refs and cannot edit. The MCP `generate_media` tool has no `refs` field, so edits go through
   the CLI (`--ref`) or the library (`refs: [...]`).

3. **Write the edit as preserve + one change.** Image 1 is always the image being edited; extra refs come after it.
   Copy the prompt for your job from [templates/edit-prompts.md](templates/edit-prompts.md):

   ```sh
   claudia generate image "Edit image 1. Preserve exactly: her face, freckles, hair, the peach streak, the star clip, \
   headset mic, outfit, pose, background and lighting. Change only: her right hand has exactly five naturally \
   proportioned fingers, relaxed, holding the cup handle. Nothing else changes." \
     --model openai/gpt-image-2.5-sunburst --ref ./club-still.png --aspect 4:5 --max-usd 0.10
   ```

   The CLI shows the model, the estimate and today's spend, then asks before it spends. One change per call; score
   again after each.

4. **Crop, edit, composite exact regions.** The package has no mask parameter, so a region is named in words.
   When the model keeps touching things outside the region, cut the region out, edit only the crop, and paste it back:

   ```sh
   ffmpeg -i still.png -vf "crop=320:320:600:640" hand.png          # w:h:x:y of the region
   claudia generate image "Edit image 1. Fix only the hand: five fingers, relaxed. Keep colours, light and edges." \
     --model openai/gpt-image-2.5-sunburst --ref ./hand.png --aspect 1:1 --max-usd 0.10
   ffmpeg -i still.png -i hand-fixed.png -filter_complex "[1]scale=320:320[f];[0][f]overlay=600:640" still-fixed.png
   ```

   Pick a crop whose edges fall on plain surfaces, and check the seam at 200% zoom.

5. **Outpaint by padding first.** Pad the canvas to the target size with flat grey, then ask the model to fill only
   the grey. For a 1024×1024 still to 16:9:

   ```sh
   ffmpeg -i still.png -vf "pad=1824:1024:400:0:color=0x808080" padded.png
   claudia generate image "Edit image 1. The flat grey areas on the left and right are empty canvas. Extend the scene \
   into them: the same silver-foil backdrop, the same flash light and grain. Do not change anything in the centre." \
     --model google/nano-banana-2.1 --ref ./padded.png --aspect 16:9 --resolution 2K
   ```

   Keep the subject where the final crop needs it (banner safe areas: [banner-and-collage-design](../banner-and-collage-design/SKILL.md)).
   Extend by at most about one image-width per pass; go in two passes for 3:1.

6. **Swap background, then relight.** Do them in separate calls: first the place, then the light, so a failure tells you which
   instruction broke. Name the light the new background implies (direction, colour, hardness) and ask for matching
   shadows and edge light on the subject, or the cut-out look gives it away. For a clean cut-out on transparency, use
   the library: `meta: { background: "transparent", format: "png" }` on an OpenAI image model.

7. **Upscale only as far as needed.** Read [references/upscaling-and-export.md](references/upscaling-and-export.md)
   before choosing. Three routes:
   - **Local upscaler** (pixels only, no new content, no provider bill): `realesrgan-ncnn-vulkan -i in.png -o out-4x.png -n realesrgan-x4plus`, then downscale to the exact size with `ffmpeg -i out-4x.png -vf "scale=2048:2048:flags=lanczos" master-2048.png`.
   - **Re-render at 4K** with the image as ref (`--model google/nano-banana-2.1 --resolution 4K`, $0.113 per image,
     checked 2026-10). It is a new generation: compare face, text and hands against the source before you keep it.
   - **Regenerate natively larger** when the composition is still open; cheaper in drift than a big upscale.

8. **Log the chain and label the result.** Every edit is a new job with its own sidecar. Add one row per step to
   [templates/edit-log.csv](templates/edit-log.csv): parent file, job id, model, the one change, cost, local tools.
   Local tools (ffmpeg, upscalers, most editors) drop C2PA; SynthID is built to survive common edits; the log is the
   provenance after that. Check with `c2patool <file>` before and after. The final image is AI-generated or
   AI-altered: label it per [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md).

A worked rescue of a club still (hand fix, text removal, outpaint to a 3:1 header, upscale, provenance log) is in
[examples/club-still-rescue.md](examples/club-still-rescue.md).

## Templates

- [templates/edit-prompts.md](templates/edit-prompts.md) — preserve-list prompts for inpaint, outpaint, background
  swap, relight, text and logo removal, face and hand fixes, clean-up for upscaling, and a video fix.
- [templates/edit-log.csv](templates/edit-log.csv) — parent-to-child edit chain with cost and tools per step.

Fill-in for any single edit:

```text
EDIT TYPE: <inpaint | outpaint | background | relight | text-removal | face | hands | rerender>
SOURCE: <file> (job <jobId or "outside library">)
MODEL: <model id> · REFS: image 1 = <source>; image 2 = <anchor or style ref, optional>
PROMPT: Edit image 1. Preserve exactly: <list>. Change only: <one change>. Nothing else changes.
MAX USD: <0.10> · APPROVED BY: <name>
```

## Check before you finish

- [ ] Each call made one change, and the image was scored after each one.
- [ ] Side-by-side with the source at 100% and 200%: identity, hands, edges and seams hold; nothing outside the change
      moved.
- [ ] Output size matches the destination exactly; no upscale beyond what it needs.
- [ ] Spend stayed under the caps; no job above `approveAboveUsd` ran without a person approving it.
- [ ] The edit log has one row per step, ending with the final file's sha256.
- [ ] The final carries the AI label for its platform; no watermark, credit or label was removed from anyone's image.
- [ ] No real person's likeness was added, changed or placed in a new scene.

## Pitfalls

- **Five changes in one prompt.** The model does three, invents two, and you can't tell which failed. One change per call.
- **Edit chains.** The face drifts a little with every pass. Go back to the best clean version every 3–4 edits.
- **Background swaps that ignore light.** A studio-lit subject on a sunset street looks pasted. Relight in the next call.
- **Upscaling garbage.** A 4x upscale of a bad hand is a sharp bad hand. Fix first, upscale last.
- **Treating a 4K re-render as an upscale.** It redraws the image; freckles, text and fingers can change. Compare.
- **Outpainting too far in one pass.** Beyond about one image-width the new area repeats or loses perspective.
- **Losing the sidecar.** Files exported from editors have no sidecar and no C2PA. Keep the log next to the final.
- **Stripping marks.** Removing a provider watermark, a stock watermark or another creator's credit is not an edit this
  skill does.

## Related skills

- [character-consistency](../character-consistency/SKILL.md) — preserve lists, drift scoring and the 12 face fixes.
- [image-prompting-fundamentals](../image-prompting-fundamentals/SKILL.md) — writing the base image well so it needs fewer edits.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels, C2PA and SynthID after editing.
- [banner-and-collage-design](../banner-and-collage-design/SKILL.md) — safe areas for outpainted banners.
- [pfp-and-avatar-sets](../pfp-and-avatar-sets/SKILL.md) — upscaled masters for avatar exports.
- [media-pipelines](../../build/media-pipelines/SKILL.md) — running edits in a batch with caps and approvals.
