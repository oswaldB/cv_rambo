#!/bin/bash
# Validation rapide - 11 checkpoints
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/restaurer-etat/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "overlay-loading" "$CODE_FILE" || exit 1
grep -q "loading-displayed" "$CODE_FILE" || exit 1
grep -q "profil-fetched" "$CODE_FILE" || exit 1
grep -q "cibles-fetched" "$CODE_FILE" || exit 1
grep -q "tags-fetched" "$CODE_FILE" || exit 1
grep -q "settings-fetched" "$CODE_FILE" || exit 1
grep -q "store-populated" "$CODE_FILE" || exit 1
grep -q "data-verified" "$CODE_FILE" || exit 1
grep -q "log-emitted" "$CODE_FILE" || exit 1
grep -q "restoration-complete" "$CODE_FILE" || exit 1
grep -q "empty-state-handled" "$CODE_FILE" || exit 1

echo "=== ✅ restaurer-etat: 11/11 OK ==="
