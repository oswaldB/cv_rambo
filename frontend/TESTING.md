# Guide de Test - CV Rambo Frontend

## Lancement rapide

```bash
cd frontend
npm install    # Une fois
npm start      # Démarrage
```

Ouvrir: http://localhost:8080

## Tests manuels

### 1. Initialisation PouchDB
- [ ] Ouvrir la page d'accueil
- [ ] Ouvrir console DevTools (F12)
- [ ] Vérifier checkpoints: `pouchdb-ready`, `indexes-created`
- [ ] Vérifier `window.db` et `window.dbUtils` exposés

### 2. Créer une cible
- [ ] Aller sur "Nouvelle Cible"
- [ ] Entrer URL: `https://www.linkedin.com/jobs/view/123456`
- [ ] Vérifier détection automatique du site
- [ ] Soumettre
- [ ] Vérifier message succès
- [ ] Vérifier dans Dashboard que la cible apparaît

### 3. Dashboard
- [ ] Vérifier stats mises à jour
- [ ] Cliquer filtres (En attente, Script prêt, etc.)
- [ ] Cliquer sur une cible pour voir détail

### 4. Kanban
- [ ] Vérifier 4 colonnes
- [ ] Drag & drop une carte entre colonnes
- [ ] Vérrier statut mis à jour

### 5. Mode Rafale
- [ ] Sélectionner 2-3 cibles
- [ ] Lancer rafale
- [ ] Naviguer entre cibles
- [ ] Tester copier script

### 6. Arsenal (Profil)
- [ ] Remplir formulaire
- [ ] Sauvegarder
- [ ] Vérifier toast confirmation
- [ ] Rafraîchir page, vérifier persistance

### 7. Settings
- [ ] Tester connexion CouchDB
- [ ] Exporter données JSON
- [ ] Vérifier fichier téléchargé

## Checkpoints à vérifier

Dans la console, chercher `[CHECKPOINT]`:

```
[CHECKPOINT] pouchdb-ready
[CHECKPOINT] cibles-loaded {count: X}
[CHECKPOINT] doc-created {id: "..."}
[CHECKPOINT] drag-started
[CHECKPOINT] rafale-started
```

## Mode Offline

1. Ouvrir Dashboard
2. Couper réseau (DevTools > Network > Offline)
3. Ajouter une cible
4. Vérifier que ça fonctionne (stocké localement)
5. Remettre réseau
6. Vérifier sync vers CouchDB

## Debug

```javascript
// Voir base locale
window.db.allDocs({include_docs: true}).then(r => console.log(r))

// Stats
window.dbUtils.getCibles().then(c => console.log('Cibles:', c.length))

// Forcer sync
window.db.replicate.to('http://localhost:5984/cv-rambo')
```

## Problèmes courants

| Problème | Solution |
|----------|----------|
| `PouchDB not loaded` | Rafraîchir, vérifier CDN |
| Sync ne marche pas | Vérifier CouchDB: `curl http://localhost:5984` |
| Données ne persistent pas | Vérifier IndexedDB autorisé dans navigateur |
| CORS error | Vérifier config CouchDB: `enable_cors = true` |

## Tests E2E (Playwright)

```bash
cd tests
npm install
npm test
```
