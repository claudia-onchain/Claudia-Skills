# Formats and upload specs (checked 2026-10)

Read this before you set up the canvas (step 1 of the skill) and before you export (step 7). Platforms change; confirm
on the upload screen. [3P] marks numbers taken from third-party or older creator guides because the platform has no
current public spec page that could be read.

## Strips for social feeds

| Format | Canvas | Notes |
|---|---|---|
| 4-panel grid, one image | 1080 × 1350 (4:5), 2 × 2 panels | the `templates/strip.html` default; reads on Instagram, X, Threads, Bluesky |
| 4-panel vertical stack, one image | 1080 × 1920 (9:16) | for Stories and Shorts-style stills; keep balloons out of the top and bottom app UI |
| One panel per slide, carousel | 1080 × 1350 each | swipe = pacing; the last slide is the punchline; see [../../carousel-design/SKILL.md](../../carousel-design/SKILL.md) |
| X multi-image post | up to 4 images | the feed crops multi-image posts (two images show at about 7:8 each), while a single 4:5 image survives mobile best, so one 2 × 2 strip image is safer than four separate panels (see [../../../grow/x-playbook/references/x-formats-and-limits.md](../../../grow/x-playbook/references/x-formats-and-limits.md)) |
| Square | 1080 × 1080 | 3-panel horizontal strips, Telegram and Discord posts |

Put the series name, strip number and handle in a thin header bar (as the template does). People screenshot strips;
the header keeps your name on them.

## WEBTOON CANVAS (vertical scroll)

| Item | Spec |
|---|---|
| Episode image width | 800 px |
| Image height | up to 1280 px per image; taller images are sliced by the uploader [3P] |
| Formats | JPG, JPEG, PNG [3P] |
| Upload size | up to 20 MB per episode upload [3P] |
| Series thumbnail (square) | 1080 × 1080, under 500 KB [3P] |
| Series thumbnail (vertical) | 1080 × 1920, under 700 KB [3P] |

Sources: WEBTOON's Creator Resource Handbook (as summarised by search) and Clip Studio's "Getting Started on WEBTOON
CANVAS" guide, read 2026-10. `scripts/render-webtoon.sh` and `scripts/slice-tall.sh` produce 800 × 1280 slices and
print the total size so you can see the 20 MB budget.

Draw or assemble at **1600 px wide** if you want a sharper master, then let the scripts scale to 800 for upload.

## AI-generated comics on comic platforms

Platform rules on AI-generated art differ and change. Before you start a series on any comic platform (WEBTOON CANVAS,
Tapas, others), read its current content and AI rules and follow them. Wherever you post:

- Say it plainly in the series description and on each episode's end card: "AI-generated art, written and edited by
  <name>".
- Credit the human work honestly (script, lettering, edit) and don't claim to have drawn what a model generated.
- Expect some readers to dislike AI comics; being upfront is better than being found out.

## Print (zines, small runs)

If a strip goes to print, rebuild it at 300 DPI at the printed size and follow the printer's bleed template; see
[../../product-and-merch-mockups/references/print-specs.md](../../product-and-merch-mockups/references/print-specs.md)
for pixel maths.
