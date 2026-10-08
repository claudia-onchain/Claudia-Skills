---
name: claudia-local-studio
description: Installs, configures, operates and extends Claudia Local, the desktop agent and creator studio that runs on 127.0.0.1:3939 with the person's own keys in an encrypted vault — chat with any OpenAI-compatible model, helper agents, memory, a sandboxed workspace, Generate (images, video, voice, music, avatars with cost estimates, approvals and caps), Socials (connections, composer previews, approvals queue, calendar, inbox, campaigns, kill switch), the Claudia tab (thread, paper trading, quotes, trades and launches the person confirms), and a local MCP server on 127.0.0.1:3940. Use when someone wants to run Claudia on their own computer, connect keys and socials, approve or schedule posts, set spending caps, expose the studio to Claude Code or Cursor over MCP, or add a provider, network, tool or campaign template to the code.
license: MIT
metadata:
  title: "Run and extend Claudia Local"
  category: "build"
  summary: "Set up Claudia Local's encrypted vault, studio, approvals and caps, expose its MCP, and extend it with your own providers and tools."
  level: "intermediate"
  tags: "claudia local, desktop, creator studio, vault, approvals, kill switch, local mcp, self-hosted"
  uses: "@useclaudia/sdk, @useclaudia/media, @useclaudia/social"
  time: "45 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Run and extend Claudia Local

Claudia Local is Claudia's workspace on the person's own computer: a small Node server and a dashboard at
`http://127.0.0.1:3939`. The outcome of this skill is a locked-by-default install with the person's own keys in an
encrypted vault, spending caps and an approvals queue that every generation and post passes through, an optional MCP
endpoint for their coding agents, and — if they want — their own changes to the code.

## When to use this

- "I want Claudia on my laptop with my own keys."
- Setting up Generate (media) and Socials (posting) with approvals, caps and a kill switch.
- Connecting X, Bluesky, Telegram, LinkedIn, YouTube… and registering redirect URIs.
- Letting Claude Code, Claude Desktop or Cursor draft posts and media through the studio's MCP.
- Adding a provider, chat preset, social network field, agent tool or campaign outline to the source.

For the hosted website flows see [claudia-platform-overview](../claudia-platform-overview/SKILL.md); for the npm
packages without the app, [media-pipelines](../media-pipelines/SKILL.md) and [social-publishing](../social-publishing/SKILL.md).

## What you need

- Node.js 20 or newer, git, a modern browser. macOS, Linux or Windows.
- A passphrase the person will remember (it is never stored and cannot be recovered).
- Their own keys: one chat provider (OpenRouter, xAI, Qwen, DeepSeek, Kimi, OpenAI, Anthropic, or any OpenAI-compatible
  server, including a local model), any media providers (Google, OpenAI, fal.ai, ElevenLabs, HeyGen, Runway, BytePlus)
  and social developer apps/tokens. They pay each provider directly; Claudia Local adds no markup.
- Optional: an external agent on useclaudia.xyz and the CLI's `~/.claudia` to import ([create-an-agent](../create-an-agent/SKILL.md)).

## Steps

### 1. Install and first run

```sh
git clone https://github.com/claudia-onchain/claudia-local.git
cd claudia-local
npm install && npm run build && npm start        # → http://127.0.0.1:3939
# or: ./start.sh   (installs/builds when needed, opens the browser)
# macOS app: npm run app:mac → ~/Applications/Claudia Local.app (unsigned: right-click → Open the first time)
```

Another port: `CLAUDIA_LOCAL_PORT=4000 npm start` (then register `http://127.0.0.1:4000/oauth/callback` wherever a
network asks for a loopback redirect). Separate data folder for testing: `CLAUDIA_LOCAL_HOME=/tmp/cl npm start`.

First run: choose the passphrase → optionally add a chat key → in. Data lives in `~/.claudia-local` (folder 0700,
files 0600). **Lock** (bottom left) drops the key from memory; Settings can set an auto-lock after N idle minutes
(default off — recommend 30).

### 2. Keys and chat model

Settings → **Keys and providers**: each row says what it's for and links to where to get the key. Use **Test (dry run)**
to see the exact request with secrets as `***`; **Send check** sends one read-only request where the provider has one.
The dashboard only ever shows "set" and the last four characters.

Settings → **Chat model**: pick a preset or **Other** (`https://…/v1`, or `http://localhost…` for a model on this
machine). Models without tool support can chat but can't use Files, Claudia or the studio. Claudia's persona never
names the model in replies.

### 3. Safety settings before anything else

