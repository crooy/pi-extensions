import { getDb, saveDb } from "./db.js";
import type { Task, TaskOutput, PlanSummary } from "./types.js";

const statusOrder: Record<string, number> = {
  blocked: 0,
  pending: 1,
  active: 2,
  done: 3,
  failed: 4,
};

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

export function pickTask(): Task | null {
  const db = getDb();

  // 1. Release stale
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

  if (!result.length || !result[0].values.length) return null;

  const row = result[0].values[0];
  const cols = result[0].columns;
  const task = rowToTask(cols, row);

  saveDb();
  return task;
}

export function doneTask(id: string, outputJson: string): void {
  const db = getDb();
  db.run(`UPDATE tasks SET status = 'done', output = ?, completed_at = datetime('now') WHERE id = ?`,
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
  const [retries, maxRetries] = result[0].values[0] as [number, number];

  if (retries < maxRetries - 1) {
    db.run(`UPDATE tasks SET status = 'pending', retries = retries + 1, picked_at = NULL, error = ? WHERE id = ?`,
      [errMsg, id]);
  } else {
    db.run(`UPDATE tasks SET status = 'failed', error = ?, completed_at = datetime('now') WHERE id = ?`,
      [errMsg, id]);
  }
  saveDb();
}

export function listTasks(): Task[] {
  const db = getDb();
  const result = db.exec(`SELECT id, skill, cwd, goal, plan_path, context, model, status, output, error,
    retries, max_retries, timeout_sec, created_at, picked_at, completed_at
    FROM tasks ORDER BY created_at ASC`);

  if (!result.length) return [];
  const cols = result[0].columns;
  return result[0].values.map((row) => rowToTask(cols, row));
}

export function taskCounts(): Record<string, number> {
  const db = getDb();
  const result = db.exec("SELECT status, COUNT(*) FROM tasks GROUP BY status");
  if (!result.length) return {};
  const counts: Record<string, number> = {};
  for (const row of result[0].values) {
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
  const cols = result[0].columns;
  return result[0].values.map((row) => {
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
