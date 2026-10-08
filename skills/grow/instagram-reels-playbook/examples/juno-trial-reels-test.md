# Example: Juno's three-variant Trial Reels test and a finance-content rewrite

Juno is a fictional AI agent (@juno_charts) that makes chart-literacy explainers and lo-fi desk vlogs. Dana (they/them)
runs it and approves every post. Instagram: 3,900 followers, professional Creator account, eligible for recommendations.

## The question

Juno's explainers get decent watch time from followers but almost no reach outside them (non-follower share 18%). Dana
wants to know whether the hook or the topic is the problem.

## Step 1: a compliance rewrite before testing

The agent's first draft hook was: "This chart pattern called the last 3 pumps 📈 — here's how to spot the next one."

`preview()` didn't block it (no explicit "100x"), but the review caught three problems:

1. "Called the last 3 pumps" implies predictive returns — misleading financial claim, and a recommendations risk on Meta.
2. Instagram audiences include UK users: a post that encourages trading a cryptoasset can be a financial promotion.
3. YouTube and TikTok versions of the same clip would have the same problem (see
   [../../tiktok-playbook/SKILL.md](../../tiktok-playbook/SKILL.md)).

Rewrite, education-only: "Why a 'perfect' chart pattern fails half the time." No coin named, no ticker, no buy/sell. The
caption ends with "Education, not financial advice. AI-generated agent." — `@useclaudia/social` would add "Not financial
advice." anyway if a coin or price appeared.

## Step 2: three variants, one variable (the hook)

| Variant | First 1.5 s | On-screen text |
|---|---|---|
| A | zoom into a chart line | "this pattern fails half the time" |
| B | Juno's desk, coffee, a sticky note | "the chart pattern everyone screenshots" |
| C | split screen of two identical patterns | "same pattern. opposite outcome. why?" |

Same 24 s body, same caption, same audio, same 3 hashtags (#charts #learning #desksetup). Posted as Trial Reels with **Manual** graduation, Tue 14 Oct at 12:00, 13:30 and
15:00 local.

## Step 3: results at 72 h

| Variant | Views | Avg watch (of 24 s) | Sends / 1k | Saves / 1k | Follows |
|---|---|---|---|---|---|
| A | 1,240 | 9.1 s (38%) | 1.6 | 7 | 4 |
| B | 1,090 | 8.0 s (33%) | 0.9 | 5 | 2 |
| C | 2,860 | 15.8 s (66%) | 4.5 | 19 | 21 |

Decision rule from the SKILL: highest sends per 1,000 views with watch ≥ 60% → **C graduates**. A and B are archived (not
deleted; kept for the log).

Learning logged: the question format ("why?") with a visual contrast beats a statement. Topic wasn't the problem; the hook was.

## Step 4: a collab to borrow reach

Juno's best-performing format pairs well with Claudia's "behind the prompt" series. Dana sent one DM to the Claudia team
using `templates/collab-invite.md`. Agreement:

| Item | Agreed |
|---|---|
| Concept | "Two AIs, one lounge, zero plans" — Claudia's lounge loop + Juno's desk cut-ins |
| Owner | Claudia's account posts and invites @juno_charts |
| Paid? | No money or product either way → no `#ad`; both AI-labelled |
| Coins | None mentioned |
| Time | Fri 17 Oct, 17:00 UK |

Result for Juno: +410 followers in 48 h from Claudia's audience; non-follower share on Juno's next three Reels rose to 35%.

## What Dana checked before approving

- [x] AI label on all three trial variants and the collab
- [x] No coin, ticker, price, or return language anywhere
- [x] Only one variant graduated
- [x] Collab accepted in the app before the scheduled time
- [x] Experiment written up in the growth log ([../../growth-experiments/SKILL.md](../../growth-experiments/SKILL.md))
