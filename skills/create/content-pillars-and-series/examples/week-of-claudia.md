# Worked example: week 1 (2026-10-12 → 10-18), calendar to captions

The agent started from `templates/content-calendar-4wk.csv`, filtered `week=1`, and produced this plan. Costs come from
`media.estimate()` on the package price table (checked 2026-10-08).

## 1. The week at a glance

| Day | Post 1 | Post 2 |
|---|---|---|
| Mon | P1 "talk to me" ep1 · TikTok + Reels | P5 "agent diaries" ep1 · X |
| Tue | P4 "forecast dared me" ep1 · TikTok + Reels + Shorts | P5 "skill of the week" ep1 · Shorts + X |
| Wed | P7 "the CTO" ep1 · TikTok + Reels | P3 "sunglasses on / off" ep1 · Reels + TikTok |
| Thu | P1 "talk to me" ep2 · TikTok + Reels + Shorts | P5 "agent diaries" ep2 · X + Telegram |
| Fri | P2 "after midnight" ep1 · TikTok + Reels | P6 "window seat" ep1 · Reels carousel |
| Sat | P4 one-off rooftop · TikTok + X | P7 "the CTO" ep2 · X image |
| Sun | P1 one-off text · X | P5 ask: new skill · X + Telegram |

Ratio: 10 lifestyle / 3 value / 1 ask → 71 / 21 / 7. TikTok gets 7 posts, none mention coins.

## 2. Production list for the batch

| Asset | Still | Video | Est. |
|---|---|---|---|
| talk-to-me ep1 | nano-banana-2.1 9:16 2K ($0.0504) | omni-flash ~10 s (~$1.00 est.) + lipsync-2 on 18 s VO ($0.90) + elevenlabs/v3 VO 220 chars ($0.02) | $1.97 |
| agent-diaries ep1 | nano-banana-2.1 9:16 2K ($0.0504) | kling-2.6-pro 5 s with audio ($0.70) | $0.75 |
| forecast-dared-me ep1 | nano-banana-2.1 9:16 2K ($0.0504) | kling-3-pro 10 s with audio ($1.68) | $1.73 |
| skill-of-the-week ep1 | reuse banner-network | VO 600 chars elevenlabs/v3 ($0.05) | $0.05 |
| the-cto ep1 | nano-banana-2.1 9:16 2K ($0.0504) | hailuo-2.3 6 s ($0.28) | $0.33 |
| sunglasses ep1 | gpt-image-2.5-flare 9:16 high (~$0.05 est.) | kling-2.6-pro 5 s, audio off ($0.35) | $0.40 |
| talk-to-me ep2 | 1 still | 2 × omni-flash ~10 s + lipsync-2 20 s + VO | $3.07 |
| agent-diaries ep2 | flux-2-pro 4:5 (~$0.03) | — | $0.03 |
| after-midnight ep1 | nano-banana-2.1 9:16 2K | kling-2.6-pro 10 s, audio off ($0.70) | $0.75 |
| window-seat ep1 | 6 × nano-banana-2.1 4:5 2K ($0.30) | — | $0.30 |
| rooftop one-off | 1 still | omni-flash ~8 s (~$0.80 est.) | $0.85 |
| the-cto ep2 | nano-banana-2.1 4:5 2K | — | $0.05 |
| **Total** | | | **≈ $10.28** + 30 % reroll budget ≈ **$13.40** |

Caps set for the week: `perJobUsd: 3.5, perDayUsd: 8, perMonthUsd: 60, approveAboveUsd: 0.5` — every video waits for
the owner's approval.

## 3. Final captions (as drafted, before platform labels are added)

- Mon P1: "ok so I tried to film this four times and the cat walked in all four times"
- Mon P5: "my agents posted 14 times today and I took one nap. delegation is self-care"
- Tue P4: "rain check? never heard of her"
- Tue P5: "new skill on the shelf: banners in four prompts. link in the thread"
- Wed P7: "shipped: a smarter queue. the cat approved the PR by sleeping on it"
- Wed P3: "sunglasses on = do not perceive me. sunglasses off = ok fine, hi"
- Thu P1: "storytime: my agent scheduled a post for 3am and it did numbers. not sharing the credit"
- Thu P5 (thread, 4 posts): opener "if your agent can't explain its reply, it doesn't get to post it. house rules" →
  why approvals → what the preview shows → "the cat has no approval rights. yet."
- Fri P2: "this set > my entire to-do list"
- Fri P6: "airplane window, no thoughts, just clouds"
- Sat P4: "the city did the lighting, I just showed up"
- Sat P7: "weekend standup. attendance: one cat. agenda: none"
- Sun P1: "day 12 of pretending I have a morning routine"
- Sun P5 ask: "new skill on the shelf: how to make your own character that isn't me. go build"

`@useclaudia/social` previews then added the native AI flag on TikTok/Instagram/YouTube/X and `(AI-generated)` text on
Telegram; nothing needed "Not financial advice" this week because no post mentioned a coin.

## 4. Review on 2026-10-19

- "forecast dared me" ep1: 71 % 3-second hold, highest of the week → keep cadence, add ep2 Wednesday.
- "skill of the week" ep1: lowest watch-through but most follows → fix length (40 s → 30 s), keep.
- "the CTO" ep1 and ep2: most saves → keep weekly.
