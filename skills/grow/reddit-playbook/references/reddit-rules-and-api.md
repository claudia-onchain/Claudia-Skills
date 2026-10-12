# Reddit rules, AI disclosure and the API, for AI characters and agents

Read this before the first post from any account tied to an AI character, before anyone suggests a Reddit bot, and
whenever a post is removed or an account is flagged. Every fact here was read on Reddit's own pages
(redditinc.com/policies and support.reddithelp.com), checked 2026-10. Reddit changes these pages often; re-check the
changelog (support.reddithelp.com, search "Changelog") every quarter.

## The sitewide rules that matter most

Reddit has 8 sitewide rules (redditinc.com/policies/reddit-rules). Three decide whether an AI character survives there:

| Rule | Wording (short) | What it means for you |
|---|---|---|
| 2 | "Abide by community rules. Participate authentically in communities where you have a personal interest, and do not spam or engage in disruptive behaviors (including content manipulation)" | Each subreddit's rules come first. Join communities you actually care about. |
| 5 | "Be authentic. … do not intentionally mislead others or impersonate an individual or entity in a deceptive manner." | Never let readers think the character is a real person. |
| 8 | "Don't break the site or do anything that interferes with normal use of Reddit." | Covers bots, AI agents and non-human operated accounts (see below). |

### Impersonation and AI personas

The impersonation article prohibits "Posing as an individual or organization that does not exist in order to make
others believe they are engaging with a real entity." An AI character is fine; an AI character presented as a real
human is not. Put "AI character" in the display name or bio and disclose in posts.

### AI-generated content

The "Manipulated Content and Misleading Behavior" article says AI content is "generally allowed", subject to each
community's rules, but is prohibited when it "deliberately misleads" or "presents itself as human-generated". Reddit asks
you to "be transparent and include a tag (or other form of indication) disclosing that the content was generated or
modified by AI." Many subreddits go further and ban AI images or AI-written posts outright: read the rules of each one.

### Spam

Reddit's spam article defines spam as "repeated or unsolicited actions (whether automated or manual)". It lists, among
others, "Using tools (e.g., bots, generative AI tools) that may break Reddit or facilitate the proliferation of spam" and
"Programming a bot that continuously promotes specific products or services." On self-promotion it says: if your
contributions "consist primarily of links to a business that you run, own, or otherwise benefit from, please be
thoughtful about the frequency of posting, or consider advertising".

Since October 2026 Reddit is testing a 12-hour pause for accounts that post similar content to too many communities
(Changelog, 8 October 2026). Since September 2026 unverified accounts are left out of recommendations, and content
removed from automated spam accounts can be shown as a Rule 8 violation (Changelog, 10 September 2026).

## The 10% rule today

The "10% rule" (no more than 10% of your activity self-promotional, the other 90% helpful) is **not a sitewide rule**.
Reddit's moderator help article "How do I keep spam out of my community?" says promotional content "is not inherently
considered to be spam" and that "Other communities abide by the 10% rule: only 10% of your posting and comment history
in the community can be self-promotional … the other 90% should be helpful, organic content … It is ultimately up to you
and your team to decide." So:

- Treat 10% as the ceiling everywhere, because it is the most common community standard and it keeps you out of spam
  filters.
- Count it **per community**, not across Reddit.
- Where a subreddit sets something stricter (no self-promotion, a weekly thread only, mod approval first), that wins.

## Bots, AI agents and accounts that are not human

The "Don't break the site" article (Rule 8) covers "bots, AI agents, and non-human operated accounts". It bans apps that
"Mask as a human or fail to register as an app", that "Use automation for unsolicited outreach (e.g., unprompted DMs or
Chat requests)", "Creating accounts through automated or agentic means", and "Scraping Reddit … without an authorized
agreement".

The **Responsible Builder Policy** (support.reddithelp.com, article 42728983564564) adds:

- "Approval is required: You must request access and get explicit approval before accessing any Reddit data through our
  API."
- Apps, including bots and AI agents, "must register and create a developer profile to get an App profile label."
- No mixed-use accounts: a bot account is not also someone's personal account.
- A bot needs "explicit consent" from a user before private messaging them.
- No vote or karma manipulation; no "identical or substantially similar content across subreddits."
- Commercial use of Reddit data, or using it to "train machine learning or AI models", needs express written approval.

Registered apps show an **"App"** label (API bots) or **"Developer Platform App"** label (checked 2026-10; first labels
appeared 31 March 2026). Accounts Reddit flags as automated must confirm they are human with a passkey; if they don't
within 7 days they are labelled an app and may be restricted from posting.

### The public Data API is closing (checked 2026-10)

Reddit's changelog of 8 October 2026 says the public Data API is being replaced by the Developer Platform (Devvit):

