# 🚀 CV RAMBO - Commandes disponibles

## Démarrage rapide

```bash
# Tout démarrer automatiquement (backend + instructions)
./start.sh
```

## Commandes de développement

```bash
# Validation complète
./validate-all.sh

# Build de l'extension (.zip)
./build.sh

# Backend uniquement
node backend/proxy-ollama/code/index.js
```

## Installation Extension Chrome

1. Ouvrir `chrome://extensions/`
2. Activer "Mode développeur" (toggle en haut à droite)
3. Cliquer "Charger l'extension non empaquetée"
4. Sélectionner le dossier `cv_rambo/`
5. L'icône 🔫 apparaît dans la barre d'outils

## Structure des fichiers

```
cv_rambo/
├── 📄 manifest.json        # Config extension
├── 📄 background.js         # Service worker Chrome
├── 📄 content.js            # Script injection
├── 📁 frontend/             # Application (11 écrans)
├── 📁 backend/              # Serveur Node.js
├── 📁 icons/                # Icônes
└── 📄 *.sh                  # Scripts utilitaires
```

## Troubleshooting

```bash
# Vérifier les fichiers
./validate-all.sh

# Redémarrer le backend
kill $(lsof -t -i:3000) 2>/dev/null
node backend/proxy-ollama/code/index.js
```

---

**Version**: 1.0.0  
**Statut**: ✅ Production Ready
