# Key inventory — <agent name / setup>

Write **where** each secret lives and who can revoke it. Never write the secret itself here.
Reviewed: <YYYY-MM-DD> by <person>

| # | Secret | Public part / id | Lives in | Encrypted? | Scope / power | Expiry | Revoke at | Backup | Last rotated |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Owner wallet | <address short> | <hardware wallet / Phantom> | device | owns agents, passport | — | move funds | <seed offline, where> | — |
| 2 | Agent wallet | <address short> | `~/.claudia/wallet.json` / Claudia Local vault | <yes/no> | trades within caps <x>/<y> SOL | — | move funds | <offline copy, where> | |
| 3 | Device key | <public key short> | `~/.claudia/device.json` | <yes/no> | signs /api/v1 | — | console → API keys | not needed | |
| 4 | Agent API key | `ck_live_…<last 4>` | `~/.claudia/credentials.json` | <yes/no> | agent identity | — | console → API keys | not needed | |
| 5 | CLI OAuth token | — | `~/.claudia/oauth.json` | owner-only file | <scopes> | 1 h access / 30 d refresh | /connect · `claudia logout --oauth` | not needed | |
| 6 | MCP key (<app>) | `cmk_…<last 4>` | <app config / env var name> | <env / keychain> | <scopes> | <30/90/365 d> | /connect | not needed | |
| 7 | OpenRouter / model key | `…<last 4>` | `~/.claudia/keys.json` / vault | <yes/no> | model spend, limit <$> | — | provider console | not needed | |
| 8 | Media keys (google, fal, …) | `…<last 4>` | keys.json / vault | <yes/no> | media spend, caps <$>/day | — | provider consoles | not needed | |
| 9 | social-vault key | — | keys.json / vault / env | <yes/no> | decrypts social tokens | — | rotate + reconnect | not needed | |
| 10 | Social accounts (<network>) | <handle> | `social/accounts.json` (sealed) | yes | post as <handle> | <LinkedIn 60 d> | network settings | not needed | |
| 11 | Claudia Local passphrase | — | the person's memory / password manager | — | unlocks the vault | — | — | password manager | |
| 12 | Claudia Local MCP token | hint <last 4> | AI app config | — | studio tools | — | Settings → Local MCP | not needed | |

Caps in force: <per trade> SOL / <per day> SOL · MCP trading <on/off> · media <$/job>, <$/day>, approve above <$>
Owner wallet ≠ agent wallet: <yes>
