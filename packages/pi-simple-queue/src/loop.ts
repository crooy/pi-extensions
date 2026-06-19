#!/usr/bin/env node
/**
 * pi-slq-loop -- TS daemon. Picks tasks from slq queue, dispatches to pi.
 *
 * Unlike bash version: direct DB access, proper JSON, no set -euo pipefail hell.
 */
import { spawn } from "node:child_process";
import { readdirSync, statSync, unlinkSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { openDb } from "./db.js";
import { pickTask, doneTask, failTask } from "./queue.js";

const LOG_ROOT = join(homedir(), ".pi", "slq-loop");
const PID_FILE = join(LOG_ROOT, "loop.pid");
const PI_BIN = process.env.PI_BIN || "pi";

mkdirSync(LOG_ROOT, { recursive: true });

function rotateLogs() {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  try {
    for (const f of readdirSync(LOG_ROOT)) {
      if (!f.endsWith(".log")) continue;
      const fp = join(LOG_ROOT, f);
      if (statSync(fp).mtimeMs < cutoff) unlinkSync(fp);
    }
  } catch { /* ignore */ }
  console.error("Logs rotated (>7d)");
}

function dispatchToPi(task: { goal: string; planPath: string | undefined; cwd: string }): Promise<{ exitCode: number; output: string }> {
  return new Promise((resolve) => {
    const planContent = task.planPath && existsSync(task.planPath)
      ? readFileSync(task.planPath, "utf-8")
      : "";
    const prompt = `Task: ${task.goal}\n${planContent}`.trim();
    const pi = spawn(PI_BIN, ["-p", "--mode", "json", "--no-session"], {
      cwd: task.cwd,
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 15 * 60 * 1000,
    });
    let output = "";
    pi.stdout.on("data", (d) => (output += d.toString()));
    pi.stderr.on("data", (d) => (output += d.toString()));
    pi.on("close", (code) => resolve({ exitCode: code ?? 1, output }));
    pi.on("error", () => resolve({ exitCode: 1, output: "" }));
    pi.stdin?.end(prompt);
  });
}

async function main() {
  await openDb();
  writeFileSync(PID_FILE, String(process.pid));
  console.error(`pi-slq-loop starting (PID ${process.pid})`);
  console.error(`  DB: ${process.env.SLQ_DB_PATH || join(homedir(), ".pi", "slq", "queue.db")}`);
  console.error(`  Logs: ${LOG_ROOT}`);

  while (true) {
    rotateLogs();

    const task = pickTask();
    if (!task) {
      await new Promise((r) => setTimeout(r, 5_000));
      continue;
    }

    const logFile = join(LOG_ROOT, `${task.id}.log`);
    const started = new Date().toISOString();

    try {
      writeFileSync(logFile, [
        `=== pi-slq-loop task ${task.id} ===`,
        `  Skill: ${task.skill}; Goal: ${task.goal}; CWD: ${task.cwd}; Plan: ${task.plan_path}`,
        `  Started: ${started}`,
      ].join("\n") + "\n");

      const { exitCode, output } = await dispatchToPi({
        goal: task.goal,
        planPath: task.plan_path,
        cwd: task.cwd,
      });

      const finished = new Date().toISOString();
      let outSummary = `  Exit: ${exitCode}; Finished: ${finished}\n`;

      if (exitCode === 0) {
        const summary = extractSummary(output);
        doneTask(task.id, JSON.stringify({ summary }));
        outSummary += `  Worker output:\n${output}\n✅ ${task.id} done`;
        writeFileSync(logFile, outSummary, { flag: "a" });
      } else {
        const errMsg = output.slice(-500).replace(/\n/g, " ");
        failTask(task.id, `exit ${exitCode}: ${errMsg}`);
        outSummary += `  Worker output:\n${output}\n❌ ${task.id} failed (exit ${exitCode})`;
        writeFileSync(logFile, outSummary, { flag: "a" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      failTask(task.id, `loop error: ${msg}`);
      writeFileSync(logFile, `  Finished: ${new Date().toISOString()}\n💥 ${task.id} loop crash: ${msg}\n`, { flag: "a" });
    }
  }
}

function extractSummary(output: string): string {
  try {
    const parsed = JSON.parse(output);
    return parsed.summary || "done";
  } catch {
    return "done";
  }
}

main().catch((err) => {
  console.error("pi-slq-loop crashed:", err);
  process.exit(1);
});
