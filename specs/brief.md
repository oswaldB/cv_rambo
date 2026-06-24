# 🔫 **CV Rambo**
*Le marché du travail est une jungle. **À force de tirer partout, vous allez bien finir par trouver un boulot.***

---

## 🎯 **Le Concept**
Vous en avez marre de postuler sans réponse ? **Passez en mode commando.**

**CV Rambo**, c'est l'outil ultime pour **inonder le marché de votre présence** et **forcer les portes** par la quantité et la persévérance. Inspiré de l'esthétique **action movie des années 80**, cette application web transforme votre recherche d'emploi en **une mission de guérilla** :
- **Les offres d'emploi** = des **cibles à éliminer**.
- **Votre CV** = votre **arsenal** (prêt à tout écraser).
- **Chaque candidature** = une **balle** tirée en rafale.

**Votre objectif ?** **Saturer le marché jusqu'à ce qu'on vous remarque.**

---

## 💥 **Fonctionnement : Le Système de Scripts**

### 1️⃣ **🎯 Ajoutez une Cible (URL)**
- Copiez l'URL d'une offre d'emploi (LinkedIn, Welcome to the Jungle, Indeed...)
- Collez-la dans CV Rambo
- La cible est stockée en local (PouchDB) et synchronisée avec le serveur

### 2️⃣ **🤖 Le Générateur se Met au Travail**
- Notre **workflow backend** détecte automatiquement les nouvelles URLs
- **Puppeteer** scrape la page et extrait le formulaire de candidature
- **Ollama (Minimax)** analyse et génère un **script JavaScript personnalisé**
- Le script est stocké et prêt à être utilisé

### 3️⃣ **📋 Copiez-Collez le Script**
- Recevez une notification : "✅ Script prêt !"
- Cliquez sur "📋 Copier le script"
- Ouvrez l'URL de l'offre dans un nouvel onglet
- Ouvrez la console développeur (F12 → Console)
- Collez et appuyez sur Entrée
- **Le formulaire se remplit automatiquement !**

### 4️⃣ **🔫 Tirez en Rafale**
- Sélectionnez jusqu'à **10 offres simultanément**
- Générez les scripts en une seule fois
- Exécutez-les en séquence
- **Postulez à 10 offres en 15 minutes**

---

## 🛠 **Technologies : Votre Équipement**

| Élément | Technologie |
|---------|-------------|
| **Frontend** | HTML5 + CSS3 + Alpine.js + PouchDB |
| **Sync** | CouchDB (bidirectionnelle temps réel) |
| **Scraping** | Puppeteer |
| **IA** | Ollama Cloud (Minimax) |
| **Workflow** | Node.js + Change Listener CouchDB |
| **Style** | Rétro action movie 80s |

---

## 📂 **Structure du Projet**

```
cv-rambo/
├── frontend/                    # App web PouchDB
│   ├── index.html
│   ├── js/
│   │   ├── db.js               # PouchDB + sync CouchDB
│   │   ├── app.js              # Logique UI Alpine.js
│   │   └── components/
│   │       ├── CibleList.js    # Liste URLs
│   │       ├── CibleForm.js    # Ajout URL
│   │       └── ScriptViewer.js # Affichage scripts
│   └── assets/
│       ├── css/                # Thème rétro 80s
│       └── sounds/
│
├── couchdb/                     # Config base centrale
│   └── docker-compose.yml
│
├── workflow/                    # Backend Node.js
│   ├── scraper.js              # Change listener CouchDB
│   ├── puppeteer-service.js    # Scraping pages
│   ├── ollama-client.js        # Génération scripts IA
│   └── package.json
│
└── README.md
```

---

## 🚀 **Installation Rapide**

### 1. Cloner et démarrer CouchDB
```bash
git clone https://github.com/ton-org/cv-rambo.git
cd cv-rambo/couchdb
docker-compose up -d
```

### 2. Démarrer le Workflow Backend
```bash
cd ../workflow
npm install
npm start
```

### 3. Ouvrir l'Application
```bash
cd ../frontend
# Ouvrir index.html dans un serveur local
npx serve .
# ou simplement ouvrir dans le navigateur
```

### 4. Commencer à Cibler
- Ajoutez votre première URL
- Attendez que le script soit généré (30-60 secondes)
- Copiez et exécutez dans la console !

---

## 🔧 **Comment ça Marche en Détail**

### Architecture complète

```
┌─────────────┐    sync    ┌─────────────┐    ┌─────────────┐
│   PouchDB   │◄──────────►│   CouchDB   │◄───┤   Workflow  │
│  (Browser)  │            │  (Serveur)  │    │   (Node.js) │
└──────┬──────┘            └─────────────┘    └──────┬──────┘
       │                                             │
       │                    ┌─────────────┐    ┌─────┴─────┐
       │                    │   Ollama    │◄───┤ Puppeteer │
       │                    │  (Script)   │    │  (Scrape) │
       │                    └─────────────┘    └───────────┘
       │
       ▼
┌─────────────┐
│   Console   │
│   Browser   │
└─────────────┘
```

### Exemple de Session Utilisateur

1. **Ajout**
   ```
   [🔗 URL] https://linkedin.com/jobs/view/123456
   [+ AJOUTER]
   
   ✅ Cible ajoutée (statut: new)
   ```

2. **Traitement (automatique, 30-60s)**
   ```
   🔵 Scraping page...
   🔵 Analyse formulaire...
   🔵 Génération script IA...
   🟢 Script prêt !
   ```

3. **Exécution**
   ```
   [📋 Copier le script]
   
   1. Ouvrir l'URL dans un nouvel onglet
   2. F12 → Console
   3. Coller le script
   4. Entrée
   
   [✓ J'AI POSTULÉ]
   ```

---

## 🎨 **Design : Esthétique Commando des Années 80**

- **Couleurs** : Rouge (#FF0000), Vert militaire (#2E8B57), Gris gunmetal (#2F4F4F)
- **Polices** : Bebas Neue (titres), Courier New (texte)
- **Effets** : Bruits d'armes 8-bit, animations "tir", compteurs style munitions

---

## 🌟 **Roadmap**

| Mission | Objectif | Statut |
|---------|----------|--------|
| **Mission 1** | MVP : Ajout URL + génération script | 🔄 En cours |
| **Mission 2** | Mode Rafale (10 scripts simultanés) | ⬜ À faire |
| **Mission 3** | Arsenal CV avec Mode Journaliste IA | ⬜ À faire |
| **Mission 4** | Tableau de bord statistiques | ⬜ À faire |
| **Mission 5** | Export CV PDF | ⬜ À faire |
| **Mission 6** | Support multi-sites optimisé | ⬜ Idée |

---

## 🤝 **Rejoignez la Résistance**

- Forkez le projet
- Proposez des améliorations
- Partagez avec les autres chasseurs d'emploi

---

> *"**They drew first blood. Now it's your turn.**"* 🔫💥
