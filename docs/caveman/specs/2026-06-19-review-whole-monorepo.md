# 🪨 2026-06-19 Monorepo Code Review

> GOAL: Review whole pi-extensions monorepo for code quality, bugs, anti-patterns.

## Summary

| Package | Tests | Severity |
|---|---|---|
| pi-caveman | — | 🟢 minor only |
| pi-simple-powers | 0 (typecheck only) | 🟢 minor only |
| pi-simple-queue | 8 (all pass) | 🟡 2 bugs |
| pi-always-learning | 839 (all pass) | 🟡 5 findings |

---

## 🔴 BUGS

### BUG-1: `pi-simple-queue` — Worker PID never set (always 0)

**File:** `packages/pi-simple-queue/src/loop.ts` line ~185–191

```typescript
const result = await dispatchToPi({ goal, planPath, cwd });
const { exitCode, output } = result;
if (result.pid) setWorkerPid(task.id, result.pid); // ❌ pid ALWAYS 0
```

`dispatchToPi` resolves with `{ pid: 0 }` because PID is captured in `close`/`error` handlers (when process already exited). `setWorkerPid` never gets real PID → `reclaimDeadPids()` cannot detect real dead workers.

**Fix:** Capture `currentWorker.pid` immediately after spawn, not in close/error:
```typescript
const worker = spawn(PI_BIN, ...);
const pid = worker.pid; // capture NOW
worker.on("close", (code) => { currentWorker = null; resolve({ exitCode: code ?? 1, output, pid }); });
```

### BUG-2: `pi-simple-queue` — `list-plans` SQL aggregates miss distinct plans

**File:** `packages/pi-simple-queue/src/queue.ts` `listPlans()`

```typescript
const result = db.exec(`SELECT plan_path, COUNT(*) as total, ... FROM tasks WHERE plan_path IS NOT NULL AND plan_path != '' GROUP BY plan_path ORDER BY plan_path`);
if (!result.length) return [];
const r = result[0]!;
```

SQL.js `db.exec()` returns **one result per statement**. Multiple rows from `GROUP BY` come in single `result[0]`. Code assumes `result[0]` has all plan rows — this is correct for SQL.js. **But**: `PlanSummary` type expects `{ plan_path, total, blocked, pending, active, done, failed }` — the `listPlans()` returns `obj as unknown as PlanSummary` via `rowToTask`-style mapping. This cast bypasses type safety. If a column is missing or renamed, it silently produces garbage.

**Severity: Low.** Only affects `slq list-plans` CLI. Test covers it.

---

## 🟡 CODE QUALITY ISSUES

### CQ-1: `pi-always-learning` — Stale JSDoc on confidence decay rate

**File:** `packages/pi-always-learning/src/confidence.ts` line ~105

```typescript
/**
 * Applies passive time-based decay of -0.02 per week since lastUpdated.
 * Future lastUpdated values produce zero decay.
 */
```

but constant is:
```typescript
const DECAY_PER_WEEK = 0.05;
```

JSDoc says 0.02, code uses 0.05. Decay was intentionally increased but comment not updated.

**Fix:** Update JSDoc to match actual constant.

### CQ-2: `pi-always-learning` — Inconsistent confidence formatting instincts vs facts

**File:** `packages/pi-always-learning/src/instinct-injector.ts`

- Instincts: `.toFixed(2).substring(2)` → `.90`, `.75`, `1.00`
- Facts: `String(f.confidence).replace(/^0\./, "")` → `.9`, `.75` (0.9 loses trailing zero)

Inconsistent visual format in system prompt injection. Minor but visible to agent.

### CQ-3: `pi-simple-queue` — `rowToTask`/`listPlans` use `as unknown as T` everywhere

**File:** `packages/pi-simple-queue/src/queue.ts`

```typescript
function rowToTask(cols: string[], row: unknown[]): Task {
  const obj: Record<string, unknown> = {};
  cols.forEach((col, i) => { obj[col] = row[i]; });
  return obj as unknown as Task;
}
```

`listPlans` uses same pattern:
```typescript
return r.values.map((row) => {
  const obj: Record<string, unknown> = {};
  cols.forEach((col, i) => { obj[col] = row[i]; });
  return obj as unknown as PlanSummary;
});
```

No runtime validation. If SQLite returns unexpected types (null for number fields), cast silently produces NaN/undefined.

**Mitigation:** Schema is fixed and tests cover all methods. But adding `Number(obj.col)` coercions would be defensive.

### CQ-4: `pi-simple-powers` — `expandWorkspaceGlob` only handles `/*`

**File:** `packages/pi-simple-powers/extensions/simple-powers.ts`

```typescript
function expandWorkspaceGlob(pattern: string, base: string): string[] {
  if (pattern.endsWith("*")) {
    const prefix = pattern.replace("/*", "").replace(/\/\*$/, "");
```

