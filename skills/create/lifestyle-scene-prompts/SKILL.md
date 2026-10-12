---
name: lifestyle-scene-prompts
description: Prompts and a method for candid scenes that make an AI influencer's feed feel like one lived world — Claudia between takes on the silver-foil set, in the white studio, on the cobalt studio, at the club, at the studio desk with the chrome-star laptop and the disco ball, mirror selfies and photo-dump carousels — with recurring props, candid-realism cues, caption-safe composition for 9:16 and 4:5, Seedream batch sets, per-model variants and fixes for logos, crowds, hands and text. Use when making feed photos, carousels, photo dumps, story frames, collage tiles or scene plates for video first frames.
license: MIT
metadata:
  title: "Lifestyle scene prompts"
  category: create
  summary: "Candid scenes from her world — the foil set, the studios, the club, the desk — that read as real moments, not renders."
  level: intermediate
  tags: "lifestyle, scenes, photo dump, carousel, candid, props, behind the scenes, seedream, nano banana, ai influencer"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "25 min"
  version: "2.0.0"
  updated: "2026-10-09"
---

# Lifestyle scene prompts

Portraits prove who she is; candid scenes prove she has a world. This skill gives you a scene library of Claudia's
recurring sets with copy-ready prompts, the candid cues that stop scenes looking staged, the props that must stay
identical (the disco ball, the laptop sticker, the visor), and a batch method for photo-dump carousels.

## When to use this

- Feed photos and carousels (4:5), story frames (9:16), photo dumps.
- Tiles for a collage banner ([../banner-and-collage-design/SKILL.md](../banner-and-collage-design/SKILL.md)).
- First frames or scene plates for video ([../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md)).
- A content pillar needs a fresh set ([../content-pillars-and-series/SKILL.md](../content-pillars-and-series/SKILL.md)).

## What you need

- ID block, wardrobe and settings from [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md);
  ref pack from [../character-consistency/SKILL.md](../character-consistency/SKILL.md).
- A prop pack (step 3): `refs/props/disco-ball.jpg`, `refs/props/laptop-star.jpg`, `refs/props/visor.jpg`.
- Image keys you bring (`google`, `byteplus`, `openai`, `fal`).
- [references/scene-library.md](references/scene-library.md) — the full prompts for 15 scenes. Read it when you need a
  scene; the steps below show the method with four of them.

## Steps

### 1. Decide what the scene is for

| Destination | Aspect | Composition rule |
|---|---|---|
| IG/Threads feed, carousel | 4:5 | subject in the middle 1080×1350; carousels keep the same light across slides |
| Story / Reel cover / video first frame | 9:16 | face in the upper third; keep the bottom ~350 px and right ~120 px clear of key detail for app UI (checked 2026-10) |
| X / LinkedIn image | 16:9 | subject on a third, negative space on the other side |
| Collage tile | 1:1 or 4:5 | one clear idea per tile; readable at 300 px wide |

### 2. Write the scene as a moment, not a set

A scene prompt has a *moment* (what just happened), a *place* with specific props, and *imperfection*. Template:

```text
[CLAUDIA ID v2 — verbatim]. Image 1 is her face reference[; image 2 is <prop>].
Moment: [what she is doing mid-action, where her attention is].
She wears [ONE WARDROBE STRING].
Place: [setting string + 2–3 lived-in details].
Camera: [who "took" it — a crew member with a phone / tripod / self-timer / mirror], [lens], [angle].
Light: [one light story]. Finish: [film stock or phone look], candid, unposed, natural skin texture.
[ASPECT] frame. Background people anonymous and out of focus; no readable logos or text.
```

Candid cues that work: "caught mid-laugh between takes", "looking off-frame at someone", "slightly off-centre framing",
"a little motion blur in her hand", "a clothing rail and cables at the edge", "taken by a crew member on a phone", "flash
snapshot". Cues that make it staged: "posing", "perfect", "magazine", "symmetrical".

### 3. Keep the props identical

Generate each recurring prop once, approve it, and pass it as a ref whenever it's in frame:

