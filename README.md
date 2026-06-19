# 🪨 pi-extensions

> Fork of [MattDevy/pi-extensions](https://github.com/MattDevy/pi-extensions) — same tools, caveman tongue.
> **All forks speak caveman.** Why use many token when few do trick. 🇳🇱🇫🇷🇩🇪

A caveman-mode monorepo of [Pi](https://github.com/nicholasgasior/pi-coding-agent) extensions. — terse, technical, no fluff. Each package speaks caveman and ships with caveman-friendly AGENTS.md instructions.

Packages built and released independently under `packages/`.

## Packages

| Package | Description | npm |
|---|---|---|
| [pi-always-learning](packages/pi-always-learning) | Caveman memory: watches coding sessions, distills patterns into instincts with confidence scoring. Fire keeps knowledge alive. | [![npm](https://img.shields.io/npm/v/pi-always-learning)](https://www.npmjs.com/package/pi-always-learning) |
| [pi-red-green](packages/pi-red-green) | TDD enforcement for agent sessions: RED-GREEN-REFACTOR state machine with phase-specific prompt injection and test run detection | [![npm](https://img.shields.io/npm/v/pi-red-green)](https://www.npmjs.com/package/pi-red-green) |
| [pi-compass](packages/pi-compass) | Codebase navigation: generates structured codemaps and interactive code tours for faster agent onboarding | [![npm](https://img.shields.io/npm/v/pi-compass)](https://www.npmjs.com/package/pi-compass) |
| [pi-caveman-simple](packages/pi-caveman-simple) | Caveman code simplification: carves recently changed code down to essential shape — clarity, consistency, no fluff | [![npm](https://img.shields.io/npm/v/pi-caveman-simple)](https://www.npmjs.com/package/pi-caveman-simple) |
| [pi-code-review](packages/pi-code-review) | Automated code review: language-aware review after edits with structured findings | [![npm](https://img.shields.io/npm/v/pi-code-review)](https://www.npmjs.com/package/pi-code-review) |
| [pi-caveman-forge](packages/pi-caveman-forge) | Caveman planning forge: brainstorm → plan → execute. Produces brainstorm.md + plan.md, optionally delegates to caveman subagents. | [![npm](https://img.shields.io/npm/v/pi-caveman-forge)](https://www.npmjs.com/package/pi-caveman-forge) |
| [pi-caveman](packages/pi-caveman) | Caveman speak toggle: cuts ~75% output tokens with intensity levels inc. "mixed" (emoji + 🇳🇱/🇫🇷/🇩🇪). Fork of jonjonrankin/pi-caveman. | [![npm](https://img.shields.io/npm/v/pi-caveman)](https://www.npmjs.com/package/pi-caveman) |
| [pi-simple-powers](packages/pi-simple-powers) | Caveman superpowers: Obra's methodology in 🪨 tongue. 14 skills, writes caveman docs. | (bundle only) |
| [pi-simple-queue](packages/pi-simple-queue) | 🪨 SQLite queue CLI for pi workers. TS, sql.js. slq + pi-slq-loop. | (CLI tool) |

## Development

All AGENTS.md files enforce caveman mode — terse, no fluff, emoji + 🇳🇱/🇫🇷/🇩🇪 welcome.

```bash
npm install                           # install all workspace dependencies
npm test                              # run all package tests
npm run build                         # compile all packages to dist/
npm run typecheck                     # type-check all packages
npm run lint                          # ESLint across all packages
npm run check                         # tests + lint + typecheck (mirrors CI)
npm run lint:mega                     # run MegaLinter locally (requires Docker)
```

See each package's `README.md` for installation and usage, and `AGENTS.md` for development conventions.
