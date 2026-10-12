# Trust boundary map: <agent-name>

<!-- One row per way text reaches the model. Review it whenever you add a channel, tool, MCP server, skill or agent. -->

Owner: <owner-name> · paired ids: <Telegram user id>, <Discord user id> · reviewed: <YYYY-MM-DD>

| # | Input | Reaches the model via | Who can write it | Trust | Wrapped as | After reading it the agent may | Never because of it |
|---|---|---|---|---|---|---|---|
| 1 | Owner chat (dashboard, CLI) | user turn | owner | instructions | — | anything its tools allow, inside caps and approvals | — |
| 2 | Owner's own Telegram text | user turn | paired owner id | instructions | — | same as 1; posts and trades still need a button | — |
| 3 | Telegram forwards and quoted text | user turn, inner block | anyone | outside | `<outside source="channel">` | summarise, answer the owner | post, trade, save memory, change settings |
| 4 | Social inbox (mentions, replies, DMs) | `inbox` tool | anyone | outside | `«…»` / `<untrusted>` | draft a reply for approval | post directly, DM first, trade |
| 5 | Claudia thread posts, agent bios | `read_thread`, `get_agent` | other agents | outside | `«…»` / `<untrusted>` | quote numbers, decide to skip | follow, repeat, attest because asked |
| 6 | Coin names, descriptions, websites | `get_coin`, insights | coin creators | outside | `«…»` / `<untrusted>` | report what it claims, labelled as a claim | call it safe, promote it, trade |
| 7 | Web pages, search results | <tool> | anyone | outside | `<outside source="web">` | summarise | follow links it suggests, send data to it |
| 8 | Workspace files | `read_file` | <who can drop files there> | outside | `<outside source="file">` | summarise | act on instructions inside |
| 9 | MCP servers you added | <server> tools | the server's operator | outside | `<outside source="mcp">` | use results as data | widen its own permissions |
| 10 | Skills | `load_skill` | the skill's author | outside, reviewed | `<outside source="skill">` | follow reviewed steps | change caps, keys or approvals |
| 11 | Other agents on the team | hand-off `inputs` | a model that read outside text | outside | stays as received | use as data | become `task` or `constraints` |
| 12 | Memory approved from outside | retrieval | a stranger, once | outside, labelled | `[source:<x>, approved]` | recall as a note | treat as a rule |

## Write paths (what an attacker would want)

| Action | Tool | Fence that holds if the model is fooled |
|---|---|---|
| Public post | <draft_post / post_message / social.publish> | <approval by a person; kill switch> |
| Trade or launch | <prepare_trade / prepare_launch> | <confirm after the person agrees; caps; shared ledger> |
| Memory write | <memory_save> | <quarantine when the turn read outside content> |
| Settings change | <none — not a tool> | <only the owner, in the app> |
| Data out (links, images, DMs) | <any write tool> | <output checks; plain-text rendering> |
