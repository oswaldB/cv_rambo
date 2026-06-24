---
id: F-019-reessayer-ollama
type: frontend
folder: specs/_app/frontend/global/workflows/reessayer-ollama/
description: Tentative de reprise automatique sur erreur Ollama (timeout, réseau).
depends_on: [capter-erreur]
screen: null
global: true
mockup_entry: null
---

# F-019-reessayer-ollama : Réessayer Ollama

## Description

En cas d'erreur Ollama (timeout, problème réseau), effectuer une tentative de reprise automatique avec message "Reprise..." affiché à l'utilisateur.

## Étapes

```javascript
/**
 * @action Détecter une erreur Ollama
 * @checkpoint ollama-error-detected, type=ollama identifié (timeout, network error, 5xx)
 *
 * @implementation
 *   console.log('checkpoint:ollama-error-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:ollama-error-detected:end');
 */

/**
 * @action Afficher le message "Reprise..."
 * @checkpoint retry-message-shown, toast ou indicator "Tentative de reconnexion..." visible
 *
 * @implementation
 *   console.log('checkpoint:retry-message-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:retry-message-shown:end');
 */

/**
 * @action Attendre 3 secondes avant réessai
 * @checkpoint retry-delay-started, setTimeout de 3000ms pour laisser le réseau se stabiliser
 *
 * @implementation
 *   console.log('checkpoint:retry-delay-started:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:retry-delay-started:end');
 */

/**
 * @action Vérifier la connexion réseau
 * @checkpoint network-checked, navigator.onLine vérifié avant réessai
 *
 * @implementation
 *   console.log('checkpoint:network-checked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:network-checked:end');
 */

/**
 * @action Relancer la requête Ollama
 * @checkpoint request-retried, nouvelle tentative avec les mêmes paramètres
 *
 * @implementation
 *   console.log('checkpoint:request-retried:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:request-retried:end');
 */

/**
 * @action Gérer le succès de la reprise
 * @checkpoint retry-success, la requête réussit → continuer normalement
 *
 * @implementation
 *   console.log('checkpoint:retry-success:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:retry-success:end');
 */

/**
 * @action Gérer l'échec de la reprise
 * @checkpoint retry-failed, échec après 3 tentatives → stocker-erreur + toast erreur final
 *
 * @implementation
 *   console.log('checkpoint:retry-failed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:retry-failed:end');
 */

/**
 * @action Logger les tentatives
 * @checkpoint retry-logged, console affiche "[ERROR] ollama-retry-<n>" à chaque tentative
 *
 * @implementation
 *   console.log('checkpoint:retry-logged:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:retry-logged:end');
 */
```

## Mockups de référence

- Global - tentative de reprise silencieuse avec feedback utilisateur
