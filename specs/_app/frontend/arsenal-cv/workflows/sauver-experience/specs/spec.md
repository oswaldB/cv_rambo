---
id: F-001-sauver-experience
type: frontend
folder: specs/_app/frontend/arsenal-cv/workflows/sauver-experience/
description: Sauvegarder une expérience professionnelle dans PouchDB.
depends_on: [charger-profil]
screen: arsenal-cv
global: false
mockup_entry: specs/_app/frontend/arsenal-cv/mockups/form-add-open.html
---

# F-001-sauver-experience : Sauvegarder une expérience

## Description

Persister une nouvelle expérience professionnelle (titre, entreprise, dates, description) dans PouchDB et mettre à jour l'affichage.

## Étapes

```javascript
/**
 * @action Ouvrir le formulaire d'ajout d'expérience
 * @checkpoint form-opened, les champs titre, entreprise, dates, description sont visibles
 *
 * @implementation
 *   console.log('checkpoint:form-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-opened:end');
 */

/**
 * @action Saisir les données dans le formulaire
 * @checkpoint form-filled, tous les champs obligatoires ont une valeur non vide
 *
 * @implementation
 *   console.log('checkpoint:form-filled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-filled:end');
 */

/**
 * @action Cliquer sur le bouton "Sauvegarder"
 * @checkpoint save-triggered, le bouton passe en état disabled avec spinner
 *
 * @implementation
 *   console.log('checkpoint:save-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:save-triggered:end');
 */

/**
 * @action Valider les données du formulaire
 * @checkpoint validation-passed, pas d'erreur affichée sous les champs
 *
 * @implementation
 *   console.log('checkpoint:validation-passed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:validation-passed:end');
 */

/**
 * @action Insérer l'expérience dans PouchDB
 * @checkpoint experience-saved, retourne l'objet avec _id généré
 *
 * @implementation
 *   console.log('checkpoint:experience-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:experience-saved:end');
 */

/**
 * @action Logger la sauvegarde en console
 * @checkpoint log-emitted, console affiche "[ARSENAL] saved experience: {titre}"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Mettre à jour le store Alpine avec la nouvelle expérience
 * @checkpoint store-updated, store.arsenal.experiences contient la nouvelle entrée
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Fermer le formulaire et rafraîchir la liste
 * @checkpoint form-closed, la liste affiche la nouvelle expérience en première position
 *
 * @implementation
 *   console.log('checkpoint:form-closed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-closed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/arsenal-cv/mockups/form-add-open.html`
- `specs/_app/frontend/arsenal-cv/mockups/nominal.html`
- `specs/_app/frontend/arsenal-cv/mockups/error.html`
