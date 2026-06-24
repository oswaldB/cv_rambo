# Workflow : creer-cible

## Description
Crée un nouveau document cible dans PouchDB avec statut 'new', déclenche sync vers CouchDB.

## Déclencheur
Soumission formulaire ajout URL

## Entrées
- `url` : string - URL de l'offre (validée)

## Sorties
- `cible` : Document créé avec _id
- `syncStatus` : État de la sync
- `error` : Si création échoue

## Étapes

```javascript
/**
 * @checkpoint Valider URL format
 */
function validerUrl(url) {
  const urlPattern = /^https?:\/\/.+/;
  return urlPattern.test(url);
}

/**
 * @checkpoint Créer document PouchDB
 */
async function creerCible(url) {
  const cible = {
    _id: `cible_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'cible',
    url: url,
    status: 'new',
    title: '',           // Sera rempli par workflow backend
    company: '',
    description: '',
    generatedScript: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const response = await db.put(cible);
  return { ...cible, _rev: response.rev };
}

/**
 * @checkpoint Sync automatique
 * PouchDB sync avec CouchDB en arrière-plan
 */
function notifierSync(cible) {
  // La sync est automatique (live: true)
  // Mais on peut émettre un event pour UI
  emit('cible:created', cible);
}

/**
 * @checkpoint Afficher confirmation
 */
function afficherSuccess(cible) {
  showToast('✅ Cible ajoutée ! Le script sera généré automatiquement.');
  // Redirection vers dashboard après 2s
  setTimeout(() => navigate('/dashboard'), 2000);
}
```

## Gestion erreurs

| Erreur | Comportement | Retry |
|--------|--------------|-------|
| URL invalide | Message inline | Non |
| PouchDB inaccessible | Toast erreur | Oui 3x |
| Conflit _id | Génère nouvel ID | Oui |

## Logs
- `[AJOUT] validation-url`
- `[AJOUT] cible-created <id>`
- `[AJOUT] sync-triggered`
- `[AJOUT] success`
