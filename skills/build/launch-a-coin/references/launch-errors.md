# Launch errors

Read this when a launch command or tool call fails. CLI errors also set the exit code (3 = refused by a safety
check or cap, 4 = not set up, 5 = rate limited, 1 = other). With `--json` the error arrives as
`{ "ok": false, "error": "<code>", "message": "…", "hint": "…" }`.

| Code | HTTP | Where | Meaning | What to do |
|---|---|---|---|---|
| `launchpad_closed` | 403 | plan | The chain or launchpad isn't open, or not open to agents (`allowAgents`) | Read `/api/platform/config`; the admin note says why |
| `passport_required` | 403 | plan, CLI | Agent has no passport | `claudia passport` / console → Passport |
| `wallet_required` | 400 | plan | No agent wallet registered | Register it with the passport |
| `agent_paused` · `agent_quarantined` · `agent_banned` | 403 | plan, CLI | Agent not active | See the agent console; strikes expire after 30 days |
| `bad_name` | 400 | plan, CLI | Empty, control characters, or > 32 bytes | Shorten; emoji count 4 bytes |
| `bad_ticker` | 400 | plan, CLI | Not A–Z0–9 or > 13 characters | Fix the ticker |
| `split_not_atomic` | 422 | plan | Fee split can't fit the launch transaction (no lookup table) | Platform-side; never launch without the split |
| `tx_too_large` | 422 | plan | Name, ticker, links too long for one transaction | Shorter description / links |
| `pinning_required` | 503 | plan | Mainnet production without IPFS pinning | Platform-side; retry later |
| `treasury_mismatch` | 503 | plan | Server's platform wallet secret doesn't match the committed one | Platform-side safety stop |
| `rate_limited` | 429 | plan | 3 plans/hour or 10/day used (`Retry-After`) | Wait |
| `nothing_to_sign` | — | CLI | Server couldn't build transactions | Read the warnings it prints |
| `simulation_failed` | — | CLI | The launch would fail on-chain (often not enough SOL) | Fix the cause; don't pass `--force` to bypass it |
| `cap_exceeded` | — | CLI, local MCP | Dev buy over per-trade cap, or total over what's left today | Smaller dev buy, or the person raises a cap |
| `insufficient_sol` | — | CLI | Balance < total cost + 0.005 SOL | Fund the agent wallet |
| `confirmation_required` | — | CLI | `--json` / no terminal without `--yes` | The person confirms |
| `cancelled` | — | CLI | The person answered no | Nothing was sent |
| `hash_mismatch` | 403 | confirm | Signatures don't belong to the plan | Re-plan |
| `expired` | — | MCP status | Confirm link older than 2 minutes | Prepare again after a new yes |

Image upload messages from the CLI: "Images must be 4 MB or smaller", "That file isn't a PNG, JPEG, GIF or WEBP
image", "No such image file". A warning "The server stored the image locally (not pinned to IPFS)" on mainnet means
the metadata may not be permanent; stop and ask.
