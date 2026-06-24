---
id: F-007-analyser-formulaire
type: frontend
folder: specs/_app/frontend/pre-remplissage/workflows/analyser-formulaire/
description: Capturer le HTML de la page et envoyer à Ollama pour analyse du formulaire.
depends_on: [charger-profil]
screen: pre-remplissage
global: false
mockup_entry: specs/_app/frontend/pre-remplissage/mockups/nominal.html
---

# F-007-analyser-formulaire : Analyser le formulaire

## Description

Capturer le code HTML complet de la page contenant le formulaire de candidature et l'envoyer à Ollama Cloud API pour identifier tous les champs et leurs labels.

## Étapes

```javascript
/**
 * @action Afficher l'écran de pré-remplissage avec le bouton "Analyser et remplir"
 * @checkpoint screen-ready, le bouton "Analyser et remplir" est visible et actif
 *
 * @implementation
 *   console.log('checkpoint:screen-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:screen-ready:end');
 */

/**
 * @action Cliquer sur le bouton "Analyser et remplir"
 * @checkpoint analysis-triggered, le bouton passe en état loading avec spinner
 *
 * @implementation
 *   console.log('checkpoint:analysis-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:analysis-triggered:end');
 */

/**
 * @action Capturer le HTML complet de la page
 * @checkpoint html-captured, document.documentElement.outerHTML est stocké
 *
 * @implementation
 *   console.log('checkpoint:html-captured:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:html-captured:end');
 */

/**
 * @action Récupérer le profil du candidat depuis PouchDB
 * @checkpoint profile-fetched, les données {experiences, competences, projets} sont chargées
 *
 * @implementation
 *   console.log('checkpoint:profile-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:profile-fetched:end');
 */

/**
 * @action Construire le prompt pour Ollama
 * @checkpoint prompt-built, JSON contenant {html, profile} est préparé
 *
 * @implementation
 *   console.log('checkpoint:prompt-built:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:prompt-built:end');
 */

/**
 * @action Envoyer la requête à Ollama Cloud API
 * @checkpoint request-sent, console affiche "[FILL] ollama-request-sent" avec taille du HTML
 *
 * @implementation
 *   console.log('checkpoint:request-sent:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:request-sent:end');
 */

/**
 * @action Attendre la réponse d'Ollama
 * @checkpoint awaiting-response, spinner "Analyse en cours..." affiché
 *
 * @implementation
 *   console.log('checkpoint:awaiting-response:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:awaiting-response:end');
 */

/**
 * @action Recevoir la réponse d'Ollama
 * @checkpoint response-received, JSON reçu contient {script, fields: [{selector, value, confidence}]}
 *
 * @implementation
 *   console.log('checkpoint:response-received:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:response-received:end');
 */

/**
 * @action Logger la réception du script
 * @checkpoint log-emitted, console affiche "[FILL] script-received" avec nombre de champs identifiés
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/pre-remplissage/mockups/nominal.html`
- `specs/_app/frontend/pre-remplissage/mockups/analyzing.html`
- `specs/_app/frontend/pre-remplissage/mockups/error.html`
