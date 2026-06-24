# 🔫 **CV Rambo**
*Le marché du travail est une jungle. **À force de tirer partout, vous allez bien finir par trouver un boulot.***

---

## 🎯 **Le Concept**
Vous en avez marre de postuler sans réponse ? **Passez en mode commando.**

**CV Rambo**, c’est l’outil ultime pour **inonder le marché de votre présence** et **forcer les portes** par la quantité et la persévérance. Inspiré par l’esthétique **action movie des années 80**, ce plugin Chrome transforme votre recherche d’emploi en **une mission de guérilla** :
- **Les offres d’emploi** = des **cibles à éliminer**.
- **Votre CV** = votre **arsenal** (prêt à tout écraser).
- **Chaque candidature** = une **balle** tirée en rafale.

**Votre objectif ?** **Saturer le marché jusqu’à ce qu’on vous remarque.**

---

## 💥 **Fonctionnalités : Votre Arsenal de Guerre**

### 1️⃣ **🎒 Votre Arsenal (CV Dynamique)**
- **Enregistrez vos expériences, compétences et projets** en 2 clics.
- **Mode Journaliste** :
  - **Ollama Cloud (Minimax)** pose des questions pour **enrichir automatiquement votre CV** (ex: *"Parlez-moi de votre expérience chez X"*, *"Quelles sont vos compétences clés ?"*).
  - Réponses stockées et intégrées à votre profil pour un **CV ultra-détaillé**.
- **Générez un CV ultra-rapide** (JSON/PDF) pour **ne jamais perdre de temps**.
- **Stockage local** : Vos données restent **à vous**, pas dans le cloud d’un GAFAM.
- **Prêt à l’emploi** : Un CV optimisé pour **tirer en rafale**.

### 2️⃣ **🎯 Ciblez les Ennemis (Kanban des Offres)**
- **Capturez les offres en 1 clic** depuis LinkedIn, Welcome to the Jungle, ou n’importe quel site.
- **Organisation en Kanban** :
  - **Colonnes glissables** (style Trello) pour suivre vos cibles :
    - ⏳ **En attente** (balle en vol)
    - 🎯 **Impact** (entretien obtenu)
    - ✅ **Cible éliminée** (offre acceptée)
    - ❌ **Raté** (mais on recommence)
- **Tagguez-les** : `#CiblePrioritaire`, `#MissionImpossible`, `#OnTenteLeCoup`, `#Désespéré`.

### 3️⃣ **🔫 Tirez en Rafale (Postulation Automatisée)**
- **Pré-remplissage instantané** des formulaires avec vos données.
- **Détection automatique** des champs (nom, email, expériences…).
- **Soumission en 1 clic** : Parce que **le temps, c’est de l’argent** (et vous en avez déjà perdu assez).
- **Mode rafale** : Postulez à **10 offres en 5 minutes**.

### 4️⃣ **📊 QG Tactique (Tableau de Bord)**
- **Suivez vos tirs** en temps réel.
- **Statistiques impitoyables** :
  - Nombre de **balles tirées** (candidatures envoyées).
  - Taux de **cibles touchées** (retours positifs).
  - **Munitions restantes** (offres en attente).
- **Design rétro action movie** : Parce que **la guerre des talents mérite un style**.

---

## 🛠 **Technologies : Votre Équipement**

| Élément               | Technologie                          |
|-----------------------|--------------------------------------|
| **Cœur de l'app**     | Chrome Extension API (Manifest V3)   |
| **Injection UI**       | Content Script + Shadow DOM/isolated iframe |
| **Dimensions**         | CSS Viewport units (100vw / 100vh)   |
| **Isolation**          | Shadow DOM pour éviter conflits CSS/JS |
| **Communication**      | Message passing (content ↔ background) |
| **IA**               | Ollama Cloud (Minimax)               |
| **Munitions**         | `chrome.storage.local` + PouchDB (pas de cloud) |
| **Interface**         | HTML5 + CSS3 (100% 80s action)       |
| **Kanban**           | Drag & Drop (Vanilla JS ou lib légère) |
| **Détection**         | Vanilla JS (DOM scraping via content script) |
| **Export CV**         | `jsPDF` (pour les PDF)                |
| **Sons**              | Bruits d'armes 8-bit (optionnel)      |

