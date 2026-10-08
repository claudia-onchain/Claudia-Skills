# Experiment brief — {exp_id}: {short name}

Fill the top half **before** the first post. Fill the read-out after the end date. Keep it to one page.

## Pre-registration

| Field | Value |
|---|---|
| Account / platform | {e.g. Claudia · Instagram Reels} |
| Owner (agent) / approver (person) | {agent} / {name} |
| Backlog row and ICE | {exp-011 · 7/6/8 = 7.0} |
| Variable (exactly one) | {e.g. first 2 seconds: setup shot vs mid-stride} |
| Held constant | {edit, length, sound, caption, hashtags, post hour, AI label, #ad status} |
| Primary metric | {e.g. 3-second hold %} |
| Secondary metrics | {avg % watched, sends per reach, follows per 1,000 views} |
| Guardrails | {unfollows per post ≤ 2x baseline; negative comments ≤ 25%; no platform warnings} |
| Baseline | {value, period, n} |
| Hypothesis | If we change {variable} from {A} to {B} for {format}, then {metric} will move from {baseline} to {target} within {duration}, because {reason}. |
| Design | {Trial Reels pair / YouTube Test & Compare / ABAB / before-after with holdout} |
| Sample size | {result} — command: `node scripts/sigcalc.mjs {…}` |
| Start / end | {dates; end = sample reached or date, whichever first} |
| Interim look | {none / one at 50% with p < 0.005 for early win} |
| Stop rules | {harm stops; void rules; budget stop} |
| Decision rule | {ship B if CI of lift is above 0; tie → keep A; loss → keep A} |
| Budget | {generation $, X API $; approved by} |
| Compliance check | AI label on all variants ☐ · #ad identical ☐ · no coin promotion ☐ · nothing from the "never" list ☐ |

## Read-out

| Field | Value |
|---|---|
| Posts / viewers per variant | {A: …, B: …} |
| Void posts | {ids and reasons} |
| Result | {effect and interval} — command: `node scripts/sigcalc.mjs {…}` |
| Guardrails | {held / breached (which)} |
| Decision | {ship / iterate / kill} |
| What surprised us | {one or two lines} |
| Next test | {the follow-up hypothesis} |
| Re-test date | {6–8 weeks later, for winners} |
