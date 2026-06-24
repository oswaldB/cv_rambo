---
id: B-001-proxy-ollama
type: backend
folder: specs/_app/backend/workflows/proxy-ollama/
description: Proxy HTTP vers Ollama pour contourner les blocages CORS et sécurité du navigateur.
depends_on: []
justification: CORS + CSP navigateur bloquent les appels directs à Ollama localhost depuis une extension Chrome
---

# B-001-proxy-ollama : Proxy Ollama

## Description

Démarrer un serveur HTTP Node.js natif (sans npm) qui reçoit les requêtes du frontend Chrome extension, les transmet à Ollama (localhost:11434), et renvoie les réponses au frontend. Gère le streaming des réponses et les erreurs réseau.

## Étapes

```javascript
/**
 * @action Démarrer le serveur HTTP natif Node.js
 * @checkpoint server-started, écoute sur PORT (env ou 3000 par défaut), message 'Proxy Ollama ready'
 */

/**
 * @action Parser la requête entrante (method, url, headers)
 * @checkpoint request-parsed, méthode POST, path commence par /api/ollama/
 */

/**
 * @action Lire le corps JSON de la requête (stream natif)
 * @checkpoint body-read, JSON valide parsé, contient au moins 'model' et 'messages'
 */

/**
 * @action Forward la requête vers Ollama (http.request natif vers localhost:11434)
 * @checkpoint ollama-request-sent, headers transférés, timeout configuré (60s)
 */

/**
 * @action Stream la réponse Ollama vers le client (pipe natif)
 * @checkpoint response-streaming, status 200 reçu d'Ollama, headers CORS ajoutés (Access-Control-Allow-Origin: *)
 */

/**
 * @action Gérer la fin du stream ou la déconnexion client
 * @checkpoint stream-ended, connexion fermée proprement côté client et Ollama
 */

/**
 * @action Écrire le log JSON de la requête (timestamp, duration, model, status)
 * @checkpoint log-written, fichier logs/requests.jsonl créé avec entrée complète
 */

/**
 * @action Gérer les erreurs réseau (Ollama offline, timeout, JSON invalide)
 * @checkpoint error-handled, réponse HTTP 502/504/400 envoyée au client avec JSON d'erreur
 */
```

## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/ollama/chat` | Proxy vers POST /api/chat d'Ollama |
| POST | `/api/ollama/generate` | Proxy vers POST /api/generate d'Ollama |
| GET | `/health` | Healthcheck simple (retourne 200) |
| OPTIONS | `/*` | CORS preflight (Access-Control-Allow-Methods, Headers, Origin) |

## Configuration (env vars)

```bash
OLLAMA_HOST=localhost      # Host Ollama (défaut: localhost)
OLLAMA_PORT=11434         # Port Ollama (défaut: 11434)
PROXY_PORT=3000           # Port du proxy (défaut: 3000)
LOG_DIR=./logs            # Dossier des logs (défaut: ./logs)
```

## Modules Node.js natifs uniquement

- `http` - Serveur HTTP et client
- `https` - Si Ollama en HTTPS (optionnel)
- `url` - Parsing des URLs
- `fs` - Écriture des logs
- `path` - Manipulation des chemins
- `stream` - Gestion du streaming
- `util` - Promisify si besoin

**Aucune dépendance npm** (`package.json` optionnel ou absent)

## Format des logs (JSONL)

```json
{"timestamp":"2026-06-24T10:00:00Z","method":"POST","path":"/api/ollama/chat","model":"mistral","duration_ms":1250,"status":"success","error":null}
{"timestamp":"2026-06-24T10:05:00Z","method":"POST","path":"/api/ollama/generate","model":"llama3","duration_ms":0,"status":"error","error":"ECONNREFUSED"}
```

## Gestion des erreurs

| Erreur | Code HTTP | Message |
|--------|-----------|---------|
| Ollama offline | 502 | `{error: 'Ollama unavailable'}` |
| Timeout (>60s) | 504 | `{error: 'Ollama timeout'}` |
| JSON invalide | 400 | `{error: 'Invalid JSON body'}` |
| Route inconnue | 404 | `{error: 'Unknown endpoint'}` |
| Méthode non autorisée | 405 | `{error: 'Method not allowed'}` |
