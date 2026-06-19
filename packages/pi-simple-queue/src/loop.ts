#!/usr/bin/env tsx
/**
 * pi-slq-loop -- TS daemon. Picks tasks from slq queue, dispatches to pi.
 *
 * Robust: signal handling, CWD validation, smart log rotation, task duration tracking.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { readdirSync, statSync, unlinkSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { openDb, getDb } from "./db.js";
import { pickTask, doneTask, failTask, setWorkerPid } from "./queue.js";

const LOG_ROOT = join(homedir(), ".pi", "slq-loop");
const PID_FILE = join(LOG_ROOT, "loop.pid");
const PI_BIN = process.env.PI_BIN || "pi";
const ROTATE_INTERVAL_MS = 3600_000; // hourly

let currentWorker: ChildProcess | null = null;
let currentTaskId: string | null = null;
let lastRotate = 0;

mkdirSync(LOG_ROOT, { recursive: true });

// ── Cleanup ────────────────────────────────────────────────
function cleanup(): void {
  try { unlinkSync(PID_FILE); } catch { /* ok */ }
  if (currentWorker && currentWorker.exitCode === null) {
    currentWorker.kill("SIGTERM");
  }
}

function handleSignal(sig: string): void {
  console.error(`\n🛑 Received ${sig}, shutting down...`);
  if (currentTaskId) {
    try {
      failTask(currentTaskId, `killed by ${sig}`);
      console.error(`  Marked ${currentTaskId} as failed`);
    } catch (err: unknown) {
      console.error(`  Failed to mark ${currentTaskId}: ${err}`);
    }
  }
  cleanup();
  process.exit(0);
}

process.on("SIGTERM", () => handleSignal("SIGTERM"));
process.on("SIGINT", () => handleSignal("SIGINT"));
process.on("exit", cleanup);

// ── Log rotation ───────────────────────────────────────────
function rotateLogs(): void {
  const now = Date.now();
  if (now - lastRotate < ROTATE_INTERVAL_MS) return;
  lastRotate = now;

  const cutoff = now - 7 * 24 * 60 * 60 * 1000;
  let rotated = 0;
  try {
    for (const f of readdirSync(LOG_ROOT)) {
      if (!f.endsWith(".log") && !f.endsWith("-summary.md")) continue;
      const fp = join(LOG_ROOT, f);
      // Use min of mtime/birthtime to avoid false-keeping touched files
      const age = Math.min(statSync(fp).mtimeMs, statSync(fp).birthtimeMs);
      if (age < cutoff) {
        unlinkSync(fp);
        rotated++;
      }
    }
  } catch { /* ignore */ }
  if (rotated > 0) console.error(`🗑️  Rotated ${rotated} old logs (>7d)`);
}

// ── Task validation ────────────────────────────────────────
export function validateTask(task: {
  id?: string;
  skill?: string;
  cwd?: string;
  goal?: string;
}): string | null {
  if (!task.id) return "missing task ID";
  if (!task.skill) return "missing skill";
  if (!task.cwd) return "missing CWD";
  if (!task.goal) return "missing goal";
  return null;
}

// ── Env validation ─────────────────────────────────────────
export function validateEnv(): string[] {
  const warnings: string[] = [];
  const piBin = process.env.PI_BIN || "pi";
  if (piBin.includes("/") && !existsSync(piBin)) {
    warnings.push(`PI_BIN path does not exist: ${piBin}`);
  }
  const slqBin = process.env.SLQ_BIN;
  if (slqBin && !existsSync(slqBin)) {
    warnings.push(`SLQ_BIN path does not exist: ${slqBin}`);
  }
  return warnings;
}

// ── CWD validation ─────────────────────────────────────────
export function validateCwd(cwd: string): string | null {
  if (!cwd) return "CWD is empty";
  if (!existsSync(cwd)) return `CWD does not exist: ${cwd}`;
  try {
    const s = statSync(cwd);
    if (!s.isDirectory()) return `CWD is not a directory: ${cwd}`;
  } catch {
    return `Cannot stat CWD: ${cwd}`;
  }
  return null;
}

