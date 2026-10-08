# Text, fonts and logos on banners

Read this before putting any wordmark, label or logo on a banner. Not legal advice; when a brand or a campaign is
involved, check the specific guidelines.

## Why text goes in after generation

Image models can render short quoted text (GPT Image 2.5 is the most reliable; checked 2026-10), but a banner is reused
for months: a misspelt or slightly warped letter is permanent. Generate the image clean ("no text"), then add text as a
vector/PNG layer. Exception: in-world labels that are part of the scene ("MCP", "API" on glass tags) can be generated
with GPT Image 2.5 and checked letter by letter; replace them in the edit if any letter is off.

## Wordmark recipes (all fonts from Google Fonts)

| Banner | Font (licence) | Settings | Extras |
|---|---|---|---|
| Sunset bed | Playfair Display 400 (SIL OFL) | all caps, tracking +120, off-white `#ece9e2`, 7–9 % of banner height | thin rose `#ff6fa5` arc over the word, a four-point sparkle at the start |
| Collage | Caveat 600 (SIL OFL) | title case or caps, slight upward slant, off-white | rose underline brush stroke, small sparkle |
| Network / tech | Barlow Condensed 800 (SIL OFL) | caps, tracking −1, off-white | DM Mono 500 (SIL OFL) labels, 12–14 px equivalent |
| Body copy on banners | DM Sans (SIL OFL) | | |

The SIL Open Font License allows commercial use, embedding and modification, but not selling the font by itself. Check
the licence shown on each family's Google Fonts page (a few families are Apache 2.0 — also fine) and keep a copy of the
licence with the design file. Don't use fonts ripped from download sites with unclear licences, and don't recreate a
commercial font by tracing it.

## Building the PNG

- Figma / Affinity / Inkscape / Photopea: canvas the size of the banner (3000×1000), type the wordmark, export only the
  text layer as a transparent PNG at 1× and 2×.
- Shadows: a very soft dark glow (black 30 %, blur 24) keeps off-white text readable on bright sunsets.
- Placement: left third for the sunset banner, right-centre for the collage; vertically at 45–50 % height.

Overlay:

```sh
ffmpeg -i master-3x1.jpg -i wordmark.png -filter_complex "[1]scale=840:-1[w];[0][w]overlay=180:(H-h)/2" -q:v 3 out.jpg
```

(`drawtext` would need an ffmpeg built with libfreetype; the overlay route works on every build.)

## Platform and chain logos (trademarks)

The X, Instagram, TikTok, YouTube, Discord, Telegram, LinkedIn, Reddit, Solana, Ethereum and other marks belong to their
owners. Practical rules that keep a banner within typical brand guidelines:

1. **Never generate them.** A model-drawn logo is an altered logo, which most guidelines forbid. Generate blank badges.
2. **Use the official files** from each brand's own kit (for example the X brand toolkit at about.x.com, TikTok's
   developer logo pack, Meta brand resources for Instagram, YouTube brand resources, Solana's brand assets page).
3. **Don't alter them:** no recolouring outside the allowed variants (usually black, white, or full colour), no
   stretching, no effects, keep the minimum size and clear space.
4. **Meaning:** use them to say "find me on" or "works with". Never imply partnership, sponsorship or endorsement.
5. **Chains:** list Solana first, then the others in the order the product actually supports them.
6. Keep a `logo-sources.md` next to the design noting where each file came from.

## Alt text

Every banner gets alt text that names it as AI-generated, e.g. "AI-generated banner: Claudia lying on a bed at sunset
with the New York skyline behind her, 'CLAUDIA' written in a serif font on the left."
