# Launch image specs per route (checked 2026-10)

Read before exporting the token image (step 4). Sources at the end. When a launch screen disagrees with this file, the
screen wins; update the file.

## The one file that works everywhere

**1000×1000 PNG, 1:1, under 4 MB, no text.** It meets pump.fun's help-centre minimum, sits inside the Claudia upload
limit, and is large enough for every board and wallet that shows it.

## Through Claudia (all chains)

| Route | Image input | Limit |
|---|---|---|
| `claudia launch --image <file or URL>` | a URL, or a PNG, JPEG, GIF or WEBP file | 4 MB or less |
| SDK `uploadImage(bytes, filename?, contentType?)` → `{ uri }` → `launchPlan` / `planLaunch` `imageUri` | PNG, JPEG, GIF, WEBP | `not_an_image` error otherwise |
| MCP `prepare_launch` `image` | `https://` or `ipfs://` URL; locally also an absolute path to a PNG, JPEG, GIF or WEBP | 4 MB or less |

Other fields that touch the art: name up to 32 bytes; ticker letters and digits only, up to 13 characters on pump.fun
and 16 on Robinhood Chain. The `$` is stripped and the ticker is upper-cased.

The Claudia routes have no banner and no video field.

## Solana: pump.fun

| Field | pump.fun says |
|---|---|
| Coin image | Help centre: max 15 MB, min 1000×1000 px, 1:1 recommended, .jpg / .gif / .png. Docs page: square, ideally 512×512 PNG or JPG. Use 1000×1000 to satisfy both |
| Coin video (pump.fun form only) | Help centre: max 300 MB, 1080p or higher, 16:9 or 9:16, .mp4 |
| Coin banner (pump.fun form only) | Help centre: images and animated GIFs, max 5 MB, 1500×500 (3:1) recommended, only settable at creation |
| Permanence | Name, ticker and image are part of the token metadata and can't be changed after launch; the help centre says social links can't be changed after creation either |
| Content rules | Terms and Conditions and Trademark Guidelines; coins that break them may be removed |

## Robinhood Chain (beta): Pons V2, Pools, Flap, Bags, Clanker, Dyor

No launchpad-specific image spec was found published for these launchpads (checked 2026-10). Claudia uploads the same
image for every launchpad, and the Claudia launch and coin pages show it the same way on both chains. Use the
1000×1000 PNG. Dyor launches have no dev buy; that does not change the art.

## Where the image shows up after launch

- The launchpad board and coin page (small square or circle thumbnails, often 32–64 px in lists).
- The Claudia coin page `useclaudia.xyz/t/<chain>/<address>`.
- Wallets and explorers that read the token metadata.
- The coin's own X and Telegram avatars (upload the same file: X 400×400 under 2 MB).

## Sources

- Claudia CLI docs (`claudia launch`), SDK docs (`uploadImage`, errors), MCP docs (`prepare_launch`), media docs
  ("Media for coins on each chain").
- pump.fun/docs/create-coin.
- pump.fun help centre, "Create a Coin on Pump.fun" (intercom.help/pumpfun-web).
- help.x.com, "Help with uploading a profile photo".
