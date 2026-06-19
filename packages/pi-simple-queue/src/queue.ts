import { getDb, saveDb } from "./db.js";
import type { Task, PlanSummary } from "./types.js";

export function addTask(task: Task): Task {
  const db = getDb();
  if (!task.id) task.id = `slq-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  if (!task.max_retries) task.max_retries = 3;
  if (!task.timeout_sec) task.timeout_sec = 900;
  if (!task.created_at) task.created_at = new Date().toISOString();
  // Dependencies determine initial status
  task.status = task.depends_on?.length ? "blocked" : "pending";
  if (!task.retries) task.retries = 0;

  db.run(`INSERT INTO tasks (id, skill, cwd, goal, plan_path, context, model, status, retries, max_retries, timeout_sec, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [task.id, task.skill, task.cwd, task.goal, task.plan_path || null,
     task.context || "", task.model || "", task.status,
     task.retries, task.max_retries, task.timeout_sec, task.created_at]);

  if (task.depends_on?.length) {
    const stmt = db.prepare("INSERT OR IGNORE INTO task_dependencies (task_id, depends_on_id) VALUES (?, ?)");
    for (const dep of task.depends_on) {
      stmt.run([task.id, dep]);
    }
    stmt.free();
  }

  saveDb();
  return task;
}

function isPidAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function reclaimDeadPids(): void {
  const db = getDb();
  const result = db.exec("SELECT id, worker_pid FROM tasks WHERE status = 'active' AND worker_pid IS NOT NULL");
  if (!result.length) return;
  const rows = result[0]!.values;
  for (const row of rows) {
    const id = row[0] as string;
    const pid = row[1] as number;
    if (!isPidAlive(pid)) {
      const retryResult = db.exec("SELECT retries, max_retries FROM tasks WHERE id = ?", [id]);
      if (!retryResult.length) continue;
      const rr = retryResult[0]!.values[0]!;
      const [retries, maxRetries] = rr as [number, number];
      if (retries < maxRetries) {
        db.run("UPDATE tasks SET status = 'pending', retries = retries + 1, worker_pid = NULL, picked_at = NULL WHERE id = ?", [id]);
        console.error(`💀 ${id}: worker PID ${pid} dead — re-queued`);
      } else {
        db.run("UPDATE tasks SET status = 'failed', error = 'worker pid dead, max retries exceeded', worker_pid = NULL, completed_at = datetime('now') WHERE id = ?", [id]);
        console.error(`💀 ${id}: worker PID ${pid} dead — failed (max retries)`);
      }
    }
  }
}

export function pickTask(): Task | null {
  const db = getDb();

  // 0. Reclaim tasks whose worker PID is dead
  reclaimDeadPids();

  // 1. Release stale (timeout fallback for hung-but-alive processes)
  db.run(`UPDATE tasks SET status = 'pending', retries = retries + 1, picked_at = NULL
    WHERE status = 'active'
    AND datetime(picked_at, '+' || timeout_sec || ' seconds') < datetime('now')
    AND retries < max_retries`);

  // 2. Fail maxed-out retries
  db.run(`UPDATE tasks SET status = 'failed', error = 'max retries exceeded', completed_at = datetime('now')
    WHERE status = 'active'
    AND datetime(picked_at, '+' || timeout_sec || ' seconds') < datetime('now')
    AND retries >= max_retries`);

  // 3. Unblock dependencies
  db.run(`UPDATE tasks SET status = 'pending'
    WHERE status = 'blocked'
    AND id IN (
      SELECT t.id FROM tasks t
      WHERE NOT EXISTS (
        SELECT 1 FROM task_dependencies d
        JOIN tasks dep ON dep.id = d.depends_on_id
        WHERE d.task_id = t.id AND dep.status != 'done'
      )
    )`);

  // 4. Pick next
  const result = db.exec(`UPDATE tasks SET status = 'active', picked_at = datetime('now')
    WHERE id = (SELECT id FROM tasks WHERE status = 'pending' ORDER BY created_at ASC LIMIT 1)
    RETURNING id, skill, cwd, goal, plan_path, context, model, status, output, error,
      retries, max_retries, timeout_sec, created_at, picked_at, completed_at`);

  if (!result.length) return null;
  const r = result[0]!;
  if (!r.values?.length) return null;
  const row = r.values[0];
  if (!row) return null;
  const cols = r.columns;
  const task = rowToTask(cols, row);

  saveDb();
  return task;
}

