# Uploading Shorts with @useclaudia/social: setup, quotas, errors (checked 2026-10)

Read this when connecting YouTube for the first time, when an upload fails, or before automating more than a few uploads.

## One-time setup

1. Google Cloud Console → new project (one per operator; don't share projects between unrelated channels).
2. APIs & Services → enable **YouTube Data API v3**.
3. OAuth consent screen → External → add the channel owner's Google account as a **test user**.
4. Credentials → Create credentials → **OAuth client ID** → **Desktop app**. Desktop clients accept any
   `http://127.0.0.1:<port>` redirect, so nothing needs registering.
5. Store the client id + secret under the key name `youtube` (`claudia keys set youtube`, or `CLAUDIA_KEY_YOUTUBE` as
   `{"clientId":"…","clientSecret":"…"}`). Store a `social-vault` key (16+ random characters) so tokens can be sealed.
6. `claudia connect youtube` (or `social.connect("youtube")` + `waitForOAuthCallback(port)` + `completeOAuth`).

## What the package sends

- Resumable upload: `POST https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status`.
- `snippet`: `title` (≤ 100 chars, from `options.youtube.title` or the first line of the text), `description` (≤ 5,000
  bytes; `<` and `>` stripped), `categoryId` (default 22), `tags`, `defaultLanguage`.
- `status`: `privacyStatus` (default **private**), `selfDeclaredMadeForKids` (false unless `madeForKids`),
  `containsSyntheticMedia` (true when `labels.ai` is on — the default), `publishAt` when given.
- Returns `https://www.youtube.com/shorts/<id>` when `options.youtube.shorts` is set, else `https://youtu.be/<id>`.
- Dry run (`--dry-run` or `{ dryRun: true }`) prints the requests with the token replaced by `***`.

## Private-only until audited

Projects Google hasn't audited can only upload **private** videos (they're locked private even if you ask for public).
Two workable flows:

| Flow | How | When |
|---|---|---|
| Studio publish (recommended) | Agent uploads private → person reviews in Studio → sets Public or Schedule | Always works; doubles as the approval gate |
| API schedule | After passing the YouTube API Services audit: `privacyStatus: "private"` + `publishAt` (ISO time) | High volume, audited projects only |

`publishAt` only works on private videos; YouTube flips them public at that time.

## Quotas and caps

| Limit | Value |
|---|---|
| Uploads per project per day | 100 (own bucket since June 2026) |
| Daily quota units | 10,000 (comment reply 50 units, comment-thread read 1 unit) |
| `@useclaudia/social` cap | 5 YouTube posts per account per 24 h (`rules.caps`) |
| Refresh token in "Testing" apps | expires after 7 days → reconnect, or publish the consent screen |

## Errors you'll see

| code (ClaudiaSocialError) | Meaning | What to do |
|---|---|---|
| `needs_approval` | `publish()` on a draft or pending post | A person approves first |
| `blocked` | Cap, near-duplicate, promise phrase or kill switch | Read the reason; don't reword to sneak past |
| `expired` | Token rejected (7-day testing expiry) | `claudia connect youtube` again |
| `over_budget` / `rate_limited` | Quota exhausted | Wait for the daily reset (midnight Pacific) |
| `invalid` | Not a video file, wrong status | Check the file and the post status |
| `failed` + `uncertain: true` | Upload may have reached YouTube before a crash | Check Studio; if it is not there, `publish(id, { retryUncertain: true })` |

## Events worth wiring

```ts
social.on("post", (p) => p.status === "failed" && notify(`YouTube upload failed: ${p.results[0]?.error}`));
social.on("account", (e) => e.kind === "expiring" && notify(`Reconnect ${e.account.handle} soon`));
social.on("warning", (w) => console.warn(w.message));
```

## Sources

- `@useclaudia/social` README (YouTube setup, costs, rules) — https://useclaudia.xyz
- YouTube Data API, videos.insert — https://developers.google.com/youtube/v3/docs/videos/insert
- Resumable uploads — https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol
- API audit and quota extension — https://support.google.com/youtube/contact/yt_api_form
- `status.containsSyntheticMedia` — https://developers.google.com/youtube/v3/docs/videos#status.containsSyntheticMedia
