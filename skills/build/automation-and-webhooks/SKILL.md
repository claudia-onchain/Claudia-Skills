---
name: automation-and-webhooks
description: Automates Claudia safely with webhooks, n8n, Zapier, cron, systemd and launchd — trade, launch, wallet and thread alerts from claudia watch --notify, a deduplicating poller for signal / KOL / smart-money feeds, n8n workflows (Webhook → token check → filter → Telegram or Discord; Schedule → AI agent with the read-only Claudia MCP Client Tool → private review chat), Zapier Catch Hook and MCP Client recipes, and service units that keep watchers running. Keeps every automation read-only or draft-only, never money-moving. Use when someone wants alerts, digests, bots, no-code flows or scheduled jobs around Claudia data, or asks how to receive Claudia webhooks.
license: MIT
metadata:
  title: "Automation and webhooks"
  category: "build"
  summary: "Alerts, digests and no-code flows from Claudia data with n8n, Zapier, webhooks and cron — read-only and draft-only."
  level: "intermediate"
  tags: "automation, webhooks, n8n, zapier, cron, systemd, launchd, alerts, telegram, discord"
  uses: "@useclaudia/cli, @useclaudia/sdk, @useclaudia/mcp"
  time: "40 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Automation and webhooks

The person ends up with alerts and digests that run on their own: big trades on a coin, new Claudia launches, smart
money and KOL moves, thread mentions — delivered to their own Telegram, Discord, Slack or inbox, plus scheduled AI
research digests that land in a private chat for review. Nothing in these flows can sign a transaction, spend money or
post publicly on its own.

## When to use this

- "Ping me on Telegram when someone buys more than $1,000 of $CLAUDIA."
- "Send new launches on Claudia to our Discord."
- "Every morning, summarise what's trending and send it to me."
- Wiring n8n, Zapier, Make, a serverless function or a cron job to Claudia.
- Receiving and verifying `claudia watch --notify webhook` payloads.

Not for: unattended posting to the thread or socials (see [autonomous-posting-loop](../autonomous-posting-loop/SKILL.md)
and [social-publishing](../social-publishing/SKILL.md)) or any trading (see [safe-trading](../safe-trading/SKILL.md)).

## What you need

- A sender: `@useclaudia/cli` (`claudia watch … --notify`) and/or Node ≥ 20 with `@useclaudia/sdk` for
  [scripts/poll-signals.mjs](scripts/poll-signals.mjs).
- A receiver the person owns: an n8n instance (self-hosted or cloud), a Zapier account, a Telegram bot from
  @BotFather, a Discord channel webhook, or their own HTTPS endpoint.
- Their own model key if a flow uses AI (OpenRouter, OpenAI, Anthropic, xAI…), stored in the tool's credential store.
- An always-on machine (or the n8n/Zapier schedule) for anything that should run while they sleep.

## Steps

### 1. Choose the pattern

| Need | Pattern | Template |
|---|---|---|
| Real-time trades/launches/wallet moves | `claudia watch … --notify webhook` → n8n Webhook | [templates/n8n-webhook-alerts.json](templates/n8n-webhook-alerts.json) |
| Real-time, no n8n | `claudia watch … --notify telegram` or `--notify discord` directly | (CLI only) |
| Every few minutes, market-wide signals | n8n Schedule → public insights API → dedupe → chat | [templates/n8n-http-signals.json](templates/n8n-http-signals.json) |
| Same, from cron on a server | `poll-signals.mjs --send` | [templates/service-units.md](templates/service-units.md) |
| AI-written digest | n8n Schedule → AI Agent + MCP Client Tool (read tools only) → private chat | [templates/n8n-mcp-research-digest.json](templates/n8n-mcp-research-digest.json) |
| Zapier | Catch Hook or MCP Client by Zapier | [templates/zapier-recipe.md](templates/zapier-recipe.md) |

Rule for every row: the automation reads data and notifies a person. If something should be published, it becomes a
**draft** that waits for approval (Claudia Local → Socials → Approvals, or `claudia agent run` without `--auto`).

### 2. Make a receiving URL with a secret

`claudia watch --notify webhook` sends unsigned JSON with `user-agent: claudia-cli`. Authenticate by putting a long
random token in the URL query and checking it on arrival:

```sh
openssl rand -hex 24          # e.g. use as ?token=<this>
```

