---
id: F-001-sauver-competence
type: frontend
folder: specs/_app/frontend/arsenal-cv/workflows/sauver-competence/
description: Sauvegarder une compétence avec son niveau dans PouchDB.
depends_on: [charger-profil]
screen: arsenal-cv
global: false
mockup_entry: specs/_app/frontend/arsenal-cv/mockups/form-add-open.html
---

# F-001-sauver-competence : Sauvegarder une compétence

## Description

Persister une nouvelle compétence (libellé + niveau de maîtrise) dans PouchDB et mettre à jour l'affichage de la liste des compétences.

## Étapes

```javascript
/**
 * @action Ouvrir le formulaire d'ajout de compétence
 * @checkpoint form-opened, les champs libellé et niveau sont visibles
 *
 * @implementation
 *   console.log('checkpoint:form-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-opened:end');
 */

/**
 * @action Saisir le libellé de la compétence
 * @checkpoint label-entered, champ libellé contient une valeur non vide
 *
 * @implementation
 *   console.log('checkpoint:label-entered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:label-entered:end');
 */

/**
 * @action Sélectionner le niveau de maîtrise
 * @checkpoint level-selected, un niveau parmi Débutant/Intermédiaire/Avancé/Expert est sélectionné
 *
 * @implementation
 *   console.log('checkpoint:level-selected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:level-selected:end');
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
 * @action Insérer la compétence dans PouchDB
 * @checkpoint competence-saved, retourne l'objet avec _id généré
 *
 * @implementation
 *   console.log('checkpoint:competence-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:competence-saved:end');
 */

/**
 * @action Logger la sauvegarde en console
 * @checkpoint log-emitted, console affiche "[ARSENAL] saved competence: {libelle}"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Mettre à jour le store Alpine avec la nouvelle compétence
 * @checkpoint store-updated, store.arsenal.competences contient la nouvelle entrée
 *
 * @implementation
 *   console.log('checkpoint:store-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:store-updated:end');
 */

/**
 * @action Fermer le formulaire et rafraîchir la liste des compétences
 * @checkpoint form-closed, la section compétences affiche la nouvelle entrée
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
