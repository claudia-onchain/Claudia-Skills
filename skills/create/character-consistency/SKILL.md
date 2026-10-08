---
name: character-consistency
description: Keeps an AI character (Claudia or your own) recognisably the same person across hundreds of images and videos and across different models — identity blocks, a 12-shot reference pack, per-model reference mechanics (Nano Banana refs, GPT Image edits, FLUX.2 multi-reference, Seedream batches, Midjourney omni reference, image-to-video first frames), seeds, drift scoring, and edit-based fixes for face drift, teenage-looking drift, extra hair streaks, hands and text artifacts. Use when starting a new character, when outputs start to drift, when switching models, or before a batch run.
license: MIT
metadata:
  title: "Character consistency"
  category: create
  summary: "Make her the same person every time: ref pack, identity block, per-model reference tricks, drift scoring and fixes."
  level: intermediate
  tags: "character consistency, reference images, identity, face drift, seeds, omni reference, image to video, qa"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "45 min (ref pack) · 2 min per check"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Character consistency

An AI influencer only works if the audience recognises her instantly. This skill turns "a woman with a black bob" into
"Claudia, every time": one fixed identity block, one approved reference pack, the right reference mechanism for each
model, a 7-point drift score, and fast edit-based fixes instead of rerolls.

## When to use this

- You are creating a character's first reference pack (Claudia or a new one).
- Generations have started to look like her cousin: different eyes, longer hair, younger face, more streaks.
- You are moving a series to another image or video model.
- Before any batch run (see [../batch-content-production/SKILL.md](../batch-content-production/SKILL.md)).

## What you need

