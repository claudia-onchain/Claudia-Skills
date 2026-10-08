# Trade preflight checklist

Copy into the conversation (or a ticket) and tick each line before asking for a quote. Any unticked line in the
first two blocks = no quote.

**Coin:** `sol:<full mint>` · $<TICKER> · side <buy | sell> · amount <SOL | %>

## Identity and research
- [ ] The mint is the one the person meant (ticker resolved, full mint shown back to them).
- [ ] Research brief read in this session: data <N> s old, partial <none | …> ([coin-research](../../coin-research/SKILL.md)).
- [ ] Rug check run in this session: <r> red · <a> amber; every red row explained to the person ([rug-check](../../rug-check/SKILL.md)).
- [ ] Not a honeypot; mint and freeze authority renounced (or the person accepted the risk in writing).

## Limits
- [ ] Amount ≤ per-trade cap (<cap> SOL).
- [ ] Amount ≤ what's left of today's cap (<left> SOL; `claudia status`).
- [ ] Wallet balance ≥ amount + 0.005 SOL reserve.
- [ ] Size under ~2% of pool liquidity (preflight "Size vs liquidity").
- [ ] Slippage chosen on purpose: <bps> (default 1500 is wide).
- [ ] `node scripts/preflight.mjs <mint> --side … ` exited 0.

## Route
- [ ] Route known: <website | online Trade MCP (confirm link) | CLI | local MCP | Claudia Local>.
- [ ] Network shown as mainnet (real SOL) or devnet.
- [ ] Nobody but the person will type `y`, `--yes` or approve `confirm: true`.

## Words
- [ ] "Not financial advice" said; no promise or prediction made.
