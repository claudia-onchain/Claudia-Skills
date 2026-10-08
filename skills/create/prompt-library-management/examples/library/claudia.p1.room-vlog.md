---
id: claudia.p1.room-vlog
version: 2.0.0
status: approved
character: claudia
identity: CLAUDIA ID v1
pillar: P1
series: talk-to-me
scene: her-room-day
look: signature
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
  - {path: library/2026-10/example-room-1.mp4, sha256: 3b9e51a0}
tags: [ugc, talking-to-camera, bedroom, selfie, front-camera, laugh]
created: 2026-10-08
updated: 2026-10-08
retires: none
---
## First frame
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun). In this shot she is mid-laugh with her tongue just touching her teeth, eyes bright. wearing an olive-green fine-knit crop cami with a scalloped copper-orange edged neckline and small orange embroidered stars, a star pendant on layered silver chains, a red-and-green tartan pleated mini skirt with a studded black belt and hanging silver chains, a chunky silver chain bracelet.
Vertical 9:16 front-camera phone frame in her bedroom by day: plain white walls, a round ceiling smoke detector, a recessed
ceiling light, an open white doorway behind her on the left, a grey blanket on a chair at the edge of frame. Soft overcast
window light from camera left, gentle fill from the white walls. She leans slightly toward the lens, framed from mid-torso
up, head in the upper third, eye level, 24mm phone-lens look with mild wide-angle, natural mixed light, a touch of phone
sharpening and grain. Image 1 is her face reference, image 2 shows her laugh. No text, no logos.

## Prompt
Handheld front-facing phone selfie vlog, 9:16. The woman from the first frame talks to the camera in her bedroom, relaxed and
amused. [0-3s] she leans in and starts a story, small head tilt, eyebrows up; [3-6s] she glances toward the open doorway and
back to the lens, a little shrug; [6-10s] she laughs openly, shoulders shaking, then settles into a knowing half-smile. Slight
handheld micro-shake, auto-exposure breathing, no cuts. Keep all character details exactly as in the first frame: jaw-length
black bob, heavy straight bangs, copper-orange streaks only in the bangs and one side, orange clip, thin gold hoops. Natural
room tone only, no music.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo

## Notes
- 2.0.0 (2026-10-08): migrated from the Veo 3.1 Fast variant (retiring 2026-10-22) to Omni Flash — see ../migrating-off-veo.md.
- Omni chooses the length (3–10 s per generation, checked 2026-10); say "10 seconds" in the prompt if it runs short.
- Ends on the half-smile so two takes can be cut together for a 20 s "talk to me" episode.
- Voice: record the line separately (elevenlabs/v3) and lip-sync with fal/lipsync-2; Omni's native speech is not her voice.
