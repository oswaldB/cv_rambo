# F-013 : Stockage PouchDB (Frontend) + CouchDB (Serveur)

**Personas** : Tous les utilisateurs de CV Rambo  
**Contexte** : Architecture offline-first avec synchronisation automatique. PouchDB dans le navigateur pour stockage local, CouchDB sur le serveur pour persistance et partage entre appareils.

---

## Architecture de stockage

### Pourquoi PouchDB + CouchDB ?

| Caractéristique | Bénéfice |
|-----------------|----------|
| **Offline-first** | L'app fonctionne sans connexion internet |
| **Sync bidirectionnelle** | Données synchronisées automatiquement |
| **Multi-appareils** | Accès depuis plusieurs navigateurs/appareils |
| **Historique** | CouchDB conserve l'historique des révisions |
| **Facilité** | API simple, pas d'ORM complexe nécessaire |

### Schéma d'architecture

```
┌─────────────┐     Live Sync      ┌─────────────┐
│   PouchDB   │ ◄──────────────────► │   CouchDB   │
│  (Browser)  │    (WebSocket/HTTP)  │  (Serveur)  │
└─────────────┘                      └─────────────┘
       │                                    │
       │ Changes events                     │
       ▼                                    ▼
┌─────────────┐                      ┌─────────────┐
│    UI       │                      │  Workflow   │
│   Reactif   │                      │   Backend   │
│             │                      │  (Puppeteer)  │
└─────────────┘                      └─────────────┘
```

---

## Modèle de données

### Types de documents

```javascript
// 1. CIBLE (offre d'emploi)
{
  "_id": "cible_1699999999999",
  "_rev": "1-abc123",
  "type": "cible",
  "url": "https://linkedin.com/jobs/view/123",
  "status": "script-ready",
  "title": "Développeur Fullstack",
  "company": "TechCorp",
  "description": "Description de l'offre...",
  "location": "Paris",
  "generatedScript": "(function(){...})();",
  "scriptGeneratedAt": "2026-06-24T10:30:00Z",
  "appliedAt": null,
  "errorMessage": null,
  "tags": ["#CiblePrioritaire", "#React"],
  "createdAt": "2026-06-24T10:00:00Z",
  "updatedAt": "2026-06-24T10:30:00Z"
}

// 2. PROFIL (données candidat)
{
  "_id": "profil_user_123",
  "_rev": "2-def456",
  "type": "profil",
  "firstName": "Oswald",
  "lastName": "Bernard",
  "email": "oswald@example.com",
  "phone": "+33612345678",
  "linkedin": "linkedin.com/in/oswald",
  "portfolio": "oswald.dev",
  "cvUrl": null,
  "experiences": [
    {
      "title": "Développeur Fullstack",
      "company": "TechCorp",
      "startDate": "2020-01",
      "endDate": "2024-06",
      "description": "Développement applications web..."
    }
  ],
  "skills": ["React", "Node.js", "TypeScript"],
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-06-24T10:00:00Z"
}

// 3. RAFALE (mode rafale)
{
  "_id": "rafale_1699999999999",
  "_rev": "1-ghi789",
  "type": "rafale",
  "status": "completed",
  "cibleIds": ["cible_1", "cible_2", "cible_3"],
  "progress": {
    "total": 3,
    "generated": 3,
    "applied": 3
  },
  "createdAt": "2026-06-24T10:00:00Z",
  "completedAt": "2026-06-24T11:00:00Z"
}

// 4. SETTINGS
{
  "_id": "settings_user_123",
  "_rev": "3-jkl012",
  "type": "settings",
  "theme": "retro-80s",
  "autoGenerate": true,
  "notifications": true,
  "ollamaModel": "minimax"
}
```

---

## Implémentation Frontend

### Initialisation PouchDB

```javascript
// db.js
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

// Base locale
const localDB = new PouchDB('cv-rambo');

// Création des index pour requêtes rapides
await localDB.createIndex({
  index: {
    fields: ['type', 'status', 'createdAt']
  }
});

export default localDB;
```

### Synchronisation

```javascript
// sync.js
import localDB from './db';

const REMOTE_URL = 'http://localhost:5984/cv-rambo';
const remoteDB = new PouchDB(REMOTE_URL);

// Sync bidirectionnelle continue
const sync = localDB.sync(remoteDB, {
  live: true,      // Continue en arrière-plan
  retry: true,     // Reconnecte automatiquement
  heartbeat: 10000 // Ping toutes les 10s
});

// Événements de sync
sync.on('change', (info) => {
  console.log('Sync change:', info);
  // Met à jour l'UI si documents changés
  window.dispatchEvent(new CustomEvent('db:change', { detail: info }));
});

sync.on('paused', (err) => {
  console.log('Sync paused', err);
});

sync.on('active', () => {
  console.log('Sync active');
});

sync.on('error', (err) => {
  console.error('Sync error:', err);
});

export { sync };
```

### CRUD opérations

