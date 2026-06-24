# F-005 : Kanban des cibles (4 colonnes)

**Personas** : Candidat en recherche d'emploi
**Contexte** : L'utilisateur veut visualiser où en sont ses candidatures d'un coup d'œil.

## User Stories

### US-005-1
En tant que candidat
Je veux voir un Kanban avec 4 colonnes (En attente, Impact, Cible éliminée, Raté)
Afin de suivre l'état de chaque candidature.

### US-005-2
En tant que candidat
Je veux glisser-déposer une carte d'une colonne à l'autre
Afin de changer son statut.

## Critères d'acceptation

- 4 colonnes sont visibles dans l'**overlay injecté** : En attente, Impact, Cible éliminée, Raté.
- Chaque cible est représentée par une carte draggable.
- Le drag & drop d'une carte vers une colonne met à jour son statut.
- Le changement est persisté dans PouchDB.
- Un log console `[KANBAN] moved` apparaît avec id et nouvelle colonne.
