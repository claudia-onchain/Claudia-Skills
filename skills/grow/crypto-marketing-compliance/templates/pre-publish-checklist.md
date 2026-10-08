# Pre-publish checklist for coin posts (AMBER and paid items)

Copy this block into the approval request. The approver ticks every line or sends the draft back. Not legal advice.

```text
POST         [post id from social.draft()]          NETWORKS  [x, telegram, …]
COIN(S)      [$TICKER, mint address]                 CLASS     [GREEN | AMBER | RED]
DRAFTED BY   [agent name]                            APPROVER  [person's name]
WHY THIS CLASS  [one line, e.g. "Q4: agent launched the coin; factual holder milestone; no CTA"]

Claims
[ ] 1. No price, return, safety or certainty claim (phrase check exit 0; preview not blocked)
[ ] 2. Every number has a source and a UTC time ("from the board at 14:05 UTC")
[ ] 3. No partnership, listing or news that isn't already public and verifiable
[ ] 4. No personal-experience claim the AI persona can't have; no testimonials

Interests and money
[ ] 5. Holding / launch / creator-reward interest disclosed in the post body, near the start
[ ] 6. Paid? Sponsor named, amount and form stated, #ad present, labels.ad = true
[ ] 7. Paid on Instagram → Paid partnership tool; YouTube → paid promotion box; X → Paid Partnership label
[ ] 8. No performance bonus tied to price or holder count in the deal terms

Audience and geography
[ ] 9. Assumed UK and EU reach; the post is not an invitation to buy a specific coin, OR an approved route exists:
        UK approver firm: [name, FRN]     EU: white paper URL [ ] + MiCA statement [ ]
[ ] 10. Not TikTok, or TikTok version has no ticker, CA, chart of a coin or buy link
[ ] 11. Sponsored crypto on X is not aimed at UK, EU or Australia

Incentives and engagement
[ ] 12. No giveaway, airdrop or reward tied to buying, holding, following, reposting or replying
[ ] 13. No request to like/repost/follow (X Original Content Rewards and platform rules)

Labels
[ ] 14. AI label on (preview shows it); on-screen + spoken AI note in videos
[ ] 15. "Not financial advice." visible; at most one $cashtag on X
[ ] 16. Links go to useclaudia.xyz or the official project page, not a buy button with a referral code

Operations
[ ] 17. Agent and operator will not trade the coin for 24 h before and after this post
[ ] 18. Replies plan: "should I buy?" questions get the safe reply template, not advice
[ ] 19. Kill switch owner on call: [name]   ← who pulls social.killSwitch(true) if it goes wrong
[ ] 20. Log row added to compliance-log.csv; preview JSON saved to [path]

Decision: [ APPROVE | SEND BACK | REFUSE ]     Signed: [name]     Time (UTC): [yyyy-mm-dd hh:mm]
```

Safe reply to "should I buy?":

```text
I can't tell you that, and I don't do predictions. What I can do: show you how to check holders, liquidity and mint
authority before you touch any coin. Memecoins can go to zero. Not financial advice. (AI-generated)
```
