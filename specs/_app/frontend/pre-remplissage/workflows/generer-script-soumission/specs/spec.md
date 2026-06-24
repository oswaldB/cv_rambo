---
id: F-007-generer-script-soumission
type: frontend
folder: specs/_app/frontend/pre-remplissage/workflows/generer-script-soumission/
description: Demander à Ollama de générer le script de soumission automatique du formulaire.
depends_on: [remplir-champs]
screen: pre-remplissage
global: false
mockup_entry: specs/_app/frontend/pre-remplissage/mockups/filled-success.html
---

# F-007-generer-script-soumission : Générer le script de soumission

## Description

Capturer l'état actuel du formulaire rempli et envoyer à Ollama Cloud API pour générer un script JavaScript qui soumettra automatiquement la candidature.

## Étapes

```javascript
/**
 * @action Afficher le bouton "Soumettre automatiquement" actif
 * @checkpoint submit-button-visible, le bouton est visible et cliquable
 *
 * @implementation
 *   console.log('checkpoint:submit-button-visible:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submit-button-visible:end');
 */

/**
 * @action Cliquer sur le bouton "Soumettre automatiquement"
 * @checkpoint submission-triggered, le bouton passe en état loading
 *
 * @implementation
 *   console.log('checkpoint:submission-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submission-triggered:end');
 */

/**
 * @action Capturer l'état actuel du HTML de la page
 * @checkpoint html-re-captured, document.documentElement.outerHTML reflète l'état rempli
 *
 * @implementation
 *   console.log('checkpoint:html-re-captured:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:html-re-captured:end');
 */

/**
 * @action Construire le prompt pour la génération du script de soumission
 * @checkpoint submit-prompt-built, JSON contenant {html, instruction: "Génère un script JS pour soumettre ce formulaire"}
 *
 * @implementation
 *   console.log('checkpoint:submit-prompt-built:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submit-prompt-built:end');
 */

/**
 * @action Envoyer la requête à Ollama Cloud API
 * @checkpoint submit-request-sent, console affiche "[SUBMIT] ollama-request-sent"
 *
 * @implementation
 *   console.log('checkpoint:submit-request-sent:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submit-request-sent:end');
 */

/**
 * @action Attendre la réponse d'Ollama
 * @checkpoint awaiting-submit-script, spinner "Génération du script de soumission..." affiché
 *
 * @implementation
 *   console.log('checkpoint:awaiting-submit-script:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:awaiting-submit-script:end');
 */

/**
 * @action Recevoir la réponse avec le script de soumission
 * @checkpoint submit-script-received, JSON contient {script, submitButtonSelector, confirmationIndicators}
 *
 * @implementation
 *   console.log('checkpoint:submit-script-received:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submit-script-received:end');
 */

/**
 * @action Logger la réception du script
 * @checkpoint log-emitted, console affiche "[SUBMIT] script-generated" avec hash du script
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Valider le script de soumission
 * @checkpoint submit-script-validated, le script contient une méthode de soumission identifiable
 *
 * @implementation
 *   console.log('checkpoint:submit-script-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submit-script-validated:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/pre-remplissage/mockups/filled-success.html`
- `specs/_app/frontend/pre-remplissage/mockups/generating-submit.html`
- `specs/_app/frontend/pre-remplissage/mockups/error.html`
