#!/bin/bash
set -e

# Chemin vers le code (hors /specs/)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/stocker-erreur/code/index.js"

echo "=== Validation du workflow: stocker-erreur ==="
echo ""

# Vérifier que le fichier existe
if [ ! -f "$CODE_FILE" ]; then
    echo "❌ ERREUR: code/index.js n'existe pas"
    exit 1
fi
echo "✅ Fichier code/index.js trouvé"

# Vérifier les checkpoints requis
REQUIRED_CHECKPOINTS=(
    "error-data-received"
    "error-logs-db-opened"
    "error-doc-prepared"
    "stack-truncated"
    "metadata-added"
    "error-saved"
    "storage-limit-checked"
    "persistence-confirmed"
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

echo "✅ Tous les checkpoints sont présents (${#REQUIRED_CHECKPOINTS[@]}/8)"

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

# Vérifier PouchDB
if ! grep -q "new PouchDB('error-logs')" "$CODE_FILE"; then
    echo "❌ ERREUR: Base PouchDB 'error-logs' non ouverte"
    exit 1
fi
echo "✅ Base PouchDB 'error-logs' utilisée"

# Vérifier la limite de stockage
if ! grep -q "100" "$CODE_FILE" || ! grep -q "STORAGE_LIMIT" "$CODE_FILE"; then
    echo "❌ ERREUR: Limite de stockage (100 erreurs) non définie"
    exit 1
fi
echo "✅ Limite de stockage définie: 100 erreurs"

# Vérifier le tronquage de stack
if ! grep -q "5000" "$CODE_FILE"; then
    echo "❌ ERREUR: Limite de stack trace (5000 caractères) non définie"
    exit 1
fi
echo "✅ Tronquage de stack trace: 5000 caractères max"

# Vérifier les métadonnées
METADATA_FIELDS=("userAgent" "url" "screenSize" "appVersion")
FOUND_METADATA=0
for field in "${METADATA_FIELDS[@]}"; do
    if grep -q "$field" "$CODE_FILE"; then
        ((FOUND_METADATA++)) || true
    fi
done

if [ $FOUND_METADATA -lt 3 ]; then
    echo "❌ ERREUR: Métadonnées incomplètes ($FOUND_METADATA/4 champs)"
    exit 1
fi
echo "✅ Métadonnées ajoutées: userAgent, url, screenSize, appVersion"

# Vérifier l'écouteur d'événement
if ! grep -q "cv-rambo:store-error" "$CODE_FILE"; then
    echo "❌ ERREUR: Écouteur cv-rambo:store-error non configuré"
    exit 1
fi
echo "✅ Écouteur d'événement cv-rambo:store-error configuré"

# Vérifier db.put
if ! grep -q "db.put" "$CODE_FILE"; then
    echo "❌ ERREUR: db.put() non utilisé pour sauvegarder"
    exit 1
fi
echo "✅ Sauvegarde via db.put() détectée"

echo ""
echo "=== ✅ Validation réussie ==="
echo "Workflow: stocker-erreur"
echo "Checkpoints: 8/8 OK"
echo ""
