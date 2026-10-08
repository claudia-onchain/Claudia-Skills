# Where keys live

Read this when auditing a machine, moving a setup, or deciding what to back up. Paths are defaults; `CLAUDIA_HOME` /
`--home` moves the CLI folder, `CLAUDIA_LOCAL_HOME` moves Claudia Local's. Don't open these files to "look": use
`claudia doctor`, `claudia keys` and `claudia status`, which mask values.

## `~/.claudia` (CLI, SDK `ClaudiaHome`, local MCP server)

Folder mode 700, files 600, written atomically.

| File | Holds | Secret? | Encrypted with `--encrypt`? |
|---|---|---|---|
| `device.json` | device key (signs `/api/v1` requests) | yes | yes (scrypt + AES-256-GCM) |
| `wallet.json` | agent wallet (signs Solana transactions) | yes | yes |
| `credentials.json` | `ck_live_…` API key, optional OpenRouter key | yes | yes |
| `keys.json` | provider keys from `claudia keys set` | yes | sealed with the passphrase when the Claudia keys are encrypted |
| `oauth.json` | `claudia login` access + refresh tokens | yes | no (owner-only file); revocable on `/connect` |
| `config.json` | base URL, RPC, caps, model / provider | no | — |
| `spend.json` | daily SOL spend ledger | no (but sensitive) | — |
| `social/accounts.json` | social tokens | yes | sealed with the `social-vault` key (AES-256-GCM via HKDF-SHA256) |
| `social/audit.jsonl`, `posts.json`, `state.json` | social history, kill switch | no | — |
| `media/jobs.json`, `spend.jsonl`, `library/` | media jobs, spend, files + provenance | no | — |

Environment variables override files: `CLAUDIA_API_KEY`, `CLAUDIA_DEVICE_KEY`, `CLAUDIA_PASSPHRASE`,
`CLAUDIA_KEY_<NAME>` (e.g. `CLAUDIA_KEY_OPENAI`), or the provider's usual variable (`OPENAI_API_KEY`, `FAL_KEY`…).
Environment variables are visible to every process of that user and often end up in shell history and crash
reports; prefer the encrypted store, or inject env vars from a secrets manager at start-up.

## `~/.claudia-local` (Claudia Local)

- `vault.json`: every secret in one AES-256-GCM box; the key is derived from the passphrase with scrypt (N=2^15,
  r=8, p=1, 16-byte salt). The passphrase is never written anywhere; lose it and the vault is gone.
- The dashboard never receives a secret: "set / not set" and the last four characters only. Showing the wallet key
  for a backup asks for the passphrase again.
- Importing from `~/.claudia` copies keys into the vault and leaves the CLI files as they are; delete the CLI copy if
  it's no longer used.
- The local MCP server (off by default, `127.0.0.1:3940`) needs a bearer token shown once; only its SHA-256 is kept.
- `studio-log.jsonl`: every key change, generation, approval, draft and publish (no secrets).

## The website

- The in-browser trading wallet is created in the browser and encrypted with the person's passcode (PBKDF2 +
  AES-GCM); it never leaves the device; nobody can reset the passcode. Or the person connects Phantom.
- Sign-in is a signed message (no transaction, no fee) that sets a session cookie.
- Hosted agents are the exception: their escrow wallets are held by Claudia (encrypted on the server), follow the
  owner's policy, start in paper mode, and have no withdrawal or key-export endpoint.

## On Claudia's server (what it stores about you)

Only hashes and public keys: the device **public** key registered with each API key, SHA-256 hashes of OAuth tokens
and MCP keys, the agent wallet address, the passport transaction. Never a private key, a provider key or a social
token.

## Signed requests, briefly

`Authorization: Bearer ck_live_…` plus `X-Claudia-Timestamp` (unix ms, within ±5 min), `X-Claudia-Nonce` (16–128
chars, single use) and `X-Claudia-Signature` = base58 ed25519 signature by the device key over
`METHOD\nPATH\nTIMESTAMP\nNONCE\nsha256_hex(body)`, where PATH includes the query string. A captured request can't
be replayed (nonce) or altered (signature), and the API key alone can't sign. Five signature failures in ten minutes
or a nonce replay earn the agent a strike.
