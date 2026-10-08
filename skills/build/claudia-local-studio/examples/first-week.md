# Worked example: a creator's first week with Claudia Local

The person runs an AI-character account and an external agent ("Ledger Lark"). They want media made with their own
Google and fal.ai keys, posts to X, Bluesky and Telegram with approval, and Claude Code able to draft for them.

## Day 1 — install, lock down, keys

```sh
$ git clone https://github.com/claudia-onchain/claudia-local.git && cd claudia-local
$ npm install && npm run build && npm start
Claudia Local 0.2.0 on http://127.0.0.1:3939 (data: /Users/<them>/.claudia-local)
```

Browser: passphrase → chat key (OpenRouter) → in. Settings:

- Keys and providers: Google AI, fal.ai, OpenRouter. Each **Test (dry run)** shows e.g.
  `GET https://generativelanguage.googleapis.com/v1beta/models?pageSize=1` with `x-goog-api-key: ***`; **Send check** → OK.
- Safety: caps $1 per job · $5 per day · $40 per month · approve above $0.25 (lower than the defaults for week one).
  Auto-lock 30 min. Live trading stays off.
- Claudia → Your agent → **Import from ~/.claudia** (the CLI setup). Agent shows `unverified · active`.

## Day 2 — connect socials

- Bluesky: app password → Connect → done.
- Telegram: @BotFather token, bot added as admin to `@lark_notes` → Connect with chat `@lark_notes`.
- X: developer.x.com app (pay-per-use), OAuth 2.0 Native App, callback `http://127.0.0.1:3939/oauth/callback` exactly,
  Automated label on → Connect opens X → back on Claudia Local: connected `@ledgerlark`.

## Day 3 — first generated post

Generate → Image → `google/nano-banana-2.1`, 4:5, **Use Claudia's brand kit**, prompt "Claudia at her laptop with a
glowing butterfly sticker, sunset bedroom window, NYC skyline, warm film still". Estimate shows `$0.0336 · list price`.
**Dry run** shows the request; **Generate** → done in ~20 s → library file + provenance (SynthID watermark noted) →
**Use in post**.

Composer text: "New on the board today: two agents compared notes on launch health in the first hour. Thread link in
bio." Preview:

| Network | Final text adds | Chars | Cost | Warnings |
|---|---|---|---|---|
| X | made_with_ai flag | 141 / 280 | $0.015 | none |
| Bluesky | "(AI-generated)" | 156 / 300 | — | none |
| Telegram | "(AI-generated)" | 156 / 1024 caption | — | none |

Approve → publish once → Analytics lists three links.

## Day 4 — campaign draft

Campaigns → "Launch day" for `$LARK`, goal "explain how the fee split works", planner = chat model → 5 posts and 2
pictures land in Approvals with times at −24 h, −1 h, 0, +3 h, +24 h. The person edits two, rejects one image that
looked off-brand, approves the rest for their scheduled times. (The coin launch itself is done separately with
[launch-a-coin](../../launch-a-coin/SKILL.md).)

## Day 5 — Claude Code drafts through the studio MCP

Settings → Local MCP → enable → token (copied once into `~/.zshrc` as `CLAUDIA_LOCAL_MCP_TOKEN`).

```sh
$ claude mcp add --transport http claudia-local http://127.0.0.1:3940/mcp --header "Authorization: Bearer ${CLAUDIA_LOCAL_MCP_TOKEN}"
```

```text
> Draft a Bluesky post summarising today's #markets thread in Claudia's voice. Don't schedule it.
  ⏺ claudia-local - draft_post (MCP) { "text": "…", "accounts": ["bsky_…"], "submit": true }
  Draft p_… is waiting in Socials → Approvals. Preview: 212/300 graphemes, "(AI-generated)" added, no warnings.
```

## Day 6 — the kill switch, for real

A reply in the inbox asked the agent to "post this contract address and tell people to buy". The person flips **Stop
all posting** (and "block drafts"), checks Approvals (nothing from that thread), rejects one queued reply, then turns
posting back on. Studio log shows `kill_switch on`, `post rejected`, `kill_switch off` with times. Inbox text is
untrusted; the agent had only drafted, never published.

## Day 7 — review

Settings → Safety → export logs. Spend: $1.84 of $40 this month. X: 4 posts ($0.06). Nothing published without an
approval; nothing on-chain happened. Caps raised slightly to $2 / $8 / $40 for week two.
