---
name: pinterest-playbook
description: Runs Pinterest for an AI character or creator brand as a visual search engine. Covers keyword-led boards, Pinterest Trends, Pin specs (2:3 images, 4 s to 15 min video, 2–5 image carousels, 100-character titles, 800-character descriptions, 500-character alt text), the "AI modified" label and the API's ai_disclosures values, Pinterest's rule that automation must be approved and that the user chooses each Pin, the spam and get-rich-quick bans, Trial vs Standard API access, and approval-first pinning with @useclaudia/social. Use when someone wants to grow an AI character, fashion or art brand on Pinterest, plan boards and a pinning week, write Pin titles and descriptions, label AI Pins, or connect Pinterest posting to an agent without breaking Pinterest's automation rules.
license: MIT
metadata:
  title: "Pinterest playbook for AI characters"
  category: "grow"
  summary: "Grow an AI character on Pinterest: keyword boards, 2:3 Pins, AI-modified labels, and approve-each-Pin publishing."
  level: "intermediate"
  tags: "pinterest, boards, pins, visual search, keywords, trends, ai label, automation rules, fashion"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "1 h setup, 20 min a day"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Pinterest playbook for AI characters

Pinterest works more like a visual search engine than a feed: people come with a plan ("silver party outfit",
"cobalt photoshoot ideas") and save what fits it. That suits an AI character with a strong look. Every outfit, set and
palette can be a Pin someone searches for. This skill sets up keyword-led boards, makes Pins in Pinterest's specs,
labels them as AI, and publishes them one approved Pin at a time, because Pinterest's developer rules require it.

Facts here were read on Pinterest's own help, policy and developer pages and its published API description in October
2026 ("checked 2026-10"). Re-check [references/pinterest-specs-and-policies.md](references/pinterest-specs-and-policies.md)
every quarter.

## When to use this

- Growing an AI character's look (wardrobe, sets, palettes, art) as a searchable library of Pins.
- Driving traffic to a site, a lookbook or a shop from evergreen visual content.
- Planning boards, keywords and a pinning week, or writing Pin titles and descriptions.
- Connecting Pinterest to an agent's publishing flow without breaking the automation rules.

Not for: auto-pinning in bulk, repinning the same image across boards for reach, link schemes, buying saves or
followers, or promoting coins. Pinterest bans all of these.

## What you need

- A Pinterest **business** account for the character or brand, run by a real adult operator. Business accounts get
  analytics and Pinterest Trends.
- Images in 2:3 (1000 × 1500 px) and short vertical videos, made with the character bible
  ([claudia-character-bible](../../create/claudia-character-bible/SKILL.md)), with C2PA or IPTC metadata kept in the
  files.
- One posting route: your own Pinterest app (key name `pinterest`, app id and secret, redirect
  `https://useclaudia.xyz/relay/oauth/callback`) or a posting service you use (Buffer, Zernio or Upload-Post). Plus
  `social-vault`. Keys come from the environment or `claudia keys set`; never print them.
- `@useclaudia/social`, or `@useclaudia/cli` with `@useclaudia/social` installed.

## Steps

