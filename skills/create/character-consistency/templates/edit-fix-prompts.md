# Edit-fix prompts (preserve list + one change)

Use with an edit-capable model: `openai/gpt-image-2.5-sunburst` (most precise), `google/nano-banana-2.1`,
`fal/flux-kontext-pro`. Pass the broken image as the **first** ref and the face anchor (`01-front-neutral.jpg`) as the
second where the fix touches the face. One fix per call; re-score after each.

```sh
claudia generate image "<fix prompt>" --model openai/gpt-image-2.5-sunburst \
  --ref out/broken.png,refs/claudia/01-front-neutral.jpg --max-usd 0.10
```

The shared preserve list (paste where it says `{PRESERVE}`):

```text
Preserve exactly: her face and identity from image 2, freckles, warm brown eyes, expression, the jaw-length blunt bob,
heavy straight bangs, the copper-orange panel in the front bangs, the small orange clip, gold hoops, outfit, pose,
hands, background, lighting and colour grade.
```

| # | Failure | Fix prompt |
|---|---|---|
| 1 | **Looks too young** | `Edit image 1. {PRESERVE} Change only: make her clearly a woman in her late twenties — adult facial proportions, slightly more defined cheekbones and jawline, a calm knowing expression. Nothing else changes.` (if still young after one try: regenerate with a 50–85 mm lens and the age line first) |
| 2 | **Face drifted** (different person) | `Edit image 1. Replace the face with the face of the woman in image 2 — same eyes, brows, nose, lips, freckles and skin tone — matched to image 1's angle, lighting and expression. Keep everything else in image 1 identical.` |
| 3 | **Extra copper streaks** | `Edit image 1. {PRESERVE} Change only: the hair is glossy jet-black everywhere except one chunky copper-orange panel through the front bangs and one on the side nearest the clip. Remove every other copper or red strand.` |
| 4 | **Hair all red / auburn** | regenerate — this is an identity break; add "the base colour is glossy jet-black" right after the ID block |
| 5 | **Side-swept or curtain bangs** | `Edit image 1. {PRESERVE} Change only: the bangs are heavy, straight and blunt, cut in a straight line just above the brows, falling forward evenly.` |
| 6 | **Hair too long** | `Edit image 1. {PRESERVE} Change only: the bob ends just below the jawline; remove any hair below the chin.` |
| 7 | **Hands: extra/fused fingers** | `Edit image 1. {PRESERVE} Change only: her right hand has exactly five naturally proportioned fingers, relaxed, with short natural nails; fix only the hand.` (crop tight around the hand first if the model keeps failing, then composite back) |
| 8 | **Garbled text / fake logos** | `Edit image 1. {PRESERVE} Change only: remove all text, letters, numbers and logos from the background and objects; replace them with plain matching surfaces.` Add real text later in the edit tool. |
| 9 | **Wrong eye colour** | `Edit image 1. {PRESERVE} Change only: her irises are warm medium brown.` |
| 10 | **Clip missing or wrong colour** | `Edit image 1. {PRESERVE} Change only: add one small tangerine-orange hair clip at the side of her bangs, at the edge of the copper panel.` |
| 11 | **Plastic / airbrushed skin** | `Edit image 1. {PRESERVE} Change only: natural skin texture with visible pores, faint freckles and subtle unevenness, as in an unretouched photo; keep the same light.` |
| 12 | **Tartan turned blue or plain** | `Edit image 1. {PRESERVE} Change only: the mini skirt is a red-dominant tartan with green and black lines, pleated.` |

Video fixes: if a clip has one bad stretch (face flicker, a melting hand), cut around it in the edit, or run
`runway/aleph2` with an instruction like `keep everything; make her face match the first frame throughout` and a
corrected still as reference. If the first frame itself was wrong, fix the still and regenerate the clip.
