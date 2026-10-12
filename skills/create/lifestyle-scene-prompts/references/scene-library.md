# Scene library — 15 Claudia scenes

Paste `[ID]` = the full `[CLAUDIA ID v2]` block, verbatim. Default model `google/nano-banana-2.1`, 2K. Refs: `01` face
always, plus the ones listed (`props/` = prop pack). Every prompt ends with: "Background people anonymous and out of
focus; no readable logos or text; natural skin texture."

## The silver-foil set

**1. Pinning polaroids to the foil (4:5) — refs 01, 04**
```text
[ID] Moment: kneeling on the floor of the set, pinning a new polaroid of herself to the crinkled silver foil, glancing back
at the lens with a cool look. Signature look: a white glossy vinyl top with huge crinkled puffed sleeves and a high ruched
neck. Place: silver-foil backdrop, a row of taped polaroids, chrome stars on the floor. Camera: crew phone, 35mm, from just
behind her. Light: one hard flash, sparkle on the foil, deep dark edges. 4:5.
```

**2. Talking to camera in the white studio (9:16) — refs 01, 05**
```text
[ID] Moment: mid-story to the locked-off camera, hands up describing something, laughing at her own joke. Studio look: a
cropped white puffed-sleeve shirt with a small star pin, a black patent pleated mini skirt and long black patent gloves.
Place: seamless pale grey-white paper, nothing else. Camera: eye level, 50mm, everything in focus. Light: soft even
daylight. 9:16, face in the upper third.
```

**3. Coffee on the apple box (4:5) — refs 01, props/disco-ball**
```text
[ID] Moment: sitting on an apple box between set-ups, holding a black mug with a chrome star in both hands, the disco ball
on its stand beside her throwing small sparkles on her cheek. Signature look. Place: the edge of the foil set, cables, a
light stand. Camera: 35mm, slightly high angle from standing. Light: one modelling light, cool spill. Fujifilm Pro 400H. 4:5.
```

**4. The disco ball, no face (1:1) — refs props/disco-ball**
```text
The mirrored disco ball on its silver stand on crinkled silver foil, a gloved hand in a long black patent glove resting on
the stand, a hard flash scattering hundreds of light points across the foil. Shallow focus on the tiles. 1:1.
```

**5. Mirror selfie, getting ready (9:16) — refs 01, 07**
(see SKILL.md step 4)

## Desk and platform

**6. Studio desk, the disco ball (4:5) — refs 01, props/laptop-star, props/disco-ball**
(see SKILL.md step 4)

**7. Over-the-shoulder at the laptop (16:9) — refs 02, props/laptop-star**
```text
[ID] Moment: seen over her shoulder, she types at the laptop, the lid's chrome star sticker visible from the side, her
face in three-quarter profile reflected faintly in a dark second monitor. Signature look. Place: a white desk, a black mug
with a chrome star, a small rose-pink lamp. Screens show soft blurred abstract UI, no readable text. Camera: 35mm, behind
her right shoulder. Light: cool screen glow, rose lamp rim. 16:9 with negative space on the right.
```

**8. The blue render (16:9) — refs 01, 02**
(the prompt library's `claudia.p5.blue-render`)

## The club

**9. Spotlight close-up (4:5) — refs 01, 06**
```text
[ID] Moment: leaning toward the lens, head tilted, the spotlight behind her blooming into the frame. Club look: a silver
quilted puffer. Place: dark club, dancers in silver puffers soft on both sides, haze. Camera: 35mm f/2, eye level. Light:
hard backlight, warm-silver colour. CineStill 800T. 4:5.
```

**10. Club wide, dancing in the crowd (4:5) — refs 01, 06, 10**
```text
[ID] Moment: dancing in the middle of the crowd with one arm raised, laughing. Club look. Place: dark room, one bright
spotlight, a crowd in silver puffers with raised hands, haze. Camera: 24mm, slightly low, a little motion blur in her raised
hand. Light: spotlight and rose-pink rim #ff6fa5, strobe freeze. 4:5.
```

**11. Flash selfie at the bar (1:1) — refs 01, 05**
```text
[ID] Moment: arm's-length phone selfie with the flash on, laughing, a glass of sparkling water in her other hand. Club look.
Place: a dark bar, warm bokeh of bottles (labels unreadable). Camera: phone front camera, 24mm, slightly above. Light: phone
flash, warm practical bulbs behind. 1:1.
```

**12. Leaving the club, back view (4:5) — refs 12**
```text
[ID] Moment: seen from behind, walking out of the club into the corridor light, the puffer slipping off one shoulder, the
headset mic still on. Place: a dark corridor, a bright doorway at the end, haze. Camera: 35mm, from inside the room. Light:
the doorway backlight, a warm spill on her shoulder. 4:5.
```

## The studios

**13. Cobalt studio, between takes (4:5) — refs 01, 07**
(see SKILL.md step 4)

**14. Visor up, white studio (4:5) — refs 01** (see SKILL.md step 4)

**15. Sculpture dress fitting (2:3) — refs 01, 07**
```text
[ID] Moment: standing still while a crew member's hands (out of focus, anonymous) adjust a clear panel of the dress, she
looks at the lens, amused. She wears a sculptural white patent shell dress with clear bubble windows and white platform
boots. Place: the white studio, a clothing rail and a steamer at the frame edge. Camera: 50mm from a little below. Light:
soft daylight from the left. 2:3.
```

## Model swaps

- Text that must read (a set board, a neon "ON AIR"): GPT Image 2.5 Flare with quoted text.
- Two subjects with exact colours (her + the disco ball, rose lamp `#ff6fa5`): FLUX.2 Pro JSON with two `subjects` entries.
- Six slides of one night: Seedream batch (SKILL.md step 5).
