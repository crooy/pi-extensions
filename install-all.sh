#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGES=(
  pi-caveman-learning
  pi-caveman-forge
  pi-code-review
  pi-compass
  pi-red-green
  pi-caveman-simple
  pi-cavepeople
  pi-caveman
  pi-superpowers
)

echo "🔨 Installing all pi-extensions from local repo..."
echo ""

# 1. Install deps + build
echo "📦 npm install..."
cd "$REPO_DIR"
npm install --silent

echo "🏗️  npm run build..."
npm run build

echo "🔨 Building slq Go CLI..."
cd "$REPO_DIR/slq"
go build -o slq .
cp slq ~/.local/bin/slq 2>/dev/null || true

echo "📦 Installing slq-js (TS CLI)..."
cd "$REPO_DIR/packages/slq-js"
npm install --silent
# symlink for global access
npm link 2>/dev/null || true

# 2. Install each extension via pi
echo ""
for pkg in "${PACKAGES[@]}"; do
  echo "🧩 pi install ./packages/$pkg ..."
  pi install "./packages/$pkg"
done

echo ""
echo "✅ All extensions installed."
echo ""
echo "Usage:"
echo "  pi -e pi-caveman-learning   # or any other extension"
echo "  pi                              # all enabled extensions auto-load"