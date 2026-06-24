---
id: F-010-selectionner-cibles
type: frontend
folder: specs/_app/frontend/mode-rafale/workflows/selectionner-cibles/
description: Sélectionner et désélectionner des cibles dans le Kanban pour le mode rafale.
depends_on: [charger-cibles]
screen: mode-rafale
global: false
mockup_entry: specs/_app/frontend/mode-rafale/mockups/nominal.html
---

# F-010-selectionner-cibles : Sélectionner les cibles

## Description

Permettre à l'utilisateur de sélectionner/désélectionner des cibles du Kanban (colonne "En attente" uniquement) pour constituer une liste de candidatures à traiter en mode rafale.

## Étapes

```javascript
/**
 * @action Afficher les cartes du Kanban avec checkbox de sélection
 * @checkpoint kanban-displayed, chaque carte de la colonne "En attente" montre une checkbox "Sélectionner pour rafale"
 *
 * @implementation
 *   console.log('checkpoint:kanban-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:kanban-displayed:end');
 */

/**
 * @action Cocher une cible pour le mode rafale
 * @checkpoint target-selected, la checkbox est cochée et la carte a un style visuel de sélection
 *
 * @implementation
 *   console.log('checkpoint:target-selected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:target-selected:end');
 */

/**
 * @action Mettre à jour le compteur de cibles sélectionnées
 * @checkpoint counter-updated, affiche "N cibles sélectionnées"
 *
 * @implementation
 *   console.log('checkpoint:counter-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:counter-updated:end');
 */

/**
 * @action Activer le bouton "Lancer le mode rafale"
 * @checkpoint launch-button-enabled, le bouton devient actif dès qu'au moins une cible est sélectionnée
 *
 * @implementation
 *   console.log('checkpoint:launch-button-enabled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:launch-button-enabled:end');
 */

/**
 * @action Permettre la désélection d'une cible
 * @checkpoint target-deselected, la checkbox se décoche et la carte perd son style de sélection
 *
 * @implementation
 *   console.log('checkpoint:target-deselected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:target-deselected:end');
 */

/**
 * @action Permettre la sélection/désélection de toutes les cibles visibles
 * @checkpoint select-all-ready, bouton "Tout sélectionner" / "Tout désélectionner" disponible
 *
 * @implementation
 *   console.log('checkpoint:select-all-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:select-all-ready:end');
 */

/**
 * @action Stocker les cibles sélectionnées dans le store
 * @checkpoint selected-stored, store.rafale.selectedTargets contient les IDs des cibles cochées
 *
 * @implementation
 *   console.log('checkpoint:selected-stored:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:selected-stored:end');
 */

/**
 * @action Afficher le bouton avec le nombre de cibles
 * @checkpoint button-with-count, texte "Lancer le mode rafale (N cibles)" visible
 *
 * @implementation
 *   console.log('checkpoint:button-with-count:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:button-with-count:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/mode-rafale/mockups/nominal.html`
- `specs/_app/frontend/mode-rafale/mockups/cibles-selected.html`
- `specs/_app/frontend/mode-rafale/mockups/empty.html`
