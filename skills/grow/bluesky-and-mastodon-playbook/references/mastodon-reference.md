# Mastodon reference for agent accounts

Read this before choosing a server, when a toot fails for length or media, and when setting visibility, content
warnings or the bot flag. Checked 2026-10 against docs.joinmastodon.org, joinmastodon.org, the Mastodon release
notes and mastodon.social's live configuration.

## Choosing a server

Mastodon is many servers that talk to each other. The server is the account's landlord: its rules apply on top of
Mastodon's software limits, and its moderators decide whether a bot stays.

Checklist (copy into `templates/profile-setup.md` and fill it for each candidate):

1. **Rules:** read `https://<server>/about`. Does it allow automated accounts? AI-generated images? Does it require
   CWs for certain topics, or for all images of people? Example, mastodon.social (checked 2026-10): "Content created
   by others must be attributed, and use of generative AI must be disclosed" and "Sexually explicit or violent media
   must be marked as sensitive or with a content warning".
2. **Covenant:** servers listed on joinmastodon.org/servers commit to the Mastodon Server Covenant: active moderation
   against racism, sexism, homophobia and transphobia; daily backups; at least one other person with emergency
   access; at least 3 months' warning before shutting down.
3. **Limits:** `curl -s https://<server>/api/v2/instance` → `configuration.statuses.max_characters`,
   `media_attachments`, `polls`. Servers can raise the 500-character default.
4. **Topic and language:** a server about art, tech or your language gives a local timeline full of the right people.
5. **Your own server:** possible, and the cleanest home for a fleet of agents, but then you are the moderator.

Moving later: Preferences → Account → "Moving to a different account". Followers are moved automatically (where their
software supports it); posts are not moved. There is a 30-day cooldown on moves.

## Limits (Mastodon defaults; mastodon.social values, checked 2026-10)

| Item | Limit |
|---|---|
| Post | 500 characters; every URL counts as 23 |
| Attachments | 4 images, or 1 video or audio |
| Image file | 16 MB (16,777,216 bytes) |
| Video file | about 99 MB (103,809,024 bytes) |
| Alt text (media description) | 1,500 characters |
| Poll | up to 4 options, 50 characters each, open 5 minutes to about a month |
| Display name | 30 characters |
| Bio | 500 characters |
| Profile metadata | 4 label/value rows |
| Header | WEBP, PNG, GIF or JPG up to 2 MB, downscaled to 1500 × 500 |

`@useclaudia/social` limits for Mastodon: 500 characters, 4 images, video up to 40 MB, threads and replies yes, inbox
from mention notifications, default cap 30 posts per account per 24 hours, `Idempotency-Key` on every post.
Options: `visibility` (default `"public"`), `spoilerText` (the CW), `language`.

## API rate limits (docs, "Rate limits")

- Per account and per IP: 300 requests per 5 minutes, all endpoints.
- Media uploads: 30 per 30 minutes.
- Deleting statuses (or un-boosting): 30 per 30 minutes.

## Visibility

| Level | Public timelines and Explore | Followers' home feeds | Search |
|---|---|---|---|
| Public | yes | yes | yes, if the account opted into search |
| Quiet public (formerly "Unlisted"; API value `unlisted`) | no | yes | no |
| Followers | no | yes (and mentioned accounts) | no |
| Private mention | no | only mentioned accounts | no |

For a scheduled account: 1–2 public posts a day, the rest quiet public.

## Bot flag, discoverability, quotes

- **Bot account:** "Enabling the bot flag will add a bot icon to your profile. This icon will let others know that
  your profile may perform automated actions, or might not be monitored by a human." Mastodon treats it as a visual
  indication only. The package uses it as the AI label for Mastodon.
- **Profile directory:** opt-in listing that helps people browse profiles.
- **Search engine indexing:** opting out adds `noindex` to the public profile and posts.
- **Quote posts:** added in Mastodon 4.5 (November 2025), with a quote policy so authors decide who may quote them.
  Current releases are 4.7.x (October 2026).

## Content warnings (CW) etiquette

What the docs say: with a CW, "the status content will be collapsed by default, and only the Content Warning will be
shown, similarly to an email subject line or a 'read more' break." It can be used "to add a summary or subject for
your post, to collapse long posts, or to otherwise provide context". Adding a CW also marks attached media sensitive.

Norms differ per server; the server's rules win. A safe default for an AI character:

| Use a CW for | Example CW text |
|---|---|
| Anything the server's rules list | `CW: <their wording>` |
| Coin, token or market talk | `CW: crypto talk` |
| Long posts and threads | `CW: long, about agent posting costs` |
| Flashing or strobing video (club clips) | `CW: flashing lights` |
| Spoilers | `CW: spoilers, <show>` |

Don't put the whole joke in the CW, don't use CWs as clickbait, and keep them short and literal.

## Discovery without an algorithm

The home feed is in time order ("No algorithms or ads", joinmastodon.org). People find accounts through boosts,
hashtags they follow (hashtags "make your post discoverable to anyone searching for that hashtag"), the server's and
the fediverse's live feeds, Explore and trending, and the profile directory. Use 1–3 CamelCase hashtags per post.

## Sources

- https://docs.joinmastodon.org/user/posting/ · /user/profile/ · /user/moving/ · /user/preferences/
- https://docs.joinmastodon.org/api/rate-limits/
- https://docs.joinmastodon.org/methods/instance/
- https://joinmastodon.org/covenant and https://joinmastodon.org/
- https://mastodon.social/api/v1/instance/rules and https://mastodon.social/api/v2/instance (live, checked 2026-10)
- https://github.com/mastodon/mastodon/releases/tag/v4.5.0 (quote posts)
- @useclaudia/social README, "Mastodon" (checked 8 Oct 2026)
