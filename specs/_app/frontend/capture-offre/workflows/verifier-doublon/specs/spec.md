---
id: F-004-verifier-doublon
type: frontend
folder: specs/_app/frontend/capture-offre/workflows/verifier-doublon/
description: Vérifier si l'URL de l'offre existe déjà dans le Kanban.
depends_on: [extraire-donnees]
screen: capture-offre
global: false
mockup_entry: specs/_app/frontend/capture-offre/mockups/edit-confirm.html
---

# F-004-verifier-doublon : Vérifier les doublons

## Description

Vérifier si l'URL de l'offre capturée existe déjà dans les cibles du Kanban stockées dans PouchDB et afficher un warning si c'est le cas.

## Étapes

```javascript
/**
 * @action Récupérer l'URL extraite
 * @checkpoint url-retrieved, l'URL à vérifier est disponible
 *
 * @implementation
 *   console.log('checkpoint:url-retrieved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:url-retrieved:end');
 */

/**
 * @action Rechercher l'URL dans la base PouchDB des cibles
 * @checkpoint db-queried, la requête recherche une cible avec le même URL
 *
 * @implementation
 *   console.log('checkpoint:db-queried:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:db-queried:end');
 */

/**
 * @action Vérifier le résultat de la recherche
 * @checkpoint duplicate-checked, retourne true si une cible existe déjà avec cette URL
 *
 * @implementation
 *   console.log('checkpoint:duplicate-checked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:duplicate-checked:end');
 */

/**
 * @action Logger la détection de doublon en console
 * @checkpoint log-emitted, console affiche "[CAPTURE] duplicate-detected <url>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher le warning de doublon si trouvé
 * @checkpoint warning-displayed, message "Cette offre existe déjà" visible avec boutons "Voir l'existant" et "Créer quand même"
 *
 * @implementation
 *   console.log('checkpoint:warning-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:warning-displayed:end');
 */

/**
 * @action Permettre la navigation vers l'offre existante
 * @checkpoint navigate-option-ready, le bouton "Voir l'existant" redirige vers la cible dans le Kanban
 *
 * @implementation
 *   console.log('checkpoint:navigate-option-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:navigate-option-ready:end');
 */

/**
 * @action Permettre la création malgré le doublon
 * @checkpoint force-create-ready, le bouton "Créer quand même" permet de continuer
 *
 * @implementation
 *   console.log('checkpoint:force-create-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:force-create-ready:end');
 */

/**
 * @action Procéder normalement si pas de doublon
 * @checkpoint no-duplicate, le workflow continue vers ajouter-liste ou tirer-direct
 *
 * @implementation
 *   console.log('checkpoint:no-duplicate:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:no-duplicate:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/capture-offre/mockups/duplicate-detected.html`
- `specs/_app/frontend/capture-offre/mockups/edit-confirm.html`