// ── Dispatch ───────────────────────────────────────────────
function dispatchToPi(task: {
  goal: string;
  planPath: string | undefined;
  cwd: string;
}): Promise<{ exitCode: number; output: string; pid: number }> {
  return new Promise((resolve) => {
    const planContent =
      task.planPath && existsSync(task.planPath)
        ? readFileSync(task.planPath, "utf-8")
        : "";
    const prompt = `Task: ${task.goal}\n\nAfter completing this task, end your response with a markdown ## Summary section describing what you did, key decisions, and any files changed.\n\n${planContent}`.trim();

    currentWorker = spawn(
      PI_BIN,
      ["-p", "--no-session"],
      {
        cwd: task.cwd,
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 15 * 60 * 1000,
      },
    );

    // Capture PID immediately at spawn, set in DB for recovery
    const workerPid = currentWorker.pid ?? 0;
    if (currentTaskId) setWorkerPid(currentTaskId, workerPid);

    let output = "";
    currentWorker.stdout?.on("data", (d: Buffer) => (output += d.toString()));
    currentWorker.stderr?.on("data", (d: Buffer) => (output += d.toString()));

    currentWorker.on("close", (code) => {
      currentWorker = null;
      resolve({ exitCode: code ?? 1, output, pid: workerPid });
    });

    currentWorker.on("error", (err) => {
      const errOutput = `spawn error: ${err.message}`;
      currentWorker = null;
      resolve({ exitCode: 1, output: errOutput, pid: workerPid });
    });

    currentWorker.stdin?.end(prompt);
  });
}

// ── Startup: reclaim stale active tasks ───────────────────
function reclaimStaleOnStartup(): void {
  try {
    const db = getDb();
    const result = db.exec(
      "SELECT id, goal FROM tasks WHERE status = 'active'",
    );
    if (!result.length || !result[0]!.values?.length) return;
    const count = result[0]!.values.length;
    db.run(
      "UPDATE tasks SET status = 'pending', picked_at = NULL, worker_pid = NULL WHERE status = 'active'",
    );
    console.error(
      `🔄 Reset ${count} stale active task(s) to pending (restart cleanup)`,
    );
  } catch {
    /* non-critical */
  }
}

// ── Duration formatting ────────────────────────────────────
function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  return `${m}m ${rs}s`;
}

// ── Summary extraction ─────────────────────────────────────
export function extractSummary(output: string): string {
  // Text mode: output IS the summary (pi writes markdown directly).
  if (!output.trim().startsWith("{")) return output.slice(0, 200);

  // Try JSONL (newline-delimited JSON) — old --mode json output.
  const lines = output.split("\n");
  let lastAssistantText = "";
  let foundJsonl = false;
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const event = JSON.parse(line);
      foundJsonl = true;
      if (event.type === "message_end" && event.message?.role === "assistant") {
        const content = event.message.content;
        if (Array.isArray(content)) {
          for (const block of content) {
            if (block.type === "text" && block.text) {
              lastAssistantText = block.text;
            }
          }
        }
      }
    } catch { /* skip malformed lines */ }
  }
  if (foundJsonl && lastAssistantText) return lastAssistantText;

  // Fallback: plain JSON with summary field
  try {
    const parsed = JSON.parse(output);
    return parsed.summary || "done";
  } catch {
    return output.slice(0, 200);
  }
}

// ── Summary file writer ───────────────────────────────────
function writeSummary(id: string, goal: string, skill: string, duration: string, body: string, success: boolean, error?: string): void {
  const summaryFile = join(LOG_ROOT, `${id}-summary.md`);
  const icon = success ? "✅" : "❌";
  let md = `# ${icon} ${skill}: ${goal.slice(0, 100)}\n\n`;
  md += `**Task**: \`${id}\`\n`;
  md += `**Duration**: ${duration}\n`;
  md += `**Status**: ${success ? "done" : "failed"}\n\n`;
  if (error) {
    md += `**Error**: ${error}\n\n`;
  }
  md += `## Summary\n\n${body}\n`;
  writeFileSync(summaryFile, md);
}

