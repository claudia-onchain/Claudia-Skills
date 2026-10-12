---
name: fashion-lookbooks
description: 'Builds outfit posts and lookbook sets for Claudia or a custom AI character — locks each look in words and a garment reference, plans a pose list, writes per-model prompts (Nano Banana, GPT Image 2.5, FLUX.2, Seedream, Kontext) with @useclaudia/media, holds the wardrobe identical across poses, and handles credits for real brands, #ad and AI disclosure. Use when someone wants a lookbook, an outfit post, an OOTD set, a fashion carousel, a styled shoot, a "get the look" post, or a brand asks to show its clothes on an AI character.'
license: MIT
metadata:
  title: "Fashion lookbooks"
  category: "create"
  summary: "Outfit and lookbook sets that keep the same clothes in every pose: look locks, garment refs, poses, prompts, honest credits."
  level: "intermediate"
  tags: "fashion, lookbook, outfits, wardrobe consistency, poses, prompts, brand credits, ad disclosure, ai label"
  uses: "@useclaudia/media, @useclaudia/social, @useclaudia/cli"
  time: "2–3 hours per 4-look lookbook"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Fashion lookbooks

A lookbook only works if the clothes are the same in every frame: same neckline, same hem, same three rows of crystals.
Image models drift on garments even more than on faces. This skill locks each look in words and in a garment reference
image, plans the poses that show it from every side, writes the prompts each model understands, fixes drift with
targeted edits, and finishes with credits that are true: fictional wardrobe says so, real brands appear only with
permission and accurate renders, and everything is labelled AI-generated where people actually read.

## When to use this

- An outfit post or a 3–6 look lookbook for Claudia or another AI character.
- A recurring "look of the week" series.
- A brand offers to send product, or pays, to have its clothes shown on the character.
- A new character needs a wardrobe that stays consistent across months of posts.

Not for: creating a digital replica of a real model or creator (that needs that person's written consent and a
different process), or swimwear, lingerie or anything sexualised (the characters are adults, and lookbooks here stay
editorial).

## What you need

- The character's bible and ref pack. Claudia: identity block v2, wardrobe table and worlds in
  [claudia-character-bible](../claudia-character-bible/SKILL.md), refs from
  [character-consistency](../character-consistency/SKILL.md) (`01-front-neutral.jpg`, `07-full-body.jpg`, …).
- A custom character: its own bible built from the template, passing the distinctness test (at least 4 of 5 anchors
  changed), stated as an adult, invented from scratch (never "looks like" a real person).
- `@useclaudia/cli` with image keys: `google` (Nano Banana 2.1), `openai` (GPT Image 2.5), `fal` (FLUX.2, Kontext),
  optionally `byteplus` (Seedream). Spend caps set.
- For real products: the brand's product photos and its written permission to render them.
- [references/model-dialects.md](references/model-dialects.md),
  [references/credits-and-disclosure.md](references/credits-and-disclosure.md), and
  [templates/pose-list.md](templates/pose-list.md).

## Steps

