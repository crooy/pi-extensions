# 🪨 pi-extensions

> Fork of [MattDevy/pi-extensions](https://github.com/MattDevy/pi-extensions) — same tools, caveman tongue.
> **All forks speak caveman.** Why use many token when few do trick. 🇳🇱🇫🇷🇩🇪

A caveman-mode monorepo of [Pi](https://github.com/nicholasgasior/pi-coding-agent) extensions. — terse, technical, no fluff. Each package speaks caveman and ships with caveman-friendly AGENTS.md instructions.

Packages built and released independently under `packages/`.

## Packages

| Package | Description | npm |
|---|---|---|
| [pi-always-learning](packages/pi-always-learning) | Caveman memory: watches coding sessions, distills patterns into instincts with confidence scoring. Fire keeps knowledge alive. | [![npm](https://img.shields.io/npm/v/pi-always-learning)](https://www.npmjs.com/package/pi-always-learning) |
| [pi-simple-powers](packages/pi-simple-powers) | Caveman dev methodology: Obra's 14 skills in 🪨 tongue. Writes caveman docs. | (bundle only) |
| [pi-simple-queue](packages/pi-simple-queue) | SQLite queue CLI (slq) + pi-slq-loop worker. Plan-per-task, logs, rotation. | (CLI tool) |
| [pi-caveman](packages/pi-caveman) | Caveman speak toggle: cuts ~75% output tokens with intensity levels inc. "mixed" (emoji + 🇳🇱/🇫🇷/🇩🇪). Fork of jonjonrankin/pi-caveman. | [![npm](https://img.shields.io/npm/v/pi-caveman)](https://www.npmjs.com/package/pi-caveman) |

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
