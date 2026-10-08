# Camera and motion vocabulary for AI video

Use **one** camera move per generation. Pair it with framing and camera height. Words below are the ones current models
follow reliably; "risky" moves cause face drift or warping on a recurring character.

## Framing

| Term | Frame | Use for Claudia |
|---|---|---|
| Extreme close-up (ECU) | eyes/lips only | sunglasses lowering over the eyes, a wink |
| Close-up (CU) | face, top of shoulders | reactions, lip-sync (best mouth detail) |
| Medium close-up (MCU) | chest up | talking to camera, the default vlog frame |
| Medium shot (MS) | waist up | lounge lean, desk scenes |
| Medium-wide / cowboy | mid-thigh up | dancing in front of the DJ booth (shows the tartan skirt) |
| Wide (WS) | full body + setting | rain lot establishing shot — face will be small, identity weaker |

## Moves

| Move | Prompt words | Risk | Notes |
|---|---|---|---|
| Static | "locked-off static camera", "tripod" | lowest | safest for faces; add micro-motion in the subject instead |
| Handheld micro-shake | "handheld phone, subtle natural shake, slight auto-exposure breathing" | low | the UGC signature; never "shaky cam" (too much) |
| Slow push-in | "very slow push-in", "slow dolly in from medium to medium close-up" | low | reveals and emphasis; pair with eye contact |
| Pull-out | "slow dolly out revealing the room" | medium | new pixels at the edges get invented — fine for rooms |
| Pan | "slow pan left to follow her" | medium | keep her centred |
| Tilt | "tilt up from her boots to her face" | medium | outfit reveals; hands may deform when they enter frame |
| Truck / tracking | "camera tracks alongside her at walking pace" | medium | walking shots; keep 3/4 to camera |
| Orbit / arc | "slow 90-degree arc around her" | **high** | faces drift as the angle changes; ≤ 90°, ≤ 5 s |
| Crane / jib | "crane up and over the crowd" | high | club establishing shots without her face |
| Whip pan | "fast whip pan to the right" | n/a | use only as a transition (stitch point) |
| Rack focus | "rack focus from the sunglasses on the dresser to her face" | low | great for lounge/desk props |
| Selfie arm | "she holds the phone at arm's length, front camera, the camera moves with her" | low–medium | the rain clip; arm and bracelet in the foreground |
| POV | "first-person POV of her hands" | medium | hands are the weak spot — keep them simple |

## Motion for the subject (what she does)

Use one strong verb per beat and a speed word:

- Small: "glances away and back", "tilts her head", "a slow knowing half-smile", "bites her lip, then laughs" (keep tasteful),
  "pushes her bangs aside with one finger" (risky for the streak shape).
- Medium: "slides her sunglasses down her nose with one finger", "leans back against the dresser", "raises one arm
  high", "spins once slowly".
- Large: "runs toward the camera laughing", "dances, shoulders loose, bouncing on the beat".

Speed words: "slowly", "in one smooth motion", "a beat later", "suddenly" (use sparingly).

## Light and lens words that video models respect

- "warm tungsten lamp light", "overcast soft window light from the left", "blue-violet club haze with moving beams",
  "golden-hour backlight with lens flare", "wet asphalt reflecting a grey sky".
- Lens: "24mm phone front camera" (UGC), "35mm", "50mm shallow depth of field", "anamorphic flares" (cinematic only).
- Texture: "35mm film grain", "natural skin texture", "slight motion blur on fast movement".

## Words to avoid

- "Cinematic" alone (generic glossy look), "8K", "masterpiece", "ultra-detailed" — no effect or worse.
- "Beautiful young woman", "girl" — pulls her younger. Say "28-year-old woman".
- Brand and person names, "in the style of <living director>".
- Two moves at once ("orbit while pushing in and craning up").
