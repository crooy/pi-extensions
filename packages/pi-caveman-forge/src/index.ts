/**
 * pi-caveman-forge 🔨
 *
 * Brainstorm → Plan → Execute workflow.
 * - /forge brainstorm <objective> → writes brainstorm.md
 * - /forge plan → reads brainstorm.md, writes plan.md with task checklist
 * - /forge execute [--tribe] → execute pending tasks (--tribe = caveman subagents)
 * - /forge status → show plan progress
 * - /forge next → show next task
 */

import type {
  ExtensionAPI,
  ExtensionCommandContext,
} from "@earendil-works/pi-coding-agent";
import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const FORGE_DIR = ".pi/forge";

function forgeDir(cwd: string): string {
  return path.join(cwd, FORGE_DIR);
}

function brainstormPath(cwd: string): string {
  return path.join(forgeDir(cwd), "brainstorm.md");
}

function planPath(cwd: string): string {
  return path.join(forgeDir(cwd), "plan.md");
}

function ensureForgeDir(cwd: string): void {
  const dir = forgeDir(cwd);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ---------------------------------------------------------------------------
// Plan parsing (simple markdown checkboxes)
// ---------------------------------------------------------------------------

interface Task {
  line: number;
  text: string;
  done: boolean;
}

function parsePlan(content: string): { phases: string[]; tasks: Task[] } {
  const lines = content.split("\n");
  const phases: string[] = [];
  const tasks: Task[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    // Phase headers: ## Phase N: Title or ### Phase N: Title
    if (/^#{2,3}\s+(Phase|Fase)\s+\d/i.test(line.trim())) {
      phases.push(line.trim());
    }
    // Task checkboxes: - [ ] task or - [x] task
    const taskMatch = line.match(/^[\s]*[-*]\s+\[([ xX])\]\s+(.+)$/);
    if (taskMatch) {
      tasks.push({
        line: i,
        text: taskMatch[2]!.trim(),
        done: taskMatch[1]!.toLowerCase() === "x",
      });
    }
  }

  return { phases, tasks };
}

function formatPlanStatus(plan: { phases: string[]; tasks: Task[] }): string {
  const total = plan.tasks.length;
  const done = plan.tasks.filter((t) => t.done).length;
  const pending = plan.tasks.filter((t) => !t.done);

  const lines: string[] = [];
  lines.push(`🔨 Forge: ${done}/${total} tasks done`);
  lines.push("");

  if (pending.length > 0) {
    lines.push("⏳ Pending:");
    for (const t of pending.slice(0, 5)) {
      lines.push(`  - ${t.text}`);
    }
    if (pending.length > 5) {
      lines.push(`  ... +${pending.length - 5} more`);
    }
  }

  return lines.join("\n");
}

function getNextTask(plan: { phases: string[]; tasks: Task[] }): Task | null {
  return plan.tasks.find((t) => !t.done) ?? null;
}

// ---------------------------------------------------------------------------
// Injection
// ---------------------------------------------------------------------------

function buildForgeInjection(cwd: string): string | null {
  const pp = planPath(cwd);
  if (!fs.existsSync(pp)) return null;

  const content = fs.readFileSync(pp, "utf-8");
  const plan = parsePlan(content);

  if (plan.tasks.length === 0) return null;

  const done = plan.tasks.filter((t) => t.done).length;
  const total = plan.tasks.length;
  const next = getNextTask(plan);

  let block = `\n\n## 🔨 Active Forge Plan (${done}/${total} done)\n\n`;
  for (const phase of plan.phases) {
    block += `${phase}\n`;
  }
  if (next) {
    block += `\n**Next:** ${next.text}\n`;
  }
  block += `\nCheck .pi/forge/plan.md for full task list. Mark tasks [x] when done.\n`;

  return block;
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

const BRAINSTORM_PROMPT = (objective: string) => `## 🧠 Brainstorm: ${objective}

Analyze codebase + objective. Write brainstorm.md in .pi/forge/ with:

1. **Approach** — how to solve it, 2-3 sentences max. Terse. Caveman style.
2. **Risks** — what could go wrong. Bullet list.
3. **Key files** — files to touch. Bullet list.
4. **Open questions** — what's unclear. Bullet list.

Use write tool to save to .pi/forge/brainstorm.md. Keep it terse like caveman.`;

const PLAN_PROMPT = `## 📋 Plan

Read .pi/forge/brainstorm.md. Write plan.md in .pi/forge/ with:

\`\`\`md
# Plan: <objective>

## Phase 1: <title>
- [ ] Task 1.1: <what>
- [ ] Task 1.2: <what>

## Phase 2: <title>
- [ ] Task 2.1: <what>
\`\`\`

Rules:
- 2-5 phases, ordered by dependency
- 2-6 tasks per phase
- Each task: concrete, 1-session size
- Use checkbox format \`- [ ]\` / \`- [x]\`
- Terse caveman style. Action-first.

Use write tool to save to .pi/forge/plan.md.`;

const EXECUTE_TRIBE_PROMPT = `## 🏕️ Execute with Tribe

Read .pi/forge/plan.md. For each pending task, delegate to a caveman subagent:

\`\`\`
subagent({ agent: "caveman-worker", task: "<task text>" })
\`\`\`

After each task completes, mark it [x] in plan.md with the edit tool.
Work through tasks in order. If a task fails, stop and report.`;

const EXECUTE_SOLO_PROMPT = `## 🔨 Execute Solo

Read .pi/forge/plan.md. Work through pending tasks in order:

1. Pick first unchecked task
2. Implement it
3. Mark it [x] in plan.md with edit tool
4. Repeat until done or blocked

Keep it terse. Caveman style. Report progress after each task.`;

// ---------------------------------------------------------------------------
// Extension entry
// ---------------------------------------------------------------------------

export default function (pi: ExtensionAPI): void {
  // Inject forge context into system prompt
  pi.on("before_agent_start", (event, ctx) => {
    try {
      const block = buildForgeInjection(ctx.cwd);
      if (!block) return;
      const e = event as { systemPrompt?: string };
      return { systemPrompt: (e.systemPrompt ?? "") + block };
    } catch {
      // Silent fail — don't break agent start
    }
  });

  pi.registerCommand("forge", {
    description:
      "Forge: brainstorm → plan → execute. Subcommands: brainstorm, plan, execute, status, next",
    handler: async (args: string, ctx: ExtensionCommandContext) => {
      const trimmed = args.trim();
      const parts = trimmed.split(/\s+/);
      const sub = parts[0]?.toLowerCase() ?? "";
      const rest = parts.slice(1).join(" ");

      ensureForgeDir(ctx.cwd);

      switch (sub) {
        case "brainstorm": {
          if (!rest) {
            ctx.ui.notify("Usage: /forge brainstorm <objective>", "error");
            return;
          }
          const prompt = BRAINSTORM_PROMPT(rest);
          pi.sendUserMessage(prompt, { deliverAs: "followUp" });
          break;
        }

        case "plan": {
          const bp = brainstormPath(ctx.cwd);
          if (!fs.existsSync(bp)) {
            ctx.ui.notify(
              "No brainstorm.md found. Run /forge brainstorm <objective> first.",
              "error",
            );
            return;
          }
          const prompt = PLAN_PROMPT;
          pi.sendUserMessage(prompt, { deliverAs: "followUp" });
          break;
        }

        case "execute": {
          const pp = planPath(ctx.cwd);
          if (!fs.existsSync(pp)) {
            ctx.ui.notify(
              "No plan.md found. Run /forge plan first.",
              "error",
            );
            return;
          }
          const useTribe = rest.includes("--tribe") || rest.includes("-t");
          const prompt = useTribe
            ? EXECUTE_TRIBE_PROMPT
            : EXECUTE_SOLO_PROMPT;
          pi.sendUserMessage(prompt, { deliverAs: "followUp" });
          break;
        }

        case "status": {
          const pp = planPath(ctx.cwd);
          if (!fs.existsSync(pp)) {
            ctx.ui.notify(
              "No active forge plan. Use /forge brainstorm <objective> to start.",
              "info",
            );
            return;
          }
          const content = fs.readFileSync(pp, "utf-8");
          const plan = parsePlan(content);
          ctx.ui.notify(formatPlanStatus(plan), "info");
          break;
        }

        case "next": {
          const pp = planPath(ctx.cwd);
          if (!fs.existsSync(pp)) {
            ctx.ui.notify("No active forge plan.", "info");
            return;
          }
          const content = fs.readFileSync(pp, "utf-8");
          const plan = parsePlan(content);
          const next = getNextTask(plan);
          if (!next) {
            ctx.ui.notify("✅ All tasks done. Forge complete.", "info");
            return;
          }
          pi.sendUserMessage(
            `## 🔨 Next Task\n\n${next.text}\n\nMark it [x] in .pi/forge/plan.md when done.`,
            { deliverAs: "followUp" },
          );
          break;
        }

        default: {
          ctx.ui.notify(
            "Forge commands: brainstorm <obj> | plan | execute [--tribe] | status | next",
            "info",
          );
          break;
        }
      }
    },
  });
}
