# F-013 : Stockage local persistant (PouchDB)

**Personas** : Candidat (transverse — toutes les features passent par là)
**Contexte** : Aucune donnée ne doit partir sur un cloud tiers. Tout reste dans le navigateur.

## User Stories

### US-013-1
En tant que candidat
Je veux que toutes mes données (profil, cibles, tags, stats) soient stockées localement via PouchDB
Afin de préserver ma vie privée et bénéficier d'une base de données indexée performante.

### US-013-2
En tant que candidat
Je veux retrouver mes données après fermeture du navigateur
Afin de ne rien perdre.

## Critères d'acceptation

- Toutes les écritures passent par **PouchDB** (stockage IndexedDB local).
- Une réouverture du popup après fermeture restaure l'état complet (profil + cibles).
- Aucune requête réseau sortante ne véhicule les données utilisateur (synchro désactivée par défaut).
- Un log console `[STORAGE] pouchdb-persisted` apparaît après chaque écriture.
