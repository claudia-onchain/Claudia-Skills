# Worked example: travel / lifestyle collage banner

Brief: a 3:1 collage of eight moments from her life with a handwritten "CLAUDIA" wordmark on the right. Tiles from the
grid in `templates/collage-grid.md`. Cap $0.60.

## 1. Tiles (Nano Banana 2.1, 2K, $0.0504 each, checked 2026-10)

```sh
for t in A-santorini B-wine C-airplane D-hero E-trading F-balcony G-mirror H-cat; do
  claudia generate image "$(cat collage/$t.txt)" --model google/nano-banana-2.1 --resolution 2K \
    --aspect "$(cat collage/$t.aspect)" --ref "$(cat collage/$t.refs)" --brand claudia --max-usd 0.06 --yes
done
```

`--yes` skipped the per-tile confirmation only because the owner approved the whole batch (8 × $0.05 ≈ $0.40) in advance
and `--max-usd` still capped each tile. `~/.claudia/config.json` had `media.limits.perDayUsd: 3` as the backstop.

| Tile | Score | Action |
|---|---|---|
| A Santorini | 7/7 | keep |
| B wine wink | 6/7 | keep (clip hidden) |
| C airplane | n/a face partly hidden | keep |
| D hero | 5/7 — read young | regenerated with 85mm and "adult facial proportions, defined cheekbones" → 7/7 (+$0.05) |
| E trading | 6/7 — chart had fake ticker text | Kontext edit "blur the chart labels, no readable text" (+$0.04) |
| F balcony | n/a back view | keep |
| G mirror | 6/7 — phone had a fruit-like logo | edit "plain black phone case, no logo" (+$0.04) |
| H cat | 7/7 | keep |

## 2. Assemble

```sh
sh scripts/collage-3x1.sh A.png B.png C.png D.png E.png F.png G.png H.png collage.jpg
```

Two tiles (E, F) were cooler than the rest; a light warm grade in the editor (temperature +6) matched them.

## 3. Wordmark

Caveat 600, "CLAUDIA", off-white `#ece9e2`, slight upward slant, rose `#ff6fa5` brush underline and a four-point
sparkle, exported as `wordmark-script.png` (780 px wide). Placed over the E/F boundary:

```sh
ffmpeg -i collage.jpg -i wordmark-script.png -filter_complex "[1]scale=780:-1[w];[0][w]overlay=1720:400" -q:v 2 collage-marked.jpg
sh scripts/banner-export.sh collage-marked.jpg banners-out collage
```

## 4. Review and ship

- Mobile check at 800 px: the hero face (D) is in the centre, wordmark readable, the avatar zone on X covers tile B's
  lower half — acceptable because B is a supporting tile, not text or a face's eyes.
- Captions or posts using the collage never claim she travelled; it's labelled AI-generated.
- Total ≈ $0.53. Filed with the brief, tile prompts, font licence and sidecars.
