# Worked example: the Foil Frog ($FOIL) art kit on Robinhood Chain

**Who.** Pix, a fictional AI agent that posts studio-photography tips, run by its operator Sam (they/them). Pix wants
to launch a playful community coin on Robinhood Chain through Pons V2 (beta) and needs the full kit. Sam approves
every asset and the launch.

## 1. Brief

```yaml
coin:
  name: "Foil Frog"
  ticker: "FOIL"
  idea: "a frog made of crinkled silver foil, the studio's unofficial mascot"
  chain: "hood"
  launchpad: "pons"
  launcher: "external agent"
  name_checks: "yes: no real person, brand, exchange or 'Claudia'"
look:
  subject: "small frog made of crinkled silver foil"
  palette: ["#c9ccd3", "#ff6fa5", "#0a0b0d"]
  background: "#0a0b0d"
  style: "glossy 3D"
budget:
  max_usd_total: "2.00"
```

"Foil Frog" is 9 bytes; "FOIL" is 4 characters. Both pass.

## 2. Brand kit

Saved as `foil-frog` with the style line and banned words from the skill. A test prompt containing "to the moon"
was refused with `blocked`, which confirms the kit is active.

## 3–4. Token image

Four candidates, Nano Banana 2.1 at 2K, 4 × $0.0504 = about $0.20 (checked 2026-10).

| Candidate | 32 px circle | Verdict |
|---|---|---|
| A | frog shape clear, foil texture reads as grey noise | maybe |
| B | clear silhouette, rose eyes pop | chosen |
| C | frog sitting on a coin stack | rejected: "money pile" red line |
| D | full scene with a stage and lights | rejected: a poster, not a mark |

B exported to `foil-token-1000.png` (1000×1000 PNG, 1.4 MB). Sam approved it at 32 px and 400 px and treated it as permanent, since a coin image
can't be relied on to change after launch.

## 5. Launch card

```ts
const prompt = launchCardPrompt({ name: "Foil Frog", symbol: "FOIL", chain: "hood", launchpad: "pons",
  idea: "a small frog made of crinkled silver foil on a near-black stage" });
// → "Launch announcement card for the coin Foil Frog ($FOIL) on Robinhood Chain (Pons V2). Theme: a small frog made of
//    crinkled silver foil on a near-black stage. Bold, clean composition with the ticker $FOIL as the only text; no
//    prices, charts going up, or promises."
```

1:1 and 16:9 generated with the token image as ref, about $0.07 for both at 1K. The 16:9 version spelled the ticker
"$F0IL" (zero for O). One Sunburst text edit: "Change only: the text reads $FOIL with the letter O, same font, same
place" (about $0.013). Checked letter by letter.

## 6. Banner

The 16:9 card padded to 1824 wide and outpainted with more near-black stage and soft rose haze (Nano Banana 2.1, 2K,
$0.0504), then cropped to 3:1 and exported at 1500×500. The frog sits right of centre; the lower-left avatar zone is
empty stage.

## 7. Announcement visuals

- X and Farcaster: the 16:9 card.
- Telegram pin: the 1:1 card.
- 9:16 clip: `fal/kling-2.6-pro`, 5 s, `audio: false`, the 1:1 card as first frame, prompt "the foil frog blinks and
  turns its head toward the camera, foil glints under one spotlight, slow push-in". $0.35. Posted to X and Telegram only.

Base post from the social package:

```ts
const a = launchAnnouncement({ chain: "hood", launchpad: "pons", name: "Foil Frog", symbol: "FOIL",
  url: "https://useclaudia.xyz/t/hood/<address>" });
```

Pix's X copy on top of it:

```text
$FOIL (Foil Frog) just launched on Pons V2, Robinhood Chain (beta), through Claudia.
the studio's unofficial mascot finally has a page.
CA: <full contract address>
Art is AI-generated. Not financial advice.
```

Alt text: `AI-generated image: launch card for Foil Frog ($FOIL), a small frog of crinkled silver foil on a near-black
stage, ticker as the only text.`

## 8. Red-line review

| Asset | Result |
|---|---|
| Token image | pass |
| Card 1:1 / 16:9 | pass after the ticker fix |
| Banner | pass |
| Clip | first draft had a green glow rising behind the frog; read as a chart cue. Re-prompted with rose haze. Pass |
| X post | pass; the package added nothing because "Not financial advice." was already present |
| Telegram pin | pass; added "memecoins can go to zero" |

Compliance tree: amber (coin post) → fixed to green-with-NFA. UK/EU visible: no "buy" call, no returns, no urgency.

## 9. Hand-off

```sh
claudia launch --chain hood --launchpad pons --name "Foil Frog" --symbol FOIL --image ./foil-token-1000.png --dry-run
```

The dry run showed the cost in ETH, the FeeSplitter, the 70/30 split and a passing simulation; nothing sent. Sam ran
the real launch through [launch-a-coin](../../../build/launch-a-coin/SKILL.md) and confirmed it.

## Cost

Token candidates $0.20 + cards $0.07 + ticker fix $0.013 + banner $0.05 + clip $0.35 = **about $0.68** of the $2.00
budget (estimates, checked 2026-10).
