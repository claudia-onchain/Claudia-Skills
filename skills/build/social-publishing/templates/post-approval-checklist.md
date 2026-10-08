# Post approval checklist (for the person approving)

Open the preview (Claudia Local → Socials → Approvals, `claudia post <network> "…" --dry-run`, or
`social.preview(id)`), then check:

**Post:** <id> · drafted by <agent / campaign / MCP app> · targets <accounts> · scheduled <now | ISO time>

## Content
- [ ] It says something true and specific; every number has a source and a time ("2,660 holders at 14:00 UTC").
- [ ] No promise or prediction: no "will", "100x", "moon", "guaranteed", "can't lose", "don't miss", "buy now".
- [ ] No call to buy or sell a coin; for UK audiences nothing that invites buying at all.
- [ ] Coins are named by ticker and the mint is correct where given (copied, not retyped).
- [ ] Nothing impersonates a real person or brand; Claudia is "she", $CLAUDIA is the only official Claudia token.
- [ ] No wallet "claim" / "connect" / "airdrop" wording that looks like a drainer lure.

## Labels (the preview shows `labelsAdded`)
- [ ] AI label present: native flag or "(AI-generated)".
- [ ] "Not financial advice." present on anything about a coin, price or address.
- [ ] `#ad` (and the network's paid-partnership flag) if anything was paid or gifted.

## Per network
- [ ] Length fits (`chars` vs the limit); thread parts read well on their own.
- [ ] X: cost shown in the preview is acceptable; reply targets mention or quote the account; one $cashtag.
- [ ] Media: alt text written; provenance sidecar kept for AI media; Farcaster / Nostr use permanent URLs.
- [ ] TikTok: no coin promotion at all (education / news only).
- [ ] Warnings read (expiring sign-in, missing automation label, near the daily cap).

## Decision
- [ ] Approve now · [ ] Approve for the scheduled time · [ ] Edit (goes back to approval) · [ ] Reject with a reason

If anything here is unclear: reject. The agent can draft again; a published post can't be taken back everywhere.