1. **Choose the character and the looks.** Fill [templates/lookbook-brief.yaml](templates/lookbook-brief.yaml). For
   Claudia, pick 3–6 looks from her wardrobe (Signature, Studio, Silver night, Holo, Sculpture, Patent, Sky, Club) and
   keep the house rules: headset mic with every look, visors and goggles orange, metal silver, no visible tattoos. For a
   custom character, its own wardrobe palette and accent (not Claudia's rose). One world and one light setup for the
   whole lookbook, so the clothes are the only thing changing.

2. **Lock each look in words.** Write a look lock like the identity block: every garment with silhouette, length,
   neckline, sleeves, fabric, finish and colour; accessories with counts and metal; shoes; one rule. Version it:

   ```text
   [LOOK silver-night v1] a liquid-silver column gown, floor length, high round neck, long fitted sleeves, fluid
   satin-metal fabric that catches light in soft vertical ripples; a white faux-fur stole draped over both elbows; a
   crystal choker, three rows of small round crystals; strappy silver heels with thin ankle straps. Metal is silver,
   never gold.
   ```

   Add HEX values for FLUX.2 (`#c9ccd3 gown`, `#ece9e2 stole`). Vague locks ("a silver dress") are where drift starts.

3. **Make a garment ref for each look.** Generate the outfit with no person first, as a flat lay. It becomes the ref
   that every pose is checked and generated against:

   ```sh
   claudia generate image "[LOOK silver-night v1] … The full outfit laid flat on seamless pale grey paper, top-down, even soft light, every piece visible and not overlapping, no person, no mannequin. No text, no logos. Vertical 2:3 frame." \
     --model fal/flux-2-pro --aspect 2:3 --max-usd 0.08 --dry-run
   ```

   Run without `--dry-run`, check it against the lock, and save it as `looks/silver-night/flat.jpg`. Real product: use
   the brand's own product photo instead, only with its written OK on file.

4. **Plan the poses.** From [templates/pose-list.md](templates/pose-list.md), give each look at least `front-full`,
   `back-over-shoulder` or `profile`, one `detail-*` and a `portrait`; add `walk` or `movement` for anything that
   moves. 4–6 frames a look. Write the matrix into the brief. Poses stay editorial: no suggestive framing or wording.

5. **Generate the hero frame per look.** Identity refs plus the garment ref, the identity block, the look lock, the
   pose phrase, the set and the grade. Read [references/model-dialects.md](references/model-dialects.md) for each
   model's wording:

   ```sh
   claudia generate image "[CLAUDIA ID v2] … She wears [LOOK silver-night v1] …, matching the outfit in the last reference image exactly. Full-length shot, a three-quarter turn toward camera left, one hand lifting the edge of the white stole, a cool direct gaze. A deep cobalt-blue paper backdrop and matching carpet, direct on-camera flash, crisp shadow to the right. 50mm lens at chest height. Cool clean grade, lifted blacks, gentle film grain, chrome highlights. No text, no readable logos. Vertical 2:3 frame." \
     --model google/nano-banana-2.1 --aspect 2:3 --resolution 2K \
     --ref refs/claudia/01-front-neutral.jpg,refs/claudia/07-full-body.jpg,looks/silver-night/flat.jpg --max-usd 0.10
   ```

   Review against the lock and the bible: neckline, sleeves, hem, fabric, accessory counts, metal colour; five anchors;
   reads as a woman in her late twenties; hands and straps make sense. Iterate one variable at a time until one frame is
   right. That frame is the look's hero.

6. **Hold the wardrobe across poses.** Make the other poses from the hero, not from scratch:

   ```sh
   # pose change, everything else kept (precise edits)
   claudia generate image "Edit image 1. Change only her pose: she walks toward the camera mid-stride, the stole sliding off one shoulder. Keep exactly the same: her face, hair, peach streak, star clip, headset mic, freckles; the gown's neckline, sleeves, length and fabric; the stole; the three-row crystal choker; the heels; the cobalt set and the flash. Do not add text, logos, jewellery or people." \
     --model openai/gpt-image-2.5-sunburst --ref work/silver-night/hero.png --max-usd 0.05
   # one item wrong in an otherwise good frame
   claudia generate image "Make the choker three rows of small round crystals; keep everything else in the image exactly the same." \
     --model fal/flux-kontext-pro --ref work/silver-night/walk-02.png --max-usd 0.05
   ```

   For 4+ poses that must match closely in one go, test `byteplus/seedream-4.5` with the numbered set prompt from the
   reference. Put each frame next to the flat lay before keeping it. Budget: a 4-look, 20-frame lookbook with retries
   usually lands at $1.50–3.00 at list prices (checked 2026-10); set `--max-usd` on every run.

7. **Credit and disclose.** Read [references/credits-and-disclosure.md](references/credits-and-disclosure.md).
   - Fictional looks: `wardrobe: Claudia's own, AI-designed, not for sale`.
   - Real products, with permission and an accurate render: `wearing: <Brand> <item> · gifted · AI-generated image; the
     real item may differ`, plus `#ad` and the paid-partnership toggle if paid, gifted or affiliate (`labels.ad: true`).
   - Never credit a real brand on a garment it didn't make, never generate logos, never make fit or quality claims from
     a generated body.
   - "AI-generated" goes where people read: the small tag on images, the first line of the credits, the platform label.
     A footnote isn't enough.

8. **Assemble and publish.** Build the lookbook as a carousel with the lookbook spine in
   [carousel-design](../carousel-design/SKILL.md) (cover → per look: front, back, detail, movement → 2×2 of all looks
   with credits), at 4:5 for Instagram and 9:16 for TikTok photo mode, and a PDF for brand pitches
   ([media-kit-and-pitching](../../grow/media-kit-and-pitching/SKILL.md)). Alt text per frame: `AI-generated image:
   Claudia in a liquid-silver column gown and white faux-fur stole, walking toward the camera on a cobalt set.` Publish
   through `@useclaudia/social` with `labels: { ai: true, ad: <true if paid or gifted> }` after a person approves; TikTok
   photo posts are uploaded in the app with "AI-generated content" on.

9. **Archive the looks.** Save each lock, flat lay, hero frame, prompts, models and refs in the prompt library
   ([prompt-library-management](../prompt-library-management/SKILL.md)) under `looks/<id>/`, with the `.json` provenance
   sidecars. Next time the look appears, start from the hero and the lock, not from memory. Bump the lock version
   (`v2`) if a detail changes on purpose.

## Templates

- [templates/lookbook-brief.yaml](templates/lookbook-brief.yaml) — character, set, look locks, garment refs, credits, pose matrix, models, budget.
- [templates/pose-list.md](templates/pose-list.md) — twelve poses with prompt phrases, framing, lens and what each shows.
- [examples/silver-night-lookbook.md](examples/silver-night-lookbook.md) — a four-look Claudia lookbook, including one gifted real product.

Look lock skeleton:

```text
[LOOK <id> v<n>] <garment: silhouette, length, neckline, sleeves, fabric, finish, colour>; <garment 2>; <accessories
with counts and metal>; <shoes>. <one rule>.
```

## Check before you finish

- [ ] Every look has a lock and a garment ref; every frame was compared against both.
- [ ] Garments match across poses: neckline, sleeves, hem, fabric, colour, accessory counts, metal.
- [ ] The character is on-model in every frame and reads as an adult; poses are editorial, nothing sexualised.
- [ ] No generated logos; no real brand credited on a garment it didn't make; real products rendered accurately with
      permission on file.
- [ ] Credits say fictional or real truthfully; `#ad` and the paid-partnership label on anything paid, gifted or affiliate.
- [ ] "AI-generated" on the images, in the credits and as the platform label; alt text on every frame.
- [ ] Spend under the brief's budget; a person approved before publishing.

## Pitfalls

- **Vague looks.** "A silver dress" becomes five different dresses. Lock silhouette, length, neckline and fabric.
- **Regenerating each pose from scratch.** Drift compounds. Edit from the approved hero with a keep-list.
- **Gold creep.** Models love gold jewellery. Write "metal is silver, never gold" into the lock, and check every frame.
- **Accessory counts.** Three rows become two, one choker becomes two necklaces. Count in review.
- **The brand kit's style line on flat lays.** It describes her, so she appears in the flat lay. Leave `brand` off for
  garment-only frames.
- **Fake credits.** Naming a luxury house on a generated gown is a false product claim. Fictional wardrobe says so.
- **Small-print disclosure.** A footnote reads as hiding it. Label where people look.
- **Custom character that's a real model in disguise.** Never prompt "looks like" anyone or use their photos as refs.

## Related skills

- [claudia-character-bible](../claudia-character-bible/SKILL.md) — her wardrobe, worlds and the distinct-character template.
- [character-consistency](../character-consistency/SKILL.md) — ref packs and drift checks for the face.
- [photoreal-portrait-prompts](../photoreal-portrait-prompts/SKILL.md) — lenses, light and skin for the hero frames.
- [carousel-design](../carousel-design/SKILL.md) — assembling and exporting the lookbook.
- [brand-deals-and-sponsorships](../../grow/brand-deals-and-sponsorships/SKILL.md) — gifted and paid deals, contracts and `#ad`.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels and provenance.
