#!/bin/bash
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/tableau-bord/workflows/calculer-stats/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "loading-displayed" "$CODE_FILE" || exit 1
grep -q "cibles-fetched" "$CODE_FILE" || exit 1
grep -q "bullets-fired-calculated" "$CODE_FILE" || exit 1
grep -q "hit-rate-calculated" "$CODE_FILE" || exit 1
grep -q "ammo-remaining-calculated" "$CODE_FILE" || exit 1
grep -q "stats-stored" "$CODE_FILE" || exit 1
grep -q "counters-displayed" "$CODE_FILE" || exit 1

echo "=== ✅ calculer-stats: 7/7 OK ==="
