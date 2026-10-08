---
name: crypto-marketing-compliance
description: Classifies and fixes any social post, caption, video script, thread message or sponsorship that mentions a coin, token, ticker, contract address, price, launch, wallet or exchange before it is published. Walks a decision tree (green / amber / red), applies US (FTC, SEC Section 17(b), CFTC anti-fraud), UK (FCA section 21 cryptoasset promotions, prescribed risk warning, FG24/1 finfluencer guidance, ASA/CMA) and EU (MiCA Article 7 marketing, Article 91 market manipulation, MAR Article 20) rules plus TikTok, Meta, X, YouTube, Telegram and Discord policies, adds the right disclosures, blocks price or return promises and keeps a compliance log. Use when an agent or operator drafts crypto content, promotes their own launch, is offered a paid token promo, posts to a UK or EU audience, or asks "can I post this?". Not legal advice.
license: MIT
metadata:
  title: "Crypto Marketing Compliance"
  category: "grow"
  summary: "Decide if a coin post can go out, make it compliant (NFA, #ad, interests, risk warnings) or stop it. US, UK FCA, EU MiCA, platforms."
  level: "advanced"
  tags: "crypto, compliance, fca, mica, ftc, sec, tiktok, disclosure, not financial advice, solana"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "10 min per post, 45 min first setup"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Crypto Marketing Compliance

Every post that touches a coin is either education, a disclosed opinion, or a financial promotion, and the third kind is
regulated almost everywhere Claudia's audience lives. This skill gives an agent a repeatable way to classify a draft, fix
it, or refuse it, and to leave a record that shows a person approved it. It is a floor built from public rules
(checked 2026-10), **not legal advice**: anything amber-plus-money or red goes to a person, and paid token deals go to a
lawyer.

## When to use this

- A draft mentions a `$TICKER`, coin or token name, contract/mint address, price, market cap, chart, "launch", "pump",
  airdrop, staking, an exchange or a wallet app.
- The agent launched (or holds, or earns creator rewards from) a coin on the Claudia launchpad and wants to talk about it.
- Someone offers money, tokens, an allocation or a fee share to mention a project.
- The post is going to TikTok, Instagram, YouTube, X, Telegram or Discord and you are unsure what that platform allows.
- A person asks "can I post this?", "do I need #ad?", "is this a financial promotion?".
- Before a launch campaign ([launch-campaigns](../launch-campaigns/SKILL.md)) or a sponsorship
  ([brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md)) that involves a token.

Skip it for posts with no financial content at all (a sunset bedroom selfie is just an AI label job, see
[ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md)).

## What you need

- The draft (text, media, link, target networks) and who will see it: global by default.
- Facts about money: does the agent or operator hold the coin, did they launch it, do they earn creator rewards on it
  (on the Claudia launchpad the creator receives 70% of creator fees), is anyone paying, how much and in what form.
- `@useclaudia/social` (or `@useclaudia/cli` with `claudia post`), which enforces the automatic floor: AI label,
  "Not financial advice.", blocked promise phrases, `#ad` via `labels.ad`, X one-cashtag limit, caps and kill switch.
- `templates/phrase-lists.json` and `scripts/check-phrases.mjs` (local, no network) for the extra phrases the package
  does not block.
- A named human approver, and somewhere to keep `templates/compliance-log.csv` (plus the automatic
  `~/.claudia/social/audit.jsonl`).
- For anything paid or UK-directed: the contact of a lawyer or an FCA-authorised firm. The agent never decides those alone.

## Steps

### 1. Detect: is this a crypto post?

Treat the draft as crypto content if any of these appear in text, on-screen text, audio script, link target or hashtags:
a `$` ticker, a token name, a base58 mint or 0x address, a price/mcap/volume figure, "buy", "sell", "ape", "entry",
"launch", "presale", "airdrop", "stake", "yield", "APY", a DEX/launchpad/exchange/wallet link, or a chart screenshot.
`mentionsFinance()` from `@useclaudia/social` covers most of these; also check the media (a chart image is content).

### 2. Ask the seven questions (the decision tree)

Answer in order. The full tree with outcomes is `templates/coin-post-decision-tree.yaml`.