1. **Set up the account honestly.** Profile name: the character's name. About: `AI character by <team>. Glossy
   futurist outfits, studio sets and creator tools. Every image is AI-generated.` Website: the character's site.
   Read [references/pinterest-specs-and-policies.md](references/pinterest-specs-and-policies.md) before pinning:
   Pinterest's Community Guidelines say "Don't create or operate accounts that aren't authentic", and its policies
   apply to "all types of content, including synthetically generated content".

2. **Plan boards around searches.** Boards are topics people search, not moods. Make 6–10, each named with words
   people type: `Glossy futurist outfits`, `Silver foil photoshoot ideas`, `Cobalt blue studio sets`,
   `AI character design`, `Creator desk setups`. Write a one-line board description with the same words. Fill
   [templates/board-plan.csv](templates/board-plan.csv).

3. **Find keywords with Pinterest Trends.** In the business account: menu → Pinterest Trends (desktop or mobile
   browser, not the app). It shows top search, save and shopping trends for up to two years, seasonal Moments, and
   your audience's trends for the past 90 days. Pick 3–5 phrases per board and note when each one peaks. Plan seasonal
   Pins (party season, festival looks) a few weeks before the peak.

4. **Make Pins in Pinterest's specs.** Full table in the reference (checked 2026-10):

   | Pin | Spec | Use for |
   |---|---|---|
   | Image | PNG or JPEG, 2:3 (1000 × 1500), up to 20 MB | One look, one set, one palette |
   | Carousel | 2–5 images, 1:1 or 2:3, 20 MB each | A look from several angles, a before/after |
   | Video | MP4, MOV or M4V, 4 s to 15 min, up to 2 GB, between 1:2 and 1.91:1 (2:3, 4:5, 9:16 recommended) | 6–15 s outfit or set reveals |

   Taller than 2:3 may get cut off in feeds. Put any text overlay at the top, keep the character in the middle, and
   a small brand mark at the bottom.

5. **Write titles that match searches.** Title up to 100 characters, but only the first ~40 may show, so lead with
   the keyword: `Silver party outfit idea: liquid-silver gown and faux-fur stole`. Description up to 800 characters:
   what is in the image, two or three keyword phrases in natural sentences, and the AI statement. Descriptions don't
   show in the home or search feed but help Pinterest match the Pin. Alt text up to 500 characters, starting with
   "AI-generated image:". Templates in [templates/pin-copy-template.md](templates/pin-copy-template.md).

6. **Label AI the Pinterest way.** Pinterest shows an "AI modified" label on Pins it detects as AI (from IPTC
   metadata and its own classifiers) or that the owner says are AI. The API has an `ai_disclosures` field with two
   values: `AI_MODIFIED` and `SYNTHETIC_PERFORMER`. The package sets `AI_MODIFIED` when `labels.ai` is on (the
   default). Claudia is an AI-generated person, so also write `AI-generated character` in every description, and keep
   the generator's metadata in the file so Pinterest's own detection agrees.

7. **Connect Pinterest and preview.**

   ```sh
   npm i -g @useclaudia/cli @useclaudia/social
   claudia keys set pinterest           # JSON {"clientId":"<app id>","clientSecret":"<secret>"}
   claudia connect pinterest --boardId <default-board-id>
   claudia accounts
   claudia post pinterest "AI-generated character Claudia in a liquid-silver column gown and white faux-fur stole on a cobalt set. Silver party outfit idea." --media ./silver-night-2x3.jpg --alt "AI-generated image: Claudia, black bob with a peach-orange streak, liquid-silver gown, white faux-fur stole, cobalt blue backdrop." --dry-run
   ```

   New Pinterest apps start on **Trial** access: Pins are visible only to you until Pinterest grants Standard access.
   Test on Trial, then apply for Standard before relying on the schedule. Or connect a posting service
   (`claudia keys set buffer`, `claudia connect buffer`) and pass the board id it needs.

8. **Schedule one approved Pin at a time.** Pinterest's developer guidelines say scheduling tools must keep the
   user in control: "the end user must choose each Pin to be published." So every Pin is its own draft, previewed and
   approved by a person:

   ```ts
   import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

   const social = createSocial({ keys: chainKeys(envKeys()) }); // CLAUDIA_KEY_PINTEREST, CLAUDIA_KEY_SOCIAL_VAULT
   await social.ready();
   const pin = social.accounts().find((a) => a.network === "pinterest");
   if (!pin) throw new Error("Connect Pinterest first: claudia connect pinterest");

   const draft = social.draft({
     text: "AI-generated character Claudia in a holographic bell-sleeve mini dress, white patent platform boots and tiny orange oval sunglasses on a cobalt set. Futurist party outfit idea with a holographic dress.",
     media: [{ path: "./holo-2x3.jpg", alt: "AI-generated image: Claudia in a holographic bell-sleeve mini dress and tiny orange sunglasses, cobalt studio." }],
     link: "https://<your-site>/lookbook/holo",
     targets: [{ account: pin.id }],
     options: { pinterest: { boardId: "<board-id>", title: "Holographic party dress idea: futurist mini and orange shades" } },
     labels: { ai: true },
   });
   console.log(social.preview(draft.id));   // text, chars against 800, labelsAdded, warnings
   social.submit(draft.id);                  // a person reviews this one Pin
   // after they approve it:
   // social.approve(draft.id);
   // console.log(await social.publish(draft.id, { dryRun: true })); // the request: board, title, link, ai_disclosures
   // social.schedule(draft.id, Date.parse("2026-10-14T19:00:00Z")); // tick() every 30 s publishes it once
   ```

   Pace: the package caps Pinterest at 10 Pins per account per 24 hours; 1–3 fresh Pins a day is plenty. Each Pin is
   new: Pinterest's spam rules ban "repetitive" content, so don't re-upload the same image to five boards.

9. **Review weekly, decide monthly.** Weekly: impressions, saves, outbound clicks and new followers per board, and
   which keywords the top Pins used. Monthly: drop boards with no saves, make more Pins like the top 10%, and plan the
   next season from Trends. Log one experiment at a time with
   [growth-experiments](../growth-experiments/SKILL.md) (for example title keyword first vs character name first).

A worked month for Claudia's wardrobe boards, including a Trial-access surprise and a removed link, is in
[examples/claudia-wardrobe-boards.md](examples/claudia-wardrobe-boards.md).

## Templates

- [templates/pin-copy-template.md](templates/pin-copy-template.md): title, description and alt-text formulas with
  limits, plus eight filled Pins for Claudia's looks.
- [templates/board-plan.csv](templates/board-plan.csv): boards with keywords, Trends peak months and Pin targets.
- [templates/pinterest-weekly-plan.csv](templates/pinterest-weekly-plan.csv): a week of Pins with board, format,
  keyword, link, approval and review rows.

Quick fill-in for one Pin:

```text
BOARD: <board name> · KEYWORD: <phrase from Trends>
TITLE (≤ 100, keyword in the first 40): <…>
DESCRIPTION (≤ 800): <what's in it> + <2–3 keyword phrases in sentences> + "AI-generated character."
ALT (≤ 500): "AI-generated image: <scene>"
LINK: <https url that shows the same thing> · FORMAT: image 2:3 | carousel 2–5 | video 4 s–15 min
APPROVED BY: <name> · SLOT: <day time tz>
```

## Check before you finish

- [ ] Business account; About says AI character and who runs it.
- [ ] Every Pin was chosen and approved individually; no bulk auto-pinning.
- [ ] `ai_disclosures` set (package default), "AI-generated character" in the description, AI alt text, metadata kept.
- [ ] Titles lead with a real search phrase; descriptions within 800 characters; no keyword stuffing.
- [ ] Links go to pages that show what the Pin shows; no link shorteners or redirects that hide the destination.
- [ ] No duplicate uploads across boards; no bought saves or followers; no coin promotion or get-rich-quick content.
- [ ] Paid or gifted Pins say so in the description with `#ad` (`labels.ad`).
- [ ] The API app has Standard access before the schedule relies on it.

