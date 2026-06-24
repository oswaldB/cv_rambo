/**
 * Mega-fonction du workflow F-013-sauvegarder-donnees
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Auto-save des données dans PouchDB
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('dataPersistence', {
    lastSaved: null,
    pendingSaves: 0,
    autoSaveEnabled: true
  });

  Alpine.data('workflowSauvegarderDonnees', () => ({
    initialized: false,
    saveQueue: [],
    processing: false,

    async init() {
      await this.initialiserSauvegarde();
    },

    async initialiserSauvegarde() {
      /**
       * @action Recevoir l'événement de modification de données
       * @checkpoint change-event-received, {type, data, collection} disponibles
       */
      
      window.addEventListener('cv-rambo:data-changed', (event) => {
        this.handleDataChange(event.detail);
      });

      window.addEventListener('cv-rambo:save-request', (event) => {
        this.saveImmediately(event.detail);
      });

      this.initialized = true;

      console.log('[CHECKPOINT]', 'change-event-received', {
        listeners: ['cv-rambo:data-changed', 'cv-rambo:save-request'],
        status: 'listening'
      });

      Alpine.store('dataPersistence', {
        lastSaved: null,
        pendingSaves: 0,
        autoSaveEnabled: true
      });
    },

    async handleDataChange(detail) {
      if (!Alpine.store('dataPersistence')?.autoSaveEnabled) return;

      // Debounce les sauvegardes
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = setTimeout(() => {
        this.sauvegarderDonnees(detail);
      }, 1000); // Auto-save après 1s d'inactivité
    },

    async saveImmediately(detail) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      await this.sauvegarderDonnees(detail);
    },

    async sauvegarderDonnees(detail) {
      try {
        const { type, data, collection, id } = detail;

        /**
         * @action Valider les données avant sauvegarde
         * @checkpoint data-validated, les données respectent le schéma attendu
         */
        if (!this.validerDonnees(data, collection)) {
          throw new Error(`Validation failed for ${collection}`);
        }

        console.log('[CHECKPOINT]', 'data-validated', {
          collection: collection,
          hasData: !!data,
          dataType: typeof data
        });

        /**
         * @action Ouvrir la base PouchDB correspondante
         * @checkpoint db-opened, accès à la bonne base (profil, cibles, tags, settings)
         */
        const db = this.getDatabase(collection);
        if (!db) {
          throw new Error(`Database ${collection} not available`);
        }

        console.log('[CHECKPOINT]', 'db-opened', {
          collection: collection,
          adapter: db.adapter
        });

        /**
         * @action Préparer le document pour PouchDB
         * @checkpoint doc-prepared, objet avec _id (existant ou nouveau) et données
         */
        const docId = id || `${collection}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const doc = {
          _id: docId,
          type: collection,
          ...data,
          updatedAt: new Date().toISOString()
        };

        // Si mise à jour, récupérer la révision existante
        try {
          const existing = await db.get(docId);
          if (existing) {
            doc._rev = existing._rev;
          }
        } catch (e) {
          // Document n'existe pas encore, c'est un nouveau
          doc.createdAt = new Date().toISOString();
        }

        console.log('[CHECKPOINT]', 'doc-prepared', {
          docId: doc._id,
          hasRev: !!doc._rev,
          collection: collection
        });

        /**
         * @action Insérer ou mettre à jour le document
         * @checkpoint doc-saved, db.put() retourne {ok: true, id, rev}
        */
        const response = await db.put(doc);

        console.log('[CHECKPOINT]', 'doc-saved', {
          ok: response.ok,
          id: response.id,
          rev: response.rev
        });

        /**
         * @action Logger la persistance en console
         * @checkpoint log-emitted, console affiche "[STORAGE] pouchdb-persisted"
         */
        console.log('[STORAGE] pouchdb-persisted', {
          collection: collection,
          docId: doc._id,
          timestamp: new Date().toISOString()
        });

        console.log('[CHECKPOINT]', 'log-emitted', {
          message: '[STORAGE] pouchdb-persisted',
          collection: collection
        });

        /**
         * @action Mettre à jour le store local
         * @checkpoint store-updated, store contient les données fraîchement sauvegardées
         */
        const currentStore = Alpine.store(collection) || {};
        Alpine.store(collection, {
          ...currentStore,
          ...data,
          _id: doc._id,
          _rev: response.rev,
          lastSaved: new Date().toISOString()
        });

        console.log('[CHECKPOINT]', 'store-updated', {
          collection: collection,
          storeUpdated: true
        });

        /**
         * @action Confirmer le succès à l'appelant
         * @checkpoint save-confirmed, Promise résolue avec l'objet sauvegardé
         */
        Alpine.store('dataPersistence', {
          lastSaved: new Date().toISOString(),
          pendingSaves: 0,
          autoSaveEnabled: true
        });

        console.log('[CHECKPOINT]', 'save-confirmed', {
          docId: doc._id,
          collection: collection,
          status: 'success'
        });

        return { success: true, docId: doc._id, rev: response.rev };

      } catch (error) {
        /**
         * @action Gérer les erreurs de sauvegarde
         * @checkpoint error-handled, en cas d'échec log dans error-logs et toast d'erreur
         */
        console.error('[ERROR] Save failed:', error);

        window.dispatchEvent(new CustomEvent('cv-rambo:store-error', {
          detail: {
            error: {
              message: error.message,
              timestamp: new Date().toISOString(),
              component: 'sauvegarder-donnees',
              type: 'pouchdb'
            }
          }
        }));

        window.dispatchEvent(new CustomEvent('cv-rambo:show-error-toast', {
          detail: {
            title: 'ERREUR DE SAUVEGARDE',
            message: 'Impossible de sauvegarder les données'
          }
        }));

        console.log('[CHECKPOINT]', 'error-handled', {
          error: error.message,
          logged: true,
          toastShown: true
        });

        throw error;
      }
    },

    validerDonnees(data, collection) {
      if (!data || typeof data !== 'object') return false;
      
      // Validation de base selon la collection
      switch (collection) {
        case 'profil':
          return true; // Profil peut être vide au début
        case 'cibles':
          return data.title || data.company || data.url;
        case 'tags':
          return data.name || data.color;
        case 'settings':
          return true;
        default:
          return true;
      }
    },

    getDatabase(collection) {
      const databases = Alpine.store('databases');
      if (!databases) return null;
      
      switch (collection) {
        case 'profil':
          return databases.profil;
        case 'cibles':
          return databases.cibles;
        case 'tags':
          return databases.tags;
        case 'settings':
          return databases.settings;
        default:
          return null;
      }
    },

    /**
     * Helper: Sauvegarder manuellement avec retour de promesse
     */
    async save(collection, data, id = null) {
      return this.sauvegarderDonnees({ type: 'manual', collection, data, id });
    }
  }));
});
