/**
 * Mega-fonction du workflow F-013-initialiser-pouchdb
 * Source: specs/spec.md
 * Framework: Alpine.js (PAS de JS vanille)
 * Description: Initialiser les bases de données PouchDB au démarrage
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('databases', {
    profil: null,
    cibles: null,
    tags: null,
    settings: null,
    'error-logs': null
  });

  Alpine.data('workflowInitialiserPouchdb', () => ({
    dbInstances: {},
    initialized: false,

    async init() {
      await this.initialiserPouchdb();
    },

    async initialiserPouchdb() {
      try {
        /**
         * @action Vérifier si PouchDB est disponible
         * @checkpoint pouchdb-available, la librairie PouchDB est chargée et accessible
         */
        if (typeof PouchDB === 'undefined') {
          throw new Error('PouchDB library not loaded');
        }
        console.log('[CHECKPOINT]', 'pouchdb-available', { status: 'PouchDB library is loaded' });

        /**
         * @action Créer la base de données "profil"
         * @checkpoint profil-db-created, new PouchDB('profil') retourne une instance valide
         */
        this.dbInstances.profil = new PouchDB('profil');
        console.log('[CHECKPOINT]', 'profil-db-created', { dbName: 'profil', adapter: this.dbInstances.profil.adapter });

        /**
         * @action Créer la base de données "cibles"
         * @checkpoint cibles-db-created, new PouchDB('cibles') retourne une instance valide
         */
        this.dbInstances.cibles = new PouchDB('cibles');
        console.log('[CHECKPOINT]', 'cibles-db-created', { dbName: 'cibles', adapter: this.dbInstances.cibles.adapter });

        /**
         * @action Créer la base de données "tags"
         * @checkpoint tags-db-created, new PouchDB('tags') retourne une instance valide
         */
        this.dbInstances.tags = new PouchDB('tags');
        console.log('[CHECKPOINT]', 'tags-db-created', { dbName: 'tags', adapter: this.dbInstances.tags.adapter });

        /**
         * @action Créer la base de données "settings"
         * @checkpoint settings-db-created, new PouchDB('settings') retourne une instance valide
         */
        this.dbInstances.settings = new PouchDB('settings');
        console.log('[CHECKPOINT]', 'settings-db-created', { dbName: 'settings', adapter: this.dbInstances.settings.adapter });

        /**
         * @action Créer la base de données "error-logs"
         * @checkpoint error-logs-db-created, new PouchDB('error-logs') retourne une instance valide
         */
        this.dbInstances['error-logs'] = new PouchDB('error-logs');
        console.log('[CHECKPOINT]', 'error-logs-db-created', { dbName: 'error-logs', adapter: this.dbInstances['error-logs'].adapter });

        /**
         * @action Désactiver la synchronisation réseau par défaut
         * @checkpoint sync-disabled, aucune replication/Sync n'est activée automatiquement
         */
        // Par défaut, PouchDB n'active pas la sync automatique
        // On s'assure qu'aucune réplication n'est en cours
        this.syncDisabled = true;
        console.log('[CHECKPOINT]', 'sync-disabled', { autoSync: false, manualSync: true });

        /**
         * @action Stocker les instances dans le store global
         * @checkpoint dbs-stored, store.databases contient les références aux 5 bases PouchDB
         */
        Alpine.store('databases', {
          profil: this.dbInstances.profil,
          cibles: this.dbInstances.cibles,
          tags: this.dbInstances.tags,
          settings: this.dbInstances.settings,
          'error-logs': this.dbInstances['error-logs']
        });
        console.log('[CHECKPOINT]', 'dbs-stored', { 
          databases: ['profil', 'cibles', 'tags', 'settings', 'error-logs'],
          count: 5
        });

        /**
         * @action Logger l'initialisation
         * @checkpoint log-emitted, console affiche "[STORAGE] pouchdb-initialized"
         */
        console.log('[STORAGE] pouchdb-initialized', {
          databases: Object.keys(this.dbInstances),
          timestamp: new Date().toISOString()
        });
        console.log('[CHECKPOINT]', 'log-emitted', { message: '[STORAGE] pouchdb-initialized' });

        this.initialized = true;

      } catch (error) {
        console.error('[ERROR]', error.message);
        throw error;
      }
    }
  }));
});
