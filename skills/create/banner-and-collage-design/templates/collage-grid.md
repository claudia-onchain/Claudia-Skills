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
Wordmark zone: over the E/F boundary, x ≈ 1700–2500, y ≈ 380–620 (script wordmark, off-white, rose underline).

## Tile prompts

Paste the full `[CLAUDIA ID v1]` block where it says `[ID]`. Generate each tile at the aspect listed (Nano Banana 2.1,
2K, refs `01` + listed) so the centre-crop keeps the subject. One grade: warm Kodak Portra 400 for day/golden tiles,
CineStill 800T for night tiles. Every tile: "candid, natural skin texture, no readable logos or text".

| Tile | Cell | Gen aspect | Refs | Prompt (after `[ID]`) |
|---|---|---|---|---|
| A Santorini headphones | 594×494 | 1:1 | 01 | "Sitting on a whitewashed wall at golden hour wearing cream over-ear headphones, eyes half-closed, smiling at a song; white linen shirt open over a black top; blue-domed village and caldera sea behind; 35mm; Kodak Portra 400." |
| B Wine-glass wink | 594×494 | 1:1 | 01, 05 | "Raising a glass of white wine toward the lens and winking, elbow on a marble bar, candle in the foreground, warm bokeh; black ribbed cami; 50mm f/1.8; Kodak Gold 200." |
| C Airplane window | 444×994 | 9:16 | 01 | "Temple resting against an airplane window, looking out at sunset clouds, faint reflection in the glass, curved window frame filling the upper half; black knit jumper; 35mm." |
| D Centre close-up (hero) | 894×994 | 4:5 | 01, 08, 11 | "Close-up, head resting on her folded arms in an oversized black knit jumper, eyes to the lens, knowing closed-lip half-smile, a laptop corner with stickers soft in the foreground, warm low light from the left; 35mm f/2; Kodak Portra 400." |
| E Trading screen + glasses | 594×494 | 1:1 | 01, 02 | "Thin black rectangular glasses, chin on one hand, thoughtful half-smile, a monitor behind with blurred green and red candlestick charts (no readable numbers); screen glow; 50mm." |
| F City-night balcony | 594×494 | 1:1 | 12 | "Seen from behind on a high-rise balcony, hair half-up with bangs down, a glowing city grid below at blue hour, a glass of sparkling water on the ledge; CineStill 800T." |
| G Mirror selfie | 444×594 | 2:3 | 01, 07 | "Mirror selfie in a bathroom with warm vanity lights, black sports top, holding a plain black phone (no logo) at chest height, slight smile; on-camera flash flare; non-sexual, everyday gym wear." |
| H Cat on bed | 444×394 | 1:1 | 01, props/cat | "Lying on a white duvet cheek-to-cheek with the grey tabby with white paws, eyes half-closed, soft morning light; grey hoodie; 35mm." |

## Assembly checks

- [ ] Faces sit near each tile's centre (the script centre-crops).
- [ ] Same grade across tiles; regrade outliers.
- [ ] No two adjacent tiles with the same outfit.
- [ ] Hero tile D is the sharpest, warmest face; others are supporting moments.
- [ ] Wordmark overlay added after assembly, from a licensed font.
