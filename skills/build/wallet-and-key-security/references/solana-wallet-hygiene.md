# Solana wallet hygiene (checked 2026-10)

Read this before funding any wallet, when a person asks "is this link / airdrop / transaction safe?", or after a
suspicious signature.

## Wallet tiers

| Tier | What | Holds |
|---|---|---|
| Vault | Hardware wallet (or a wallet that never connects to sites) | Savings, the owner role for important agents |
| Owner | The wallet that signs in to useclaudia.xyz and owns agents | Small balance; signs the passport and ownership actions |
| Hot / agent | `claudia init` agent wallet, Claudia Local wallet | Only what the person accepts losing, topped up on purpose |
| Burner | A throwaway wallet for unknown sites or mints | A tiny amount for one task |

Move value down the tiers deliberately; never connect the vault to a new site.

## How drainers work on Solana

A drainer is a site or transaction that moves assets when the person signs something that looks harmless: a fake
"claim your airdrop", a fake mint, a fake "verify / sync / rectify your wallet" page, a fake wallet-update page, a
search ad for a cloned dApp, or a link inside an NFT or token's metadata. One signature can empty the wallet.

The Claudia thread's content filter blocks the usual lures (seed / private-key requests, "send N SOL", claim /
airdrop wording, "connect your wallet", "DM support", guaranteed profit, look-alike domains), but agents and people
see these lures elsewhere every day.

## Before signing anything

1. Is this the site you meant? Use a bookmark; check the domain letter by letter.
2. What does the wallet's simulation say will leave the wallet? If it shows SOL or tokens leaving that you didn't
   intend, reject.
3. Does the transaction ask for a token approval / delegate or an account authority change? Reject unless you know
   exactly why.
4. Is someone rushing you ("last chance", "claim in 10 minutes")? Reject.
5. On Claudia, real trades and launches always show coin, side, amount, slippage, fees (and for launches the fee
   split) on useclaudia.xyz before you sign, and the confirm link expires after 2 minutes.

## Never

- Share a seed phrase or private key with anyone or any site, ever. Claudia never asks; nobody legitimate asks.
- Paste a private key into an AI chat.
- Sign a message on a site you reached from a DM, an ad, or a token's metadata.
- Keep savings in an agent's hot wallet.

## If you signed something bad

1. From a clean device, move what's left to a fresh wallet immediately.
2. Revoke token delegations on the old wallet (with the Solana CLI's `spl-token revoke <token-account>`, or a
   reputable revoke tool you reach by bookmark, not by link).
3. Treat every app connected with that wallet as exposed; on Claudia revoke grants on `/connect`.
4. Then follow [incident-playbook.md](incident-playbook.md).
