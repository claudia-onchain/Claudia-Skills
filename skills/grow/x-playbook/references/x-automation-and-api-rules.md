# X automation rules and the API, for agents

Read this before connecting an agent to X, before turning on any inbox or reply automation, and whenever an X post is
blocked or an account gets a warning. Checked 2026-10.

## What X allows (automation rules, help.x.com/en/rules-and-policies/x-automation)

Allowed through the official API:
- Posting the account's own content, on a schedule, including AI-written posts and generated media.
- Threads, images, video, quote posts with your own commentary.
- Reading your own analytics; reading mentions (paid reads).
- Replying to people who @mention or quote the account.
- Sending DMs to people who asked for them (opted in), e.g. after they DM first.

Not allowed (gets accounts limited or suspended):
- Automated replies, mentions or DMs to people who didn't ask ("unsolicited").
- Bulk, duplicate or near-duplicate posts, including the same post across many accounts.
- Automated likes, reposts, follows, unfollows; follow/unfollow churn; "engagement farming".
- Posting about trending topics with unrelated content or hashtags to hijack them.
- Several accounts posting the same or coordinated content (for example a fleet of agents boosting each other).
- Scraping through unofficial means; using non-API browser automation to post.
- Undisclosed automated accounts; impersonation.

Labelling: fully automated accounts must carry the **Automated** label (Settings → Your account → Account information →
Automation), linked to the human or company account that runs it. A human who has AI draft posts and approves each one is
doing ordinary scheduling, but an AI *character* account should carry the label regardless, because the persona itself is
synthetic.

Enforcement in 2026: on 9 April 2026 X removed about 42,000 accounts for chatbot-automated replies, peaking near 208
suspensions per minute (opentweet.io, checked 2026-10). Since February 2026 the API only accepts replies to posts that
summon the account (mention or quote).

## The API on pay-per-use (docs.x.com, checked 2026-10)

Pay-per-use is the default for new developers since February 2026; Basic and Pro are closed to new sign-ups; the old free
tier is gone. Prices the Claudia package uses (`X_PRICES`, checked 8 Oct 2026):

| Action | Price |
|---|---|
| Create a post | $0.015 |
| Create a post that contains a link | $0.20 |
| Reply to a post that mentions you | $0.01 |
| Read a post (inbox, lookups) | $0.005 per post returned |
| Send a DM | $0.015 |
| Media upload | not on X's public list; watch the bill |

Each thread part is a post. The preview's `costUsd` totals this for you.

### App setup checklist

1. developer.x.com → project + app on pay-per-use, add a payment method, set a monthly spend limit in the portal.
2. User authentication settings → OAuth 2.0. "Native App" = public client (id only). "Web App, Automated App or Bot" =
   confidential (id + secret).
3. App permissions: Read and write. Add Direct message only if the agent will answer DMs.
4. Callback URL: `http://127.0.0.1:3939/oauth/callback` — exactly, with 127.0.0.1 (X rejects mismatches).
5. Store credentials under the key name `x`: `claudia keys set x` (accepts `clientId` or JSON with `clientId` and
   `clientSecret`).
6. Scopes the package requests: `tweet.read tweet.write users.read offline.access media.write dm.read dm.write`. Access tokens
   last 2 hours and refresh automatically with `offline.access`.

### Limits the package adds on top

| Rule | Value |
|---|---|
| Posts per account per 24 h | 10 (`rules.caps`) |
| Link posts per 24 h | 3 (`rules.linksPerDay`) |
| Near-duplicate window | 24 h |
| `$cashtags` per API post | 1 (X's rule) |
| Reply target | must mention or quote the account (checked from the inbox, else one $0.005 read) |
| Inbox reads | X default 0/day; set `inboxBudget.x.perDay` |
| AI label | X `made_with_ai` flag; warning if the Automated account label isn't set |

Raising `rules.caps` above 10 is possible but not advisable for a character account; X's spam systems care about patterns,
not your config.

## Error codes you will see

| code | Meaning on X | What to do |
|---|---|---|
| `blocked` | A rule refused it: promise, cap, duplicate, link limit, reply rule, kill switch | Read the reason; rewrite or wait |
| `needs_approval` | Tried to publish an unapproved post | Get a human approval |
| `rate_limited` | X said slow down | Wait `retryAfterMs`; the package doesn't retry posts itself |
| `over_budget` | HTTP 402: no credit on the developer account | Operator tops up; don't loop |
| `expired` | Token rejected | `claudia connect x` again |
| `uncertain: true` | Process died mid-send | Check the profile; then `publish(id, { retryUncertain: true })` only if it isn't live |

## Spaces, XChat and Articles with an AI character

- **Spaces:** live audio. Have the operator host. If the character's synthetic voice is played, say so at the start and in
  the Space title ("AI voice"). No pre-recorded audio passed off as live conversation.
- **XChat groups:** joinable links, up to 350 members (growing to 1,000). Treat like a community chat: rules pinned, no
  automated DMs to members.
- **Articles:** Premium; published in the app by the operator. Add an "AI-generated, reviewed by {name}" line at the top.

## Sources

- https://help.x.com/en/rules-and-policies/x-automation
- https://docs.x.com/x-api/posts/create-post
- https://postproxy.dev/blog/x-api-pricing-2026
- https://opentweet.io/x-automation-rules and https://opentweet.io/how-to/x-api-rules-for-ai-agents-2026
- @useclaudia/social README, sections "Setup per network → X", "Costs", "Rules and compliance" (checked 8 Oct 2026)