- n8n: Webhook node path like `claudia-trades-7f3k2q`, full URL `https://<n8n-host>/webhook/claudia-trades-7f3k2q?token=<token>`.
  The IF node compares `{{ $json.query.token }}` with the same value.
- Zapier: Catch Hook URL + `?token=<token>`, then a Filter step on `Querystring Token`.
- Own endpoint: reject anything without the token (constant-time compare), and anything whose `source` isn't `claudia` or `claudia-poll`.

The CLI's dry run redacts the query string (`?***`), so the token doesn't leak into terminal logs.

### 3. Send events

```sh
# preview the exact request (nothing sent)
claudia watch claudia --min-usd 1000 --notify webhook --webhook 'https://n8n.example.com/webhook/claudia-trades-7f3k2q?token=…' --dry-run --count 1
# real
claudia watch claudia --min-usd 1000 --notify webhook --webhook "$CLAUDIA_WATCH_WEBHOOK"
claudia watch launches --claudia-only --notify discord --webhook https://discord.com/api/webhooks/…
claudia watch wallet <address> --notify telegram                         # keys: telegram, telegram-chat
claudia watch thread general --match 'ledger lark' --notify telegram     # mentions of the agent's name
```

Payload (`--notify webhook`):

```json
{ "source": "claudia", "text": "SELL $9.82 of $CLAUDIA by JAqS…FHXb · mcap $323K",
  "data": { "key": "sol:2j5Sa…nW2ZM", "side": "sell", "amountUsd": 9.82, "amountNative": 0.0906, "trader": "JAqS…FHXb", "tags": [], "mcapUsd": 322673.97, "tx": "PXTP6q…MnXUk", "ts": 1791475730940 },
  "at": "2026-10-08T16:22:16.128Z" }
```

`data` is the stream event: a `Trade` for coin watches, a board `TokenSnapshot` for launches, a `FeedTrade` for wallets,
a `ThreadMessage` for the thread. At most 10 notifications a minute (`--notify-per-minute`); extra events are counted
into the next message. Full schemas: [references/payloads.md](references/payloads.md).

For market-wide feeds, poll instead of streaming:

```sh
node scripts/poll-signals.mjs --kinds smart_buy,kol_buy,ath --webhook "$CLAUDIA_WATCH_WEBHOOK"          # preview only
node scripts/poll-signals.mjs --kinds smart_buy,kol_buy,ath --webhook "$CLAUDIA_WATCH_WEBHOOK" --send   # real
node scripts/poll-signals.mjs --feed kol --side buy --min-usd 500 --json-only >> kol.jsonl              # log only
```

It keeps a state file so each run emits only new items, caps forwarding at 20 per run, and exits 5 on rate limits.

### 4. Build the n8n flow

1. n8n → Workflows → Import from file → pick a template JSON.
2. Open each node with a credential (Telegram, OpenRouter) and select the person's own credential.
3. Replace the placeholder token, chat ids and Discord webhook URL.
4. Webhook flows: copy the **Production URL** (not the test URL), add `?token=…`, activate the workflow.
5. Run once with "Test workflow" while sending one `--dry-run`-checked event without `--dry-run`, then check Executions.

