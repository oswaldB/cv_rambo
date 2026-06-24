---
id: F-002-ignorer-question
type: frontend
folder: specs/_app/frontend/mode-journaliste/workflows/ignorer-question/
description: Passer à la question suivante sans répondre à la question actuelle.
depends_on: [lancer-session]
screen: mode-journaliste
global: false
mockup_entry: specs/_app/frontend/mode-journaliste/mockups/question-displayed.html
---

# F-002-ignorer-question : Ignorer une question

## Description

Permettre à l'utilisateur de refuser une question et passer directement à la suivante sans sauvegarder de réponse, en gardant le contrôle de l'enrichissement.

## Étapes

```javascript
/**
 * @action Afficher la question avec le bouton "Passer"
 * @checkpoint skip-button-visible, le bouton "Passer" est présent à côté du bouton "Envoyer"
 *
 * @implementation
 *   console.log('checkpoint:skip-button-visible:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:skip-button-visible:end');
 */

/**
 * @action Cliquer sur le bouton "Passer"
 * @checkpoint skip-triggered, le bouton passe en état disabled
 *
 * @implementation
 *   console.log('checkpoint:skip-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:skip-triggered:end');
 */

/**
 * @action Logger l'action d'ignorer en console
 * @checkpoint log-emitted, console affiche "[JOURNALISTE] question-skipped"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Marquer la question comme ignorée dans le store
 * @checkpoint question-marked-skipped, store contient l'historique avec statut "skipped"
 *
 * @implementation
 *   console.log('checkpoint:question-marked-skipped:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:question-marked-skipped:end');
 */

/**
 * @action Envoyer la demande de question suivante à l'IA
 * @checkpoint skip-request-sent, signal de skip transmis à Ollama API
 *
 * @implementation
 *   console.log('checkpoint:skip-request-sent:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:skip-request-sent:end');
 */

/**
 * @action Recevoir la question suivante de l'IA
 * @checkpoint next-question-received, une nouvelle question est retournée ou signal de fin
 *
 * @implementation
 *   console.log('checkpoint:next-question-received:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:next-question-received:end');
 */

/**
 * @action Logger l'envoi de la nouvelle question en console
 * @checkpoint log-question-emitted, console affiche "[JOURNALISTE] question-asked"
 *
 * @implementation
 *   console.log('checkpoint:log-question-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-question-emitted:end');
 */

/**
 * @action Afficher la nouvelle question avec champ vide
 * @checkpoint next-question-displayed, la question suivante est visible et prête
 *
 * @implementation
 *   console.log('checkpoint:next-question-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:next-question-displayed:end');
 */

/**
 * @action Mettre à jour le compteur de questions passées
 * @checkpoint skip-counter-updated, store.journaliste.skippedCount est incrémenté
 *
 * @implementation
 *   console.log('checkpoint:skip-counter-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:skip-counter-updated:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/mode-journaliste/mockups/question-displayed.html`
- `specs/_app/frontend/mode-journaliste/mockups/skipped.html`
- `specs/_app/frontend/mode-journaliste/mockups/completed.html`
- `specs/_app/frontend/mode-journaliste/mockups/error.html`
