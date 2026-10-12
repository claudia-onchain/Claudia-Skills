# Panel prompts: character sheet, style anchor, panels

Three stages. Each later stage passes the earlier outputs as references, which is what keeps one face, one outfit and
one drawing style across 4 or 40 panels. Price every run first (`{ dryRun: true }` or `--dry-run`).

## Stage 1: character sheet (once per character per style)

```text
Character reference sheet on a plain white background, <style line>. The same character shown four times in a row:
front view, three-quarter view, side profile, back view, full body, neutral standing pose, then a row of six head
close-ups with different expressions: neutral, laughing, deadpan, surprised, sleepy, determined.
<character identity block>. <outfit for this series>. Consistent proportions and colours in every view. Adult
proportions and an adult face in every view. No text, no labels, no logos.
```

Claudia's block: paste the short identity block from
[../../claudia-character-bible/SKILL.md](../../claudia-character-bible/SKILL.md) step 2 and keep the five anchors (bob
with heavy bangs, one peach streak, peach star clip, headset mic, freckles). For a stylised comic look, say the style
in the style line, not in the identity block.

Crop the sheet into `refs/<char>/comic-front.png`, `comic-34.png`, `comic-profile.png` and `comic-faces.png`.

## Stage 2: style anchor (the first panel)

Make panel 1 (usually the establishing shot) until it's right. It becomes a reference for every other panel: it fixes
line weight, colour, light and the location.

Style lines (choose one per series, never mix):

```text
A clean digital comic illustration, confident ink line art, flat colours with one soft shadow tone, muted palette with
a single rose-pink accent, gentle film grain.
Glossy semi-realistic webtoon style, soft cel shading, clean line art, cinematic lighting, vertical-scroll comic panel.
Bold graphic comic style, thick black outlines, limited flat palette (near-black, off-white, rose, peach), halftone
shadows.
```

## Stage 3: every other panel

```ts
import { createMedia, envKeys } from "@useclaudia/media";
const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 0.5, perDayUsd: 10, approveAboveUsd: 0.5 } });
const STYLE = "<style line>";
const CHAR = "<identity block> <outfit>";
const refs = ["refs/claudia/comic-front.png", "refs/claudia/comic-34.png", "panels/ep01-01.png"]; // sheet + style anchor
const panels = [
  ["ep01-02", "Medium shot, eye level. She sits on the right third at her desk at dusk, facing left toward an open laptop with a chrome star sticker, easy half-smile. Disco-ball lamp behind her. Empty wall space in the upper-left third."],
  ["ep01-03", "Insert close-up of the laptop screen glowing in the dark: a calendar grid with one slot highlighted. No readable text on the screen, only shapes."],
];
for (const [id, shot] of panels) {
  const job = await media.generate({
    kind: "image", model: "google/nano-banana-2.1", aspect: "4:5", resolution: "2K", refs,
    prompt: `${STYLE}\n${CHAR}\n${shot}\nSame character, outfit, location and lighting as the reference panel. No text, no letters, no speech bubbles, no signs, no logos.`,
  });
  if (!("dryRun" in job)) console.log(id, (await media.wait(job.id)).outputs[0]?.path);
}
await media.close();
```

Reference limits (from the media docs, checked 2026-10): Nano Banana takes up to 14 image refs, OpenAI image models up
to 16. Three to five refs is usually the sweet spot: the character's front and three-quarter sheet crops, the style
anchor, and the previous panel when continuity matters (same scene, same props).

CLI equivalent for a single panel:

```sh
claudia generate image "<STYLE> <CHAR> <shot> No text, no speech bubbles." --model google/nano-banana-2.1 \
  --ref refs/claudia/comic-front.png,refs/claudia/comic-34.png,panels/ep01-01.png --aspect 4:5 --resolution 2K --dry-run
```

## Two characters in one panel

- Pass both characters' sheet crops and say who is where: "Claudia on the left (black bob, peach streak), <other> on
  the right (<their anchors>)". Describe each by anchors, not just names.
- If faces swap or blend, generate the panel with one character, then add the second with an edit prompt that refers
  to "the person on the right" and their reference image.

## Fix, don't re-roll

When one detail is wrong (streak missing, mic gone, prop moved), use an edit on that panel with the panel itself as the
first ref: "Keep everything identical. Only change: add the thin headset microphone along her left cheek." Fix prompts
for common drift: [../../character-consistency/templates/edit-fix-prompts.md](../../character-consistency/templates/edit-fix-prompts.md).

## Panel shapes

| Use | Aspect |
|---|---|
| Strip panel in a 2 × 2 grid | 4:5 (cropped to fit by the template) |
| Webtoon full-width panel | 2:3 or 4:5 for most; 9:16 for a tall reveal; 16:9 or 3:2 for a wide establishing beat |
| Webtoon inset panel | 1:1 |
| Carousel slide | 4:5 |
