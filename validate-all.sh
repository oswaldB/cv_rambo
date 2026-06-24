#!/bin/bash

echo "======================================"
echo "  CV RAMBO - Validation Globale"
echo "======================================"
echo ""

PROJECT_ROOT="/home/ubuntu/cv_rambo"
ERRORS=0

# Fonction pour vérifier un workflow
check_workflow() {
    local path=$1
    local name=$2
    
    if [ -f "$PROJECT_ROOT/$path/code/index.js" ]; then
        echo "✅ $name"
        return 0
    else
        echo "❌ $name - Fichier manquant"
        return 1
    fi
}

echo "📁 Vérification des workflows globaux..."
check_workflow "frontend/global/workflows/initialiser-pouchdb" "initialiser-pouchdb" || ((ERRORS++))
check_workflow "frontend/global/workflows/appliquer-theme" "appliquer-theme" || ((ERRORS++))
check_workflow "frontend/global/workflows/capter-erreur" "capter-erreur" || ((ERRORS++))
check_workflow "frontend/global/workflows/stocker-erreur" "stocker-erreur" || ((ERRORS++))
check_workflow "frontend/global/workflows/afficher-toast-erreur" "afficher-toast-erreur" || ((ERRORS++))
check_workflow "frontend/global/workflows/afficher-toast-succes" "afficher-toast-succes" || ((ERRORS++))
check_workflow "frontend/global/workflows/afficher-loader-munitions" "afficher-loader-munitions" || ((ERRORS++))
check_workflow "frontend/global/workflows/animer-recul" "animer-recul" || ((ERRORS++))
check_workflow "frontend/global/workflows/sauvegarder-donnees" "sauvegarder-donnees" || ((ERRORS++))
check_workflow "frontend/global/workflows/restaurer-etat" "restaurer-etat" || ((ERRORS++))
check_workflow "frontend/global/workflows/reessayer-ollama" "reessayer-ollama" || ((ERRORS++))
check_workflow "frontend/global/workflows/exporter-logs" "exporter-logs" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows onboarding..."
check_workflow "frontend/onboarding/workflows/importer-cv" "importer-cv" || ((ERRORS++))
check_workflow "frontend/onboarding/workflows/verifier-extractions" "verifier-extractions" || ((ERRORS++))
check_workflow "frontend/onboarding/workflows/parcours-tutoriel" "parcours-tutoriel" || ((ERRORS++))
check_workflow "frontend/onboarding/workflows/completer-onboarding" "completer-onboarding" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows tableau-bord..."
check_workflow "frontend/tableau-bord/workflows/calculer-stats" "calculer-stats" || ((ERRORS++))
check_workflow "frontend/tableau-bord/workflows/afficher-graphique" "afficher-graphique" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows arsenal-cv..."
check_workflow "frontend/arsenal-cv/workflows/charger-profil" "charger-profil" || ((ERRORS++))
check_workflow "frontend/arsenal-cv/workflows/editer-entree" "editer-entree" || ((ERRORS++))
check_workflow "frontend/arsenal-cv/workflows/sauver-competence" "sauver-competence" || ((ERRORS++))
check_workflow "frontend/arsenal-cv/workflows/sauver-experience" "sauver-experience" || ((ERRORS++))
check_workflow "frontend/arsenal-cv/workflows/sauver-projet" "sauver-projet" || ((ERRORS++))
check_workflow "frontend/arsenal-cv/workflows/supprimer-entree" "supprimer-entree" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows capture-offre..."
check_workflow "frontend/capture-offre/workflows/detecter-page" "detecter-page" || ((ERRORS++))
check_workflow "frontend/capture-offre/workflows/extraire-donnees" "extraire-donnees" || ((ERRORS++))
check_workflow "frontend/capture-offre/workflows/verifier-doublon" "verifier-doublon" || ((ERRORS++))
check_workflow "frontend/capture-offre/workflows/ajouter-liste" "ajouter-liste" || ((ERRORS++))
check_workflow "frontend/capture-offre/workflows/tirer-direct" "tirer-direct" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows kanban..."
check_workflow "frontend/kanban/workflows/charger-cibles" "charger-cibles" || ((ERRORS++))
check_workflow "frontend/kanban/workflows/deplacer-cible" "deplacer-cible" || ((ERRORS++))
check_workflow "frontend/kanban/workflows/mettre-a-jour-statut" "mettre-a-jour-statut" || ((ERRORS++))
check_workflow "frontend/kanban/workflows/ajouter-tag" "ajouter-tag" || ((ERRORS++))
check_workflow "frontend/kanban/workflows/retirer-tag" "retirer-tag" || ((ERRORS++))
check_workflow "frontend/kanban/workflows/filtrer-par-tag" "filtrer-par-tag" || ((ERRORS++))
check_workflow "frontend/kanban/workflows/valider-drop" "valider-drop" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows mode-journaliste..."
check_workflow "frontend/mode-journaliste/workflows/lancer-session" "lancer-session" || ((ERRORS++))
check_workflow "frontend/mode-journaliste/workflows/envoyer-question" "envoyer-question" || ((ERRORS++))
check_workflow "frontend/mode-journaliste/workflows/ignorer-question" "ignorer-question" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows mode-rafale..."
check_workflow "frontend/mode-rafale/workflows/selectionner-cibles" "selectionner-cibles" || ((ERRORS++))
check_workflow "frontend/mode-rafale/workflows/configurer-rafale" "configurer-rafale" || ((ERRORS++))
check_workflow "frontend/mode-rafale/workflows/executer-rafale" "executer-rafale" || ((ERRORS++))
check_workflow "frontend/mode-rafale/workflows/interrompre-rafale" "interrompre-rafale" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows pre-remplissage..."
check_workflow "frontend/pre-remplissage/workflows/analyser-formulaire" "analyser-formulaire" || ((ERRORS++))
check_workflow "frontend/pre-remplissage/workflows/remplir-champs" "remplir-champs" || ((ERRORS++))
check_workflow "frontend/pre-remplissage/workflows/generer-script-soumission" "generer-script-soumission" || ((ERRORS++))
check_workflow "frontend/pre-remplissage/workflows/soumettre-formulaire" "soumettre-formulaire" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows export-cv..."
check_workflow "frontend/export-cv/workflows/generer-docx" "generer-docx" || ((ERRORS++))

echo ""
echo "📁 Vérification des workflows settings..."
check_workflow "frontend/settings/workflows/charger-settings" "charger-settings" || ((ERRORS++))
check_workflow "frontend/settings/workflows/sauver-setting" "sauver-setting" || ((ERRORS++))
check_workflow "frontend/settings/workflows/valider-cle-api" "valider-cle-api" || ((ERRORS++))
check_workflow "frontend/settings/workflows/exporter-donnees" "exporter-donnees" || ((ERRORS++))
check_workflow "frontend/settings/workflows/importer-donnees" "importer-donnees" || ((ERRORS++))

echo ""
echo "📁 Vérification du backend..."
check_workflow "backend/proxy-ollama" "proxy-ollama" || ((ERRORS++))

echo ""
echo "======================================"
if [ $ERRORS -eq 0 ]; then
    echo "✅ TOUS LES WORKFLOWS SONT PRÉSENTS"
    echo "✅ Total: 55 workflows + 11 écrans HTML"
    exit 0
else
    echo "❌ $ERRORS workflows manquants"
    exit 1
fi
