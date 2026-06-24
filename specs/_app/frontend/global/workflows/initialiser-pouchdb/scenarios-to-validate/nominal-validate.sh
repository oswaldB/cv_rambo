#!/bin/bash
set -e

# Chemin vers le code (hors /specs/)
# Le script est dans specs/_app/frontend/global/workflows/initialiser-pouchdb/scenarios-to-validate/
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/initialiser-pouchdb/code/index.js"

echo "=== Validation du workflow: initialiser-pouchdb ==="
echo ""

# Vérifier que le fichier existe
if [ ! -f "$CODE_FILE" ]; then
    echo "❌ ERREUR: code/index.js n'existe pas"
    exit 1
fi
echo "✅ Fichier code/index.js trouvé"

# Vérifier les checkpoints requis
REQUIRED_CHECKPOINTS=(
    "pouchdb-available"
    "profil-db-created"
    "cibles-db-created"
    "tags-db-created"
    "settings-db-created"
    "error-logs-db-created"
    "sync-disabled"
    "dbs-stored"
    "log-emitted"
)

MISSING=()
for checkpoint in "${REQUIRED_CHECKPOINTS[@]}"; do
    if ! grep -q "\[CHECKPOINT\].*'$checkpoint'" "$CODE_FILE" && \
       ! grep -q "\[CHECKPOINT\].*\"$checkpoint\"" "$CODE_FILE"; then
        MISSING+=("$checkpoint")
    fi
done

if [ ${#MISSING[@]} -ne 0 ]; then
    echo "❌ ERREUR: Checkpoints manquants:"
    for cp in "${MISSING[@]}"; do
        echo "   - $cp"
    done
    exit 1
fi

echo "✅ Tous les checkpoints sont présents (${#REQUIRED_CHECKPOINTS[@]}/9)"

# Vérifier le format console.log('[CHECKPOINT]', 'nom', { ... })
if ! grep -q "console.log('\[CHECKPOINT\]'" "$CODE_FILE"; then
    echo "❌ ERREUR: Format de checkpoint invalide"
    exit 1
fi
echo "✅ Format des checkpoints valide"

# Vérifier l'utilisation d'Alpine.store
if ! grep -q "Alpine.store" "$CODE_FILE"; then
    echo "❌ ERREUR: Alpine.store non utilisé"
    exit 1
fi
echo "✅ Utilisation d'Alpine.store détectée"

# Vérifier le stockage des 5 bases (ignorer les commentaires JSDoc)
DB_COUNT=$(grep -E "^\s*(this\.dbInstances\.[a-z-]+ = new Pouchdb|new PouchDB)" "$CODE_FILE" | wc -l || echo "0")
if [ "$DB_COUNT" -ne 5 ]; then
    # Compter aussi les lignes qui commencent par des espaces
    DB_COUNT=$(grep -E "\s+.*= new PouchDB" "$CODE_FILE" | grep -v "@checkpoint" | wc -l || echo "0")
fi
if [ "$DB_COUNT" -lt 5 ]; then
    echo "❌ ERREUR: $DB_COUNT bases PouchDB créées, attendu: 5"
    exit 1
fi
echo "✅ 5 bases PouchDB créées (profil, cibles, tags, settings, error-logs)"

echo ""
echo "=== ✅ Validation réussie ==="
echo "Workflow: initialiser-pouchdb"
echo "Checkpoints: 9/9 OK"
echo ""
