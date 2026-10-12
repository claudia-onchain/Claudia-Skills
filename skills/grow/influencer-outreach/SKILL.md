---
name: influencer-outreach
description: Finds, vets and contacts creators to promote a product, launch or agent from the brand side — defining the creator profile, building a shortlist by hand, authenticity checks (fake followers, bought views, engagement pods, audience geography), one-by-one personalised outreach with no mass DMs, offers and fair pay, a creator brief with disclosure built in, platform paid-partnership tools, and tracking each creator's results. Use when an operator wants creators to post about their product, app, agent or launch, needs to check whether a creator's audience is real, writes outreach to creators, or runs a seeding or paid creator campaign. Not for being the creator who gets paid (brand-deals-and-sponsorships) or unpaid content swaps (collabs-and-cross-promotion).
license: MIT
metadata:
  title: "Influencer outreach"
  category: "grow"
  summary: "Recruit real creators for a campaign: fit and fake-follower checks, personal outreach, a disclosed brief and per-creator tracking."
  level: "intermediate"
  tags: "influencer outreach, creator marketing, fake followers, vetting, seeding, creator brief, disclosure, utm, campaign tracking"
  uses: "@useclaudia/cli"
  time: "2–3 h to shortlist and pitch, 2–4 weeks to run"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Influencer outreach

This is the other side of a brand deal: you have something to promote and you want creators whose audiences would
actually care. The outcome is a short list of creators whose numbers survived an authenticity check, personal messages
sent one at a time by a person, a brief that builds in `#ad` and AI disclosure, and a tracker that shows which creators
brought real results, so the next campaign spends on the right people.

## When to use this

- An operator wants creators to post about a product, a Claudia Local template, an agent's service, a digital product
  or a launch.
- A creator has pitched you and you need to know whether their audience is real before paying.
- Planning a gifting (seeding) round or a small paid creator campaign.
- A campaign ran and nobody knows which creators were worth it.

Not this skill: you are the creator being paid (go to
[brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md)); an unpaid swap between two accounts (go to
[collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md), which also has the partner-fit score this skill
builds on); a standing commission programme (go to
[affiliate-and-ambassador-programs](../affiliate-and-ambassador-programs/SKILL.md)).

**Coins are out of scope.** Paying or gifting creators to promote a token is a crypto financial promotion in the UK and
marketing under MiCA in the EU, and in the UK an unauthorised influencer promoting it may commit a criminal offence (FCA
FG24/1; seven influencers were sentenced for unauthorised promotions in February 2026, checked 2026-10). Don't run
creator campaigns for a coin; see [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md).

## What you need

- One sentence on what you're promoting, who it's for, and the single action you want (install, sign-up, purchase,
  waitlist join).
- A budget split into creator fees, product or access for gifting, and a buffer for usage rights.
- A person who sends or approves every message and signs every agreement. An agent may research and draft; it never
  sends outreach, agrees terms or pays.
- Tracked links (UTM or per-creator codes); see
  [collabs-and-cross-promotion](../collabs-and-cross-promotion/references/tracking-and-utm.md) for the tagging scheme.
- [references/authenticity-checks.md](references/authenticity-checks.md) (read it in step 4) and
  [references/brand-side-disclosure.md](references/brand-side-disclosure.md) (read it before step 7).

## Steps

1. **Write the creator profile.** Before searching, fill the top block of
   [templates/creator-brief.md](templates/creator-brief.md): the audience (age band, countries, interests), the platforms
   where they watch, the content style that would carry the message, and hard exclusions (under-18 audiences, gambling,
   coin shilling, undisclosed ads, harassment history). If you can't name the audience, the campaign isn't ready.

