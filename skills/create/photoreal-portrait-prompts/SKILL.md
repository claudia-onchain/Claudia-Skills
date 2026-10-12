---
name: photoreal-portrait-prompts
description: Ready-to-run photoreal portrait prompts for Claudia (and a method for any character) — the official silver-foil portrait, white-studio visor stills, club-light portraits, club flash selfies, cobalt-studio editorials and avatar crops — with lighting recipes (Rembrandt, loop, butterfly, window, tungsten, neon rim), lens and film choices, per-model variants for Nano Banana, GPT Image 2.5, FLUX.2 and Midjourney V7, and fixes for skin, eyes, hands, age drift and extra hair streaks. Use when making profile pictures, avatars, press/about-page portraits, close-up feed photos, or first frames for talking-head videos.
license: MIT
metadata:
  title: "Photoreal portrait prompts"
  category: create
  summary: "Silver-foil, studio, club and cobalt portraits of Claudia that look photographed, not generated — with lighting recipes and fixes."
  level: intermediate
  tags: "portrait, headshot, avatar, photoreal, lighting, studio, skin texture, nano banana, gpt image, flux"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "20 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Photoreal portrait prompts

Portraits are where an AI character is judged hardest: skin, eyes, teeth and hair at full size. This skill gives
copy-ready portrait prompts for every Claudia setting, the lighting recipes behind them, and a fix for each failure that
makes a portrait read "AI" or makes her read too young.

## When to use this

- Profile pictures and avatars (X 400×400, Instagram 320×320, YouTube 800×800; checked 2026-10).
- About-page, press-kit and media-kit portraits.
- Close-up feed photos (4:5) and story frames (9:16).
- First frames for talking-head or lip-sync videos ([../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md)).

## What you need

- The identity block, wardrobe strings and settings from [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md).
- The ref pack (at least `01-front-neutral.jpg`, `05-laugh.jpg`, `06-visor.jpg`) from
  [../character-consistency/SKILL.md](../character-consistency/SKILL.md).
- An image key you bring: `claudia keys set google` or `openai` or `fal`.
- [references/portrait-lighting-recipes.md](references/portrait-lighting-recipes.md) — read it when you build a new
  portrait set-up or a portrait looks flat.

## Steps

### 1. Pick the portrait type

| Type | Aspect | Lens | Light recipe | Wardrobe |
|---|---|---|---|---|
| Official portrait (silver foil) | 2:3 | 85 mm f/2.8 | hard on-camera flash | Signature |
| Visor still (white studio) | 4:5 or 9:16 | 50 mm f/2.8 | soft daylight from one side | Sky or Patent |
| Club portrait | 4:5 | 35 mm f/1.8 | spotlight backlight + rose rim | Club |
| Club flash selfie still | 9:16 | 24 mm phone | phone flash + spotlight | Club |
| Studio talking still | 4:5 | 50 mm f/4 | soft even daylight | Studio |
| Cobalt full-length editorial | 2:3 | 50 mm f/5.6 | direct flash | Silver night or Holo |
| Avatar | 1:1 | 85 mm f/2.8 | soft key, plain backdrop | Studio or Silver night |

### 2. Start every prompt with the ID block and an age anchor

```text
[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores.
```

Portraits magnify age cues, so add one more adult cue after it: "adult facial proportions, defined cheekbones".

### 3. Use the prompt for the type

**A. Official portrait on silver foil (recreates `portrait-official`)** — Nano Banana 2.1, 2:3, 2K.

```text
[CLAUDIA ID v2] … adult facial proportions, defined cheekbones. Image 1 is her face reference. She wears a white glossy
vinyl top with huge crinkled puffed sleeves and a high ruched neck. She looks back over her shoulder in half profile, one
hand at her collar, eyes into the lens, cool, direct gaze; the headset mic along her cheek, the peach streak and the star
clip clearly visible. Crinkled silver-foil backdrop. Hard on-camera flash, deep dark edges, sparkle highlights on the
foil. 85mm lens at f/2.8, eyes sharp. Natural skin texture with visible pores and freckles, glossy coral lips, minimal
makeup. Clean editorial colour, fine grain. Vertical 2:3 frame.
```

