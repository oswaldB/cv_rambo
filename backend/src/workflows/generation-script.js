/**
 * Workflow principal: Génération de scripts pour cibles
 * Écoute les nouvelles cibles et génère automatiquement les scripts
 */

const couchdb = require('../services/couchdb');
const ollama = require('../services/ollama');
const logger = require('../services/logger');

class GenerationWorkflow {
  constructor() {
    this.processing = new Set(); // Éviter double traitement
    this.isRunning = false;
  }

  start() {
    /**
     * @checkpoint generation-workflow-started
     */
    logger.info('[CHECKPOINT] generation-workflow-started');
    
    this.isRunning = true;
    
    // Écouter les nouvelles cibles
    couchdb.on('new-cible', (cible) => {
      this.processCible(cible);
    });

    // Traiter aussi les cibles existantes au démarrage
    this.processPendingCibles();
  }

  async processPendingCibles() {
    /**
     * @checkpoint processing-pending-cibles
     */
    try {
      // Récupérer toutes les cibles en statut 'new'
      const result = await couchdb.localDb.find({
        selector: {
          type: 'cible',
          status: 'new'
        }
      });

      logger.info('[CHECKPOINT] pending-cibles-found', { count: result.docs.length });

      for (const cible of result.docs) {
        await this.processCible(cible);
      }

    } catch (err) {
      logger.error('[CHECKPOINT] process-pending-error', { error: err.message });
    }
  }

  async processCible(cible) {
    // Éviter double traitement
    if (this.processing.has(cible._id)) {
      return;
    }
    this.processing.add(cible._id);

    /**
     * @checkpoint cible-processing-started
     */
    logger.info('[CHECKPOINT] cible-processing-started', {
      cibleId: cible._id,
      url: cible.url
    });

    try {
      // Mettre à jour statut
      await couchdb.updateCible(cible._id, { status: 'processing' });

      // Récupérer profil candidat
      const profil = await couchdb.getProfil();
      
      if (!profil) {
        logger.warn('[CHECKPOINT] no-profil-found', { cibleId: cible._id });
        // Attendre qu'un profil soit créé
        await couchdb.updateCible(cible._id, { 
          status: 'error',
          errorMessage: 'Aucun profil candidat trouvé. Veuillez créer votre profil dans Arsenal.'
        });
        return;
      }

      // Générer script
      const script = await ollama.generateScript(cible, profil);

      // Sauvegarder
      await couchdb.updateCible(cible._id, {
        status: 'script-ready',
        generatedScript: script,
        generatedAt: new Date().toISOString(),
        errorMessage: null
      });

      logger.info('[CHECKPOINT] cible-processing-completed', {
        cibleId: cible._id,
        scriptLength: script.length
      });

    } catch (err) {
      logger.error('[CHECKPOINT] cible-processing-error', {
        cibleId: cible._id,
        error: err.message
      });

      await couchdb.updateCible(cible._id, {
        status: 'error',
        errorMessage: err.message
      });

    } finally {
      this.processing.delete(cible._id);
    }
  }

  stop() {
    this.isRunning = false;
    logger.info('[CHECKPOINT] generation-workflow-stopped');
  }
}

module.exports = new GenerationWorkflow();
