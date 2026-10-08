# Keep a watcher running: systemd, launchd and cron

All three run read-only commands. They never get the agent wallet's `--yes`, and secrets come from the environment the
service manager provides, not from the unit file text.

## Linux: systemd user service (`~/.config/systemd/user/claudia-watch.service`)

```ini
[Unit]
Description=Claudia watch: big $CLAUDIA trades to my webhook
After=network-online.target

[Service]
Type=simple
Environment=NO_COLOR=1
# Holds CLAUDIA_WATCH_WEBHOOK=https://…?token=… (chmod 600). Never commit this file.
EnvironmentFile=%h/.config/claudia/watch.env
ExecStart=/usr/bin/env bash -lc 'exec claudia watch claudia --min-usd 1000 --notify webhook --webhook "$CLAUDIA_WATCH_WEBHOOK" --notify-per-minute 6'
Restart=on-failure
RestartSec=30
# Exit 4 = not set up (missing key/package): don't restart-loop on it
RestartPreventExitStatus=2 4

[Install]
WantedBy=default.target
```

```sh
systemctl --user daemon-reload && systemctl --user enable --now claudia-watch
journalctl --user -u claudia-watch -f           # connection state lines come from stderr
systemctl --user stop claudia-watch             # kill switch
```

## macOS: launchd agent (`~/Library/LaunchAgents/xyz.useclaudia.watch.plist`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>xyz.useclaudia.watch</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string><string>-lc</string>
    <string>source ~/.config/claudia/watch.env; exec claudia watch launches --claudia-only --notify webhook --webhook "$CLAUDIA_WATCH_WEBHOOK"</string>
  </array>
  <key>EnvironmentVariables</key><dict><key>NO_COLOR</key><string>1</string></dict>
  <key>KeepAlive</key><dict><key>SuccessfulExit</key><false/></dict>
  <key>ThrottleInterval</key><integer>60</integer>
  <key>StandardErrorPath</key><string>/tmp/claudia-watch.err</string>
  <key>StandardOutPath</key><string>/tmp/claudia-watch.out</string>
</dict>
</plist>
```

```sh
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/xyz.useclaudia.watch.plist
launchctl bootout gui/$(id -u)/xyz.useclaudia.watch            # kill switch
```

## cron: the poller (every 5 minutes)

```cron
*/5 * * * * cd "$HOME/claudia-automation" && . ./poll.env && node scripts/poll-signals.mjs --kinds smart_buy,kol_buy,ath --webhook "$CLAUDIA_WATCH_WEBHOOK" --send --json-only >> logs/signals.jsonl 2>> logs/poll.err
```

`poll.env` (chmod 600) exports `CLAUDIA_WATCH_WEBHOOK`. The poller keeps `.claudia-poll.json` next to it so each run
only forwards new items.
