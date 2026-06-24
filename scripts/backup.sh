#!/bin/bash
#
# Script de backup des données CV Rambo
# Sauvegarde CouchDB en JSON + métadonnées
#

set -e

BACKUP_DIR="${BACKUP_DIR:-./backups}"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="cv-rambo_backup_${DATE}"
COUCHDB_URL="${COUCHDB_URL:-http://localhost:5984}"
COUCHDB_DB="${COUCHDB_DB:-cv-rambo}"
COUCHDB_USER="${COUCHDB_USER:-admin}"
COUCHDB_PASSWORD="${COUCHDB_PASSWORD:-admin}"

echo "🔫 CV Rambo - Backup"
echo "===================="
echo ""

# Créer dossier backup
mkdir -p "$BACKUP_DIR"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"
mkdir -p "$BACKUP_PATH"

echo "📦 Export de la base CouchDB..."

# Exporter tous les documents
curl -s -u "$COUCHDB_USER:$COUCHDB_PASSWORD" \
  "$COUCHDB_URL/$COUCHDB_DB/_all_docs?include_docs=true" \
  > "$BACKUP_PATH/all_docs.json"

# Extraire uniquement les documents (sans métadonnées CouchDB)
if command -v jq > /dev/null 2>&1; then
  jq '.rows[].doc' "$BACKUP_PATH/all_docs.json" > "$BACKUP_PATH/cv-rambo-data.json"
  rm "$BACKUP_PATH/all_docs.json"
  echo "✅ Données exportées et formatées avec jq"
else
  echo "⚠️ jq non installé, export brut conservé"
  mv "$BACKUP_PATH/all_docs.json" "$BACKUP_PATH/cv-rambo-data.json"
fi

# Stats du backup
FILE_SIZE=$(du -h "$BACKUP_PATH/cv-rambo-data.json" | cut -f1)
DOC_COUNT=$(grep -c '"_id"' "$BACKUP_PATH/cv-rambo-data.json" || echo "0")

echo ""
echo "✅ Backup terminé:"
echo "  📁 Fichier: $BACKUP_PATH/cv-rambo-data.json"
echo "  📊 Taille: $FILE_SIZE"
echo "  📄 Documents: $DOC_COUNT"
echo ""

# Créer un lien vers le dernier backup
ln -sf "$BACKUP_NAME/cv-rambo-data.json" "$BACKUP_DIR/latest.json"
echo "🔗 Lien 'latest.json' mis à jour"
echo ""

# Nettoyer les vieux backups (garder 10 derniers)
if [ $(ls -1 "$BACKUP_DIR" | grep -c "^cv-rambo_backup_") -gt 10 ]; then
  ls -1td "$BACKUP_DIR"/cv-rambo_backup_* | tail -n +11 | xargs rm -rf
  echo "🧹 Vieux backups nettoyés (gardé les 10 derniers)"
fi

echo ""
echo "✨ Backup complet!"
