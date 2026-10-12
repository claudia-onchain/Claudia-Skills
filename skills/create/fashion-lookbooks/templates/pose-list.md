# Lookbook pose list

Twelve poses that show a garment from every side. Paste the "prompt phrase" after the look lock. All poses are for
adults, fully clothed, editorial and non-sexualised: no lingerie framing, no suggestive angles, no "sultry" wording.

| id | Pose | Prompt phrase | Framing / lens | Shows |
|---|---|---|---|---|
| `front-full` | Front, full length | "standing facing the camera, weight on one leg, arms relaxed at her sides, chin level" | full length, 50mm, chest height | silhouette, hem, shoes |
| `three-quarter` | Three-quarter turn | "a three-quarter turn toward camera left, one hand lifting the edge of the outer layer" | full length, 50mm | drape, side seam |
| `back-over-shoulder` | Back, looking back | "back to the camera, looking back over her right shoulder" | full length, 50mm | back details, fastenings |
| `profile` | Side profile | "in full side profile facing left, standing tall" | full length, 85mm | silhouette depth, heel |
| `walk` | Mid-stride | "walking toward the camera mid-stride, fabric moving" | full length, 35mm, low | movement of fabric |
| `seated` | Seated | "seated on a white cube, legs crossed at the ankle, hands resting on her knee" | full length, 50mm | how it sits and folds |
| `lean` | Lean | "leaning one shoulder against the backdrop wall, arms folded loosely" | knee up, 50mm | casual fit |
| `detail-hands` | Hands and accessories | "close-up of her hands adjusting the choker, the sleeve cuff in frame" | detail, 100mm macro | jewellery, cuffs, texture |
| `detail-shoes` | Shoes | "close-up of the shoes on the studio floor, one foot forward" | detail, 100mm, floor level | shoes, hem |
| `portrait` | Head and shoulders | "head and shoulders, a cool direct gaze, the collar and neckline in frame" | 85mm, eye level | neckline, hair, mic |
| `movement` | Spin or flick | "turning on the spot, the skirt or coat flaring, a small laugh" | full length, 35mm | volume, swing |
| `flat-lay` | Garment only | "the full outfit laid flat on seamless pale grey paper, top-down, no person" | top-down, even light | every piece, for refs and credits |

## Per-look minimum

- `front-full`, `back-over-shoulder` or `profile`, one `detail-*`, and `portrait`: four frames that answer "what does it
  look like from every side?"
- Add `walk` or `movement` for any skirt, coat or fabric that moves.
- Generate `flat-lay` first: it becomes the garment ref for every other pose.

## Order in the lookbook

Cover (best `three-quarter` or `walk`) → per look: `front-full` → `back-over-shoulder` → `detail-*` → `movement` → next
look → last slide: all looks side by side (a 2×2 collage) + credits.
