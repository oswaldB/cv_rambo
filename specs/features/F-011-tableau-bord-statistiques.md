# F-011 : QG Tactique (tableau de bord)

**Personas** : Candidat en recherche d'emploi
**Contexte** : L'utilisateur veut mesurer sa "guerre des talents" : combien de tirs, combien de touchés, combien de munitions restantes.

## User Stories

### US-011-1
En tant que candidat
Je veux voir le nombre total de candidatures envoyées
Afin de mesurer mon effort.

### US-011-2
En tant que candidat
Je veux voir le taux de retour positif (entretiens / candidatures)
Afin de jauger l'efficacité de mes candidatures.

### US-011-3
En tant que candidat
Je veux voir le nombre de cibles en attente
Afin de savoir combien il me reste à traiter.

## Critères d'acceptation

- 3 compteurs sont affichés dans le QG Tactique : "Balles tirées", "Taux de cibles touchées", "Munitions restantes".
- Les compteurs sont calculés en temps réel à partir des cibles du Kanban.
- Un graphique (optionnel) montre l'évolution sur 7 jours.
- Un log console `[DASHBOARD] stats-computed` apparaît à l'ouverture.
