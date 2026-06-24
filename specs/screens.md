# Inventaire des écrans frontend

**Source** : specs/features/*.md  
**Date** : 2026-06-24

---

## Architecture d'affichage

**Mode d'injection** : Tous les écrans sont injectés dans la page web active via content script comme des **overlays full viewport** (100vw x 100vh), pas comme des popups Chrome.

```
┌─────────────────────────────────────────┐
│  Site web (LinkedIn, WTTJ, etc.)        │
│  ┌─────────────────────────────────┐    │
│  │  CV Rambo Overlay (z-index max) │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │  Interface utilisateur  │    │    │
│  │  │  (arsenal, kanban, etc.)│    │    │
│  │  └─────────────────────────┘    │    │
│  │  [Backdrop semi-transparent]    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

**Impact technique** :
- Isolation via Shadow DOM ou iframe pour éviter les conflits CSS/JS
- Taille fixée en viewport units (vw/vh), pas en pixels
- Gestion du focus : trapped dans l'overlay jusqu'à fermeture
- Fermeture via bouton X ou touche Échap → désinjection complète du DOM

**Impact fonctionnel** :
- L'utilisateur reste contextuellement sur la page d'offre
- Pas de perte de focus/contexte lors de l'utilisation
- Possible d'avoir un mode "split" (overlay latéral) pour voir l'offre en parallèle

---

## Écrans par feature

### Note sur le rendu

Tous les écrans ci-dessous sont rendus dans un **overlay content-script injecté** (pas un popup Chrome) :
- Container : `position: fixed; width: 100vw; height: 100vh; z-index: 999999`
- Isolation : Shadow DOM encapsulé
- Fermeture : Bouton X ou Échap → `overlay.remove()`

### F-001 : Arsenal CV dynamique

#### Écran : arsenal-cv
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/arsenal-cv/mockups/`  
**Workflows attachés** : charger-profil, sauvegarder-experience, editer-experience, supprimer-experience

| État | Description | Source |
|------|-------------|--------|
| `nominal` | Liste des expériences/compétences affichée | US-001-1 |
| `empty` | Aucune expérience saisie (première utilisation) | cas limite |
| `loading` | Chargement depuis PouchDB | implicite |
| `error` | Erreur de stockage PouchDB | US-001-2 |
| `form-add-open` | Formulaire d'ajout d'expérience ouvert | US-001-1 |
| `form-edit-open` | Formulaire d'édition d'expérience ouvert | US-001-3 |
| `delete-confirm` | Modal de confirmation de suppression | US-001-3 |

---

### F-002 : Mode Journaliste (enrichissement CV)

#### Écran : mode-journaliste
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/mode-journaliste/mockups/`  
**Workflows attachés** : lancer-session, poser-question, sauvegarder-reponse, passer-question

| État | Description | Source |
|------|-------------|--------|
| `nominal` | Interface prête, bouton "Lancer" visible | US-002-1 |
| `loading` | Connexion à Ollama en cours | implicite |
| `question-displayed` | Question IA affichée, champ réponse actif | US-002-1 |
| `saving` | Sauvegarde de la réponse en cours | implicite |
| `completed` | Session terminée, résumé des enrichissements | US-002-3 |
| `error` | Erreur Ollama / timeout | critère erreur |
| `skipped` | Question passée, chargement suivante | US-002-3 |

---

### F-003 : Export CV (Word .docx)

#### Écran : export-cv
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/export-cv/mockups/`  
**Workflows attachés** : generer-docx, telecharger-fichier

| État | Description | Source |
|------|-------------|--------|
| `nominal` | Bouton "Exporter en Word" disponible | US-003-1 |
| `generating` | Génération du document en cours (spinner) | implicite |
| `success` | Document généré, lien de téléchargement actif | US-003-1 |
| `error` | Erreur de génération docx.js | critère erreur |
| `empty-profile` | Profil vide, impossible d'exporter | cas limite |

---

### F-004 : Capture d'offre en 1 clic

#### Écran : capture-offre
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/capture-offre/mockups/`  
**Workflows attachés** : detecter-offre, extraire-donnees, ajouter-liste, tirer-direct, verifier-doublon

| État | Description | Source |
|------|-------------|--------|
| `nominal` | Offre détectée, deux boutons visibles | US-004-1 |
| `loading` | Extraction automatique en cours | US-004-3 |
| `edit-confirm` | Popup de confirmation/édition des données extraites | US-004-3 |
| `duplicate-detected` | Warning doublon affiché avec options | US-004-1 |
| `added-success` | Confirmation "Ajouté à la liste" | US-004-1 |
| `direct-shot-fired` | Tir direct lancé, redirection | US-004-2 |
| `no-offer-detected` | Aucune offre détectée sur la page | cas limite |
| `error` | Extraction échouée | critère erreur |

---

### F-005 : Kanban des cibles (4 colonnes)

#### Écran : kanban
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/kanban/mockups/`  
**Workflows attachés** : charger-cibles, deplacer-carte, mettre-a-jour-statut

| État | Description | Source |
|------|-------------|--------|
| `nominal` | 4 colonnes affichées avec cartes | US-005-1 |
| `empty` | Aucune cible dans le Kanban | cas limite |
| `loading` | Chargement des cibles depuis PouchDB | implicite |
| `dragging` | Carte en cours de déplacement | US-005-2 |
| `drop-rejected` | Tentative de drop sur colonne interdite | F-006 |
| `filtered-by-tag` | Filtre actif, seules certaines cartes visibles | F-016 |
| `error` | Erreur de chargement PouchDB | critère erreur |

---

### F-006 : Tags sur les offres

*Intégré à l'écran Kanban - pas d'écran dédié*

---

### F-007 : Pré-remplissage formulaires

#### Écran : pre-remplissage
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/pre-remplissage/mockups/`  
**Workflows attachés** : analyser-formulaire, generer-script, injecter-script, verifier-soumission

| État | Description | Source |
|------|-------------|--------|
| `nominal` | Bouton "Analyser et remplir" disponible | US-007-5 |
| `analyzing` | Analyse Ollama du HTML en cours | US-007-2 |
| `fields-detected` | Champs identifiés, prêt à remplir | US-007-3 |
| `filling` | Script d'injection en cours d'exécution | US-007-4 |
| `filled-success` | Formulaire rempli, bouton "Soumettre" actif | US-007-4 |
| `low-confidence` | Certains champs non reconnus (alerte visuelle) | US-007-4 |
| `submitting` | Soumission automatique en cours | US-007-6 |
| `submit-success` | Soumission confirmée, toast "Mission accomplie" | US-007-6 |
| `error` | Erreur Ollama / injection / soumission | critère erreur |

---

### F-010 : Mode rafale

#### Écran : mode-rafale
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/mode-rafale/mockups/`  
**Workflows attachés** : configurer-rafale, selectionner-cibles, lancer-rafale, traiter-cible, arreter-rafale

| État | Description | Source |
|------|-------------|--------|
| `nominal` | Configuration affichée (nb cibles, délai) | US-010-3 |
| `empty` | Aucune cible en attente disponible | cas limite |
| `cibles-selected` | N cibles sélectionnées, prêt à lancer | US-010-1 |
| `running` | Mode rafale actif, compteur tick/total | US-010-2 |
| `processing` | Traitement d'une cible en cours | implicite |
| `target-success` | Cible traitée avec succès, passage suivante | US-010-2 |
| `target-failed` | Échec sur cible, log et continuation | US-010-2 |
| `paused` | Bouton "Arrêter" cliqué, séquence interrompue | US-010-2 |
| `completed` | Toutes les cibles traitées | US-010-2 |
| `error` | Erreur système pendant la rafale | critère erreur |

---

### F-011 : QG Tactique (tableau de bord)

#### Écran : tableau-bord
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/tableau-bord/mockups/`  
**Workflows attachés** : calculer-stats, afficher-compteurs, generer-graphique

| État | Description | Source |
|------|-------------|--------|
| `nominal` | 3 compteurs affichés avec données | US-011-1 |
| `empty` | Aucune donnée (première utilisation) | cas limite |
| `loading` | Calcul des statistiques en cours | implicite |
| `with-chart` | Graphique 7 jours affiché (optionnel) | US-011-2 |
| `error` | Erreur de calcul / lecture PouchDB | critère erreur |

---

### F-012 : Design rétro action movie 80s

*Global - s'applique à tous les écrans*

---

### F-013 : Stockage local persistant

*Global - transverse, pas d'écran dédié*

---

### F-016 : Filtrage Kanban par tags

*Intégré à l'écran Kanban (`filtered-by-tag` état)*

---

### F-017 : Onboarding première utilisation

#### Écran : onboarding
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/onboarding/mockups/`  
**Workflows attachés** : importer-cv, extraire-donnees, verifier-profil, afficher-demo

| État | Description | Source |
|------|-------------|--------|
| `step-1-profile` | Étape 1 : Import/saisie profil obligatoire | US-017-1 |
| `step-1-upload` | Upload PDF/DOCX en cours | US-017-1a |
| `step-1-extracting` | Extraction automatique en cours | US-017-1a |
| `step-2-verify` | Étape 2 : Vérification/correction données | US-017-1b |
| `step-3-demo` | Étape 3 : Démonstration guidée | US-017-2 |
| `completed` | Onboarding terminé, accès app débloqué | US-017-2 |
| `skip-disabled` | Bouton "Passer" désactivé (étape 1) | US-017-1 |
| `error` | Erreur extraction / sauvegarde | critère erreur |

---

### F-018 : Notifications et feedback visuel

*Global - composant overlay sur tous les écrans*

---

### F-019 : Gestion d'erreurs

#### Écran : logs-erreurs
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/logs-erreurs/mockups/`  
**Workflows attachés** : charger-logs, afficher-erreur, exporter-logs, vider-logs

| État | Description | Source |
|------|-------------|--------|
| `nominal` | Liste des erreurs stockées affichée | US-019-2 |
| `empty` | Aucune erreur dans l'historique | cas limite |
| `loading` | Chargement depuis PouchDB error-logs | implicite |
| `detail-view` | Vue détaillée d'une erreur (stack trace) | US-019-3 |
| `export-ready` | JSON d'erreurs prêt à télécharger | US-019-3 |
| `error` | Erreur d'accès à la base error-logs | meta |

---

### F-020 : Configuration et settings

#### Écran : settings
**Type** : écran lié  
**Chemin mockup** : `_app/frontend/settings/mockups/`  
**Workflows attachés** : charger-settings, sauvegarder-option, valider-api-key, toggle-feature

| État | Description | Source |
|------|-------------|--------|
| `nominal` | Tous les paramètres affichés et modifiables | US-020-1 |
| `loading` | Chargement des settings depuis PouchDB | implicite |
| `api-key-hidden` | Clé API masquée (dots) | US-020-3 |
| `api-key-visible` | Clé API affichée en clair | US-020-3 |
| `api-key-invalid` | Validation échouée (clé vide) | US-020-3 |
| `saved` | Confirmation de sauvegarde | US-020-2 |
| `error` | Erreur de sauvegarde PouchDB | critère erreur |

---

## Workflows globaux

**Dossier** : `_app/frontend/global/workflows/`

| Workflow | Description | Features liées |
|----------|-------------|----------------|
| `auth` | Vérifier que l'utilisateur a complété l'onboarding | F-017 |
| `logger` | Logger global frontend (émission de checkpoints console) | Toutes |
| `error-handler` | Capture globale des erreurs + toast + stockage | F-018, F-019 |
| `storage` | Accès PouchDB centralisé (CRUD abstraction) | F-013 |
| `notifications` | Système de toasts (succès/erreur/info) | F-018 |
| `theme-loader` | Chargement CSS thème rétro 80s | F-012 |
| `ollama-client` | Client HTTP pour Ollama Cloud API | F-002, F-007 |
| `page-detector` | Détection automatique des pages d'offres | F-004 |
| `drag-drop-manager` | Gestion du drag & drop Kanban | F-005, F-006 |
| `sound-effects` | Gestionnaire des effets sonores 8-bit | F-012, F-020 |

---

## Récapitulatif des écrans

| Écran | Type | Nb états | Features principales |
|-------|------|----------|---------------------|
| `arsenal-cv` | lié | 7 | F-001 |
| `mode-journaliste` | lié | 7 | F-002 |
| `export-cv` | lié | 5 | F-003 |
| `capture-offre` | lié | 8 | F-004 |
| `kanban` | lié | 7 | F-005, F-006, F-016 |
| `pre-remplissage` | lié | 9 | F-007 |
| `mode-rafale` | lié | 10 | F-010 |
| `tableau-bord` | lié | 5 | F-011 |
| `onboarding` | lié | 8 | F-017 |
| `logs-erreurs` | lié | 6 | F-019 |
| `settings` | lié | 7 | F-020 |

**Total : 11 écrans liés + 10 workflows globaux**
