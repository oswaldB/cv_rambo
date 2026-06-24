# F-019 : Gestion d'erreurs

**Personas** : Candidat
**Contexte** : Beaucoup de choses peuvent échouer : erreur PouchDB, Ollama timeout, formulaire non détecté, sélecteur obsolète.

## User Stories

### US-019-1
En tant que candidat
Je veux voir un message clair quand une fonctionnalité échoue
Afin de comprendre ce qui ne va pas.

### US-019-2
En tant que candidat
Je veux que les erreurs soient journalisées
Afin de pouvoir les signaler au développeur.

### US-019-3
En tant que développeur / candidat avancé
Je veux que les erreurs soient stockées dans une base PouchDB dédiée
Afin de pouvoir consulter l'historique des erreurs et faciliter le debug.

## Critères d'acceptation

- Toute erreur catchée affiche un toast d'erreur (cf. F-018).
- Toute erreur est loggée en console avec un préfixe `[ERROR]` et un contexte.
- Les erreurs Ollama (timeout, réseau) sont catchées et un message "Reprise..." est tenté.
- **Les erreurs sont stockées dans une base PouchDB `error-logs`** avec : timestamp, composant, message, stack trace.
- Un log console `[ERROR] <composant> <message>` apparaît pour chaque erreur capturée.
- Un bouton "Exporter les logs" dans les settings permet de télécharger les erreurs en JSON.