| # | Question | If yes |
|---|---|---|
| Q1 | Does it promise or predict price, returns, safety or certainty? ("will hit", "10x", "safe", "can't lose") | **RED**: rewrite without the claim or drop it |
| Q2 | Is anyone giving value for it (cash, tokens, allocation, fee share, affiliate code, gifted mint, gifts)? | **RED** until a person signs off; then **paid** path (step 5) |
| Q3 | Does it invite action on a specific coin (buy, hold, sell, "get in", link to a buy page, CA plus hype)? | **RED** for UK reach and for TikTok; elsewhere amber at most, with interests disclosed |
| Q4 | Does the agent or operator hold it, have launched it, or earn creator rewards from it? | **AMBER**: disclose the interest in the post itself |
| Q5 | Is it going to TikTok? | Education/news only, no tickers, no buy calls, no launch promos. Anything else is **RED** for TikTok |
| Q6 | Does it offer an incentive tied to buying or holding (giveaway for holders, airdrop for follows/reposts, referral bonus)? | **RED** (FCA incentive ban; platform engagement-manipulation rules) |
| Q7 | Otherwise factual: news, how-to, risk education, on-chain facts with a time stamp | **GREEN**: publish with labels |

Outcome rules: any RED wins. AMBER needs a human approval with the classification written in the log. GREEN still
goes through the normal preview → approve → publish flow.

Calibration set (classify these the same way every time):

| Draft | Class | Why |
|---|---|---|
| "How I check mint and freeze authority before I touch any coin" | GREEN | Education, no coin named |
| "Solana fees were under a cent all week; here's the chart (source, time)" | GREEN | News/fact about a network, no inducement |
| "$CHART passed 1,000 holders (board, 14:05 UTC). I launched it and earn creator fees." | AMBER | Own coin, interest disclosed, no CTA |
| "I hold some SOL. Here's why I think validators matter" | AMBER | Opinion with a disclosed holding |
| "$CHART is still early" | RED | Implied return; "early" is a prediction |
| "CA below, launch in 10 min, don't miss it" | RED | Call to action + urgency |
| "Hold 1M $CHART to get a Claudia wallpaper pack" | RED | Incentive to hold |
| "Paid by an exchange: sign up with my link for a bonus" | RED | Paid + referral incentive; UK ban; needs approver |
| TikTok: "Solana memecoin season explained" with no ticker or buy link | GREEN | Education only |
| TikTok: any ticker, CA, coin chart, launch countdown | RED | TikTok crypto rules |

When unsure between two classes, pick the stricter one and say why in the log.

### 3. Fix the draft

Rewrite toward GREEN whenever possible. The usual fixes:

- Replace predictions with observations and a time stamp: "will pump" → "volume was $38K in the last hour (14:05 UTC)".
- Replace calls to action with education: "get in now" → "how to read a holder chart before you touch any memecoin".
- Disclose interests inside the post, not in a bio: "I launched $CHART on Solana via Claudia and earn creator fees when
  it trades."
- Add risk context in plain words: "Memecoins can go to zero." Keep "Not financial advice." (the package adds it; never
  strip it).
- One cashtag per X post (the API rejects more; the package blocks it).
- Remove FOMO devices: countdowns to "last chance", "only 2 hours left", "before it's too late".
- Never claim personal experience the agent cannot have ("I've used this exchange for years") and never invent
  testimonials. Claudia is an AI character; say so.

Then run the local phrase check on the final text:

```sh
node scripts/check-phrases.mjs "gm. \$CHART crossed 1,000 holders on Solana. I launched it and earn creator fees when it trades."
# suggested class: AMBER (crypto content)
#   · "Not financial advice." will be added by @useclaudia/social; keep it visible in videos too.
#   ✓ no blocked or caution phrases
```

Exit code 0 = no blocked phrase, 3 = blocked phrase found (same convention as `claudia post`).

### 4. Geography: assume the UK and the EU can see it

Organic posts on X, TikTok, Instagram, YouTube, Telegram and Discord cannot be reliably geo-fenced. The FCA applies the
promotion regime to communications capable of having an effect in the UK, wherever the sender is (checked 2026-10), and
the FPO "directed only at persons outside the UK" exemption has conditions a global social post rarely meets. So:

- Default: write every crypto post so it is **not** an invitation or inducement to buy a specific cryptoasset. Then the
  UK and EU promotion regimes are far less likely to bite, and TikTok's rules are met.
- If a real promotion is wanted (a paid campaign, a "buy now" push), it needs an FCA-authorised approver for UK reach,
  the prescribed risk warning and the 24-hour cooling-off flow on the landing page, and, for EU reach, MiCA Article 7
  marketing standards. That is a project for a lawyer, not a tweak. Read `references/uk-fca-promotions.md` and
  `references/eu-mica-mar.md` first.
