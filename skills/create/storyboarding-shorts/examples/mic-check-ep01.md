# Worked board: "Mic Check" episode 01 (22 s)

Series: **Mic Check** — Claudia does one take at the club, flash on, no retakes. Pillar: silver foil & flash.

## Header

```yaml
premise: "Claudia films one flash selfie at the club because the crew 'dared' her to do it in one take."
payoff: "she stops, out of breath, grins: 'mic check? never heard of her.'"
length_s: 22
hook_text: "one take. that's the rule"
caption: "mic check? never heard of her"   # + AI label per platform
continuity:
  look: "club — a silver quilted puffer"
  hair_state: "bangs straight the whole time; clip in; the streak on her right in selfie view"
  accessories: "headset mic on; no visor"
  light: "dark club, one hard spotlight behind and above her, haze, the phone flash on her face"
  props: "phone in her right hand (selfie), nothing else"
  direction: "she moves toward camera and to frame-left"
  capture: "selfie for every shot except the s3 insert"
audio: { line: "club-01-L1", music: "licensed lo-fi house bed at -18 dB under the club", ambience: "bass through the floor, crowd" }
```

## Shots

| Shot | Act | Time | Play / gen | Framing · camera | Action | Audio | Model | Est. |
|---|---|---|---|---|---|---|---|---|
| s1 | hook | 0.0–2.5 | 2.5 / 5 s | MCU selfie · arm moves with her | already laughing into the flash at the lens | bass, crowd | `fal/kling-3-pro` | $0.84 |
| s2 | build | 2.5–7.5 | 5 / 6 s | MCU selfie · arm | turns her head to show the crowd in silver puffers, then back | bass, breath | `fal/kling-3-pro` | $1.01 |
| s3 | build | 7.5–10.0 | 2.5 / 6 s | insert, low · static | white platform boots hitting the beat on the dance floor | stomp SFX | `fal/hailuo-2.3` | $0.28 |
| s4 | build | 10.0–16.0 | 6 / 6 s | MS selfie · arm, wider | she spins once under the spotlight, arm out, laughing | bass, laugh | `fal/hailuo-2.3` | $0.28 |
| s5 | payoff | 16.0–22.0 | 6 / 7 s | CU selfie · arm slowing to still | stops, catches breath, settles the headset mic with one finger, grins, says the line | line + bass | `fal/kling-3-pro` silent → lip-sync | $0.78 + $0.35 |

Video $3.19 · stills (board $0.17 + 5 first frames at 2K $0.25) $0.42 · voice < $0.01 · lip-sync (7 s at $3/min) $0.35
→ **$3.96, budget with 50 % rerolls: $6.00** (package prices, checked 2026-10).

## Board frame prompts (Nano Banana Lite, 1K, $0.0336 each)

- s1: `[CLAUDIA ID v2] … club look, laughing into the phone held at arm's length, the flash on, one spotlight behind her, haze, selfie MCU, vertical 9:16, storyboard frame`
- s2: `… same, head turned to her left looking at the crowd in silver puffers …`
- s3: `close low shot of white patent platform boots stamping on a dark dance floor, haze, one spotlight, vertical 9:16, storyboard frame`
- s4: `… wider selfie, she spins with one arm out under the spotlight, laughing …`
- s5: `… close-up selfie, breathless grin, one finger settling the headset mic, flash-bright skin …`

## Animatic notes (after watching on a phone)

1. s3 at 2.5 s felt slow → cut to 2.0 s, s4 extended to 6.5 s.
2. The line landed at 18.5 s with no breath before it → added 0.4 s of silence before "mic check".
3. Loop: s5 ends tight on her grin; s1 opens on her laugh into the flash — the loop works.

## Video prompts (promoted first frames at 2K with refs 01 + 05 + 09)

**s1** (Kling 3 Pro, 5 s, audio on):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with heavy bangs and one peach-orange streak panel, star clip, headset mic, a silver quilted puffer. She laughs into the phone she holds at arm's length, the flash on, in a dark club.
The camera moves with her arm, bouncing to the beat; she moves slightly toward frame-left.
One hard spotlight above and behind her, haze. SFX: bass through the floor, crowd noise, her laugh. No music.
```

**s5** (Kling 3 Pro, 7 s, `meta.audio: false`, she talks so the mouth moves):

```text
Same woman as the first frame … She slows to a stop, catches her breath, settles the headset mic along her cheek with one
finger — the peach streak stays in place — then grins and talks to the lens. Handheld selfie arm settling to almost still.
Dark club, one spotlight, the phone flash on her face. Her hand has five relaxed fingers.
```

Then `fal/lipsync-2` with `club-01-L1.wav`: "mic check? [laughs] never heard of her."

## Approval

Board, animatic and $6.00 cap approved by the channel owner before any video job ran. All shots labelled AI at publish.
