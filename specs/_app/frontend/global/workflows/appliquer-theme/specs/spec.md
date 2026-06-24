---
id: F-012-appliquer-theme
type: frontend
folder: specs/_app/frontend/global/workflows/appliquer-theme/
description: Appliquer le CSS rétro 80s à l'overlay injecté dans la page.
depends_on: []
screen: null
global: true
mockup_entry: null
---

# F-012-appliquer-theme : Appliquer le thème rétro

## Description

Injecter et appliquer les styles CSS du thème rétro action movie 80s (palette de couleurs, polices, effets visuels) à l'overlay CV Rambo lors de son ouverture.

## Étapes

```javascript
/**
 * @action Créer le conteneur Shadow DOM pour l'overlay
 * @checkpoint shadow-root-created, attachShadow({mode: 'open'}) exécuté
 *
 * @implementation
 *   console.log('checkpoint:shadow-root-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:shadow-root-created:end');
 */

/**
 * @action Injecter les polices Google Fonts (Bebas Neue, Roboto Condensed)
 * @checkpoint fonts-injected, balises <link> pour les polices présentes dans le Shadow DOM
 *
 * @implementation
 *   console.log('checkpoint:fonts-injected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:fonts-injected:end');
 */

/**
 * @action Définir les variables CSS du thème
 * @checkpoint css-variables-defined, :root contient --rambo-red, --camo-green, --gunmetal-gray, --gold
 *
 * @implementation
 *   console.log('checkpoint:css-variables-defined:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:css-variables-defined:end');
 */

/**
 * @action Appliquer la palette de couleurs
 * @checkpoint palette-applied, couleurs #FF0000, #2E8B57, #2F4F4F, #FFD700 définies
 *
 * @implementation
 *   console.log('checkpoint:palette-applied:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:palette-applied:end');
 */

/**
 * @action Appliquer les styles globaux (fonds, bordures, ombres néon)
 * @checkpoint global-styles-applied, effets visuels rétro visibles sur l'overlay
 *
 * @implementation
 *   console.log('checkpoint:global-styles-applied:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:global-styles-applied:end');
 */

/**
 * @action Logger le chargement du CSS
 * @checkpoint log-emitted, console affiche "[STYLE] css-loaded"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Vérifier le rendu visuel
 * @checkpoint theme-verified, l'overlay affiche le look militaire/affiche film d'action
 *
 * @implementation
 *   console.log('checkpoint:theme-verified:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:theme-verified:end');
 */
```

## Mockups de référence

- Global - appliqué à tous les écrans via CSS
