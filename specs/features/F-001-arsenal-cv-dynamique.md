# F-001 : Arsenal CV dynamique

**Personas** : Candidat en recherche d'emploi (utilisateur principal)
**Contexte** : L'utilisateur doit construire un profil CV complet et réutilisable, qui servira de source de vérité pour toutes les postulations.

## User Stories

### US-001-1
En tant que candidat
Je veux saisir mes expériences, compétences et projets dans l'extension
Afin de disposer d'un profil structuré prêt à être injecté dans les formulaires.

### US-001-2
En tant que candidat
Je veux que mes données soient stockées localement via PouchDB
Afin de garder le contrôle de mes informations personnelles.

### US-001-3
En tant que candidat
Je veux pouvoir éditer et supprimer mes expériences à tout moment
Afin de maintenir mon profil à jour.

## Critères d'acceptation

- Une section "Arsenal" est accessible en injectant l'interface dans la page web active (overlay full viewport via content script).
- L'utilisateur peut ajouter une expérience (titre, entreprise, dates, description).
- L'utilisateur peut ajouter une compétence (libellé + niveau).
- L'utilisateur peut ajouter un projet (nom, lien, description).
- Les données sont persistées dans PouchDB après rechargement de Chrome.
- Un log console `[ARSENAL] saved` apparaît après chaque sauvegarde.
