# Telegram Bot API facts for agent builders

Read this before you build anything that sends more than a few messages a minute, uses buttons, or switches between
long polling and a webhook. Checked 2026-10 against Telegram's own pages (Bot API 10.3, 24 August 2026). Telegram
changes the Bot API several times a year; re-check the changelog at https://core.telegram.org/bots/api before you
rely on a number.

## Rate limits (checked 2026-10)

| Limit | Value | Source |
|---|---|---|
| One chat | avoid more than 1 message per second; short bursts pass, then 429 | Bots FAQ |
| One group | no more than 20 messages per minute | Bots FAQ |
| All chats (broadcast) | about 30 messages per second | Bots FAQ |
| Paid broadcasts | up to 1,000 messages per second with `allow_paid_broadcast`; 0.1 Stars per message above the 30/s; needs 100,000 Stars on the bot's balance and 100,000 monthly active users | Bots FAQ |
| Over a limit | HTTP 429 with `parameters.retry_after`: the seconds to wait before repeating the request | Bot API, ResponseParameters |

An agent never needs paid broadcasts. If you are near 30 a second, you are building a spam cannon or an alert
firehose; summarise instead.

## Message and button sizes

| Field | Limit |
|---|---|
| `sendMessage` text | 1–4096 characters after entities parsing |
| `callback_data` on an inline button | 1–64 bytes |
| `answerCallbackQuery` text | 0–200 characters; `show_alert: true` shows a dialog instead of a toast |
| Deep link `start` parameter | up to 64 characters: `A-Z`, `a-z`, `0-9`, `_`, `-` |

Answer every `callback_query` with `answerCallbackQuery`, even with no text. Otherwise the client shows a progress
indicator, and Telegram watches for bots with too few answers to callback queries.

## Getting updates

- **Long polling:** `getUpdates` with `timeout` in seconds. The default is 0 (short polling); use 25–30. Pass
  `offset` = last `update_id` + 1 to confirm what you processed. `allowed_updates` keeps its previous value when you
  leave it out, so set it explicitly (`["message", "callback_query"]` for a control bot).
- **Webhook:** `setWebhook` with an https URL. `secret_token` (1–256 characters) is sent back in the
  `X-Telegram-Bot-Api-Secret-Token` header on every request; reject requests without it.
- **Not both.** `getUpdates` does not work while a webhook is set. Remove the webhook (`deleteWebhook`) before polling.
- **One reader.** Two programs polling the same bot get HTTP 409 conflicts and steal each other's updates. One bot per
  reading program.
- **Retention.** Telegram keeps unread updates until the bot receives them, and no longer than 24 hours. A control bot
  that was off for two days has lost those messages; that is one reason approvals live in your app, not in chat.

Claudia Local and `templates/owner-bot.mjs` use long polling: no open port, no public URL, nothing to secure on the
inbound side.

## Privacy mode and groups

- On by default for every bot, except a bot added to a group as an admin: admin bots receive all messages.
- With privacy mode on, a bot in a group gets commands meant for it, replies to its own messages, messages sent via the
  bot, and (for `/start`-style general commands) only when it was the last bot to post.
- Every bot receives service messages, all messages in private chats, and messages in channels where it is a member.
- `/setprivacy` → Disable: the bot sees every group message. It must be re-added to the group for that to apply.
- Users can see a bot's privacy setting in the group member list.
- Bots generally cannot see messages from other bots.

## What bots can't do

- Start a conversation. A person must message the bot first (or add it to a group). Mass cold DMs from a bot are not
  possible, and automating a user account to get around that breaks Telegram's terms.
- Hide that they are bots. Bot chats show a "bot" label instead of an online status, and usernames end in `bot`.
- Keep a long history. Telegram's servers may drop older bot messages soon after they are processed; keep your own log.

## Tokens

- A token authorises everything the bot can do. Store it in a key store; send it only to `api.telegram.org`.
- Regenerate with `/token` in @BotFather if it leaks; the old token stops working.
- `@useclaudia/social` dry runs replace the token inside Telegram URLs with `***`.

## How `@useclaudia/social` uses Telegram

| Item | Value |
|---|---|
| Connect | `connect("telegram", { token?, chat: "@channel" \| "-100…", topicId? })`, key name `telegram` |
| CLI | `claudia keys set telegram`, `claudia connect telegram --chat @mychannel`, `claudia post telegram "<text>" --dry-run` |
| Options per post | `options.telegram: { topicId, noPreview, silent }` |
| Text limit | 4096 (caption 1024), up to 10 media items |
| Daily cap | 50 published posts per account per 24 h (`rules.caps.telegram`) |
| Labels | `(AI-generated)` appended (no native AI flag); `Not financial advice.` when a coin is mentioned |
| Inbox | `getUpdates`: messages that mention the bot, reply to it or DM it; 200 reads a day by default |
| Alerts | `claudia keys set telegram-chat` and `claudia watch <coin> --notify telegram`; `--notify-per-minute` default 10 |

## Sources

- https://core.telegram.org/bots (how bots differ from users)
- https://core.telegram.org/bots/features (BotFather commands, privacy mode, deep links, tokens)
- https://core.telegram.org/bots/faq (rate limits, paid broadcasts, webhook vs polling)
- https://core.telegram.org/bots/api (method parameters, limits, changelog)