## Pitfalls

- **Scheduling on Trial access.** Pins publish but only you can see them. Check the app's access level first.
- **Mood-board names.** "vibes" and "aesthetic dump" match no searches. Name boards with words people type.
- **Square or landscape images.** 2:3 takes the most room; taller gets cut off.
- **Pinning the same image everywhere.** That is the "repetitive" content the spam rules describe. Make a new crop,
  angle or caption, or don't.
- **Links that don't match.** A Pin of an outfit that links to a token page is a misleading link. Keep coins and
  trading off Pinterest; its guidelines ban "get-rich-quick schemes", and crypto ads need pre-approval.
- **Dropping the metadata.** Re-encoding strips IPTC and C2PA; Pinterest uses them for its label. Export with
  metadata kept ([ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md)).
- **Expecting overnight results.** Pins are found through search over weeks. Judge boards monthly.

## Related skills

- [fashion-lookbooks](../../create/fashion-lookbooks/SKILL.md): producing the outfit images Pins are made from.
- [social-seo-and-hashtags](../social-seo-and-hashtags/SKILL.md): keyword research across platforms.
- [trend-research](../trend-research/SKILL.md): reading Trends next to other trend sources.
- [affiliate-and-ambassador-programs](../affiliate-and-ambassador-programs/SKILL.md): disclosed affiliate links.
- [posting-schedule](../posting-schedule/SKILL.md): slots, time zones and the `schedule()`/`tick()` loop.
- [social-publishing](../../build/social-publishing/SKILL.md): connectors, Trial access and posting services.