---

## 🚀 **Installation : Déploiement Éclair**

### 1. Clonez le dépôt
```bash
git clone https://github.com/ton-org/cv-rambo.git
cd cv-rambo
```

### 2. Chargez l’extension dans Chrome
1. Allez sur `chrome://extensions`.
2. Activez le **mode développeur**.
3. Cliquez sur **"Charger l’extension non empaquetée"** et sélectionnez `cv-rambo`.

### 3. **Injectez votre QG Tactique**
- Cliquez sur l'icône **🔫 CV Rambo** → l'interface s'injecte en **overlay full viewport (100vw x 100vh)** dans la page active.
- L'overlay apparaît au-dessus du site avec un backdrop semi-transparent.
- Vous restez sur la page d'offre tout en utilisant l'app (pas de perte de contexte).
- Fermeture via bouton X ou touche Échap → l'overlay disparaît complètement.

### 4. **Ciblez depuis n'importe où**
- Sur une offre d'emploi ? **Un clic pour la capturer** → l'overlay s'ouvre avec les données pré-extraites.
- Un formulaire à remplir ? **Un clic pour tirer** → remplissage auto depuis l'overlay.
- Mode rafale disponible directement dans l'overlay Kanban.

---

## 🎨 **Design : Esthétique Commando des Années 80**

### Palette de Couleurs (Style Action Movie)
```css
:root {
  --rambo-red: #FF0000;      /* Couleur des cibles (offres) */
  --camouflage-green: #2E8B57; /* Votre CV (arsenal) */
  --gunmetal-gray: #2F4F4F;  /* Fond (jungle) */
  --gold: #FFD700;           /* Accents (munitions, stars) */
  --text-white: #FFFFFF;     /* Texte */
}
```

### Polices (Style Military)
- **Titres** : `Bebas Neue` ou `Anton` (pour un effet **affiche de film d’action**).
- **Texte** : `Roboto Condensed` ou `Courier New` (pour le côté **rapport militaire**).

### Éléments Visuels à Intégrer
- **Cibles** = Offres d’emploi (à éliminer).
- **Ballons de dialogue** = Statuts (ex: "Mission accomplie !").
- **Barres de munitions** = Compteur de candidatures.
- **Explosions** = Animation quand une candidature est envoyée.

**Exemple CSS pour l'overlay injecté :**
```css
/* Container principal injecté dans le DOM */
#cv-rambo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  background: rgba(47, 79, 79, 0.95); /* gunmetal avec transparence */
  backdrop-filter: blur(4px);
}

/* Isolation du contenu */
#cv-rambo-root {
  all: initial; /* Reset CSS */
  width: 100%;
  height: 100%;
  font-family: 'Bebas Neue', sans-serif;
}

.icon {
  width: 2vw;  /* Responsive en fonction du viewport */
  height: 2vw;
  background-image: url('assets/rambo-sprites.png');
  image-rendering: crisp-edges;
}
```

### Animations (Effets de Film d’Action)
- **Boutons** : Effet "clic" avec **recule de l’arme** (comme un tir).
- **Chargement** : Barre de progression **style jauge de munitions**. 
- **Cibles** : Animation de **clignotement** (comme un ennemi repéré).
- **Kanban** : Glisser-déposer fluide pour déplacer les offres entre les colonnes.

---

## 📂 **Structure du Projet (Base Secrète)**

```
cv-rambo/
├── manifest.json          # Configuration de l'extension (permissions activeTab, scripting)
├── content/
│   ├── injector.js        # Injection du overlay dans le DOM (100vw x 100vh)
│   ├── overlay.html       # Template de l'interface full viewport
│   ├── overlay.css        # Styles avec vw/vh + isolation (Shadow DOM)
│   └── overlay.js         # Logique de l'app (arsenal, kanban, etc.)
├── background/
│   └── background.js      # Gestion des données PouchDB, Ollama API, messages
├── popup/
│   └── popup.html         # Mini popup : juste un bouton "Ouvrir QG Tactique"
├── assets/
│   ├── sprites.png        # Sprites rétro 80s
│   └── sounds/            # Effets sonores 8-bit
└── README.md
```

