---
name: storyboarding-shorts
description: Plans 15–30 second vertical shorts before any video money is spent — a three-act hook/turn/payoff structure with second-by-second timing, beat sheets mapped to real AI video durations (Kling, Wan, Hailuo, Gemini Omni, Runway), shot lists in CSV/YAML, storyboard frames generated as cheap stills, a timed animatic with ffmpeg, continuity rules for a recurring character (wardrobe, hair, light, props, screen direction), designed transitions and loop endings, and a per-shot budget a person approves. Use when turning an idea or a series episode into shots, estimating what a short will cost, or handing a board to a batch run.
license: MIT
metadata:
  title: "Storyboarding shorts"
  category: create
  summary: "Turn an idea into a timed board, shot list, animatic and budget before generating a single video second."
  level: intermediate
  tags: "storyboard, shot list, beat sheet, animatic, shorts structure, continuity, transitions, budget"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "30 min per episode"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Storyboarding shorts

A 22-second short is four to six AI generations, each with its own first frame, camera move and audio. Planning it on
stills costs cents; discovering a structural problem after the video renders costs dollars and an afternoon. This skill
takes a one-line idea to an approved board: beats, shots sized to what the models can actually do, frames, an animatic
you can watch with the voice line, and a budget.

## When to use this

- Any short with more than one shot, or any single shot over 10 s.
- A series episode ([../content-pillars-and-series/SKILL.md](../content-pillars-and-series/SKILL.md)).
- Before a batch run ([../batch-content-production/SKILL.md](../batch-content-production/SKILL.md)) — the shot list is its input.
- When someone asks "how much will this video cost?"

## What you need

- A premise in one sentence and the pillar it belongs to.
- Claudia's bible for wardrobe/settings ([../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md)).
- `@useclaudia/cli` with an image key for frames (`google` is cheapest for boards) and `ffmpeg` for the animatic.
- [references/shot-grammar.md](references/shot-grammar.md) — continuity, transitions and pacing rules (read before
  boarding anything with more than two shots).

## Steps

### 1. Write the premise and the payoff first

```text
PREMISE:  Claudia runs through a rainy warehouse lot because the forecast "dared" her.
PAYOFF:   she stops, soaked, grins: "rain check? never heard of her."
PILLAR:   unfiltered / city
LENGTH:   22 s     PLATFORMS: TikTok, Reels, Shorts     LABEL: AI-generated
```

If you can't say the payoff in one line, the short isn't ready.

### 2. Use the three-act frame

| Act | 15 s short | 22 s short | 30 s short | Job |
|---|---|---|---|---|
| **1 Hook** | 0–2 s | 0–2 s | 0–3 s | motion + curiosity in the first frame; on-screen hook text; no logo, no intro |
| **2 Turn / build** | 2–12 s | 2–18 s | 3–25 s | 2–4 beats, each a new piece of information or a new image; escalate |
| **3 Payoff + loop** | 12–15 s | 18–22 s | 25–30 s | the line, the reveal, the laugh — and a last frame that flows back into the first |

Retention rule: a new visual event every 2–4 s (cut, gesture, reveal, text change). A held face with no change for more
than 4 s loses viewers unless she's talking.

### 3. Turn beats into shots the models can make

Each shot = one action + one camera move + one generation. Size shots to real model durations (checked 2026-10):

| Model (package id) | Lengths | Use for |
|---|---|---|
| `fal/hailuo-2.3` | 6 or 10 s | performance beats (smile, glance, sunglasses) — cheapest ($0.28 / 6 s) |
| `fal/kling-2.6-pro` | 5 or 10 s | body motion, dance |
| `fal/kling-3-pro` | 3–15 s | talking, long takes, start→end pose shots |
| `fal/wan-2.6` | 5, 10 or 15 s | long talking takes on a budget |
| `google/omni-flash` | 3–10 s (model decides; ask in the prompt) | sound-designed beats |
| `runway/gen4.5` | 2–10 s | precise camera choreography |
| Stills + motion in edit | any | inserts: a prop, a screen, the cat, a skyline (Ken Burns pan in edit, no video cost) |

Generate shots **0.5–1 s longer** than they'll play — trims at both ends hide the model's warm-up and wind-down.

### 4. Write the shot list

One row per shot ([templates/shot-list.csv](templates/shot-list.csv)):

```csv
shot,start_s,play_s,gen_s,framing,camera,action,line,audio,first_frame,model,est_usd,transition_out
s1,0.0,2.5,5,MCU selfie,handheld arm,already running + laughing at lens,,rain+footsteps,new still,fal/kling-3-pro,0.84,cut on step
```

Fill the `est_usd` from the package (`claudia generate video "…" --model <id> --duration <s> --dry-run` prints the
estimate) and sum it. Add 50 % for rerolls — that's the budget a person approves.

### 5. Draw the board with cheap stills

Board frames are for composition and continuity, not identity — use the cheapest image model at 1K:

```sh
claudia generate image "[CLAUDIA ID v1] … <shot action as a frozen moment>, <framing>, <setting>, <light>, vertical 9:16, \
storyboard frame" --model google/nano-banana-lite --aspect 9:16 --ref refs/claudia/01-front-neutral.jpg --max-usd 0.05
```

