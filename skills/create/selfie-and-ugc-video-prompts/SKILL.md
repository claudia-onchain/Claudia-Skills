---
name: selfie-and-ugc-video-prompts
description: Prompts phone-camera, UGC-style vertical clips of an AI character that feel filmed, not rendered — talking-to-camera bedroom vlogs, running selfies in the rain, mirror outfit checks, get-ready-with-me, walk-and-talk at dusk, desk day-in-the-life with the cat, storytime in bed, airplane-window vlogs — with front-camera realism cues, first-frame stills, per-model video prompts (Kling 3, Wan 2.6, Hailuo 2.3, Gemini Omni Flash), native ambient audio, hook-first timing, and the ethics line for UGC (always labelled AI, never fake testimonials). Use when making selfie, vlog or creator-style shorts with Claudia or your own character.
license: MIT
metadata:
  title: "Selfie and UGC video prompts"
  category: create
  summary: "Phone-camera shorts that feel filmed: bedroom vlogs, rain selfies, mirror checks, GRWM — prompts per model, labelled AI."
  level: intermediate
  tags: "ugc, selfie video, vlog, talking to camera, front camera, tiktok, reels, shorts, kling, image to video"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "20 min per clip"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Selfie and UGC video prompts

UGC-style clips are Claudia's core format: she holds the phone, laughs, glances away, the light is whatever the room
has. The look is easy to break — one glossy dolly move or perfect studio light and it reads as an ad. This skill gives
you the realism cues, a prompt card per format, and settings that keep her face and her vibe.

## When to use this

- A short where Claudia talks to camera, films herself, or the viewer sees "her phone's point of view".
- Recreating the owner's room vlog or rain selfie, or extending them into a series.
- A clip looks too polished, too "AI", or she looks younger in selfie framing.

General video mechanics (model choice, stitching, QA, fixes) live in [../video-prompting/SKILL.md](../video-prompting/SKILL.md);
read it first if you have not.

## What you need

