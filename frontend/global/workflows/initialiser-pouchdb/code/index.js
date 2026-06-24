/**
 * Mega-fonction : initialiser-pouchdb
 * Initialise PouchDB local, crée les indexes, expose utils globaux
 * Framework: Alpine.js (PAS de JS vanille)
 * Source: specs/_app/frontend/global/workflows/initialiser-pouchdb/specs/spec.md
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('pouchdbInitializer', () => ({
    db: null,
    isReady: false,
    error: null,
    indexesCreated: false,

    async init() {
      /**
       * @action Initialiser PouchDB
       * @checkpoint pouchdb-init-started
       */
      console.log('[CHECKPOINT]', 'pouchdb-init-started');
      
      try {
        // Vérifier que PouchDB est disponible (CDN)
        if (typeof PouchDB === 'undefined') {
          throw new Error('PouchDB not loaded - check CDN');
        }
        
        // Plugin find (déjà chargé via CDN, étend automatiquement PouchDB)
        // pouchdb-find.js ajoute find() à PouchDB automatiquement

        /**
         * @action Créer instance PouchDB locale
         * @checkpoint pouchdb-instance-created
         */
        const DB_NAME = 'cv-rambo';
        this.db = new PouchDB(DB_NAME);
        console.log('[CHECKPOINT]', 'pouchdb-instance-created', { dbName: DB_NAME });

        /**
         * @action Créer indexes pour requêtes
         * @checkpoint indexes-created
         */
        await this.creerIndexes();
        this.indexesCreated = true;
        console.log('[CHECKPOINT]', 'indexes-created', { 
          indexes: ['idx-type-status-date', 'idx-type-url'] 
        });

        /**
         * @action Exposer utils globalement
         * @checkpoint utils-exposed
         */
        this.exposeUtils();
        console.log('[CHECKPOINT]', 'utils-exposed', { 
          utils: ['getCibles', 'getCible', 'createCible', 'updateCible'] 
        });

        /**
         * @action Émettre événement ready
         * @checkpoint pouchdb-ready
         */
        this.isReady = true;
        window.dispatchEvent(new CustomEvent('db:ready', { 
          detail: { db: this.db, timestamp: Date.now() } 
        }));
        console.log('[CHECKPOINT]', 'pouchdb-ready', { timestamp: Date.now() });

      } catch (err) {
        this.error = err.message;
        console.error('[CHECKPOINT]', 'pouchdb-init-error', { error: err.message });
        window.dispatchEvent(new CustomEvent('db:error', { 
          detail: { error: err, phase: 'init' } 
        }));
      }
    },

    async creerIndexes() {
      // Index pour requêtes par type + status + date
      await this.db.createIndex({
        index: {
          fields: ['type', 'status', 'createdAt'],
          name: 'idx-type-status-date'
        }
      });

      // Index pour recherche par URL
      await this.db.createIndex({
        index: {
          fields: ['type', 'url'],
          name: 'idx-type-url'
        }
      });
    },

    exposeUtils() {
      // Exposer db globalement
      window.db = this.db;

      // Helpers de requête courants
      window.dbUtils = {
        db: this.db,

        async getCibles(filter = null) {
          const selector = { type: 'cible' };
          if (filter?.status) {
            selector.status = filter.status;
          }
          const result = await this.db.find({
            selector: selector,
            sort: [{ createdAt: 'desc' }]
          });
          return result.docs;
        },

        async getCible(id) {
          return await this.db.get(id);
        },

        async createCible(url, data = {}) {
          const doc = {
            _id: `cible-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: 'cible',
            url: url,
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...data
          };
          const result = await this.db.put(doc);
          return { ...doc, _rev: result.rev };
        },

        async updateCible(id, updates) {
          const doc = await this.db.get(id);
          const updated = {
            ...doc,
            ...updates,
            updatedAt: new Date().toISOString()
          };
          const result = await this.db.put(updated);
          return { ...updated, _rev: result.rev };
        },

        async deleteCible(id) {
          const doc = await this.db.get(id);
          return await this.db.remove(doc);
        },

        // Suivre les changements
        onChanges(callback, options = {}) {
          return this.db.changes({
            since: 'now',
            live: true,
            include_docs: true,
            ...options
          }).on('change', callback);
        }
      };
    }
  }));
});
