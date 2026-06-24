---
id: F-016-reinitialiser-filtre
type: frontend
folder: specs/_app/frontend/kanban/workflows/reinitialiser-filtre/
description: Réinitialiser le filtre pour afficher toutes les cibles dans le Kanban.
depends_on: [filtrer-par-tag]
screen: kanban
global: false
mockup_entry: specs/_app/frontend/kanban/mockups/filtered-by-tag.html
---

# F-016-reinitialiser-filtre : Réinitialiser le filtre

## Description

Permettre à l'utilisateur de réinitialiser le filtre actif pour voir à nouveau toutes les cibles dans les 4 colonnes du Kanban.

## Étapes

```javascript
/**
 * @action Afficher le Kanban avec un filtre actif
 * @checkpoint filtered-displayed, le Kanban montre uniquement les cibles avec le tag filtré
 *
 * @implementation
 *   console.log('checkpoint:filtered-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:filtered-displayed:end');
 */

/**
 * @action Afficher le bouton "Tous" pour réinitialiser
 * @checkpoint reset-button-visible, bouton "Tous" ou "Réinitialiser" visible en haut du Kanban
 *
 * @implementation
 *   console.log('checkpoint:reset-button-visible:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:reset-button-visible:end');
 */

/**
 * @action Cliquer sur le bouton "Tous"
 * @checkpoint reset-triggered, l'utilisateur clique pour voir toutes les cibles
 *
 * @implementation
 *   console.log('checkpoint:reset-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:reset-triggered:end');
 */

/**
 * @action Réinitialiser le filtre dans le store Alpine
 * @checkpoint filter-cleared, store.kanban.activeFilter est mis à null
 *
 * @implementation
 *   console.log('checkpoint:filter-cleared:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:filter-cleared:end');
 */

/**
 * @action Restaurer l'affichage de toutes les cibles
 * @checkpoint all-cibles-displayed, les 4 colonnes montrent toutes les cibles sans restriction
 *
 * @implementation
 *   console.log('checkpoint:all-cibles-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:all-cibles-displayed:end');
 */

/**
 * @action Désactiver visuellement le tag actif
 * @checkpoint active-tag-cleared, le tag précédemment sélectionné n'a plus le style "actif"
 *
 * @implementation
 *   console.log('checkpoint:active-tag-cleared:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:active-tag-cleared:end');
 */

/**
 * @action Mettre à jour le compteur de cibles affichées
 * @checkpoint counter-updated, le nombre total de cibles est affiché
 *
 * @implementation
 *   console.log('checkpoint:counter-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:counter-updated:end');
 */

/**
 * @action Logger la réinitialisation en console
 * @checkpoint log-emitted, console affiche "[FILTER] tag=all"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher la confirmation visuelle
 * @checkpoint reset-confirmed, bref flash ou message "Toutes les cibles affichées" visible
 *
 * @implementation
 *   console.log('checkpoint:reset-confirmed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:reset-confirmed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/kanban/mockups/filtered-by-tag.html`
- `specs/_app/frontend/kanban/mockups/nominal.html`
