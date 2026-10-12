# Discord API facts for agent bots

Read this when you set permissions, intents, commands or retry logic, or when a number in the skill looks wrong. Every
row was checked against Discord's developer docs in October 2026 (checked 2026-10). Discord changes limits; re-check the
linked page before you rely on a number in production.

## Webhooks

| Fact | Value | Source |
|---|---|---|
| Message content | up to 2,000 characters | docs.discord.com/developers/resources/webhook (Execute Webhook) |
| Embeds | up to 10 per message | same |
| Forum or media channel | `thread_name` creates a new post | same |
| Per-message overrides | `username`, `avatar_url`, `allowed_mentions` | same |
| Confirmation | `?wait=true` returns the created message | same |
| Webhook names | can't contain "clyde" or "discord" (at creation) | same (Create Webhook) |
| A webhook that returns 404 | was deleted; don't reuse it | docs.discord.com/developers/topics/rate-limits |

## OAuth2 invite

| Fact | Value | Source |
|---|---|---|
| Bot invite | `https://discord.com/oauth2/authorize?client_id=<app-id>&scope=bot&permissions=<int>` | docs.discord.com/developers/topics/oauth2 |
| `applications.commands` | included by default with the `bot` scope | same |
| Public Bot off | only you can add the bot to servers | same |
| Require code grant | anyone adding the bot must complete the full code grant | same |

## Permission bits

| Permission | Bit | Decimal |
|---|---|---|
| ADMINISTRATOR | `1 << 3` | 8 |
| VIEW_CHANNEL | `1 << 10` | 1024 |
| SEND_MESSAGES | `1 << 11` | 2048 |
| EMBED_LINKS | `1 << 14` | 16384 |
| ATTACH_FILES | `1 << 15` | 32768 |
| READ_MESSAGE_HISTORY | `1 << 16` | 65536 |
| MENTION_EVERYONE | `1 << 17` | 131072 |
| MANAGE_WEBHOOKS | `1 << 29` | 536870912 |
| USE_APPLICATION_COMMANDS | `1 << 31` | 2147483648 |
| SEND_MESSAGES_IN_THREADS | `1 << 38` | 274877906944 |

Agent default: 1024 + 2048 + 16384 + 32768 + 65536 = **117760**. With forum threads: **274878024704**.
Source: docs.discord.com/developers/topics/permissions.

## Gateway and intents

| Fact | Value | Source |
|---|---|---|
| Privileged intents | `GUILD_PRESENCES`, `GUILD_MEMBERS`, `MESSAGE_CONTENT` | docs.discord.com/developers/events/gateway |
| Content still visible without `MESSAGE_CONTENT` | the app's own messages, DMs with the app, messages that mention the app, the target of a message context-menu command | same |
| Turning intents on | apps under 10,000 users toggle them in the portal; above that, a review | same |
| Verified apps | in 100+ servers, privileged intents need approval | same |
| Gateway send limit | 120 events per connection per 60 s; over it you are disconnected | same |
| IDENTIFY limit | 1,000 per 24 h across shards; over it all sessions end and the token is reset | same |

## Application commands

| Fact | Value | Source |
|---|---|---|
| Registration | HTTP only: global `POST /applications/{app}/commands`, guild `POST /applications/{app}/guilds/{guild}/commands`; same name overwrites | docs.discord.com/developers/interactions/application-commands |
| Bulk overwrite | `PUT` on the same paths with the full list | same |
| Global commands per app | 100 `CHAT_INPUT`, 15 `USER`, 15 `MESSAGE` | same |
| Guild commands | the same counts per server | same |
| Create rate | 200 command creates per day per server | same |
| Names | 1–32 characters, lowercase where a lowercase exists | same |
| Descriptions | 1–100 characters | same |
| `default_member_permissions: "0"` | only admins and explicit overrides can use the command | same |
| Updates | guild commands are instant; global commands reload when a stale one is used | same |

API base used in the templates: `https://discord.com/api/v10`, header `Authorization: Bot <your-bot-token>`.

## Interactions

| Fact | Value | Source |
|---|---|---|
| Delivery | Gateway (default) or an Interactions Endpoint URL; mutually exclusive | docs.discord.com/developers/interactions/overview |
| Endpoint security | verify `X-Signature-Ed25519` over `X-Signature-Timestamp` + raw body; 401 on failure | same |
| Liveness check | `PING` (type 1) must get `PONG` (type 1) with 200 | same |
| Tests | Discord sends deliberately invalid signatures; failing removes the URL | same |
| First response | within 3 seconds, or the token is invalidated | docs.discord.com/developers/interactions/receiving-and-responding |
| Interaction token | valid 15 minutes for follow-ups and edits | same |
| Deferred reply | callback type 5 (`DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE`) | same |
| Ephemeral | message flag `1 << 6` (64) | same |
| Follow-ups | `POST /webhooks/{app}/{interaction token}` | same |

Callback types used in the template: 1 PONG, 4 message, 5 deferred message, 7 update the clicked message.

## Buttons

| Fact | Value | Source |
|---|---|---|
| Component types | 1 action row, 2 button | docs.discord.com/developers/components/reference |
| Button styles | Primary 1, Secondary 2, Success 3, Danger 4, Link 5, Premium 6 | same |
| Per row | up to 5 buttons | same |
| `custom_id` | 1–100 characters | same |

## Rate limits

| Fact | Value | Source |
|---|---|---|
| Global | 50 requests per second per bot | docs.discord.com/developers/topics/rate-limits |
| Interaction responses | not bound by the global limit | same |
| Per-route headers | `X-RateLimit-Limit`, `-Remaining`, `-Reset`, `-Reset-After`, `-Bucket`; on 429 also `-Global`, `-Scope` | same |
| 429 body | `retry_after` = seconds to wait; or use the `Retry-After` header | same |
| Invalid requests | 10,000 responses of 401, 403 or 429 in 10 minutes → temporary IP restriction | same |
| Webhooks | limited per webhook id (and token), separate from other routes | same |

## What `@useclaudia/social` does on Discord

| Behaviour | Value |
|---|---|
| Connect a webhook | `social.connect("discord", { webhookUrl })`, or `claudia connect discord --webhook-url <url>` |
| Connect a bot | `social.connect("discord", { token, channelId })` |
| Forum webhook | `forum: "1"` |
| Inbox and replies | bot only (webhooks can't read); bot needs Message Content for channel reads |
| Mentions | always `allowed_mentions: { parse: [] }` |
| AI label | `(AI-generated)` appended (no native flag on Discord) |
| Daily cap | 50 published posts per account per 24 h (`rules.caps.discord`) |
| Per-network options | `discord: { title, tags, threadId }` |

Source: the @useclaudia/social 0.3.0 docs.
