---
id: F-020-importer-donnees
type: frontend
folder: specs/_app/frontend/settings/workflows/importer-donnees/
description: Importer des données (candidatures, CV, settings) depuis un fichier JSON.
depends_on: [charger-settings]
screen: settings
global: false
mockup_entry: specs/_app/frontend/settings/mockups/nominal.html
---

# F-020-importer-donnees : Importer les données

## Description

Importer des données précédemment exportées (candidatures, CV, settings) depuis un fichier JSON vers PouchDB.

## Étapes

```javascript
/**
 * @action Cliquer sur le bouton "Importer des données"
 * @checkpoint import-clicked, événement click détecté sur le bouton import
 *
 * @implementation
 *   console.log('checkpoint:import-clicked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:import-clicked:end');
 */

/**
 * @action Ouvrir le sélecteur de fichier
 * @checkpoint file-picker-opened, input type="file" déclenché avec accept=".json"
 *
 * @implementation
 *   console.log('checkpoint:file-picker-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:file-picker-opened:end');
 */

/**
 * @action Valider le fichier sélectionné
 * @checkpoint file-validated, fichier .json non vide sélectionné
 *
 * @implementation
 *   console.log('checkpoint:file-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:file-validated:end');
 */

/**
 * @action Lire le contenu du fichier
 * @checkpoint file-read, FileReader.onload retourne le contenu texte
 *
 * @implementation
 *   console.log('checkpoint:file-read:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:file-read:end');
 */

/**
 * @action Parser le JSON
 * @checkpoint json-parsed, JSON.parse() retourne objet {version, date, candidatures, cv, settings}
 *
 * @implementation
 *   console.log('checkpoint:json-parsed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:json-parsed:end');
 */

/**
 * @action Valider le format des données
 * @checkpoint data-validated, structure attendue vérifiée (version présente, tableaux valides)
 *
 * @implementation
 *   console.log('checkpoint:data-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:data-validated:end');
 */

/**
 * @action Afficher le résumé avant confirmation
 * @checkpoint summary-shown, modal affichant "X candidatures, CV, settings trouvés. Remplacer les données actuelles ?"
 *
 * @implementation
 *   console.log('checkpoint:summary-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:summary-shown:end');
 */

/**
 * @action Confirmer l'import
 * @checkpoint import-confirmed, utilisateur clique sur "Oui, remplacer"
 *
 * @implementation
 *   console.log('checkpoint:import-confirmed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:import-confirmed:end');
 */

/**
 * @action Sauvegarder les candidatures dans PouchDB
 * @checkpoint candidatures-saved, db.bulkDocs() pour les candidatures retourne succès
 *
 * @implementation
 *   console.log('checkpoint:candidatures-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:candidatures-saved:end');
 */

/**
 * @action Sauvegarder le CV dans PouchDB
 * @checkpoint cv-saved, db.put() pour le CV retourne {ok: true}
 *
 * @implementation
 *   console.log('checkpoint:cv-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cv-saved:end');
 */

/**
 * @action Sauvegarder les settings dans PouchDB
 * @checkpoint settings-saved, db.put() pour les settings retourne {ok: true}
 *
 * @implementation
 *   console.log('checkpoint:settings-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:settings-saved:end');
 */

/**
 * @action Rafraîchir le store Alpine
 * @checkpoint store-refreshed, store.settings, store.candidatures, store.cv mis à jour
 *
 * @implementation
 *   console.log('checkpoint:store-refreshed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-refreshed:end');
 */

/**
 * @action Afficher la confirmation d'import
 * @checkpoint import-success-shown, toast "Import réussi - X candidatures importées" affiché
 *
 * @implementation
 *   console.log('checkpoint:import-success-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:import-success-shown:end');
 */

/**
 * @action Logger l'import en console
 * @checkpoint log-emitted, console affiche "[IMPORT] Données importées depuis <filename>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Gérer l'annulation par l'utilisateur
 * @checkpoint cancel-handled, modal fermée si utilisateur clique "Annuler"
 *
 * @implementation
 *   console.log('checkpoint:cancel-handled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cancel-handled:end');
 */

/**
 * @action Gérer les erreurs d'import
 * @checkpoint error-handled, toast d'erreur si JSON invalide, version incompatible, ou PouchDB échoue
 *
 * @implementation
 *   console.log('checkpoint:error-handled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-handled:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/settings/mockups/nominal.html`
- `specs/_app/frontend/settings/mockups/import-summary.html`
- `specs/_app/frontend/settings/mockups/import-success.html`
- `specs/_app/frontend/settings/mockups/error.html`
