---
id: F-004-detecter-page
type: frontend
folder: specs/_app/frontend/capture-offre/workflows/detecter-page/
description: Détecter si la page web active contient une offre d'emploi.
depends_on: [initialiser-pouchdb]
screen: capture-offre
global: false
mockup_entry: specs/_app/frontend/capture-offre/mockups/nominal.html
---

# F-004-detecter-page : Détecter une offre

## Description

Analyser la page web active pour déterminer si elle correspond à une offre d'emploi et afficher l'interface CV Rambo avec les options appropriées.

## Étapes

```javascript
/**
 * @action Cliquer sur l'icône CV Rambo pour injecter l'overlay
 * @checkpoint overlay-injected, l'overlay full viewport (100vw x 100vh) est présent dans le DOM avec z-index 999999
 *
 * @implementation
 *   console.log('checkpoint:overlay-injected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:overlay-injected:end');
 */

/**
 * @action Analyser l'URL de la page active
 * @checkpoint url-analyzed, le domaine est identifié (linkedin.com, welcometothejungle.com, etc.)
 *
 * @implementation
 *   console.log('checkpoint:url-analyzed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:url-analyzed:end');
 */

/**
 * @action Scanner le DOM pour détecter les patterns d'offre d'emploi
 * @checkpoint dom-scanned, les sélecteurs CSS spécifiques au site sont évalués
 *
 * @implementation
 *   console.log('checkpoint:dom-scanned:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:dom-scanned:end');
 */

/**
 * @action Détecter si la page contient une offre
 * @checkpoint offer-detected, retourne true si patterns trouvés (titre, entreprise, description), sinon false
 *
 * @implementation
 *   console.log('checkpoint:offer-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:offer-detected:end');
 */

/**
 * @action Afficher l'interface selon le résultat de la détection
 * @checkpoint ui-rendered, soit les boutons "Ajouter à la liste" et "Tirer direct" sont visibles, soit message "Aucune offre détectée"
 *
 * @implementation
 *   console.log('checkpoint:ui-rendered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:ui-rendered:end');
 */

/**
 * @action Activer le backdrop semi-transparent
 * @checkpoint backdrop-active, le site sous-jacent est masqué par un backdrop semi-transparent
 *
 * @implementation
 *   console.log('checkpoint:backdrop-active:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:backdrop-active:end');
 */

/**
 * @action Rendre le bouton X et la touche Échap fonctionnels pour fermer
 * @checkpoint close-ready, le clic sur X ou Échap retire l'overlay du DOM
 *
 * @implementation
 *   console.log('checkpoint:close-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:close-ready:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/capture-offre/mockups/nominal.html`
- `specs/_app/frontend/capture-offre/mockups/no-offer-detected.html`
- `specs/_app/frontend/capture-offre/mockups/loading.html`
