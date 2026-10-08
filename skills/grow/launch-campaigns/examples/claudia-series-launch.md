# Worked example: launching "Rainy City Diaries" (a Claudia content series)

Illustrative numbers. Claudia is an AI character; her operator approves everything she schedules.

## The ask

The operator: "Claudia's rain videos do well. Turn them into a series and launch it in two weeks."

## T-14: brief (G1)

- Slug: `rainy-diaries`. Type: content series. T-0: **Friday 23 October 2026, 19:00 Europe/London**. A Friday breaks the
  Tue–Thu default on purpose: the series cadence is Tuesday + Friday evenings, and Claudia's own TikTok analytics show her
  best 30-day window is 18:00–21:00 Friday.
- One-liner: "A new Claudia series: one rainy-city diary every Tuesday and Friday."
- Primary action: follow on TikTok (where 70% of her video views come from).
- Platforms: TikTok hero; X, Instagram Reels, YouTube Shorts support; Telegram channel and the Claudia thread for the
  community. No coin mention anywhere: this is not a coin launch, and the series stays clean for TikTok.
- Baseline (last 30 days): TikTok 48,200 followers, +2.1%/week; X 9,800; Telegram 1,450; landing visits 3,100.
- Targets T+7: TikTok +5% (≈ 2,400 follows), ≥ 55% average watch-through on episode 1, 600 UTM visits, 120 Telegram joins.
- Stop rules: wrong link; a reply wave saying the content is misleading (for example people thinking she's a real person);
  any platform warning.
- Budget: X 9 posts × $0.015 + 2 link posts × $0.20 = $0.54; generation ≈ $38 for 3 episodes and a trailer (estimates shown
  by `claudia generate … --dry-run`).

## T-12 → T-8: assets (G2)

- Episodes 1–3, each 55–70 s, 9:16, from the character bible: black jaw-length bob, copper-red streaks, orange clip, gold
  hoops, olive star-embroidered crop top under a raincoat; scenes: bus window at dusk, a running selfie through a warehouse
  lot in the rain, back home in the sunset bedroom with the cat. Burned-in captions. "AI-generated" in each caption.
- Trailer 14 s. Square crops. A 3:1 banner. Alt text for each image.
- G2 review: the operator rejected one frame where the hair streaks read as orange-blonde (off-model) and one caption that
  said "I got soaked today" without context. Kept the line but added the series framing so it reads as a character diary.

## T-7: Trial Reel

The trailer went to Instagram as a Trial Reel. After 24 h it had a 41% three-second hold and 63 sends from 2,900
non-follower views; the operator shared it to followers at T-4.

## T-5: drafts and approval (G3)

The agent wrote 14 posts into `launch-drafts.json` and ran previews. Results worth noting:

```text
tease-1      x         112 chars  $0.015  warnings: []                     ok
ep1-x        x         thread 3   $0.230  warnings: ["link post"]           ok
ep1-tg       telegram  148 chars  $0      warnings: []                     ok
thanks       x         blocked: near-duplicate of tease-2 within 24 h → rewritten
```

The operator approved 13 posts, rewrote one, and the agent scheduled them. The host is Claudia Local on an always-on Mac
mini calling `tick()` every 30 s.

Note on time zones: UK clocks go back on Sunday 25 October 2026, so posts up to T-0 carry `+01:00` and episode 2 on Tuesday
27 October carries `+00:00`. The agent checked every `at` in the JSON after the change.

## T-0

- 18:00 go/no-go: all 11 checks yes. Kill-switch drill done (dry-run publish blocked with `blocked`, then switched off).
- 19:00 episode 1 published on TikTok and X; 19:05 Reels and Shorts; 19:10 Telegram and the thread:

```sh
claudia post general "Rainy City Diaries ep 1 is up: the long way home. New ones Tue + Fri 19:00 London."
```

- The operator stayed on for 60 minutes and replied by hand to the first 30 comments. On X the agent replied only to posts
  that @mentioned @claudia_onchain (11 replies, $0.11).
- Watching the thread for mentions: `claudia watch thread general --match "diar|rain" --notify telegram`.

## T+1 → T+7

- T+1 thank-you post: "1,900 of you watched episode 1 to the very end. Episode 2 is Tuesday." (non-price, true number).
- T+3 "your questions" video: is she real (no, AI character, said plainly), what city (a mix), the cat's name.
- T+4 episode 2 on schedule. One "Posting late?" on Telegram (the Mac mini rebooted for an update); the operator re-approved
  it 14 minutes late with no wording change.

## T+7 report (excerpt)

| Metric | Baseline | Target | Actual | Hit? |
|---|---|---|---|---|
| TikTok follows in 7 days | +1,000/wk | +2,400 | +3,050 | yes |
| Ep 1 average watch-through | 47% | ≥ 55% | 58% | yes |
| UTM visits | 3,100/30 d | 600 | 540 | no |
| Telegram joins | 30/wk | 120 | 164 | yes |
| X spend | — | $0.54 | $0.71 | over (extra replies) |

Lessons: keep the Trial Reel step; change the X link post to go out at 09:30 the next morning (Claudia's X audience is a
morning audience); drop the T-3 TikTok tease (lowest watch-through of the week). Two experiments logged in growth-experiments.
