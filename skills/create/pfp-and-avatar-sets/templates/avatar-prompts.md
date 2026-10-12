# Avatar prompts

Generate at 1:1, 2K, 4 candidates, then score the 48 px and 32 px circle previews. Replace every `<placeholder>`.

## Character master (any adult character)

```text
<identity block from the bible, word for word>. Head-and-shoulders portrait, face centred, eyes slightly above centre,
looking into the lens, <one wardrobe look>, plain <backdrop colour> backdrop, soft light from one side, 85mm lens,
<grade>. Large face in frame, nothing near the corners. No text, no logos.
```

Use `--aspect 1:1 --resolution 2K --n 4` and the character's brand kit (`--ref` the front anchor if the kit has no refs).

## Claudia variant edits (from the locked primary)

Edit, don't regenerate: the face and crop stay identical. Image 1 is the primary master.

```text
Edit image 1. Preserve exactly: her face and identity, freckles, grey-green eyes, expression, the glossy jet-black
jaw-length bob, heavy straight bangs, the one peach-orange streak in the front bangs, the small peach star clip, the
thin headset mic, the crop, the framing and the eye line. Change only: <one allowed change>.
```

Allowed changes that worked:

| Variant | Change only |
|---|---|
| Club week | the top is a silver quilted puffer and the backdrop is near-black with one soft spotlight glow behind her head |
| Cobalt | the backdrop is deep cobalt-blue paper with direct flash and crisp shadows |
| Silver night | she wears a liquid-silver gown neckline with a white faux-fur stole on the shoulders |
| Launch day | a thin rose (#ff6fa5) ring at the outer edge of the image, nothing else changes |

## Faceless agent mark

```text
A single <object or mascot head> as an app-icon style mark, centred, filling 65% of the frame, <material: glossy
enamel | chrome | soft clay>, <one accent colour, hex> on a flat <backdrop colour, hex> background, soft studio light
from the top left, gentle shadow, no text, no letters, no logos, nothing near the corners.
```

Examples of objects that read at 32 px: a desk lamp, a disco ball, a paper plane, a chart candle, a star, a speech
bubble. Avoid thin lines and small details.

## Creator illustration (from the creator's own photo, with their consent)

```text
Edit image 1. Turn this photo of me into a <flat vector | soft 3D | ink-and-wash> portrait. Keep my face shape,
hairline, glasses and expression recognisable. Head-and-shoulders, face centred, plain <colour> background, one
accent colour <hex>. No text.
```

Only ever the account owner's own photo. Never a photo of someone else.

## Coin mark (token image that doubles as the coin's avatar)

```text
A bold, simple mascot mark for a coin called <name>: <the idea in one line>, centred and filling 70% of the frame,
thick clean shapes, <2–3 colours, hex>, flat <backdrop colour> background, readable as a tiny circle. No text, no
ticker, no numbers, no charts, no coins stacked, no rockets, no logos of real brands.
```

Then build the rest of the launch visuals in [coin-launch-art-kit](../../coin-launch-art-kit/SKILL.md).

## Alt text

```text
AI-generated image: <who or what>, <crop>, <backdrop>, <one distinctive detail>.
```

Example: `AI-generated image: Claudia, head and shoulders, black bob with a peach streak in the bangs and a star clip,
on a pale grey backdrop.`
