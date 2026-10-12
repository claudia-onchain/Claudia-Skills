---
name: memberships-and-subscriptions
description: Plans, launches and runs paid memberships for an AI creator or agent account — choosing between YouTube channel memberships, X Subscriptions, Patreon, Telegram Star subscriptions and paid posts, and Discord Server Subscriptions by eligibility, fees and audience; designing 1–3 tiers with perks an agent can reliably deliver; honest AI disclosure on the membership page and in perks; a perk calendar; and measuring and reducing churn. Use when someone wants recurring income from fans, asks which membership platform to use, is setting tiers and prices, needs members-only content delivered on schedule, or is losing members.
license: MIT
metadata:
  title: "Memberships and subscriptions"
  category: "grow"
  summary: "Pick the right membership platform, design tiers an agent can deliver, disclose AI honestly and keep members past month three."
  level: "intermediate"
  tags: "memberships, subscriptions, patreon, youtube memberships, x subscriptions, telegram stars, discord, tiers, churn, ai disclosure"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "2 h to plan, 1 h a week to run"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Memberships and subscriptions

A membership is a promise made every month: pay this, get that. For an AI creator the promise is easy to make and easy
to break, because an agent can draft perks forever but can't guarantee they're good, and members are paying partly for
the feeling of being close to someone. This skill picks the platform the audience will actually pay on, designs a small
set of tiers with perks that ship on a calendar, says plainly what is AI and who is behind it, and tracks churn so the
membership still exists in six months.

## When to use this

- An account has an engaged core (people who comment, reply and come back) and the operator wants recurring income.
- Choosing between YouTube, X, Patreon, Telegram and Discord for paid membership.
- Setting tiers, prices and perks, or writing the membership page.
- Members-only content needs to go out on schedule through an agent, with a person checking it.
- Members are leaving and nobody knows why.

Where memberships sit among other income: [monetization-streams](../monetization-streams/SKILL.md). Running the free
community that feeds a paid one: [telegram-and-discord-community](../telegram-and-discord-community/SKILL.md).

## What you need

- The account's numbers per platform: followers, median views, how many people comment or reply more than once a month
  (your likely members), top countries (some programs are country-limited).
- The legal account holder: an adult person or company in a supported country. Programs pay people and businesses, not
  an AI; the operator applies and the account stays labelled as AI.
- A person who checks every perk before it goes out and owns refunds and member messages.
- [references/platform-membership-rules.md](references/platform-membership-rules.md) (read in step 2) and
  [references/churn-playbook.md](references/churn-playbook.md) (read in step 8).

## Steps

1. **Check there's demand first.** Count people who engaged 3+ times in the last 30 days. A rough planning rule: a few
   percent of that core becomes paying members in the first months. Ask them directly with a one-question post ("If I
   did a members-only <thing> every week, would you pay <price> for it?") and count real yeses. Under 20 committed
   yeses: build the free community first.

2. **Choose one platform.** Read [references/platform-membership-rules.md](references/platform-membership-rules.md). The
   short version (checked 2026-10):

   | Platform | Gate | Creator share | Best when |
   |---|---|---|---|
   | YouTube channel memberships | 500 subscribers, 3 public uploads in 90 days, and 3,000 watch hours (365 days) or 3M Shorts views (90 days); 18+ | 70% of net revenue | the audience lives on YouTube |
   | X Subscriptions | Premium, 18+, ID verified, 2,000+ active Premium followers, 5M organic impressions in 3 months | up to ~97% until $50k lifetime, then up to 90%, after in-app purchase fees | a text-first audience on X |
   | Patreon | anyone 18+ | 90% minus processing (10% platform fee for pages published after 4 Aug 2025) | members from several platforms; paid tiers plus a no-cost join option |
   | Telegram Star subscriptions | any private channel | Stars, withdrawn via Fragment after 21 days | the community is already on Telegram |
   | Discord Server Subscriptions | US only; Community server, owner 18+, Stripe with US bank and ID | 90% minus processing | an active US Discord |

   Pick where the core already spends time. One platform done well beats three half-run.

3. **Design 1–3 tiers.** Fill [templates/membership-plan.md](templates/membership-plan.md). Rules:
   - **One clear perk per tier** that members can name ("a new Silver City diary episode every Friday") beats a list.
   - **Prices:** $3–10 a month is the common band for creator memberships
     ([monetization-streams](../monetization-streams/references/direct-revenue-streams.md)). Start with one tier at
     $4–6; add a higher tier only when members ask for more.
   - **Perks an agent can deliver reliably:** extra episodes, behind-the-scenes prompt breakdowns, early access,
     members-only polls that decide the next series, wallpaper or preset drops, a monthly live session hosted by the
     operator.
   - **Perks to avoid:** "personal" messages that read as human, anything random-chance (YouTube bans contests and
     lotteries as perks), in-person meetups for YouTube, financial "alpha", signals or trade calls (regulated in many
     countries; Discord bans monetizing financial asset transfers and securities), adult content, perks for minors.

4. **Write the membership page honestly.** Use [templates/membership-page-copy.md](templates/membership-page-copy.md).
   It says: the creator is an AI character; who runs it (named person or company); which perks are AI-generated and
   which are made or hosted by people; that a person reviews everything before it's posted; what members get, how often,
   and how to cancel. Platform AI labels still apply to members-only posts: YouTube's "AI use" disclosure for
   photorealistic content, and each network's AI flag (see
   [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md)). Patreon bans deceptive deepfakes
   and sexualised likenesses of real people (checked 2026-10).

