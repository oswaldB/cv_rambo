#!/bin/bash
set -e

# Chemin vers le code (hors /specs/)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/appliquer-theme/code/index.js"

echo "=== Validation du workflow: appliquer-theme ==="
echo ""

# Vérifier que le fichier existe
if [ ! -f "$CODE_FILE" ]; then
    echo "❌ ERREUR: code/index.js n'existe pas"
    exit 1
fi
echo "✅ Fichier code/index.js trouvé"

# Vérifier les checkpoints requis
REQUIRED_CHECKPOINTS=(
    "shadow-root-created"
    "fonts-injected"
    "css-variables-defined"
    "palette-applied"
    "global-styles-applied"
    "log-emitted"
    "theme-verified"
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

echo "✅ Tous les checkpoints sont présents (${#REQUIRED_CHECKPOINTS[@]}/7)"

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

# Vérifier les couleurs de la palette
PALETTE_COLORS=('#FF0000' '#2E8B57' '#2F4F4F' '#FFD700')
MISSING_COLORS=()
for color in "${PALETTE_COLORS[@]}"; do
    if ! grep -q "$color" "$CODE_FILE"; then
        MISSING_COLORS+=("$color")
    fi
done

if [ ${#MISSING_COLORS[@]} -ne 0 ]; then
    echo "❌ ERREUR: Couleurs manquantes de la palette:"
    for color in "${MISSING_COLORS[@]}"; do
        echo "   - $color"
    done
    exit 1
fi
echo "✅ Palette de couleurs complète (4/4): #FF0000, #2E8B57, #2F4F4F, #FFD700"

# Vérifier les polices
FONTS=("Bebas Neue" "Roboto Condensed")
MISSING_FONTS=()
for font in "${FONTS[@]}"; do
    if ! grep -q "$font" "$CODE_FILE"; then
        MISSING_FONTS+=("$font")
    fi
done

if [ ${#MISSING_FONTS[@]} -ne 0 ]; then
    echo "❌ ERREUR: Polices manquantes:"
    for font in "${MISSING_FONTS[@]}"; do
        echo "   - $font"
    done
    exit 1
fi
echo "✅ Polices Google Fonts incluses: Bebas Neue, Roboto Condensed"

# Vérifier Shadow DOM
if ! grep -q "attachShadow" "$CODE_FILE"; then
    echo "❌ ERREUR: Shadow DOM non utilisé"
    exit 1
fi
echo "✅ Shadow DOM créé avec attachShadow({ mode: 'open' })"

# Vérifier les variables CSS
CSS_VARS=('--rambo-red' '--camo-green' '--gunmetal-gray' '--gold')
MISSING_VARS=()
for var in "${CSS_VARS[@]}"; do
    if ! grep -F -q -- "$var" "$CODE_FILE"; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo "❌ ERREUR: Variables CSS manquantes:"
    for var in "${MISSING_VARS[@]}"; do
        echo "   - $var"
    done
    exit 1
fi
echo "✅ Variables CSS définies: --rambo-red, --camo-green, --gunmetal-gray, --gold"

# Vérifier les effets néon
if ! grep -q "neon" "$CODE_FILE"; then
    echo "❌ ERREUR: Effets néon non définis"
    exit 1
fi
echo "✅ Effets néon rétro détectés"

echo ""
echo "=== ✅ Validation réussie ==="
echo "Workflow: appliquer-theme"
echo "Checkpoints: 7/7 OK"
echo ""