```javascript
// cibleService.js
import localDB from './db';

export const cibleService = {
  // Créer une cible
  async create(url) {
    const doc = {
      _id: `cible_${Date.now()}`,
      type: 'cible',
      url,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return await localDB.put(doc);
  },

  // Récupérer toutes les cibles
  async getAll() {
    const result = await localDB.find({
      selector: { type: 'cible' },
      sort: [{ createdAt: 'desc' }]
    });
    return result.docs;
  },

  // Récupérer par statut
  async getByStatus(status) {
    const result = await localDB.find({
      selector: { type: 'cible', status }
    });
    return result.docs;
  },

  // Mettre à jour
  async update(id, updates) {
    const doc = await localDB.get(id);
    const updated = {
      ...doc,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return await localDB.put(updated);
  },

  // Marquer comme postulé
  async markAsApplied(id) {
    return await this.update(id, {
      status: 'applied',
      appliedAt: new Date().toISOString()
    });
  },

  // Supprimer
  async remove(id) {
    const doc = await localDB.get(id);
    return await localDB.remove(doc);
  }
};
```

---

## CouchDB Configuration

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  couchdb:
    image: couchdb:3.2
    container_name: cv-rambo-couchdb
    environment:
      - COUCHDB_USER=admin
      - COUCHDB_PASSWORD=admin_password
    ports:
      - "5984:5984"
    volumes:
      - couchdb_data:/opt/couchdb/data
      - ./couchdb/local.ini:/opt/couchdb/etc/local.ini
    networks:
      - cv-rambo-network

volumes:
  couchdb_data:

networks:
  cv-rambo-network:
```

### Configuration CORS (local.ini)

```ini
[httpd]
enable_cors = true

[cors]
origins = http://localhost:3000, http://localhost:5173
credentials = true
methods = GET, PUT, POST, DELETE, HEAD, OPTIONS
headers = accept, authorization, content-type, origin, referer, x-requested-with
```

### Création base de données

```bash
# Créer la base
curl -X PUT http://admin:admin_password@localhost:5984/cv-rambo

# Créer index pour requêtes Mango
curl -X POST http://admin:admin_password@localhost:5984/cv-rambo/_index \
  -H "Content-Type: application/json" \
  -d '{
    "index": {
      "fields": ["type", "status"]
    },
    "name": "type-status-index"
  }'
```

---

## Workflow Backend (CouchDB)

Le workflow Node.js écoute les changements CouchDB :

```javascript
// workflow/change-listener.js
const nano = require('nano')('http://admin:admin_password@localhost:5984');
const db = nano.use('cv-rambo');

// Écoute les changements (changes feed)
const feed = db.changesReader.start({
  include_docs: true,
  filter: '_view',
  view: 'cibles/new'
});

feed.on('change', async (change) => {
  const doc = change.doc;
  
  // Détecte les nouvelles cibles
  if (doc.type === 'cible' && doc.status === 'new') {
    console.log('[WORKFLOW] Nouvelle cible détectée:', doc._id);
    
    // Passe en processing
    await db.insert({
      ...doc,
      status: 'processing'
    });
    
    // Lance le scraping
    try {
      const script = await generateScript(doc.url);
      
      // Met à jour avec le script
      await db.insert({
        ...doc,
        status: 'script-ready',
        generatedScript: script,
        scriptGeneratedAt: new Date().toISOString()
      });
      
      console.log('[WORKFLOW] Script généré pour:', doc._id);
      
    } catch (error) {
      await db.insert({
        ...doc,
        status: 'error',
        errorMessage: error.message
      });
    }
  }
});

feed.on('error', (err) => {
  console.error('[WORKFLOW] Error:', err);
});
```

---

## Changements (Changes Feed)

### Vue CouchDB pour filtres

```javascript
// Design document pour filtrer les cibles "new"
{
  "_id": "_design/cibles",
  "views": {
    "new": {
      "map": "function(doc) { if(doc.type === 'cible' && doc.status === 'new') emit(doc._id, null); }"
    },
    "by-status": {
      "map": "function(doc) { if(doc.type === 'cible') emit(doc.status, 1); }",
      "reduce": "_count"
    }
  },
  "filters": {
    "new-cibles": "function(doc) { return doc.type === 'cible' && doc.status === 'new'; }"
  }
}
```

---

## Sécurité

| Aspect | Implémentation |
|--------|----------------|
| CouchDB | Authentification basic auth |
| HTTPS | Requis en production |
| CORS | Origines restrictives |
| PouchDB | Pas d'accès direct, via sync uniquement |
| Révisions | CouchDB garde historique, possibilité rollback |
| Validation | Schema validation côté application |

---

## Monitoring

### Métriques de sync

```javascript
// Récupérer infos sync
const info = await localDB.info();
console.log('Documents locaux:', info.doc_count);

// Vérifier dernière sync
const replicationState = await localDB.replicate.to(remoteDB, { 
  live: false, 
  retry: false 
});
console.log('Documents sync:', replicationState.ok);
```

---

## Troubleshooting

| Problème | Solution |
|----------|----------|
| Sync ne démarre pas | Vérifier CORS CouchDB |
| Conflits de révisions | Résolution manuelle ou auto (PouchDB gère) |
| Base trop lourde | Compactage CouchDB, purge anciens docs |
| Timeout sync | Augmenter heartbeat, vérifier réseau |
