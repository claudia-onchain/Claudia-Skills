# Discord reference for agent communities

Read this when you build or audit the server: Community requirements, onboarding, permission design, AutoMod limits,
webhooks vs bots and 2026 age changes. Facts checked 2026-10 against Discord's help centre; confirm limits in
Server Settings because Discord adjusts them.

## Community server requirements

Server Settings → Enable Community asks for:
- Verification level at least **Low** (verified email). Medium (registered 5+ min) is a sensible default for crypto-adjacent
  servers; High (member 10+ min) during raids.
- Explicit media content filter: **scan media from all members**.
- A **rules / guidelines** channel and a **community updates** channel (where Discord sends admin notices; keep it mod-only).
Community unlocks: Onboarding, Announcement channels (others can "Follow" them into their server), Forum channels,
Stage channels, Server Insights, Discovery (at larger size), Server Subscriptions and the Server Shop where available.

## Onboarding (Server Settings → Onboarding)

- **Default channels**: at least 7, and at least 5 of them must let `@everyone` view and send messages (checked 2026-10,
  Discord support article 11074987197975).
- **Questions**: up to several pre-join or post-join questions; each answer can grant roles and add channels. Keep it to
  2–3 questions. Example: "What brings you here?" → Creator / Builder / Just watching. "Which networks do you post on?"
  → X, TikTok, Instagram, YouTube (channels per network).
- **Server Guide**: welcome message, up to 5 "to-dos" (read rules, introduce yourself, pick roles) and resource links.
- **Rules screening** ("Membership Screening"): members must accept rules before they can talk. Turn it on.
- Source: https://support.discord.com/hc/en-us/articles/11074987197975

## Roles and permissions

Principles:
1. Rules Screening gates posting, so `@everyone` can hold normal member rights in community channels (onboarding
   requires 5 default channels `@everyone` can send in). Keep `#start-here`, `#rules`, `#announcements` read-only, staff
   channels hidden, and opt-in areas (feeds, partner rooms) behind roles granted by onboarding answers.
2. Permissions on roles, exceptions on **categories** (channels sync from their category). Avoid per-channel snowflakes.
3. Role order is power: a moderator can only act on members whose highest role is below theirs. Bots too.
4. Dangerous permissions, Owner/Admin only: Administrator, Manage Server, Manage Roles, Manage Webhooks, Manage Channels,
   Mention @everyone/@here/All Roles, Ban Members (give mods Timeout + Kick + Ban only if trusted).
5. Two-factor requirement for moderation actions: Server Settings → Safety Setup → "Require 2FA for moderator actions".

Suggested roles (top to bottom): Owner, Admin, Moderator, Helper, Agent (bots), Creator, Builder, Partner, Feeds, Muted,
`@everyone`. The `Agent` role sits **below** Moderator so mods can always time out a misbehaving bot.

## AutoMod (Server Settings → AutoMod)

Rule types (checked 2026-10):
- **Block mention spam**: blocks messages with more than N unique user/role mentions (you set N, up to 50). Use 5.
- **Block suspected spam**: Discord's spam classifier.
- **Commonly flagged words**: preset lists (profanity, insults and slurs, sexual content).
- **Custom keyword rules**: up to 6 rules, each with up to 1,000 keywords and up to 10 regex patterns; wildcards with `*`.
- **Member profile rule**: blocks names/bios with listed words (stops "Support | Admin" impersonator names).
Actions per rule: block the message (optional custom notice), send an alert to a channel, time out the member.
Exempt roles: Moderator, Admin, Agent (so the bot's own announcements are not blocked by keyword rules).
Source: https://support.discord.com/hc/en-us/articles/4421269296535 (AutoMod FAQ).

Starter keyword list for crypto-adjacent communities (custom rule "Scams"):
```
seed phrase, secret phrase, recovery phrase, private key, validate wallet, wallet validation, sync wallet,
rectify wallet, claim airdrop, airdrop claim, free mint, dm me for support, dm for help, open a ticket in dm,
support team will dm, guaranteed returns, 100x, double your, send sol and receive, giveaway send
regex: (?i)disc[o0]rd-?(gift|nitro)\.\w+ ; (?i)\b(claim|connect)[-_]?(wallet|airdrop)\b
```

## Security actions and raid tools

- **Safety Setup**: raid protection alerts, DM spam filter, verification level, 2FA requirement.
- **Security actions**: pause invites and pause DMs between members for a period during a raid.
- **Server Insights** (Community): joins, leaves, retention of new members (week-1 retention is the number to watch).

## Webhooks vs bots

| | Webhook | Bot |
|---|---|---|
| Can post | yes (text, embeds, up to 10 files) | yes |
| Can read / reply / see mentions | no | yes (needs Message Content intent) |
| Forum posts | yes (`thread_name`; Claudia `forum: "1"`) | yes (Create Posts permission) |
| Setup | Channel → Integrations → Webhooks | discord.com/developers → Bot → token, invite with scoped permissions |
| Risk if leaked | anyone can post in that one channel | depends on permissions; can be server-wide |

Rate limits: Discord answers 429 with `retry_after`; webhooks allow roughly 30 messages per minute per channel
(checked 2026-10, docs https://docs.discord.com/developers/topics/rate-limits). Message length 2,000 characters.

`@useclaudia/social` always sends `allowed_mentions: { parse: [] }`, so agent posts never ping `@everyone`, roles or users.
If an announcement needs a ping, a human posts the ping message.

## Age Assurance (2026)

Discord rolled out "teen-by-default" settings and age assurance in 2026: accounts not confirmed as adults get stricter
DM and content defaults, and some features need age verification (ID or face estimate) (Help Net Security, Feb 2026).
For an 18+ community about creator business and crypto: state 18+ in the rules, don't ask members for ID yourself,
and expect some new members to see restricted DMs (good: it blunts DM scams).

## Paid features

Server Subscriptions (monthly tiers that grant roles) and the Server Shop (one-off role or perk purchases) are available
to eligible Community servers in supported countries; Discord handles checkout and takes a share. Perks should be
content, access to the team, or early skills, never "signals" or anything implying returns.
Source: https://support.discord.com/hc/en-us/articles/4415163187607 (Server Subscriptions).
