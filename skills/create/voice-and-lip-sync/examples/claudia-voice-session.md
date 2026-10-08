# Worked example: designing Claudia's voice and syncing her first five lines

## 1. Design (ElevenLabs app, Voice Design)

Prompt: the Claudia brief from `templates/voice-design-brief.md`. Preview script: "ok so — I tried to film this four
times. [laughs] …". Three previews:

| Preview | Age read | Warmth | Phone clarity | Laugh | Whisper | Accent | Fits face | Total |
|---|---|---|---|---|---|---|---|---|
| P1 | 4 | 5 | 3 | 3 | 4 | 4 | 4 | 27 |
| P2 | 5 | 4 | 5 | 5 | 4 | 4 | 5 | **32** |
| P3 | 2 (read ~19) | 4 | 4 | 4 | 3 | 5 | 2 | 24 |

P3 was rejected outright — a voice that reads teenage undoes all the face work. P2 saved as "Claudia v1", voice id
recorded in `voice-settings.json` and the brand kit.

## 2. Five lines

```ts
import { createMedia, envKeys } from "@useclaudia/media";
const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 1, perDayUsd: 10, approveAboveUsd: 0.5 } });
const lines = {
  "room-07-L1": "ok so — I tried to film this four times… [laughs] and the cat walked in all four times.",
  "bed-02-L1": "[mischievously] so the cat is technically my CTO now.",
  "desk-03-L1": "my agents posted fourteen times today. [whispers] I took one nap.",
  "walk-01-L1": "the city did the lighting. I just showed up.",
  "grwm-01-L1": "[softly] the clip goes on last. that's the whole secret.",
};
for (const [id, text] of Object.entries(lines)) {
  const j = await media.generate({ kind: "speech", model: "elevenlabs/v3", brand: "claudia", text,
    meta: { voiceSettings: { stability: 0.5, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true }, lineId: id } });
  if (!("dryRun" in j)) console.log(id, (await media.wait(j.id)).outputs[0]?.path);
}
await media.close();
```

Cost: ~330 characters × $0.08/1K ≈ $0.03 for all five (checked 2026-10).

Problems and fixes:
- `desk-03-L1`: "fourteen" came out fine, but the whisper swallowed "nap". Fix: `[whispers] I took one… nap.` — the ellipsis
  gives the word room.
- `room-07-L1`: the `[laughs]` landed before the punchline on the first take. Moved the tag after "all four times" —
  then it laughed at its own joke, which is very Claudia. Kept.
- `bed-02-L1`: on Natural the mischief was faint; regenerated with stability 0 (Creative), took the best of three.

## 3. Master

```sh
for f in lines/*.mp3; do
  ffmpeg -y -i "$f" -af "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,loudnorm=I=-14:TP=-1:LRA=11" -ar 48000 "${f%.mp3}.wav"
done
```

(The `areverse` pair trims trailing silence too.)

## 4. Sync

`room-07` — silent 14 s Kling 3 clip where she talks to camera (route A):

```sh
claudia generate avatar "lip-sync her line" --model fal/lipsync-2 \
  --ref out/room-07-silent.mp4,lines/room-07-L1.wav --max-usd 1.00     # 14 s × $3.00/min ≈ $0.70
```

QA at 0.5×: the only bilabial in the line is the "m" in "times" — lips closed on it. The mouth kept moving for 0.4 s
after the line ended → trimmed in edit.

`bed-02` — no clip yet, so route B from her approved storytime still:

```sh
claudia generate avatar "close-up, lying on her side on a white duvet, amused half-smile, rolls her eyes once, small \
laugh, golden-hour light, static camera" --model fal/omnihuman-1.5 --ref frames/bed-02-still.jpg,lines/bed-02-L1.wav --max-usd 1.00
# 3.2 s line → ≈ $0.51
```

Result 6/7 (freckles softened). Accepted; light sharpen in edit.

## 5. Ship

Each final file was muxed with its mastered WAV, captions were built from the plain-text column (not the tagged text),
and the posts went out with the AI label on. Provenance logged per asset: video model, `elevenlabs/v3`, voice id, lip-sync
model, costs.
