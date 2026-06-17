/**
 * pi-caveman-forge 🔨
 *
 * Brainstorm → Plan → Execute workflow.
 * - /forge brainstorm <objective> → writes brainstorm.md
 * - /forge plan → reads brainstorm.md, writes plan.md with task checklist
 * - /forge execute [--tribe] → execute pending tasks (--tribe = caveman subagents)
 * - /forge status → show plan progress
 * - /forge next → show next task
 *
 * Status bar shows: ⛏️ idle | 🧠 brainstorm | 📋 plan | 🔨 forge | ✅ done
 */

import type {
  ExtensionAPI,
  ExtensionCommandContext,
  ExtensionContext,
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

function statePath(cwd: string): string {
  return path.join(forgeDir(cwd), "state.json");
}

function ensureForgeDir(cwd: string): void {
  const dir = forgeDir(cwd);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ---------------------------------------------------------------------------
// Forge phase state
// ---------------------------------------------------------------------------

type ForgePhase = "idle" | "brainstorm" | "plan" | "forge" | "done";

interface ForgeState {
  phase: ForgePhase;
}

const PHASE_ICONS: Record<ForgePhase, string> = {
  idle: "⛏️",
  brainstorm: "🧠",
  plan: "📋",
  forge: "🔨",
  done: "✅",
};

function readState(cwd: string): ForgeState {
  try {
    const raw = fs.readFileSync(statePath(cwd), "utf-8");
    return JSON.parse(raw) as ForgeState;
  } catch {
    return { phase: "idle" };
  }
}

function writeState(cwd: string, state: ForgeState): void {
  ensureForgeDir(cwd);
  fs.writeFileSync(statePath(cwd), JSON.stringify(state), "utf-8");
}

/** Auto-detect phase from file state, falling back to stored state */
function detectPhase(cwd: string): ForgePhase {
  const bp = brainstormPath(cwd);
  const pp = planPath(cwd);
  const hasBrainstorm = fs.existsSync(bp);
  const hasPlan = fs.existsSync(pp);

  if (!hasBrainstorm && !hasPlan) return "idle";
  if (hasBrainstorm && !hasPlan) return "brainstorm";

  if (hasPlan) {
    const content = fs.readFileSync(pp, "utf-8");
    const tasks = parseTasks(content);
    if (tasks.length === 0) return "plan";
    const allDone = tasks.every((t) => t.done);
    if (allDone) return "done";
    // Has pending tasks — read stored state for forge vs plan
    const stored = readState(cwd);
    return stored.phase === "forge" ? "forge" : "plan";
  }

  return "idle";
}

// ---------------------------------------------------------------------------
// Plan parsing
// ---------------------------------------------------------------------------

interface Task {
  line: number;
  text: string;
  done: boolean;
}

function parseTasks(content: string): Task[] {
  const lines = content.split("\n");
  const tasks: Task[] = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i]!.match(/^[\s]*[-*]\s+\[([ xX])\]\s+(.+)$/);
    if (match) {
      tasks.push({
        line: i,
        text: match[2]!.trim(),
        done: match[1]!.toLowerCase() === "x",
      });
    }
  }
  return tasks;
}