Nano Banana Lite is $0.0336 per 1K image (checked 2026-10); a 6-frame board costs about $0.20. Name files by shot
(`board/s1.jpg` …). The local ffmpeg build has no `drawtext`, so keep shot ids in the filenames, not burned into frames.

### 6. Cut an animatic and watch it with the line

```sh
cat > board/board.txt <<'EOF'
file 's1.jpg'
duration 2.5
file 's2.jpg'
duration 5
file 's3.jpg'
duration 6
file 's4.jpg'
duration 5
file 's5.jpg'
duration 3.5
file 's5.jpg'
EOF
ffmpeg -f concat -safe 0 -i board/board.txt -i lines/scratch.wav \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,format=yuv420p" \
  -c:v libx264 -crf 23 -c:a aac -shortest board/animatic.mp4
```

(The last image is listed twice so the concat demuxer honours its duration.) Use a scratch line from
`elevenlabs/flash-v2.5` ($0.04 / 1K chars) for timing. Watch it on a phone. Does the hook land in 2 s? Is there a dead
stretch? Does the payoff have room to breathe? Fix the board, not the video.

### 7. Check continuity across shots

- **Wardrobe:** one look per scene, listed in the board header; the same wardrobe string in every shot's prompt.
- **Hair state:** dry in the bedroom, damp in the rain and still damp in the next rain shot; sunglasses on/off state
  carries across cuts.
- **Light and time:** golden hour doesn't become noon between shots; club blue-violet stays blue-violet.
- **Props and companions:** the same grey tabby, the same butterfly-sticker laptop, the same star pendant.
- **Screen direction:** if she runs left-to-right in s1, she runs left-to-right in s2 (the 180° rule; see the reference).
- **Copper panel side:** mirror and selfie shots flip it — keep all shots in a scene the same type (all selfie or all
  "camera") so the panel doesn't jump sides between cuts.

### 8. Design the transitions in the board

| Transition | How to build it | Good for |
|---|---|---|
| Last frame → first frame | `ffmpeg -sseof -0.6 -i sA.mp4 -update 1 -q:v 2 sA-last.jpg`, then use it as shot B's `--ref` | continuous takes longer than one generation |
| Match cut | end shot A and start shot B on the same pose/prop (sunglasses lowering → raising) | jumping between settings |
| Hand/arm over lens | end A with her hand covering the lens, start B from a covered frame | outfit or location changes |
| Whip pan | end A on a fast pan right, start B on a fast pan right; join in the blur | energy, club → street |
| Hard cut on action | cut mid-gesture | the default; cheapest |

### 9. End on a loop

Make the last frame visually rhyme with the first (same framing, same expression, or the line cut so it flows into the
opening action). Short-form apps loop by default; a seamless loop counts as rewatches. For the rain short: end on her
laughing at the lens in the same MCU as s1.

### 10. Get the board approved, then hand it off

The approval packet: premise, animatic, shot list with per-shot model and estimate, total budget (+50 %), label plan.
A person approves it; then first frames are promoted to 2K with full refs ([../character-consistency/SKILL.md](../character-consistency/SKILL.md))
and the shot list goes to [../batch-content-production/SKILL.md](../batch-content-production/SKILL.md).

## Templates

- [templates/storyboard-template.yaml](templates/storyboard-template.yaml) — the full board: header, continuity, shots, budget, approvals.
- [templates/shot-list.csv](templates/shot-list.csv) — the shot list with column meanings.
- [templates/beat-sheet.md](templates/beat-sheet.md) — 15 / 22 / 30 s beat sheets to fill.
- [examples/rain-check-ep01.md](examples/rain-check-ep01.md) — a 22 s UGC episode, full board and budget.
- [examples/desk-diaries-ep03.md](examples/desk-diaries-ep03.md) — a 30 s platform episode with voice, cat and a match cut.

## Check before you finish

- [ ] Premise and payoff each fit one line; the hook is moving at 0 s.
- [ ] Every shot: one action, one camera move, a duration the chosen model supports, +0.5–1 s handles.
- [ ] Continuity block filled (look, hair state, light, props, direction, selfie vs camera).
- [ ] Animatic watched on a phone with the scratch line; no dead stretch > 4 s.
- [ ] Budget summed from dry-run estimates, +50 % rerolls; a person approved it.
- [ ] AI label planned for every platform; no real people, no logos, nothing a minor could be mistaken in.

## Pitfalls

- **Boarding at the wrong length.** A 7 s beat on Kling 2.6 means paying for 10 s; pick the model per shot from step 3.
- **Too many settings.** Each new place is a new first frame and a new continuity risk. 1–2 locations per 30 s.
- **Writing the line after the board.** The line sets the timing; record a scratch line first.
- **Identity in board frames.** Lite frames are for layout; never ship them or use them as video first frames.
- **No handles.** Models ease in and out; without spare seconds every cut looks soft.
- **Over-cutting.** 12 cuts in 20 s of AI footage exposes every small inconsistency. 4–7 is the sweet spot.

## Related skills

- [../video-prompting/SKILL.md](../video-prompting/SKILL.md) · [../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md)
- [../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md) · [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md)
- [../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md) · [../content-pillars-and-series/SKILL.md](../content-pillars-and-series/SKILL.md)
- [../batch-content-production/SKILL.md](../batch-content-production/SKILL.md) · [../../grow/youtube-shorts-playbook/SKILL.md](../../grow/youtube-shorts-playbook/SKILL.md)
