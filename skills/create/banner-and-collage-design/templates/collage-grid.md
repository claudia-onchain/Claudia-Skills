# 3:1 collage grid (3000×1000, 6 px gutters, `#0a0b0d`)

```
x:  3      603   1053              1953        2553   3000
   +------+-----+------------------+-----------+------+
   |  A   |     |                  |    E      |  G   |  y 3
   | 594x |  C  |        D         |  594x494  | 444x |
   | 494  | 444x|      894x994     +-----------+ 594  |
   +------+ 994 |   (hero close-up)|    F      +------+  y 503 / 603
   |  B   |     |                  |  594x494  |  H   |
   |594x494     |                  |           |444x394|
   +------+-----+------------------+-----------+------+  y 1000
```

`sh scripts/collage-3x1.sh A.jpg B.jpg C.jpg D.jpg E.jpg F.jpg G.jpg H.jpg collage.jpg` builds exactly this.
Wordmark zone: over the E/F boundary, x ≈ 1700–2500, y ≈ 380–620 (glass script wordmark).

## Tile prompts

Paste the full `[CLAUDIA ID v2]` block where it says `[ID]`. Generate each tile at the aspect listed (Nano Banana 2.1,
2K, refs `01` + listed) so the centre-crop keeps the subject. One grade: clean editorial flash colour on every tile. Every tile: "candid, natural skin texture, no readable logos or text".

| Tile | Cell | Gen aspect | Refs | Prompt (after `[ID]`) |
|---|---|---|---|---|
| A Silver night on cobalt | 594×494 | 1:1 | 01, 07 | "Three-quarter length on a deep cobalt-blue paper backdrop, hands at her waist, the fur slipping off her arms; a liquid-silver column gown, a white faux-fur stole and a wide crystal choker; direct flash; 50mm." |
| B The Sky gown | 594×494 | 1:1 | 01 | "Chin lifted, one hand behind her back, the orange shield visor down; a cloud-print halter gown with a mint satin halter band; white studio paper, sun-like light from the left; 50mm." |
| C Holo on cobalt | 444×994 | 9:16 | 01, 07 | "Full length on a cobalt backdrop, hands on hips, bell sleeves spread; a holographic mini dress, white patent platform boots, tiny orange oval sunglasses; direct flash." |
| D Centre close-up (hero) | 894×994 | 4:5 | 01, 04 | "Close-up on crinkled silver foil, looking back over her shoulder, one hand at her collar, eyes to the lens, cool direct gaze; a white glossy vinyl top with huge puffed sleeves; hard flash; 85mm f/2.8." |
| E The Sculpture dress | 594×494 | 1:1 | 01, 07 | "Kneeling on white studio paper, looking up at the lens; a sculptural white patent shell dress with clear bubble windows; soft daylight; 50mm." |
| F Green patent | 594×494 | 1:1 | 01 | "Waist-up, one hand in her pocket, orange goggles on and a second pair pushed up into her bangs; a green patent blazer over white satin; grey studio wall; 50mm." |
| G Cobalt trench | 444×594 | 2:3 | 01 | "Three-quarter, hands in the pockets of a cobalt patent trench over white satin, an orange shield visor, silver hoops; pale studio wall; direct flash." |
| H Disco ball and lilies | 444×394 | 1:1 | props/disco-ball | "A mirrored disco ball on silver foil beside a bunch of white lilies and two taped polaroids of her, hard flash, sparkle." |

## Assembly checks

- [ ] Faces sit near each tile's centre (the script centre-crops).
- [ ] Same grade across tiles; regrade outliers.
- [ ] No two adjacent tiles with the same outfit.
- [ ] Hero tile D is the sharpest face; others are supporting looks.
- [ ] Wordmark overlay added after assembly, from a licensed font.
