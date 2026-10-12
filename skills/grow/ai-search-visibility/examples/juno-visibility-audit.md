# Worked example: Juno's first AI visibility audit

Juno is a fictional AI agent (@juno_charts) that makes chart-literacy explainers. It is run by Dana (they/them), who
also owns the site `juno-charts.example`. All results below are illustrative; the method is what to copy.

## Month 0: the baseline

Dana wrote 24 prompts and ran each three times in five assistants (ChatGPT with search, Claude with web search,
Gemini, Perplexity, Copilot): 360 runs, about 3 hours over two evenings, by hand.

| Group | Prompts | Mentioned | Cited with link (when mentioned) | Facts correct (when mentioned) |
|---|---|---|---|---|
| Brand ("what is Juno charts?", "who runs @juno_charts?") | 5 | 61% | 22% | 48% |
| Category ("accounts that explain crypto charts for beginners") | 7 | 4% | 0% | n/a |
| Problem ("what does a long wick on a candle mean?") | 9 | 0% | 0% | n/a |
| Comparison ("Juno charts vs <another explainer account>") | 3 | 33% | 10% | 40% |

Wrong facts that came up more than once:

- "Juno is a trading signals service" (9 runs). Source found: an old directory listing that put Juno under "signals".
- "Juno was created by a company called Juno Labs" (6 runs). Source: a different, unrelated company with a similar name.
- Launch year off by one (5 runs). Source: Juno's own Telegram description, never updated.

## The fixes (one weekend, then ongoing)

1. **Crawler access.** robots.txt was fine, but the CDN had "block AI crawlers" switched on, which also blocked
   `OAI-SearchBot`, `Claude-SearchBot` and `PerplexityBot`. Dana turned it off and used the robots.txt template instead:
   search crawlers allowed, training crawlers allowed (Dana's choice; education content they want widely read).
2. **Facts page.** New `/about` with the first sentence: "Juno is an AI agent that explains charts in plain words,
   for education only; it does not give trading signals or financial advice. It is run by Dana and started in March
   2026." Added a "What Juno is not" section naming the confusions: not a signals service, not affiliated with any
   company called Juno Labs.
3. **Consistency pass.** Same first sentence in the X bio (shortened), TikTok, YouTube, Telegram description, the
   agent's page on useclaudia.xyz, and the GitHub README of Juno's chart-reading tool. Asked the directory to move the
   listing from "signals" to "education"; they did in 9 days.
4. **Quotable pages.** Rewrote the 10 most-viewed explainers answer-first: "A long wick means price went far in one
   direction and came back before the candle closed." Each page got an updated date, a named owner and the text in
   HTML (the old versions were mostly images of charts with captions inside the image).
5. **Organization JSON-LD** with `sameAs` links to the five official profiles.
6. **llms.txt** with six links. Took ten minutes; Dana doesn't expect it to move anything in assistants.
7. **Mentions.** Dana answered beginner chart questions in two communities under the Juno account, labelled as an AI
   agent and within each community's self-promotion rules, and was interviewed on one newsletter. No paid placements.

## Months 1–3

| Month | Brand mentioned | Brand facts correct | Category mentioned | Problem prompts: cited with link |
|---|---|---|---|---|
| 0 | 61% | 48% | 4% | 0% |
| 1 | 64% | 63% | 4% | 3% |
| 2 | 70% | 81% | 10% | 9% |
| 3 | 73% | 86% | 14% | 15% |

Platform reports by month 3: Search Console's Generative AI performance report showed AI Overview impressions on 4
explainer pages; Bing's AI Performance report showed 31 citations, mostly the wick and volume explainers; site
analytics showed 140 visits from `utm_source=chatgpt.com` and 60 from perplexity.ai.

## What Dana wrote in the month-3 summary

```text
AI visibility · December 2026 · 24 prompts × 5 assistants × 3 runs
Mentioned 73% brand / 14% category (prev 70% / 10%) · Cited with link 15% on problem prompts (prev 9%)
Facts correct 86% (prev 81%)
Top wrong fact: "Juno gives trading signals" — now 2 runs of 75 (was 9) — source: old directory listing, fixed
We can't control which accounts assistants recommend. What moved: clear explainers they can quote, and one consistent
description everywhere.
```

The "signals" confusion mattered most. An assistant calling an education account a signals service is a compliance
risk for the operator, so it was fixed first ([crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md)).
