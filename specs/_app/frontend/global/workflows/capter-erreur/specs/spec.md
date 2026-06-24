---
id: F-019-capter-erreur
type: frontend
folder: specs/_app/frontend/global/workflows/capter-erreur/
description: Capter et journaliser une erreur à travers l'application.
depends_on: []
screen: null
global: true
mockup_entry: null
---

# F-019-capter-erreur : Capter une erreur

## Description

Capter toutes les erreurs (synchrones et asynchrones) à travers l'application, les journaliser en console et déclencher les processus de gestion d'erreurs.

## Étapes

```javascript
/**
 * @action Installer un gestionnaire d'erreurs global
 * @checkpoint error-handler-installed, window.onerror et window.addEventListener('unhandledrejection') configurés
 *
 * @implementation
 *   console.log('checkpoint:error-handler-installed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-handler-installed:end');
 */

/**
 * @action Détecter une erreur synchrone
 * @checkpoint sync-error-detected, window.onerror capture une erreur JavaScript
 *
 * @implementation
 *   console.log('checkpoint:sync-error-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:sync-error-detected:end');
 */

/**
 * @action Détecter une erreur asynchrone (Promise rejetée)
 * @checkpoint async-error-detected, unhandledrejection capture une Promise non gérée
 *
 * @implementation
 *   console.log('checkpoint:async-error-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:async-error-detected:end');
 */

/**
 * @action Extraire les informations de l'erreur
 * @checkpoint error-info-extracted, {timestamp, component, message, stack, type} extraits
 *
 * @implementation
 *   console.log('checkpoint:error-info-extracted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-info-extracted:end');
 */

/**
 * @action Logger l'erreur en console
 * @checkpoint error-logged, console affiche "[ERROR] <composant> <message>" avec stack trace
 *
 * @implementation
 *   console.log('checkpoint:error-logged:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-logged:end');
 */

/**
 * @action Déterminer le type d'erreur
 * @checkpoint error-type-determined, classification : pouchdb, ollama, network, dom, unknown
 *
 * @implementation
 *   console.log('checkpoint:error-type-determined:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-type-determined:end');
 */

/**
 * @action Dispatcher vers le gestionnaire approprié
 * @checkpoint error-dispatched, si type=ollama → reessayer-ollama, sinon → stocker-erreur
 *
 * @implementation
 *   console.log('checkpoint:error-dispatched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-dispatched:end');
 */

/**
 * @action Afficher un toast d'erreur à l'utilisateur
 * @checkpoint toast-triggered, événement pour afficher-toast-erreur émis avec le message
 *
 * @implementation
 *   console.log('checkpoint:toast-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-triggered:end');
 */
```

## Mockups de référence

- Global - intercepteur d'erreurs présent sur tous les écrans