Settings → **Safety** (write the choices into the person's notes):

| Setting | Default | Recommend |
|---|---|---|
| Media spending caps | $2 per job · $10 per day · $50 per month · approve above $0.50 | keep or lower until a week of real use |
| Agent/MCP media waits for approval | on | keep on |
| Thread posts need approval of the exact text | on | keep on |
| Kill switch (posting / drafts) | off / off | know where it is: top of Socials and Settings → Safety |
| Daily post caps per network | network defaults (X 10, LinkedIn 5, Bluesky 30, Telegram 50…) | lower for new accounts |
| Live trading | off | leave off unless the person explicitly wants it |
| SOL caps | 0.05 per trade · 0.2 per day | keep |

Spending numbers from Claudia Local 0.2 defaults (checked 2026-10).

### 4. Connect Claudia (optional)

Claudia → **Your agent**: import the CLI setup from `~/.claudia`, set up keys here (Claudia Local makes the device key
and agent wallet; the person registers them on useclaudia.xyz), or paste keys. All three secrets go into the vault.

- Reading (coins, thread, agents) needs no connection.
- Thread posts: the agent drafts, the person approves the exact text.
- **Paper trading** uses pretend money at Claudia's prices — good for testing an agent's ideas.
- Live trades and launches: only the person starts them, after a dry run (quote, signed locally, simulated on their RPC)
  and an explicit confirm within 60 seconds, inside the SOL caps. The agent can only `propose_trade`.
- Claudia coin tools only cover $CLAUDIA and coins launched on Claudia.

### 5. Generate

Generate → Image / Video / Speech and music / Avatar. Pick a model (from `@useclaudia/media`), add references (drag in,
library, or **Use Claudia's brand kit**), watch the live estimate (labelled exact / list price / estimate), then
**Dry run** or generate. Jobs above the approval line wait. Files land in `~/.claudia-local/media/library/YYYY-MM/` with
a provenance sidecar (prompt, model, provider, cost, watermark, terms, SHA-256). **Use in post** opens the composer.
Prompting: [../../create/image-prompting-fundamentals/SKILL.md](../../create/image-prompting-fundamentals/SKILL.md) and
[../../create/video-prompting/SKILL.md](../../create/video-prompting/SKILL.md).

### 6. Socials

1. **Connections**: each network shows its setup steps and the redirect URI to register in the person's own app:
   - `http://127.0.0.1:3939/oauth/callback` — X (exactly this), YouTube, TikTok, Mastodon.
   - `https://useclaudia.xyz/relay/oauth/callback` — LinkedIn, Instagram, Facebook, Threads, Pinterest (portals that
     refuse loopback). The relay only bounces the code back to 127.0.0.1 and stores nothing.
   Keep the app running while connecting; finish within 15 minutes.
2. **Composer**: write once, override per network; the right-hand preview is exactly what `@useclaudia/social` will
   send (labels added, counts, media, X cost, warnings, blocks such as price promises or banned brand phrases).
3. **Approvals**: everything from the person, the agent, MCP apps and campaigns lands here. Approve and publish,
   approve for the scheduled time, edit, dry-run or reject.
4. **Calendar**: due, approved posts publish every 30 seconds while the app is running **and unlocked**. A post missed by
   more than 10 minutes goes back to approval ("Posting late?").
5. **Inbox**: mentions, replies, DMs; reply after a confirm or send the reply to Approvals.
6. **Campaigns**: "Launch day" (−24 h, −1 h, launch, +3 h, +24 h) or "One week of posts"; planned by the chat model or a
   built-in outline; every draft and picture waits in Approvals.
7. **Stop all posting**: the kill switch; optionally also blocks the agent and MCP apps from drafting.

Network-by-network setup: [references/socials-setup.md](references/socials-setup.md).

### 7. Expose the studio over MCP (optional)

Settings → **Local MCP** → enable → make a token (shown once; only its SHA-256 is kept). Endpoint
`http://127.0.0.1:3940/mcp`, Streamable HTTP, bearer token. Tools: `generate_media`, `get_media_job`, `list_media`,
`draft_post`, `preview_post`, `list_posts`, `inbox`. No publish tool exists. The app must be running and unlocked.

```sh
claude mcp add --transport http claudia-local http://127.0.0.1:3940/mcp --header "Authorization: Bearer ${CLAUDIA_LOCAL_MCP_TOKEN}"
```

Cursor and Claude Desktop snippets: [templates/local-mcp-configs.md](templates/local-mcp-configs.md). This is separate
from Claudia's market-data MCP ([mcp-setup](../mcp-setup/SKILL.md)); many people add both.

### 8. Daily operation

Use [templates/operator-checklist.md](templates/operator-checklist.md): unlock, check Approvals and the calendar, glance
at Activity (model calls and tokens per day) and spending, lock when stepping away. Export the action log
(`~/.claudia-local/studio-log.jsonl`) together with the social audit log from Settings → Safety when reviewing a week.

### 9. Extend it

Plain JavaScript server (no build step) and a React dashboard. Extension points and code shapes:
[references/extending.md](references/extending.md). Development: `npm run dev` (dashboard hot reload on
`127.0.0.1:5173`, run the server too), `npm run check` (typecheck dashboard + syntax-check server). Try a modified
package build with `CLAUDIA_LOCAL_MEDIA_PKG=/path/to/media/dist/index.js` or `CLAUDIA_LOCAL_SOCIAL_PKG=…`.

## Templates

- [templates/operator-checklist.md](templates/operator-checklist.md) — first-run, daily and weekly checklists.
- [templates/local-mcp-configs.md](templates/local-mcp-configs.md) — Claude Code, Claude Desktop, Cursor, VS Code configs for the studio MCP.
- [templates/identity-addendum.md](templates/identity-addendum.md) — persona lines to append to `server/identity.md`.

A brand-kit tone guide to paste into Brand kit → Style (keeps campaigns and drafts in her voice):

```text
Voice: warm, confident, a little playful; plain words; short sentences. Talks like a cosy-city creator, not a trader.
Always: say what the numbers are and what they mean; label AI content; "not financial advice" when a coin comes up.
Never: price targets, "100x", "guaranteed", "to the moon", telling anyone to buy or sell, naming the AI model.
Look (for media prompts): late-twenties woman, glossy black jaw-length bob with heavy bangs and copper-red streaks,
small orange hair clip, gold hoops, light freckles, warm brown eyes, knowing half-smile; olive star-embroidered knit,
star pendant, red tartan mini skirt or black knits. Always an adult. Always labelled AI-generated.
```

## Check before you finish

- [ ] The app starts locked, unlocks with the passphrase, and auto-lock is set (or the person chose not to).
- [ ] Every key was added through Settings (vault), tested with a dry run, and none was pasted into chat.
- [ ] Media caps, approval line and per-network post caps match what the person agreed.
- [ ] Live trading is off unless the person switched it on knowingly; SOL caps are set.
- [ ] The person knows where the kill switch is and tried it once (on → a scheduled post doesn't go → off).
- [ ] Redirect URIs registered match the port; X uses exactly `http://127.0.0.1:<port>/oauth/callback`.
- [ ] If MCP is on: token stored in an env var or the client's secret store; the app is the only process on 3940.

## Pitfalls

- **Lost passphrase = lost vault.** Back up the agent wallet key offline (Claudia → Your agent → Back up wallet key) before funding it.
- **Closed app = no posting.** Scheduled posts only go out while the app runs and is unlocked; late ones return to approval.
- **Port changes break OAuth.** Changing `CLAUDIA_LOCAL_PORT` means re-registering the loopback URI for X/YouTube/TikTok/Mastodon.
- **Docs mismatch.** The website's Claudia Local section says data lives in `~/.claudia` (`CLAUDIA_HOME`); the app actually uses `~/.claudia-local` (`CLAUDIA_LOCAL_HOME`). The CLI uses `~/.claudia`; importing copies keys into the vault and leaves the CLI files as they are.
- **Malware and shared accounts** can read an unlocked app's memory; lock when stepping away.
- **AI label off**: possible per post, but networks expect it and most require it for realistic AI media — keep it on.
- **No shell, by design.** The agent's file tools only see `~/.claudia-local/workspace` (2 MB per file, 200 MB total); don't add a shell tool.

## Related skills

- [media-pipelines](../media-pipelines/SKILL.md) · [social-publishing](../social-publishing/SKILL.md) · [mcp-setup](../mcp-setup/SKILL.md)
- [create-an-agent](../create-an-agent/SKILL.md) · [agent-persona-and-system-prompt](../agent-persona-and-system-prompt/SKILL.md) · [wallet-and-key-security](../wallet-and-key-security/SKILL.md)
- [safe-trading](../safe-trading/SKILL.md) · [launch-a-coin](../launch-a-coin/SKILL.md) · [agent-ops-runbook](../agent-ops-runbook/SKILL.md)
- [../../create/claudia-character-bible/SKILL.md](../../create/claudia-character-bible/SKILL.md) · [../../grow/launch-campaigns/SKILL.md](../../grow/launch-campaigns/SKILL.md)

References in this skill:
- [references/security-model.md](references/security-model.md) — what the app protects and what it doesn't. Read before connecting money or socials.
- [references/socials-setup.md](references/socials-setup.md) — per-network apps, keys and redirect URIs. Read while connecting.
- [references/extending.md](references/extending.md) — where and how to add providers, tools, networks, pages. Read before changing code.
- Worked example: [examples/first-week.md](examples/first-week.md).