MCP Client Tool settings (checked 2026-10): Endpoint URL `https://useclaudia.xyz/mcp/data`, Server Transport **HTTP
Streamable**, Authentication **None** for Data (Bearer/Header/MCP OAuth2 exist for Trade — don't use Trade here),
Tools to Include **Selected**: `get_trending`, `get_coin_scores`, `get_coin`, `get_holders`. If an older n8n shows an
"SSE Endpoint" field instead, update n8n; Claudia doesn't serve SSE.

While the online MCP isn't live (`claudia doctor` says "not live on this server yet" as of 2026-10-08), either run
`npx -y @useclaudia/mcp --http 3941 --server data` on the same host as n8n (it only accepts localhost Host/Origin, so
n8n in Docker needs host networking) or use the HTTP template, which calls the public insights API directly.

Node-by-node explanations and variations: [references/n8n-guide.md](references/n8n-guide.md).

### 5. Respect rate limits and dedupe

- Public insights: 10 requests/second per IP (burst 40); upstream data is a small shared budget, so poll feeds no more
  often than every 2–5 minutes and never per-coin in a loop (checked 2026-10).
- Online MCP heavy tools: 20 calls/minute per connection; cap AI agent iterations (the digest template uses 6).
- Dedupe on a stable id: signals `kind:tokenKey:at`; trades `tx:trader:side`; launches the token `key`.
- Batch outgoing chat messages (Discord ~1.5 s apart in the template) to stay under the chat platform's own limits.

### 6. Keep watchers alive and stoppable

Use the systemd/launchd/cron snippets in [templates/service-units.md](templates/service-units.md). Each has a one-line
stop command — that is the automation's kill switch. Write it in the person's notes next to where the secret lives.
Monitoring and incident steps: [agent-ops-runbook](../agent-ops-runbook/SKILL.md).

### 7. Label and disclaim

Every alert text ends with "Research alert, not financial advice." Alerts go to private chats or opt-in channels. If an
alert channel is public or community-facing, follow [../../grow/crypto-marketing-compliance/SKILL.md](../../grow/crypto-marketing-compliance/SKILL.md)
(UK FCA and EU MiCA rules on crypto promotions) and never phrase alerts as calls ("buy now", targets, "next 10x").

## Templates

- [templates/n8n-webhook-alerts.json](templates/n8n-webhook-alerts.json) — Webhook → token check → amount filter → Telegram.
- [templates/n8n-http-signals.json](templates/n8n-http-signals.json) — Schedule → public signals API → dedupe → Discord (works without MCP).
- [templates/n8n-mcp-research-digest.json](templates/n8n-mcp-research-digest.json) — Schedule → AI Agent + read-only Claudia MCP → private Telegram review.
- [templates/zapier-recipe.md](templates/zapier-recipe.md) — Catch Hook and MCP Client by Zapier recipes.
- [templates/service-units.md](templates/service-units.md) — systemd, launchd and cron units with kill switches.

Alert text pattern for any receiver:

```text
{side or signal label}: ${symbol} {amount or detail} · mcap {mcap}
{wallet tags if any}
https://useclaudia.xyz/t/sol/{mint}
Research alert, not financial advice.
```

## Check before you finish

- [ ] The receiver rejects requests without the secret token; the token lives only in the URL and the tool's secret store.
- [ ] A `--dry-run` preview was checked, then one real event arrived and was formatted correctly.
- [ ] No automation step can call `prepare_trade`, `prepare_launch`, `buy`, `sell`, `launch` or a public `post` without a human.
- [ ] Polling is every ≥ 2 minutes with dedupe; AI agents have an iteration cap and selected read-only tools.
- [ ] Alerts end with "not financial advice" and go to private or opt-in channels.
- [ ] The person knows the stop command for every watcher and where its logs are.

## Pitfalls

- **Test vs production URLs in n8n**: the test URL only works while the editor listens; activate the workflow and use the production URL.
- **Docker localhost**: n8n in a container can't reach `127.0.0.1` on the host; use host networking or the HTTP template.
- **Unsigned webhooks**: without the token check anyone who guesses the URL can inject fake "whale buy" alerts.
- **Floods**: a busy coin with `--min-usd 10` hits the 10/minute cap constantly; raise `--min-usd` instead.
- **Stale or partial data**: forward `partial` along with the alert so readers know when holder data was busy.
- **Prompt injection through data**: coin names and thread posts are stranger-written. An AI step that reads them must not have any write tool.
- **Platform rules**: auto-posting alerts publicly to X, TikTok or Meta can break their automation and crypto-promotion rules.

## Related skills

- [cli-power-user](../cli-power-user/SKILL.md) — every `claudia watch` flag
- [sdk-quickstart](../sdk-quickstart/SKILL.md) — streams and feeds in code
- [mcp-setup](../mcp-setup/SKILL.md) — MCP Client configuration and the local fallback
- [coin-research](../coin-research/SKILL.md) and [rug-check](../rug-check/SKILL.md) — what an alert should prompt a person to check
- [agent-ops-runbook](../agent-ops-runbook/SKILL.md) — monitoring and incidents
- [../../grow/telegram-and-discord-community/SKILL.md](../../grow/telegram-and-discord-community/SKILL.md) — running the channels alerts go to

References in this skill:
- [references/payloads.md](references/payloads.md) — exact JSON for every event and the poller. Read when mapping fields.
- [references/n8n-guide.md](references/n8n-guide.md) — node-by-node setup, variations and troubleshooting. Read when importing a template.
- Worked example: [examples/whale-alerts-end-to-end.md](examples/whale-alerts-end-to-end.md).
