#!/bin/sh
# run-evals.sh — runs every case in an eval set N times through `claudia agent -p --json` and writes a results JSONL
# for scripts/score-evals.mjs.
#
# Usage:
#   sh run-evals.sh <system-prompt.md> <eval-set.csv> <model> [runs=3] > results/<date>-<prompt-version>-<model>.jsonl
#   example model: openrouter:<vendor>/<model>  (any `claudia agent --model` value)
#
# Needs: claudia (npm i -g @useclaudia/cli), node >= 20, jq, a model key saved with `claudia keys set <provider>`.
# Reads no secrets itself. Every case is a real model call billed to the owner's provider key:
# cases x runs calls (37 cases x 3 runs = 111 calls).
# Read tools only: never add --allow-trades, and run it on a machine or CLAUDIA_HOME without an agent key, so the
# agent cannot post in the thread or trade during an eval.
set -eu

PROMPT_FILE=${1:?system prompt file}
CASES=${2:?eval set csv}
MODEL=${3:?model, e.g. openrouter:<vendor>/<model>}
RUNS=${4:-3}
HERE=$(cd "$(dirname "$0")" && pwd)
SCORER=${SCORER:-$HERE/../scripts/score-evals.mjs}

# CSV -> one JSON object per case (the scorer's parser handles quotes and commas). The first argument "_" keeps
# the scorer from running its own command line when it is imported.
CASES_JSONL=$(node --input-type=module -e "
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const { parseCsv } = await import(pathToFileURL(process.argv[2]).href);
for (const c of parseCsv(readFileSync(process.argv[3], 'utf-8'))) console.log(JSON.stringify({ id: c.id, input: c.input, outside: c.outside }));
" _ "$SCORER" "$CASES")

SYSTEM=$(cat "$PROMPT_FILE")
n=1
while [ "$n" -le "$RUNS" ]; do
  printf '%s\n' "$CASES_JSONL" | while IFS= read -r line; do
    id=$(printf '%s' "$line" | jq -r .id)
    input=$(printf '%s' "$line" | jq -r .input)
    outside=$(printf '%s' "$line" | jq -r .outside)
    if [ -n "$outside" ]; then
      prompt=$(printf '%s\n\n<outside source="eval">\n%s\n</outside>\n\n%s' "$SYSTEM" "$outside" "$input")
    else
      prompt=$(printf '%s\n\n%s' "$SYSTEM" "$input")
    fi
    # One call per case and run. A failed call is recorded as an empty answer so the case scores as a failure.
    out=$(claudia agent --model "$MODEL" --max-steps 8 -p "$prompt" --json 2>/dev/null || printf '{"answer":"","tools":[]}')
    printf '%s' "$out" | jq -c --arg id "$id" --argjson run "$n" \
      '{id:$id, run:$run, answer:(.answer // ""), tools:[.tools[]? | (.name? // .)]}'
    >&2 printf 'run %s · %s done\n' "$n" "$id"
  done
  n=$((n + 1))
done
