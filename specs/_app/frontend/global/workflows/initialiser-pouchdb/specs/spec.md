# Workflow : initialiser-pouchdb

## Description
Initialise la base PouchDB locale, crée les indexes nécessaires, configure la sync avec CouchDB.

## Déclencheur
Démarrage de l'application

## Configuration requise
```javascript
const CONFIG = {
  localDBName: 'cv-rambo',
  remoteUrl: 'http://localhost:5984/cv-rambo',
  auth: {
    username: 'admin',
    password: 'admin_password'
  }
};
```

## Étapes

```javascript
/**
 * @checkpoint Créer instance PouchDB
 */
import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const db = new PouchDB(CONFIG.localDBName);

/**
 * @checkpoint Créer indexes pour requêtes
 */
async function creerIndexes() {
  await db.createIndex({
    index: {
      fields: ['type', 'status', 'createdAt'],
      name: 'idx-type-status-date'
    }
  });
  
  await db.createIndex({
    index: {
      fields: ['type', 'url'],
      name: 'idx-type-url'
    }
  });
}

/**
 * @checkpoint Configurer sync bidirectionnelle
 */
function configurerSync() {
  const remoteDB = new PouchDB(CONFIG.remoteUrl, {
    auth: CONFIG.auth
  });
  
  const sync = db.sync(remoteDB, {
    live: true,
    retry: true,
    heartbeat: 10000,
    back_off_function: (delay) => {
      if (delay === 0) return 1000;
      return Math.min(delay * 2, 60000);
    }
  });
  
  // Événements de sync
  sync.on('change', (info) => {
    console.log('[PouchDB] Sync change:', info);
    window.dispatchEvent(new CustomEvent('db:change', { detail: info }));
  });
  
  sync.on('paused', (err) => {
    console.log('[PouchDB] Sync paused:', err);
  });
  
  sync.on('active', () => {
    console.log('[PouchDB] Sync active');
  });
  
  sync.on('error', (err) => {
    console.error('[PouchDB] Sync error:', err);
    window.dispatchEvent(new CustomEvent('db:error', { detail: err }));
  });
  
  return sync;
}
```

## Exposition globale

```javascript
// Rend PouchDB disponible globalement
window.db = db;

// Helper pour les requêtes courantes
window.dbUtils = {
  async getCibles(filter) { /* ... */ },
  async getCible(id) { /* ... */ },
  async createCible(url) { /* ... */ },
  async updateCible(id, updates) { /* ... */ }
};
```

## Logs
- `[PouchDB] initializing`
- `[PouchDB] indexes-created`
- `[PouchDB] sync-started`
- `[PouchDB] ready`
