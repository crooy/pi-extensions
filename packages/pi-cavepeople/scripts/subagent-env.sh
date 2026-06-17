#!/bin/bash
# Setup env for caveman subagent
# Usage: source scripts/subagent-env.sh /target/working/dir

set -e

if [ $# -ne 1 ]; then
  echo "Usage: source scripts/subagent-env.sh <working-dir>"
  return 1
fi

WORKDIR="$1"
cd "$WORKDIR"

# Load direnv if available
if command -v direnv >/dev/null 2>&1; then
  eval "$(direnv export bash)"
fi

# Enable caveman mode
export CAVEMAN_MODE=1

echo "Subagent env ready in $WORKDIR"