- The identity block from [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md) (or your own character's).
- `@useclaudia/cli` + `@useclaudia/media` and at least one image key: `claudia keys set google` (Nano Banana) or
  `openai` (GPT Image) or `fal` (FLUX.2, Kling, Seedance, OmniHuman).
- `ffmpeg` for contact sheets (`scripts/contact-sheet.sh`).
- A folder for the pack, e.g. `refs/claudia/`. Keep it in the prompt library ([../prompt-library-management/SKILL.md](../prompt-library-management/SKILL.md)).
- Read [references/model-reference-mechanics.md](references/model-reference-mechanics.md) when you use a model for the first
  time — it lists ref limits and syntax per model (checked 2026-10).

## Steps

### 1. Lock the text identity

Consistency starts in words. Paste the versioned identity block **first** in every prompt (models weight early words
more — FLUX.2's guide says so explicitly, checked 2026-10), then the scene. Never paraphrase it; never "summarise" her.

```text
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy
straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange
hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown
eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on
her arms (small stars, a rose, a sun).
```

Then add **one** wardrobe string and **one** setting string from the bible. Three blocks, always in that order:
`ID → wardrobe → scene/camera/light`.

### 2. Build the 12-shot reference pack

Start from one anchor image the owner approves (for Claudia: `portrait-blue-1024.jpg` from the site media folder). Then
generate the other 11 **with the anchor as a reference**, keep only 7/7 scores, and save them numbered. Shot list (also in
[templates/ref-pack-shotlist.csv](templates/ref-pack-shotlist.csv)):

| # | Shot | Why it's in the pack |
|---|---|---|
| 01 | front, neutral, plain backdrop, 85 mm | the face anchor — every model gets this one |
| 02 | ¾ left, half-smile | cheekbones, streak panel side |
| 03 | ¾ right, half-smile | the other side (no second panel!) |
| 04 | clean profile | nose, bangs depth, bob length at the jaw |
| 05 | open laugh, teeth visible | UGC clips laugh a lot; teaches the model her laugh |
| 06 | sunglasses on | lounge/club identity without eyes |
| 07 | full body, signature look, standing | wardrobe proportions |
| 08 | seated, cosy black jumper | banner pose family |
| 09 | holding a phone at arm's length | selfie arm + hands |
| 10 | blue-violet club light | identity under coloured light |
| 11 | golden-hour backlight | sunset banner light |
| 12 | back/side of head, hair detail | the exact copper panel shape and the clip |

```sh
# anchor → 3/4 left, estimate first (Nano Banana 2.1, ~$0.05 per 2K image, checked 2026-10)
claudia generate image "[CLAUDIA ID v1] … Same woman as image 1. Three-quarter view turned to her left, knowing half-smile, \
plain warm-grey backdrop, 85mm portrait lens, f/2.8, soft window key light from camera left, natural skin texture" \
  --model google/nano-banana-2.1 --ref refs/claudia/01-front-neutral.jpg --aspect 2:3 --resolution 2K --dry-run
# looks right → run it with a cap
claudia generate image "…same prompt…" --model google/nano-banana-2.1 --ref refs/claudia/01-front-neutral.jpg \
  --aspect 2:3 --resolution 2K --max-usd 0.10
```

### 3. Use each model's reference mechanism correctly

| Model (package id) | How identity goes in | Practical rule (checked 2026-10) |
|---|---|---|
| Nano Banana 2.1 / 2 / Pro (`google/nano-banana-*`) | `refs` = reference images; say "image 1 is Claudia's face reference" | up to 14 refs total, up to 4 *character* refs — send 2–4 of her pack (01, 02, 05, one scene-relevant) |
| GPT Image 2.5 (`openai/gpt-image-2.5-flare` / `-sunburst`) | `refs` = images to edit/reference + a **preserve list** in the prompt | `gpt-image-2` refs are always high fidelity and reject `input_fidelity`; 2.5 adds `xhigh`/`max` quality; use Sunburst for precise edits |
| FLUX.2 Pro (`fal/flux-2-pro`) | `refs`, referred to as "image 1", "image 2" | the package sends up to 4; no negative prompts — describe what you want |
| FLUX Kontext Pro (`fal/flux-kontext-pro`) | one image + an edit instruction | best for "change only X" fixes |
| Seedream 4.5 / 5 Flash (`byteplus/seedream-*`) | up to 10 refs; batch a whole shoot in one sequential request | refs + outputs ≤ 15 per batch |
| Midjourney V7 (manual, no API here) | `--oref <url> --ow 150–400` | omni reference is V7-only; pin `--v 7` |
| Seedance 2.0 (`fal/seedance-2.0`, `byteplus/seedance-2.0`) | `@Image1` refs | realistic-face refs are rejected unless ingested as a ModelArk asset (AI characters pass automatically); otherwise use Kling/Omni/Hailuo/Wan |
| Video, any model | **image-to-video from an approved still** (first frame) | never text-to-video her face cold; see step 6 |

### 4. Use seeds for experiments, not for identity

A seed only reproduces an image with the same model, prompt and settings. It will not carry her face to a new scene.
Use `--seed` to A/B **one** variable (lens, light, wardrobe) while everything else stays fixed:

```sh
for lens in "35mm" "50mm" "85mm"; do
  claudia generate image "[CLAUDIA ID v1] … bedroom, golden hour, $lens lens, f/2" --model fal/flux-2-pro \
    --ref refs/claudia/01-front-neutral.jpg --seed 41120 --aspect 4:5 --max-usd 0.05 --yes
done
```

Midjourney seeds on V8 are about 99 % reproducible (checked 2026-10); Google and OpenAI images vary run to run anyway.

### 5. Score every output (2 minutes)

Make a contact sheet of anchor + candidates and score with the 7-point drift check from
[../claudia-character-bible/references/look-constants.md](../claudia-character-bible/references/look-constants.md):

```sh
sh scripts/contact-sheet.sh refs/claudia/01-front-neutral.jpg out/candidates/*.jpg > /dev/null && open out/contact.jpg
```

| Point | Pass when |
|---|---|
| 1 Hair | jaw-length blunt bob, heavy straight bangs, jet-black base |
| 2 Copper | chunky panels in the bangs + one side, nowhere else |
| 3 Clip | one small orange clip (may be hidden in wide shots) |
| 4 Hoops | small thin gold hoops |
| 5 Face/age | freckles, brown eyes, her smile; reads 26–30 |
| 6 Wardrobe | matches the requested look and colours |
| 7 Clean | hands, eyes, teeth, text, background all artifact-free |

7/7 publish · 6/7 publish if the miss is 3 or 4 · 5/7 fix in edit · ≤ 4 regenerate. **Any age doubt = regenerate.**

### 6. Carry identity into video

1. Make the first frame as an image (steps 1–5) at the video's aspect (9:16).
2. Image-to-video with that frame as `refs[0]` (Kling, Seedance, Hailuo, Wan, Runway, Omni) — or, on Veo 3.1 until its
   2026-10-22 shutdown, `meta.refMode: "reference"` with up to 3 pack images.
3. Keep motion modest: big head turns and hair-whipping are where faces and streaks drift.
4. Score the middle and last frames too (`ffmpeg -ss 4 -i clip.mp4 -frames:v 1 mid.jpg`).

Details: [../video-prompting/SKILL.md](../video-prompting/SKILL.md), [../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md).

### 7. Fix with edits, not rerolls

Rerolling a 6/7 image costs a full generation and often loses what was good. Edit only the broken part with a preserve
list. Fix prompts for every common failure are in [templates/edit-fix-prompts.md](templates/edit-fix-prompts.md). The
most important one:

```text
Edit image 1. Preserve exactly: her face, freckles, eye colour, expression, hair shape, bangs, the copper panel in the
front bangs, the orange clip, earrings, outfit, pose, background and lighting. Change only: make her look like a woman in
her late twenties — slightly more defined cheekbones and jawline, adult facial proportions, a calm knowing expression.
Do not change anything else.
```

### 8. Record what worked

Log model, prompt version, refs used, seed, score and fixes for every published asset (template in
[../prompt-library-management/SKILL.md](../prompt-library-management/SKILL.md)). When a model update changes her look,
you'll see it in the scores before the audience does.

## Templates

- [templates/ref-pack-shotlist.csv](templates/ref-pack-shotlist.csv) — the 12 shots with full prompts.
- [templates/edit-fix-prompts.md](templates/edit-fix-prompts.md) — preserve-list fix prompts for 12 failure types.
- [templates/drift-review.md](templates/drift-review.md) — the per-asset QA sheet.
- [scripts/contact-sheet.sh](scripts/contact-sheet.sh) — anchor + up to 8 candidates in one image (ffmpeg).
- [examples/ref-pack-session.md](examples/ref-pack-session.md) — a full pack build with costs and rejects.

## Check before you finish

- [ ] Identity block pasted verbatim and first; version tag present.
- [ ] Refs chosen for the shot (face anchor 01 always; laugh 05 for UGC; sunglasses 06 for lounge/club).
- [ ] Every output scored; nothing under 6/7 published; no age doubt.
- [ ] Video: first frame was an approved still; middle and last frames checked.
- [ ] Log written (model, refs, seed, score, fixes).
- [ ] No real person's photo was ever used as a reference; refs are only approved character images.

## Pitfalls

- **Too many refs.** Ten scene refs drown the face. 2–4 identity refs plus at most 2 style/scene refs.
- **Long edit chains.** Nano Banana and GPT Image drift after many sequential edits (checked 2026-10). Restart from the
  anchor every 3–4 edits.
- **Refs at the wrong aspect.** A 1:1 face ref into a 9:16 video makes models invent the body. Use pack shot 07 or 09.
- **Mirror flip panic.** Selfie and mirror shots flip the streak side. That's fine; two panels is not.
- **Stylised refs for photoreal jobs.** One illustrated ref pulls the whole output toward illustration.
- **Midjourney V8 + `--oref`.** It silently falls back or ignores it; pin `--v 7`.

## Related skills

- [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md) · [../photoreal-portrait-prompts/SKILL.md](../photoreal-portrait-prompts/SKILL.md)
- [../image-prompting-fundamentals/SKILL.md](../image-prompting-fundamentals/SKILL.md) · [../video-prompting/SKILL.md](../video-prompting/SKILL.md)
- [../prompt-library-management/SKILL.md](../prompt-library-management/SKILL.md) · [../batch-content-production/SKILL.md](../batch-content-production/SKILL.md)
- [../../build/media-pipelines/SKILL.md](../../build/media-pipelines/SKILL.md)
