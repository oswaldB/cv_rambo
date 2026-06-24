---
id: F-004-extraire-donnees
type: frontend
folder: specs/_app/frontend/capture-offre/workflows/extraire-donnees/
description: Extraire automatiquement les informations clés de l'offre d'emploi.
depends_on: [detecter-page]
screen: capture-offre
global: false
mockup_entry: specs/_app/frontend/capture-offre/mockups/loading.html
---

# F-004-extraire-donnees : Extraire les données

## Description

Extraire automatiquement le titre, l'entreprise, l'URL, la description (tronquée à 500 caractères), le domaine et la date de capture depuis la page active.

## Étapes

```javascript
/**
 * @action Lancer l'extraction depuis le DOM de la page
 * @checkpoint extraction-started, le spinner d'extraction est affiché
 *
 * @implementation
 *   console.log('checkpoint:extraction-started:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:extraction-started:end');
 */

/**
 * @action Extraire le titre de l'offre depuis le DOM
 * @checkpoint title-extracted, le titre est récupéré via sélecteur spécifique au site
 *
 * @implementation
 *   console.log('checkpoint:title-extracted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:title-extracted:end');
 */

/**
 * @action Extraire le nom de l'entreprise depuis le DOM
 * @checkpoint company-extracted, l'entreprise est récupérée via sélecteur spécifique
 *
 * @implementation
 *   console.log('checkpoint:company-extracted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:company-extracted:end');
 */

/**
 * @action Capturer l'URL complète de la page
 * @checkpoint url-captured, window.location.href est stocké
 *
 * @implementation
 *   console.log('checkpoint:url-captured:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:url-captured:end');
 */

/**
 * @action Extraire la description de l'offre
 * @checkpoint description-extracted, la description est récupérée et tronquée à 500 caractères maximum
 *
 * @implementation
 *   console.log('checkpoint:description-extracted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:description-extracted:end');
 */

/**
 * @action Enregistrer le domaine comme métadonnée
 * @checkpoint domain-stored, le domaine (linkedin.com, etc.) est extrait de l'URL
 *
 * @implementation
 *   console.log('checkpoint:domain-stored:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:domain-stored:end');
 */

/**
 * @action Enregistrer la date de capture
 * @checkpoint date-stored, la date/heure ISO actuelle est enregistrée
 *
 * @implementation
 *   console.log('checkpoint:date-stored:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:date-stored:end');
 */

/**
 * @action Logger l'extraction réussie en console
 * @checkpoint log-success-emitted, console affiche "[CAPTURE] extract-success <url>"
 *
 * @implementation
 *   console.log('checkpoint:log-success-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-success-emitted:end');
 */

/**
 * @action Afficher les données extraites dans un popup de confirmation/édition
 * @checkpoint edit-popup-opened, les champs titre, entreprise, URL, description sont pré-remplis et éditables
 *
 * @implementation
 *   console.log('checkpoint:edit-popup-opened:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:edit-popup-opened:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/capture-offre/mockups/loading.html`
- `specs/_app/frontend/capture-offre/mockups/edit-confirm.html`
- `specs/_app/frontend/capture-offre/mockups/error.html`