// ── Main loop ──────────────────────────────────────────────
async function main() {
  await openDb();
  reclaimStaleOnStartup();
  writeFileSync(PID_FILE, String(process.pid));

  console.error(`pi-slq-loop starting (PID ${process.pid})`);
  console.error(
    `  DB: ${process.env.SLQ_DB_PATH || join(homedir(), ".pi", "slq", "queue.db")}`,
  );
  console.error(`  Logs: ${LOG_ROOT}`);

  // Validate environment at startup
  const envWarnings = validateEnv();
  for (const w of envWarnings) console.error(`⚠️  ${w}`);

  while (true) {
    try {
      rotateLogs();

      const task = pickTask();
      if (!task) {
        await new Promise((r) => setTimeout(r, 5_000));
        continue;
      }

      // Validate task data integrity from DB
      const taskErr = validateTask(task);
      if (taskErr) {
        console.error(`❌ Invalid task data: ${taskErr}`);
        try { failTask(task.id || "unknown", `invalid task: ${taskErr}`); } catch { /* ignore */ }
        continue;
      }

      currentTaskId = task.id;
      const retryLabel =
        task.retries > 0 ? ` [retry ${task.retries}/${task.max_retries}]` : "";
      console.error(
        `🔄 ${task.id}: ${task.skill}${retryLabel} — ${task.goal.slice(0, 80)}`,
      );

      const logFile = join(LOG_ROOT, `${task.id}.log`);
      const started = new Date().toISOString();
      const startedMs = Date.now();

      try {
        // Validate CWD before spawning
        const cwdErr = validateCwd(task.cwd);
        if (cwdErr) {
          failTask(task.id, `CWD validation: ${cwdErr}`);
          console.error(`❌ ${task.id} CWD invalid: ${cwdErr}`);
          writeFileSync(
            logFile,
            [
              `=== pi-slq-loop task ${task.id} ===`,
              `  Skill: ${task.skill}; Goal: ${task.goal}; CWD: ${task.cwd}`,
              `  Started: ${started}`,
              `  ❌ CWD invalid: ${cwdErr}`,
            ].join("\n") + "\n",
          );
          currentTaskId = null;
          continue;
        }

        writeFileSync(
          logFile,
          [
            `=== pi-slq-loop task ${task.id} ===`,
            `  Skill: ${task.skill}; Goal: ${task.goal}; CWD: ${task.cwd}; Plan: ${task.plan_path}`,
            `  Retry: ${task.retries}/${task.max_retries}`,
            `  Started: ${started}`,
          ].join("\n") + "\n",
        );

        const result = await dispatchToPi({
          goal: task.goal,
          planPath: task.plan_path,
          cwd: task.cwd,
        });
        const { exitCode, output } = result;

        const duration = Date.now() - startedMs;
        const finished = new Date().toISOString();
        let outSummary = `  Exit: ${exitCode}; Duration: ${formatDuration(duration)}; Finished: ${finished}\n`;

        if (exitCode === 0) {
          const summary = extractSummary(output);
          doneTask(task.id, JSON.stringify({ summary: summary.slice(0, 200) }));
          console.error(`✅ ${task.id} done (${formatDuration(duration)})`);
          outSummary += `  Worker output:\n${output}\n✅ ${task.id} done\n`;
          writeFileSync(logFile, outSummary, { flag: "a" });
          writeSummary(task.id, task.goal, task.skill, formatDuration(duration), output, true);
        } else {
          const errMsg = output.slice(-500).replace(/\n/g, " ");
          failTask(task.id, `exit ${exitCode}: ${errMsg}`);
          console.error(
            `❌ ${task.id} failed (exit ${exitCode}, ${formatDuration(duration)})`,
          );
          outSummary += `  Worker output:\n${output}\n❌ ${task.id} failed (exit ${exitCode})\n`;
          writeFileSync(logFile, outSummary, { flag: "a" });
          writeSummary(task.id, task.goal, task.skill, formatDuration(duration), output, false, `exit ${exitCode}: ${errMsg.slice(0, 200)}`);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        try { failTask(task.id, `loop error: ${msg}`); } catch { /* ignore */ }
        console.error(`💥 ${task.id} loop crash: ${msg}`);
        writeFileSync(
          logFile,
          `  Finished: ${new Date().toISOString()}\n💥 ${task.id} loop crash: ${msg}\n`,
          { flag: "a" },
        );
      } finally {
        currentTaskId = null;
      }
    } catch (err: unknown) {
      // Outer catch guards against unhandled errors in the loop body
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`💥 Loop iteration crash: ${msg}`);
      await new Promise((r) => setTimeout(r, 5_000));
    }
  }
}

main().catch((err) => {
  console.error("pi-slq-loop crashed:", err);
  process.exit(1);
});
