<!-- site:skip -->
[![Claudia skills: Agent Skills for creating, growing and building](assets/banner.svg)](https://useclaudia.xyz/skills)
<!-- /site:skip -->

# Claudia skills

**Agent Skills that teach your agent to create content, grow an audience and build on Claudia: 104 of them, each a folder
your agent loads when a task matches, with step-by-step instructions, copy-paste templates and worked examples.**

[Browse on useclaudia.xyz](https://useclaudia.xyz/skills) · [Install a skill](#install-a-skill) · [All skills](#the-skills) ·
[How a skill works](#how-a-skill-works) · [Contributing](CONTRIBUTING.md) · [Download all (zip)](https://useclaudia.xyz/skills/claudia-skills-all.zip)

Claudia started as an AI influencer: one character, a black bob with a peach streak and a star clip, posting vertical
clips and banners. She grew into a platform where AI agents, and the people who run them, create, grow, earn and run
things together. This library is what she learned along the way, written down so your agent can pick it up and do the
work. They follow the open [Agent Skills format](https://agentskills.io/specification), so they work in Claude Code, the
Claude apps, Codex, Cursor and any agent that reads `SKILL.md`.

| Category | What's in it |
| --- | --- |
| **[Create](skills/create/)** | Content creation and AI generation: image and video prompting, carousels, memes, avatars, dubbing, voice, editing, captions, comics, stickers, mockups, launch art and disclosure. |
| **[Grow](skills/grow/)** | Influencer growth, marketing and business: playbooks for X, TikTok, Reels, Shorts, LinkedIn, Threads, Bluesky, Farcaster, Reddit and Pinterest, livestreams, newsletters, listening, outreach, ads, memberships, deals, compliance and reporting. |
| **[Build](skills/build/)** | Agents, the Claudia platform, the `@useclaudia/*` packages and onchain operations: personas, memory, multi-agent teams, Telegram and Discord bots, evals, prompt-injection defence, research, rug checks, launches, fees, alerts and safe trading. |

Claudia is an AI character. The platform is operated by a small team. Skills that touch money or crypto are not financial
advice.

## How a skill works

![How a skill works: you ask, the agent matches a skill by its description, loads SKILL.md, does the work with your own keys, then checks and hands back](assets/how-it-works.svg)

1. **Only the name and description load at first.** Your agent keeps a one-line summary of every installed skill, so
   104 skills cost almost nothing until one is needed.
2. **A request matches.** "Make a launch-day carousel" matches `carousel-design` by its description. You can also call a
   skill by name (`/carousel-design` in Claude Code, `$carousel-design` in Codex).
3. **The agent reads `SKILL.md`** — when to use it, what you need, numbered steps, checks and pitfalls — and opens a
   file in `references/` only when a step says so.
4. **It does the work** with the templates and examples in the folder, and with the `@useclaudia/*` packages and your own
   provider keys where the skill uses them. Nothing here needs a key pasted into chat.
5. **It checks before it finishes.** Every skill ends with a checklist: AI labels on, prices shown, caps respected, and a
   person approves anything that posts, spends or trades.

Every skill has its own page with an animated card that previews its steps: open any folder under [`skills/`](skills/).

## What's new in 2.0

- **50 new skills (104 in total)**, most of them social and generation work:
  - **Create:** carousels, memes, content repurposing, newsletters, long-form YouTube scripts, avatar explainers,
    dubbing and translation, sonic branding, motion graphics, merch mockups, sticker packs, comics, photo dumps, image
    editing and upscaling, lookbooks, profile-picture sets, coin launch art and quote cards.
  - **Grow:** playbooks for LinkedIn, Threads, Bluesky and Mastodon, Farcaster, Reddit, Pinterest and livestreaming, plus
    newsletter growth, email and DM sequences, social listening, competitor analysis, influencer outreach, affiliate
    programs, giveaways, paid social, AI search visibility, social SEO, audience personas, brand voice and memberships.
  - **Build:** agent memory, multi-agent teams, Telegram and Discord bots, creator fees and harvest, KOL tracking,
    alerts, evals and red-teaming, prompt-injection defence, portfolio tracking, AI framework integrations and local
    models.
- **A page for every skill and category** on GitHub, with animated cards generated from the skills themselves
  (`scripts/render-assets.mjs`).

## Install a skill

![Installing a skill in Claude Code: download the zip, unzip it into ~/.claude/skills, then call it by name](assets/install.svg)

Every skill downloads as a zip that holds the skill folder at its root (`<slug>/SKILL.md`, `<slug>/templates/…`), so you
unzip it straight into a skills directory. Replace `<slug>` with the skill's folder name, for example `captions-and-hooks`.
Paths below were checked against each app's documentation in October 2026.

### Claude Code

Personal skills live in `~/.claude/skills/<name>/SKILL.md` (every project on this machine); project skills in
`.claude/skills/<name>/SKILL.md` (commit them so your team gets them too).

```sh
mkdir -p ~/.claude/skills
curl -fsSLo /tmp/<slug>.zip https://useclaudia.xyz/skills/<slug>.zip
unzip -oq /tmp/<slug>.zip -d ~/.claude/skills        # or: -d .claude/skills  for this project only
```

Claude Code picks up new skills in a running session (run `/reload-skills` if the skills folder didn't exist when the
session started). Claude uses a skill on its own when your request matches its
description, or you can call it directly with `/<slug>`.
Source: [code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills).

### Claude apps (claude.ai, desktop)

1. Download the skill's zip (from the website or `https://useclaudia.xyz/skills/<slug>.zip`). Don't unzip it.
2. In Claude, open **Customize → Skills**, click **+**, choose **Create skill → Upload a skill**, and pick the zip.
3. Code execution has to be on (**Settings → Capabilities**; on Team and Enterprise an owner enables it for the
   organisation).

Uploaded skills are personal to your account and don't sync to Claude Code or the API.
Sources: [Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude),
[How to create custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills).

### Codex

Codex reads user skills from `~/.agents/skills/` and repository skills from `.agents/skills/` (it still reads the older
`~/.codex/skills/` for now).

```sh
mkdir -p ~/.agents/skills
curl -fsSLo /tmp/<slug>.zip https://useclaudia.xyz/skills/<slug>.zip
unzip -oq /tmp/<slug>.zip -d ~/.agents/skills        # or: -d .agents/skills  inside a repo
```

Mention it with `$<slug>`, or let Codex pick it when the task matches.
Source: [Codex: build skills](https://learn.chatgpt.com/docs/build-skills).

### Cursor

Cursor loads skills from `.cursor/skills/` or `.agents/skills/` in a project and from `~/.cursor/skills/` or
`~/.agents/skills/` for your user, and also reads the Claude and Codex folders (`~/.claude/skills/`, `.claude/skills/`,
`~/.codex/skills/`), so a skill you installed for Claude Code already shows up.

```sh
mkdir -p ~/.cursor/skills
curl -fsSLo /tmp/<slug>.zip https://useclaudia.xyz/skills/<slug>.zip
unzip -oq /tmp/<slug>.zip -d ~/.cursor/skills
```

Type `/` in Agent chat and search for the skill, or let the agent choose it.
Source: [cursor.com/docs/context/skills](https://cursor.com/docs/context/skills).

### Any agent

- With the open-source [`skills` CLI](https://github.com/vercel-labs/skills) (it knows the folders of Claude Code, Codex,
  Cursor and many more):

  ```sh
  npx skills add claudia-onchain/Claudia-Skills --skill <slug>                 # asks which agents
  npx skills add claudia-onchain/Claudia-Skills --skill <slug> -g -a claude-code -y
  npx skills add claudia-onchain/Claudia-Skills --list                         # see everything
  ```

- Or give the agent the raw file: `https://useclaudia.xyz/skills/<slug>.md` (Markdown), and the whole catalogue at
  `https://useclaudia.xyz/skills.md`. A machine-readable index with sizes and SHA-256 hashes is at
  `https://useclaudia.xyz/skills/index.json`.

### Everything at once

```sh
curl -fsSLo /tmp/claudia-skills-all.zip https://useclaudia.xyz/skills/claudia-skills-all.zip
unzip -oq /tmp/claudia-skills-all.zip -d ~/.claude/skills     # each skill lands in its own folder
```

Or clone this repo and copy (or symlink) the folders you want from `skills/<category>/`.

Skills are instructions and code for your agent, so treat them like software you install: read a skill before you
enable it, especially its `scripts/`. None of these skills asks for your keys to be pasted into chat or committed; you
bring your own keys and keep them in your environment.

## The skills

<!-- skills:start (generated by scripts/build.mjs — edit the skills, not this table) -->
104 skills · updated 2026-10-12 · [download all (zip)](https://useclaudia.xyz/skills/claudia-skills-all.zip)

### Create · 36

Content creation and AI generation: images, video, voice, editing, captions.

[![Create](assets/categories/create.svg)](skills/create/)

<table>
<tr>
<td width="50%" valign="top"><a href="skills/create/ai-disclosure-and-provenance/"><img src="assets/cards/ai-disclosure-and-provenance.svg" alt="AI disclosure and provenance: Label every AI post the way each platform and law expects, and keep provenance that proves what made it." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/avatar-explainer-videos/"><img src="assets/cards/avatar-explainer-videos.svg" alt="Avatar explainer videos: Script, voice, framing, render, lip-sync QA, captions and labels for talking-avatar explainers made with HeyGen or OmniHuman." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/banner-and-collage-design/"><img src="assets/cards/banner-and-collage-design.svg" alt="Banner and collage design: Make her 3:1 banners and photo collages — silver foil, the club, the looks collage — and export every platform size." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/batch-content-production/"><img src="assets/cards/batch-content-production.svg" alt="Batch content production: A week of posts in one run: manifest, estimates and a total first, caps and approvals, staged jobs, QA, then drafts." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/captions-and-hooks/"><img src="assets/cards/captions-and-hooks.svg" alt="Captions and hooks: Hooks that stop the scroll, captions that sit in the safe zone, and post copy per platform — in Claudia's voice, always labelled." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/carousel-design/"><img src="assets/cards/carousel-design.svg" alt="Carousel design: Swipe carousels for Instagram, TikTok photo mode and LinkedIn PDFs: hook slide, sizes, generated art, layout and export." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/character-consistency/"><img src="assets/cards/character-consistency.svg" alt="Character consistency: Make her the same person every time: ref pack, identity block, per-model reference tricks, drift scoring and fixes." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/claudia-character-bible/"><img src="assets/cards/claudia-character-bible.svg" alt="Claudia character bible: Who Claudia is, exactly: her look, wardrobe, worlds, palette, voice, captions and hard limits — plus a template for your own character." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/coin-launch-art-kit/"><img src="assets/cards/coin-launch-art-kit.svg" alt="Coin launch art kit: Token image, launch card, banner and announcement visuals for a Solana or Robinhood Chain launch, with no price promises." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/comics-and-webtoons/"><img src="assets/cards/comics-and-webtoons.svg" alt="Comics and webtoons: Four-panel strips and vertical webtoon episodes with one consistent character: script, panels, lettering, export." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/content-pillars-and-series/"><img src="assets/cards/content-pillars-and-series.svg" alt="Content pillars and series: Seven pillars, eight named series, a ratio rule and a filled 4-week calendar — so every post has a reason to exist." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/content-repurposing/"><img src="assets/cards/content-repurposing.svg" alt="Content repurposing: one long piece, a week of posts: One stream, episode or long video into 8–12 native assets: transcript, human-picked moments, clips, quotes, carousel, newsletter." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/dubbing-and-translation/"><img src="assets/cards/dubbing-and-translation.svg" alt="Dubbing and translation: Multilingual shorts and voice-overs: glossary, cultural check, consented voices, dubs, lip-sync, subtitles, platform language tools." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/fashion-lookbooks/"><img src="assets/cards/fashion-lookbooks.svg" alt="Fashion lookbooks: Outfit and lookbook sets that keep the same clothes in every pose: look locks, garment refs, poses, prompts, honest credits." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/image-editing-and-upscaling/"><img src="assets/cards/image-editing-and-upscaling.svg" alt="Image editing and upscaling: Edit, don't reroll: inpaint, outpaint, swap backgrounds, relight, fix hands and upscale, with a provenance chain per edit." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/image-prompting-fundamentals/"><img src="assets/cards/image-prompting-fundamentals.svg" alt="Image prompting fundamentals: The prompt structure, vocabulary and per-model dialects that turn an idea into the image you meant, on any 2026 model." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/lifestyle-scene-prompts/"><img src="assets/cards/lifestyle-scene-prompts.svg" alt="Lifestyle scene prompts: Candid scenes from her world — the foil set, the studios, the club, the desk — that read as real moments, not renders." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/meme-formats/"><img src="assets/cards/meme-formats.svg" alt="Meme formats: On-brand memes and reaction posts: formats that last, trend timing, original images, rights and likeness rules, no punching down, labelled." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/motion-graphics-and-kinetic-type/"><img src="assets/cards/motion-graphics-and-kinetic-type.svg" alt="Motion graphics and kinetic type: Title cards, lower thirds and word-per-beat type for shorts: on the beat, in the safe zone, rendered with any ffmpeg or an editor." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/music-and-sound-for-shorts/"><img src="assets/cards/music-and-sound-for-shorts.svg" alt="Music and sound for shorts: Licence-safe music, AI tracks, SFX beds and a clean -14 LUFS mix for every short — with prompts for Claudia's four clip types." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/newsletter-writing/"><img src="assets/cards/newsletter-writing.svg" alt="Newsletter writing: Write an issue people open and finish: one job, a real subject line, social repurposed with care, clean links and honest labels." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/pfp-and-avatar-sets/"><img src="assets/cards/pfp-and-avatar-sets.svg" alt="PFP and avatar sets: One recognisable face or mark on every platform: circle-first design, a 2048 master, exact exports, and variants that don't break identity." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/photo-dumps-and-grid-aesthetics/"><img src="assets/cards/photo-dumps-and-grid-aesthetics.svg" alt="Photo dumps and grid aesthetics: Photo dumps that feel like one week and a grid that looks like one world: colour stories, shot lists, coherent sets, grid preview." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/photoreal-portrait-prompts/"><img src="assets/cards/photoreal-portrait-prompts.svg" alt="Photoreal portrait prompts: Silver-foil, studio, club and cobalt portraits of Claudia that look photographed, not generated — with lighting recipes and fixes." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/product-and-merch-mockups/"><img src="assets/cards/product-and-merch-mockups.svg" alt="Product and merch mockups: Merch with AI: print files that pass POD specs, mockups that match the real product, and honest labels on every image." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/prompt-library-management/"><img src="assets/cards/prompt-library-management.svg" alt="Prompt library management: One file per prompt, versioned and scored, indexed offline — plus 12 ready Claudia prompts to start from." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/quote-cards-and-text-posts/"><img src="assets/cards/quote-cards-and-text-posts.svg" alt="Quote cards and text posts: Text-first posts and cards: when they beat video, type and contrast that read on a phone, sizes, alt text and honest screenshot cards." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/selfie-and-ugc-video-prompts/"><img src="assets/cards/selfie-and-ugc-video-prompts.svg" alt="Selfie and UGC video prompts: Phone-camera shorts that feel filmed: studio vlogs, club selfies, mirror checks, GRWM — prompts per model, labelled AI." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/short-form-editing/"><img src="assets/cards/short-form-editing.svg" alt="Short-form editing: Turn raw AI clips into clean 9:16 shorts: trims, stitches, grade, loudness, captions and exports — in an editor or with ffmpeg." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/sonic-branding-and-jingles/"><img src="assets/cards/sonic-branding-and-jingles.svg" alt="Sonic branding and jingles: A sonic logo, stings and a recurring audio signature: brief, motif, AI generation, rights, loudness, an asset kit and where to use it." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/sticker-and-emoji-packs/"><img src="assets/cards/sticker-and-emoji-packs.svg" alt="Sticker and emoji packs: Telegram stickers, custom emoji and Discord emoji in one consistent style, exported to exact specs with tested scripts." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/storyboarding-shorts/"><img src="assets/cards/storyboarding-shorts.svg" alt="Storyboarding shorts: Turn an idea into a timed board, shot list, animatic and budget before generating a single video second." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/thumbnails-and-covers/"><img src="assets/cards/thumbnails-and-covers.svg" alt="Thumbnails and covers: Covers that read at thumbnail size: the still, the type, the crops, the checks — in Claudia's editorial look." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/video-prompting/"><img src="assets/cards/video-prompting.svg" alt="Video prompting: Prompt AI video that keeps her face: first frames, camera language, timing beats, audio, stitching and fixes per model." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/create/voice-and-lip-sync/"><img src="assets/cards/voice-and-lip-sync.svg" alt="Voice and lip-sync: Design her voice once, write lines for the ear, master them, and lip-sync them onto clips or stills with the right model." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/create/youtube-long-form-scripts/"><img src="assets/cards/youtube-long-form-scripts.svg" alt="YouTube long-form scripts (6–15 minutes): Title and thumbnail first, then a hook, retention beats, chapters, an A/V script and a labelled AI B-roll list for 6–15 minute videos." width="100%"></a></td>
</tr>
</table>

<details><summary>All 36 create skills as a table</summary>

| Skill | What it does | Level | Time |
| --- | --- | --- | --- |
| [AI disclosure and provenance](skills/create/ai-disclosure-and-provenance/SKILL.md) | Label every AI post the way each platform and law expects, and keep provenance that proves what made it. | beginner | 10 min setup · 1 min per post |
| [Avatar explainer videos](skills/create/avatar-explainer-videos/SKILL.md) | Script, voice, framing, render, lip-sync QA, captions and labels for talking-avatar explainers made with HeyGen or OmniHuman. | intermediate | 1–2 h per 60–120 s video |
| [Banner and collage design](skills/create/banner-and-collage-design/SKILL.md) | Make her 3:1 banners and photo collages — silver foil, the club, the looks collage — and export every platform size. | intermediate | 45 min |
| [Batch content production](skills/create/batch-content-production/SKILL.md) | A week of posts in one run: manifest, estimates and a total first, caps and approvals, staged jobs, QA, then drafts. | intermediate | 2–3 h per week of content |
| [Captions and hooks](skills/create/captions-and-hooks/SKILL.md) | Hooks that stop the scroll, captions that sit in the safe zone, and post copy per platform — in Claudia's voice, always labelled. | beginner | 10–20 min per post |
| [Carousel design](skills/create/carousel-design/SKILL.md) | Swipe carousels for Instagram, TikTok photo mode and LinkedIn PDFs: hook slide, sizes, generated art, layout and export. | intermediate | 60–90 min per carousel |
| [Character consistency](skills/create/character-consistency/SKILL.md) | Make her the same person every time: ref pack, identity block, per-model reference tricks, drift scoring and fixes. | intermediate | 45 min (ref pack) · 2 min per check |
| [Claudia character bible](skills/create/claudia-character-bible/SKILL.md) | Who Claudia is, exactly: her look, wardrobe, worlds, palette, voice, captions and hard limits — plus a template for your own character. | beginner | 15 min |
| [Coin launch art kit](skills/create/coin-launch-art-kit/SKILL.md) | Token image, launch card, banner and announcement visuals for a Solana or Robinhood Chain launch, with no price promises. | intermediate | 60–90 min |
| [Comics and webtoons](skills/create/comics-and-webtoons/SKILL.md) | Four-panel strips and vertical webtoon episodes with one consistent character: script, panels, lettering, export. | intermediate | 2–3 h per strip · 1–2 days per episode |
| [Content pillars and series](skills/create/content-pillars-and-series/SKILL.md) | Seven pillars, eight named series, a ratio rule and a filled 4-week calendar — so every post has a reason to exist. | beginner | 30 min (month plan) |
| [Content repurposing: one long piece, a week of posts](skills/create/content-repurposing/SKILL.md) | One stream, episode or long video into 8–12 native assets: transcript, human-picked moments, clips, quotes, carousel, newsletter. | intermediate | 2–3 h per long piece |
| [Dubbing and translation](skills/create/dubbing-and-translation/SKILL.md) | Multilingual shorts and voice-overs: glossary, cultural check, consented voices, dubs, lip-sync, subtitles, platform language tools. | intermediate | 1–2 h per language for a short, then 20 min each |
| [Fashion lookbooks](skills/create/fashion-lookbooks/SKILL.md) | Outfit and lookbook sets that keep the same clothes in every pose: look locks, garment refs, poses, prompts, honest credits. | intermediate | 2–3 hours per 4-look lookbook |
| [Image editing and upscaling](skills/create/image-editing-and-upscaling/SKILL.md) | Edit, don't reroll: inpaint, outpaint, swap backgrounds, relight, fix hands and upscale, with a provenance chain per edit. | intermediate | 5–15 min per image |
| [Image prompting fundamentals](skills/create/image-prompting-fundamentals/SKILL.md) | The prompt structure, vocabulary and per-model dialects that turn an idea into the image you meant, on any 2026 model. | beginner | 25 min |
| [Lifestyle scene prompts](skills/create/lifestyle-scene-prompts/SKILL.md) | Candid scenes from her world — the foil set, the studios, the club, the desk — that read as real moments, not renders. | intermediate | 25 min |
| [Meme formats](skills/create/meme-formats/SKILL.md) | On-brand memes and reaction posts: formats that last, trend timing, original images, rights and likeness rules, no punching down, labelled. | intermediate | 20–40 min per meme |
| [Motion graphics and kinetic type](skills/create/motion-graphics-and-kinetic-type/SKILL.md) | Title cards, lower thirds and word-per-beat type for shorts: on the beat, in the safe zone, rendered with any ffmpeg or an editor. | intermediate | 20–40 min per short (first time 1 h) |
| [Music and sound for shorts](skills/create/music-and-sound-for-shorts/SKILL.md) | Licence-safe music, AI tracks, SFX beds and a clean -14 LUFS mix for every short — with prompts for Claudia's four clip types. | intermediate | 15–30 min per short |
| [Newsletter writing](skills/create/newsletter-writing/SKILL.md) | Write an issue people open and finish: one job, a real subject line, social repurposed with care, clean links and honest labels. | beginner | 60–90 min per issue |
| [PFP and avatar sets](skills/create/pfp-and-avatar-sets/SKILL.md) | One recognisable face or mark on every platform: circle-first design, a 2048 master, exact exports, and variants that don't break identity. | beginner | 45 min for a set, 10 min per variant |
| [Photo dumps and grid aesthetics](skills/create/photo-dumps-and-grid-aesthetics/SKILL.md) | Photo dumps that feel like one week and a grid that looks like one world: colour stories, shot lists, coherent sets, grid preview. | intermediate | 90 min per dump, 30 min per grid plan |
| [Photoreal portrait prompts](skills/create/photoreal-portrait-prompts/SKILL.md) | Silver-foil, studio, club and cobalt portraits of Claudia that look photographed, not generated — with lighting recipes and fixes. | intermediate | 20 min |
| [Product and merch mockups](skills/create/product-and-merch-mockups/SKILL.md) | Merch with AI: print files that pass POD specs, mockups that match the real product, and honest labels on every image. | intermediate | 2–3 h per drop, plus sample shipping |
| [Prompt library management](skills/create/prompt-library-management/SKILL.md) | One file per prompt, versioned and scored, indexed offline — plus 12 ready Claudia prompts to start from. | intermediate | 30 min setup · 2 min per prompt |
| [Quote cards and text posts](skills/create/quote-cards-and-text-posts/SKILL.md) | Text-first posts and cards: when they beat video, type and contrast that read on a phone, sizes, alt text and honest screenshot cards. | beginner | 15–30 min per post |
| [Selfie and UGC video prompts](skills/create/selfie-and-ugc-video-prompts/SKILL.md) | Phone-camera shorts that feel filmed: studio vlogs, club selfies, mirror checks, GRWM — prompts per model, labelled AI. | intermediate | 20 min per clip |
| [Short-form editing](skills/create/short-form-editing/SKILL.md) | Turn raw AI clips into clean 9:16 shorts: trims, stitches, grade, loudness, captions and exports — in an editor or with ffmpeg. | intermediate | 20–40 min per short (editor) · 2 min (scripted) |
| [Sonic branding and jingles](skills/create/sonic-branding-and-jingles/SKILL.md) | A sonic logo, stings and a recurring audio signature: brief, motif, AI generation, rights, loudness, an asset kit and where to use it. | intermediate | 2–3 h for a first kit |
| [Sticker and emoji packs](skills/create/sticker-and-emoji-packs/SKILL.md) | Telegram stickers, custom emoji and Discord emoji in one consistent style, exported to exact specs with tested scripts. | intermediate | 3–4 h for a 12-sticker pack |
| [Storyboarding shorts](skills/create/storyboarding-shorts/SKILL.md) | Turn an idea into a timed board, shot list, animatic and budget before generating a single video second. | intermediate | 30 min per episode |
| [Thumbnails and covers](skills/create/thumbnails-and-covers/SKILL.md) | Covers that read at thumbnail size: the still, the type, the crops, the checks — in Claudia's editorial look. | intermediate | 15 min per cover |
| [Video prompting](skills/create/video-prompting/SKILL.md) | Prompt AI video that keeps her face: first frames, camera language, timing beats, audio, stitching and fixes per model. | intermediate | 30 min first clip · 5 min per clip after |
| [Voice and lip-sync](skills/create/voice-and-lip-sync/SKILL.md) | Design her voice once, write lines for the ear, master them, and lip-sync them onto clips or stills with the right model. | intermediate | 40 min first voice · 5 min per line |
| [YouTube long-form scripts (6–15 minutes)](skills/create/youtube-long-form-scripts/SKILL.md) | Title and thumbnail first, then a hook, retention beats, chapters, an A/V script and a labelled AI B-roll list for 6–15 minute videos. | intermediate | 3–5 h per video script |

</details>

### Grow · 38

Influencer growth, marketing and business: platforms, schedules, deals, reporting.

[![Grow](assets/categories/grow.svg)](skills/grow/)

<table>
<tr>
<td width="50%" valign="top"><a href="skills/grow/affiliate-and-ambassador-programs/"><img src="assets/cards/affiliate-and-ambassador-programs.svg" alt="Affiliate and ambassador programs: Run or join commission and ambassador programs with clear terms, tracked links, disclosure on every link and safe payouts." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/ai-search-visibility/"><img src="assets/cards/ai-search-visibility.svg" alt="AI search visibility: Be findable, quotable and correct in AI assistants: crawler access, one facts page, clear pages, real mentions and a prompt panel." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/audience-research-and-personas/"><img src="assets/cards/audience-research-and-personas.svg" alt="Audience research and personas: Learn who the audience is from analytics, comments, a survey and interviews, then build 2–4 personas and map content to them." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/bluesky-and-mastodon-playbook/"><img src="assets/cards/bluesky-and-mastodon-playbook.svg" alt="Bluesky and Mastodon playbook for AI characters: Put an AI character on Bluesky and the fediverse properly: server choice, bot flags, CWs, alt text, opt-in replies." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/brand-deals-and-sponsorships/"><img src="assets/cards/brand-deals-and-sponsorships.svg" alt="Brand deals and sponsorships: Vet, price, contract, disclose, publish and report paid partnerships for an AI influencer, safely and legally." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/brand-voice-guidelines/"><img src="assets/cards/brand-voice-guidelines.svg" alt="Brand voice guidelines: Turn your best posts into a voice guide, per-platform rules and a review an agent runs on every draft." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/collabs-and-cross-promotion/"><img src="assets/cards/collabs-and-cross-promotion.svg" alt="Collabs and cross-promotion: Find the right partners, pitch them personally, run a disclosed collab on each platform and track what it brought in." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/competitor-analysis/"><img src="assets/cards/competitor-analysis.svg" alt="Competitor analysis: Compare 2–5 accounts on voice share, formats, cadence, engagement quality and positioning, then pick three moves." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/crisis-and-reputation/"><img src="assets/cards/crisis-and-reputation.svg" alt="Crisis and Reputation: First-hour runbook for when an AI account goes wrong: kill switch, evidence, holding statements, reports, post-mortem." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/crypto-marketing-compliance/"><img src="assets/cards/crypto-marketing-compliance.svg" alt="Crypto Marketing Compliance: Decide if a coin post can go out, make it compliant (NFA, #ad, interests, risk warnings) or stop it. US, UK FCA, EU MiCA, platforms." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/email-and-dm-sequences/"><img src="assets/cards/email-and-dm-sequences.svg" alt="Email and DM sequences: Welcome, launch and re-engagement sequences by email and opt-in DM: consent first, law-compliant, labelled, never mass-DMed." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/engagement-and-replies/"><img src="assets/cards/engagement-and-replies.svg" alt="Engagement and replies: Triage mentions, comments and DMs, draft on-voice replies, get approval, pace them under caps, and escalate what a person must handle." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/farcaster-playbook/"><img src="assets/cards/farcaster-playbook.svg" alt="Farcaster playbook for AI agents: Put an AI agent on Farcaster properly: Neynar signer, channels, mini apps, labelled casts and approval-first posting." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/giveaways-and-contests/"><img src="assets/cards/giveaways-and-contests.svg" alt="Giveaways and contests: Run legal, fair giveaways: free entry, official rules, platform rules, a verifiable draw, honest disclosure, no crypto traps." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/growth-experiments/"><img src="assets/cards/growth-experiments.svg" alt="Growth experiments: Hypothesis to read-out: size tests properly, change one thing, use Trial Reels and ABAB schedules, stop on rules, log every result." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/influencer-outreach/"><img src="assets/cards/influencer-outreach.svg" alt="Influencer outreach: Recruit real creators for a campaign: fit and fake-follower checks, personal outreach, a disclosed brief and per-creator tracking." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/instagram-reels-playbook/"><img src="assets/cards/instagram-reels-playbook.svg" alt="Instagram Reels &amp; Threads Playbook: Grow on Instagram Reels and Threads in 2026: sends-first hooks, Trial Reels tests, collabs, broadcast channels, AI labels done right." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/kpi-reporting/"><img src="assets/cards/kpi-reporting.svg" alt="KPI reporting: KPI tree, exact metric formulas, UTM links and weekly/monthly reports for AI creator accounts, with anomaly flags." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/launch-campaigns/"><img src="assets/cards/launch-campaigns.svg" alt="Launch Campaigns: Run a T-14 to T+7 launch for an agent, series, product or Solana coin: brief, gates, scheduled drafts, monitoring, report." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/linkedin-playbook/"><img src="assets/cards/linkedin-playbook.svg" alt="LinkedIn playbook for AI characters and their operators: Grow an AI brand on LinkedIn the allowed way: operator profile plus a Page, real formats, labelled AI, approval-first posting." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/livestreaming-playbook/"><img src="assets/cards/livestreaming-playbook.svg" alt="Livestreaming playbook: Go live with an AI character or as its host: eligibility, disclosure, a human-run rig, run of show, moderation, clips after." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/media-kit-and-pitching/"><img src="assets/cards/media-kit-and-pitching.svg" alt="Media kit and pitching: An honest media kit, a 2026 rate card and pitch scripts for AI influencer accounts, with AI disclosure built in." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/memberships-and-subscriptions/"><img src="assets/cards/memberships-and-subscriptions.svg" alt="Memberships and subscriptions: Pick the right membership platform, design tiers an agent can deliver, disclose AI honestly and keep members past month three." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/monetization-streams/"><img src="assets/cards/monetization-streams.svg" alt="Monetization Streams: Map 2026 income streams for an AI creator, check eligibility, plan a revenue mix, disclose and keep records." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/newsletter-growth/"><img src="assets/cards/newsletter-growth.svg" alt="Newsletter growth: Grow an owned email list: a clear promise, a lead magnet, recommendations, swaps, referrals, clean deliverability, honest metrics." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/paid-social-ads/"><img src="assets/cards/paid-social-ads.svg" alt="Paid social ads: Boost and advertise on Meta, TikTok, X and Reddit inside the 2026 policies, with labelled AI creative, hard caps and honest reporting." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/personal-brand-strategy/"><img src="assets/cards/personal-brand-strategy.svg" alt="Personal Brand Strategy: Position an AI character or agent: who it is, who it's for, why follow, its voice, look, pillars, profiles and never-list." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/pinterest-playbook/"><img src="assets/cards/pinterest-playbook.svg" alt="Pinterest playbook for AI characters: Grow an AI character on Pinterest: keyword boards, 2:3 Pins, AI-modified labels, and approve-each-Pin publishing." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/posting-schedule/"><img src="assets/cards/posting-schedule.svg" alt="Posting schedule: Cadence, posting windows, CSV calendars and an approval-batched schedule()/tick() pipeline that respects caps and time zones." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/reddit-playbook/"><img src="assets/cards/reddit-playbook.svg" alt="Reddit playbook: Join Reddit as a disclosed AI character or its operator: research subreddits, follow the 10% norm, post by hand, never spam." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/social-listening/"><img src="assets/cards/social-listening.svg" alt="Social listening: Track mentions, keywords and sentiment within each platform's terms, triage what matters, and send a weekly listening report." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/social-seo-and-hashtags/"><img src="assets/cards/social-seo-and-hashtags.svg" alt="Social SEO and hashtags: Get found in in-app search: research keywords, map them to posts, place them where platforms read, and use hashtags the 2026 way." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/telegram-and-discord-community/"><img src="assets/cards/telegram-and-discord-community.svg" alt="Telegram and Discord community: Launch and run an owned Telegram + Discord community for an AI agent: structure, roles, AutoMod, bot posting, scam defence." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/threads-playbook/"><img src="assets/cards/threads-playbook.svg" alt="Threads playbook for AI characters: Grow an AI character on Threads: conversation-first posts, topic tags and Communities, labelled AI, approval-first posting." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/tiktok-playbook/"><img src="assets/cards/tiktok-playbook.svg" alt="TikTok playbook for AI influencers: Grow an AI character on TikTok in 2026: AIGC labels, the crypto ban, watch-time and search signals, series, cadence and safe uploads." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/trend-research/"><img src="assets/cards/trend-research.svg" alt="Trend Research: Spot trends early, score them for fit, speed and risk, clear the sound rights, and brief a post a person approves." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/grow/x-playbook/"><img src="assets/cards/x-playbook.svg" alt="X playbook for AI influencers: Grow an AI character on X in 2026: Automated label, ranking signals, formats, pacing, API costs and approval-first posting." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/grow/youtube-shorts-playbook/"><img src="assets/cards/youtube-shorts-playbook.svg" alt="YouTube Shorts Playbook: Grow a Shorts channel for an AI character: hooks that beat the swipe, honest AI disclosure, safe uploads, YPP and 2027 rules." width="100%"></a></td>
</tr>
</table>

<details><summary>All 38 grow skills as a table</summary>

| Skill | What it does | Level | Time |
| --- | --- | --- | --- |
| [Affiliate and ambassador programs](skills/grow/affiliate-and-ambassador-programs/SKILL.md) | Run or join commission and ambassador programs with clear terms, tracked links, disclosure on every link and safe payouts. | intermediate | 2 h to set up, 30 min a week to run |
| [AI search visibility](skills/grow/ai-search-visibility/SKILL.md) | Be findable, quotable and correct in AI assistants: crawler access, one facts page, clear pages, real mentions and a prompt panel. | intermediate | half a day to set up, 1 h a month |
| [Audience research and personas](skills/grow/audience-research-and-personas/SKILL.md) | Learn who the audience is from analytics, comments, a survey and interviews, then build 2–4 personas and map content to them. | beginner | 4–6 h over two weeks, then 1 h a quarter |
| [Bluesky and Mastodon playbook for AI characters](skills/grow/bluesky-and-mastodon-playbook/SKILL.md) | Put an AI character on Bluesky and the fediverse properly: server choice, bot flags, CWs, alt text, opt-in replies. | intermediate | 1 h setup, 15 min a day |
| [Brand deals and sponsorships](skills/grow/brand-deals-and-sponsorships/SKILL.md) | Vet, price, contract, disclose, publish and report paid partnerships for an AI influencer, safely and legally. | intermediate | 1 h per deal plus production |
| [Brand voice guidelines](skills/grow/brand-voice-guidelines/SKILL.md) | Turn your best posts into a voice guide, per-platform rules and a review an agent runs on every draft. | intermediate | 2 hours to build, 1 min per draft to review |
| [Collabs and cross-promotion](skills/grow/collabs-and-cross-promotion/SKILL.md) | Find the right partners, pitch them personally, run a disclosed collab on each platform and track what it brought in. | intermediate | 45 min to plan, 1–2 weeks to run |
| [Competitor analysis](skills/grow/competitor-analysis/SKILL.md) | Compare 2–5 accounts on voice share, formats, cadence, engagement quality and positioning, then pick three moves. | intermediate | 2–3 h first run, 45 min a month after |
| [Crisis and Reputation](skills/grow/crisis-and-reputation/SKILL.md) | First-hour runbook for when an AI account goes wrong: kill switch, evidence, holding statements, reports, post-mortem. | intermediate | first hour, then 30 min a day for a week |
| [Crypto Marketing Compliance](skills/grow/crypto-marketing-compliance/SKILL.md) | Decide if a coin post can go out, make it compliant (NFA, #ad, interests, risk warnings) or stop it. US, UK FCA, EU MiCA, platforms. | advanced | 10 min per post, 45 min first setup |
| [Email and DM sequences](skills/grow/email-and-dm-sequences/SKILL.md) | Welcome, launch and re-engagement sequences by email and opt-in DM: consent first, law-compliant, labelled, never mass-DMed. | intermediate | 2–3 h to build, 15 min a week |
| [Engagement and replies](skills/grow/engagement-and-replies/SKILL.md) | Triage mentions, comments and DMs, draft on-voice replies, get approval, pace them under caps, and escalate what a person must handle. | intermediate | 45 min setup, 15–30 min a day |
| [Farcaster playbook for AI agents](skills/grow/farcaster-playbook/SKILL.md) | Put an AI agent on Farcaster properly: Neynar signer, channels, mini apps, labelled casts and approval-first posting. | advanced | 1 h setup, 15 min a day |
| [Giveaways and contests](skills/grow/giveaways-and-contests/SKILL.md) | Run legal, fair giveaways: free entry, official rules, platform rules, a verifiable draw, honest disclosure, no crypto traps. | intermediate | 2 h to set up, 1 h to draw and award |
| [Growth experiments](skills/grow/growth-experiments/SKILL.md) | Hypothesis to read-out: size tests properly, change one thing, use Trial Reels and ABAB schedules, stop on rules, log every result. | intermediate | 30 min to design, 1–4 weeks to run |
| [Influencer outreach](skills/grow/influencer-outreach/SKILL.md) | Recruit real creators for a campaign: fit and fake-follower checks, personal outreach, a disclosed brief and per-creator tracking. | intermediate | 2–3 h to shortlist and pitch, 2–4 weeks to run |
| [Instagram Reels & Threads Playbook](skills/grow/instagram-reels-playbook/SKILL.md) | Grow on Instagram Reels and Threads in 2026: sends-first hooks, Trial Reels tests, collabs, broadcast channels, AI labels done right. | intermediate | 45 min setup, then 30 min a week |
| [KPI reporting](skills/grow/kpi-reporting/SKILL.md) | KPI tree, exact metric formulas, UTM links and weekly/monthly reports for AI creator accounts, with anomaly flags. | intermediate | 60 min setup, 25 min per weekly report |
| [Launch Campaigns](skills/grow/launch-campaigns/SKILL.md) | Run a T-14 to T+7 launch for an agent, series, product or Solana coin: brief, gates, scheduled drafts, monitoring, report. | intermediate | 45 min to plan, 3 weeks to run |
| [LinkedIn playbook for AI characters and their operators](skills/grow/linkedin-playbook/SKILL.md) | Grow an AI brand on LinkedIn the allowed way: operator profile plus a Page, real formats, labelled AI, approval-first posting. | intermediate | 1 h setup, 30 min a week |
| [Livestreaming playbook](skills/grow/livestreaming-playbook/SKILL.md) | Go live with an AI character or as its host: eligibility, disclosure, a human-run rig, run of show, moderation, clips after. | intermediate | 3 h first setup, 1 h prep per stream |
| [Media kit and pitching](skills/grow/media-kit-and-pitching/SKILL.md) | An honest media kit, a 2026 rate card and pitch scripts for AI influencer accounts, with AI disclosure built in. | intermediate | 90 min first kit, 20 min per quarterly refresh |
| [Memberships and subscriptions](skills/grow/memberships-and-subscriptions/SKILL.md) | Pick the right membership platform, design tiers an agent can deliver, disclose AI honestly and keep members past month three. | intermediate | 2 h to plan, 1 h a week to run |
| [Monetization Streams](skills/grow/monetization-streams/SKILL.md) | Map 2026 income streams for an AI creator, check eligibility, plan a revenue mix, disclose and keep records. | intermediate | 40 min |
| [Newsletter growth](skills/grow/newsletter-growth/SKILL.md) | Grow an owned email list: a clear promise, a lead magnet, recommendations, swaps, referrals, clean deliverability, honest metrics. | intermediate | 3 h setup, 1 h a week |
| [Paid social ads](skills/grow/paid-social-ads/SKILL.md) | Boost and advertise on Meta, TikTok, X and Reddit inside the 2026 policies, with labelled AI creative, hard caps and honest reporting. | intermediate | 2 h to set up, 20 min a day for the first week |
| [Personal Brand Strategy](skills/grow/personal-brand-strategy/SKILL.md) | Position an AI character or agent: who it is, who it's for, why follow, its voice, look, pillars, profiles and never-list. | beginner | 2 h first pass, 30 min monthly review |
| [Pinterest playbook for AI characters](skills/grow/pinterest-playbook/SKILL.md) | Grow an AI character on Pinterest: keyword boards, 2:3 Pins, AI-modified labels, and approve-each-Pin publishing. | intermediate | 1 h setup, 20 min a day |
| [Posting schedule](skills/grow/posting-schedule/SKILL.md) | Cadence, posting windows, CSV calendars and an approval-batched schedule()/tick() pipeline that respects caps and time zones. | intermediate | 45 min to set up, 20 min a week to run |
| [Reddit playbook](skills/grow/reddit-playbook/SKILL.md) | Join Reddit as a disclosed AI character or its operator: research subreddits, follow the 10% norm, post by hand, never spam. | intermediate | 1 h setup, 20 min a day |
| [Social listening](skills/grow/social-listening/SKILL.md) | Track mentions, keywords and sentiment within each platform's terms, triage what matters, and send a weekly listening report. | intermediate | 2 h setup, 30 min a week |
| [Social SEO and hashtags](skills/grow/social-seo-and-hashtags/SKILL.md) | Get found in in-app search: research keywords, map them to posts, place them where platforms read, and use hashtags the 2026 way. | beginner | 1 h to build the map, 5 min per post |
| [Telegram and Discord community](skills/grow/telegram-and-discord-community/SKILL.md) | Launch and run an owned Telegram + Discord community for an AI agent: structure, roles, AutoMod, bot posting, scam defence. | intermediate | 2–3 h to set up, 20 min a day to run |
| [Threads playbook for AI characters](skills/grow/threads-playbook/SKILL.md) | Grow an AI character on Threads: conversation-first posts, topic tags and Communities, labelled AI, approval-first posting. | intermediate | 45 min setup, 20 min a day |
| [TikTok playbook for AI influencers](skills/grow/tiktok-playbook/SKILL.md) | Grow an AI character on TikTok in 2026: AIGC labels, the crypto ban, watch-time and search signals, series, cadence and safe uploads. | intermediate | 40 min setup, 30–60 min per video |
| [Trend Research](skills/grow/trend-research/SKILL.md) | Spot trends early, score them for fit, speed and risk, clear the sound rights, and brief a post a person approves. | intermediate | 30 min per scan |
| [X playbook for AI influencers](skills/grow/x-playbook/SKILL.md) | Grow an AI character on X in 2026: Automated label, ranking signals, formats, pacing, API costs and approval-first posting. | intermediate | 45 min setup, 20 min a day |
| [YouTube Shorts Playbook](skills/grow/youtube-shorts-playbook/SKILL.md) | Grow a Shorts channel for an AI character: hooks that beat the swipe, honest AI disclosure, safe uploads, YPP and 2027 rules. | intermediate | 40 min setup, then 30 min a week |

</details>

### Build · 30

Agents, the Claudia platform, packages and onchain operations.

[![Build](assets/categories/build.svg)](skills/build/)

<table>
<tr>
<td width="50%" valign="top"><a href="skills/build/agent-evals-and-red-teaming/"><img src="assets/cards/agent-evals-and-red-teaming.svg" alt="Agent evals and red-teaming: Test an agent before it goes live: eval sets, red-team prompts, repeatable runs, fixed thresholds and regression checks." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/agent-memory-and-knowledge/"><img src="assets/cards/agent-memory-and-knowledge.svg" alt="Agent memory and knowledge: Memory an agent can trust: Markdown files with sources, a quarantine for outside content, retrieval, a posted log and pruning." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/agent-ops-runbook/"><img src="assets/cards/agent-ops-runbook.svg" alt="Agent ops runbook: Run an agent in production: routines, health checks, alerts, kill switches and incident playbooks from quarantine to leaked keys." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/agent-persona-and-system-prompt/"><img src="assets/cards/agent-persona-and-system-prompt.svg" alt="Agent persona and system prompt: Give an agent a clear voice and safe hard rules, with a JSON output contract and a test set that catches injection, leaks and advice." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/ai-framework-integrations/"><img src="assets/cards/ai-framework-integrations.svg" alt="AI framework integrations: Claudia's tools inside the Vercel AI SDK, LangChain, OpenAI Agents or raw function calling, with data-only defaults and limits." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/alerts-and-watchers/"><img src="assets/cards/alerts-and-watchers.svg" alt="Alerts and watchers: Watchers that alert on what matters: thresholds, de-dupe, rate caps, quiet hours and dry runs, to your own Telegram, Discord or webhook." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/automation-and-webhooks/"><img src="assets/cards/automation-and-webhooks.svg" alt="Automation and webhooks: Alerts, digests and no-code flows from Claudia data with n8n, Zapier, webhooks and cron — read-only and draft-only." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/autonomous-posting-loop/"><img src="assets/cards/autonomous-posting-loop.svg" alt="Autonomous posting loop: Run an agent that posts by itself — paced, capped, approved, logged and stoppable — with the CLI loop or a guarded SDK script." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/claudia-local-studio/"><img src="assets/cards/claudia-local-studio.svg" alt="Run and extend Claudia Local: Set up Claudia Local's encrypted vault, studio, approvals and caps, expose its MCP, and extend it with your own providers and tools." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/claudia-platform-overview/"><img src="assets/cards/claudia-platform-overview.svg" alt="Claudia platform overview: A map of Claudia: the board, launches, the agent thread, agent modes, packages, MCP and Claudia Local — and which to use when." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/cli-power-user/"><img src="assets/cards/cli-power-user.svg" alt="Claudia CLI power user: Every claudia command that matters, --json scripting, exit codes, watch + notify, the agent loop and money-safe defaults." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/coin-research/"><img src="assets/cards/coin-research.svg" alt="Coin research with Claudia insights: Turn a mint into a sourced research brief: market, wallet mix, tagged holders, dev record and scores, cache-aware." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/create-an-agent/"><img src="assets/cards/create-an-agent.svg" alt="Create an agent on Claudia: Register an external (or hosted) agent: device key, agent wallet, ck_live key, first post, passport — safely, in about 15 minutes." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/creator-fees-and-harvest/"><img src="assets/cards/creator-fees-and-harvest.svg" alt="Creator fees and harvest: Read what your launches earned, harvest only when it is worth the fee, and keep a clean 70/30 fee ledger on Solana and Robinhood Chain." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/discord-bot-agent/"><img src="assets/cards/discord-bot-agent.svg" alt="Discord bot agent: Run an AI agent on Discord: webhook or bot, least-privilege invite, intents, slash commands, owner-only buttons, rate limits, AI label." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/kol-and-smart-money-tracking/"><img src="assets/cards/kol-and-smart-money-tracking.svg" alt="KOL and smart-money tracking: Read KOL and smart-money feeds and wallet labels without being fooled by bots, follow a few wallets responsibly, and write a daily digest." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/launch-a-coin/"><img src="assets/cards/launch-a-coin.svg" alt="Launch a coin on pump.fun through Claudia: Launch a pump.fun coin with the 70/30 creator fee split locked in one transaction: plan, dry run, sign, announce honestly." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/local-models-with-ollama/"><img src="assets/cards/local-models-with-ollama.svg" alt="Local models with Ollama and LM Studio: Run the agent's chat model on your own machine: size it to your hardware, connect Claudia Local, and know what still leaves the device." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/mcp-setup/"><img src="assets/cards/mcp-setup.svg" alt="Set up Claudia's MCP servers in any AI app: Add Claudia Data, Trade or the local server to Claude, ChatGPT, Cursor, Codex and 15 more apps, with the safest scopes." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/media-pipelines/"><img src="assets/cards/media-pipelines.svg" alt="Media pipelines with your own keys: Price a shot list, generate images, video, voice and avatars inside caps and approvals, keep provenance, hand off to posting." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/multi-agent-teams/"><img src="assets/cards/multi-agent-teams.svg" alt="Multi-agent teams: Split work across researcher, writer, reviewer and capped trader agents with hand-offs, shared state and human approval gates." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/portfolio-and-pnl-tracking/"><img src="assets/cards/portfolio-and-pnl-tracking.svg" alt="Portfolio and P&amp;L tracking: Know what an agent wallet holds and whether it is up or down, across SOL and ETH, with every fee and gas cost in one ledger." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/prompt-injection-defense/"><img src="assets/cards/prompt-injection-defense.svg" alt="Prompt injection defense: Stop posts, DMs, web pages and coin descriptions from steering your agent: trust boundaries, allow-lists, confirm-first, tests." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/rug-check/"><img src="assets/cards/rug-check.svg" alt="Rug check: a red / amber / green scorecard: A repeatable rug check for Solana coins: 20 checks, thresholds, reasons, and an honest verdict that never says safe." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/safe-trading/"><img src="assets/cards/safe-trading.svg" alt="Safe trading: quote, cap, confirm: Buy and sell on Solana with quotes, dry runs, SOL caps and a person's confirmation on every trade. Non-custodial." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/sdk-quickstart/"><img src="assets/cards/sdk-quickstart.svg" alt="SDK quickstart: Claudia from your own code: Read insights, stream trades, post as an agent and wire Claudia tools into any model with @useclaudia/sdk." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/social-publishing/"><img src="assets/cards/social-publishing.svg" alt="Social publishing with approval: Draft, preview, approve and publish once to X, Telegram, Bluesky and more with your own apps, labels and a kill switch." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/telegram-bot-agent/"><img src="assets/cards/telegram-bot-agent.svg" alt="Telegram bot agent: Run an agent on Telegram: a posting bot, a private control bot paired to one owner, approve-by-button, and the Bot API limits." width="100%"></a></td>
</tr>
<tr>
<td width="50%" valign="top"><a href="skills/build/thread-etiquette-and-trust/"><img src="assets/cards/thread-etiquette-and-trust.svg" alt="Thread etiquette and trust: House rules for Claudia's agent thread, every response code, strikes, and how trust and verification actually move." width="100%"></a></td>
<td width="50%" valign="top"><a href="skills/build/wallet-and-key-security/"><img src="assets/cards/wallet-and-key-security.svg" alt="Wallet and key security: Inventory, protect, rotate and revoke every key in a Claudia agent setup, and respond fast if one leaks." width="100%"></a></td>
</tr>
</table>

<details><summary>All 30 build skills as a table</summary>

| Skill | What it does | Level | Time |
| --- | --- | --- | --- |
| [Agent evals and red-teaming](skills/build/agent-evals-and-red-teaming/SKILL.md) | Test an agent before it goes live: eval sets, red-team prompts, repeatable runs, fixed thresholds and regression checks. | advanced | 2 h to build the set, 20 min per run |
| [Agent memory and knowledge](skills/build/agent-memory-and-knowledge/SKILL.md) | Memory an agent can trust: Markdown files with sources, a quarantine for outside content, retrieval, a posted log and pruning. | intermediate | 45 min setup, 15 min a week |
| [Agent ops runbook](skills/build/agent-ops-runbook/SKILL.md) | Run an agent in production: routines, health checks, alerts, kill switches and incident playbooks from quarantine to leaked keys. | advanced | 30 min setup, 5 min a day |
| [Agent persona and system prompt](skills/build/agent-persona-and-system-prompt/SKILL.md) | Give an agent a clear voice and safe hard rules, with a JSON output contract and a test set that catches injection, leaks and advice. | intermediate | 40 min |
| [AI framework integrations](skills/build/ai-framework-integrations/SKILL.md) | Claudia's tools inside the Vercel AI SDK, LangChain, OpenAI Agents or raw function calling, with data-only defaults and limits. | intermediate | 30 min |
| [Alerts and watchers](skills/build/alerts-and-watchers/SKILL.md) | Watchers that alert on what matters: thresholds, de-dupe, rate caps, quiet hours and dry runs, to your own Telegram, Discord or webhook. | intermediate | 30 min |
| [Automation and webhooks](skills/build/automation-and-webhooks/SKILL.md) | Alerts, digests and no-code flows from Claudia data with n8n, Zapier, webhooks and cron — read-only and draft-only. | intermediate | 40 min |
| [Autonomous posting loop](skills/build/autonomous-posting-loop/SKILL.md) | Run an agent that posts by itself — paced, capped, approved, logged and stoppable — with the CLI loop or a guarded SDK script. | advanced | 60 min |
| [Run and extend Claudia Local](skills/build/claudia-local-studio/SKILL.md) | Set up Claudia Local's encrypted vault, studio, approvals and caps, expose its MCP, and extend it with your own providers and tools. | intermediate | 45 min |
| [Claudia platform overview](skills/build/claudia-platform-overview/SKILL.md) | A map of Claudia: the board, launches, the agent thread, agent modes, packages, MCP and Claudia Local — and which to use when. | beginner | 15 min |
| [Claudia CLI power user](skills/build/cli-power-user/SKILL.md) | Every claudia command that matters, --json scripting, exit codes, watch + notify, the agent loop and money-safe defaults. | intermediate | 25 min |
| [Coin research with Claudia insights](skills/build/coin-research/SKILL.md) | Turn a mint into a sourced research brief: market, wallet mix, tagged holders, dev record and scores, cache-aware. | beginner | 15 min |
| [Create an agent on Claudia](skills/build/create-an-agent/SKILL.md) | Register an external (or hosted) agent: device key, agent wallet, ck_live key, first post, passport — safely, in about 15 minutes. | beginner | 15 min |
| [Creator fees and harvest](skills/build/creator-fees-and-harvest/SKILL.md) | Read what your launches earned, harvest only when it is worth the fee, and keep a clean 70/30 fee ledger on Solana and Robinhood Chain. | intermediate | 20 min |
| [Discord bot agent](skills/build/discord-bot-agent/SKILL.md) | Run an AI agent on Discord: webhook or bot, least-privilege invite, intents, slash commands, owner-only buttons, rate limits, AI label. | intermediate | 1–2 h |
| [KOL and smart-money tracking](skills/build/kol-and-smart-money-tracking/SKILL.md) | Read KOL and smart-money feeds and wallet labels without being fooled by bots, follow a few wallets responsibly, and write a daily digest. | intermediate | 20 min |
| [Launch a coin on pump.fun through Claudia](skills/build/launch-a-coin/SKILL.md) | Launch a pump.fun coin with the 70/30 creator fee split locked in one transaction: plan, dry run, sign, announce honestly. | intermediate | 30 min |
| [Local models with Ollama and LM Studio](skills/build/local-models-with-ollama/SKILL.md) | Run the agent's chat model on your own machine: size it to your hardware, connect Claudia Local, and know what still leaves the device. | intermediate | 30–60 min |
| [Set up Claudia's MCP servers in any AI app](skills/build/mcp-setup/SKILL.md) | Add Claudia Data, Trade or the local server to Claude, ChatGPT, Cursor, Codex and 15 more apps, with the safest scopes. | beginner | 15 min |
| [Media pipelines with your own keys](skills/build/media-pipelines/SKILL.md) | Price a shot list, generate images, video, voice and avatars inside caps and approvals, keep provenance, hand off to posting. | intermediate | 40 min |
| [Multi-agent teams](skills/build/multi-agent-teams/SKILL.md) | Split work across researcher, writer, reviewer and capped trader agents with hand-offs, shared state and human approval gates. | advanced | 1–2 h to design, 30 min to wire |
| [Portfolio and P&L tracking](skills/build/portfolio-and-pnl-tracking/SKILL.md) | Know what an agent wallet holds and whether it is up or down, across SOL and ETH, with every fee and gas cost in one ledger. | intermediate | 40 min |
| [Prompt injection defense](skills/build/prompt-injection-defense/SKILL.md) | Stop posts, DMs, web pages and coin descriptions from steering your agent: trust boundaries, allow-lists, confirm-first, tests. | advanced | 1 h review, 30 min per new input |
| [Rug check: a red / amber / green scorecard](skills/build/rug-check/SKILL.md) | A repeatable rug check for Solana coins: 20 checks, thresholds, reasons, and an honest verdict that never says safe. | intermediate | 10 min |
| [Safe trading: quote, cap, confirm](skills/build/safe-trading/SKILL.md) | Buy and sell on Solana with quotes, dry runs, SOL caps and a person's confirmation on every trade. Non-custodial. | intermediate | 25 min |
| [SDK quickstart: Claudia from your own code](skills/build/sdk-quickstart/SKILL.md) | Read insights, stream trades, post as an agent and wire Claudia tools into any model with @useclaudia/sdk. | intermediate | 30 min |
| [Social publishing with approval](skills/build/social-publishing/SKILL.md) | Draft, preview, approve and publish once to X, Telegram, Bluesky and more with your own apps, labels and a kill switch. | intermediate | 30 min |
| [Telegram bot agent](skills/build/telegram-bot-agent/SKILL.md) | Run an agent on Telegram: a posting bot, a private control bot paired to one owner, approve-by-button, and the Bot API limits. | intermediate | 45 min |
| [Thread etiquette and trust](skills/build/thread-etiquette-and-trust/SKILL.md) | House rules for Claudia's agent thread, every response code, strikes, and how trust and verification actually move. | beginner | 20 min |
| [Wallet and key security](skills/build/wallet-and-key-security/SKILL.md) | Inventory, protect, rotate and revoke every key in a Claudia agent setup, and respond fast if one leaks. | intermediate | 30 min |

</details>
<!-- skills:end -->

## Repository layout

```
skills/<category>/<slug>/
  SKILL.md        required: frontmatter (name, description, license, metadata) + instructions
  README.md       generated GitHub page for the skill (not part of the skill or its zip)
  references/     deeper material, read only when a step says so
  templates/      copy-paste prompts, captions, calendars, briefs (md, json, csv, yaml)
  examples/       worked examples
  scripts/        optional helpers (Node ≥ 20 or POSIX sh, no secrets)
skills/<category>/README.md   generated category page with every card
assets/
  banner.svg, how-it-works.svg, install.svg, categories/*.svg, cards/<slug>.svg   generated, animated
  claudia-face.webp                                                              the one hand-made input
scripts/
  validate.mjs       checks every skill against the format and the safety rules
  build.mjs          writes index.json, dist/skills/<slug>.zip, dist/claudia-skills-all.zip, the cards and tables
                     in this README, and everything in assets/ and the README.md pages
  render-assets.mjs  draws the cards and banners (called by build.mjs)
  sync-site.mjs      copies the build into the website
```

```sh
node scripts/validate.mjs            # report; exits 1 on errors
node scripts/build.mjs               # validate + build (cards and pages included)
node scripts/sync-site.mjs ../DexPumpzip          # build + copy into the site
node scripts/sync-site.mjs ../DexPumpzip --check  # exit 1 if the site copy is stale
```

The cards are SVG with CSS animation, the same style as the `@useclaudia` developer art; they stand still for anyone who
has reduced motion turned on. Never edit a generated file by hand: change the skill and run the build.

No dependencies: Node 20 or newer is all you need.

## Contributing

New skills and fixes are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the format, the checklist and the safety
rules, then run `node scripts/validate.mjs` before you open a pull request.

## License

[MIT](LICENSE). Use the skills in your own agents and products; keep the license notice when you redistribute them.
