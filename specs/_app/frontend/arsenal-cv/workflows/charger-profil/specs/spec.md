---
id: F-001-charger-profil
type: frontend
folder: specs/_app/frontend/arsenal-cv/workflows/charger-profil/
description: Charger le profil complet depuis PouchDB au montage de l'écran Arsenal.
depends_on: [initialiser-pouchdb]
screen: arsenal-cv
global: false
mockup_entry: specs/_app/frontend/arsenal-cv/mockups/loading.html
---

# F-001-charger-profil : Charger le profil

## Description

Charger l'ensemble des données du profil candidat (expériences, compétences, projets) depuis PouchDB lors de l'ouverture de l'écran Arsenal CV.

## Étapes

```javascript
/**
 * @action Afficher l'écran Arsenal avec état de chargement
 * @checkpoint loading-displayed, spinner visible et message "Chargement du profil..."
 *
 * @implementation
 *   console.log('checkpoint:loading-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loading-displayed:end');
 */

/**
 * @action Récupérer toutes les expériences depuis PouchDB
 * @checkpoint experiences-loaded, retourne un tableau (vide ou peuplé)
 *
 * @implementation
 *   console.log('checkpoint:experiences-loaded:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:experiences-loaded:end');
 */

/**
 * @action Récupérer toutes les compétences depuis PouchDB
 * @checkpoint competences-loaded, retourne un tableau (vide ou peuplé)
 *
 * @implementation
 *   console.log('checkpoint:competences-loaded:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:competences-loaded:end');
 */

/**
 * @action Récupérer tous les projets depuis PouchDB
 * @checkpoint projets-loaded, retourne un tableau (vide ou peuplé)
 *
 * @implementation
 *   console.log('checkpoint:projets-loaded:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:projets-loaded:end');
 */

/**
 * @action Stocker les données dans le store Alpine global
 * @checkpoint store-populated, store.arsenal contient {experiences, competences, projets}
 *
 * @implementation
 *   console.log('checkpoint:store-populated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-populated:end');
 */

/**
 * @action Rendre l'interface avec les données chargées
 * @checkpoint ui-rendered, la liste des expériences s'affiche (ou état vide si aucune donnée)
 *
 * @implementation
 *   console.log('checkpoint:ui-rendered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:ui-rendered:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/arsenal-cv/mockups/loading.html`
- `specs/_app/frontend/arsenal-cv/mockups/nominal.html`
- `specs/_app/frontend/arsenal-cv/mockups/empty.html`
- `specs/_app/frontend/arsenal-cv/mockups/error.html`
