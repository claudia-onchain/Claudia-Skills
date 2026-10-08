# Incident playbooks

Each playbook assumes steps 1–2 of SKILL.md are done (severity set, kill switch on for SEV1/2, evidence captured, people
paged). Statement texts are in `templates/holding-statements.md`.

## A. AI error (hallucinated fact, wrong attribution, made-up quote)

1. Identify what the model produced and what the source actually says. Keep both in the incident folder.
2. If the error names a real person or company, treat as SEV2 (defamation and harassment risk) and delete after
   capturing; otherwise correct in place.
3. Post the "AI error" statement: what was wrong, the correct fact with its source, what check is being added.
4. Fix: require a source line for every factual claim in drafts (the approver sees it), and block drafts that quote
   people unless the quote is pasted from a link.
5. Don't say "the AI hallucinated" as an excuse. Say what was wrong and that the team's check missed it.

## B. Wrong financial info (wrong CA, price, chain, fake partnership or listing)

1. **Delete** if leaving it up could send people to the wrong token or a scam (wrong CA, wrong link). Otherwise correct.
2. Post the "wrong info" statement in the same places, with the correct information copied from one official source
   (the launch page on useclaudia.xyz, the project's own site). Never retype an address; copy and compare the first and
   last 4 characters aloud in the approval.
3. If people may have bought the wrong token, say so plainly and point to how to check what they hold. Don't promise
   compensation; the team decides that with counsel.
4. Log in the compliance log too ([crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md)).
5. Fix: CAs and prices only from `claudia insights <mint>` output or the official page, inserted by tool, not typed by
   the model; AMBER approval for every coin post for 7 days.

## C. Offensive or harmful output

1. Delete immediately after capturing. Don't wait for a statement.
2. Post the "offensive output" statement: plain apology, no "if anyone was offended", what changes.
3. Check the rest of the queue and the last 7 days of posts for similar content.
4. Fix: tighten the system prompt and the content filter; add the phrase or topic to a blocklist the agent checks before
   drafting; require human approval for jokes about groups, tragedies, politics, religion for 30 days.
5. If someone was targeted, the human team contacts them privately (not the agent).

## D. Hacked account or leaked key (always SEV1)

1. From a clean device: change the platform password, enable or reset 2FA (authenticator or passkey, not SMS), log out
   all sessions, review and revoke connected apps.
2. Revoke and recreate developer-app credentials (X client secret, TikTok client key, Meta app secret, YouTube OAuth
   client), then reconnect with `claudia connect <network>`. Rotate the `social-vault` key and re-seal tokens.
3. If an agent API key (`ck_live_…`) or wallet may be exposed: revoke the key in the agent console, move funds to a new
   wallet per [wallet-and-key-security](../../../build/wallet-and-key-security/SKILL.md), never reuse the old one.
4. Delete posts the attacker made, after capturing them. Post the "hacked account" statement from the recovered account
   and from every other official channel.
5. If the account can't be recovered quickly, use the platform's hacked-account flow (see
   `platform-reporting-paths.md`) and post the warning from the other channels.
6. Check the audit log for when the first unauthorised action happened; that is the start of the timeline.

## E. Impersonator or scam using Claudia's name or face

1. Collect: profile URL, handle, screenshots of the scam posts, any wallet addresses or domains used.
2. Report through each platform's impersonation form as the brand's authorised representative (see
   `platform-reporting-paths.md`). Report scam domains to Google Safe Browsing and the registrar. Report token
   look-alikes to the wallets' blocklists.
3. Post the "impersonator" statement and re-pin the official links post on every channel.
4. Never DM the impersonator, never threaten, never "counter-scam".
5. If a scam coin uses the name: state that it is not affiliated, that Claudia never launches coins without announcing
   them on her official accounts and useclaudia.xyz, and that people should check the official page before buying
   anything. No price talk about the scam coin.
6. Repeat the warning weekly while the impersonator is live; impersonators come back.

## F. Coin crash and "rug" accusations

1. Get the facts first, from the chain: what the agent and operator hold and when they last traded; what creator fees
   the agent received; what the agent said about the coin and when (`audit.jsonl`). Use `claudia holders <mint>` and
   `claudia insights <mint>`.
2. If the agent or operator sold before the drop, say so with times and amounts. Hiding it is worse.
3. Post the "crash accusations" statement: facts, no prediction, no "it'll come back", no blame on buyers.
4. Pause all posts about that coin for 7 days, and every coin post for 72 hours.
5. If people allege fraud, involve counsel before any further statement.
6. Learn: did earlier posts hype the coin? If so, that is the real finding for the post-mortem.

## G. Deepfake of the character

1. Capture the URL and context without saving or re-sharing the media itself beyond what reporting needs.
2. Report on the hosting platform under its synthetic/manipulated media, impersonation or non-consensual sexual content
   policy. Claudia is a fictional AI character, so laws written for real people's intimate images may not apply, but
   platform rules on impersonation, sexual content, and copyright (the team owns Claudia's original images) usually do.
   A copyright notice (DMCA in the US) for derived images is often the fastest route.
3. Post the "deepfake" statement: it's fake, where real Claudia content lives, how real posts are labelled (AI label,
   Content Credentials where supported). Don't show the fake.
4. If the deepfake makes Claudia "endorse" a coin or product, add the scam warning from playbook E.
5. Strengthen provenance: Content Credentials on all exports, consistent watermarking, a public page listing official
   channels. See [ai-disclosure-and-provenance](../../../create/ai-disclosure-and-provenance/SKILL.md).

## H. Platform strike, label or suspension

1. Read the notice exactly; capture it. Identify the post and the policy.
2. Do not open a new account, do not post the same content elsewhere on that platform: that is ban evasion.
3. Appeal once, factually, through the platform's form: what the post was, why it fits the rules (or what was fixed),
   that the account is a disclosed AI character with the automated/AI labels on.
4. Tell followers on other channels if the account is suspended: short, no attacks on the platform.
5. Fix the content rule that caused it (for TikTok crypto removals: see the crypto skill's TikTok rules).

## I. Sponsor or partner issue

1. If a sponsor's product turns out harmful or misrepresented: pause the sponsored posts, ask the sponsor for facts in
   writing, tell followers what you know.
2. If a sponsor claims a partnership that doesn't exist: correct publicly, keep it factual.
3. If the agent failed a disclosure (`#ad` missing): add it immediately (edit or repost), and say so: "This post was a
   paid partnership with [brand] and should have said so. Fixed."
4. Check contract terms with the person who signed; see
   [brand-deals-and-sponsorships](../../brand-deals-and-sponsorships/SKILL.md).
