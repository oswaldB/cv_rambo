#!/bin/bash
set -e

# Chemin vers le code (hors /specs/)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/afficher-toast-succes/code/index.js"

echo "=== Validation du workflow: afficher-toast-succes ==="
echo ""

# Vérifier que le fichier existe
if [ ! -f "$CODE_FILE" ]; then
    echo "❌ ERREUR: code/index.js n'existe pas"
    exit 1
fi
echo "✅ Fichier code/index.js trouvé"

# Vérifier les checkpoints requis
REQUIRED_CHECKPOINTS=(
    "success-event-detected"
    "toast-created"
    "toast-styled"
    "toast-positioned"
    "toast-animated"
    "log-emitted"
    "timeout-running"
    "toast-fading"
    "toast-removed"
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

# Vérifier le style rétro
if ! grep -q "Bebas Neue" "$CODE_FILE"; then
    echo "❌ ERREUR: Police Bebas Neue non utilisée"
    exit 1
fi
echo "✅ Police Bebas Neue utilisée"

if ! grep -q "#2E8B57" "$CODE_FILE"; then
    echo "❌ ERREUR: Couleur verte (succès) non définie"
    exit 1
fi
echo "✅ Couleur verte (succès) définie"

# Vérifier les animations
if ! grep -q "toast-enter" "$CODE_FILE"; then
    echo "❌ ERREUR: Animation d'entrée non définie"
    exit 1
fi
echo "✅ Animation d'entrée définie"

if ! grep -q "toast-leave" "$CODE_FILE"; then
    echo "❌ ERREUR: Animation de sortie non définie"
    exit 1
fi
echo "✅ Animation de sortie définie"

# Vérifier le timeout de 3 secondes
if ! grep -q "3000" "$CODE_FILE"; then
    echo "❌ ERREUR: Timeout de 3000ms non défini"
    exit 1
fi
echo "✅ Timeout de 3000ms défini"

# Vérifier l'icône ✓
if ! grep -q "✓" "$CODE_FILE"; then
    echo "❌ ERREUR: Icône ✓ non utilisée"
    exit 1
fi
echo "✅ Icône ✓ utilisée"

# Vérifier le bouton de fermeture
if ! grep -q "cv-rambo-toast__close" "$CODE_FILE"; then
    echo "❌ ERREUR: Bouton de fermeture non défini"
    exit 1
fi
echo "✅ Bouton de fermeture défini"

# Vérifier l'écouteur d'événement
if ! grep -q "cv-rambo:show-success-toast" "$CODE_FILE"; then
    echo "❌ ERREUR: Écouteur cv-rambo:show-success-toast non configuré"
    exit 1
fi
echo "✅ Écouteur cv-rambo:show-success-toast configuré"

echo ""
echo "=== ✅ Validation réussie ==="
echo "Workflow: afficher-toast-succes"
echo "Checkpoints: 9/9 OK"
echo ""
