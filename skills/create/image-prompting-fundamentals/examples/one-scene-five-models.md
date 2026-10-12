# Worked example: one shot, five models

Brief: "A 4:5 feed photo of Claudia at the club under one spotlight, for a Friday-night caption." Refs:
`refs/claudia/01-front-neutral.jpg` (face), `refs/claudia/11-flash-foil.jpg` (light).

Prices are the package's list/estimate figures (checked 2026-10). Each run used `--max-usd` and a dry run first.

## 1. Nano Banana 2.1 (photoreal default)

```sh
claudia generate image "[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black \
jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the \
rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light \
freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; \
natural skin texture with visible pores. Image 1 is her face reference; image 2 shows the light I want. She wears a \
silver quilted puffer and leans toward the lens with her head tilted, eyes to camera. Behind her one bright spotlight \
blooms into the frame; dancers in silver puffers stand soft and anonymous on both sides; light haze. Medium close-up at \
eye level on a 35mm lens at f/2, focus on her eyes, the crowd softly out of focus. Hard backlight, a rose rim light on \
her cheek, the look of CineStill 800T with gentle halation. Vertical 4:5 frame, her face in the upper third." \
  --model google/nano-banana-2.1 --ref refs/claudia/01-front-neutral.jpg,refs/claudia/10-club-light.jpg \
  --aspect 4:5 --resolution 2K --max-usd 0.10
```

Result: 7/7 on the drift check. Cost $0.0504. Kept.

## 2. GPT Image 2.5 Flare (when a sign must read correctly)

Variant brief: a neon sign behind her reading "OPEN LATE".

```text
Create a photoreal image.
Subject: [CLAUDIA ID v2] (as above), matching the woman in image 1.
Wardrobe: a silver quilted puffer.
Action and expression: leaning toward the lens, head tilted, cool direct gaze.
Setting: a dark club, one spotlight behind her, a small rose-pink neon sign on the black wall behind her.
Text in image: exactly "OPEN LATE" on the neon sign, thin tube lettering, spelled O-P-E-N L-A-T-E. No other text.
Camera: medium close-up, eye level, 50mm, f/2.
Light: hard spotlight backlight on her hair, rose neon glow #ff6fa5 on her shoulder, CineStill 800T look.
Constraints: no logos, no extra people, adult woman in her late twenties, natural skin texture.
```

`--model openai/gpt-image-2.5-flare --resolution 1088x1360 --ref refs/claudia/01-front-neutral.jpg --max-usd 0.10`
(1088×1360 = 4:5, both edges multiples of 16.) Sign read correctly on the first run. 6/7 (clip hidden). Kept.

## 3. FLUX.2 Pro (exact palette for a campaign)

```json
{
  "scene": "a dark club with one spotlight and haze",
  "subjects": [{
    "description": "Claudia from image 1: 28-year-old adult woman, glossy jet-black jaw-length blunt bob, heavy straight bangs, one peach-orange streak panel in the front bangs on one side, small peach star hair clip, a thin headset mic, light freckles, grey-green eyes",
    "wardrobe": "a silver quilted puffer",
    "position": "right third, leaning toward camera",
    "action": "head tilted, eyes to the lens",
    "expression": "cool direct gaze"
  }],
  "background": "dancers in silver puffers soft and anonymous, light haze",
  "lighting": "hard spotlight backlight, warm-silver rim on her hair, rose accent glow #ff6fa5 on her cheek",
  "color_palette": ["#0a0b0d shadows", "#c9ccd3 silver puffer", "#ff9a6b peach streak", "#ff6fa5 accent"],
  "camera": "Sony A7 IV, 50mm f/2, eye level, focus on her eyes",
  "style": "photoreal, CineStill 800T, gentle halation and grain, natural skin texture"
}
```

`--model fal/flux-2-pro --aspect 4:5 --ref refs/claudia/01-front-neutral.jpg --max-usd 0.06` — about $0.045 at ~2 MP.
Palette exact; bangs slightly side-swept → fixed with a Kontext edit ("make the bangs heavy, straight and blunt, just
above the brows; change nothing else", $0.04).

## 4. Seedream 4.5 (four frames of the same night)

```text
A consistent photo series of the same woman: [CLAUDIA ID v2] (as above). Same outfit in every frame: a silver quilted
puffer. Same location and light: a dark club, one spotlight, haze, CineStill 800T look, 35mm.
Frame 1: leaning toward the lens, head tilted.
Frame 2: laughing, head tipped down, hand in her hair.
Frame 3: seated on a low ledge by the dance floor, holding a can of sparkling water.
Frame 4: close-up, eyes to lens, the spotlight flaring behind her.
```

`--model byteplus/seedream-4.5 --aspect 4:5 --ref refs/claudia/01-front-neutral.jpg --max-usd 0.20` with
`sequential_image_generation` passed through `meta.providerOptions` in code. $0.16 for four. 3 of 4 scored ≥ 6/7.

## 5. Midjourney V7 (mood exploration, manual)

```text
medium close-up photo of a 28-year-old woman in a dark club leaning toward the camera, glossy jet-black
jaw-length blunt bob, heavy straight bangs, one peach-orange streak panel, small peach star hair clip, a thin headset mic,
freckles, a silver quilted puffer, one spotlight behind her, haze, rose rim light, 35mm,
CineStill 800T --ar 4:5 --style raw --stylize 100 --oref https://<your-host>/refs/claudia/01-front-neutral.jpg --ow 200
--no text, logo, teen --v 7
```

Good mood, weaker identity (5/7: eye colour drifted to hazel). Used only as a light reference for later Nano Banana runs.

## What this shows

- Nano Banana with two labelled refs was the best identity-per-dollar.
- GPT Image 2.5 is the pick whenever text must read.
- FLUX.2 JSON nails a palette but needed one edit.
- Seedream batches are efficient when you want a set.
- Midjourney is for exploring looks, not for her face.
