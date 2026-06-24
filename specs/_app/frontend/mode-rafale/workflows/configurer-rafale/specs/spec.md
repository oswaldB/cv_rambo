---
id: F-010-configurer-rafale
type: frontend
folder: specs/_app/frontend/mode-rafale/workflows/configurer-rafale/
description: Configurer le délai entre tirs et le nombre de cibles pour le mode rafale.
depends_on: [selectionner-cibles]
screen: mode-rafale
global: false
mockup_entry: specs/_app/frontend/mode-rafale/mockups/nominal.html
---

# F-010-configurer-rafale : Configurer la rafale

## Description

Permettre à l'utilisateur de configurer les paramètres du mode rafale : nombre de cibles à traiter et délai minimum entre chaque soumission.

## Étapes

```javascript
/**
 * @action Ouvrir le popup de configuration du mode rafale
 * @checkpoint config-popup-opened, interface de paramétrage visible après clic sur "Lancer"
 *
 * @implementation
 *   console.log('checkpoint:config-popup-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:config-popup-opened:end');
 */

/**
 * @action Afficher le nombre de cibles sélectionnées
 * @checkpoint count-displayed, message "N cibles prêtes à être traitées" visible
 *
 * @implementation
 *   console.log('checkpoint:count-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:count-displayed:end');
 */

/**
 * @action Configurer le nombre de cibles à traiter
 * @checkpoint target-count-configured, input number avec défaut 10, min 1, max 50
 *
 * @implementation
 *   console.log('checkpoint:target-count-configured:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:target-count-configured:end');
 */

/**
 * @action Configurer le délai entre tirs
 * @checkpoint delay-configured, input number avec défaut 30 secondes, min 10s
 *
 * @implementation
 *   console.log('checkpoint:delay-configured:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:delay-configured:end');
 */

/**
 * @action Valider les paramètres
 * @checkpoint params-validated, nombre de cibles ≤ sélectionnées, délai ≥ 10s
 *
 * @implementation
 *   console.log('checkpoint:params-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:params-validated:end');
 */

/**
 * @action Afficher le récapitulatif de la configuration
 * @checkpoint summary-displayed, message "X cibles, délai de Y secondes entre chaque tir"
 *
 * @implementation
 *   console.log('checkpoint:summary-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:summary-displayed:end');
 */

/**
 * @action Activer le bouton "Confirmer et lancer"
 * @checkpoint confirm-button-enabled, le bouton est actif si params valides
 *
 * @implementation
 *   console.log('checkpoint:confirm-button-enabled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:confirm-button-enabled:end');
 */

/**
 * @action Stocker la configuration dans le store
 * @checkpoint config-stored, store.rafale.config contient {targetCount, delaySeconds}
 *
 * @implementation
 *   console.log('checkpoint:config-stored:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:config-stored:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/mode-rafale/mockups/nominal.html`
- `specs/_app/frontend/mode-rafale/mockups/config-popup.html`
- `specs/_app/frontend/mode-rafale/mockups/config-invalid.html`
