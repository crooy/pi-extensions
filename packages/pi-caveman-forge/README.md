# pi-caveman-forge 🔨

Brainstorm → Plan → Execute. Caveman planning forge. Fork of pi-blueprint.

## Workflow

```
/forge brainstorm "OAuth2 login"  →  .pi/forge/brainstorm.md
/forge plan                        →  .pi/forge/plan.md (checklist)
/forge execute                     →  main agent works tasks
/forge execute --tribe             →  caveman subagents per task
/forge status                      →  show progress
/forge next                        →  show next pending task
```

## TUI Status Bar

Footer shows forge phase:

| Bar | Meaning |
|---|---|
| `⛏️` | No forge active |
| `🧠 brainstorm` | Brainstorming |
| `📋 8t` | Plan ready, 8 tasks |
| `🔨 3/8` | Executing, 3 done |
| `✅ 8/8` | All complete |

## Plan Format

```md
# Plan: OAuth2 login

## Phase 1: Database
- [x] Task 1.1: Create users table
- [x] Task 1.2: Add refresh token table

## Phase 2: Endpoints
- [ ] Task 2.1: POST /auth/login
- [ ] Task 2.2: POST /auth/refresh
```

Agent reads/writes `[ ]` / `[x]` checkboxes with normal edit tool.

## Install

```bash
pi install npm:pi-caveman-forge
```

## Files

```
.pi/forge/
├── brainstorm.md      # brainstorm output (approach, risks, files, questions)
├── plan.md            # task checklist with [ ] / [x]
└── state.json         # current forge phase
```

Plain markdown. Survives Pi restart. Multi-session safe.
