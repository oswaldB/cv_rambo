---
id: F-020-valider-cle-api
type: frontend
folder: specs/_app/frontend/settings/workflows/valider-cle-api/
description: Valider le format de la clé API Ollama Cloud avant sauvegarde.
depends_on: [charger-settings]
screen: settings
global: false
mockup_entry: specs/_app/frontend/settings/mockups/nominal.html
---

# F-020-valider-cle-api : Valider la clé API

## Description

Valider le format de la clé API Ollama Cloud (non vide, format attendu) avant de la sauvegarder dans PouchDB.

## Étapes

```javascript
/**
 * @action Afficher le champ Clé API masqué par défaut
 * @checkpoint api-key-field-displayed, input type="password" avec valeur actuelle (vide ou dots)
 *
 * @implementation
 *   console.log('checkpoint:api-key-field-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:api-key-field-displayed:end');
 */

/**
 * @action Permettre d'afficher/masquer la clé API
 * @checkpoint toggle-visibility-ready, bouton œil 👁️ à côté du champ
 *
 * @implementation
 *   console.log('checkpoint:toggle-visibility-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toggle-visibility-ready:end');
 */

/**
 * @action Cliquer sur le bouton "Afficher/Masquer"
 * @checkpoint visibility-toggled, input passe de type "password" à "text" et vice versa
 *
 * @implementation
 *   console.log('checkpoint:visibility-toggled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:visibility-toggled:end');
 */

/**
 * @action Saisir la clé API dans le champ
 * @checkpoint key-entered, l'utilisateur tape la clé dans l'input
 *
 * @implementation
 *   console.log('checkpoint:key-entered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:key-entered:end');
 */

/**
 * @action Valider que la clé n'est pas vide
 * @checkpoint key-not-empty, validation échoue si chaîne vide
 *
 * @implementation
 *   console.log('checkpoint:key-not-empty:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:key-not-empty:end');
 */

/**
 * @action Valider le format basique de la clé
 * @checkpoint format-validated, longueur minimale (ex: 20 caractères) vérifiée
 *
 * @implementation
 *   console.log('checkpoint:format-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:format-validated:end');
 */

/**
 * @action Afficher les erreurs de validation
 * @checkpoint validation-error-shown, message "Clé API invalide" si validation échoue
 *
 * @implementation
 *   console.log('checkpoint:validation-error-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:validation-error-shown:end');
 */

/**
 * @action Activer le bouton "Sauvegarder" si valide
 * @checkpoint save-button-enabled, bouton actif si format OK
 *
 * @implementation
 *   console.log('checkpoint:save-button-enabled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:save-button-enabled:end');
 */

/**
 * @action Sauvegarder la clé validée
 * @checkpoint key-saved, db.put() dans PouchDB avec chiffrement optionnel
 *
 * @implementation
 *   console.log('checkpoint:key-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:key-saved:end');
 */

/**
 * @action Logger la sauvegarde
 * @checkpoint log-emitted, console affiche "[SETTINGS] changed apiKey=***" (masquée)
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher la confirmation
 * @checkpoint success-shown, message "Clé API sauvegardée" avec indicateur vert
 *
 * @implementation
 *   console.log('checkpoint:success-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:success-shown:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/settings/mockups/nominal.html`
- `specs/_app/frontend/settings/mockups/api-key-hidden.html`
- `specs/_app/frontend/settings/mockups/api-key-visible.html`
- `specs/_app/frontend/settings/mockups/api-key-invalid.html`
- `specs/_app/frontend/settings/mockups/saved.html`
