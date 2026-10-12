# Portrait prompt pack (12)

Every prompt starts with the full `[CLAUDIA ID v2]` block (shown as `[ID]` here — paste it verbatim) followed by
"adult facial proportions, defined cheekbones." Refs: always `01-front-neutral.jpg`; add the one listed.

| # | Name | Aspect / res | Model | Extra ref |
|---|---|---|---|---|
| 1 | Official portrait, silver foil | 2:3 2K | nano-banana-2.1 | — |
| 2 | Avatar, butterfly light | 1:1 1K | nano-banana-2.1 | — |
| 3 | Visor lifted, white studio | 9:16 2K | nano-banana-2.1 | 06 |
| 4 | Club laugh, rose rim | 4:5 2K | nano-banana-2.1 | 05, 10 |
| 5 | Club flash selfie still | 9:16 2K | nano-banana-2.1 | 05, 09 |
| 6 | Studio talking still | 4:5 2K | nano-banana-2.1 | 05 |
| 7 | Foil close-up, hard flash | 4:5 2K | nano-banana-2.1 | 11 |
| 8 | B&W editorial | 4:5 2K | flux-2-pro | 02 |
| 9 | Flash snapshot at a party | 4:5 1K | nano-banana-2.1 | 05 |
| 10 | Studio desk + trading screens | 4:5 2K | nano-banana-2.1 | 02 |
| 11 | Profile silhouette, club spotlight | 2:3 2K | flux-2-pro | 04 |
| 12 | Press portrait, near-black | 2:3 2K | gpt-image-2.5-flare (1024x1536) | — |

## 1. Official portrait, silver foil
```text
[ID] adult facial proportions, defined cheekbones. Image 1 is her face reference. She wears a white glossy vinyl top
with huge crinkled puffed sleeves and a high ruched neck. Half profile looking back over her shoulder, one hand at her
collar, eyes into the lens, cool, direct gaze. Crinkled silver-foil backdrop, hard on-camera flash, sparkle highlights,
deep dark edges. 85mm at f/2.8. Natural skin texture, freckles, glossy coral lips. Clean editorial colour. Vertical 2:3.
```

## 2. Avatar, butterfly light
```text
[ID] adult facial proportions, defined cheekbones. Image 1 is her face. She wears a white glossy vinyl puffed-sleeve top.
Tight head-and-shoulders, face centred with space around the hair so a circle crop keeps the peach streak and the headset mic.
Beauty dish directly above the lens, small butterfly shadow under the nose, white bounce below. Warm grey seamless
backdrop. 85mm f/2.8, eyes tack sharp, a soft catchlight in each eye. Square 1:1.
```

## 3. Visor lifted, white studio
```text
[ID] Image 1 is her face; image 2 shows her with the visor down. She wears a cobalt patent trench coat over white satin
and an orange shield visor. Three-quarter to camera, hands in her pockets, lifting her chin as the visor sits pushed up
into her bangs, eyes to the lens. Pale studio wall and floor, direct flash with a soft shadow behind her. Medium shot,
eye level, 50mm f/2.8. Clean editorial colour, fine grain. Vertical 9:16, face in the upper third.
```

## 4. Club laugh, rose rim
```text
[ID] Image 1 is her face; image 2 her laugh; image 3 the club light. Signature look plus oversized black oval sunglasses.
Mid-laugh, chin up, one hand at her collarbone, in front of a DJ booth. Behind, out of focus: a DJ and a crowd with raised
hands, anonymous and unrecognisable; blue-violet haze and moving-head beams. Slightly low angle, 35mm f/1.8. Rose-pink rim
light #ff6fa5 on her hair and shoulder, CineStill 800T halation. No readable logos on the equipment. 4:5.
```

## 5. Club flash selfie still
```text
[ID] Image 1 is her face; image 2 her laugh; image 3 the selfie arm pose. She wears a silver quilted puffer. Front-camera
selfie at arm's length, her arm reaching toward the lens at the bottom of the frame, laughing open-mouthed, the phone
flash on her face. The dark club behind her: one bright spotlight, haze, dancers in silver puffers out of focus. iPhone
front camera, 24mm equivalent, flash-bright skin. Vertical 9:16, face in the upper third.
```

