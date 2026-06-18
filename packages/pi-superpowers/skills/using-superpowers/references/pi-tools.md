# 🔧 Pi tool mapping (caveman)

Superpowers skills say "do X" in action language. Pi tools are lowercase, native:

| Action | Pi tool |
|-------|---------|
| Read file | `read` |
| Write file | `write` |
| Edit file | `edit` |
| Run shell | `bash` |
| Search code | `grep` / `rg` / `bash` |
| Find files | `find` / `ls` |
| List dir | `bash` |
| Git ops | `bash` (with `git`) |
| Web fetch | `web_fetch` |
| Web search | `web_search` |
| MCP | `mcp` |
| Subagent | `subagent` (if `pi-cavepeople` installed) |
| Intercom | `intercom` |
| Task tracking | `TODO.md` or `bash` |
| Instinct | `instinct_read`/`instinct_write` |
| Fact | `fact_read`/`fact_write` |

## 📄 Doc writing

Use `write` for new files. Use `edit` for changes.
Caveman style: terse, fragments, emoji. Keep code blocks intact.

## 🧠 Skills

Pi has NO `Skill` tool. Load SKILL.md with `read` when skill applies.
Invoke via `read`. Follow instructions.

## 🗒️ Tasks

Pi has NO `Task` tool (unless `pi-cavepeople` provides `subagent`).
Track in `TODO.md` or `bash` checkboxes in plan files.