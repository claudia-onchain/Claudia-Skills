# Worked example: the "studio" tee drop

Claudia's community asked for merch after the "Desk at Dusk" series hit episode 12. The drop: one white tee with a big
peach star (her star clip, as a flat graphic) and the word "studio" under it, plus a 3 in kiss-cut sticker of the star.
Print-on-demand, made to order, no inventory.

## Brief (from templates/merch-brief.md)

| Field | Value |
|---|---|
| Products | white heavyweight tee, front only; 3 in kiss-cut sticker |
| Provider | Printful (standard tee front 12 × 16 in, checked 2026-10) |
| Print method | DTG |
| Target | 3600 × 4800 px canvas (12 × 16 in at 300 DPI; 150 DPI is Printful's floor) |
| Colours | peach `#ff9a6b`, near-black `#0a0b0d` outline; off-white is skipped (it would vanish on a white tee) |
| Text | "studio", lowercase, Barlow Condensed 800 (SIL OFL), added in an editor, not by the model |
| Must not include | the rose UI accent as a glow, soft shadows, logos, coin tickers, price slogans |

## 1. Generate the flat graphic

```ts
const job = await media.generate({
  kind: "image",
  model: "openai/gpt-image-2.5-flare",
  aspect: "4:5",
  prompt: "Flat vector-style t-shirt graphic on a fully transparent background. A large five-point star with slightly rounded points, bold flat shape, thick clean near-black outline, no gradients, no shadows, no glow, no texture. Colours only: #ff9a6b peach and #0a0b0d near-black. Centred, filling most of the frame, nothing touching the edges. No text, no letters, no logos, no watermark.",
  meta: { quality: "high", background: "transparent", format: "png" },
});
```

The dry run first showed the estimate; the operator approved it.

## 2. First check: it fails

The first output had a soft drop shadow despite "no shadows", and it was smaller than the print area needs. A stand-in
file with the same two problems (2048 × 2560 px, blurred shadow) gives this, run on 2026-10-12:

```text
$ node scripts/check-print-png.mjs studio-front-raw.png --width-in 12 --min-dpi 150
info  canvas                     2048 × 2560 px, 8-bit, colour type 6 (has alpha)
info  DPI tag in file            none (fine; pixels count)
 ok   canvas at 12 in wide       171 DPI (need ≥ 150)
info  artwork box                1866 × 1780 px at x 131, y 187 → prints about 10.93 × 10.43 in
 ok   transparent background     67.69% of pixels fully clear
FAIL  semi-transparent pixels    633527 (37.40% of the artwork) — soft glows, shadows or fades: DTG prints a white underbase under them; redesign or use --fix-alpha
...
1 check(s) failed on studio-front-raw.png: semi-transparent pixels
```

171 DPI passes Printful's floor, but 37% of the artwork is a semi-transparent shadow: on a white tee that prints as a
grey smudge with a white underbase. `--fix-alpha` would turn the shadow into a hard dark blob, so the shadow is removed
instead.

## 3. Fix, rebuild, check again

- Erased the shadow layer, kept the star; re-drew the outline as a clean 140 px stroke at full size.
- Upscaled to a 3600 × 4800 canvas ([../../image-editing-and-upscaling/SKILL.md](../../image-editing-and-upscaling/SKILL.md)),
  then set "studio" under the star in the editor.

```text
$ node scripts/check-print-png.mjs studio-front.png --width-in 12 --min-dpi 150
info  canvas                     3600 × 4800 px, 8-bit, colour type 6 (has alpha)
 ok   canvas at 12 in wide       300 DPI (need ≥ 150)
info  artwork box                3010 × 2862 px at x 295, y 319 → prints about 10.03 × 9.54 in
 ok   transparent background     81.07% of pixels fully clear
warn  semi-transparent pixels    37474 (1.15% of the artwork) — edge anti-aliasing only; usually fine, --fix-alpha makes edges crisp
all checks passed — still order a sample before selling
```

The remaining semi-transparent pixels are the anti-aliased edge. `--fix-alpha studio-front-hard.png` snapped them and
the re-check showed `semi-transparent pixels none`; at 100% zoom the curves were still smooth at 300 DPI, so the hard
version is the upload.

## 4. Mockups

| # | Kind | How | Label |
|---|---|---|---|
| 1 | Template | Printful's mockup generator, white tee, flat front | "mockup" |
| 2 | AI mockup | edit prompt from `templates/mockup-prompts.md` §2 on a blank tee photo the team shot | "AI-generated mockup" + `AI MOCKUP` corner tag |
| 3 | AI lifestyle | Claudia ID v2 block, white studio, tee tucked into the black patent pleated mini skirt, headset mic on, refs 01/02 + the print file | "AI-generated mockup" |
| 4 | Real photo | the sample, shot on grey paper in daylight when it arrived | none |

Mockup 2's first roll redrew the star with six points. Instead of re-rolling, the real print file was warped onto the
chest in an editor. Mockup 3 was rejected once for teenage drift (fixed by restating "28-year-old woman (adult)" and a
50 mm framing, per the character bible).

## 5. Sample and listing

- Sample ordered before the listing went live. The peach printed a little warmer than on screen; mockups 1–3 were
  re-tinted to match the sample photo.
- Listing disclosure line: `Images 1–3 are mockups (2 and 3 AI-generated). Image 4 is a photo of our printed sample.
  Made to order by our print partner.`
- Social post in her voice: `the studio tee exists. image 4 is the real one, the rest are mockups` with the AI label
  on and no "limited", "last chance" or price talk.

## What the operator approved

The print file (check output saved with the order), the four images with their labels, the listing text, and the
retail price. Nothing published before that sign-off.
