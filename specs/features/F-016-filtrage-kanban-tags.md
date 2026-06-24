# F-016 : Filtrage Kanban par tags

**Personas** : Candidat
**Contexte** : Avec 50+ cibles, le Kanban devient illisible. Le filtrage par tag est indispensable.

## User Stories

### US-016-1
En tant que candidat
Je veux cliquer sur un tag pour ne voir que les cibles portant ce tag
Afin de focaliser mon attention.

### US-016-2
En tant que candidat
Je veux réinitialiser le filtre
Afin de revoir toutes mes cibles.

## Critères d'acceptation

- Cliquer sur un tag (en haut du Kanban ou sur une carte) active le filtre correspondant.
- Seules les cibles avec ce tag sont visibles dans les 4 colonnes.
- Un bouton "Tous" réinitialise le filtre.
- Un log console `[FILTER] tag=<tag>` apparaît.
