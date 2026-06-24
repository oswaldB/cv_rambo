---
id: F-004-tirer-direct
type: frontend
folder: specs/_app/frontend/capture-offre/workflows/tirer-direct/
description: Créer une cible et déclencher immédiatement le pré-remplissage et soumission automatique.
depends_on: [verifier-doublon, F-007]
screen: capture-offre
global: false
mockup_entry: specs/_app/frontend/capture-offre/mockups/nominal.html
---

# F-004-tirer-direct : Tirer direct

## Description

Capturer l'offre, créer une cible dans le Kanban, ET déclencher immédiatement le workflow F-007 (pré-remplissage + soumission automatique) pour candidater en un seul clic.

## Étapes

```javascript
/**
 * @action Cliquer sur le bouton "Tirer direct"
 * @checkpoint shot-triggered, le bouton passe en état loading avec animation
 *
 * @implementation
 *   console.log('checkpoint:shot-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:shot-triggered:end');
 */

/**
 * @action Valider ou modifier les données dans le popup de confirmation
 * @checkpoint data-validated, les champs sont confirmés par l'utilisateur
 *
 * @implementation
 *   console.log('checkpoint:data-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:data-validated:end');
 */

/**
 * @action Créer l'objet cible avec statut "En attente"
 * @checkpoint target-created, l'objet cible est prêt avec toutes les métadonnées
 *
 * @implementation
 *   console.log('checkpoint:target-created:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:target-created:end');
 */

/**
 * @action Sauvegarder la cible dans PouchDB
 * @checkpoint target-saved, la cible est persistée avec _id
 *
 * @implementation
 *   console.log('checkpoint:target-saved:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:target-saved:end');
 */

/**
 * @action Logger le tir direct en console
 * @checkpoint log-emitted, console affiche "[CAPTURE] direct-shot-fired <url>"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Injecter automatiquement l'overlay de pré-remplissage (F-007)
 * @checkpoint prefilling-overlay-injected, l'écran pre-remplissage s'affiche avec les données de la cible
 *
 * @implementation
 *   console.log('checkpoint:prefilling-overlay-injected:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:prefilling-overlay-injected:end');
 */

/**
 * @action Lancer automatiquement l'analyse du formulaire par Ollama
 * @checkpoint form-analysis-started, F-007-analyser-formulaire est déclenché automatiquement
 *
 * @implementation
 *   console.log('checkpoint:form-analysis-started:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:form-analysis-started:end');
 */

/**
 * @action Attendre le résultat de la soumission automatique
 * @checkpoint submission-pending, l'interface affiche "Candidature automatique en cours..."
 *
 * @implementation
 *   console.log('checkpoint:submission-pending:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:submission-pending:end');
 */

/**
 * @action Mettre à jour le statut de la cible selon le résultat
 * @checkpoint status-updated, la cible passe à "Impact" si succès, reste "En attente" si échec
 *
 * @implementation
 *   console.log('checkpoint:status-updated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:status-updated:end');
 */

/**
 * @action Afficher le résultat final à l'utilisateur
 * @checkpoint result-displayed, message "Mission accomplie" ou "Échec - voir le Kanban" visible
 *
 * @implementation
 *   console.log('checkpoint:result-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:result-displayed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/capture-offre/mockups/nominal.html`
- `specs/_app/frontend/capture-offre/mockups/direct-shot-fired.html`
- `specs/_app/frontend/pre-remplissage/mockups/analyzing.html`
- `specs/_app/frontend/pre-remplissage/mockups/submit-success.html`
- `specs/_app/frontend/capture-offre/mockups/error.html`
