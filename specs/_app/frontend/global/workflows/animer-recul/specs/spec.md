---
id: F-012-animer-recul
type: frontend
folder: specs/_app/frontend/global/workflows/animer-recul/
description: Animer le recul des boutons au clic pour effet immersif.
depends_on: [appliquer-theme]
screen: null
global: true
mockup_entry: null
---

# F-012-animer-recul : Animer le recul

## Description

Ajouter une animation "recul" (comme le recul d'une arme au tir) sur tous les boutons d'action au clic pour un feedback immersif style action movie.

## Étapes

```javascript
/**
 * @action Définir l'animation CSS de recul
 * @checkpoint recoil-keyframes-defined, @keyframes recoil avec transform: translateX/scale
 *
 * @implementation
 *   console.log('checkpoint:recoil-keyframes-defined:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:recoil-keyframes-defined:end');
 */

/**
 * @action Sélectionner tous les boutons d'action
 * @checkpoint buttons-selected, querySelectorAll sur les boutons avec classe .action-btn
 *
 * @implementation
 *   console.log('checkpoint:buttons-selected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:buttons-selected:end');
 */

/**
 * @action Ajouter l'écouteur d'événement click sur chaque bouton
 * @checkpoint listeners-added, addEventListener('click') sur chaque bouton
 *
 * @implementation
 *   console.log('checkpoint:listeners-added:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:listeners-added:end');
 */

/**
 * @action Détecter le clic sur un bouton d'action
 * @checkpoint click-detected, événement click déclenché sur un bouton
 *
 * @implementation
 *   console.log('checkpoint:click-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:click-detected:end');
 */

/**
 * @action Appliquer l'animation de recul au bouton cliqué
 * @checkpoint recoil-applied, classe .recoil-animation ajoutée au bouton
 *
 * @implementation
 *   console.log('checkpoint:recoil-applied:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:recoil-applied:end');
 */

/**
 * @action Jouer l'effet sonore de "coup de feu" (optionnel)
 * @checkpoint sound-played, audio.play() déclenché si sound-effects activé
 *
 * @implementation
 *   console.log('checkpoint:sound-played:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:sound-played:end');
 */

/**
 * @action Retirer la classe d'animation après la fin
 * @checkpoint animation-cleared, classe .recoil-animation retirée après 300ms
 *
 * @implementation
 *   console.log('checkpoint:animation-cleared:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:animation-cleared:end');
 */

/**
 * @action Continuer l'action du bouton normalement
 * @checkpoint action-continued, la fonction originale du bouton s'exécute
 *
 * @implementation
 *   console.log('checkpoint:action-continued:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:action-continued:end');
 */
```

## Mockups de référence

- Global - appliqué à tous les boutons d'action sur tous les écrans
