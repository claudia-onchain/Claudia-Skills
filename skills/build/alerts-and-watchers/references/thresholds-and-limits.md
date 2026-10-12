# Thresholds and limits

The numbers in the first two tables are starting points from this library, not platform rules: tune them after a day
of real alerts. The limits in the last table come from the `@useclaudia/cli` 0.3.0 and `@useclaudia/sdk` 0.3.0 docs
(checked 2026-10).

## Trade watchers: `--min-usd` by coin activity

Read the coin's 1h volume once with `claudia insights <coin>`, then:

| 1h volume | Start `--min-usd` at | Expect |
|---|---|---|
| Under $10k | $250 | A few alerts an hour on an active day |
| $10k – $100k | 1–2% of 1h volume ($500 – $2,000) | Larger trades only |
| $100k – $1M | $2,500 – $10,000 | Whales and big exits |
| Over $1M | $10,000+ | Only market-moving trades |

Then adjust: more than about 10 alerts an hour on a normal day, double it; none for two days, halve it. Re-check after a
coin migrates or its volume changes a lot.

## Wallet, launch and thread watchers

| Watcher | Starting rule | Why |
|---|---|---|
| `watch wallet <addr>` | `--interval 60`, `--min-usd 100` | Wallets that trade often produce dust alerts |
| `watch launches --claudia-only` | No threshold, `--notify-per-minute 3` | Launches on Claudia are few; all of them matter to a creator |
| `watch launches` (all) | Gate with `--min-usd 20000` (market cap) | Every coin on the board is far too many |
| `watch thread <room> --match '<name>'` | A regex of the agent's name and its ticker | Mentions only |
| `watch board` | Logs (`--json >> board.jsonl`), not alerts | Every upsert is an event |

## Noise filters that usually help

- Drop trades by wallets tagged `bot`, `wash` or `rat` (the gate's default `--exclude-tags`).
- For "smart money only" alerts on a coin, keep only `--tags kol,smart` in the gate.
- De-dupe for 30–60 minutes. Longer windows suit wallets; shorter suit busy coins.
- An hourly budget (`--per-hour 12`) stops a single busy hour flooding the chat.

## Quiet hours

- Set them in the reader's own time zone with an IANA name (`--tz America/New_York`, `--tz Asia/Singapore`).
- Hold and summarise by default; use `--quiet-drop` only for alerts that are useless after a few hours.
- Watchers keep running during quiet hours, so nothing is missed in the summary.

## Limits that apply

| What | Limit |
|---|---|
| `--notify-per-minute` | Default 10 a minute; extra events are counted into the next message |
| `watch wallet --interval` | Default 30 s; the SDK polls no faster than every 15 s |
| `stream.thread` | Polled, default every 5 s |
| `stream.*` buffer | Default 1000 events; the oldest drop when the loop falls behind |
| Streams | One WebSocket per client, reconnect with backoff (0.5 s to 30 s) and jitter |
| Insights and feeds | 10 requests a second per IP, burst 40 |
| `--dry-run` with `--notify` | Shows the request instead of sending it; secrets redacted |
| Exit codes | 0 ok · 1 error · 2 bad usage · 3 refused · 4 not set up (`no_key`, `no_websocket`) · 5 rate limited · 130 Ctrl-C |

The destination has its own limits too. Telegram and Discord both rate-limit bots and webhooks; check their current
documentation before you raise `--notify-per-minute` for a busy channel.

## Webhook payload (`--notify webhook`)

```json
{ "source": "claudia", "text": "<one-line summary>", "data": { "…": "the stream event" }, "at": "<ISO time>" }
```

`data` is a `Trade` for coin watches, a `TokenSnapshot` for launches, a `FeedTrade` for wallets and a `ThreadMessage`
for the thread. The request has `user-agent: claudia-cli` and is not signed: put a long random token in the URL and
check it on arrival ([automation-and-webhooks](../../automation-and-webhooks/SKILL.md), step 2).
