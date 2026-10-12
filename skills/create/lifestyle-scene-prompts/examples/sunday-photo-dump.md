# Worked example: "slow sunday" photo dump (6 slides, Instagram)

Theme: a slow Sunday in the empty studio. Outfit: the Signature look (white glossy vinyl, huge puffed sleeves). Light: soft
daylight through the studio skylight, warming on the last slide. Budget cap $0.40. Approver: the account owner.

## Plan

| Slide | Frame | Moment | Refs |
|---|---|---|---|
| 1 | close-up | on an apple box, the chrome-star mug in both hands, looking at the lens over the rim | 01, props/mug |
| 2 | detail | her black-gloved hands turning a vinyl record (unbranded label) | — |
| 3 | wide | the whole studio: foil backdrop half rolled up, clothing rail, her small on the apple box | 01 |
| 4 | candid | laughing as the disco ball starts to turn on its stand | 01, 05, props/disco-ball |
| 5 | no-face | white platform boots on the paper next to a stack of polaroids | — |
| 6 | closer | the disco ball catching the last light | props/disco-ball |

## Batch prompt (Seedream 4.5)

```text
A candid photo dump of one slow Sunday in an empty photo studio with the same woman: [CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores.
Same outfit in every frame: a white glossy vinyl top with huge crinkled puffed sleeves and a high ruched neck. Same studio,
soft daylight through a skylight, Fujifilm Pro 400H look, phone camera, candid and unposed. The disco ball is always the
same 30 cm mirrored ball on a low silver stand. No readable logos or text.
Frame 1: close-up on an apple box, holding a matte black mug with a chrome star in both hands, looking at the lens over the rim.
Frame 2: detail of her black-gloved hands lowering a needle onto a vinyl record with a plain cream label.
Frame 3: wide shot of the studio — silver-foil backdrop half rolled up, a clothing rail with silver and patent pieces — she is small on the apple box.
Frame 4: laughing as the disco ball starts to turn, light points sliding across her face.
Frame 5: white patent platform boots on the white paper beside a loose stack of polaroids, no face.
Frame 6: the disco ball on its stand, the late light turning its tiles warm.
```

```ts
const req = {
  kind: "image", model: "byteplus/seedream-4.5", aspect: "4:5", prompt: sundayPrompt, brand: "claudia",
  refs: ["refs/claudia/01-front-neutral.jpg", "refs/claudia/05-laugh.jpg", "refs/props/disco-ball.jpg", "refs/props/mug.jpg"],
  meta: { providerOptions: { sequential_image_generation: "auto", sequential_image_generation_options: { max_images: 6 } } },
} as const;
console.log(media.estimate(req));   // list price $0.04 per image → ~$0.24 for six
```

## Review

| Slide | Score | Action |
|---|---|---|
| 1 | 7/7 | keep |
| 2 | n/a | record label had fake text → Kontext edit "make the record label plain cream, no text" ($0.04) |
| 3 | 6/7 (clip hidden) | keep |
| 4 | 5/7 — disco ball turned gold | regenerated with Nano Banana 2.1, refs 01, 05, props/disco-ball ($0.05) |
| 5 | n/a | keep |
| 6 | n/a | keep |

Total ≈ $0.33, under the cap.

## Post

- Order: 1 → 4 → 2 → 3 → 5 → 6 (strongest face first, alternate face/no-face).
- Caption: `slow sunday. the disco ball scheduled nothing and neither did I` + `what's your sunday ritual?`
- Instagram AI label toggled on; alt text on each slide starts "AI-generated photo of Claudia…"; no #ad (nothing gifted).
- Exported 1080×1350 JPG q3; sidecars kept; logged as `dump-slow-sunday@v2`.
