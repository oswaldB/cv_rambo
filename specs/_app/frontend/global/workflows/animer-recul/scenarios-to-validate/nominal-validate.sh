#!/bin/bash
# Validation rapide - 8 checkpoints
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/animer-recul/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "recoil-keyframes-defined" "$CODE_FILE" || exit 1
grep -q "buttons-selected" "$CODE_FILE" || exit 1
grep -q "listeners-added" "$CODE_FILE" || exit 1
grep -q "click-detected" "$CODE_FILE" || exit 1
grep -q "recoil-applied" "$CODE_FILE" || exit 1
grep -q "sound-played" "$CODE_FILE" || exit 1
grep -q "animation-cleared" "$CODE_FILE" || exit 1
grep -q "action-continued" "$CODE_FILE" || exit 1

echo "=== ✅ animer-recul: 8/8 OK ==="
