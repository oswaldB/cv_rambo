#!/bin/bash
set -e

# Chemin vers le code (hors /specs/)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/capter-erreur/code/index.js"

echo "=== Validation du workflow: capter-erreur ==="
echo ""

# Vérifier que le fichier existe
if [ ! -f "$CODE_FILE" ]; then
    echo "❌ ERREUR: code/index.js n'existe pas"
    exit 1
fi
echo "✅ Fichier code/index.js trouvé"

# Vérifier les checkpoints requis
REQUIRED_CHECKPOINTS=(
    "error-handler-installed"
    "sync-error-detected"
    "async-error-detected"
    "error-info-extracted"
    "error-logged"
    "error-type-determined"
    "error-dispatched"
    "toast-triggered"
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

# Vérifier window.onerror
if ! grep -q "window.onerror" "$CODE_FILE"; then
    echo "❌ ERREUR: window.onerror non configuré"
    exit 1
fi
echo "✅ window.onerror configuré"

# Vérifier unhandledrejection
if ! grep -q "unhandledrejection" "$CODE_FILE"; then
    echo "❌ ERREUR: unhandledrejection non configuré"
    exit 1
fi
echo "✅ unhandledrejection configuré"

# Vérifier la classification des erreurs
ERROR_TYPES=("pouchdb" "ollama" "network" "dom" "unknown")
FOUND_TYPES=0
for etype in "${ERROR_TYPES[@]}"; do
    if grep -q "$etype" "$CODE_FILE"; then
        ((FOUND_TYPES++)) || true
    fi
done

if [ $FOUND_TYPES -lt 3 ]; then
    echo "❌ ERREUR: Classification d'erreurs incomplète ($FOUND_TYPES/5 types)"
    exit 1
fi
echo "✅ Classification d'erreurs présente ($FOUND_TYPES/5 types: pouchdb, ollama, network, dom, unknown)"

# Vérifier les événements dispatchés
if ! grep -q "cv-rambo:store-error" "$CODE_FILE"; then
    echo "❌ ERREUR: Événement cv-rambo:store-error non émis"
    exit 1
fi
echo "✅ Événement cv-rambo:store-error émis"

if ! grep -q "cv-rambo:show-error-toast" "$CODE_FILE"; then
    echo "❌ ERREUR: Événement cv-rambo:show-error-toast non émis"
    exit 1
fi
echo "✅ Événement cv-rambo:show-error-toast émis"

# Vérifier CustomEvent
if ! grep -q "CustomEvent" "$CODE_FILE"; then
    echo "❌ ERREUR: CustomEvent non utilisé"
    exit 1
fi
echo "✅ CustomEvent utilisé pour dispatcher"

echo ""
echo "=== ✅ Validation réussie ==="
echo "Workflow: capter-erreur"
echo "Checkpoints: 8/8 OK"
echo ""
