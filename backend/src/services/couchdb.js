/**
 * Service CouchDB - Connexion et gestion des changements
 */

const PouchDB = require('pouchdb');
require('pouchdb-find');
const config = require('../../config');
const logger = require('./logger');

class CouchDBService {
  constructor() {
    this.localDb = null;
    this.remoteDb = null;
    this.changesFeed = null;
    this.callbacks = [];
  }

  async connect() {
    /**
     * @checkpoint couchdb-connect-started
     */
    logger.info('[CHECKPOINT] couchdb-connect-started');

    try {
      // Base locale (pour traitement)
      this.localDb = new PouchDB('cv-rambo-worker');

      // Base distante (CouchDB)
      this.remoteDb = new PouchDB(`${config.couchdb.url}/${config.couchdb.database}`, {
        auth: config.couchdb.auth
      });

      // Test connexion
      const info = await this.remoteDb.info();
      logger.info('[CHECKPOINT] couchdb-connected', { dbName: info.db_name });

      // Démarrer sync
      this.startSync();

      return true;
    } catch (err) {
      logger.error('[CHECKPOINT] couchdb-connect-error', { error: err.message });
      throw err;
    }
  }

  startSync() {
    /**
     * @checkpoint couchdb-sync-started
     */
    logger.info('[CHECKPOINT] couchdb-sync-started');

    const sync = this.localDb.sync(this.remoteDb, {
      live: true,
      retry: true,
      heartbeat: 10000
    });

    sync.on('change', (info) => {
      logger.info('[CHECKPOINT] couchdb-sync-change', {
        direction: info.direction,
        changes: info.change?.docs_read || 0
      });
      this.notifyCallbacks(info);
    });

    sync.on('error', (err) => {
      logger.error('[CHECKPOINT] couchdb-sync-error', { error: err.message });
    });

    // Écouter les changements locaux pour workflow
    this.changesFeed = this.localDb.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', (change) => {
      this.processChange(change);
    });
  }

  onChange(callback) {
    this.callbacks.push(callback);
  }

  notifyCallbacks(info) {
    this.callbacks.forEach(cb => {
      try {
        cb(info);
      } catch (err) {
        logger.error('Callback error', { error: err.message });
      }
    });
  }

  async processChange(change) {
    // Filtrer uniquement les cibles nouvelles
    if (change.doc?.type === 'cible' && change.doc?.status === 'new') {
      logger.info('[CHECKPOINT] new-cible-detected', { id: change.id });
      
      // Émettre événement pour le workflow
      this.emit('new-cible', change.doc);
    }
  }

  async updateCible(id, updates) {
    try {
      const doc = await this.localDb.get(id);
      const updated = {
        ...doc,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      const result = await this.localDb.put(updated);
      logger.info('[CHECKPOINT] cible-updated', { id, updates: Object.keys(updates) });
      return result;
    } catch (err) {
      logger.error('[CHECKPOINT] update-cible-error', { id, error: err.message });
      throw err;
    }
  }

  async getCible(id) {
    return await this.localDb.get(id);
  }

  async getProfil() {
    try {
      const result = await this.localDb.find({
        selector: { type: 'profil' },
        limit: 1
      });
      return result.docs[0] || null;
    } catch (err) {
      logger.error('[CHECKPOINT] get-profil-error', { error: err.message });
      return null;
    }
  }

  emit(event, data) {
    // Simple event emitter pattern
    if (this._events && this._events[event]) {
      this._events[event].forEach(cb => cb(data));
    }
  }

  on(event, callback) {
    if (!this._events) this._events = {};
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  }
}

module.exports = new CouchDBService();
