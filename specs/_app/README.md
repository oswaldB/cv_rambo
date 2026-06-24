# Structure _app/ - CV Rambo

**Architecture complète** : PouchDB (frontend) ↔ CouchDB (serveur) + Workflow Node.js

---

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────┐
│                           FRONTEND                                  │
│  PouchDB (IndexedDB) ←──sync──→ Interface utilisateur (Alpine.js)  │
│                                                                   │
│  Écrans:                                                          │
│  - Dashboard (liste cibles)                                       │
│  - Ajout URL (formulaire)                                         │
│  - Détail Cible (script généré)                                   │
│  - Mode Rafale (exécution séquentielle)                             │
│  - Kanban, Arsenal, Settings                                      │
└─────────────────────────────────────────────────────────────────────┘
                              │ sync (WebSocket/HTTP)
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           SERVEUR                                   │
│                                                                   │
│  ┌─────────────────────┐    ┌─────────────────────────────────┐   │
│  │    CouchDB          │    │    Workflow Node.js             │   │
│  │  (Base centrale)    │◄───┤  - Change listener              │   │
│  │                     │    │  - Scraping Puppeteer          │   │
│  │  Documents:         │    │  - Génération Ollama           │   │
│  │  - cibles           │    │                                 │   │
│  │  - profils          │    │  Écoute changements ↓          │   │
│  │  - settings         │    │  Génère scripts JS ↓           │   │
│  └─────────────────────┘    │  Met à jour CouchDB ↓          │   │
│                             │  → Notification frontend        │   │
│                             └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Arborescence complète

```
_app/
├── README.md                              # Ce fichier
│
├── frontend/                              # Application web PouchDB
│   ├── dashboard/
│   │   ├── mockups/
│   │   │   └── nominal.html              ✅ Liste cibles + stats
│   │   └── workflows/
│   │       └── charger-cibles/
│   │           └── specs/
│   │               └── spec.md           ✅ Doc workflow
│   │
│   ├── ajout-url/
│   │   ├── mockups/
│   │   │   └── input.html                  ✅ Formulaire URL
│   │   └── workflows/
│   │       └── creer-cible/
│   │           └── specs/
│   │               └── spec.md           ✅ Doc création
│   │
│   ├── detail-cible/
│   │   ├── mockups/
│   │   │   ├── script-ready.html         ✅ Script affiché
│   │   │   └── processing.html             ✅ Loading state
│   │   └── workflows/
│   │       └── copier-script/
│   │           └── specs/
│   │               └── spec.md           ✅ Doc copie
│   │
│   ├── mode-rafale/
│   │   ├── mockups/
│   │   │   └── executing.html              ✅ Navigation séquentielle
│   │   └── workflows/
│   │       └── (à créer: selectionner, executer-sequentiel)
│   │
│   ├── kanban/
│   │   ├── mockups/                        # Structure créée
│   │   └── workflows/
│   │
│   ├── arsenal/
│   │   ├── mockups/                        # Structure créée
│   │   └── workflows/
│   │
│   ├── settings/
│   │   ├── mockups/                        # Structure créée
│   │   └── workflows/
│   │
│   └── global/
│       └── workflows/
│           └── initialiser-pouchdb/
│               └── specs/
│                   └── spec.md           ✅ Doc init PouchDB
│
└── backend/                               # Infrastructure serveur
    ├── docker-compose.yml                 ✅ CouchDB + Workflow
    │
    └── workflow/                          # Service Node.js
        ├── README.md                      ✅ Architecture
        ├── Dockerfile                     ✅ Container config
        ├── package.json                   ✅ Dépendances
        ├── .env.example                   ✅ Variables d'env
        ├── index.js                       ✅ Orchestrateur principal
        ├── config/
        │   └── index.js                   ✅ Configuration
        ├── services/
        │   ├── couchdb.js                 ✅ Change listener
        │   ├── scraper.js                 ✅ Puppeteer scraping
        │   └── ollama.js                  ✅ Génération IA
        └── utils/
            └── logger.js                  ✅ Logging
```

---

## Fichiers créés

### Frontend (5 mockups + 4 workflows)

| Fichier | Description |
|---------|-------------|
| `dashboard/mockups/nominal.html` | Dashboard avec liste cibles, statuts colorés, compteurs |
| `ajout-url/mockups/input.html` | Formulaire simple ajout URL |
| `detail-cible/mockups/script-ready.html` | **Écran principal** - Script généré + instructions + copie |
| `detail-cible/mockups/processing.html` | État loading avec spinner et étapes |
| `mode-rafale/mockups/executing.html` | Navigation séquentielle batch |
| `*/workflows/*/spec.md` | Documentation workflows (4 spécifiés) |

### Backend (9 fichiers)

