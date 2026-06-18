import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { openDb, closeDb, setDbPath } from "../src/db.js";
import { addTask, pickTask, doneTask, failTask, listTasks, taskCounts, listPlans } from "../src/queue.js";
import type { Task } from "../src/types.js";
import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

let tmpDir: string;

beforeAll(async () => {
  tmpDir = mkdtempSync(join(tmpdir(), "slq-test-"));
  setDbPath(join(tmpDir, "test.db"));
  await openDb();
});

afterAll(() => {
  closeDb();
});

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "",
    skill: "tdd",
    cwd: "/tmp",
    goal: "Test task",
    depends_on: [],
    status: "pending",
    retries: 0,
    max_retries: 3,
    timeout_sec: 900,
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

describe("Task queue", () => {
  it("adds a task", () => {
    const t = addTask(makeTask({ goal: "Add test" }));
    expect(t.id).toBeTruthy();
    expect(t.status).toBe("pending");
  });

  it("picks a task", () => {
    const t = pickTask();
    expect(t).not.toBeNull();
    expect(t!.status).toBe("active");
  });

  it("returns null when no tasks", () => {
    const t = pickTask();
    expect(t).toBeNull();
  });

  it("marks done", () => {
    const t = addTask(makeTask({ goal: "Done test" }));
    pickTask();
    doneTask(t.id, '{"summary":"ok"}');
    const tasks = listTasks();
    const done = tasks.find((x) => x.id === t.id);
    expect(done?.status).toBe("done");
  });

  it("marks failed with retry", () => {
    const t = addTask(makeTask({ goal: "Fail test", max_retries: 2 }));
    pickTask();
    failTask(t.id, "oops");
    const tasks = listTasks();
    const failed = tasks.find((x) => x.id === t.id);
    expect(failed?.retries).toBeGreaterThanOrEqual(1);
  });

  it("handles dependencies", () => {
    const dep = addTask(makeTask({ goal: "Dep task" }));
    const blocked = addTask(makeTask({ goal: "Blocked task", depends_on: [dep.id] }));
    expect(blocked.status).toBe("blocked");

    pickTask(); // picks dep
    doneTask(dep.id, '{}');

    const picked = pickTask();
    expect(picked?.id).toBe(blocked.id);
  });

  it("lists plans", () => {
    addTask(makeTask({ plan_path: "docs/plans/plan-a.md", goal: "Plan A task" }));
    addTask(makeTask({ plan_path: "docs/plans/plan-b.md", goal: "Plan B task" }));
    const plans = listPlans();
    expect(plans.length).toBeGreaterThanOrEqual(2);
    expect(plans.some((p) => p.plan_path.includes("plan-a"))).toBe(true);
  });

  it("counts tasks by status", () => {
    const counts = taskCounts();
    expect(typeof counts.pending).toBe("number");
  });
});
