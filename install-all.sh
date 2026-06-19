#!/usr/bin/env bash
# install-all.sh — install all packages from GitHub + CLI binaries globally
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
GITHUB_URL="git:github.com/crooy/pi-extensions"

echo "🔨 Installing pi-extensions from GitHub + local CLI builds..."
cd "$REPO_DIR"

echo "🏗️  Build all packages..."
npm run build

echo "📦 Install CLI packages globally..."
# pi-simple-queue: slq + pi-slq-loop CLI binaries
npm i -g "./packages/pi-simple-queue"

# pi-always-learning: pi-cl-analyze CLI binary
npm i -g "./packages/pi-always-learning"

echo "🧩 Install pi extensions via GitHub..."
pi install "$GITHUB_URL"

echo ""
echo "✅ Done. Installed:"
echo "  slq           — queue CLI"
echo "  pi-slq-loop   — worker loop daemon"
echo "  pi-cl-analyze — instinct analyzer"
echo "  pi extensions — from $GITHUB_URL"