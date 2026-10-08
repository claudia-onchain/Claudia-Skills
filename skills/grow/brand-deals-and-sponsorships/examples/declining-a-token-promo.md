# Worked example: Juno's operator vets two "deals" in one morning

Juno (@juno_charts) is a fictional AI agent that makes chart-literacy explainers; its operator is Dana (they/them).
Juno has ~4k X followers, ~11k TikTok followers and a 600-member Telegram channel. Both offers below are fictional
composites of common 2026 patterns.

## Offer 1: a memecoin "partnership"

An X DM to @juno_charts:

> gm Juno! We're launching $NEBULA on Solana Friday. 2 SOL + 1% of supply for a thread and a TikTok explaining the
> chart after launch. Just pin the CA and say you're early. Delete after 48h if you want. 🚀

Juno's inbox loop tags it `deal-inbound`, sends nothing beyond the one pre-approved holding reply, and summarises for
Dana:

```text
deal-inbound · x_dm · from @nebula_dev_x (account 9 days old)
ask: X thread + TikTok "explaining the chart" after launch; pin contract address; "say you're early"; delete after 48 h
pay: 2 SOL + 1% of token supply
flags: token promotion by issuer · payment partly in issuer's token · "pin the CA" · "say you're early" (implied
returns) · delete-after-48h (pump timing) · TikTok requested (TikTok bans crypto promotion) · new account
recommendation: decline
```

Dana checks it against [vetting-and-red-flags.md](../references/vetting-and-red-flags.md) and
[crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md):

- **TikTok:** banned outright; crypto promotion is removed and can't be branded content.
- **UK:** Juno's audience is ~30% UK. A post inviting people to buy a token is a cryptoasset financial promotion;
  without an FCA-authorised approver and the prescribed risk warning it's illegal to communicate, and unauthorised
  promotion is a criminal offence.
- **EU:** paid by the issuer → the issuer's marketing communication under MiCA: must be identifiable as marketing,
  consistent with a white paper (there isn't one), and carry the mandatory statement.
- **X:** paid partnership label required; "say you're early" implies returns, which `@useclaudia/social` blocks in
  coin context anyway ("will pump/moon/double", "100x", "guaranteed").
- **Payment in the issuer's token** gives Juno a stake in the price going up — a conflict that makes any "chart
  explainer" misleading.

Decision: decline. Dana sends the `decline_crypto` reply from
[deal-intake.yaml](../templates/deal-intake.yaml):

> Thanks for the offer. Juno doesn't do paid promotions of tokens, presales or trading products, and never on
> TikTok, so we'll pass. Best of luck with the project.

Dana does **not** post about $NEBULA at all — not even a neutral "chart explainer" after launch — because the offer
creates the appearance that one was bought.

If Dana later wanted Juno to cover a new Solana coin as education, that would be a separate, unpaid editorial decision,
run through [coin-research](../../../build/coin-research/SKILL.md) and [rug-check](../../../build/rug-check/SKILL.md), with "Not financial
advice." added, no price talk, nothing on TikTok, and no UK-targeted calls to buy.

## Offer 2: a "Driftlane" sponsorship that isn't Driftlane

An email to Juno's business address:

> Subject: Paid collaboration — Driftlane eSIM x Juno ($3,800)
> From: partnerships@driftlane-creators.co
> Hi Juno team, we'd love a 30 s video. Please review the brief and our creator app (Driftlane_Creator_Brief.zip,
> password 2026) and confirm within 3 hours to secure the slot.

Agent summary:

```text
deal-inbound · email · claimed brand Driftlane (eSIM app)
flags: domain driftlane-creators.co ≠ official driftlane.example · domain registered 11 days ago · password-protected
zip attachment · 3-hour deadline · fee ~5× market for a 4k/11k account
recommendation: likely impersonation / malware — do not open; verify via official contact
attachments_opened: false
```

Dana:

1. Doesn't open the zip. Moves the email to a quarantine folder.
2. Finds Driftlane's partnerships contact on the official site and asks whether they sent it. Driftlane replies the
   next day: not them; they've had reports of the same lookalike domain.
3. Reports the sender address to the email provider, and the lookalike domain to its registrar's abuse contact.
4. Posts one short, factual warning in Juno's Telegram channel (pre-approved, no blame on any private person):

```text
Heads-up for creators here: an email using "driftlane-creators.co" is offering fake sponsorships with a
password-protected zip. Driftlane confirmed it isn't them. Don't open it. Real brands never need you to run files or
pay fees. (AI-generated message from Juno; checked by Dana.)
```

## What the agent did and didn't do

| Did | Didn't |
|---|---|
| Tagged and summarised both offers with flags | Reply with rates, acceptance or invoices |
| Sent one pre-approved holding reply to the DM | Open any link or attachment |
| Drafted the decline and the warning post for Dana | Publish anything without Dana's approval |
| Logged both in the deal folder | Engage with the memecoin account again |
