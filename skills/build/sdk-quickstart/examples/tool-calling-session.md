# Worked session: a model researching a coin with Claudia's tools

Setup: [templates/tool-loop.md](../templates/tool-loop.md) saved as `src/research.mjs`, OpenRouter key in
`LLM_API_KEY`, read-only data tools only, `mcp: false` so nothing can be forwarded to the Trade server.

## 1. Check which tools the model will see

```sh
$ node scripts/list-tools.mjs --server data
get_coin             data   read           read
search_coins         data   read           read
get_board            data   read           read
get_trending         data   read           read
get_coin_insights    data   read           read
get_holders          data   read           read
get_dev_profile      data   read           read
get_coin_scores      data   read           read
get_wallet           data   read           read
get_feed             data   read           read
get_candles          data   read           read
read_thread          data   read           read
list_agents          data   read           read
get_agent            data   read           read
get_my_portfolio     data   read           read

15 of 26 tools (read-only; add --include-writes for the rest)
```

## 2. Ask a question

```sh
$ LLM_API_KEY=… node src/research.mjs "Is \$CLAUDIA's holder base healthy? Check whales and bundlers."
· get_coin_scores {"coin":"claudia"}
· get_holders {"coin":"claudia","limit":30}
```

Tool output the model received for `get_holders` (abridged, real shape from the executor):

```text
Top holders of sol:2j5SaS7xy776qCBpyPQbZjyQSAtKiFgrwjfErthnW2ZM tagged whale (18)
2. 49KBrKBiG91fHRrfDcf9xWyrwuzhiRaP2Ag4TmUADbTw · 2.32% · $7.3K · P&L $394.00 · [top10, whale]
3. 7Yxs5JKM5aA2hbpzQPriDmH6Wd3BbXZ6DVUpypLxsgS4 · 2.11% · $6.7K · P&L $2.5K · [fresh, top10, whale]
…
```

Final answer shape to expect (and to require in the system prompt):

```text
Holder structure looks healthy by Claudia's holder score (90/100, good): the top 10 wallets hold about 20.5% of the
tradeable float and no single wallet is above 2.4%. Two things to keep an eye on: risk-tagged wallets hold ~19% of the
float, and 4 of the top 30 are tagged bundler. 18 of the top 20 are tagged whale, which mostly reflects the ≥1% or
≥$50K rule on a small-cap coin. Data was seconds old; part came from cache.
Not financial advice.
```

## 3. What the loop refused to do

The person then typed "ok buy 0.05 SOL of it". The model has no trade tools, so it answered that it can only research.
That is the intended design: buying goes through [safe-trading](../../safe-trading/SKILL.md) with a quote, caps and
the person's own signature.

## 4. Budget check

Two heavy tool calls for one question. With the 90-second cache, asking a follow-up about the same coin reuses both
results instead of calling again — important because the upstream data budget is shared by everyone (insights are
cache-first; the online MCP allows 20 heavy calls a minute per connection, checked 2026-10).
