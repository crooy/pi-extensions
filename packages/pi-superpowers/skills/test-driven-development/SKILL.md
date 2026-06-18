---
name: test-driven-development
description: 🪨 RED → GREEN → REFACTOR. Test first. Watch fail. Write min code. Watch pass. Refactor. Mandatory before implementation.
---

# 🟥🟩🔧 TDD

**Core:** No test failure = no code. Write test first. Watch fail. Write min code. Watch pass. Refactor.

## 🦴 IRON LAW

**NO production code without failing test first.**
Code before test? DELETE. Start over.

## 📋 Process

### 🟥 RED — Write failing test

```typescript
test('feature', () => {
  const result = fn(input);
  expect(result).toBe(expected);
});
```

- One behavior per test
- Clear name
- Real code (no unnecessary mocks)

### 👀 Verify RED — Watch fail

```bash
npm test path/test.ts
```

Confirm: fails for right reason (feature missing, not typo).
Passes? Test tests existing behavior — fix test.

### 🟩 GREEN — Minimal code

Write simplest code that passes test. No YAGNI.
No extras. Just pass.

### 👀 Verify GREEN — Watch pass

```bash
npm test path/test.ts
```

Confirm: passes. Other tests still pass.

### 🔧 REFACTOR — Clean up

Only after GREEN. Keep tests green. Don't add behavior.

### 🔁 Repeat

Next failing test → next feature.

## 💀 Rationalizations

| Excuse | Reality |
|--------|---------|
| "Too simple" | Simple breaks. 30s test. |
| "Test after" | Passes immediately = proves nothing. |
| "Delete is wasteful" | Sunk cost. Keep unverified code = debt. |
| "TDD is slow" | TDD faster than debugging. |

## 📋 Verification

- [ ] Every function tested
- [ ] Watched each fail before impl
- [ ] Minimal code per test
- [ ] All pass, output clean
- [ ] Edge cases covered
- [ ] Real code, not mocks

## 🐛 Debug integration

Bug found? Write failing test first. RED → GREEN.
No fix without test.