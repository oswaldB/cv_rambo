# Workflow Backend - Documentation Technique

**Rôle** : Écouter CouchDB, scraper les URLs, générer des scripts JavaScript via IA

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        WORKFLOW NODE.JS                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│   │   Changes   │───▶│  Puppeteer  │───▶│   Ollama    │             │
│   │   Listener  │    │   Scrape    │    │  Generate   │             │
│   └─────────────┘    └─────────────┘    └─────────────┘             │
│          │                                    │                     │
│          │                                    │                     │
│          ▼                                    ▼                     │
│   ┌─────────────────────────────────────────────────────┐          │
│   │                    CouchDB                          │          │
│   │  ┌──────────┐    ┌──────────┐    ┌──────────┐       │          │
│   │  │  new     │───▶│processing│───▶│script-   │       │          │
│   │  │          │    │          │    │ ready    │       │          │
│   │  └──────────┘    └──────────┘    └──────────┘       │          │
│   └─────────────────────────────────────────────────────┘          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Structure du workflow

```
workflow/
├── index.js                 # Point d'entrée
├── config.js               # Configuration (URLs, clés API)
├── services/
│   ├── couchdb.js          # Client CouchDB + changes listener
│   ├── scraper.js          # Logique Puppeteer
│   └── ollama.js           # Client API Ollama
└── utils/
    └── logger.js           # Logs console formatés
```

---

## Flow détaillé

### 1. Écoute des changements CouchDB

```javascript
// services/couchdb.js
const nano = require('nano');

const couch = nano('http://admin:password@localhost:5984');
const db = couch.use('cv-rambo');

// Changes feed continu
const feed = db.changesReader.start({
  since: 'now',
  include_docs: true,
  filter: function(doc) {
    // Filtre uniquement les cibles nouvelles
    return doc.type === 'cible' && doc.status === 'new';
  }
});

feed.on('change', async (change) => {
  const cible = change.doc;
  console.log(`[WORKFLOW] Nouvelle cible détectée: ${cible._id}`);
  
  // Lance le traitement
  await processCible(cible);
});
```

### 2. Scraping avec Puppeteer

```javascript
// services/scraper.js
const puppeteer = require('puppeteer');

class ScraperService {
  constructor() {
    this.browser = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async scrape(url) {
    const page = await this.browser.newPage();
    
    try {
      // Navigation
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Extraction HTML
      const html = await page.content();
      
      // Extraction métadonnées
      const metadata = await page.evaluate(() => {
        return {
          title: document.querySelector('h1')?.innerText || 
                 document.querySelector('[data-testid="job-title"]')?.innerText ||
                 document.title,
          company: document.querySelector('.company-name')?.innerText ||
                   document.querySelector('[data-testid="company-name"]')?.innerText,
          description: document.querySelector('.description')?.innerText ||
                      document.querySelector('[data-testid="job-description"]')?.innerText
        };
      });

      await page.close();
      
      return { html, metadata };
      
    } catch (error) {
      await page.close();
      throw new Error(`Scraping failed: ${error.message}`);
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

module.exports = ScraperService;
```

### 3. Génération script via Ollama

```javascript
// services/ollama.js
const axios = require('axios');

class OllamaService {
  constructor(config) {
    this.apiUrl = config.ollamaUrl || 'https://api.ollama.com';
    this.apiKey = config.ollamaApiKey;
    this.model = config.model || 'minimax';
  }

  async generateScript(scrapedData, userProfile) {
    const prompt = this.buildPrompt(scrapedData, userProfile);
    
    try {
      const response = await axios.post(`${this.apiUrl}/api/generate`, {
        model: this.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.3  // Peu de créativité, plus de précision
        }
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      });

      return this.parseResponse(response.data);
      
    } catch (error) {
      throw new Error(`Ollama generation failed: ${error.message}`);
    }
  }

  buildPrompt(scrapedData, userProfile) {
    return `
Tu es un expert en manipulation DOM et automatisation web.

MISSION:
Génère un script JavaScript IIFE (Immediately Invoked Function Expression) qui remplit automatiquement un formulaire de candidature.

PAGE SCRAPPÉE:
URL: ${scrapedData.url}
Titre: ${scrapedData.metadata.title}
Entreprise: ${scrapedData.metadata.company}

