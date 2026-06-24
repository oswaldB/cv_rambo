---
id: F-005-deplacer-cible
type: frontend
folder: specs/_app/frontend/kanban/workflows/deplacer-cible/
description: Glisser-déposer une carte vers une autre colonne et mettre à jour son statut.
depends_on: [charger-cibles]
screen: kanban
global: false
mockup_entry: specs/_app/frontend/kanban/mockups/nominal.html
---

# F-005-deplacer-cible : Déplacer une cible

## Description

Permettre le glisser-déposer d'une carte d'une colonne à une autre pour changer visuellement son statut dans le Kanban.

## Étapes

```javascript
/**
 * @action Afficher le Kanban avec les cartes déplaçables
 * @checkpoint kanban-ready, les cartes ont l'attribut draggable et les colonnes acceptent le drop
 *
 * @implementation
 *   console.log('checkpoint:kanban-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:kanban-ready:end');
 */

/**
 * @action Commencer le drag d'une carte
 * @checkpoint drag-started, la carte a la classe "dragging", dataTransfer contient l'id de la cible
 *
 * @implementation
 *   console.log('checkpoint:drag-started:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:drag-started:end');
 */

/**
 * @action Survoler une colonne cible pendant le drag
 * @checkpoint column-highlighted, la colonne survolée a un style visuel distinct (bordure ou fond)
 *
 * @implementation
 *   console.log('checkpoint:column-highlighted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:column-highlighted:end');
 */

/**
 * @action Déposer la carte dans une nouvelle colonne
 * @checkpoint card-dropped, la carte apparaît dans la colonne cible
 *
 * @implementation
 *   console.log('checkpoint:card-dropped:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:card-dropped:end');
 */

/**
 * @action Mettre à jour le statut dans le store Alpine
 * @checkpoint store-updated, la cible change de tableau dans store.kanban
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Logger le déplacement en console
 * @checkpoint log-emitted, console affiche "[KANBAN] moved <id> to <colonne>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Persister le changement dans PouchDB
 * @checkpoint persisted, appel à mettre-a-jour-statut pour sauvegarder le nouveau statut
 *
 * @implementation
 *   console.log('checkpoint:persisted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:persisted:end');
 */

/**
 * @action Animer la carte à sa nouvelle position
 * @checkpoint animation-complete, la carte est stable dans sa nouvelle colonne
 *
 * @implementation
 *   console.log('checkpoint:animation-complete:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:animation-complete:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/kanban/mockups/nominal.html`
- `specs/_app/frontend/kanban/mockups/dragging.html`
- `specs/_app/frontend/kanban/mockups/error.html`
