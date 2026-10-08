# Prompt skeletons (copy, fill the [BRACKETS], delete unused lines)

## Narrative (Nano Banana 2.1 / 2 / Pro, Runway Gen-4 Image)

```text
[ID BLOCK — paste verbatim]. [Reference note: "Image 1 is her face reference; image 2 is the outfit."]
She wears [WARDROBE STRING] and [ACTION], with [EXPRESSION].
[SETTING: place, two or three specific props, time of day, weather].
[SHOT SIZE] from [ANGLE] on a [LENS] lens at [APERTURE], focus on [POINT], background [softly out of focus / sharp].
[KEY LIGHT] with [FILL / RIM], [COLOUR NOTES], the look of [FILM STOCK], natural skin texture with visible pores.
[ASPECT] [vertical / horizontal] frame, [where the subject sits: "her face in the upper third"].
```

## Constraint-led (GPT Image 2.5 Flare / Sunburst)

```text
Create a photoreal image.
Subject: [ID BLOCK].
Wardrobe: [WARDROBE STRING].
Action and expression: [ACTION], [EXPRESSION].
Setting: [SETTING].
Camera: [SHOT SIZE], [ANGLE], [LENS], [APERTURE].
Light: [LIGHT], [FILM STOCK].
Text in image: [none] OR exactly "[TEXT]" in [FONT DESCRIPTION], [POSITION], spelled [L-E-T-T-E-R-S].
Constraints: no other text, no logos, no extra people, adult woman in her late twenties, natural skin texture.
```

## Edit with preserve list (GPT Image 2.5 Sunburst, FLUX Kontext, Nano Banana edit)

```text
Edit image 1. Preserve exactly: [face, freckles, eye colour, expression, hair shape, bangs, copper panel, clip, earrings,
outfit, pose, background, lighting — delete what you are changing].
Change only: [ONE CHANGE, described as the end state].
Do not change anything else.
```

## FLUX.2 JSON

See `flux2-structured.json` in this folder.

## Midjourney V7

```text
[shot type] photo of a 28-year-old woman, [short ID phrases], [wardrobe phrases], [action], [setting phrases],
[light], [lens], [film stock] --ar [W:H] --style raw --stylize [50–150] --oref [approved ref URL] --ow [150–250]
--no [≤ 6 items] --v 7
```

## Seedream batch (one request, several frames)

```text
A consistent photo series of the same woman: [ID BLOCK]. Same outfit in every frame: [WARDROBE]. Same location and
light: [SETTING + LIGHT]. Photoreal, [LENS], [FILM STOCK].
Frame 1: [action/framing].
Frame 2: [action/framing].
Frame 3: [action/framing].
Frame 4: [action/framing].
```

CLI wrapper for any of these:

```sh
claudia generate image "$(cat prompt.txt)" --model [ID] --aspect [AR] --resolution [1K|2K|4K|WxH] \
  --ref [refs/claudia/01-front-neutral.jpg,…] [--seed N] [--n N] [--negative "…" (only where supported)] \
  --brand claudia --max-usd [CAP] --dry-run
```