HTML DU FORMULAIRE (extrait):
${this.extractFormHtml(scrapedData.html)}

DONNÉES DU CANDIDAT:
- Prénom: ${userProfile.firstName}
- Nom: ${userProfile.lastName}
- Email: ${userProfile.email}
- Téléphone: ${userProfile.phone}
- LinkedIn: ${userProfile.linkedin}
- CV: ${userProfile.cvText}

RÈGLES DU SCRIPT:
1. Détecte les champs (input[name], input[id], textarea, select)
2. Remplit chaque champ avec la donnée appropriée
3. Gère les cas où un champ n'existe pas (try/catch ou vérification)
4. Simule les events 'input' et 'change' pour déclencher validations
5. Coche les checkboxes de conditions si présentes
6. Clique sur le bouton submit ou appelle form.submit()
7. Affiche "✅ Formulaire rempli avec succès" en console

FORMAT:
- Code minifié sur UNE SEULE LIGNE
- Pas de markdown, pas d'explication
- Prêt à copier-coller dans la console
- IIFE : (function(){...})();

Retourne UNIQUEMENT le code JavaScript.
`;
  }

  extractFormHtml(html) {
    // Extrait les 5000 premiers caractères contenant le formulaire
    const formMatch = html.match(/<form[\s\S]{0,5000}/i);
    return formMatch ? formMatch[0] + '...' : html.substring(0, 3000);
  }

  parseResponse(response) {
    // Ollama retourne généralement: { response: "code..." }
    const script = response.response || response.text || response;
    
    // Nettoie le script (enlève markdown si présent)
    return script
      .replace(/^```[\w]*\n?/, '')
      .replace(/\n?```$/, '')
      .trim();
  }
}

module.exports = OllamaService;
```

### 4. Orchestration principale

```javascript
// index.js
const CouchDBService = require('./services/couchdb');
const ScraperService = require('./services/scraper');
const OllamaService = require('./services/ollama');

const config = {
  couchdbUrl: process.env.COUCHDB_URL || 'http://admin:password@localhost:5984',
  ollamaUrl: process.env.OLLAMA_URL || 'https://api.ollama.com',
  ollamaApiKey: process.env.OLLAMA_API_KEY
};

async function main() {
  const scraper = new ScraperService();
  const ollama = new OllamaService(config);
  const couchdb = new CouchDBService(config.couchdbUrl);

  // Init
  await scraper.init();
  await couchdb.connect();

  console.log('[WORKFLOW] Démarré, écoute des changements CouchDB...');

  // Écoute les nouvelles cibles
  couchdb.on('new-cible', async (cible) => {
    try {
      console.log(`[WORKFLOW] Traitement cible: ${cible.url}`);

      // 1. Passe en processing
      await couchdb.updateCible(cible._id, {
        status: 'processing',
        processingStartedAt: new Date().toISOString()
      });

      // 2. Scrape
      console.log('[WORKFLOW] Scraping...');
      const scrapedData = await scraper.scrape(cible.url);

      // 3. Récupère profil utilisateur
      const userProfile = await couchdb.getUserProfile(cible.userId);

      // 4. Génère script
      console.log('[WORKFLOW] Génération script IA...');
      const script = await ollama.generateScript(scrapedData, userProfile);

      // 5. Sauvegarde
      await couchdb.updateCible(cible._id, {
        status: 'script-ready',
        title: scrapedData.metadata.title,
        company: scrapedData.metadata.company,
        description: scrapedData.metadata.description,
        generatedScript: script,
        scriptGeneratedAt: new Date().toISOString()
      });

      console.log(`[WORKFLOW] ✅ Script généré pour: ${cible._id}`);

    } catch (error) {
      console.error(`[WORKFLOW] ❌ Erreur sur ${cible._id}:`, error.message);
      
      await couchdb.updateCible(cible._id, {
        status: 'error',
        errorMessage: error.message,
        errorAt: new Date().toISOString()
      });
    }
  });

  // Gestion shutdown propre
  process.on('SIGINT', async () => {
    console.log('\n[WORKFLOW] Arrêt...');
    await scraper.close();
    process.exit(0);
  });
}

main().catch(console.error);
```

---

## Gestion des erreurs

### Types d'erreurs et retry

| Erreur | Stratégie | Retry |
|--------|-----------|-------|
| Timeout Puppeteer | Augmenter timeout (60s) | ✅ 3x |
| 404 Page not found | Marquer erreur | ❌ Non |
| Anti-bot (403) | Fallback sans HTML | ✅ 1x sans JS |
| Ollama timeout | Retry avec prompt simplifié | ✅ 2x |
| Ollama rate limit | Attendre 60s | ✅ 3x |

### Exemple retry avec backoff

```javascript
async function withRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`[WORKFLOW] Retry ${i + 1}/${retries}...`);
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
}
```

---

## Configuration

### Variables d'environnement

```bash
# .env
COUCHDB_URL=http://admin:admin_password@localhost:5984
OLLAMA_URL=https://api.ollama.com
OLLAMA_API_KEY=sk-...
PUPPETEER_HEADLESS=true
PUPPETEER_TIMEOUT=30000
MAX_CONCURRENT_SCRAPES=3
```

### Docker Compose (optionnel)

```yaml
# workflow/docker-compose.yml
version: '3.8'

services:
  workflow:
    build: .
    environment:
      - COUCHDB_URL=http://couchdb:5984
      - OLLAMA_URL=${OLLAMA_URL}
      - OLLAMA_API_KEY=${OLLAMA_API_KEY}
    depends_on:
      - couchdb
    restart: unless-stopped

  couchdb:
    image: couchdb:3.2
    environment:
      - COUCHDB_USER=admin
      - COUCHDB_PASSWORD=admin_password
    volumes:
      - couchdb_data:/opt/couchdb/data
    ports:
      - "5984:5984"

volumes:
  couchdb_data:
```

---

## Monitoring

### Logs à implémenter

```javascript
// Chaque étape logge:
[WORKFLOW] new-cible-detected <id>
[WORKFLOW] processing-started <id>
[WORKFLOW] scraping <url>
[WORKFLOW] scraping-success <url> <size>bytes
[WORKFLOW] ollama-request <id>
[WORKFLOW] ollama-success <id> <scriptLength>chars
[WORKFLOW] db-update <id> script-ready
[WORKFLOW] processing-completed <id> <duration>ms
[WORKFLOW] error <id> <message>
```

### Métriques

- Temps moyen de traitement
- Taux de succès/échec
- Taille moyenne des scripts générés
- Nombre de cibles traitées/minute

---

## Performance

| Étape | Temps estimé | Optimisation |
|-------|--------------|--------------|
| Détection changement | < 1s | Changes feed temps réel |
| Scraping Puppeteer | 3-10s | Headless, cache désactivé |
| Génération Ollama | 5-30s | Dépend du modèle |
| Update CouchDB | < 100ms | - |
| **Total** | **10-40s** | Parallélisation possible |

### Parallélisation

```javascript
// Limité à 3 scrapes simultanés pour ne pas surcharger
const pLimit = require('p-limit');
const limit = pLimit(3);

const results = await Promise.all(
  cibles.map(cible => limit(() => processCible(cible)))
);
```

---

## Sécurité

1. **CouchDB** : Authentification obligatoire
2. **Ollama API** : Clé stockée dans env, jamais dans le code
3. **Puppeteer** : Sandbox activé, pas de téléchargements
4. **URLs** : Validation avant scraping (uniquement sites d'emploi connus)
5. **Rate limiting** : Délai entre requêtes (respecter robots.txt)

---

## Test

```bash
# Test manuel
node -e "
  const { processCible } = require('./index');
  processCible({
    _id: 'test_001',
    url: 'https://linkedin.com/jobs/view/123',
    status: 'new'
  });
"

# Test avec vraie URL
curl -X POST http://localhost:5984/cv-rambo \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "cible_test_001",
    "type": "cible",
    "url": "https://www.welcometothejungle.com/fr/companies/.../jobs/...",
    "status": "new",
    "createdAt": "2026-06-24T10:00:00Z"
  }'

# Vérifier workflow a traité
curl http://localhost:5984/cv-rambo/cible_test_001
```
