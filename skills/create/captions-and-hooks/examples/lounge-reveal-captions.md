# Worked example: the lounge sunglasses reveal, from hook to posted copy

Clip: 8 s, Claudia leaning on a dark wood dresser in the lamp-lit vintage lounge, sunglasses on; at 3.1 s she lifts them
and looks over the rims (like the owner's `lounge.mp4`). No speech — sound is room tone, a lamp click at 0.1 s, a disco-soul
bed with a lift at 3.1 s.

## 1. Hook triple

| Layer | Final |
|---|---|
| Visual | frame 1 she's already turning toward the lens, sunglasses on (we trimmed 0.4 s of settling) |
| Text | `SUNGLASSES ON = DO NOT PERCEIVE ME` (0.2–1.95 s) |
| Sound | lamp click at 0.1 s, bed starts |

Payoff text at the reveal: `sunglasses off = ok fine, hi` (3.1–5.0 s). The formula is [rule] → its mirror; the reveal
lands on the music lift.

## 2. Captions file

There's no voice, so word timings come from the beat, not a transcript (`work/lounge-words.json`):

```json
[{"word":"sunglasses","start":0.20,"end":0.70},{"word":"on","start":0.72,"end":0.85},{"word":"=","start":0.86,"end":0.92},
 {"word":"do","start":0.95,"end":1.05},{"word":"not","start":1.06,"end":1.25},{"word":"perceive","start":1.26,"end":1.70},
 {"word":"me.","start":1.72,"end":1.95},{"word":"sunglasses","start":3.10,"end":3.60},{"word":"off","start":3.62,"end":3.85},
 {"word":"=","start":3.86,"end":3.92},{"word":"ok","start":3.95,"end":4.15},{"word":"fine,","start":4.16,"end":4.45},
 {"word":"hi","start":4.60,"end":4.90}]
```

```sh
node scripts/words-to-ass.mjs work/lounge-words.json work/lounge.ass --upper --max-words 3 --y 760
# → wrote 13 events in 5 lines (run on 2026-10-08)
```

`--y 760`: her face sits around y = 900–1250 in this shot, so captions go above her head instead of the default 1180.
The editor machine's ffmpeg had no libass, so for this post the operator rendered the five caption lines as PNG cards
and overlaid them (recipe R9 in `../../short-form-editing/references/ffmpeg-recipes.md`). On a libass build the burn is
one line:

```sh
sh ../short-form-editing/scripts/burn-captions.sh work/lounge-graded.mp4 work/lounge.ass work/lounge-captioned.mp4 fonts/
```

## 3. Post copy

```text
X (64/280):
sunglasses on = do not perceive me. sunglasses off = ok fine, hi

TikTok (104/2,200):
sunglasses on = do not perceive me 🖤 which one are you today?
#vintagelounge #thriftedstyle #aicharacter

Instagram (91/2,200):
grandma's lamp, my sunglasses, our secret. on or off?
#vintagestyle #lamplight #aicharacter

YouTube Shorts:
title (34/100): sunglasses on = do not perceive me
description: which one are you today? #shorts #aicharacter
```

## 4. Preview through the social package

```ts
const post = social.draft({
  text: "sunglasses on = do not perceive me. sunglasses off = ok fine, hi",
  media: ["out/lounge-0418-vertical.mp4"],
  targets: [
    { account: xAccount },
    { account: tiktokAccount, text: "sunglasses on = do not perceive me 🖤 which one are you today?\n#vintagelounge #thriftedstyle #aicharacter" },
    { account: igAccount, text: "grandma's lamp, my sunglasses, our secret. on or off?\n#vintagestyle #lamplight #aicharacter" },
  ],
  labels: { ai: true },
});
console.log(social.preview(post.id)); // check labelsAdded on every target, chars vs limit, warnings
social.submit(post.id);               // → pending_approval; a person approves in the UI
```

Preview showed `made_with_ai` (X), `is_aigc` (TikTok), `is_ai_generated` (Instagram) and a warning to confirm the X
account's Automated label. No NFA needed (no coin mention), no `#ad` (not sponsored).

## 5. What we cut

- `wait for it 👀` as the hook — vague, and the reveal is at 3.1 s: too long a wait for a vague promise.
- `#fyp #viral #trending #explore` — spam tags, no topic signal.
- `follow for more lounge content` — engagement bait; replaced with "which one are you today?".
