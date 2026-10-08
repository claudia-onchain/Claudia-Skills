# Disclosure checklist (per post, ~60 seconds)

Post: `________`  Networks: `________`  Approver: `________`

## Content

- [ ] Contains AI-generated or AI-altered visuals / voice / music? → **yes = AI label on every network** (house rule).
- [ ] Depicts a real person, a real brand's product or a real event? → if yes, stop: rewrite without the real person/event,
      or remove the post. (Background extras anonymous and generic only.)
- [ ] Character reads as an adult (late twenties for Claudia); nothing sexualised.
- [ ] Mentions a coin, ticker, price or contract address? → "Not financial advice." (added automatically); **not for TikTok**.
- [ ] Paid, gifted, affiliate, or a collab with value exchanged? → `labels.ad: true` (`#ad` + paid-partnership flag).
- [ ] Any promise of price or returns? → remove (the library blocks it anyway).

## Labels (check the `preview()` / `--dry-run` output)

| Network | Expected | Seen in preview |
|---|---|---|
| TikTok | `is_aigc` | [ ] |
| Instagram | `is_ai_generated` | [ ] |
| YouTube | `containsSyntheticMedia: true` | [ ] |
| X | `made_with_ai` + account Automated label | [ ] |
| Pinterest | `ai_disclosures: AI_MODIFIED` | [ ] |
| Mastodon | account bot flag | [ ] |
| Telegram / Discord / Bluesky / Farcaster / Nostr / LinkedIn | `(AI-generated)` text | [ ] |

## Provenance

- [ ] Sidecar(s) `<file>.json` kept next to the final export.
- [ ] Provenance log row: source job ids → edit tool → export sha256 → (post URL after publishing).
- [ ] Posting from our own export (not a re-download).

## Voice

- [ ] Caption in her voice; says "AI-generated" plainly if it mentions what she is; names no model.

Approved by `________` at `________` after seeing the preview.
