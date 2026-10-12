# Example: "how approvals work", a 90-second Claudia explainer

Claudia (AI character) explains why every post her agents draft waits for a human "yes". Output: 9:16 for Reels,
TikTok and Shorts, 1080p. Her operator approves every render and the post. All numbers are from this example.

## Script (210 words, ~90 s), segment 1 of 3

| Time | Says | On screen | Motion |
|---|---|---|---|
| 0:00 | "my agents write a lot of posts. none of them go out until a human says yes." | `AI avatar` tag · "none go out without a yes" | direct gaze, light smile |
| 0:07 | "here's why, and what that yes actually checks." | cutaway C01: the approval queue | small nod |
| 0:12 | "first, the label. every post says it's A I made, because it is." | C02: a preview with "(AI-generated)" highlighted | — |
| 0:20 | "second, the promises. anything that sounds like a price call gets blocked before anyone sees it." | C03: a blocked preview, reason visible | slight head tilt |
| 0:29 | (end of segment 1) | | |

Segments 2 and 3 cover the daily caps, the kill switch, and a recap with a soft question ("would you let yours post
without a yes?"). `useclaudia.xyz` appears on screen; she never reads it aloud.

## Route choice

1. **Test of route A** (HeyGen photo avatar, a HeyGen voice id): a 15 s test render, estimate $1.50. The face held up
   well, but the voice didn't match her ElevenLabs series voice. Rejected: two voices in one series sound like two people.
2. **Route C** (OmniHuman with her designed voice): three segments of about 30 s each, from the same approved still
   (`refs/claudia/studio-front-9x16.jpg`, white studio, chest-up, mouth relaxed, headset mic visible).

```sh
claudia generate speech "my agents write a lot of posts. none of them go out until a human says yes. …" \
  --model elevenlabs/multilingual-v2 --voice <her voice id> --max-usd 0.05
ffmpeg -i seg1.mp3 -af "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,loudnorm=I=-14:TP=-1:LRA=11" -ar 48000 seg1.wav
claudia generate avatar "medium close-up, warm and amused, small nods, one slow blink, static camera, soft studio light" \
  --model fal/omnihuman-1.5 --ref refs/claudia/studio-front-9x16.jpg,out/seg1.wav --max-usd 6 --dry-run
```

The dry run showed the request and an estimate of $4.80 for 30 s; the operator ran it without `--dry-run` and said yes.

## QA: the failed take and the fix

Segment 2 failed two checks at 0.5×:

- Lips didn't close on "posts" and "blocked" (p, b). The line had a breathy read with room echo from the voice settings.
- The mouth kept moving through a 0.6 s pause.

Fix: regenerated the line with a slightly slower read and higher stability, cut the pause to 0.3 s, re-rendered
segment 2 (another $4.80). Second take passed all checks; the drift check found the star clip and peach streak intact.

## Captions, cutaways, mix

- Word-by-word captions from the script with [captions-and-hooks](../../captions-and-hooks/SKILL.md), centred at
  y = 1180, moved up to y = 760 for the two shots where her chin sits low.
- Cutaways (screen recordings of the approval flow) every 6–9 s; the avatar is on screen about half the time.
- A quiet lo-fi bed 15 dB under the voice; final mix -14 LUFS, -1 dBTP.

## Spend

| Item | Cost |
|---|---|
| Route A test (15 s, estimate) | $1.50 |
| Voice, 3 segments (~1,150 characters at $0.08 per 1,000) | $0.09 |
| OmniHuman, 3 × 30 s at $0.16/s | $14.40 |
| Segment 2 re-render | $4.80 |
| **Total** | **$20.79** (cap $25) |

## Post

```text
none of my agents' posts go out without a human yes. here's what that yes checks.
I'm an AI character, and this is an AI avatar of me. would you let yours post without a yes?
```

Drafted with `@useclaudia/social` (`labels.ai` on: TikTok AIGC, Instagram AI info, YouTube altered or synthetic
content), submitted, approved by the operator, scheduled for Tuesday 17:00 local.
