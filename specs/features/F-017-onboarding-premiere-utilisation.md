# F-017 : Onboarding première utilisation

**Personas** : Nouveau candidat qui vient d'installer l'extension
**Contexte** : L'extension peut intimider (vocabulaire guerrier, nombreuses options). Un parcours guidé est nécessaire — **priorité absolue : collecter le profil du candidat (CV, expériences, compétences)** pour alimenter l'auto-fill. 

**Personas** : Nouveau candidat qui vient d'installer l'extension
**Contexte** : L'extension peut intimider (vocabulaire guerrier, nombreuses options). Un parcours guidé est nécessaire.

## User Stories

### US-017-1
En tant que nouveau candidat
Je veux importer mon CV existant ou saisir mes informations (expériences, compétences, contact)
Afin que l'extension puisse auto-remplir mes futures candidatures.

### US-017-1a
En tant que candidat
Je veux pouvoir uploader mon CV (PDF/DOCX) pour extraction automatique des données
Afin de gagner du temps sur la saisie manuelle.

### US-017-1b
En tant que candidat
Je veux vérifier et corriger les informations extraites de mon CV
Afin de m'assurer que mon profil est exact.

### US-017-2
En tant que candidat
Je veux pouvoir revoir le tutoriel plus tard
Afin de me rafraîchir la mémoire.

## Critères d'acceptation

- **Étape 1 (Obligatoire)** : L'overlay d'onboarding s'injecte automatiquement au premier clic sur l'icône si `onboardingDone` est false. Full viewport (100vh/100vw) avec backdrop.
- L'utilisateur ne peut pas interagir avec le site sous-jacent tant que l'étape 1 n'est pas complétée (modal blocking).
- **Étape 2** : Vérification des données extraites avec possibilité de correction.
- **Étape 3** : Démonstration guidée : capturer une première offre, organiser le Kanban, pré-remplir un formulaire.
- Chaque étape a un bouton "Suivant" et "Passer" (sauf l'étape 1 qui doit être complétée).
- Le flag `onboardingDone` et le profil sont stockés dans PouchDB.
- Un bouton "Revoir le tutoriel" et "Modifier mon profil" sont disponibles dans les settings.
- Logs console : `[ONBOARDING] profile-captured`, `[ONBOARDING] step-<n>`, `[ONBOARDING] completed`.
