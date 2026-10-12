# Example: a meme batch for Claudia, week 42

Six ideas from Monday's planning call. Two were killed at the checks, four were made. Budget cap: $1.00 for images.

## The six ideas and the checks

| # | Idea | On | Family | Trend / window | Result |
|---|---|---|---|---|---|
| 1 | "me after my agents ask if I want to 'review anything'" | herself + her agents | caption + reaction | evergreen | **made** |
| 2 | "posting 31 times a week" vs "posting 4 and answering every reply" | a habit | reject / approve | evergreen | **made** |
| 3 | "the shoot plan" vs "the shoot" (foil on the ceiling) | a situation | expectation / reality | evergreen | **made** |
| 4 | "POV: you asked your agent for one post" | a situation | POV (TikTok photo + Reels still) | a POV wording trend, first seen Thu, still rising | **made**, posted Tue |
| 5 | A famous film-still reaction with "when the coin dips" | — | caption + reaction | — | **killed**: owned frame, a real actor's face, and a price joke |
| 6 | Starter pack of "a certain kind of crypto bro" | a group | starter pack | — | **killed**: punches at a group of people; swapped for "studio day starter pack" next week |

Idea 4's wording was looked up before use: harmless origin, used across creator niches, no contested meaning.

## Images (Nano Banana 2.1, 1K, 4 options each)

| Image | Reaction recipe | Refs | Options | Kept |
|---|---|---|---|---|
| side-eye | "looking sideways at the camera without turning her head … holding a coffee cup", white studio, empty top third | 01-front-neutral | 4 | #3 (the mic was missing on #1 and #2) |
| turning away | "turning her head away with one hand raised palm-out … eyes closed", cobalt studio | 08-hand-collar | 4 | #2 |
| pointing | "pointing at something off-frame to the right … a small satisfied smile", cobalt studio | 08-hand-collar | 4 | #4 |
| foil chaos | "standing in a silver-foil set where a sheet of foil has come loose and hangs over her head like a tent, deadpan face", hard flash | 01-front-neutral, 11-flash-foil | 4 | #1 |
| over it | "lying face-down on a white desk next to a laptop, arms limp, the headset mic still on" | 01-front-neutral | 4 | #2 |

Spend: 5 jobs × 4 images × ~$0.034 = about $0.68, plus one 2K re-run of the foil image at ~$0.05: **$0.73**. All five
kept images went into `refs/reactions/` with their prompts in the prompt library.

## Layouts

| Meme | `meme-card.html` layout | Text |
|---|---|---|
| 1 | `caption`, `--cap-h: 22%` | me after my agents ask if I want to "review anything" (11 words) |
| 2 | `panels`, top = turning away, bottom = pointing | "posting 31 times a week" / "posting 4 times and answering every reply" |
| 3 | `panels`, top = a clean foil set (from the reaction bank), bottom = foil chaos | "the shoot plan" / "the shoot" |
| 4 | `caption` at 1080×1920 for TikTok, 1080×1350 for Reels | POV: you asked your agent for one post (image: over it) |

Phone check: meme 2's bottom panel ran to four lines at 56 px; cut to "posting 4 and answering every reply" (6 words).

## Copy, labels, alt text

```text
1  X/Threads: "which one are you this week?"                     alt: AI-generated image: Claudia side-eyeing a laptop, holding a coffee cup. Text: 'me after my agents ask if I want to "review anything"'.
2  Instagram: "the math changed my mind. which one are you?"      alt: AI-generated two-panel image. Top: Claudia turning away, hand raised, text 'posting 31 times a week'. Bottom: Claudia pointing and smiling, text 'posting 4 and answering every reply'.
3  Instagram + X: "every. single. shoot."                         alt: AI-generated two-panel image. Top: a neat silver-foil set, text 'the shoot plan'. Bottom: Claudia under a sheet of loose foil, deadpan, text 'the shoot'.
4  TikTok (in app, AI-generated content on) + Reels: "it was one post. it's now a strategy"   alt on Reels: AI-generated image: Claudia face-down on a desk next to a laptop. Text: 'POV: you asked your agent for one post'.
```

No coins, nothing paid. Hashtags: `#aicharacter` plus 1–2 topic tags per post.

## Cold read

Shown to the community manager with no context. Memes 1, 3 and 4 landed. Meme 2 got "ha, true" and a question about
whether it was a dig at another creator who posts a lot; the caption was changed from "some of you need to hear this"
to "the math changed my mind", which makes it about Claudia's own week.

## Publishing and after

All four went through `social.preview()` → `submit()` → operator approval; meme 4 was posted Tuesday inside the trend
window, the others spread across Wednesday to Friday. Two hours after each post, replies were checked: no misreads.
Meme 4 drew the most follows (TikTok, 61), so "over it" joins the reaction bank's top row for next month. The POV
wording is retired from the account after this one use.
