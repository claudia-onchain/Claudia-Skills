---
name: coin-launch-art-kit
description: Builds every visual a Claudia coin launch needs, in one consistent kit — the token image (the permanent coin logo and the coin's avatar, sized for pump.fun on Solana and the Robinhood Chain launchpads Pons, Pools, Flap, Bags, Clanker and Dyor), the launch card from launchCardPrompt in @useclaudia/media, a 3:1 banner for the coin's X header, and announcement visuals (X image, 9:16 clip, Telegram pin) with AI labels, alt text and "not financial advice" — then hands the image to `claudia launch --image`, the SDK's uploadImage or the MCP prepare_launch tool. Use when someone is about to launch a coin and needs a logo, token image, launch card, banner or announcement art, or asks "what image do I need for pump.fun". Never puts prices, rising charts, rockets or promises on any image.
license: MIT
metadata:
  title: "Coin launch art kit"
  category: "create"
  summary: "Token image, launch card, banner and announcement visuals for a Solana or Robinhood Chain launch, with no price promises."
  level: "intermediate"
  tags: "coin launch, token image, logo, launch card, pump.fun, robinhood chain, banner, announcement, crypto, compliance"
  uses: "@useclaudia/media, @useclaudia/cli, @useclaudia/sdk, @useclaudia/social, @useclaudia/mcp"
  time: "60–90 min"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Coin launch art kit

A coin's image is set once and shown everywhere: on the launchpad board, the coin page, wallets, the coin's own
socials and every post about it. On pump.fun the name, ticker and image can't be changed after launch. This skill
builds the full kit from one idea and one palette (token image, launch card, banner and announcement visuals) so the
launch looks deliberate, reads at 32 px, and never implies a price or a return.

## When to use this

- Before running [launch-a-coin](../../build/launch-a-coin/SKILL.md): the image is a required launch field.
- An agent or creator wants a logo, token image, launch card or announcement art for a coin on Solana (pump.fun) or
  Robinhood Chain (Pons V2, Pools, Flap, Bags, Clanker, Dyor; beta).
- Someone asks for "pump.fun image size", "launch banner", "token logo" or "announcement graphic".
- An existing coin's socials need a header and avatar that match its token image.

Not for: images of real people, brands, exchanges or other projects' logos; art that suggests price moves, returns,
listings or partnerships that don't exist; or launching itself (that is [launch-a-coin](../../build/launch-a-coin/SKILL.md),
which needs the person's confirmation).

## What you need

- The launch brief: name, ticker, one-line idea, chain and launchpad
  ([templates/art-kit-brief.yaml](templates/art-kit-brief.yaml)).
- `@useclaudia/media` or `claudia generate` with an image key; a video key (`fal`, `google`, `runway` or `byteplus`)
  only if you make the clip.
- `ffmpeg` for crops and exports.
- [references/launch-image-specs.md](references/launch-image-specs.md) — the image rules per route and launchpad, with
  sources (checked 2026-10). Read it before step 4.
- [references/visual-red-lines.md](references/visual-red-lines.md) — what may never appear on coin art, and why.
  Read it before step 5.

## Steps

1. **Fill the art brief.** Name, ticker, the idea in one line, chain and launchpad, two or three colours, the mascot
   or object, and who approves. Check the name and ticker first: name up to 32 bytes, ticker letters and digits up to
   13 characters on pump.fun and 16 on Robinhood Chain (Claudia CLI docs, checked 2026-10). No real person, brand,
   exchange or "Claudia" in the name. pump.fun removes coins that break its Terms or Trademark Guidelines.

2. **Save a brand kit for the coin.** Every asset then shares the style line, refs and banned words:

   ```ts
   import { createMedia, envKeys } from "@useclaudia/media";
   const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 1, perDayUsd: 5, approveAboveUsd: 0.5 } });
   media.brands.save({
     id: "foil-frog",
     name: "Foil Frog",
     refs: [],                                   // add the approved token image after step 4
     style: "glossy chrome frog mascot, silver foil texture, rose #ff6fa5 and near-black #0a0b0d, clean studio light",
     banned: ["guaranteed", "100x", "moon", "lambo", "to the moon", "profit", "returns"],
   });
   ```

   A prompt that contains a banned word is blocked before anything is sent.

3. **Make the token image.** It is the coin's logo, its avatar on the board and its X and Telegram profile picture.
   A mark, not a poster: one subject, centred, filling about 70% of the frame, thick shapes, flat background, no
   text. Generate 4 candidates at 1:1, 2K, then check them at 32 px with the circle previews from
   [pfp-and-avatar-sets](../pfp-and-avatar-sets/SKILL.md):

   ```sh
   claudia generate image "A bold, simple mascot mark for a coin called Foil Frog: a small frog made of crinkled silver \
   foil, centred, filling 70% of the frame, thick clean shapes, silver, rose #ff6fa5 and near-black, flat near-black \
   background, readable as a tiny circle. No text, no numbers, no charts, no rockets, no logos." \
     --model google/nano-banana-2.1 --aspect 1:1 --resolution 2K --n 4 --max-usd 0.30
   ```

4. **Export the token image to spec.** One file meets every route: a 1000×1000 PNG under 4 MB (pump.fun's help
   centre asks for at least 1000×1000 and 1:1; `claudia launch --image` and MCP `prepare_launch` take PNG, JPEG, GIF
   or WEBP up to 4 MB). Then get a person's approval: on pump.fun it can never be changed.

   ```sh
   ffmpeg -i token-master.png -vf "scale=1000:1000:flags=lanczos" foil-token-1000.png
   ls -l foil-token-1000.png        # must be under 4 MB
   ```

5. **Make the launch card.** `launchCardPrompt` writes a prompt with the ticker as the only text and no prices,
   rising charts or promises. Make a square card for the board and socials, and a 16:9 one for X and Telegram:

   ```ts
   import { launchCardPrompt } from "@useclaudia/media";
   const prompt = launchCardPrompt({ name: "Foil Frog", symbol: "FOIL", chain: "hood", launchpad: "pons",
     idea: "a small frog made of crinkled silver foil on a near-black stage" });
   for (const aspect of ["1:1", "16:9"] as const) {
     const job = await media.generate({ kind: "image", prompt, aspect, brand: "foil-frog", refs: ["./foil-token-1000.png"] });
     if (!("dryRun" in job)) console.log(aspect, (await media.wait(job.id)).outputs[0]?.path);
   }
   ```

   `chain` is `"sol"` (default) or `"hood"`. Check the ticker is spelled right on the image; regenerate or fix with an
   edit if not ([image-editing-and-upscaling](../image-editing-and-upscaling/SKILL.md)).

6. **Make the banner.** pump.fun's own create form takes a 1500×500 (3:1) banner up to 5 MB, set only at creation; the
   Claudia launch routes have no banner field, so the banner's main job is the coin's X header (1500×500). Outpaint
   the 16:9 card to 3:1, keep the mark right of centre and out of the lower-left avatar zone. Layout and safe areas:
   [banner-and-collage-design](../banner-and-collage-design/SKILL.md).

7. **Make the announcement visuals.** Same mark, same palette:

   | Asset | Size | How |
   |---|---|---|
   | X / Bluesky / Farcaster post image | 16:9 card from step 5 | as is |
   | Telegram pin | 1:1 card | as is |
   | 9:16 clip, 5 s | 1080×1920 | image-to-video from the 1:1 card: `fal/kling-2.6-pro`, `durationSec: 5`, `meta: { audio: false }`, $0.35 (checked 2026-10) |
   | Coin's X avatar and header | 400×400, 1500×500 | token image and banner |

   Write the copy with [templates/announcement-kit.md](templates/announcement-kit.md): what it is, that the art is
   AI-generated, the chain and contract address, "Not financial advice.", no promises, `#ad` if anything is paid.
   `launchAnnouncement({ chain, launchpad, name, symbol, url })` from `@useclaudia/social` writes a plain, rule-safe
   base post; the package adds "Not financial advice." when a `$TICKER` or address appears and blocks promises.

8. **Run the red-line review.** Check every image and line of copy against
   [references/visual-red-lines.md](references/visual-red-lines.md) and the decision tree in
   [crypto-marketing-compliance](../../grow/crypto-marketing-compliance/SKILL.md). Any price, chart, multiplier,
   rocket, moon, exchange logo or "listing" implication is a fail. Fix it, then a person signs off.

9. **Hand off to the launch.** Dry-run with the approved token image, then follow
   [launch-a-coin](../../build/launch-a-coin/SKILL.md) for the confirmed launch:

   ```sh
   claudia launch --name "Foil Frog" --symbol FOIL --image ./foil-token-1000.png --dry-run                        # pump.fun, Solana
   claudia launch --chain hood --launchpad pons --name "Foil Frog" --symbol FOIL --image ./foil-token-1000.png --dry-run
   ```

   SDK: `uploadImage(bytes, "coin.png")` returns the `uri` for `launchPlan` / `planLaunch`. MCP: `prepare_launch` with
   `image` as an `https://` or `ipfs://` URL, or locally an absolute path. Archive the kit folder with every sidecar.

A complete kit for a fictional agent's coin on Robinhood Chain (Pons V2) is in
[examples/foil-frog-kit.md](examples/foil-frog-kit.md).

## Templates

- [templates/art-kit-brief.yaml](templates/art-kit-brief.yaml) — the brief, asset list, sizes and sign-offs.
- [templates/announcement-kit.md](templates/announcement-kit.md) — post copy per network, alt text, Telegram pin
  and the red-line checklist for each asset.

Kit folder layout:

```text
<ticker>-kit/
  brief.yaml
  token/   <ticker>-token-master.png  <ticker>-token-1000.png  (+ .json sidecars)
  card/    <ticker>-card-1x1.png  <ticker>-card-16x9.png
  banner/  <ticker>-x-header-1500x500.jpg
  social/  <ticker>-clip-9x16.mp4  copy.md
  log.csv  (job ids, models, costs, approvals)
```

## Check before you finish

- [ ] Token image: 1:1, 1000×1000 PNG, under 4 MB, recognisable at 32 px, no text, approved by a person.
- [ ] Ticker spelled correctly on the launch card; it is the only text on the image.
- [ ] No price, chart, multiplier, rocket, moon, money pile, exchange logo, real person or other brand on any asset.
- [ ] Every post carries the AI label, alt text starting "AI-generated image:", the contract address and "Not
      financial advice."; `#ad` where anything is paid.
- [ ] The UK and EU are treated as able to see every post ([crypto-marketing-compliance](../../grow/crypto-marketing-compliance/SKILL.md)).
- [ ] Dry run passed with the exact file; nothing launched or posted without a person's yes.
- [ ] Kit folder archived with sidecars and the cost log.

## Pitfalls

- **Treating the token image as editable.** On pump.fun it is permanent. Approve it at the size it will be seen.
- **A poster as a logo.** Scenes, small text and gradients turn to mud at 32 px. One subject, thick shapes.
- **Text the model misspells.** Only the launch card carries the ticker; check every letter.
- **"Just a small green candle."** Any rising chart reads as a price claim. `launchCardPrompt` avoids it; don't add it back.
- **Borrowed identity.** A mascot that looks like a famous brand's character or an exchange logo gets the coin removed
  and the creator reported.
- **Agent avatar on the coin.** An agent's face as the token image makes the agent look like the asset. Keep them apart.
- **Unlabelled AI art.** Coin art is AI-generated; say so in the post and the alt text.

## Related skills

- [launch-a-coin](../../build/launch-a-coin/SKILL.md) — the launch itself, what is signed, confirmation and caps.
- [crypto-marketing-compliance](../../grow/crypto-marketing-compliance/SKILL.md) — the review every coin post needs.
- [pfp-and-avatar-sets](../pfp-and-avatar-sets/SKILL.md) — circle previews and exports for the token image.
- [banner-and-collage-design](../banner-and-collage-design/SKILL.md) — 3:1 headers and safe areas.
- [launch-campaigns](../../grow/launch-campaigns/SKILL.md) — the announcement plan around the visuals.
- [rug-check](../../build/rug-check/SKILL.md) — how the launch will look to people checking it.
