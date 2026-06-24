# Inventaire des écrans frontend

**Source** : specs/features/*.md  
**Date** : 2026-06-24  
**Architecture** : PouchDB (frontend) ↔ CouchDB (serveur) + Workflow backend génération de scripts

---

## Architecture d'affichage

**Mode d'affichage** : Application web SPA (Single Page Application) avec PouchDB local.

Les écrans sont des **pages HTML distinctes** ou des **vues dans une SPA** :
- Chaque écran correspond à une fonctionnalité majeure
- Navigation via menu latéral ou top bar
- Communication : PouchDB local (pas d'API REST directe, sync automatique avec CouchDB)

```
┌─────────────────────────────────────────────────────────────┐
│  Navigateur web                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  CV Rambo App (PouchDB + Alpine.js)                  │  │
│  │  ┌──────────────┬─────────────────────────────────┐ │  │
│  │  │   Menu       │  Interface principale           │ │  │
│  │  │  - Dashboard │  (liste cibles, kanban, etc.)   │ │  │
│  │  │  - Ajouter   │                                 │ │  │
│  │  │  - Arsenal   │                                 │ │  │
│  │  │  - Settings  │                                 │ │  │
│  │  └──────────────┴─────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────────────┘  │
│                            │                                │
│                            ▼ sync (live)                     │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  CouchDB (serveur) → Workflow (génération scripts)  │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Impact technique** :
- **Offline-first** : PouchDB fonctionne sans connexion
- **Sync temps réel** : Les changements arrivent automatiquement depuis CouchDB
- **Pas d'injection** : L'utilisateur copie-colle un script dans la console cible
- **Workflow asynchrone** : Le script est généré en arrière-plan (10-40s)

**Impact fonctionnel** :
- L'utilisateur ajoute une URL et attend la notification "Script prêt"
- Il copie le script, ouvre l'offre dans un nouvel onglet, colle dans la console
- Le mode rafale permet de traiter plusieurs offres en séquence

---

## Écrans principaux

### Dashboard (Écran d'accueil)

**Type** : Écran principal  
**Chemin** : `_app/frontend/dashboard/`  
**Description** : Vue d'ensemble des cibles avec statuts et filtres rapides

| État | Description | Actions |
|------|-------------|---------|
| `nominal` | Liste des cibles avec statuts colorés | Ajouter, Voir détail, Filtrer |
| `loading` | Chargement initial depuis PouchDB | - |
| `empty` | Aucune cible ajoutée | Bouton "Ajouter ma première cible" |
| `filtered` | Liste filtrée par statut | Réinitialiser filtres |
| `syncing` | Sync avec CouchDB en cours | Indicateur discret |

**Workflows attachés** :
- `charger-cibles` : Depuis PouchDB
- `filtrer-par-statut` : new | processing | script-ready | applied | error
- `sync-pouchdb` : Gestion état connexion

---

### Ajout URL

**Type** : Écran/Modal  
**Chemin** : `_app/frontend/ajout-url/`  
**Description** : Formulaire simple pour ajouter une nouvelle URL

| État | Description | Actions |
|------|-------------|---------|
| `input` | Champ URL vide, prêt | Valider URL |
| `validating` | Vérification format URL | - |
| `invalid` | URL mal formée | Corriger |
| `adding` | Sauvegarde dans PouchDB | - |
| `success` | Cible ajoutée, statut 'new' | Voir dashboard ou ajouter autre |

**Workflows attachés** :
- `valider-url` : Regex validation
- `creer-cible` : Création doc PouchDB avec status='new'
- `notifier-workflow` : Déclenche sync vers CouchDB

---

### Détail Cible (Vue Script)

**Type** : Écran/Modal  
**Chemin** : `_app/frontend/detail-cible/`  
**Description** : Affichage des détails de l'offre et du script généré

| État | Description | Actions |
|------|-------------|---------|
| `loading` | Chargement doc depuis PouchDB | - |
| `new` | URL ajoutée, en attente traitement | Voir progression |
| `processing` | Workflow backend en cours | Spinner + temps estimé |
| `script-ready` | **Script généré et prêt** | 📋 Copier script, 🔗 Ouvrir offre, ✅ Marquer postulé |
| `applied` | Candidature confirmée | Voir dans Kanban |
| `error` | Erreur workflow | Réessayer, Supprimer |

**Workflows attachés** :
- `afficher-script` : Syntax highlighting
- `copier-script` : Clipboard API
- `ouvrir-offre` : window.open avec URL
- `marquer-applied` : Update status → 'applied'
- `instructions-console` : Guide étape par étape

---

### Mode Rafale

**Type** : Écran dédié  
**Chemin** : `_app/frontend/mode-rafale/`  
**Description** : Sélection multiple et exécution séquentielle

| État | Description | Actions |
|------|-------------|---------|
| `selection` | Liste cibles avec checkboxes | Sélectionner (max 10), Lancer |
| `generating` | Scripts en cours de génération | Progress bar, Pause |
| `ready` | Tous les scripts prêts | Démarrer exécution |
| `executing` | Exécution séquentielle active | Copier, Postulé, Suivant, Précédent |
| `paused` | Rafale mise en pause | Reprendre, Abandonner |
| `completed` | Toutes les cibles traitées | Résumé, Retour dashboard |

**Workflows attachés** :
- `selectionner-cibles` : Checkboxes avec limite 10
- `verifier-eligibilite` : Uniquement status='new' ou 'script-ready'
- `lancer-generation-batch` : Appel workflow backend
- `executer-sequentiel` : Navigation entre cibles
- `tracking-progression` : Compteur postulé/total

---

### Kanban

**Type** : Écran principal alternatif  
**Chemin** : `_app/frontend/kanban/`  
**Description** : Vue colonnes (En attente / Script prêt / Postulé / Erreur)

| État | Description | Actions |
|------|-------------|---------|
| `nominal` | 4 colonnes avec cartes | Glisser-déposer entre colonnes |
| `empty` | Aucune cible | Message + bouton ajout |
| `dragging` | Carte en déplacement | - |
| `filtered` | Filtre par tags actif | Réinitialiser |

**Colonnes** :
1. **En attente** : status='new' | 'processing'
2. **Script prêt** : status='script-ready'
3. **Postulé** : status='applied'
4. **Erreur** : status='error'

**Workflows attachés** :
- `charger-cibles-kanban` : Par colonne
- `deplacer-carte` : Changement statut via drag-drop
- `filtrer-tags` : Sélection multiple tags

---

### Arsenal (Profil Candidat)

**Type** : Écran  
**Chemin** : `_app/frontend/arsenal/`  
**Description** : Gestion du profil utilisateur pour génération scripts

| État | Description | Actions |
|------|-------------|---------|
| `nominal` | Profil affiché | Modifier |
| `editing` | Formulaire édition | Sauvegarder, Annuler |
| `saving` | Sync vers PouchDB | - |

**Champs** : Prénom, Nom, Email, Téléphone, LinkedIn, CV texte, Compétences

**Workflows attachés** :
- `charger-profil` : Depuis PouchDB
- `sauvegarder-profil` : Update PouchDB

---

### Settings

**Type** : Écran  
**Chemin** : `_app/frontend/settings/`  
**Description** : Configuration PouchDB, CouchDB, préférences

| État | Description | Actions |
|------|-------------|---------|
| `nominal` | Paramètres affichés | Modifier, Sauvegarder |
| `testing-connection` | Test connexion CouchDB | - |
| `sync-now` | Force sync manuelle | - |

**Paramètres** :
- URL CouchDB
- Mode offline/online
- Thème (rétro/moderne)
- Notifications activées

**Workflows attachés** :
- `tester-connexion-couchdb` : Ping serveur
- `forcer-sync` : PouchDB.sync()
- `exporter-donnees` : Export JSON

---

## Workflows globaux

**Dossier** : `_app/frontend/global/workflows/`

| Workflow | Description | Trigger |
|----------|-------------|---------|
| `initialiser-pouchdb` | Création base locale + indexes | App start |
| `sync-couchdb` | Sync bidirectionnelle continue | Background |
| `gerer-changements` | Réaction aux changements CouchDB | Changement document |
| `notifications` | Toasts succès/erreur | Action utilisateur |
| `offline-mode` | Détection connexion perdue | Event browser |

---

## Modèle de données par écran

### Dashboard
```javascript
// Charge depuis PouchDB
const cibles = await db.find({
  selector: { type: 'cible' },
  sort: [{ createdAt: 'desc' }]
});

// Compteurs par statut
const counts = {
  new: cibles.filter(c => c.status === 'new').length,
  processing: cibles.filter(c => c.status === 'processing').length,
  scriptReady: cibles.filter(c => c.status === 'script-ready').length,
  applied: cibles.filter(c => c.status === 'applied').length
};
```

### Détail Cible
```javascript
// Document complet
const cible = await db.get(cibleId);
// Affiche: title, company, status, generatedScript, etc.
```

---

## Navigation

```
┌────────────────────────────────────────┐
│  🔫 CV Rambo                [⚙️] [👤] │
├────────┬───────────────────────────────┤
│ 📊 Dash│                               │
│ ➕ Ajout│    CONTENU PRINCIPAL        │
│ 📋 Kanb│                               │
│ 🎯 Rafale (si sélection)              │
│ ⚔️ Ars│                               │
│ ⚙️ Sett│                               │
└────────┴───────────────────────────────┘
```

---

## Synthèse écrans

| Écran | Type | Nb états | Features liées |
|-------|------|----------|----------------|
| `dashboard` | Principal | 5 | F-004, F-013 |
| `ajout-url` | Modal/Page | 5 | F-004 |
| `detail-cible` | Principal | 6 | F-004, F-007 |
| `mode-rafale` | Principal | 6 | F-010 |
| `kanban` | Principal | 4 | F-005, F-006 |
| `arsenal` | Secondaire | 3 | F-001 |
| `settings` | Secondaire | 3 | F-020 |

**Total : 7 écrans + 15 workflows frontend**
