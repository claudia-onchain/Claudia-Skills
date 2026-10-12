# Example: Silver City members on Telegram

Claudia's public Telegram channel has about 6,200 subscribers. The team (operator: Dana, they/them, for the company
that runs Claudia) wants a small paid membership. Numbers below are illustrative.

## Step 1: demand

- Core: about 410 people reacted or replied 3+ times in the last 30 days.
- Question posted in the public channel: `if I made a members-only diary episode every friday, with the full prompt
  breakdown, would you pay about $4.50 a month for it? yes / maybe / no (AI-generated, reviewed by the team)`
- Result: 74 "yes", 120 "maybe". Enough to start.

## Step 2: platform

Telegram, because the core is already there and Star subscriptions work on a private channel without a separate
account. YouTube memberships would need the Shorts views gate; Discord Server Subscriptions are US-only and most of the
core is in the UK, Germany and Brazil.

## Step 3: one tier

| Tier | Price | Main perk | Extras | AI-made? | Reviewed by |
|---|---|---|---|---|---|
| Silver City members | 350 Stars / month (~$4.55 at the withdrawal rate) | a members-only diary episode every Friday, with the full prompt breakdown | a monthly wallpaper drop; a members' vote on next month's setting | yes, all labelled | Dana |

Not offered: "DM Claudia" (it would read as personal), anything about coins or $CLAUDIA prices, giveaways.

## Step 4: the page (pinned in the public channel)

```text
silver city members: a new diary episode every friday, plus the full prompt breakdown so you can make your own.
I'm an AI character. the team at Claudia runs this account and reviews every post before it goes up.
350 Stars a month. cancel anytime in Telegram. not financial advice, obviously.
```

## Steps 5–6: setup and the first three weeks banked

- Private channel "Silver City members" → invite link → Require Monthly Fee → 350 Stars.
- Dana joined with their own account to test: paid, saw the welcome post, cancelled, confirmed access stayed until the
  end of the 30 days.
- A bot added as admin of the members channel; three episodes finished and approved before launch.

```sh
claudia connect telegram --token <bot-token> --chat <members-channel-id>
claudia post telegram "members' diary, ep. 1: the silver foil set at 2am. full prompt breakdown below. (AI-generated)" \
  --media ./members/ep1-cover.jpg --dry-run
```

The dry run showed the text with the AI label and the target channel. Dana posted it on Friday after one last read.

## Step 7: launch

One announcement in the public channel, pinned for a week, and a mention at the end of the next three regular posts.
No countdown. 58 members joined in the first two weeks.

## Step 8: first churn review (after month two)

| Month | Start | New | Cancelled | End | Churn | First-60-day churn | Stars received (est.) |
|---|---|---|---|---|---|---|---|
| 1 | 0 | 71 | 4 | 67 | — | 6% | 24,850 |
| 2 | 67 | 22 | 12 | 77 | 18% | 17% | 26,950 |

Exit reasons in month two: 7 × "perks weren't what I expected", 3 × "too expensive", 2 × other. Reading the free-text
answers: two Fridays in month two had shorter episodes without the full breakdown, because the agent's draft ran long and
Dana cut it.

Decisions:

- The breakdown is the perk; it never gets cut again. Episodes can be shorter, the breakdown stays full.
- Four weeks banked instead of three.
- Price unchanged. Next review in a month.

## What the team didn't do

- No "only 20 spots left" (there weren't limited spots).
- No auto-DMs to people who left; one win-back post in the public channel after a month, describing what changed.
- No members-only coin talk. When a member asked about $CLAUDIA's price, the reply pointed to the public data tools and
  said: `I don't do price talk, in here or anywhere. not financial advice.`
