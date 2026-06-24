#!/bin/bash
# Validation rapide - 9 checkpoints
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/afficher-loader-munitions/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "loader-component-created" "$CODE_FILE" || exit 1
grep -q "loader-styled" "$CODE_FILE" || exit 1
grep -q "loading-started" "$CODE_FILE" || exit 1
grep -q "loader-displayed" "$CODE_FILE" || exit 1
grep -q "bullets-animated" "$CODE_FILE" || exit 1
grep -q "text-updated" "$CODE_FILE" || exit 1
grep -q "loading-ended" "$CODE_FILE" || exit 1
grep -q "loader-hidden" "$CODE_FILE" || exit 1
grep -q "loader-removed" "$CODE_FILE" || exit 1

echo "=== ✅ afficher-loader-munitions: 9/9 OK ==="
