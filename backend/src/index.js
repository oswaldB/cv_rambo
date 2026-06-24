/**
 * Serveur principal CV Rambo Backend
 */

const express = require('express');
const cors = require('cors');
const config = require('../config');
const logger = require('./services/logger');
const couchdb = require('./services/couchdb');
const generationWorkflow = require('./workflows/generation-script');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logs des requêtes
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Routes
app.use('/api', apiRoutes);

// Health check simple
app.get('/', (req, res) => {
  res.json({
    name: 'CV Rambo Backend',
    version: '1.0.0',
    status: 'running',
    documentation: '/api/health'
  });
});

// Gestion erreurs
app.use((err, req, res, next) => {
  logger.error('Express Error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// Démarrage
async function start() {
  try {
    logger.info('🚀 CV Rambo Backend starting...');
    
    // Connexion CouchDB
    await couchdb.connect();
    
    // Démarrer workflow de génération
    generationWorkflow.start();
    
    // Lancer serveur
    app.listen(config.server.port, () => {
      logger.info(`[CHECKPOINT] server-started`, {
        port: config.server.port,
        env: config.server.env
      });
      logger.info(`API disponible sur http://localhost:${config.server.port}/api`);
      logger.info(`Health check: http://localhost:${config.server.port}/api/health`);
    });
    
  } catch (err) {
    logger.error('Failed to start server', { error: err.message });
    process.exit(1);
  }
}

// Gestion arrêt gracieux
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down...');
  generationWorkflow.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down...');
  generationWorkflow.stop();
  process.exit(0);
});

// Démarrer
start();
