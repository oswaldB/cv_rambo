---
id: F-007-remplir-champs
type: frontend
folder: specs/_app/frontend/pre-remplissage/workflows/remplir-champs/
description: Injecter le script généré par Ollama pour remplir les champs du formulaire.
depends_on: [analyser-formulaire]
screen: pre-remplissage
global: false
mockup_entry: specs/_app/frontend/pre-remplissage/mockups/fields-detected.html
---

# F-007-remplir-champs : Remplir les champs

## Description

Injecter le script JavaScript généré par Ollama dans la page pour remplir automatiquement les champs du formulaire de candidature avec les réponses adaptées au profil.

## Étapes

```javascript
/**
 * @action Recevoir le script généré par Ollama
 * @checkpoint script-received, l'objet JSON avec {script, fields} est disponible
 *
 * @implementation
 *   console.log('checkpoint:script-received:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:script-received:end');
 */

/**
 * @action Valider le script avant injection
 * @checkpoint script-validated, le script est non vide et bien formé
 *
 * @implementation
 *   console.log('checkpoint:script-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:script-validated:end');
 */

/**
 * @action Injecter le script dans la page via chrome.scripting.executeScript
 * @checkpoint script-injected, le script est exécuté dans le contexte de la page
 *
 * @implementation
 *   console.log('checkpoint:script-injected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:script-injected:end');
 */

/**
 * @action Remplir chaque champ identifié
 * @checkpoint fields-filled, chaque {selector, value} est appliqué au DOM
 *
 * @implementation
 *   console.log('checkpoint:fields-filled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:fields-filled:end');
 */

/**
 * @action Logger les champs remplis
 * @checkpoint log-emitted, console affiche "[FILL] fields-filled" avec nombre de champs remplis
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Identifier les champs avec faible confiance (< 80%)
 * @checkpoint low-confidence-marked, champs non remplis avec alerte visuelle (bordure orange)
 *
 * @implementation
 *   console.log('checkpoint:low-confidence-marked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:low-confidence-marked:end');
 */

/**
 * @action Afficher le résumé du remplissage
 * @checkpoint summary-displayed, message "X champs remplis, Y champs à vérifier" visible
 *
 * @implementation
 *   console.log('checkpoint:summary-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:summary-displayed:end');
 */

/**
 * @action Activer le bouton "Soumettre automatiquement"
 * @checkpoint submit-button-enabled, le bouton de soumission devient actif
 *
 * @implementation
 *   console.log('checkpoint:submit-button-enabled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submit-button-enabled:end');
 */

/**
 * @action Afficher l'état des champs remplis
 * @checkpoint filled-state-displayed, l'interface montre les champs complétés avec checkmarks
 *
 * @implementation
 *   console.log('checkpoint:filled-state-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:filled-state-displayed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/pre-remplissage/mockups/fields-detected.html`
- `specs/_app/frontend/pre-remplissage/mockups/filled-success.html`
- `specs/_app/frontend/pre-remplissage/mockups/low-confidence.html`
- `specs/_app/frontend/pre-remplissage/mockups/filling.html`
- `specs/_app/frontend/pre-remplissage/mockups/error.html`
