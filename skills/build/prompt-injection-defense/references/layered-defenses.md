# Layered defenses: which layer stops what

Read this when deciding where to spend effort. The layers are ordered from "the model has to get it right" to "the model
can't change it". Put your weight on the bottom half.

| # | Layer | Where it lives | Stops | Fails when |
|---|---|---|---|---|
| 1 | System rule about outside content | prompt | most crude overrides | the model is persuaded, confused or the text is long |
| 2 | Labelled outside blocks and package quoting | code that builds the prompt | the model mistaking data for instructions | markers are stripped, or a summary drops them |
| 3 | Scanner / classifier | code, logs | nothing on its own; tells you to look | paraphrase, other languages, new tricks |
| 4 | Tool allow-list per task | server config, catalog filter | a fooled summariser posting or trading | one agent holds read and write tools |
| 5 | Taint and source checks (`mayAct`) | code | outside content triggering an action | the source isn't tracked through hand-offs |
| 6 | Confirm-first and approvals | app state, a person | silent posts and trades | approvals are rubber-stamped |
| 7 | Caps and the shared ledger | code and config | large losses even with a yes | caps set high "for convenience" |
| 8 | Memory quarantine | code | one trick becoming a standing rule | file reads or some tools don't taint the turn |
| 9 | Output checks and plain rendering | code | exfiltration, leaked prompts, echoed instructions | new output channels nobody checks |
| 10 | Kill switch, audit, rotation | ops | damage spreading after a hit | nobody watches the audit trail |

## Mapping to OWASP Top 10 for LLM Applications 2025 (checked 2026-10)

| OWASP item | Layers |
|---|---|
| LLM01:2025 Prompt Injection | 1, 2, 3, 4, 5 |
| LLM02:2025 Sensitive Information Disclosure | 9, plus keys never in prompt or memory |
| LLM06:2025 Excessive Agency | 4, 5, 6, 7 |
| LLM07:2025 System Prompt Leakage | 9; nothing secret in the prompt in the first place |
| LLM10:2025 Unbounded Consumption | budgets per role and run, rate limits, caps |

## What Claudia's packages already do

| Package | Built in |
|---|---|
| `@useclaudia/mcp` | Quotes coin names, descriptions, bios, thread posts and inbox messages (`«…»`, `<untrusted>`); trades only with `CLAUDIA_MCP_ALLOW_TRADES=true`, caps and `confirm: true`; `CLAUDIA_MCP_READ_ONLY`; social and media stay human-approved |
| `@useclaudia/sdk` | Tool catalog quotes untrusted text (`q()`, `block()`); adapters default to read-only tools; no caps in the SDK itself, so add `ClaudiaHome.checkCaps` |
| `@useclaudia/social` | Approval before publish, edits reset approval, rules in `preview()` and `publish()` that can't be turned off, kill switch, audit log; inbox text documented as untrusted |
| `@useclaudia/cli` | Every money command shows a summary and waits for "y"; without a terminal nothing spends or posts without `--yes`; kill file for `agent run` |
| Claudia Local | `<outside>` blocks with a system rule; outside content can't start a trade, launch or post; memory from it waits; skills reviewed, pinned and never run; replies rendered without HTML or remote images |

Your own code has to keep these properties when it sits between the packages and the model: don't unwrap quoted text,
don't give a reading task write tools, and don't add a path that publishes or signs without a person.
