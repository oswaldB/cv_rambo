---
id: F-006-filtrer-par-tag
type: frontend
folder: specs/_app/frontend/kanban/workflows/filtrer-par-tag/
description: Filtrer les cibles visibles dans le Kanban par tag.
depends_on: [charger-cibles]
screen: kanban
global: false
mockup_entry: specs/_app/frontend/kanban/mockups/nominal.html
---

# F-006-filtrer-par-tag : Filtrer par tag

## Description

Filtrer l'affichage du Kanban pour ne montrer que les cibles possédant un tag spécifique.

## Étapes

```javascript
/**
 * @action Afficher le Kanban avec tous les filtres disponibles
 * @checkpoint kanban-with-filters-displayed, barre de filtres en haut avec tags disponibles
 *
 * @implementation
 *   console.log('checkpoint:kanban-with-filters-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:kanban-with-filters-displayed:end');
 */

/**
 * @action Cliquer sur un tag dans la barre de filtres
 * @checkpoint filter-selected, le tag cliqué devient actif visuellement
 *
 * @implementation
 *   console.log('checkpoint:filter-selected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:filter-selected:end');
 */

/**
 * @action Filtrer les cibles dans le store Alpine
 * @checkpoint cibles-filtered, seules les cibles avec le tag sélectionné restent visibles
 *
 * @implementation
 *   console.log('checkpoint:cibles-filtered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cibles-filtered:end');
 */

/**
 * @action Mettre à jour l'affichage des colonnes
 * @checkpoint columns-filtered, chaque colonne n'affiche que les cartes correspondant au filtre
 *
 * @implementation
 *   console.log('checkpoint:columns-filtered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:columns-filtered:end');
 */

/**
 * @action Afficher le nombre de résultats filtrés
 * @checkpoint count-displayed, indicateur "X cibles affichées" visible
 *
 * @implementation
 *   console.log('checkpoint:count-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:count-displayed:end');
 */

/**
 * @action Logger le filtrage en console
 * @checkpoint log-emitted, console affiche "[TAG] filtered #<tag>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Permettre la désactivation du filtre
 * @checkpoint filter-clear-ready, bouton "Réinitialiser" ou clic sur le tag actif pour tout afficher
 *
 * @implementation
 *   console.log('checkpoint:filter-clear-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:filter-clear-ready:end');
 */

/**
 * @action Désactiver le filtre pour voir toutes les cibles
 * @checkpoint filter-cleared, toutes les cibles sont à nouveau visibles dans leurs colonnes
 *
 * @implementation
 *   console.log('checkpoint:filter-cleared:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:filter-cleared:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/kanban/mockups/nominal.html`
- `specs/_app/frontend/kanban/mockups/filtered-by-tag.html`
