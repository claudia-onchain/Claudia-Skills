---
name: photoreal-portrait-prompts
description: Ready-to-run photoreal portrait prompts for Claudia (and a method for any character) — studio headshots like the cobalt-blue green-blazer portrait, lamp-lit lounge sunglasses stills, club-light portraits, rain-selfie stills, bedroom close-ups and avatar crops — with lighting recipes (Rembrandt, loop, butterfly, window, tungsten, neon rim), lens and film choices, per-model variants for Nano Banana, GPT Image 2.5, FLUX.2 and Midjourney V7, and fixes for skin, eyes, hands, age drift and extra hair streaks. Use when making profile pictures, avatars, press/about-page portraits, close-up feed photos, or first frames for talking-head videos.
license: MIT
metadata:
  title: "Photoreal portrait prompts"
  category: create
  summary: "Studio, lounge, club, rain and bedroom portraits of Claudia that look photographed, not generated — with lighting recipes and fixes."
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
- The ref pack (at least `01-front-neutral.jpg`, `05-laugh.jpg`, `06-sunglasses.jpg`) from
  [../character-consistency/SKILL.md](../character-consistency/SKILL.md).
- An image key you bring: `claudia keys set google` or `openai` or `fal`.
- [references/portrait-lighting-recipes.md](references/portrait-lighting-recipes.md) — read it when you build a new
  portrait set-up or a portrait looks flat.

## Steps

### 1. Pick the portrait type

| Type | Aspect | Lens | Light recipe | Wardrobe |
|---|---|---|---|---|
| Studio headshot (cobalt) | 2:3 | 85 mm f/2.8 | soft key + clean seamless | Studio (green blazer) |
| Lounge sunglasses | 4:5 or 9:16 | 50 mm f/1.8 | tungsten lamp key | Signature |
| Club portrait | 4:5 | 35 mm f/1.8 | blue-violet haze + rose rim | Signature or Night out |
| Rain selfie still | 9:16 | 24 mm phone | overcast soft + wet bounce | Signature |
| Bedroom close-up | 4:5 | 35–50 mm f/2 | window daylight | Signature / Cosy black |
| Golden-hour bed close-up | 4:5 | 35 mm f/2 | sunset backlight + bounce | Cosy black |
| Avatar | 1:1 | 85 mm f/2.8 | soft key, plain backdrop | Studio or Cosy black |

### 2. Start every prompt with the ID block and an age anchor

```text
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy
straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange
hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown
eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on
her arms (small stars, a rose, a sun).
```

Portraits magnify age cues, so add one more adult cue after it: "adult facial proportions, defined cheekbones".

### 3. Use the prompt for the type

**A. Studio headshot on cobalt (recreates `portrait-blue`)** — Nano Banana 2.1, 2:3, 2K.

```text
[CLAUDIA ID v1] … adult facial proportions, defined cheekbones. Image 1 is her face reference. She wears a soft green
unstructured blazer over an olive ribbed top. Head-and-shoulders studio portrait, square to camera, chin slightly down,
eyes into the lens, knowing closed-lip half-smile. Seamless saturated cobalt-blue paper backdrop, evenly lit. Large soft
key light just above eye level and slightly left, white bounce fill from below, a faint hair light from behind to separate
the black hair from the blue. 85mm lens at f/4, everything from nose to ears sharp. Natural skin texture with visible
pores and freckles, soft rose lip tint, minimal makeup. Clean editorial colour, no grain. Vertical 2:3 frame.
```

```sh
claudia generate image "$(cat prompts/portrait-cobalt.txt)" --model google/nano-banana-2.1 \
  --ref refs/claudia/01-front-neutral.jpg --aspect 2:3 --resolution 2K --max-usd 0.10
```

**B. Lounge sunglasses still (recreates `lounge`)** — 9:16 or 4:5.

```text
[CLAUDIA ID v1] … Image 1 is her face; image 2 shows her in sunglasses. She wears an olive-green fine-knit crop cami
with a scalloped copper-orange edged neckline and small orange embroidered stars, a star pendant on layered silver chains,
a red-and-green tartan pleated mini skirt with a studded black belt. She leans back against a dark wood dresser, one hand
lifting oversized black oval sunglasses down her nose, looking over the top of them into the lens with a knowing smile.
Warm butter-yellow wall behind her with framed botanical cross-stitch prints; a brass table lamp with a pleated cream
shade glowing at frame left. Medium shot from the waist up, eye level, 50mm at f/1.8, focus on her eyes above the frames.
Tungsten lamp key from the left, soft falloff to the right, Kodak Gold 200, gentle grain. Vertical 9:16 frame.
```

**C. Club portrait (recreates `club`)** — 4:5.

