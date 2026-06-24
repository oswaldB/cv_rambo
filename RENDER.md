# 🚀 Déploiement sur Render

## Étapes

### 1. Créer un compte
Allez sur https://render.com et créez un compte gratuit.

### 2. Nouveau Web Service
- Cliquez **"New +"** → **"Web Service"**
- Connectez votre repo GitHub ou uploadez le code

### 3. Configuration

| Option | Valeur |
|--------|--------|
| **Name** | cv-rambo-backend |
| **Runtime** | Node |
| **Build Command** | `npm install` (ou laissez vide) |
| **Start Command** | `node backend/proxy-ollama/code/index.js` |
| **Plan** | Free |

### 4. Variables d'environnement
Ajoutez dans l'onglet **Environment** :

```
PORT=10000
OLLAMA_HOST=https://votre-ollama-ou-autre-api.com
```

> ⚠️ **Important** : Le plan gratuit de Render ne peut pas héberger Ollama lui-même (trop lourd). Vous devez :
> - Soit avoir Ollama ailleurs (votre PC avec ngrok, ou un VPS)
> - Soit utiliser une API alternative (OpenAI, Anthropic, etc.)

### 5. Deploy
Cliquez **"Create Web Service"**

Render vous donnera une URL du genre :
```
https://cv-rambo-backend.onrender.com
```

### 6. Configurer l'extension
Dans votre extension Chrome (`frontend/` ou `background.js`), remplacez :
```javascript
// Avant (local)
const API_URL = 'http://localhost:3000'

// Après (Render)
const API_URL = 'https://cv-rambo-backend.onrender.com'
```

---

## 🔄 Auto-deploy

À chaque push sur GitHub, Render redéploie automatiquement.

## 📊 Limitations du plan Free

- ✅ Gratuit
- ✅ HTTPS automatique
- ❌ Le serveur s'endort après 15 min d'inactivité (reboot en ~30s)
- ❌ Pas de persistance de fichiers (utilisez une vraie BDD si besoin)

## 🆘 Alternative si Render ne marche pas

Si vous avez des problèmes avec Render, essayez :
- **Railway** (railway.app) - Similaire, aussi gratuit
- **Fly.io** (fly.io) - Gratuit avec limitations
- **Vercel** (vercel.com) - Pour du serverless
- **Ngrok** (temporaire pour tests)
