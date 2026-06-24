#!/bin/bash
# Validation rapide - 9 checkpoints
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/sauvegarder-donnees/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "change-event-received" "$CODE_FILE" || exit 1
grep -q "data-validated" "$CODE_FILE" || exit 1
grep -q "db-opened" "$CODE_FILE" || exit 1
grep -q "doc-prepared" "$CODE_FILE" || exit 1
grep -q "doc-saved" "$CODE_FILE" || exit 1
grep -q "log-emitted" "$CODE_FILE" || exit 1
grep -q "store-updated" "$CODE_FILE" || exit 1
grep -q "save-confirmed" "$CODE_FILE" || exit 1
grep -q "error-handled" "$CODE_FILE" || exit 1

echo "=== ✅ sauvegarder-donnees: 9/9 OK ==="
