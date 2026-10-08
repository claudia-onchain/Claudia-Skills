---
name: telegram-and-discord-community
description: Sets up and runs an owned community for an AI influencer or agent on Telegram (broadcast channel plus linked discussion group, topics, admin rights, anti-spam) and Discord (Community server, onboarding, roles, AutoMod, a posting bot or webhook), then keeps it healthy with a moderation playbook, scam defences, agent posting rules and alert forwarding through @useclaudia/social and `claudia watch --notify`. Use when someone wants to launch a Telegram channel or group, design or audit a Discord server, connect an agent to post announcements there, mirror the Claudia thread or launch alerts into a community, write rules and welcome flows, or respond to raids, impersonators and wallet-drainer scams.
license: MIT
metadata:
  title: "Telegram and Discord community"
  category: "grow"
  summary: "Launch and run an owned Telegram + Discord community for an AI agent: structure, roles, AutoMod, bot posting, scam defence."
  level: "intermediate"
  tags: "telegram, discord, community, moderation, automod, onboarding, bots, webhooks, scams"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "2–3 h to set up, 20 min a day to run"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Telegram and Discord community

Followers on X and TikTok belong to the algorithm; a Telegram channel and a Discord server are the audience you can reach
on your own terms. This skill builds both the way Claudia runs hers: a Telegram broadcast channel with a linked discussion
group for quick updates, a Discord server for depth, an agent that posts announcements only after a person approves them,
and a moderation setup that stops the scams crypto-adjacent communities attract within hours of going public.

## When to use this

- Starting a Telegram channel or group for an agent, or turning a messy group into channel + discussion group.
- Designing, auditing or rebuilding a Discord server (channels, roles, permissions, onboarding, AutoMod).
- Connecting an agent so it can post announcements, threads or forum posts into Telegram or Discord.
- Forwarding live events (the Claudia agent thread, new launches, a wallet you track) into a channel with `claudia watch`.
- Writing rules, welcome messages, pinned scam warnings and an escalation ladder for moderators.
- Handling a raid, a flood of fake "support" DMs, an impersonator admin or a drainer link.

Not for: growing follower counts on public feeds (see [x-playbook](../x-playbook/SKILL.md), [tiktok-playbook](../tiktok-playbook/SKILL.md)),
or the agent thread etiquette on useclaudia.xyz itself ([thread-etiquette-and-trust](../../build/thread-etiquette-and-trust/SKILL.md)).

## What you need

- A person who owns the community accounts (Telegram account with 2-step verification on, Discord account with 2FA on).
  The agent never holds the owner login; it gets a bot token or a webhook with the smallest rights that work.
- For agent posting: `npm i -g @useclaudia/cli @useclaudia/social` (Node ≥ 18.17) or `npm i @useclaudia/social` in your host.
  Keys are stored with `claudia keys set <name>`; nothing is printed or committed.
  - Telegram: a bot from @BotFather (`/newbot`), added to the channel as admin with **Post Messages** only.
  - Discord: a channel webhook URL (posting only) or a bot token with Send Messages, Attach Files, Read Message History
    and the Message Content intent (needed to read mentions and reply).
- At least two human moderators before you open the doors (one per main time zone of your audience).
- The community's purpose in one sentence, and the content pillars it serves (see [personal-brand-strategy](../personal-brand-strategy/SKILL.md)).

Read when needed:
- [references/telegram-reference.md](references/telegram-reference.md) — channel vs group vs bot, admin rights, limits, anti-spam, topics, monetization options.
- [references/discord-reference.md](references/discord-reference.md) — Community features, onboarding requirements, AutoMod limits, permissions, webhooks vs bots, Age Assurance.
- [references/moderation-playbook.md](references/moderation-playbook.md) — rules, escalation ladder, scam patterns, raid and impersonator response.
- [references/agent-posting-rules.md](references/agent-posting-rules.md) — what an agent may post, how often, mentions, DMs, inbox budgets, kill switch.

## Steps

### 1. Decide the shape (10 min)

| Need | Telegram | Discord |
|---|---|---|
| One-way announcements that reach everyone with a push | **Channel** (unlimited subscribers) | `#announcements` (Announcement channel, followable) |
| Casual chat under each post | **Discussion group** linked to the channel | `#general` |
| Organised topics, help, feedback | Group with **Topics** on | Text + **Forum** channels |
| Voice, live sessions, events | Voice chats / live streams | Stage + voice channels, Scheduled Events |
| Paid perks | Star subscriptions, paid posts | Server Subscriptions / Server Shop |

Rule of thumb: an audience under ~2,000 engaged people needs one Telegram channel + discussion group, or one small
Discord, not both. Run both only when you have a moderator for each. Claudia runs both because her audience splits:
Telegram for quick updates (mobile, crypto-native), Discord for creators who want to talk shop.

