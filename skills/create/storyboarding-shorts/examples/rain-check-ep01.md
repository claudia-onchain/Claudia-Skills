# Worked board: "Rain Check" episode 01 (22 s)

Series: **Rain Check** — Claudia goes out in weather other people cancel plans for. Pillar: unfiltered / city.

## Header

```yaml
premise: "Claudia runs through a rainy warehouse lot because the forecast 'dared' her."
payoff: "she stops, soaked, grins: 'rain check? never heard of her.'"
length_s: 22
hook_text: "forecast said stay in"
caption: "rain check? never heard of her"   # + AI label per platform
continuity:
  look: "signature — olive star cami, star pendant, red-and-green tartan mini, studded belt, chunky silver chain bracelet, pink fuzzy slippers"
  hair_state: "s1 dry-ish, damp from s2 on; bangs stay straight; clip in"
  accessories: "no sunglasses; gold hoops"
  light: "overcast blue-grey dusk, wet asphalt reflections"
  props: "phone in her right hand (selfie), nothing else"
  direction: "she moves toward camera and to frame-left"
  capture: "selfie for every shot except the s3 insert"
audio: { line: "rain-01-L1", music: "licensed lo-fi house bed at -18 dB under the rain", ambience: "rain on concrete, footsteps" }
```

## Shots

| Shot | Act | Time | Play / gen | Framing · camera | Action | Audio | Model | Est. |
|---|---|---|---|---|---|---|---|---|
| s1 | hook | 0.0–2.5 | 2.5 / 5 s | MCU selfie · arm moves with her | already running at the lens, laughing | rain, footsteps | `fal/kling-3-pro` | $0.84 |
| s2 | build | 2.5–7.5 | 5 / 6 s | MCU selfie · arm | turns her head to show the loading docks, then back | rain, breath | `fal/kling-3-pro` | $1.01 |
| s3 | build | 7.5–10.0 | 2.5 / 6 s | insert, low · static | pink fuzzy slipper lands in a puddle, splash | splash SFX | `fal/hailuo-2.3` | $0.28 |
| s4 | build | 10.0–16.0 | 6 / 6 s | MS selfie · arm, wider | she spins once under the rain, arm out, laughing | rain, laugh | `fal/hailuo-2.3` | $0.28 |
| s5 | payoff | 16.0–22.0 | 6 / 7 s | CU selfie · arm slowing to still | stops, catches breath, pushes wet bangs aside with one finger, grins, says the line | line + rain | `fal/kling-3-pro` silent → lip-sync | $0.78 + $0.35 |

Video $3.19 · stills (board $0.17 + 5 first frames at 2K $0.25) $0.42 · voice < $0.01 · lip-sync (7 s at $3/min) $0.35
→ **$3.96, budget with 50 % rerolls: $6.00** (package prices, checked 2026-10).

## Board frame prompts (Nano Banana Lite, 1K, $0.0336 each)

- s1: `[CLAUDIA ID v1] … signature look, running toward the phone held at arm's length, laughing, light rain, warehouse lot with roll-up doors behind, overcast dusk, selfie MCU, vertical 9:16, storyboard frame`
- s2: `… same, head turned to her left looking at loading docks and yellow bollards, damp bangs …`
- s3: `close low shot of a pink fuzzy slipper landing in a puddle on wet asphalt, splash frozen mid-air, overcast light, vertical 9:16, storyboard frame`
- s4: `… wider selfie, she spins with one arm out, rain streaks, laughing, damp hair …`
- s5: `… close-up selfie, breathless grin, one finger pushing wet bangs aside, raindrops on skin …`

## Animatic notes (after watching on a phone)

1. s3 at 2.5 s felt slow → cut to 2.0 s, s4 extended to 6.5 s.
2. The line landed at 18.5 s with no breath before it → added 0.4 s of silence before "rain check".
3. Loop: s5 ends tight on her grin; s1 opens on her grin mid-run — the loop works.

## Video prompts (promoted first frames at 2K with refs 01 + 05 + 09)

**s1** (Kling 3 Pro, 5 s, audio on):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with heavy bangs and copper-orange
streak panels, orange clip, gold hoops. She runs toward the phone she holds at arm's length, laughing, light rain falling
on a wet warehouse lot. The camera moves with her arm, bouncing with each step; she moves slightly toward frame-left.
Overcast blue-grey dusk, wet asphalt reflections. SFX: footsteps splashing, rain on concrete, her laugh. No music.
```

**s5** (Kling 3 Pro, 7 s, `meta.audio: false`, she talks so the mouth moves):

```text
Same woman as the first frame … She slows to a stop, catches her breath, pushes her wet bangs aside with one finger — the
copper streak panel stays in place — then grins and talks to the lens. Handheld selfie arm settling to almost still.
Light rain, overcast dusk. Her hand has five relaxed fingers.
```

Then `fal/lipsync-2` with `rain-01-L1.wav`: "rain check? [laughs] never heard of her."

## Approval

Board, animatic and $6.00 cap approved by the channel owner before any video job ran. All shots labelled AI at publish.
