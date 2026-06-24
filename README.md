# 🎯 CV RAMBO - Projet Complet

Extension Chrome pour la gestion de candidatures avec thème rétro action movie 80s.

## ✅ Statut

**PROJET TERMINÉ**

- ✅ 11 écrans HTML
- ✅ 55 workflows Alpine.js  
- ✅ 1 backend Node.js

## 🏗️ Architecture

```
cv_rambo/
├── frontend/              # Application frontend
│   ├── index.html         # Container global
│   ├── global/            # Workflows transverses (13)
│   ├── onboarding/        # Onboarding 3 étapes (4)
│   ├── tableau-bord/      # Stats QG Tactique (2)
│   ├── arsenal-cv/        # Gestion CV (6)
│   ├── capture-offre/     # Capture offres (5)
│   ├── kanban/            # Board 4 colonnes (7)
│   ├── mode-journaliste/  # IA Ollama (3)
│   ├── mode-rafale/       # Candidatures auto (4)
│   ├── pre-remplissage/   # Remplissage formulaires (4)
│   ├── export-cv/         # Export Word (1)
│   └── settings/          # Paramètres (5)
│
├── backend/               # Serveur Node.js
│   └── proxy-ollama/      # Proxy API Ollama
│
├── specs/                 # Spécifications
│   └── _app/              # Specs des workflows
│
└── validate-all.sh        # Script de validation
```

## 🚀 Démarrage

```bash
# Tout démarrer (backend + instructions)
./start.sh

# Ou manuellement
node backend/proxy-ollama/code/index.js
```

## 📊 Résumé par Phase

| Phase | Écran | Workflows | Description |
|-------|-------|-----------|-------------|
| 1 | global | 13 | Fondations (PouchDB, thème, erreurs) |
| 2 | onboarding | 4 | Premier contact utilisateur |
| 3 | tableau-bord | 2 | Stats et graphiques |
| 4 | arsenal-cv | 6 | Gestion CV dynamique |
| 5 | capture-offre | 5 | Détection et capture |
| 6 | kanban | 7 | Board drag & drop |
| 7 | mode-journaliste | 3 | IA enrichissement |
| 8 | mode-rafale | 4 | Candidatures batch |
| 9 | pre-remplissage | 4 | Formulaires auto |
| 10 | export/settings | 6 | Export et config |
| 11 | backend | 1 | Proxy Ollama |

## 🛠️ Technologies

- **Frontend** : Alpine.js, PouchDB, CSS custom (thème rétro)
- **Backend** : Node.js (proxy API Ollama)
- **Stockage** : PouchDB (IndexedDB)
- **IA** : Ollama (via proxy)

## 📁 Scripts utiles

| Script | Usage |
|--------|-------|
| `./start.sh` | Démarrage automatique |
| `./validate-all.sh` | Validation des workflows |
| `./build.sh` | Packager l'extension (.zip) |

## 📁 Workflows

Chaque workflow suit la structure :
```
workflows/[nom]/
├── code/index.js          # Mega-fonction Alpine.js
└── scenarios-to-validate/ # Scripts validation
```

## ✨ Features

- 🎨 **Thème rétro 80s** : Rouge, vert militaire, or, typographie Bebas Neue
- 💾 **Offline first** : PouchDB pour stockage local
- 🤖 **IA intégrée** : Ollama pour enrichissement CV
- 📱 **Extension Chrome** : Injection dans pages d'offres
- 🎯 **Kanban tactique** : 4 colonnes avec drag & drop
- 🏷️ **Tags** : Catégorisation des cibles
- ⚡ **Mode rafale** : Candidatures automatiques

---

**Date** : 2024
**Statut** : ✅ Complet et validé
