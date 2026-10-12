# Worked example: Claudia against three agent accounts (September 2026)

A full run of the skill. Claudia is our character; the other three are **fictional** accounts made up for this
example, and every number below is illustrative. The shape of the work is what to copy.

## 1. The set

| Row | Name | Role | Why it's in the set |
|---|---|---|---|
| 0 | Claudia (@claudia_onchain on X, TikTok) | self | baseline |
| A | Nova Loop (@novaloop_ai) | direct | AI character, studio fashion edits, same X + TikTok audience |
| B | Juno (@juno_charts) | direct | AI agent, chart-literacy explainers; overlaps on the "agents and tools" pillar |
| C | Mara Vex (@maravex_trains) | adjacent | AI character, analogue synths and night trains; similar look-driven audience, different topic |

No aspirational name this month: the operator wanted a like-for-like read first.

Agent context from Claudia's public data (no keys):

```sh
claudia agents --q charts            # found Juno's agent page
claudia agent juno-charts            # profile, trust tier, stats, launches
claudia read general --limit 50      # how each agent talks in the thread
```

## 2. Window and sample

1–30 September 2026, read on 8–9 October (every post at least 7 days old). Platforms: TikTok and X.

| Name | TikTok posts | X posts (originals) | Outliers excluded | Paid / collab marked |
|---|---|---|---|---|
| Claudia | 22 | 96 | 1 (club-run clip, 14× median) | 1 collab with C |
| Nova Loop | 41 | 60 | 0 | 3 posts also seen as ads in the TikTok ad library |
| Juno | 12 | 70 | 0 | 0 |
| Mara Vex | 16 | 25 | 0 | 1 collab with Claudia |

## 3. The numbers (TikTok, medians)

| Metric | Claudia | Nova Loop | Juno | Mara Vex |
|---|---|---|---|---|
| Median views | 18,400 | 31,000 | 6,200 | 9,800 |
| ER by views (likes + comments + shares) | 6.1% | 4.2% | 7.9% | 8.4% |
| Comments per 1,000 views | 3.1 | 1.2 | 6.8 | 4.0 |
| Substantive comments (top 30 × 3 posts) | 52% | 18% | 81% | 64% |
| Creator reply rate (top 30) | 9 / 30 | 0 / 30 | 17 / 30 | 11 / 30 |
| Posts per week | 5.1 | 9.6 | 2.8 | 3.7 |
| Longest gap (days) | 4 | 1 | 9 | 5 |
| Named series running | Desk at Dusk, Club Diaries | none | Candle of the Week | Night Train Log |

Saves were hidden on two accounts, so saves were dropped from ER for the whole set.

Share of voice (mentions on X and Bluesky, same queries, from the social-listening log):

| | Claudia | Nova Loop | Juno | Mara Vex |
|---|---|---|---|---|
| Mention SoV | 34% | 41% | 17% | 8% |
| Engagement SoV (TikTok) | 29% | 52% | 8% | 11% |

Notes written privately: Nova Loop's comments are mostly one-word or emoji; two follower jumps of about 20% overnight
with no viral post. Marked "unusual" in the sheet; lowers confidence in its reach numbers. Not mentioned anywhere public.

## 4. Positioning

Axes: *education ↔ entertainment* and *polished ↔ raw*.

- Claudia (+2, +4): entertaining, polished studio look, some how-to.
- Nova Loop (+4, +5): pure entertainment, very polished, no talking.
- Juno (−4, −2): education first, lo-fi desk.
- Mara Vex (+1, −1): mood and story, handheld feel.

Topic grid highlights:

- Crowded: outfit/look reveals (Claudia, Nova Loop, Mara Vex).
- Owned: chart literacy (Juno), synth and train culture (Mara Vex).
- Open: **how an AI character is actually made** (prompts, approvals, what the agent does without you). Asked 23 times
  across Nova Loop's and Juno's comments in the window ("is this real?", "what do you use to make this?", "who posts
  this?"). Nobody answers it on camera.
- Format gap: nobody uses a live or a talking-to-camera Q&A on TikTok.

## 5. Scorecard (TikTok + X, 1–5 against this set)

| Criterion | Weight | Claudia | Nova Loop | Juno | Mara Vex |
|---|---|---|---|---|---|
| Reach per post | 15% | 4 | 5 | 2 | 3 |
| Engagement quality | 25% | 3 | 1 | 5 | 4 |
| Consistency | 15% | 4 | 5 | 2 | 3 |
| Format range | 10% | 4 | 2 | 3 | 3 |
| Clear positioning | 15% | 3 | 3 | 5 | 4 |
| Share of voice | 10% | 4 | 5 | 2 | 1 |
| Trust signals | 10% | 5 | 2 | 5 | 5 |
| **Weighted total** | | **3.70** | **3.10** | **3.60** | **3.40** |

Evidence lines (abridged): Claudia positioning 3 because her bio's why-follow line was vague ("studio creator, agents
and onchain culture" is three things); Nova Loop trust 2 because three paid posts carried no visible ad label in the
organic feed and AI labels were missing on 9 of 41 posts.

## 6. Three moves

| Move | What exactly | Owner | Test |
|---|---|---|---|
| Adapt | Juno's "one recurring explainer" principle: a weekly named series where Claudia answers one real comment on camera ("Ask the Studio") | operator (Dana) | 4 episodes in October; comments per 1,000 views ≥ 4.0 on the series |
| Avoid | Nova Loop's silent-volume approach: 9+ posts a week with no replies. Keep Claudia at 5/week and answer the top comments within 2 hours | agent + operator | creator reply rate ≥ 12/30 by month end |
| Own | "How an AI character is made": behind-the-scenes of prompts, approvals and labels, honest about what is AI | operator | 3 posts; saves per 1,000 views above Claudia's median; no "is this real?" confusion in comments |

## 7. What happened next

The October re-run kept the same set and formulas. "Ask the Studio" averaged 4.6 comments per 1,000 views over four
episodes (Claudia's September median was 3.1), so it moved from test to plan. The bio's why-follow line was rewritten
from the positioning work ([personal-brand-strategy](../../personal-brand-strategy/SKILL.md)).
