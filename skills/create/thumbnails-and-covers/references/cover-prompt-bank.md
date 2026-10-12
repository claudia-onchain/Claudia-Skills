# Cover-still prompt bank

`[CLAUDIA ID v2] …` = paste the full identity block from `../../claudia-character-bible/templates/identity-blocks.md`.
Every prompt ends with "No text, no letters, no logos." Generate at 2K. Score 7/7 before use.

## The cover formula

`ID → wardrobe → cover composition (face position, eyes to lens, expression, empty side) → setting → light → lens → finish`

Expressions that work as hooks: open laugh; cool direct gaze with one raised brow; sunglasses pulled halfway down the
nose, eyes over the rims; mock-shocked hand over mouth; deadpan stare with a slight smirk; eyes closed, blissed out (club).

## Five series stills (16:9 thumbnails; for 9:16 covers swap "left 45 percent" for "upper and lower thirds")

**Club Diaries (Nano Banana 2.1, refs 01 + 05 + 09)**
```text
[CLAUDIA ID v2] … wearing a white glossy vinyl top with huge crinkled puffed sleeves and a high ruched neck, a small star pin. Cover composition: arm's-length front-camera selfie,
her face on the right third filling half the frame height, eyes to lens, laughing with her mouth open, raindrops on the
lens. The left 45 percent is an out-of-focus wet the club with roll-up doors under a blue-grey dusk sky, quiet and
dark enough for a title. 24mm phone lens look, slight motion blur at the edges, natural skin texture, 16:9.
No text, no letters, no logos.
```

**Desk nights (GPT Image 2.5 Flare, quality high, refs 01 + 08)**
```text
Use image 1 as the identity reference for Claudia and keep her face, hair, peach streak, star clip and headset mic
exactly. Preserve list: face, freckles, grey-green eyes, jet-black jaw-length bob, heavy straight bangs, peach streak.
Scene: late night at her desk, she rests her chin on her folded arms behind an open a laptop with a chrome star sticker, looking straight into the lens with a sleepy cool direct gaze; the disco ball asleep beside the keyboard;
the right 45 percent is dark purple-rose bokeh from monitors, empty for a title. Soft rose rim light, warm key from the
laptop screen, 35mm lens, f/2, photographic, natural skin texture. She is a 28-year-old adult woman. 16:9. No text, no
letters, no logos, no readable screen content.
```

**After hours (FLUX.2 Pro, refs 01 + 06 + 10; FLUX ignores negatives, so describe the clean result)**
```text
Claudia from image 1, a 28-year-old woman with a glossy jet-black jaw-length bob, heavy straight bangs, one peach-orange streak panel, small peach star hair clip, a thin headset mic, wearing oversized black oval sunglasses and a liquid-silver gown.
Close-up on the left third, chin slightly raised, eyes closed in bliss behind the sunglasses, one hand up in the air.
Blue-violet club haze with moving-head light beams and a soft rose rim light; the right half is clean dark haze, an
empty area for a title. 50mm, f/1.8, film grain, photographic. Plain unbranded DJ equipment, clean surfaces without
lettering. 16:9.
```

**Visor on / off (Nano Banana 2.1, refs 01 + 06)**
```text
[CLAUDIA ID v2] … wearing a floor-length cloud-print halter gown and an orange shield visor. Cover composition: medium
close-up, her face on the right third, she lifts the orange visor halfway up into her bangs and looks under it straight
into the lens with a cool direct gaze. Behind her: seamless pale grey-white studio paper with a long soft shadow; the left
45 percent is calm paper, empty enough for a title. Soft daylight from the left, 85mm, f/2, editorial film look, natural
skin texture, 16:9. No text, no letters, no logos.
```

**Lookbook (Midjourney V7, omni reference)**
```text
photo of a 28-year-old woman, glossy jet-black jaw-length blunt bob with heavy straight bangs and one peach-orange streak panel, small peach star hair clip, a thin headset mic, light freckles, wearing a liquid-silver column gown and a white faux-fur
stole, standing on a deep cobalt-blue paper backdrop under direct flash, face on the right third, eyes to lens, cool gaze,
the left half is empty cobalt paper, editorial film still, 50mm --ar 16:9 --oref <url-of-ref-01>
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
