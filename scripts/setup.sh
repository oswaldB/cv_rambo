#!/bin/bash
#
# Script d'installation de CV Rambo
# 100% Node.js (pas de Python)
#

set -e

echo "🔫 CV Rambo - Installation"
echo "=========================="
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }

# Vérifier Node.js UNIQUEMENT
echo "📋 Vérification des prérequis..."
echo ""

if command -v node > /dev/null 2>&1; then
  log_info "Node.js $(node --version)"
else
  log_error "Node.js non installé - https://nodejs.org/"
  exit 1
fi

if command -v npm > /dev/null 2>&1; then
  log_info "npm $(npm --version)"
else
  log_error "npm non installé"
  exit 1
fi

echo ""

# CouchDB (optionnel mais recommandé)
echo "📦 CouchDB requis pour la base de données"
echo ""
if curl -s http://localhost:5984 >/dev/null 2>&1; then
  log_info "CouchDB détecté sur localhost:5984"
else
  log_warn "CouchDB non détecté"
  echo ""
  echo "Installez CouchDB:"
  echo "  macOS:   brew install couchdb && brew services start couchdb"
  echo "  Ubuntu:  sudo apt install couchdb && sudo systemctl start couchdb"
  echo ""
  echo "Ou utilisez CouchDB Cloud (cloudant.com)"
  echo ""
  read -p "Continuer sans CouchDB? (N/o) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Oo]$ ]]; then
    exit 1
  fi
fi

echo ""

# Installation des dépendances
echo "📦 Installation des dépendances..."
echo ""

# Backend
echo "Backend..."
cd backend
npm install
cd ..
log_info "Backend installé"

# Frontend (serveur statique)
echo ""
echo "Frontend (serveur)..."
cd frontend
npm install
cd ..
log_info "Frontend installé"

# Tests
echo ""
echo "Tests..."
cd frontend/tests
npm install
npx playwright install chromium 2>/dev/null || log_warn "Playwright à installer manuellement: npx playwright install chromium"
cd ../..
log_info "Tests installés"

# Configuration
echo ""
echo "⚙️  Configuration..."
if [ ! -f "backend/.env" ]; then
  cp backend/.env.example backend/.env
  log_info "Fichier backend/.env créé"
else
  log_warn "backend/.env existe déjà"
fi

# Scripts exécutables
chmod +x scripts/*.sh install.sh 2>/dev/null || true
log_info "Scripts rendus exécutables"

echo ""
echo "🎉 Installation terminée!"
echo ""
echo "Prochaines étapes:"
echo ""
echo "1. Si CouchDB pas installé:"
echo "   brew install couchdb && brew services start couchdb"
echo "   curl -X PUT http://localhost:5984/_node/_local/_config/admins/admin -d '\"admin\"'"
echo "   curl -X PUT http://admin:admin@localhost:5984/cv-rambo"
echo ""
echo "2. Démarrer le backend:"
echo "   cd backend && npm start"
echo ""
echo "3. Démarrer le frontend:"
echo "   cd frontend && npm start"
echo ""
echo "4. Ouvrir: http://localhost:8080"
echo ""
log_info "Bon courage dans vos candidatures! 🚀"
