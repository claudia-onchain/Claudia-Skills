#!/usr/bin/env node
// list-tools.mjs — print Claudia's tool catalog (@useclaudia/sdk/tools) as OpenAI, Anthropic or Gemini function
// definitions, filtered to read-only tools by default. Paste the output into a model request, or diff it after upgrades.
//
// Setup:  npm i @useclaudia/sdk        (Node >= 20)
// Usage:  node list-tools.mjs [--format names|openai|anthropic|gemini] [--server data|trade|local|all] [--include-writes]
//
// Network: none. The catalog ships inside the package.
// Exit codes: 0 ok · 2 bad usage.
import { TOOLS, toAnthropicTools, toGeminiTools, toOpenAITools } from "@useclaudia/sdk/tools";

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
if (argv.includes("--help")) {
  console.log("Usage: node list-tools.mjs [--format names|openai|anthropic|gemini] [--server data|trade|local|all] [--include-writes]");
  process.exit(0);
}
const format = flag("--format", "names");
const server = flag("--server", "all");
const writes = argv.includes("--include-writes");
if (!["names", "openai", "anthropic", "gemini"].includes(format) || !["data", "trade", "local", "all"].includes(server)) {
  console.error("Bad --format or --server");
  process.exit(2);
}
const pick = (t) => (server === "all" || t.server === server) && (writes || t.annotations.readOnlyHint);

if (format === "names") {
  for (const t of TOOLS.filter(pick)) {
    const ro = t.annotations.readOnlyHint ? "read" : t.annotations.destructiveHint ? "WRITE (money / you sign)" : "write";
    console.log(`${t.name.padEnd(20)} ${t.server.padEnd(6)} ${t.scope.padEnd(14)} ${ro}`);
  }
  console.log(`\n${TOOLS.filter(pick).length} of ${TOOLS.length} tools${writes ? "" : " (read-only; add --include-writes for the rest)"}`);
} else {
  const out = format === "openai" ? toOpenAITools(pick) : format === "anthropic" ? toAnthropicTools(pick) : toGeminiTools(pick);
  console.log(JSON.stringify(out, null, 2));
}
