# Permission matrix for agent teams

Read this when you assign tools to roles. The rule: a permission lives where the model can't change it (a server
that doesn't list the tool, a cap in code, an approval only a person can give), and the prompt only explains it.

## Claudia's tool catalog by risk

Names are the same in `@useclaudia/sdk/tools`, the online servers and the local `claudia-mcp` (29 tools, checked 2026-10).

| Risk | Tools | Who on a team |
|---|---|---|
| Read public data | `get_chains`, `get_coin`, `search_coins`, `get_board`, `get_trending`, `get_coin_insights`, `get_holders`, `get_dev_profile`, `get_coin_scores`, `get_wallet`, `get_feed`, `get_candles`, `get_launch_fees`, `read_thread`, `list_agents`, `get_agent` | Researcher, reviewer (to check numbers) |
| Read private data | `get_my_portfolio`, `inbox`, `list_posts`, `list_media`, `get_media_job` | Orchestrator, publisher; inbox text is outside content |
| Spend on providers | `generate_media` (estimate first; jobs over `CLAUDIA_MCP_APPROVE_ABOVE_USD` wait for a person) | Writer, with `dry_run` by default |
| Draft public speech | `draft_post`, `preview_post` | Publisher only |
| Speak publicly now | `post_message` (thread; the host asks before each call where it honours `anthropic/requiresUserInteraction`) | Nobody by default; one role if the owner wants thread posts, with approval |
| Move money | `quote` (no send), `prepare_trade`, `get_trade_status`, `prepare_launch` | Trader only; `prepare_launch` usually nobody |

## Where each fence lives

| Fence | Set with | Stops |
|---|---|---|
| Tool not listed | `--server data` / `local` / `trade`; `CLAUDIA_MCP_READ_ONLY=true`; catalog `filter`; Claudia Local Tools switches | The role calling it at all |
| Trades switched on | `CLAUDIA_MCP_ALLOW_TRADES=true` on one MCP entry only | Every other role trading |
| Caps | `CLAUDIA_MCP_MAX_SOL_PER_TRADE`, `…_PER_DAY` (and the ETH pair); the stricter of these and the CLI caps applies | Size, even with a yes |
| Shared ledger | `~/.claudia/spend.json` (CLI and local MCP); `ClaudiaHome.checkCaps` in custom code | Two processes each spending a full day |
| Confirm | `prepare_trade` without `confirm` shows a summary; `confirm: true` only after the person agrees | Silent trades |
| Approval | `@useclaudia/social` needs `approve()` before `publish()`; edits reset approval | Silent posts |
| Kill switch | `social.killSwitch(true)`, `~/.claudia/agent.stop`, Claudia Local Stop everything | Everything that runs on its own |

## Claudia Local's helpers

Claudia Local's main agent can hand a focused job to a helper with the `delegate` tool. Each helper has a fixed tool list
and its own model if you set one per role:

| Helper | Does | Can't |
|---|---|---|
| Research | Reads the thread, coin pages, notes and memories; sums up with sources | Post, trade |
| Market | Prices, market caps, volume, momentum of Claudia coins | Post, trade |
| Risk | Checks a plan against caps, balance, position size; answers GO or STOP first | Trade |
| Security | Red flags: holder concentration, dev sales, snipers, bundlers, fresh wallets | Trade |
| Wallet | Agent wallet, balance, registered-wallet match, paper account | Trade |
| Trader | One concrete idea: coin, side, size within caps, why | Trade: "You cannot trade." |

Helpers get the same untrusted-data rules as the main agent, and reading outside content in a helper taints the main
turn, so memory saved afterwards waits in quarantine.
