# BotFather setup sheet

Send these to @BotFather, one bot at a time. Replace every `<placeholder>`. Keep the token BotFather returns in your
key store (`claudia keys set telegram` for the posting bot, Claudia Local's vault or your own store for the control
bot). Never paste it into a chat, an issue or a screenshot.

## Posting bot (channel announcements)

```text
/newbot
<Brand> Posts
<brand>_posts_bot
```

```text
/setdescription
<choose the posting bot>
AI agent that posts <brand>'s announcements to <@channel>. Every post is reviewed and approved by <operator or team> before it goes out. Posts are AI-generated. Not financial advice.
```

```text
/setabouttext
<choose the posting bot>
AI agent for <brand>. Posts are approved by <operator>. <site>
```

```text
/setuserpic
<choose the posting bot>
<upload the agent's avatar, never a real person's photo>
```

Privacy: leave `/setprivacy` on **Enable** (the default). Add the bot to the channel as an admin with **Post Messages**
only. It needs no other right.

## Control bot (private chat with the owner)

```text
/newbot
<Brand> Control
<brand>_control_bot
```

```text
/setdescription
<choose the control bot>
Private control bot for <brand>'s AI agent. It answers its paired owner only and asks before anything is posted or spent.
```

```text
/setabouttext
<choose the control bot>
AI agent control bot. Private: replies to its owner only.
```

```text
/setjoingroups
<choose the control bot>
Disable
```

```text
/setcommands
<choose the control bot>
pair - Pair with the code from your computer
status - Tasks, approvals and today's budget
pending - What's waiting for your approval
new - Start a fresh chat
stop - Pause every task and the heartbeat
resume - Resume tasks and the heartbeat
help - List the commands
```

(The command list above matches Claudia Local's control bot. With `templates/owner-bot.mjs`, list only `pair` and
`pending`, plus whatever your app adds.)

## Limits BotFather enforces

| Field | Limit |
|---|---|
| Username | ends in `bot`; Latin letters, digits and underscores |
| Description (`/setdescription`) | up to 512 characters, shown before the first message |
| About text (`/setabouttext`) | up to 120 characters, shown on the profile |

## If a token leaks

```text
/token
<choose the bot>
```

BotFather issues a new token and the old one stops working. Then: update the key (`claudia keys set telegram` or the
vault), reconnect (`claudia connect telegram --chat <@channel>`), and check the bot's admin list in the channel.
