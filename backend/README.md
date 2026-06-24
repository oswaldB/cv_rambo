# CV Rambo Backend

Serveur Node.js pour génération automatique de scripts de candidature via Ollama (IA locale).

## Architecture

```
backend/
├── src/
│   ├── index.js                 # Serveur Express
│   ├── services/
│   │   ├── couchdb.js          # Connexion CouchDB + sync
│   │   ├── ollama.js           # Génération IA
│   │   └── logger.js           # Winston logger
│   ├── routes/
│   │   └── api.js              # Routes REST API
│   └── workflows/
│       └── generation-script.js # Workflow auto-génération
├── config/
│   └── index.js                # Configuration
├── tests/                      # Tests
└── package.json
```

## Prérequis

- Node.js 18+
- CouchDB (local ou distant)
- Ollama avec modèle installé (llama2 ou autre)

## Installation

```bash
cd backend
npm install

# Copier configuration
cp .env.example .env
# Éditer .env avec vos paramètres
```

## Lancement

```bash
# Développement avec auto-reload
npm run dev

# Production
npm start
```

Le serveur démarre sur `http://localhost:3000`

## Configuration (.env)

```env
# CouchDB
COUCHDB_URL=http://localhost:5984
COUCHDB_DB=cv-rambo
COUCHDB_USER=admin
COUCHDB_PASSWORD=admin

# Ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# Serveur
PORT=3000
NODE_ENV=development
```

## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/health` | État du serveur |
| GET | `/api/cibles` | Liste toutes les cibles |
| GET | `/api/cibles/:id/script` | Récupérer script généré |
| POST | `/api/cibles/:id/regenerate` | Forcer regénération |
| GET | `/api/stats` | Statistiques |
| GET | `/api/profil` | Profil candidat |

## Workflow de Génération

1. **Écoute** la base CouchDB en temps réel (changes feed)
2. **Détecte** les nouvelles cibles (status = 'new')
3. **Récupère** le profil candidat
4. **Appelle** Ollama avec prompt personnalisé
5. **Sauvegarde** le script généré (status = 'script-ready')
6. **Sync** automatiquement vers le frontend via PouchDB

## Logs

Les logs sont stockés dans `logs/`:
- `combined.log` - Tous les logs
- `error.log` - Erreurs uniquement

Format: `console.log('[CHECKPOINT]', 'name', { data })`

## Ollama

### Installation Ollama

```bash
# macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Télécharger modèle
ollama pull llama2

# Démarrer serveur
ollama serve
```

### Test Ollama

```bash
curl http://localhost:11434/api/tags
```

## Troubleshooting

| Problème | Solution |
|----------|----------|
| Connexion CouchDB refused | Vérifier `docker ps` ou service CouchDB |
| Ollama timeout | Vérifier `ollama serve` tourne |
| Modèle non trouvé | `ollama pull llama2` |
| CORS error | Vérifier CORS activé dans CouchDB |

## Développement

```bash
# Tests
npm test

# Linter (si configuré)
npm run lint
```
