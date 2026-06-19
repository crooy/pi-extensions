---
name: systematic-debugging
description: 🪨 4-phase root cause before fix. No guessing. Trace data. Find source. Fix at root, not symptom.
---

# 🔍 Systematic Debugging

**Core:** Root cause BEFORE fix. Symptom fixes = failure.

## 🦴 IRON LAW

**NO fix without root cause investigation first.**
No exceptions. No "quick fix" shortcuts.

## 📋 4 Phases

### Phase 1: Root Cause Investigation

BEFORE any fix:

1. **Read errors completely** — stack traces, line numbers, codes
2. **Reproduce reliably** — exact steps, every time?
3. **Check recent changes** — git diff, new deps
4. **Gather evidence** — for multi-component: log at each boundary
5. **Trace data flow** — backward from error, find bad value origin

### Phase 2: Pattern Analysis

1. **Find working examples** — similar code that works
2. **Compare** — what's different between working/broken?
3. **Understand dependencies** — config, env, assumptions

### Phase 3: Hypothesis & Test

1. **Single hypothesis** — "X is root cause because Y"
2. **Test minimally** — smallest change, one variable
3. **Verify** — worked? → Phase 4. Didn't? → new hypothesis

### Phase 4: Fix

1. **Write failing test** reproducing bug (TDD style)
2. **Single fix** — root cause, ONE change
3. **Verify** — test passes, nothing else broken
4. **3+ fixes failed?** → Stop. Architecture problem. Talk to user.

## 💀 Red flags

| Thought | Reality |
|--------|---------|
| "Quick fix for now" | No. Investigate first. |
| "Try X and see" | Guesswork. |
| "Multiple changes, run" | Can't isolate what worked. |
| "3+ fixes, one more" | Architecture problem. Stop. |

## 🧠 Techniques

- **Backward tracing** — follow bad value upstream
- **Defense in depth** — validate at each layer AFTER root fix
- **Condition-based wait** — no arbitrary timeouts

## 📋 Result

- Root cause identified (not symptom)
- Failing test written
- Single fix applied
- All green