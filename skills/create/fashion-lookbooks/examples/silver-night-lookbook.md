# Example: "silver night", a four-look Claudia lookbook

Four looks, 19 frames, one cobalt studio set. Three looks are Claudia's own fictional wardrobe; one includes a gifted
real product from "Lumen Atelier" (a fictional brand name used for this example). Budget cap: $3.00.

## 1. Looks and set

| id | Look (from the bible) | Kind | Credit |
|---|---|---|---|
| silver-night | liquid-silver column gown, white faux-fur stole, crystal choker, strappy silver heels | fictional | wardrobe: Claudia's own, AI-designed, not for sale |
| holo | holographic bell-sleeve mini dress, white patent platform boots, tiny orange oval sunglasses | fictional | same |
| sculpture | sculptural white patent shell dress with clear bubble windows, white platform boots | fictional | same |
| holo + bag | the holo look with Lumen Atelier's silver mini bag | real product, gifted, written OK on file | wearing: Lumen Atelier "Orbit" mini bag · gifted · AI-generated image; the real item may differ · #ad |

Set: cobalt studio, direct on-camera flash, crisp shadow to the right, grade line from the bible. Aspect 2:3 for full
length, cropped to 4:5 in the carousel layout.

## 2. Locks (two shown)

```text
[LOOK holo v1] a holographic bell-sleeve mini dress, mid-thigh length, round neck, wide bell sleeves ending at the wrist,
iridescent film fabric shifting silver to lilac to pale blue; white patent platform boots to mid-calf, round toe, 8 cm
platform; tiny orange oval sunglasses. Visors and sunglasses are orange, metal is silver.

[LOOK sculpture v1] a sculptural white patent shell dress, knee length, stiff rounded shoulders, three clear circular
bubble windows across the front at waist height, glossy finish; white patent platform boots to mid-calf. No other
accessories except the headset mic and the star clip.
```

## 3. Garment refs

- Three flat lays with `fal/flux-2-pro` at 2:3 ($0.04 each). The holo flat lay drew the dress in gold-tinted film on run
  1; run 2 added "#c9ccd3 silver base, shifting to lilac and pale blue" and was kept.
- The Lumen Atelier bag: the brand's own product photo (front and side), used as refs with the written permission saved
  at `looks/holo-bag/permission.pdf`. No flat lay generated for a real product.

## 4. Pose matrix

| Look | Poses |
|---|---|
| silver-night | front-full, three-quarter (hero), back-over-shoulder, walk, detail-hands, portrait |
| holo | front-full (hero), movement, seated, detail-shoes, portrait |
| sculpture | front-full (hero), profile, lean, detail-hands |
| holo + bag | three-quarter (hero), detail-hands (the bag), walk, portrait |

## 5. Hero frames

Nano Banana 2.1, 2K, refs `01-front-neutral` + `07-full-body` + the flat lay (or the bag photos):

- silver-night hero: run 1 put a gold clasp on the choker. Run 2 with "metal is silver, never gold" moved into the lock's
  first sentence: kept.
- holo hero: kept on run 1; the sunglasses checked orange, boots checked mid-calf.
- sculpture hero: run 1 had four bubble windows. Lock already said three; added "exactly three" and re-ran: kept.
- holo + bag hero: the bag's clasp shape was wrong on run 1 (rounded instead of the real bar clasp). Run 2 with the side
  photo as an extra ref matched the product; compared side by side with the brand's photo before keeping.

## 6. Other poses

From each hero with `openai/gpt-image-2.5-sunburst` and a keep-list (pose change only). Two fixes with
`fal/flux-kontext-pro`: a stole that turned grey ("make the stole white faux fur, keep everything else exactly the
same") and a boot that lost its platform. One movement frame for holo was generated fresh with Seedream 4.5 and dropped:
the dress's sleeves came out straight.

Spend: 3 flat lays $0.12 · 5 hero runs $0.25 · 15 edits ~$0.20 · 2 Kontext fixes $0.08 · 2 Seedream tests $0.08 ·
re-runs ~$0.30 = **about $1.03**, well under the cap.

## 7. Credits and disclosure (last slide and caption)

```text
silver night · 4 looks · images: AI-generated
looks 1–3: Claudia's own wardrobe, AI-designed, not for sale
look 4: wearing Lumen Atelier "Orbit" mini bag · gifted · AI-generated image; the real item may differ
#ad (look 4 is a gifted product)
```

Caption line 1: `#ad silver night, four looks. look 4's bag was gifted by Lumen Atelier; the images are AI-generated.
which look is yours?` Platform: Instagram AI info on (`labels.ai`), paid-partnership via `labels.ad: true`.

## 8. Assembly

- Instagram carousel: 10 slides at 4:5 (cover, two frames per look, the bag detail, a 2×2 of all looks with credits),
  built with `build-carousel.mjs` from [carousel-design](../../carousel-design/SKILL.md), converted to JPEG, published
  through `@useclaudia/social` after the operator's approval.
- TikTok photo mode: 14 frames at 9:16, uploaded in the app with "AI-generated content" on and the same #ad first line.
- Brand PDF: all 19 frames plus the credits page for Lumen Atelier's review before anything went live (the brand
  checked the bag's colour and clasp and approved).

## 9. Archive

`looks/silver-night/`, `looks/holo/`, `looks/sculpture/`, `looks/holo-bag/` each hold the lock (v1), flat lay or product
refs, hero frame, prompts and the `.json` sidecars. The sculpture lock moved to v2 with "exactly three bubble windows".
