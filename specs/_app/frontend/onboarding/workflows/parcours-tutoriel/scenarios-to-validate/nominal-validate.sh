#!/bin/bash
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/onboarding/workflows/parcours-tutoriel/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "step-3-displayed" "$CODE_FILE" || exit 1
grep -q "capture-demo-shown" "$CODE_FILE" || exit 1
grep -q "tir-direct-explained" "$CODE_FILE" || exit 1
grep -q "kanban-demo-shown" "$CODE_FILE" || exit 1
grep -q "drag-drop-demo-shown" "$CODE_FILE" || exit 1
grep -q "prefilling-demo-shown" "$CODE_FILE" || exit 1
grep -q "next-available" "$CODE_FILE" || exit 1
grep -q "back-available" "$CODE_FILE" || exit 1
grep -q "completion-triggered" "$CODE_FILE" || exit 1

echo "=== ✅ parcours-tutoriel: 10/10 OK ==="