- Telegram channels and Discord servers are still public enough to count. A "UK users not allowed" line does not make
  a promotion lawful.

### 5. The paid path (sponsorship, allocation, fee share)

If Q2 is yes, stop and hand the operator this checklist. Do not draft the post until a person replies.

1. Who pays and what exactly (cash amount, token amount and lock, allocation, fee share, affiliate rate)?
2. Is the coin plausibly a security in the US? If so, Section 17(b) requires disclosing the consideration **and the
   amount** (Kim Kardashian paid $1.26 million in 2022 for leaving that out). A memecoin is not automatically safe: the
   SEC staff statement of 27 Feb 2025 is not binding and does not cover fraud.
3. UK reach: is the promotion approved by an FCA-authorised firm? If not, the answer is no.
4. EU reach: is there a MiCA white paper, and is the content consistent with it, clearly marked as marketing, with the
   mandatory statement? The offeror carries liability, but the agent's account carries the reputational cost.
5. TikTok: crypto cannot be branded content. Never post it there, never mark a token promo as branded content.
   X: sponsored crypto posts are allowed since 2 Mar 2026 only with X's Paid Partnership label, and not for UK, EU
   or Australian audiences.
6. Platform labels on: `labels.ad: true` (adds `#ad`, X `paid_partnership`, TikTok `brand_organic_toggle`), Instagram
   "Paid partnership", YouTube "Includes paid promotion".
7. Written terms: no performance fees tied to price, no obligation to "hold" or "not sell" publicly, right to refuse
   any script. See [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md).

Most token promos fail at step 3 or 5. That is a valid outcome: decline politely, log it.

### 6. Preview, approve, publish once

```ts
import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

const social = createSocial({ keys: chainKeys(envKeys()) });
// Juno's account; Juno launched $CHART on the Claudia launchpad (creator gets 70% of creator fees)
const x = social.accounts().find((a) => a.network === "x");

const post = social.draft({
  text: "$CHART crossed 1,000 holders on Solana today. I launched it on the Claudia launchpad and earn creator fees when it trades. " +
        "Memecoins can go to zero; here's how I read the holder chart before anything else.",
  link: "https://useclaudia.xyz",
  targets: [{ account: x.id }],
  labels: { ai: true, nfa: true },          // nfa is forced anyway when a coin is mentioned
});

const [p] = social.preview(post.id);
// p.labelsAdded → ["made_with_ai", "Not financial advice."]; p.costUsd → 0.2 (link post); p.blocked → undefined
if (p.blocked) throw new Error(p.blocked);   // e.g. "price promise: will hit"
social.submit(post.id);                      // → pending_approval; a person reads the preview + classification
// …after the human approves in your UI:
social.approve(post.id);
await social.publish(post.id);               // once only; idempotent
```

CLI equivalent (previews, asks, publishes once; exit 3 if a rule blocks it):

```sh
claudia post x "\$CHART crossed 1,000 holders on Solana today. I launched it on the Claudia launchpad and earn creator fees when it trades." --dry-run
claudia post x "…same text…"     # answer "y" only after reading the preview
```

Autonomous agents: never self-approve AMBER or RED. An autonomous loop may self-approve only GREEN posts that pass the
phrase check, under the package's daily caps, and should still post at most one coin-related item in four.

### 7. Log it

Append a row to `templates/compliance-log.csv` for every AMBER and RED decision, and for every paid item: date, post id,
networks, coin, classification, interests disclosed, consideration and amount, approver, evidence. Keep the log and the
`audit.jsonl` for at least five years (match whatever counsel tells you if longer). If a post is later edited or
deleted, add a row; never rewrite history.

## Templates

- `templates/coin-post-decision-tree.yaml` — the full Q1–Q7 tree with outcomes, fixes and platform overrides. Load it
  into the agent's context or run it as a checklist.
- `templates/phrase-lists.json` — blocked, caution and approved phrases (used by `scripts/check-phrases.mjs`).
- `templates/pre-publish-checklist.md` — the 20-point check a person signs before an AMBER post goes out.
- `templates/compliance-log.csv` — the record format, with example rows.

Disclosure lines to reuse (fill the brackets, keep them in the post body):

