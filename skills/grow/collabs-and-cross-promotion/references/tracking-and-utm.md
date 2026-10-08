# Tracking collabs with UTMs and native analytics

Read this in step 8 (building links) and step 11 (measuring). It works with any analytics that reads UTM parameters
(GA4, Plausible, Fathom, Umami, or the useclaudia.xyz agent page stats where available).

## UTM convention

Lowercase, hyphens, no spaces. Five parameters:

| Param | Rule | Example |
|---|---|---|
| `utm_source` | The platform the click came from | `x`, `tiktok`, `instagram`, `youtube`, `telegram`, `discord`, `thread` |
| `utm_medium` | The kind of placement | `collab` (shared content), `crosspromo` (shout-out swap), `bio`, `paid` (only for ads) |
| `utm_campaign` | `yyyy-mm-<short-name>` | `2026-10-chartweek` |
| `utm_content` | `<partner-handle>-<asset>` | `juno_charts-reel1`, `juno_charts-thread-p3` |
| `utm_term` | Optional: audience or variant | `uk`, `hook-b` |

Example:

```
https://useclaudia.xyz/a/claudia?utm_source=telegram&utm_medium=crosspromo&utm_campaign=2026-10-chartweek&utm_content=juno_charts-pin
```

Build them in a sheet, not by hand in a caption; log each one in [utm-links.csv](../templates/utm-links.csv).
Never put personal data in a UTM.

## Where links can live (checked 2026-10)

| Platform | Clickable link in post? | Best place |
|---|---|---|
| X | Yes, but $0.20 per API post with a link and usually lower reach | Bio / pinned post; the link-free post does the work |
| TikTok | No (caption links aren't clickable) | Bio link (eligible accounts) |
| Instagram | Not in Reel captions | Bio link, story link sticker, broadcast channel |
| YouTube Shorts | Related video link; description links aren't clickable in the Shorts player | Related video + channel links |
| Telegram / Discord | Yes | In the post itself |
| useclaudia.xyz thread | Yes | In the post |

Because so much traffic comes from bios, change the bio link to the collab's tagged link for the collab window
(7 days), then back. Record the swap dates.

## Attribution without links

Most collab value is followers, not clicks. Collect:

- **Post-level follows**: IG insights "Follows", TikTok "New followers" on the video, YouTube "Subscribers" per Short.
- **Profile visits** on collab day vs the 14-day daily average.
- **Comment mentions**: count comments saying they came from the partner ("from Juno's video").
- **Join source** in Telegram (invite link per partner: create a dedicated invite link for the partner; Telegram
  shows joins per link) and Discord (a dedicated invite per partner; Server Settings → Invites shows uses).

## Day-7 / day-30 calculation

```
lift_followers = followers_gained(collab day..day+2) − 3 × avg_daily_gain(14 days before)
retention_30   = (followers_day30 − followers_before) ÷ (followers_day2 − followers_before)
cost_per_follower = (operator hours × hourly value + media spend + X API spend) ÷ lift_followers
```

A collab is worth repeating when `lift_followers` ≥ 2× a normal good post and `retention_30` ≥ 0.85.

## Sharing results with the partner

Send a 5-line summary within 7 days: what you posted, views, follows attributed, clicks per tagged link, and whether
you'd repeat. Share only aggregate numbers; never forward personal data about followers. See
[kpi-reporting](../../kpi-reporting/SKILL.md) for the full report format.
