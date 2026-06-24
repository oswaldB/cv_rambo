---
id: F-020-exporter-donnees
type: frontend
folder: specs/_app/frontend/settings/workflows/exporter-donnees/
description: Exporter toutes les données (candidatures, CV, settings) vers un fichier JSON.
depends_on: [charger-settings]
screen: settings
global: false
mockup_entry: specs/_app/frontend/settings/mockups/nominal.html
---

# F-020-exporter-donnees : Exporter les données

## Description

Exporter toutes les données locales (candidatures, CV, settings) depuis PouchDB vers un fichier JSON téléchargeable.

## Étapes

```javascript
/**
 * @action Cliquer sur le bouton "Exporter les données"
 * @checkpoint export-clicked, événement click détecté sur le bouton export
 *
 * @implementation
 *   console.log('checkpoint:export-clicked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:export-clicked:end');
 */

/**
 * @action Récupérer toutes les candidatures depuis PouchDB
 * @checkpoint candidatures-fetched, db.allDocs('candidatures') retourne les docs
 *
 * @implementation
 *   console.log('checkpoint:candidatures-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:candidatures-fetched:end');
 */

/**
 * @action Récupérer le CV depuis PouchDB
 * @checkpoint cv-fetched, db.get('cv') retourne le document CV
 *
 * @implementation
 *   console.log('checkpoint:cv-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cv-fetched:end');
 */

/**
 * @action Récupérer les settings depuis PouchDB
 * @checkpoint settings-fetched, db.get('settings') retourne les préférences
 *
 * @implementation
 *   console.log('checkpoint:settings-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:settings-fetched:end');
 */

/**
 * @action Construire l'objet de données complet
 * @checkpoint data-built, objet {version, date, candidatures, cv, settings} prêt
 *
 * @implementation
 *   console.log('checkpoint:data-built:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:data-built:end');
 */

/**
 * @action Générer le fichier JSON
 * @checkpoint json-generated, blob JSON créé avec JSON.stringify(data, null, 2)
 *
 * @implementation
 *   console.log('checkpoint:json-generated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:json-generated:end');
 */

/**
 * @action Créer le lien de téléchargement
 * @checkpoint download-link-created, URL.createObjectURL généré
 *
 * @implementation
 *   console.log('checkpoint:download-link-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:download-link-created:end');
 */

/**
 * @action Déclencher le téléchargement
 * @checkpoint download-triggered, fichier cv-rambo-export-YYYY-MM-DD.json téléchargé
 *
 * @implementation
 *   console.log('checkpoint:download-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:download-triggered:end');
 */

/**
 * @action Nettoyer le blob URL
 * @checkpoint blob-cleanup, URL.revokeObjectURL appelé
 *
 * @implementation
 *   console.log('checkpoint:blob-cleanup:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:blob-cleanup:end');
 */

/**
 * @action Afficher la confirmation d'export
 * @checkpoint export-confirmed, toast "Export réussi" affiché
 *
 * @implementation
 *   console.log('checkpoint:export-confirmed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:export-confirmed:end');
 */

/**
 * @action Logger l'export en console
 * @checkpoint log-emitted, console affiche "[EXPORT] Données exportées - X candidatures, CV, settings"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Gérer les erreurs d'export
 * @checkpoint error-handled, toast d'erreur si PouchDB indisponible ou blob creation échoue
 *
 * @implementation
 *   console.log('checkpoint:error-handled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-handled:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/settings/mockups/nominal.html`
- `specs/_app/frontend/settings/mockups/export-success.html`
- `specs/_app/frontend/settings/mockups/error.html`
