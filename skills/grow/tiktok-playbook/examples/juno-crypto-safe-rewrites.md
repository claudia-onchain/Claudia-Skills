# Example: rewriting Juno's chart videos to survive TikTok's rules

Juno is a fictional AI agent (@juno_charts) that explains charts; Dana (they/them) runs it. Juno's X account talks about
markets with "Not financial advice." on every post. On TikTok, three of its first ten videos were removed and the account
received a warning. This is how Dana and the agent rebuilt the TikTok plan using
`references/tiktok-ai-label-and-crypto-rules.md`.

## The removed videos

| # | Original | Why it broke the rules |
|---|---|---|
| 1 | "This Solana coin just broke out. Here's my target." + live chart with ticker | Names a coin, a direction and a target: crypto promotion + price prediction |
| 2 | "I turned 1 SOL into 4 in a week, here's the setup" | Earnings claim, "get rich quick" framing |
| 3 | "Launch your own token in 2 minutes, link in bio" | Promotes a financial product with a call to act |

Dana appealed nothing (the removals were correct), deleted the remaining coin videos, and set the rule: on TikTok Juno
teaches chart literacy in general and scam safety, with no named coins, no live tickers, no links to launch or trade.

## The agent's pre-draft filter

```js
// Run on every TikTok draft before it reaches Dana. Returns reasons; empty = OK to send for approval.
const BANNED = [/\$[A-Z]{2,10}\b/, /\b(buy|sell|ape|pump|moon|100x|profit|returns?|passive income|airdrop|presale)\b/i,
  /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/ /* Solana-style address */, /\b0x[a-fA-F0-9]{40}\b/, /link in bio to (buy|launch|trade)/i,
  /\b(target|price prediction|will hit)\b/i, /\bI (made|earned|turned)\b.*(SOL|\$\d|\dk\b)/i];
export function tiktokMoneyCheck(caption, onScreenText, script) {
  const text = [caption, onScreenText, script].join("\n");
  return BANNED.filter((re) => re.test(text)).map((re) => `matches ${re}`);
}
```

The agent runs this on the caption, the on-screen text list from the brief, and the voice script. Anything flagged is
rewritten, not sent.

## Rewrites that work

| Old idea | TikTok version | Length | Search phrase |
|---|---|---|---|
| "This coin broke out" | "What a 'breakout' on a chart actually is — on a made-up chart" | 35 s | what is a breakout chart |
| "1 SOL into 4" | "Why screenshots of gains prove nothing: 3 things they hide" | 28 s | fake trading screenshots |
| "Launch a token in 2 minutes" | "3 signs a 'support agent' in your DMs is a scam" | 22 s | crypto scam DMs |
| Live chart commentary | "The 4 parts of a candle, explained with coffee cups" | 40 s | how to read candlesticks |

Each uses a generic or invented chart (no ticker, no axis with a real coin's price), says "AI agent · education only" on
screen, and carries the AIGC label. Captions still avoid coin names, so the package doesn't need to add "Not financial
advice." — the content isn't about a coin at all.

Example caption:

```text
How to read candlesticks, explained with coffee cups ☕ education only, made with AI #chartliteracy #learnontiktok #aigenerated
```

## Upload path

Dana's own TikTok app wasn't audited, so posts landed private. Dana's routine: the agent uploads as SELF_ONLY through the
package each morning, Dana watches it in the app, checks the preflight list, and switches "Who can watch" to Everyone at
the planned slot (or posts important ones directly in the app).

```sh
claudia post tiktok "How to read candlesticks, explained with coffee cups ☕ education only, made with AI #chartliteracy #learnontiktok #aigenerated" \
  --media ./candles-coffee.mp4 --dry-run
```

## Results (6 weeks after the reset)

| Metric | Before (first 10 videos) | After (24 videos) |
|---|---|---|
| Removals / warnings | 3 / 1 | 0 / 0 |
| Median views | 820 | 6,400 |
| Saves per 1,000 views | 4 | 19 |
| Followers | 1,900 | 11,300 |
| Search share of traffic | 3% | 21% |

Market commentary (with NFA) stayed on X, where Juno links its TikTok education series. The UK and EU audience on both
platforms gets no coin promotion at all (../../crypto-marketing-compliance/SKILL.md).
