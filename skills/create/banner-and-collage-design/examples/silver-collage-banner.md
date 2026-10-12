# Worked example: the looks collage banner

Brief: a 3:1 collage of eight of her looks with a glass script "Claudia" wordmark on the right. Tiles from the grid in
`templates/collage-grid.md`. Cap $0.60.

## 1. Tiles (Nano Banana 2.1, 2K, $0.0504 each, checked 2026-10)

```sh
for t in A-silver B-sky C-holo D-hero E-sculpture F-green G-trench H-disco; do
  claudia generate image "$(cat collage/$t.txt)" --model google/nano-banana-2.1 --resolution 2K \
    --aspect "$(cat collage/$t.aspect)" --ref "$(cat collage/$t.refs)" --brand claudia --max-usd 0.06 --yes
done
```

`--yes` skipped the per-tile confirmation only because the owner approved the whole batch (8 × $0.05 ≈ $0.40) in advance
and `--max-usd` still capped each tile. `~/.claudia/config.json` had `media.limits.perDayUsd: 3` as the backstop.

| Tile | Score | Action |
|---|---|---|
| A silver night | 7/7 | keep |
| B sky gown | 6/7 | keep (clip hidden under the visor strap) |
| C holo | 6/7 — the sunglasses came out pink | edit "make the tiny oval sunglasses orange" (+$0.04) |
| D hero | 5/7 — read young | regenerated with 85mm and "adult facial proportions, defined cheekbones" → 7/7 (+$0.05) |
| E sculpture | 7/7 | keep |
| F green patent | 6/7 — goggles had a fake logo | edit "plain orange goggles, no logo" (+$0.04) |
| G cobalt trench | 7/7 | keep |
| H disco ball | n/a no face | keep |

## 2. Assemble

```sh
sh scripts/collage-3x1.sh A.png B.png C.png D.png E.png F.png G.png H.png collage.jpg
```

Two tiles (B, E) were warmer than the rest; a light cool grade in the editor (temperature −5) matched them.

## 3. Wordmark

Great Vibes, "Claudia", clear glass (white 1.5 px stroke, soft inner shadow, 20 % white fill), exported as
`wordmark-glass.png` (780 px wide). Placed over the E/F boundary:

```sh
ffmpeg -i collage.jpg -i wordmark-glass.png -filter_complex "[1]scale=780:-1[w];[0][w]overlay=1720:400" -q:v 2 collage-marked.jpg
sh scripts/banner-export.sh collage-marked.jpg banners-out collage
```

## 4. Review and ship

- Mobile check at 800 px: the hero face (D) is in the centre, wordmark readable, the avatar zone on X covers tile B's
  lower half — acceptable because B is a supporting tile, not text or a face's eyes.
- Posts using the collage never claim a real shoot, brand or event; it's labelled AI-generated.
- Total ≈ $0.53. Filed with the brief, tile prompts, font licence and sidecars.
