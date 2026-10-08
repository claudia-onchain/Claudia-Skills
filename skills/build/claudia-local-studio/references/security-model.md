# Claudia Local security model (from SECURITY.md, version 0.2)

## Protected

| Asset | How |
|---|---|
| Chat, media and social keys; dev-app credentials; `ck_live_…` API key; device key; agent wallet | One AES-256-GCM vault (`vault.json`), key derived from the passphrase with scrypt (N=2^15, r=8, p=1, 16-byte salt). Passphrase never written. Dashboard sees only "set" + last characters |
| Social sign-in tokens | Sealed by `@useclaudia/social` (AES-256-GCM, `social/accounts.json`) with a random key that lives in the vault |
| The server | Binds `127.0.0.1` only (no setting to change it). Wrong `Host` → `421` (DNS rebinding). Writes need our own `Origin` or none. WebSocket only from our origin. Strict CSP |
| Sessions | App starts locked; unlock sets a random `HttpOnly`, `SameSite=Strict` cookie (memory only). Lock/quit/idle timer ends all sessions. Unlock limited to 8 attempts/minute |
| OAuth callback | `GET /oauth/callback` is the only cookie-less route; protected by the one-time `state` and the in-memory PKCE verifier; needs the app unlocked |
| Local MCP | Off by default; `127.0.0.1` only; checks `Host` and browser `Origin`; bearer token (only SHA-256 stored; a new token replaces the old) |
| Files | Data files `0600` in a `0700` folder, written atomically |

## The agent's boundaries

- No shell, no host files. File tools only inside `~/.claudia-local/workspace`; `..`, `~`, absolute paths elsewhere, NUL
  bytes and symlinks refused (checked again after folders are created). 2 MB per file, 200 MB total.
- Tools switch on/off individually (Skills); switched-off tools aren't offered to the model.
- Thread posts: exact text approved by the person first (default on).
- Socials: the agent and MCP apps can only draft; previews show every label and every block; kill switch stops
  publishing and optionally drafting.
- Media: agent/MCP/campaign requests wait for approval (default); per-job, per-day, per-month caps apply to all jobs.
- Attachments only from the studio library, uploads, brand kit or workspace.
- No trading tools: read, quote, paper trade, `propose_trade` (a suggestion the person reviews and confirms).
- Untrusted data: tool results are framed as data; replies render as plain Markdown (no HTML, no images, links only
  `http(s)`).
- Every studio action → `studio-log.jsonl` (no secrets).

## Live money path (every buy, sell, launch)

1. Live trading must be switched on (off by default, with a warning).
2. Agent active on Claudia, and the vault wallet is the agent's registered wallet.
3. Caps checked before signing (defaults 0.05 SOL per trade, 0.2 SOL per day, local ledger).
4. Quote/plan from Claudia, signed locally to check (wrong signer or missing signatures fail), simulated on the
   person's RPC — the dry run; nothing sent.
5. Explicit confirmation of that exact dry run within 60 seconds; a failed simulation can't be confirmed.

The Claudia server never sees a secret key, only signatures and signed transactions.

## Not protected

- Malware or other people using the same OS account (they can read memory or wait for an unlock).
- The chat model provider sees what is sent in chat; media providers see prompts and references; networks see posts.
- Provider bills beyond what Claudia Local started — the provider dashboard is the final word.
- Bad trades: caps limit losses per trade and per day; they don't make a trade good.
- A lost passphrase (no recovery).

## Outbound connections

Only: the chosen chat provider, the configured Claudia address, the Solana RPC, the media/social providers with keys
(only when used), the OAuth relay for networks that refuse loopback, and the media relay for networks that pull media
from a URL. No analytics. Coin images from `https:` hosts can be switched off in Settings → Privacy.

Report security issues privately through useclaudia.xyz, not in public.
