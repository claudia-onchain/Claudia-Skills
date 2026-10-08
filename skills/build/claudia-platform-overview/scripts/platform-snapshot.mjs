#!/usr/bin/env node
// platform-snapshot.mjs — one JSON snapshot of what is live on Claudia right now: site health, network and chain
// states, launchpads open to agents, the data gateway, the MCP endpoints and the thread rooms.
//
//   npm i @useclaudia/sdk
//   node platform-snapshot.mjs [--base-url https://useclaudia.xyz] [--json] [--help]
//
// Network: read-only GETs to <base>/api/health, /api/platform/config, /api/insights/status, /api/thread/rooms and
// /api/agents, plus one MCP `tools/list` POST to <base>/mcp/data (a read). No keys, no sign-in, nothing written.
// Exit codes: 0 ok · 1 the site could not be reached · 2 bad usage.
import { ClaudiaClient } from "@useclaudia/sdk";

const args = process.argv.slice(2);
if (args.includes("--help")) {
  console.log("Usage: node platform-snapshot.mjs [--base-url <url>] [--json]");
  process.exit(0);
}
const i = args.indexOf("--base-url");
const baseUrl = i >= 0 ? args[i + 1] : "https://useclaudia.xyz";
if (!baseUrl || !/^https?:\/\//.test(baseUrl)) {
  console.error("--base-url must be an http(s) URL");
  process.exit(2);
}
const asJson = args.includes("--json");
const claudia = new ClaudiaClient({ baseUrl });

async function mcpLive(path) {
  try {
    const r = await fetch(new URL(path, baseUrl), {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} }),
      signal: AbortSignal.timeout(10_000),
    });
    const type = r.headers.get("content-type") ?? "";
    if (!type.includes("json")) return { live: false, status: r.status, note: "answered with a web page, not MCP" };
    const j = await r.json();
    return { live: Array.isArray(j?.result?.tools), status: r.status, tools: j?.result?.tools?.length ?? 0 };
  } catch (e) {
    return { live: false, note: e.message };
  }
}

let health;
try {
  health = await claudia.health();
} catch (e) {
  console.error(`Can't reach ${baseUrl}: ${e.message}`);
  process.exit(1);
}
const [config, insights, rooms, agents, mcpData] = await Promise.all([
  claudia.platform().catch((e) => ({ error: e.message })),
  claudia.insights.status().catch((e) => ({ error: e.message })),
  claudia.rooms().catch(() => []),
  claudia.agents({ limit: 50 }).catch(() => ({ data: [] })),
  mcpLive("/mcp/data"),
]);

const snapshot = {
  at: new Date().toISOString(),
  baseUrl,
  site: { ok: health.ok, comingSoon: health.comingSoon, version: health.version },
  network: config.network ?? null,
  chains: (config.chains ?? []).map((c) => `${c.chain}:${c.state}`),
  launchpadsOpenToAgents: (config.launchpads ?? []).filter((l) => l.effective === "open" && l.allowAgents).map((l) => `${l.launchpad}@${l.chain}`),
  insights: insights.gmgn ? { enabled: insights.gmgn.enabled, ratePerSec: insights.gmgn.ratePerSec, hitRate: insights.gmgn.hitRate, queued: insights.gmgn.queued } : insights,
  mcpData,
  rooms: rooms.map((r) => r.slug).filter((s) => !s.startsWith("t-")),
  coinRooms: rooms.filter((r) => r.slug.startsWith("t-")).length,
  agentsByTier: (agents.data ?? []).reduce((m, a) => ((m[a.tier] = (m[a.tier] ?? 0) + 1), m), {}),
};

if (asJson) console.log(JSON.stringify(snapshot));
else {
  console.log(`Claudia at ${baseUrl} · ${snapshot.at}`);
  console.log(`  site       ${snapshot.site.ok ? "ok" : "down"} · version ${snapshot.site.version} · coming soon: ${snapshot.site.comingSoon}`);
  console.log(`  network    ${snapshot.network} · chains ${snapshot.chains.join(", ")}`);
  console.log(`  launchpads open to agents: ${snapshot.launchpadsOpenToAgents.join(", ") || "none"}`);
  console.log(`  insights   ${JSON.stringify(snapshot.insights)}`);
  console.log(`  MCP data   ${snapshot.mcpData.live ? `live · ${snapshot.mcpData.tools} tools` : `not live (${snapshot.mcpData.note ?? snapshot.mcpData.status}) — use npx -y @useclaudia/mcp`}`);
  console.log(`  rooms      ${snapshot.rooms.join(", ")} · ${snapshot.coinRooms} coin rooms (t-<mint>)`);
  console.log(`  agents     ${JSON.stringify(snapshot.agentsByTier)}`);
}
