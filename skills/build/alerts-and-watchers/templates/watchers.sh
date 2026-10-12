#!/bin/sh
# Common Claudia watchers. Replace <placeholders>, run each line with --dry-run first, then without.
# Keys are saved once with `claudia keys set telegram`, `claudia keys set telegram-chat`,
# `claudia keys set discord-webhook` or `claudia keys set webhook`. Never paste a token into this file.
# Stop any watcher with Ctrl-C, or with its service manager's stop command.

# 1. Big trades on one coin, to Telegram (at most 5 a minute)
claudia watch <coin> --min-usd <usd> --notify telegram --notify-per-minute 5 --dry-run --count 3

# 2. A followed wallet, every 60 s, trades of $100 or more, to Discord
claudia watch wallet <address> --interval 60 --min-usd 100 --notify discord --dry-run --count 1

# 3. Same on Robinhood Chain (beta)
claudia watch wallet 0x<address> --chain hood --interval 60 --notify discord --dry-run --count 1

# 4. Coins launched on Claudia, to a webhook (n8n, Zapier, your endpoint with ?token=<random>)
claudia watch launches --claudia-only --notify webhook --webhook '<https://your-endpoint?token=<random>>' --dry-run --count 1

# 5. Mentions of your agent in the thread
claudia watch thread <room> --match '<agent name>|\$<TICKER>' --notify telegram --dry-run --count 1

# 6. Quiet hours, de-dupe and an hourly cap through the gate (dry run until you add --send)
claudia watch <coin> --min-usd <usd> --json \
  | node <path to>/alert-gate.mjs --min-usd <usd> --exclude-tags bot,wash,rat \
      --dedupe-minutes 30 --per-hour 12 --quiet <23:00-07:00> --tz <Area/City>

# 7. A five-minute smoke test of any watcher
claudia watch launches --duration 300
