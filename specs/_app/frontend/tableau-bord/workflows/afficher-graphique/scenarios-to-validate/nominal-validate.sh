#!/bin/bash
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/tableau-bord/workflows/afficher-graphique/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "graph-triggered" "$CODE_FILE" || exit 1
grep -q "historical-data-fetched" "$CODE_FILE" || exit 1
grep -q "chart-data-prepared" "$CODE_FILE" || exit 1
grep -q "chart-generated" "$CODE_FILE" || exit 1
grep -q "chart-displayed" "$CODE_FILE" || exit 1
grep -q "insufficient-data-displayed" "$CODE_FILE" || exit 1

echo "=== ✅ afficher-graphique: 6/6 OK ==="
