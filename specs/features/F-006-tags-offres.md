# F-006 : Tags sur les offres

**Personas** : Candidat en recherche d'emploi
**Contexte** : L'utilisateur veut catégoriser ses cibles (priorité, type, feeling).

## User Stories

### US-006-1
En tant que candidat
Je veux ajouter un ou plusieurs tags à une cible
Afin de la catégoriser (ex: #CiblePrioritaire).

### US-006-2
En tant que candidat
Je veux filtrer le Kanban par tag
Afin de ne voir que les cibles d'une catégorie.

### US-006-3
En tant que candidat
Je veux que certaines colonnes restreignent le déplacement de cartes
Afin d'éviter les erreurs de manipulation sur les colonnes sensibles (première colonne et colonnes de postulation).

## Critères d'acceptation

- Une cible peut avoir 0 à N tags.
- Tags proposés par défaut : #CiblePrioritaire, #MissionImpossible, #OnTenteLeCoup, #Désespéré.
- L'utilisateur peut ajouter un tag libre (texte libre avec `#`).
- Un filtre par tag en haut du Kanban masque les cibles d'autres tags.
- Un log console `[TAG] added` ou `[TAG] filtered` apparaît.
- **Drag & Drop restreint** : La première colonne et les colonnes de postulation sont en "drop interdit" (impossible d'y déposer une carte).
- Un log console `[DRAG] drop-denied` apparaît si tentative de drop sur colonne restreinte.


