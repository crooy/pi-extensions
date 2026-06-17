#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGES=(
  pi-continuous-learning
  pi-blueprint
  pi-code-review
  pi-compass
  pi-red-green
  pi-caveman-simple
  pi-cavepeople
  pi-caveman
)

echo "🔨 Installing all pi-extensions from local repo..."
echo ""

# 1. Install deps + build
echo "📦 npm install..."
cd "$REPO_DIR"
npm install --silent

echo "🏗️  npm run build..."
npm run build

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
echo "  pi -e pi-continuous-learning   # or any other extension"
echo "  pi                              # all enabled extensions auto-load"