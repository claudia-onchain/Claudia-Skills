# How Claudia Local finds local models

Read this when a local server isn't detected, when you use a non-default port, or when Claudia Local runs in Docker.
Everything here is taken from Claudia Local 0.3's own code and README (checked 2026-10-12).

## Detection

- Two presets exist under Settings → **Chat model**:
  - **Ollama (this computer)** — base URL `http://127.0.0.1:11434/v1`, no key.
  - **LM Studio (this computer)** — base URL `http://127.0.0.1:1234/v1`, no key.
- When the dashboard asks for the presets, the server probes:
  1. `http://127.0.0.1:11434/api/tags` (Ollama's model list). If that fails, `http://127.0.0.1:11434/v1/models`.
  2. `http://127.0.0.1:1234/v1/models` (LM Studio).
- Each probe has a 900 ms timeout and refuses redirects. A server that answers with an error status counts as not running.
- Results are cached for 20 seconds. **Check again** in the dashboard forces a fresh probe.
- The model menu lists what the server reports: models you pulled in Ollama, models available in LM Studio (up to 200).
- A local preset counts as usable only while it is running; there is no key to set.

## Calls

- Chat goes to `<base>/chat/completions` with streaming on, `max_tokens` from Claudia Local's settings and the tool list
  with `tool_choice: "auto"` (Ollama ignores `tool_choice`; its Chat Completions endpoint supports tools).
- No `Authorization` header is sent for the local presets.
- Each call has a 120-second limit. Network errors are retried twice (after about 0.8 s and 1.6 s); 429 and 5xx answers
  are retried twice too.
- If the server answers 400 or 404 with an error that mentions tools, Claudia Local turns tools off for that client and
  shows "This model can't use tools, so it will answer without them."
- Vision is guessed from the model id. Ollama: `llava`, `vision`, `-vl`, `gemma3`, `llama4`, `minicpm-v`, `moondream`.
  LM Studio: `llava`, `vision`, `-vl`, `gemma-3`, `pixtral`. Other ids get text only. **Other (OpenAI-compatible)** never
  sends images.
- Spend for local presets is recorded at $0 per token, so monthly caps never pause them.

## When detection can't work: use Other (OpenAI-compatible)

Settings → **Chat model** → **Other (OpenAI-compatible)**. Its address must be `https://…`, or `http://` on a loopback
host (`127.0.0.1`, `localhost`, `[::1]`). Credentials go in the key field (Settings → Keys → "Other OpenAI-compatible
server"), never in the address.

| Situation | Server address | Key |
|---|---|---|
| Ollama on a custom port (`OLLAMA_HOST=127.0.0.1:11500`) | `http://127.0.0.1:11500/v1` | none needed; Ollama ignores it |
| LM Studio on another port | `http://127.0.0.1:<port>/v1` | none |
| LM Studio with authentication switched on (0.4.0+) | `http://127.0.0.1:1234/v1` | the LM Studio API token |
| Claudia Local in Docker, Ollama on the host | `http://host.docker.internal:11434/v1` | none |
| A model server on another computer | not supported over `http://`; use `https://` with its own auth, or keep it local | — |

In Docker, `host.docker.internal` is accepted only inside Claudia Local's own image (it sets `CLAUDIA_LOCAL_DOCKER=1`).

## The `claudia` CLI

`claudia agent --llm-url <url> --model <provider>:<model>` also talks to any OpenAI-compatible endpoint, but it still
requires a saved key for the provider named in `--model` and sends it as a Bearer header. For local models, Claudia Local
is the simpler route.

## Fixes for common messages

| Message | Cause | Fix |
|---|---|---|
| Ollama (this computer) (not running) | server not started, or on another port | `ollama serve` (or open the app), then **check again** |
| LM Studio (this computer) (not running) | server toggle off, or auth on | Developer tab → Start server; with auth, use Other |
| No chat model yet… start Ollama or LM Studio | nothing picked | pick the preset and a model |
| This model can't use tools… | model or template lacks tool support | pick a model with the tools tag |
| Couldn't reach Ollama (this computer) | server stopped mid-session | restart it; the next message retries |
