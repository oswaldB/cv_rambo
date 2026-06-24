#!/bin/bash

echo "🚀 CV RAMBO - Démarrage"
echo "======================="
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non trouvé. Veuillez installer Node.js."
    exit 1
fi

echo "✅ Node.js détecté"

# Démarrer le backend
cd backend/proxy-ollama
echo "📦 Installation des dépendances backend..."
npm install --silent 2>/dev/null || true

echo "🟢 Démarrage du proxy Ollama sur le port 3000..."
node code/index.js &
BACKEND_PID=$!

echo ""
echo "✅ Backend démarré (PID: $BACKEND_PID)"
echo ""
echo "📋 Instructions :"
echo "1. Ouvrir Chrome → Extensions → Mode développeur"
echo "2. Charger l'extension non empaquetée depuis :"
echo "   $(pwd)/../../"
echo ""
echo "3. Cliquer sur l'icône CV Rambo dans la barre d'outils"
echo ""
echo "🛑 Arrêter le backend : kill $BACKEND_PID"
echo ""

# Attendre l'interruption
trap "kill $BACKEND_PID; echo ''; echo '🛑 Backend arrêté'; exit 0" INT
wait
