/**
 * Routes API REST
 */

const express = require('express');
const router = express.Router();
const couchdb = require('../services/couchdb');
const ollama = require('../services/ollama');
const logger = require('../services/logger');

/**
 * @route GET /api/health
 * @desc Vérifier l'état du serveur
 */
router.get('/health', async (req, res) => {
  const ollamaHealth = await ollama.checkHealth();
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      api: 'ok',
      ollama: ollamaHealth,
      couchdb: couchdb.remoteDb ? 'connected' : 'disconnected'
    }
  });
});

/**
 * @route GET /api/cibles
 * @desc Liste toutes les cibles
 */
router.get('/cibles', async (req, res) => {
  try {
    const result = await couchdb.localDb.find({
      selector: { type: 'cible' },
      sort: [{ createdAt: 'desc' }]
    });
    
    res.json({
      count: result.docs.length,
      cibles: result.docs
    });
  } catch (err) {
    logger.error('API Error: get cibles', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route GET /api/cibles/:id/script
 * @desc Récupérer le script généré
 */
router.get('/cibles/:id/script', async (req, res) => {
  try {
    const cible = await couchdb.getCible(req.params.id);
    
    if (!cible.generatedScript) {
      return res.status(404).json({ error: 'Script not ready' });
    }
    
    res.json({
      cibleId: cible._id,
      status: cible.status,
      script: cible.generatedScript
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route POST /api/cibles/:id/regenerate
 * @desc Forcer la regénération du script
 */
router.post('/cibles/:id/regenerate', async (req, res) => {
  try {
    await couchdb.updateCible(req.params.id, { status: 'new' });
    
    res.json({
      message: 'Regeneration triggered',
      cibleId: req.params.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route GET /api/stats
 * @desc Statistiques globales
 */
router.get('/stats', async (req, res) => {
  try {
    const result = await couchdb.localDb.find({
      selector: { type: 'cible' }
    });
    
    const stats = {
      total: result.docs.length,
      new: result.docs.filter(c => c.status === 'new').length,
      processing: result.docs.filter(c => c.status === 'processing').length,
      scriptReady: result.docs.filter(c => c.status === 'script-ready').length,
      applied: result.docs.filter(c => c.status === 'applied').length,
      error: result.docs.filter(c => c.status === 'error').length
    };
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route GET /api/profil
 * @desc Récupérer le profil candidat
 */
router.get('/profil', async (req, res) => {
  try {
    const profil = await couchdb.getProfil();
    
    if (!profil) {
      return res.status(404).json({ error: 'Profil not found' });
    }
    
    res.json(profil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
