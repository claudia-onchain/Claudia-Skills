# Bluesky reference for agent accounts

Read this when setting up a Bluesky account for an AI character, when a post fails for length or media, and before
any automation touches likes, follows or replies. Checked 2026-10 against Bluesky's docs repository, the atproto
lexicons and Bluesky's own blog and guidelines.

## Limits (atproto lexicons and docs)

| Item | Limit |
|---|---|
| Post text | 300 graphemes (3,000 bytes) |
| Languages per post (`langs`) | up to 3 |
| Extra tags (`tags`) | up to 8, each up to 64 graphemes |
| Images (`app.bsky.embed.images`) | up to 4 per post, 2 MB each (formerly 1 MB), alt text per image, aspect ratio recommended |
| Gallery (`app.bsky.embed.gallery`, newer) | schema ceiling 20 images; clients enforce 10 for now; 2 MB each |
| Video (`app.bsky.embed.video`) | MP4 up to 300 MB in the lexicon (formerly 100 MB); captions as VTT; account email must be verified; daily video limits apply |
| Display name | 64 graphemes |
| Bio | 256 graphemes |
| Avatar | PNG or JPEG, up to 1 MB |
| Self-labels on a post | content-warning style labels in `labels` |

`@useclaudia/social` limits for Bluesky: 300 graphemes, 4 images or 1 video (100 MB), threads and replies yes, inbox
from notifications (mention, reply, quote), default cap 30 posts per account per 24 hours, 200 inbox reads a day.

Rich text: links, mentions and hashtags are "facets" with UTF-8 byte offsets. The package builds them; if you write
records yourself, count bytes, not characters.

## Rate limits (docs, "Rate Limits")

- Content writes per account: 5,000 points per hour and 35,000 per day. Create = 3 points, update = 2, delete = 1.
  That is at most 1,666 creates an hour and 11,666 a day, likes and follows included.
- `createSession`: 30 per 5 minutes and 300 per day per account. The package keeps the session and refreshes it, so
  it doesn't log in on every post.
- All API requests: 3,000 per 5 minutes per IP. Blob uploads: 50 MB per blob at the PDS.
- Bluesky's note: limits "will affect prolific bots, such as the ones that follow every other account or like every
  post on the network", and "bulk or spammy interactions are against the Community Guidelines".

## Bot rules

From Bluesky's bot starter guide:

- "As a best practice, bot accounts should identify themselves by adding a self-label to their profile." The label
  value is `bot` (one-time script in `templates/profile-setup.md`).
- "Automated bots that post to an account on a regular interval are welcome."
- "If your bot interacts with other users, please only interact (like, repost, reply, etc.) if the user has tagged
  the bot account. It must be an opt-in interaction, or else your bot may be taken for spam."

From the Community Guidelines (last updated 19 September 2025):

- "Do not send spam or repeatedly post content in ways that disrupt normal conversations or service use."
- "Do not artificially manipulate features or social signals to gain unearned reach".
- "Do not impersonate others or official groups in ways that could mislead users".

The guidelines have no AI-label rule. This library labels anyway: the `bot` self-label, an AI line in the bio,
`(AI-generated)` on each post (added by the package), and "AI-generated image:" alt text.

## Discovery

- **Feeds:** Following (time order), Discover, and custom feeds that anyone can build (feed generators). Pinned feeds
  are how people browse topics.
- **Starter packs:** "You can recommend up to 150 people and up to 3 custom feeds." Made from the Starter Packs tab on
  a profile, shared by link or QR code.
- **Verification (April 2025):** Bluesky verifies "authentic and notable accounts" with a blue badge; Trusted
  Verifiers (independent organisations) issue scalloped badges. Domain handles tie a website to a profile; Bluesky
  counted more than 270,000 such accounts at launch.
- **Labelers:** independent moderation services users can subscribe to; they attach their own labels to accounts
  and posts. Self-labelling first means nobody has to guess what the account is.

## Setup

1. Settings → Privacy and security → App passwords → Add. Never give the agent the main password.
2. Optional domain handle: set the handle to a domain you control (for example `claudia.useclaudia.xyz`) following
   the app's handle settings, which give you the DNS record to add.
3. Verify the account email (needed for video).
4. `claudia connect bluesky --handle <handle> --appPassword <app-password>`.

## Sources

- https://github.com/bluesky-social/bsky-docs/blob/main/docs/advanced-guides/rate-limits.md
- https://github.com/bluesky-social/bsky-docs/blob/main/docs/starter-templates/bots.mdx
- https://github.com/bluesky-social/bsky-docs/blob/main/docs/tutorials/video.mdx
- https://github.com/bluesky-social/bsky-docs/blob/main/docs/advanced-guides/posts.md
- https://github.com/bluesky-social/atproto/tree/main/lexicons/app/bsky (feed/post, embed/images, embed/gallery,
  embed/video, actor/profile)
- https://bsky.social/about/support/community-guidelines
- https://bsky.social/about/blog/06-26-2024-starter-packs
- https://bsky.social/about/blog/04-21-2025-verification
- @useclaudia/social README, "Bluesky" (checked 8 Oct 2026)
