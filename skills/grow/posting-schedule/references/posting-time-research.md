# Posting-time research (2026) and how to find your own windows

Read this when you choose starting windows for a new account, when someone quotes a "best time to post" study at you,
or when you have 4+ weeks of your own analytics and want to replace the generic windows. Checked 2026-10.

## What the big 2026 studies say

### Sprout Social, 2026 "best times to post"
- Data: ~2 billion engagements across ~307,000 profiles (Facebook, Instagram, LinkedIn, Pinterest, TikTok, X) from
  ~30,000 customers, 27 Nov 2025 – 27 Feb 2026. Times are shown in the profile's local time.
- Overall: 11:00–18:00, with Tuesday and Wednesday strongest on almost every network.
- Instagram: Tue and Wed, 11:00–13:00.
- TikTok: Tue and Thu, 14:00–17:00.
- X: Tue and Wed, 09:00–11:00.
- LinkedIn: Tue–Thu, 11:00–17:00.
- Source: https://sproutsocial.com/insights/best-times-to-post-on-social-media/

### Buffer, 2026 "best time to post"
- Data: ~52 million posts (9.6M Instagram, 14M Facebook, 7.1M TikTok, 4.8M LinkedIn, plus others).
- Headline: weekday mornings (Tue–Thu, ~09:00–12:00) for most networks, with **TikTok and YouTube peaking in the
  evening**, and Wednesday the best single day overall.
- Source: https://buffer.com/resources/best-time-to-post-on-social-media

### How to read them
- They measure **brand and business accounts** (Sprout and Buffer customers). Creator and entertainment audiences skew
  later in the day and to weekends; crypto-native audiences are global and active late evening US time.
- "Engagement" means likes, comments, shares per post in the window, not followers gained. For a growth goal use your
  own follows-per-post, not their engagement rate.
- The differences between adjacent hours are small (single-digit percent). The content effect is much larger.

## Platform behaviour that matters more than the hour

| Platform | Early signal that unlocks distribution (2026) | What it means for scheduling |
|---|---|---|
| X | Engagement in the first ~15 min; follows from a post and replies the author engages with rank highest (xai-org/x-algorithm, open-sourced Jan 2026) | Post when someone can reply for 30–60 min |
| TikTok | Watch time, completion, rewatches, shares in the first hour; then waves | Time matters less than retention; avoid uploads you can't monitor for comments |
| Instagram | Sends (DM shares) weigh ~3–5x likes for reach to non-followers (Mosseri, via SocialPilot 2026) | Post when your audience is chatting (lunch, evening) |
| YouTube Shorts | Small test audience first, then waves by swipe-away rate and completion | Shorts keep getting served for days; the hour matters little |
| Telegram | Every post is a push notification | Respect sleep hours; 1–3 a day |
| Discord | Announcement pings | Humans ping; don't ping outside waking hours |

## Finding your own windows (after 4–6 weeks)

1. Export post-level analytics for the last 28–42 days per platform: post time (convert to the audience's main zone),
   impressions/reach, engagements, follows (X shows follows from a post; TikTok shows followers gained per video).
2. Bucket by **hour-of-week** in 2-hour blocks (Tue 08–10, Tue 10–12, …). Ignore blocks with fewer than 3 posts.
3. For each block compute the **median** reach per post and the median follows per post. Median, because one viral
   post would otherwise make its hour look magic.
4. Keep the top 6–8 blocks per platform. Mark the bottom third.
5. Next month: 70% of posts in top blocks, 20% in untested blocks (exploration), 10% reactive. Drop blocks that are in
   the bottom third two months running.
6. Re-run monthly. Audiences shift with seasons, school terms and DST.

Spreadsheet formula sketch (Google Sheets), with columns `post_time_local` (A), `reach` (B):

```text
Block label:   =TEXT(A2,"ddd")&" "&TEXT(FLOOR(HOUR(A2),2),"00")&"–"&TEXT(FLOOR(HOUR(A2),2)+2,"00")
Median per block: =MEDIAN(FILTER(B:B, C:C = "Tue 08–10"))
```

## Multi-region audiences

- If one region is > 60% of the audience, schedule for it and accept weaker slots elsewhere.
- If two regions are balanced (UK + US East, a common split for Claudia), use overlap windows: 13:00–17:00 London =
  08:00–12:00 New York (except the week between the EU and US clock changes, see timezones-and-dst.md).
- For Asia + US, alternate days or run one post per region at each region's evening; don't squeeze both into one
  awkward slot.

## Myths to drop

- "Post at exactly :00." No platform rewards the top of the hour; it is just when everyone else's scheduler fires.
- "Post 15 times a day to beat the algorithm." X caps API posts per account in the Claudia package at 10, and its
  ranking rewards replies and follows, not volume.
- "Weekend is dead." For lifestyle and entertainment creators, Saturday and Sunday evenings are often top blocks.
  Check your own data.
