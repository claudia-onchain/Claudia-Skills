# Key rotation

Read this for the monthly rotation and after any suspected exposure. Names, not values, go in the ops card.

| Secret | Where | Rotate | How |
|---|---|---|---|
| agent API key `ck_live_…` | `~/.claudia/credentials.json` | monthly; immediately if exposed | console → API keys → I have a public key → paste the **same** device public key (`claudia init` without `--force` prints it and changes nothing) → new key → `claudia login` (prompt) → `claudia whoami` → revoke the old key |
| device key | `~/.claudia/device.json` | if the machine or file is exposed | needs new keys: `claudia init --force` makes a new device key **and a new wallet** — plan the wallet first (see P3) |
| agent wallet | `~/.claudia/wallet.json` | only on exposure (can't be re-registered) | move funds out; new agent with a new setup |
| MCP key `cmk_…` | the app's config / secret store | at its expiry (30 / 90 / 365 days) or monthly | `/connect` → new key with the same scopes → update the app → revoke the old |
| OAuth grants (AI apps, `claudia login`) | the app / `~/.claudia/oauth.json` | when an app is no longer used | `/connect` → revoke the app · `claudia logout --oauth` |
| model / media keys | provider dashboards; `claudia keys` / `CLAUDIA_KEY_<NAME>` | quarterly; immediately if exposed | create new at the provider → `claudia keys set <name>` (prompts) → delete the old at the provider |
| social tokens | sealed in `~/.claudia/social/accounts.json` with the `social-vault` key | on expiry (LinkedIn 60 days, YouTube testing apps 7 days) or exposure | `claudia connect <network>`; revoke the app in the network's settings |
| `social-vault` key | key store / `CLAUDIA_KEY_SOCIAL_VAULT` | if exposed | new key, then reconnect every account (old sealed tokens become unreadable) |
| passphrase for `~/.claudia` | the owner's password manager | if exposed | re-run setup on a clean machine; there is no in-place change command |

Rules:

- An agent can have at most 3 active API keys (`409 key_limit`); revoke spares before rotating.
- Rotate by **adding the new key first**, switching, testing, then revoking the old — except on exposure, where you revoke first.
- `claudia keys set <name>` and `claudia login` without an argument both prompt without echo; prefer them over putting secrets on the command line.
- Keep a dated rotation log (what, when, who) without values.
