#!/usr/bin/env node
// register-commands.mjs — register an agent's slash commands in ONE Discord server (guild commands update instantly).
//
// Usage (Node >= 20, no dependencies):
//   DISCORD_APP_ID=<app-id> DISCORD_GUILD_ID=<server-id> node register-commands.mjs          # dry run (default)
//   DISCORD_APP_ID=<app-id> DISCORD_GUILD_ID=<server-id> DISCORD_BOT_TOKEN=<your-bot-token> \
//     node register-commands.mjs --send                                                      # really send
//
// Dry run prints the URL and the JSON body and makes no network call. --send makes ONE request:
//   PUT https://discord.com/api/v10/applications/<app-id>/guilds/<server-id>/commands
// which overwrites this app's guild commands with the list below. The token is read from the environment and is
// never printed. Discord allows 200 command creates per day per guild (checked 2026-10), so don't run --send in a loop.

const API = "https://discord.com/api/v10";

/** Edit this list. Names: 1–32 lowercase characters. Descriptions: 1–100 characters. */
export const COMMANDS = [
  {
    name: "status",
    type: 1, // CHAT_INPUT
    description: "What the agent is doing today and how much of its budget is left",
  },
  {
    name: "ask",
    type: 1,
    description: "Ask the agent a question (AI answers, not financial advice)",
    options: [{ type: 3, name: "question", description: "Your question", required: true, max_length: 500 }], // 3 = STRING
  },
  {
    name: "pending",
    type: 1,
    description: "Drafts waiting for the owner's approval",
    default_member_permissions: "0", // hidden from everyone except admins and people you add with an override
  },
];

function check(list) {
  const problems = [];
  for (const c of list) {
    if (!/^[-_\p{Ll}\p{N}]{1,32}$/u.test(c.name)) problems.push(`"${c.name}": name must be 1-32 lowercase characters`);
    if (!c.description || c.description.length > 100) problems.push(`"${c.name}": description must be 1-100 characters`);
  }
  return problems;
}

async function main() {
  const send = process.argv.includes("--send");
  const appId = process.env.DISCORD_APP_ID?.trim();
  const guildId = process.env.DISCORD_GUILD_ID?.trim();
  if (!appId || !guildId) {
    console.error("Set DISCORD_APP_ID and DISCORD_GUILD_ID (Developer Portal → General Information; server id from Developer Mode).");
    process.exit(2);
  }
  const problems = check(COMMANDS);
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(2);
  }
  const url = `${API}/applications/${appId}/guilds/${guildId}/commands`;
  const body = JSON.stringify(COMMANDS, null, 2);

  if (!send) {
    console.log(`DRY RUN — nothing sent.\nPUT ${url}\nAuthorization: Bot ***\nContent-Type: application/json\n\n${body}`);
    console.log("\nRun again with --send and DISCORD_BOT_TOKEN set to register these commands.");
    return;
  }

  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!token) {
    console.error("Set DISCORD_BOT_TOKEN in the environment (never on a shared screen or in a file you commit).");
    process.exit(4);
  }
  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json" },
    body,
  });
  if (res.status === 429) {
    const j = await res.json().catch(() => ({}));
    console.error(`Rate limited. Wait ${j.retry_after ?? res.headers.get("retry-after") ?? "a while"} s before trying again.`);
    process.exit(5);
  }
  if (!res.ok) {
    const text = await res.text();
    console.error(`Discord answered ${res.status}: ${text.slice(0, 500)}`);
    process.exit(1);
  }
  const saved = await res.json();
  console.log(`Registered ${saved.length} commands: ${saved.map((c) => "/" + c.name).join(", ")}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
