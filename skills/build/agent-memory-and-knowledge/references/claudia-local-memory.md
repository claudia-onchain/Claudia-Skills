# How Claudia Local keeps memory

Read this when the agent runs in Claudia Local, or when you want your own agent's files to open cleanly in it. Checked
against Claudia Local 0.3 (2026-10).

## Files

Everything lives in `~/.claudia-local/memory/` (or `$CLAUDIA_LOCAL_HOME/memory/`; Docker: the `/data` volume). The data
folder is mode 0700 and files are written with mode 0600.

| File | Holds | Default type of a plain line |
|---|---|---|
| `MEMORY.md` | Facts the agent keeps between chats | `fact` |
| `USER.md` | About the owner: preferences, how they like to work | `preference` |
| `YYYY-MM-DD.md` | Daily notes: notes, tasks, conversation summaries | `note` |
| `quarantine.json` | Memory proposed from outside content, waiting for the owner (up to 200) | — |

Any other file name is refused by the Memory page. One file can be at most 512 KB; one memory at most 8,000 characters.
Search uses an index in `claudia.db` (SQLite); the Markdown files stay the source of truth, so editing them by hand is
fine.

## One memory, one bullet

```markdown
- Prefers paper trading this month <!-- m:m_x1 type:preference source:user tags:trading ts:2026-10-11T10:00:00.000Z -->
```

- `m:` id, `type:` one of `note`, `fact`, `preference`, `conversation`, `task`, `source:` one of the sources below,
  `tags:` comma-separated (up to 8, each up to 32 characters, no spaces), `ts:` ISO time.
- Indented lines under a bullet belong to it. A paragraph without a bullet counts as one memory too.
- Lines without the comment get an id from a hash of their text, the file's default type and source `user`.
- Other `key:value` pairs in the comment (for example `ref:`) are ignored by Claudia Local, so you can add them.
- Which file the agent writes to follows the type: `fact` → `MEMORY.md`, `preference` → `USER.md`, everything else →
  today's daily note.

## Sources and quarantine

| Source | Means | Written directly? |
|---|---|---|
| `user` | The person at the keyboard, or the paired owner's own text on Telegram | yes |
| `agent` | The agent's own conclusion in a turn that read no outside content | yes |
| `channel` | Telegram messages that aren't the owner's own text (forwards, quoted text) | no: quarantine |
| `thread` | Claudia's public agent thread | no: quarantine |
| `web` | Web pages and Claudia data tools that carry other people's text | no: quarantine |
| `file` | Files in the workspace | no: quarantine |
| `mcp` | Results from MCP servers the agent uses | no: quarantine |
| `skill` | Installed skills | no: quarantine |
| `provider` | Responses from outside providers | no: quarantine |

**Taint.** When a turn calls a tool whose result carries other people's text, the turn is tainted with that source.
A `memory_save` later in the same turn is saved with the tainted source, so it goes to quarantine even though the agent
called the tool. Headless runs started by a watcher or task carry the source that started them.

| Tools that taint the turn | Source |
|---|---|
| Claudia thread, agent profiles, the Claudia overview | `thread` |
| The social inbox | `channel` |
| Claudia data tools from the shared catalog (insights, holders, feeds) | `web` |
| MCP tools from servers you added | `mcp` |
| Loading a skill or a skill file | `skill` |

Two gaps in 0.3: reading a workspace file, and reading a coin through Claudia Local's own `claudia_coin` /
`claudia_coins` tools (whose answer includes the coin's description), do **not** taint the turn. File contents reach the
model inside an `<outside source="file">` block, but a memory saved afterwards is written as `agent`. Until that changes:
keep the workspace owner-controlled, don't drop files from strangers into it, and read the day's note after the agent
has looked at a new coin.

The agent is told: "This came from outside content, so it waits on the Memory page until the user approves it. It isn't
saved yet." Approving moves it into the right file and keeps the original `source:` tag; rejecting deletes it.

## Retrieval

Before each answer Claudia Local searches memory with the owner's message and adds the top 5 hits, each clipped to 300
characters, under "## From memory (may be relevant)" in the system prompt. The agent also has `memory_search` (up to 10
hits, with type and date) and `memory_save` tools; both can be switched off under Tools. The research helper can search
memory; the other helpers can't.

## Upgrading from 0.2

The old `memory.json` is moved into these files once and kept as `memory.json.migrated`.