2. **Build a long list by hand (30–50).** Sources that respect platform rules:
   - Creators your own customers already follow and mention; people already using your product without being paid.
   - Search by topic on each platform and read recent posts, not follower counts.
   - Platform marketplaces where creators opt in, such as TikTok One (it replaced TikTok Creator Marketplace in 2025,
     checked 2026-10).
   - For agent creators on Claudia: `claudia agents --q <topic>` and `claudia agent <slug>`.

   Log each in [templates/outreach-tracker.csv](templates/outreach-tracker.csv). No follower-list scraping, no tools that
   auto-follow or auto-DM: both break platform terms.

3. **Score fit and cut to 15.** Use the 100-point partner-fit score from
   [collabs-and-cross-promotion](../collabs-and-cross-promotion/references/partner-fit-scoring.md) with one change: replace
   "size ratio" with **cost per expected view** (quoted fee ÷ median views of their last 10 posts). Size the creator by
   median views, not followers. Mid-size and small creators with steady views usually beat one large account on cost and
   trust.

4. **Run the authenticity check on each.** Read [references/authenticity-checks.md](references/authenticity-checks.md)
   and fill [templates/creator-scorecard.csv](templates/creator-scorecard.csv). Ten minutes per creator:
   - Median views vs followers (on short video, views far below 2% of followers across 10 posts is a warning).
   - Follower growth: jumps with no viral post behind them.
   - Comments: read 30 across three posts. Generic praise, emoji walls, the same accounts within minutes on every post
     (an engagement pod), languages that don't match the audience.
   - Audience: ask for a screenshot of top countries, age bands and median views from native analytics. Real creators
     share it; refusing is an answer.
   - Ads history: do past sponsored posts carry `#ad` or the platform label?

   Any confirmed fake followers, bought views or pods, undisclosed ads, or coin shilling = drop. Under US law, buying or
   selling fake followers or views to misrepresent influence is banned (FTC rule 16 CFR 465.8, checked 2026-10); don't
   build a campaign on someone else's.

5. **Decide the offer.** One of three, written down before pitching:

   | Offer | When | Note |
   |---|---|---|
   | Gifted (product or access, no obligation to post) | first contact, small creators | still an ad if they post: `#ad` / "gifted" disclosure in the UK, material connection in the US |
   | Paid flat fee per deliverable | you need a date, a format and approval | price from median views; usage rights extra |
   | Fee + performance bonus | a clear tracked action exists | bonus on tracked sign-ups, never on views alone |

   Never ask a creator to hide the deal, fake a review, or claim results they didn't get. An AI character you hire can't
   claim personal use; a human creator must actually use what you send before saying they do.

6. **Write each message for one person.** Use [templates/outreach-messages.md](templates/outreach-messages.md). Every
   first message: who you are (and that your brand or spokesperson is an AI character if it is), one real post of theirs
   and why it fits, the offer in one line, the effort and dates, and an easy no. Send through their stated business
   channel (email in bio, business inbox). Pace: at most **10 new messages a day**, one follow-up after 5–7 days, then
   stop. A person sends each one. No mass DMs, no copy-paste blasts, no automated DMs: X bans unsolicited automated DMs,
   and Instagram and TikTok offer no API for cold outreach.

7. **Agree a written brief.** Fill [templates/creator-brief.md](templates/creator-brief.md) and get both sides to
   confirm it before anything is made. It sets: the key message and the claims you can substantiate, mandatory
   disclosure (see below), platform tools to switch on, dos and don'ts, draft review (one round, 48 h), posting window,
   usage rights and their end date, payment terms, and the takedown clause. Read
   [references/brand-side-disclosure.md](references/brand-side-disclosure.md) first: under the FTC Guides the brand is
   expected to tell creators to disclose and to monitor that they do.

   Required on every post: "Ad" or `#ad` at the start (UK ASA prefers "Ad"; the FTC accepts "ad", "sponsored",
   "#ad"; avoid "sp", "spon", "collab"), plus the platform's tool — Instagram "Paid partnership", TikTok "Disclose
   commercial content", YouTube's paid-promotion checkbox, X's "Paid Partnership" label (checked 2026-10). If your product
   or spokesperson is AI, the creator says so too.

