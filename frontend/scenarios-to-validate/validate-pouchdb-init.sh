#!/bin/bash
#
# Scénario de validation: initialiser-pouchdb
# Vérifie que les checkpoints sont émis correctement
#

set -e

FRONTEND_URL="${FRONTEND_URL:-http://localhost:8080/dashboard/index.html}"
CHROMIUM="${CHROMIUM:-chromium-browser}"
TMP_DIR=$(mktemp -d)
LOG_FILE="$TMP_DIR/console.log"

echo "=== Validation: initialiser-pouchdb ==="
echo "URL: $FRONTEND_URL"
echo ""

# Lancer Chromium en headless et capturer la console
$CHROMIUM --headless --disable-gpu --dump-dom --virtual-time-budget=5000 \
    --run-all-compositor-stages-before-draw \
    --enable-logging=stderr \
    "$FRONTEND_URL" 2>&1 | grep -E "(\[CHECKPOINT\]|PouchDB)" > "$LOG_FILE" || true

# Vérifier les checkpoints attendus
echo "=== Vérification des checkpoints ==="

CHECKPOINTS=(
    "pouchdb-init-started"
    "pouchdb-instance-created"
    "indexes-created"
    "utils-exposed"
    "pouchdb-ready"
)

FAILED=0
for checkpoint in "${CHECKPOINTS[@]}"; do
    if grep -q "$checkpoint" "$LOG_FILE"; then
        echo "✅ $checkpoint"
    else
        echo "❌ $checkpoint (MANQUANT)"
        FAILED=1
    fi
done

echo ""
if [ $FAILED -eq 0 ]; then
    echo "=== ✅ TOUS LES CHECKPOINTS OK ==="
    rm -rf "$TMP_DIR"
    exit 0
else
    echo "=== ❌ CERTAINS CHECKPOINTS MANQUANTS ==="
    echo "Log complet:"
    cat "$LOG_FILE"
    rm -rf "$TMP_DIR"
    exit 1
fi
