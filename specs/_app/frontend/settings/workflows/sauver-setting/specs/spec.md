---
id: F-020-sauver-setting
type: frontend
folder: specs/_app/frontend/settings/workflows/sauver-setting/
description: Sauvegarder une option de configuration dans PouchDB.
depends_on: [charger-settings]
screen: settings
global: false
mockup_entry: specs/_app/frontend/settings/mockups/nominal.html
---

# F-020-sauver-setting : Sauvegarder un setting

## Description

Persister une modification de préférences (sons, IA, délai mode rafale) dans PouchDB et logger le changement.

## Étapes

```javascript
/**
 * @action Afficher l'option modifiable
 * @checkpoint option-displayed, toggle ou input visible avec valeur actuelle
 *
 * @implementation
 *   console.log('checkpoint:option-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:option-displayed:end');
 */

/**
 * @action Modifier la valeur de l'option
 * @checkpoint value-changed, toggle ON/OFF ou slider déplacé par l'utilisateur
 *
 * @implementation
 *   console.log('checkpoint:value-changed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:value-changed:end');
 */

/**
 * @action Valider la nouvelle valeur
 * @checkpoint value-validated, format correct (boolean pour toggles, number pour délai)
 *
 * @implementation
 *   console.log('checkpoint:value-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:value-validated:end');
 */

/**
 * @action Mettre à jour le store Alpine
 * @checkpoint store-updated, store.settings[option] contient la nouvelle valeur
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Sauvegarder dans PouchDB
 * @checkpoint setting-saved, db.put() retourne {ok: true, id, rev}
 *
 * @implementation
 *   console.log('checkpoint:setting-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:setting-saved:end');
 */

/**
 * @action Logger le changement en console
 * @checkpoint log-emitted, console affiche "[SETTINGS] changed <option>=<value>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher la confirmation visuelle
 * @checkpoint confirmation-shown, bref flash vert ou checkmark temporaire sur l'option
 *
 * @implementation
 *   console.log('checkpoint:confirmation-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:confirmation-shown:end');
 */

/**
 * @action Propager le changement aux autres composants
 * @checkpoint change-propagated, les autres écrans sont notifiés du changement
 *
 * @implementation
 *   console.log('checkpoint:change-propagated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:change-propagated:end');
 */

/**
 * @action Gérer les erreurs de sauvegarde
 * @checkpoint error-handled, toast d'erreur si PouchDB indisponible
 *
 * @implementation
 *   console.log('checkpoint:error-handled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-handled:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/settings/mockups/nominal.html`
- `specs/_app/frontend/settings/mockups/saved.html`
- `specs/_app/frontend/settings/mockups/error.html`
