# CV Rambo - Frontend

Application frontend de CV Rambo avec **Alpine.js** + **PouchDB** (offline-first).

## ✅ Statut: Tous les écrans codés

- ✅ Dashboard (stats + liste cibles)
- ✅ Ajout URL (formulaire validation)
- ✅ Détail Cible (affichage script)
- ✅ Kanban (drag & drop 4 colonnes)
- ✅ Mode Rafale (sélection + exécution séquentielle)
- ✅ Arsenal (profil candidat)
- ✅ Settings (config + export)

## Architecture

```
frontend/
├── index.html              # Point entrée
├── package.json            # Dépendances (serveur Node.js)
├── global/
│   ├── styles.css          # Styles partagés
│   └── workflows/
│       ├── initialiser-pouchdb/
│       └── sync-couchdb/
├── dashboard/
├── ajout-url/
├── detail-cible/
├── kanban/
├── mode-rafale/
├── arsenal/
└── settings/
```

## Tech Stack

- **Alpine.js** 3.x - Framework réactif léger
- **PouchDB** 8.x - Base locale offline-first
- **PouchDB Find** - Requêtes indexées
- **Serve** - Serveur statique Node.js
- **Design** - Retro action movie style

## Lancement

```bash
# Installation (une fois)
npm install

# Démarrage
npm start
# ou: npx serve . -l 8080

# Développement (live reload)
npm run dev
```

Le serveur démarre sur **http://localhost:8080**

## Configuration

### CouchDB (Backend)
Par défaut: `http://localhost:5984/cv-rambo`

Modifier dans `global/workflows/sync-couchdb/code/index.js`:
```javascript
config: {
  remoteUrl: 'http://localhost:5984/cv-rambo',
  auth: { username: 'admin', password: 'admin' }
}
```

### PouchDB Local
Nom de base: `cv-rambo` (stockée dans IndexedDB du navigateur)

## Points d'entrée

| Écran | URL |
|-------|-----|
| Dashboard | `/dashboard/index.html` |
| Ajout URL | `/ajout-url/index.html` |
| Détail | `/detail-cible/index.html?id=<cibleId>` |
| Kanban | `/kanban/index.html` |
| Mode Rafale | `/mode-rafale/index.html` |
| Arsenal | `/arsenal/index.html` |
| Settings | `/settings/index.html` |

## Flow PouchDB

1. **Init** → Création base locale + indexes
2. **Sync** → Connexion live CouchDB
3. **CRUD** → Opérations offline, sync auto
4. **Live Update** → `db.changes()` pour UI temps réel

## Checkpoints

Format: `console.log('[CHECKPOINT]', 'name', { data })`

Exemples:
- `pouchdb-ready`
- `cibles-loaded`
- `doc-created`
- `sync-change`
- `drag-started`
- `rafale-started`

## Développement

### Ajouter un workflow
1. Créer dossier: `frontend/<ecran>/workflows/<nom>/code/index.js`
2. Déclarer `Alpine.data('<nom>', () => ({ ... }))`
3. Inclure dans HTML: `<script src="workflows/<nom>/code/index.js"></script>`

### Convention
- Un seul `Alpine.data()` par workflow
- Pas de JS vanille - tout via Alpine
- Checkpoints pour chaque étape majeure
- Gestion erreurs avec try/catch + console.error
