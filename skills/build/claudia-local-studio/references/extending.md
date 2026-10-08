# Extending Claudia Local

Layout (version 0.2):

```
server/
  index.js              routes, guards, static files, WebSocket (live events)
  agent.js              chat agent: tool catalogue (TOOLS), helpers (HELPERS), approvals, turn loop
  identity.md           how the agent talks and what it may do (loaded at start)
  lib/providers.js      PROVIDERS (every key/provider) and CHAT_PRESETS
  lib/vault.js          encrypted secrets
  lib/model.js          OpenAI-compatible streaming chat client
  lib/studio-media.js   the only file that talks to @useclaudia/media
  lib/studio-social.js  the only file that talks to @useclaudia/social
  lib/studio.js         brand kit, approvals, kill switch, action log, uploads
  lib/studio-tools.js   STUDIO_TOOLS + runStudioTool (shared by the agent and the local MCP)
  lib/campaigns.js      TEMPLATES (campaign outlines) and the planner
  lib/mcp.js            the local MCP server (127.0.0.1:3940)
  lib/routes-studio.js  studio HTTP API, OAuth callback page
  lib/claudia.js        everything Claudia, through @useclaudia/sdk
dashboard/src/
  pages/Generate.tsx, pages/Socials.tsx + pages/socials/*, pages/BrandKit.tsx, pages/settings/*
  studio.ts, studio-ui.tsx
```

Always run `npm run check` after a change, and test with `CLAUDIA_LOCAL_HOME=/tmp/cl npm start` so a broken build never
touches the real vault.

## Add a key or provider — `server/lib/providers.js`

One entry in `PROVIDERS`; it appears in Settings and is readable through the KeyProvider by its `id`:

```js
{ id: "myprovider", group: "media", name: "My Provider", for: "What this key is used for, in one line.",
  docs: "https://myprovider.example/keys",
  fields: [F("key", "API key", { placeholder: "mp_…", pattern: /^mp_[A-Za-z0-9]{24,}$/ })],
  // optional: one read-only request that costs nothing, for "Send check" (secrets come from k(field))
  check: (k) => ({ method: "GET", url: "https://api.myprovider.example/v1/me", headers: { Authorization: `Bearer ${k("key")}` } }) },
```

Never add a `check` that spends money or writes data.

## Add a chat provider — `CHAT_PRESETS` (same file)

```js
{ id: "mygateway", name: "My gateway", baseUrl: "https://gateway.example/v1", key: "mygateway", usage: "openai", modelHint: "e.g. my-model-large" },
```

`key` must match a `PROVIDERS` id in group `chat`.

## Add a media model or provider

Lives in `@useclaudia/media`: a row in `src/models.ts` for a model, or a connector (`capabilities → estimate → submit →
poll → download`, see `src/providers/base.ts`) registered in `src/providers/index.ts`. Connectors use only `ctx.http`,
so dry runs and mocks work. Try it: `CLAUDIA_LOCAL_MEDIA_PKG=/path/to/media/dist/index.js npm start`.

## Add a social network

A connector in `@useclaudia/social` (`src/connectors/base.ts`; build every request through `ctx.http.request()` with a
`mock` answer so dry runs show each step; register in `src/connectors/index.ts`). Extra connect fields:
`CONNECT_PARAMS` in `dashboard/src/pages/socials/Connections.tsx`; per-post settings: `NET_OPTIONS` in `Composer.tsx`.
Try it: `CLAUDIA_LOCAL_SOCIAL_PKG=…`.

## Add an agent / MCP tool — `server/lib/studio-tools.js`

1. Add a definition to `STUDIO_TOOLS` (snake_case name, `group`, `label`, `title`, `description`, JSON Schema `input`,
   `annotations`, `scope`).
2. Add a `case` in `runStudioTool(name, args, { source })` returning `{ text, data }` (`text` is what the model reads;
   `data` becomes MCP `structuredContent`; set `isError: true` on failure). Return early when `!vault.isUnlocked()`.
3. `agent.js` picks it up (group "Studio") and the local MCP serves it; switch it in Skills.

Example — a read-only "spend report" tool:

```js
// in STUDIO_TOOLS
{ name: "spend_report", group: "Studio: media", label: "Spend report", title: "Media spend report",
  description: "Today's and this month's media spend per provider against the caps. Read-only.",
  input: obj({}), annotations: { readOnlyHint: true, openWorldHint: false }, scope: "media" },

// in runStudioTool's switch
case "spend_report": {
  const sp = (await M.media()).spend();
  const L = getConfig().studio.limits;
  const lines = Object.entries(sp.byProvider || {}).map(([p, v]) => `${p}: $${v.today.toFixed(2)} today · $${v.month.toFixed(2)} month`);
  return { text: [`Today $${sp.today.toFixed(2)} of $${L.perDayUsd} · month $${sp.month.toFixed(2)} of $${L.perMonthUsd}`, ...lines].join("\n"), data: { spend: sp, limits: L } };
}
```

Rules for new tools: no publishing, no real-money actions, no shell, no file access outside the workspace, no network
fetches to arbitrary URLs. Anything with side effects goes through Approvals.

## Add a campaign outline — `TEMPLATES` in `server/lib/campaigns.js`

Offsets are minutes from the campaign start; `{coin}` and `{goal}` are filled in; `media` is `null` or
`{ kind, prompt, aspect }`. Every planned post and picture still waits in Approvals.

```js
ama: { label: "AMA day", posts: [
  { at: -120, text: "AMA in two hours about {coin}: questions welcome. {goal}", media: null },
  { at: 0, text: "AMA about {coin} is starting now. Ask anything; no price talk, just how it works.", media: { kind: "image", prompt: "Claudia at a laptop with a butterfly sticker, warm lamp light, a small 'AMA' sign", aspect: "1:1" } },
  { at: 90, text: "Thanks for the questions about {coin}. A short summary of what came up is in the thread.", media: null },
] },
```

## Change how the agent talks — `server/identity.md`

Append rules rather than rewriting the safety lines (no real trades, drafts only, untrusted inbox data, no advice). See
[templates/identity-addendum.md](../templates/identity-addendum.md).

## Add a page

A component in `dashboard/src/pages/`, a route and a `NAV` entry in `App.tsx`, server routes in `server/index.js` or a
new `server/lib/routes-*.js` behind the same guards (session cookie, Host/Origin checks). Use the shared classes in
`styles.css` (`card`, `fields`, `btn`, `note`, `badge`, `seg`, `tabs`).
