# Example: Claudia's cobalt-print giveaway

Claudia (an AI character) passes a follower milestone and the team wants to say thanks with a giveaway on Instagram
and X. The promoter is the company that runs the platform; Claudia hosts the posts in her voice but doesn't pick the
winner or message entrants. Numbers are illustrative.

## Steps 1–2: type, prize, paperwork

- **Type:** prize draw (free entry, chance). No purchase, payment, token or wallet anywhere.
- **Prize:** one numbered print of the cobalt studio set, 40 × 50 cm, unframed, retail value $180. Bought and owned by
  the promoter; no brand involved, so no `#ad`.
- **Paperwork:** total prizes $180, far under the $5,000 New York and Florida thresholds and under the $2,000 1099-MISC
  threshold (checked 2026-10).
- **Crypto element:** none. The team considered "0.5 SOL to one winner" and dropped it: it would need a UK exclusion,
  a legal review, and it invites wallet-drainer scams aimed at entrants.
- **Eligible:** 18+, residents of the US, Canada, Germany, France and Australia. Excluded: staff and families.

## Step 3: mechanic

"Comment once with the outfit you'd put me in for the next cobalt shoot." No follow, tag, share or repost requirement,
which keeps it inside Meta's no-share/no-tag rule, Instagram's tagging rule and X's
guidelines. One entry per person across both platforms.

## Step 4–5: rules and announcement

Rules at `useclaudia.xyz/giveaway-rules` from templates/official-rules.md. Seed source written into section 7 before
launch: "the first 16 characters of the first drand randomness value published after the closing time".

Instagram caption:

```text
giveaway: one numbered print of the cobalt studio set, 40 x 50 cm

to enter: comment once with the outfit you'd put me in for the next cobalt shoot. one entry per person.
no purchase necessary. buying anything doesn't help your chances.
18+, residents of the US, Canada, Germany, France and Australia.
closes friday 14 november, 23:59 UTC. winner drawn at random (method in the rules) and announced in a new post by 17 november.
rules: useclaudia.xyz/giveaway-rules
this promotion is not sponsored, endorsed or administered by, or associated with, Instagram.
I'm an AI character; the Claudia team runs this account and the draw. #giveaway
```

X post (shorter, same facts, link to the rules, mention `#contest` in the post itself):

```text
giveaway: a numbered print of the cobalt studio set. reply once with the outfit you'd put me in next. #contest
no purchase necessary · 18+ · US, CA, DE, FR, AU · closes 14 nov 23:59 UTC · one entry per person, multiple accounts = ineligible
rules: useclaudia.xyz/giveaway-rules · AI character, run by the Claudia team
```

Pinned on both: the impersonator warning from templates/giveaway-announcement.md.

## Step 6: export and clean

| Count | Reason |
|---|---|
| 1,402 | raw comments and replies exported (Instagram export + X replies to the post) |
| −61 | second and later comments by the same person |
| −29 | same person on both platforms (matched by a confirmed cross-link in bio) |
| −18 | accounts created after the giveaway was announced, with no other activity (multiple-account rule) |
| −10 | entries stating a country outside the eligible list |
| **1,284** | eligible entries, saved as `entries-clean.csv` with ids `e0001`–`e1284` |

Every removal reason went into templates/winner-selection-log.csv.

## Step 7: the draw

The seed was taken from the first public randomness value after close, watched on a video call by a friend of the team
who isn't staff:

```text
$ node scripts/draw-winner.mjs entries-clean.csv --seed "9f3c1a7e52b04d68" --alternates 2
entries file   entries-clean.csv
file sha256    72287d8d78c1b2539e5409b2300df3e155caa9fa79c28cba2f44addec50d466e
seed           9f3c1a7e52b04d68
entries        1284 raw, 0 duplicates removed, 1284 in the draw
winner         e1090
alternate 1    e1211
alternate 2    e1087
method         lowest sha256("<seed>:<entry id>"), ids lowercased and de-duplicated
```

## Step 8: notify, award, publish

- DM to the winner (entry `e1090`) from the official account only, with the claim message from the template and a
  7-day deadline. They replied in a day with a delivery address and confirmed age and residence.
- Winner post (new post, not a buried reply):

```text
the cobalt print giveaway is closed. 1,284 eligible entries.
winner: @<handle> (they said yes to being named). congrats, and great call on the patent trench.
how we picked: random draw. seed 9f3c1a7e52b04d68, entry list hash 72287d8d78c1, method in the rules.
we only contact winners from this account and never ask for money or keys.
```

- Print shipped in 9 days with tracking; logged as delivered. Entry data deleted 30 days after delivery, as the rules
  said. No entrant was added to the newsletter.
