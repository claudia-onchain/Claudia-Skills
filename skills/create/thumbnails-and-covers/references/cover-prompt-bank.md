# Cover-still prompt bank

`[CLAUDIA ID v1] …` = paste the full identity block from `../../claudia-character-bible/templates/identity-blocks.md`.
Every prompt ends with "No text, no letters, no logos." Generate at 2K. Score 7/7 before use.

## The cover formula

`ID → wardrobe → cover composition (face position, eyes to lens, expression, empty side) → setting → light → lens → finish`

Expressions that work as hooks: open laugh; knowing half-smile with one raised brow; sunglasses pulled halfway down the
nose, eyes over the rims; mock-shocked hand over mouth; deadpan stare with a slight smirk; eyes closed, blissed out (club).

## Five series stills (16:9 thumbnails; for 9:16 covers swap "left 45 percent" for "upper and lower thirds")

**Rain diaries (Nano Banana 2.1, refs 01 + 05 + 09)**
```text
[CLAUDIA ID v1] … wearing an olive-green fine-knit crop cami with a scalloped copper-orange edged neckline and small
orange embroidered stars, a star pendant on layered silver chains. Cover composition: arm's-length front-camera selfie,
her face on the right third filling half the frame height, eyes to lens, laughing with her mouth open, raindrops on the
lens. The left 45 percent is an out-of-focus wet warehouse lot with roll-up doors under a blue-grey dusk sky, quiet and
dark enough for a title. 24mm phone lens look, slight motion blur at the edges, natural skin texture, 16:9.
No text, no letters, no logos.
```

**Desk nights (GPT Image 2.5 Flare, quality high, refs 01 + 08)**
```text
Use image 1 as the identity reference for Claudia and keep her face, hair, copper streaks, orange clip and gold hoops
exactly. Preserve list: face, freckles, warm brown eyes, jet-black jaw-length bob, heavy straight bangs, copper panels.
Scene: late night at her desk, she rests her chin on her folded arms behind an open laptop with a single pink butterfly
sticker, looking straight into the lens with a sleepy knowing half-smile; a grey tabby cat asleep beside the keyboard;
the right 45 percent is dark purple-rose bokeh from monitors, empty for a title. Soft rose rim light, warm key from the
laptop screen, 35mm lens, f/2, photographic, natural skin texture. She is a 28-year-old adult woman. 16:9. No text, no
letters, no logos, no readable screen content.
```

**After hours (FLUX.2 Pro, refs 01 + 06 + 10; FLUX ignores negatives, so describe the clean result)**
```text
Claudia from image 1, a 28-year-old woman with a glossy jet-black jaw-length bob, heavy straight bangs, copper-orange
streak panels, small orange hair clip, thin gold hoops, wearing oversized black oval sunglasses and a black ribbed cami.
Close-up on the left third, chin slightly raised, eyes closed in bliss behind the sunglasses, one hand up in the air.
Blue-violet club haze with moving-head light beams and a soft rose rim light; the right half is clean dark haze, an
empty area for a title. 50mm, f/1.8, film grain, photographic. Plain unbranded DJ equipment, clean surfaces without
lettering. 16:9.
```

**Lamp light (Nano Banana 2.1, refs 01 + 06)**
```text
[CLAUDIA ID v1] … wearing an olive-green crop cami and a star pendant on layered silver chains. Cover composition:
medium close-up, her face on the right third, she pulls oversized black oval sunglasses halfway down her nose and looks
over the rims straight into the lens with a knowing half-smile. Behind her: warm butter-yellow wall, framed botanical
cross-stitch prints and a brass table lamp with a pleated cream shade glowing on the left; the left 45 percent is the soft
wall and lamp glow, calm enough for a title. Tungsten lamplight, 85mm, f/2, 35mm film look, natural skin texture, 16:9.
No text, no letters, no logos.
```

**Out of office (Midjourney V7, omni reference)**
```text
photo of a 28-year-old woman, glossy jet-black jaw-length blunt bob with heavy straight bangs and copper-orange streak
panels, small orange hair clip, thin gold hoops, light freckles, wearing large cream over-ear headphones and a white
linen shirt, leaning on a whitewashed Santorini terrace wall at golden hour, face on the right third, eyes to lens,
relaxed half-smile, the left half is sea and sky haze, editorial film still, 50mm --ar 16:9 --oref <url-of-ref-01>
--ow 200 --style raw --v 7 --no text, letters, logo, watermark
```

## Vertical cover (9:16) variant line

Replace the composition sentence with: `vertical cover composition: her face in the middle third, eyes to lens, the
upper third is quiet sky/wall for a series label and the lower-middle area is clear for a two-line title; nothing
important in the bottom fifth.`

## Fixes

| Problem | Fix (edit, not reroll) |
|---|---|
| Text-like squiggles on screens/signs | "Edit image 1: replace all screen and sign content with soft abstract glow. Change nothing else." |
| Face too small | regenerate with "her face fills half the frame height" — edits can't add resolution |
| Empty side too busy | "Edit image 1: blur and darken the left 45 percent into soft bokeh. Preserve her exactly." |
| Looks young | use the age-fix edit in `../../character-consistency/templates/edit-fix-prompts.md`; reject if it persists |
