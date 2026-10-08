# Worked example: building Claudia's 12-shot ref pack (one session)

Goal: a locked pack in `refs/claudia/` so every later job can send 2–4 identity refs. Budget cap: $3.

## Setup

```sh
npm i -g @useclaudia/cli @useclaudia/media
claudia keys set google          # asked without echo; never paste keys into chat or files
mkdir -p refs/claudia out
cp <site>/client/public/claudia/media/portrait-blue-1024.jpg refs/claudia/01-front-neutral.jpg   # owner-approved anchor
```

Spend caps for `claudia generate` come from the `media.limits` object in `~/.claudia/config.json` (there is no
`claudia config set` key for it — edit the file, which holds no secrets):

```json
{ "media": { "limits": { "perJobUsd": 0.5, "perDayUsd": 3, "approveAboveUsd": 0.25 } } }
```

In scripts, pass the same object to `createMedia({ limits })`. `--max-usd` on each command adds a per-call ceiling.

## Shot 02 — three-quarter left

Dry run first to see the exact request and price:

```sh
claudia generate image "[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black \
jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front \
bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across \
the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with \
visible pores; fine-line tattoos on her arms (small stars, a rose, a sun). Image 1 is her face reference; keep her \
identical to image 1. Three-quarter view turned to her left, plain warm-grey backdrop, 85mm portrait lens at f/2.8, soft \
window key light from camera left, the copper panel visible in the front bangs." \
  --model google/nano-banana-2.1 --ref refs/claudia/01-front-neutral.jpg --aspect 2:3 --resolution 2K --dry-run
```

Output (abridged): `Cost ≈ $0.0504 · list price · $0.0504 per 2K image`. Ran it with `--max-usd 0.10 --yes`.

Result: score 6/7 — hoops had become large door-knockers. Fixed with edit prompt #10-style wording ("small thin gold
hoops") on `openai/gpt-image-2.5-sunburst` (~$0.013 at medium). Re-scored 7/7, saved as `02-34-left.jpg`.

## Shots 03–12

| Shot | Model | Tries | Problem seen | Fix | Final |
|---|---|---|---|---|---|
| 03 ¾ right | nano-banana-2.1 | 2 | second copper panel appeared on this side | regenerated with "the hair on this side is jet-black" | 7/7 |
| 04 profile | nano-banana-2.1 | 1 | — | — | 7/7 |
| 05 laugh | nano-banana-2.1 | 3 | looked ~19 on try 1 (wide lens, big eyes) | moved to 35 mm framing, age line first; try 3 fixed | 7/7 |
| 06 sunglasses | flux-2-pro, refs 01+05 | 1 | — | — | 7/7 |
| 07 full body | nano-banana-2.1, refs 01+05 | 2 | tartan rendered blue-green | edit fix #12 | 7/7 |
| 08 seated black knit | nano-banana-2.1 | 1 | clip hidden | accepted (6/7, clip) | 6/7 |
| 09 phone selfie | gpt-image-2.5-flare | 2 | six fingers on the phone hand | edit fix #7 on sunburst | 7/7 |
| 10 club light | nano-banana-2.1, refs 01+06 | 2 | random "DJ" text on a banner | edit fix #8 | 7/7 |
| 11 golden hour | nano-banana-2.1 | 1 | — | — | 7/7 |
| 12 hair detail | nano-banana-2.1, refs 01+04 | 2 | thin highlights instead of panels | regenerated: "one chunky copper-orange panel" | 7/7 |

Spend: 19 image calls + 5 edits ≈ $1.12 (`claudia generate models image` shows today's spend). Under the $3 cap.

## Lock it

```sh
sh scripts/contact-sheet.sh refs/claudia/01-front-neutral.jpg refs/claudia/0{2,3,4,5,6,7,8,9}*.jpg
# owner reviews out/contact.jpg and the second sheet for 10–12, signs off in the library log
```

Then the brand kit gets the three most useful refs (01, 02, 05) — see step 8 of
[../../claudia-character-bible/SKILL.md](../../claudia-character-bible/SKILL.md). Every sidecar `.json` from
`~/.claudia/media/library/2026-10/` was kept next to its copy in `refs/claudia/` for provenance.
