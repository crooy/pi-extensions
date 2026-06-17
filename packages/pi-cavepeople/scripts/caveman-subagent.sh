#!/bin/bash
# Caveman subagent wrapper
# Usage: scripts/caveman-subagent.sh <working-dir> <agent-name> <task>

set -e

if [ $# -lt 3 ]; then
  echo "Usage: scripts/caveman-subagent.sh <working-dir> <agent-name> <task...>"
  exit 1
fi

WORKDIR="$1"
AGENT="$2"
shift 2
TASK="$*"

# Setup env in subshell
cd "$WORKDIR"

# Load direnv if available
if command -v direnv >/dev/null 2>&1; then
  eval "$(direnv export bash)"
fi

# Enable caveman mode
export CAVEMAN_MODE=1

# Run pi subagent
pi "$AGENT" "$TASK"