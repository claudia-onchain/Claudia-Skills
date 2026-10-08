# Pipeline internals: statuses, resume, expiry, errors

Read this when a batch is stuck, a job failed, or you're wiring the pipeline into a host (Claudia Local, the CLI, the MCP).
Everything here is from the `@useclaudia/media` 0.2 README.

## Job lifecycle

```
needs_approval ──approve──▶ queued ──▶ running ──▶ downloading ──▶ succeeded
      │                        │          │                         
      └──cancel──▶ canceled    │          ├──▶ failed   (job.error = { code, message, hint })
                               │          ├──▶ blocked  (safety filter or brand-kit banned word)
                               └─429/5xx──┘  └──▶ expired (provider deleted the result before download)
```

- `generate()` returns at once; a scheduler submits, polls (5 s, backing off ×1.5 to 15 s) and downloads.
- Concurrency per provider: 2 by default, 1 for HeyGen and Runway (`concurrency: { fal: 4 }` to change).
- `wait(id, { timeoutMs })` resolves on `succeeded`/`failed`/`blocked`/`expired`/`canceled`, on `needs_approval`, or on
  timeout (with the job as it is).

## Money

- Every job is estimated before it's accepted. Day/month caps count: spent + reserved by queued jobs + the new job.
- Ledger `~/.claudia/media/spend.jsonl`: reserve on submit → settle at final cost on success (exact for OpenAI image
  tokens and Runway credits, the estimate elsewhere) → void on failure/block. **A job canceled while running keeps its
  reservation** — the provider may bill started work.
- `perProvider: { fal: { perJobUsd: 1 } }` — the stricter of global and provider caps wins.

## Resume and crashes

- `jobs.json` is written atomically and holds the provider's operation/request id; after a restart polling continues
  without resubmitting.
- A crash *during* submit marks the job failed with a hint to check the provider dashboard — failing is cheaper than paying
  twice. Check the dashboard before rerunning that item.
- Two processes sharing a data dir (CLI + Claudia Local) use a per-job lease; don't point two different data dirs at one
  batch or you'll lose track of jobs.

## Expiry windows

| Provider | Keeps results |
|---|---|
| Google Veo | 2 days |
| Runway, BytePlus | 24–48 h |
| fal, HeyGen | links expire (download promptly) |

The package downloads as soon as a job finishes, so expiry only bites when no process is running. Resume within a day.

## Errors and what to do

| `code` | Typical cause | Action |
|---|---|---|
| `no_key` | provider key missing | `claudia keys set <provider>` (the person does this; never paste keys in chat) |
| `over_budget` | a cap would break, or provider 402 | cut items, cheaper model, or a person raises the cap |
| `rate_limited` | 429 | automatic retry honouring `Retry-After` |
| `blocked` | safety filter / banned word | read `job.error.message`; rewrite — never try to evade a filter |
| `invalid` | bad aspect/duration for the model, missing ref file | check the model's caps (`media.models({ kind })`) |
| `unsupported` | retired model | the hint names the replacement (e.g. Veo 3.1 → `google/omni-flash`) |
| `expired` | result deleted before download | rerun the item |

## Provenance sidecar

Every output gets `<file>.json` with `{ jobId, output, provenance }`; provenance has the final prompt (with brand style),
model, provider, cost, `watermark` ("SynthID" for Google, "C2PA" for OpenAI images), provider terms URL and timestamp.
Keep it next to the final edit; `@useclaudia/social` disclosure rules use it.

## MCP route (assistants)

Local MCP (`npx -y @useclaudia/mcp`) exposes `generate_media` (returns a job id at once), `get_media_job`, `list_media`.
Guardrails via env: `CLAUDIA_MCP_APPROVE_ABOVE_USD` (default `0` = everything waits for approval in Claudia Local or the
CLI), `CLAUDIA_MCP_MEDIA_PER_DAY_USD` (default `5`), `CLAUDIA_MCP_READ_ONLY=true` to stop all jobs and drafts.
