---
id: F-012-afficher-loader-munitions
type: frontend
folder: specs/_app/frontend/global/workflows/afficher-loader-munitions/
description: Afficher le loader en forme de jauge de munitions pendant les chargements.
depends_on: [appliquer-theme]
screen: null
global: true
mockup_entry: null
---

# F-012-afficher-loader-munitions : Afficher le loader munitions

## Description

Afficher un loader original en forme de jauge de munitions (chargeur de fusil) pendant les opérations de chargement (analyse Ollama, génération, etc.).

## Étapes

```javascript
/**
 * @action Créer le composant loader de munitions
 * @checkpoint loader-component-created, élément DOM représentant un chargeur avec N balles
 *
 * @implementation
 *   console.log('checkpoint:loader-component-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loader-component-created:end');
 */

/**
 * @action Styliser le loader avec le thème rétro
 * @checkpoint loader-styled, couleurs gunmetal-gray et gold appliquées
 *
 * @implementation
 *   console.log('checkpoint:loader-styled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loader-styled:end');
 */

/**
 * @action Détecter le début d'une opération de chargement
 * @checkpoint loading-started, événement global "loading:start" émis
 *
 * @implementation
 *   console.log('checkpoint:loading-started:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loading-started:end');
 */

/**
 * @action Afficher le loader avec animation de "chargement des munitions"
 * @checkpoint loader-displayed, le chargeur apparaît avec animation d'apparition
 *
 * @implementation
 *   console.log('checkpoint:loader-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loader-displayed:end');
 */

/**
 * @action Animer la progression des munitions
 * @checkpoint bullets-animated, les balles se remplissent progressivement selon la progression
 *
 * @implementation
 *   console.log('checkpoint:bullets-animated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:bullets-animated:end');
 */

/**
 * @action Mettre à jour le texte de progression
 * @checkpoint text-updated, message "Chargement... X%" visible avec style militaire
 *
 * @implementation
 *   console.log('checkpoint:text-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:text-updated:end');
 */

/**
 * @action Détecter la fin du chargement
 * @checkpoint loading-ended, événement "loading:end" reçu ou opération terminée
 *
 * @implementation
 *   console.log('checkpoint:loading-ended:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loading-ended:end');
 */

/**
 * @action Animer la disparition du loader
 * @checkpoint loader-hidden, fade out avec animation de "coup de feu" final
 *
 * @implementation
 *   console.log('checkpoint:loader-hidden:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loader-hidden:end');
 */

/**
 * @action Retirer le loader du DOM
 * @checkpoint loader-removed, élément complètement supprimé
 *
 * @implementation
 *   console.log('checkpoint:loader-removed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loader-removed:end');
 */
```

## Mockups de référence

- Global - affiché pendant les chargements sur tous les écrans
