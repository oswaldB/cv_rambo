/**
 * Configuration du backend CV Rambo
 */

require('dotenv').config();

module.exports = {
  couchdb: {
    url: process.env.COUCHDB_URL || 'http://localhost:5984',
    database: process.env.COUCHDB_DB || 'cv-rambo',
    auth: {
      username: process.env.COUCHDB_USER || 'admin',
      password: process.env.COUCHDB_PASSWORD || 'admin'
    }
  },
  
  ollama: {
    url: process.env.OLLAMA_URL || 'http://localhost:11434',
    model: process.env.OLLAMA_MODEL || 'llama2',
    timeout: 60000 // 60s pour génération
  },
  
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};