- `@useclaudia/cli` + `@useclaudia/media` with a `fal` key (Kling 3 Pro, Wan 2.6, Hailuo 2.3) and/or a `google` key (Omni Flash).
- Her ref pack, especially 01 (front), 05 (laugh) and 09 (phone at arm's length) — see
  [../character-consistency/SKILL.md](../character-consistency/SKILL.md).
- A one-line script or beat idea per clip ([../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md) for the hook).
- [references/ugc-realism-cues.md](references/ugc-realism-cues.md) — read when a clip looks rendered.

## Steps

### 1. Know what makes it read as "filmed on a phone"

Put 3–5 of these in every UGC prompt, never all of them:

- **Lens:** "24mm phone front camera", slight wide-angle edge stretch (not fisheye).
- **Hold:** "phone held at arm's length", "the camera moves with her arm", "propped on a shelf" for static takes.
- **Imperfection:** "subtle natural handshake", "slight auto-exposure breathing", "a moment of soft focus as she leans in".
- **Light:** whatever is there — "overcast window light", "warm bedside lamp", "streetlights and wet reflections".
- **Sound:** "room tone", "rain on concrete", "traffic hum", a laugh, a line of speech.
- **Framing:** she is off-centre sometimes, top of the head cropped when she leans in, the arm visible in selfies.

Avoid: "cinematic", "dolly", "crane", "studio lighting", "perfect skin", "beautiful young woman", "girl".

### 2. Fight selfie-framing age drift

Front-camera wide angles + a bob + bangs + freckles + laughing is the strongest teen-drift trigger there is. Every UGC
first frame and video prompt states **"28-year-old woman (adult)"**; frame from slightly above eye level at arm's
length (not from below, not ultra-close); keep her expression knowing between laughs; reject any frame that reads under
~24 (see [../claudia-character-bible/references/look-constants.md](../claudia-character-bible/references/look-constants.md)).

### 3. Make the first frame like a paused phone video

First frames for UGC are not portraits. Prompt them as a screenshot of a video:

```text
[CLAUDIA ID v1] … <wardrobe string>. A paused frame from a front-camera phone video: she holds the phone at arm's length,
<expression>, <setting>. 24mm phone front camera look, slightly above eye level, <available light>, slight sensor noise,
vertical 9:16, natural skin texture with visible pores, no text, no UI overlay.
```

Run it on `google/nano-banana-2.1` at 2K with refs 01 + 05 + 09 (≈ $0.05, checked 2026-10), score it, then animate.

### 4. Pick the format card

Each card: first-frame setup → video prompt → model and length → audio. Full cards (with first-frame prompts) are in
[templates/ugc-format-cards.yaml](templates/ugc-format-cards.yaml). Short versions:

**A. Talking to camera, bedroom by day (the owner's `room` clip, 14 s)** — `fal/kling-3-pro`, 14 s, audio on (≈ $2.35)
or silent + lip-sync.

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob, heavy bangs with copper-orange
streak panels, orange clip, gold hoops, freckles, olive star crop cami and star pendant. She talks to her phone's front
camera held at arm's length. 0–4s: she laughs and playfully sticks her tongue out, then grins. 4–9s: she glances away to
the side as if remembering something, then back to the lens. 9–14s: she says the line and laughs, shoulders moving.
Claudia (amused, warm, English): "storytime: my agent scheduled a post for 3am and it did numbers." Plain white walls,
ceiling smoke detector, doorway behind her, soft overcast window light. Handheld, subtle natural shake, slight
auto-exposure breathing. Room tone only, no music.
```

**B. Running selfie in the rain (the owner's `rain` clip, 13 s)** — two Kling 3 Pro beats (8 s + 5 s) stitched, or
`fal/wan-2.6` 15 s at 720p ($1.50) trimmed.

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with copper-orange bang streaks,
orange clip, gold hoops, olive cami, tartan mini. She runs across an empty warehouse lot in light rain, phone held at
arm's length, laughing with her mouth open; her chunky silver chain bracelet is large in the foreground. 0–4s: she jogs
toward the lens, rain falling. 4–8s: she half-spins to show the loading docks and yellow bollards, then looks back and
laughs. The camera moves with her arm, bouncing with each step. Overcast blue-grey dusk, wet asphalt reflections, light
rain streaks, a raindrop on the lens edge. SFX: footsteps splashing, rain on concrete, breathless laughter. No music.
```

**C. Mirror outfit check (7–10 s)** — `fal/hailuo-2.3` 10 s ($0.56).

```text
Claudia, 28-year-old woman with a black bob, copper-orange bang streaks and an orange clip, films herself in a tall
bedroom mirror with her phone, turns left then right to show her olive star crop cami and red tartan mini skirt, then
lowers the phone and grins at her reflection. Handheld phone in the mirror, warm lamp light, plants and a photo wall behind.
```

Mirror shots flip her streak side — that's correct, not drift. Keep the phone covering part of her face only briefly.

**D. Get ready with me (15 s, 3 beats)** — Kling 3 Pro 15 s with audio (≈ $2.52) or three Hailuo 6 s shots cut together.

```text
… she sits at a small vanity with the phone propped against the mirror. 0–5s: she clips the small orange clip into the
side of her bangs and checks it. 5–10s: she puts in one thin gold hoop, then the other. 10–15s: she layers the star
pendant chain over her collarbone, looks into the lens and gives a knowing half-smile. Static propped phone, warm bulb
light around the mirror. Claudia (soft, conspiratorial): "the clip goes on last. that's the whole secret." Room tone, no music.
```

**E. Walk-and-talk at dusk (10 s)** — Omni Flash or Kling 3 Pro 10 s.

```text
… cosy black knit jumper, sleeves over her hands. She walks along a New York sidewalk at blue hour holding the phone in
front of her, talking and smiling, shop lights blurred behind her. The camera moves with her walking pace, gentle bounce.
Claudia (relaxed): "the city did the lighting, I just showed up." Ambient: traffic hum, footsteps, distant siren. No music.
```

**F. Desk day-in-the-life with the cat (POV, 8 s)** — `fal/kling-3-pro` 8 s silent.

```text
First-person POV of a desk at night: a laptop with a single pink butterfly sticker, a black butterfly mug, two monitors with
candlestick charts, a grey tabby cat with white paws asleep next to the keyboard. Claudia's hand (fine-line star tattoo on
the wrist, chunky silver chain bracelet) reaches in and gently strokes the cat; the cat stretches. Slight handheld drift,
warm desk lamp plus purple-rose monitor glow. No readable text on the screens.
```

**G. Storytime lying in bed (12 s)** — Kling 3 Pro 12 s with audio, or silent + lip-sync.

```text
… cosy black jumper, lying on her side on a white duvet, phone held above her face, golden-hour light from the window
across her cheek. She tells a story, rolls her eyes, laughs into the pillow, then looks back up at the lens. Claudia
(quiet, amused): "so the cat is technically my CTO now." Room tone, no music.
```

**H. Airplane-window vlog (6 s)** — Hailuo 2.3 6 s ($0.28): "… travel look with cream headphones around her neck,
window seat, she turns the phone from the sunset clouds outside back to her sleepy smile. Cabin hum."

### 5. Put the hook in the first second

The first 1 s decides the scroll. Start the action at 0 s — mid-laugh, mid-run, sunglasses already moving. Never open on
a static face. Write the hook text separately and add it in edit inside the safe zone ([../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md),
[../short-form-editing/SKILL.md](../short-form-editing/SKILL.md)).

### 6. Generate with the approval flow

```sh
claudia generate video "<card A prompt>" --model fal/kling-3-pro --ref frames/room-07-first.jpg \
  --aspect 9:16 --duration 14 --dry-run           # check body: image_url, duration "14", negative_prompt
claudia generate video "<card A prompt>" --model fal/kling-3-pro --ref frames/room-07-first.jpg \
  --aspect 9:16 --duration 14 --negative "teenager, childlike face, extra fingers, morphing face, text, logo" --max-usd 2.50
```

Silent takes for lip-sync need the package API (`meta.audio: false`); the CLI has no meta flag:

```ts
await media.generate({ kind: "video", model: "fal/kling-3-pro", prompt, refs: ["frames/room-07-first.jpg"],
  aspect: "9:16", durationSec: 14, meta: { audio: false } });   // ≈ $1.57 instead of $2.35
```

### 7. QA like a viewer, then like a checker

1. Watch once on a phone at full speed with sound. Does it feel like a person filmed it?
2. Then the frame check: `ffmpeg -i clip.mp4 -vf "fps=1,scale=270:-1,tile=8x2" -frames:v 1 sheet.jpg`, score first/mid/last
   with the 7-point drift check, look hard at the selfie hand and the phone edge (they melt first).

### 8. Label it and keep it honest

- UGC-style AI is exactly what platforms want labelled: TikTok AIGC label, YouTube "altered or synthetic", Meta "AI info",
  X `made_with_ai` — `@useclaudia/social` sets them from the provenance sidecar ([../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)).
- **Never** make AI "customer testimonials", fake reviews or "I tried this product" clips presented as real experiences.
  If a brand pays for a Claudia clip, it is clearly Claudia (an AI character), carries `#ad` and the AI label, and makes
  no claims she couldn't have experienced ([../../grow/brand-deals-and-sponsorships/SKILL.md](../../grow/brand-deals-and-sponsorships/SKILL.md)).
- No real people in frame (passers-by stay blurred and anonymous), no real private homes or recognisable private addresses.

## Templates

- [templates/ugc-format-cards.yaml](templates/ugc-format-cards.yaml) — 10 format cards with first-frame and video prompts, model, length, audio.
- [templates/ugc-shot-checklist.md](templates/ugc-shot-checklist.md) — realism + safety checklist per clip.
- [examples/bedroom-vlog-and-rain-selfie.md](examples/bedroom-vlog-and-rain-selfie.md) — both owner clips end to end, with rejects and fixes.

## Check before you finish

- [ ] 3–5 realism cues in the prompt; no "cinematic", "studio" or glossy camera moves.
- [ ] "28-year-old woman (adult)" in first frame and video prompt; nothing reads young.
- [ ] Action starts at 0 s; one gesture per beat; the selfie hand has five fingers in every frame.
- [ ] Audio intentional: ambient + line, or silent for lip-sync; no surprise music.
- [ ] Scored ≥ 6/7 first/mid/last; AI label set; no testimonial-style claims; `#ad` if paid.

## Pitfalls

- **The "too perfect" tell.** Even light, centred framing and no shake read as an ad. Let her be off-centre for a beat.
- **Phone in frame.** In mirror shots models invent extra phones, cameras or a second hand. Say "one phone in her right hand".
- **Tongue-out and lip bites.** Keep them playful and brief; if a frame reads sexualised, cut it.
- **Rain physics.** Heavy rain hides her face and smears streaks; ask for "light rain".
- **Native voice drift.** Each generation gives her a slightly different voice. For a series, lip-sync one designed voice.
- **Fake platform UI.** Never prompt TikTok/IG interface elements; models garble them and it implies a real post.

## Related skills

- [../video-prompting/SKILL.md](../video-prompting/SKILL.md) · [../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md)
- [../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md) · [../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md)
- [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md) · [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md)
- [../../grow/tiktok-playbook/SKILL.md](../../grow/tiktok-playbook/SKILL.md) · [../../grow/instagram-reels-playbook/SKILL.md](../../grow/instagram-reels-playbook/SKILL.md)
