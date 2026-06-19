# 🪨 pi-simple-queue — Caveman SQLite Queue

Task queue for pi workers. TS CLI using sql.js. Plan-per-task. Logs. Loops.

## Install

```bash
# From monorepo
npm install
npm run build  # not needed — runs via tsx

# Global binary
npm link       # or npm -g install from repo
```

## Commands

```
slq add --skill tdd --cwd /path --goal "Implement auth" --plan-path docs/plans/plan.md
slq pick                                  # grab next ready task
slq done <id> --output '{"summary":"ok"}' # mark done
slq fail <id> --error "something broke"   # mark failed
slq list                                  # show all tasks
slq status                                # queue counts
slq list-plans                            # plans with counts
```

## Plans

Each task links to a plan file (`plan_path`). Plans default to `docs/plans/<date>-<topic>.md`. If plan missing, skeleton is auto-generated.

## Telemetry

Lightweight JSONL telemetry at `~/.pi/slq/telemetry.jsonl`. Tracks task events. Non-critical, silent on failure.

## Loop

`pi-slq-loop` picks tasks and dispatches to `pi` worker. Logs at `~/.pi/slq-loop/<task-id>.log`. Logs older than 7d rotated.
