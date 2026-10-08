# Jobs, statuses and errors

## Statuses

| Status | Meaning | What to do |
|---|---|---|
| `needs_approval` | estimate above `approveAboveUsd`; nothing sent | a person runs `approve(id)` (re-checks caps) or `cancel(id)` |
| `queued` | waiting for a provider slot or retrying after a 429 | wait |
| `running` | submitted, being polled | wait; `wait()` timeouts leave it running |
| `downloading` | saving outputs to the library | wait |
| `succeeded` | outputs on disk with sidecars | use `outputs[].path` |
| `failed` | see `job.error.{code,message,hint}` | read the hint; resubmit only if it says so |
| `blocked` | provider safety filter or brand-kit `banned` word | rewrite the prompt; never try to evade a safety filter |
| `expired` | provider deleted the result before download | run again; don't leave the app closed for days mid-job |
| `canceled` | canceled; a running job keeps its cost reservation | — |

`wait()` also resolves on `needs_approval`, so scripts don't hang on a job nobody approved.

## Error codes (`ClaudiaMediaError`)

| Code | When |
|---|---|
| `no_key` | missing key for that provider (hint says where to add and where to get one) |
| `rate_limited` | provider 429 (`retryAfterMs`); retried inside the queue automatically |
| `over_budget` | a cap would be exceeded, or the provider says the account is out of credit (402) |
| `needs_approval` | only for hosts that turn approvals into errors |
| `provider_error` | provider failure or a refused key (401/403); retried where safe |
| `unsupported` | retired model, or a kind the provider doesn't make |
| `expired` | provider no longer has the result (404/410 or past expiry) |
| `blocked` | safety filter or banned word |
| `invalid` | unknown model, missing refs or file, provider 400/422, missing voice for a photo avatar |

## Restart and crash behaviour

- Jobs persist atomically in `<dataDir>/media/jobs.json` with the provider's operation/request/task id; the next
  `createMedia()` resumes polling without resubmitting.
- A crash *during submit* marks that job `failed` with a hint to check the provider dashboard (it may have been
  accepted; failing avoids paying twice).
- A 429 or 5xx on submit requeues; a network error on submit fails the job (same reason).
- Two processes sharing a data dir (CLI + Claudia Local) coordinate with per-job leases.

## Spend ledger

`<dataDir>/media/spend.jsonl`, append-only: reserve on submit → settle on success (exact for OpenAI images and Runway,
otherwise the estimate) → void on failure/blocked. `media.spend()` → `{ today, month, byProvider }`. UTC days/months.

## Events and introspection

```ts
media.on("job", (j) => ui.update(j));            // every status / progress change
media.getJob(id); media.listJobs({ status: "running", limit: 20 });
await media.cancel(id);                           // asks the provider to cancel where possible (fal, Runway, BytePlus, Gemini Omni)
media.providers();                                // which keys are configured (no values)
```

## Dry runs

`createMedia({ dryRun: true })` or `generate(req, { dryRun: true })` returns `{ dryRun: true, request, estimate }` with
secret headers and query keys as `"***"`; needs no key, creates no job, spends nothing. The package's own
`scripts/dry-run.mjs` exercises every model plus a mock end-to-end lifecycle.
