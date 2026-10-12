# Worked example: Claudia's reference clip and three companion clips

The owner's loop on the site is `studio.mp4`: 9:16, silent, 14 s, Claudia talking and laughing to a locked-off camera in
a white studio. Below it gets recreated first, then three companion clips in her world (a visor reveal, the club, a club
flash selfie). Each gets the first-frame image prompt, then video variants with exact settings and cost (package prices,
checked 2026-10). All first frames use the full `[CLAUDIA ID v2]` block from the character bible plus the wardrobe
string; the video prompts use the short block because the first frame carries the identity.

---

## Clip 1 — The reference: talking to camera in the white studio (14 s)

**First frame** (`google/nano-banana-2.1`, `--aspect 9:16 --resolution 2K`, refs: pack 01 + 05 + 07, ≈ $0.05):

```text
[CLAUDIA ID v2] … wearing a cropped white puffed-sleeve shirt with a small star pin, a black patent pleated mini skirt
and long black patent gloves. Image 1 is her face reference; image 2 her laugh; image 3 her full-body proportions. She
stands centred, framed from mid-thigh up, mid-laugh, eyes to the lens. Seamless pale grey-white studio paper, soft even
daylight, a soft floor shadow, no props. Locked-off camera at eye level, 50mm, f/4, vertical 9:16. Natural skin texture.
```

**A. Kling 3 Pro with her line** (`fal/kling-3-pro`, `--duration 14`, with audio ≈ $2.35):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with heavy bangs and one
peach-orange streak panel, star clip, headset mic, freckles. She talks to the locked-off camera. 0–4s: she laughs and
starts a story. 4–8s: a big open smile, a small sway side to side. 8–11s: calm, mouth closed, a steady gaze. 11–14s: she
laughs again, head tilting. Claudia (amused, warm, English): "ok so I tried to film this four times and laughed in all
four." White studio paper, soft even daylight. The camera does not move. Room tone only, no music.
```

**B. Wan 2.6, 15 s at 720p** ($1.50) — same prompt, "First… then… finally…" beats. Trim to 14 s.

**C. Silent take + her designed voice** — generate A or B with `meta.audio: false`, then lip-sync her ElevenLabs line
with `fal/lipsync-2` ([../../voice-and-lip-sync/SKILL.md](../../voice-and-lip-sync/SKILL.md)). Best voice consistency
across a series.

Negative: `teenager, childlike face, extra fingers, warped hands, morphing face, flicker, extra hair streaks, camera move, text, logo`

---

## Clip 2 — Visor reveal in the white studio (8 s)

**First frame** (`google/nano-banana-2.1`, refs: pack 01 + 06):

```text
[CLAUDIA ID v2] … wearing a floor-length cloud-print halter gown with a mint satin halter band and an orange shield
visor down over her eyes. Image 1 is her face reference; image 2 shows her with the visor down. She stands three-quarter
to camera, one hand behind her back, chin lifted. Seamless pale grey-white paper, soft daylight from the left, a long
soft shadow on the floor. Medium shot, 50mm, f/2.8, vertical 9:16. Natural skin texture.
```

**A. Hailuo 2.3 — cheapest strong performance** (`fal/hailuo-2.3`, 6 s, $0.28; extend to 8 s with a 0.5× slow-mo of the
last 2 s in edit, or use 10 s at $0.56 and trim):

```text
Claudia, 28-year-old woman with a black bob, a peach-orange bang streak, a star clip and a headset mic, in a cloud-print
gown in a white studio, lifts her orange visor up into her bangs with one hand, looks into the camera and holds a slow,
cool gaze. Static camera, slow push in. Soft daylight, fine grain.
```

**B. Kling 3 Pro — exact 8 s, silent** (`fal/kling-3-pro`, `--duration 8`, `meta.audio: false`, ≈ $0.90):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), glossy black jaw-length bob, heavy straight bangs with
one peach-orange streak panel, small peach star hair clip, a thin headset mic, the orange shield visor down. Her face, bob,
streak and clip stay identical. 0–3s: she holds still, chin lifted. 3–6s: she raises her right hand and lifts the visor up
into her bangs, revealing grey-green eyes, and looks straight into the lens. 6–8s: a slow cool gaze and a small head tilt.
White studio paper, soft daylight. Static medium shot, very slow push-in. One hand, five relaxed fingers.
```

**C. Gemini Omni Flash — with room tone** (`google/omni-flash`, 720p, ≈ $0.80 for 8 s, estimate):

