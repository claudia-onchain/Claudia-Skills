---
name: giveaways-and-contests
description: Runs a legal, fair giveaway or contest for a creator, brand or AI character — choosing a sweepstakes vs a skill contest, no-purchase-necessary entry, official rules, platform promotion rules (Instagram, Facebook, X, TikTok, YouTube, Reddit), US state filing over $5,000, prize taxes, UK CAP Code, FTC disclosure, crypto and token prize cautions, and a verifiable winner draw script with an audit log. Use when someone wants to run a giveaway, contest, sweepstakes or prize draw, write official rules, pick a winner fairly, give away crypto, tokens or NFTs, or asks whether "follow, like and tag to win" is allowed.
license: MIT
metadata:
  title: "Giveaways and contests"
  category: "grow"
  summary: "Run legal, fair giveaways: free entry, official rules, platform rules, a verifiable draw, honest disclosure, no crypto traps."
  level: "intermediate"
  tags: "giveaways, contests, sweepstakes, official rules, no purchase necessary, winner selection, ftc, cap code, crypto"
  time: "2 h to set up, 1 h to draw and award"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Giveaways and contests

A good giveaway thanks an audience and brings in people who actually want the thing; a careless one is an illegal
lottery, a platform violation, or a magnet for scammers who copy it and DM the "winners". This skill runs the first
kind: a free entry route, written official rules, a mechanic every platform allows, a winner draw anyone can verify,
and disclosure in plain words. It treats crypto, token and NFT prizes as the special case they are.

Rules were checked on the platforms' policy pages, US statutes, the IRS, the FTC, the ASA/CAP Code and the FCA
("checked 2026-10"). This is a practical guide, not legal advice.

## When to use this

- A creator or AI character wants to run a giveaway for a milestone, launch or collab.
- A brand is supplying a prize and wants a creator to host it.
- Someone needs official rules, or asks whether "follow + like + tag 3 friends to win" is allowed.
- Picking a winner fairly and proving it afterwards.
- Someone wants to give away tokens, coins, NFTs or a crypto allocation.

Not for: entry by purchase, payment, token holding or wallet connection; "sub-for-sub" or loop giveaways built to farm
followers; fake giveaways; picking a friend; or awarding tokens for promotional actions.

## What you need

- A prize you own or a brand has committed to supply in writing, with its value.
- A legal promoter (the operator or their company) with a postal address. An AI character can host the posts but is
  never the promoter and never picks the winner.
- A stable URL for the official rules (your site or a pinned public document).
- Node ≥ 20 for [scripts/draw-winner.mjs](scripts/draw-winner.mjs) (no network, no dependencies).
- [references/legal-basics-us-uk-crypto.md](references/legal-basics-us-uk-crypto.md): read before steps 1–2.
- [references/platform-promotion-rules.md](references/platform-promotion-rules.md): read before step 3.

## Steps

1. **Choose draw or contest, never lottery.** A lottery is prize + chance + consideration. Remove consideration (free
   entry: a sweepstakes or prize draw) or remove chance (a judged skill contest with published criteria). Entry never
   requires a purchase, payment, paid subscription, token holding or wallet transaction; if any route involves a
   purchase, add an equally prominent free route with the same odds. Florida makes requiring "an entry fee, payment, or
   proof of purchase" unlawful, and the UK free-route test is "neither more expensive nor less convenient" (checked
   2026-10).

2. **Size the prize and the paperwork.** Over $5,000 in total prizes tied to a product or service triggers filing and a
   bond in New York (30 days before start) and Florida (7 days before), each with a $100 fee (checked 2026-10).
   Otherwise, exclude places you haven't checked. US prizes are taxable at fair market value; the 1099-MISC reporting
   threshold is $2,000 for tax years after 2025 (checked 2026-10). For tokens, NFTs or anything crypto, read the crypto
   section of [references/legal-basics-us-uk-crypto.md](references/legal-basics-us-uk-crypto.md) first: exclude the
   UK, never award your own token, never award tokens for promotional actions, and prefer a physical prize.

3. **Pick a mechanic every platform allows.** Safest everywhere: "comment once with your answer to <question>".
   Facebook now says a promotion "must not require or incentivize participants to share, repost, tag others"; Instagram
   bans encouraging inaccurate tagging; X asks you to rule out multiple accounts and "whoever Reposts this the most
   wins"; YouTube bans metric manipulation and entry through ad units; TikTok treats a giveaway of regulated goods as
   trade and bans "mystery value products" (all checked 2026-10). Details:
   [references/platform-promotion-rules.md](references/platform-promotion-rules.md). One entry per person.

4. **Write and publish the official rules.** Fill [templates/official-rules.md](templates/official-rules.md): promoter,
   platform release and "not sponsored, endorsed or administered by" line, eligibility (18+, places), start and closing
   date with time zone, how to enter including the free route, exact prize and value, selection method, notification
   and claim deadline, delivery within 30 days, privacy, and the winners list. The UK CAP Code requires a prominent
   closing date and award "normally within 30 days" (checked 2026-10). Link the rules from every post.

5. **Announce with every required line.** Use [templates/giveaway-announcement.md](templates/giveaway-announcement.md):
   prize, entry action, "No purchase necessary", eligibility, closing date, how the winner is picked, rules link,
   platform disclaimer, and who runs the AI character. A brand-supplied prize makes it an ad: `#ad` plus the platform's
   paid-partnership label. If entrants post about a brand to enter, their hashtag needs "contest" or "sweepstakes"; the
   FTC says "the word 'sweeps' probably isn't" enough (checked 2026-10). Pin the scam warning for the whole period.

