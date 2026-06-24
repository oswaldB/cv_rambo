# F-004 : Capture d'offre en 1 clic

**Personas** : Candidat en recherche d'emploi naviguant sur des sites d'offres (LinkedIn, WTTJ, etc.)
**Contexte** : L'utilisateur tombe sur une offre intéressante et veut l'ajouter à son Kanban sans friction. Deux options s'offrent à lui selon son mode de travail.

## User Stories

### US-004-1 (Capture simple - Ajouter à la liste)
En tant que candidat
Je veux capturer une offre et l'ajouter à mon Kanban sans postuler immédiatement
Afin de la traiter plus tard en mode rafale ou manuellement.

### US-004-2 (Capture rapide - Tirer direct)
En tant que candidat
Je veux capturer une offre ET postuler immédiatement en un seul clic
Afin de candidater rapidement sans passer par le Kanban.

### US-004-3 (Extraction automatique)
En tant que système
Je veux extraire automatiquement les informations clés de l'offre (titre, entreprise, URL, description)
Afin de peupler la fiche cible sans saisie manuelle.

## Critères d'acceptation

**Injection de l'interface dans la page active** :
- L'interface CV Rambo s'injecte comme un overlay (100vw x 100vh) dans le DOM de la page courante via content script.
- L'overlay utilise `position: fixed` avec `z-index: 999999` pour passer au-dessus de tout.
- Un backdrop semi-transparent masque le site sous-jacent pendant l'utilisation.

**Boutons d'action dans l'overlay** :
- Deux boutons sont présents quand une page d'offre est détectée :
  - **"Ajouter à la liste"** : capture l'offre et crée une cible dans le Kanban (colonne "En attente")
  - **"Tirer direct"** : capture l'offre, crée une cible, ET déclenche immédiatement F-007 (pré-remplissage + soumission automatique)
- Un clic sur l'icône CV Rambo injecte l'overlay dans la page avec ces deux options.
- Un bouton "X" ou appui sur Échap ferme l'overlay et désinjecte le DOM.

**Extraction des données** :
- Le système extrait automatiquement : titre de la page, URL, domaine (linkedin.com, welcometothejungle.com, etc.), description (tronquée si > 500 chars), date de capture.
- L'utilisateur peut éditer ces informations avant validation (popup de confirmation rapide).

**Stockage** :
- La cible est sauvegardée dans PouchDB avec statut "En attente" (si "Ajouter à la liste") ou "Impact" (si "Tirer direct" réussi).
- Le domaine est stocké comme métadonnée pour filtrage futur.

**Gestion des doublons** :
- Si l'URL existe déjà dans le Kanban, un warning est affiché avec option "Voir l'existant" ou "Créer quand même".

**Logs console** :
- `[CAPTURE] extract-success <url>` quand l'extraction automatique réussit.
- `[CAPTURE] extract-failed <url>` si l'extraction échoue (saisie manuelle requise).
- `[CAPTURE] added-to-list <url>` quand "Ajouter à la liste" est utilisé.
- `[CAPTURE] direct-shot-fired <url>` quand "Tirer direct" est utilisé.
- `[CAPTURE] duplicate-detected <url>` si l'offre existe déjà.
