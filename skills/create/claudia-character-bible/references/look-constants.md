# Claudia look constants and drift tolerances

Read this when reviewing a generation or writing a detailed prompt. Each feature has: the canonical description, the
words that reliably produce it, what drift looks like, and whether a drifted output is a **reject**, **fix in edit**, or
**accept**.

Derived from the owner's reference set (the `studio` clip, the official portrait, the silver-foil banner and collages,
and the full-length editorials).

## Face

| Feature | Canonical | Prompt words | Drift looks like | Verdict |
|---|---|---|---|---|
| Age | 28, reads 26–30 | "28-year-old woman (adult, late twenties)" | rounder cheeks, larger eyes, smaller jaw, braces, school setting | **reject** anything under ~24 |
| Face shape | soft oval, defined cheekbones, small pointed chin | "soft oval face, defined cheekbones" | square jaw, very round baby face | reject if round + young |
| Eyes | grey-green, almond, slightly hooded lids | "grey-green almond eyes" | dark brown or bright blue eyes | **reject** (identity break) |
| Brows | straight, dark, medium thickness | "straight dark brows" | arched glam brows, bleached | fix in edit if mild |
| Freckles | light dusting over nose and upper cheeks | "light freckles across the nose and cheeks" | none (ok in hard flash), heavy full-face freckles | accept none in flash; reject heavy |
| Expression | a cool, direct gaze; in talking clips an open laugh with visible top teeth | "cool, direct gaze" / "laughing openly" | wide toothy grin in portraits, duck face | accept laugh in clips only |
| Lips | glossy coral, natural shape | "glossy coral lips" | matte red, overlined | fix in edit |
| Skin | natural texture, visible pores, fair tone with a dewy sheen | "natural skin texture with visible pores, dewy" | plastic, airbrushed, waxy | **reject** for photoreal |
| Makeup | minimal; a little shimmer under the eyes is fine | "minimal makeup" | heavy contour, lashes, glitter | fix or reject |

## Hair (the most recognisable part)

| Feature | Canonical | Prompt words | Drift | Verdict |
|---|---|---|---|---|
| Length | jaw-length, ends at the jawline | "jaw-length bob" | shoulder length, pixie | reject shoulder-length |
| Cut | blunt bob, slight inward curve, a little piecey and tousled in flash shots | "blunt bob" | layered shag, wolf cut | reject |
| Bangs | heavy, straight, blunt, at or just above the brows | "heavy straight blunt bangs" | curtain/side-swept bangs, no bangs | **reject** no bangs; fix mild sweep |
| Base colour | glossy jet-black, blue-black sheen in cool light | "glossy jet-black" | brown, dark auburn | reject brown |
| Peach streak | one chunky peach-orange panel through the front bangs on one side | "one peach-orange streak panel through the front bangs; the rest jet-black" | full orange hair, many thin highlights, streaks on both sides, pink/purple | **reject** full orange; fix extra streak by inpaint |
| Star clip | one small peach star-shaped clip, flat, at the side of the bob | "a small peach star-shaped hair clip" | missing, several clips, other colour or shape | accept missing in wide shots; fix colour |

## Accessories

| Feature | Canonical | Drift | Verdict |
|---|---|---|---|
| Headset mic | thin headset microphone curving along the cheek, skin-tone or black, small round tip | earbuds, a handheld mic, missing | fix in edit; it is a signature |
| Visor / goggles | orange shield visor or orange goggles; tiny orange oval sunglasses with the Holo look | other colours, aviators | fix or regenerate |
| Jewellery | silver only: a crystal choker with Silver night, silver hoops with the cobalt trench | gold | fix in edit |
| Tattoos | none visible | any tattoo | fix in edit |

Mirror selfies and front-camera clips flip left and right. Do not reject a generation because the streak or the clip is
on the "other" side — reject only when there are streaks on both sides or none.

## Wardrobe specifics

- **Signature top:** white glossy vinyl, very large crinkled puffed sleeves, high ruched turtleneck, long fitted cuffs.
- **Studio:** cropped white cotton shirt with puffed short sleeves and a collar, a small star pin, black patent pleated
  mini skirt, long black patent opera gloves.
- **Silver night:** liquid-silver bias column gown with a ruched bodice, white faux-fur stole worn low on the arms,
  wide crystal choker.
- **Holo:** holographic high-neck mini dress with wide pleated bell sleeves, knee-high white patent platform boots.
- **Sculpture:** white patent shell dress built from curved panels with clear bubble windows, white platform boots.
- **Patent:** green patent blazer over a white satin slip, or a cobalt patent trench over white satin trousers.
- **Sky:** floor-length cloud-print halter gown, mint satin halter band, train on the floor.

## Camera habits that read as "her feed"

- Editorial: 35–85 mm, eye level or slightly low, full length or three-quarter, on-camera flash or soft studio daylight.
- Close-ups: 50–85 mm, hard flash on silver foil, eyes to lens, hand at the collar.
- Talking clips: locked-off camera, eye level, mid-thigh up, 9:16, no camera move.
- Banners and collages: silver foil, a centre close-up, taped polaroids, chrome stars and a script wordmark added in edit.

## Drift scoring (for agents doing QA)

Score each of the five anchors 0/1 (hair cut + bangs, peach streak, star clip, headset mic, face/age). Add 1 for
wardrobe-on-look and 1 for no artifacts (hands, text, extra limbs).

- 7/7 publish · 6/7 publish if the miss is the clip or the mic · 5/7 fix in edit · ≤ 4 regenerate.
- **Any age doubt = regenerate**, whatever the score.
