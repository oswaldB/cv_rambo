---
id: F-017-importer-cv
type: frontend
folder: specs/_app/frontend/onboarding/workflows/importer-cv/
description: Uploader et extraire les données d'un CV PDF/DOCX ou saisir manuellement le profil.
depends_on: [initialiser-pouchdb]
screen: onboarding
global: false
mockup_entry: specs/_app/frontend/onboarding/mockups/step-1-profile.html
---

# F-017-importer-cv : Importer le CV

## Description

Permettre au nouveau candidat d'importer son CV (PDF/DOCX) pour extraction automatique des données ou de saisir manuellement ses informations (expériences, compétences, contact) lors de l'onboarding.

## Étapes

```javascript
/**
 * @action Détecter le premier clic sur l'icône CV Rambo
 * @checkpoint first-launch-detected, vérification que onboardingDone est false dans PouchDB
 *
 * @implementation
 *   console.log('checkpoint:first-launch-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:first-launch-detected:end');
 */

/**
 * @action Injecter l'overlay d'onboarding en full viewport
 * @checkpoint overlay-injected, 100vw x 100vh avec backdrop semi-transparent et z-index max
 *
 * @implementation
 *   console.log('checkpoint:overlay-injected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:overlay-injected:end');
 */

/**
 * @action Bloquer les interactions avec le site sous-jacent
 * @checkpoint modal-blocking-active, l'overlay capture tous les clics jusqu'à complétion
 *
 * @implementation
 *   console.log('checkpoint:modal-blocking-active:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:modal-blocking-active:end');
 */

/**
 * @action Afficher l'étape 1 : choix entre upload CV ou saisie manuelle
 * @checkpoint step-1-displayed, interface avec options "Uploader mon CV" ou "Remplir manuellement"
 *
 * @implementation
 *   console.log('checkpoint:step-1-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:step-1-displayed:end');
 */

/**
 * @action Permettre l'upload d'un fichier PDF/DOCX
 * @checkpoint file-upload-ready, input file acceptant .pdf et .docx visible
 *
 * @implementation
 *   console.log('checkpoint:file-upload-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:file-upload-ready:end');
 */

/**
 * @action Valider le fichier uploadé
 * @checkpoint file-validated, taille < 5MB et format valide vérifiés
 *
 * @implementation
 *   console.log('checkpoint:file-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:file-validated:end');
 */

/**
 * @action Extraire automatiquement les données du CV
 * @checkpoint extraction-started, spinner "Extraction en cours..." affiché
 *
 * @implementation
 *   console.log('checkpoint:extraction-started:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:extraction-started:end');
 */

/**
 * @action Permettre la saisie manuelle alternative
 * @checkpoint manual-form-ready, formulaire avec champs expériences, compétences, contact visible
 *
 * @implementation
 *   console.log('checkpoint:manual-form-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:manual-form-ready:end');
 */

/**
 * @action Logger la capture du profil
 * @checkpoint log-emitted, console affiche "[ONBOARDING] profile-captured"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Stocker le profil dans PouchDB
 * @checkpoint profile-saved, données persistantes avec _id utilisateur
 *
 * @implementation
 *   console.log('checkpoint:profile-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:profile-saved:end');
 */

/**
 * @action Passer à l'étape 2 de vérification
 * @checkpoint step-2-triggered, transition vers l'écran de vérification
 *
 * @implementation
 *   console.log('checkpoint:step-2-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:step-2-triggered:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/onboarding/mockups/step-1-profile.html`
- `specs/_app/frontend/onboarding/mockups/step-1-upload.html`
- `specs/_app/frontend/onboarding/mockups/step-1-extracting.html`
- `specs/_app/frontend/onboarding/mockups/error.html`
