---
id: F-010-executer-rafale
type: frontend
folder: specs/_app/frontend/mode-rafale/workflows/executer-rafale/
description: Lancer la séquence automatique de candidatures aux cibles sélectionnées.
depends_on: [configurer-rafale, F-007]
screen: mode-rafale
global: false
mockup_entry: specs/_app/frontend/mode-rafale/mockups/running.html
---

# F-010-executer-rafale : Exécuter la rafale

## Description

Lancer la séquence automatique de pré-remplissage et soumission (F-007) pour chaque cible sélectionnée, avec gestion du délai entre chaque tir et suivi de la progression.

## Étapes

```javascript
/**
 * @action Confirmer le lancement du mode rafale
 * @checkpoint rafale-started, l'utilisateur clique sur "Confirmer et lancer"
 *
 * @implementation
 *   console.log('checkpoint:rafale-started:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:rafale-started:end');
 */

/**
 * @action Logger le démarrage
 * @checkpoint log-started-emitted, console affiche "[RAFALE] started" avec nombre de cibles et délai
 *
 * @implementation
 *   console.log('checkpoint:log-started-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-started-emitted:end');
 */

/**
 * @action Afficher l'interface du mode rafale en cours
 * @checkpoint running-displayed, compteur tick/total visible, carte en cours mise en évidence
 *
 * @implementation
 *   console.log('checkpoint:running-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:running-displayed:end');
 */

/**
 * @action Traiter la cible courante
 * @checkpoint processing-log-emitted, console affiche "[RAFALE] processing <targetId>"
 *
 * @implementation
 *   console.log('checkpoint:processing-log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:processing-log-emitted:end');
 */

/**
 * @action Lancer F-007 sur la cible courante
 * @checkpoint f007-triggered, pré-remplissage + soumission automatique déclenchés
 *
 * @implementation
 *   console.log('checkpoint:f007-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:f007-triggered:end');
 */

/**
 * @action Attendre le résultat du traitement
 * @checkpoint awaiting-result, délai configuré respecté avant prochaine cible
 *
 * @implementation
 *   console.log('checkpoint:awaiting-result:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:awaiting-result:end');
 */

/**
 * @action Logger le résultat du traitement
 * @checkpoint result-logged, console affiche "[RAFALE] success <targetId>" ou "[RAFALE] failed <targetId>"
 *
 * @implementation
 *   console.log('checkpoint:result-logged:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:result-logged:end');
 */

/**
 * @action Déplacer la cible vers "Impact" si succès
 * @checkpoint target-moved, la cible passe en colonne "Impact" du Kanban
 *
 * @implementation
 *   console.log('checkpoint:target-moved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:target-moved:end');
 */

/**
 * @action Logger la progression
 * @checkpoint tick-logged, console affiche "[RAFALE] tick <n>/<total>"
 *
 * @implementation
 *   console.log('checkpoint:tick-logged:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tick-logged:end');
 */

/**
 * @action Passer à la cible suivante après le délai configuré
 * @checkpoint next-target, timer setTimeout de délai secondes avant prochaine itération
 *
 * @implementation
 *   console.log('checkpoint:next-target:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:next-target:end');
 */

/**
 * @action Terminer la rafale quand toutes les cibles sont traitées
 * @checkpoint rafale-done, console affiche "[RAFALE] done" avec stats succès/échec
 *
 * @implementation
 *   console.log('checkpoint:rafale-done:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:rafale-done:end');
 */

/**
 * @action Afficher le récapitulatif final
 * @checkpoint summary-displayed, message "Rafale terminée : X succès, Y échecs" visible
 *
 * @implementation
 *   console.log('checkpoint:summary-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:summary-displayed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/mode-rafale/mockups/running.html`
- `specs/_app/frontend/mode-rafale/mockups/target-success.html`
- `specs/_app/frontend/mode-rafale/mockups/target-failed.html`
- `specs/_app/frontend/mode-rafale/mockups/completed.html`
- `specs/_app/frontend/mode-rafale/mockups/error.html`
