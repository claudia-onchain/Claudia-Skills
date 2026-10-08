# Cadence, caps, costs and pacing

Read this when you set or change how often an account posts, when an autonomous agent proposes its own posts, or when
`preview()` returns `blocked` for a cap, link or duplicate rule. Package limits are from the `@useclaudia/social`
README (checked 8 Oct 2026); platform facts checked 2026-10.

## Package rules that always run (can't be turned off)

| Rule | Default | Change with |
|---|---|---|
| Daily cap (published posts per account, last 24 h) | X 10, LinkedIn 5, YouTube 5, TikTok 5, Facebook 10, Pinterest 10, Farcaster 20, Instagram 20, Threads 25, Bluesky/Mastodon/Nostr 30, Telegram/Discord 50, services 10 | `rules.caps` (lower it; raising it is your responsibility) |
| Link posts per account per 24 h | 5 (X 3, LinkedIn 3) | `rules.linksPerDay` (`{ x: 1, default: 2 }`) |
| Near-duplicates (same text ignoring case, punctuation, links, labels) | blocked for 24 h per account | `rules.duplicateWindowMs` |
| Late schedule | > 10 min overdue → back to approval | `rules.lateAfterMin` |
| AI label, "Not financial advice.", blocked price/return promises, X reply rule, one `$cashtag` per X API post, kill switch | always | — |

## Starting cadence per platform (2026)

These are starting points for a creator account making original content. Adjust by output quality and by data.

| Platform | Posts | Supporting activity | Why |
|---|---|---|---|
| X | 3–5 originals/day; 1 thread 2–3x/week; ≤ 1 link post/day | Replies to your mentions within an hour (approved); quote posts sparingly | Ranking rewards follows and replies a post earns; links cost $0.20 via API and tend to reach fewer people |
| TikTok | 1–2/day (≥ 4/week) | Reply to comments with video replies; LIVE weekly if eligible (18+, ~1,000 followers) | Each video is tested on a fresh audience; consistency trains the account's audience match |
| Instagram | 4–7 Reels/week, 2 carousels/week, Stories daily | Broadcast channel 2–3x/week; Trial Reels for experiments | Reels for reach, carousels for saves, Stories for existing followers |
| YouTube Shorts | 3–7/week | Pin a comment linking a related long video if you have one | Shorts keep earning distribution for days |
| Threads | 1–3/day | Reply in Communities you belong to | Conversation-led; 500 chars + text attachment |
| Telegram channel | 1–3/day, ≥ 3 h apart | One prompt a day in the discussion group | Every post is a push |
| Discord | 2–4 announcements/week | Events weekly | Announcements are pings; keep them rare and useful |
| LinkedIn | 3–5/week | — | Professional audience; weekday daytime |
| Bluesky / Mastodon | 2–5/day | Replies | Chronological feeds reward steady presence |

Quality floor: if you can't make the cadence without lowering quality, cut cadence first. A month at 3 good X posts a
day beats a month at 8 mediocre ones.

## X costs on the pay-per-use API (checked 2026-10)

- $0.015 per post, **$0.20 per post with a link**, $0.01 per reply to a post that mentions you, $0.005 per post read,
  $0.015 per DM. Threads count each part.
- Weekly budget example (Claudia): 28 plain posts ($0.42) + 5 link posts ($1.00) + 2 threads of 4 parts ($0.12) +
  60 replies to mentions ($0.60) ≈ **$2.14 a week**. Inbox reads are extra if you turn them on
  (`inboxBudget: { x: { perDay: 20 } }` ≈ $0.10/day at most).
- A link in any thread part is still a link post ($0.20) and still counts toward the 3-a-day link limit. Put evergreen
  links (site, Telegram, media kit) in the bio or a pinned post and use link posts only for new, specific pages.

## Pacing rules for autonomous agents

An agent that drafts its own posts gets a budget, not a cap:

```json
{
  "x":        { "perDay": 4, "linksPerDay": 1, "minGapMin": 90,  "quietHours": ["01:00", "07:00"], "tz": "America/New_York" },
  "tiktok":   { "perDay": 1, "minGapMin": 360, "quietHours": ["00:00", "09:00"], "tz": "America/New_York" },
  "telegram": { "perDay": 2, "minGapMin": 180, "quietHours": ["22:00", "08:00"], "tz": "Europe/London" },
  "reactiveShare": 0.2,
  "maxSameTopicPerDay": 1,
  "approvalAheadDays": 7,
  "coinOrLaunchAheadHours": 24
}
```

Decision order for each idea the agent has:
1. Is it allowed here? (TikTok: no coins; UK/EU audience: no invitation to buy; X: one cashtag.)
2. Is there budget left today for this network? If not → tomorrow's queue.
3. Is the next free slot outside quiet hours and ≥ `minGapMin` after the last post? If not → next slot.
4. Has the same topic been posted today on this network? If yes → another network or tomorrow.
5. Draft → `preview()` → if `blocked`, rewrite once; if still blocked, drop it and log why.
6. Submit for approval with `scheduleAt` = the chosen slot.

The agent never: posts at the cap "because it can", fills quiet hours, reposts its own content to bump it, or uses
engagement bait to make a slot "work". It never auto-approves its own drafts.

## When a rule blocks a post

| `preview()` says | What to do |
|---|---|
| `blocked: cap` | Move to tomorrow or another network; don't raise the cap mid-day |
| `blocked: links` | Remove the link (bio/pin), or move to tomorrow |
| `blocked: duplicate` | Rewrite for this network; reposting the same text is the issue |
| `blocked: promise` | Remove the price/return language completely; don't rephrase it into a softer promise |
| `blocked: X reply rule` | You tried to reply to a post that doesn't mention you; post an original or quote instead |
| `blocked: kill switch` | Someone stopped publishing on purpose; ask before lifting it |

Sources: `@useclaudia/social` README (Rules and compliance, Costs); X API pricing https://docs.x.com and
https://postproxy.dev/blog/x-api-pricing-2026; X algorithm https://github.com/xai-org/x-algorithm; TikTok LIVE requirements
(socialbu.com, 2026); Threads limits https://about.fb.com/news/2026/06/meta-launching-new-features-500-million-monthly-threads-users.
