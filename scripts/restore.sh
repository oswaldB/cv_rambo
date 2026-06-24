#!/bin/bash
#
# Script de restauration des données CV Rambo
#

set -e

BACKUP_FILE="$1"
COUCHDB_URL="${COUCHDB_URL:-http://localhost:5984}"
COUCHDB_DB="${COUCHDB_DB:-cv-rambo}"
COUCHDB_USER="${COUCHDB_USER:-admin}"
COUCHDB_PASSWORD="${COUCHDB_PASSWORD:-admin}"

if [ -z "$BACKUP_FILE" ]; then
  echo "❌ Usage: $0 <chemin-du-backup.json>"
  echo ""
  echo "Exemple:"
  echo "  $0 ./backups/cv-rambo_backup_20240115_143022/cv-rambo-data.json"
  echo "  $0 ./backups/latest.json"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Fichier non trouvé: $BACKUP_FILE"
  exit 1
fi

echo "🔫 CV Rambo - Restauration"
echo "=========================="
echo ""
echo "⚠️ ATTENTION: Ceci va écraser les données existantes!"
echo ""
read -p "Continuer? (oui/NON) " confirm

if [ "$confirm" != "oui" ]; then
  echo "❌ Annulé"
  exit 0
fi

echo ""
echo "📂 Fichier source: $BACKUP_FILE"
echo "🎯 Base cible: $COUCHDB_DB"
echo ""

# Vérifier CouchDB est accessible
echo "🔌 Vérification de CouchDB..."
if ! curl -s -u "$COUCHDB_USER:$COUCHDB_PASSWORD" "$COUCHDB_URL" > /dev/null; then
  echo "❌ CouchDB inaccessible sur $COUCHDB_URL"
  exit 1
fi
echo "✅ CouchDB accessible"
echo ""

# Supprimer et recréer la base
echo "🗑️ Suppression de la base existante..."
curl -s -X DELETE -u "$COUCHDB_USER:$COUCHDB_PASSWORD" "$COUCHDB_URL/$COUCHDB_DB" || true
echo "✅ Base supprimée"
echo ""

echo "🏗️ Création de la nouvelle base..."
curl -s -X PUT -u "$COUCHDB_USER:$COUCHDB_PASSWORD" "$COUCHDB_URL/$COUCHDB_DB" > /dev/null
echo "✅ Base créée"
echo ""

# Restaurer les documents
echo "📤 Import des documents..."

# Préparer les documents pour bulk insert
if command -v jq > /dev/null 2>&1; then
  # Formatter en bulk docs
  jq -s '{docs: .}' "$BACKUP_FILE" > /tmp/cv-rambo-restore.json
  
  curl -s -X POST \
    -u "$COUCHDB_USER:$COUCHDB_PASSWORD" \
    -H "Content-Type: application/json" \
    "$COUCHDB_URL/$COUCHDB_DB/_bulk_docs" \
    -d @/tmp/cv-rambo-restore.json > /tmp/restore-result.json
  
  SUCCESS=$(grep -c '"ok":true' /tmp/restore-result.json || echo "0")
  ERRORS=$(grep -c '"error"' /tmp/restore-result.json || echo "0")
  
  rm -f /tmp/cv-rambo-restore.json /tmp/restore-result.json
  
  echo "✅ Import terminé"
  echo "   📄 Succès: $SUCCESS documents"
  if [ "$ERRORS" -gt 0 ]; then
    echo "   ❌ Erreurs: $ERRORS"
  fi
else
  echo "⚠️ jq non installé, restauration manuelle nécessaire"
  echo "   Commande: curl -X POST $COUCHDB_URL/$COUCHDB_DB/_bulk_docs -d @$BACKUP_FILE"
fi

echo ""
echo "✨ Restauration terminée!"
