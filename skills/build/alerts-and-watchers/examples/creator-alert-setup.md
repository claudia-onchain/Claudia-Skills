# Worked example: from alert spam to a calm channel

Ren (they/them) launched $FERN on Solana through their fictional agent Pico, and follows two wallets. Their first
attempt was `claudia watch sol:<FERN mint> --notify telegram` with no threshold. By lunch the chat had over 200
messages, mostly $5 bot trades, and Ren had muted it. Amounts and addresses below are illustrative.

## 1. The rules, written first

```yaml
owner: Ren
timezone: Europe/Berlin
quiet_hours: "23:30-07:30"
watchers:
  - name: fern-big-trades
    event: trades
    target: sol:<FERN mint>
    threshold: { min_usd: 400, exclude_tags: [bot, wash, rat] }
    action_when_fired: "look at the wallet and the chart; reply in the coin room if it's a big exit"
  - name: wallet-a
    event: wallet
    target: <wallet A>
    threshold: { min_usd: 100 }
    action_when_fired: "note it in the watchlist"
  - name: pico-mentions
    event: thread
    target: launches
    threshold: { match: "pico|\\$FERN" }
    action_when_fired: "read and decide whether Pico should reply"
```

## 2. Sizing the threshold

```text
$ claudia insights sol:<FERN mint>
  … 1h volume $24,800 · 24h volume $310,000 …
```

1–2% of $24,800 is $250–$500. Ren picked $400.

## 3. Dry run, then one real alert

```text
$ claudia watch sol:<FERN mint> --min-usd 400 --notify telegram --dry-run --count 2
  Live trades · $FERN
  Notify    Telegram chat -100<chat id> (dry run: nothing is sent)
  Min size  $400
  14:02:11  ▲ BUY     $512   3.71 SOL  9xQe…f3Kp kol
  would notify Telegram chat -100<chat id>: {"method":"POST","url":"https://api.telegram.org/bot***/sendMessage", …}
```

The token shows as `***`. Then `--count 1` without `--dry-run`: one message arrived in the right chat.

## 4. Quiet hours and an hourly cap through the gate

```sh
claudia watch sol:<FERN mint> --min-usd 400 --json \
  | node scripts/alert-gate.mjs --min-usd 400 --exclude-tags bot,wash,rat \
      --dedupe-minutes 30 --per-hour 10 --quiet 23:30-07:30 --tz Europe/Berlin \
      --state fern-gate.json --send
```

Environment (set in the service unit, not in the command): `ALERT_TELEGRAM_TOKEN` and `ALERT_TELEGRAM_CHAT`.

The wallet and thread watchers stay on the plain CLI with `--notify telegram --notify-per-minute 3`; they are quiet
enough already.

## 5. A week later

| | Before | After |
|---|---|---|
| Alerts a day | 400+ | 9–15 |
| Night-time pings | Dozens | 0 (one summary at 07:30, usually 2–4 lines) |
| Alerts Ren acted on | Unknown (muted) | About one a day |

Ren dropped the wallet-B watcher at the weekly review: it fired twice in seven days and neither time mattered.

## What stayed true

- Every alert ended with "Research alert, not financial advice."
- No watcher could trade, harvest or post. When Pico was mentioned, Ren decided whether Pico replied.
- The service unit has a one-line stop command, written in Ren's notes next to where the bot token lives.
