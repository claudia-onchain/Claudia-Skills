# Profile specs by platform (checked 2026-10)

Read when writing or fixing handles, names, bios, avatars, banners and links. Limits change; when the app's counter
disagrees with this table, the app wins. Update this file when you notice.

## Text limits

| Platform | Handle | Display name | Bio | Links | AI / automation flag |
|---|---|---|---|---|---|
| X | 4–15 chars, letters/digits/underscore | 50 | 160 | 1 website field + links in bio text (t.co counts 23) | Automated account label linked to managing account |
| TikTok | up to 24 | up to 30 | 80 | 1 website link (personal accounts usually need ~1,000 followers; business accounts have it earlier; varies by region) | AI-generated content label per post (AIGC) |
| Instagram | up to 30 | up to 64 (name field) | 150 | Up to 5 links in the Links section | AI info label per post |
| Threads | shared with Instagram | shared | 150 (own bio) | 1–5 links (pulled from Instagram or set separately) | AI info label per post |
| YouTube | handle 3–30 chars (@name) | channel name | Description up to 1,000 | Up to 14 links in the channel's Links section; 1 shown under the name | Altered or synthetic content toggle per video |
| Telegram channel | public link t.me/<name>, 5–32 chars | channel title | Description up to 255 | Links in description | State it in the description and pinned message |
| Discord server | — | server name 2–100 | Server description (Discovery) | Invite link | Bot accounts show a BOT/APP tag automatically |
| Bluesky | handle or own domain | 64 | 256 | Links in bio | Self-label + "(AI-generated)" text |
| Mastodon | per instance | 30 | 500 | 4 profile metadata fields | "This is an automated account" flag |

Sources for limits: socialk.it, wordcountertool.net, replug.io (2026 character-limit roundups); platform help centres
(help.x.com, support.tiktok.com, help.instagram.com, support.google.com/youtube, telegram.org/faq, support.discord.com).

## Image specs (upload these sizes, check the safe areas)

| Platform | Avatar | Banner / header |
|---|---|---|
| X | 400×400 (shown round) | 1500×500 (3:1); keep faces out of the bottom-left where the avatar overlaps |
| TikTok | 200×200 minimum, upload 720×720+ (round) | — |
| Instagram / Threads | 320×320 minimum, upload 1080×1080 (round) | — (grid previews 3:4 for posts) |
| YouTube | 800×800 (round) | 2560×1440; safe area for all devices 1546×423 in the centre |
| Telegram | 640×640 (round) | — |
| Discord | 512×512 (icon); server banner 960×540 (16:9) | Invite splash 1920×1080 |

For Claudia: the avatar is the same face crop of her everywhere (never a monogram). The X header uses the 3:1 banner
family (sunset bedroom with skyline window, laptop with butterfly hub, travel collage) and gets the same AI label in the
pinned post. Banners: [banner-and-collage-design](../../../create/banner-and-collage-design/SKILL.md).

## Bio patterns that fit the limits

```text
X (≤160):        an AI creator, running her own platform out loud ✦ AI character · run by a small team ✦ start here ↓
TikTok (≤80):    AI creator · cosy city · my platform ↓
Instagram (≤150): AI creator running her own platform out loud
                 AI character · run by a small team
                 make, grow, earn with agents ↓
YouTube (≤1,000): 2–3 sentences: who she is (AI character), what the channel posts (Shorts series names),
                 how often, who operates it, the link. Put keywords people search for in the first 150 characters.
Telegram (≤255): Claudia's channel — an AI character's notes from running useclaudia.xyz. Thread highlights,
                 launches, creator tips. Not financial advice. Run by a small team.
```

## Link-in-bio rules

- One destination per profile: a "start here" page (useclaudia.xyz or a link page), not a list of 15 links.
- Tag each with UTMs so you can tell platforms apart:
  `?utm_source=<platform>&utm_medium=social&utm_campaign=bio` (pinned post: `utm_campaign=pinned_start_here`).
  Attribution details: [kpi-reporting](../../kpi-reporting/SKILL.md).
- No direct links to buy a coin, and no links to unauthorised crypto platforms for EU/UK audiences
  ([crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md)).
- Check the link monthly; dead bio links are a common silent loss.

## Pinned post checklist

- [ ] Line 1: why-follow line.
- [ ] Says she's an AI character and who runs the platform.
- [ ] What she posts (pillars in plain words) and how often.
- [ ] One link, UTM-tagged.
- [ ] AI label (native + text where none).
- [ ] Refreshed in the last 90 days.
