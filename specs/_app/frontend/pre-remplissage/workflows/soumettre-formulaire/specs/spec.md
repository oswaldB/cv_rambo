---
id: F-007-soumettre-formulaire
type: frontend
folder: specs/_app/frontend/pre-remplissage/workflows/soumettre-formulaire/
description: Exécuter le script de soumission et détecter le succès de la candidature.
depends_on: [generer-script-soumission]
screen: pre-remplissage
global: false
mockup_entry: specs/_app/frontend/pre-remplissage/mockups/submitting.html
---

# F-007-soumettre-formulaire : Soumettre le formulaire

## Description

Injecter et exécuter le script de soumission généré par Ollama, surveiller la soumission et confirmer son succès, puis déplacer la cible vers la colonne "Impact" du Kanban.

## Étapes

```javascript
/**
 * @action Recevoir le script de soumission validé
 * @checkpoint submit-script-ready, le script est prêt pour injection
 *
 * @implementation
 *   console.log('checkpoint:submit-script-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submit-script-ready:end');
 */

/**
 * @action Injecter le script dans la page
 * @checkpoint submit-script-injected, chrome.scripting.executeScript exécute le script de soumission
 *
 * @implementation
 *   console.log('checkpoint:submit-script-injected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submit-script-injected:end');
 */

/**
 * @action Logger l'exécution du script
 * @checkpoint log-executed, console affiche "[SUBMIT] script-executed"
 *
 * @implementation
 *   console.log('checkpoint:log-executed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-executed:end');
 */

/**
 * @action Surveiller la soumission (redirection, message confirmation, changement DOM)
 * @checkpoint monitoring-started, observateurs sur URL et DOM actifs
 *
 * @implementation
 *   console.log('checkpoint:monitoring-started:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:monitoring-started:end');
 */

/**
 * @action Détecter les indicateurs de succès
 * @checkpoint success-detected, un des confirmationIndicators est observé (redirection, message, etc.)
 *
 * @implementation
 *   console.log('checkpoint:success-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:success-detected:end');
 */

/**
 * @action Logger la confirmation de succès
 * @checkpoint log-success-emitted, console affiche "[SUBMIT] success-confirmed"
 *
 * @implementation
 *   console.log('checkpoint:log-success-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-success-emitted:end');
 */

/**
 * @action Afficher le toast de confirmation
 * @checkpoint toast-displayed, message "Mission accomplie" visible pendant 3 secondes
 *
 * @implementation
 *   console.log('checkpoint:toast-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-displayed:end');
 */

/**
 * @action Mettre à jour le statut de la cible liée dans PouchDB
 * @checkpoint target-updated, la cible passe à statut "Impact"
 *
 * @implementation
 *   console.log('checkpoint:target-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:target-updated:end');
 */

/**
 * @action Déplacer la cible vers la colonne "Impact" du Kanban
 * @checkpoint kanban-moved, console affiche "[KANBAN] moved-to-impact <targetId>"
 *
 * @implementation
 *   console.log('checkpoint:kanban-moved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:kanban-moved:end');
 */

/**
 * @action Gérer les erreurs de soumission
 * @checkpoint error-handled, en cas d'échec console affiche "[SUBMIT] script-error" et toast d'erreur
 *
 * @implementation
 *   console.log('checkpoint:error-handled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-handled:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/pre-remplissage/mockups/submitting.html`
- `specs/_app/frontend/pre-remplissage/mockups/submit-success.html`
- `specs/_app/frontend/pre-remplissage/mockups/error.html`
