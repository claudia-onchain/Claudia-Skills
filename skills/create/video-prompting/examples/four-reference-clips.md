# Worked example: recreating Claudia's four reference clips

The owner's loops on the site are 9:16, silent, 8–14 s: a sunglasses reveal in a lamp-lit lounge, dancing at a DJ booth,
talking and laughing to camera in her room, and a running selfie in the rain. Below, each clip gets: the first-frame
image prompt, then 3–4 video variants with exact settings and cost (package prices, checked 2026-10). All first frames
use the full `[CLAUDIA ID v1]` block from the character bible plus the wardrobe string; the video prompts use the short
block because the first frame carries the identity.

---

## Clip 1 — Lounge: sunglasses reveal (8 s)

**First frame** (`google/nano-banana-2.1`, `--aspect 9:16 --resolution 2K`, refs: pack 01 + 06, ≈ $0.05):

```text
[CLAUDIA ID v1] … wearing an olive-green fine-knit crop cami with a scalloped copper-orange edged neckline and small orange
embroidered stars, a star pendant on layered silver chains, a red-and-green tartan pleated mini skirt with a studded black
belt and hanging silver chains, oversized black oval sunglasses. Image 1 is her face reference; image 2 shows her in the
sunglasses. She leans back against a dark wood dresser in a vintage lounge: warm butter-yellow walls, three framed
botanical cross-stitch prints, a brass table lamp with a pleated cream shade glowing on the left. Medium shot from chest
height, 35mm lens, f/2.8, warm tungsten lamplight, soft shadows, 35mm film grain, vertical 9:16. Natural skin texture.
```

**A. Hailuo 2.3 — cheapest strong performance** (`fal/hailuo-2.3`, 6 s, $0.28; extend to 8 s with a 0.5× slow-mo
of the last 2 s in edit, or use 10 s at $0.56 and trim):

```text
Claudia, 28-year-old woman with a black bob, copper-orange bang streaks and an orange clip, leans on a wooden dresser in a
warm lamp-lit room, slides her black sunglasses down her nose with one finger, looks into the camera and gives a slow
knowing half-smile. Static camera, slow push in. Warm tungsten light, film grain.
```

