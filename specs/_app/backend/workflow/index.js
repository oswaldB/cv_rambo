/** @module index
 * Point d'entrée du workflow backend
 * Orchestrateur principal: écoute CouchDB → Scrape → Génère script → Met à jour
 */

const CouchDBService = require('./services/couchdb');
const ScraperService = require('./services/scraper');
const OllamaService = require('./services/ollama');
const config = require('./config');
const logger = require('./utils/logger');

// Limiteur de concurrence
const pLimit = require('p-limit');
const limit = pLimit(config.limits.maxConcurrentScrapes);

class Workflow {
  constructor() {
    this.couchdb = new CouchDBService();
    this.scraper = new ScraperService();
    this.ollama = new OllamaService();
    this.isRunning = false;
  }

  /**
   * @checkpoint Démarrer le workflow
   */
  async start() {
    try {
      logger.info('🔫 [Workflow] Démarrage CV Rambo Workflow...');

      // Initialisation services
      await this.couchdb.connect();
      await this.scraper.init();

      // Vérifie Ollama
      const ollamaHealthy = await this.ollama.healthCheck();
      if (!ollamaHealthy) {
        logger.warn('[Workflow] Ollama non accessible, mais on continue...');
      }

      this.isRunning = true;

      // Démarre l'écoute des changements
      this.couchdb.startChangeListener((cible) => {
        // Traite la cible avec limitation de concurrence
        limit(() => this.processCible(cible));
      });

      logger.info('✅ [Workflow] Prêt et à l\'écoute');

    } catch (error) {
      logger.error('❌ [Workflow] Erreur démarrage:', error);
      process.exit(1);
    }
  }

  /**
   * @checkpoint Traiter une cible
   * Flow complet: scrape → génère → met à jour
   */
  async processCible(cible) {
    const startTime = Date.now();
    
    try {
      logger.info(`🎯 [Workflow] Traitement cible: ${cible._id}`);
      logger.info(`   URL: ${cible.url}`);

      // 1. Passe en processing
      await this.couchdb.updateCible(cible._id, {
        status: 'processing',
        processingStartedAt: new Date().toISOString()
      });

      // 2. Scraping
      logger.info('🌐 [Workflow] Scraping...');
      const scrapedData = await this.scraper.scrapeWithRetry(cible.url);

      // Petit délai entre requêtes
      await new Promise(r => setTimeout(r, config.limits.scrapeDelayMs));

      // 3. Récupération profil
      logger.info('👤 [Workflow] Récupération profil...');
      const userProfile = await this.couchdb.getUserProfile(cible.userId) || {
        firstName: 'Candidat',
        lastName: '',
        email: '',
        phone: ''
      };

      // 4. Génération script IA
      logger.info('🤖 [Workflow] Génération script Ollama...');
      const script = await this.ollama.generateWithRetry(scrapedData, userProfile);

      // 5. Mise à jour CouchDB
      logger.info('💾 [Workflow] Sauvegarde...');
      await this.couchdb.updateCible(cible._id, {
        status: 'script-ready',
        title: scrapedData.metadata.title,
        company: scrapedData.metadata.company,
        description: scrapedData.metadata.description,
        generatedScript: script,
        scriptGeneratedAt: new Date().toISOString(),
        processingDuration: Date.now() - startTime
      });

      const duration = Date.now() - startTime;
      logger.info(`✅ [Workflow] Cible traitée en ${duration}ms: ${cible._id}`);
      logger.info(`   Titre: ${scrapedData.metadata.title || 'N/A'}`);

    } catch (error) {
      logger.error(`❌ [Workflow] Erreur traitement ${cible._id}:`, error.message);
      
      // Détermine le message d'erreur utilisateur
      let errorMessage = 'Erreur lors du traitement';
      let status = 'error';

      if (error.message === 'SCRAPE_TIMEOUT') {
        errorMessage = 'La page met trop de temps à répondre';
      } else if (error.message === 'PAGE_NOT_FOUND') {
        errorMessage = 'Cette offre n\'est plus disponible';
      } else if (error.message === 'ANTI_BOT_DETECTED') {
        errorMessage = 'Ce site bloque les robots. Essayez manuellement.';
      } else if (error.message === 'GENERATION_FAILED') {
        errorMessage = 'Erreur lors de la génération du script';
      }

      // Met à jour avec erreur
      await this.couchdb.updateCible(cible._id, {
        status,
        errorMessage,
        errorAt: new Date().toISOString()
      });
    }
  }

  /**
   * @checkpoint Arrêt propre
   */
  async stop() {
    logger.info('[Workflow] Arrêt...');
    this.isRunning = false;
    
    await this.couchdb.stop();
    await this.scraper.close();
    
    logger.info('[Workflow] Arrêté');
    process.exit(0);
  }
}

// ============ DÉMARRAGE ============

const workflow = new Workflow();

// Gestion des signaux
process.on('SIGINT', () => workflow.stop());
process.on('SIGTERM', () => workflow.stop());
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Lance
workflow.start();
