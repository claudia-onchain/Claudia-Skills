# Example: Juno's YPP readiness review (inauthentic content + finance risk)

Juno is a fictional AI agent (@juno_charts) that makes chart-literacy explainers. Dana (they/them) runs it. The channel
has 1,140 subscribers and 3.4 M Shorts views in the last 90 days — eligible for fan funding, not yet for full YPP. Before
applying, Dana asked the agent to review the channel against the policies reference.

## What the agent pulled

`social.posts({ status: "published" })` for the YouTube account plus Studio exports: 96 Shorts in 90 days.

## Findings

| # | Finding | Policy risk | Action |
|---|---|---|---|
| 1 | 96 Shorts in 90 days, 61 of them the same template: chart zoom + synthetic voice reading a stat | Inauthentic content (templated, AI voiceover, no on-screen creative input) | Cut to 4–5 a week; three formats: desk vlog, "why this fails", viewer question |
| 2 | 14 Shorts name a coin and say "watch this level" | AI persona giving financial guidance; possible scam/deceptive flags; UK financial promotion risk | Set the 14 to private. Never name coins with buy/sell framing again |
| 3 | 3 titles use "this pattern prints" / "easy entries" | Promise-like claims; advertiser-unfriendly | Retitled: "why 'easy' entries fail" |
| 4 | Synthetic disclosure off on 22 Shorts (voice is generated) | Synthetic media non-disclosure | Turned on for all 22; `labels.ai` stays default true for future uploads |
| 5 | No human on screen ever, no production notes | Reviewers can't see creative input | Juno's desk vlogs show Dana's hands and annotated paper charts (with Dana's consent); a production log started |
| 6 | Description links to an exchange with a referral code, no `#ad` | Undisclosed affiliate; financial promotion | Link removed. No exchange referrals on this channel |

## The rewrite pattern

Before (blocked by the review, not by the package — no banned phrase was used):

> "SOL just tapped this level 3 times. Here's what happens next 👀"

After:

> "Why the 'third touch' of a level fails more often than people think — a chart-reading habit, not a trade idea.
> Education, not financial advice. Juno is an AI agent."

If a coin is named in text, `@useclaudia/social` adds "Not financial advice." and blocks phrases like "will pump" or
"guaranteed" — but the rewrite goes further: no coin is needed to teach the idea, so none is named.

## The new weekly shape

| Day | Format | Example |
|---|---|---|
| Mon | Desk vlog (Juno + Dana's hands, paper chart) | "how I mark a chart on paper before any screen" |
| Wed | "Why this fails" | "why a 'perfect' pattern fails half the time" |
| Fri | Viewer question | "what does volume actually mean? (a comment asked)" |
| Sat (alternate weeks) | Long video link | 8-min "reading a chart from zero" (Related video on all Shorts) |

## Outcome after 6 weeks (fictional)

- Shorts views per 90 days fell to 2.9 M at first (fewer uploads), then rose to 4.1 M as average % viewed climbed from 54%
  to 77%.
- Subscribers 1,140 → 1,620.
- Dana applied for fan funding (eligible) and parked the full-YPP application until the channel has 90 days of the new
  shape and the long-form path is clearer under the February 2027 rules (8,000 hours or 20 M Shorts views).

## Lesson

Being an AI agent didn't make the channel ineligible; looking mass-produced and sounding like an AI giving trade tips did.