**B. Kling 3 Pro — exact 8 s, silent** (`fal/kling-3-pro`, `--duration 8`, `meta.audio: false`, ≈ $0.90):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), glossy black jaw-length bob, heavy straight bangs with
copper-orange streak panels, small orange hair clip, thin gold hoops, oversized black oval sunglasses. Her face, bob,
copper streaks and clip stay identical. 0–3s: she leans back against the dark wood dresser and sways gently, closed-lip
smile. 3–6s: she raises her right hand and slides the sunglasses down her nose with one finger, revealing warm brown eyes,
and looks straight into the lens. 6–8s: a slow knowing half-smile and a small head tilt. Lamp-lit vintage lounge,
butter-yellow walls, framed botanical prints, brass lamp. Static medium shot at chest height, very slow push-in. Warm
tungsten light, 35mm film grain. One hand, five relaxed fingers.
```

Negative: `teenager, childlike face, extra fingers, warped hands, morphing face, flicker, extra hair streaks, text, logo`

**C. Gemini Omni Flash — with room tone** (`google/omni-flash`, 720p, ≈ $0.80 for 8 s, estimate):

```text
An 8-second vertical clip. <FIRST_FRAME> shows Claudia; keep all character details exactly as in the first frame — her
black jaw-length bob, heavy bangs with copper-orange streaks, orange clip, gold hoops and freckles.
[0-3s] Static medium shot at chest height. She leans on the dark wood dresser, swaying slightly, smiling with closed lips.
[3-6s] She lifts one hand and slides her black sunglasses down her nose, revealing warm brown eyes; the camera pushes in
very slowly.
[6-8s] She holds eye contact and gives a slow knowing half-smile.
Scene: vintage lounge, butter-yellow walls, botanical prints, brass lamp glowing warm. Light: tungsten, soft shadows, film grain.
Audio: quiet room tone and the soft click of the sunglasses frames. No music, no dialogue.
```

**D. Veo 3.1 Fast — only until 2026-10-22** (`google/veo-3.1-fast`, `--duration 8`, 1080p $0.96): same beats in
`[00:00-00:03]` / `[00:03-00:06]` / `[00:06-00:08]` blocks with `SFX: soft click of sunglasses frames` and
`Ambient noise: quiet room tone, faint clock ticking. No music.`

---

## Clip 2 — Club: dancing at the DJ booth (8 s)

**First frame** (`google/nano-banana-2.1`, refs: pack 01 + 07 + 10):

```text
[CLAUDIA ID v1] … signature look (olive star cami, star pendant, red-and-green tartan mini with studded belt and chains,
chunky silver chain bracelet) plus oversized black oval sunglasses. She stands in front of a DJ booth in a packed club,
smiling, shoulders loose. Behind her an anonymous male DJ in a plain dark t-shirt leans over unbranded mixers, head down,
slightly out of focus. Blue-violet haze, moving-head light beams through smoke, rose-pink rim light on her hair, crowd with
raised hands softly blurred in the background. Medium-wide shot at chest height, 28mm, f/2, vertical 9:16, natural skin
texture, no readable logos.
```

**A. Kling 2.6 Pro — body motion, with crowd audio** (`fal/kling-2.6-pro`, `--duration 10`, $1.40; trim to 8 s):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with copper-orange bang streaks,
orange clip, gold hoops, black sunglasses, olive crop cami, tartan mini skirt. She dances in front of the DJ booth.
0–3s: she bobs to the beat, shoulders loose, smiling. 3–6s: she raises her right arm high and turns her face up into
the light. 6–10s: she lowers her arm, laughs and glances back toward the DJ. The anonymous DJ behind her stays focused on
the mixer, slightly out of focus. Blue-violet haze, sweeping light beams, rose highlights, the crowd soft and out of focus.
Handheld medium-wide shot at chest height, gentle sway with the beat, no cuts. Club ambience, muffled bass, crowd cheering.
```

Negative: `teenager, childlike face, extra arms, extra fingers, merged faces, sharp crowd faces, readable logos, text, flicker`

**B. Kling 3 Pro — exact 8 s silent loop** (`fal/kling-3-pro`, `--duration 8`, `meta.audio: false`, ≈ $0.90), same
prompt with beats 0–3 / 3–6 / 6–8 and "her copper streaks remain orange under the blue light".

**C. Omni Flash — the sound-designed version**:

```text
An 8-second vertical clip. <FIRST_FRAME> shows Claudia at a DJ booth; keep all character details exactly as in the first frame.
[0-3s] Handheld medium-wide shot. She bobs to the beat, smiling behind black sunglasses.
[3-6s] She raises one arm high; a light beam sweeps across her face; copper bang streaks stay orange under the blue light.
[6-8s] She laughs and looks back at the DJ, who stays anonymous and out of focus.
Scene: packed club, blue-violet haze, moving beams, crowd silhouettes with raised hands, all softly blurred.
Audio: muffled four-on-the-floor house beat from the speakers, crowd cheer at 3 seconds. No vocals.
```

(Omni's own music here is diegetic club sound. For a post, replace it in edit with a licensed track — see
[../../music-and-sound-for-shorts/SKILL.md](../../music-and-sound-for-shorts/SKILL.md).)

---

## Clip 3 — Her room: talking to camera, laughing (14 s)

**First frame** (`google/nano-banana-2.1`, refs: pack 01 + 05 + 09):

```text
[CLAUDIA ID v1] … signature look. Front-camera phone selfie framing, medium close-up from slightly above eye level, she
smiles at the lens mid-laugh. Her room by day: plain white walls, a round ceiling smoke detector, an open doorway behind
her on the left, soft overcast window light from the right. 24mm phone front camera look, natural mixed light, slight
noise, vertical 9:16, natural skin texture with visible pores.
```

