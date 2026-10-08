# How X ranks posts in 2026

Read this when planning content for X, diagnosing a drop in reach, or explaining to an operator why a post did or didn't
travel. Checked 2026-10. Sources at the end.

## The system in one paragraph

On 20 January 2026 X published its feed recommendation code at github.com/xai-org/x-algorithm, and on 15 May 2026 pushed its
largest update (187 files, 18,000+ lines). The "For You" feed now runs on a single Grok-1-derived transformer that, for each
viewer and candidate post, predicts the probability of roughly 15 actions and combines them into one score. Candidates come
from accounts the viewer follows (in-network) and from embedding similarity to what they engage with (out-of-network).
Out-of-network reach is what grows an account.

## Signals, strongest first (as described by the repo and 2026 analyses)

| Signal | Direction | What it means for a character account |
|---|---|---|
| Follow from the post (profile visit → follow) | strongly + | Write posts that make people want the next one: series, recurring characters, a clear point of view |
| Reply that the author replies to | strongly + | Ask questions you will answer; answer within the first hour |
| Reply | + | Specific prompts get replies; generic "thoughts?" doesn't |
| Repost / quote | + | Useful, quotable lines; images with a story |
| Dwell time / expand ("Show more") | + | Strong first line, payoff below the fold |
| Video watch (quality views) | + | Captions burned in, hook in the first 2 s |
| Like / bookmark | mild + | Bookmarks signal reference value (lists, how-tos) |
| Link click | mild + | Usually outweighed by lower dwell on link posts |
| "Not interested" / "Show fewer" | strongly − | Off-topic posts to the wrong audience |
| Mute / block | strongly − | Reply-guy behaviour, spammy tags |
| Report | strongly − | Scams, impersonation, harassment |
| Reply thumbs-down (Premium, since Mar 2026) with reasons: not interested, incorrect/misleading, AI-generated, spam | − for that reply | Low-effort AI replies sink in threads |

## The first 15 minutes

Several 2026 analyses of the open code describe a dynamic early threshold: if clicks, dwell and replies don't clear it in
roughly the first 15 minutes, the post is unlikely to enter the broad out-of-network pool. Practical consequences:

- Post when the core audience is online (X: Tue–Wed 09:00–11:00 local is Sprout Social's 2026 best window; your own analytics
  beat that after 4–6 weeks).
- Have the operator (or the agent, for mentions only) ready to answer replies in that window.
- Don't stack posts: two posts 10 minutes apart compete for the same early audience. Space originals ≥ 90 minutes.

## What hurts reach

- Links in the body (lower dwell, and $0.20 per API post). Put links in the last thread part.
- Hashtag piles. Zero or one relevant hashtag; X search and Grok topic understanding work from the text.
- Repeated or templated text. Near-duplicates look automated and are blocked by the Claudia package for 24 h.
- Tagging many accounts. Mention people only when the post is genuinely about them.
- Posting in bursts and then going silent for days. Consistency matters for the follower pool.

## Topic understanding and Custom Timelines

Grok classifies posts by topic. Custom Timelines (2026) let users follow topics rather than accounts, which replaced part of
what Communities did. A character that stays in 3–4 clear pillars is easier to classify and surface. Drifting across
unrelated topics dilutes this.

## Metrics that map to the signals

- Follows per 1,000 impressions (profile visits as a proxy if follows per post aren't shown).
- Reply rate: replies ÷ impressions × 1,000; and author-reply rate: share of replies the character answered.
- Engagement rate is still useful but don't optimise likes alone.
- Negative feedback: watch for drops after a type of post; X doesn't show "not interested" counts, so watch follower churn.

## Sources

- github.com/xai-org/x-algorithm — the published code (checked 2026-10).
- https://ppc.land/xs-algorithm-source-code-drops-what-it-reveals-about-the-platforms-feed-mechanics/
- https://socialpilot.co/blog/twitter-algorithm
- https://opentweet.io/blog/how-twitter-x-algorithm-works-2026
- https://sproutsocial.com/insights/best-times-to-post-on-social-media/ (2026 data, Nov 2025–Feb 2026)
- https://www.engadget.com/social-media/x-is-shutting-down-its-communities-feature-182843958.html (Communities, Custom Timelines)

Analyses of open code are interpretations; treat weights as directional, not exact.
