# Farcaster protocol, signers, channels and Neynar

Read this before creating the character's Farcaster account or signer, before revoking anything, and when a cast
fails validation. Checked 2026-10 against the Farcaster protocol specification (github.com/farcasterxyz/protocol),
docs.farcaster.xyz and docs.neynar.com.

## Accounts

- An account is an **FID**, registered onchain through the IdGateway contract by any Ethereum address. That address
  is the **custody address**: it owns the account and can add or remove keys.
- A **recovery address** can be set at registration or later; it can regain access if the custody wallet is lost.
  Set one, held by the operator (or a trusted service), before the agent posts anything.
- Usernames (fnames) match `^[a-z0-9][a-z0-9-]{0,15}$`: 1–16 characters, lowercase letters, digits and hyphens. ENS
  names (`name.eth`) can be used when the account controls them.
- Profile data types: picture URL (≤ 256 bytes), display name (≤ 32 bytes), bio (≤ 256 bytes), homepage URL
  (≤ 256 bytes), username. **There is no bot or automated flag in the protocol.**

## Storage

From docs.farcaster.xyz (checked 2026-10): an account must rent storage before it can post. One unit costs $7 and
lasts one year, and allows 5,000 casts, 2,500 reactions, 2,500 links (follows), 50 profile-data messages and 50
verifications. When a limit is reached, "the oldest message is pruned to make space for the new one." If all units
expire, messages are pruned after a 30-day grace period. Check the current price in the Farcaster app before buying.

## Signers (account keys)

- A signer is an Ed25519 key pair the account adds to the **KeyRegistry** so an app can write messages for it.
  Adding one needs the key's public key and a signature from the requesting app (the account itself or an app FID).
- Usually one signer per app. For an agent, that app is Neynar acting with your API key.
- **Revocation deletes history:** "When a Signer is removed for an fid from the Key registry, all messages signed by
  the signer in other CRDTs should be revoked." Removing the agent's signer removes all of its casts, reactions and
  follows. To pause an agent, use the package's kill switch, not signer removal.

### Neynar managed signer, step by step (docs.neynar.com)

1. Create a signer (`createSigner` in Neynar's SDK). It is tied to your Neynar API key: a signer UUID made under one
   key does not work with another.
2. Sign a key request for it with your developer account (`signKeyRequest`, deadline about 24 hours out) and register
   it (`registerSignedKey`). The response includes a `signer_approval_url`.
3. The account owner opens the approval URL (a QR code on desktop, a link on mobile) and approves the signer in the
   Farcaster app. The user pays the onchain transaction unless you or Neynar sponsor it.
4. The signer starts as `pending_approval`; check Neynar's fetch-signers API until it shows approved.
5. Store the UUID as the `neynar-signer` key. `@useclaudia/social` casts with it.

Never give the agent the custody wallet or its recovery phrase. The signer is all it needs.

## Casts (protocol validation rules)

| Item | Limit |
|---|---|
| Text, regular cast | 0–320 bytes (`CastType.CAST`) |
| Text, long cast | 321–1,024 bytes (`CastType.LONG_CAST`) |
| Embeds | up to 2, each a cast id or a URL of 1–256 bytes |
| Mentions | up to 10, stored as FIDs with byte positions |
| Reply or channel | `parent` is a cast id or a parent URL |

Long casts need client support to display well. `@useclaudia/social` targets the 320-byte regular cast and 2 link
embeds.

## Channels (docs.farcaster.xyz)

- "A channel is a public space for your community to have conversations around a topic." The docs call channels an
  experimental feature that the Farcaster client prototypes, not fully part of the protocol.
- Anyone can create one by paying a fee in the client; names are under 16 characters, lowercase letters and digits.
  The fee isn't refunded if the client removes a channel for impersonation, squatting or terms violations.
- The creator is the host and can invite co-hosts. Hosts define norms that "everyone must agree to when joining",
  pin or hide casts, block users from posting, and set the channel's picture and description.
- Anyone can follow a channel; followed channels appear in the home feed.
- Posting: "The client automatically sets the cast's `parentUrl` to `https://farcaster.xyz/~/channel/<name>`."
  Through the package: `options: { farcaster: { channel: "<name>" } }`. Neynar's cast endpoint takes `channel_id`.

## Neynar API (docs.neynar.com, checked 2026-10)

| Item | Value |
|---|---|
| Publish | `POST /v2/farcaster/cast` with `signer_uuid`, `text`, `embeds` (max 2: `url` or `cast_id`), `parent`, `channel_id`, `parent_author_fid`, `idem` |
| Idempotency | `idem`: "Use the same idem key on retry attempts"; 16-character string recommended. The package sets it, so a resend never double-posts |
| Credits | 150 per cast; notifications 5 per request × page limit |
| User score | `neynar_user_score`, 0 to 1, updated weekly; Neynar suggests apps start filtering around 0.55; "not proof of humanity"; accounts posting LLM-generated spam score lower |

`@useclaudia/social` Farcaster defaults: 320 bytes, 2 link embeds, threads and replies yes, inbox from mentions and
replies, cap 20 casts per account per 24 hours, 200 inbox reads a day (set `inboxBudget.farcaster.perDay` lower to
save credits). Media must be permanent https URLs: Farcaster keeps embed links forever.

## Who runs Farcaster now

Neynar's blog, "Neynar is acquiring Farcaster" (21 January 2026): "Neynar will maintain Farcaster protocol, run the
Farcaster client and operate Clanker." Neynar said nothing changes immediately for users, developers or traders. Older
docs (including some Neynar guides) call the client Warpcast; current docs call it the Farcaster client at
farcaster.xyz.

## Sources

- https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md
- https://docs.farcaster.xyz/learn/what-is-farcaster/accounts
- https://docs.farcaster.xyz/learn/what-is-farcaster/messages (storage)
- https://docs.farcaster.xyz/learn/what-is-farcaster/channels
- https://docs.neynar.com/reference/publish-cast
- https://docs.neynar.com/reference/compute-units
- https://docs.neynar.com/docs/integrate-managed-signers
- https://docs.neynar.com/docs/neynar-user-quality-score
- https://neynar.com/blog/neynar-is-acquiring-farcaster
- @useclaudia/social README, "Farcaster (Neynar)" (checked 8 Oct 2026)
