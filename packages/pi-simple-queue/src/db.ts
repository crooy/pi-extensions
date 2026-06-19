import initSqlJs, { Database } from "sql.js";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

let db: Database | null = null;
let dbPath: string = "";

export function getDbPath(): string {
  if (dbPath) return dbPath;
  dbPath = process.env.SLQ_DB_PATH || resolve(process.env.HOME || "~", ".pi", "slq", "queue.db");
  return dbPath;
}

export function setDbPath(p: string): void {
  dbPath = p;
}

export async function openDb(): Promise<Database> {
  if (db) return db;
  const SQL = await initSqlJs();
  const path = getDbPath();
  mkdirSync(dirname(path), { recursive: true });
  try {
    const data = readFileSync(path);
    db = new SQL.Database(data);
  } catch {
    db = new SQL.Database();
  }
  db.run("PRAGMA journal_mode=WAL");
  db.run("PRAGMA busy_timeout=5000");
  createSchema(db);
  return db;
}

export function closeDb(): void {
  if (!db) return;
  saveDb();
  db.close();
  db = null;
}

export function saveDb(): void {
  if (!db) return;
  const data = db.export();
  writeFileSync(getDbPath(), Buffer.from(data));
}

export function getDb(): Database {
  if (!db) throw new Error("DB not opened. call openDb() first");
  return db;
}

function createSchema(database: Database): void {
  database.run(`CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    skill TEXT NOT NULL,
    cwd TEXT NOT NULL,
    goal TEXT NOT NULL,
    plan_path TEXT,
    context TEXT,
    model TEXT,
    status TEXT DEFAULT 'blocked',
    output TEXT,
    error TEXT,
    retries INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    timeout_sec INTEGER DEFAULT 900,
    created_at TEXT,
    picked_at TEXT,
    completed_at TEXT
  )`);
  database.run(`CREATE TABLE IF NOT EXISTS task_dependencies (
    task_id TEXT,
    depends_on_id TEXT,
    PRIMARY KEY (task_id, depends_on_id)
  )`);
  database.run("CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)");
  database.run("CREATE INDEX IF NOT EXISTS idx_tasks_created ON tasks(created_at)");
  // Migration: add worker_pid column if missing
  try {
    database.run("ALTER TABLE tasks ADD COLUMN worker_pid INTEGER");
  } catch { /* column already exists */ }
}
