---
id: F-002-envoyer-question
type: frontend
folder: specs/_app/frontend/mode-journaliste/workflows/envoyer-question/
description: Envoyer la réponse utilisateur et recevoir la question suivante de l'IA.
depends_on: [lancer-session]
screen: mode-journaliste
global: false
mockup_entry: specs/_app/frontend/mode-journaliste/mockups/question-displayed.html
---

# F-002-envoyer-question : Envoyer une réponse

## Description

Transmettre la réponse de l'utilisateur à l'IA, l'intégrer au profil ciblé, puis recevoir et afficher la question suivante.

## Étapes

```javascript
/**
 * @action Saisir la réponse dans le champ de texte
 * @checkpoint answer-entered, le champ contient une valeur non vide
 *
 * @implementation
 *   console.log('checkpoint:answer-entered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:answer-entered:end');
 */

/**
 * @action Cliquer sur le bouton "Envoyer"
 * @checkpoint submit-triggered, le bouton passe en état disabled avec spinner
 *
 * @implementation
 *   console.log('checkpoint:submit-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submit-triggered:end');
 */

/**
 * @action Sauvegarder la réponse dans PouchDB liée à l'expérience
 * @checkpoint answer-saved, l'échange est persisté avec référence à l'expérience ciblée
 *
 * @implementation
 *   console.log('checkpoint:answer-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:answer-saved:end');
 */

/**
 * @action Logger la sauvegarde en console
 * @checkpoint log-emitted, console affiche "[JOURNALISTE] answer-saved"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Envoyer la réponse à l'IA pour analyse
 * @checkpoint response-sent, la réponse est transmise à Ollama API
 *
 * @implementation
 *   console.log('checkpoint:response-sent:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:response-sent:end');
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
 * @action Afficher la nouvelle question à l'utilisateur
 * @checkpoint next-question-displayed, la question suivante est visible avec champ vide
 *
 * @implementation
 *   console.log('checkpoint:next-question-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:next-question-displayed:end');
 */

/**
 * @action Mettre à jour le store avec la progression
 * @checkpoint progress-updated, store.journaliste contient la question actuelle et l'historique
 *
 * @implementation
 *   console.log('checkpoint:progress-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:progress-updated:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/mode-journaliste/mockups/question-displayed.html`
- `specs/_app/frontend/mode-journaliste/mockups/saving.html`
- `specs/_app/frontend/mode-journaliste/mockups/completed.html`
- `specs/_app/frontend/mode-journaliste/mockups/error.html`
