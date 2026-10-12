# Privacy trade-offs of a local model

Read this in step 8. "Local model" makes one thing private: the chat model's input and output. It does not make the
whole agent offline.

## What stays on the machine

- Prompts, replies, the system prompt, memory text and workspace files that the model reads, when the selected model
  runs in Ollama or LM Studio on `127.0.0.1`.
- Ollama: "Ollama runs locally. We don't see your prompts or data when you run locally." (Ollama FAQ, checked 2026-10.)
- LM Studio: when running models locally, "none of your messages, chat histories, and documents are ever transmitted
  from your system", and the app "can run entirely on-device and offline" (LM Studio app privacy policy, checked 2026-10).

## What still leaves the machine

| What | Where it goes | How to keep it local |
|---|---|---|
| Ollama cloud models (`:cloud` tags, for example `gemma4:cloud`) | ollama.com, after `ollama signin` | don't pick them; set `OLLAMA_NO_CLOUD=1` or `"disable_ollama_cloud": true` in `~/.ollama/server.json` |
| A hosted **fallback** or hosted **helpers/tasks** model | that provider, with the whole conversation | leave fallback empty; set every role to the local model |
| Tool calls for coin data, the Claudia thread, KOL feeds | useclaudia.xyz | turn those tools off in Settings → Tools if not needed |
| Media generation | the media provider you chose | expected: the prompt has to go there |
| Posting, inbox, Telegram bot | each network | expected; drafts stay local until approved |
| LM Studio update checks and model search | LM Studio's servers (app/OS version, IP, anonymised search queries) | normal app behaviour; work offline after downloading |
| Model downloads | ollama.com, huggingface.co or LM Studio's catalogue | one-off |

## Network exposure

- Ollama binds `127.0.0.1:11434` by default. `OLLAMA_HOST=0.0.0.0:11434` exposes it to the network, and the local API
  has no authentication. Don't do this on a laptop.
- LM Studio's "Serve on Local Network" lets other devices use its server. Leave it off. Since 0.4.0, LM Studio can require
  an API token; it is off by default.
- Claudia Local itself listens only on `127.0.0.1:3939` and refuses other Host headers.

## What a local model does not protect against

- **Prompt injection.** Outside text (thread posts, coin names, files, other people's messages) can still try to steer
  the model. Claudia Local labels it and blocks it from starting trades, launches or posts, but smaller models are easier
  to confuse. See [prompt-injection-defense](../../prompt-injection-defense/SKILL.md).
- **A compromised computer.** Keys sit in Claudia Local's encrypted vault; malware on the machine is a separate problem.
  See [wallet-and-key-security](../../wallet-and-key-security/SKILL.md).
- **Bad answers.** Local doesn't mean right. Approvals, caps and dry runs stay on.

## Telling the audience

If the agent's public bio or a post says "runs locally" or "private", that has to be true for the role that handles the
content in question. Claudia's own persona never names the model she runs on; say "runs on the operator's own machine"
rather than naming a model or vendor.
