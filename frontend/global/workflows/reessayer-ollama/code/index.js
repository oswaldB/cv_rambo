/**
 * Mega-fonction du workflow F-019-reessayer-ollama
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Tentative de reprise automatique sur erreur Ollama
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('ollamaRetry', {
    retryCount: 0,
    maxRetries: 3,
    isRetrying: false,
    lastError: null
  });

  Alpine.data('workflowReessayerOllama', () => ({
    initialized: false,
    retryQueue: [],
    RETRY_DELAY: 3000,

    async init() {
      await this.initialiserRetry();
    },

    async initialiserRetry() {
      /**
       * @action Détecter une erreur Ollama
       * @checkpoint ollama-error-detected, type=ollama identifié (timeout, network error, 5xx)
       */
      
      window.addEventListener('cv-rambo:retry-ollama', (event) => {
        this.handleOllamaError(event.detail);
      });

      console.log('[CHECKPOINT]', 'ollama-error-detected', {
        listener: 'cv-rambo:retry-ollama',
        maxRetries: 3,
        status: 'listening'
      });

      this.initialized = true;

      Alpine.store('ollamaRetry', {
        retryCount: 0,
        maxRetries: 3,
        isRetrying: false,
        lastError: null
      });
    },

    async handleOllamaError(detail) {
      const { error } = detail;
      
      // Vérifier si c'est une erreur récupérable
      if (!this.isRetryableError(error)) {
        // Pas récupérable, dispatcher vers stocker-erreur directement
        window.dispatchEvent(new CustomEvent('cv-rambo:store-error', {
          detail: { error }
        }));
        return;
      }

      const currentRetry = Alpine.store('ollamaRetry').retryCount;
      
      if (currentRetry >= 3) {
        /**
         * @action Gérer l'échec de la reprise
         * @checkpoint retry-failed, échec après 3 tentatives → stocker-erreur + toast erreur final
         */
        
        Alpine.store('ollamaRetry', {
          retryCount: 0,
          maxRetries: 3,
          isRetrying: false,
          lastError: error
        });

        window.dispatchEvent(new CustomEvent('cv-rambo:store-error', {
          detail: { error }
        }));

        window.dispatchEvent(new CustomEvent('cv-rambo:show-error-toast', {
          detail: {
            title: 'CONNEXION OLLAMA ÉCHOUÉE',
            message: 'Impossible de se connecter après 3 tentatives'
          }
        }));

        console.log('[CHECKPOINT]', 'retry-failed', {
          attempts: 3,
          action: 'stored-error-and-toast'
        });

        return;
      }

      /**
       * @action Afficher le message "Reprise..."
       * @checkpoint retry-message-shown, toast ou indicator "Tentative de reconnexion..." visible
       */
      
      window.dispatchEvent(new CustomEvent('cv-rambo:show-info-toast', {
        detail: {
          title: 'REPRISE',
          message: `Tentative de reconnexion ${currentRetry + 1}/3...`
        }
      }));

      console.log('[CHECKPOINT]', 'retry-message-shown', {
        attempt: currentRetry + 1,
        message: 'Tentative de reconnexion...'
      });

      /**
       * @action Attendre 3 secondes avant réessai
       * @checkpoint retry-delay-started, setTimeout de 3000ms pour laisser le réseau se stabiliser
       */
      
      Alpine.store('ollamaRetry', {
        retryCount: currentRetry + 1,
        maxRetries: 3,
        isRetrying: true,
        lastError: error
      });

      console.log('[CHECKPOINT]', 'retry-delay-started', {
        delay: 3000,
        attempt: currentRetry + 1
      });

      await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));

      /**
       * @action Vérifier la connexion réseau
       * @checkpoint network-checked, navigator.onLine vérifié avant réessai
       */
      
      const isOnline = navigator.onLine;
      
      console.log('[CHECKPOINT]', 'network-checked', {
        online: isOnline,
        timestamp: new Date().toISOString()
      });

      if (!isOnline) {
        // Pas de réseau, réessayer plus tard
        this.handleOllamaError(detail);
        return;
      }

      /**
       * @action Relancer la requête Ollama
       * @checkpoint request-retried, nouvelle tentative avec les mêmes paramètres
       */
      
      const retryPayload = error.originalRequest || {};
      
      console.log('[CHECKPOINT]', 'request-retried', {
        attempt: currentRetry + 1,
        endpoint: retryPayload.endpoint || 'unknown'
      });

      /**
       * @action Logger les tentatives
       * @checkpoint retry-logged, console affiche "[ERROR] ollama-retry-<n>" à chaque tentative
       */
      
      console.log(`[ERROR] ollama-retry-${currentRetry + 1}`, {
        message: error.message,
        timestamp: new Date().toISOString()
      });

      console.log('[CHECKPOINT]', 'retry-logged', {
        attempt: currentRetry + 1,
        logLevel: 'error'
      });

      // Émettre événement pour que le workflow appelant refasse la requête
      window.dispatchEvent(new CustomEvent('cv-rambo:ollama-retry-request', {
        detail: {
          ...retryPayload,
          retryAttempt: currentRetry + 1,
          originalError: error
        }
      }));
    },

    /**
     * @action Gérer le succès de la reprise
     * @checkpoint retry-success, la requête réussit → continuer normalement
     */
    markRetrySuccess() {
      Alpine.store('ollamaRetry', {
        retryCount: 0,
        maxRetries: 3,
        isRetrying: false,
        lastError: null
      });

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: {
          title: 'CONNECTÉ',
          message: 'Connexion à Ollama rétablie'
        }
      }));

      console.log('[CHECKPOINT]', 'retry-success', {
        status: 'connected',
        retryCount: 0
      });
    },

    isRetryableError(error) {
      const message = (error.message || '').toLowerCase();
      const type = (error.type || '').toLowerCase();
      
      // Erreurs récupérables
      const retryable = [
        'timeout',
        'network',
        'fetch',
        'connection',
        'econnrefused',
        '502',
        '503',
        '504'
      ];
      
      return retryable.some(keyword => 
        message.includes(keyword) || type.includes(keyword)
      );
    },

    /**
     * Helper: Réinitialiser le compteur de retry
     */
    resetRetryCount() {
      Alpine.store('ollamaRetry', {
        retryCount: 0,
        maxRetries: 3,
        isRetrying: false,
        lastError: null
      });
    }
  }));
});
