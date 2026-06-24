# F-007 : Génération de Script de Candidature

**Personas** : Candidat en recherche d'emploi
**Contexte** : Le système génère un script JavaScript personnalisé pour chaque offre. L'utilisateur copie ce script et l'exécute dans la console du site cible pour remplir automatiquement le formulaire.

---

## User Stories

### US-007-1 (Génération automatique)
En tant que système
Je veux générer un script JavaScript personnalisé pour chaque offre
Afin que l'utilisateur puisse remplir automatiquement les formulaires.

**Critères d'acceptation**
- Déclenché automatiquement quand une cible passe en statut `new`
- Scraping de la page avec Puppeteer
- Extraction des champs du formulaire (input, textarea, select)
- Appel API Ollama avec prompt spécialisé
- Génération de code JavaScript minifié
- Stockage du script dans le document CouchDB
- Mise à jour statut : `processing` → `script-ready`

### US-007-2 (Afficher script)
En tant que candidat
Je veux voir le script généré avec des instructions claires
Afin de pouvoir l'exécuter facilement.

**Critères d'acceptation**
- Affichage du code avec syntax highlighting
- Bouton "📋 Copier dans le presse-papiers"
- Instructions étape par étape :
  1. "Ouvrez l'URL de l'offre dans un nouvel onglet"
  2. "Ouvrez la console développeur (F12 → onglet Console)"
  3. "Collez le script ci-dessous"
  4. "Appuyez sur Entrée"
  5. "Le formulaire se remplit automatiquement"
- Avertissement : "⚠️ N'exécutez ce script que sur la page de l'offre concernée"

### US-007-3 (Valider exécution)
En tant que candidat
Je veux confirmer que j'ai postulé après avoir exécuté le script
Afin de mettre à jour mon suivi.

**Critères d'acceptation**
- Bouton "✓ J'ai postulé" après copie du script
- Popup de confirmation : "Confirmez-vous avoir postulé à cette offre ?"
- Changement de statut : `script-ready` → `applied`
- Mise à jour du Kanban (colonne "Impact")
- Empêche l'utilisateur de re-générer un script pour cette offre

---

## Architecture de génération

### Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   CouchDB   │────▶│  Puppeteer  │────▶│  Extraction │────▶│   Ollama    │
│  (new URL)  │     │   (Scrape)  │     │    HTML     │     │  (Gen JS)   │
└─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                   │
                            ┌─────────────┐                        │
                            │   CouchDB   │◄───────────────────────┘
                            │  (Update)   │  Script généré
                            └─────────────┘
```

### Prompt Ollama

```javascript
const promptTemplate = `
Tu es un expert en manipulation DOM et automatisation web.

CONTEXTE:
- URL de l'offre: {{url}}
- Titre: {{title}}
- Entreprise: {{company}}
- HTML du formulaire: {{formHtml}}

DONNÉES DU CANDIDAT:
- Prénom: {{firstName}}
- Nom: {{lastName}}
- Email: {{email}}
- Téléphone: {{phone}}
- LinkedIn: {{linkedin}}
- CV texte: {{cvText}}
- Lettre de motivation: {{coverLetter}}

MISSION:
Génère un script JavaScript IIFE (Immediately Invoked Function Expression) qui:
1. Détecte automatiquement les champs du formulaire de candidature
2. Remplit chaque champ avec la donnée appropriée du candidat
3. Gère les cas où un champ n'existe pas (sans erreur)
4. Coche les checkbox "J'accepte les conditions" si présentes
5. Clique sur le bouton de soumission ou appelle form.submit()
6. Affiche un message de succès dans la console

RÈGLES:
- Code minifié sur une seule ligne pour faciliter copier-coller
- Pas de dépendances externes
- Gestion des champs avec attributs name, id, ou placeholder
- Commentaires explicites en français dans le code
- Ne jamais utiliser de variables globales
- Fallbacks pour chaque sélecteur

FORMAT DE SORTIE:
Retourne UNIQUEMENT le code JavaScript, sans markdown, sans explication.
Le script doit être prêt à être copié-collé directement dans la console.

EXEMPLE:
(function(){const d={{firstName:"John",lastName:"Doe",...}};const f=document.querySelector('form');if(f){/* remplissage champs */;f.submit();console.log("✅ Candidature envoyée !");}})();
`;
```

---

## Exemple de script généré

### Entrée
```
URL: https://linkedin.com/jobs/view/123
Titre: Développeur Fullstack
Entreprise: TechCorp
Candidat: { firstName: "Oswald", lastName: "Bernard", email: "oswald@example.com" }
```

### Sortie (script généré)
```javascript
(function(){const d={firstName:"Oswald",lastName:"Bernard",email:"oswald@example.com",phone:"+33612345678",linkedin:"linkedin.com/in/oswald"};const f=document.querySelector('form[role="form"], form[data-testid*="apply"], #application-form')||document.querySelector('form');if(!f){console.error("❌ Formulaire non trouvé");return;}const fill=(s,v)=>{const el=f.querySelector(s)||document.getElementById(s.replace('[name=','').replace(']',''))||document.querySelector('[placeholder*='+s+']');if(el){el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}};fill('[name="firstName"]',d.firstName);fill('[name="lastName"]',d.lastName);fill('[name="email"]',d.email);fill('[name="phone"]',d.phone);fill('[name="linkedin"]',d.linkedin);const submitBtn=f.querySelector('[type="submit"], button[data-testid*="submit"], .apply-button')||f.querySelector('button:last-child');if(submitBtn){submitBtn.click();console.log("✅ Formulaire soumis avec succès !");}else{f.submit();console.log("✅ Formulaire soumis !");}})();
```

---

## Statuts de génération

| Statut | Signification | Action utilisateur |
|--------|----------------|-------------------|
| `generating` | Ollama est en train de générer le script | Attendre |
| `script-ready` | Script prêt, affiché à l'utilisateur | Copier + exécuter |
| `executed` | L'utilisateur a confirmé avoir postulé | - |

---

## Logs workflow

- `[SCRIPT] generation-started <cibleId>` : Début génération
- `[SCRIPT] scraped <cibleId>` : Scraping réussi
- `[SCRIPT] prompt-built <cibleId>` : Prompt préparé
- `[SCRIPT] ollama-called <cibleId>` : Appel Ollama
- `[SCRIPT] generated <cibleId> <scriptLength>` : Script généré
- `[SCRIPT] saved <cibleId>` : Sauvegardé dans CouchDB
- `[SCRIPT] error <cibleId> <reason>` : Erreur de génération

---

## Gestion des erreurs

| Scénario | Comportement |
|----------|--------------|
| Ollama timeout | Retry 3x puis statut `error` |
| Script mal formé | Regénération avec prompt corrigé |
| Scraping échoué | Génération basée sur URL uniquement (moins précis) |
| Page sans formulaire | Message : "Aucun formulaire détecté, candidature manuelle nécessaire" |

---

## Comparaison avec ancienne approche

| Approche | Plugin Chrome | Script Console (Nouveau) |
|----------|---------------|--------------------------|
| Injection | Automatique via content script | Manuel par utilisateur (console) |
| Détection formulaire | DOM access direct | Via scraping Puppeteer + IA |
| Remplissage | Automatique | Script exécuté par utilisateur |
| Soumission | Peut être auto | Manuelle ou via script |
| Flexibilité | Limitée (sites connus) | Universelle (IA adapte) |
| Contrôle utilisateur | Faible | Total (validation avant exec) |
