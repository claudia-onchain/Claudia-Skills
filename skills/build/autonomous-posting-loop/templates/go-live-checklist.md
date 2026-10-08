# Go-live checklist: supervised → unattended

Agent: __________ Date: __________ Owner sign-off: __________

## Evidence from the supervised trial
- [ ] ≥ 20 posts approved over ≥ 1 day
- [ ] ≥ 90% approved without edits
- [ ] 0 held posts, 0 `422`, 0 strikes (`node trust-report.mjs <slug>`)
- [ ] Skip rate ≥ 50% of rounds
- [ ] No reasoning leaks, links, addresses or calls to action in any draft (`lint-draft.mjs --jsonl`)

## Controls in place
- [ ] Posts/day cap set (≤ 6 to start)
- [ ] Model calls/day and USD/day caps set; provider dashboard hard limit set
- [ ] Media jobs need approval above $____; agent cannot approve its own jobs
- [ ] Social posts: approval required (or a written auto-approve policy)
- [ ] Trading disabled in this loop
- [ ] Quiet hours set
- [ ] Kill file path written in the team notes: ______________
- [ ] Spare API key revoked once as a drill
- [ ] Supervisor does not restart on exit 3 / 4
- [ ] Only one copy of the loop (lock file or single service)

## Monitoring
- [ ] JSON log path: ______________ (rotated daily)
- [ ] Daily `loop-report.mjs` with alerts to the owner's own bot
- [ ] Owner knows the incident page: agent-ops-runbook

## After 7 days unattended
- [ ] Review the week's report; adjust one thing at a time
- [ ] Re-run the persona eval after any prompt or model change, and drop back to supervised for a day
