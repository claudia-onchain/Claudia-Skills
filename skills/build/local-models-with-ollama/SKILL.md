---
name: local-models-with-ollama
description: Runs an agent's chat model on the person's own computer with Ollama or LM Studio and connects it to Claudia Local — install, picking a model size that fits the RAM or VRAM, raising the context window, how Claudia Local detects local servers on 127.0.0.1:11434 and 127.0.0.1:1234, tool-calling and vision caveats, Docker and custom ports, and the real privacy trade-offs (cloud tags, fallbacks, network exposure). Use when someone wants a private or offline agent, wants to stop paying per token for chat, sees "Ollama not found" or "This model can't use tools", or needs to choose between a local and a hosted model for each role.
license: MIT
metadata:
  title: "Local models with Ollama and LM Studio"
  category: "build"
  summary: "Run the agent's chat model on your own machine: size it to your hardware, connect Claudia Local, and know what still leaves the device."
  level: "intermediate"
  tags: "ollama, lm studio, local models, claudia local, privacy, tool calling, context window, self-hosted, gguf, mlx"
  uses: "claudia-local, ollama, lm-studio"
  time: "30–60 min"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Local models with Ollama and LM Studio

A local model runs on the person's own CPU and GPU, so chat prompts and replies never leave the machine and there is no
per-token bill. The trade is speed, context length and tool-calling reliability, all set by the hardware. This skill
gets a model running in Ollama or LM Studio, sized to the machine, connected to Claudia Local, tested for tool use,
and set up so that the privacy the person expects is the privacy they actually get.

## When to use this

- "I want my agent to run without sending my chats to a cloud provider."
- Claudia Local shows **Ollama (this computer) (not running)** or "Ollama not found", or a local model ignores tools.
- Choosing which roles (main chat, helpers, scheduled tasks) can run locally and which need a hosted model.
- An agent will read private material (memory notes, drafts, a workspace) and the operator wants it processed on-device.
- Running Claudia Local in Docker and pointing it at a model server on the host.

Not for: picking a hosted provider or key setup (see [claudia-local-studio](../claudia-local-studio/SKILL.md)), or
running a model for other people over the internet. This skill keeps every model server on loopback.

## What you need

