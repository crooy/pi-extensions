---
name: finishing-a-development-branch
description: 🪨 All tasks done? Verify tests, present options (merge/PR/keep/discard), cleanup.
---

# 🏁 Finishing Development Branch

All tasks done + verified? Let's finish.

## 📋 Process

### 1. Verify everything

```bash
npm test        # all tests pass?
npm run typecheck  # types clean?
npm run lint   # lint clean?
```

All green? Proceed.

### 2. Present options

**1. Merge to main**
- `git checkout main && git merge <branch>`
- Clean, simple, done

**2. PR request**
- `git push origin <branch>`
- Open PR from GitHub/GitLab

**3. Keep branch**
- Leave worktree for later
- Note what's unfinished

**4. Discard**
- `git worktree remove <worktree>`
- `git branch -D <feature-branch>`
- Clean slate

### 3. Execute user choice

Do what user picks. No extra steps.

## 🎯 Key

- Verify BEFORE presenting options
- Cleanup worktree after merge/discard
- Don't push unless user asks
- Don't merge unless user confirms