```sh
claudia generate image "$(cat prompts/portrait-official.txt)" --model google/nano-banana-2.1 \
  --ref refs/claudia/01-front-neutral.jpg --aspect 2:3 --resolution 2K --max-usd 0.10
```

**B. Visor still, white studio (recreates the `visor on / off` series)** — 9:16 or 4:5.

```text
[CLAUDIA ID v2] … Image 1 is her face. She wears a floor-length cloud-print halter gown with a mint satin halter band and
an orange shield visor. She stands three-quarter to camera, one hand behind her back, the other lifting the visor up into
her bangs, looking straight into the lens. Seamless pale grey-white paper, soft daylight from the left, a long soft
shadow on the floor. Medium shot from the waist up, eye level, 50mm at f/2.8, focus on her eyes under the visor edge.
Clean editorial colour, gentle grain. Vertical 9:16 frame.
```

**C. Club portrait (recreates `look-03`)** — 4:5.

```text
[CLAUDIA ID v2] … She wears a silver quilted puffer. She leans toward the lens, head tilted, eyes to camera. Behind her
one bright spotlight blooms into the frame; dancers in silver puffers stand soft and out of focus on both sides, light
haze. Medium close-up, eye level, 35mm at f/1.8. Hard backlight, warm-silver colour, a rose-pink rim light #ff6fa5 on
her cheek, CineStill 800T halation around the spotlight. Background people anonymous and unrecognisable, no readable
logos. Vertical 4:5 frame.
```

**D. Club flash selfie still** — 9:16, phone look.

```text
[CLAUDIA ID v2] … She wears a silver quilted puffer. Front-camera selfie at arm's length, her arm reaching toward the lens
at the bottom of the frame, slightly above eye level, laughing with her mouth open, the phone flash on her face. Behind
her the dark club, one spotlight and blurred silver puffers. iPhone front-camera look: 24mm equivalent, flash-bright
skin, a little motion blur at the edges. Vertical 9:16 frame, her face in the upper third.
```

**E. Studio talking still (recreates a frame of `studio.mp4`)** — 4:5.

```text
[CLAUDIA ID v2] … She wears a cropped white puffed-sleeve shirt with a small star pin, a black patent pleated mini skirt
and long black patent gloves. Medium shot, talking to the camera mid-sentence, eyebrows raised, a playful grin.
Seamless pale grey-white paper behind her, soft even daylight. Locked-off camera at eye level, 50mm at f/4, everything in
focus. Natural skin texture, freckles visible. 4:5 frame.
```

**F. Cobalt full-length editorial (recreates `wall-1` / `wall-3`)** — 2:3.

```text
[CLAUDIA ID v2] … She wears a liquid-silver column gown, a white faux-fur stole low on the arms, a wide crystal choker and
strappy silver heels. Full length on a deep cobalt-blue paper backdrop and matching carpet, hands at her waist, one hip
out, eyes to the lens. Direct on-camera flash, crisp shadows on the paper. 50mm at f/5.6, eye level. Saturated film colour,
fine grain. 2:3 frame.
```

More types (avatar, B&W editorial, flash snapshot, glasses-and-screens) are in
[templates/portrait-prompts.md](templates/portrait-prompts.md).

### 4. Port to another model when needed

- **GPT Image 2.5 Sunburst** for "same portrait, change one thing" (new blazer colour, remove a stray hair): use the
  preserve-list edit from [../image-prompting-fundamentals/templates/prompt-skeletons.md](../image-prompting-fundamentals/templates/prompt-skeletons.md).
  `--model openai/gpt-image-2.5-sunburst --ref portrait.jpg --resolution 1024x1536`.
