# Agent posting rules for Telegram and Discord

Read this before you let an agent post or reply in a community, and when you tune its pace. These rules are stricter
than what the platforms technically allow, because a community notices a spammy agent faster than an algorithm does.

## What the agent may do

| Action | Telegram | Discord | Approval |
|---|---|---|---|
| Announcement post (drop, recap, event) | channel post | `#announcements` webhook | person approves each |
| Prompt / question of the day | discussion group or `General` topic | `#general` | batch-approved weekly |
| Answer a mention or reply to the bot | group | `#ask-<agent>` channel | approve each, or pre-approved FAQ answers only |
| Forward a live event (`claudia watch --notify`) | separate alert channel | `#launch-feed` / `#thread-feed` | approve the stream once; contents are machine events |
| Start a forum post with a long write-up | — | forum channel (`forum: "1"`) | person approves each |

## What it never does

- DM members first, or DM anyone about coins, wallets or money.
- Ping `@everyone`, `@here` or roles (`@useclaudia/social` strips mentions anyway).
- Post the same text into several groups or other people's servers.
- Join other communities to promote itself.
- Answer "should I buy", "is this safe", "when moon" questions; it hands them to a human with a neutral holding reply:
  "I can't give financial advice. The team or a moderator will pick this up; meanwhile the risk notes are pinned."
- Pretend to be a human, or claim personal experience ("I bought this and it changed my life").
- Post during an active incident (raid, hack, outage) except the incident message a human approved.

## Pace (defaults that keep a community healthy)

| Surface | Agent default | Hard cap in `@useclaudia/social` |
|---|---|---|
| Telegram channel | 1–3 posts a day, 3 h apart minimum | 50 per account per 24 h |
| Telegram group (answers) | as needed, max 1 message / 30 s, max 20 / h | 50 per account per 24 h |
| Discord announcements | 2–4 a week | 50 per account per 24 h |
| Discord answers | as needed, max 20 / h | 50 per account per 24 h |
| Alert channels | ≤ 10 notifications / min (CLI default), summarised beyond | — |

Change caps only downward: `createSocial({ rules: { caps: { telegram: 10, discord: 10 } } })`.
Links per account per 24 h default to 5 (`rules.linksPerDay`). Identical text to the same account within 24 h is blocked.

## Inbox budgets

`social.inbox()` polls with a daily read budget (default 200 reads per account per day; X is 0 because X bills reads).
For Telegram and Discord there is no per-read charge; keep the default and poll every 5–15 minutes, not every second.
The Telegram bot sees only mentions, replies and DMs in privacy mode; the Discord bot only reads the channels it can see.

## Disclosure

- The channel/server description and a pinned message say the agent is an AI character run by a team.
- `@useclaudia/social` adds `(AI-generated)` to Telegram and Discord posts (no native AI flag exists there).
- Coin mentions get `Not financial advice.` automatically. Paid or sponsored posts need `labels: { ad: true }`, which adds
  `#ad`; put "Ad" or "Sponsored" at the start of the text as well for UK audiences
  (see [brand-deals-and-sponsorships](../../brand-deals-and-sponsorships/SKILL.md)).

## Kill switch and audit

```ts
social.killSwitch(true);   // stops publish(), reply() and tick() everywhere; survives restarts
social.killSwitch(false);  // only after a person reviewed what happened
```

Every draft, approval, publish, failure and kill-switch change is a line in `~/.claudia/social/audit.jsonl` (no secrets).
Moderators can ask the operator for the audit lines when a member disputes what the agent said.

## Token hygiene

- Bot tokens and webhook URLs are secrets: store with `claudia keys set telegram` / `discord`, or your own key store;
  never paste them in a chat, a screenshot or a repo.
- Rotate a Discord webhook (delete + recreate) or a Telegram token (`/revoke` in @BotFather) the moment one is exposed,
  then reconnect with `claudia connect`.
- One bot per community. Don't reuse the same Telegram bot for unrelated projects; a ban on one hits all.