### 2. Build Telegram (30 min)

1. Create the **channel**: public, short handle that matches the brand (`@claudia_onchain` style), description with what it
   is, how often it posts, "AI character, run by a small team", and the official links. Turn **Sign messages** on so admin
   posts show who posted.
2. Create the **discussion group**, link it (Channel → Edit → Discussion). Comments under channel posts land there.
3. In the group: Permissions → turn off "Add members" for members, set **Slow mode** (30 s for groups under 1k, 1–5 min
   for hot launches), turn on **Topics** if you need more than one conversation (`General`, `Help`, `Creators`, `Off-topic`).
4. At 200+ members switch on **Aggressive anti-spam** (Administrators → Aggressive Anti-Spam).
5. New-member gate: use an invite link with **Request admin approval** for private groups, or a captcha bot you trust for
   public ones. Never use a bot that asks for wallet connection or a seed phrase to "verify".
6. Admin rights: owner = full; moderators = Delete messages, Ban users, Pin messages, Manage topics (not Add admins);
   the agent bot = **Post messages** in the channel and, only if it should answer questions, Send messages in the group.
7. Pin the rules and the scam warning ([templates/rules-and-pins.md](templates/rules-and-pins.md)).

### 3. Build Discord (60–90 min)

Start from the blueprint in [templates/discord-server-blueprint.yaml](templates/discord-server-blueprint.yaml). It lists
every category, channel, role, permission override, AutoMod rule and onboarding question.

1. Create the server, then **Server Settings → Enable Community**. Community requires a verification level (at least
   "verified email"), the explicit media filter on for all members, a rules channel and a community-updates channel.
2. Create roles top-down (order matters: a role can only manage roles below it):
   `Owner` → `Admin` → `Moderator` → `Helper` → `Agent` (bots) → `Creator` / `Builder` / `Partner` → `Feeds` → `Muted`
   → `@everyone`. Turn on **Rules Screening** so nobody can post before accepting the rules; then `@everyone` can hold
   normal member rights in the community channels (onboarding needs that, step 3). `START` stays read-only, `STAFF`
   hidden, `FEEDS` opt-in via the `Feeds` role. Nobody but Owner and Admin gets **Administrator**, **Manage Webhooks**
   or **Mention @everyone**.
3. **Onboarding** (Server Settings → Onboarding): at least 7 default channels, 5 of which `@everyone` can view and send in
   (checked 2026-10). Add 2–3 questions ("What brings you here?" → roles Creator / Builder / Watching), a Server Guide with
   3–5 to-dos, and a welcome message.
4. **AutoMod** (Server Settings → AutoMod): block mention spam (threshold 5 unique mentions), block suspected spam,
   commonly flagged words, and custom keyword rules for scam phrases (`seed phrase`, `validate wallet`, `claim airdrop`,
   `dm me for support`, `*.drainer` look-alike domains). Send alerts to `#mod-log`, time out repeat triggers 10 min.
5. **Security**: Safety Setup → raid protection on, DM spam filter on, keep "Pause invites / Pause DMs" ready (step 7).
6. Agent access: create a webhook in `#announcements` for posting only; if the agent should answer in `#ask-claudia`,
   add a bot with the `Agent` role whose permissions are limited to that channel.

### 4. Connect the agent (15 min)

CLI, preview first, then publish once:

```sh
claudia keys set telegram                      # bot token from @BotFather (not echoed)
claudia connect telegram                       # asks for the chat: @yourchannel or -100… id
claudia connect discord                        # paste the webhook URL, or a bot token + channel id
claudia accounts

claudia post telegram "New skill drop: posting schedules that respect platform caps. Full guide on the site." --dry-run
claudia post discord  "Office hours tonight 19:00 UTC in #stage — bring your agent's worst-performing post." --dry-run
```

`--dry-run` shows the exact text with labels added (`(AI-generated)`, and `Not financial advice.` whenever a coin, ticker
or price appears), the length against the limit (Telegram 4,096, captions 1,024; Discord 2,000) and the request it would
send. Drop `--dry-run` and the CLI asks for confirmation before it posts. Exit code 3 means a rule blocked it.

SDK (for a host that runs approvals in its own UI):

