---
id: F-017-completer-onboarding
type: frontend
folder: specs/_app/frontend/onboarding/workflows/completer-onboarding/
description: Marquer l'onboarding comme terminé et débloquer l'accès à l'application.
depends_on: [parcours-tutoriel]
screen: onboarding
global: false
mockup_entry: specs/_app/frontend/onboarding/mockups/completed.html
---

# F-017-completer-onboarding : Compléter l'onboarding

## Description

Finaliser l'onboarding en marquant le flag `onboardingDone` à true, débloquer l'accès complet à l'application et afficher la confirmation de complétion.

## Étapes

```javascript
/**
 * @action Afficher l'écran de complétion
 * @checkpoint completion-screen-displayed, message "Bienvenue dans CV Rambo" avec résumé du profil
 *
 * @implementation
 *   console.log('checkpoint:completion-screen-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:completion-screen-displayed:end');
 */

/**
 * @action Logger l'étape finale
 * @checkpoint log-step-emitted, console affiche "[ONBOARDING] step-completed"
 *
 * @implementation
 *   console.log('checkpoint:log-step-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-step-emitted:end');
 */

/**
 * @action Afficher le récapitulatif du profil créé
 * @checkpoint profile-summary-shown, nombre d'expériences et compétences sauvegardées affichés
 *
 * @implementation
 *   console.log('checkpoint:profile-summary-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:profile-summary-shown:end');
 */

/**
 * @action Créer le flag onboardingDone dans PouchDB
 * @checkpoint flag-created, entrée {onboardingDone: true, completedAt: dateISO} sauvegardée
 *
 * @implementation
 *   console.log('checkpoint:flag-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:flag-created:end');
 */

/**
 * @action Logger la complétion
 * @checkpoint log-completed-emitted, console affiche "[ONBOARDING] completed"
 *
 * @implementation
 *   console.log('checkpoint:log-completed-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-completed-emitted:end');
 */

/**
 * @action Activer le bouton "Commencer à utiliser CV Rambo"
 * @checkpoint start-button-enabled, bouton principal actif pour accéder à l'application
 *
 * @implementation
 *   console.log('checkpoint:start-button-enabled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:start-button-enabled:end');
 */

/**
 * @action Permettre l'accès aux settings depuis l'écran final
 * @checkpoint settings-link-ready, liens "Revoir le tutoriel" et "Modifier mon profil" visibles
 *
 * @implementation
 *   console.log('checkpoint:settings-link-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:settings-link-ready:end');
 */

/**
 * @action Fermer l'overlay d'onboarding
 * @checkpoint onboarding-closed, transition vers l'écran principal de l'application
 *
 * @implementation
 *   console.log('checkpoint:onboarding-closed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:onboarding-closed:end');
 */

/**
 * @action Rendre l'application pleinement accessible
 * @checkpoint app-unlocked, tous les écrans (arsenal, kanban, capture) sont accessibles
 *
 * @implementation
 *   console.log('checkpoint:app-unlocked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:app-unlocked:end');
 */

/**
 * @action Stocker les préférences d'accès rapide
 * @checkpoint shortcuts-saved, liens "Revoir le tutoriel" et "Modifier mon profil" persistés dans settings
 *
 * @implementation
 *   console.log('checkpoint:shortcuts-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:shortcuts-saved:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/onboarding/mockups/completed.html`
- `specs/_app/frontend/onboarding/mockups/welcome-dashboard.html`
