# What to show before the person says yes

```text
Trade to confirm — real SOL on Solana mainnet
Coin        $<TICKER> · sol:<full mint>
Side        <buy | sell>
You spend   <0.02 SOL | 50% of <n> tokens>
You get     ≈ <expected> (at least <minimum> with <bps/100>% max slippage)
Price impact <x>%
Fees        <fee SOL> · route <pump.fun curve | PumpPortal · auto (0.5% PumpPortal fee)>
Wallet      <agent wallet short> · balance <SOL>
Caps        <per-trade> SOL per trade · <left> SOL left today
Rug check   <r> red · <a> amber (<one-line summary>)
How it runs <CLI: you type y | confirm link valid 2 minutes, you sign in your wallet | Claudia Local: confirm the dry run within 60 s>

Coins like this are very risky and can go to zero. This is not financial advice.
Reply "yes, <buy|sell> <amount>" to go ahead, or anything else to stop.
```

Rules:
- Ask for a yes that repeats the side and amount. "ok" to a different message is not consent to this trade.
- If more than a minute passes, quote again before executing.
- After execution, reply with the signatures (`https://solscan.io/tx/<sig>`) and the caps left today.