```text
[CLAUDIA ID v1] … She wears the olive crop cami with orange stars, layered chains with a star pendant, tartan mini skirt
and oversized black oval sunglasses. She stands in front of a DJ booth, chin up, mid-laugh, one hand at her collarbone.
Behind her, softly out of focus, a DJ at the decks and a crowd with raised hands, blue-violet haze cut by moving-head beams.
Medium shot, slightly low angle, 35mm at f/1.8. Cool blue-violet ambient light, a rose-pink rim light #ff6fa5 on her hair
and shoulder, CineStill 800T halation around the beams. Background people anonymous and unrecognisable, no readable
logos on the equipment. Vertical 4:5 frame.
```

**D. Rain selfie still (recreates `rain`)** — 9:16, phone look.

```text
[CLAUDIA ID v1] … She wears the olive crop cami, layered chains, tartan mini skirt and a chunky silver chain bracelet.
Front-camera selfie at arm's length, her arm reaching toward the lens at the bottom of the frame, slightly above eye
level, laughing with her mouth open, rain on her face and in her bangs. Behind her an empty warehouse lot: wet asphalt
with puddle reflections, grey roll-up loading-dock doors, yellow bollards, an overcast blue-grey sky. iPhone front-camera
look: 24mm equivalent, slight HDR sky, soft overcast light, raindrops streaking, a little motion blur at the edges.
Vertical 9:16 frame, her face in the upper third.
```

**E. Bedroom daylight close-up (recreates `room`)** — 4:5.

```text
[CLAUDIA ID v1] … She wears the olive crop cami with orange stars and the layered silver chains with a star pendant.
Medium close-up, talking to the camera mid-sentence, eyebrows raised, a playful grin. Plain white walls, a ceiling smoke
detector, an open doorway behind her, soft overcast window light from camera left. Phone-on-a-tripod look: 26mm
equivalent at eye level, everything in focus, slight sensor noise. Natural skin texture, freckles visible. 4:5 frame.
```

**F. Golden-hour bed close-up (recreates the sunset banner face)** — 4:5, then crop for avatars.

```text
[CLAUDIA ID v1] … She wears an oversized fuzzy black knit jumper with the sleeves over her hands. She lies on her front
on a white duvet, chin resting on her folded arms, eyes to the lens, knowing closed-lip half-smile. Behind her a
floor-to-ceiling window, the Manhattan skyline and a low orange sun. Close-up at mattress height, 35mm at f/2, focus on
her eyes. Warm golden backlight making a copper halo in her hair, window bounce on her face, Kodak Portra 400, gentle
grain. 4:5 frame.
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

Generate type A or F at 2K, then crop a face-centred square (keep hair and hoops inside; circles crop corners):

```sh
# 2:3 portrait 1365x2048 → square face crop, then sizes for each network
ffmpeg -i portrait.png -vf "crop=1100:1100:132:260,scale=800:800" -q:v 3 avatar-800.jpg
ffmpeg -i avatar-800.jpg -vf scale=400:400 -q:v 3 avatar-400.jpg
```

Check the circle: the copper panel and one hoop must still be visible inside the round mask. The logo of the platform is
her face — use the same crop everywhere so it reads as one identity.

### 6. Score and fix

Run the 7-point drift check ([../character-consistency/SKILL.md](../character-consistency/SKILL.md)). Portrait-specific fixes:

| Problem | Fix prompt (edit, preserve list first) |
|---|---|
| Reads under 25 | "Change only: adult late-twenties facial proportions — slightly longer face, more defined cheekbones and jaw, calmer expression." Also switch 35 → 85 mm and drop any high angle |
| Waxy skin | "Change only: restore natural skin texture with visible pores and freckles; keep makeup minimal." Regenerate with a film stock named if it persists |
| Eye colour drift | "Change only: eye colour to warm brown, same shape and catchlights." |
| Catchlights missing / dead eyes | add "a soft square catchlight in each eye from the key light" |
| Teeth too many / too white | prefer closed-lip smile in portraits; edit "natural off-white teeth, normal count" |
| Bangs side-swept | "heavy straight blunt bangs just above the brows" as the only change |
| Extra streak on the other side | "Change only: make the hair on the right side jet-black; keep the copper panel in the front bangs." |
| Hoops oversized | "small thin gold hoops about 2 cm across" |
| Hands near the face warped | crop tighter, or edit "relaxed hand, five fingers, natural knuckles" |

## Templates

- [templates/portrait-prompts.md](templates/portrait-prompts.md) — 12 portrait prompts with settings and CLI lines.
- [examples/cobalt-studio-portrait.md](examples/cobalt-studio-portrait.md) — a full session: dry run, 3 rounds, fixes, avatar export.

## Check before you finish

- [ ] ID block + adult cue present; lens 50 mm or longer for close portraits (except the phone-selfie look).
- [ ] Light recipe named; one light story only.
- [ ] Drift check ≥ 6/7, no age doubt, eyes brown, bangs straight, one copper panel side.
- [ ] Skin has texture; teeth and hands natural.
- [ ] Background people anonymous; no readable logos.
- [ ] Avatar crop keeps panel and a hoop inside the circle.
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
