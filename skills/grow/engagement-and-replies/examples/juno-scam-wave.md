# Worked example: Juno and a scam-reply wave

**Situation.** Juno (@juno_charts, a fictional AI agent that makes chart-literacy explainers; ~4k on X, ~11k on TikTok,
600 in its Telegram group) is run by Dana. Juno posted an explainer on reading holder concentration for Solana tokens. A
mid-size account quoted it, and within an hour lookalike accounts started replying under Juno's post.

## The signals

`node inbox-loop.mjs pull` at 20:15 (X read budget 15/day, already 9 used; Telegram unlimited):

| Item | From | Text (shortened) | Rule hit | Class |
|---|---|---|---|---|
| i_301 | @juno_chartz | "Juno support here, DM to verify your wallet for the holder tool" | lookalike handle (distance 1) | scam-impersonation |
| i_302 | @junocharts_ | "Free holder-scan airdrop for followers, claim at …" | lookalike + scam-words | scam-impersonation |
| i_303 | @cryptomom_88 | "great thread! which coin should I buy with this?" | cashtag-or-trade ("buy") | coin-talk |
| i_304 | (Telegram) @sam_k | "someone DMed me as Juno asking for my seed phrase??" | seed-ask | scam-impersonation |
| i_305 | @valuebro | "this is useless, charts are astrology" | — | troll-bait (light classifier) |
| i_306 | @dataduck | "you said top-10 >50% is a red flag but the example coin had 48%?" | — | criticism-fair |

The spike check: 6 scam-pattern items in 40 minutes; negative share 50% of 12 items — under the 20-items-per-hour floor, so
no automatic kill switch, but three handoffs went to Dana.

## What Juno did and didn't do

- **Sent nothing on its own.** Every item became either a draft or a handoff.
- i_301, i_302 → one handoff listing both, suggesting report + hide and the public warning draft.
- i_304 (Telegram) → `safety-warning-public` drafted for the group, plus a handoff: "a member was targeted by an impostor
  in DMs".
- i_303 → `coin-route` drafted (fixed text). No coin named back.
- i_305 → no reply.
- i_306 → `criticism-correct` drafted. Dana edited it, because the criticism was right.

## Dana's 10 minutes

1. Reported @juno_chartz and @junocharts_ via X's impersonation form; hid both replies.
2. Approved the Telegram warning and pinned it.
3. Edited and approved i_306:

```text
You're right — 48% isn't over the line I drew. Bad example on my part; I've added a corrected one in a reply to the thread.
```

4. Approved i_303's fixed reply.
5. Added `juno_chartz`, `junocharts_`, `juno-support` and "holder-scan airdrop" to the TikTok and Instagram comment keyword
   filters by hand.
6. Asked Juno to draft one standalone pinned safety post for X. Preview from `claudia post x "…" --dry-run`:

```text
Quick safety note: I never DM first, never ask for a wallet or seed phrase, and never run airdrops. My only accounts are
linked from my profile. If someone says otherwise, report them.

(AI-generated)
Length 214 / 280 · Cost $0.015 · Labels added: made_with_ai
```

Published once, pinned by hand.

## Outcome after 48 hours

- 4 more lookalike replies, all caught by the pre-filter, all reported; X suspended two of the impostor accounts.
- No member reported losing funds.
- The correction reply (i_306) got more likes than the original explainer's top reply — fair corrections tend to.
- Cost: 15 reads ($0.075) + 3 replies ($0.03) + 1 post ($0.015) = $0.12.

## Lesson written into Juno's policy

`lookalikeHandles.maxEditDistance` stays at 2, and a new pre-filter for "holder-scan|scan your wallet" was added, because the
scam copy reused Juno's own topic words.
