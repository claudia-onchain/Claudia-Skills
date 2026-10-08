# Example: an impersonator "giveaway" plus a deepfake (SEV2)

## Monday 09:40 UTC — a follower's report

A Telegram member forwards a screenshot: `@claudia_onchainn` (extra "n") on X, with Claudia's avatar and banner, is
replying to crypto posts with "celebrating 100k, send 0.5 SOL and get 1 SOL back, 1 hour only". The same account links a
Telegram channel "Claudia Official VIP" and a site `claudia-airdrop[.]xyz`.

Severity: harm 3 (money), reach 2, control 3 (others copying) → **SEV2**. Claudia's own account isn't compromised, so the
kill switch is for scheduled posts only; Sam (incident lead) decides to keep the planned lifestyle posts paused for the
day so the warning stays on top.

## 09:45–10:15 — evidence and reports

Collected: profile URLs, ten screenshots with UTC times, the scam wallet address, the domain, the fake Telegram channel
link. Reports filed by Sam as the brand's authorised representative:

| Where | What | Result |
|---|---|---|
| X impersonation form | `@claudia_onchainn`, with official account links and useclaudia.xyz | Suspended Tuesday 11:20 |
| Telegram @notoscam | "Claudia Official VIP" channel and its admin | Channel marked SCAM Monday 16:00, removed Wednesday |
| Google Safe Browsing + registrar abuse contact | `claudia-airdrop[.]xyz` | Browser warning Tuesday; registrar suspended the domain Thursday |
| Discord Trust & Safety | Two accounts DMing members with the same scam | Accounts removed Monday 18:30 |

Nobody DMs the impostor. Nobody replies to its posts.

## 10:20 — warning (Claudia's voice), approved by Rowan, pinned everywhere

```text
Heads up: @claudia_onchainn is not me. It's using my name and face to ask for SOL. My only accounts are listed on
useclaudia.xyz. I never DM first, never ask you to send crypto, and never run "send X get 2X" giveaways. Please report
it (profile → ⋯ → Report → pretending to be someone).
```

Telegram version adds: "The real channel is the one linked from useclaudia.xyz. Admins here will never message you
first." Discord mods post it in `#announcements` and add the scam domain to AutoMod's blocked words.

## Wednesday — a deepfake joins in

A 9-second vertical video spreads on X and TikTok: a face-swapped "Claudia" in a lamp-lit lounge, voice-cloned,
saying "I'm launching my own coin tonight, link in bio". It copies her real lounge clip's setting, which makes it
convincing.

Steps:
1. Severity stays SEV2 (non-sexual, but it fakes a coin endorsement).
2. Reports: TikTok in-app "Misleading AI-generated content" and impersonation form with business documents; X manipulated
   media + impersonation; copyright notices on both because the background frames come from the team's own original clip.
3. The team does **not** repost the video. The statement describes it:

```text
There's a video going around of "me" announcing a coin tonight. It's fake: not made or posted by me or the team, and
I'm not launching anything. Anything I launch is announced on my official accounts and listed on useclaudia.xyz first.
Real posts carry an AI label. Please don't share it; report it.
```

4. Provenance helps: the original lounge clip was exported with Content Credentials; the team links the original
   post in the copyright notice as proof of first publication.

## Friday — closing note and follow-ups

```text
Closing this out: the fake X account, fake Telegram channel, scam site and the deepfake video have been removed after
reports. Thank you to everyone who reported them. Reminder: my official links live on useclaudia.xyz, and I never ask
you to send crypto.
```

Follow-ups added to the post-mortem:
- A weekly search for the name + "giveaway", "airdrop", "official", "VIP" on X, TikTok and Telegram (a person does it;
  no scraping).
- The official-links post re-pinned monthly; profile bios on every platform link to the useclaudia.xyz page that lists
  them, and that page links back to each profile.
- The X Automated label on Claudia's account is linked to the team's managing account, which makes impostors easier to
  tell apart.

## What Juno's operator does differently

Juno (a smaller fictional agent, run by Dana) gets a similar impostor on Telegram. With 600 channel members, Dana files
@notoscam and pins the warning in under ten minutes from a phone. Same playbook, smaller team: the key is that the
statement and the official-links post already existed.
