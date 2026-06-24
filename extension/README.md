# CV Rambo - Extension Navigateur

Extension Chrome/Firefox pour ajouter rapidement des offres d'emploi à CV Rambo depuis n'importe quel site.

## 🎯 Features

- 🔍 **Détection automatique** des sites d'emploi (LinkedIn, Indeed, APEC, etc.)
- 📋 **Extraction auto** du titre et de l'entreprise
- 🚀 **Ajout rapide** en un clic
- 🔔 **Notification** lorsqu'une offre est détectée

## 📦 Installation

### Mode développeur (Chrome)

1. Ouvrir `chrome://extensions/`
2. Activer "Mode développeur" (en haut à droite)
3. Cliquer "Charger l'extension non empaquetée"
4. Sélectionner le dossier `extension/`

### Firefox (chargement temporaire)

1. Ouvrir `about:debugging`
2. Cliquer "Ce Firefox"
3. "Charger un module complémentaire temporaire"
4. Sélectionner `manifest.json`

## 🚀 Usage

1. **Sur une offre d'emploi** : L'extension détecte automatiquement et affiche une notification
2. **Cliquer l'icône** dans la barre d'outils pour ouvrir le popup
3. **Vérifier** les informations extraites
4. **Ajouter** la cible à CV Rambo

## 🔧 Configuration

Modifier dans `popup.js` si CV Rambo tourne sur un autre port :

```javascript
const CV_RAMBO_URL = 'http://localhost:8080';
const API_URL = 'http://localhost:3000/api';
```

## 🌐 Sites supportés

- ✅ LinkedIn Jobs
- ✅ Indeed
- ✅ APEC
- ✅ Welcome to the Jungle
- ✅ Glassdoor
- ✅ Monster
- ✅ Tout autre site (mode manuel)

## 📝 Manifest V3

L'extension utilise Manifest V3 pour compatibilité Chrome/Firefox moderne.

## 🔒 Permissions

- `activeTab` : Lire l'URL et titre de la page
- `storage` : Stocker temporairement les données
- `scripting` : Injecter le scraper

## 🐛 Debug

Ouvrir la console du popup :
1. Cliquer droit sur l'icône
2. "Inspecter le popup"
3. Onglet Console
