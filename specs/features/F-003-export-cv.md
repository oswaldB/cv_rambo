# F-003 : Export CV (Word .docx)

**Personas** : Candidat en recherche d'emploi
**Contexte** : L'utilisateur peut avoir besoin d'envoyer son CV par d'autres canaux (email, site qui refuse l'auto-fill).

## User Stories

### US-003-1
En tant que candidat
Je veux exporter mon profil au format Word (.docx)
Afin de l'envoyer en pièce jointe classique ou le réutiliser.

### US-003-2
~~Export PDF~~ → Remplacé par Word (.docx) pour une édition facile.

## Critères d'acceptation

- Un bouton "Exporter en Word (.docx)" est présent dans l'interface.
- L'export utilise la librairie `docx.js` (ou équivalent) pour générer le fichier.
- Le fichier généré suit le format : `cv-rambo-<date>.docx`.
- Le document Word contient le CV mis en page avec les sections : profil, expériences, compétences, éducation.
- Un log console `[EXPORT] docx-saved` apparaît après téléchargement.
