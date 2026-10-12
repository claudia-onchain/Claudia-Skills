# Safety settings: <project name>

Fill the "This project" column and keep this file next to the code. Defaults are from `@useclaudia/sdk` 0.3.0
(checked 2026-10).

## Claudia options (all three adapters and the executor)

| Option | Default | Safe value for research | This project | Why |
|---|---|---|---|---|
| `filter` | Read-only tools of the data and trade servers (no local tools) | `(t) => t.server === "data" && ALLOW.has(t.name)` | <allow-list> | The default includes `quote` and `get_trade_status`, which need a Trade sign-in |
| `includeWrites` | `false` | `false` | <false / true + reason> | Ignored when `filter` is set |
| `mcp` (adapters) | Forward unknown tools to the online MCP | Leave unset for data-only lists; set `{ token }` only for writes | <value> | The token is an OAuth access token from wallet sign-in |
| `mcp` (executor) | Forward unknown tools | `false` | <value> | Unknown tools throw `unknown_tool` instead of reaching a server |
| `maxOutputChars` | 20000 | 8000–12000 for small-context models | <n> | One holder list can be long |
| `handlers` | none | Only your own reviewed read handlers | <none> | Replaces or adds tool implementations |
| `client` / `clientOptions` | A new public `ClaudiaClient` | Default; `timeoutMs` 20000, `maxRetries` 2 on 429 | <value> | Never pass an agent API key to a read-only agent |

## Framework limits

| Framework | Setting | Safe value | This project |
|---|---|---|---|
| Vercel AI SDK | `stopWhen` | `isStepCount(8)` (AI SDK 5: `stepCountIs(8)`) | <n> |
| Vercel AI SDK | `toolApproval` | `"user-approval"` for every write tool, if any | <value> |
| LangChain | `recursionLimit` (invoke config) | 20 | <n> |
| LangChain | `humanInTheLoopMiddleware` | `interruptOn` every write tool, if any | <value> |
| OpenAI Agents | `maxTurns` (run options) | 8 (SDK default 10) | <n> |
| OpenAI Agents | Write-tool approval | Automatic (`needsApproval: true`); a person answers each interruption | <who> |
| Raw loop | Step cap, name re-check | 8 steps; reject tools not in the allow-list | <n> |

## Keys and data

| Item | Where it lives | Who can read it |
|---|---|---|
| Model API key | <env var / secret manager> | <people> |
| Claudia OAuth token (only with writes) | <env var / secret manager> | <people> |
| Logs | <path> | <people>; logs never contain keys or tokens |

## Tests passed

- [ ] A normal question finished under the step limit with data age cited.
- [ ] A coin description containing instructions was reported as data.
- [ ] A forced loop stopped at the limit with a clear message.
- [ ] (Writes only) Each write paused for a person; a rejected one did not run; a trade ended at a confirm link.

Signed off by <person> on <YYYY-MM-DD>.
