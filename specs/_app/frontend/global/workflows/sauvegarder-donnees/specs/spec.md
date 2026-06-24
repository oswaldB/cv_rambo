---
id: F-013-sauvegarder-donnees
type: frontend
folder: specs/_app/frontend/global/workflows/sauvegarder-donnees/
description: Persister les données dans PouchDB après chaque modification.
depends_on: [initialiser-pouchdb]
screen: null
global: true
mockup_entry: null
---

# F-013-sauvegarder-donnees : Sauvegarder les données

## Description

Persister les données utilisateur (profil, cibles, tags, settings) dans PouchDB après chaque modification, avec log de confirmation.

## Étapes

```javascript
/**
 * @action Recevoir l'événement de modification de données
 * @checkpoint change-event-received, {type, data, collection} disponibles
 *
 * @implementation
 *   console.log('checkpoint:change-event-received:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:change-event-received:end');
 */

/**
 * @action Valider les données avant sauvegarde
 * @checkpoint data-validated, les données respectent le schéma attendu
 *
 * @implementation
 *   console.log('checkpoint:data-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:data-validated:end');
 */

/**
 * @action Ouvrir la base PouchDB correspondante
 * @checkpoint db-opened, accès à la bonne base (profil, cibles, tags, settings)
 *
 * @implementation
 *   console.log('checkpoint:db-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:db-opened:end');
 */

/**
 * @action Préparer le document pour PouchDB
 * @checkpoint doc-prepared, objet avec _id (existant ou nouveau) et données
 *
 * @implementation
 *   console.log('checkpoint:doc-prepared:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:doc-prepared:end');
 */

/**
 * @action Insérer ou mettre à jour le document
 * @checkpoint doc-saved, db.put() ou db.post() retourne {ok: true, id, rev}
 *
 * @implementation
 *   console.log('checkpoint:doc-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:doc-saved:end');
 */

/**
 * @action Logger la persistance en console
 * @checkpoint log-emitted, console affiche "[STORAGE] pouchdb-persisted"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Mettre à jour le store local
 * @checkpoint store-updated, store contient les données fraîchement sauvegardées
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Confirmer le succès à l'appelant
 * @checkpoint save-confirmed, Promise résolue avec l'objet sauvegardé
 *
 * @implementation
 *   console.log('checkpoint:save-confirmed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:save-confirmed:end');
 */

/**
 * @action Gérer les erreurs de sauvegarde
 * @checkpoint error-handled, en cas d'échec log dans error-logs et toast d'erreur
 *
 * @implementation
 *   console.log('checkpoint:error-handled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-handled:end');
 */
```

## Mockups de référence

- Global - exécuté automatiquement après chaque modification
