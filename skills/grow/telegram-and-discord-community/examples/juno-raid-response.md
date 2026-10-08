# Example: Juno's Telegram group gets raided during a viral moment

Juno is a fictional AI agent (@juno_charts) that makes chart-literacy explainers. It is run by Dana (they/them). Juno's
Telegram discussion group had 600 members when a Juno TikTok about reading candle wicks hit 1.2M views and the group
link in the bio started pulling in a few hundred people an hour, including spam accounts.

## Timeline (UTC)

**18:05** — 140 joins in 20 minutes. Messages: "DM me for 10x calls", two links to a "wallet sync" site, a forwarded fake
"Juno airdrop" post with a doctored screenshot of Juno's avatar.

**18:07 — freeze (Dana, on phone):**
- Group → Slow mode **5 min**.
- Permissions → members: Send links **off**, Send media **off**.
- Invite link in TikTok bio swapped for a new link with **Request admin approval**; old link revoked.
- Juno's queued posts held:

```ts
social.killSwitch(true);   // Juno had a scheduled "welcome new folks" post at 18:30 that would have landed in chaos
```

**18:10 — tell members (approved by Dana, posted by Dana, not the agent):**

```text
Lots of new people — welcome. We're also cleaning up spam. Don't click links or answer DMs. Juno never DMs first and
there is no Juno airdrop. Slow mode is on for a bit.
```

**18:12–18:40 — clean:**
- Admin log filtered to 18:00–18:10: 23 accounts posted links or "DM me" texts → deleted and banned.
- Aggressive anti-spam was already on (group had passed 200 members); its log showed 31 more deletions, 2 false
  positives (real members asking "is this the real group?") → marked "Not spam".
- Dana reported the fake airdrop source channel in-app as a fake account.

**18:45 — partial reopen:** slow mode 1 min, links still off. Join requests approved in batches: Dana approved accounts
with a profile photo and a message history, skipped fresh accounts with crypto-ticker names (about 1 in 5).

**21:00 — normal settings:** slow mode 30 s, media back on, links stay off for members until the next day.

```ts
social.killSwitch(false);  // after Dana edited the 18:30 welcome post and re-approved it for 21:15
```

## The next morning

- Group: 600 → 2,140 members; 55 bans total; 0 members reported losing funds.
- Juno's welcome post (21:15) got 380 reactions; the pinned scam warning was the most-viewed pin of the month.
- Dana added three things permanently:
  1. A second moderator from the community, rights: Delete messages, Ban users (no Add admins).
  2. A topic `Ask Juno` where the bot answers mentions, with every answer approved by Dana or the moderator,
     and coin questions answered with the holding reply from `templates/rules-and-pins.md`.
  3. A note in the bio: "Official group link only here. Juno never DMs first."

## What Dana did not do

- No mass DM to the new members ("welcome!") — it would have trained them to trust DMs.
- No "invite 3 friends" contest to ride the wave.
- No public argument with the fake-airdrop channel; a report and a single clear statement were enough.
