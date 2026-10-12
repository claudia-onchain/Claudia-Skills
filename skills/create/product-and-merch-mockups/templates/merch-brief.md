# Merch brief: <drop name>

One brief per drop. Fill it before generating anything; the print file and every mockup are checked against it.

## The drop

| Field | Value |
|---|---|
| Character / brand | <name> · bible: <link> · accent <#hex> |
| Why this drop exists | <series moment, launch, community milestone — one line> |
| Products | <e.g. tee (front only), sticker 3 in kiss-cut, 18×24 in poster> |
| Provider and product codes | <Printful / Printify / other> · <catalogue product, garment brand and colour> |
| Print method | <DTG / embroidery / sticker / poster> |
| Print area | <e.g. 12 × 16 in front, centred, 3 in below collar> |
| Target resolution | <e.g. 3600 × 4800 px at 300 DPI, or 4500 × 5400 px> |
| Garment colours | <white, black> — design must work on each, or make one file per colour |
| Price and margin | <retail> − <base cost> − <shipping/fees> = <margin> (no "limited" or scarcity claims you won't honour) |
| Sample ordered | <date, order number> |

## The design

- Concept (one sentence): <e.g. the peach star clip as a big flat graphic with the word "studio" under it>
- Elements: <star shape, one word in Barlow Condensed 800, nothing else>
- Colours (flat, ≤ 4 for DTG, fewer for embroidery): <#ff9a6b peach, #ece9e2 off-white, #0a0b0d near-black>
- Text on the product (exact, spelled out): "<text>"
- Font and licence: <font name> · <licence, e.g. SIL OFL>
- Must not include: logos, brand names, real people, other characters, price/return slogans, tiny text, gradients
  (DTG), glows or soft shadows.

## Files

| File | Size | Check |
|---|---|---|
| `out/<drop>-front.png` | <w × h px> | `node scripts/check-print-png.mjs out/<drop>-front.png --width-in <in> --min-dpi <dpi>` → <pass/fail> |
| `out/<drop>-sticker.png` | <w × h px> | <provider template, cut line, bleed> |
| `out/<drop>-poster.png` | <w × h px> | <ratio matches template> |

## Mockups

| # | Kind (template / AI / real photo) | Scene | Label | Approved |
|---|---|---|---|---|
| 1 | <template> | <flat lay, white tee, grey background> | "mockup" | <name> |
| 2 | <AI mockup> | <Claudia in the white studio wearing the tee> | "AI-generated mockup" | <name> |
| 3 | <real photo> | <sample on a plain background, daylight> | — | <name> |

## Listing copy

- Title: <product + design name, no keyword stuffing>
- First line: <what it is, print method, garment>
- Disclosure line: `Images 1–<n> are mockups (<which> AI-generated). Image <n> is a photo of our printed sample. Made to order by <provider>.`
- Care and sizing: from the provider's product page, not invented.

## Sign-off

- [ ] Print file passes the check at the product's real print width.
- [ ] Sample received and photographed; colours acceptable.
- [ ] Every mockup labelled; none shown as a real photo.
- [ ] No third-party IP, no price or return claims, adults only.
- Approved by: <name> · <date>
