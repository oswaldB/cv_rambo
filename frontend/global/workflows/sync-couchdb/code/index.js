/**
 * Mega-fonction : sync-couchdb
 * Configure la sync bidirectionnelle PouchDB ↔ CouchDB
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('couchdbSync', () => ({
    syncHandler: null,
    status: 'idle', // idle, connecting, active, paused, error
    lastError: null,
    remoteDB: null,
    
    config: {
      get remoteUrl() {
        const cfg = window.CV_RAMBO_CONFIG?.couchdb || {};
        return `${cfg.url}/${cfg.database}`;
      },
      get auth() {
        const cfg = window.CV_RAMBO_CONFIG?.couchdb || {};
        return {
          username: cfg.username,
          password: cfg.password
        };
      },
      retry: true,
      heartbeat: 10000
    },

    async init() {
      // Attendre que PouchDB soit prêt
      if (window.db) {
        this.setupSync();
      } else {
        window.addEventListener('db:ready', () => this.setupSync(), { once: true });
      }
    },

    setupSync() {
      /**
       * @action Configurer connexion distante
       * @checkpoint sync-configured
       */
      this.remoteDB = new PouchDB(this.config.remoteUrl, {
        auth: this.config.auth
      });
      console.log('[CHECKPOINT]', 'sync-configured', { 
        remote: this.config.remoteUrl 
      });

      /**
       * @action Démarrer sync live
       * @checkpoint sync-started
       */
      this.startSync();
    },

    startSync() {
      this.status = 'connecting';
      console.log('[CHECKPOINT]', 'sync-started');

      this.syncHandler = window.db.sync(this.remoteDB, {
        live: true,
        retry: this.config.retry,
        heartbeat: this.config.heartbeat,
        back_off_function: (delay) => {
          if (delay === 0) return 1000;
          return Math.min(delay * 2, 60000);
        }
      });

      // Gestion événements sync
      this.syncHandler
        .on('change', (info) => {
          /**
           * @checkpoint sync-change
           */
          this.status = 'active';
          console.log('[CHECKPOINT]', 'sync-change', { 
            direction: info.direction,
            change: info.change?.docs_read || 0 
          });
          window.dispatchEvent(new CustomEvent('sync:change', { detail: info }));
        })
        .on('active', () => {
          /**
           * @checkpoint sync-active
           */
          this.status = 'active';
          console.log('[CHECKPOINT]', 'sync-active');
          window.dispatchEvent(new CustomEvent('sync:active'));
        })
        .on('paused', (err) => {
          /**
           * @checkpoint sync-paused
           */
          this.status = err ? 'error' : 'paused';
          console.log('[CHECKPOINT]', 'sync-paused', { 
            hasError: !!err,
            error: err?.message 
          });
          window.dispatchEvent(new CustomEvent('sync:paused', { detail: { error: err } }));
        })
        .on('error', (err) => {
          /**
           * @checkpoint sync-error
           */
          this.status = 'error';
          this.lastError = err.message;
          console.error('[CHECKPOINT]', 'sync-error', { error: err.message });
          window.dispatchEvent(new CustomEvent('sync:error', { detail: { error: err } }));
        })
        .on('complete', (info) => {
          /**
           * @checkpoint sync-complete
           */
          this.status = 'idle';
          console.log('[CHECKPOINT]', 'sync-complete', info);
          window.dispatchEvent(new CustomEvent('sync:complete', { detail: info }));
        });
    },

    async forceSync() {
      /**
       * @action Force sync manuelle
       * @checkpoint sync-forced
       */
      console.log('[CHECKPOINT]', 'sync-forced');
      
      try {
        const result = await window.db.replicate.to(this.remoteDB);
        console.log('[CHECKPOINT]', 'sync-completed', { 
          pushed: result.docs_written,
          errors: result.doc_write_failures 
        });
        return result;
      } catch (err) {
        console.error('[CHECKPOINT]', 'sync-failed', { error: err.message });
        throw err;
      }
    },

    cancel() {
      if (this.syncHandler) {
        this.syncHandler.cancel();
        this.status = 'idle';
      }
    },

    get statusIcon() {
      const icons = {
        idle: '⚪',
        connecting: '🔄',
        active: '🟢',
        paused: '🟡',
        error: '🔴'
      };
      return icons[this.status] || '⚪';
    },

    get statusText() {
      const texts = {
        idle: 'Déconnecté',
        connecting: 'Connexion...',
        active: 'Synchronisé',
        paused: 'En pause',
        error: 'Erreur sync'
      };
      return texts[this.status] || 'Inconnu';
    }
  }));
});
