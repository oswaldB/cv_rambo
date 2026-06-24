# F-002 : Mode Journaliste (enrichissement CV par Ollama)

**Personas** : Candidat en recherche d'emploi
**Contexte** : L'utilisateur a souvent du mal à formuler ses expériences. L'IA pose des questions ciblées pour enrichir le profil.

## User Stories

### US-002-1
En tant que candidat
Je veux que l'IA (Ollama Cloud / Minimax) me pose des questions sur mon parcours
Afin d'enrichir automatiquement les descriptions de mes expériences.

### US-002-2
En tant que candidat
Je veux répondre librement aux questions
Afin que mes réponses soient intégrées à mon profil.

### US-002-3
En tant que candidat
Je veux pouvoir refuser une question et passer à la suivante
Afin de garder le contrôle de l'enrichissement.

## Critères d'acceptation

- Un bouton "Mode Journaliste" lance une session de questions.
- L'IA envoie une question à la fois, affichée dans le popup.
- La réponse de l'utilisateur est sauvegardée et rattachée à l'expérience ciblée.
- Les échanges sont stockés localement.
- Un log console `[JOURNALISTE] question-asked` apparaît à chaque question envoyée.
- Un log console `[JOURNALISTE] answer-saved` apparaît après chaque réponse enregistrée.
