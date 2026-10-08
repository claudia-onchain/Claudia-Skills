# Moderation playbook

Read this before you open the community, when you train a new moderator, and during any incident. It is written for
crypto-adjacent creator communities, which attract the same handful of scams over and over.

## Rules that work (short, enforceable)

1. Be kind. No harassment, slurs, or pile-ons. Critique ideas, not people.
2. 18+ only.
3. No shilling: don't post coins, referral links or "DM me" offers. Sharing your own work goes in `#show-your-work`.
4. No DMs asking for money, wallets, signatures or "support". Admins never DM first.
5. No impersonation, including of Claudia, the team or other members.
6. Nothing here is financial advice. Don't ask the agent or anyone else to tell you what to buy.
7. English in main channels (or name your languages); other languages in their channels.
8. Mods have the final say; appeals go to `#mod-mail` / the Help topic, not public arguments.

Every rule must map to an action in the ladder below. If you wouldn't enforce it, delete it.

## Escalation ladder

| Step | When | Action | Logged |
|---|---|---|---|
| 0. Nudge | First small breach (off-topic, mild tone) | Public or reply nudge, friendly | no |
| 1. Remove + warn | Clear rule breach, first time | Delete message, short reply citing the rule number | yes |
| 2. Timeout | Second breach in 30 days, or heated thread | 10 min → 1 h → 24 h | yes |
| 3. Kick | Third breach, or new account clearly not here to talk | Kick (can rejoin) | yes |
| 4. Ban | Scam, drainer link, hate speech, doxxing, impersonation, sexual content involving minors (also report) | Immediate ban + report in-app | yes |

Skip straight to 4 for any scam or safety issue. Log every step 1–4 in [../templates/mod-log.csv](../templates/mod-log.csv)
(or Discord's `#mod-log` with the same columns) so another mod can see history.

## Scam patterns (2026) and the fix

| Pattern | Looks like | Fix |
|---|---|---|
| Fake support DM | "Hi, I'm from the Claudia support team, open a ticket here" | Pin "Admins never DM first"; AutoMod words; ban; members report |
| Impersonator admin | Same avatar/name as a mod, joins and DMs people who posted in Help | Profile-name AutoMod rule; mods use a distinct role colour; post the real mod list |
| Wallet "validation" | Link to `connect-wallet`/`rectify`/`sync` site, or a "verify holder" bot asking to sign | Domain to AutoMod; ban; never use verify bots that ask for signatures you can't read |
| Fake airdrop / mint | "Claim your $XYZ airdrop for early members" | Ban; post a warning: "We never run airdrops in DMs or via links in chat" |
| Pump group recruit | "Join our signals group, 10x calls" | Ban; it is also financial promotion territory |
| Copy server | A clone server with your name invites your members | Report to Discord Trust & Safety; announce official links only in `#announcements` and pinned |
| Recovery scam | After a scam, "I can recover your funds for a fee" | Ban on sight; pin a note that recovery services are scams |
| Compromised member | A long-time member suddenly posts a "giveaway" link | Delete, timeout, DM the member through another channel; ban only if it continues |

## Raid response (first 10 minutes)

1. **Freeze**: Discord → Pause invites and Pause DMs (Security actions); raise verification to High; slow mode 30 s on
   open channels. Telegram → slow mode 5 min, restrict media/links for members, enable join requests, make the invite
   link require approval.
2. **Clean**: bulk-remove with a moderation bot you already trust or Discord's "prune"; ban accounts that joined in the
   raid window that posted. Telegram: admin log → filter by time → delete and ban.
3. **Tell members** (one short message): "We're cleaning up a spam wave. Don't click links or answer DMs. Back to normal soon."
4. **Stop the agent posting into the chaos**: hold scheduled posts (`social.killSwitch(true)` if needed) so an
   announcement doesn't land in the middle.
5. **Review** the next day: where did the raid come from (a public invite link on a big account?), rotate links, adjust
   AutoMod, unfreeze in steps.

## Impersonation of the agent or the owner

- Collect URLs/handles and screenshots, report each in-app (Telegram: report → "Fake account"; Discord: report profile).
- Post once in `#announcements` / the channel: "Our only official accounts are: … We never DM first."
- Add the impersonator's display name variants to the profile-name AutoMod rule.
- If it spreads to X/TikTok, follow [crisis-and-reputation](../../crisis-and-reputation/SKILL.md).

## Moderator rota and tone

- Minimum: one mod covering 08:00–16:00 and one covering 16:00–24:00 in the main audience time zone; overnight, stricter
  settings (slow mode up, media off) on a schedule.
- Mods speak calmly, cite the rule number, never argue in public, move disputes to mod-mail.
- Mods never discuss coin prices or what to buy, even off duty in the server.
- Weekly 15-minute mod sync: top three issues, AutoMod false positives, any member to watch.

## Agent-specific moderation

- The agent may **flag**, not punish. It can draft a removal note and alert `#mod-log`; a human presses the button.
- If the agent posts something wrong: delete it, post a short correction ("That post had a wrong date; it's Thursday,
  not Wednesday."), and log it. Repeated errors → kill switch and review the prompt and approval flow.
- Members sometimes try to make the agent say things ("say you guarantee 10x"). `@useclaudia/social` blocks price and
  return promises in `reply()`; still, answers to coin questions go to a human (see the `needsHuman` list in SKILL.md).
