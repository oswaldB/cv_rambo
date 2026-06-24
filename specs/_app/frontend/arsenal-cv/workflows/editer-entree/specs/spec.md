---
id: F-001-editer-entree
type: frontend
folder: specs/_app/frontend/arsenal-cv/workflows/editer-entree/
description: Éditer une entrée existante (expérience, compétence ou projet) dans PouchDB.
depends_on: [charger-profil]
screen: arsenal-cv
global: false
mockup_entry: specs/_app/frontend/arsenal-cv/mockups/form-edit-open.html
---

# F-001-editer-entree : Éditer une entrée

## Description

Modifier une entrée existante du profil (expérience, compétence ou projet) en la chargeant dans un formulaire d'édition, puis persister les changements dans PouchDB.

## Étapes

```javascript
/**
 * @action Cliquer sur le bouton d'édition d'une entrée
 * @checkpoint edit-clicked, l'entrée visée est identifiée par son _id
 *
 * @implementation
 *   console.log('checkpoint:edit-clicked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:edit-clicked:end');
 */

/**
 * @action Charger les données de l'entrée depuis le store
 * @checkpoint data-loaded, les champs du formulaire sont pré-remplis avec les valeurs actuelles
 *
 * @implementation
 *   console.log('checkpoint:data-loaded:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:data-loaded:end');
 */

/**
 * @action Ouvrir le formulaire d'édition
 * @checkpoint form-opened, le formulaire est visible avec les données pré-remplies
 *
 * @implementation
 *   console.log('checkpoint:form-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-opened:end');
 */

/**
 * @action Modifier un ou plusieurs champs du formulaire
 * @checkpoint form-modified, au moins un champ a une valeur différente de l'originale
 *
 * @implementation
 *   console.log('checkpoint:form-modified:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-modified:end');
 */

/**
 * @action Cliquer sur le bouton "Sauvegarder les modifications"
 * @checkpoint save-triggered, le bouton passe en état disabled avec spinner
 *
 * @implementation
 *   console.log('checkpoint:save-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:save-triggered:end');
 */

/**
 * @action Mettre à jour l'entrée dans PouchDB avec le même _id
 * @checkpoint entry-updated, retourne l'objet mis à jour avec _rev incrémentée
 *
 * @implementation
 *   console.log('checkpoint:entry-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:entry-updated:end');
 */

/**
 * @action Logger la mise à jour en console
 * @checkpoint log-emitted, console affiche "[ARSENAL] updated: {type} {titre/nom}"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Mettre à jour l'entrée dans le store Alpine
 * @checkpoint store-updated, l'entrée modifiée remplace l'ancienne dans le tableau correspondant
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Fermer le formulaire et rafraîchir l'affichage
 * @checkpoint form-closed, la liste affiche les données mises à jour
 *
 * @implementation
 *   console.log('checkpoint:form-closed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-closed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/arsenal-cv/mockups/form-edit-open.html`
- `specs/_app/frontend/arsenal-cv/mockups/nominal.html`
- `specs/_app/frontend/arsenal-cv/mockups/error.html`
