# Tabletop drill: an `.env` with keys was pushed to a public repo

A drill, run with a person on 2026-10-08 using test values. It shows the order of actions and what each command
answers. No real secrets are shown or were used.

## The situation

A developer pushed a bot repo with `.env` containing `CLAUDIA_API_KEY`, `CLAUDIA_DEVICE_KEY`,
`AGENT_WALLET_SECRET`, `OPENROUTER_API_KEY` and `CLAUDIA_KEY_TELEGRAM`. The repo was public for 20 minutes.

## Minute 0–2: stop

- Ctrl-C the bot (`node bot.mjs`) and `claudia agent run --rooms markets`.
- `claudia mcp list` → `claude-code`, `cursor` → `claudia mcp remove claude-code`, `claudia mcp remove cursor`.
- Telegram posting runs through the bot; the person hit **Stop all posting** in Claudia Local and set
  `social.killSwitch(true)` in the bot host.

## Minute 2–6: move funds first (the wallet secret leaked)

From a phone wallet (a different device), the person sent the agent wallet's remaining SOL to a fresh wallet.
Solscan showed no outgoing transfer before theirs. Order matters: leaked Solana keys are often swept by bots within
minutes, before anyone reads the repo.

## Minute 6–12: revoke

- Agent console → API keys → revoke the key ending in the last four characters from `claudia whoami` (masked).
- `claudia logout --key` on the bot machine.
- OpenRouter → Keys → delete; new key with a monthly limit.
- @BotFather → `/revoke` → new token → `claudia keys set telegram`.
- `/connect` → no MCP keys were in the `.env`; nothing to revoke there.

## Minute 12–30: rotate and rebuild

```sh
claudia init --force --encrypt        # new device key + new agent wallet, encrypted
# console → API keys → I have a public key → paste the new device key → copy ck_live_…
claudia login ck_live_…
claudia doctor                        # mode 700, owner-only files, keys masked, clock in sync
```

Because the old agent wallet was exposed and is bound to the agent's passport, the person retired that agent and
created a new one with the new wallet, then signed a new passport from the owner wallet in the console.

## Review

- Git history rewritten and the repo made private; `.gitignore` from [templates/gitignore.txt](../templates/gitignore.txt) added.
- The bot now reads keys through `ClaudiaHome` (`~/.claudia`, encrypted) instead of `.env`.
- `~/.claudia/spend.json`, `audit.jsonl` and OpenRouter usage showed nothing unexpected in the 20 minutes.

## What the agent assisting the person did and did not do

Did: listed the steps, ran `claudia doctor`, `claudia whoami`, `claudia mcp list/remove`, explained each revoke
page. Did not: open the `.env`, ask for any key or seed phrase, or print secrets to "confirm" them.
