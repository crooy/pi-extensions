# 🪨 pi-slq-loop Robustness Refinement Plan

> **Goal:** Harden loop.ts daemon — explicit checks, better error reporting, correct task fetch flow.

**Architecture:** TS daemon picks tasks from sql.js DB via queue.ts. Spawns pi worker per task. Refinement focuses on: pickTask validation, worker PID tracking, error preservation, log rotation reliability, loop crash resilience.

## Global Constraints

- No breaking changes to queue.ts interface
- Existing tests must still pass
- Caveman style — terse, no fluff
- `npm test` passes after every task

---

### Task 1: Fix worker PID tracking

**Files:**
- Modify: `src/loop.ts` (dispatchToPi function)

**Issue:** `result.pid` is always `0`. Worker PID captured but never returned. `setWorkerPid` called after worker exits (race condition).

- [ ] **Step 1: Write failing test**
  ```typescript
  // In tests/loop.test.ts (new)
  test('dispatchToPi captures worker pid', async () => {
    // Mock spawn to return pid 12345
    // Verify setWorkerPid called with correct pid at spawn time
  });
  ```

- [ ] **Step 2: Run → FAIL**
  `npm test -w packages/pi-simple-queue`
  Expected: FAIL — no loop test file exists, or test reveals pid=0 bug

- [ ] **Step 3: Fix code**
  ```typescript
  function dispatchToPi(task: { goal: string; planPath?: string; cwd: string }): Promise<{ exitCode: number; output: string; pid: number }> {
    return new Promise((resolve) => {
      // ... spawn ...
      currentWorker = spawn(PI_BIN, args, opts);
      const workerPid = currentWorker.pid ?? 0;  // Capture at spawn
      setWorkerPid(currentTaskId!, workerPid);   // Set immediately
      // ...
      currentWorker.on("close", (code) => {
        currentWorker = null;
        resolve({ exitCode: code ?? 1, output, pid: workerPid });
      });
    });
  }
  ```
  Remove stale `if (result.pid) setWorkerPid(task.id, result.pid);` from main loop.

- [ ] **Step 4: Run → PASS**
  `npm test -w packages/pi-simple-queue`

- [ ] **Step 5: Verify**
  Full verification: `npm test`

---

### Task 2: Improve error output preservation

**Files:**
- Modify: `src/loop.ts` (extractSummary, main loop)

**Issue:** `extractSummary` returns "done" if JSON parse fails — loses all worker output. Error case truncates to 500 chars.

- [ ] **Step 1: Write failing test**
  Test that extractSummary preserves raw output when JSON parse fails.

- [ ] **Step 2: Run → FAIL**

- [ ] **Step 3: Fix code**
  ```typescript
  function extractSummary(output: string): string {
    try {
      const parsed = JSON.parse(output);
      return parsed.summary || "done";
    } catch {
      return output.slice(0, 200); // preserve first 200 chars of raw output
    }
  }
  ```

  Error path: log full output to file, only truncate for console.

- [ ] **Step 4: Run → PASS**

- [ ] **Step 5: Verify**

---

### Task 3: Add explicit pickTask result validation

**Files:**
- Modify: `src/loop.ts` (main loop)

**Issue:** `pickTask()` null-check works but doesn't validate returned task fields (id, skill, cwd, goal could be null/empty from corrupt DB).

- [ ] **Step 1: Write failing test**
  Test that loop skips tasks with missing required fields.

- [ ] **Step 2: Run → FAIL**

- [ ] **Step 3: Fix code**
  ```typescript
  function validateTask(task: Task): string | null {
    if (!task.id) return "missing task ID";
    if (!task.skill) return "missing skill";
    if (!task.cwd) return "missing CWD";
    if (!task.goal) return "missing goal";
    return null;
  }
  ```

  In main loop after `pickTask()`:
  ```typescript
  const validationErr = validateTask(task);
  if (validationErr) {
    failTask(task.id, `invalid task: ${validationErr}`);
    console.error(`❌ Invalid task data: ${validationErr}`);
    continue;
  }
  ```

