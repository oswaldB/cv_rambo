---
id: F-017-parcours-tutoriel
type: frontend
folder: specs/_app/frontend/onboarding/workflows/parcours-tutoriel/
description: Démonstration guidée de capture d'offre, Kanban et pré-remplissage.
depends_on: [verifier-extractions]
screen: onboarding
global: false
mockup_entry: specs/_app/frontend/onboarding/mockups/step-3-demo.html
---

# F-017-parcours-tutoriel : Parcours tutoriel

## Description

Guider l'utilisateur à travers une démonstration interactive des fonctionnalités principales : capture d'une première offre, organisation du Kanban, et pré-remplissage d'un formulaire.

## Étapes

```javascript
/**
 * @action Afficher l'étape 3 du tutoriel
 * @checkpoint step-3-displayed, interface guidée avec overlay explicatif visible
 *
 * @implementation
 *   console.log('checkpoint:step-3-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:step-3-displayed:end');
 */

/**
 * @action Logger l'affichage de l'étape
 * @checkpoint log-step-emitted, console affiche "[ONBOARDING] step-3"
 *
 * @implementation
 *   console.log('checkpoint:log-step-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-step-emitted:end');
 */

/**
 * @action Présenter la démo de capture d'offre
 * @checkpoint capture-demo-shown, animation ou simulation de "Ajouter à la liste"
 *
 * @implementation
 *   console.log('checkpoint:capture-demo-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:capture-demo-shown:end');
 */

/**
 * @action Expliquer le bouton "Tirer direct"
 * @checkpoint tir-direct-explained, tooltip ou highlight sur l'option de postulation rapide
 *
 * @implementation
 *   console.log('checkpoint:tir-direct-explained:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tir-direct-explained:end');
 */

/**
 * @action Présenter le Kanban et ses 4 colonnes
 * @checkpoint kanban-demo-shown, visuel des colonnes avec explications des statuts
 *
 * @implementation
 *   console.log('checkpoint:kanban-demo-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:kanban-demo-shown:end');
 */

/**
 * @action Démontrer le glisser-déposer de cartes
 * @checkpoint drag-drop-demo-shown, animation de déplacement d'une carte
 *
 * @implementation
 *   console.log('checkpoint:drag-drop-demo-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:drag-drop-demo-shown:end');
 */

/**
 * @action Présenter le pré-remplissage automatique
 * @checkpoint prefilling-demo-shown, simulation de "Analyser et remplir"
 *
 * @implementation
 *   console.log('checkpoint:prefilling-demo-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:prefilling-demo-shown:end');
 */

/**
 * @action Permettre de passer à l'étape suivante
 * @checkpoint next-available, bouton "Suivant" actif ("Passer" désactivé à cette étape)
 *
 * @implementation
 *   console.log('checkpoint:next-available:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:next-available:end');
 */

/**
 * @action Permettre de revoir une étape du tutoriel
 * @checkpoint back-available, bouton "Précédent" pour revenir en arrière
 *
 * @implementation
 *   console.log('checkpoint:back-available:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:back-available:end');
 */

/**
 * @action Passer à l'étape finale de complétion
 * @checkpoint completion-triggered, transition vers l'écran de fin
 *
 * @implementation
 *   console.log('checkpoint:completion-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:completion-triggered:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/onboarding/mockups/step-3-demo.html`
- `specs/_app/frontend/onboarding/mockups/demo-capture.html`
- `specs/_app/frontend/onboarding/mockups/demo-kanban.html`
- `specs/_app/frontend/onboarding/mockups/demo-prefill.html`
