# 🪨 pi-simple-powers

Caveman-fied superpowers. All skills read like this — terse, no filler, emoji.

## Structure

```
packages/pi-simple-powers/
  extensions/
    superpowers.ts       # Pi extension: injects caveman bootstrap, registers skills
  skills/                 # 14 superpowers skills, all in caveman tongue
    using-superpowers/    # Bootstrap skill + Pi tool mapping reference
    brainstorming/        # Idea → spec, writes caveman design docs
    writing-plans/        # Bite-sized implementation plans
    test-driven-development/  # RED → GREEN → REFACTOR
    systematic-debugging/     # Root cause before fix
    verification-before-completion/  # Evidence before claims
    executing-plans/      # Step-by-step plan execution
    subagent-driven-development/  # 1 agent per task
    dispatching-parallel-agents/  # Parallel independent investigations
    requesting-code-review/       # Dispatch reviewer subagent
    receiving-code-review/        # Accept feedback with evidence
    using-git-worktrees/          # Isolated worktree per feature
    finishing-a-development-branch/  # Verify → merge/PR/discard
    writing-skills/         # Create Pi skills
  README.md
  package.json
  tsconfig.json
```

## Caveman mode

Every SKILL.md is caveman style:
- Drop articles/filler
- Fragments OK
- Technical terms exact
- Emoji, 🇳🇱/🇫🇷/🇩🇪 words welcome
- Code blocks unchanged

## Doc path convention

Skills tell agent to write docs to `docs/caveman/` by default.
Override with `/caveman-superpowers docs <path>`.
Monorepos get `docs/<pkg>/caveman/` hierarchy.

## Testing

```bash
npm test -w packages/pi-simple-powers
npm run typecheck -w packages/pi-simple-powers
```
