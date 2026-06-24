---
id: F-006-valider-drop
type: frontend
folder: specs/_app/frontend/kanban/workflows/valider-drop/
description: Valider ou refuser le drop d'une carte selon les restrictions de colonne.
depends_on: [deplacer-cible]
screen: kanban
global: false
mockup_entry: specs/_app/frontend/kanban/mockups/nominal.html
---

# F-006-valider-drop : Valider le drop

## Description

Empêcher le déplacement de cartes vers certaines colonnes restreintes : la première colonne ("En attente") et les colonnes de postulation sont en "drop interdit".

## Étapes

```javascript
/**
 * @action Définir les colonnes restreintes
 * @checkpoint restricted-columns-defined, première colonne et colonnes finales identifiées comme non-droppables
 *
 * @implementation
 *   console.log('checkpoint:restricted-columns-defined:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:restricted-columns-defined:end');
 */

/**
 * @action Survoler une colonne pendant le drag
 * @checkpoint column-hover-detected, l'événement dragover se déclenche sur la colonne cible
 *
 * @implementation
 *   console.log('checkpoint:column-hover-detected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:column-hover-detected:end');
 */

/**
 * @action Vérifier si la colonne cible est restreinte
 * @checkpoint restriction-checked, retourne true si la colonne accepte les drops, false sinon
 *
 * @implementation
 *   console.log('checkpoint:restriction-checked:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:restriction-checked:end');
 */

/**
 * @action Permettre le drop sur colonne autorisée
 * @checkpoint drop-allowed, effet visuel positif (bordure verte, highlight)
 *
 * @implementation
 *   console.log('checkpoint:drop-allowed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:drop-allowed:end');
 */

/**
 * @action Refuser le drop sur colonne restreinte
 * @checkpoint drop-denied, effet visuel négatif (bordure rouge, curseur not-allowed)
 *
 * @implementation
 *   console.log('checkpoint:drop-denied:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:drop-denied:end');
 */

/**
 * @action Empêcher le dépôt sur colonne restreinte
 * @checkpoint drop-prevented, preventDefault() sur l'événement drop si colonne interdite
 *
 * @implementation
 *   console.log('checkpoint:drop-prevented:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:drop-prevented:end');
 */

/**
 * @action Logger le refus en console
 * @checkpoint log-emitted, console affiche "[DRAG] drop-denied <colonne>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Retourner la carte à sa position d'origine
 * @checkpoint card-returned, la carte reste dans sa colonne de départ avec animation de retour
 *
 * @implementation
 *   console.log('checkpoint:card-returned:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:card-returned:end');
 */

/**
 * @action Afficher un tooltip expliquant la restriction
 * @checkpoint tooltip-shown, message "Cette colonne ne peut pas recevoir de cartes" temporairement visible
 *
 * @implementation
 *   console.log('checkpoint:tooltip-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:tooltip-shown:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/kanban/mockups/nominal.html`
- `specs/_app/frontend/kanban/mockups/drop-rejected.html`