- Claudia Local 0.3 or newer (Node.js 22.13+), unlocked, at `http://127.0.0.1:3939`.
- One model server: [Ollama](https://ollama.com/download) (macOS, Windows, Linux) or
  [LM Studio](https://lmstudio.ai) (Apple Silicon Mac on macOS 14+, Windows x64 with AVX2 or ARM, Linux x64/ARM64).
- Disk space for the model (2–20 GB for the sizes in this skill) and enough memory to hold it: see step 2.
- 10 minutes to test tool calling before trusting the model with tasks.
- Deeper material: [references/hardware-and-sizing.md](references/hardware-and-sizing.md) (memory tiers, context cost,
  read it in step 2), [references/how-claudia-local-finds-models.md](references/how-claudia-local-finds-models.md)
  (the detection code's real behaviour, read it when a server isn't found), and
  [references/privacy-trade-offs.md](references/privacy-trade-offs.md) (what stays local and what doesn't, read it in step 8).

## Steps

1. **Install one model server.** Pick one; both work.

   ```sh
   # Ollama, macOS or Linux (or the desktop app from ollama.com/download)
   curl -fsSL https://ollama.com/install.sh | sh
   # Ollama, Windows PowerShell
   irm https://ollama.com/install.ps1 | iex
   ```

   LM Studio: install the app, open it once (that also installs the `lms` command), then Developer tab → **Start
   server**, or `lms server start` (checked 2026-10).

2. **Pick a model that fits the machine.** Read [references/hardware-and-sizing.md](references/hardware-and-sizing.md).
   The rule: the download size plus the context cache plus 2–4 GB for the system must fit in GPU memory (VRAM) or, on
   Apple Silicon, unified memory. If it doesn't fit, Ollama splits work onto the CPU and replies slow down sharply. Starting
   points from the Ollama library (download sizes, checked 2026-10):

   | Memory | Try first | Size | Tools tag |
   |---|---|---|---|
   | 8 GB | `llama3.2:3b` or `qwen3:4b` | 2.0 GB · 2.5 GB | yes |
   | 16 GB | `qwen3:8b` | 5.2 GB | yes |
   | 16 GB, little else open | `gpt-oss:20b` | 14 GB ("as little as 16GB memory") | yes |
   | 24–32 GB | `qwen3:14b` | 9.3 GB | yes |
   | 32–48 GB | `qwen3.6:27b` (also reads images) | 18–19 GB | yes |

   For an agent, pick the largest model with the **tools** capability that leaves room for context. A 3B model can chat;
   it will often fumble multi-step tool use. Filter the library by tools at `ollama.com/search?c=tools`.

3. **Pull it and check it runs.**

   ```sh
   ollama pull qwen3:8b
   ollama run qwen3:8b "Reply with one word: ready"
   ollama ls          # installed models
   ollama ps          # loaded models, with SIZE, PROCESSOR (CPU/GPU split) and CONTEXT columns
   ```

   LM Studio: `lms get` to search and download, `lms ls` to list, `lms load <model> --context-length=32768` to load.
   If `ollama ps` shows a CPU/GPU split such as `40%/60% CPU/GPU`, the model is too big for the GPU: go one size down.

4. **Raise the context window.** This is the step most setups miss. Ollama defaults to a **4k** context on machines
   with under 24 GiB of VRAM (32k at 24–48 GiB, 256k at 48+), and its OpenAI-compatible endpoint, which Claudia Local
   uses, cannot change it per request (checked 2026-10). An agent's system prompt, memory and tool definitions can fill
   4k before the person types anything, and the oldest text is silently cut. Ollama recommends at least 64,000 tokens for
   agents and tools when memory allows; 32k is a workable floor on smaller machines. Set it on the server:

   ```sh
   OLLAMA_CONTEXT_LENGTH=32768 ollama serve      # or the context slider in the Ollama app's settings
   ```

   Or bake it into a model with [templates/Modelfile](templates/Modelfile) and `ollama create`. Then check the
   `CONTEXT` column in `ollama ps`. More context costs memory; on 16 GB, 16k–32k with an 8B model is a sensible ceiling.
   In LM Studio, set context length when loading the model.

5. **Connect Claudia Local.** Settings → **Chat model** → choose **Ollama (this computer)** or **LM Studio (this
   computer)**. No key is needed. Claudia Local finds them on its own: it checks `127.0.0.1:11434` (Ollama's
   `/api/tags`, then `/v1/models`) and `127.0.0.1:1234/v1/models` (LM Studio), with a sub-second timeout, and remembers
   the answer for 20 seconds. The preset shows "(running)" and lists the models you pulled or loaded. If it says "(not
   running)", start the server and click **check again**. Different port, LM Studio with an API token, or Claudia Local in
   Docker: use **Other (OpenAI-compatible)** as described in
   [references/how-claudia-local-finds-models.md](references/how-claudia-local-finds-models.md).

6. **Test tool calling before you rely on it.** Run the five prompts in
   [templates/tool-call-smoke-test.md](templates/tool-call-smoke-test.md) in a new chat. Claudia Local sends the tools
   to every model; if the server rejects them, it switches tools off for that model and shows **"This model can't use
   tools, so it will answer without them."** Without tools the agent can chat but can't read Files, the Claudia data
   or the studio, and can't load installed skills (that is a tool call too, `load_skill`). Common failures with small or non-tool models: the tool call printed as plain text, a
   made-up tool name, broken JSON arguments, or a confident answer with no tool call at all. In LM Studio, models with
   native tool support show a hammer badge; others get a generic tool prompt and are less reliable (checked 2026-10).

7. **Assign roles on purpose.** Claudia Local has a model per role (main chat, helpers, scheduled tasks) and an
   optional fallback that is tried once when the main model fails. Sensible splits:

   | Goal | Main | Helpers / tasks | Fallback |
   |---|---|---|---|
   | Everything stays on the machine | local | local | none |
   | Private chat, strong research | local | hosted | none |
   | Best quality, private overnight tasks | hosted | local for `tasks` | hosted |

   A hosted fallback sends the whole conversation to that provider when the local model errors, so "fully local" means
   no hosted fallback. Spend for local models is recorded as $0 in the estimate; the real cost is hardware and power.

8. **Check what still leaves the machine.** Read [references/privacy-trade-offs.md](references/privacy-trade-offs.md).
   The short version: chat with a local model stays local, but tools that fetch coin data, post, generate media or read
   the Claudia thread still call those services; Ollama `:cloud` models run on ollama.com (turn cloud off with
   `OLLAMA_NO_CLOUD=1`); and a model server bound to `0.0.0.0` is open to the whole network with no password in Ollama's
   case. Keep both servers on `127.0.0.1`.

9. **Write it down and keep it current.** Fill [templates/local-model-setup.md](templates/local-model-setup.md) with the
   model, context, roles, smoke-test results and privacy settings, and store it with the operator's notes. Re-run the
   smoke test after any model or server update.

## Templates

- [templates/tool-call-smoke-test.md](templates/tool-call-smoke-test.md) — five prompts that show whether a local model
  can really drive the agent's tools, with pass and fail signs.
- [templates/Modelfile](templates/Modelfile) — an Ollama Modelfile that fixes a larger context window for one model.
- [templates/local-model-setup.md](templates/local-model-setup.md) — the record of what runs where, filled in step 9.
- Worked example: [examples/16gb-laptop-private-agent.md](examples/16gb-laptop-private-agent.md) — a 16 GB MacBook Air
  set up for a private influencer agent, including the first failed smoke test and the fix.

Quick decision line for the operator's notes:

```text
Local model: <server> <model:tag> · context <n> · tools <pass|partial|fail> · roles <main/helpers/tasks> · fallback <none|provider model> · cloud tags <off|on> · bound to 127.0.0.1 <yes|no>
```

## Check before you finish

- [ ] The model fits: `ollama ps` (or LM Studio's load panel) shows it fully or mostly on the GPU, not split heavily to CPU.
- [ ] Context raised above the 4k default and confirmed in the `CONTEXT` column (or LM Studio's load settings).
- [ ] Claudia Local shows the preset as "(running)", the model is picked, and a test chat streams a reply.
- [ ] The smoke test passed, or tool-dependent roles were moved to a model that passes.
- [ ] Fallback and helper roles match the privacy goal the operator stated; no hidden hosted fallback on a "local only" setup.
- [ ] Ollama cloud is off if the goal is on-device only; no `:cloud` model is selected.
- [ ] Neither server listens on `0.0.0.0`; LM Studio's "Serve on Local Network" is off.
- [ ] The persona still never names the model it runs on.

## Pitfalls

- **The 4k trap.** Everything works in a short test, then the agent "forgets" its instructions mid-task because the
  context was cut. Raise the context first (step 4).
- **Too big a model.** A 20B model on a 16 GB laptop with a browser open swaps to CPU and takes minutes per reply.
  Claudia Local gives each model call 120 seconds, so very slow replies are cut off. One size down usually beats it.
- **Assuming any model can use tools.** Some popular models have no tools capability in Ollama (for example `gemma3`,
  checked 2026-10). They chat fine and silently do nothing useful in tasks.
- **Images going nowhere.** Claudia Local guesses whether a model can see from its name (`llava`, `vision`, `-vl`,
  `gemma3`, `llama4`, `minicpm-v`, `moondream` for Ollama; `llava`, `vision`, `-vl`, `gemma-3`, `pixtral` for LM Studio).
  A vision model with another name, such as `qwen3.6` or `gemma4`, gets text only.
- **`localhost` vs `127.0.0.1` vs a custom port.** Detection only checks `127.0.0.1` on the default ports. Anything else
  goes through **Other (OpenAI-compatible)**.
- **"Local" with a cloud tag.** `gemma4:cloud` and other cloud models look like local ones in the CLI but run on Ollama's
  servers after sign-in.
- **Opening the server to the network.** `OLLAMA_HOST=0.0.0.0` lets anyone on the same Wi-Fi use the model and run up
  the machine. Ollama has no login on its local API.
- **Trusting a small model with money.** Claudia Local's caps, dry runs and confirmations still apply, but a weak model
  proposes worse actions. Keep trading roles on a model that passed the smoke test, or off.

## Related skills

- [claudia-local-studio](../claudia-local-studio/SKILL.md) — install, vault, keys, approvals and caps in Claudia Local.
- [agent-ops-runbook](../agent-ops-runbook/SKILL.md) — keeping a running agent healthy, logs and incident steps.
- [wallet-and-key-security](../wallet-and-key-security/SKILL.md) — what a local setup does and doesn't protect.
- [agent-persona-and-system-prompt](../agent-persona-and-system-prompt/SKILL.md) — shorter system prompts that fit small contexts.
- [prompt-injection-defense](../prompt-injection-defense/SKILL.md) — smaller models are easier to steer with outside text.
- [agent-evals-and-red-teaming](../agent-evals-and-red-teaming/SKILL.md) — turn the smoke test into a repeatable eval.
