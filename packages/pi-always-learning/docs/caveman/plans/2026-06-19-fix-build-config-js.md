# 🪨 Fix: dist/config.js not generated on rebuild

Date: 2026-06-19

## Root cause

`tsconfig.build.json` `exclude` overrides parent `exclude` — TypeScript does NOT merge them.

**Before (broken):**
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "composite": false },
  "exclude": ["node_modules", "src/**/*.test.ts"]
}
```

Parent `tsconfig.json` had `exclude: ["node_modules", "dist"]`. But child `exclude` replaces entirely. `dist` was NOT excluded.

**Effect:** On rebuild (when dist/ exists from prior build), tsc would see dist/*.js as source files → confusion, duplicate declarations, silent skips. config.js might not regenerate.

## Fix

Add `"dist"` to `exclude` in `tsconfig.build.json`:

```json
"exclude": ["node_modules", "dist", "src/**/*.test.ts"]
```

## Verification

- `npm run build` → exit 0, config.js generated (140 lines)
- `npm test` → 52 files, 839 tests pass
- `npm run check` → all green
- `bash scripts/release.sh` → build + test + typecheck + lint + push = ✅
- No tsbuildinfo regenerated (composite: false)

## Files changed

- `packages/pi-always-learning/tsconfig.build.json` — added `"dist"` to exclude

## Why subtle

`.gitignore` has `packages/*/tsconfig*.tsbuildinfo` — good. Had stale `tsconfig.tsbuildinfo` from earlier composite run. Cleaned by build script. No recurrence with composite:false.
