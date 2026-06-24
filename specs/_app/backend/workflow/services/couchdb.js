/** @module services/couchdb
 * Service CouchDB - Change listener et CRUD
 */

const nano = require('nano');
const config = require('../config');
const logger = require('../utils/logger');

class CouchDBService {
  constructor() {
    this.db = null;
    this.changesFeed = null;
  }

  /**
   * @checkpoint Connecter à CouchDB
   */
  async connect() {
    try {
      const couch = nano({
        url: config.couchdb.url,
        requestDefaults: {
          auth: config.couchdb.auth
        }
      });

      this.db = couch.use(config.couchdb.database);
      
      // Vérifie connexion
      await this.db.info();
      logger.info('[CouchDB] Connecté avec succès');
      
      return true;
    } catch (error) {
      logger.error('[CouchDB] Erreur connexion:', error.message);
      throw error;
    }
  }

  /**
   * @checkpoint Démarrer le change listener
   * Écoute uniquement les documents cible avec status='new'
   */
  startChangeListener(onNewCible) {
    logger.info('[CouchDB] Démarrage change listener...');

    // Utilise le feed continu
    const feed = this.db.changesReader.start({
      since: 'now',
      include_docs: true,
      // Filtre pour ne recevoir que les cibles
      filter: (doc) => doc.type === 'cible' && doc.status === 'new'
    });

    feed.on('change', (change) => {
      logger.info(`[CouchDB] Changement détecté: ${change.id}`);
      
      if (change.doc && change.doc.status === 'new') {
        onNewCible(change.doc);
      }
    });

    feed.on('error', (error) => {
      logger.error('[CouchDB] Erreur changes feed:', error);
    });

    feed.on('stop', () => {
      logger.info('[CouchDB] Change listener arrêté');
    });

    this.changesFeed = feed;
    return feed;
  }

  /**
   * @checkpoint Mettre à jour une cible
   */
  async updateCible(id, updates) {
    try {
      // Récupère document courant
      const doc = await this.db.get(id);
      
      // Met à jour
      const updated = {
        ...doc,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const response = await this.db.insert(updated);
      
      logger.info(`[CouchDB] Cible mise à jour: ${id} → ${updates.status || 'update'}`);
      
      return { ...updated, _rev: response.rev };
    } catch (error) {
      logger.error(`[CouchDB] Erreur update ${id}:`, error.message);
      throw error;
    }
  }

  /**
   * @checkpoint Récupérer le profil utilisateur
   */
  async getUserProfile(userId) {
    try {
      const result = await this.db.find({
        selector: {
          type: 'profil',
          userId: userId
        },
        limit: 1
      });

      return result.docs[0] || null;
    } catch (error) {
      logger.error('[CouchDB] Erreur récupération profil:', error.message);
      throw error;
    }
  }

  /**
   * @checkpoint Récupérer une cible par ID
   */
  async getCible(id) {
    try {
      return await this.db.get(id);
    } catch (error) {
      logger.error(`[CouchDB] Erreur get ${id}:`, error.message);
      throw error;
    }
  }

  /**
   * Arrêter proprement
   */
  async stop() {
    if (this.changesFeed) {
      this.changesFeed.stop();
    }
  }
}

module.exports = CouchDBService;
