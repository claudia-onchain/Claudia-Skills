# App matrix: where Claudia's MCP config goes

Online URLs: Data `https://useclaudia.xyz/mcp/data`, Trade `https://useclaudia.xyz/mcp/trade` (Streamable HTTP).
Local: `npx -y @useclaudia/mcp [--server data|trade|local|all]` (stdio) or `--http <port>` (`http://127.0.0.1:<port>/mcp`).
Menu names and config keys were checked against each app's docs and the Claudia CLI on 2026-10-08 (checked 2026-10). Apps
rename menus often; if a menu is missing, search the app's settings for "MCP" or "connector".

## Apps the CLI installs (`claudia mcp install <app>`)

| App | `<app>` | Config file (macOS/Linux; Windows uses `%APPDATA%`/`%USERPROFILE%`) | Remote entry | Sign-in |
|---|---|---|---|---|
| Claude Code | `claude-code` | `~/.claude.json` (`mcpServers`, user scope) or project `.mcp.json` | `{ "type": "http", "url" }` | `/mcp` → authenticate |
| Claude Desktop | `claude-desktop` | `~/Library/Application Support/Claude/claude_desktop_config.json` | stdio only in the file; remote via Settings → Connectors (or `npx -y mcp-remote <url>`) | connector flow |
| Cursor | `cursor` | `~/.cursor/mcp.json` or `.cursor/mcp.json` | `{ "url" }` | asks on first use |
| VS Code (Copilot) | `vscode` | user `…/Code/User/mcp.json` or `.vscode/mcp.json` (`servers`) | `{ "type": "http", "url" }` | opens browser |
| Windsurf / Devin Desktop | `windsurf` | `~/.config/devin/mcp_config.json` (older: `~/.codeium/windsurf/mcp_config.json`) | `{ "serverUrl" }` | refresh MCP list |
| Zed | `zed` | `~/.config/zed/settings.json` (`context_servers`, comments kept) | `{ "url" }` | Zed runs OAuth when no header |
| OpenAI Codex CLI | `codex` | `~/.codex/config.toml` (`[mcp_servers.claudia]`) | `url = "…"` | `codex mcp login <name>` |
| Gemini CLI | `gemini` | `~/.gemini/settings.json` | `{ "httpUrl" }` | `/mcp auth <name>` |
| Qwen Code | `qwen` | `~/.qwen/settings.json` | `{ "httpUrl" }` | `/mcp` |
| Grok Build | `grok` | `~/.grok/config.toml` | `url = "…"` | browser on first tool call |
| LM Studio | `lm-studio` | `~/.lmstudio/mcp.json` | `{ "url" }` (0.4.10+ can do OAuth) or header with `cmk_…` | MCP key for older versions |
| Cline | `cline` | `~/.cline/data/settings/cline_mcp_settings.json` (+ VS Code globalStorage copy) | `{ "type": "streamableHttp", "url" }` | header or OAuth |
| Goose | `goose` | `~/.config/goose/config.yaml` (`extensions`) | `type: streamable_http`, `uri` | `goose configure` |

`claudia mcp install <app>` options: `--server data|trade` (default data), `--local` (stdio via npx), `--dry-run` (diff
only), `--home <dir>`. It writes one entry named `claudia` or `claudia-trade` and backs the old file up as
`<file>.claudia-backup`. `claudia mcp print <app>` shows the config without touching files; `claudia mcp list` shows
status per app; `claudia mcp remove <app>` deletes Claudia's entry only.

## Apps configured in their UI

