# F-020 : Configuration et settings

**Personas** : Candidat
**Contexte** : L'utilisateur doit pouvoir activer/désactiver certaines fonctionnalités (sons, IA, mode rafale).

## User Stories

### US-020-1
En tant que candidat
Je veux accéder à une page de settings
Afin de personnaliser mon expérience.

### US-020-2
En tant que candidat
Je veux activer/désactiver les sons 8-bit
Afin de ne pas déranger en open space.

### US-020-3
En tant que candidat
Je veux configurer ma clé API Ollama Cloud
Afin d'utiliser la génération de scripts de soumission automatique (cf. F-009).

## Critères d'acceptation

- Un onglet "Settings" est accessible depuis le popup.
- Les options incluent : Sons activés, IA (Ollama) activée, **Clé API Ollama Cloud**, Délai mode rafale.
- Le champ "Clé API Ollama Cloud" est masqué (type password) avec bouton "Afficher/Masquer".
- Une validation basique vérifie que la clé n'est pas vide avant sauvegarde.
- Chaque option est sauvegardée dans PouchDB.
- Un log console `[SETTINGS] changed <option>=<value>` apparaît.
