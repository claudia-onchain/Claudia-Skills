# Print-on-demand file specs (checked 2026-10)

Read this before you export a print file (step 3 of the skill). Specs differ per product and change; the product's own
**File guidelines** tab or template on the provider's site always wins over this page. Numbers below were read on the
providers' own pages in October 2026.

## The two most-used providers

| | Printful | Printify |
|---|---|---|
| Format | PNG recommended; JPG accepted but not recommended; PDF accepted for some products | PNG-24 with transparency |
| Resolution | at least 150 DPI at print size for most products; 300 DPI for small items such as mugs and phone cases | 300 DPI at print size |
| Standard tee front | 12 × 16 in print area; 15 × 18 in on selected DTG products and sizes | 15 × 18 in canvas = **4500 × 5400 px** at 300 DPI |
| Background | transparent; avoid background shapes unless they are part of the design (on dark garments a background prints as a box) | 100% transparent background |
| Semi-transparency | not recommended for DTG: the white underbase shows through | zero semi-transparent pixels |
| Colour | follow the product guideline | sRGB |
| Templates | download from the product's "File guidelines" tab | File Quality Checker shows green at 300 DPI+ |
| Mug (Printful 11 oz) | 9 × 3.5 in print area | — |

Sources: printful.com/blog/everything-you-need-to-know-to-prepare-the-perfect-printfile (Printful's print file guide)
and printify.com/knowledge-hub/png-file-setup-for-tshirts. Both say to check the specific product before uploading and
to order a sample before you sell.

## Pixels you need

| Print width | 150 DPI | 300 DPI |
|---|---|---|
| 3 in sticker | 450 px | 900 px |
| 4 in sticker | 600 px | 1200 px |
| 12 in tee front | 1800 px | 3600 px |
| 15 in tee front | 2250 px | 4500 px |
| 18 × 24 in poster | 2700 × 3600 px | 5400 × 7200 px |

Pixels = inches × DPI. Changing the DPI tag in the file adds no detail: if the pixels aren't there, upscale properly
first ([../../image-editing-and-upscaling/SKILL.md](../../image-editing-and-upscaling/SKILL.md)) and check the result
at 100% zoom.

Generate at the largest size the model offers (Nano Banana `resolution: "4K"`, or a GPT Image `"WxH"` size within the
model's limits) and measure what came back with the script below; don't assume. Most outputs need trimming and
upscaling to reach a 4500 px wide canvas, so compose the artwork to fill the frame with little empty space.

## By print method

**DTG (direct to garment) tees and hoodies**
- Transparent PNG, hard edges. Soft shadows, glows, feathered edges and low-opacity textures print with a white
  underbase behind them and look like a faint box or halo, especially on dark shirts.
- Thin lines and tiny text break up on fabric. Keep strokes visibly thick at print size and text large enough to read
  from a metre away.
- Very bright pinks, neons and saturated blues often print duller than on screen. Order a sample of the exact colour on
  the exact garment colour.
- On dark garments, near-black parts of the design disappear; on white garments, white parts disappear (they are not
  printed at all).

**Embroidery (caps, chest logos)**
- Few flat colours, no gradients, no photos, no fine detail. Simplify the design into shapes. The provider's embroidery
  guideline lists its own thread colours and minimum sizes; follow it exactly.

**Stickers (kiss-cut, die-cut)**
- The provider's template sets the size, the cut line and the bleed. Keep important parts inside the safe line and
  give the design a solid outline (a white or brand-colour border reads well and cuts cleanly).

**Posters and prints**
- Full-bleed artwork in the template's exact ratio, with the provider's bleed. No transparency needed. Check the ratio
  first: an 18 × 24 in poster is 3:4, not 9:16.

## Checking a file

```sh
node scripts/check-print-png.mjs out/tee-front.png --width-in 12 --min-dpi 150     # Printful standard front
node scripts/check-print-png.mjs out/tee-front.png --width-in 15 --min-dpi 300     # Printify 4500 x 5400 canvas
node scripts/check-print-png.mjs out/tee-front.png --width-in 15 --min-dpi 300 --fix-alpha out/tee-front-hard.png
```

The script reports canvas DPI at the print width, the artwork's bounding box in inches, how much of the background is
clear, and semi-transparent pixels (a thin ring of anti-aliased edges is a warning; glows and fades fail). `--fix-alpha`
snaps every semi-transparent pixel to clear or opaque and tags the file sRGB; look at the result, since curves can show
stair-steps.

## Rights and content

- Print only what you own or license: your own character, your own words, licensed fonts (check the font licence covers
  merchandise; SIL OFL fonts do), and AI outputs you are allowed to use commercially under the provider's terms.
- No logos, team names, brand names, celebrity likenesses, other creators' characters or song lyrics. Providers and
  marketplaces remove infringing products whether or not AI made them.
- Coin merch: the name and ticker are fine as branding; no price claims, "100x", "to the moon" or "buy" slogans. See
  [../../../grow/crypto-marketing-compliance/SKILL.md](../../../grow/crypto-marketing-compliance/SKILL.md).
