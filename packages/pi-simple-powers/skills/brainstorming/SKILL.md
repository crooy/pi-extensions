---
name: brainstorming
description: 🪨 MUST use before creative work. Turns idea → spec via caveman questions. Writes docs/caveman/specs/<date>-<title>.md.
---

# 🏔️ Brainstorming → Spec

Turn vague idea → clear spec. Caveman style.

<HARD-GATE>
NO implementation until design written + user approved. Period.
</HARD-GATE>

## 📋 Do these in order

- [ ] **Explore** — check files, recent commits, project context
- [ ] **Ask** — questions 1-at-a-time. Purpose, constraints, success criteria
- [ ] **Propose 2-3 approaches** — trade-offs, recommend 1
- [ ] **Present design** — sections, get approval per section
- [ ] **Write spec** — to docs (see path below)
- [ ] **Self-review spec** — check for gaps, contradictions, TBDs
- [ ] **User reviews** — ask them to read file
- [ ] **→ writing-plans skill**

## 📍 Spec path

Write to: `docs/caveman/specs/<date>-<title>.md`
Override: `/caveman-superpowers docs <path>`
Monorepo: `docs/<pkg>/caveman/specs/<date>-<title>.md`

Caveman style. Terse. Emoji. Fragments. Keep code blocks normal.

## 🧠 YAGNI ruthlessly

Cut unnecessary features. Smaller scope = faster delivery.

## 💀 Anti-pattern

"Too simple to design" — NO. Simple projects hide assumptions.
5 sentences still beats guessing.

## ⛓️ Process

1. Check current state (files, recent git)
2. Questions 1-by-1 (prefer multiple choice)
3. 2-3 approaches with tradeoffs, recommend 1
4. Present design in sections
5. User approves → write spec
6. Self-review (TBDs? contradictions? scope?)
7. User reviews file
8. → writing-plans skill. NOT frontend-design or mcp-builder.

## 🛑 HARD GATE

No code. No scaffolding. No implementation. Design first. User approves first.