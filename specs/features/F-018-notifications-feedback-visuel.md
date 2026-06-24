# F-018 : Notifications et feedback visuel

**Personas** : Candidat
**Contexte** : L'utilisateur doit savoir quand une action réussit ou échoue — même en l'absence de rechargement de page.

## User Stories

### US-018-1
En tant que candidat
Je veux voir un toast "Mission accomplie" après chaque action réussie
Afin d'avoir un feedback positif.

### US-018-2
En tant que candidat
Je veux voir un toast d'erreur rouge en cas d'échec
Afin de comprendre ce qui s'est passé.

## Critères d'acceptation

- Les toasts apparaissent dans l'**overlay injecté** (position haut-droite ou bas-centre selon l'écran actif).
- Toasts succès : fond vert, icône ✓, durée 3s.
- Toasts erreur : fond rouge, icône ✗, durée 5s.
- Un log console `[TOAST] success` ou `[TOAST] error` apparaît.