| Prop | Canonical description | Ref |
|---|---|---|
| The disco ball | a 30 cm mirrored disco ball, small square tiles, on a low silver stand | `refs/props/disco-ball.jpg` |
| The laptop | silver-grey unbranded laptop, one chrome star sticker in the centre of the lid | `refs/props/laptop-star.jpg` |
| The visor | orange translucent shield visor, one piece, no frame | `refs/props/visor.jpg` |
| The headset mic | thin skin-tone headset microphone with a small round tip | `refs/props/headset.jpg` |
| The film camera | black-and-silver 35mm rangefinder-style camera, no visible brand | `refs/props/camera.jpg` |

```sh
claudia generate image "Product-style photo of a silver-grey unbranded laptop, lid closed, one chrome star sticker in \
the centre of the lid, on a white desk, soft studio light, no logos, no text" \
  --model google/nano-banana-2.1 --aspect 1:1 --resolution 1K --max-usd 0.05
```

### 4. Four core scenes (full set of 15 in the reference file)

**Studio desk with the disco ball (pillar: platform / behind the scenes)** — 4:5

```text
[CLAUDIA ID v2] … Image 1 is her face; image 2 is the laptop; image 3 is the disco ball. Moment: between takes she leans
back in her chair laughing because the disco ball has just caught the light and thrown sparkles across the screen. She
wears a white glossy vinyl top with huge crinkled puffed sleeves and a high ruched neck. Place: a white desk at the edge of
the studio with the laptop with a chrome star sticker, a black mug with a chrome star, two monitors behind with blurred
candlestick charts (no readable numbers), a tangle of cables, the disco ball on a stand. Camera: taken by a crew member on
a phone from across the room, 26mm, eye level. Light: cool screen glow on her face, a rose-pink lamp rim behind her.
Candid, slight noise, natural skin texture. 4:5. No readable text or logos.
```

**Between takes on the cobalt studio (pillar: style)** — 4:5

```text
[CLAUDIA ID v2] … Image 1 is her face. Moment: she sits on an apple box at the edge of the cobalt-blue paper, laughing at
someone off-frame, one boot up on the box. She wears a holographic high-neck mini dress with wide bell sleeves, knee-high
white patent platform boots and tiny orange oval sunglasses pushed up into her bangs. Place: the cobalt seamless and carpet,
a light stand and a clothing rail at the frame edge. Camera: crew phone, 35mm equivalent, slightly below eye level. Light:
the direct flash just fired, crisp shadow on the paper. 4:5.
```

**Visor up, white studio (pillar: style)** — 4:5

```text
[CLAUDIA ID v2] … Image 1 is her face. Moment: she has just pushed the orange visor up into her bangs and is checking a
take on a monitor off-frame, eyes narrowed. She wears a floor-length cloud-print halter gown with a mint satin halter band.
Place: seamless pale grey-white paper, the gown's train on the floor, a tripod leg at the frame edge. Camera: from behind
the monitor, 50mm, shallow focus. Light: soft daylight from the left, a long floor shadow. 4:5.
```

**Mirror selfie, getting ready (pillar: style)** — 9:16

```text
[CLAUDIA ID v2] … Image 1 is her face; image 2 her full-body proportions. Moment: mirror selfie before the shoot, phone
held at chest height covering the lower edge of her chin, a playful pout breaking into a smile. Studio look: a cropped
white puffed-sleeve shirt with a small star pin, a black patent pleated mini skirt and long black patent gloves.
Place: a tall mirror in a white dressing room, polaroids tucked into the frame, a clothing rail with silver and patent
pieces behind her. Camera: the phone's main camera seen in the mirror, plain black phone case (no logo). Light: mirror
bulbs plus on-camera flash flare in the mirror. 9:16, her face in the upper third.
```

### 5. Batch a photo dump with Seedream (one light, one outfit, 4–6 frames)

A photo dump works when every slide shares light and outfit. Seedream's sequential batch is built for this (refs +
outputs ≤ 15 per batch; checked 2026-10). Prompt:

```text
A candid photo dump of one club night with the same woman: [CLAUDIA ID v2]. Same outfit in every frame: a silver quilted
puffer. Same night, one spotlight and haze, CineStill 800T look, phone camera with flash.
Frame 1: close-up of her laughing into the phone flash, the spotlight blooming behind her.
Frame 2: her hand holding the headset mic away from her cheek, her face blurred in the background.
Frame 3: back to the camera, facing the crowd in silver puffers.
Frame 4: in a taxi back seat after, city lights streaking through the window, head on the window.
Frame 5: the puffer thrown over a chair in the dressing room, no face.
Frame 6: the disco ball on its stand, catching the last light.
```

