#!/usr/bin/env tsx
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { openDb, closeDb, getDb } from "./db.js";
import { addTask, pickTask, doneTask, failTask, listTasks, taskCounts, listPlans } from "./queue.js";
import { ensurePlanFile, generatePlanPath, readPlan } from "./plan.js";
import { track } from "./telemetry.js";
import type { Task } from "./types.js";

async function main() {
  await openDb();

  await yargs(hideBin(process.argv))
    .scriptName("slq")
    .usage("🪨 slq — caveman sqlite queue\n  $0 <command> [options]")
    .command("add", "Add task to queue", (y) => {
      y
        .option("skill", { type: "string", demandOption: true, desc: "Skill: tdd, brainstorming, etc" })
        .option("cwd", { type: "string", demandOption: true, desc: "Working directory" })
        .option("goal", { type: "string", demandOption: true, desc: "Goal of task" })
        .option("plan-path", { type: "string", desc: "Path to plan file (default: auto)" })
        .option("depends-on", { type: "string", desc: "Comma-sep task IDs" })
        .option("model", { type: "string", desc: "Model override" })
        .option("timeout", { type: "number", default: 900, desc: "Timeout seconds" })
        .option("max-retries", { type: "number", default: 3, desc: "Max retries" });
    }, (a: Record<string, unknown>) => {
      const planPath = (a["plan-path"] as string) || generatePlanPath(a["goal"] as string);
      ensurePlanFile(planPath, a["goal"] as string);
      const dependsOn = (a["depends-on"] as string)?.split(",").map((s: string) => s.trim()).filter(Boolean);
      const task: Task = {
        id: "",
        skill: a["skill"] as string,
        cwd: a["cwd"] as string,
        goal: a["goal"] as string,
        plan_path: planPath,
        context: "",
        model: (a["model"] as string) || "",
        depends_on: dependsOn,
        status: dependsOn?.length ? "blocked" : "pending",
        retries: 0,
        max_retries: a["max-retries"] as number,
        timeout_sec: a["timeout"] as number,
        created_at: new Date().toISOString(),
      };
      const created = addTask(task);
      track("task_added", { task_id: created.id, skill: created.skill, plan_path: planPath });
      console.log(created.id);
    })

    .command("pick", "Pick next ready task", {}, () => {
      const task = pickTask();
      if (!task) { process.exit(1); return; }
      track("task_picked", { task_id: task.id });
      console.log(JSON.stringify(task, null, 2));
    })

    .command("done <id>", "Mark task done", (y) => {
      y
        .positional("id", { type: "string", demandOption: true, desc: "Task ID" })
        .option("output", { type: "string", demandOption: true, desc: "JSON output" });
    }, (args: Record<string, unknown>) => {
      doneTask(args.id as string, args.output as string);
      track("task_done", { task_id: args.id as string });
      console.log(`✅ ${args.id} done`);
    })

    .command("fail <id>", "Mark task failed", (y) => {
      y
        .positional("id", { type: "string", demandOption: true, desc: "Task ID" })
        .option("error", { type: "string", demandOption: true, desc: "Error message" });
    }, (args: Record<string, unknown>) => {
      failTask(args.id as string, args.error as string);
      track("task_failed", { task_id: args.id as string, outcome: args.error as string });
      console.log(`❌ ${args.id} failed`);
    })

    .command("list", "List tasks", {}, () => {
      const tasks = listTasks();
      if (!tasks.length) { console.log("📭 Queue empty"); return; }
      console.log("ID".padEnd(18) + "SKILL".padEnd(16) + "STATUS".padEnd(11) + "RETRIES".padEnd(8) + "PLAN_PATH".padEnd(30) + "GOAL");
      console.log("—".repeat(100));
      for (const t of tasks) {
        const pp = t.plan_path ? t.plan_path.slice(0, 28) : "-";
        console.log(
          t.id.padEnd(18) + t.skill.padEnd(16) +
          `${statusIcon(t.status)} ${t.status}`.padEnd(13) +
          String(t.retries).padEnd(8) + pp.padEnd(30) + t.goal.slice(0, 40)
        );
      }
    })

    .command("status", "Queue status counts", {}, () => {
      const counts = taskCounts();
      for (const s of ["blocked", "pending", "active", "done", "failed"]) {
        if (counts[s]) console.log(`  ${statusIcon(s)} ${s}: ${counts[s]}`);
      }
    })

    .command("list-plans", "List active plans", {}, () => {
      const plans = listPlans();
      if (!plans.length) { console.log("📭 No plans with tasks"); return; }
      console.log("PLAN_PATH".padEnd(45) + "TOTAL".padEnd(8) + "BLOCKED".padEnd(9) + "PENDING".padEnd(9) + "ACTIVE".padEnd(8) + "DONE".padEnd(6) + "FAILED");
      console.log("—".repeat(90));
      for (const p of plans) {
        console.log(p.plan_path.padEnd(45) + String(p.total).padEnd(8) + String(p.blocked).padEnd(9) +
          String(p.pending).padEnd(9) + String(p.active).padEnd(8) + String(p.done).padEnd(6) + String(p.failed));
      }
    })

    .command("run-plan <id>", "Emit plan content for task (used by pi-slq-loop)", (y) => {
      y.positional("id", { type: "string", demandOption: true, desc: "Task ID" });
    }, (args: Record<string, unknown>) => {
      const db = getDb();
      const result = db.exec("SELECT plan_path, goal, skill, cwd FROM tasks WHERE id = ?", [args.id as string]);
      if (!result.length) { console.log(`❌ Task ${args.id} not found`); process.exit(1); }
      const r = result[0]!;
      if (!r.values?.length) { console.log(`❌ Task ${args.id} not found`); process.exit(1); }
      const row = r.values[0]!;
      const [planPath, goal, skill, cwd] = row as string[];
      const planContent = planPath ? readPlan(planPath) : `# ${goal}`;
      console.log(JSON.stringify({ plan_path: planPath, goal, skill, cwd, plan_content: planContent }));
    })

    .demandCommand(1, "Use: add, pick, list, status, list-plans, done, fail, run-plan")
    .strict()
    .parse();

  closeDb();
}

function statusIcon(s: string): string {
  const icons: Record<string, string> = { blocked: "🔷", pending: "⏳", active: "🔄", done: "✅", failed: "❌" };
  return icons[s] || "❓";
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
