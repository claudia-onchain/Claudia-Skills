# Example: Juno's first 30 days on X

Juno is a fictional AI agent (@juno_charts) that makes chart-literacy explainers and lo-fi desk vlogs. It is run by Dana
(they/them), who approves every post from their phone. Juno starts at 0 followers with a $10/month API budget.

## Day 0: setup (45 minutes)

1. Account created by Dana with their email and phone; 2FA on.
2. Bio: `AI agent explaining charts in plain words. Education only, never advice. Run by @dana_builds. AI-generated posts.`
3. Automated label → managing account @dana_builds.
4. Header: a 1500×500 desk scene with a candlestick chart on a monitor; avatar: Juno's logo face. Both labelled AI in the bio.
5. Developer app: pay-per-use, OAuth 2.0 Native App, callback `http://127.0.0.1:3939/oauth/callback`, spend limit $10.

```sh
claudia keys set x
claudia connect x
claudia post x "Hi, I'm Juno, an AI agent. I explain charts in plain words: what a candle means, what volume tells you, what it can't tell you. Education only." --dry-run
```

## Budget math

Dana's cap: $10/month. Juno's plan:
- 2 originals a day × 30 = 60 × $0.015 = $0.90
- 1 link post a week (Sunday recap) × 4 = $0.80
- 20 mention reads a day × 30 = 600 × $0.005 = $3.00
- ≈ 6 replies a day × 30 = 180 × $0.01 = $1.80
- Total ≈ $6.50, leaving headroom.

## Content rules Juno follows

- Explain concepts with generic or historical charts; never a live ticker with a direction.
- Every post that mentions a coin or price gets "Not financial advice." (the package adds it).
- No "where is this going?" polls on live coins: that invites predictions.
- UK and EU followers are common in this niche, so no coin promotion of any kind (../../crypto-marketing-compliance/SKILL.md).

## What happened

| Week | Posts | Impressions | Followers | Best post |
|---|---|---|---|---|
| 1 | 14 | 3,100 | 41 | "A long wick isn't a signal. It's a story about one minute. Here's how to read it." (image) |
| 2 | 15 | 9,800 | 196 | Thread: "5 things volume can't tell you" — quoted by a larger education account |
| 3 | 14 | 22,400 | 610 | 12 s desk vlog: "Rebuilding my watchlist from scratch" |
| 4 | 15 | 31,000 | 1,050 | "Chart literacy in 1 image: the 4 parts of a candle" (bookmarked 900+ times) |

Spend over the month: $5.84.

## The moment it almost went wrong

In week 3 a large account posted a popular chart and Juno's draft loop suggested replying to it. The package refused:
`blocked — X reply rule: the post doesn't mention or quote this account`. Dana instead approved a quote post with Juno's
own explanation, which is allowed and brought 80 follows. Lesson: the agent never chases big accounts' replies; it adds a
view on its own timeline.

## What Dana changed after day 30

- Added a second daily slot at 20:00 UTC after analytics showed half the audience in Europe.
- Moved the Sunday link from a standalone post into the recap thread's last part.
- Started an XChat group (joinable link in the pinned post) for followers who want weekly Q&A, with rules pinned and no
  automated DMs.
