# Config, keys and caps

## `~/.claudia` (folder 700, files 600; `--home` / `CLAUDIA_HOME` to move it)

| File | Holds | Secret? |
|---|---|---|
| `config.json` | base URL, RPC, caps, model/provider | no |
| `oauth.json` | `claudia login` token (refreshed) | yes |
| `keys.json` | provider keys from `claudia keys` (sealed with the passphrase when keys are encrypted) | yes |
| `device.json` · `wallet.json` | device key (signs requests) · agent wallet (signs Solana transactions) | yes |
| `credentials.json` | agent API key, legacy OpenRouter key | yes |
| `spend.json` | daily SOL spend ledger shared by the CLI and the MCP server | no |
| `media/` · `social/` | media jobs/library/ledger · social accounts (sealed), posts, audit log | tokens sealed |

Encrypt keys at rest: `claudia init --encrypt` (scrypt + AES-256-GCM). Scripts then need `CLAUDIA_PASSPHRASE` from a
secret store; never put it in a crontab line. Back the agent wallet up offline before funding it
([wallet-and-key-security](../../wallet-and-key-security/SKILL.md)).

## Key names (`claudia keys set <name>`)

- Models: `openrouter`, `openai`, `anthropic`, `xai`, `qwen`, `deepseek`, `kimi`
- Media: `google`, `openai`, `fal`, `elevenlabs`, `heygen`, `runway`, `byteplus`
- Social: `x`, `telegram`, `discord`, `bluesky`, `mastodon`, `neynar`, `neynar-signer`, `nostr`, `linkedin`, `youtube`,
  `buffer`, `zernio`, `upload-post`, `instagram`, `facebook`, `threads`, `tiktok`, `pinterest`, `social-vault`
- Notifications: `telegram-chat`, `discord-webhook`, `webhook`

Environment variables win over the file: `CLAUDIA_KEY_<NAME>` (e.g. `CLAUDIA_KEY_OPENAI`, `CLAUDIA_KEY_SOCIAL_VAULT`) or
the provider's usual one (`OPENAI_API_KEY`, `XAI_API_KEY`, `FAL_KEY`, `OPENROUTER_API_KEY`, …).
`claudia keys` and `claudia doctor` only ever show masked values (`sk-or-v1-…1234`).

## Other environment variables

`CLAUDIA_HOME`, `CLAUDIA_BASE_URL`, `CLAUDIA_API_KEY`, `CLAUDIA_DEVICE_KEY`, `CLAUDIA_PASSPHRASE`, `CLAUDIA_RPC_URL`,
`NO_COLOR`, `FORCE_COLOR=1|2|3`, `CLAUDIA_ASCII=1`, `CLAUDIA_DEBUG=1`.

## Caps

```sh
claudia config                                  # shows caps and today's spend
claudia config set max-sol-per-trade 0.02       # must be ≤ max-sol-per-day
claudia config set max-sol-per-day 0.1          # must be ≥ max-sol-per-trade
```

Defaults 0.05 SOL per trade and 0.2 SOL per UTC day. They apply to `buy`, `launch` (dev buy per trade; the whole
launch cost against the day), the agent chat's proposed trades, `claudia agent run --allow-trades`, and the local MCP
server (where the stricter of its env caps and these wins). Sells aren't capped by SOL amount but still need
confirmation. Presets: [templates/caps-presets.md](../templates/caps-presets.md).

## RPC

`claudia config set rpc-url <url>` — the person's own Solana RPC (public RPCs rate-limit and can't always read balances;
money commands refuse when the balance can't be read on mainnet). Keep API keys in RPC URLs out of shared screenshots.
