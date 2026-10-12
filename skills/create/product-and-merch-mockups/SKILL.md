---
name: product-and-merch-mockups
description: Designs merch and product mockups with AI — tees, hoodies, stickers, posters and mugs for print-on-demand — from a flat transparent print file that passes the provider's specs (Printful and Printify sizes, DPI, no semi-transparency, checked 2026-10) to template, AI and lifestyle mockups, with a tested print-file checker and clear rules on labelling mockups versus real sample photos. Use when an AI character, creator or coin community wants merch, when preparing a print file, when making product mockups for a shop, listing or launch post, or when a print came out with boxes, halos or blur.
license: MIT
metadata:
  title: "Product and merch mockups"
  category: create
  summary: "Merch with AI: print files that pass POD specs, mockups that match the real product, and honest labels on every image."
  level: intermediate
  tags: "merch, mockups, print on demand, printful, printify, t-shirt design, stickers, dtg, ai disclosure"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "2–3 h per drop, plus sample shipping"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Product and merch mockups

Merch is the most physical thing an AI character sells, so it is where shortcuts show. This skill turns an idea into a
print file that the print-on-demand provider will print cleanly, then into mockups that look like the product people
will actually receive, each one labelled for what it is. It ends with a sample in hand and a listing that says which
images are mockups and which are photos.

## When to use this

- A character, creator or community wants a first merch drop: tees, hoodies, stickers, posters, mugs.
- Preparing or fixing a print file: wrong size, blurry print, grey box or halo around the design on a shirt.
- Making mockups for a shop listing, a launch post or a collab pitch.
- Checking an agent-made mockup before it goes on a product page.

Not for: fake "customer photos", reviews or unboxings (never), or merch using logos, celebrities or other creators'
characters.

## What you need

- A print-on-demand account (Printful, Printify or similar) and the exact catalogue product you'll sell. Its "File
  guidelines" tab or template is the final word on size and placement.
- `@useclaudia/media` or the `claudia` CLI with your own image keys (`claudia keys set openai|google|fal`). Transparent
  backgrounds need an OpenAI image model through the library (`meta.background: "transparent"`).
- An image editor for lettering, cleanup and placing the real design on mockups (Photoshop, Affinity, Photopea, GIMP).
- Node ≥ 20 for [scripts/check-print-png.mjs](scripts/check-print-png.mjs).
- The character bible if the character appears ([claudia-character-bible](../claudia-character-bible/SKILL.md)).
- Budget for a sample order before launch.
- Read [references/print-specs.md](references/print-specs.md) before exporting and
  [references/mockup-honesty.md](references/mockup-honesty.md) before publishing any mockup.

## Steps

1. **Write the merch brief.** Copy [templates/merch-brief.md](templates/merch-brief.md). Pick one to three products,
   the provider and exact catalogue item, the print method, the print area and the garment colours. List the exact text
   and font (with its licence), at most four flat colours for DTG, and the "must not include" list: logos, brand names,
   real people, other characters, price or return slogans on coin merch, glows and soft shadows.

2. **Generate the flat design, no text.** Make the artwork alone on a transparent background, flat shapes, thick
   outlines, filling the frame (prompts in [templates/mockup-prompts.md](templates/mockup-prompts.md) §1):

   ```ts
   await media.generate({ kind: "image", model: "openai/gpt-image-2.5-flare", aspect: "4:5", prompt: "<design prompt>",
     meta: { quality: "high", background: "transparent", format: "png" } });
   ```

   Price it first (`{ dryRun: true }` or `media.estimate()`). Add all lettering in the editor with the licensed font:
   models misspell, and reprints need the exact type.

3. **Size the print file to the product.** Pixels = inches × DPI. Printful: at least 150 DPI for most products, 300 for
   small items; standard tee front 12 × 16 in, 15 × 18 in on selected DTG products. Printify: 4500 × 5400 px at 300 DPI
   for a 15 × 18 in canvas, sRGB, PNG-24 (all checked 2026-10). Upscale properly if needed
   ([image-editing-and-upscaling](../image-editing-and-upscaling/SKILL.md)); a changed DPI tag adds nothing.

4. **Run the print-file check.** Fix every FAIL before uploading:

   ```sh
   node scripts/check-print-png.mjs out/front.png --width-in 12 --min-dpi 150      # Printful standard front
   node scripts/check-print-png.mjs out/front.png --width-in 15 --min-dpi 300      # Printify 4500 x 5400
   ```

   It reports the DPI at the print width, the artwork's printed size in inches, transparent background, and
   semi-transparent pixels. Glows and soft shadows fail: on DTG they print with a white underbase as a box or halo.
   Remove them in the design. A thin anti-aliased edge only warns; `--fix-alpha out.png` snaps it crisp. Exit `0` =
   pass, `3` = a check failed.

