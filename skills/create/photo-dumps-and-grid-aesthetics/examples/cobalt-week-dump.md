# Example: "cobalt week" dump and the grid block around it

Claudia's dump for the week of 2026-10-12. Budget cap $1.50. Posting path: `@useclaudia/social` (9 JPEG frames, under
the API's 10).

## 1. What it's about

"A week in the cobalt studio: shooting the Holo look, a lot of flash, one boot that went missing." Honesty check: all
frames are in her cobalt studio world, no real venue, event, people or brands.

## 2. Colour story

| | Value |
|---|---|
| Story | cobalt week |
| Dominant | cobalt `#1f3a8a`, silver `#c9ccd3` |
| Accent | rose `#ff6fa5` (a sparkle on frame 4, a sticky note on frame 8; nowhere else) |
| Grade | `cool clean grade, lifted blacks, gentle film grain, chrome highlights` |
| Camera feel | phone photo with on-camera flash, slightly off-centre |

## 3. Shot list (as generated, before culling)

| n | Kind | Idea | Model | Aspect |
|---|---|---|---|---|
| 1 | portrait | Holo look, laughing, face centred | nano-banana-2.1, refs 01 + 05 | 4:5, 2K |
| 2 | detail | peach star clip on cobalt carpet next to a white platform boot | flux-2-pro | 4:5 |
| 3 | place | backdrop corner, light stand, headset mic coiled on the floor | flux-2-pro | 4:5 |
| 4 | portrait | sliding on the orange shield visor, chin up, flash sparkle | nano-banana-2.1, refs 01 + 06 | 4:5, 2K |
| 5 | clip | 5 s: she spins once, the flash fires | omni-flash from frame 1 | 9:16 cropped to 4:5 |
| 6 | object | tiny orange oval sunglasses on a silver tray | flux-2-pro | 4:5 |
| 7 | portrait | outtake: mid-blink, half laughing | nano-banana-2.1, refs 01 + 05 | 4:5, 2K |
| 8 | detail | a rose sticky note on the light stand, blank | flux-2-pro | 4:5 |
| 9 | place | the empty cobalt set at the end of the day, one boot lying on its side | flux-2-pro | 4:5 |
| 10 | portrait | back view walking off set | nano-banana-2.1, refs 01 + 07 | 4:5, 2K |

Estimate printed before the run: **$0.61** for the nine stills (4 × $0.0504 + 5 × ~$0.03, rounded up for extra
megapixels on FLUX.2) plus the clip at ~$0.80 (Omni Flash, model-set length, estimate). The clip was over
`approveAboveUsd: 0.1`, so it waited for the operator's approval, which was given.

## 4. Generation notes

- Frame 4 run 1 drew the visor in silver. Fixed with "an orange shield visor (orange, not silver)". Run 2 kept.
- Frame 6 run 1 had a readable brand mark on the tray. Re-run with "a plain silver tray with no markings".
- Frame 10 (back view): kept, but cut in step 5 (three portraits already carry the face).
- Total spend: **$1.47** (stills, two re-runs, the clip). Under the cap.

## 5. Cull and sequence

Cut: frame 10 (the back view added nothing). Final order, nine items:

```text
1  portrait  Holo look, laughing          (grid tile: face centred in the 3:4 crop)
2  detail    star clip + boot              (the surprise: scale change)
3  portrait  visor on, chin up
4  place     backdrop corner, coiled mic
5  clip      the spin, flash fires         (mid-dump motion)
6  object    orange oval sunglasses on silver
7  portrait  outtake, mid-blink
8  detail    rose sticky note
9  place     empty set, one boot on its side   (quiet, a little funny: "the boot that went missing")
```

Colour flow: brightest flash frames first, the empty end-of-day set last (a slow move to dark).

## 6. Grid preview

`work/grid-plan.txt`: the dump's frame 1 at the top, then the last eight real posts.

```sh
node scripts/grid-preview.mjs work/grid.html --list work/grid-plan.txt --pinned 3 --colors --render work/grid.png
# wrote work/grid.html (9 tiles, 3 rows, 3 pinned)
#    1  #2a3f86  cobalt         work/dump-03/01.jpg
#    2  #c3c6cc  silver         posts/2026-10-09-foil-banner.jpg
#    3  #101215  near-black     posts/2026-10-07-club.jpg
#    4  #2b438f  cobalt         posts/2026-10-05-holo.jpg
#    …
```

Row 1 after posting: cobalt (new) · silver · near-black. Good balance. Row 2 started with another cobalt face tile right
under the new one, so the plan for Thursday's post was swapped from a cobalt portrait to the white-paper quote card.

## 7. Caption, alt text, labels

```text
cobalt week, in nine frames. one boot is still missing. which one's the cover? #aicharacter #cobaltblue #studioday
```

Alt text (frame 1 and 9 shown):

```text
1  AI-generated image: Claudia, black bob with a peach streak, star clip and headset mic, laughing in a holographic bell-sleeve mini dress against a cobalt-blue backdrop, flash photo.
9  AI-generated image: an empty cobalt-blue studio set at the end of the day, one white platform boot lying on its side.
```

`labels: { ai: true }`. Nothing paid or gifted; no coins.

## 8. Publish and review

Preview: 9 media, JPEG, Instagram `is_ai_generated` set, no warnings. Submitted, approved by the operator, scheduled for
Sunday 11:00 New York. Two weeks later the monthly grid render showed the cobalt row holding together; the next block
moves to "white paper" for contrast.
