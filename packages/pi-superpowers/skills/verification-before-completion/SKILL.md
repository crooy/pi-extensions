---
name: verification-before-completion
description: 🪨 Evidence before claims. Run checks BEFORE saying done. No "should pass" — only "passed".
---

# ✅ Verification Before Completion

**Core:** Evidence before claims. Run command. Read output. THEN state result.

## 🦴 IRON LAW

**NO completion claims without fresh verification evidence.**
Didn't run it in THIS message? Don't claim it passes.

## 🔒 Gate function

```
BEFORE claiming success:
1. WHAT command proves claim?
2. RUN it — fresh, complete
3. READ output — exit code, failures
4. MATCH — does output confirm?
   NO → state actual status with evidence
   YES → state claim + evidence
5. THEN make claim

Skip any step = lying.
```

## 💀 Common failures

| Claim | Needs | Not enough |
|-------|-------|------------|
| "Tests pass" | Run output: 0 fail | "Should pass" |
| "Lint clean" | Lint output: 0 errs | "Lint passes" |
| "Build succeeds" | Build exit 0 | "Lint passes" |
| "Bug fixed" | Test original symptom | "Code changed" |
| "Regression test" | Red-green verified | "Test passes" |

## 💀 Red flags

- "should", "probably", "seems to"
- Expressing satisfaction before verification ("Great!", "Done!", etc.)
- Trusting agent reports
- "Just this once"
- Tired = not excuse

## 🎯 Key pattern

✅ Run command → See output → "Tests pass (34/34)"
❌ "Should pass now"

✅ Regression: Write → pass → revert → fail → restore → pass (red-green proof)
❌ "I wrote regression test" (without red-green)

## 🎯 When

ALWAYS before:
- Claiming done/fixed/complete
- Expressing satisfaction
- Commit/PR
- Next task
- Agent delegation report

> **"No shortcuts for verification. Run command. Read output. THEN claim."**