# Batch-day runbook

Batch: `________`  Week: `________`  Approver: `________`  Operator (person or agent): `________`

## Before (operator)

- [ ] Calendar rows for the week exported; one manifest item per generation; every item has an explicit `model`.
- [ ] Identity block in `blocks.ID` is the current version (`[CLAUDIA ID v1]`); wardrobe/setting strings from the bible.
- [ ] Ref files exist for stage 1 (`refs/claudia/01-front-neutral.jpg` etc.).
- [ ] `node scripts/batch.mjs estimate batch.json` run; no retiring-model warnings left unhandled.
- [ ] Total + reroll budget: `$______` (cap `$______`).

## Sign-off 1 — budget (approver)

- [ ] I've seen the per-item estimate and the total. Approved up to `$______`.  Initials/date: `________`

## Stage 1 — stills and voice

- [ ] `node scripts/batch.mjs run batch.json --yes --stage 1`
- [ ] Jobs above the threshold approved by the approver (Claudia Local or `batch.mjs approve`, TTY).
- [ ] Contact sheets made; each still scored (7-point drift check). Winners copied to `out/<item>.png`.
- [ ] Rerolls used: `____` of budget `$______`.

## Stage 2 — video

- [ ] `node scripts/batch.mjs run batch.json --yes --stage 2` (refuses if a picked still is missing)
- [ ] Approvals done by the approver.
- [ ] First / middle / last frames scored; hands, phone, streaks, age checked; audio checked ("no music" respected).

## Stage 3 — lip-sync / avatar

- [ ] Picked clip + final VO as refs; run; sync checked at full speed.

## Sign-off 2 — content (approver)

- [ ] Adult, late twenties; no sexualised framing; no real-person likeness; background people anonymous.
- [ ] No readable third-party logos; on-screen text spelled right.
- [ ] Music/fonts licensed for this account type.
- [ ] Sidecars kept next to finals; labels planned per network.
- [ ] No price/return promises; NFA where a coin is mentioned; no coin content for TikTok.
      Initials/date: `________`

## Hand-off

- [ ] Drafts created in `@useclaudia/social`, previews checked (labels, length, warnings), submitted → `pending_approval`.
- [ ] Approver approved/scheduled each post themselves.

## Close

- Planned `$______` · actual `$______` (`batch.mjs status`) · published assets `____` · cost per asset `$______`
- Prompts that scored 7/7 saved to the library: `____`
