---
id: F-006-retirer-tag
type: frontend
folder: specs/_app/frontend/kanban/workflows/retirer-tag/
description: Retirer un tag d'une cible.
depends_on: [ajouter-tag]
screen: kanban
global: false
mockup_entry: specs/_app/frontend/kanban/mockups/nominal.html
---

# F-006-retirer-tag : Retirer un tag

## Description

Permettre à l'utilisateur de retirer un tag existant d'une cible du Kanban.

## Étapes

```javascript
/**
 * @action Afficher une carte cible avec des tags
 * @checkpoint card-with-tags-displayed, la carte montre au moins un tag avec bouton de suppression
 *
 * @implementation
 *   console.log('checkpoint:card-with-tags-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:card-with-tags-displayed:end');
 */

/**
 * @action Cliquer sur le bouton de suppression d'un tag
 * @checkpoint remove-triggered, l'utilisateur confirme ou le tag est immédiatement marqué pour suppression
 *
 * @implementation
 *   console.log('checkpoint:remove-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:remove-triggered:end');
 */

/**
 * @action Retirer le tag du tableau dans le store Alpine
 * @checkpoint store-updated, store.kanban.cibles[X].tags ne contient plus le tag retiré
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Persister la modification dans PouchDB
 * @checkpoint tag-removed-persisted, la cible est sauvegardée avec le tableau de tags mis à jour
 *
 * @implementation
 *   console.log('checkpoint:tag-removed-persisted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tag-removed-persisted:end');
 */

/**
 * @action Logger le retrait en console
 * @checkpoint log-emitted, console affiche "[TAG] removed <cibleId> #<tag>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Mettre à jour l'affichage de la carte
 * @checkpoint card-updated, le tag n'apparaît plus sur la carte
 *
 * @implementation
 *   console.log('checkpoint:card-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:card-updated:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/kanban/mockups/nominal.html`
- `specs/_app/frontend/kanban/mockups/tag-removed.html`
- `specs/_app/frontend/kanban/mockups/error.html`
