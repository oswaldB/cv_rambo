# Ollama Chat avec Proxy

Un chat frontend-only avec serveur proxy Node.js pour éviter les problèmes CORS avec l'API Ollama Cloud.

## Structure

```
.
├── server.js          # Serveur Express avec proxy
├── package.json       # Dépendances
├── public/
│   └── index.html     # Interface chat (Alpine.js)
└── README.md
```

## Installation

```bash
# Installer les dépendances
npm install

# Ou avec yarn
yarn
```

## Configuration

L'API key Ollama est déjà configurée dans `server.js` :
```javascript
const OLLAMA_API_KEY = '0011dea90cd149cc91c8e7828e35d187.lwnvxLJf3lt4Cv6n_y5teZ_C';
```

Vous pouvez aussi la définir via une variable d'environnement :
```bash
export OLLAMA_API_KEY=votre_cle
```

## Lancement

```bash
# Mode production
npm start

# Mode développement (auto-reload avec Node.js 18+)
npm run dev
```

Puis ouvrez : **http://localhost:3000**

## Fonctionnement

Le serveur fait office de proxy :
- Le frontend appelle `/api/chat` (même domaine = pas de CORS)
- Le serveur relaie la requête vers `https://ollama.com/api/chat`
- La réponse est renvoyée au frontend

## Déploiement

### Local
```bash
npm start
```

### Sur un VPS / serveur
```bash
# Avec PM2
pm2 start server.js --name ollama-chat

# Ou avec systemd, Docker, etc.
```

### Variables d'environnement
| Variable | Description | Défaut |
|----------|-------------|--------|
| `PORT` | Port du serveur | 3000 |
| `OLLAMA_API_KEY` | Clé API Ollama | (déjà configurée) |

## Technologies

- **Frontend** : Alpine.js + Tailwind CSS
- **Backend** : Node.js + Express
- **Proxy** : fetch natif (pas besoin de http-proxy-middleware)
