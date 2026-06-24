# Architecture CV Rambo - Spécification Technique

**Date** : 2026-06-24  
**Type** : Application hybride PouchDB + CouchDB + Workflow backend

---

## Vue d'ensemble

CV Rambo fonctionne sans extension Chrome. L'utilisateur :
1. Ajoute des URLs d'offres dans l'app web (PouchDB local)
2. Les données sync vers CouchDB
3. Un **workflow backend** détecte les URLs "new", scrape avec Puppeteer, génère un script IA
4. L'utilisateur **copie-colle le script généré** dans la console du site cible
5. Le script remplit automatiquement le formulaire

---

## Stack Technique

### Frontend
- **PouchDB** : Stockage local navigateur (IndexedDB)
- **Vanilla JS + Alpine.js** : UI réactive
- **Design rétro 80s** : CSS custom

### Backend/Serveur
- **CouchDB** : Base centrale pour synchronisation PouchDB
- **Node.js + Puppeteer** : Workflow de scraping
- **Ollama (Minimax)** : Génération de scripts

### Flux de données
```
┌─────────────┐     sync      ┌─────────────┐     ┌─────────────┐
│  PouchDB    │ ◄───────────► │   CouchDB   │     │   Workflow  │
│  (Browser)  │               │  (Serveur)  │◄────┤  (Node.js)  │
└─────────────┘               └─────────────┘     └──────┬──────┘
                                                         │
                              ┌─────────────┐     ┌──────┴──────┐
                              │  Ollama AI  │◄────┤  Puppeteer  │
                              │  (Script)   │     │  (Scrape)   │
                              └─────────────┘     └─────────────┘
```

---

## Workflow complet

### 1. Ajout URL (Frontend)
```javascript
// L'utilisateur ajoute une URL
const doc = {
  _id: 'cible_' + Date.now(),
  type: 'cible',
  url: 'https://linkedin.com/jobs/view/...',
  status: 'new',        // ← Clé pour le workflow
  title: '',           // Rempli plus tard
  company: '',
  description: '',
  createdAt: new Date().toISOString()
};

await db.put(doc);
// Sync automatique vers CouchDB
```

### 2. Détection & Scraping (Backend)
Le workflow Node.js tourne en continu (cron ou event-driven) :

```javascript
// workflow/scraper.js
const couchDB = require('./couchdb-client');
const puppeteer = require('puppeteer');

async function processNewCibles() {
  // Récupère les cibles avec status='new'
  const newCibles = await couchDB.find({
    selector: { status: 'new' }
  });
  
  for (const cible of newCibles.docs) {
    // Scrape la page
    const html = await scrapeWithPuppeteer(cible.url);
    
    // Extrait les données
    const extracted = await extractJobData(html);
    
    // Génère le script IA
    const script = await generateFillScript(extracted, cible.url);
    
    // Met à jour la cible
    await couchDB.put({
      ...cible,
      status: 'script-ready',
      title: extracted.title,
      company: extracted.company,
      description: extracted.description,
      generatedScript: script,
      scriptGeneratedAt: new Date().toISOString()
    });
  }
}
```

### 3. Génération Script IA

Prompt Ollama pour générer le script :

```javascript
const prompt = `
Tu es un expert en DOM manipulation. Génère un script JavaScript qui remplit automatiquement le formulaire de candidature sur cette page.

PAGE SCRAPPÉE:
URL: ${cible.url}
TITRE OFFRE: ${extracted.title}
ENTREPRISE: ${extracted.company}

PROFIL CANDIDAT (à injecter):
- Prénom: ${user.firstName}
- Nom: ${user.lastName}
- Email: ${user.email}
- Téléphone: ${user.phone}
- LinkedIn: ${user.linkedin}
- Lettre motivation: ${generatedMotivationLetter}

Génère un script JavaScript qui:
1. Détecte les champs du formulaire (input[name], textarea, select)
2. Remplit chaque champ avec les données appropriées
3. Coche les checkboxes si nécessaire
4. Soumet le formulaire (form.submit() ou click bouton)
5. Affiche "Formulaire rempli avec succès" en console

