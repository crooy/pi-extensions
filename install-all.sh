#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGES=(
  pi-always-learning
  pi-simple-powers
  pi-caveman
)

echo "🔨 Installing all pi-extensions from local repo..."
cd "$REPO_DIR"

echo "📦 npm install..."
npm install --silent

echo "🏗️  npm run build..."
npm run build

echo "📦 Installing siq queue CLI..."
cd "$REPO_DIR/packages/pi-simple-queue"
npm install --silent
npm link 2>/dev/null || true

# back to repo root for package installs
cd "$REPO_DIR"

for pkg in "${PACKAGES[@]}"; do
  echo "🧩 pi install $REPO_DIR/packages/$pkg ..."
  pi install "$REPO_DIR/packages/$pkg"
done

echo ""
echo "✅ All packages installed."
echo "  siq       — queue CLI"
echo "  pi-siQ-loop — worker loop (starts automatically)"