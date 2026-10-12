---
name: affiliate-and-ambassador-programs
description: Sets up, runs or joins affiliate and ambassador programs for an AI creator or agent business — commission and terms design, tracking links and codes, fraud and self-referral rules, FTC and UK ASA disclosure next to every link, platform paid-partnership labels, the crypto restrictions (UK ban on refer-a-friend incentives, exchange referral links, TikTok and MiCA), payout schedules with refund holds, and human-approved payouts with caps. Use when someone wants to pay others a commission to promote their product, start an ambassador programme, join a brand's affiliate program, add affiliate links to posts, or check whether a referral offer is allowed.
license: MIT
metadata:
  title: "Affiliate and ambassador programs"
  category: "grow"
  summary: "Run or join commission and ambassador programs with clear terms, tracked links, disclosure on every link and safe payouts."
  level: "intermediate"
  tags: "affiliate marketing, ambassadors, referral links, commissions, disclosure, ftc, asa, payouts, tracking, crypto rules"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "2 h to set up, 30 min a week to run"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Affiliate and ambassador programs

An affiliate earns a commission when someone buys through their link; an ambassador is a longer, closer relationship,
usually with a fee, perks or a higher rate, and an expectation of regular posts. Both are advertising, both need
disclosure next to the link, and both go wrong when the terms are vague or the payouts are loose. This skill builds a
program someone else can join with confidence, or vets a program before an AI creator account joins one.

## When to use this

- An operator sells something (a digital product, a template, a service, a paid membership) and wants other creators to
  sell it on commission.
- Turning the best creators from a campaign ([influencer-outreach](../influencer-outreach/SKILL.md)) into ongoing
  ambassadors.
- An AI creator account is invited to an affiliate or ambassador program and the operator wants to know if it's worth
  joining and allowed.
- Adding affiliate links to posts, bios or newsletters and getting the disclosure right.
- A referral offer involves crypto, an exchange or a trading app.

One-off paid posts are sponsorships ([brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md)). Coin
creator rewards from the Claudia launchpad are not an affiliate program and are never marketed as income
([monetization-streams](../monetization-streams/SKILL.md)).

## What you need

