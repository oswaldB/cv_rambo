#!/bin/bash

# Build script pour CV Rambo Extension

echo "🔨 CV RAMBO - Build"
echo "==================="
echo ""

# Vérifier les prérequis
if ! command -v zip &> /dev/null; then
    echo "❌ 'zip' requis. Installation: sudo apt-get install zip"
    exit 1
fi

# Créer le dossier de build
BUILD_DIR="build"
mkdir -p "$BUILD_DIR"

# Version
VERSION=$(grep '"version"' manifest.json | cut -d'"' -f4)
echo "📦 Version: $VERSION"

# Copier les fichiers essentiels
echo "📁 Copie des fichiers..."
cp -r frontend "$BUILD_DIR/"
cp -r icons "$BUILD_DIR/"
cp manifest.json "$BUILD_DIR/"
cp background.js "$BUILD_DIR/"
cp content.js "$BUILD_DIR/"
cp README.md "$BUILD_DIR/"

# Nettoyer
find "$BUILD_DIR" -name "*.log" -delete
find "$BUILD_DIR" -name ".DS_Store" -delete
find "$BUILD_DIR" -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true

# Créer le zip
OUTPUT_FILE="cv-rambo-v${VERSION}.zip"
echo "📦 Création de $OUTPUT_FILE..."

cd "$BUILD_DIR"
zip -r "../$OUTPUT_FILE" . -x "*.md" "*.txt"
cd ..

# Nettoyer le dossier temporaire
rm -rf "$BUILD_DIR"

echo ""
echo "✅ Build terminé: $OUTPUT_FILE"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Aller sur chrome://extensions/"
echo "2. Activer 'Mode développeur'"
echo "3. Cliquer 'Charger l'extension non empaquetée'"
echo "4. Sélectionner le dossier extrait"
echo ""
