---
id: F-005-charger-cibles
type: frontend
folder: specs/_app/frontend/kanban/workflows/charger-cibles/
description: Charger toutes les cibles depuis PouchDB et les afficher dans les 4 colonnes du Kanban.
depends_on: [initialiser-pouchdb]
screen: kanban
global: false
mockup_entry: specs/_app/frontend/kanban/mockups/loading.html
---

# F-005-charger-cibles : Charger les cibles

## Description

Récupérer toutes les cibles (offres d'emploi capturées) depuis PouchDB et les répartir dans les 4 colonnes du Kanban selon leur statut actuel.

## Étapes

```javascript
/**
 * @action Afficher l'écran Kanban avec état de chargement
 * @checkpoint loading-displayed, spinner visible et message "Chargement des cibles..."
 *
 * @implementation
 *   console.log('checkpoint:loading-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loading-displayed:end');
 */

/**
 * @action Récupérer toutes les cibles depuis PouchDB
 * @checkpoint cibles-fetched, retourne un tableau de cibles avec {titre, entreprise, url, description, statut, dateCapture}
 *
 * @implementation
 *   console.log('checkpoint:cibles-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cibles-fetched:end');
 */

/**
 * @action Grouper les cibles par statut
 * @checkpoint cibles-grouped, 4 tableaux créés : en-attente, impact, cible-eliminee, rate
 *
 * @implementation
 *   console.log('checkpoint:cibles-grouped:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cibles-grouped:end');
 */

/**
 * @action Stocker les cibles groupées dans le store Alpine
 * @checkpoint store-populated, store.kanban contient les 4 colonnes avec leurs cartes
 *
 * @implementation
 *   console.log('checkpoint:store-populated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-populated:end');
 */

/**
 * @action Rendre les 4 colonnes avec les cartes
 * @checkpoint columns-rendered, colonnes "En attente", "Impact", "Cible éliminée", "Raté" visibles avec leurs cartes
 *
 * @implementation
 *   console.log('checkpoint:columns-rendered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:columns-rendered:end');
 */

/**
 * @action Rendre les cartes déplaçables (draggable)
 * @checkpoint drag-enabled, chaque carte a l'attribut draggable="true" et curseur grab
 *
 * @implementation
 *   console.log('checkpoint:drag-enabled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:drag-enabled:end');
 */

/**
 * @action Afficher le Kanban complet si des cibles existent
 * @checkpoint kanban-displayed, l'interface montre les colonnes peuplées ou message "Aucune cible" si vide
 *
 * @implementation
 *   console.log('checkpoint:kanban-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:kanban-displayed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/kanban/mockups/loading.html`
- `specs/_app/frontend/kanban/mockups/nominal.html`
- `specs/_app/frontend/kanban/mockups/empty.html`
- `specs/_app/frontend/kanban/mockups/error.html`
