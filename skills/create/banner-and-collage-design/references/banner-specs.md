# Banner and profile image specs (checked 2026-10)

Read this before exporting. Platforms change crops quietly; re-check the platform's own help page before a big refresh.
"[3P]" = from a third-party guide, not the platform's own page.

## Headers and channel art

| Platform | Upload size | Ratio | What gets covered / cropped | Keep important content |
|---|---|---|---|---|
| X header | 1500×500 | 3:1 | avatar circle overlaps the lower-left; mobile crops a little top and bottom | centre band ~1500×360; nothing in the lower-left ~400×200 |
| YouTube channel art | 2560×1440 (min 2048×1152, ≤ 6 MB) [3P] | 16:9 | desktop shows 2560×423; mobile shows ~1546×423; TV shows all | everything that matters inside the centre **1546×423** |
| LinkedIn personal | 1584×396, JPG/PNG < 8 MB [3P] | 4:1 | avatar overlaps lower-left; mobile crops sides | centre-right; nothing in the left ~450 px lower half |
| Twitch profile banner | 1200×480 [3P] | 5:2 | | centre |
| Discord profile banner (Nitro) | 680×240 [3P] | 17:6 | avatar overlaps lower-left | centre-right |
| Discord server banner | 960×540, server Boost level 2 [3P] | 16:9 | | centre |
| Telegram | no channel/profile banner — only the round avatar | — | — | — |
| Website (Claudia site) | 2000×667, 1200×400, 800×267 JPG | 3:1 | object-cover on narrow screens crops the sides | face slightly right of centre, wordmark inside the middle 70 % |

## Profile pictures

| Platform | Size | Note |
|---|---|---|
| X | 400×400 | shown as a circle |
| Instagram | 320×320 | circle |
| YouTube | 800×800 [3P] | circle |
| TikTok | 200×200 minimum (unconfirmed) | circle — upload 800×800 |
| Telegram | ~400×400+ (unconfirmed) | circle |

Upload one 800×800 master everywhere; the platform logo is her face, so use the same crop on every network.

## In-feed and cover sizes (for related assets)

| Asset | Size |
|---|---|
| 9:16 video / Reel / Short / TikTok | 1080×1920 |
| Instagram grid preview | 3:4 (1080×1440); grid crops 240 px top and bottom of a 9:16 cover |
| Instagram feed portrait | 1080×1350 (4:5) |
| YouTube thumbnail | 1280×720 |

## Safe-area overlays (ffmpeg, no fonts needed)

```sh
# YouTube safe area
ffmpeg -i yt.jpg -vf "drawbox=x=507:y=508:w=1546:h=423:color=0xff6fa5@0.9:t=4" yt-check.jpg
# X header avatar zone (approximate)
ffmpeg -i x.jpg -vf "drawbox=x=0:y=300:w=420:h=200:color=0xff6fa5@0.5:t=fill" x-check.jpg
# LinkedIn avatar zone (approximate)
ffmpeg -i li.jpg -vf "drawbox=x=0:y=200:w=460:h=196:color=0xff6fa5@0.5:t=fill" li-check.jpg
```

## File hygiene

- JPG quality `-q:v 3` (≈ 90 %) for photos; PNG only when there is flat UI art.
- sRGB colour; strip nothing you need for provenance until the final export (re-encoding drops C2PA anyway — keep the
  original and its sidecar in the library).
- Name files `<banner>-<platform>-<WxH>.jpg` and keep the master + wordmark PNG + font licence together.