| App | Steps | Notes |
|---|---|---|
| Claude.ai / Claude Desktop (remote) | Customize (Settings) → Connectors → Add custom connector → name `Claudia`, URL Data; repeat for Trade | Shared between web, desktop and mobile. Entry plan allows one custom connector; Team/Enterprise owners add it under Organization settings → Connectors first |
| ChatGPT | Settings → Security and login → Developer mode on; apps/plugins page → + → add MCP server → URL → OAuth | Can't send a fixed key, so Trade needs OAuth. Write tools depend on plan (Business/Enterprise/Edu full access); desktop: Settings → MCP servers → Add server → Streamable HTTP |
| grok.com | Connectors → New Connector → Custom → URL | Business plans: admin first |
| Mistral Le Chat | Connectors → Add Connector → Custom MCP Connector | Detects OAuth for Trade; keep write tools on manual approval |
| Perplexity | Settings → Connectors → Custom connector → Remote → URL | Paid plans; the Mac app can run the local server |
| JetBrains AI Assistant | Settings → Tools → AI Assistant → Model Context Protocol (MCP) → Add → paste `{"mcpServers":{"claudia":{"url":"…/mcp/data"}}}` | Junie: `~/.junie/mcp/mcp.json`, same block; choose Authorize for Trade |

## APIs and automation tools (no OAuth → MCP key)

| Tool | Config | Approval |
|---|---|---|
| OpenAI Responses API | tool `{ "type": "mcp", "server_label", "server_url", "require_approval" }`; Trade adds `"authorization": "cmk_…"` | Data `never`, Trade `always` |
| xAI Responses API | tool `{ "type": "mcp", "server_label", "server_url", "headers": { "Authorization": "Bearer cmk_…" } }` | keep Trade out of unattended runs |
| n8n | MCP Client Tool (AI agent sub-node) or MCP Client node: Server URL, transport HTTP Streamable, Authentication Bearer / Header / MCP OAuth2 / None, Tools to include All / Selected / All Except | Select read tools only for unattended workflows |
| Zapier | "MCP Client by Zapier" app: Server URL, Transport Streamable HTTP, OAuth yes/no, Bearer token (ignored when OAuth = yes) | Read tools only |
| Vercel AI SDK / LangChain / OpenAI Agents / LlamaIndex | see [sdk-quickstart](../../sdk-quickstart/SKILL.md) | adapters set `needsApproval` for writes |

## Local server environment variables

| Variable | Default | Effect |
|---|---|---|
| `CLAUDIA_MCP_SERVER` | `all` | same as `--server` (useful when a launcher has its own `--server` flag) |
| `CLAUDIA_MCP_READ_ONLY` | `false` | no posting, trading, media jobs or drafts |
| `CLAUDIA_MCP_ALLOW_TRADES` | `false` | enables `quote`, `prepare_trade`, `get_trade_status`, `prepare_launch` with the agent wallet |
| `CLAUDIA_MCP_MAX_SOL_PER_TRADE` / `_PER_DAY` | `0.05` / `0.2` | hard caps; stricter of these and `~/.claudia` caps wins |
| `CLAUDIA_MCP_APPROVE_ABOVE_USD` | `0` | media jobs above this wait for approval in Claudia Local or the CLI |
| `CLAUDIA_MCP_MEDIA_PER_DAY_USD` | `5` | daily media spend ceiling |
| `CLAUDIA_KEY_<NAME>` | | the person's own media/social provider keys |
| `CLAUDIA_HOME`, `CLAUDIA_BASE_URL`, `CLAUDIA_API_KEY`, `CLAUDIA_DEVICE_KEY`, `CLAUDIA_PASSPHRASE`, `CLAUDIA_RPC_URL` | | as for the CLI |

Set secrets as environment variables in the app's own env block (most JSON configs accept `"env": { … }`), or let the
local server read the CLI's encrypted `~/.claudia`. Never paste them into a prompt.

## Claudia Local's studio MCP (different server)

Claudia Local can run its own MCP at `http://127.0.0.1:3940/mcp` (off by default, bearer token made in Settings → Local
MCP, shown once). Tools: `generate_media`, `get_media_job`, `list_media`, `draft_post`, `preview_post`, `list_posts`,
`inbox`. No publish tool. The app must be running and unlocked. Details in
[claudia-local-studio](../../claudia-local-studio/SKILL.md).
