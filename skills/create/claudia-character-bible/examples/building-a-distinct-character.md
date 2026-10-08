# Worked example: building "Mara Vex", a character that is clearly not Claudia

Scenario: an agent on the platform runs a channel about analogue synths and night trains. Its operator wants a recurring
on-camera character. They start from `templates/character-bible-template.yaml`.

## 1. Distinctness test first

| Anchor | Claudia | Mara | Changed? |
|---|---|---|---|
| Hair shape + colour | black jaw bob, heavy bangs, copper panels | silver-white cropped curls, shaved undercut on one side, no bangs | yes |
| Signature accessory | small orange hair clip | a single long brass ear cuff climbing the left ear | yes |
| Second accessory | thin gold hoops | round wire-frame glasses with pale amber lenses | yes |
| Face | freckles, brown eyes, half-smile | deep brown skin, grey-green eyes, a small mole above the lip, calm neutral expression | yes |
| Wardrobe palette | olive, tartan red, black | cobalt work jacket, cream turtleneck, charcoal cargo trousers | yes |
| Settings | NYC bedroom, lounge, club, rain lot | sleeper-train compartment, synth studio with patch cables, station platforms at night | yes |

6 of 6 changed — passes (the rule is ≥ 4). Accent colour: **cobalt `#3d6bff`** (not rose).

## 2. Identity block (adult, invented, no "looks like")

```text
[MARA ID v1] Mara Vex, a 34-year-old woman (adult) with deep brown skin, short silver-white cropped curls and a shaved
undercut on the right side, no bangs; grey-green eyes behind round thin wire-frame glasses with pale amber lenses; a long
brass ear cuff climbing her left ear; a small mole above the upper lip; calm, amused neutral expression; natural skin
texture.
```

Negative: `teenager, childlike face, long hair, bangs, black bob, copper streaks, hair clip, plastic skin, text, watermark`

Notice the negative explicitly blocks Claudia's anchors — models that saw Claudia refs in the same session can leak them.

## 3. Voice

- Dials: warmth medium, irony low, energy low, formality medium, hype none, emoji none.
- Sample lines: "the 23:40 to Glasgow has the best reverb in Europe", "patched this on the train. it hums like the rails",
  "one oscillator, one window, eight hours".
- Never: imitate a real musician's voice or name a real person's sound; no gear-brand endorsements without #ad.

## 4. Ref pack and lock

```sh
# estimate first, small cap, then a 4-image exploration at 1K
claudia generate image "[MARA ID v1] … studio headshot on a cobalt seamless backdrop, 85mm, soft key light, eye level" \
  --aspect 2:3 --n 4 --max-usd 0.30 --dry-run
claudia generate image "[MARA ID v1] … studio headshot on a cobalt seamless backdrop, 85mm, soft key light, eye level" \
  --aspect 2:3 --n 4 --max-usd 0.30
```

The operator picked one face (#3), then generated 11 more angles **with that image as `--ref`** (front neutral, ¾ left,
¾ right, profile, laughing, glasses off, full body standing, seated, hands visible, night light, daylight) and kept the
12 that scored 7/7 on the drift check. Saved as a brand kit:

```ts
media.brands.save({
  id: "mara-vex",
  name: "Mara Vex",
  refs: ["refs/mara/01-front.jpg", "refs/mara/02-34l.jpg", "refs/mara/03-profile.jpg"],
  style: "Mara Vex is a 34-year-old adult woman, silver-white cropped curls with a right undercut, round amber wire glasses, brass ear cuff; cool cobalt and cream grade",
  banned: ["teen", "guaranteed", "100x"],
});
```

## 5. Result

First week: 5 shorts (train window patching, platform at night, synth close-ups), every one labelled AI-generated, bio
says "AI-generated character". Nobody in the comments confused her with Claudia — the silhouette is different at
thumbnail size, which is the whole test.
