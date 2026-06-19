#!/usr/bin/env bash
# 🪨 pi-slq-loop — runs slq queue tasks, dispatches to pi worker
set -euo pipefail

SLQ="${SLQ_BIN:-slq}"
LOG_ROOT="${PI_SLQ_LOOP_LOGS:-$HOME/.pi/slq-loop}"
PID_FILE="$LOG_ROOT/loop.pid"
mkdir -p "$LOG_ROOT"

rotate_logs() {
  find "$LOG_ROOT" -name '*.log' -mtime +7 -delete 2>/dev/null || true
  echo "🧹 Logs rotated (>7d)"
}

echo "🪨 pi-slq-loop starting"
echo "  DB: ${SLQ_DB_PATH:-$HOME/.pi/slq/queue.db}"
echo "  Logs: $LOG_ROOT"
echo "  PID: $$" > "$PID_FILE"

while true; do
  rotate_logs
  TASK_JSON=$($SLQ pick 2>&1) || true
  if [[ -z "$TASK_JSON" || "$TASK_JSON" == "null" ]]; then
    sleep 5
    continue
  fi

  TASK_ID=$(echo "$TASK_JSON" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
  GOAL=$(echo "$TASK_JSON" | grep -o '"goal":"[^"]*"' | head -1 | cut -d'"' -f4)
  PLAN_PATH=$(echo "$TASK_JSON" | grep -o '"plan_path":"[^"]*"' | head -1 | cut -d'"' -f4)
  CWD=$(echo "$TASK_JSON" | grep -o '"cwd":"[^"]*"' | head -1 | cut -d'"' -f4)
  SKILL=$(echo "$TASK_JSON" | grep -o '"skill":"[^"]*"' | head -1 | cut -d'"' -f4)
  LOG_FILE="$LOG_ROOT/$TASK_ID.log"

  {
    echo "=== pi-slq-loop task $TASK_ID ==="
    echo "  Skill: $SKILL; Goal: $GOAL; CWD: $CWD; Plan: $PLAN_PATH"
    echo "  Started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  } > "$LOG_FILE"

  PLAN_CONTENT=""
  if [[ -n "$PLAN_PATH" && -f "$PLAN_PATH" ]]; then
    PLAN_CONTENT=$(cat "$PLAN_PATH")
  fi

  set +e
  WORKER_OUTPUT=$(cd "$CWD" 2>/dev/null && echo "🪨 Task: $GOAL
$PLAN_CONTENT" | pi -p --mode json --no-session 2>/dev/null) || true
  EXIT_CODE=$?
  set -e

  {
    echo "  Exit: $EXIT_CODE; Finished: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
    echo "  Worker output:"
    echo "$WORKER_OUTPUT"
  } >> "$LOG_FILE"

  if [[ $EXIT_CODE -eq 0 ]]; then
    SUMMARY=$(echo "$WORKER_OUTPUT" | grep -o '"summary":"[^"]*"' | head -1 | cut -d'"' -f4 || echo "done")
    $SLQ done "$TASK_ID" --output "{\"summary\":\"$SUMMARY\"}" 2>/dev/null || true
    echo "✅ $TASK_ID done" >> "$LOG_FILE"
  else
    ERROR_MSG=$(echo "$WORKER_OUTPUT" | tail -5 | tr '\n' ' ')
    $SLQ fail "$TASK_ID" --error "exit $EXIT_CODE: $ERROR_MSG" 2>/dev/null || true
    echo "❌ $TASK_ID failed (exit $EXIT_CODE)" >> "$LOG_FILE"
  fi
done