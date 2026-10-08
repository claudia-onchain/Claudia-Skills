# Shot grammar for AI shorts

Continuity, transitions and pacing rules that matter more with AI footage, because every shot is generated separately
and nothing is "naturally" consistent.

## Continuity

**The 180° rule.** Draw an imaginary line through the action (her running direction, or between her and the DJ). Keep
every camera on one side. In prompts: "she runs from left to right of frame" in every shot of the sequence. Breaking it
makes viewers think she turned around.

**Eyeline.** If she glances "off to the right" in s2 at the cat, the cat insert in s3 is framed as if seen from her
left-facing-right position. Write the direction into both prompts.

**State tracking.** Keep a state table per scene and copy it into every prompt:

| State | Values to track |
|---|---|
| Wardrobe | look name + any change (jumper sleeves up/down) |
| Hair | dry / damp / wet; bangs neat / pushed aside; clip in / out |
| Accessories | sunglasses on face / pushed up / in hand / off |
| Light | time of day, main source, colour |
| Props | phone hand, mug full/empty, laptop open/closed, cat position |
| Weather | none / light rain / heavier rain |

**Selfie vs camera.** A scene shot "on her phone" and a scene shot "by a camera" have mirrored hair (the copper panel
switches sides). Don't intercut them inside a scene.

## Pacing

- New visual event every 2–4 s. Talking shots can hold 4–6 s if the face is animated.
- Hook ≤ 2 s; payoff gets 2–4 s of room; a 0.3–0.5 s beat of silence before the punchline helps.
- Average shot length for her shorts: 3–5 s. More cuts expose AI inconsistencies; fewer feel slow.
- Text on screen changes at most every 2 s; one idea per text card.

## Transitions that hide AI seams

| Seam risk | Hide it with |
|---|---|
| Face changes slightly between generations | cut on motion (a turn, a step, an arm), never on a still face |
| Lighting shifts | match cut to a darker/brighter beat, or a whip pan |
| Stitch of a continuous take | 0.2–0.3 s crossfade during movement; or a hand passing the lens |
| Location change | match cut on a prop (sunglasses, mug), sound bridge (next scene's audio starts 0.5 s early) |

**Sound bridges** (J-cuts and L-cuts) are the cheapest seam-hider: let the rain start under the end of the bedroom shot,
or let her laugh carry over the cut.

## Shot size progression

Start wide or medium to place her, go tighter for emotion, go back out for the payoff or keep tight for a punchline.
Typical: MS (hook, moving) → MCU (build) → insert (prop/cat) → CU (line) → MCU (loop back).

## Duration math

```text
play_s      what the viewer sees
gen_s       ≥ play_s + 0.5–1.0, rounded UP to a length the model offers
est_usd     gen_s × model price per second (or per-clip price)
budget      Σ est_usd × 1.5 (rerolls) + stills + voice + lip-sync
```
