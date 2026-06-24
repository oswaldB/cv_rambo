---
id: F-018-afficher-toast-succes
type: frontend
folder: specs/_app/frontend/global/workflows/afficher-toast-succes/
description: Afficher un toast de confirmation après une action réussie.
depends_on: [appliquer-theme]
screen: null
global: true
mockup_entry: null
---

# F-018-afficher-toast-succes : Afficher toast de succès

## Description

Afficher une notification toast de succès (fond vert, icône ✓, 3 secondes) dans l'overlay injecté pour confirmer qu'une action a réussi.

## Étapes

```javascript
/**
 * @action Détecter un événement de succès
 * @checkpoint success-event-detected, événement global "toast:success" émis avec {message, title}
 *
 * @implementation
 *   console.log('checkpoint:success-event-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:success-event-detected:end');
 */

/**
 * @action Créer l'élément toast dans le DOM
 * @checkpoint toast-created, élément div avec classes .toast et .toast--success créé
 *
 * @implementation
 *   console.log('checkpoint:toast-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-created:end');
 */

/**
 * @action Appliquer le style rétro au toast
 * @checkpoint toast-styled, fond vert, icône ✓, typographie Bebas Neue appliqués
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
 * @checkpoint toast-animated, animation fade-in + slide depuis le bord
 *
 * @implementation
 *   console.log('checkpoint:toast-animated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:toast-animated:end');
 */

/**
 * @action Logger l'affichage du toast
 * @checkpoint log-emitted, console affiche "[TOAST] success"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Attendre 3 secondes
 * @checkpoint timeout-running, setTimeout de 3000ms actif
 *
 * @implementation
 *   console.log('checkpoint:timeout-running:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:timeout-running:end');
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
