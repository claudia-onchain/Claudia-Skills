---
id: claudia.p1.studio-talk
version: 2.0.0
status: approved
character: claudia
identity: CLAUDIA ID v2
pillar: P1
series: talk-to-me
scene: white-studio
look: studio
kind: video
model: google/omni-flash
fallback_models: [fal/kling-2.6-pro, fal/seedance-2.0]
first_frame_model: google/nano-banana-2.1
params: {aspect: "9:16", durationSec: 10, resolution: "720p"}
refs: [01-front-neutral, 05-laugh]
seed: none
cost_usd: 1.05
scores: {drift: 7, runs: 4, pass_rate: 0.75}
outputs:
  - {path: library/2026-10/example-studio-1.mp4, sha256: 2430dca3}
tags: [talking-to-camera, studio, laugh, locked-off]
created: 2026-10-09
updated: 2026-10-09
retires: none
---
## First frame
[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores. In this shot she is mid-laugh, eyes bright, looking straight into the lens. wearing a cropped white puffed-sleeve shirt with a small star pin, a black patent pleated mini skirt and long black patent gloves.
Vertical 9:16 locked-off camera frame in a white studio: seamless pale grey-white paper behind and under her, soft even
daylight, a soft floor shadow, no props. She stands centred, framed from mid-thigh up, head in the upper third, camera at
eye level, 50mm look, clean editorial colour with fine grain. Image 1 is her face reference, image 2 shows her laugh. No
text, no logos.

## Prompt
Locked-off studio shot, 9:16. The woman from the first frame talks to the camera, relaxed and amused. [0-4s] she starts a
story and laughs; [4-8s] a big open smile, a small sway from side to side; [8-10s] she settles into a calm, steady gaze to the
lens. The camera does not move, no cuts. Keep all character details exactly as in the first frame: jaw-length black bob,
heavy straight bangs, one peach-orange streak in the front bangs, the star clip, the thin headset mic. Studio room tone only,
no music.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, gold jewellery, tattoos, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo

## Notes
- 2.0.0 (2026-10-09): rebuilt for the new look and the `studio.mp4` reference clip (see the character bible's reference set).
- Omni chooses the length (3–10 s per generation, checked 2026-10); say "10 seconds" in the prompt if it runs short.
- Ends on the calm gaze so two takes can be cut together for a 20 s "talk to me" episode.
- Voice: record the line separately (elevenlabs/v3) and lip-sync with fal/lipsync-2; Omni's native speech is not her voice.