| Fichier | Description |
|---------|-------------|
| `docker-compose.yml` | Stack complète: CouchDB + Workflow |
| `workflow/Dockerfile` | Configuration container Node.js |
| `workflow/package.json` | Dépendances: puppeteer, nano, axios, p-limit |
| `workflow/.env.example` | Variables d'environnement requises |
| `workflow/index.js` | Orchestrateur principal: écoute → scrape → génère → sauvegarde |
| `workflow/config/index.js` | Configuration centralisée |
| `workflow/services/couchdb.js` | Change listener CouchDB |
| `workflow/services/scraper.js` | Scraping Puppeteer avec extraction métadonnées |
| `workflow/services/ollama.js` | Génération scripts IA via API |
| `workflow/utils/logger.js` | Logging formaté |

---

## Flux de données complet

### 1. Ajout d'une cible (Frontend → Backend)

```
Utilisateur
    ↓ (colle URL)
┌──────────────┐
│  Ajout URL   │
│  (PouchDB)   │
└──────┬───────┘
       │ sync
       ▼
┌──────────────┐
│   CouchDB    │
└──────┬───────┘
       │ change event
       ▼
┌──────────────┐
│   Workflow   │ ← Détecte status='new'
└──────────────┘
```

### 2. Génération du script (Backend)

```
Workflow reçu cible 'new'
    ↓
┌──────────────┐
│  Scraper     │ ← Puppeteer ouvre l'URL
│  (Puppeteer) │ ← Extrait HTML + champs formulaire
└──────┬───────┘
       ↓
┌──────────────┐
│   Ollama     │ ← Génère script JS personnalisé
│   (IA)       │
└──────┬───────┘
       ↓
┌──────────────┐
│   CouchDB    │ ← Met à jour status='script-ready'
└──────┬───────┘
       │ sync
       ▼
┌──────────────┐
│   PouchDB    │ ← Frontend notifié
└──────────────┘
```

### 3. Utilisation du script (Frontend → Site externe)

```
Frontend notifié
    ↓
┌──────────────┐
│ Détail Cible │ ← Affiche "Script prêt !"
│              │ ← Bouton "📋 Copier le script"
└──────┬───────┘
       │ (utilisateur clique)
       ▼
Presse-papiers ← Script JS copié
       ↓
┌──────────────┐
│  Site cible  │ ← Utilisateur ouvre l'offre
│  (LinkedIn)  │ ← Ouvre console (F12)
└──────┬───────┘
       │ (colle script)
       ▼
Formulaire rempli automatiquement
```

---

## Cycle de vie d'une cible

| Étape | Statut | Responsable | Action |
|-------|--------|-------------|--------|
| 1 | `new` | Frontend | Utilisateur ajoute URL |
| 2 | `new` → `processing` | Workflow | Détection changement CouchDB |
| 3 | `processing` | Workflow | Scraping + génération IA |
| 4 | `processing` → `script-ready` | Workflow | Script généré, sauvegarde |
| 5 | `script-ready` | Frontend | Notification utilisateur |
| 6 | `script-ready` → `applied` | Frontend | Utilisateur confirme postulation |

---

## Technologies utilisées

### Frontend
- **PouchDB** : Stockage local IndexedDB, sync CouchDB
- **Alpine.js** : Réactivité légère
- **Vanilla CSS** : Thème rétro 80s (rouge/vert/or)

### Backend
- **CouchDB** : Base NoSQL avec réplication
- **Node.js** : Runtime workflow
- **Puppeteer** : Headless Chrome pour scraping
- **Ollama API** : Génération IA (Minimax)

---

## Démarrage développement

### Prérequis
- Node.js 18+
- Docker & Docker Compose
- Clé API Ollama (Minimax)

### 1. Infrastructure
```bash
cd _app/backend
docker-compose up -d couchdb
```

### 2. Workflow
```bash
cd _app/backend/workflow
cp .env.example .env
# Édite .env avec tes clés
npm install
npm start
```

### 3. Frontend
```bash
# Serveur statique simple
cd _app/frontend/dashboard/mockups
npx serve .
```

---

## Points d'attention

| Aspect | Détail |
|--------|--------|
| **CORS** | Configurer CouchDB pour accepter requêtes frontend |
| **Auth** | CouchDB en basic auth pour le moment |
| **Ollama** | Nécessite clé API valide |
| **Puppeteer** | ~150MB Chromium, en prod utiliser Alpine |
| **Rate limiting** | Délai entre scrapes (1s configuré) |
| **Anti-bot** | Certains sites bloquent Puppeteer (fallback manuel) |

---

## Prochaines étapes suggérées

1. **Implémenter** `index.html` frontend avec Alpine.js
2. **Tester** le flux complet: ajout URL → génération script → copie
3. **Ajouter** authentification CouchDB sécurisée
4. **Créer** les mockups manquants (Kanban, Arsenal, Settings)
5. **Déployer** sur VPS avec Docker Compose

---

## Références

- [Architecture détaillée](../../ARCHITECTURE.md)
- [Workflow backend](../../WORKFLOW.md)
- [Features specs](../../features/)
