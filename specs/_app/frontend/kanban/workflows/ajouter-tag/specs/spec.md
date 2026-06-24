---
id: F-006-ajouter-tag
type: frontend
folder: specs/_app/frontend/kanban/workflows/ajouter-tag/
description: Ajouter un tag à une cible pour la catégoriser.
depends_on: [charger-cibles]
screen: kanban
global: false
mockup_entry: specs/_app/frontend/kanban/mockups/nominal.html
---

# F-006-ajouter-tag : Ajouter un tag

## Description

Permettre à l'utilisateur d'ajouter un ou plusieurs tags à une cible du Kanban pour la catégoriser (#CiblePrioritaire, #MissionImpossible, etc.).

## Étapes

```javascript
/**
 * @action Afficher une carte cible dans le Kanban
 * @checkpoint card-displayed, la carte montre les tags existants (s'il y en a)
 *
 * @implementation
 *   console.log('checkpoint:card-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:card-displayed:end');
 */

/**
 * @action Cliquer sur le bouton "Ajouter un tag" de la carte
 * @checkpoint tag-menu-opened, une liste de tags suggérés s'affiche avec champ "Nouveau tag"
 *
 * @implementation
 *   console.log('checkpoint:tag-menu-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tag-menu-opened:end');
 */

/**
 * @action Sélectionner un tag existant ou saisir un nouveau tag
 * @checkpoint tag-selected, un tag parmi les défauts est choisi OU un texte libre avec # est saisi
 *
 * @implementation
 *   console.log('checkpoint:tag-selected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tag-selected:end');
 */

/**
 * @action Valider l'ajout du tag
 * @checkpoint add-validated, le tag n'est pas déjà présent sur la cible
 *
 * @implementation
 *   console.log('checkpoint:add-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:add-validated:end');
 */

/**
 * @action Mettre à jour la cible dans le store Alpine
 * @checkpoint store-updated, store.kanban.cibles[X].tags contient le nouveau tag
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Persister le tag dans PouchDB
 * @checkpoint tag-persisted, la cible est sauvegardée avec le nouveau tableau de tags
 *
 * @implementation
 *   console.log('checkpoint:tag-persisted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tag-persisted:end');
 */

/**
 * @action Logger l'ajout en console
 * @checkpoint log-emitted, console affiche "[TAG] added <cibleId> #<tag>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher le tag sur la carte
 * @checkpoint tag-displayed, le tag apparaît visuellement sur la carte avec son style
 *
 * @implementation
 *   console.log('checkpoint:tag-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tag-displayed:end');
 */

/**
 * @action Fermer le menu de sélection
 * @checkpoint menu-closed, l'interface retourne à l'état normal du Kanban
 *
 * @implementation
 *   console.log('checkpoint:menu-closed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:menu-closed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/kanban/mockups/nominal.html`
- `specs/_app/frontend/kanban/mockups/tag-menu-open.html`
- `specs/_app/frontend/kanban/mockups/error.html`
