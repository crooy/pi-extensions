# 🪨 2026-06-19-fix-build-issue-in-pi-always-learning-ex

> GOAL: Fix build issue in pi-always-learning extension: investigate why dist/config.js is not generated. Tasks: 1. Check npm/node_modules/.bin for tsc executable. 2. Verify tsconfig.build.json and tsconfig.json. 3. Manually run tsc. 4. Fix build script in package.json.

Architecture
- Quick plan scope, key decisions

Steps
- [ ] Step 1: Setup scaffolding
- [ ] Step 2: Implement core
- [ ] Step 3: Wire together
- [ ] Step 4: Test and verify

Files touched
- `src/`

Validation
- `npm test` passes
