# Edit prompts: preserve list + one change

Image 1 is always the image being edited. Put any anchor or style reference as image 2. Paste a `{PRESERVE}` block,
then exactly one change. Replace every `<placeholder>`.

## Preserve blocks

Character (Claudia, matches the v2 bible):

```text
Preserve exactly: her face and identity, freckles, grey-green eyes, expression, the glossy jet-black jaw-length bob,
heavy straight bangs, the one peach-orange streak in the front bangs, the small peach star clip, the thin headset mic,
outfit, pose, hands, background, lighting and colour grade.
```

Any character:

```text
Preserve exactly: <character>'s face and identity, <hair>, <signature accessory>, <outfit>, pose, hands, background,
lighting and colour grade.
```

Product or object:

```text
Preserve exactly: the <object>'s shape, proportions, materials, colours, every printed mark on it, the camera angle,
the background and the lighting.
```

## Inpaint (one region)

```text
Edit image 1. {PRESERVE} Change only: <the region, located plainly: "the cup in her left hand", "the sign on the back
wall, top right">. Make it <the new state>. Keep its size, perspective and light the same as the surrounding area.
Nothing else changes.
```

## Remove text, logos or a stray object

```text
Edit image 1. {PRESERVE} Change only: remove all text, letters, numbers and logos from <the background | the jacket |
the phone>. Replace them with plain matching surface: same material, colour and light. Nothing else changes.
```

## Outpaint (after padding with ffmpeg)

```sh
# 1024×1024 → 16:9 (1824×1024): 400 px grey each side
ffmpeg -i in.png -vf "pad=1824:1024:400:0:color=0x808080" padded.png
# 1024×1024 → 9:16 (1024×1824): 400 px grey top and bottom
ffmpeg -i in.png -vf "pad=1024:1824:0:400:color=0x808080" padded.png
```

```text
Edit image 1. The flat grey areas at the <left and right | top and bottom> are empty canvas. Extend the scene into
them: <what continues there — "the same cobalt paper backdrop and carpet">, matching perspective, light direction,
grain and colour. Do not change anything inside the original area. No new people, no text.
```

Use `--aspect` equal to the padded ratio. Two passes for 3:1 (square → 16:9 → 3:1 crop of a wider second pass).

## Background swap

```text
Edit image 1. {PRESERVE except background} Change only: replace the background with <new place, concrete: "a dark
club, one bright spotlight behind her, dancers in silver puffers out of focus">. Keep her exact outline, hair edges
and the shadow under her feet. Nothing about her changes.
```

Then relight in a separate call if the light doesn't match.

## Relight

```text
Edit image 1. {PRESERVE except lighting} Change only the light: <key light: direction, colour, hardness — "a hard
on-camera flash from the front, deep dark edges">, <fill: "almost no fill">, <rim: "a cool blue rim from behind on her
hair">. Shadows and highlights on her face, hair and clothes follow the new light. Same colours of objects, same grain.
```

## Face fix (identity drift or age drift)

```text
Edit image 1. Replace the face with the face of the woman in image 2 — same eyes, brows, nose, lips, freckles and skin
tone — matched to image 1's angle, lighting and expression. She is a woman in her late twenties. Keep everything
else in image 1 identical.
```

Only ever with your own character's reference image. Never a real person's photo.

## Hand fix

```text
Edit image 1. {PRESERVE} Change only: her <left | right> hand has exactly five naturally proportioned fingers,
<relaxed | holding the cup handle | resting on the desk>, short natural nails. Fix only that hand.
```

If it fails twice, crop the hand (`ffmpeg -vf "crop=w:h:x:y"`), edit the crop, and composite it back.

## Clean-up before upscaling

```text
Edit image 1. {PRESERVE} Change only: remove compression blocks and banding, keep natural skin texture with visible
pores and film grain. Do not smooth or retouch. Nothing else changes.
```

## 4K re-render

```text
Reproduce image 1 exactly at higher resolution. Same face, freckles, hair, outfit, pose, background, light and grain.
Do not add, remove or restyle anything.
```

## Video fix (Runway Aleph 2, clip of 30 s or less)

```text
Keep everything in the clip the same. Change only: <one change — "remove the logo on the speaker at the back left">,
consistent in every frame.
```