- [ ] **Step 4: Run → PASS**

- [ ] **Step 5: Verify**

---

### Task 4: Harden main loop against iteration crashes

**Files:**
- Modify: `src/loop.ts` (main loop)

**Issue:** If an unhandled exception escapes the inner try/catch (outside the task dispatch block), the daemon crashes entirely.

- [ ] **Step 1: Write test**
  Not directly testable — structural change.

- [ ] **Step 2: Run → FAIL** (skip — structural)

- [ ] **Step 3: Fix code**
  Wrap entire loop body in try/catch:
  ```typescript
  while (true) {
    try {
      rotateLogs();
      // ... existing loop body ...
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`💥 Loop iteration crash: ${msg}`);
      // Brief delay before retry
      await new Promise((r) => setTimeout(r, 5_000));
    }
  }
  ```

- [ ] **Step 4: Run → PASS**
  Existing tests pass.

- [ ] **Step 5: Verify**

---

### Task 5: Improve log rotation with filename-based timing

**Files:**
- Modify: `src/loop.ts` (rotateLogs)

**Issue:** `mtimeMs` can be misleading — if log file is touched during inspection, it won't rotate. Better to use filename timestamp pattern if available, fall back to mtime.

- [ ] **Step 1: Write test**
  Test rotateLogs with old mtime files.

- [ ] **Step 2: Run → FAIL**

- [ ] **Step 3: Fix code**
  ```typescript
  function rotateLogs(): void {
    const now = Date.now();
    if (now - lastRotate < ROTATE_INTERVAL_MS) return;
    lastRotate = now;

    const cutoff = now - 7 * 24 * 60 * 60 * 1000;
    let rotated = 0;
    try {
      for (const f of readdirSync(LOG_ROOT)) {
        if (!f.endsWith(".log")) continue;
        const fp = join(LOG_ROOT, f);
        // Prefer mtime; if file was touched recently but creation is old, still rotate
        const age = Math.min(statSync(fp).mtimeMs, statSync(fp).birthtimeMs);
        if (age < cutoff) {
          unlinkSync(fp);
          rotated++;
        }
      }
    } catch { /* ignore */ }
    if (rotated > 0) console.error(`🗑️ Rotated ${rotated} old logs (>7d)`);
  }
  ```

- [ ] **Step 4: Run → PASS**

- [ ] **Step 5: Verify**

---

### Task 6: Validate PI_BIN and SLQ_BIN at startup

**Files:**
- Modify: `src/loop.ts` (startup)

**Issue:** No check that `PI_BIN` resolves to an executable. If misconfigured, fails silently at first dispatch.

- [ ] **Step 1: Write test**
  Test startup validation of PI_BIN.

- [ ] **Step 2: Run → FAIL**

- [ ] **Step 3: Fix code**
  ```typescript
  function validateEnv(): string[] {
    const warnings: string[] = [];
    // Check PI_BIN exists in PATH or is absolute path
    const piBin = process.env.PI_BIN || "pi";
    if (!piBin.includes("/")) {
      // In PATH — best effort check
      try {
        const which = spawn("which", [piBin], { stdio: "pipe" });
        // Non-blocking check — if it fails, warn at startup
      } catch {
        warnings.push(`PI_BIN "${piBin}" not found in PATH`);
      }
    } else if (!existsSync(piBin)) {
      warnings.push(`PI_BIN path does not exist: ${piBin}`);
    }

    const slqBin = process.env.SLQ_BIN;
    if (slqBin && !existsSync(slqBin)) {
      warnings.push(`SLQ_BIN path does not exist: ${slqBin}`);
    }
    return warnings;
  }
  ```

  Call in `main()` after DB open:
  ```typescript
  const warnings = validateEnv();
  for (const w of warnings) console.error(`⚠️  ${w}`);
  ```

- [ ] **Step 4: Run → PASS**

- [ ] **Step 5: Verify**
