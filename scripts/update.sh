#!/bin/bash
#
# Script de mise à jour de CV Rambo
# Met à jour les dépendances et vérifie la configuration
#

set -e

echo "🔫 CV Rambo - Mise à jour"
echo "========================="
echo ""

# Sauvegarder la config actuelle
if [ -f "backend/.env" ]; then
  cp backend/.env backend/.env.backup
  echo "💾 Configuration sauvegardée (backend/.env.backup)"
fi

# Git pull si c'est un repo git
if [ -d ".git" ]; then
  echo "📥 Récupération des dernières modifications..."
  git pull origin main 2>/dev/null || echo "⚠️  Git pull manuel nécessaire"
  echo ""
fi

# Mise à jour backend
echo "📦 Mise à jour du backend..."
cd backend
npm update
cd ..
echo "✅ Backend à jour"
echo ""

# Mise à jour frontend tests
echo "📦 Mise à jour des tests..."
cd frontend/tests
npm update
cd ../..
echo "✅ Tests à jour"
echo ""

# Vérifier les changements de config
if [ -f "backend/.env.example" ] && [ -f "backend/.env" ]; then
  echo "🔍 Vérification des nouvelles variables d'environnement..."
  
  # Extraire les clés des deux fichiers
  EXAMPLE_KEYS=$(grep -E "^[A-Z_]+=" backend/.env.example 2>/dev/null | cut -d'=' -f1 | sort || true)
  CURRENT_KEYS=$(grep -E "^[A-Z_]+=" backend/.env 2>/dev/null | cut -d'=' -f1 | sort || true)
  
  # Vérifier s'il y a des différences
  MISSING=$(comm -23 <(echo "$EXAMPLE_KEYS") <(echo "$CURRENT_KEYS") || true)
  
  if [ -n "$MISSING" ]; then
    echo "⚠️  Nouvelles variables détectées dans .env.example:"
    echo "$MISSING" | while read key; do
      echo "   - $key"
    done
    echo ""
    echo "Comparez backend/.env avec backend/.env.example"
  fi
fi

echo ""
echo "✅ Mise à jour terminée!"
echo ""
echo "Redémarrage nécessaire:"
echo "  make restart"
