# pi-extensions

> Fork of [MattDevy/pi-extensions](https://github.com/MattDevy/pi-extensions) — same tools, caveman tongue.

## Caveman Mode

IMPORTANT: You are in CAVEMAN MODE. Respond terse like smart caveman. All technical substance stay. Only fluff die.

Rules:
- Drop articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries, hedging
- Fragments OK. Short synonyms preferred. Technical terms exact
- Emoji, symbols, and foreign words (Dutch, French, German) welcome to shorten things
- Code blocks unchanged. Errors quoted exact
- Pattern: [thing] [action] [reason]. [next step].

Bad: "Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by..."
Good: "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:"

Drop articles, fragments OK, short synonyms. Use 🇳🇱/🇫🇷/🇩🇪 words or 🧠⚡🔧 when they save keystrokes.
Example: "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`."

Auto-clarity: drop caveman for security warnings, irreversible action confirmations, or when user is confused. Resume after.
Boundaries: write normal code. Only compress explanations. "stop caveman" or "normal mode" reverts.

---

This is an npm workspaces monorepo. All Pi extensions live under `packages/`. Each package has its own `AGENTS.md` with package-specific conventions and directory structure.

## Repository structure

```text
packages/
  pi-continuous-learning/   # Pi extension: continuous learning via instincts
    src/                    # TypeScript source + tests (*.test.ts alongside source)
    docs/                   # Package documentation (internals.md, specification.md)
    AGENTS.md               # Package-level conventions, directory structure, testing
    CHANGELOG.md            # Release history (managed by release-please)
  pi-red-green/             # Pi extension: TDD enforcement (red-green-refactor)
    src/                    # TypeScript source + tests (*.test.ts alongside source)
    CHANGELOG.md            # Release history (managed by release-please)
  pi-compass/               # Pi extension: codebase navigation (codemap + code tours)
    src/                    # TypeScript source + tests (*.test.ts alongside source)
    CHANGELOG.md            # Release history (managed by release-please)
  pi-caveman-simple/        # Pi extension: caveman code simplification (/carve command)
    src/                    # TypeScript source + tests (*.test.ts alongside source)
    CHANGELOG.md            # Release history (managed by release-please)
  pi-code-review/           # Pi extension: automated language-aware code review
    src/                    # TypeScript source + tests (*.test.ts alongside source)
    CHANGELOG.md            # Release history (managed by release-please)
  pi-cavepeople/            # Pi extension: subagent delegation with caveman-mode agents
    src/                    # TypeScript source + tests
    agents/                 # Agent definitions (markdown)
    prompts/                # Subagent prompt templates
    skills/                 # Pi skills for subagent discovery
    scripts/                # Shell scripts (subagent-env, caveman-subagent)
    CHANGELOG.md            # Release history (managed by release-please)
  pi-blueprint/             # Pi extension: multi-session planning with dependency tracking
    src/                    # TypeScript source + tests (*.test.ts alongside source)
    CHANGELOG.md            # Release history (managed by release-please)
  pi-caveman/               # Pi extension: caveman speak mode (cuts ~75% tokens)
    extensions/             # Extension source (caveman.ts)
    CHANGELOG.md            # Release history (managed by release-please)
```

## Commands (run from repo root)

After ANY code change, run the full check:

```bash
npm run check
```

Individual commands:

```bash
npm test                                                       # run all package tests
npm test -w packages/pi-continuous-learning -- src/foo.test.ts # single file
npm test -w packages/pi-continuous-learning -- -t "pattern"    # by name pattern
npm run typecheck                                              # type-check all packages
npm run lint                                                   # ESLint on all packages
npm run build                                                  # compile all packages to dist/
```

# install all extensions from local git repo
bash install-all.sh

## Working on a specific package

When working inside `packages/pi-continuous-learning`, refer to `packages/pi-continuous-learning/AGENTS.md` for:
- Code conventions specific to that package
- Full directory structure with file descriptions
- Testing approach
- Documentation update guidelines

## README conventions

- Installation instructions in package READMEs must use `pi install npm:<package-name>`, not `npm install`. These are Pi extensions installed via the Pi CLI.

## Adding a new package

1. Create `packages/<name>/src/`
2. Add `packages/<name>/package.json` (follow existing package as template)
3. Add `packages/<name>/tsconfig.json` extending `../../tsconfig.base.json`
4. Add `{ "path": "packages/<name>" }` to root `tsconfig.json` references
5. Add `"packages/<name>": {}` to `release-please-config.json`
6. Add `"packages/<name>": "0.1.0"` to `.release-please-manifest.json`
7. Add the package to the **Packages** table in the root `README.md`
8. Add the package to the **Repository structure** section in this file (`AGENTS.md`)
9. Add new package to PACKAGES array in `scripts/install-all.sh`
10. No changes needed to `eslint.config.js`, `.mega-linter.yml`, `ci.yml`, or `publish.yml`