```text
An 8-second vertical clip. <FIRST_FRAME> shows Claudia; keep all character details exactly as in the first frame — her
black jaw-length bob, heavy bangs with one peach-orange streak, star clip, headset mic and freckles.
[0-3s] Static medium shot. She stands with the orange visor down, chin lifted.
[3-6s] She lifts the visor into her bangs, revealing grey-green eyes; the camera pushes in very slowly.
[6-8s] She holds eye contact and gives a slow, cool gaze.
Scene: white studio paper, soft daylight from the left, a long floor shadow.
Audio: quiet room tone and the soft click of the visor. No music, no dialogue.
```

---

## Clip 3 — The club: one spotlight (8 s)

**First frame** (`google/nano-banana-2.1`, refs: pack 01 + 07 + 10):

```text
[CLAUDIA ID v2] … wearing a silver quilted puffer. She leans toward the lens in a dark club, head tilted, eyes to camera.
One bright spotlight behind and above her blooms into the frame; dancers in silver puffers soft and anonymous on both
sides; light haze. Medium close-up, 35mm, f/2, vertical 9:16, natural skin texture, no readable logos.
```

**A. Kling 2.6 Pro — body motion, with crowd audio** (`fal/kling-2.6-pro`, `--duration 10`, $1.40; trim to 8 s):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with a peach-orange bang streak,
star clip, headset mic, a silver quilted puffer. 0–3s: she sways to the beat, eyes on the lens. 3–6s: she raises her right
arm and turns her face up into the spotlight. 6–10s: she lowers her arm, laughs and leans back into the first-frame pose.
The dancers behind her stay anonymous and out of focus. Handheld, gentle sway with the beat, no cuts. Club ambience,
muffled bass, crowd cheering.
```

Negative: `teenager, childlike face, extra arms, extra fingers, merged faces, sharp crowd faces, readable logos, text, flicker`

**B. Kling 3 Pro — exact 8 s silent loop** (`fal/kling-3-pro`, `--duration 8`, `meta.audio: false`, ≈ $0.90), same
prompt with beats 0–3 / 3–6 / 6–8 and "her peach streak stays peach under the spotlight".

(For a post, replace diegetic club sound in edit with a licensed track — see
[../../music-and-sound-for-shorts/SKILL.md](../../music-and-sound-for-shorts/SKILL.md).)

---

## Clip 4 — Flash selfie at the club (13 s, two stitched beats)

**First frame** (`google/nano-banana-2.1`, refs: pack 01 + 05 + 09):

```text
[CLAUDIA ID v2] … wearing a silver quilted puffer. Selfie taken at arm's length in a dark club, the phone flash on, her
arm large in the foreground, she laughs with her mouth open. One spotlight behind her, haze, dancers in silver puffers
blurred. 24mm phone front camera, flash-bright skin, a little motion blur at the edges, vertical 9:16.
```

**Beat A — Kling 3 Pro, 8 s** (`fal/kling-3-pro`, `--duration 8`, with audio ≈ $1.34):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with a peach-orange bang streak,
star clip, headset mic, a silver quilted puffer. She holds the phone at arm's length, laughing openly, the flash on. 0–4s:
she talks into the lens. 4–8s: she half-spins to show the crowd behind her, then looks back and laughs. The camera moves
with her arm, handheld, bouncing to the beat. SFX: bass through the floor, crowd noise, her breathless laugh. No music.
```

**Beat B — 5 s from beat A's last frame** (`ffmpeg -sseof -0.6 -i beatA.mp4 -update 1 -q:v 2 a-last.jpg`, then
`fal/kling-3-pro --ref a-last.jpg --duration 5`, ≈ $0.84): "she slows to a stop, catches her breath, settles the headset
mic with one finger, grins at the lens. Same club, same spotlight, same handheld selfie arm." Stitch with a 0.25 s
crossfade on her half-spin (see SKILL.md step 7).

**Alternative:** `fal/wan-2.6` 15 s at 720p in one take ($1.50) — fewer seams, softer detail.

---

## Totals and what shipped

| Clip | Shipped variant | Cost incl. one reroll |
|---|---|---|
| Studio (the reference) | Kling 3 Pro 14 s silent + lip-sync | $1.57 + lip-sync |
| Visor reveal | Hailuo 2.3 10 s, trimmed | $0.56 + $0.56 |
| Club | Kling 3 Pro 8 s silent | $0.90 + $0.90 |
| Flash selfie | Kling 3 Pro 8 s + 5 s stitched | $2.18 |

Every clip went out with the platform AI label and its provenance sidecar. The site version of the reference clip was
exported silent (`-an`) with a 1:1 crop: `ffmpeg -i studio.mp4 -vf "crop=720:720:0:40,scale=480:480" -an -c:v libx264 -crf 25 -movflags +faststart studio-sq.mp4`.
