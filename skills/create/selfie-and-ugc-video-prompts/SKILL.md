---
name: selfie-and-ugc-video-prompts
description: Prompts phone-camera, UGC-style vertical clips of an AI character that feel filmed, not rendered — talking-to-camera studio vlogs, flash selfies at the club, mirror outfit checks, get-ready-with-me, walk-and-talk out of the club, desk day-in-the-life with the disco ball, storytime on the foil set, visor-reveal vlogs — with front-camera realism cues, first-frame stills, per-model video prompts (Kling 3, Wan 2.6, Hailuo 2.3, Gemini Omni Flash), native ambient audio, hook-first timing, and the ethics line for UGC (always labelled AI, never fake testimonials). Use when making selfie, vlog or creator-style shorts with Claudia or your own character.
license: MIT
metadata:
  title: "Selfie and UGC video prompts"
  category: create
  summary: "Phone-camera shorts that feel filmed: studio vlogs, club selfies, mirror checks, GRWM — prompts per model, labelled AI."
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
- Recreating the owner's room vlog or club selfie, or extending them into a series.
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
- **Sound:** "room tone", "bass through the floor", "a flash pop", a laugh, a line of speech.
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
[CLAUDIA ID v2] … <wardrobe string>. A paused frame from a front-camera phone video: she holds the phone at arm's length,
<expression>, <setting>. 24mm phone front camera look, slightly above eye level, <available light>, slight sensor noise,
vertical 9:16, natural skin texture with visible pores, no text, no UI overlay.
```

Run it on `google/nano-banana-2.1` at 2K with refs 01 + 05 + 09 (≈ $0.05, checked 2026-10), score it, then animate.

### 4. Pick the format card

Each card: first-frame setup → video prompt → model and length → audio. Full cards (with first-frame prompts) are in
[templates/ugc-format-cards.yaml](templates/ugc-format-cards.yaml). Short versions:

**A. Talking to camera, white studio (the owner's `studio` clip, 14 s)** — `fal/kling-3-pro`, 14 s, audio on (≈ $2.35)
or silent + lip-sync.

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob, heavy bangs with one peach-orange
streak panel, star clip, headset mic, freckles, a cropped white puffed-sleeve shirt with a star pin, a black patent mini
skirt and long black patent gloves. She talks to a locked-off camera. 0–4s: she laughs and starts a story. 4–9s: a big
open smile, a small sway side to side. 9–14s: she says the line, then settles into a calm, steady gaze.
Claudia (amused, warm, English): "storytime: my agent scheduled a post for 3am and it did numbers." Seamless pale
grey-white studio paper, soft even daylight. The camera does not move. Room tone only, no music.
```

**B. Flash selfie at the club (13 s)** — two Kling 3 Pro beats (8 s + 5 s) stitched, or `fal/wan-2.6` 15 s at 720p
($1.50) trimmed.

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with a peach-orange bang streak,
star clip, headset mic, a silver quilted puffer. She holds the phone at arm's length in a dark club, the phone flash on,
laughing with her mouth open. 0–4s: she talks to the lens, the spotlight blooming behind her. 4–8s: she half-spins to show
the crowd in silver puffers, then looks back and laughs. The camera moves with her arm, bouncing to the beat. Haze, one
hard spotlight, flash-bright skin. SFX: bass through the floor, crowd noise, breathless laughter. No music.
```

**C. Mirror outfit check (7–10 s)** — `fal/hailuo-2.3` 10 s ($0.56).

```text
Claudia, 28-year-old woman with a black bob, a peach-orange bang streak and an star clip, films herself in a tall
studio mirror with her phone, turns left then right to show her the white puffed-sleeve vinyl top and black patent mini skirt, then
lowers the phone and grins at her reflection. Handheld phone in the mirror, mirror bulbs, a clothing rail and polaroids behind.
```

Mirror shots flip her streak side — that's correct, not drift. Keep the phone covering part of her face only briefly.

**D. Get ready with me (15 s, 3 beats)** — Kling 3 Pro 15 s with audio (≈ $2.52) or three Hailuo 6 s shots cut together.

```text
… she sits at a small vanity with the phone propped against the mirror. 0–5s: she clips the small peach star clip into the
side of her bangs and checks it. 5–10s: she settles the headset mic along her cheek. 10–15s: she pins the small star pin to her collar, looks into the lens and gives a cool, direct gaze. Static propped phone, warm bulb
light around the mirror. Claudia (soft, conspiratorial): "the clip goes on last. that's the whole secret." Room tone, no music.
```

**E. Walk-and-talk out of the club (10 s)** — Omni Flash or Kling 3 Pro 10 s.

```text
… a silver quilted puffer. She walks down a dark corridor out of the club holding the phone in front of her, talking and
smiling, the bright doorway behind her. The camera moves with her walking pace, gentle bounce. Claudia (relaxed): "the
flash did the lighting, I just showed up." Ambient: muffled bass behind a door, footsteps. No music.
```

**F. Desk day-in-the-life with the disco ball (POV, 8 s)** — `fal/kling-3-pro` 8 s silent.

```text
First-person POV of the studio desk: a laptop with a chrome star sticker, a black mug with a chrome star, two monitors with
candlestick charts, the disco ball on its stand next to the keyboard. Claudia's hand in a long black patent glove reaches
in and gives the disco ball a spin; light points slide across the screens. Slight handheld drift, rose lamp plus
purple-rose monitor glow. No readable text on the screens.
```

**G. Storytime on the foil set (12 s)** — Kling 3 Pro 12 s with audio, or silent + lip-sync.

```text
… the white glossy vinyl puffed-sleeve top, sitting on an apple box in front of the silver foil, phone propped on a light
stand, one modelling light across her cheek. She tells a story, rolls her eyes, laughs into her sleeve, then looks back up
at the lens. Claudia (quiet, amused): "so the disco ball is technically my CTO now." Room tone, no music.
```

**H. Visor-reveal vlog (6 s)** — Hailuo 2.3 6 s ($0.28): "… the Sky gown with the orange visor down, she lifts the visor
into her bangs and looks into the front camera, a slow smile. White studio, soft daylight. Room tone."

### 5. Put the hook in the first second

The first 1 s decides the scroll. Start the action at 0 s — mid-laugh, mid-spin, the visor already moving. Never open on
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
- [examples/studio-vlog-and-club-selfie.md](examples/studio-vlog-and-club-selfie.md) — both owner clips end to end, with rejects and fixes.

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
- **Spotlight blowout.** A spotlight right behind her head burns out the bangs and the streak; put it "above and behind her, not behind her face".
- **Native voice drift.** Each generation gives her a slightly different voice. For a series, lip-sync one designed voice.
- **Fake platform UI.** Never prompt TikTok/IG interface elements; models garble them and it implies a real post.

## Related skills

- [../video-prompting/SKILL.md](../video-prompting/SKILL.md) · [../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md)
- [../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md) · [../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md)
- [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md) · [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md)
- [../../grow/tiktok-playbook/SKILL.md](../../grow/tiktok-playbook/SKILL.md) · [../../grow/instagram-reels-playbook/SKILL.md](../../grow/instagram-reels-playbook/SKILL.md)
