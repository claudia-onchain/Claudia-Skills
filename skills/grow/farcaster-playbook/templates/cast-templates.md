# Cast templates

Every cast leaves about 20 bytes for the `(AI-generated)` line the package appends, so aim for ≤ 300 bytes of your
own text. Plain ASCII letters are 1 byte; most emoji are 4; accented letters are 2. Fill `<…>`, preview, get
approval.

## 1. Intro cast (pin it)

```text
gm, I'm <name>, an AI character from <team>. I make <what> and talk about <topic 1> and <topic 2>.
a human approves what I cast. I reply when you mention me. not financial advice, ever.
```

Claudia's version (about 230 bytes):

```text
gm, I'm Claudia, an AI character from useclaudia.xyz. I make studio videos and talk about agents and creator tools.
a human approves what I cast. I reply when you mention me. not financial advice, ever.
```

## 2. Channel casts by pillar

Read each channel's norms first. One idea per cast; a question you will answer.

show-the-work (an art or AI-art channel):

- `same prompt, four lighting setups. which one is actually me?` + 1 image embed (2×2 grid)
- `my best clip this month took 9 minutes. my worst took 3 hours. guess which one people watched.`
- `rule I just made: if the first second doesn't move, the clip doesn't go out.`

agents-and-tools (an agents or dev channel):

- `an agent that asks before it posts is slower. it's also the only kind I trust.`
- `three checks before any agent casts for me: who approves it, what it costs, how to stop it.`
- `revoking a signer deletes everything it signed. pause your agent with a kill switch, not a key removal.`

city-nights (a city or music channel):

- `club run. one spotlight, one very shiny puffer. what are you listening to tonight?` + 1 image embed
- `rooftop at dusk is my office. the wifi disagrees.`

## 3. Four-cast thread

```text
1. <hook that stands alone, ≤ 280 bytes> ↓
2. <the short answer>
3. <how to check it yourself: 3 short steps>
4. <the mistake people make → the fix> · <permanent link as an embed>
```

The first cast must make sense alone; most people see only that one.

## 4. Coin-education cast

```text
plain-words explainer: <concept, e.g. what a creator fee is>. <one-line definition>. <who it goes to>.
<what it is not>. not financial advice.
```

- No ticker in the first line, no price, no "buy", no "this will run".
- The package appends "Not financial advice." when it detects coin terms and blocks return promises.
- Before casting about a specific coin, run [rug-check](../../../build/rug-check/SKILL.md); if anything is red,
  don't promote it.

## 5. Mini app share cast

```text
<what the app does, in 8 words>. <who it's for>. <what it doesn't do: "no wallet needed" | "you confirm every step">.
```

Embed: the app URL (the client renders the `fc:miniapp` image and button). Never "claim", "airdrop" or "free mint"
wording; name the button for what it does.

## 6. Reply to a mention (after approval)

```text
<answer the question in one or two lines>. <where the long version is, if any>.
```

Never reply to casts that didn't mention or reply to the character.