Règles:
- Utilise querySelector avec fallback
- Gère les champs required
- Ne casse pas si un champ n'existe pas
- Commentaire en français
- Code minifié sur une ligne pour faciliter copier-coller

Retourne UNIQUEMENT le code JavaScript, sans markdown, sans explication.
`;
```

### 4. Exécution par l'utilisateur (Frontend)

```javascript
// L'utilisateur voit le statut "script-ready"
// Clique sur "Copier le script"
// Va sur la page de l'offre
// Ouvre la console (F12)
// Colle et exécute

// Exemple de script généré:
(function(){
  const data={firstName:"Oswald",lastName:"Bernard",email:"oswald@example.com",...};
  const f=document.querySelector('form');
  if(f.querySelector('[name="firstName"]')) f.querySelector('[name="firstName"]').value=data.firstName;
  if(f.querySelector('[name="lastName"]')) f.querySelector('[name="lastName"]').value=data.lastName;
  // ... autres champs
  f.submit();
  console.log("✅ Formulaire rempli avec succès");
})();
```

---

## Statuts des cibles

| Statut | Description | Transition |
|--------|-------------|------------|
| `new` | URL ajoutée, en attente de scraping | Auto → `processing` |
| `processing` | Scraping en cours | Succès → `script-ready`, Erreur → `error` |
| `script-ready` | Script généré, prêt à copier | Manuel → `applied` |
| `applied` | Candidature effectuée | - |
| `error` | Erreur scraping ou génération | Manuel → `new` (retry) |

---

## Architecture fichiers

```
cv-rambo/
├── frontend/                    # App web PouchDB
│   ├── index.html
│   ├── js/
│   │   ├── db.js               # Init PouchDB + sync CouchDB
│   │   ├── app.js              # Logique UI
│   │   └── components/
│   │       ├── CibleList.js    # Liste URLs
│   │       ├── CibleForm.js    # Ajout URL
│   │       └── ScriptViewer.js # Affichage script généré
│   └── assets/
│       └── css/
│
├── couchdb/                     # Config CouchDB
│   ├── docker-compose.yml       # Container CouchDB
│   └── init-scripts/
│
├── workflow/                    # Backend Node.js
│   ├── package.json
│   ├── scraper.js              # Boucle principale
│   ├── puppeteer-service.js    # Scraping
│   ├── ollama-client.js        # Génération IA
│   └── couchdb-client.js       # Connexion CouchDB
│
└── README.md
```

---

## Sync PouchDB ↔ CouchDB

```javascript
// frontend/js/db.js
const PouchDB = require('pouchdb');

const localDB = new PouchDB('cv-rambo');
const remoteDB = new PouchDB('http://localhost:5984/cv-rambo');

// Sync bidirectionnelle continue
localDB.sync(remoteDB, {
  live: true,
  retry: true
}).on('change', (change) => {
  console.log('Sync:', change);
  // Rafraîchit l'UI si nouveau statut 'script-ready'
}).on('error', (err) => {
  console.error('Sync error:', err);
});

export default localDB;
```

---

## Sécurité

| Aspect | Implémentation |
|--------|----------------|
| CouchDB | Authentification basic auth, HTTPS |
| CORS | Configuré pour origine frontend uniquement |
| Scripts générés | Exécution côté client uniquement (console) |
| Données user | Chiffrées côté client (optionnel) |

---

## Avantages de cette architecture

1. **Pas d'extension Chrome** : Fonctionne sur tous les navigateurs
2. **Offline-first** : PouchDB fonctionne sans connexion
3. **Sync automatique** : Multi-appareils possible
4. **Flexibilité IA** : Script personnalisé par page
5. **Contrôle utilisateur** : L'utilisateur valide chaque exécution

---

## Inconvénients

1. **Manuel** : L'utilisateur doit copier-coller dans la console
2. **CORS** : Certains sites bloquent le scraping (LinkedIn)
3. **Délai** : Temps de génération du script (scraping + IA)

---

## Prochaines étapes

1. **Setup CouchDB** : `docker-compose up couchdb`
2. **Frontend PouchDB** : Implémenter ajout URL + sync
3. **Workflow Node** : Boucle de détection + scraping
4. **Intégration Ollama** : Génération scripts
5. **UI Script Viewer** : Affichage + copie scripts
