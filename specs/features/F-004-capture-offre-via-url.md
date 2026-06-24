# F-004 : Capture d'offre via URL

**Personas** : Candidat en recherche d'emploi
**Contexte** : L'utilisateur ajoute une URL d'offre dans l'app. Un workflow backend scrape la page et génère un script de remplissage automatique.

---

## User Stories

### US-004-1 (Ajouter URL)
En tant que candidat
Je veux ajouter l'URL d'une offre d'emploi
Afin que le système prépare un script de candidature automatique.

**Critères d'acceptation**
- Champ input "URL de l'offre" avec validation format
- Bouton "Ajouter à la liste"
- Statut initial : `new`
- Sauvegarde dans PouchDB local
- Sync automatique vers CouchDB

### US-004-2 (Suivre progression)
En tant que candidat
Je veux voir le statut de traitement de mes URLs
Afin de savoir quand le script est prêt.

**Critères d'acceptation**
- Liste des URLs avec statut coloré :
  - 🟡 `new` : En attente de traitement
  - 🔵 `processing` : Scraping en cours
  - 🟢 `script-ready` : Script prêt à copier
  - ✅ `applied` : Candidature effectuée
  - 🔴 `error` : Erreur de traitement
- Badge avec statut explicite
- Timestamp d'ajout et de génération du script

### US-004-3 (Exécuter script)
En tant que candidat
Je veux copier le script généré et l'exécuter sur la page
Afin de remplir automatiquement le formulaire de candidature.

**Critères d'acceptation**
- Bouton "📋 Copier le script" quand statut = `script-ready`
- Instructions visuelles :
  1. Ouvrir l'URL dans un nouvel onglet
  2. Ouvrir la console développeur (F12)
  3. Coller le script
  4. Appuyer sur Entrée
- Affichage du script avec syntax highlighting
- Bouton "✓ J'ai postulé" pour marquer comme `applied`

---

## Flux de données

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Ajout     │───▶│   PouchDB   │───▶│   CouchDB   │───▶│   Workflow  │
│   URL       │    │   (local)   │    │  (serveur)  │    │   Backend   │
└─────────────┘    └─────────────┘    └─────────────┘    └──────┬──────┘
                                                                  │
                              ┌─────────────┐    ┌──────────────┴──────┐
                              │  Génération  │◀───│  Scraping Puppeteer  │
                              │   Script IA  │    │   + Extraction données│
                              └─────────────┘    └─────────────────────┘
```

---

## Écran capture-offre

### États

| État | Description | UI |
|------|-------------|-----|
| `input-url` | Formulaire d'ajout URL | Input + bouton Ajouter |
| `list-cibles` | Liste des URLs ajoutées | Tableau avec statuts |
| `script-ready` | Script généré affiché | Code block + bouton copier + instructions |
| `error` | Erreur de traitement | Message erreur + bouton réessayer |

### Design

```
┌─────────────────────────────────────────────────────────────────┐
│  🔫 CV RAMBO - Mes Cibles                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [🔗 Coller l'URL de l'offre                    ] [+ AJOUTER]   │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  MES OFFRES                                                       │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🟢 Développeur Fullstack @ TechCorp                      │  │
│  │    linkedin.com/jobs/view/123                            │  │
│  │    Script prêt il y a 2 min    [📋 Copier] [✓ Postulé]   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🔵 Lead Dev @ StartupXYZ                                  │  │
│  │    welcometothejungle.com/...                            │  │
│  │    Analyse en cours...                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🟡 Data Engineer @ BigData                                │  │
│  │    indeed.com/...                                         │  │
│  │    En attente de traitement                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Modèle de données PouchDB/CouchDB

```javascript
// Document cible
{
  "_id": "cible_1699999999999",
  "type": "cible",
  "url": "https://www.linkedin.com/jobs/view/123456",
  "status": "script-ready",
  "title": "Développeur Fullstack",
  "company": "TechCorp",
  "description": "Nous recherchons un développeur expérimenté...",
  "location": "Paris",
  "generatedScript": "(function(){/* code généré */})();",
  "scriptGeneratedAt": "2026-06-24T10:30:00Z",
  "appliedAt": null,
  "errorMessage": null,
  "createdAt": "2026-06-24T10:00:00Z",
  "updatedAt": "2026-06-24T10:30:00Z"
}
```

---

## API/DB Interface

### Frontend (PouchDB)

```javascript
// Ajouter une cible
async function addCible(url) {
  const doc = {
    _id: `cible_${Date.now()}`,
    type: 'cible',
    url: url,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  return await db.put(doc);
}

// Récupérer toutes les cibles
async function getAllCibles() {
  const result = await db.find({
    selector: { type: 'cible' },
    sort: [{ createdAt: 'desc' }]
  });
  return result.docs;
}

// Marquer comme postulé
async function markAsApplied(cibleId) {
  const doc = await db.get(cibleId);
  doc.status = 'applied';
  doc.appliedAt = new Date().toISOString();
  return await db.put(doc);
}
```

---

## Logs console

- `[CAPTURE] url-added <url>` : URL ajoutée
- `[CAPTURE] status-change <id> <oldStatus> -> <newStatus>` : Changement statut
- `[CAPTURE] script-copied <id>` : Script copié par l'utilisateur
- `[CAPTURE] marked-applied <id>` : Marqué comme postulé

---

## Gestion des erreurs

| Erreur | Statut | Message |
|--------|--------|---------|
| URL invalide | `error` | "Cette URL n'est pas valide" |
| Scraping échoué | `error` | "Impossible d'analyser cette page (anti-bot)" |
| Génération IA échouée | `error` | "Erreur lors de la génération du script" |
| Timeout | `error` | "Le traitement a pris trop de temps" |

Bouton "🔄 Réessayer" remet le statut à `new`.
