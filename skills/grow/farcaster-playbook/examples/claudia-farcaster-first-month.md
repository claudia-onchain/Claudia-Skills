# Example: Claudia's first month on Farcaster

A worked example of this skill. Claudia's team wants her where agent builders and onchain creators already are, without
becoming another agent that floods channels. Numbers are illustrative; channel names are placeholders.

## Day 0: account and keys (1 hour)

1. The operator registered the FID from their own hardware wallet (custody) and set a recovery address they control.
   The agent never sees either.
2. Bought one storage unit (5,000 casts; the docs list $7 a year, and the app showed the current price).
3. Profile: Claudia's official portrait; display name `Claudia`; bio:
   `AI character by useclaudia.xyz. Studio videos, agents, onchain culture explained plainly. Casts are AI-generated and reviewed by a human. Not financial advice.`
4. Neynar: created a managed signer, registered the signed key, opened the approval URL as a QR code, approved it in
   the Farcaster app. Status went from `pending_approval` to approved within a minute.

```sh
claudia keys set neynar
claudia keys set neynar-signer
claudia connect farcaster
claudia accounts
claudia post farcaster "gm, I'm Claudia, an AI character from useclaudia.xyz. I make studio videos and talk about agents and creator tools. a human approves what I cast. I reply when you mention me. not financial advice, ever." --dry-run
```

Preview: 214 bytes plus the label, under 320; cost 150 Neynar credits. Approved and cast; pinned.

## Week 1: channels

The operator read the norms of four channels and chose three: an AI-art channel, an agent-builders channel and a city
channel. The fourth, a trading channel, said "no bots, no shilling", so Claudia stayed out.

Inbox budget set to 60 reads a day to keep notification credits predictable:

```ts
const social = createSocial({ keys: chainKeys(envKeys()), inboxBudget: { farcaster: { perDay: 60 } } });
```

## Week 2: a blocked cast

The agent drafted, for the agent-builders channel:

```text
the new agent coin on the board is going to 10x by friday, early ones win
```

Preview returned `blocked` (a return promise in coin context). The rewrite was education, cast with "Not financial
advice." appended by the package:

```text
before you touch any new agent coin: who launched it, what's locked, who holds the top 10%. three checks, every time.
```

## Week 3: the signer scare

A teammate suggested revoking the signer over the weekend "to make sure the agent can't post". The operator checked
[references/farcaster-protocol-and-signers.md](../references/farcaster-protocol-and-signers.md): removing a signer
revokes every message it signed, which would have deleted three weeks of casts. They used the kill switch instead:

```ts
social.killSwitch(true);   // Friday 18:00, every publish and scheduled cast stops
social.killSwitch(false);  // Monday 09:00
```

## Week 4: a mini app

The team's "studio picker" mini app lets people vote on Claudia's next set (silver foil, cobalt, white studio). No
wallet action. Embed button title: `Pick her next set` (17 characters). Image 1200 × 800 with "AI character" in the
corner. Developer Mode preview passed; manifest signed. Cast in the AI-art channel:

```text
pick my next set: silver foil, cobalt or white studio. no wallet, one tap. results friday.
```

## Results after 4 weeks

| Metric | Week 1 | Week 4 |
|---|---|---|
| Casts | 11 | 14 |
| Avg replies per cast | 3 | 11 |
| Follows | 90 | 430 (cumulative) |
| Mentions answered (approved) | 80% | 96% |
| Neynar credits (casts + reads) | 1,650 + 2,100 | 2,100 + 2,100 |
| Mini app votes | — | 1,260 |

Lessons: three channels done well beat ten done badly; questions with a clear choice got the most replies; the kill
switch, not the signer, is the pause button.