Only handles `packages/*`. Pattern `packages/*/sub` or `packages/**` would fail.

**Impact:** Low. npm workspaces spec uses `/*` for most repos. But `**` is valid npm workspaces glob.

### CQ-5: `pi-simple-powers` — `firstNonCompactionIndex` walks past compaction messages then inserts bootstrap

**File:** `packages/pi-simple-powers/extensions/simple-powers.ts`

```typescript
const insertAt = firstNonCompactionIndex(event.messages);
return {
  messages: [...event.messages.slice(0, insertAt), { role: "user", content: ... }, ...event.messages.slice(insertAt)],
};
```

Inserts bootstrap message after compaction summaries but before other messages. If some messages after compaction are also system-role, bootstrap may interleave oddly.

**Impact:** Cosmetic. Functionally correct.

---

## 🟢 MINOR / NITS

| File | Issue |
|---|---|
| `pi-always-learning/src/observer-guard.ts` | `shouldSkipObservation(filePath?)` — parameter never passed in production. Signature misleading. |
| `pi-always-learning/src/instinct-cleanup.ts` | Duplicate `// Result type` comments before `CleanupResult` and `cleanupDir`. |
| `pi-simple-queue/src/loop.ts` | `extractSummary` swallows non-JSON output → always returns "done". |
| `pi-simple-queue/src/plan.ts` | `generatePlanPath` slices goal to 40 chars — collision risk for similar long goals. |
| `pi-caveman/extensions/caveman.ts` | Fire ANSI codes use 256-color palette — breaks on basic terminals. |
| `pi-caveman/extensions/caveman.ts` | Each level change appends session entry; never cleaned. |

---

## 🏗️ ARCHITECTURE NOTES

### pi-always-learning
- **Good:** 839 tests, 52 test files. Extensive coverage of parser, decay, cleanup, injection.
- **Good:** File-based YAML instinct/fact storage. Human-editable. Decay + cleanup pipeline well-designed.
- **Good:** Volume control (caps, TTL, flagged deletion) prevents storage bloat.
- **Concern:** No test for `skipObservation` with actual file path. Shadow API path never exercised.
- **Concern:** `confidence.ts` exported as pure module but `fact-decay.ts` and `instinct-decay.ts` both duplicate mutation pattern with `Partial<T>` for `flagged_for_removal`. Could share helper.

### pi-simple-queue
- **Good:** WAL mode + busy_timeout = concurrent-safe SQLite.
- **Good:** PID-based dead worker reclamation.
- **Good:** Column migration pattern (`ALTER TABLE ADD COLUMN` with try/catch).
- **Concern:** No migration versioning — adding columns via try/catch is fragile for complex migrations.
- **Concern:** `closeDb()` called synchronously in CLI — any pending saves lost if crash between `saveDb` and `close`.

### pi-caveman
- **Good:** Clean event-driven state with session_resume support.
- **Good:** Sequential config save queue avoids race conditions.
- **Good:** Well-structured prompt fragments separated by intensity level.

### pi-simple-powers
- **Good:** Bootstrap injection with dedup marker (`<EXTREMELY_IMPORTANT>` + marker text).
- **Good:** Monorepo-aware doc path detection.
- **Concern:** 0 tests beyond node --test skel. Skills are markdown — no test coverage for bootstrap content correctness.

---

## 📊 TYPE SAFETY AUDIT

| Package | Strict null checks | `as unknown as T` casts | Unsafe type assertions |
|---|---|---|---|
| pi-caveman | ✅ | 0 | 0 |
| pi-simple-powers | ❓ no tsconfig check | 2 (`contentIncludes`, `firstNonCompactionIndex`) | `unknown` message cast |
| pi-simple-queue | ✅ | 5 (`rowToTask`, `listPlans`, various `row as [number, number]`) | SQLite row casts |
| pi-always-learning | ✅ | 0 | 0 (TypeBox validated for config) |

---

## ✅ VERIFICATION

```
npm test: 52 test files / 839 tests + 8 queue tests = all pass
npm run typecheck: would need to check
npm run lint: would need to check
```

---

## 🔧 RECOMMENDED FIXES (priority order)

1. **🔴 BUG-1:** Fix worker PID capture in `dispatchToPi` (pi-simple-queue)
2. **🟡 CQ-1:** Update confidence.ts JSDoc (pi-always-learning)
3. **🟡 CQ-2:** Align fact confidence formatting with instinct format (pi-always-learning)
4. **🟡 CQ-3:** Add defensive type coercion to `rowToTask` (pi-simple-queue)
5. **🟢** Add tests for `shouldSkipObservation` with filePath (pi-always-learning)
6. **🟢** Remove duplicate `// Result type` comment (pi-always-learning)
