/** @module config
 * Configuration centralisée du workflow
 */

require('dotenv').config();

module.exports = {
  /** Configuration CouchDB */
  couchdb: {
    url: process.env.COUCHDB_URL || 'http://localhost:5984',
    database: process.env.COUCHDB_DB || 'cv-rambo',
    auth: {
      username: process.env.COUCHDB_USER || 'admin',
      password: process.env.COUCHDB_PASSWORD || 'admin_password'
    }
  },

  /** Configuration Ollama */
  ollama: {
    url: process.env.OLLAMA_URL || 'https://api.ollama.com',
    apiKey: process.env.OLLAMA_API_KEY,
    model: process.env.OLLAMA_MODEL || 'minimax',
    timeout: parseInt(process.env.OLLAMA_TIMEOUT) || 60000,
    maxRetries: parseInt(process.env.OLLAMA_MAX_RETRIES) || 3
  },

  /** Configuration Puppeteer */
  puppeteer: {
    headless: process.env.PUPPETEER_HEADLESS !== 'false',
    timeout: parseInt(process.env.PUPPETEER_TIMEOUT) || 30000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  },

  /** Limites de performance */
  limits: {
    maxConcurrentScrapes: parseInt(process.env.MAX_CONCURRENT_SCRAPES) || 3,
    scrapeDelayMs: parseInt(process.env.SCRAPE_DELAY_MS) || 1000
  },

  /** Logging */
  logLevel: process.env.LOG_LEVEL || 'info'
};
