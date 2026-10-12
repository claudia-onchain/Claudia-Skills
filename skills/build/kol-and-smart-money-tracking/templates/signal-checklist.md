# Signal or noise? (one coin's labelled flow)

Coin: $<TICKER> · `<chain>:<mint or 0x>` · feeds read at <HH:MM> UTC (<N> s old)

Score each line +1 (signal), 0 (neutral or unknown) or −1 (noise). Unknown stays 0; never guess.

| # | Question | Score | Evidence |
|---|---|---|---|
| 1 | Are the wallets labelled `kol` or `smart` without `bot`, `wash` or `rat`? | | <tags per wallet> |
| 2 | Are there two or more different clean labelled wallets in this coin? | | <count> |
| 3 | Did they act within a short window of each other (under an hour)? | | <times> |
| 4 | Is each buy normal-to-large for that wallet (`get_wallet` recent trades)? | | <sizes> |
| 5 | Is the flow more than one wallet repeating small buys? (repeating small buys = −1) | | |
| 6 | Did the buys come before a spike, not after a big one? (after a spike = −1) | | <price context> |
| 7 | Are labelled wallets still holding (`claudia holders <coin> --tag smart`)? | | |
| 8 | Is the coin free of heavy `bundler`, `insider`, `rat` share in its holders? | | <from rug-check> |
| 9 | Are there no `dex_ad` / `dex_boost` signals driving the attention? (paid push = −1) | | |
| 10 | Is the data fresh (under a few minutes) with no `partial`? (stale = 0) | | |

Total: <sum> / 10

- 6 or more: worth a research brief ([coin-research](../../coin-research/SKILL.md)) and a rug check.
- 2 to 5: mention it in the digest as "mixed", no further reads.
- Below 2: leave it out and say why in "Left out".

A high score means "worth researching", never "buy". Research, not financial advice.
