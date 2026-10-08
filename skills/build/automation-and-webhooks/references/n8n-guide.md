# n8n guide for the Claudia templates

Node versions in the templates: Webhook 2, IF 2, Telegram 1.2, HTTP Request 4.2, Code 2, Schedule Trigger 1.2, AI Agent
2, OpenRouter Chat Model 1, MCP Client Tool 1.2 (checked 2026-10 against n8n 2.x). Older instances may show a
"node version not supported" banner; update n8n or re-create that node with the same settings.

## Template 1 — `n8n-webhook-alerts.json`

| Node | What to set |
|---|---|
| Claudia webhook | Method POST, path (keep it unguessable), Respond: Immediately. Copy the **Production URL** |
| Token check (IF) | Right value = the token you appended as `?token=…`. Second condition keeps only `source` starting with `claudia` |
| Big trades only (IF) | `{{ $json.body.data.amountUsd }}` ≥ your threshold. Remove for launches/thread watches |
| Telegram | Credential = your bot token; Chat ID = your private chat or channel id (`-100…`); bot must be admin to post in a channel |
| Drop | No-op sink so rejected requests end quietly (n8n still records the execution) |

Sender: `claudia watch claudia --min-usd 250 --notify webhook --webhook '<production URL>?token=<token>'`. Keep the CLI's
`--min-usd` low-ish and the IF threshold higher if you want n8n to decide; keep both high to save executions.

Variations:
- Launch alerts: watch `launches --claudia-only`; replace the amount IF with `{{ $json.body.data.launchedHere }}` is true.
- Wallet copy-*watching* (not copy-trading): `watch wallet <addr>`; IF on `{{ $json.body.data.side }}` equals `buy`.
- Thread mentions: `watch thread general --match '<agent name>'`; send `{{ $json.body.data.content }}` quoted, never auto-reply.

## Template 2 — `n8n-http-signals.json`

| Node | What to set |
|---|---|
| Every 5 minutes | Keep ≥ 5 minutes; the feed itself is cached ~30 s server-side |
| GET Claudia signals | No auth. Public, rate-limited per IP |
| New signals only (Code) | `KINDS` set; dedupe via `$getWorkflowStaticData('global')` — note static data only persists for **active** (production) runs, not manual tests |
| Discord webhook | Your channel's webhook URL; batching sends one message every 1.5 s; mentions are disabled |

## Template 3 — `n8n-mcp-research-digest.json`

| Node | What to set |
|---|---|
| Every 4 hours | Daily is plenty for most people |
| Research agent | Prompt and system message are in the template; Max Iterations 6 keeps heavy tool calls ≤ 4 |
| OpenRouter model | Your own OpenRouter credential; any tool-capable model |
| Claudia Data (MCP) | Endpoint `https://useclaudia.xyz/mcp/data`, Server Transport HTTP Streamable, Authentication None, Include Selected (`get_trending`, `get_coin_scores`, `get_coin`, `get_holders`) |
| Telegram (review) | A private chat. The digest is a draft for the person to read, edit and post themselves if they want |

Until the online MCP is live, set the endpoint to a local server n8n can reach:
- n8n installed natively on the same machine: `npx -y @useclaudia/mcp --http 3941 --server data`, endpoint
  `http://127.0.0.1:3941/mcp`.
- n8n in Docker: the local server refuses non-localhost Host headers, so run the container with host networking
  (Linux) or use Template 2.

Never add Claudia Trade (`/mcp/trade`) or a `cmk_` key with trade/launch/thread:write scopes to an AI Agent node in an
unattended workflow.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Webhook 404 | workflow not active, or you used the test URL |
| Every request goes to Drop | token mismatch — check URL encoding; avoid `&`, `#`, `+` in the token (hex is safest) |
| `$json.body` empty | sender didn't send JSON: make sure it's `--notify webhook`, not Discord/Telegram mode |
| MCP Client Tool lists no tools | endpoint returned HTML (not live) or transport set to SSE |
| "Slow down: deep coin data is limited…" | the agent looped; lower Max Iterations or select fewer tools |
| Telegram 400 "chat not found" | bot not added to the chat, or wrong id sign (`-100…` for channels) |
| Discord 429 | lower frequency or increase batch interval |
