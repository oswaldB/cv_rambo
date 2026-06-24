---
id: F-020-charger-settings
type: frontend
folder: specs/_app/frontend/settings/workflows/charger-settings/
description: Charger les préférences utilisateur depuis PouchDB.
depends_on: [initialiser-pouchdb]
screen: settings
global: false
mockup_entry: specs/_app/frontend/settings/mockups/loading.html
---

# F-020-charger-settings : Charger les settings

## Description

Récupérer les préférences utilisateur (sons, IA, clé API, délai mode rafale) depuis PouchDB et les afficher dans l'écran Settings.

## Étapes

```javascript
/**
 * @action Afficher l'écran Settings avec état de chargement
 * @checkpoint loading-displayed, spinner visible et message "Chargement des préférences..."
 *
 * @implementation
 *   console.log('checkpoint:loading-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loading-displayed:end');
 */

/**
 * @action Récupérer le document settings depuis PouchDB
 * @checkpoint settings-fetched, retourne {soundsEnabled, iaEnabled, apiKey, rafaleDelay} ou valeurs par défaut
 *
 * @implementation
 *   console.log('checkpoint:settings-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:settings-fetched:end');
 */

/**
 * @action Appliquer les valeurs par défaut si aucun setting n'existe
 * @checkpoint defaults-applied, {soundsEnabled: true, iaEnabled: true, rafaleDelay: 30} utilisés
 *
 * @implementation
 *   console.log('checkpoint:defaults-applied:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:defaults-applied:end');
 */

/**
 * @action Stocker les settings dans le store Alpine
 * @checkpoint store-populated, store.settings contient toutes les préférences
 *
 * @implementation
 *   console.log('checkpoint:store-populated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-populated:end');
 */

/**
 * @action Afficher les options avec leurs valeurs actuelles
 * @checkpoint options-rendered, toggle Sons, toggle IA, champ Clé API, slider Délai visibles avec valeurs
 *
 * @implementation
 *   console.log('checkpoint:options-rendered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:options-rendered:end');
 */

/**
 * @action Masquer la clé API par défaut (dots)
 * @checkpoint api-key-hidden, input type="password" affiché par défaut
 *
 * @implementation
 *   console.log('checkpoint:api-key-hidden:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:api-key-hidden:end');
 */

/**
 * @action Afficher l'état des toggles
 * @checkpoint toggles-displayed, état ON/OFF visible pour chaque option
 *
 * @implementation
 *   console.log('checkpoint:toggles-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toggles-displayed:end');
 */

/**
 * @action Gérer le cas settings vide (première utilisation)
 * @checkpoint empty-state-handled, message "Configurez vos préférences" affiché si nouveau
 *
 * @implementation
 *   console.log('checkpoint:empty-state-handled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:empty-state-handled:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/settings/mockups/loading.html`
- `specs/_app/frontend/settings/mockups/nominal.html`
- `specs/_app/frontend/settings/mockups/error.html`
