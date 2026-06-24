---
id: F-011-calculer-stats
type: frontend
folder: specs/_app/frontend/tableau-bord/workflows/calculer-stats/
description: Calculer les statistiques de candidatures depuis les cibles PouchDB.
depends_on: [charger-cibles]
screen: tableau-bord
global: false
mockup_entry: specs/_app/frontend/tableau-bord/mockups/loading.html
---

# F-011-calculer-stats : Calculer les statistiques

## Description

Calculer en temps réel les 3 compteurs du QG Tactique à partir des cibles du Kanban : balles tirées (candidatures envoyées), taux de cibles touchées (taux de retour positif), et munitions restantes (cibles en attente).

## Étapes

```javascript
/**
 * @action Afficher l'écran QG Tactique avec état de chargement
 * @checkpoint loading-displayed, spinner visible et message "Calcul des stats..."
 *
 * @implementation
 *   console.log('checkpoint:loading-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:loading-displayed:end');
 */

/**
 * @action Récupérer toutes les cibles depuis PouchDB
 * @checkpoint cibles-fetched, tableau complet des cibles avec leurs statuts chargé
 *
 * @implementation
 *   console.log('checkpoint:cibles-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:cibles-fetched:end');
 */

/**
 * @action Calculer le nombre de candidatures envoyées (balles tirées)
 * @checkpoint bullets-fired-calculated, nombre de cibles avec statut "Impact" + "Cible éliminée" + "Raté"
 *
 * @implementation
 *   console.log('checkpoint:bullets-fired-calculated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:bullets-fired-calculated:end');
 */

/**
 * @action Calculer le taux de retour positif (taux de cibles touchées)
 * @checkpoint hit-rate-calculated, pourcentage = (entretiens obtenus / candidatures envoyées) × 100
 *
 * @implementation
 *   console.log('checkpoint:hit-rate-calculated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:hit-rate-calculated:end');
 */

/**
 * @action Calculer les munitions restantes (cibles en attente)
 * @checkpoint ammo-remaining-calculated, nombre de cibles avec statut "En attente"
 *
 * @implementation
 *   console.log('checkpoint:ammo-remaining-calculated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:ammo-remaining-calculated:end');
 */

/**
 * @action Stocker les statistiques dans le store Alpine
 * @checkpoint stats-stored, store.dashboard contient {bulletsFired, hitRate, ammoRemaining}
 *
 * @implementation
 *   console.log('checkpoint:stats-stored:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:stats-stored:end');
 */

/**
 * @action Logger le calcul en console
 * @checkpoint log-emitted, console affiche "[DASHBOARD] stats-computed" avec les 3 valeurs
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher les 3 compteurs dans l'interface
 * @checkpoint counters-displayed, les compteurs "Balles tirées", "Taux de cibles touchées", "Munitions restantes" sont visibles
 *
 * @implementation
 *   console.log('checkpoint:counters-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:counters-displayed:end');
 */

/**
 * @action Gérer le cas où aucune donnée n'existe
 * @checkpoint empty-state-displayed, message "Aucune donnée - commencez à candidater" visible si 0 cibles
 *
 * @implementation
 *   console.log('checkpoint:empty-state-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:empty-state-displayed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/tableau-bord/mockups/loading.html`
- `specs/_app/frontend/tableau-bord/mockups/nominal.html`
- `specs/_app/frontend/tableau-bord/mockups/empty.html`
- `specs/_app/frontend/tableau-bord/mockups/error.html`
