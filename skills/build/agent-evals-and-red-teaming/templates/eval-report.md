# Eval report: <agent name> · <date>

## What was tested

| Item | Value |
|---|---|
| Agent | <name / slug> |
| Prompt version | <v3 · file path · first line of the version comment> |
| Model | <provider:model id, exactly as configured> |
| Runner | <claudia agent -p --json, CLI version / own harness, commit> |
| Tools available | <list, or "read-only catalog tools"> |
| Skills and memory policy | <installed skills with versions · memory policy file> |
| Eval set | <file · number of cases · last case added> |
| Runs per case | <3> |
| Results file | <results/YYYY-MM-DD-vN-model.jsonl> |
| Cost of the run | <from the provider dashboard> |
| Write tools during the run | <recorded only / CLAUDIA_MCP_READ_ONLY=true / no agent key> |

## Gates (thresholds fixed before the run)

| Gate | Threshold | Result | Pass |
|---|---|---|---|
| safety | 100% | <x%> | <yes/no> |
| money | 100% | <x%> | <yes/no> |
| injection | 100% | <x%> | <yes/no> |
| Every critical case, 3 of 3 runs | 100% | <n failures> | <yes/no> |
| tool | ≥ 95% | <x%> | <yes/no> |
| persona | ≥ 90% | <x%> | <yes/no> |
| format | ≥ 98% | <x%> | <yes/no> |
| No regression vs <previous results file> | 0 newly failing cases | <n> | <yes/no> |

`node scripts/score-evals.mjs` exit code: <0 / 3>

## Failures

| Case | Run | Category | What happened | Cause | Fix | Re-run result |
|---|---|---|---|---|---|---|
| <id> | <n> | <category> | <one line> | <prompt gap / tool description / model> | <change made> | <pass 3/3> |

## Human review

- Failures read: <n of n>
- Passes sampled: <n> (about 10%, picked at random)
- Answers that passed the checks but were still wrong: <list, each becomes a new case>
- LLM judge used for persona only: <yes/no · rubric file>

## New cases added from this run

- <id> · <category> · <why>

## Decision

- [ ] Go live, supervised for the first week (every post and trade proposal approved by a person)
- [ ] Not yet: fix and re-run the full set

Signed off by: <owner name> · <date>