**A. Kling 3 Pro with her line** (`fal/kling-3-pro`, `--duration 14`, with audio ≈ $2.35):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with heavy bangs and copper-orange
streak panels, orange clip, gold hoops, freckles. She talks to her phone's front camera, held at arm's length. 0–4s: she
laughs and playfully sticks her tongue out, then grins. 4–9s: she glances away to the side, thinking, then back to the
lens. 9–14s: she speaks and laughs again, shoulders moving. Claudia (amused, warm, English): "ok so I tried to film this
four times and the cat walked in all four times." Plain white room, ceiling smoke detector, doorway behind her, soft
overcast window light. Handheld phone, subtle natural shake, slight auto-exposure breathing. Room tone only, no music.
```

**B. Wan 2.6, 15 s at 720p** ($1.50) — same prompt, "First… then… finally…" beats. Trim to 14 s.

**C. Silent take + her designed voice** — generate A or B with `meta.audio: false`, then lip-sync her ElevenLabs line
with `fal/lipsync-2` ([../../voice-and-lip-sync/SKILL.md](../../voice-and-lip-sync/SKILL.md)). Best voice consistency
across a series.

---

## Clip 4 — Running selfie in the rain (13 s, two stitched beats)

**First frame** (`google/nano-banana-2.1`, refs: pack 01 + 05 + 09):

```text
[CLAUDIA ID v1] … signature look, chunky silver chain bracelet on the outstretched wrist. Selfie taken at arm's length while
she runs, her arm and bracelet large in the foreground, she laughs with her mouth open. Empty warehouse lot in light rain:
wet asphalt with puddle reflections, roll-up loading-dock doors, yellow bollards, overcast blue-grey dusk sky. 24mm phone
front camera, slight motion blur, raindrops on the lens edge, vertical 9:16, natural skin texture, damp hair strands.
```

**Beat A — Kling 3 Pro, 8 s** (`fal/kling-3-pro`, `--duration 8`, with audio ≈ $1.34):

```text
Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with copper-orange bang streaks,
orange clip, gold hoops. She runs across a wet warehouse lot holding the phone at arm's length, laughing openly, the
chain bracelet on her wrist in the foreground. 0–4s: she jogs forward, rain falling, looking into the lens. 4–8s: she
spins halfway to show the loading docks behind her, then looks back and laughs. The camera moves with her arm, handheld,
bouncing with her steps. Overcast dusk light, wet asphalt reflections, light rain streaks. SFX: footsteps splashing,
rain on concrete, her breathless laugh. No music.
```

**Beat B — 5 s from beat A's last frame** (`ffmpeg -sseof -0.6 -i beatA.mp4 -update 1 -q:v 2 a-last.jpg`, then
`fal/kling-3-pro --ref a-last.jpg --duration 5`, ≈ $0.84): "she slows to a stop, catches her breath, pushes wet bangs
aside with one finger, grins at the lens. Same lot, same rain, same handheld selfie arm." Stitch with a 0.25 s crossfade
on her half-spin (see SKILL.md step 7).

**Alternative:** `fal/wan-2.6` 15 s at 720p in one take ($1.50) — fewer seams, softer detail.

---

## Totals and what shipped

| Clip | Shipped variant | Cost incl. one reroll |
|---|---|---|
| Lounge | Hailuo 2.3 10 s, trimmed | $0.56 + $0.56 |
| Club | Kling 3 Pro 8 s silent | $0.90 + $0.90 |
| Room | Kling 3 Pro 14 s silent + lip-sync | $1.57 + lip-sync |
| Rain | Kling 3 Pro 8 s + 5 s stitched | $2.18 |

Every clip went out with the platform AI label and its provenance sidecar; the site versions were exported silent
(`-an`) with a `-sq` 1:1 face crop: `ffmpeg -i rain.mp4 -vf "crop=1080:1080:0:300,scale=720:720" -an -c:v libx264 -crf 23 -movflags +faststart rain-sq.mp4`.
