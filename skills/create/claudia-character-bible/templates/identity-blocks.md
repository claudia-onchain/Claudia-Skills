# Claudia identity blocks — copy exactly

Version: **CLAUDIA ID v2** (2026-10-09). v1 is retired: never use it, including for old series.

## Long (photoreal image + video, most models)

```text
[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy
straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach
star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks;
grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores.
```

## Short (tight budgets: Hailuo, Midjourney, SFX-style fields)

```text
Claudia, 28-year-old woman, glossy black jaw-length bob, heavy straight bangs, one peach-orange streak in the bangs, small
peach star hair clip, thin headset mic, light freckles, grey-green eyes, cool direct gaze
```

## Midjourney (use with an omni reference of an approved ref image)

Omni Reference (`--oref`, weight `--ow` 0–1000, default 100) is a **V7** feature; on V8.x (default since 2026-07-24) it is
rendered by V7 or not at all, so pin `--v 7` for identity work (checked 2026-10). `--cref` is legacy and ignored.

```text
photo of a 28-year-old woman, glossy jet-black jaw-length blunt bob with heavy straight bangs and one peach-orange streak
in the bangs, small peach star hair clip, thin headset mic, light freckles, grey-green eyes, cool direct gaze --oref <ref-url> --ow 250 --style raw --v 7
```

## JSON (FLUX.2 structured prompt subject)

```json
{
  "subject": {
    "name": "Claudia",
    "age": "28-year-old adult woman",
    "hair": "glossy jet-black jaw-length blunt bob, heavy straight bangs, one peach-orange streak panel through the front bangs on one side, rest jet-black",
    "accessories": ["small peach star-shaped hair clip at the side", "thin headset microphone along her cheek"],
    "face": "light freckles across nose and cheeks, grey-green almond eyes, straight dark brows, glossy coral lips, cool direct gaze, natural skin texture"
  }
}
```

## Wardrobe strings (append one after the ID block)

| Look | String |
|---|---|
| Signature | `wearing a white glossy vinyl top with huge crinkled puffed sleeves and a high ruched neck` |
| Studio | `wearing a cropped white puffed-sleeve shirt with a small star pin, a black patent pleated mini skirt and long black patent gloves` |
| Silver night | `wearing a liquid-silver column gown, a white faux-fur stole low on the arms, a wide crystal choker and strappy silver heels` |
| Holo | `wearing a holographic high-neck mini dress with wide bell sleeves, knee-high white patent platform boots and tiny orange oval sunglasses` |
| Sculpture | `wearing a sculptural white patent shell dress with clear bubble windows and white platform boots` |
| Patent (green) | `wearing a green patent blazer over a white satin slip, orange goggles` |
| Patent (cobalt) | `wearing a cobalt patent trench coat over white satin, an orange shield visor` |
| Sky | `wearing a floor-length cloud-print halter gown with a mint satin halter band, an orange shield visor` |
| Club | `wearing a silver quilted puffer` |

## Negative block

```text
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept
bangs, extra streaks, gold jewellery, tattoos, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text,
watermark, logo
```
