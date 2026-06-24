---
id: F-001-supprimer-entree
type: frontend
folder: specs/_app/frontend/arsenal-cv/workflows/supprimer-entree/
description: Supprimer une entrée existante (expérience, compétence ou projet) de PouchDB.
depends_on: [charger-profil]
screen: arsenal-cv
global: false
mockup_entry: specs/_app/frontend/arsenal-cv/mockups/delete-confirm.html
---

# F-001-supprimer-entree : Supprimer une entrée

## Description

Supprimer définitivement une entrée du profil (expérience, compétence ou projet) après confirmation utilisateur, et mettre à jour PouchDB et l'affichage.

## Étapes

```javascript
/**
 * @action Cliquer sur le bouton de suppression d'une entrée
 * @checkpoint delete-clicked, l'entrée visée est identifiée par son _id et son type
 *
 * @implementation
 *   console.log('checkpoint:delete-clicked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:delete-clicked:end');
 */

/**
 * @action Afficher la modale de confirmation
 * @checkpoint confirm-modal-displayed, message "Supprimer définitivement ?" visible avec boutons Annuler/Confirmer
 *
 * @implementation
 *   console.log('checkpoint:confirm-modal-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:confirm-modal-displayed:end');
 */

/**
 * @action Cliquer sur le bouton "Confirmer"
 * @checkpoint confirm-clicked, le bouton passe en état disabled
 *
 * @implementation
 *   console.log('checkpoint:confirm-clicked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:confirm-clicked:end');
 */

/**
 * @action Supprimer l'entrée de PouchDB par son _id
 * @checkpoint entry-deleted, PouchDB retourne {ok: true}
 *
 * @implementation
 *   console.log('checkpoint:entry-deleted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:entry-deleted:end');
 */

/**
 * @action Logger la suppression en console
 * @checkpoint log-emitted, console affiche "[ARSENAL] deleted: {type} {titre/nom}"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Retirer l'entrée du store Alpine
 * @checkpoint store-updated, l'entrée supprimée n'est plus présente dans le tableau correspondant
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Fermer la modale de confirmation
 * @checkpoint modal-closed, l'interface retourne à la liste sans l'entrée supprimée
 *
 * @implementation
 *   console.log('checkpoint:modal-closed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:modal-closed:end');
 */

/**
 * @action Afficher un toast de confirmation
 * @checkpoint toast-shown, message "Entrée supprimée" visible temporairement
 *
 * @implementation
 *   console.log('checkpoint:toast-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-shown:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/arsenal-cv/mockups/delete-confirm.html`
- `specs/_app/frontend/arsenal-cv/mockups/nominal.html`
- `specs/_app/frontend/arsenal-cv/mockups/error.html`
