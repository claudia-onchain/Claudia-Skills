# Sequencing a dump and planning the grid

Read this in step 5 (ordering the frames) and step 6 (planning the grid). Platform facts carry a check date; the rest
are house rules to test against your own numbers.

## Platform facts (checked 2026-10)

| Fact | Value | Source |
|---|---|---|
| Carousel size in the app | up to 20 photos or videos | Instagram, August 2024 (reported by The Verge) |
| Carousel size through the API / `@useclaudia/social` | up to 10, JPEG images only | Meta Content Publishing docs; package README |
| Photo ratios | 1:1, 4:5, and 3:4 since May 2025 | Mosseri's announcement, reported by Kapwing and Oktopost |
| Profile grid tiles | 3:4, centre-cropped, since January 2025 | same |
| Pinned posts | up to 3, shown first | Instagram feature since 2022 (third-party guides) |
| Reorder grid | press and hold a post → "Reorder grid", drag; pinned posts stay on top; upload dates don't change | broad rollout reported 8 June 2026 (Social Media Today and others) |
| Carousel ratio | every slide is cropped to the first slide's ratio | Meta docs and third-party guides |

## Sequencing a dump (house rules)

1. **Slide 1 is the grid tile and the hook.** Her face, or the single strongest frame, with the subject inside the
   centre 3:4 area.
2. **Slide 2 is a surprise, not a near-duplicate.** A detail, a laugh, a change of scale.
3. **Rhythm.** Alternate scale and subject: person, detail, place, person, object, person. Never two near-identical
   frames next to each other.
4. **Colour flow.** Move gradually: light to dark across the dump (a day into night), or dark to light (a night into
   morning). Avoid jumping from the brightest frame straight to the darkest unless it's the joke.
5. **One clip at most.** A 3–5 second clip (a laugh, a spin, the flash firing) in the middle keeps people swiping.
6. **End quiet or funny.** A detail, an empty room, an outtake. Not a call to action.
7. **Length.** 6–10 frames for most dumps; 12–20 only when every frame earns it (and then post in the app).

## Planning the grid (house rules)

- **Plan in blocks of nine.** Nine posts is three rows of three, about three weeks at three posts a week. Plan the block
  in `templates/grid-plan.csv` before generating.
- **Rows read together.** A new post shifts every tile one place, so exact patterns drift. Plan colour stories by row
  of three, and expect each row to slide. The grid reorder feature can fix a drift after posting, sparingly.
- **Light / dark balance.** No more than two very dark or two very light tiles side by side.
- **Faces.** No more than two face close-ups touching in the grid; break them with a detail or a wide.
- **Covers count.** Reel and carousel covers are tiles too. Pick a cover frame with the subject centred for the 3:4 crop.
- **Pinned.** Pin the post that explains the account (who she is, that she's an AI character), the best-performing
  post of the quarter, and the current series or launch.
- **Text tiles.** At most one text-heavy tile per row; three in a row turns the grid into a slide deck.

## Checking a plan

```sh
node scripts/grid-preview.mjs work/grid.html --list work/grid-plan.txt --pinned 3 --colors --render work/grid.png
```

`grid-plan.txt` lists image paths newest first: the planned posts at the top, then the last 6–9 real posts (download them
from the account or use the files you posted). `--colors` prints each tile's average colour from the 3:4 crop and the
nearest palette token, so a row that drifts out of the colour story shows up as a name that doesn't belong.