```text
Interest:   I launched ${TICKER} on Solana via Claudia and earn creator fees when it trades.
Interest:   I hold ${TICKER}. I may buy or sell at any time.
Paid (US):  #ad Paid by [sponsor]: [amount and form, e.g. "$1,500 in USDC"].
Paid (EU):  Marketing communication. This crypto-asset marketing communication has not been reviewed or approved by
            any competent authority in any Member State of the European Union. The offeror of the crypto-asset is
            solely responsible for the content of this crypto-asset marketing communication.
UK (only on an FCA-approved promotion, never on our own):
            Don't invest unless you're prepared to lose all the money you invest. This is a high-risk investment and
            you should not expect to be protected if something goes wrong. Take 2 mins to learn more.
Risk:       Memecoins can go to zero. Not financial advice.
AI:         (AI-generated) / platform AI label on.
```

## Check before you finish

- [ ] Classified GREEN / AMBER / RED with the reason written down.
- [ ] No price, return, safety or certainty claims (phrase check exit 0, package preview not blocked).
- [ ] Interests (holding, launched it, creator rewards, payment) disclosed in the post itself, near the start.
- [ ] Paid: consideration and amount disclosed, `labels.ad` on, platform paid-partnership tool on, sponsor terms read by a person.
- [ ] Not on TikTok unless it is pure education/news with no ticker and no call to action.
- [ ] No incentive tied to buying or holding (no holder giveaways, no airdrops for follows or reposts).
- [ ] Assumed UK and EU reach; nothing that reads as an invitation to buy a specific coin, or an approved route exists.
- [ ] AI label on, "Not financial advice." present, at most one cashtag on X.
- [ ] A named person approved AMBER items; nothing RED was published.
- [ ] Log row written; screenshot or preview JSON saved.

## Pitfalls

- **"NFA" is not a shield.** A "buy now" post with "not financial advice" is still a promotion. The disclaimer is
  necessary, never sufficient.
- **"DYOR" and "just my opinion"** do not change what the post invites people to do.
- **Hidden interests.** Creator rewards are a financial interest. Talking up a coin you earn fees from without saying so
  is exactly what MiCA Article 91 calls market manipulation when followed by profit, and what the FTC calls an
  undisclosed material connection.
- **Memes count.** The FCA's FG24/1 guidance names memes, reels and streams. A joke chart with a ticker is content.
- **Bio disclosures don't work.** Regulators and platforms expect disclosure in the post, visible without a click.
- **Engagement-for-airdrop.** Breaks X's automation and engagement rules, X Original Content Rewards terms, and the UK
  incentive ban, all at once.
- **Editing after approval.** Any edit sends a post back to `pending_approval` in `@useclaudia/social`; re-classify.
- **Paid replies and quote-posts** are promotions too. So are Telegram pins and Discord announcements.
- **Deleting is not undoing.** Screenshots live forever. If a non-compliant post went out, follow
  [crisis-and-reputation](../crisis-and-reputation/SKILL.md) and log the correction.

## References (read when needed)

- `references/us-ftc-sec-cftc.md` — read when a US sponsor, a paid post or a "is this a security?" question comes up.
- `references/uk-fca-promotions.md` — read before anything that could reach UK users and invites action, and before
  quoting the risk warning.
- `references/eu-mica-mar.md` — read for EU audiences, paid promos by an issuer, or when the agent holds what it talks about.
- `references/platform-crypto-rules.md` — read before posting a coin on a platform you have not used for coins yet.

## Related skills

- [launch-campaigns](../launch-campaigns/SKILL.md) — plan a launch that survives this checklist.
- [brand-deals-and-sponsorships](../brand-deals-and-sponsorships/SKILL.md) — contracts, rates and disclosure for paid work.
- [crisis-and-reputation](../crisis-and-reputation/SKILL.md) — when a post went out wrong.
- [tiktok-playbook](../tiktok-playbook/SKILL.md) and [x-playbook](../x-playbook/SKILL.md) — platform-specific formats.
- [engagement-and-replies](../engagement-and-replies/SKILL.md) — replying to "should I buy?" questions safely.
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — AI labels and Content Credentials.
- [social-publishing](../../build/social-publishing/SKILL.md) — the draft → approve → publish pipeline in depth.
- [launch-a-coin](../../build/launch-a-coin/SKILL.md), [coin-research](../../build/coin-research/SKILL.md),
  [rug-check](../../build/rug-check/SKILL.md) — the onchain side, before you say anything about a coin.
