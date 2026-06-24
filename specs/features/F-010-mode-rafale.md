# F-010 : Mode rafale (10 offres en 5 minutes)

**Personas** : Candidat en mode "saturation du marché"
**Contexte** : L'utilisateur veut industrialiser sa recherche d'emploi. Le mode rafale permet de traiter en masse les cibles préalablement ajoutées à la liste. 
**Prérequis** : La capture d'offre (F-004) propose 2 boutons distincts :
- **"Ajouter à la liste"** : capture l'offre et la place dans le Kanban colonne "En attente" (sans postuler)
- **"Tirer direct"** : capture l'offre ET postule immédiatement (shortcut pour postulation rapide)

Le mode rafale utilise uniquement les cibles ajoutées via "Ajouter à la liste".

## User Stories

### US-010-1 (Sélection des cibles)
En tant que candidat
Je veux sélectionner dans mon Kanban les cibles à traiter en mode rafale
Afin de constituer une liste de candidatures à envoyer en masse.

### US-010-2 (Activation mode rafale)
En tant que candidat
Je veux activer le mode rafale qui postule automatiquement aux cibles sélectionnées
Afin de maximiser le volume de candidatures sans intervention manuelle.

### US-010-3 (Paramétrage du délai)
En tant que candidat
Je veux définir un délai minimum entre chaque soumission
Afin de ne pas être bloqué par les sites pour comportement suspect.

## Critères d'acceptation

**Sélection et préparation** :
- Une checkbox "Sélectionner pour rafale" apparaît sur chaque carte du Kanban (colonne "En attente" uniquement).
- Un bouton "Lancer le mode rafale (N cibles)" apparaît quand au moins une cible est sélectionnée.
- Un compteur affiche le nombre de cibles sélectionnées.

**Exécution du mode rafale** :
- Une option "Mode rafale" est disponible dans le popup avec paramétrage :
  - Nombre de cibles à traiter (défaut : 10, max : 50)
  - Délai entre tirs (défaut : 30 secondes, min : 10s)
- Chaque tir déclenche F-007 (pré-remplissage + soumission automatique) sur la cible sélectionnée.
- La cible passe en colonne "Impact" après soumission réussie.
- En cas d'erreur sur une cible, le mode rafale passe à la suivante et loggue l'échec.
- Un bouton "Arrêter" permet d'interrompre la séquence à tout moment.

**Logs console** :
- `[RAFALE] started` avec le nombre de cibles et le délai configuré.
- `[RAFALE] processing <targetId>` au début de chaque traitement.
- `[RAFALE] success <targetId>` ou `[RAFALE] failed <targetId>` après chaque tentative.
- `[RAFALE] tick <n>/<total>` à chaque itération.
- `[RAFALE] interrupted` ou `[RAFALE] done` à la fin.
