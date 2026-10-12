---
name: newsletter-growth
description: Grows an email newsletter for a creator or AI character on beehiiv, Substack, Kit or similar — one clear promise, a lead magnet, sign-up placement across social profiles and shorts, recommendations and cross-promotion swaps, reader referral programs, paid recommendations, deliverability basics (SPF, DKIM, DMARC, complaint rates), and the weekly metrics that matter (net growth, source mix, click rate, not opens). Use when someone wants more newsletter subscribers, is choosing a newsletter platform, wants a referral program or newsletter swap, sees growth stall or emails landing in spam, or asks how to turn social followers into an owned email list.
license: MIT
metadata:
  title: "Newsletter growth"
  category: "grow"
  summary: "Grow an owned email list: a clear promise, a lead magnet, recommendations, swaps, referrals, clean deliverability, honest metrics."
  level: "intermediate"
  tags: "newsletter, email list, beehiiv, substack, kit, lead magnet, referrals, recommendations, deliverability, growth"
  time: "3 h setup, 1 h a week"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Newsletter growth

Followers belong to a platform; subscribers belong to you. This skill grows a newsletter the durable way: a promise
specific enough to sign up for, one lead magnet that proves it, sign-up links wherever the audience already is,
recommendations and swaps with newsletters your readers would like, a referral program once there's something worth
sharing, and clean sending so the mail actually arrives. It measures net growth by source and clicks, not vanity
opens, and it never buys lists or adds anyone who didn't ask.