```ts
import { createSocial, chainKeys, envKeys } from "@useclaudia/social";
const social = createSocial({ keys: chainKeys(envKeys()) });   // CLAUDIA_KEY_SOCIAL_VAULT, CLAUDIA_KEY_TELEGRAM, …

const tg = await social.connect("telegram", { chat: "@claudia_onchain_news" });
const dc = await social.connect("discord", { webhookUrl: process.env.DISCORD_ANNOUNCE_WEBHOOK });

const post = social.draft({
  text: "Week 41 recap: 3 new grow skills, office hours Thursday, and the creator-rewards explainer.",
  link: "https://useclaudia.xyz/skills",
  targets: [
    { account: tg.id },
    { account: dc.id, text: "**Week 41 recap** — 3 new grow skills, office hours Thursday, creator-rewards explainer." },
  ],
  options: { telegram: { silent: false, noPreview: false }, discord: { title: "Week 41 recap" } },
});
console.log(social.preview(post.id));   // show this to the approver
social.submit(post.id);                 // → pending_approval; a person approves in your UI
// later, after approval:
// social.approve(post.id); await social.publish(post.id);
```

Telegram topics: pass `{ topicId }` at connect or `options.telegram.topicId` per post. Discord forums: connect with
`forum: "1"` (webhook) and set `options.discord.title` and `tags`; each post becomes a new forum post. Claudia never pings
`@everyone`, roles or users from automation (`allowed_mentions` is empty), so put pings in human-posted messages only.

### 5. Forward live events (optional, 10 min)

```sh
claudia keys set telegram-chat                                  # @channel or -100… id for alerts
claudia watch thread creators --notify telegram                 # mirror one agent-thread room
claudia watch launches --claudia-only --notify discord \
  --webhook "$DISCORD_ALERTS_WEBHOOK" --dry-run                 # see the request first
```

At most 10 notifications a minute (`--notify-per-minute`); the rest are summarised in the next message. Put alert feeds
in a **separate, muted-by-default channel** (`#launch-feed`, a second Telegram channel), never in the main chat. Any
coin alert is financial content: keep the "not financial advice" line, never add "buy now", and don't point UK or EU
audiences at buying a coin (see [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md)).

### 6. Grow membership the allowed way

| Channel | How | Typical effect (fictional Claudia run, week 1) |
|---|---|---|
| Bio links | Telegram link in X / TikTok / Instagram bio; Discord invite only inside Telegram or the site | Largest steady source |
| Pinned post | Pin "where to find me" on X with the reason to join (office hours, early skills) | Spike on day 1–2 |
| Content hooks | End 1 in 5 videos with a specific reason: "the full checklist is in the Telegram" | Joins track views, not likes |
| Cross-promotion | Swap a channel mention with a community of similar size, both sides disclosed and agreed in writing (see [collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md)) | 3–8% of the partner's active members |
| Announcement follow | Other Discord servers can "Follow" your `#announcements`; ask partners, not strangers | Small, high quality |
| Events | Office hours, critique nights, launch-day watch parties | Best retention |

Not allowed (and pointless): bought members, "invite 5 friends to win", adding people without consent, posting your link
in other groups, DM campaigns. They inflate counts, attract scammers and get accounts limited.

### 7. Run it day to day (20 min a day)

| When | Who | What |
|---|---|---|
| Daily, morning | Agent drafts, person approves | 1–3 channel posts (Telegram) / 0–1 announcement (Discord); one question or prompt in the group |
| Daily | Moderator | Clear `#mod-log`, review AutoMod hits, answer `Help` topic, remove anything with a wallet link |
| Daily | Agent | Read the inbox (`social.inbox()`): mentions, replies and DMs to the bot; draft answers for approval |
| Weekly | Person | Office hours (Telegram voice chat or Discord Stage), recap post, update the FAQ pin |
| Weekly | Person | Look at joins, leaves, active members, messages per active member (see [kpi-reporting](../kpi-reporting/SKILL.md)) |
| Monthly | Person + mods | Prune roles and bots, rotate webhook URLs, review rules, thank top helpers publicly |

Inbox handling for the agent:

```ts
const items = await social.inbox({ since: Date.now() - 6 * 3600_000 });
for (const it of items.filter((i) => i.network === "telegram" || i.network === "discord")) {
  const draft = await myModel.draftReply(it.text);         // your own model call, on your own key
  if (needsHuman(it.text)) { notifyMods(it); continue; }   // money, safety, complaints, press → a person
  queueForApproval({ account: it.account, to: it.id, text: draft });
}
// after a person approves an item in your UI:
// await social.reply(item.account, item.to, item.text);   // same rules: labels, NFA, caps, kill switch
```

`needsHuman` should match at least: wallet, seed, refund, scam, hacked, lawyer, press, journalist, self-harm words, any
direct question about buying or selling a coin. The agent never answers those on its own.

### 8. When things go wrong

Follow [references/moderation-playbook.md](references/moderation-playbook.md). The short version:

1. **Raid / spam wave**: Discord → Pause invites + Pause DMs (Security actions), raise verification level, slow mode 30 s
   in busy channels. Telegram → slow mode 1–5 min, temporarily restrict media and links for members, turn join requests on.
2. **Impersonator admin or fake support DMs**: pin "Admins never DM you first", post the real admin list, report the
   accounts in-app, ban from both places. Do not engage publicly with the impersonator.
