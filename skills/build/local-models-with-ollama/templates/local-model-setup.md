# Local model setup record

Keep this with the operator's notes. Update it after any model, server or role change.

## Machine

- Computer: `<model, year>`
- Memory: `<RAM GB>` · GPU / VRAM: `<GPU, GB or "Apple unified">`
- OS: `<name and version>`

## Server

- Server: `<Ollama | LM Studio>` version `<x.y.z>`
- Address: `<http://127.0.0.1:11434/v1 | http://127.0.0.1:1234/v1 | Other: …>`
- Bound to loopback only: `<yes | no — why>`
- Context setting: `<OLLAMA_CONTEXT_LENGTH=… | Modelfile <name> | LM Studio load setting …>`
- Cloud models: `<off (OLLAMA_NO_CLOUD=1 / server.json) | on — reason>`
- LM Studio authentication: `<off | on, token stored in Claudia Local's vault under "Other OpenAI-compatible server">`

## Model

- Tag: `<model:tag>` · download `<GB>` · capabilities `<tools, vision, thinking>`
- `ollama ps` on a normal day: SIZE `<…>` · PROCESSOR `<100% GPU | split>` · CONTEXT `<…>`
- Speed: about `<n>` tokens/s on a 300-word reply

## Roles in Claudia Local

| Role | Provider | Model | Why |
|---|---|---|---|
| Main chat | `<…>` | `<…>` | `<…>` |
| Helpers | `<…>` | `<…>` | `<…>` |
| Tasks | `<…>` | `<…>` | `<…>` |
| Fallback | `<none | provider>` | `<…>` | `<…>` |

## Smoke test (`tool-call-smoke-test.md`)

| Test | Result | Note |
|---|---|---|
| 1 Single read | `<pass/partial/fail>` | `<…>` |
| 2 Arguments | `<…>` | `<…>` |
| 3 Choosing tools | `<…>` | `<…>` |
| 4 Load a skill | `<…>` | `<…>` |
| 5 Refuses | `<…>` | `<…>` |

## Privacy statement (what the operator can truthfully say)

`<e.g. "Chat and memory are processed on this laptop. Coin data, posting and media generation call their services.">`

Checked by `<name>` on `<YYYY-MM-DD>`.
