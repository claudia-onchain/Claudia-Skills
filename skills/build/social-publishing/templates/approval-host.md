# A minimal approval host (Node ≥ 20, ESM)

Copy into `host.mjs`. It lets an agent (or any script) drop drafts into `drafts/*.json`, shows each preview to a
person in the terminal, publishes only on a typed `y`, runs scheduled posts, and honours a kill-switch file. Secrets
come from environment variables the person sets; nothing is printed.

```js
// npm i @useclaudia/social
// CLAUDIA_KEY_SOCIAL_VAULT=<16+ random chars> CLAUDIA_KEY_TELEGRAM=<bot token> node host.mjs
import { createSocial, envKeys } from "@useclaudia/social";
import { readdirSync, readFileSync, renameSync, existsSync, mkdirSync } from "node:fs";
import { createInterface } from "node:readline/promises";

const social = createSocial({ keys: envKeys() });       // tokens sealed in ~/.claudia/social/accounts.json
await social.ready();
const rl = createInterface({ input: process.stdin, output: process.stdout });
mkdirSync("drafts/done", { recursive: true });

social.on("warning", (w) => console.warn("warning:", w.message));
social.on("post", (p) => console.log(`post ${p.id} → ${p.status}`));

async function review() {
  if (existsSync("STOP")) { social.killSwitch(true); console.log("Kill switch ON (STOP file present)."); return; }
  for (const f of readdirSync("drafts").filter((x) => x.endsWith(".json"))) {
    const input = JSON.parse(readFileSync(`drafts/${f}`, "utf8")); // { text, targets: [{ account }], link?, media?, scheduleAt? }
    const post = social.draft(input);
    social.submit(post.id);
    const previews = social.preview(post.id);
    for (const p of previews) {
      console.log(`\n── ${p.network} (${p.account}) · ${p.chars} chars${p.costUsd ? ` · $${p.costUsd}` : ""}`);
      console.log(p.text);
      if (p.warnings.length) console.log("warnings:", p.warnings.join(" · "));
      if (p.blocked) console.log("BLOCKED:", p.blocked);
    }
    if (previews.some((p) => p.blocked)) { social.reject(post.id, "blocked by rules"); renameSync(`drafts/${f}`, `drafts/done/${f}`); continue; }
    const a = (await rl.question("Publish this? (y = yes, s = schedule as drafted, anything else = reject) ")).trim();
    if (a === "y") {
      social.approve(post.id);
      if (!input.scheduleAt) {
        const done = await social.publish(post.id);
        for (const r of done.results) console.log(r.url ?? r.error?.message);
      }
    } else if (a === "s" && input.scheduleAt) social.approve(post.id); // scheduleAt → scheduled on approve
    else social.reject(post.id, "rejected by the reviewer");
    renameSync(`drafts/${f}`, `drafts/done/${f}`);
  }
}

setInterval(() => social.tick().catch((e) => console.error(e.message)), 30_000); // scheduled posts
for (;;) { await review(); await new Promise((r) => setTimeout(r, 15_000)); }
```

Notes:
- To stop everything: `touch STOP` (the next pass turns the kill switch on). To resume, remove the file and run
  `social.killSwitch(false)` from a one-off script; the switch is saved in `state.json`.
- The agent only writes JSON files; it never imports the social package, so it can't approve or publish.
- Run `node host.mjs` with `createSocial({ keys: envKeys(), dryRun: true })` first to see every request without
  sending.
