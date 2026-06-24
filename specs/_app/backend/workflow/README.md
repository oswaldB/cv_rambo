# Workflow Backend - Architecture

**Rôle** : Écouter CouchDB, scraper les URLs avec Puppeteer, générer des scripts JS via Ollama

## Structure

```
_app/backend/workflow/
├── index.js                 # Point d'entrée principal
├── config/
│   └── index.js             # Configuration (env vars)
├── services/
│   ├── couchdb.js           # Client CouchDB + changes feed
│   ├── scraper.js           # Puppeteer scraping
│   └── ollama.js            # Génération scripts IA
├── utils/
│   └── logger.js            # Logging formaté
└── package.json             # Dépendances
```

## Flux de données

```
CouchDB (changements)
    ↓
Change Listener (couchdb.js)
    ↓ (filtre status='new')
Scraper Service (scraper.js)
    ↓ (HTML extrait)
Ollama Service (ollama.js)
    ↓ (script généré)
CouchDB (mise à jour status='script-ready')
    ↓
Sync → PouchDB frontend
```

## Configuration requise

### Variables d'environnement
```bash
# CouchDB
COUCHDB_URL=http://localhost:5984
COUCHDB_DB=cv-rambo
COUCHDB_USER=admin
COUCHDB_PASSWORD=admin_password

# Ollama
OLLAMA_URL=https://api.ollama.com
OLLAMA_API_KEY=sk-...
OLLAMA_MODEL=minimax

# Puppeteer
PUPPETEER_HEADLESS=true
PUPPETEER_TIMEOUT=30000

# App
LOG_LEVEL=info
MAX_CONCURRENT_SCRAPES=3
```

## Cycle de vie d'une cible

| État | Qui | Action |
|------|-----|--------|
| `new` | Frontend | Création document PouchDB |
| `new` | Sync | Réplication vers CouchDB |
| `new` → `processing` | Workflow | Détection + scraping |
| `processing` → `script-ready` | Workflow | Génération Ollama OK |
| `processing` → `error` | Workflow | Erreur scraping/IA |
| `script-ready` | Sync | Réplication vers PouchDB |
| `script-ready` | Frontend | Notification utilisateur |

## Dépendances

```json
{
  "puppeteer": "^21.0.0",
  "nano": "^10.0.0",
  "axios": "^1.6.0",
  "dotenv": "^16.0.0",
  "p-limit": "^4.0.0"
}
```
