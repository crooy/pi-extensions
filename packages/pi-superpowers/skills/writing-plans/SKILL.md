---
name: writing-plans
description: 🪨 Write impl plan from spec. Bite-sized tasks, exact code, caveman style. Writes docs/caveman/plans/<date>-<title>.md.
---

# 📝 Writing Plans

Break spec → task-by-task plan. Caveman style.

**Announce:** "Using writing-plans skill."

## 📍 Plan path

Write to: `docs/caveman/plans/<date>-<title>.md`
Override: `/caveman-superpowers docs <path>`
Monorepo: `docs/<pkg>/caveman/plans/<date>-<title>.md`

Caveman style. Terse. Emoji. Fragments.

## 📄 Plan header

```markdown
# [Feature] Impl Plan

> **Subagent:** Use subagent-driven-development or executing-plans.

**Goal:** [1 sentence]

**Architecture:** [2-3 sentences]

**Tech Stack:** [tools/langs]

## Global Constraints

[from spec, verbatim]
---
```

## 🧩 Task structure

Each task = 2-5 min. Task produces testable deliverable.

```markdown
### Task N: [Name]

**Files:**
- Create: `path/to/file.ts`
- Modify: `path/to/existing.ts:10-20`
- Test: `tests/path/test.ts`

**Interfaces:**
- Consumes: `functionName(params)` (from earlier tasks)
- Produces: `functionName(params): ReturnType` (for later tasks)

- [ ] **Step 1: Write failing test**
  ```typescript
  test('name', () => { ... })
  ```

- [ ] **Step 2: Run → FAIL**
  `npm test path/test.ts`
  Expected: FAIL

- [ ] **Step 3: Write minimal code**
  ```typescript
  function name() { ... }
  ```

- [ ] **Step 4: Run → PASS**
  `npm test path/test.ts`
  Expected: PASS

- [ ] **Step 5: Commit**
  `git add ... && git commit -m "feat: ..."`
```

## 💀 NO placeholders

NEVER write:
- "TBD", "TODO", "implement later"
- "Add error handling" (without code)
- "Similar to Task X" (repeat code)
- Missing types/signatures

## 🔍 Self-review after writing

- [ ] Spec coverage: every req has task?
- [ ] Placeholders: search for TBD/TODO/etc?
- [ ] Type consistency: signatures match across tasks?

## 🏁 Handoff

After plan saved:

> "Plan: `docs/caveman/plans/<file>.md`. Execute via:
> 1. **Subagent-Driven** — 1 agent per task, review between
> 2. **Inline** — via executing-plans
> Which?"

If subagent → use subagent-driven-development skill
If inline → use executing-plans skill