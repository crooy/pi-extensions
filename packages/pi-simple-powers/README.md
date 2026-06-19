# 🪨 pi-simple-powers

**Caveman Superpowers** — Obra's development methodology in terse caveman tongue.

Fork of [obra/superpowers](https://github.com/obra/superpowers), converted to 🪨 speak.
All 14 skills rewritten caveman style. Brainstorms, plans, specs all write caveman markdown.

## 🔧 What

- **14 skills** — brainstorming, TDD, debugging, plans, review, worktrees, finishing, more
- **Caveman tongue** — terse, emoji, 🇳🇱/🇫🇷/🇩🇪, no filler
- **Caveman docs** — all specs/plans write `docs/caveman/` in caveman style
- **Monorepo aware** — detects monorepo, nests `docs/<pkg>/caveman/specs/`
- **User paths** — `/caveman-superpowers docs <path>` to customize doc output

## 📦 Install

```bash
pi install git:github.com/crooy/pi-extensions
# or from monorepo
pi install ./packages/pi-simple-powers
```

## 🧠 Skills

| Skill | When |
|-------|------|
| 🏔️ brainstorming | Before creative work. Idea → spec |
| 📝 writing-plans | Spec → task-by-task plan |
| 🟥🟩🔧 TDD | Test-first dev. Red-green-refactor |
| 🔍 debugging | Root cause before fix. 4 phases |
| ✅ verification | Evidence before "done". Run first |
| ⚡ executing-plans | Load plan, do tasks, verify |
| 🧑‍🤝‍🧑 subagent-driven | 1 agent per task + 2-stage review |
| 🚀 parallel-agents | Dispatch 1 agent per independent domain |
| 👁️ code-review | Review catch issues before cascade |
| 📨 receive-review | Accept feedback with evidence |
| 🌲 worktrees | Isolated worktree per feature |
| 🏁 finishing | Verify, present options, execute |
| ✏️ writing-skills | Create skill files |

## 🎯 Doc path

Default: `docs/caveman/<type>/<date>-<title>.md`
Custom: `/caveman-superpowers docs <path>`
Monorepo: `docs/<pkg>/caveman/<type>/<date>-<title>.md`

Caveman style: terse, emoji, fragments. Technical content exact.
