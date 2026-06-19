---
name: subagent-driven-development
description: 🪨 Subagent per task + 2-stage review. Fast iteration, fresh context per task.
---

# 🧑‍🤝‍🧑 Subagent-Driven Development

1 subagent per task. Fresh context. 2-stage review.

## 📋 Process

### For each task:
1. **Dispatch subagent** with:
   - Plan excerpt (their task ONLY)
   - File paths
   - Exact code to write
   - Acceptance criteria
2. **Subagent does:** TDD → impl → test → commit
3. **Stage 1 review:** Spec compliance — does it match spec?
4. **Stage 2 review:** Code quality — clean? DRY? YAGNI?
5. **Fix issues** or accept

### Avoid:
- Subagents DON'T inherit your session context
- Give them JUST their task + minimal context
- Fresh context = better focus

## 📝 Dispatch template

```
Task: [N: Name]
Files: [paths]
Goal: [what this task builds]
Test: [how to verify]
Constraints: [what NOT to do]
Return: [summary of changes]
```

## 🎯 Key rules

- One task per subagent
- Review between tasks
- Critical issues block next task
- Important issues fix before proceeding
- Minor issues note for later
- Subagent wrong? Push back with reasoning

## 💀 No

- Subagents share context
- Skip review "because simple"
- Ignore critical issues
- Proceed with unfixed important issues