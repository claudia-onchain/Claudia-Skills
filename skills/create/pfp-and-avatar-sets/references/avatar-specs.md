# Avatar specs per platform (checked 2026-10)

Read this before exporting (step 5). Only numbers from a platform's own help page, docs or protocol schema are listed
as specs. Where no official number was found, the table says so and gives a safe upload instead of a guessed limit.
When the app's upload screen disagrees with this file, the app wins; update this file.

## Profile pictures

| Platform | Official spec (source) | Upload this | Shape shown |
|---|---|---|---|
| X | 400×400 recommended; max 2 MB (help.x.com, "Help with uploading a profile photo") | `-x-400.jpg` | circle |
| YouTube | 800×800 recommended; JPG, GIF, BMP or PNG, no animated GIFs (YouTube Help, channel picture guidelines) | `-youtube-800.jpg` | circle |
| Bluesky | PNG or JPEG, max 1,000,000 bytes (`app.bsky.actor.profile` lexicon, avatar blob); no pixel size set | `-bluesky-1000.jpg` | circle |
| Instagram / Threads | no current official pixel spec found | `-1080.jpg` | circle |
| TikTok | no current official pixel spec found | `-1080.jpg` | circle |
| LinkedIn | no current official pixel spec found | `-1080.jpg` | circle |
| Telegram | no official pixel spec found | `-1080.jpg` | circle |
| Discord | no official pixel spec found | `-1080.jpg` | circle |
| Farcaster | no official pixel spec found | `-1080.jpg` | circle |

The 1080 JPG at quality ~90 is usually well under 1 MB for a portrait on a plain backdrop; the export script prints the
size so you can see it.

## Headers that sit next to the avatar

| Platform | Official spec (source) | Note |
|---|---|---|
| X header | 1500×500 recommended; the top and bottom ~60 px may be cropped depending on screen (help.x.com) | The avatar circle overlaps the lower left |
| Bluesky banner | PNG or JPEG, max 1,000,000 bytes (`app.bsky.actor.profile` lexicon) | |

Full header and channel-art layouts: [banner-and-collage-design](../../banner-and-collage-design/SKILL.md).

## Coin images (the coin's avatar)

| Where | Spec (source) |
|---|---|
| `claudia launch --image`, MCP `prepare_launch` | PNG, JPEG, GIF or WEBP, 4 MB or less (Claudia CLI and MCP docs) |
| pump.fun create form | Help centre: image max 15 MB, min 1000×1000, 1:1 recommended, .jpg/.gif/.png. pump.fun docs: square, ideally 512×512 PNG or JPG. Name, ticker and image can't be changed after launch |

A 1000×1000 PNG under 4 MB meets all of these. Details: [coin-launch-art-kit](../../coin-launch-art-kit/SKILL.md).

## Display sizes to design for

Avatars show far smaller than they upload: next to posts, in replies, in notification lists and in DMs. Design so the
32 px and 48 px circle previews from the export script are still recognisable. That test matters more than any upload
number.

## Sources

- help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo
- YouTube Help: channel picture guidelines (support.google.com/youtube)
- github.com/bluesky-social/atproto, `lexicons/app/bsky/actor/profile.json`
- pump.fun/docs/create-coin and the pump.fun help centre article "Create a Coin on Pump.fun"
- Claudia CLI docs (`claudia launch`), Claudia MCP docs (`prepare_launch`)
