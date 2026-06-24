---
id: F-002-lancer-session
type: frontend
folder: specs/_app/frontend/mode-journaliste/workflows/lancer-session/
description: Démarrer une session de questions IA pour enrichir le profil CV.
depends_on: [charger-profil, initialiser-pouchdb]
screen: mode-journaliste
global: false
mockup_entry: specs/_app/frontend/mode-journaliste/mockups/nominal.html
---

# F-002-lancer-session : Lancer une session journaliste

## Description

Initier une session de questions/réponses avec l'IA (Ollama Cloud / Minimax) pour enrichir les descriptions des expériences professionnelles du profil.

## Étapes

```javascript
/**
 * @action Afficher l'écran Mode Journaliste avec le bouton "Lancer"
 * @checkpoint screen-ready, le bouton "Mode Journaliste" est visible et actif
 *
 * @implementation
 *   console.log('checkpoint:screen-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:screen-ready:end');
 */

/**
 * @action Cliquer sur le bouton "Lancer la session"
 * @checkpoint launch-triggered, le bouton passe en état loading avec spinner
 *
 * @implementation
 *   console.log('checkpoint:launch-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:launch-triggered:end');
 */

/**
 * @action Vérifier la connexion à Ollama API
 * @checkpoint connection-checked, la connexion est établie ou une erreur est détectée
 *
 * @implementation
 *   console.log('checkpoint:connection-checked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:connection-checked:end');
 */

/**
 * @action Envoyer le contexte du profil à l'IA
 * @checkpoint context-sent, les expériences existantes sont transmises à Ollama
 *
 * @implementation
 *   console.log('checkpoint:context-sent:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:context-sent:end');
 */

/**
 * @action Recevoir la première question de l'IA
 * @checkpoint question-received, une question ciblée sur une expérience est retournée
 *
 * @implementation
 *   console.log('checkpoint:question-received:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:question-received:end');
 */

/**
 * @action Logger l'envoi de la question en console
 * @checkpoint log-emitted, console affiche "[JOURNALISTE] question-asked"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher la question à l'utilisateur
 * @checkpoint question-displayed, la question est visible avec champ de réponse actif
 *
 * @implementation
 *   console.log('checkpoint:question-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:question-displayed:end');
 */

/**
 * @action Stocker l'état de la session dans le store
 * @checkpoint session-stored, store.journaliste contient {active: true, currentQuestion, targetExperience}
 *
 * @implementation
 *   console.log('checkpoint:session-stored:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:session-stored:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/mode-journaliste/mockups/nominal.html`
- `specs/_app/frontend/mode-journaliste/mockups/loading.html`
- `specs/_app/frontend/mode-journaliste/mockups/question-displayed.html`
- `specs/_app/frontend/mode-journaliste/mockups/error.html`
