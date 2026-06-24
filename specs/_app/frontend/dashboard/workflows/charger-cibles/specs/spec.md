# Workflow : charger-cibles

## Description
Charge la liste des cibles depuis PouchDB local et affiche avec filtres optionnels.

## Déclencheur
- Navigation vers Dashboard
- Changement de filtre
- Sync PouchDB (nouvelle donnée arrivée)

## Entrées
- `filter` (optionnel) : string - statut à filtrer ('new' | 'processing' | 'script-ready' | 'applied' | 'error')

## Sorties
- `cibles[]` : Array de documents cible
- `counts` : Object avec compteurs par statut
- `error` : Si erreur PouchDB

## Étapes

```javascript
/**
 * @checkpoint Initialiser requête PouchDB
 */
async function chargerCibles(filter = null) {
  const selector = { type: 'cible' };
  
  if (filter) {
    selector.status = filter;
  }
  
  const result = await db.find({
    selector: selector,
    sort: [{ createdAt: 'desc' }]
  });
  
  return result.docs;
}

/**
 * @checkpoint Calculer statistiques
 */
function calculerStats(cibles) {
  return {
    new: cibles.filter(c => c.status === 'new').length,
    processing: cibles.filter(c => c.status === 'processing').length,
    scriptReady: cibles.filter(c => c.status === 'script-ready').length,
    applied: cibles.filter(c => c.status === 'applied').length,
    error: cibles.filter(c => c.status === 'error').length
  };
}

/**
 * @checkpoint Rendu UI
 */
function renderCiblesList(cibles, stats) {
  // Met à jour les compteurs
  updateStatsCards(stats);
  
  // Rend la liste
  renderList(cibles);
}
```

## Gestion erreurs

| Erreur | Comportement | Message |
|--------|--------------|---------|
| PouchDB inaccessible | Retry 3x puis message | "Base locale inaccessible" |
| Aucun index | Crée index automatiquement | - |
| Timeout | Afficher spinner | "Chargement..." |

## Logs
- `[DASHBOARD] loading-started`
- `[DASHBOARD] cibles-loaded <count>`
- `[DASHBOARD] stats-calculated`
- `[DASHBOARD] render-completed`