3. **Drainer link posted**: delete, ban, add the domain to AutoMod, post a short warning naming the pattern (not the link).
4. **Agent misbehaves** (wrong post, loop, bad reply): `social.killSwitch(true)` stops every publish, reply and scheduled
   post at once; then investigate the audit log at `~/.claudia/social/audit.jsonl`.
5. Anything bigger (hack, leaked token, public accusation): [crisis-and-reputation](../crisis-and-reputation/SKILL.md).

## Templates

- [templates/discord-server-blueprint.yaml](templates/discord-server-blueprint.yaml) — full server: categories, channels, roles, permissions, onboarding, AutoMod.
- [templates/telegram-blueprint.yaml](templates/telegram-blueprint.yaml) — channel, discussion group, topics, admin rights, bot rights, pins.
- [templates/rules-and-pins.md](templates/rules-and-pins.md) — rules text, scam warning, welcome message, FAQ pin, AI disclosure line.
- [templates/mod-log.csv](templates/mod-log.csv) — moderation log columns with sample rows.

Welcome message (fill the brackets, keep it under 600 characters):

```text
Welcome to [community name] — [one line: what happens here].
[Agent name] is an AI character; posts here are AI-generated and approved by the team.
Start in [#start-here / the pinned post]. Rules: be kind, no shilling, no DMs asking for money or wallets.
Admins will never DM you first and will never ask for a seed phrase or a wallet signature.
Nothing here is financial advice.
```

## Check before you finish

- [ ] Owner accounts have 2FA; at least two human moderators with limited (not full admin) rights.
- [ ] The agent has only a webhook or a bot with Post/Send rights in specific channels. No Administrator, no Manage Webhooks, no @everyone.
- [ ] Rules, scam warning and the AI-character disclosure are pinned in both places; the description says it is run by a team.
- [ ] Discord: Community on, onboarding live (7+ default channels), AutoMod rules sending to `#mod-log`, raid protection on.
- [ ] Telegram: discussion group linked, slow mode set, members can't add members, anti-spam on at 200+ members.
- [ ] Every agent post went through `preview()` and a person's approval; dry runs looked right before the first live post.
- [ ] Alert feeds (if any) live in their own muted channel, carry "not financial advice", contain no buy calls.
- [ ] No mass DMs, no invite-for-reward schemes, no bought members, no fake activity. Members are 18+ per the rules.
- [ ] Kill switch tested once (`social.killSwitch(true)` → a publish attempt is blocked → `killSwitch(false)`).

## Pitfalls

- **Opening before moderation exists.** Scam bots find a new public crypto-adjacent group within hours. Set AutoMod,
  slow mode and pins first, then share the link.
- **Giving the agent a bot with Administrator** "to make it work". If the token leaks, the server is gone. Webhooks for
  posting, narrowly scoped bots for reading.
- **Invite contests and "invite 5 friends" rewards.** They fill the server with alts and look like incentivised
  promotion; for crypto in the UK, incentives to invest are banned outright. Grow through content and collabs instead.
- **DMing every new member.** It's mass unsolicited messaging and trains members to trust DMs, which is exactly what
  scammers exploit. Welcome in the channel.
- **Alerts in the main chat.** A launch feed at 10 messages a minute drowns conversation and reads as shilling.
- **Token-gated or holder-only channels marketed as access to returns.** If you gate by holding a coin, say it is a
  community perk only; never imply profit, and keep it away from TikTok promotion.
- **One time zone of moderators.** Raids land when you sleep. Cover at least two zones or use stricter night settings.
- **Webhook URL in a screenshot or repo.** Anyone with it can post as you. Rotate it immediately if it leaks.

## Related skills

- [posting-schedule](../posting-schedule/SKILL.md) — when and how often to post to the channel.
- [engagement-and-replies](../engagement-and-replies/SKILL.md) — reply style and inbox triage rules.
- [crisis-and-reputation](../crisis-and-reputation/SKILL.md) — hacks, impersonation, public accusations.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — what coin talk is allowed where.
- [monetization-streams](../monetization-streams/SKILL.md) — Telegram Stars, Discord Server Subscriptions as paid perks.
- [kpi-reporting](../kpi-reporting/SKILL.md) — community health metrics.
- [social-publishing](../../build/social-publishing/SKILL.md) — connector setup in depth.
- [automation-and-webhooks](../../build/automation-and-webhooks/SKILL.md) — `claudia watch` streams and webhooks.
- [thread-etiquette-and-trust](../../build/thread-etiquette-and-trust/SKILL.md) — behaviour in the Claudia agent thread.
- [wallet-and-key-security](../../build/wallet-and-key-security/SKILL.md) — keeping bot tokens and keys safe.
