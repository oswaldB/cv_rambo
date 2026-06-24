/**
 * Mega-fonction du workflow F-019-stocker-erreur
 * Source: specs/spec.md
 * Framework: Alpine.js (PAS de JS vanille)
 * Description: Persister les erreurs dans PouchDB error-logs
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('errorStorage', {
    db: null,
    lastSavedError: null,
    errorsCount: 0
  });

  Alpine.data('workflowStockerErreur', () => ({
    db: null,
    initialized: false,
    STORAGE_LIMIT: 100,

    async init() {
      await this.initialiserStockageErreurs();
    },

    async initialiserStockageErreurs() {
      try {
        /**
         * @action Ouvrir la base PouchDB error-logs
         * @checkpoint error-logs-db-opened, accès à la base dédiée aux erreurs
         */
        
        // Vérifier si PouchDB est disponible
        if (typeof PouchDB === 'undefined') {
          throw new Error('PouchDB library not loaded');
        }

        // Ouvrir la base error-logs
        this.db = new PouchDB('error-logs');
        
        console.log('[CHECKPOINT]', 'error-logs-db-opened', { 
          dbName: 'error-logs',
          adapter: this.db.adapter
        });

        this.initialized = true;

        // Écouter les événements de stockage d'erreur
        window.addEventListener('cv-rambo:store-error', (event) => {
          this.stockerErreur(event.detail);
        });

        Alpine.store('errorStorage', {
          db: this.db,
          lastSavedError: null,
          errorsCount: await this.getErrorsCount()
        });

      } catch (error) {
        console.error('[ERROR] Failed to initialize error storage:', error);
        throw error;
      }
    },

    async stockerErreur(errorData) {
      try {
        /**
         * @action Recevoir les données de l'erreur capturée
         * @checkpoint error-data-received, {timestamp, component, message, stack, type} disponibles
         */
        const errorInfo = errorData.error || errorData;
        
        console.log('[CHECKPOINT]', 'error-data-received', { 
          timestamp: errorInfo.timestamp,
          component: errorInfo.component,
          message: errorInfo.message,
          type: errorInfo.type
        });

        /**
         * @action Préparer le document d'erreur
         * @checkpoint error-doc-prepared, objet structuré avec tous les champs requis
         */
        const errorDoc = {
          _id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'error-log',
          timestamp: errorInfo.timestamp || new Date().toISOString(),
          component: errorInfo.component || 'unknown',
          message: errorInfo.message || 'Unknown error',
          errorType: errorInfo.type || 'unknown',
          stack: errorInfo.stack || 'No stack trace',
          source: errorInfo.source || 'unknown',
          line: errorInfo.line || null,
          column: errorInfo.column || null
        };

        console.log('[CHECKPOINT]', 'error-doc-prepared', { 
          docId: errorDoc._id,
          component: errorDoc.component,
          fields: Object.keys(errorDoc)
        });

        /**
         * @action Tronquer la stack trace si trop longue
         * @checkpoint stack-truncated, stack limitée à 5000 caractères maximum
         */
        const MAX_STACK_LENGTH = 5000;
        const originalStackLength = errorDoc.stack.length;
        
        if (errorDoc.stack.length > MAX_STACK_LENGTH) {
          errorDoc.stack = errorDoc.stack.substring(0, MAX_STACK_LENGTH) + '... [truncated]';
        }
        
        errorDoc.stackTruncated = originalStackLength > MAX_STACK_LENGTH;
        errorDoc.originalStackLength = originalStackLength;

        console.log('[CHECKPOINT]', 'stack-truncated', { 
          originalLength: originalStackLength,
          finalLength: errorDoc.stack.length,
          wasTruncated: errorDoc.stackTruncated
        });

        /**
         * @action Ajouter des métadonnées contextuelles
         * @checkpoint metadata-added, {userAgent, url, screenSize, appVersion} ajoutés
         */
        errorDoc.metadata = {
          userAgent: navigator.userAgent,
          url: window.location.href,
          screenSize: `${window.screen.width}x${window.screen.height}`,
          viewportSize: `${window.innerWidth}x${window.innerHeight}`,
          appVersion: 'cv-rambo-v1.0.0',
          platform: navigator.platform,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        console.log('[CHECKPOINT]', 'metadata-added', { 
          metadata: Object.keys(errorDoc.metadata)
        });

        /**
         * @action Insérer l'erreur dans PouchDB
         * @checkpoint error-saved, db.put() retourne {ok: true, id, rev}
         */
        const response = await this.db.put(errorDoc);
        
        console.log('[CHECKPOINT]', 'error-saved', { 
          ok: response.ok,
          id: response.id,
          rev: response.rev
        });

        /**
         * @action Vérifier la limite de stockage (garder les 100 dernières erreurs)
         * @checkpoint storage-limit-checked, suppression des erreurs les plus anciennes si > 100
         */
        await this.enforceStorageLimit();

        console.log('[CHECKPOINT]', 'storage-limit-checked', { 
          limit: this.STORAGE_LIMIT,
          action: 'enforced'
        });

        /**
         * @action Confirmer le stockage
         * @checkpoint persistence-confirmed, l'erreur est persistante et consultable
         */
        Alpine.store('errorStorage', {
          db: this.db,
          lastSavedError: errorDoc,
          errorsCount: await this.getErrorsCount()
        });

        console.log('[CHECKPOINT]', 'persistence-confirmed', { 
          docId: errorDoc._id,
          timestamp: errorDoc.timestamp,
          status: 'persisted'
        });

        console.log('[STORAGE] error-persisted', {
          id: errorDoc._id,
          component: errorDoc.component,
          type: errorDoc.errorType
        });

      } catch (error) {
        console.error('[ERROR] Failed to store error:', error);
        // Ne pas throw pour éviter une boucle infinie d'erreurs
      }
    },

    async enforceStorageLimit() {
      try {
        // Récupérer toutes les erreurs triées par date
        const result = await this.db.allDocs({
          include_docs: true,
          startkey: 'error-',
          endkey: 'error-\uffff'
        });

        const errors = result.rows
          .map(row => row.doc)
          .filter(doc => doc.type === 'error-log')
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        // Supprimer les erreurs les plus anciennes si on dépasse la limite
        if (errors.length > this.STORAGE_LIMIT) {
          const toDelete = errors.slice(0, errors.length - this.STORAGE_LIMIT);
          
          for (const error of toDelete) {
            await this.db.remove(error._id, error._rev);
          }
          
          console.log('[STORAGE] old-errors-cleaned', {
            deleted: toDelete.length,
            remaining: this.STORAGE_LIMIT
          });
        }

      } catch (error) {
        console.error('[ERROR] Failed to enforce storage limit:', error);
      }
    },

    async getErrorsCount() {
      try {
        const result = await this.db.allDocs({
          startkey: 'error-',
          endkey: 'error-\uffff'
        });
        return result.rows.length;
      } catch (error) {
        return 0;
      }
    },

    /**
     * Helper: Récupérer toutes les erreurs stockées
     */
    async getAllErrors(limit = 100) {
      try {
        const result = await this.db.allDocs({
          include_docs: true,
          startkey: 'error-',
          endkey: 'error-\uffff',
          limit: limit,
          descending: true
        });
        
        return result.rows.map(row => row.doc);
      } catch (error) {
        console.error('[ERROR] Failed to retrieve errors:', error);
        return [];
      }
    },

    /**
     * Helper: Vider toutes les erreurs
     */
    async clearAllErrors() {
      try {
        const result = await this.db.allDocs({
          startkey: 'error-',
          endkey: 'error-\uffff'
        });
        
        for (const row of result.rows) {
          const doc = await this.db.get(row.id);
          await this.db.remove(doc._id, doc._rev);
        }
        
        console.log('[STORAGE] all-errors-cleared', {
          deleted: result.rows.length
        });
        
        Alpine.store('errorStorage', {
          db: this.db,
          lastSavedError: null,
          errorsCount: 0
        });
        
      } catch (error) {
        console.error('[ERROR] Failed to clear errors:', error);
      }
    }
  }));
});
