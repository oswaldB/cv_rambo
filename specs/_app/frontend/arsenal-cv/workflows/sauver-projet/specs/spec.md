---
id: F-001-sauver-projet
type: frontend
folder: specs/_app/frontend/arsenal-cv/workflows/sauver-projet/
description: Sauvegarder un projet personnel ou professionnel dans PouchDB.
depends_on: [charger-profil]
screen: arsenal-cv
global: false
mockup_entry: specs/_app/frontend/arsenal-cv/mockups/form-add-open.html
---

# F-001-sauver-projet : Sauvegarder un projet

## Description

Persister un nouveau projet (nom, lien URL optionnel, description) dans PouchDB et mettre à jour l'affichage de la liste des projets.

## Étapes

```javascript
/**
 * @action Ouvrir le formulaire d'ajout de projet
 * @checkpoint form-opened, les champs nom, lien et description sont visibles
 *
 * @implementation
 *   console.log('checkpoint:form-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-opened:end');
 */

/**
 * @action Saisir le nom du projet
 * @checkpoint name-entered, champ nom contient une valeur non vide
 *
 * @implementation
 *   console.log('checkpoint:name-entered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:name-entered:end');
 */

/**
 * @action Saisir le lien URL du projet (optionnel)
 * @checkpoint link-entered, champ lien contient une URL valide ou est vide
 *
 * @implementation
 *   console.log('checkpoint:link-entered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:link-entered:end');
 */

/**
 * @action Saisir la description du projet
 * @checkpoint description-entered, champ description contient une valeur non vide
 *
 * @implementation
 *   console.log('checkpoint:description-entered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:description-entered:end');
 */

/**
 * @action Cliquer sur le bouton "Sauvegarder"
 * @checkpoint save-triggered, le bouton passe en état disabled avec spinner
 *
 * @implementation
 *   console.log('checkpoint:save-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:save-triggered:end');
 */

/**
 * @action Insérer le projet dans PouchDB
 * @checkpoint projet-saved, retourne l'objet avec _id généré
 *
 * @implementation
 *   console.log('checkpoint:projet-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:projet-saved:end');
 */

/**
 * @action Logger la sauvegarde en console
 * @checkpoint log-emitted, console affiche "[ARSENAL] saved projet: {nom}"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Mettre à jour le store Alpine avec le nouveau projet
 * @checkpoint store-updated, store.arsenal.projets contient la nouvelle entrée
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Fermer le formulaire et rafraîchir la liste des projets
 * @checkpoint form-closed, la section projets affiche la nouvelle entrée
 *
 * @implementation
 *   console.log('checkpoint:form-closed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-closed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/arsenal-cv/mockups/form-add-open.html`
- `specs/_app/frontend/arsenal-cv/mockups/nominal.html`
- `specs/_app/frontend/arsenal-cv/mockups/error.html`