- **FLUX.2 Pro** when the backdrop must match a brand HEX: `"background": "seamless paper backdrop #2f5bd8"`.
- **Midjourney V7** for exploring new portrait moods: short phrases + `--oref <ref> --ow 200 --style raw --stylize 75 --ar 2:3 --no teen, text --v 7`.

### 5. Make the avatar crop

Generate type A or F at 2K, then crop a face-centred square (keep hair and mic inside; circles crop corners):

```sh
# 2:3 portrait 1365x2048 → square face crop, then sizes for each network
ffmpeg -i portrait.png -vf "crop=1100:1100:132:260,scale=800:800" -q:v 3 avatar-800.jpg
ffmpeg -i avatar-800.jpg -vf scale=400:400 -q:v 3 avatar-400.jpg
```

Check the circle: the peach streak and the headset mic must still be visible inside the round mask. The logo of the platform is
her face — use the same crop everywhere so it reads as one identity.

### 6. Score and fix

Run the 7-point drift check ([../character-consistency/SKILL.md](../character-consistency/SKILL.md)). Portrait-specific fixes:

| Problem | Fix prompt (edit, preserve list first) |
|---|---|
| Reads under 25 | "Change only: adult late-twenties facial proportions — slightly longer face, more defined cheekbones and jaw, calmer expression." Also switch 35 → 85 mm and drop any high angle |
| Waxy skin | "Change only: restore natural skin texture with visible pores and freckles; keep makeup minimal." Regenerate with a film stock named if it persists |
| Eye colour drift | "Change only: eye colour to grey-green, same shape and catchlights." |
| Catchlights missing / dead eyes | add "a soft square catchlight in each eye from the key light" |
| Teeth too many / too white | prefer closed-lip smile in portraits; edit "natural off-white teeth, normal count" |
| Bangs side-swept | "heavy straight blunt bangs just above the brows" as the only change |
| Extra streak on the other side | "Change only: make the hair on the right side jet-black; keep the peach streak in the front bangs." |
| Mic too big | "a thin headset mic about 2 cm across" |
| Hands near the face warped | crop tighter, or edit "relaxed hand, five fingers, natural knuckles" |

## Templates

- [templates/portrait-prompts.md](templates/portrait-prompts.md) — 12 portrait prompts with settings and CLI lines.
- [examples/silver-foil-portrait.md](examples/silver-foil-portrait.md) — a full session: dry run, 3 rounds, fixes, avatar export.

## Check before you finish

- [ ] ID block + adult cue present; lens 50 mm or longer for close portraits (except the phone-selfie look).
- [ ] Light recipe named; one light story only.
- [ ] Drift check ≥ 6/7, no age doubt, eyes brown, bangs straight, one peach streak side.
- [ ] Skin has texture; teeth and hands natural.
- [ ] Background people anonymous; no readable logos.
- [ ] Avatar crop keeps panel and the headset mic inside the circle.
- [ ] The post or profile carries the AI label / "AI-generated character" bio line.

## Pitfalls

- **Beauty-filter words** (flawless, porcelain, perfect skin) remove the freckles and add years of "AI".
- **High angle + wide lens + bangs** is the fastest way to teenage drift.
- **Ring-light everything.** It flattens her. Use a directional key with falloff.
- **Sunglasses portraits without a face ref.** Without the eyes the model invents a new face; always pass ref 06.
- **Over-sharpening on upscale** turns pores into noise; upscale by regenerating at 2K/4K with the 1K as a ref.

## Related skills

- [../image-prompting-fundamentals/SKILL.md](../image-prompting-fundamentals/SKILL.md) · [../lifestyle-scene-prompts/SKILL.md](../lifestyle-scene-prompts/SKILL.md)
- [../character-consistency/SKILL.md](../character-consistency/SKILL.md) · [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md)
- [../thumbnails-and-covers/SKILL.md](../thumbnails-and-covers/SKILL.md) · [../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md)
- [../../grow/media-kit-and-pitching/SKILL.md](../../grow/media-kit-and-pitching/SKILL.md)