Platform facts were checked on beehiiv, Substack and Kit's own pages and the inbox providers' sender rules ("checked
2026-10"). Plans and feature names change; re-check [references/platform-growth-features.md](references/platform-growth-features.md)
before committing.

## When to use this

- Starting a newsletter for a creator, AI character or agent project, and choosing a platform.
- A list is stuck: a handful of sign-ups a week, mostly from one source.
- Planning a lead magnet, a newsletter swap, or a referral program.
- Click rates dropping or readers saying issues land in spam.
- Turning social reach (shorts, X, Reddit, a Telegram channel) into subscribers you can reach directly.

Not for: buying or renting lists, scraping addresses, importing followers or contacts who didn't opt in, giveaway
entries that silently subscribe people, or "sub-for-sub" schemes. They get accounts suspended and wreck deliverability.

## What you need

- A newsletter platform account (beehiiv, Substack, Kit or similar) with double opt-in on, sending from your own
  domain.
- The newsletter's topic and the reader you write for (see [audience-research-and-personas](../audience-research-and-personas/SKILL.md)).
- At least 3 published issues, so new readers find an archive. Writing the issues: [newsletter-writing](../../create/newsletter-writing/SKILL.md).
- The welcome sequence from [email-and-dm-sequences](../email-and-dm-sequences/SKILL.md); growth without a welcome
  leaks.
- [templates/lead-magnet-brief.md](templates/lead-magnet-brief.md), [templates/cross-promo-swap.md](templates/cross-promo-swap.md),
  [templates/growth-dashboard.csv](templates/growth-dashboard.csv).
- References: [references/platform-growth-features.md](references/platform-growth-features.md) (read in steps 2, 5 and 6)
  and [references/deliverability-basics.md](references/deliverability-basics.md) (read in step 3).

## Steps

1. **Write the one-line promise.** Who it's for, what they get, how often: "Every Thursday: one behind-the-scenes look
   at how an AI character's shorts get made, and one tool you can use." If the promise could describe a hundred other
   newsletters, narrow it. Put it, unchanged, on the sign-up page, in every profile link and at the top of issue one.
   An AI character's newsletter says so on the sign-up page: "written with AI, reviewed by <name>".

2. **Pick the platform for the growth tools.** Read [references/platform-growth-features.md](references/platform-growth-features.md).
   Short version (checked 2026-10): Substack has Recommendations and Notes, and takes 10% of paid subscription revenue;
   beehiiv has a $0 plan up to 2,500 subscribers, reader referrals on all paid plans, and paid recommendations (formerly
   Boosts) on Lite and Pro; Kit has a $0 plan up to 10,000 subscribers with its referral system on Pro. Choose for the
   next 12 months; referral counts and recommendation ties don't migrate cleanly.

3. **Set up clean sending before growth.** Read [references/deliverability-basics.md](references/deliverability-basics.md).
   Custom sending domain with SPF, DKIM and DMARC (`p=none` to start), double opt-in, one-click unsubscribe, a postal
   address in the footer, and captcha on the form against bot sign-ups. Gmail's bulk-sender limit for spam complaints
   is 0.30% and it recommends under 0.10% (checked 2026-10); a list grown from vague promises blows through that.

4. **Build one lead magnet.** Fill in [templates/lead-magnet-brief.md](templates/lead-magnet-brief.md): one specific
   problem, consumable in 5–15 minutes (a checklist, template pack, prompt pack or 5-day email course), delivered by
   welcome email 1. The form says the newsletter comes with it: "Get the pack and a weekly email about <topic>.
   Unsubscribe anytime." No pre-ticked boxes, no hidden subscriptions. Label it if AI made it.

5. **Put the sign-up everywhere you post.** Bio link on every profile pointing to the magnet page; a pinned post; the
   last line of each short's caption once a week (not every post); the end of every thread and Reddit write-up where
   links are allowed ([reddit-playbook](../reddit-playbook/SKILL.md)); a Telegram channel pin; a "subscribe" end card on
   long videos. Tag every link with UTMs (`utm_source=<platform>&utm_medium=social&utm_campaign=<magnet>`) so the
   dashboard shows which source works.

6. **Grow through other newsletters.** Turn on recommendations and recommend 3–5 newsletters you actually read; many
   recommend back. Then pitch one swap a month with [templates/cross-promo-swap.md](templates/cross-promo-swap.md):
   similar readers, different angle, each side approves its own blurb, no list sharing ever. Paid recommendations
   (pay per confirmed subscriber) are worth testing only once welcome-email clicks show new readers stick. Label
   paid placements "Sponsored" or "Ad" ([collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md)).

7. **Add referrals once readers love it.** Start a referral program when click rate holds above your platform's average
   for a month, not before. Rewards that cost little and fit the promise: a bonus issue or template pack at 3
   referrals, a monthly live Q&A at 10, a printed zine or merch at 25. Say what counts (confirmed sign-ups only),
   never reward fake sign-ups, and don't turn it into a prize draw without
   [giveaways-and-contests](../giveaways-and-contests/SKILL.md) rules.

8. **Track the dashboard every week.** Fill one row of [templates/growth-dashboard.csv](templates/growth-dashboard.csv)
   per week: new, unsubscribed, cleaned, net growth %, sign-ups by source, click rate, replies, complaint rate,
   landing-page conversion. Healthy signs: net growth positive every week, no single source above about 60%, complaints
   under 0.1%, unsubscribes per issue under about 1%. Opens are unreliable because Apple Mail's privacy protection
   loads content in the background; report clicks.

9. **Clean the list and run one experiment.** Each quarter, run the re-engagement series from
   [email-and-dm-sequences](../email-and-dm-sequences/SKILL.md) and remove people who don't click: a smaller list that
   reads beats a bigger one that lands in spam. Each month, test one change (magnet title, sign-up placement, swap
   partner type) with a clear success number ([growth-experiments](../growth-experiments/SKILL.md)).

A worked example (Mara Vex, a fictional AI character, from 0 to 1,900 subscribers in 12 weeks with the source mix and
what didn't work) is in [examples/mara-vex-first-12-weeks.md](examples/mara-vex-first-12-weeks.md).

## Templates

- [templates/lead-magnet-brief.md](templates/lead-magnet-brief.md) — the magnet brief, landing-page copy skeleton and
  "do not" list.
- [templates/cross-promo-swap.md](templates/cross-promo-swap.md) — partner shortlist, pitch, written agreement,
  recommendation copy.
- [templates/growth-dashboard.csv](templates/growth-dashboard.csv) — one row a week: sources, net growth, clicks,
  complaints.

Weekly growth note, in one block:

```text
WEEK OF: <date> · NET: <+n> (<x>%) · TOTAL: <n>
TOP SOURCE: <source> <n> · SECOND: <source> <n> · SHARE OF TOP SOURCE: <x>%
CLICK RATE: <x>% · REPLIES: <n> · COMPLAINTS: <x>% · UNSUBS/ISSUE: <x>%
WHAT CHANGED: <one line>
NEXT WEEK'S ONE TEST: <change> · SUCCESS IF: <number>
```

## Check before you finish

- [ ] The promise is one sentence and appears on the sign-up page, profiles and issue one.
- [ ] Double opt-in is on; nobody was imported, bought, scraped or added from DMs or giveaway entries without consent.
- [ ] SPF, DKIM and DMARC pass; the footer has a postal address and one-click unsubscribe.
- [ ] The lead magnet is delivered by welcome email 1 and the form says the newsletter comes with it.
- [ ] Every sign-up link carries UTMs and the dashboard shows sources.
- [ ] Swaps were approved in writing by both sides and paid placements are labelled.
- [ ] AI-made issues and magnets say so; no income, follower or return promises anywhere.
- [ ] The dashboard has this week's row, with clicks and complaints, not just opens.

## Pitfalls

- **Growing before welcoming.** Without a welcome sequence, new subscribers forget why they joined and mark the second
  email as spam.
- **One source.** A list fed only by one platform's algorithm stalls when the algorithm shifts. Aim for three sources.
- **Magnets that attract the wrong readers.** A broad "ultimate guide" pulls people who never read the newsletter. Keep
  the magnet a small version of the promise.
- **Referral rewards worth gaming.** Cash, tokens or high-value prizes draw fake sign-ups. Reward with things only real
  readers want.
- **Giveaway lists.** "Enter to win" sign-ups unsubscribe or complain in bulk. If you run a giveaway, the newsletter is
  optional and separate.
- **Chasing open rate.** It overcounts and moves for reasons you don't control. Clicks and replies tell you more.
- **Never cleaning.** Inactive addresses drag deliverability down and cost money on per-subscriber plans.
- **Sub-for-sub and list sharing.** Swapping recommendations is fine; swapping addresses is not.

## Related skills

- [email-and-dm-sequences](../email-and-dm-sequences/SKILL.md) — welcome, launch and re-engagement sequences, consent law.
- [newsletter-writing](../../create/newsletter-writing/SKILL.md) — writing the issues people stay for.
- [collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md) — partner selection and fair swaps.
- [reddit-playbook](../reddit-playbook/SKILL.md) — a strong source of first readers, done honestly.
- [growth-experiments](../growth-experiments/SKILL.md) — testing one change at a time.
- [kpi-reporting](../kpi-reporting/SKILL.md) — rolling the dashboard into a monthly report.
