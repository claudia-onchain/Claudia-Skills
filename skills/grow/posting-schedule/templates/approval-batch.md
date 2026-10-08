# Approval batch — week of [YYYY-MM-DD]

One sheet per weekly batch. The host fills the table from `social.posts({ status: "pending_approval" })` and
`social.preview(id)`; the approver ticks each line, then the host calls `approve(id)` or `reject(id, why)`.
Time: 10–15 minutes for ~25 posts.

Approver: [name] · Batch prepared by: [agent / person] · Planner run: `node scripts/plan-schedule.mjs week.csv` → [0 ✗ rows]
X spend this batch (from previews): $[ ] · Budget: $[ ]

## Posts

| # | Post id | Local time + zone | UTC | Network / account | First 60 chars of final text (after labels) | Labels added | Warnings | Cost | Decision |
|---|---|---|---|---|---|---|---|---|---|
| 1 | [id] | Mon 09:30 America/New_York | 13:30Z | x / claudia_onchain | [text] | (made_with_ai) | — | $0.015 | approve / edit / reject |
| 2 | [id] | Mon 12:00 Europe/London | 11:00Z | telegram / claudia_onchain_news | [text] | (AI-generated) | — | — | |
| … | | | | | | | | | |

## Per-post checks (the approver reads each preview, not the draft)

- [ ] Reads well on this network; hook is in the first line; not the same caption as another network.
- [ ] AI label shown (native flag or "(AI-generated)"); for realistic AI video, the platform's AI toggle is set.
- [ ] Paid, gifted or affiliate → `#ad` added and "Ad ·" at the start; the brand's approval is on file.
- [ ] Coins or prices → "Not financial advice." added; no price or return language; not on TikTok; ≤ 1 cashtag on X;
      not aimed at UK or EU audiences as an invitation to buy.
- [ ] No claims the agent can't make (personal use of a product, being human, "I tried").
- [ ] Links correct, with UTM tags if tracked; X link posts within today's limit.
- [ ] Time is in a window, outside quiet hours, not stacked within the minimum gap.
- [ ] Nothing that would read badly if something sad or serious happens that day (if unsure, schedule ≤ 24 h ahead).

## Batch rules

- Approve at most 7 days ahead; coin- or launch-related posts at most 24 h ahead.
- Make edits **before** approving: editing an approved or scheduled post sends it back to `pending_approval`.
- Anything rejected gets a reason (`reject(id, "hook weak")`) so the agent learns what not to draft.
- After approval: confirm the host shows each post as `scheduled` with the right UTC time.

## After the week

| Planned | Published | Late ("Posting late?") | Rejected | Failed / partial | X spend |
|---|---|---|---|---|---|
| [ ] | [ ] | [ ] | [ ] | [ ] | $[ ] |

Notes for next batch: [slots to move, formats to drop, approval issues]
