---
id: F-011-afficher-graphique
type: frontend
folder: specs/_app/frontend/tableau-bord/workflows/afficher-graphique/
description: Afficher le graphique d'évolution des candidatures sur 7 jours.
depends_on: [calculer-stats]
screen: tableau-bord
global: false
mockup_entry: specs/_app/frontend/tableau-bord/mockups/nominal.html
---

# F-011-afficher-graphique : Afficher le graphique

## Description

Afficher un graphique optionnel montrant l'évolution des candidatures sur les 7 derniers jours (nombre de cibles créées, déplacées vers "Impact", etc.).

## Étapes

```javascript
/**
 * @action Afficher le QG Tactique avec les compteurs
 * @checkpoint dashboard-with-counters, les 3 compteurs sont visibles
 *
 * @implementation
 *   console.log('checkpoint:dashboard-with-counters:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:dashboard-with-counters:end');
 */

/**
 * @action Proposer l'affichage du graphique
 * @checkpoint graph-option-ready, bouton "Voir l'évolution sur 7 jours" ou toggle disponible
 *
 * @implementation
 *   console.log('checkpoint:graph-option-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:graph-option-ready:end');
 */

/**
 * @action Cliquer pour afficher le graphique
 * @checkpoint graph-triggered, l'utilisateur active l'option graphique
 *
 * @implementation
 *   console.log('checkpoint:graph-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:graph-triggered:end');
 */

/**
 * @action Récupérer les données historiques des 7 derniers jours
 * @checkpoint historical-data-fetched, regroupement des cibles par date de création/modification
 *
 * @implementation
 *   console.log('checkpoint:historical-data-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:historical-data-fetched:end');
 */

/**
 * @action Préparer les données pour le graphique
 * @checkpoint chart-data-prepared, tableau avec {date, ciblesCrees, ciblesImpact, ciblesEnAttente} pour chaque jour
 *
 * @implementation
 *   console.log('checkpoint:chart-data-prepared:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:chart-data-prepared:end');
 */

/**
 * @action Générer le graphique avec une librairie (Chart.js ou équivalent)
 * @checkpoint chart-generated, canvas SVG ou élément canvas avec le graphique ligne/barres créé
 *
 * @implementation
 *   console.log('checkpoint:chart-generated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:chart-generated:end');
 */

/**
 * @action Afficher le graphique dans l'interface
 * @checkpoint chart-displayed, graphique visible sous les compteurs avec légende et axes
 *
 * @implementation
 *   console.log('checkpoint:chart-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:chart-displayed:end');
 */

/**
 * @action Permettre le masquage du graphique
 * @checkpoint hide-option-ready, bouton "Masquer le graphique" disponible
 *
 * @implementation
 *   console.log('checkpoint:hide-option-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:hide-option-ready:end');
 */

/**
 * @action Afficher un message si pas assez de données historiques
 * @checkpoint insufficient-data-displayed, message "Pas assez d'historique (minimum 2 jours avec activité)" si applicable
 *
 * @implementation
 *   console.log('checkpoint:insufficient-data-displayed:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:insufficient-data-displayed:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/tableau-bord/mockups/nominal.html`
- `specs/_app/frontend/tableau-bord/mockups/with-chart.html`
- `specs/_app/frontend/tableau-bord/mockups/insufficient-data.html`