export function setWorkerPid(id: string, pid: number): void {
  const db = getDb();
  db.run("UPDATE tasks SET worker_pid = ? WHERE id = ?", [pid, id]);
  saveDb();
}

export function doneTask(id: string, outputJson: string): void {
  const db = getDb();
  db.run(`UPDATE tasks SET status = 'done', output = ?, completed_at = datetime('now'), worker_pid = NULL WHERE id = ?`,
    [outputJson, id]);

  // Unblock dependents
  db.run(`UPDATE tasks SET status = 'pending'
    WHERE status = 'blocked'
    AND id IN (
      SELECT t.id FROM tasks t
      WHERE NOT EXISTS (
        SELECT 1 FROM task_dependencies d
        JOIN tasks dep ON dep.id = d.depends_on_id
        WHERE d.task_id = t.id AND dep.status != 'done'
      )
    )`);
  saveDb();
}

export function failTask(id: string, errMsg: string): void {
  const db = getDb();
  const result = db.exec(`SELECT retries, max_retries FROM tasks WHERE id = ?`, [id]);
  if (!result.length) return;
  const r = result[0]!;
  if (!r.values?.length) return;
  const row = r.values[0];
  if (!row) return;
  const [retries, maxRetries] = row as [number, number];

  if (retries < maxRetries - 1) {
    db.run(`UPDATE tasks SET status = 'pending', retries = retries + 1, picked_at = NULL, worker_pid = NULL, error = ? WHERE id = ?`,
      [errMsg, id]);
  } else {
    db.run(`UPDATE tasks SET status = 'failed', error = ?, completed_at = datetime('now'), worker_pid = NULL WHERE id = ?`,
      [errMsg, id]);
  }
  saveDb();
}

export function listTasks(): Task[] {
  const db = getDb();
  const result = db.exec(`SELECT id, skill, cwd, goal, plan_path, context, model, status, output, error,
    retries, max_retries, timeout_sec, created_at, picked_at, completed_at, worker_pid
    FROM tasks ORDER BY created_at ASC`);

  if (!result.length) return [];
  const r = result[0]!;
  if (!r.values?.length) return [];
  const cols = r.columns;
  return r.values.map((row) => rowToTask(cols, row));
}

export function taskCounts(): Record<string, number> {
  const db = getDb();
  const result = db.exec("SELECT status, COUNT(*) FROM tasks GROUP BY status");
  if (!result.length) return {};
  const r = result[0]!;
  if (!r.values?.length) return {};
  const counts: Record<string, number> = {};
  for (const row of r.values) {
    counts[row[0] as string] = row[1] as number;
  }
  return counts;
}

export function listPlans(): PlanSummary[] {
  const db = getDb();
  const result = db.exec(`SELECT plan_path, COUNT(*) as total,
    SUM(CASE WHEN status = 'blocked' THEN 1 ELSE 0 END) as blocked,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
    SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as done,
    SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
    FROM tasks WHERE plan_path IS NOT NULL AND plan_path != ''
    GROUP BY plan_path ORDER BY plan_path`);

  if (!result.length) return [];
  const r = result[0]!;
  if (!r.values?.length) return [];
  const cols = r.columns;
  return r.values.map((row) => {
    const obj: Record<string, unknown> = {};
    cols.forEach((col, i) => { obj[col] = row[i]; });
    return obj as unknown as PlanSummary;
  });
}

function rowToTask(cols: string[], row: unknown[]): Task {
  const obj: Record<string, unknown> = {};
  cols.forEach((col, i) => { obj[col] = row[i]; });
  return obj as unknown as Task;
}
