# F-010 : Mode Rafale (Génération Multi-Scripts)

**Personas** : Candidat en recherche active voulant postuler à plusieurs offres d'un coup  
**Contexte** : Le mode rafale permet de générer des scripts de candidature pour plusieurs offres simultanément, puis de les exécuter en séquence.

---

## User Stories

### US-010-1 (Sélectionner cibles en rafale)
En tant que candidat  
Je veux sélectionner plusieurs offres en attente pour un traitement groupé  
Afin de générer les scripts en une seule fois.

**Critères d'acceptation**
- Interface de sélection avec checkboxes dans le Kanban
- Sélection multiple des cibles avec statut `new` ou `script-ready`
- Affichage compteur : "X cibles sélectionnées"
- Limite : maximum 10 cibles par rafale (éviter surcharge Ollama)
- Bouton "🔫 Lancer la rafale"

### US-010-2 (Génération rafale)
En tant que système  
Je veux traiter les cibles sélectionnées en parallèle  
Afin de générer tous les scripts rapidement.

**Critères d'acceptation**
- Traitement parallèle des cibles (Promise.all avec limite concurrency)
- Progress bar globale : "Script X / Y généré"
- Pour chaque cible :
  - Scraping Puppeteer
  - Génération script Ollama
  - Mise à jour CouchDB
- Gestion d'erreur individuelle (une cible qui échoue n'arrête pas les autres)
- Temps estimé affiché (basé sur moyenne temps/scraping)

### US-010-3 (Exécution séquentielle)
En tant que candidat  
Je veux exécuter les scripts les uns après les autres  
Afin de postuler rapidement sans me perdre.

**Critères d'acceptation**
- Vue "Mode Rafale" après génération complète
- Liste des scripts prêts avec numérotation
- Pour chaque cible :
  - Carte avec titre, entreprise, URL
  - Bouton "📋 Copier le script"
  - Lien "Ouvrir l'offre" (target="_blank")
  - Checkbox "✓ Postulé"
- Boutons navigation : "Précédent", "Suivant", "Terminer"
- Compteur : "Postulé 3 / 10"
- Raccourci clavier : Ctrl+Enter pour valider et passer au suivant

### US-010-4 (Pause et reprise)
En tant que candidat  
Je veux pouvoir interrompre et reprendre la rafale plus tard  
Afin de ne pas bloquer mon workflow.

**Critères d'acceptation**
- Bouton "⏸ Pause" pendant la rafale
- Sauvegarde de l'état : quelles cibles restent
- Reprise possible à tout moment
- Statut persistant dans PouchDB/CouchDB

---

## Architecture Mode Rafale

### Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                         SÉLECTION                                      │
│  [✓] Dev @ TechCorp     [✓] Fullstack @ StartupX                     │
│  [✓] Lead @ ScaleUp     [ ] Backend @ BigCorp                        │
│                                                                       │
│  3 cibles sélectionnées          [🔫 LANCER LA RAFALE]                │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      GÉNÉRATION EN COURS                              │
│  [████████████████████░░░░] 2 / 3                                   │
│                                                                       │
│  ✅ TechCorp - Script prêt                                            │
│  ✅ StartupX - Script prêt                                            │
│  🔵 ScaleUp - Génération en cours...                                  │
│                                                                       │
│                         [⏸ PAUSE]                                    │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    MODE RAFALE ACTIF                                  │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  1️⃣ Développeur Fullstack @ TechCorp                          │ │
│  │     linkedin.com/jobs/view/123                                  │ │
│  │                                                                 │ │
│  │     [📋 Copier le script]  [🔗 Ouvrir l'offre]               │ │
│  │                                                                 │ │
│  │     [✅ J'AI POSTULÉ]  ──────▶  [SUIVANT →]                   │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  Progression : 0 / 3                                                │
│  ⏱ Temps estimé restant : 15 min                                     │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Modèle de données Mode Rafale

```javascript
// Document rafale
{
  "_id": "rafale_1699999999999",
  "type": "rafale",
  "status": "active", // active, paused, completed
  "cibleIds": [
    "cible_1699999999000",
    "cible_1699999999001",
    "cible_1699999999002"
  ],
  "progress": {
    "total": 3,
    "generated": 3,
    "applied": 1
  },
  "startedAt": "2026-06-24T10:00:00Z",
  "pausedAt": null,
  "completedAt": null,
  "createdAt": "2026-06-24T10:00:00Z",
  "updatedAt": "2026-06-24T10:30:00Z"
}
```

---

## Workflow Backend Rafale

```javascript
// workflow/rafale.js
async function processRafale(rafaleId) {
  const rafale = await couchDB.get(rafaleId);
  
  // Récupère les cibles à traiter
  const cibles = await Promise.all(
    rafale.cibleIds.map(id => couchDB.get(id))
  );
  
  // Filtre celles qui n'ont pas encore de script
  const toGenerate = cibles.filter(c => c.status === 'new');
  
  // Génération parallèle (max 3 concurrents pour éviter surcharge)
  const limit = pLimit(3);
  const promises = toGenerate.map(cible => 
    limit(() => generateScriptForCible(cible))
  );
  
  await Promise.all(promises);
  
  // Met à jour le statut rafale
  await couchDB.put({
    ...rafale,
    status: 'ready',
    'progress.generated': rafale.cibleIds.length
  });
}

async function generateScriptForCible(cible) {
  try {
    // Scraping
    const html = await scrapeWithPuppeteer(cible.url);
    
    // Génération script
    const script = await ollama.generateFillScript(html, cible);
    
    // Sauvegarde
    await couchDB.put({
      ...cible,
      status: 'script-ready',
      generatedScript: script,
      scriptGeneratedAt: new Date().toISOString()
    });
    
  } catch (error) {
    await couchDB.put({
      ...cible,
      status: 'error',
      errorMessage: error.message
    });
  }
}
```

---

## États du Mode Rafale

| État | Description | Actions possibles |
|------|-------------|-------------------|
| `selecting` | Sélection des cibles | Cocher/décocher, Lancer |
| `generating` | Génération des scripts en cours | Pause, Voir progression |
| `ready` | Tous les scripts sont prêts | Démarrer exécution |
| `active` | Exécution séquentielle en cours | Postulé, Suivant, Précédent, Pause |
| `paused` | Rafale mise en pause | Reprendre, Abandonner |
| `completed` | Toutes les cibles traitées | Voir résumé |

---

## Logs Mode Rafale

- `[RAFALE] created <rafaleId> <count>` : Rafale créée
- `[RAFALE] generation-started <rafaleId>` : Génération lancée
- `[RAFALE] target-generated <rafaleId> <cibleId>` : Cible traitée
- `[RAFALE] generation-completed <rafaleId>` : Génération terminée
- `[RAFALE] execution-started <rafaleId>` : Exécution séquentielle démarrée
- `[RAFALE] target-applied <rafaleId> <cibleId>` : Candidature confirmée
- `[RAFALE] paused <rafaleId>` : Rafale mise en pause
- `[RAFALE] resumed <rafaleId>` : Rafale reprise
- `[RAFALE] completed <rafaleId>` : Rafale terminée

---

## Performance

| Métrique | Valeur estimée |
|----------|----------------|
| Scraping par page | 3-5 secondes |
| Génération script Ollama | 5-10 secondes |
| Temps total par cible | 8-15 secondes |
| Rafale 10 cibles | 2-3 minutes |
| Parallélisme max | 3 requêtes simultanées |

---

## Comparatif

| Aspect | Mode Normal | Mode Rafale |
|--------|-------------|-------------|
| Cibles | Une par une | 10 simultanées |
| Scripts | Génération à la demande | Batch puis exécution |
| Temps total | 2 min / offre | 1 min / offre (optimisé) |
| Workflow | Linéaire | Parallèle + séquentiel |
| Pause | Non applicable | ✅ Oui |
