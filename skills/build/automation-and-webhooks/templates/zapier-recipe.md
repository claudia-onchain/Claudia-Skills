# Zapier recipes for Claudia (read-only)

Checked against Zapier's help pages on 2026-10-08 (checked 2026-10). Zapier renames steps occasionally; the fields below
are what to look for.

## Recipe A — "Catch Claudia alerts" (works today, no MCP)

1. **Trigger:** Webhooks by Zapier → *Catch Hook*. Copy the hook URL and add a secret query token you make up:
   `https://hooks.zapier.com/hooks/catch/123/abc/?token=<long random string>`.
2. **Sender:** on the person's machine, `claudia watch claudia --min-usd 1000 --notify webhook --webhook '<that URL>'`
   (preview first with `--dry-run`), or `node scripts/poll-signals.mjs --webhook '<that URL>' --send` from cron.
3. **Filter by Zapier:** *Only continue if* `Querystring Token` (exactly matches) `<your token>` **and**
   `Source` (text starts with) `claudia`.
4. **Formatter (optional):** Text → Truncate `Text` to 280 characters.
5. **Action:** Slack / Telegram / Discord / Email by Zapier → send `Text` plus
   "Research alert, not financial advice." to a **private** channel.

Fields Zapier parses from the body: `source`, `text`, `data__side`, `data__amountUsd`, `data__key`, `data__tags`, `at`
(trade alerts from `claudia watch`), or `feed`, `data__kind`, `data__symbol`, `data__tokenKey` (from `poll-signals.mjs`).

## Recipe B — "Ask Claudia on a schedule" with MCP Client by Zapier

1. **Trigger:** Schedule by Zapier → every day at 08:00.
2. **Action:** MCP Client by Zapier → *Call tool*. Connection fields:
   - Server URL: `https://useclaudia.xyz/mcp/data`
   - Transport: **Streamable HTTP**
   - OAuth: **No** (Data needs no sign-in)
   - Bearer Token: leave empty (it's ignored when OAuth = Yes anyway)
   Tool: `get_trending`, arguments `{ "interval": "24h", "order": "volume", "limit": 10 }`.
3. **Action:** a second *Call tool* step → `get_coin_scores` with `coin` = the first coin's key from step 2.
4. **Action:** send the text result to a private channel for the person to read.

If `doctor` shows the online MCP isn't live yet, Recipe B fails with a non-MCP response; use Recipe A or the HTTP
variant: *Webhooks by Zapier → GET* `https://useclaudia.xyz/api/insights/trending?chain=sol&interval=24h&order=volume`.

## What never goes in a Zap

- Claudia Trade tools (`prepare_trade`, `prepare_launch`) and anything that posts publicly without a human step.
- MCP keys with `trade:prepare`, `launch` or `thread:write` scopes. If a Zap needs a key at all, make it `read` only,
  with a 30- or 90-day expiry, stored in the Zap's connection (not in a step's text).
- Loops: one Zap run per schedule tick. The online MCP allows 20 heavy coin calls a minute per connection.
