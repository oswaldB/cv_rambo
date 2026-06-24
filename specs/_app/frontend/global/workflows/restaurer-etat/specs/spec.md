---
id: F-013-restaurer-etat
type: frontend
folder: specs/_app/frontend/global/workflows/restaurer-etat/
description: Restaurer l'état complet du profil et des cibles au chargement de l'overlay.
depends_on: [initialiser-pouchdb]
screen: null
global: true
mockup_entry: null
---

# F-013-restaurer-etat : Restaurer l'état

## Description

Récupérer toutes les données depuis PouchDB et restaurer l'état complet (profil + cibles + tags + settings) au chargement de l'overlay CV Rambo.

## Étapes

```javascript
/**
 * @action Détecter le chargement de l'overlay
 * @checkpoint overlay-loading, événement de montage de l'interface déclenché
 *
 * @implementation
 *   console.log('checkpoint:overlay-loading:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:overlay-loading:end');
 */

/**
 * @action Afficher l'état de chargement
 * @checkpoint loading-displayed, spinner ou message "Restauration des données..." visible
 *
 * @implementation
 *   console.log('checkpoint:loading-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loading-displayed:end');
 */

/**
 * @action Récupérer tous les documents de la base "profil"
 * @checkpoint profil-fetched, db.allDocs({include_docs: true}) retourne les documents
 *
 * @implementation
 *   console.log('checkpoint:profil-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:profil-fetched:end');
 */

/**
 * @action Récupérer tous les documents de la base "cibles"
 * @checkpoint cibles-fetched, toutes les cibles du Kanban sont chargées
 *
 * @implementation
 *   console.log('checkpoint:cibles-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cibles-fetched:end');
 */

/**
 * @action Récupérer tous les documents de la base "tags"
 * @checkpoint tags-fetched, tags par défaut et personnalisés sont chargés
 *
 * @implementation
 *   console.log('checkpoint:tags-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tags-fetched:end');
 */

/**
 * @action Récupérer tous les documents de la base "settings"
 * @checkpoint settings-fetched, préférences utilisateur sont chargées
 *
 * @implementation
 *   console.log('checkpoint:settings-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:settings-fetched:end');
 */

/**
 * @action Populer le store global avec les données restaurées
 * @checkpoint store-populated, store contient {profil, cibles, tags, settings}
 *
 * @implementation
 *   console.log('checkpoint:store-populated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-populated:end');
 */

/**
 * @action Vérifier la cohérence des données
 * * @checkpoint data-verified, pas de doublons ou d'incohérences détectées
 */

/**
 * @action Logger la restauration en console
 * @checkpoint log-emitted, console affiche "[STORAGE] state-restored" avec nombre de documents
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Terminer le chargement et afficher l'interface
 * @checkpoint restoration-complete, l'overlay affiche les données restaurées ou état vide
 *
 * @implementation
 *   console.log('checkpoint:restoration-complete:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:restoration-complete:end');
 */

/**
 * @action Gérer le cas où aucune donnée n'existe (première utilisation)
 * @checkpoint empty-state-handled, redirection vers onboarding si profil vide
 *
 * @implementation
 *   console.log('checkpoint:empty-state-handled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:empty-state-handled:end');
 */
```

## Mockups de référence

- Global - exécuté au chargement de chaque écran/overlay
