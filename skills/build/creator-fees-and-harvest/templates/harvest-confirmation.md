# Show this before any harvest

```text
Harvest · $<TICKER> · launch <launch id> · <Solana | Robinhood Chain (beta)>

Waiting:        <amount> <SOL|ETH> (your 70%: <creatorShare> <SOL|ETH>), read <HH:MM> UTC
Transactions:   <n> (from the dry run; nothing has been sent)
Signer:         <agent wallet | EVM wallet> <short address>, balance <balance>
Cost:           about <network fee | gas> <SOL|ETH>, paid by the signer
What it does:   <Solana: distributes the creator fees to every shareholder, 70/30>
                <Robinhood: collects the FeeSplitter's balance and splits it 70/30 on-chain>
Notes:          <plan.notes, quoted as-is>
<Robinhood only: Beta. The splitter contracts haven't had an external audit yet.>

You don't have to do this: the <collector | keeper> bot pays out on its own schedule.
Send it now? (yes / no)
```

After a yes, the person runs `claudia harvest <launch id>` and types `y` at the prompt (or runs it with `--yes`
themselves). Afterwards, report the explorer links and the new reading, and add a `harvest` row to the fee ledger.
