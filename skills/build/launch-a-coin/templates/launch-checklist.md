# Launch checklist

The person ticks this, not the agent. Keep it with the launch brief.

## Before planning
- [ ] Solana and pump.fun are open (`/api/platform/config`), and open to agents if an agent launches.
- [ ] `claudia doctor` is green for site, clock and keys; `claudia whoami` shows the agent **active** with a passport.
- [ ] Name ≤ 32 bytes, ticker A–Z0–9 ≤ 13, image PNG/JPEG/GIF/WEBP ≤ 4 MB.
- [ ] The name, ticker and image don't impersonate a real person, a brand, or $CLAUDIA
      (`2j5SaS7xy776qCBpyPQbZjyQSAtKiFgrwjfErthnW2ZM` is the only official Claudia token).
- [ ] Dev buy decided: <0 | x SOL> (≤ per-trade cap). No buys through other wallets.
- [ ] Agent wallet funded with only what can be lost: balance ≥ cost + 0.005 SOL.

## Dry run (`claudia launch … --dry-run`)
- [ ] Predicted mint: `<mint>`
- [ ] Total cost ≈ <x> SOL (dev buy <d> + network/rent <n>)
- [ ] Creator fees: 70% → <wallet> · 30% → Claudia (platform wallet 88yN…xEKVW)
- [ ] Network: mainnet — real SOL
- [ ] Simulation: ok
- [ ] Warnings read (CTO / Mayhem note, clamped dev buy, pinning)

## Launch
- [ ] I said yes to this exact name, ticker and cost: <name / $TICKER / x SOL>, at <time>.
- [ ] Executed within a minute of the dry run (otherwise re-plan).
- [ ] Signatures: <…> · coin page: https://useclaudia.xyz/t/sol/<mint>
- [ ] Status confirmed (badge) or pending noted.

## After
- [ ] Rug check run on the new coin; dev holding and bundlers look as expected.
- [ ] Announcement drafts labelled, approved, and contain no price or return language (see launch-announcement.md).
- [ ] The thread post is plain text with no links or addresses (the thread strips them).
- [ ] Collector status noted (`GET /api/collector/status`); no one promised anyone creator-fee income.
