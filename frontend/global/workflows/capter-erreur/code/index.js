/**
 * Mega-fonction du workflow F-019-capter-erreur
 * Source: specs/spec.md
 * Framework: Alpine.js (PAS de JS vanille)
 * Description: Capter et journaliser les erreurs globales
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('errorHandler', {
    errors: [],
    lastError: null,
    handlersInstalled: false
  });

  Alpine.data('workflowCapterErreur', () => ({
    errors: [],
    handlersInstalled: false,

    async init() {
      await this.installerGestionnaireErreurs();
    },

    async installerGestionnaireErreurs() {
      try {
        /**
         * @action Installer un gestionnaire d'erreurs global
         * @checkpoint error-handler-installed, window.onerror et window.addEventListener('unhandledrejection') configurés
         */
        
        // Gestionnaire d'erreurs synchrones
        window.onerror = (message, source, lineno, colno, error) => {
          this.handleSyncError(message, source, lineno, colno, error);
          return false; // Laisse l'erreur remonter
        };

        // Gestionnaire d'erreurs asynchrones (Promises)
        window.addEventListener('unhandledrejection', (event) => {
          this.handleAsyncError(event.reason);
        });

        this.handlersInstalled = true;
        
        Alpine.store('errorHandler', {
          errors: this.errors,
          lastError: null,
          handlersInstalled: true
        });

        console.log('[CHECKPOINT]', 'error-handler-installed', { 
          syncHandler: 'window.onerror',
          asyncHandler: 'unhandledrejection',
          status: 'active'
        });

      } catch (error) {
        console.error('[ERROR] Failed to install error handlers:', error);
        throw error;
      }
    },

    handleSyncError(message, source, lineno, colno, error) {
      /**
       * @action Détecter une erreur synchrone
       * @checkpoint sync-error-detected, window.onerror capture une erreur JavaScript
       */
      
      const errorInfo = {
        timestamp: new Date().toISOString(),
        component: this.extractComponentName(source),
        message: message,
        stack: error?.stack || 'No stack trace',
        type: 'sync',
        source: source,
        line: lineno,
        column: colno
      };

      console.log('[CHECKPOINT]', 'sync-error-detected', { 
        type: 'sync',
        message: message,
        source: source
      });

      this.processError(errorInfo);
    },

    handleAsyncError(reason) {
      /**
       * @action Détecter une erreur asynchrone (Promise rejetée)
       * @checkpoint async-error-detected, unhandledrejection capture une Promise non gérée
       */
      
      const errorInfo = {
        timestamp: new Date().toISOString(),
        component: 'async-promise',
        message: reason?.message || String(reason),
        stack: reason?.stack || 'No stack trace',
        type: 'async',
        source: 'promise-rejection'
      };

      console.log('[CHECKPOINT]', 'async-error-detected', { 
        type: 'async',
        reason: errorInfo.message
      });

      this.processError(errorInfo);
    },

    processError(errorInfo) {
      /**
       * @action Extraire les informations de l'erreur
       * @checkpoint error-info-extracted, {timestamp, component, message, stack, type} extraits
       */
      
      this.errors.push(errorInfo);
      
      Alpine.store('errorHandler', {
        errors: this.errors,
        lastError: errorInfo,
        handlersInstalled: this.handlersInstalled
      });

      console.log('[CHECKPOINT]', 'error-info-extracted', {
        timestamp: errorInfo.timestamp,
        component: errorInfo.component,
        message: errorInfo.message,
        type: errorInfo.type
      });

      /**
       * @action Logger l'erreur en console
       * @checkpoint error-logged, console affiche "[ERROR] <composant> <message>" avec stack trace
       */
      console.error(`[ERROR] ${errorInfo.component}: ${errorInfo.message}`, {
        stack: errorInfo.stack,
        timestamp: errorInfo.timestamp,
        source: errorInfo.source
      });
      
      console.log('[CHECKPOINT]', 'error-logged', {
        component: errorInfo.component,
        message: errorInfo.message
      });

      /**
       * @action Déterminer le type d'erreur
       * @checkpoint error-type-determined, classification : pouchdb, ollama, network, dom, unknown
       */
      const errorType = this.classifyError(errorInfo);
      
      console.log('[CHECKPOINT]', 'error-type-determined', {
        classification: errorType,
        keywords: this.getErrorKeywords(errorInfo.message)
      });

      /**
       * @action Dispatcher vers le gestionnaire approprié
       * @checkpoint error-dispatched, si type=ollama → reessayer-ollama, sinon → stocker-erreur
       */
      this.dispatchError(errorInfo, errorType);

      /**
       * @action Afficher un toast d'erreur à l'utilisateur
       * @checkpoint toast-triggered, événement pour afficher-toast-erreur émis avec le message
       */
      this.triggerToast(errorInfo);
    },

    classifyError(errorInfo) {
      const message = errorInfo.message.toLowerCase();
      const stack = (errorInfo.stack || '').toLowerCase();
      const combined = message + ' ' + stack;

      if (combined.includes('pouchdb') || combined.includes('indexeddb') || combined.includes('db') || combined.includes('storage')) {
        return 'pouchdb';
      }
      if (combined.includes('ollama') || combined.includes('ollama-client') || combined.includes('lm-studio')) {
        return 'ollama';
      }
      if (combined.includes('network') || combined.includes('fetch') || combined.includes('xhr') || combined.includes('http') || combined.includes('connection')) {
        return 'network';
      }
      if (combined.includes('dom') || combined.includes('element') || combined.includes('queryselector') || combined.includes('undefined is not an object')) {
        return 'dom';
      }
      
      return 'unknown';
    },

    getErrorKeywords(message) {
      const keywords = ['pouchdb', 'ollama', 'network', 'fetch', 'dom', 'storage', 'db'];
      return keywords.filter(kw => message.toLowerCase().includes(kw));
    },

    dispatchError(errorInfo, errorType) {
      // Dispatcher vers le gestionnaire approprié
      if (errorType === 'ollama') {
        // Déclencher workflow reessayer-ollama
        window.dispatchEvent(new CustomEvent('cv-rambo:retry-ollama', {
          detail: { error: errorInfo }
        }));
        
        console.log('[CHECKPOINT]', 'error-dispatched', {
          errorType: errorType,
          target: 'reessayer-ollama',
          action: 'retry'
        });
      } else {
        // Déclencher workflow stocker-erreur
        window.dispatchEvent(new CustomEvent('cv-rambo:store-error', {
          detail: { error: errorInfo, type: errorType }
        }));
        
        console.log('[CHECKPOINT]', 'error-dispatched', {
          errorType: errorType,
          target: 'stocker-erreur',
          action: 'store'
        });
      }
    },

    triggerToast(errorInfo) {
      // Émettre événement pour afficher-toast-erreur
      window.dispatchEvent(new CustomEvent('cv-rambo:show-error-toast', {
        detail: {
          message: errorInfo.message,
          component: errorInfo.component,
          type: errorInfo.type
        }
      }));

      console.log('[CHECKPOINT]', 'toast-triggered', {
        event: 'cv-rambo:show-error-toast',
        message: errorInfo.message,
        component: errorInfo.component
      });
    },

    /**
     * Helper: Extraire le nom du composant depuis l'URL source
     */
    extractComponentName(source) {
      if (!source) return 'unknown';
      
      const parts = source.split('/');
      const filename = parts[parts.length - 1];
      
      if (filename.includes('arsenal-cv')) return 'arsenal-cv';
      if (filename.includes('kanban')) return 'kanban';
      if (filename.includes('capture-offre')) return 'capture-offre';
      if (filename.includes('mode-journaliste')) return 'mode-journaliste';
      if (filename.includes('mode-rafale')) return 'mode-rafale';
      if (filename.includes('pouchdb') || filename.includes('pouch')) return 'pouchdb';
      if (filename.includes('ollama')) return 'ollama';
      
      return filename.replace(/\.[^.]+$/, '') || 'unknown';
    },

    /**
     * Helper: Simuler une erreur pour les tests
     */
    simulateError(message = 'Test error') {
      throw new Error(message);
    }
  }));
});
