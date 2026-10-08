# Worked board: "Desk Diaries" episode 03 (30 s)

Series: **Desk Diaries** — late nights at Claudia's desk while her agents work; the cat is "the CTO". Pillar: platform /
behind the scenes. No coins promoted, no financial claims.

## Header

```yaml
premise: "Claudia shows how her agents handle the night shift while she 'supervises' with the cat."
payoff: "the cat lies on the keyboard; she whispers 'the CTO has approved the PR.'"
length_s: 30
hook_text: "who runs the night shift?"
caption: "my agents posted 14 times today and I took one nap. delegation is self-care"   # + AI label
continuity:
  look: "cosy black — oversized fuzzy black knit jumper, sleeves over her hands; gold hoops; clip in"
  hair_state: "dry, bangs neat"
  accessories: "no sunglasses"
  light: "night: warm desk lamp camera-left + purple-rose monitor glow camera-right"
  props: "laptop with ONE pink butterfly sticker, black butterfly mug (full → half), two monitors with abstract charts (no readable text), grey tabby with white paws"
  direction: "she faces camera; the cat is always on frame-right of the keyboard"
  capture: "camera (not selfie) — a phone propped on the shelf"
audio: { lines: ["desk-03-L1", "desk-03-L2", "desk-03-L3"], music: "licensed late-night downtempo, -20 dB under voice", ambience: "room tone, keyboard, soft purr" }
```

## Shots

| Shot | Act | Time | Play / gen | Framing · camera | Action | Line | Model | Est. |
|---|---|---|---|---|---|---|---|---|
| s1 | hook | 0–3 | 3 / 5 s | MCU · static | she leans into frame toward the lens, raises an eyebrow | L1 "who runs the night shift? [whispers] not me." | `fal/kling-3-pro` silent → lip-sync | $0.56 + $0.15 |
| s2 | promise | 3–8 | 5 / 6 s | MS · very slow push-in | she gestures at the monitors behind her, sips from the butterfly mug | L2 (VO) "my agents draft, I approve, the cat audits." | `fal/hailuo-2.3` | $0.28 |
| s3 | show 1 | 8–15 | 7 / still | insert · Ken Burns in edit | monitor close-up: abstract post cards and a queue (no readable text) | VO continues | still only (`google/nano-banana-2.1`) | $0.05 |
| s4 | show 2 | 15–21 | 6 / 6 s | insert · rack focus mug → laptop sticker | rack focus from the butterfly mug to the butterfly sticker | music + keys | `fal/hailuo-2.3` | $0.28 |
| s5 | turn | 21–26 | 5 / 6 s | MS · static | the grey tabby walks across the keyboard and lies down; she freezes, delighted | purr SFX | `fal/kling-3-pro` audio on | $1.01 |
| s6 | payoff | 26–30 | 4 / 5 s | CU · static | she leans in, whispers to the lens, half-smile; same MCU as s1 for the loop | L3 "[whispers] the CTO has approved the PR." | `fal/kling-3-pro` silent → lip-sync | $0.56 + $0.20 |

Video $2.69 · stills (board 6 × $0.0336 + 5 first frames × $0.0504 + s3 still) ≈ $0.51 · voice ≈ $0.01 · lip-sync ≈ $0.35
→ **≈ $3.56; approved cap with 50 % buffer: $5.50** (package prices, checked 2026-10).

## Designed transitions

- s1 → s2: sound bridge — L2 starts 0.4 s before the cut.
- s3 → s4: match on the butterfly (the s3 still's queue UI has a small butterfly mark; s4 starts on the butterfly mug).
- s5 → s6: hard cut on the cat settling; s6 matches s1's framing so the loop reads as the start of the next night.

## Prompts

**s2 first frame** (Nano Banana 2.1, 2K, refs 01 + 08):

```text
[CLAUDIA ID v1] … wearing an oversized fuzzy black knit jumper with sleeves pulled over her hands. She sits at a desk at
night holding a black mug with a butterfly print, half-turned toward two monitors with abstract candlestick charts and
floating post cards (no readable text). A laptop with a single pink butterfly sticker, a grey tabby cat with white paws
asleep on the right of the keyboard. Warm desk lamp from the left, purple-rose monitor glow from the right. Medium shot
from a shelf-mounted phone, 28mm, vertical 9:16, natural skin texture.
```

**s5 video** (Kling 3 Pro, 6 s, audio on):

```text
Same woman and cat as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob with copper-orange bang
streaks, orange clip, gold hoops, black knit jumper. 0–3s: the grey tabby with white paws stands, stretches and walks
across the laptop keyboard from right to left. 3–6s: it lies down across the keys; Claudia freezes with her hands up,
then covers her mouth, delighted. Static medium shot. Warm lamp and purple-rose monitor glow. SFX: soft keyboard clacks,
a purr. No music, no dialogue.
```

## What changed after the animatic

- s3 was planned as video ($0.56); a still with a slow push in edit was just as good → saved the money.
- L2 ran 4.6 s, s2 was 5 s with no breath → trimmed L2 to "my agents draft. I approve. the cat audits." (3.9 s).

## Approval and publishing

Board + $5.50 cap approved; published to TikTok, Reels and Shorts with the AI label; no coin names or tickers in the
video or caption (TikTok removes crypto promotion — see [../../../grow/crypto-marketing-compliance/SKILL.md](../../../grow/crypto-marketing-compliance/SKILL.md)).
