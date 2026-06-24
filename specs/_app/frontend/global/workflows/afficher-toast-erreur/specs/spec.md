---
id: F-018-afficher-toast-erreur
type: frontend
folder: specs/_app/frontend/global/workflows/afficher-toast-erreur/
description: Afficher un toast d'erreur en cas d'échec d'une action.
depends_on: [appliquer-theme]
screen: null
global: true
mockup_entry: null
---

# F-018-afficher-toast-erreur : Afficher toast d'erreur

## Description

Afficher une notification toast d'erreur (fond rouge, icône ✗, 5 secondes) dans l'overlay injecté pour informer l'utilisateur qu'une action a échoué.

## Étapes

```javascript
/**
 * @action Détecter un événement d'erreur
 * @checkpoint error-event-detected, événement global "toast:error" émis avec {message, title, error}
 *
 * @implementation
 *   console.log('checkpoint:error-event-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-event-detected:end');
 */

/**
 * @action Créer l'élément toast dans le DOM
 * @checkpoint toast-created, élément div avec classes .toast et .toast--error créé
 *
 * @implementation
 *   console.log('checkpoint:toast-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-created:end');
 */

/**
 * @action Appliquer le style rétro au toast
 * @checkpoint toast-styled, fond rouge, icône ✗, typographie Bebas Neue appliqués
 *
 * @implementation
 *   console.log('checkpoint:toast-styled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-styled:end');
 */

/**
 * @action Positionner le toast dans l'overlay
 * @checkpoint toast-positioned, position haut-droite ou bas-centre selon l'écran actif
 *
 * @implementation
 *   console.log('checkpoint:toast-positioned:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-positioned:end');
 */

/**
 * @action Animer l'apparition du toast
 * @checkpoint toast-animated, animation fade-in + shake/vibration pour signaler l'erreur
 *
 * @implementation
 *   console.log('checkpoint:toast-animated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-animated:end');
 */

/**
 * @action Logger l'affichage du toast
 * @checkpoint log-emitted, console affiche "[TOAST] error"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher les détails de l'erreur (optionnel)
 * @checkpoint error-details-shown, bouton "Détails" pour voir le message d'erreur complet
 *
 * @implementation
 *   console.log('checkpoint:error-details-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-details-shown:end');
 */

/**
 * @action Attendre 5 secondes
 * @checkpoint timeout-running, setTimeout de 5000ms actif
 *
 * @implementation
 *   console.log('checkpoint:timeout-running:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:timeout-running:end');
 */

/**
 * @action Permettre la fermeture manuelle du toast
 * @checkpoint manual-close-ready, clic sur ✗ ou swipe pour fermer avant le timeout
 *
 * @implementation
 *   console.log('checkpoint:manual-close-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:manual-close-ready:end');
 */

/**
 * @action Animer la disparition du toast
 * @checkpoint toast-fading, animation fade-out avant suppression
 *
 * @implementation
 *   console.log('checkpoint:toast-fading:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-fading:end');
 */

/**
 * @action Retirer le toast du DOM
 * @checkpoint toast-removed, élément complètement supprimé
 *
 * @implementation
 *   console.log('checkpoint:toast-removed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-removed:end');
 */
```

## Mockups de référence

- Global - s'affiche sur tous les écrans via le système de notifications
