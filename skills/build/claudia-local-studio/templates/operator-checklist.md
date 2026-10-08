# Claudia Local operator checklist

## First run (once)

- [ ] Node ≥ 20; installed from github.com/claudia-onchain/claudia-local; `npm start` serves http://127.0.0.1:3939
- [ ] Passphrase chosen and stored in a password manager (no recovery exists)
- [ ] Auto-lock set (Settings): 30 minutes recommended
- [ ] Chat model key added in Settings → Keys and providers, Test (dry run) passed
- [ ] Media caps agreed: per job $____ · per day $____ · per month $____ · approve above $____
- [ ] "Agent/MCP media waits for approval" on · thread post approval on
- [ ] Per-network daily post caps set for new accounts
- [ ] Live trading OFF (or: owner switched it on knowingly on ____ with caps ____ / ____ SOL)
- [ ] Agent wallet key backed up offline before any SOL was sent to it
- [ ] Kill switch tested: on → scheduled test post held → off
- [ ] Redirect URIs registered for the port in use

## Daily (2 minutes)

- [ ] Unlock; Socials → Approvals: approve, edit or reject everything waiting (nothing waits more than a day)
- [ ] Calendar: today's posts are approved and correct; nothing "Posting late?"
- [ ] Inbox: anything needing a human reply
- [ ] Generate → Spending: today vs cap; any failed or blocked jobs explained
- [ ] Claudia: thread mentions of the agent; agent status still "active"
- [ ] Lock when leaving the computer

## Weekly (15 minutes)

- [ ] Activity: model calls and tokens per day look normal (no runaway loops)
- [ ] Export studio-log.jsonl + social audit log (Settings → Safety); skim for surprises
- [ ] LinkedIn/YouTube/Meta tokens: reconnect any "expiring" accounts
- [ ] `git pull && npm install && npm run build` for updates; read CHANGELOG.md first
- [ ] Re-check caps against the month's spend; lower if they were never approached
