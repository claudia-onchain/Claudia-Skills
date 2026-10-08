# Time zones and daylight saving

Read this when an audience spans regions, when a calendar crosses a clock change, or when posts land an hour off.
Dates checked 2026-10 (EU: last Sunday of March/October at 01:00 UTC; US: second Sunday of March / first Sunday of
November at 02:00 local).

## Rules

1. **Store UTC, plan in local.** Calendars hold the audience's local time + an IANA zone; the scheduler gets UTC
   milliseconds (`scheduleAt`). `scripts/plan-schedule.mjs` does the conversion with `Intl`, which knows DST.
2. **IANA names only**: `America/New_York`, `America/Los_Angeles`, `Europe/London`, `Europe/Berlin`, `Asia/Singapore`,
   `Asia/Tokyo`, `Australia/Sydney`, `Etc/UTC`. Never `EST`, `PST`, `CET` or fixed offsets like `+01:00` — they don't
   change with DST, so half the year they are wrong.
3. **Event times are UTC in copy** ("Office hours 19:00 UTC") with a local hint for the main audience. Members convert
   better from UTC than from someone else's local zone.
4. **The host clock must be right.** Check with `claudia doctor` ("Clock in sync with the server").

## Clock changes around now

| Date | Change | Effect |
|---|---|---|
| Sun 25 Oct 2026 | EU and UK fall back (BST→GMT, CEST→CET) | London–New York gap shrinks from 5 h to **4 h** for one week |
| Sun 1 Nov 2026 | US and Canada fall back (EDT→EST) | Gap back to 5 h |
| Sun 14 Mar 2027 | US springs forward | London–New York gap **4 h** for two weeks |
| Sun 28 Mar 2027 | EU and UK spring forward | Gap back to 5 h |
| Sun 4 Oct 2026 / Sun 4 Apr 2027 | Australia (Sydney) changes (on/off DST) | Sydney–London gap moves between 9 h and 11 h |
| — | Japan, Singapore, China, India, most of Africa, Arizona, Hawaii | No DST |

A calendar written as "14:00 London = 09:00 New York" is wrong for 26 Oct – 31 Oct 2026. If a post must hit both
cities' mornings, plan each in its own zone.

## Gaps and overlaps

- **Gap** (spring forward): local 01:00–01:59 in London on 28 Mar 2027 does not exist. The planner flags it and moves it
  one clock-change later (01:30 → 02:30 BST).
- **Overlap** (fall back): local 01:00–01:59 in London on 25 Oct 2026 happens twice. The planner uses the first and
  flags it. Avoid scheduling inside overlaps; quiet hours usually cover them anyway.

## Multi-region audiences: three patterns

| Audience | Pattern | Example |
|---|---|---|
| One region ≥ 60% | Schedule for it; let others catch posts later | Juno: 70% US → US windows only |
| Two balanced regions 4–6 h apart (UK + US East) | Overlap window (London afternoon = NY morning) for the main post; one extra post at each region's evening | Claudia: X main post 14:30 London; TikTok 19:00 New York |
| Regions 8+ h apart (US + Asia) | Split by day or by network; never one "compromise" slot at 03:00 for someone | Weekdays US evenings, weekends Asia evenings |

## Reading analytics in the right zone

- X analytics export timestamps in UTC; TikTok and Instagram show the account owner's device zone; YouTube Studio uses
  the channel's zone setting. Convert everything to the **audience's** main zone before bucketing by hour.
- "When your followers are online" charts (TikTok, Instagram) are drawn in the time zone of the device you read them
  on. Note which zone the phone was in before you copy the hours into a calendar.

## Quick conversions in Node (no packages)

```js
// One UTC instant shown in two zones (scripts/plan-schedule.mjs does the reverse: local → UTC)
const fmt = (ms, tz) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, dateStyle: "medium", timeStyle: "short" }).format(ms);
const at = Date.parse("2026-10-27T13:30:00Z");
console.log(fmt(at, "Europe/London"), "|", fmt(at, "America/New_York"));
// 27 Oct 2026, 13:30 | 27 Oct 2026, 09:30   ← 4 h apart this week
```
