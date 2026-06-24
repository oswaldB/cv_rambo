---
id: F-003-generer-docx
type: frontend
folder: specs/_app/frontend/export-cv/workflows/generer-docx/
description: Générer et télécharger le CV au format Word (.docx) depuis le profil PouchDB.
depends_on: [charger-profil]
screen: export-cv
global: false
mockup_entry: specs/_app/frontend/export-cv/mockups/nominal.html
---

# F-003-generer-docx : Générer le document Word

## Description

Générer un fichier CV au format Word (.docx) à partir des données du profil stockées dans PouchDB et déclencher son téléchargement.

## Étapes

```javascript
/**
 * @action Afficher l'écran Export avec le bouton "Exporter en Word"
 * @checkpoint screen-ready, le bouton est visible et actif (désactivé si profil vide)
 *
 * @implementation
 *   console.log('checkpoint:screen-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:screen-ready:end');
 */

/**
 * @action Cliquer sur le bouton "Exporter en Word (.docx)"
 * @checkpoint export-triggered, le bouton passe en état loading avec spinner
 *
 * @implementation
 *   console.log('checkpoint:export-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:export-triggered:end');
 */

/**
 * @action Récupérer toutes les données du profil depuis PouchDB
 * @checkpoint profile-fetched, les données {experiences, competences, projets, profil} sont chargées
 *
 * @implementation
 *   console.log('checkpoint:profile-fetched:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:profile-fetched:end');
 */

/**
 * @action Vérifier que le profil n'est pas vide
 * @checkpoint profile-validated, au moins une section contient des données
 *
 * @implementation
 *   console.log('checkpoint:profile-validated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:profile-validated:end');
 */

/**
 * @action Construire le document Word avec docx.js
 * @checkpoint docx-built, l'objet Document est créé avec les sections Profil, Expériences, Compétences, Éducation
 *
 * @implementation
 *   console.log('checkpoint:docx-built:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:docx-built:end');
 */

/**
 * @action Générer le fichier blob au format .docx
 * @checkpoint blob-generated, un Blob de type application/vnd.openxmlformats-officedocument.wordprocessingml.document est créé
 *
 * @implementation
 *   console.log('checkpoint:blob-generated:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:blob-generated:end');
 */

/**
 * @action Créer le lien de téléchargement avec nom de fichier
 * @checkpoint download-ready, le nom suit le format cv-rambo-<date>.docx
 *
 * @implementation
 *   console.log('checkpoint:download-ready:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:download-ready:end');
 */

/**
 * @action Déclencher le téléchargement automatique
 * @checkpoint download-triggered, le fichier est sauvegardé dans le dossier Téléchargements
 *
 * @implementation
 *   console.log('checkpoint:download-triggered:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:download-triggered:end');
 */

/**
 * @action Logger la sauvegarde en console
 * @checkpoint log-emitted, console affiche "[EXPORT] docx-saved"
 *
 * @implementation
 *   console.log('checkpoint:log-emitted:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:log-emitted:end');
 */

/**
 * @action Afficher la confirmation de téléchargement
 * @checkpoint success-shown, message "CV exporté avec succès" visible avec lien pour ré-telecharger
 *
 * @implementation
 *   console.log('checkpoint:success-shown:start');
 *   // ... exécution de l'action ...
 *   console.log('checkpoint:success-shown:end');
 */
```

## Mockups de référence

- `specs/_app/frontend/export-cv/mockups/nominal.html`
- `specs/_app/frontend/export-cv/mockups/generating.html`
- `specs/_app/frontend/export-cv/mockups/success.html`
- `specs/_app/frontend/export-cv/mockups/empty-profile.html`
- `specs/_app/frontend/export-cv/mockups/error.html`
