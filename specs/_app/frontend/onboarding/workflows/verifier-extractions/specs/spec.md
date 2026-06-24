---
id: F-017-verifier-extractions
type: frontend
folder: specs/_app/frontend/onboarding/workflows/verifier-extractions/
description: Vérifier et corriger les données extraites du CV ou saisies manuellement.
depends_on: [importer-cv]
screen: onboarding
global: false
mockup_entry: specs/_app/frontend/onboarding/mockups/step-2-verify.html
---

# F-017-verifier-extractions : Vérifier les extractions

## Description

Permettre au candidat de vérifier et corriger les informations extraites de son CV ou saisies manuellement avant de finaliser son profil.

## Étapes

```javascript
/**
 * @action Afficher l'étape 2 avec les données extraites
 * @checkpoint step-2-displayed, les données {nom, email, expériences, compétences} sont pré-remplies
 *
 * @implementation
 *   console.log('checkpoint:step-2-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:step-2-displayed:end');
 */

/**
 * @action Logger l'affichage de l'étape
 * @checkpoint log-step-emitted, console affiche "[ONBOARDING] step-2"
 *
 * @implementation
 *   console.log('checkpoint:log-step-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-step-emitted:end');
 */

/**
 * @action Permettre l'édition du nom
 * @checkpoint name-editable, champ nom modifiable avec validation
 *
 * @implementation
 *   console.log('checkpoint:name-editable:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:name-editable:end');
 */

/**
 * @action Permettre l'édition de l'email
 * @checkpoint email-editable, champ email modifiable avec validation format
 *
 * @implementation
 *   console.log('checkpoint:email-editable:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:email-editable:end');
 */

/**
 * @action Permettre la correction des expériences extraites
 * @checkpoint experiences-editable, liste des expériences avec boutons éditer/supprimer/ajouter
 *
 * @implementation
 *   console.log('checkpoint:experiences-editable:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:experiences-editable:end');
 */

/**
 * @action Permettre la correction des compétences extraites
 * @checkpoint competences-editable, liste des compétences avec gestion des niveaux
 *
 * @implementation
 *   console.log('checkpoint:competences-editable:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:competences-editable:end');
 */

/**
 * @action Valider les modifications
 * @checkpoint validation-passed, au moins nom + email + une expérience ou compétence présents
 *
 * @implementation
 *   console.log('checkpoint:validation-passed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:validation-passed:end');
 */

/**
 * @action Sauvegarder le profil corrigé dans PouchDB
 * @checkpoint profile-updated, les corrections sont persistées avec _rev incrémentée
 *
 * @implementation
 *   console.log('checkpoint:profile-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:profile-updated:end');
 */

/**
 * @action Activer le bouton "Suivant"
 * @checkpoint next-button-enabled, bouton actif si données valides présentes
 *
 * @implementation
 *   console.log('checkpoint:next-button-enabled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:next-button-enabled:end');
 */

/**
 * @action Passer à l'étape 3 du tutoriel
 * @checkpoint step-3-triggered, transition vers le parcours guidé
 *
 * @implementation
 *   console.log('checkpoint:step-3-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:step-3-triggered:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/onboarding/mockups/step-2-verify.html`
- `specs/_app/frontend/onboarding/mockups/step-2-editing.html`
- `specs/_app/frontend/onboarding/mockups/error.html`
