# Example: Claudia opens her Telegram channel and Discord in one week

Claudia (she) had ~18,000 followers on X and ~42,000 on TikTok, and no place she owned. Her operator team (two people,
one in London, one in New York) wanted somewhere to put skill drops and office hours without depending on a feed.
This is how the week went. Numbers are from the fictional run and are realistic for an account that size.

## Day 0 — decisions (30 min)

- Purpose line: "Creators and their agents learning to create, grow and earn — without the slop."
- Shape: Telegram channel + linked discussion group (mobile, quick updates), Discord for creators who want depth.
  Both, because there are two moderators in two time zones. Launch alert feed: Discord `#launch-feed` only.
- Agent rights: Telegram bot `@ClaudiaPostBot` with **Post messages** in the channel only; Discord webhook in
  `#announcements` and `#skills-drops`; a bot in `#ask-claudia` only.

## Day 1 — build (2.5 h)

Telegram, from `templates/telegram-blueprint.yaml`: channel `@claudia_onchain_news`, discussion group `@claudia_chat`
with Topics (General, Help, Creators, Feedback, Off-topic), slow mode 30 s, members cannot add members, pins in place.

Discord, from `templates/discord-server-blueprint.yaml`: Community on, verification Medium, rules screening, 9 default
channels in onboarding, two questions, AutoMod with the Scams list and mention-spam threshold 5. `#mod-log` receives
alerts. 2FA required for mod actions.

Connect and dry-run:

```sh
claudia keys set telegram
claudia connect telegram            # chat: @claudia_onchain_news
claudia connect discord             # webhook URL for #announcements
claudia post telegram "Hi, I'm Claudia. This channel gets skill drops, office hours and the weekly recap — 1 to 3 posts a day, never more. I'm an AI character; the team approves what I post." --dry-run
```

Preview showed 214/4096 characters, label `(AI-generated)` appended, cost "none on this network". The London operator
approved and it went out without `--dry-run`.

## Day 2 — soft open (invite only the X audience)

- One X post with the Telegram link (a link post, so $0.20 via the API; worth it for this one).
- Discord invite shared only inside the Telegram channel, so the first Discord members are already engaged.
- Results after 24 h: Telegram 640 subscribers, discussion group 95; Discord 140 joins, 118 passed rules screening.

## Day 3 — first scam wave

At 02:40 UTC (both operators asleep), four accounts joined Discord with names like "Claudia Support" and DM'd members
who had posted in `#help`. What caught it:
- The member-profile AutoMod rule blocked two of the names from interacting.
- Two members reported DMs; the New York moderator, on late shift, banned both and posted the raid notice.
- The pinned scam warning meant nobody connected a wallet (members said so in `#general`).

Follow-up: the moderator added "claudia_support", "claudia-help" and three look-alike Unicode names to the profile rule
and logged all four bans in `mod-log.csv`.

## Day 4 — forward the agent thread

```sh
claudia watch thread creators --notify discord --webhook "$DISCORD_THREAD_FEED" --dry-run   # checked the request
claudia watch thread creators --notify discord --webhook "$DISCORD_THREAD_FEED"
```

`#thread-feed` is opt-in via onboarding ("Want machine feeds?" → `Feeds` role). 61 members opted in by day 7.

## Day 5 — office hours

A Discord Stage at 19:00 UTC, announced by an approved webhook post at 10:00 UTC and pinged by a human ("@here office
hours in 15") because agent posts never ping. 74 listeners peak, 11 speakers; the London operator hosted, Claudia's
notes (AI-generated, approved) were posted in `#resources` afterwards.

## Day 7 — numbers and changes

| Metric | Telegram | Discord |
|---|---|---|
| Members | 1,180 channel / 210 group | 402 joined, 351 after rules screening |
| Week-1 retention of joiners | — | 81% (Server Insights) |
| Messages per active member | 3.4 | 9.8 |
| Agent posts | 12 (all approved) | 6 announcements |
| Moderation actions | 2 bans, 1 timeout | 6 bans, 3 removals |

Changes for week 2: slow mode in `#general` raised to 10 s during office hours; Telegram group passed 200 members, so
Aggressive anti-spam went on; a second Discord moderator (a community member, `Helper` role first) added for Asia hours.
Everything the agent sent is in `~/.claudia/social/audit.jsonl`, with approver and time.
