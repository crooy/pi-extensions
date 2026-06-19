#!/usr/bin/env bash
# release.sh — build all packages, run tests, push to GitHub
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

GIT_REMOTE="${1:-origin}"
BRANCH="${2:-main}"

echo "🏗️  Build all packages..."
npm run build

echo "🧪 Run all tests..."
npm test

echo "🔍 Typecheck..."
npm run typecheck

echo "📦 Lint..."
npm run lint

echo "✅ Git push to $GIT_REMOTE/$BRANCH..."
git push "$GIT_REMOTE" "$BRANCH"

echo "✅ Release done. Run install-all.sh to install from GitHub."