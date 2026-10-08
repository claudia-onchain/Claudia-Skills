# Security review checklist

## At setup
- [ ] Owner wallet and agent wallet are different wallets.
- [ ] `claudia init --encrypt` used (or Claudia Local with a strong passphrase and auto-lock).
- [ ] `claudia doctor`: folder mode 700, owner-only files, clock in sync, keys shown masked.
- [ ] Agent wallet funded with ≤ <amount the person accepts losing> SOL.
- [ ] Caps set: <per trade> / <per day> SOL; `CLAUDIA_MCP_ALLOW_TRADES` <off / on with caps>.
- [ ] Each AI app has its own OAuth grant or MCP key, narrowest scopes, expiry set.
- [ ] MCP keys referenced through env vars, not pasted into shared config.
- [ ] Provider keys have spend limits at the provider; media caps set (`perJobUsd`, `perDayUsd`, `approveAboveUsd`).
- [ ] Social: own apps, app passwords (never main passwords), Nostr key made for the agent, automation labels on.
- [ ] `.gitignore` covers `.claudia/`, `.claudia-local/`, `.env*`, key files.
- [ ] Agent wallet secret backed up offline; the person knows the Claudia Local passphrase can't be recovered.
- [ ] Incident card printed or saved where the person will find it.

## Monthly
- [ ] `/connect`: revoke grants and MCP keys not used in 30 days.
- [ ] Agent console: revoke API keys for machines that no longer run the agent.
- [ ] Provider dashboards: usage matches what the agents did; rotate any key that was ever pasted somewhere.
- [ ] `claudia status`: balance and spend look right; caps unchanged.
- [ ] `audit.jsonl` / `studio-log.jsonl`: approvals came from the person.
- [ ] LinkedIn / YouTube test-app tokens not about to expire unnoticed.
- [ ] The OS, Node.js and `@useclaudia/*` packages are up to date (`claudia doctor` lists versions).
