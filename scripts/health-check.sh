#!/bin/bash
#
# Health check complet du système CV Rambo
# 100% Node.js (pas de Python)
#

set -e

FRONTEND_URL="${FRONTEND_URL:-http://localhost:8080}"
BACKEND_URL="${BACKEND_URL:-http://localhost:3000}"
COUCHDB_URL="${COUCHDB_URL:-http://localhost:5984}"
OLLAMA_URL="${OLLAMA_URL:-http://localhost:11434}"
COUCHDB_USER="${COUCHDB_USER:-admin}"
COUCHDB_PASSWORD="${COUCHDB_PASSWORD:-admin}"

echo "🔫 CV Rambo - Health Check"
echo "=========================="
echo ""

FAILED=0

# Fonction de test
check_service() {
  local name="$1"
  local url="$2"
  local auth="${3:-}"
  
  echo -n "🔍 $name... "
  
  if [ -n "$auth" ]; then
    if curl -s -o /dev/null -w "%{http_code}" -u "$auth" "$url" | grep -q "200"; then
      echo "✅ OK"
      return 0
    fi
  else
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200"; then
      echo "✅ OK"
      return 0
    fi
  fi
  
  echo "❌ FAIL"
  return 1
}

# Test Frontend
if check_service "Frontend" "$FRONTEND_URL"; then
  : 
else
  FAILED=$((FAILED + 1))
fi

# Test Backend
if check_service "Backend API" "$BACKEND_URL/api/health"; then
  :
else
  FAILED=$((FAILED + 1))
fi

# Test CouchDB
if check_service "CouchDB" "$COUCHDB_URL" "$COUCHDB_USER:$COUCHDB_PASSWORD"; then
  :
else
  FAILED=$((FAILED + 1))
fi

# Test Ollama (optionnel)
echo -n "🔍 Ollama... "
if curl -s "$OLLAMA_URL/api/tags" > /dev/null 2>&1; then
  echo "✅ OK"
else
  echo "⚠️  Not running (optionnel)"
fi

echo ""

# Vérifier versions
echo "📊 Versions:"

# Node.js
if command -v node > /dev/null; then
  echo "  Node.js: $(node --version)"
fi

# CouchDB
COUCHDB_VERSION=$(curl -s -u "$COUCHDB_USER:$COUCHDB_PASSWORD" "$COUCHDB_URL" | grep -o '"version":"[^"]*"' | cut -d'"' -f4 || echo "N/A")
if [ "$COUCHDB_VERSION" != "N/A" ]; then
  echo "  CouchDB: $COUCHDB_VERSION"
fi

# Backend version
BACKEND_VERSION=$(curl -s "$BACKEND_URL/api/health" | grep -o '"version":"[^"]*"' | cut -d'"' -f4 2>/dev/null || echo "N/A")
if [ "$BACKEND_VERSION" != "N/A" ]; then
  echo "  Backend: $BACKEND_VERSION"
fi

echo ""

if [ $FAILED -eq 0 ]; then
  echo "✅ Tous les services sont OK!"
  exit 0
else
  echo "❌ $FAILED service(s) en erreur"
  exit 1
fi
