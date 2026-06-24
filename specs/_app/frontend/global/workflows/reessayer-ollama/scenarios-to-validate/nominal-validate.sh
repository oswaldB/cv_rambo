#!/bin/bash
# Validation - 8 checkpoints
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/reessayer-ollama/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "ollama-error-detected" "$CODE_FILE" || exit 1
grep -q "retry-message-shown" "$CODE_FILE" || exit 1
grep -q "retry-delay-started" "$CODE_FILE" || exit 1
grep -q "network-checked" "$CODE_FILE" || exit 1
grep -q "request-retried" "$CODE_FILE" || exit 1
grep -q "retry-success" "$CODE_FILE" || exit 1
grep -q "retry-failed" "$CODE_FILE" || exit 1
grep -q "retry-logged" "$CODE_FILE" || exit 1

echo "=== ✅ reessayer-ollama: 8/8 OK ==="