function parsePhases(content: string): string[] {
  return content
    .split("\n")
    .filter((l) => /^#{2,3}\s+(Phase|Fase)\s+\d/i.test(l.trim()))
    .map((l) => l.trim());
}

function formatPlanStatus(tasks: Task[]): string {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = tasks.filter((t) => !t.done);

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

function getNextTask(tasks: Task[]): Task | null {
  return tasks.find((t) => !t.done) ?? null;
}

// ---------------------------------------------------------------------------
// Status bar
// ---------------------------------------------------------------------------

function updateStatus(ctx: Pick<ExtensionContext, "ui">, cwd: string): void {
  const phase = detectPhase(cwd);
  const icon = PHASE_ICONS[phase];
  const tasks = getTasks(cwd);

  let label = ` ${icon} `;
  if (phase === "forge" || phase === "done") {
    const done = tasks.filter((t) => t.done).length;
    label += `${done}/${tasks.length}`;
  } else if (phase === "plan") {
    label += `${tasks.length}t`;
  } else if (phase === "brainstorm") {
    label += "brainstorm";
  }

  ctx.ui.setStatus("forge", label);
}

function getTasks(cwd: string): Task[] {
  const pp = planPath(cwd);
  if (!fs.existsSync(pp)) return [];
  return parseTasks(fs.readFileSync(pp, "utf-8"));
}

// ---------------------------------------------------------------------------
// Injection
// ---------------------------------------------------------------------------

function buildForgeInjection(cwd: string): string | null {
  const pp = planPath(cwd);
  if (!fs.existsSync(pp)) return null;

  const content = fs.readFileSync(pp, "utf-8");
  const tasks = parseTasks(content);
  if (tasks.length === 0) return null;

  const done = tasks.filter((t) => t.done).length;
  const total = tasks.length;

  const allDone = done === total;
  const next = getNextTask(tasks);
  const phases = parsePhases(content);

  let block = `\n\n## 🔨 Forge Plan (${done}/${total} done)\n\n`;
  for (const phase of phases) {
    block += `${phase}\n`;
  }
  if (allDone) {
    block += `\n✅ All tasks complete.\n`;
  } else if (next) {
    block += `\n**Next:** ${next.text}\n`;
  }
  block += `\nSee .pi/forge/plan.md for full list. Mark [x] when done.\n`;

  return block;
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

const BRAINSTORM_PROMPT = (objective: string) => `## 🧠 Brainstorm: ${objective}

Analyze codebase + objective. Write brainstorm.md in .pi/forge/ with:

1. **Approach** — how to solve it, 2-3 sentences max. Terse. Caveman style.
2. **Risks** — what could go wrong. Bullet list.
3. **Key files** — files to touch. Bullet list.
4. **Open questions** — what's unclear. Bullet list.

Use write tool to save to .pi/forge/brainstorm.md. Keep it terse.`;

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
  // Inject forge context + update status bar before each agent turn
  pi.on("before_agent_start", (event, ctx) => {
    try {
      // Update status bar
      updateStatus(ctx, ctx.cwd);

      // Inject plan into system prompt
      const block = buildForgeInjection(ctx.cwd);
      if (!block) return;
      const e = event as { systemPrompt?: string };
      return { systemPrompt: (e.systemPrompt ?? "") + block };
    } catch {
      // Silent fail
    }
  });

  // Refresh status bar when agent starts/ends
  pi.on("agent_start", (_event, ctx) => {
    try { updateStatus(ctx, ctx.cwd); } catch { /* ok */ }
  });

  pi.on("agent_end", (_event, ctx) => {
    try { updateStatus(ctx, ctx.cwd); } catch { /* ok */ }
  });

  // /forge command
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
          writeState(ctx.cwd, { phase: "brainstorm" });
          updateStatus(ctx, ctx.cwd);
          pi.sendUserMessage(BRAINSTORM_PROMPT(rest), { deliverAs: "followUp" });
          break;
        }

        case "plan": {
          if (!fs.existsSync(brainstormPath(ctx.cwd))) {
            ctx.ui.notify(
              "No brainstorm.md. Run /forge brainstorm <objective> first.",
              "error",
            );
            return;
          }
          writeState(ctx.cwd, { phase: "plan" });
          updateStatus(ctx, ctx.cwd);
          pi.sendUserMessage(PLAN_PROMPT, { deliverAs: "followUp" });
          break;
        }

        case "execute": {
          if (!fs.existsSync(planPath(ctx.cwd))) {
            ctx.ui.notify("No plan.md. Run /forge plan first.", "error");
            return;
          }
          writeState(ctx.cwd, { phase: "forge" });
          updateStatus(ctx, ctx.cwd);
          const useTribe = rest.includes("--tribe") || rest.includes("-t");
          pi.sendUserMessage(
            useTribe ? EXECUTE_TRIBE_PROMPT : EXECUTE_SOLO_PROMPT,
            { deliverAs: "followUp" },
          );
          break;
        }

        case "status": {
          if (!fs.existsSync(planPath(ctx.cwd))) {
            ctx.ui.notify(
              "No active forge. Use /forge brainstorm <objective> to start.",
              "info",
            );
            return;
          }
          const tasks = parseTasks(fs.readFileSync(planPath(ctx.cwd), "utf-8"));
          ctx.ui.notify(formatPlanStatus(tasks), "info");
          updateStatus(ctx, ctx.cwd);
          break;
        }

        case "next": {
          if (!fs.existsSync(planPath(ctx.cwd))) {
            ctx.ui.notify("No active forge plan.", "info");
            return;
          }
          const tasks = parseTasks(fs.readFileSync(planPath(ctx.cwd), "utf-8"));
          const next = getNextTask(tasks);
          if (!next) {
            writeState(ctx.cwd, { phase: "done" });
            updateStatus(ctx, ctx.cwd);
            ctx.ui.notify("✅ All tasks done. Forge complete.", "info");
            return;
          }
          pi.sendUserMessage(
            `## 🔨 Next\n\n${next.text}\n\nMark [x] in plan.md when done.`,
            { deliverAs: "followUp" },
          );
          break;
        }

        default: {
          // Show current state if no subcommand
          const phase = detectPhase(ctx.cwd);
          const icon = PHASE_ICONS[phase];
          ctx.ui.notify(
            `${icon} Forge: ${phase}\nCommands: brainstorm <obj> | plan | execute [--tribe] | status | next`,
            "info",
          );
          break;
        }
      }
    },
  });
}
