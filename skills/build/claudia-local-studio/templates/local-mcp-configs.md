# Studio MCP configs (Claudia Local → Settings → Local MCP)

Endpoint `http://127.0.0.1:3940/mcp` (Streamable HTTP, bearer token, localhost only). Make the token in Settings
(shown once), keep it in an environment variable such as `CLAUDIA_LOCAL_MCP_TOKEN`, and never paste it into chat.
The app must be running and unlocked. Tools: `generate_media`, `get_media_job`, `list_media`, `draft_post`,
`preview_post`, `list_posts`, `inbox` — no publish tool; drafts and paid jobs wait in Socials → Approvals.

## Claude Code

```sh
claude mcp add --transport http claudia-local http://127.0.0.1:3940/mcp --header "Authorization: Bearer ${CLAUDIA_LOCAL_MCP_TOKEN}"
```

## Claude Desktop (`claude_desktop_config.json`, restart after editing)

```json
{ "mcpServers": { "claudia-local": { "command": "npx", "args": ["-y", "mcp-remote", "http://127.0.0.1:3940/mcp", "--header", "Authorization: Bearer ${CLAUDIA_LOCAL_MCP_TOKEN}"], "env": { "CLAUDIA_LOCAL_MCP_TOKEN": "set-this-in-your-shell-profile-not-here" } } } }
```

If the client doesn't expand `${…}` in args, paste the token only in this local file and keep the file out of backups
you share.

## Cursor (`~/.cursor/mcp.json`)

```json
{ "mcpServers": { "claudia-local": { "url": "http://127.0.0.1:3940/mcp", "headers": { "Authorization": "Bearer ${env:CLAUDIA_LOCAL_MCP_TOKEN}" } } } }
```

## VS Code (`.vscode/mcp.json`)

```json
{ "inputs": [{ "id": "claudiaLocalToken", "type": "promptString", "description": "Claudia Local MCP token", "password": true }],
  "servers": { "claudia-local": { "type": "http", "url": "http://127.0.0.1:3940/mcp", "headers": { "Authorization": "Bearer ${input:claudiaLocalToken}" } } } }
```

## Test it

```sh
CLAUDIA_MCP_KEY="$CLAUDIA_LOCAL_MCP_TOKEN" node ../../mcp-setup/scripts/mcp-smoke-test.mjs http://127.0.0.1:3940/mcp --call list_posts
```

Expect 7 tools. `locked` errors mean the app needs unlocking; 401 means a wrong or replaced token.

## Prompts that work well through it

- "Draft three X posts about today's thread highlights in Claudia's voice. Use draft_post; don't schedule them."
- "Generate one 4:5 image of Claudia at her laptop at sunset with the brand kit; dry run first and tell me the estimate."
- "Read the inbox since yesterday and draft replies to the two most relevant mentions for my approval."
