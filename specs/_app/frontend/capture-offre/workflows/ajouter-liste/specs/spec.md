---
id: F-004-ajouter-liste
type: frontend
folder: specs/_app/frontend/capture-offre/workflows/ajouter-liste/
description: Créer une cible dans le Kanban colonne "En attente" depuis l'offre capturée.
depends_on: [verifier-doublon]
screen: capture-offre
global: false
mockup_entry: specs/_app/frontend/capture-offre/mockups/nominal.html
---

# F-004-ajouter-liste : Ajouter à la liste

## Description

Créer une nouvelle cible dans le Kanban avec statut "En attente" à partir des données de l'offre capturée et confirmer l'ajout à l'utilisateur.

## Étapes

```javascript
/**
 * @action Cliquer sur le bouton "Ajouter à la liste"
 * @checkpoint add-triggered, le bouton passe en état loading
 *
 * @implementation
 *   console.log('checkpoint:add-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:add-triggered:end');
 */

/**
 * @action Valider ou modifier les données dans le popup de confirmation
 * @checkpoint data-validated, les champs titre, entreprise, URL, description sont confirmés
 *
 * @implementation
 *   console.log('checkpoint:data-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:data-validated:end');
 */

/**
 * @action Créer l'objet cible avec les données
 * @checkpoint target-created, l'objet contient {titre, entreprise, url, description, domaine, dateCapture, statut: "En attente"}
 *
 * @implementation
 *   console.log('checkpoint:target-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:target-created:end');
 */

/**
 * @action Sauvegarder la cible dans PouchDB
 * @checkpoint target-saved, la cible est persistée avec un _id généré
 *
 * @implementation
 *   console.log('checkpoint:target-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:target-saved:end');
 */

/**
 * @action Logger l'ajout en console
 * @checkpoint log-emitted, console affiche "[CAPTURE] added-to-list <url>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher la confirmation de succès
 * @checkpoint success-shown, message "Offre ajoutée à la liste" visible avec option "Voir le Kanban"
 *
 * @implementation
 *   console.log('checkpoint:success-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:success-shown:end');
 */

/**
 * @action Fermer l'overlay de capture
 * @checkpoint overlay-closed, l'overlay est retiré du DOM, l'utilisateur revient sur la page d'offre
 *
 * @implementation
 *   console.log('checkpoint:overlay-closed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:overlay-closed:end');
 */

/**
 * @action Proposer la redirection vers le Kanban (optionnel)
 * @checkpoint kanban-link-ready, le bouton "Voir le Kanban" ouvre l'écran kanban avec la nouvelle cible visible
 *
 * @implementation
 *   console.log('checkpoint:kanban-link-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:kanban-link-ready:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/capture-offre/mockups/nominal.html`
- `specs/_app/frontend/capture-offre/mockups/added-success.html`
- `specs/_app/frontend/capture-offre/mockups/error.html`
