---
id: F-010-interrompre-rafale
type: frontend
folder: specs/_app/frontend/mode-rafale/workflows/interrompre-rafale/
description: Arrêter le mode rafale en cours à tout moment.
depends_on: [executer-rafale]
screen: mode-rafale
global: false
mockup_entry: specs/_app/frontend/mode-rafale/mockups/running.html
---

# F-010-interrompre-rafale : Interrompre la rafale

## Description

Permettre à l'utilisateur d'arrêter le mode rafale à tout moment pendant son exécution, avec sauvegarde de l'état et affichage d'un récapitulatif.

## Étapes

```javascript
/**
 * @action Afficher le bouton "Arrêter" pendant l'exécution
 * @checkpoint stop-button-visible, bouton "Arrêter la rafale" visible et accessible
 *
 * @implementation
 *   console.log('checkpoint:stop-button-visible:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:stop-button-visible:end');
 */

/**
 * @action Cliquer sur le bouton "Arrêter"
 * @checkpoint stop-triggered, l'utilisateur confirme l'arrêt
 *
 * @implementation
 *   console.log('checkpoint:stop-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:stop-triggered:end');
 */

/**
 * @action Demander confirmation avant d'arrêter
 * @checkpoint confirm-stop-shown, modal "Voulez-vous vraiment arrêter ?" visible
 *
 * @implementation
 *   console.log('checkpoint:confirm-stop-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:confirm-stop-shown:end');
 */

/**
 * @action Confirmer l'arrêt
 * @checkpoint stop-confirmed, l'utilisateur clique sur "Oui, arrêter"
 *
 * @implementation
 *   console.log('checkpoint:stop-confirmed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:stop-confirmed:end');
 */

/**
 * @action Annuler les timers en cours
 * @checkpoint timers-cleared, setTimeout/setInterval en cours sont clearés
 *
 * @implementation
 *   console.log('checkpoint:timers-cleared:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:timers-cleared:end');
 */

/**
 * @action Arrêter le traitement de la cible courante
 * @checkpoint current-processing-stopped, F-007 en cours est interrompu si possible
 *
 * @implementation
 *   console.log('checkpoint:current-processing-stopped:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:current-processing-stopped:end');
 */

/**
 * @action Logger l'interruption
 * @checkpoint log-interrupted-emitted, console affiche "[RAFALE] interrupted"
 *
 * @implementation
 *   console.log('checkpoint:log-interrupted-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-interrupted-emitted:end');
 */

/**
 * @action Calculer les statistiques partielles
 * @checkpoint stats-calculated, {traitées, succès, échecs, restantes} calculés
 *
 * @implementation
 *   console.log('checkpoint:stats-calculated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:stats-calculated:end');
 */

/**
 * @action Mettre à jour l'état des cibles dans le store
 * @checkpoint targets-state-updated, cibles traitées marquées, non traitées restent en "En attente"
 *
 * @implementation
 *   console.log('checkpoint:targets-state-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:targets-state-updated:end');
 */

/**
 * @action Afficher le récapitulatif d'interruption
 * @checkpoint interruption-summary-displayed, message "Rafale interrompue : X traitées, Y restantes" visible
 *
 * @implementation
 *   console.log('checkpoint:interruption-summary-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:interruption-summary-displayed:end');
 */

/**
 * @action Permettre la reprise ou le retour au Kanban
 * @checkpoint resume-options-ready, boutons "Reprendre" ou "Retour au Kanban" disponibles
 *
 * @implementation
 *   console.log('checkpoint:resume-options-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:resume-options-ready:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/mode-rafale/mockups/running.html`
- `specs/_app/frontend/mode-rafale/mockups/confirm-stop.html`
- `specs/_app/frontend/mode-rafale/mockups/interrupted.html`
- `specs/_app/frontend/mode-rafale/mockups/paused.html`
