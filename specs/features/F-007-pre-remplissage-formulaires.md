# F-007 : Pré-remplissage et soumission automatique des formulaires (Ollama)

**Personas** : Candidat en recherche d'emploi sur une page d'offre avec formulaire de candidature
**Contexte** : Le workflow complet fonctionne via Ollama Cloud API : le code HTML de la page est envoyé à Ollama qui analyse les questions du formulaire, génère des réponses adaptées depuis le profil du candidat, retourne un script JavaScript pour remplir les champs, puis génère et exécute un second script pour soumettre automatiquement la candidature.

## User Stories

### US-007-1 (Capture HTML)
En tant que système
Je veux capturer le code HTML complet de la page contenant le formulaire
Afin de l'envoyer à Ollama Cloud API pour analyse.

### US-007-2 (Analyse Ollama)
En tant que système
Je veux envoyer le HTML à Ollama Cloud API avec un prompt structuré
Afin d'identifier tous les champs du formulaire et leurs labels/questions.

### US-007-3 (Génération réponses)
En tant que système
Je veux que Ollama génère des réponses automatiques basées sur le profil du candidat (CV, expériences, compétences, informations personnelles)
Afin de pré-remplir intelligemment chaque champ.

### US-007-4 (Génération script)
En tant que système
Je veux recevoir un script JavaScript exécutable qui remplit les champs identifiés
Afin de l'injecter dans la page et remplir le formulaire.

### US-007-5 (Contrôle utilisateur - remplissage)
En tant que candidat
Je veux voir un bouton "Analyser et remplir" qui déclenche le processus Ollama de remplissage
Afin de garder le contrôle sur quand l'IA intervient.

### US-007-6 (Soumission automatique)
En tant que candidat
Je veux un bouton "Soumettre automatiquement" qui génère et exécute un script de soumission via Ollama
Afin de finaliser ma candidature sans intervention manuelle.

### US-007-7 (Suivi post-soumission)
En tant que candidat
Je veux que la cible liée passe automatiquement dans la colonne "Impact" après soumission réussie
Afin de suivre l'avancement de mes candidatures.

## Critères d'acceptation

**Phase 1 : Remplissage**
- Un bouton "Analyser et remplir" apparaît dans l'**overlay injecté** quand une page avec formulaire est active.
- Le clic capture le HTML complet (`document.documentElement.outerHTML`) et l'envoie à Ollama Cloud API.
- Le prompt Ollama inclut : le HTML du formulaire + le profil JSON du candidat (extrait de PouchDB).
- La réponse Ollama doit être un objet JSON contenant : `{ script: "...", fields: [{ selector, value, confidence }] }`.
- Le script généré est injecté via `chrome.scripting.executeScript` et remplit les champs.
- Les champs non identifiés avec confiance > 80% sont laissés vides (alerte visuelle).

**Phase 2 : Soumission**
- Après remplissage réussi, un bouton "Soumettre automatiquement" devient actif.
- Le clic capture à nouveau le HTML de la page (pour capturer l'état actuel) et l'envoie à Ollama avec prompt : "Génère un script JS pour soumettre ce formulaire de candidature".
- La réponse Ollama doit être un objet JSON contenant : `{ script: "...", submitButtonSelector, confirmationIndicators }`.
- Le script de soumission est injecté et exécuté automatiquement.
- Une surveillance détecte la soumission réussie (redirection, message de confirmation, changement de DOM).
- Après soumission confirmée, la cible liée passe en colonne "Impact" du Kanban.
- Un toast "Mission accomplie" s'affiche pendant 3 secondes.

**Logs console :**
- `[FILL] ollama-request-sent` avec la taille du HTML.
- `[FILL] script-received` avec le nombre de champs identifiés.
- `[FILL] fields-filled` avec le nombre de champs effectivement remplis.
- `[SUBMIT] ollama-request-sent` pour la demande de génération du script de soumission.
- `[SUBMIT] script-generated` avec un hash du script.
- `[SUBMIT] script-executed` ou `[SUBMIT] script-error` après tentative.
- `[SUBMIT] success-confirmed` quand la soumission est détectée comme réussie.
- `[KANBAN] moved-to-impact <targetId>` quand la cible est déplacée.
