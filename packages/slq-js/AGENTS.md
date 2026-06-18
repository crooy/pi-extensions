# 🪨 slq-js — Caveman John SQL Queue

TS CLI, sql.js. Loop is pi-slq-loop. Plan docs default docs/plans.

## Commands

- `slq add --skill --cwd --goal [--plan-path] [--depends-on]` — enqueue
- `slq pick` — next ready task, JSON output
- `slq done <id> --output <json>` — mark done
- `slq fail <id> --error <msg>` — mark failed
- `slq list` — table of tasks
- `slq status` — counts per status
- `slq list-plans` — aggregated plan stats
- `slq run-plan <id>` — emit plan content for loop

## Env

- `SLQ_DB_PATH` — override queue DB path (default ~/.pi/slq/queue.db)
- `SLQ_PLAN_ROOT` — plan doc root (default docs/plans)
- `PI_SLQ_LOOP_LOGS` — log dir (default ~/.pi/slq-loop)
- `SLQ_BIN` — overrides `slq` binary path for loop (default `slq`)

## Loop

`pi-slq-loop` bash script continues picking tasks and dispatching to pi worker.
Logs per task to `~/.pi/slq-loop/<task-id>.log`. Rotated after 7d.

Telemetry at `~/.pi/slq/telemetry.jsonl` (lightweight JSONL, non-critical).
Plan skeletons auto-generated at `docs/plans/<date>-<topic>.md`.
