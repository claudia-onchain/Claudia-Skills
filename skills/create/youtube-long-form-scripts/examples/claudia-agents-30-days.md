# Example: a 12-minute Claudia video, package to disclosure

Claudia (AI character, useclaudia.xyz) makes a long-form video about a 30-day experiment: her agents drafted every
post, and a person approved each one. Her operator runs the pipeline and approves every spend and the upload. All
numbers below are from this one example.

## Step 1: package first

Titles shortlisted from ten (characters in brackets):

1. `I let my agents run my posting for 30 days` (42) ← chosen
2. `30 days of agent-made posts: what actually worked` (49)
3. `my agents posted 214 times. 9 posts did the work` (49)

Thumbnail concepts (16:9):

| | Subject | Emotion | Words |
|---|---|---|---|
| A | Claudia at her desk in the white studio, laptop open, a wall of sticky notes behind | amused, one brow up | `214 POSTS` |
| B | Close-up, she holds up one printed post like a trophy | proud, laughing | `THIS ONE` |
| C | Split: messy calendar vs clean calendar | deadpan | none |

All three are AI-generated images of her ([thumbnails-and-covers](../../thumbnails-and-covers/SKILL.md)); thumbnails
are exempt from YouTube's disclosure, the video itself is not.

## Step 2: the hook as recorded

| Time | A: said (her voice) | V: on screen |
|---|---|---|
| 0:00 | "two hundred and fourteen posts. nine of them did all the work." | screen: a feed scrolling, nine posts glowing rose |
| 0:05 | "for thirty days my agents wrote everything, and a human had to say yes to each one." | Claudia at her desk, white studio, headset mic |
| 0:13 | "if you run an account with agents, this is the stuff that wastes your week." | B-roll: an approval queue filling up |
| 0:21 | "three rules I'd keep, one I'd delete, and the three a m post that broke my brain." | title card with three chips |

## Step 3–5: chapters (description, after the edit locked)

```text
00:00 214 posts, 9 that mattered
01:05 the rule: agents draft, a human approves
02:40 week one: why the first posts flopped
05:10 the 3am post that did numbers
07:45 the rule I'd delete
09:30 what the numbers said after 30 days
11:20 what I'd do next time
```

Re-hooks: 2:30 ("and then week one happened"), 3:55 (a reveal of the worst post), 5:00 ("the 3am one is next"),
6:30 (screen to camera switch), 7:35, 8:50, 10:10 (the chart), 11:10.

## Step 6: B-roll list (excerpt of 16 AI rows, 9 screen recordings, 3 owned stills)

| id | Shows | Source | Prompt (abridged) | Model | Est. |
|---|---|---|---|---|---|
| B01 | feed scrolling, nine posts glowing | screen recording + overlay | — | — | — |
| B04 | approval queue filling up | screen recording (blurred handles) | — | — | — |
| B07 | Claudia walking into the cobalt studio at night, holding a coffee | ai-generated | "[CLAUDIA ID v2] … walks into a deep cobalt-blue paper studio, direct flash, holding a paper coffee cup, medium shot, slow follow, no text, no logos" | fal/kling-2.6-pro, silent, 5 s | $0.35 |
| B11 | desk at dusk, laptop glow, chrome star sticker, no people | ai-generated | "slow dolly-in on a desk at dusk, laptop glow, a chrome star sticker, no people, no readable text" | fal/kling-2.6-pro, silent, 5 s | $0.35 |
| B15 | blue-render scan lines over a calendar grid | ai-generated | "glossy blue light over liquid-chrome surfaces, faint scan lines, a calendar grid made of light, rose highlights" | fal/kling-2.6-pro, silent, 5 s | $0.35 |

```sh
claudia generate video "slow dolly-in on a desk at dusk, laptop glow, a chrome star sticker, no people, no readable text" \
  --aspect 16:9 --duration 5 --model fal/kling-2.6-pro --dry-run
```

16 AI shots × 5 s silent at $0.07/s = **$5.60** (list price, checked 2026-10); 3 rerolls added $1.05.

## Step 7: voice and presenter

- Voice-over: her designed ElevenLabs voice on `elevenlabs/multilingual-v2`, one job per chapter. About 10,400
  characters at $0.08 per 1,000 = **$0.83**. Mastered to -14 LUFS, -1 dBTP.
- Four on-camera moments (62 s total) made from approved stills with `fal/omnihuman-1.5` at $0.16/s = **$9.92**
  ([avatar-explainer-videos](../../avatar-explainer-videos/SKILL.md)).
- Total generation spend: **$17.40**, under the operator's $25 cap for the video.

## Step 8: disclosure and upload

- Altered or synthetic content: **Yes** (a photoreal AI character in realistic scenes).
- Description line 2: `Claudia is an AI character. Her voice, on-camera clips and most B-roll are AI-generated.`
- Uploaded private through `@useclaudia/social` (`labels.ai` on → `containsSyntheticMedia: true`), reviewed in Studio
  by the operator, thumbnail A set, B and C added to Test & Compare, end screen to the "3am post" Short's long version.

## Step 9: what the retention graph said

- Lost 31% by 0:30, better than the channel's typical curve; the "two hundred and fourteen posts" proof line held.
- A cliff at 7:45: "the rule I'd delete" opened with two minutes of context. Next script: open that chapter on the
  rule itself.
- A bump at 9:40: viewers rewatched the chart. Next video shows the chart earlier and keeps it on screen longer.
- Test & Compare picked thumbnail B ("THIS ONE") as Winner on watch time share after 9 days.
