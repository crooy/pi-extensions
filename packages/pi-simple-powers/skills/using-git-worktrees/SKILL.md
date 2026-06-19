---
name: using-git-worktrees
description: 🪨 Isolated worktree per feature. Branch + worktree → no state bleed. Always.
---

# 🌲 Git Worktrees

Isolated workspace per feature.

## 📋 Process

### 1. Create worktree

```bash
git worktree add ../<feature-name> -b <feature-branch>
cd ../<feature-name>
```

### 2. Set up

```bash
npm install   # if needed
npm test      # verify baseline green
```

### 3. Work in worktree

All changes in worktree dir. Main repo untouched.

### 4. Finish

→ finishing-a-development-branch skill

## 🎯 When

**Always** for:
- New features
- Major refactors
- Experimental changes
- Anything that could break

**Skip only for:**
- Trivial single-file change (ask user)

## 💡 Why

- Main branch always clean
- No state bleed
- Can parallel features
- Can abandon without cleanup
- `git worktree remove <name>` and gone

## 🛑 No

- Work on main/master without explicit consent
- Skip for "small changes" (they get big)
- Forget to cleanup old worktrees