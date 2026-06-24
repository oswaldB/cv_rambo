# 🔫 CV Rambo

**L'arsenal ultime pour votre recherche d'emploi.**

Application web complète pour automatiser vos candidatures : générez des scripts JavaScript personnalisés via IA (Ollama) pour remplir automatiquement les formulaires d'emploi.

## 🎯 Features

- 🤖 **Génération IA** de scripts de candidature personnalisés (Ollama)
- 📝 **Profil candidat** pour scripts sur-mesure
- 📋 **Kanban** pour organiser vos candidatures (drag & drop)
- 🚀 **Mode Rafale** pour postuler en série rapidement
- 💾 **Offline-first** avec PouchDB (fonctionne sans connexion)
- 🔄 **Sync temps réel** avec CouchDB
- 🎨 **Design rétro** style Rambo/action movie
- 🔌 **Extension navigateur** pour ajout rapide

## 🏗️ Architecture

```
cv-rambo/
├── frontend/           # Alpine.js + PouchDB (7 écrans)
├── backend/            # Node.js + Express + Ollama
├── extension/          # Chrome/Firefox extension
└── scripts/            # Utilitaires (backup, health-check)
```

## 🚀 Démarrage Rapide

### Prérequis (uniquement Node.js)

- **Node.js 18+** (seul prérequis !)
- CouchDB (voir installation ci-dessous)
- Ollama (optionnel, pour génération IA)

### 1. Installation

```bash
# Une seule commande
./install.sh
```

### 2. Installer CouchDB

**macOS:**
```bash
brew install couchdb
brew services start couchdb
```

**Ubuntu/Debian:**
```bash
sudo apt install couchdb
sudo systemctl start couchdb
```

**Configuration:**
```bash
# Créer l'admin
curl -X PUT http://localhost:5984/_node/_local/_config/admins/admin -d '"admin"'

# Créer la base cv-rambo
curl -X PUT http://admin:admin@localhost:5984/cv-rambo
```

**Alternative:** Utilisez [Cloudant](https://www.ibm.com/cloud/cloudant) (CouchDB cloud, free tier disponible)

### 3. Installer Ollama (optionnel)

```bash
# macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Télécharger modèle
ollama pull llama2

# Démarrer
ollama serve
```

### 4. Lancer l'application

**Terminal 1 - Backend:**
```bash
make backend
# ou: cd backend && npm start
```

**Terminal 2 - Frontend:**
```bash
make frontend
# ou: cd frontend && npm start
```

**Accès:** http://localhost:8080

## 🛠️ Stack Technique

### Frontend
- **Alpine.js** 3.x - Framework réactif léger
- **PouchDB** 8.x - Base locale offline-first
- **Pure CSS** - Design rétro custom
- **Serveur:** Node.js (`serve`)

### Backend
- **Node.js** + **Express** - Serveur API
- **Ollama** - IA locale pour génération
- **CouchDB** - Base de données synchronisée

## 📖 Documentation

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
- [Guide de test](frontend/TESTING.md)
- [Guide contribution](frontend/CONTRIBUTING.md)

## 🎮 Usage

1. **Créez votre profil** dans Arsenal
2. **Ajoutez une URL** d'offre d'emploi (ou via l'extension)
3. **Attendez** que l'IA génère le script (10-40s)
4. **Ouvrez** l'offre dans un nouvel onglet
5. **Copiez-collez** le script dans la console (F12)
6. **Postulez** rapidement !

## 🔧 Configuration

### Frontend
Éditer `frontend/global/workflows/sync-couchdb/code/index.js`:
```javascript
config: {
  remoteUrl: 'http://localhost:5984/cv-rambo',
  auth: { username: 'admin', password: 'admin' }
}
```

### Backend
Créer `backend/.env`:
```env
COUCHDB_URL=http://localhost:5984
COUCHDB_DB=cv-rambo
COUCHDB_USER=admin
COUCHDB_PASSWORD=admin
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama2
PORT=3000
```

## 🧪 Tests

```bash
# Tests E2E Frontend
cd frontend/tests
npm install
npm test

# Health check
make health

# Backup données
make backup
```

## 🧰 Commandes

| Commande | Description |
|----------|-------------|
| `make install` | Installation complète |
| `make dev` | Mode développement (2 terminaux) |
| `make backend` | Backend uniquement (port 3000) |
| `make frontend` | Frontend uniquement (port 8080) |
| `make test` | Tests E2E |
| `make backup` | Sauvegarde CouchDB |
| `make restore` | Restauration |
| `make health` | Vérifier services |
| `make clean` | Nettoyer dépendances |

## 🐛 Troubleshooting

| Problème | Solution |
|----------|----------|
| CouchDB refuse connexion | `brew services start couchdb` ou `sudo systemctl start couchdb` |
| PouchDB not loaded | Rafraîchir la page |
| Ollama timeout | Vérifier `ollama serve` |
| CORS error | CouchDB config: `enable_cors = true` |
| Port 8080 occupé | `cd frontend && npm run dev` (utilise port disponible) |

## 📝 License

MIT

## 🙏 Remerciements

- [Alpine.js](https://alpinejs.dev/)
- [PouchDB](https://pouchdb.com/)
- [Ollama](https://ollama.com/)
- [Serve](https://github.com/vercel/serve) (serveur statique)
