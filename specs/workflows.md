# Inventaire des workflows

**Source** : specs/features/valide/*.md  
**Date** : 2026-06-23  
**Total** : 35 workflows

---

## F-001 : Arsenal CV dynamique

### Workflows frontend (écran : arsenal)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `charger-profil` | `specs/_app/frontend/arsenal/workflows/charger-profil/` | Charger le profil complet depuis PouchDB |
| `sauver-experience` | `specs/_app/frontend/arsenal/workflows/sauver-experience/` | Sauvegarder une expérience dans PouchDB |
| `sauver-competence` | `specs/_app/frontend/arsenal/workflows/sauver-competence/` | Sauvegarder une compétence dans PouchDB |
| `sauver-projet` | `specs/_app/frontend/arsenal/workflows/sauver-projet/` | Sauvegarder un projet dans PouchDB |
| `editer-entree` | `specs/_app/frontend/arsenal/workflows/editer-entree/` | Éditer une entrée existante du profil |
| `supprimer-entree` | `specs/_app/frontend/arsenal/workflows/supprimer-entree/` | Supprimer une entrée du profil |

---

## F-002 : Mode Journaliste (enrichissement CV par Ollama)

### Workflows frontend (écran : journaliste)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `lancer-session` | `specs/_app/frontend/journaliste/workflows/lancer-session/` | Démarrer une session de questions IA |
| `envoyer-question` | `specs/_app/frontend/journaliste/workflows/envoyer-question/` | Envoyer la réponse et recevoir question suivante |
| `ignorer-question` | `specs/_app/frontend/journaliste/workflows/ignorer-question/` | Passer à la question suivante sans répondre |

---

## F-003 : Export CV (Word .docx)

### Workflows frontend (écran : arsenal)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `generer-docx` | `specs/_app/frontend/arsenal/workflows/generer-docx/` | Générer et télécharger le fichier Word |

---

## F-004 : Capture d'offre en 1 clic

### Workflows frontend (écran : capture)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `detecter-page` | `specs/_app/frontend/capture/workflows/detecter-page/` | Détecter si la page active est une offre d'emploi |
| `extraire-donnees` | `specs/_app/frontend/capture/workflows/extraire-donnees/` | Extraire automatiquement titre, URL, entreprise, description |
| `verifier-doublon` | `specs/_app/frontend/capture/workflows/verifier-doublon/` | Vérifier si l'URL existe déjà dans le Kanban |
| `ajouter-liste` | `specs/_app/frontend/capture/workflows/ajouter-liste/` | Créer une cible en colonne "En attente" |
| `tirer-direct` | `specs/_app/frontend/capture/workflows/tirer-direct/` | Créer une cible ET déclencher F-007 immédiatement |

---

## F-005 : Kanban des cibles (4 colonnes)

### Workflows frontend (écran : kanban)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `charger-cibles` | `specs/_app/frontend/kanban/workflows/charger-cibles/` | Charger toutes les cibles depuis PouchDB |
| `deplacer-cible` | `specs/_app/frontend/kanban/workflows/deplacer-cible/` | Glisser-déposer une carte vers une autre colonne |
| `mettre-a-jour-statut` | `specs/_app/frontend/kanban/workflows/mettre-a-jour-statut/` | Persister le changement de statut dans PouchDB |

---

## F-006 : Tags sur les offres

### Workflows frontend (écran : kanban)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `ajouter-tag` | `specs/_app/frontend/kanban/workflows/ajouter-tag/` | Ajouter un tag à une cible |
| `retirer-tag` | `specs/_app/frontend/kanban/workflows/retirer-tag/` | Retirer un tag d'une cible |
| `gerer-tags-defaut` | `specs/_app/frontend/kanban/workflows/gerer-tags-defaut/` | Gérer les tags par défaut et personnalisés |
| `valider-drop` | `specs/_app/frontend/kanban/workflows/valider-drop/` | Valider/refuser le drop selon restrictions colonne |

---

## F-007 : Pré-remplissage et soumission automatique des formulaires

### Workflows frontend (écran : capture)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `analyser-formulaire` | `specs/_app/frontend/capture/workflows/analyser-formulaire/` | Capturer HTML et envoyer à Ollama pour analyse |
| `remplir-champs` | `specs/_app/frontend/capture/workflows/remplir-champs/` | Injecter le script généré pour remplir les champs |
| `generer-script-soumission` | `specs/_app/frontend/capture/workflows/generer-script-soumission/` | Demander à Ollama de générer le script de soumission |
| `soumettre-formulaire` | `specs/_app/frontend/capture/workflows/soumettre-formulaire/` | Exécuter le script de soumission et détecter succès |

---

## F-010 : Mode rafale

### Workflows frontend (écran : kanban)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `selectionner-cibles` | `specs/_app/frontend/kanban/workflows/selectionner-cibles/` | Sélectionner/désélectionner des cibles pour rafale |
| `configurer-rafale` | `specs/_app/frontend/kanban/workflows/configurer-rafale/` | Configurer délai et nombre de cibles |
| `executer-rafale` | `specs/_app/frontend/kanban/workflows/executer-rafale/` | Lancer la séquence de candidatures automatiques |
| `interrompre-rafale` | `specs/_app/frontend/kanban/workflows/interrompre-rafale/` | Arrêter le mode rafale en cours |

---

## F-011 : QG Tactique (tableau de bord)

### Workflows frontend (écran : dashboard)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `calculer-stats` | `specs/_app/frontend/dashboard/workflows/calculer-stats/` | Calculer les statistiques depuis les cibles PouchDB |
| `afficher-graphique` | `specs/_app/frontend/dashboard/workflows/afficher-graphique/` | Afficher l'évolution sur 7 jours (optionnel) |

---

## F-012 : Design rétro action movie 80s

### Workflows frontend globaux

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `appliquer-theme` | `specs/_app/frontend/global/workflows/appliquer-theme/` | Appliquer le CSS rétro 80s à l'overlay injecté |
| `animer-recul` | `specs/_app/frontend/global/workflows/animer-recul/` | Animation recul des boutons au clic |
| `afficher-loader-munitions` | `specs/_app/frontend/global/workflows/afficher-loader-munitions/` | Afficher le loader en jauge de munitions |

---

## F-013 : Stockage local persistant (PouchDB)

### Workflows frontend globaux

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `initialiser-pouchdb` | `specs/_app/frontend/global/workflows/initialiser-pouchdb/` | Initialiser les bases PouchDB au démarrage |
| `sauvegarder-donnees` | `specs/_app/frontend/global/workflows/sauvegarder-donnees/` | Persister les données dans PouchDB |
| `restaurer-etat` | `specs/_app/frontend/global/workflows/restaurer-etat/` | Restaurer l'état complet au chargement de l'overlay |

---

## F-016 : Filtrage Kanban par tags

### Workflows frontend (écran : kanban)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `filtrer-par-tag` | `specs/_app/frontend/kanban/workflows/filtrer-par-tag/` | Filtrer les cibles visibles par tag |
| `reinitialiser-filtre` | `specs/_app/frontend/kanban/workflows/reinitialiser-filtre/` | Réinitialiser le filtre pour voir toutes les cibles |

---

## F-017 : Onboarding première utilisation

### Workflows frontend (écran : onboarding)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `importer-cv` | `specs/_app/frontend/onboarding/workflows/importer-cv/` | Uploader et extraire données d'un CV PDF/DOCX |
| `completer-profil` | `specs/_app/frontend/onboarding/workflows/completer-profil/` | Saisie manuelle du profil candidat |
| `verifier-extractions` | `specs/_app/frontend/onboarding/workflows/verifier-extractions/` | Vérifier et corriger les données extraites |
| `parcours-tutoriel` | `specs/_app/frontend/onboarding/workflows/parcours-tutoriel/` | Démonstration guidée capture/Kanban/fill |
| `completer-onboarding` | `specs/_app/frontend/onboarding/workflows/completer-onboarding/` | Marquer l'onboarding comme terminé |

---

## F-018 : Notifications et feedback visuel

### Workflows frontend globaux

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `afficher-toast-succes` | `specs/_app/frontend/global/workflows/afficher-toast-succes/` | Afficher un toast de succès |
| `afficher-toast-erreur` | `specs/_app/frontend/global/workflows/afficher-toast-erreur/` | Afficher un toast d'erreur |

---

## F-019 : Gestion d'erreurs

### Workflows frontend globaux

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `capter-erreur` | `specs/_app/frontend/global/workflows/capter-erreur/` | Capter et journaliser une erreur |
| `stocker-erreur` | `specs/_app/frontend/global/workflows/stocker-erreur/` | Persister l'erreur dans PouchDB `error-logs` |
| `reessayer-ollama` | `specs/_app/frontend/global/workflows/reessayer-ollama/` | Tentative de reprise sur erreur Ollama |
| `exporter-logs` | `specs/_app/frontend/global/workflows/exporter-logs/` | Exporter les logs d'erreurs en JSON |

---

## F-020 : Configuration et settings

### Workflows frontend (écran : settings)

| Workflow | Dossier spec | Description |
|----------|--------------|-------------|
| `charger-settings` | `specs/_app/frontend/settings/workflows/charger-settings/` | Charger les préférences depuis PouchDB |
| `sauver-setting` | `specs/_app/frontend/settings/workflows/sauver-setting/` | Sauvegarder une option de configuration |
| `valider-cle-api` | `specs/_app/frontend/settings/workflows/valider-cle-api/` | Valider le format de la clé API Ollama |

---

## Récapitulatif par écran

| Écran | Nombre de workflows |
|-------|---------------------|
| `arsenal` | 7 workflows |
| `kanban` | 11 workflows |
| `dashboard` | 2 workflows |
| `capture` | 7 workflows |
| `settings` | 3 workflows |
| `onboarding` | 5 workflows |
| `journaliste` | 3 workflows |

## Récapitulatif par type

| Type | Nombre | Workflows |
|------|--------|-----------|
| **Frontend écran-spécifique** | 38 | Tous liés à un écran |
| **Frontend global** | 7 | `appliquer-theme`, `animer-recul`, `afficher-loader-munitions`, `initialiser-pouchdb`, `sauvegarder-donnees`, `restaurer-etat`, `afficher-toast-succes`, `afficher-toast-erreur`, `capter-erreur`, `stocker-erreur`, `reessayer-ollama`, `exporter-logs` |
| **Backend** | 0 | Aucun backend nécessaire - tout est local |

---

**Note** : Aucun workflow backend n'est requis car toutes les opérations sont effectuées localement dans le navigateur via PouchDB (IndexedDB) et les appels à Ollama Cloud API se font directement depuis le frontend de l'extension Chrome.