6. **Export entries, remove the ineligible.** At close, export every entry (platform export, comments API read, or
   a manual screenshot-backed list), never by scrolling and picking. Remove duplicates, multiple accounts, under-18s,
   excluded places and staff, and write each removal reason in
   [templates/winner-selection-log.csv](templates/winner-selection-log.csv). The ASA upheld complaints where a creator
   couldn't show how entries were collated, and where a staff member scrolled comments to pick (checked 2026-10).

7. **Run a draw anyone can verify.** Announce the seed source before the close (for example a public randomness value
   published after the closing time). Then run:

   ```sh
   node scripts/draw-winner.mjs entries.csv --seed "<public seed>" --alternates 2
   node scripts/draw-winner.mjs entries.csv --seed "<public seed>" --json > draw-result.json
   ```

   It hashes each unique entry with the seed, picks the lowest score, prints the file's SHA-256 and the alternates.
   Have a person who isn't staff watch, as CAP 8.24 expects for prize draws. Judged contests use the published criteria
   and at least one independent judge (CAP 8.26).

8. **Notify, award and publish the result.** DM the winner only from the official account with the claim message (no
   payment, passwords, keys, wallet connections or signatures, ever). Unclaimed by the deadline goes to alternate 1.
   Post the winner announcement as a new post (the ASA found a reply buried in thousands of comments wasn't accessible),
   with the seed, file hash and method. Ship within 30 days, log it, and keep the log for at least a year.

A worked example (Claudia's signed-print giveaway on Instagram and X, from rules to draw output to delivery) is in
[examples/claudia-print-giveaway.md](examples/claudia-print-giveaway.md).

## Templates

- [templates/official-rules.md](templates/official-rules.md) — full official rules for a free draw or judged contest.
- [templates/giveaway-announcement.md](templates/giveaway-announcement.md) — announcement, reminder, winner post,
  winner DM, impersonator warning.
- [templates/winner-selection-log.csv](templates/winner-selection-log.csv) — the audit trail from export to delivery.
- [scripts/draw-winner.mjs](scripts/draw-winner.mjs) — verifiable seeded draw; exit `0` ok, `1` bad input.

Giveaway plan in one block:

```text
TYPE: <prize draw | judged contest> · PROMOTER: <legal name, address> · RULES URL: <link>
PRIZE: <exact> · VALUE: <amount> · SUPPLIED BY: <self | brand → #ad>
ELIGIBLE: 18+, <places> · EXCLUDED: <places, staff> · CRYPTO ELEMENT: <none | yes → UK excluded, lawyer reviewed>
ENTRY: <one action> · FREE ROUTE: <if needed> · LIMIT: one per person
OPEN: <date time tz> · CLOSE: <date time tz> · DRAW: <date> · SEED SOURCE: <announced before close>
PLATFORMS: <list> · DISCLAIMERS: <platform release lines> · APPROVED BY: <name>
```

## Check before you finish

- [ ] Entry is free: no purchase, payment, token holding, wallet connection or signature required anywhere.
- [ ] Official rules are published at a stable link and every post links to them.
- [ ] Each platform's mechanic rules are met (no tag/share requirement on Facebook, one entry, platform disclaimers).
- [ ] Eligibility is 18+ with named places; places with filing rules or crypto restrictions are handled or excluded.
- [ ] A brand-supplied prize is labelled `#ad` / paid partnership; entry hashtags include "contest" or "sweepstakes".
- [ ] Entries were exported, cleaned with reasons logged, and drawn with the script or judged by published criteria.
- [ ] The winner was contacted only from the official account, with no request for money or keys.
- [ ] The winner announcement is a new post with the method, seed and file hash; the prize ships within 30 days.
- [ ] A human approved every post; the AI character didn't pick the winner or DM entrants on its own.

## Pitfalls

- **"Follow, like, tag 3 friends and share to win."** Breaks Facebook's promotion rules, risks Instagram's tagging
  rule, and farms low-quality followers. Use one genuine action.
- **Picking by scrolling.** It's neither random nor provable, and the ASA has upheld complaints about exactly this.
- **No closing time zone.** "Ends Friday" starts arguments. Give date, time and zone.
- **Giving away tokens.** In the UK it can be an unlawful financial promotion with criminal penalties; in the US,
  tokens for promotional actions were treated as securities sales in an SEC case. Pick a physical prize.
- **Mystery prizes.** "A random amount of SOL" or a mystery box is a mystery value product on TikTok and gambling-like
  almost everywhere.
- **Forgetting the scammers.** Copycat accounts DM entrants asking for a "shipping fee" or a wallet connection. Pin the
  warning and say how you'll contact winners.
- **Auto-subscribing entrants to the newsletter.** Entering isn't consent to marketing. Offer the newsletter
  separately ([email-and-dm-sequences](../email-and-dm-sequences/SKILL.md)).
- **Agents running the giveaway.** An agent can draft posts; a human promoter runs the draw, approves posts and
  contacts the winner.

## Related skills

- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — FCA, MiCA and "Not financial advice" before any crypto angle.
- [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md) — when a brand supplies the prize.
- [launch-campaigns](../launch-campaigns/SKILL.md) — fitting a giveaway into a launch without making it the launch.
- [crisis-and-reputation](../crisis-and-reputation/SKILL.md) — impersonators and copycat giveaway scams.
- [collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md) — joint giveaways with another creator.
- [reddit-playbook](../reddit-playbook/SKILL.md) — moderator approval and Reddit's contest rules.
