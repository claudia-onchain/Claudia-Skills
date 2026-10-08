# Telegram reference for agent communities

Read this when you are choosing between a channel, a group and a bot, setting admin rights, hitting rate limits, or
looking at paid options. Facts checked 2026-10; Telegram changes features often, so confirm in the app before you
promise anything to members.

## Building blocks

| Thing | What it is | Size | Good for |
|---|---|---|---|
| **Channel** | One-to-many feed. Only admins post. Subscribers get a push. | Unlimited subscribers | Announcements, drops, recaps |
| **Discussion group** | A group linked to a channel; each channel post gets a comment thread there | Up to 200,000 members | Comments under posts, light chat |
| **Group (supergroup)** | Many-to-many chat; optional **Topics** turn it into a forum | Up to 200,000 members | Support, creator chat, office hours |
| **Bot** | An account driven by the Bot API; can be admin of a channel or group | — | Posting for the agent, answering mentions |

A bot cannot start a conversation with a person who has never pressed Start on it. That is a feature: it makes mass
cold DMs impossible from a bot, and you should not try to work around it with user accounts ("userbots").

## Channel setup checklist

- Public link (`t.me/<handle>`), 5–32 characters, letters/digits/underscore. Match your X handle where you can.
- Description (255 characters): what it is, cadence, "AI character, run by a small team", official links.
- **Sign messages**: shows the admin's name on posts. Useful when both the agent bot and humans post.
- **Reactions**: pick a short set (e.g. 3–5 emoji) instead of "all"; easier to read sentiment.
- **Discussion**: link the discussion group. Without it there are no comments.
- **Content protection** (Restrict saving content) only if you post paid material; it also blocks forwards, which hurts reach.
- Channel boosts unlock custom colours, emoji status and Stories posting for the channel; ask members, never pay for boosts.

## Group setup checklist

- **Permissions** for members: Send messages on; Send media on (or off during raids); Add members **off**; Pin off;
  Change info off; Manage topics off.
- **Slow mode**: 10 s, 30 s, 1 min, 5 min, 15 min or 1 h between messages per member. 30 s is a good default for a
  growing group; 1–5 min during a launch or raid.
- **Topics**: Group settings → Topics. Each topic has its own thread and can be closed. Suggested set: `General`,
  `Help`, `Creators`, `Feedback`, `Off-topic`. Bots post into a topic with `message_thread_id` (`topicId` in Claudia).
- **Aggressive anti-spam**: available to groups with 200+ members (Administrators → Aggressive Anti-Spam). Telegram's
  own filter deletes suspicious messages and restricts the sender. Turn it on as soon as you qualify.
- **Join requests**: invite links can require admin approval. Use it for private creator groups; the approver checks the
  profile (new account + no photo + crypto name = likely spam).
- **Hidden members list** (for groups 100+): stops scrapers harvesting your members for spam DMs.

## Admin rights (least privilege)

| Right | Owner | Moderator | Agent bot (channel) | Agent bot (group, answering) |
|---|---|---|---|---|
| Post / send messages | yes | yes | **yes** | **yes** |
| Edit messages of others | yes | no | no | no |
| Delete messages | yes | yes | no | optional (own only) |
| Ban users | yes | yes | no | no |
| Invite users via link | yes | yes | no | no |
| Pin messages | yes | yes | no | no |
| Manage topics | yes | yes | no | no |
| Manage voice chats / live | yes | yes | no | no |
| Add new admins | yes | **no** | **no** | **no** |
| Remain anonymous | optional | no | no | no |

## Bot privacy mode

By default a bot in a group sees only commands (`/help`), messages that @mention it and replies to its own messages.
Keep it that way. `@useclaudia/social` inbox reads exactly those (`getUpdates`: mentions, replies, DMs to the bot). If you
turn privacy mode off with @BotFather (`/setprivacy`), the bot sees every message, which you then have to tell members
about and protect.

## Bot API limits (checked 2026-10)

- About **30 messages per second** across all chats for one bot.
- About **1 message per second** to the same chat.
- About **20 messages per minute** to the same group; the same limit applies to channels.
- Over the limit you get HTTP 429 with `retry_after` seconds. `@useclaudia/social` surfaces it as `rate_limited` with
  `retryAfterMs` and does not retry posts on its own.
- Text messages up to 4,096 characters; media captions up to 1,024; up to 10 items in an album.
- Sources: https://core.telegram.org/bots/api, https://core.telegram.org/bots/faq#my-bot-is-hitting-limits-how-do-i-avoid-this,
  grammY flood-limit guide https://grammy.dev/advanced/flood.

For a community these limits never bind if you post like a person (1–5 posts a day). They bind when someone builds an
alert firehose, which is another reason to keep alerts in their own channel and summarised.

## Telegram's native anti-spam

Telegram documents its group anti-spam at https://core.telegram.org/api/antispam (the "aggressive" mode and the
`antispam` admin log entries). Deleted false positives show in the admin log with a "Not spam" action; check it weekly so
real members are not silently filtered.

## Paid options (describe, don't promise income)

- **Telegram Ad Platform** revenue share: public channels with 1,000+ subscribers can receive 50% of ad revenue shown in
  the channel, paid out in Toncoin (TON) (checked 2026-10). Ads are chosen by Telegram; you cannot vet each one, so
  consider whether random crypto ads fit your audience and your compliance stance.
- **Paid posts / paid media with Stars**: a post or media item unlocks for a Stars price. Telegram keeps a cut.
- **Star subscriptions**: a paid invite link to a private channel or group, billed monthly in Stars.
- Paid content that relates to coins is still financial promotion territory; see
  [crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md).
- Sources: https://telegram.org/blog (feature announcements), https://ads.telegram.org, https://telegram.org/tos/stars.

## What not to do on Telegram

- Userbots (automating a normal user account) to DM, add people to groups or scrape members: against Telegram's ToS and
  the fastest way to get the account frozen.
- Adding people to your group without consent ("mass add"); members can report and Telegram limits the account.
- Buying subscribers or "views" packages: inflated numbers kill Ad Platform eligibility and any sponsor trust.
- Posting the same message into dozens of other groups ("cross-group shilling").