## 6. Studio talking still
```text
[ID] Image 1 is her face; image 2 her laugh. She wears a cropped white puffed-sleeve shirt with a small star pin and a
black patent pleated mini skirt. Medium close-up, mid-sentence to the camera, eyebrows raised, playful grin. Seamless
pale grey-white paper, soft even daylight. Locked-off camera at eye level, 50mm at f/4, everything in focus. 4:5.
```

## 7. Foil close-up, hard flash
```text
[ID] Image 1 is her face; image 2 the light. She wears the white glossy vinyl top with huge crinkled puffed sleeves. Close-up,
cheek resting on her hand, eyes to the lens, cool direct gaze, crinkled silver foil filling the background. Hard
on-camera flash, sparkle on the foil, a chrome rim light in her hair. 50mm f/2.8, focus on her eyes. 4:5.
```

## 8. B&W editorial (FLUX.2 JSON)
```json
{"subject":"Claudia from image 1: 28-year-old adult woman, jet-black jaw-length blunt bob, heavy straight bangs, light freckles, thin headset mic","wardrobe":"black ribbed turtleneck","action":"three-quarter turn, looking past the lens, calm","lighting":"Rembrandt lighting, key high at 45 degrees left, black flag on the right","background":"plain dark grey wall","camera":"Leica M11 Monochrom, 75mm f/2","style":"black-and-white, Kodak Tri-X 400 grain, deep blacks, natural skin texture"}
```
Note: in B&W the peach streak read as lighter grey bands — keep them visible.

## 9. Flash snapshot at a party
```text
[ID] Image 1 is her face; image 2 her laugh. Night-out look: a liquid-silver gown, a crystal choker. Laughing at
someone just out of frame, holding a glass of sparkling water. Direct on-camera flash, hard shadow on a white wall behind
her, slightly blown highlights, a string of fairy lights blurred at the edge. Contax T2 snapshot feel, 38mm. 4:5.
```

## 10. Studio desk + trading screens
```text
[ID] Image 1 is her face; image 2 her three-quarter angle. She wears thin black rectangular reading glasses and the white
glossy vinyl puffed-sleeve top, chin resting on one hand, a thoughtful look. Behind her two monitors with blurred green
and red candlestick charts (no readable numbers or tickers) and the disco ball on its stand. Screen glow from the side,
rose lamp behind. 50mm f/2, focus on her eyes through the lenses. 4:5.
```

## 11. Profile silhouette, club spotlight
```text
[ID] Image 1 is her profile. She stands in clean profile in front of the club's single spotlight, haze around her, the
bob's blunt line, the headset mic and the peach streak in the bangs catching the light. Exposure for the spotlight so her
face is a soft near-silhouette with a thin warm edge. 85mm f/2.8. 2:3.
```

## 12. Press portrait, near-black (GPT Image 2.5, no refs needed if 01 is attached)
```text
Create a photoreal press portrait. Subject: [ID], matching the woman in image 1. Wardrobe: white glossy vinyl puffed-sleeve top
over a black top. Pose: seated on a low stool, forearms on knees, looking into the lens, cool direct gaze. Background:
near-black backdrop with a faint gradient. Light: large soft key from camera left, thin rose rim #ff6fa5 from behind
right. Camera: 85mm, f/2.8. Constraints: no text, no logos, adult woman in her late twenties, natural skin texture.
```

CLI line (swap model/aspect per table):

```sh
claudia generate image "$(cat portraits/03-visor.txt)" --model google/nano-banana-2.1 --aspect 9:16 --resolution 2K \
  --ref refs/claudia/01-front-neutral.jpg,refs/claudia/06-visor.jpg --brand claudia --max-usd 0.10
```

Avatar crop: `ffmpeg -i in.png -vf "crop=<side>:<side>:<x>:<y>,scale=800:800" -q:v 3 avatar-800.jpg` — set x/y so her
face sits in the middle; preview with `ffplay` or open the file before exporting the smaller sizes.
