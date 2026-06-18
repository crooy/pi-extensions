---
name: receiving-code-review
description: 🪨 Accept feedback with evidence. Verify before implementing. Push back if wrong.
---

# 📨 Receiving Code Review

Review feedback comes. Handle systematic. Don't blindly implement.

## 📋 Process

### 1. Understand each issue

Read each issue. Do YOU understand it? Ask clarifying if not.

### 2. Verify before implementing

Don't just implement. Check:
- Is reviewer correct?
- Can you reproduce?
- Does fix actually help?

### 3. Categorize

- 🔴 Critical: fix immediately
- 🟡 Important: fix before proceed
- 🟢 Minor: note for later
- ❌ Wrong: explain why. Show code/tests.

### 4. Implement fixes

TDD each fix. Test first.

### 5. Verify after

All still green? Done.

## 💀 Don't

- Blindly implement everything
- Ignore valid feedback
- Argue without evidence
- Skip verification
- "Reviewer knows better" — verify first

## 💡 Tips

- Review code is code. Test it.
- If reviewer says "wrong approach", question fundamentals
- If reviewer says "test coverage missing", add tests
- If reviewer says "bug here", reproduce first
- If reviewer wrong: "I see why you'd think that — here's why it works"
- Be humble. Be technical. Be right.