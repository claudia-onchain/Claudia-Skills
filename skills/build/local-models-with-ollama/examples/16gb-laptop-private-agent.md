# Example: a private agent on a 16 GB laptop

Dana (they/them) runs Juno, a fictional AI agent that writes chart-literacy explainers. Juno's drafts include Dana's
unpublished notes and a research folder, and Dana wants that text processed on their own machine. The laptop is an
Apple Silicon MacBook Air with 16 GB of unified memory. Claudia Local 0.3 is already installed and unlocked.

## 1. Install and choose a size

```sh
curl -fsSL https://ollama.com/install.sh | sh
```

16 GB of unified memory, with a browser and Claudia Local open, leaves about 10 GB for a model. From the sizing table:
`qwen3:8b` (5.2 GB, tools tag) fits with room for context. `gpt-oss:20b` (14 GB) would need everything else closed.

```sh
ollama pull qwen3:8b
ollama run qwen3:8b "Reply with one word: ready"
ollama ps
# NAME        SIZE     PROCESSOR    CONTEXT
# qwen3:8b    6.9 GB   100% GPU     4096
```

(The `ollama ps` line above is illustrative; your SIZE will differ.) Note the `4096`: the default context on a machine
under 24 GiB of VRAM.

## 2. First smoke test: fails

Dana connects Claudia Local (Settings → Chat model → **Ollama (this computer) (running)** → `qwen3:8b`) and runs the
smoke test. Results:

| Test | Result | What happened |
|---|---|---|
| 1 Single read | pass | listed 6 files |
| 2 Arguments | pass | wrote and read back the file |
| 3 Choosing tools | partial | called coin insights, then lost track of the question and summarised the tool list |
| 4 Load a skill | fail | answered from general knowledge; no `load_skill` step |
| 5 Refuses | pass | said the post would wait for approval |

Tests 3 and 4 failed on long prompts: Juno's persona, memory and tool definitions together pass 4k tokens, so the
start of the conversation, including the user's question, was being cut.

## 3. The fix: raise the context

Dana quits the Ollama app and starts the server with a larger context:

```sh
OLLAMA_CONTEXT_LENGTH=32768 ollama serve
```

```sh
ollama ps
# NAME        SIZE     PROCESSOR    CONTEXT
# qwen3:8b    9.8 GB   100% GPU     32768
```

Still 100% GPU, so the model plus the bigger cache fits. Re-run: all five tests pass. Replies take a few seconds to
start and stream at a readable pace.

## 4. Roles and privacy

Dana sets:

| Role | Model | Why |
|---|---|---|
| Main chat | Ollama `qwen3:8b` | private notes stay on the laptop |
| Helpers | Ollama `qwen3:8b` | one model loaded, so memory stays under 10 GB |
| Tasks | Ollama `qwen3:8b` | the nightly "draft tomorrow's explainer" task reads the notes too |
| Fallback | none | a hosted fallback would send the conversation out when Ollama hiccups |

Then:

```sh
echo 'export OLLAMA_NO_CLOUD=1' >> ~/.zshrc   # for servers started from the terminal
```

and, because the Ollama app doesn't read shell variables, `{ "disable_ollama_cloud": true }` in `~/.ollama/server.json`.

In Claudia Local, Settings → Tools: the Claudia data tools stay on (Juno needs chart data for explainers, and those
calls go to useclaudia.xyz by design); media generation stays on with its normal approvals.

## 5. The record

```text
Local model: Ollama qwen3:8b · context 32768 · tools pass (5/5) · roles main/helpers/tasks · fallback none · cloud tags off · bound to 127.0.0.1 yes
Privacy statement: Juno's chat, memory and notes are processed on Dana's laptop. Coin data, posting and image generation call their services.
```

## What Dana didn't do

- Didn't bind Ollama to `0.0.0.0` to use it from a phone. Phone access goes through Claudia Local's Telegram pairing.
- Didn't let Juno's bio claim "fully offline": data tools and posting are online by nature.
- Didn't move trading to the local model. Juno has no trading role; if it ever does, that role goes to a model that
  passes a trading-specific test, with Claudia Local's caps and confirmations unchanged.