- **Running a program:** a product with a clear price and refund policy, a way to attribute sales (your store's or
  payment processor's referral feature, an affiliate platform, or per-affiliate discount codes), a payout method, and
  a person who approves every payout.
- **Joining a program:** the program's terms (read in full), the commission and cookie window, the payout threshold and
  method, and the list of allowed and banned promotion methods.
- [references/disclosure-for-affiliates.md](references/disclosure-for-affiliates.md) (read before step 5) and
  [references/crypto-and-finance-rules.md](references/crypto-and-finance-rules.md) (read in step 1 if anything touches
  tokens, exchanges, trading apps or financial products).

## Steps

1. **Screen the product or program.** Before any terms, answer three questions:
   - **Is it allowed to promote?** Crypto: in the UK, refer-a-friend and new-joiner bonuses for qualifying cryptoassets
     are banned (FCA PS23/6), and an unauthorised influencer promoting regulated products may commit a criminal offence
     (FCA FG24/1, checked 2026-10). Exchange and trading-app referral links: don't. Coins: never through affiliates.
     Read [references/crypto-and-finance-rules.md](references/crypto-and-finance-rules.md).
   - **Would the audience thank you?** Promote only what the content actually features and the operator would use.
   - **Does the account qualify?** Some programs exclude AI-generated accounts or require a human face; read the terms
     and say up front that the account is an AI character run by a named person or company.

2. **Design the terms (running a program).** Fill [templates/program-terms.md](templates/program-terms.md). Decide:

   | Term | Typical choice | Why |
   |---|---|---|
   | Commission | % of net sale; digital goods and software usually pay 20–50% (benchmarks in [monetization-streams](../monetization-streams/references/direct-revenue-streams.md)) | Margin decides; pay enough to be worth a post |
   | Recurring | First 12 months of a subscription, not forever | Caps your long-term liability |
   | Attribution | Last click, 30-day cookie | Simple to explain and check |
   | Refund hold | Commission locks 30 days after sale (longer than your refund window) | No paying on refunded sales |
   | Payout threshold and timing | Monthly, net 15 after the hold, minimum $25–50 | Fewer tiny transfers |
   | Banned methods | Spam, mass DMs, fake reviews, bidding on your brand name, coupon sites, self-referral, link cloaking that hides the destination | Each one is a common fraud or rule break |
   | Disclosure | Required on every post, next to the link, plus the platform's paid-partnership label | You're responsible for monitoring |
   | Termination | Either side, with commissions on valid past sales paid | Clean exits |

   Ambassador tier (optional): a small monthly fee or product allowance, a higher commission, early access, in exchange
   for a set number of posts a month, a named point of contact, and an ambassador badge or "<Brand> Ambassador" in the
   bio. Write the post count and the disclosure rules into the agreement.

3. **Set up tracking.** One link per affiliate per platform, so you can see what works:

   ```text
   https://<your-domain>/<product>?ref=<affiliate-id>&utm_source=<platform>&utm_medium=affiliate&utm_campaign=<program>-<yyyy-mm>&utm_content=<affiliate-id>
   ```

   Or a unique discount code per affiliate (`RAE10`), which also works in video where links don't. Log every link and
   code in [templates/affiliate-ledger.csv](templates/affiliate-ledger.csv). Test each link once: it must land on the
   right page and record the referral. Never cloak a link so the viewer can't tell where it goes.

4. **Recruit, don't spam.** Invite people who already use or talk about the product, plus the top performers from past
   creator campaigns. One personal message each, sent or approved by a person (scripts in
   [influencer-outreach](../influencer-outreach/templates/outreach-messages.md)); a public "apply here" page is fine.
   Approve each applicant with the authenticity checks from
   [influencer-outreach](../influencer-outreach/references/authenticity-checks.md). Under-18s can't join.

5. **Give affiliates the disclosure kit.** Read [references/disclosure-for-affiliates.md](references/disclosure-for-affiliates.md),
   then send [templates/affiliate-kit.md](templates/affiliate-kit.md) with: approved claims, banned claims, the exact
   disclosure lines, which platform label to switch on, and image assets labelled as AI where they are. The rules that
   matter most (checked 2026-10):
   - The disclosure sits **next to the link** in the post or description, not only in the bio. US FTC: affiliate
     commissions are a material connection; "ad", "#ad", "sponsored", "affiliate link" are clear. UK ASA: affiliate
     links are ads; label "Ad"/`#ad` up front.
   - Amazon Associates requires the exact line "As an Amazon Associate I earn from qualifying purchases."
   - X counts affiliate commissions and ambassador deals as paid partnerships (Paid Partnership label);
     Instagram "Paid partnership"; TikTok "Disclose commercial content"; YouTube paid-promotion checkbox.
   - AI-made images or an AI character in the post still get their AI label.

6. **Post your own links with approval.** When joining a program: draft with `@useclaudia/social`, put the
   disclosure first, and set the ad label:

   ```ts
   import { createSocial, chainKeys, envKeys } from "@useclaudia/social";
   const social = createSocial({ keys: chainKeys(envKeys()) });
   await social.ready();
   const x = social.accounts().find((a) => a.network === "x");
   const post = social.draft({
     text: "Ad · affiliate link: the desk lamp in this scene is the Lumen Arc. I earn a commission if you buy through the link.",
     link: "https://example.com/arc?ref=claudia",
     media: [{ path: "./desk-arc.jpg", alt: "AI-generated image: Claudia at her desk under a white arc lamp." }],
     targets: [{ account: x.id }],
     labels: { ai: true, ad: true },   // ad: #ad + X paid-partnership flag; ai: native AI flag
   });
   console.log(social.preview(post.id));  // read labelsAdded, warnings, costUsd
   social.submit(post.id);                // a person approves, then social.approve(post.id)
   ```

   The CLI (`claudia post <network> "<text>" --link <url> --dry-run`) has no ad flag, so write "Ad ·" into the text
   yourself there. An AI character never claims to have used the product; describe what it is and how it appears in the
   scene. Link posts cost more through the X API and usually reach fewer people ([x-playbook](../x-playbook/SKILL.md));
   one affiliate link a day at most.

7. **Monitor monthly.** Once a month: open a sample of each active affiliate's posts and check disclosure; review
   conversions for fraud signals (orders from the affiliate's own payment details, many refunds, conversions with no
   clicks, traffic from coupon sites); remove anyone who skips disclosure after one warning. Record checks in the
   ledger's `last_checked` column.

8. **Pay out with a person and a cap.** At each payout date: lock commissions past the refund hold, export the ledger,
   and have a person approve the batch. Set a per-payout cap (for example $500 per affiliate per month) above which a
   second check is needed. If paying in stablecoins (USDC on Solana first, other chains only if the agreement names
   them), confirm each address by a second channel, send a small test first, and record the transaction signature and
   the fiat value. An agent may prepare the batch; it never sends money on its own.

9. **Review the program each quarter.** Cost per sale by affiliate, share of sales from the top three, refund rate on
   affiliate sales, disclosure compliance. Raise rates for the best, end the program for no-shows, and update the terms
   with 30 days' notice. Results go into [kpi-reporting](../kpi-reporting/SKILL.md).

## Templates

- [templates/program-terms.md](templates/program-terms.md) — affiliate terms plus the ambassador addendum.
- [templates/affiliate-kit.md](templates/affiliate-kit.md) — what affiliates receive: claims, disclosure lines per
  platform, link format, banned methods.
- [templates/affiliate-ledger.csv](templates/affiliate-ledger.csv) — affiliates, links, conversions, holds, payouts,
  checks.
- Worked example: [examples/wallpaper-pack-program.md](examples/wallpaper-pack-program.md) — Claudia's team runs an
  affiliate and ambassador program for a wallpaper pack, and declines an exchange's referral offer.

Disclosure line to paste beside any affiliate link:

```text
Ad · affiliate link: I earn a commission if you buy through this link. <AI label if the post has AI-made media>
```

## Check before you finish

- [ ] Nothing in the program promotes a coin, token, exchange or trading app; no crypto refer-a-friend bonuses.
- [ ] Terms state commission, attribution window, refund hold, payout threshold and timing, banned methods,
      disclosure duty and termination.
- [ ] Every affiliate has a unique tracked link or code that was tested.
- [ ] Affiliates got the disclosure kit; disclosure sits next to the link, plus the platform label and any AI label.
- [ ] Own affiliate posts went through preview and a person's approval, with `#ad` and no first-person use claims.
- [ ] Monthly disclosure and fraud checks are logged.
- [ ] Payouts were approved by a person, under the cap, after the refund hold; crypto payouts used verified addresses,
      a test transfer and recorded signatures.

## Pitfalls

- **Disclosure only in the bio.** It has to be where the link is. A "links may be affiliate" line on a profile page
  doesn't cover the post.
- **Paying before refunds settle.** Commission on a refunded sale is money you won't get back. Hold past the refund window.
- **Unlimited recurring commission.** Lifetime revenue share on subscriptions becomes a permanent cost. Cap it.
- **Self-referrals and coupon leaks.** Affiliates buying through their own links, or codes posted on coupon sites, eat
  margin without new customers. Ban both in the terms and check monthly.
- **Exchange referral links.** Sign-up bonuses for crypto are banned incentives in the UK and the links invite people
  to trade. Leave them out of every program and every post.
- **"I use this every day."** An AI character can't; a human affiliate must actually use it before saying so.
- **Agent-sent payouts.** Payment details change by social engineering more often than by mistake. A person approves
  every batch and verifies new addresses outside the chat.

## Related skills

- [influencer-outreach](../influencer-outreach/SKILL.md) — recruiting and vetting the creators first.
- [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md) — one-off paid posts and contracts.
- [monetization-streams](../monetization-streams/SKILL.md) — where affiliate income fits, and the income ledger.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — the full crypto promotion rules.
- [kpi-reporting](../kpi-reporting/SKILL.md) — program reporting.
- [wallet-and-key-security](../../build/wallet-and-key-security/SKILL.md) — safe stablecoin payouts.