---

## 🔧 **Fonctionnement : Stratégie de Guerre**

### 1. **Mode Journaliste (Enrichissement du CV)**
- **Ollama Cloud (Minimax)** pose des questions pour **compléter automatiquement votre CV**.
- Exemples de prompts :
  - *"Décrivez votre rôle chez [Entreprise X] en 3 mots."*
  - *"Quelle est la compétence la plus sous-estimée dans votre domaine ?"*
  - *"Pourquoi devrions-nous vous embaucher ?"*
- Les réponses sont **stockées localement** et intégrées à votre arsenal.

### 2. **Repérer une Cible (Bookmark une Offre)**
- `content.js` détecte quand vous êtes sur une page d’offre.
- Un clic sur l’icône **CV Rambo** capture :
  - **Titre** de l’offre.
  - **URL**.
  - **Domaine** (LinkedIn, etc.).
- Les données sont stockées dans `chrome.storage.local` et **ajoutées au Kanban** (colonne *En attente*).

**Exemple de données :**
```json
{
  "cibles": [
    {
      "id": 1,
      "title": "Développeur Fullstack (Salaire indécent)",
      "url": "https://linkedin.com/...",
      "tags": ["#CiblePrioritaire", "#MissionImpossible"],
      "status": "En attente",
      "kanbanColumn": "En attente",
      "date": "2026-06-23"
    }
  ]
}
```

### 3. **Tirer une Balle (Postuler)**
- Détection des champs (`input`, `textarea`, `select`) sur la page.
- **Mapping automatique** avec vos données CV (ex: `firstName` → "Oswald").
- **Soumission en 1 clic** (si le formulaire le permet).
- **Mise à jour du Kanban** : La cible passe en *Impact* ou *Cible éliminée* selon le retour.

### 4. **Kanban (Suivi des Cibles)**
- **4 colonnes par défaut** : *En attente*, *Impact*, *Cible éliminée*, *Raté*.
- **Glisser-déposer** pour changer le statut d’une offre.
- **Filtrage par tags** (ex: afficher seulement les `#CiblePrioritaire`).

---

## 🌟 **Roadmap : Missions à Accomplir**

| Mission | Objectif                          | Statut      |
|---------|-----------------------------------|-------------|
| **Mission 1** | MVP : Arsenal + Kanban            | ⬜ À faire   |
| **Mission 2** | Mode Journaliste (Ollama)         | ⬜ À faire   |
| **Mission 3** | Tirs automatiques (postulation)   | ⬜ À faire   |
| **Mission 4** | QG tactique (tableau de bord)     | ⬜ À faire   |
| **Mission 5** | Synchronisation (Firebase)       | ⬜ Idée      |
| **Mission 6** | IA pour analyser les cibles       | ⬜ Idée      |
| **Mission 7** | Mode "Opération Spéciale" (offres VIP) | ⬜ Idée |
| **Mission 8** | **Guerre Totale** (multi-joueurs) | ⬜ Rêve   |

---

## 🤝 **Rejoignez la Résistance**

Le marché du travail est **une jungle**, mais **vous n’êtes pas seul**. 

- **Ouvrez une issue** pour proposer des améliorations.
- **Forkez le projet** et soumettez une **PR**.
- **Partagez CV Rambo** avec les autres **soldats du job hunt**.

---

## 📜 **Licence**
**MIT** © [Steroids Studio](https://github.com/ton-org) – *Libre à vous de l’utiliser pour **gagner la guerre**.*

---

## 💬 **Contact**
**Oswald Bernard** – [oswald@steroids.studio](mailto:oswald@steroids.studio)

---

> *"**They drew first blood. Now it’s your turn.**"* 🔫💥
