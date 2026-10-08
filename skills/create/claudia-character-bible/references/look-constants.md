# Claudia look constants and drift tolerances

Read this when reviewing a generation or writing a detailed prompt. Each feature has: the canonical description, the
words that reliably produce it, what drift looks like, and whether a drifted output is a **reject**, **fix in edit**, or
**accept**.

Derived from the owner's reference set (stills and frames from `room`, `club`, `lounge`, `rain` clips, the three 3:1
banners and the blue studio portrait).

## Face

| Feature | Canonical | Prompt words | Drift looks like | Verdict |
|---|---|---|---|---|
| Age | 28, reads 26–30 | "28-year-old woman (adult, late twenties)" | rounder cheeks, larger eyes, smaller jaw, braces, school setting | **reject** anything under ~24 |
| Face shape | soft oval, defined cheekbones, small pointed chin | "soft oval face, defined cheekbones" | square jaw, very round baby face | reject if round + young |
| Eyes | warm brown, almond, slightly hooded lids | "warm brown almond eyes" | green/blue/grey eyes | **reject** (identity break) |
| Brows | straight, dark, medium thickness | "straight dark brows" | arched glam brows, bleached | fix in edit if mild |
| Freckles | light dusting over nose and upper cheeks | "light freckles across the nose and cheeks" | none (ok in low light), heavy full-face freckles | accept none at night; reject heavy |
| Smile | closed-lip knowing half-smile; in UGC an open laugh with visible top teeth | "knowing closed-lip half-smile" / "laughing openly" | wide toothy grin in portraits, pout, duck face | accept laugh in UGC only |
| Lips | soft rose tint, natural | "soft rose lip tint" | glossy red, overlined | fix in edit |
| Skin | natural texture, visible pores, light warm tone | "natural skin texture with visible pores" | plastic, airbrushed, waxy | **reject** for photoreal |
| Makeup | minimal; thin liner optional | "minimal makeup" | heavy contour, lashes, glitter | fix or reject |

## Hair (the most recognisable part)

| Feature | Canonical | Prompt words | Drift | Verdict |
|---|---|---|---|---|
| Length | jaw-length, ends just below the jawline | "jaw-length bob" | shoulder length, pixie | reject shoulder-length |
| Cut | blunt bob, slight inward curve, a little piecey at the ends | "blunt bob, ends slightly flicked" | layered shag, wolf cut | reject |
| Bangs | heavy, straight, blunt, stop just above the brows | "heavy straight blunt bangs just above the brows" | curtain/side-swept bangs, no bangs | **reject** no bangs; fix mild sweep |
| Base colour | glossy jet-black, blue-black sheen in cool light | "glossy jet-black" | brown, dark auburn | reject brown |
| Copper panels | 2 chunky panels: one through the front bangs (left of centre in a mirror selfie), one through one side section | "vivid copper-orange streak panels through the front bangs and one side; the rest jet-black" | full red hair, many thin highlights, streaks on both sides, pink/purple | **reject** full red; fix extra streak by inpaint |
| Clip | one small orange (tangerine) clip, flat or claw-style, at the edge of the copper panel | "a small orange hair clip at the side of the bangs" | missing, multiple clips, other colour | accept missing in wide shots; fix colour |

## Accessories

| Feature | Canonical | Drift | Verdict |
|---|---|---|---|
| Earrings | small thin gold hoops, ~2 cm | big door-knocker hoops, silver studs | fix in edit |
| Necklace | star pendant on a fine silver chain + a silver curb chain, layered | gold, no pendant, cross or other symbol | fix (pendant is a signature) |
| Bracelet | chunky silver chain-link bracelet, sometimes beaded bracelets stacked | none | accept |
| Sunglasses | oversized black oval or soft cat-eye, dark lenses | aviators, coloured lenses | fix or regenerate |
| Tattoos | fine-line black: a small star on a shoulder, roses/sun/script along one forearm and upper arm, small motifs on the stomach above the skirt | full sleeves, colour tattoos, face tattoos | reject face tattoos; accept placement variance |

Mirror selfies and front-camera clips flip left and right. Do not reject a generation because the copper panel or the
clip is on the "other" side — reject only when there are two panels on both sides or none.

## Wardrobe specifics

- **Olive crop cami:** fine knit, thin straps, scalloped neckline edged in copper-orange yarn, 3–5 orange embroidered
  outline stars scattered on the front, cropped above the navel.
- **Tartan mini:** red-dominant tartan with green and black lines, pleated, low-rise, studded black leather belt with a
  big buckle, one or two silver chains looping at the hip.
- **Black knit jumper:** oversized, ribbed cuffs, slightly fuzzy (mohair-ish), sleeves pulled over the hands.
- **Green blazer:** soft lime-olive, notched lapel, unstructured.

## Camera habits that read as "her feed"

- UGC: front-camera phone look, 24–26 mm equivalent, eye level or slightly above, natural mixed light, slight handheld
  shake, auto-exposure breathing, 9:16.
- Portraits: 50–85 mm, f/1.8–2.8, eye-level, shallow depth of field, warm key from a window or lamp.
- Banners: 35 mm, low and close, her face in the centre third, head resting on folded arms, eyes to lens.

## Drift scoring (for agents doing QA)

Score each of the five anchors 0/1 (hair cut + bangs, copper panels, clip, hoops, face/age). Add 1 for wardrobe-on-look
and 1 for no artifacts (hands, text, extra limbs).

- 7/7 publish · 6/7 publish if the miss is the clip or hoops · 5/7 fix in edit · ≤ 4 regenerate.
- **Any age doubt = regenerate**, whatever the score.
