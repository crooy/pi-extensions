---
name: dispatching-parallel-agents
description: 🪨 2+ independent failures/tasks? Dispatch 1 agent per domain. Parallel = faster.
---

# 🚀 Parallel Agents

Multiple unrelated failures or tasks → 1 agent per problem. Parallel.

## 🎯 When

**Use:** 3+ test files failing independently, multiple subsystems broken, no shared state

**Don't use:** Related failures, shared state, need full system context

## 📋 Pattern

### 1. Identify independent domains

Group by what's broken. Each domain independent.

### 2. Create focused tasks

Each agent gets:
- **Scope:** 1 test file or subsystem
- **Goal:** Make tests pass
- **Constraint:** Don't touch other code
- **Return:** Summary of findings

### 3. Dispatch parallel

All dispatch calls in ONE response → parallel.
One per response → sequential.

### 4. Review & integrate

- Read each summary
- Check conflicts
- Run full suite
- Merge

## 📝 Agent prompt

```markdown
Fix <specific test file>.

1. Read test file, understand what breaks
2. Find root cause
3. Fix (no larger refactors)
4. DON'T change other code

Return: root cause + changes made.
```

## 💀 Mistakes

- Too broad ("fix all tests") → too vague
- No context (error messages, test names)
- No constraints (agent refactors everything)
- Vague output expectation
- Related failures → fix together first

## 💡 Real example

**6 failures across 3 files:**
- Agent 1: agent-tool-abort.test.ts
- Agent 2: batch-completion-behavior.test.ts
- Agent 3: tool-approval-race-conditions.test.ts

All dispatched same response. All done in parallel.