8. **Review, post, and check the live post.** Review the draft against the brief (claims, disclosure, AI label). After it
   goes live, open it within 24 hours and confirm the disclosure is visible without tapping "more". If it's missing, ask
   for a fix the same day and log it. If you want to run the post as an ad, get the creator's permission through the
   platform (Meta partnership ads: the creator allows boosting or shares a partnership ad code; TikTok: Spark Ads code)
   and pay for usage separately; see [paid-social-ads](../paid-social-ads/SKILL.md).

9. **Track and close out per creator.** At day 7 and day 30, fill the tracker: views, tracked clicks, sign-ups or sales,
   cost per result, disclosure compliant (y/n), would-rehire (y/n). Pay on the agreed trigger. Rehire the top third,
   thank the rest, and drop anyone who skipped disclosure. Report the campaign with
   [kpi-reporting](../kpi-reporting/SKILL.md).

## Templates

- [templates/outreach-messages.md](templates/outreach-messages.md) — first message (email and business DM), gifted
  offer, paid offer, follow-up, reply to "what's your budget?", polite close.
- [templates/creator-brief.md](templates/creator-brief.md) — creator profile plus the brief both sides confirm.
- [templates/creator-scorecard.csv](templates/creator-scorecard.csv) — the authenticity check, one row per creator.
- [templates/outreach-tracker.csv](templates/outreach-tracker.csv) — long list to results, with cost per result.
- Worked example: [examples/studio-template-creator-round.md](examples/studio-template-creator-round.md) — Claudia's
  team recruits six creators for a Claudia Local template launch, drops two on authenticity checks, and tracks the rest.

Disclosure lines to put in the brief (pick the true one):

```text
Ad · Paid partnership with <brand>. <One true sentence about what the product does.>
Ad · <brand> sent me this for free. <What you actually did with it.>
Ad · Made with <brand>'s AI character <name>. The character is AI-generated; I'm a real person and was paid for this post.
```

## Check before you finish

- [ ] Every creator on the final list has a filled authenticity row and no confirmed fake followers, pods or undisclosed ads.
- [ ] Creators were sized by median views and audience data from their own analytics, not follower counts.
- [ ] Each message was written for one person and sent or approved by a person; ≤ 10 new a day, one follow-up.
- [ ] Nothing promotes a coin, a token sale or a trading app.
- [ ] The brief names the disclosure wording, the platform tool and the AI disclosure, and both sides confirmed it.
- [ ] Every live post was checked within 24 h for visible disclosure; fixes are logged.
- [ ] Usage rights and boosting were agreed in writing and paid separately.
- [ ] Day-7 and day-30 results are in the tracker with cost per result.

## Pitfalls

- **Follower-count shopping.** A big number with low median views is an expensive way to reach nobody.
- **Mass DMs.** The same message to 100 creators gets ignored, flagged as spam, and can restrict your account.
- **"Just post it naturally."** Asking for no `#ad` makes the brand liable too. Disclosure goes in the brief, not the
  creator's discretion.
- **Vague claims.** "Saves hours" needs evidence you can show. Give creators approved claims, not adjectives.
- **Paying for views alone.** Views are easy to inflate. Tie bonuses to tracked actions.
- **Forgetting the AI part.** If the product is an AI character or the visuals are AI-made, the creator's audience must
  be told. A human creator also needs to know before agreeing.
- **No end date on usage.** "We'll boost it a little" becomes a year of ads. Put an end date in the brief.

## Related skills

- [collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md) — partner-fit scoring and UTM tracking.
- [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md) — the creator's side of the same deal.
- [affiliate-and-ambassador-programs](../affiliate-and-ambassador-programs/SKILL.md) — turning good creators into a standing programme.
- [paid-social-ads](../paid-social-ads/SKILL.md) — running creator posts as partnership or Spark ads.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — why coins stay out of creator campaigns.
- [kpi-reporting](../kpi-reporting/SKILL.md) — the campaign report.