5. **Set up the platform.** Follow the platform's own setup (Studio → Earn for YouTube; Monetization settings on X;
   Patreon creator setup; Telegram private channel → invite link → "Require Monthly Fee"; Discord Server Settings →
   Server Subscriptions). Then check three things before announcing: the price shows correctly on mobile, a test member
   (the operator) can join and see a perk, and cancelling works. Patreon creators on legacy iOS billing must move to
   subscription billing by 1 November 2026 (checked 2026-10).

6. **Schedule perks like content.** Fill [templates/perk-calendar.csv](templates/perk-calendar.csv) for 8 weeks before
   launch, with at least 3 weeks of perks finished. For a Telegram members channel, an agent can draft and a person
   approves each post:

   ```sh
   claudia connect telegram --token <bot-token> --chat <private-channel-id>   # bot added as admin of the members channel
   claudia post telegram "Members' diary, ep. 7: the cobalt studio, take 3. Full prompt breakdown below. (AI-generated)" \
     --media ./members/ep7-cover.jpg --dry-run
   ```

   Run it again without `--dry-run` after review; it previews and asks before posting. Keep the bot token in the key
   store, never in a file or chat. A person checks the calendar weekly: a missed perk is the fastest way to lose members.

7. **Launch to the core, not everyone.** Announce on the platform where members will pay, once, with the one perk and the
   price; pin it; mention it in the next 3–4 regular posts, not every post. No countdown pressure, no "only 10 spots" that
   isn't true. A launch offer (first month at a lower price, or an annual plan where the platform supports it) is fine
   if it's honest about what renews and at what price. Plan with [launch-campaigns](../launch-campaigns/SKILL.md).

8. **Track churn monthly.** Read [references/churn-playbook.md](references/churn-playbook.md) and fill
   [templates/membership-metrics.csv](templates/membership-metrics.csv) on the 1st:

   ```text
   monthly churn = members who cancelled during the month ÷ members at the start of the month
   net growth    = new members − cancelled members
   ```

   Read the exit reasons. Most churn comes in the first 60 days and from missed or weak perks. Fix the perk, not the
   price. Make cancelling as easy as joining; never hide it.

9. **Review quarterly.** Revenue after fees, hours spent, churn trend, which perk members mention most. Keep, change or
   close tiers; give members 30 days' notice of any price change or perk removal. If you close the membership, say so
   plainly, stop billing first, and deliver what was already paid for.

## Templates

- [templates/membership-plan.md](templates/membership-plan.md) — platform choice, tiers, perks, prices, delivery owner.
- [templates/membership-page-copy.md](templates/membership-page-copy.md) — the membership page with AI disclosure.
- [templates/perk-calendar.csv](templates/perk-calendar.csv) — 8-week perk schedule with draft, review and post dates.
- [templates/membership-metrics.csv](templates/membership-metrics.csv) — monthly members, churn, revenue after fees.
- Worked example: [examples/silver-city-members.md](examples/silver-city-members.md) — Claudia's members channel on
  Telegram, from demand check to the first churn review.

Tier block for any platform:

```text
<Tier name> · <price>/month
You get: <one main perk, how often>. Also: <up to two small extras>.
Made by: <AI-generated by <character>, reviewed by <person>> · Hosted by: <person, for live perks>
Cancel anytime in <where>.
```

## Check before you finish

- [ ] Demand was checked with real yeses before building anything.
- [ ] The platform choice matches where the core audience is, and the account meets its gate.
- [ ] 1–3 tiers, each with one named perk that has a delivery owner and a schedule; 3 weeks of perks ready at launch.
- [ ] The membership page says the creator is AI, who runs it, what's AI-made, and how to cancel.
- [ ] No perk is random-chance, financial advice, signals, adult, or implies a human relationship that isn't real.
- [ ] Members-only posts carry AI labels and go out after a person approves them.
- [ ] Join, perk access and cancel were tested by the operator before launch.
- [ ] Churn, exit reasons and revenue after fees are logged monthly.

## Pitfalls

- **Too many tiers too soon.** Five tiers with ten perks each means five promises to keep every month. Start with one.
- **Perks that depend on the agent being brilliant.** Schedule perks that are good on an average week.
- **"Chat with Claudia" as a paid perk** without saying the replies are AI-generated (and whether anyone reads them).
  That's a misleading impression, whatever the price.
- **Paywalling the best free content.** Free posts are how new members find you. Add members-only depth, don't remove
  the public value.
- **Ignoring app-store pricing.** On iOS, Apple's in-app fees apply to some platforms' memberships (Patreon: 30% on new
  in-app memberships, 15% after a year; Discord adds app-store fees to the member's price). Point members to web checkout
  where the platform allows.
- **Selling "alpha".** Paid signals or trade calls are regulated activity in many countries and banned by several
  platforms' monetization rules. An agent's chart education is fine; telling members what to buy is not.
- **Silent price rises.** Change prices with notice, and let existing members keep their price for a while if you can.

## Related skills

- [monetization-streams](../monetization-streams/SKILL.md) — where memberships fit in the revenue mix and the income ledger.
- [telegram-and-discord-community](../telegram-and-discord-community/SKILL.md) — running the community around the membership.
- [launch-campaigns](../launch-campaigns/SKILL.md) — launching the membership.
- [content-pillars-and-series](../../create/content-pillars-and-series/SKILL.md) — perks as a recurring series.
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — AI labels on members-only posts.
- [kpi-reporting](../kpi-reporting/SKILL.md) — churn and revenue in the monthly report.
