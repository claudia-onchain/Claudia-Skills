# Hardware and model sizing

Read this in step 2, before pulling anything. Sizes are Ollama library download sizes (checked 2026-10); they are the
memory the weights take once loaded, before the context cache.

## The fit rule

```text
needed memory ≈ model download size + context cache + 2–4 GB for the OS and apps
```

- **NVIDIA / AMD GPU:** "memory" means VRAM. If the model doesn't fit, Ollama runs part of it on the CPU. `ollama ps`
  shows the split in the `PROCESSOR` column (`100% GPU` is what you want).
- **Apple Silicon:** CPU and GPU share unified memory, so a 16 GB Mac has roughly 10–11 GB to give a model once macOS
  and a browser are running.
- **CPU only:** works with small models, slowly. Plan on 3B–4B models and short replies.

The context cache grows with the context length and the model size. Doubling the context roughly doubles the cache.
When a model that fit at 4k context starts splitting to CPU at 32k, lower the context or go one model size down.

## Starting points by memory

These tiers are working rules of thumb, not vendor requirements. Only the `gpt-oss:20b` memory line is the vendor's own.

| Machine | Model (tag) | Download | Context to start with | What to expect |
|---|---|---|---|---|
| 8 GB laptop | `llama3.2:3b` | 2.0 GB | 8k–16k | chat and short drafts; tool use hit and miss |
| 8 GB laptop | `qwen3:4b` | 2.5 GB | 8k–16k | same tier, has a thinking mode |
| 16 GB laptop / 8 GB GPU | `qwen3:8b` | 5.2 GB | 16k–32k | the usual sweet spot for a private agent |
| 16 GB, nothing else open | `gpt-oss:20b` | 14 GB | 8k–16k | stronger reasoning; Ollama says it runs "on systems with as little as 16GB memory" |
| 24–32 GB / 12–16 GB GPU | `qwen3:14b` | 9.3 GB | 32k | dependable multi-step tool use |
| 32–48 GB / 24 GB GPU | `qwen3.6:27b` | 18–19 GB | 32k–64k | strong agent model, also takes images |
| 48 GB+ | `qwen3.6:35b` | 23–24 GB | 64k | near hosted quality for many tasks |

On Apple Silicon the library also offers MLX builds of some models (for example `qwen3.6:27b-mlx`, `gemma4:12b-mlx`);
LM Studio runs MLX models natively on Macs.

Model names change fast. Before pulling, open the model's library page and check three things: the **tools** tag, the
download size of the exact tag, and the context window it supports.

## Capabilities that matter for an agent

| Capability | Why | Where to see it |
|---|---|---|
| tools | Without it the agent can't call Files, Claudia data, the studio or `load_skill` | `tools` tag on ollama.com; hammer badge in LM Studio |
| vision | Image inputs in chat | `vision` tag; but see the name-matching caveat in the SKILL |
| thinking | Better multi-step plans, slower first token | `thinking` tag |
| context window | Upper limit; the server setting decides what you actually get | model page, `ollama ps` |

Notable gaps (checked 2026-10): `gemma3` has vision but no tools tag in Ollama; `gemma4` has both.

## Speed checks

- First reply after loading is slow (the model loads into memory). Ollama keeps a model loaded for 5 minutes after the
  last request by default (`OLLAMA_KEEP_ALIVE`).
- A reply that streams under about 5 tokens per second will feel broken in chat and may hit Claudia Local's 120-second
  limit per call on long answers. Go one size down or shorten the context.
- Two models loaded at once (say, main and helpers on different local models) need memory for both. On 16 GB, use one
  local model for every local role.
