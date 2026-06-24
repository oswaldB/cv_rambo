---
id: F-019-exporter-logs
type: frontend
folder: specs/_app/frontend/global/workflows/exporter-logs/
description: Exporter les logs d'erreurs en JSON depuis les settings.
depends_on: [stocker-erreur]
screen: settings
global: false
mockup_entry: specs/_app/frontend/settings/mockups/nominal.html
---

# F-019-exporter-logs : Exporter les logs

## Description

Permettre à l'utilisateur d'exporter l'historique des erreurs stockées dans PouchDB `error-logs` au format JSON depuis l'écran settings.

## Étapes

```javascript
/**
 * @action Afficher l'écran Settings
 * @checkpoint settings-displayed, section "Gestion des erreurs" visible
 *
 * @implementation
 *   console.log('checkpoint:settings-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:settings-displayed:end');
 */

/**
 * @action Afficher le bouton "Exporter les logs"
 * @checkpoint export-button-visible, bouton avec compteur "X erreurs stockées"
 *
 * @implementation
 *   console.log('checkpoint:export-button-visible:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:export-button-visible:end');
 */

/**
 * @action Cliquer sur le bouton d'export
 * @checkpoint export-triggered, l'utilisateur initie l'export
 *
 * @implementation
 *   console.log('checkpoint:export-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:export-triggered:end');
 */

/**
 * @action Récupérer toutes les erreurs depuis PouchDB
 * @checkpoint errors-fetched, db.allDocs({include_docs: true}) retourne les erreurs
 *
 * @implementation
 *   console.log('checkpoint:errors-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:errors-fetched:end');
 */

/**
 * @action Formater les données en JSON
 * @checkpoint json-formatted, objet JSON structuré avec {exportDate, appVersion, errors: []}
 *
 * @implementation
 *   console.log('checkpoint:json-formatted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:json-formatted:end');
 */

/**
 * @action Créer le fichier blob JSON
 * @checkpoint blob-created, new Blob([json], {type: 'application/json'})
 *
 * @implementation
 *   console.log('checkpoint:blob-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:blob-created:end');
 */

/**
 * @action Générer le nom de fichier avec timestamp
 * @checkpoint filename-ready, format cv-rambo-errors-YYYY-MM-DD.json
 *
 * @implementation
 *   console.log('checkpoint:filename-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:filename-ready:end');
 */

/**
 * @action Créer le lien de téléchargement
 * @checkpoint download-link-created, URL.createObjectURL(blob) généré
 *
 * @implementation
 *   console.log('checkpoint:download-link-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:download-link-created:end');
 */

/**
 * @action Déclencher le téléchargement automatique
 * @checkpoint download-triggered, fichier sauvegardé dans le dossier Téléchargements
 *
 * @implementation
 *   console.log('checkpoint:download-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:download-triggered:end');
 */

/**
 * @action Afficher la confirmation
 * @checkpoint success-toast, message "Logs exportés avec succès" visible
 *
 * @implementation
 *   console.log('checkpoint:success-toast:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:success-toast:end');
 */

/**
 * @action Proposer la suppression des logs après export
 * @checkpoint delete-option-ready, bouton "Vider les logs" disponible
 *
 * @implementation
 *   console.log('checkpoint:delete-option-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:delete-option-ready:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/settings/mockups/nominal.html`
- `specs/_app/frontend/settings/mockups/export-ready.html`
