---
id: F-006-gerer-tags-defaut
type: frontend
folder: specs/_app/frontend/kanban/workflows/gerer-tags-defaut/
description: Gérer les tags par défaut et les tags personnalisés.
depends_on: [ajouter-tag]
screen: kanban
global: false
mockup_entry: specs/_app/frontend/kanban/mockups/nominal.html
---

# F-006-gerer-tags-defaut : Gérer les tags par défaut

## Description

Permettre à l'utilisateur de configurer les tags par défaut proposés (#CiblePrioritaire, #MissionImpossible, #OnTenteLeCoup, #Désespéré) et de gérer ses tags personnalisés.

## Étapes

```javascript
/**
 * @action Ouvrir le panneau de gestion des tags
 * @checkpoint tags-panel-opened, interface affichant les tags par défaut et personnalisés
 *
 * @implementation
 *   console.log('checkpoint:tags-panel-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tags-panel-opened:end');
 */

/**
 * @action Afficher les tags par défaut
 * @checkpoint default-tags-displayed, liste [#CiblePrioritaire, #MissionImpossible, #OnTenteLeCoup, #Désespéré] visible
 *
 * @implementation
 *   console.log('checkpoint:default-tags-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:default-tags-displayed:end');
 */

/**
 * @action Afficher les tags personnalisés créés par l'utilisateur
 * @checkpoint custom-tags-displayed, les tags créés manuellement sont listés séparément
 *
 * @implementation
 *   console.log('checkpoint:custom-tags-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:custom-tags-displayed:end');
 */

/**
 * @action Permettre l'ajout d'un nouveau tag personnalisé
 * @checkpoint add-custom-tag-ready, champ de saisie avec préfixe # et bouton d'ajout disponibles
 *
 * @implementation
 *   console.log('checkpoint:add-custom-tag-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:add-custom-tag-ready:end');
 */

/**
 * @action Saisir un nouveau tag personnalisé
 * @checkpoint custom-tag-entered, texte saisi avec préfixe # automatique
 *
 * @implementation
 *   console.log('checkpoint:custom-tag-entered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:custom-tag-entered:end');
 */

/**
 * @action Valider et ajouter le tag personnalisé
 * @checkpoint custom-tag-added, le tag est ajouté à la liste des tags disponibles
 *
 * @implementation
 *   console.log('checkpoint:custom-tag-added:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:custom-tag-added:end');
 */

/**
 * @action Permettre la suppression d'un tag personnalisé
 * @checkpoint delete-custom-tag-ready, bouton de suppression sur chaque tag personnalisé
 *
 * @implementation
 *   console.log('checkpoint:delete-custom-tag-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:delete-custom-tag-ready:end');
 */

/**
 * @action Supprimer un tag personnalisé
 * @checkpoint custom-tag-deleted, le tag est retiré de la liste (sans impacter les cibles déjà taguées)
 *
 * @implementation
 *   console.log('checkpoint:custom-tag-deleted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:custom-tag-deleted:end');
 */

/**
 * @action Sauvegarder la configuration des tags
 * @checkpoint tags-config-saved, les préférences sont persistées dans PouchDB
 *
 * @implementation
 *   console.log('checkpoint:tags-config-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tags-config-saved:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/kanban/mockups/tags-panel.html`
- `specs/_app/frontend/kanban/mockups/nominal.html`
