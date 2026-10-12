# Pinterest specs, AI labels, policies and API

Read this before making Pins, before connecting any automation to Pinterest, and when a Pin is labelled, limited or
removed. Checked 2026-10 against help.pinterest.com, policy.pinterest.com, business.pinterest.com and Pinterest's
published API description (github.com/pinterest/api-description, v5.28.0).

## Pin specs (Pinterest product specs, checked 2026-10)

| Pin | Files | Size | Length | Ratio | Text |
|---|---|---|---|---|---|
| Standard image | PNG, JPEG | 20 MB on desktop, 32 MB in-app | — | 2:3 recommended (1000 × 1500); taller may be cut off | title ≤ 100 (first 40 likely shown; 30 for double-byte languages), description ≤ 800 |
| Standard video | MP4, MOV, M4V; H.264 or H.265 | up to 2 GB | 4 s to 15 min | no taller than 1:2, no wider than 1.91:1; 1:1, 2:3, 4:5, 9:16 recommended | same |
| Carousel | PNG, JPEG | 20 MB per image | 2–5 images | 1:1 or 2:3 | same |

Descriptions "don't appear in the home or search feed" but help Pinterest match the Pin to searches.

API field limits (PinCreate): `title` ≤ 100, `description` ≤ 800, `alt_text` ≤ 500, `link` ≤ 2,048. Media sources:
image URL or base64, multiple images, video by media id. `@useclaudia/social` Pinterest limits: 800 characters of text,
1–5 images or 1 video, options `boardId` and `title`, cap 10 Pins per account per 24 hours.

## AI labels

From Pinterest's "Gen AI labels" help article (checked 2026-10):

- Organic Pins: "you'll see an AI modified label in close-up at the bottom left after you click on the Pin."
- How Pinterest decides: it reads metadata against the IPTC standard, runs classifiers that "automatically detect Gen
  AI content, even if the content doesn't have obvious markers", and labels Pins where the content owner indicated the
  Pin was generated or modified with AI.
- Ads: the disclosure is behind the ellipsis menu and can say the Pin was modified with AI or contains an
  AI-generated person.
- Wrong label: contact Pinterest support to appeal.

API (`ai_disclosures` on PinCreate): an object with `values`, a list of `AI_MODIFIED` and/or `SYNTHETIC_PERFORMER`
("AI disclosure declarations the creator has made about the Pin"). The package sends `AI_MODIFIED` when `labels.ai`
is on. For an AI character, also say "AI-generated character" in the description.

## Community Guidelines (last updated May 2026, checked 2026-10)

Spam and authenticity:

- "Don't use automation that hasn't been explicitly approved by Pinterest."
- "Don't create or save content that is repetitive, deceptive, or irrelevant in an attempt to make money."
- "Don't link to websites that are unsafe, deceptive, untrustworthy, unoriginal, or that facilitate or encourage
  spam."
- "Don't create or operate accounts that aren't authentic."
- "Buying or selling engagement" is listed among unscrupulous tactics.
- "Don't attempt to make money from Pinners or Pinner web traffic in ways that are misleading."

Content:

- "Our policies apply to everyone and to all types of content, including synthetically generated content."
- The guidelines list "Fabricated or manipulated content (e.g. content generated with AI tools)" among the content
  they restrict when it misleads.
- "Exploitative financial practices including get-rich-quick schemes" are not allowed.

## Developer guidelines (policy.pinterest.com, checked 2026-10)

Not allowed:

- "Taking actions on behalf of end users without their specific knowledge and consent."
- "Offering features that enable end users to automatically initiate actions without specifically considering each
  action."
- For scheduling tools: "the end user must choose each Pin to be published."
- "Using your API access or developer tools to test Pinterest's rate limits" without permission.
- "Using any automated means or form of scraping or data extraction to access information from Pinterest."
- "Using any Pinterest Materials to train, fine-tune, or otherwise improve or develop any artificial intelligence."
- Storing information accessed through the API.

What this means for an agent: it may draft Pins and propose a schedule, but a person chooses and approves each Pin.
It must not scrape Pinterest for "inspiration", and nothing read from Pinterest may train a model.

## Ads (Advertising Guidelines, checked 2026-10)

- Prohibited: "All cryptocurrency products and services except those explicitly allowed" in the financial policy.
- Allowed with restrictions and Pinterest pre-approval: properly registered or licensed centralized exchanges, and
  registered wallets and storage services. Such ads "may not promise financial returns, predict the future value or
  prices of cryptocurrencies".

For an AI character: keep coins and trading off Pinterest, organic and paid.

## API access

- Scopes the package requests: `boards:read pins:read pins:write user_accounts:read`.
- Redirect: `https://useclaudia.xyz/relay/oauth/callback`. Connect with `params.boardId`, or pass
  `options.pinterest.boardId` per Pin.
- New apps start on Trial access: Pins are visible only to you until Pinterest grants Standard access (per the
  package docs; apply in the developer portal).

## Pinterest Trends (help, checked 2026-10)

- For business accounts; open it from the menu under "Analyze performance", in a desktop or mobile browser.
- Shows "a historic view (up to the last two years) of the top search, save, and shopping trends", keyword trends,
  shopping categories, seasonal Moments, and your audience's trends for the past 90 days (updated daily; hidden if the
  audience is too small). Some features are limited to certain regions.

## Creative guidance from Pinterest (ad best practices that also suit organic Pins)

- "Most people use Pinterest on mobile devices, so aim for a vertical 2:3 aspect ratio."
- "Your logo or brand name should be clearly visible", without overpowering the image.
- Main message at the top, supporting detail at the bottom, the visual in the middle.
- Represent the brand's own look; avoid generic lifestyle images that don't.

## Sources

- https://help.pinterest.com/en/business/article/pinterest-product-specs
- https://help.pinterest.com/en/article/gen-ai-labels
- https://help.pinterest.com/en/business/article/pinterest-trends
- https://policy.pinterest.com/en/community-guidelines
- https://policy.pinterest.com/en/developer-guidelines
- https://policy.pinterest.com/en/advertising-guidelines
- https://business.pinterest.com/creative-best-practices/
- https://github.com/pinterest/api-description (v5 OpenAPI: PinCreate, AiDisclosures)
- @useclaudia/social README, "Pinterest (v2, your own Pinterest app)" (checked 8 Oct 2026)