| Date | What happens |
|---|---|
| 31 October 2026 | New public API access requests are no longer accepted |
| 12 January 2027 | Reddit begins removing access for apps that haven't registered |
| March 2027 | Remaining public API access ends |

For an AI character this settles it: plan for **manual posting by the human operator**. `@useclaudia/social` has no
Reddit connector for the same reasons (it lists Reddit as "manual API approval, bots banned in most crypto subreddits").

### Data API rules, while it lasts (Reddit Data API Wiki, checked 2026-10)

- OAuth required. Rate limit 100 queries per minute per OAuth client id, averaged over 10 minutes.
- User-Agent: `<platform>:<app ID>:<version string> (by /u/<username>)`. "NEVER lie about your User-Agent."
- Delete content your app stored when it is deleted on Reddit (Reddit recommends within 48 hours).
- "You may not use content on Reddit as an input for any model training without explicit consent from Reddit."
- Pricing: the terms say Reddit "reserves the right to charge fees" and that commercial use needs a separate agreement.
  No public per-call price was confirmed on an official page, so none is given here.

## Moderators

- Moderator Code of Conduct (in force since 5 June 2025): brand communities must be marked "official" or "unofficial";
  mods may not take moderator actions for payment, including paid pins or "ad space". Never offer a mod money, products,
  tokens or allocations to allow a post. It puts them in breach and you on a spam list.
- Minimum account age and karma are **set per community** with AutoModerator (for example `account_age: < 1 day` or
  `comment_karma: < 5`). Mods can also use the Reputation filter (based on Reddit's Contributor Quality Score). There is
  no sitewide minimum to "unlock": if a post vanishes, read the AutoModerator reply or ask the mods.

## Disclosure of paid or incentivised posts

Reddit's **Brand Affiliate** tag lets you mark a post or comment as "incentivized or having commercial intent"; you stay
responsible for any legally required disclosure (FTC, ASA) as well. Use the tag and a plain-words line ("Ad: <brand>
paid for this post") together.

## Contests and giveaways on Reddit

Reddit's help article on contests asks for clear official rules, a statement that the promotion is not sponsored by or
associated with Reddit, no targeting of minors, and no lotteries without Reddit's permission. Get moderator approval
first; most subreddits ban giveaways. See [giveaways-and-contests](../../giveaways-and-contests/SKILL.md).

## Earning on Reddit

- **Contributor Program:** 18+, account at least 30 days old, a supported country, at least $10 of award earnings plus
  100 karma in the last 12 months. Contributors (100–4,999 karma) earn $0.009 per gold; Top Contributors (5,000+ karma)
  $0.01 per gold. Minimum payout $10, through Stripe, 30–45 days after the month closes, with identity checks (checked
  2026-10). The Earn Policy excludes "Deceptive money/crypto-making services".
- **Reddit Pro:** a business toolkit (beta) for SFW accounts with a verified email that self-identify as a business. Reddit
  says it is "not a paid advertising tool or a replacement for Reddit Ads." Verified business profiles (grey checkmark)
  are in public beta there; the checkmark "doesn't affect … feed ranking."
- **Promote your own post:** SFW profile or community posts can be turned into ads with the rocket icon. That is the
  sanctioned way to buy reach.

## Not verified, so not used in this skill

- The current status of reddit.com/wiki/selfpromotion (the page needs a login).
- Reddit's advertising policy for crypto and for AI disclosure in ads (business.reddithelp.com could not be read).
- Any per-call API price.

## Sources (checked 2026-10)

- https://redditinc.com/policies/reddit-rules
- https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam
- https://support.reddithelp.com/hc/en-us/articles/360043075032-Impersonation
- https://support.reddithelp.com/hc/en-us/articles/41180423371156-Manipulated-Content-and-Misleading-Behavior
- https://support.reddithelp.com/hc/en-us/articles/360043512931-Don-t-break-the-site
- https://support.reddithelp.com/hc/en-us/articles/28012014962580-How-do-I-keep-spam-out-of-my-community
- https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy
- https://support.reddithelp.com/hc/en-us/articles/45376380316052-Apps-on-Reddit-and-how-to-get-a-label-for-your-app
- https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki
- https://support.reddithelp.com/hc/en-us/articles/54353370049684 (Changelog, 8 October 2026)
- https://support.reddithelp.com/hc/en-us/articles/23972085214484 (Brand Affiliate tag)
- https://support.reddithelp.com/hc/en-us/articles/22755369815700 (contests)
- https://support.reddithelp.com/hc/en-us/articles/17331620007572 (Contributor Program)
- https://redditinc.com/policies/moderator-code-of-conduct
- https://redditinc.com/policies/developer-terms · https://redditinc.com/policies/data-api-terms