5. **Upload, place and order a sample.** Upload the checked PNG, match the template's placement, and preview on every
   garment colour you sell (dark parts vanish on black, white parts on white). Order one sample of each product before
   the listing goes live. Bright pinks and neons often print duller than on screen.

6. **Make the mockups.** Three kinds, each labelled (prompts in [templates/mockup-prompts.md](templates/mockup-prompts.md)):
   - **Template:** the provider's mockup generator or a smart-object template. Exact and fast.
   - **AI edit:** your blank-product photo plus the print file as references:
     `claudia generate image "<edit prompt>" --model openai/gpt-image-2.5-sunburst --ref refs/blank-tee.jpg,out/front.png --aspect 4:5 --dry-run`.
   - **AI lifestyle:** the character wearing it, with the full identity block and refs (Claudia: all five anchors,
     "28-year-old woman (adult)", silver metal, no tattoos).

   If a model redraws the design, paste the real print file over it in the editor rather than re-rolling.

7. **Check every mockup against the product.** Same garment and cut, same print method (no fake embroidery or foil),
   same size and placement, colours matched to the sample, design pixel-identical to the print file, no extra logos,
   adult models only. Then label: alt text `AI-generated mockup: …`, a small `AI MOCKUP` tag on AI images, and a listing
   line saying which images are mockups. Never call a mockup a photo. Full rules in
   [references/mockup-honesty.md](references/mockup-honesty.md).

8. **Shoot the sample, then publish.** Photograph the sample on a plain background in daylight and put it
   first or second in the gallery. Disclose AI use where the marketplace asks (Etsy's Creativity Standards ask for it in
   the listing, checked 2026-10) and name the production partner where asked. Social posts carry the platform AI label,
   `#ad` if a creator was paid or gifted, and no price, scarcity or return claims. A person signs off the print file,
   images, listing and price before anything goes live.

## Templates

- [templates/merch-brief.md](templates/merch-brief.md) — the drop brief: products, specs, design rules, files, mockup
  plan, listing disclosure and sign-off.
- [templates/mockup-prompts.md](templates/mockup-prompts.md) — prompts and calls for flat designs, sticker and
  embroidery variants, edit mockups, lifestyle mockups and flat lays, plus labels to paste.
- [scripts/check-print-png.mjs](scripts/check-print-png.mjs) — print-file pre-flight with an optional alpha fix.
- [examples/claudia-studio-tee.md](examples/claudia-studio-tee.md) — a full drop: failed check, fix, mockups, sample.

Listing disclosure line:

```text
Images <1–n> are mockups (<which> AI-generated). Image <n> is a photo of our printed sample. Made to order by <provider>.
```

## Check before you finish

- [ ] The print file passes `check-print-png.mjs` at the product's real print width and DPI.
- [ ] No soft shadows, glows or fades on DTG; artwork works on every garment colour sold.
- [ ] Lettering set in a licensed font and spelled right; no model-drawn text on the product.
- [ ] No logos, brand names, real people, other characters, lyrics, or price and return slogans.
- [ ] A sample was ordered (and photographed before or at launch).
- [ ] Every mockup matches the product and carries its label; nothing generated is called a photo.
- [ ] Marketplace AI and production-partner disclosures filled in; AI label on social posts; `#ad` where paid.
- [ ] A person approved files, images, listing and price before publishing.

## Pitfalls

- **The grey box on a dark tee.** A faint background or soft shadow left in the PNG prints with an underbase. Check
  for semi-transparency, don't eyeball it.
- **Upscaling by changing the DPI tag.** 1024 px tagged 300 DPI is still a 3.4 in print.
- **Mockups that sell a better product.** Puff-print texture, embroidery stitching or a heavier fabric that the
  product doesn't have leads to returns and complaints.
- **AI redrawing the design.** Edit models "improve" logos and stars. Compare the chest print to the file at 100%.
- **Text by the model.** One wrong letter on 50 shirts is expensive. Letter it yourself.
- **Neon expectations.** Screen colours aren't print colours. The sample is the truth; re-tint mockups to it.
- **Coin merch slogans.** "To the moon" and "100x" are price promises; a ticker and the character are enough.
- **Teenage drift on lifestyle mockups.** State the adult age and use 35–50 mm framing.

## Related skills

- [image-editing-and-upscaling](../image-editing-and-upscaling/SKILL.md) — cleanup and upscaling to print size.
- [image-prompting-fundamentals](../image-prompting-fundamentals/SKILL.md) — prompt structure for clean flat graphics.
- [character-consistency](../character-consistency/SKILL.md) — keeping the character on-model in lifestyle mockups.
- [sticker-and-emoji-packs](../sticker-and-emoji-packs/SKILL.md) — the same artwork as digital stickers.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels and content credentials.
- [monetization-streams](../../grow/monetization-streams/SKILL.md) — where merch fits among income streams.
