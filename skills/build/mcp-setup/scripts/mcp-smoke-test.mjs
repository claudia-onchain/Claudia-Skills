#!/usr/bin/env node
// mcp-smoke-test.mjs — is this URL a working Claudia MCP server? Lists its tools and optionally calls one read tool.
//
// Usage:
//   node mcp-smoke-test.mjs [url] [--call <tool>] [--args '<json>'] [--json] [--help]
//   node mcp-smoke-test.mjs https://useclaudia.xyz/mcp/data
//   node mcp-smoke-test.mjs http://127.0.0.1:3941/mcp --call get_coin_scores --args '{"coin":"claudia"}'
//
// Auth: if CLAUDIA_MCP_KEY is set it is sent as "Authorization: Bearer <key>" (never printed). Not needed for Data.
// Network: POSTs JSON-RPC (initialize, tools/list, optionally one tools/call) to the URL you give. Nothing else.
// Safety: refuses to call tools that are not read-only (anything outside the Data list below).
// Needs: Node >= 20 (global fetch). No packages.
// Exit codes: 0 ok · 1 server error · 2 bad usage · 3 refused (write tool) · 4 not an MCP endpoint.

const READ_TOOLS = new Set([
  "get_coin", "search_coins", "get_board", "get_trending", "get_coin_insights", "get_holders", "get_dev_profile",
  "get_coin_scores", "get_wallet", "get_feed", "get_candles", "read_thread", "list_agents", "get_agent", "get_my_portfolio",
  "quote", "get_trade_status", "get_media_job", "list_media", "preview_post", "list_posts",
]);

const argv = process.argv.slice(2);
const flag = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
if (argv.includes("--help") || argv.includes("-h")) {
  console.log("Usage: node mcp-smoke-test.mjs [url] [--call <tool>] [--args '<json>'] [--json]");
  process.exit(0);
}
const url = argv.find((a) => /^https?:\/\//.test(a)) ?? "https://useclaudia.xyz/mcp/data";
const callName = flag("--call");
const asJson = argv.includes("--json");
let callArgs = {};
try { callArgs = flag("--args") ? JSON.parse(flag("--args")) : {}; } catch { console.error("--args must be JSON"); process.exit(2); }
if (callName && !READ_TOOLS.has(callName)) {
  console.error(`Refusing to call "${callName}": this script only calls read-only tools.`);
  process.exit(3);
}

const VERSION = "2025-06-18"; // widely supported; the servers also accept 2026-07-28 stateless requests
const headers = { "content-type": "application/json", accept: "application/json, text/event-stream", "mcp-protocol-version": VERSION };
if (process.env.CLAUDIA_MCP_KEY) headers.authorization = `Bearer ${process.env.CLAUDIA_MCP_KEY}`;
let sessionId = null;
let id = 0;

class NotMcp extends Error {}

async function rpc(method, params = {}) {
  const h = { ...headers, ...(sessionId ? { "mcp-session-id": sessionId } : {}) };
  const res = await fetch(url, { method: "POST", headers: h, body: JSON.stringify({ jsonrpc: "2.0", id: ++id, method, params }), signal: AbortSignal.timeout(20_000) });
  const type = res.headers.get("content-type") ?? "";
  if (res.headers.get("mcp-session-id")) sessionId = res.headers.get("mcp-session-id");
  if (type.includes("text/html")) throw new NotMcp(`not an MCP endpoint (got ${type.split(";")[0]}, HTTP ${res.status}) — the server isn't live here; try the local server: npx -y @useclaudia/mcp --http 3941 --server data`);
  if (res.status === 401 || res.status === 403) {
    const www = res.headers.get("www-authenticate") ?? "";
    throw new Error(`HTTP ${res.status}: sign-in needed (${www.slice(0, 160) || "no challenge"}). Use OAuth in your app, or set CLAUDIA_MCP_KEY.`);
  }
  const text = await res.text();
  let msg;
  if (type.includes("text/event-stream")) {
    const data = text.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).filter(Boolean).pop();
    msg = data ? JSON.parse(data) : null;
  } else msg = text ? JSON.parse(text) : null;
  if (!msg) throw new Error(`HTTP ${res.status}: empty answer`);
  if (msg.error) throw new Error(`${method}: ${msg.error.message ?? JSON.stringify(msg.error)}`);
  return msg.result;
}

try {
  const init = await rpc("initialize", { protocolVersion: VERSION, capabilities: {}, clientInfo: { name: "claudia-skills-smoke-test", version: "1.0.0" } });
  const list = await rpc("tools/list");
  const tools = (list.tools ?? []).map((t) => ({ name: t.name, readOnly: !!t.annotations?.readOnlyHint }));
  let called = null;
  if (callName) {
    const r = await rpc("tools/call", { name: callName, arguments: callArgs });
    const text = (r.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join("\n");
    called = { tool: callName, isError: !!r.isError, text: text.slice(0, 1200) };
  }
  const out = { ok: true, url, server: init.serverInfo ?? null, protocolVersion: init.protocolVersion, toolCount: tools.length, tools, called };
  if (asJson) console.log(JSON.stringify(out));
  else {
    console.log(`✓ ${url}`);
    console.log(`  server   ${init.serverInfo?.name ?? "?"} ${init.serverInfo?.version ?? ""} · protocol ${init.protocolVersion}`);
    console.log(`  tools    ${tools.length}: ${tools.map((t) => t.name + (t.readOnly ? "" : "*")).join(", ")}`);
    console.log("           (* = not read-only: needs the person's approval in the app)");
    if (called) console.log(`\n  ${callName} → ${called.isError ? "error" : "ok"}\n${called.text.replace(/^/gm, "    ")}`);
  }
  process.exit(called?.isError ? 1 : 0);
} catch (e) {
  const notMcp = e instanceof NotMcp;
  if (asJson) console.log(JSON.stringify({ ok: false, url, error: notMcp ? "not_mcp" : "error", message: e.message }));
  else console.error(`✗ ${url}\n  ${e.message}`);
  process.exit(notMcp ? 4 : 1);
}
