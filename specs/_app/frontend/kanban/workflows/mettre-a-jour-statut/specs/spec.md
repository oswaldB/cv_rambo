---
id: F-005-mettre-a-jour-statut
type: frontend
folder: specs/_app/frontend/kanban/workflows/mettre-a-jour-statut/
description: Persister le changement de statut d'une cible dans PouchDB après déplacement.
depends_on: [deplacer-cible]
screen: kanban
global: false
mockup_entry: specs/_app/frontend/kanban/mockups/nominal.html
---

# F-005-mettre-a-jour-statut : Mettre à jour le statut

## Description

Sauvegarder le nouveau statut d'une cible dans PouchDB après qu'elle a été déplacée vers une nouvelle colonne du Kanban.

## Étapes

```javascript
/**
 * @action Recevoir l'événement de changement de colonne
 * @checkpoint change-event-received, {cibleId, ancienStatut, nouveauStatut} sont disponibles
 *
 * @implementation
 *   console.log('checkpoint:change-event-received:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:change-event-received:end');
 */

/**
 * @action Valider le nouveau statut
 * @checkpoint statut-validated, le nouveau statut est l'une des 4 valeurs : en-attente, impact, cible-eliminee, rate
 *
 * @implementation
 *   console.log('checkpoint:statut-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:statut-validated:end');
 */

/**
 * @action Récupérer la cible depuis PouchDB par son id
 * @checkpoint cible-fetched, l'objet cible avec _id et _rev est chargé
 *
 * @implementation
 *   console.log('checkpoint:cible-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cible-fetched:end');
 */

/**
 * @action Modifier le champ statut de la cible
 * @checkpoint statut-modified, cible.statut contient la nouvelle valeur
 *
 * @implementation
 *   console.log('checkpoint:statut-modified:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:statut-modified:end');
 */

/**
 * @action Mettre à jour la cible dans PouchDB
 * @checkpoint cible-updated, retourne {ok: true, id, rev} avec _rev incrémentée
 *
 * @implementation
 *   console.log('checkpoint:cible-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cible-updated:end');
 */

/**
 * @action Logger la mise à jour en console
 * @checkpoint log-emitted, console affiche "[KANBAN] moved <id> to <nouveauStatut>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Confirmer le succès à l'interface
 * @checkpoint update-confirmed, le store Alpine est synchronisé avec PouchDB
 *
 * @implementation
 *   console.log('checkpoint:update-confirmed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:update-confirmed:end');
 */

/**
 * @action Gérer les erreurs de sauvegarde
 * @checkpoint error-handled, en cas d'échec afficher toast d'erreur et restaurer la carte à sa position d'origine
 *
 * @implementation
 *   console.log('checkpoint:error-handled:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:error-handled:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/kanban/mockups/nominal.html`
- `specs/_app/frontend/kanban/mockups/error.html`
