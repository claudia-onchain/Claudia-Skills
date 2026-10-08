# Scene library — 16 Claudia scenes

Paste `[ID]` = the full `[CLAUDIA ID v1]` block, verbatim. Default model `google/nano-banana-2.1`, 2K. Refs: `01` face
always, plus the ones listed (`props/` = prop pack). Every prompt ends with: "Background people anonymous and out of
focus; no readable logos or text; natural skin texture."

## Home

**1. Sunset bedroom, photo wall (4:5) — refs 01, 11**
```text
[ID] Moment: sitting cross-legged on her unmade white duvet, pinning a new instant photo to the wall above the bed,
glancing back at the lens with a half-smile. Cosy black jumper. Place: a wall of pinned instant photos, trailing pothos
plants, floor-to-ceiling window with the Manhattan skyline and a low orange sun, a film camera on the sill. Camera:
friend's phone, 35mm, from the foot of the bed. Light: golden backlight, copper halo in her hair, warm bounce. Kodak
Portra 400. 4:5.
```

**2. Day room, talking to camera (9:16) — refs 01, 05**
```text
[ID] Moment: mid-story to a phone on a tripod, hands up describing something, laughing at her own joke. Signature olive
cami with orange stars and layered chains. Place: plain white walls, ceiling smoke detector, open doorway behind, a
laundry basket half in frame. Camera: phone on tripod at eye level, 26mm, everything in focus. Light: soft overcast window
light from the left. Phone look, slight noise. 9:16, face in the upper third.
```

**3. Morning coffee and the cat (4:5) — refs 01, props/cat, props/mug**
```text
[ID] Moment: sitting on the windowsill in the morning holding the black butterfly mug with both hands, the grey tabby
pressing its head against her knee. Grey hoodie and pink fuzzy slippers. Place: window with rain-streaked glass and blurry
brick buildings outside, a plant pot. Camera: 35mm, slightly high angle from standing. Light: cool soft daylight, warm
steam from the mug. Fujifilm Pro 400H. 4:5.
```

**4. Cat on the bed, no face (1:1) — refs props/cat**
```text
The grey tabby with white paws and a white chest asleep curled on an oversized fuzzy black knit jumper on a white duvet,
a woman's hand with fine-line star tattoos and a chunky silver chain bracelet resting near its head. Golden-hour window
light, shallow focus on the cat's face, Kodak Portra 400. 1:1.
```

**5. Mirror selfie, getting ready (9:16) — refs 01, 07**
(see SKILL.md step 4)

## Desk and platform

**6. Desk at night, cat on keyboard (4:5) — refs 01, props/laptop-butterfly, props/cat**
(see SKILL.md step 4)

**7. Over-the-shoulder at the laptop (16:9) — refs 02, props/laptop-butterfly**
```text
[ID] Moment: seen over her shoulder, she types at the laptop, the lid's pink butterfly sticker visible from the side, her
face in three-quarter profile reflected faintly in a dark second monitor. Cosy black jumper. Place: a dark desk, a black
butterfly mug, a small rose-pink lamp. Screens show soft blurred abstract UI, no readable text. Camera: 35mm, behind her
right shoulder. Light: cool screen glow, rose lamp rim. 16:9 with negative space on the right.
```

**8. Glasses and trading screens (4:5) — refs 01, 02**
(portrait pack #10 in photoreal-portrait-prompts)

## Night out

**9. Rooftop at dusk (4:5) — refs 01, 11**
```text
[ID] Moment: leaning on a rooftop railing, turning back to the lens, wind lifting her bangs. Night-out look: black ribbed
cami, layered chains with a star pendant. Place: Manhattan skyline at blue hour, water towers, string lights. Camera:
50mm f/2, eye level. Light: copper sunset rim, cool sky fill. CineStill 800T. 4:5.
```

**10. Club wide, dancing in the crowd (4:5) — refs 01, 06, 10**
```text
[ID] Moment: dancing in front of the DJ booth with one arm raised, laughing, sunglasses on. Signature look with oversized
black oval sunglasses. Place: DJ booth with mixers and decks (unbranded), a DJ behind her looking down at the decks,
crowd with raised hands, blue-violet haze, moving-head beams. Camera: 24mm, slightly low, a little motion blur in her
raised hand. Light: blue-violet ambient, rose-pink rim #ff6fa5, strobe freeze. 4:5.
```

**11. Wine-glass wink at a candle-lit bar (1:1) — refs 01, 05**
```text
[ID] Moment: raising a glass of white wine toward the lens and winking, elbow on a marble bar. Night-out look. Place:
candle-lit bar, warm bokeh of bottles (labels unreadable), a small candle in the foreground. Camera: 50mm f/1.8, eye level.
Light: candlelight from below, warm practical bulbs behind. Kodak Gold 200. 1:1.
```

**12. City-night balcony, back view (4:5) — refs 12**
```text
[ID] Moment: seen from behind, sitting on a high-rise balcony chair, hair half-up with the bangs down, looking at a glowing
city grid, a glass of sparkling water on the ledge. Black knit. Place: glass balustrade, distant skyscrapers, purple-blue
night. Camera: 35mm, from inside the doorway. Light: city glow and a warm interior spill on her shoulder. 4:5.
```

## Outside

**13. Rain warehouse lot, wide (9:16) — refs 01, 05, 09**
```text
[ID] Moment: running toward the camera across a wet warehouse lot, laughing, phone in one hand, rain bouncing off the
asphalt. Signature look, chunky silver chain bracelet, pink fuzzy slippers soaked. Place: roll-up loading-dock doors,
yellow bollards, puddle reflections, overcast blue-grey dusk. Camera: friend running backwards with a phone, 24mm, slight
motion blur. Light: soft overcast, wet bounce. 9:16.
```

## Travel

**14. Santorini headphones (4:5) — refs 01** (see SKILL.md step 4)

**15. Airplane window (4:5) — refs 01** (see SKILL.md step 4)

**16. Train window at golden hour (16:9) — refs 02**
```text
[ID] Moment: on a regional train, forehead almost touching the window, watching fields go by, cream headphones around her
neck. Travel look. Place: train window with a reflection, blurred golden fields and pylons. Camera: 35mm from the seat
opposite. Light: low warm sun flickering through, Kodak Portra 400. 16:9, her face on the right third.
```

## Model swaps

- Text that must read (bar menu, a neon "OPEN LATE"): GPT Image 2.5 Flare with quoted text.
- Two subjects with exact colours (her + the cat, rose lamp `#ff6fa5`): FLUX.2 Pro JSON with two `subjects` entries.
- Six slides of one evening: Seedream batch (SKILL.md step 5).
