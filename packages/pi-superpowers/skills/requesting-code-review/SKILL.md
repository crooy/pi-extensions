---
name: requesting-code-review
description: 🪨 Dispatch reviewer subagent per task. Catch issues before they compound.
---

# 👁️ Request Code Review

**Core:** Review early, review often. After each task.

## 📋 When

**Mandatory:**
- After each subagent task
- After major feature
- Before merge

**Optional:**
- When stuck (fresh perspective)
- Before refactoring
- After complex bug fix

## 📋 Process

### 1. Get git SHAs
```bash
BASE_SHA=$(git rev-parse HEAD~1)
HEAD_SHA=$(git rev-parse HEAD)
```

### 2. Dispatch reviewer

Send reviewer with:
- Description: what built
- Requirements: what it should do
- Plan/spec reference
- Base SHA → Head SHA

### 3. Act on feedback

- 🔴 Critical → fix immediately
- 🟡 Important → fix before proceed
- 🟢 Minor → note for later
- Reviewer wrong? Push back with reasoning

## 📝 Example

```
[Task 2 done. Requesting review.]

Dispatch: code-reviewer
  Description: Added verifyIndex() and repairIndex()  
  Requirements: Task 2 from plan
  Base: a7981ec
  Head: 3df7661

[Reviewer returns:]
- Important: Missing progress indicators
- Minor: Magic number 100

Fix: [progress indicators]
Continue: [Task 3]
```

## 💀 Red flags

- Skip review "it's simple"
- Ignore critical issues
- Proceed with unfixed important issues
- Argue with valid technical feedback
- Reviewer wrong? Show code/tests proving it works