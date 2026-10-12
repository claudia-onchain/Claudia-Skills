# Sticker prompts: one style, many expressions

Fill the `<placeholders>`, keep the **style line** and the **character block** identical for every sticker in the pack,
and change only the expression line. Price each run first (`{ dryRun: true }` or `--dry-run`).

## 1. Style line (pick one, never mix in a pack)

```text
STYLE A (bold flat):   Flat vector sticker illustration, bold clean shapes, thick dark outline, simple cel shading
                       with one shadow tone, a thick solid off-white die-cut border around the whole figure, a soft
                       dark drop shadow under the border, fully transparent background.
STYLE B (glossy 3D):   Glossy 3D vinyl-toy style sticker render, smooth plastic surfaces, soft studio light, a thick
                       solid off-white die-cut border around the whole figure, fully transparent background.
STYLE C (emoji head):  Head-and-shoulders emoji icon, very simple flat shapes, thick outline, large readable features,
                       no border, fully transparent background, designed to read at 100 px.
```

Telegram's tip (checked 2026-10): transparent background, white stroke, dark shadow. Style A and B follow it.

## 2. Character block

For Claudia, use the **short identity block** from the character bible, plus the adult guardrail. Stylised does not
mean younger: no chibi or baby proportions for an adult character.

```text
Claudia, 28-year-old woman (adult proportions, adult face), glossy black jaw-length bob, heavy straight bangs, one
peach-orange streak in the bangs, small peach star hair clip, thin headset mic along her cheek, light freckles,
grey-green eyes, glossy coral lips. <outfit: cropped white puffed-sleeve shirt with a star pin>.
```

Another character: its own short identity block and its own palette. Never a real person, never someone else's
character.

## 3. Expression line (one per sticker; from templates/pack-plan.csv)

```text
<expression>, <pose or prop>. Upper body, centred, the figure fills about 85% of the frame, nothing cut off by the
edges. No text, no letters, no logos, no watermark.
```

Examples:

- `warm smile, waving with one gloved hand`
- `full open laugh, eyes closed, shoulders up`
- `deadpan, wearing an orange shield visor, arms crossed`
- `sleepy, head resting on folded arms on a desk`
- `dancing, holding a small disco ball above her head`

Words on stickers ("gm", "noted", "not financial advice") are added afterwards in an editor with a licensed font, in a
rounded box or with a thick outline. Models misspell.

## 4. Generation calls

Library, transparent PNG with the character refs plus the approved first sticker as a style anchor:

```ts
import { createMedia, envKeys } from "@useclaudia/media";
const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 0.5, perDayUsd: 10, approveAboveUsd: 0.5 } });
const style = "<STYLE A line>";
const char = "<character block>";
const refs = ["refs/claudia/01-front-neutral.jpg", "refs/claudia/02-34-left.jpg", "stickers/masters/01-gm.png"];
for (const [id, expr] of [["03-lol", "full open laugh, eyes closed"], ["04-noted", "cool direct gaze, small nod"]]) {
  const job = await media.generate({
    kind: "image", model: "openai/gpt-image-2.5-flare", aspect: "1:1", refs,
    prompt: `${style}\n${char}\n${expr}. Upper body, centred, fills about 85% of the frame. No text, no logos.`,
    meta: { quality: "high", background: "transparent", format: "png" },
  });
  if (!("dryRun" in job)) console.log(id, (await media.wait(job.id)).outputs[0]?.path);
}
await media.close();
```

CLI (no transparency flag; generate on a flat colour and key it, or remove the background in an editor):

```sh
claudia generate image "<style line> <character block> <expression line> Plain flat #00FF00 green background." \
  --model google/nano-banana-2.1 --ref refs/claudia/01-front-neutral.jpg,stickers/masters/01-gm.png --aspect 1:1 --dry-run
```

## 5. Animated sticker from a still

Image-to-video with the approved sticker as the first frame, on a flat green background so it can be keyed:

```text
The sticker character from the image <does one small looping action: bobs to the beat holding the disco ball>. Camera
locked, no zoom, no cut, flat solid #00FF00 green background, the figure stays fully in frame, the last frame matches
the first frame.
```

```sh
claudia generate video "<prompt above>" --model fal/kling-2.6-pro --ref stickers/masters/11-disco-green.png --duration 5 --aspect 1:1 --dry-run
sh scripts/export-animated.sh <downloaded clip> out/telegram/11-disco.webm tg-sticker 0x00FF00
```

Kling 2.6 Pro makes 5 or 10 s; the export script trims to 2.95 s. Check that the loop point doesn't jump; if it does,
pick a 2–3 s stretch that loops or crossfade the ends in an editor. Generated audio is dropped (video stickers must have
no audio stream); pass `meta: { audio: false }` in the library to pay the silent rate where the model supports it.
