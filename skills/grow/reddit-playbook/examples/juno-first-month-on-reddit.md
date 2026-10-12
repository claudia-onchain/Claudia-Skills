# Example: Juno's first month on Reddit

Juno is a fictional AI agent (@juno_charts on X) that makes chart-literacy explainers. It is run by Dana (they/them).
Goal: get Juno's weekly "read a chart in 5 minutes" newsletter in front of people who would actually want it, without
a single removed-for-spam post. Dana posts everything by hand from their own account, u/dana_builds.

## Day 1: profile and the automation question

- Bio: `I run Juno, an AI character that explains charts (AI-generated images and posts). Here as a human, answering
  by hand. Education only, never advice.`
- Dana's first idea was a script that answers "how do I read this chart?" questions automatically. Step 2 rules it out:
  unsolicited automated replies are a Rule 8 problem, the public API is closing to new requests on 31 October 2026, and
  the account would get an "App" label. Juno drafts explanations in a private doc; Dana decides whether to post one.

## Days 1–3: research (templates/subreddit-research.csv)

Dana looked at nine candidate subreddits and kept four. Rows below are illustrative names, not real communities:

| Subreddit | Fit | Self-promo rule (quoted) | AI rule (quoted) | Decision |
|---|---|---|---|---|
| r/ChartBasics | 5 | "Self-promotion only in the Saturday thread." | "AI images must be flaired AI." | keep, promo Saturdays only |
| r/DataVizHelp | 4 | "Follow the 10% guideline. Disclose your own links." | none stated | keep |
| r/LearnMarkets | 4 | "No newsletters, no blogs, no exceptions." | none stated | keep for helping only, never promote |
| r/NewsletterSwap | 3 | "Swap requests in the weekly thread." | none stated | keep, for swaps |
| r/DigitalArt (example) | 1 | — | "No AI-generated art." | avoid |
| four crypto trading subs | 2 | "No projects, no tokens, no bots." | — | avoid |

## Weeks 1–2: helping only

Dana answered 23 questions across the three main subreddits. Typical comment (template 4):

> A log scale shows percentage moves as equal distances, so a move from 10 to 20 looks the same as 100 to 200. Use it
> for anything that has grown more than about 10x over the window, or the early part of the chart flattens to a line.

No links, no mention of Juno. Two answers became the top comment on their thread. One comment was removed by
AutoModerator in r/DataVizHelp ("accounts under 7 days can't comment"); Dana waited, did not repost.

## Week 3: first disclosed post

In r/DataVizHelp (which allows it at 10%), Dana posted a text guide (template 2):

```text
Title: The 4 things I check before trusting any chart someone posts (with examples)

I've been writing short chart explainers for a year and kept seeing the same four tricks...
1. Axis start: ...
2. Scale: ...
3. Window: ...
4. Source: ...
What didn't work: annotating everything. People skipped the wall of labels.

Disclosure: I run Juno, an AI character that writes a weekly chart explainer; the example images here are
AI-generated. Full write-up with the images: <link with utm_source=reddit&utm_campaign=datavizhelp>
```

Result: 412 upvotes, 61 comments (Dana answered 44 in the first two hours), 37 newsletter sign-ups from the UTM link.
The ratio column for r/DataVizHelp went to 1 promo in 11 contributions.

## Week 4: thread-only promotion and a swap

- r/ChartBasics Saturday thread: one entry (template 5), 9 sign-ups.
- r/NewsletterSwap weekly thread: one swap request; agreed a recommendation swap with a data-journalism newsletter
  (see [../../newsletter-growth/templates/cross-promo-swap.md](../../newsletter-growth/templates/cross-promo-swap.md)).
- r/LearnMarkets: helping only, as its rule says. Dana declined a commenter's request to "DM me your newsletter", and
  replied publicly: "It's in my profile if you want it; the rules here say no newsletter links."

## Monday review, end of month

| Subreddit | Helpful | Promo | Removed | Sign-ups | Next month |
|---|---|---|---|---|---|
| r/DataVizHelp | 12 | 1 | 1 (age filter) | 37 | one more guide in 3 weeks |
| r/ChartBasics | 7 | 1 (thread) | 0 | 9 | keep Saturday thread entries |
| r/LearnMarkets | 6 | 0 | 0 | 0 | helping only |
| r/NewsletterSwap | 1 | 1 (thread) | 0 | 14 (from swap) | one swap a month |

What Dana would change: start helping in the swap subreddit earlier, and ask the r/ChartBasics mods about a monthly
"ask me about reading charts" post (template 6) instead of only the Saturday thread.
