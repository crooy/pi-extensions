import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

const CAVEMAN_SKELETON = (goal: string, topic: string) => `# 🪨 ${topic}

> GOAL: ${goal}

Architecture
- Quick plan scope, key decisions

Steps
- [ ] Step 1: Setup scaffolding
- [ ] Step 2: Implement core
- [ ] Step 3: Wire together
- [ ] Step 4: Test and verify

Files touched
- \`src/\`

Validation
- \`npm test\` passes
`;

export function getPlansRoot(): string {
  return process.env.SLQ_PLAN_ROOT || resolve(process.cwd(), "docs/plans");
}

export function generatePlanPath(goal: string): string {
  const root = getPlansRoot();
  const date = new Date().toISOString().slice(0, 10);
  const topic = goal
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${root}/${date}-${topic}.md`;
}

export function ensurePlanFile(planPath: string, goal: string): boolean {
  try {
    readFileSync(planPath, "utf-8");
    return false; // exists
  } catch {
    const basename = planPath.split("/").pop()?.replace(/\.md$/, "") || "plan";
    mkdirSync(dirname(planPath), { recursive: true });
    writeFileSync(planPath, CAVEMAN_SKELETON(goal, basename), "utf-8");
    return true; // created
  }
}

export function readPlan(planPath: string): string {
  try {
    return readFileSync(planPath, "utf-8");
  } catch {
    return `# Plan not found at ${planPath}`;
  }
}
