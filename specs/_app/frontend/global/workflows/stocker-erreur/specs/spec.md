---
id: F-019-stocker-erreur
type: frontend
folder: specs/_app/frontend/global/workflows/stocker-erreur/
description: Persister l'erreur dans PouchDB error-logs.
depends_on: [capter-erreur, initialiser-pouchdb]
screen: null
global: true
mockup_entry: null
---

# F-019-stocker-erreur : Stocker l'erreur

## Description

Persister les erreurs capturées dans une base de données PouchDB dédiée `error-logs` avec toutes les métadonnées pour faciliter le debug.

## Étapes

```javascript
/**
 * @action Recevoir les données de l'erreur capturée
 * @checkpoint error-data-received, {timestamp, component, message, stack, type} disponibles
 *
 * @implementation
 *   console.log('checkpoint:error-data-received:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-data-received:end');
 */

/**
 * @action Ouvrir la base PouchDB error-logs
 * @checkpoint error-logs-db-opened, accès à la base dédiée aux erreurs
 *
 * @implementation
 *   console.log('checkpoint:error-logs-db-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-logs-db-opened:end');
 */

/**
 * @action Préparer le document d'erreur
 * @checkpoint error-doc-prepared, objet structuré avec tous les champs requis
 *
 * @implementation
 *   console.log('checkpoint:error-doc-prepared:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-doc-prepared:end');
 */

/**
 * @action Tronquer la stack trace si trop longue
 * @checkpoint stack-truncated, stack limitée à 5000 caractères maximum
 *
 * @implementation
 *   console.log('checkpoint:stack-truncated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:stack-truncated:end');
 */

/**
 * @action Ajouter des métadonnées contextuelles
 * @checkpoint metadata-added, {userAgent, url, screenSize, appVersion} ajoutés
 *
 * @implementation
 *   console.log('checkpoint:metadata-added:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:metadata-added:end');
 */

/**
 * @action Insérer l'erreur dans PouchDB
 * @checkpoint error-saved, db.put() retourne {ok: true, id, rev}
 *
 * @implementation
 *   console.log('checkpoint:error-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-saved:end');
 */

/**
 * @action Vérifier la limite de stockage (garder les 100 dernières erreurs)
 * @checkpoint storage-limit-checked, suppression des erreurs les plus anciennes si > 100
 *
 * @implementation
 *   console.log('checkpoint:storage-limit-checked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:storage-limit-checked:end');
 */

/**
 * @action Confirmer le stockage
 * @checkpoint persistence-confirmed, l'erreur est persistante et consultable
 *
 * @implementation
 *   console.log('checkpoint:persistence-confirmed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:persistence-confirmed:end');
 */
```

## Mockups de référence

- Global - stockage silencieux en arrière-plan