```ts
const job = await media.generate({
  kind: "image", model: "byteplus/seedream-4.5", aspect: "4:5", prompt: dumpPrompt,
  refs: ["refs/claudia/01-front-neutral.jpg", "refs/props/disco-ball.jpg"],
  meta: { providerOptions: { sequential_image_generation: "auto", sequential_image_generation_options: { max_images: 6 } } },
});
```

Check `media.estimate(...)` first: 6 × $0.04 = $0.24 at list price. If the provider rejects the option, fall back to six
single Nano Banana calls with the same refs and the same light sentence.

### 6. Per-model notes for scenes

- **Nano Banana 2.1:** best default; label every ref by role ("image 3 is the disco ball"). Up to 4 character refs + objects
  within 14 total (checked 2026-10).
- **GPT Image 2.5:** use when a sign, menu or screen must read correctly; put the exact text in quotes.
- **FLUX.2 Pro:** use JSON with `subjects` for two-subject scenes (her + the disco ball) and HEX for brand-coloured light.
- **Midjourney V7:** good for empty set plates without her (`--no people`), which you then composite or use as a style ref.

### 7. Fix the usual scene failures

| Problem | Fix |
|---|---|
| Crowd faces merge with hers | "background people anonymous, softly out of focus, facing away"; fewer people |
| Real brand logos on laptop/phone/club gear | "unbranded", "plain black phone case", "no readable logos"; patch in edit |
| Garbled text on screens/signs | "blurred charts, no readable numbers"; or GPT Image 2.5 with quoted text |
| The disco ball changes size or turns gold | pass `refs/props/disco-ball.jpg` and describe it every time |
| The visor changes colour | "orange translucent shield visor"; pass `refs/props/visor.jpg` |
| Too staged | add a moment and an imperfection; remove "posing" |
| Hands holding things warp | simple grips (mug with both hands), avoid chopsticks/cards; fix with edits |

## Templates

- [templates/scene-builder.yaml](templates/scene-builder.yaml) — fill-in scene spec that renders to a prompt.
- [templates/photo-dump-plan.md](templates/photo-dump-plan.md) — 6-slide carousel planner with caption.
- [examples/sunday-photo-dump.md](examples/sunday-photo-dump.md) — a full carousel, prompts to publish-ready.
- [references/scene-library.md](references/scene-library.md) — 15 scenes ready to paste.

## Check before you finish

- [ ] Scene has a moment, a specific place and one imperfection; one light story.
- [ ] ID block verbatim; recurring props passed as refs and described identically.
- [ ] Composition fits the destination (UI-safe zones for 9:16).
- [ ] No readable third-party logos, no real-person likeness in the background, nothing explicit.
- [ ] Nothing is claimed as a real event, place or shoot with real people ("AI-generated" label on the post).
- [ ] Carousel slides share outfit and light; every slide scored ≥ 6/7 where her face is visible.

## Pitfalls

- **Event claims.** An AI image "at" a club is fine as content; captions must not claim a real venue, event or people.
- **Copying another creator's photo dump.** Recreate *kinds* of moments, never a specific creator's shots.
- **Too many props.** Every prop is a chance for text and logos. Two props per scene.
- **Same angle every slide.** Mix close, detail, wide and no-face frames.
- **Alcohol.** Keep drinks incidental (a glass in hand), never the focus; some platforms age-gate alcohol content.

## Related skills

- [../photoreal-portrait-prompts/SKILL.md](../photoreal-portrait-prompts/SKILL.md) · [../image-prompting-fundamentals/SKILL.md](../image-prompting-fundamentals/SKILL.md)
- [../banner-and-collage-design/SKILL.md](../banner-and-collage-design/SKILL.md) · [../content-pillars-and-series/SKILL.md](../content-pillars-and-series/SKILL.md)
- [../batch-content-production/SKILL.md](../batch-content-production/SKILL.md) · [../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md)
- [../../grow/instagram-reels-playbook/SKILL.md](../../grow/instagram-reels-playbook/SKILL.md)
