# Worked example: $CLAUDIA whale alerts to a private Telegram chat via n8n

Goal from the person: "Tell me in Telegram when anyone trades more than $1,000 of $CLAUDIA. Don't post anything anywhere."

## 1. Token and URL

```sh
$ openssl rand -hex 24
3f9c0d…a71b          # (shortened here; the person keeps the full value)
```

n8n: import `templates/n8n-webhook-alerts.json`, set the token in **Token check**, pick the Telegram credential and the
private chat id, activate. Production URL:
`https://n8n.example.com/webhook/claudia-trades-7f3k2q` → with token
`https://n8n.example.com/webhook/claudia-trades-7f3k2q?token=3f9c0d…a71b`.

Saved in `~/.config/claudia/watch.env` (chmod 600):

```sh
CLAUDIA_WATCH_WEBHOOK='https://n8n.example.com/webhook/claudia-trades-7f3k2q?token=3f9c0d…a71b'
```

## 2. Preview the request

```sh
$ source ~/.config/claudia/watch.env
$ claudia watch claudia --history --min-usd 1 --notify webhook --webhook "$CLAUDIA_WATCH_WEBHOOK" --dry-run --count 1
  claudia › Live trades · $CLAUDIA · Claudia · mcap $336K
  Notify  n8n.example.com (dry run: nothing is sent)
  ● live
  18:08:50  ▼ SELL    $9.82   0.0906 SOL  JAqS…FHXb   mcap $323K
    would notify n8n.example.com:
    {"method":"POST","url":"https://n8n.example.com/webhook/claudia-trades-7f3k2q?***", … "body":{"source":"claudia","text":"SELL $9.82 of $CLAUDIA by JAqS…FHXb · mcap $323K", …}}
```

The token is redacted (`?***`), the body is what n8n will see as `$json.body`.

## 3. One real event end to end

```sh
$ claudia watch claudia --history --min-usd 1 --notify webhook --webhook "$CLAUDIA_WATCH_WEBHOOK" --count 1
```

n8n → Executions: `Claudia webhook` → `Token check` (true) → `Big trades only` (false, $9.82 < $1,000) → `Drop`. Correct.
To see the Telegram path once, temporarily set the IF threshold to 1, send one event, then set it back to 1000.

Telegram message:

```text
SELL $9.82 of $CLAUDIA by JAqS…FHXb · mcap $323K
https://useclaudia.xyz/t/sol/2j5SaS7xy776qCBpyPQbZjyQSAtKiFgrwjfErthnW2ZM
Research alert, not financial advice.
```

## 4. Run it for real, always on

Linux: `templates/service-units.md` → `claudia-watch.service` with `--min-usd 1000 --notify-per-minute 6`, then

```sh
$ systemctl --user enable --now claudia-watch
$ journalctl --user -u claudia-watch -n 5
… claudia watch: ● live
```

## 5. A bad request is rejected

```sh
$ curl -s -X POST 'https://n8n.example.com/webhook/claudia-trades-7f3k2q?token=wrong' -H 'content-type: application/json' \
    -d '{"source":"claudia","text":"BUY $99,999 of $CLAUDIA","data":{"amountUsd":99999}}'
{"message":"Workflow was started"}
```

n8n → Executions: `Token check` (false) → `Drop`. No Telegram message: a forged "whale buy" can't reach the person.

## 6. Kill switch and where things live

- Stop: `systemctl --user stop claudia-watch` (or deactivate the n8n workflow).
- Secret: `~/.config/claudia/watch.env` and the n8n Token check node. Rotate both together if either leaks.
- Nothing in this flow can sign, trade or post publicly.
