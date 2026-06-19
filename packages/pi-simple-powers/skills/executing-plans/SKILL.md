---
name: executing-plans
description: 🪨 Execute written plan. Load, review, do tasks step-by-step, verify, finish.
---

# ⚡ Executing Plans

**Announce:** "Using executing-plans for [plan name]"

## 📋 Steps

### 1. Load & review plan
- Read plan file
- Questions? Ask user before starting
- Good? Create todo checkboxes

### 2. Execute tasks

Each task:
- [ ] Mark in_progress
- [ ] Follow exact steps (2-5 min each)
- [ ] Run verifications
- [ ] Mark done

### 3. Finish

- All tasks done + verified
- → finishing-a-development-branch skill

## 🛑 Blockers

STOP when:
- Missing dependency
- Test won't pass
- Instruction unclear
- Plan gaps

Ask user. Don't guess.

## 💡 Use skills

When plan says "use TDD" → invoke TDD skill
When plan says "review" → invoke code-review skill
When plan says "finish" → invoke finishing-branch skill

## 🎯 Remember

- Review plan critically first
- Follow exactly
- Never skip verification
- Stop on blocker
- Never impl on main/master without explicit consent