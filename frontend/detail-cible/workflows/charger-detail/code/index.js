/**
 * Mega-fonction : charger-detail (Détail Cible)
 * Charge une cible spécifique et gère le live update
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('detailLoader', () => ({
    // State
    cibleId: null,
    cible: null,
    loading: false,
    error: null,
    changesFeed: null,

    // Status labels
    statusLabels: {
      'new': '🟡 Nouveau',
      'processing': '🔵 En cours',
      'script-ready': '🟢 Script prêt',
      'applied': '✅ Postulé',
      'error': '🔴 Erreur'
    },

    get statusLabel() {
      return this.statusLabels[this.cible?.status] || this.cible?.status;
    },

    initDetail() {
      /**
       * @action Initialiser détail
       * @checkpoint detail-init-started
       */
      console.log('[CHECKPOINT]', 'detail-init-started');
      
      // Extraire ID de l'URL
      const urlParams = new URLSearchParams(window.location.search);
      this.cibleId = urlParams.get('id');
      
      if (!this.cibleId) {
        this.error = 'Aucune cible spécifiée';
        console.log('[CHECKPOINT]', 'detail-init-error', { error: 'No ID' });
        return;
      }
      
      // Attendre que PouchDB soit prêt
      if (window.db) {
        this.loadCible();
      } else {
        window.addEventListener('db:ready', () => this.loadCible(), { once: true });
      }
    },

    async loadCible() {
      /**
       * @action Charger cible depuis PouchDB
       * @checkpoint doc-fetched
       */
      this.loading = true;
      this.error = null;
      
      try {
        console.log('[CHECKPOINT]', 'doc-fetch-started', { id: this.cibleId });
        
        this.cible = await window.dbUtils.getCible(this.cibleId);
        
        console.log('[CHECKPOINT]', 'doc-fetched', { 
          id: this.cible._id,
          status: this.cible.status 
        });

        /**
         * @action Configurer live update
         * @checkpoint changes-watcher-started
         */
        this.setupChangesWatcher();
        console.log('[CHECKPOINT]', 'changes-watcher-started');

        /**
         * @checkpoint detail-rendered
         */
        console.log('[CHECKPOINT]', 'detail-rendered');

      } catch (err) {
        if (err.status === 404) {
          this.error = 'Cible introuvable';
        } else {
          this.error = err.message;
        }
        console.error('[CHECKPOINT]', 'doc-fetch-error', { 
          error: err.message,
          status: err.status 
        });
      } finally {
        this.loading = false;
      }
    },

    setupChangesWatcher() {
      /**
       * @action Configurer watcher changements
       * @checkpoint watcher-configured
       */
      if (this.changesFeed) {
        this.changesFeed.cancel();
      }

      this.changesFeed = window.db.changes({
        since: 'now',
        live: true,
        include_docs: true,
        doc_ids: [this.cibleId]
      }).on('change', (change) => {
        /**
         * @checkpoint change-detected
         */
        console.log('[CHECKPOINT]', 'change-detected', { 
          id: change.id,
          rev: change.doc._rev 
        });

        if (change.deleted) {
          this.error = 'Cible supprimée';
          return;
        }

        // Mettre à jour la cible
        this.cible = change.doc;
        
        console.log('[CHECKPOINT]', 'detail-updated', { 
          status: this.cible.status 
        });
      });
    },

    async copyScript() {
      /**
       * @action Copier script
       * @checkpoint copy-started
       */
      if (!this.cible?.generatedScript) return;
      
      try {
        await navigator.clipboard.writeText(this.cible.generatedScript);
        console.log('[CHECKPOINT]', 'copy-success');
        alert('Script copié !');
      } catch (err) {
        console.error('[CHECKPOINT]', 'copy-error', { error: err.message });
        alert('Erreur lors de la copie');
      }
    },

    async markAsApplied() {
      /**
       * @action Marquer comme postulé
       * @checkpoint status-update-started
       */
      if (!this.cible) return;
      
      try {
        console.log('[CHECKPOINT]', 'status-update-started', { 
          from: this.cible.status, 
          to: 'applied' 
        });
        
        await window.dbUtils.updateCible(this.cibleId, {
          status: 'applied',
          appliedAt: new Date().toISOString()
        });
        
        console.log('[CHECKPOINT]', 'status-updated', { status: 'applied' });
        
      } catch (err) {
        console.error('[CHECKPOINT]', 'status-update-error', { error: err.message });
        alert('Erreur: ' + err.message);
      }
    },

    async retryGeneration() {
      /**
       * @action Réessayer génération
       * @checkpoint retry-started
       */
      if (!this.cible) return;
      
      try {
        console.log('[CHECKPOINT]', 'retry-started', { cibleId: this.cibleId });
        
        await window.dbUtils.updateCible(this.cibleId, {
          status: 'new',
          errorMessage: null,
          retryCount: (this.cible.retryCount || 0) + 1
        });
        
        console.log('[CHECKPOINT]', 'retry-submitted');
        
      } catch (err) {
        console.error('[CHECKPOINT]', 'retry-error', { error: err.message });
      }
    },

    goBack() {
      /**
       * @action Retour dashboard
       * @checkpoint navigation-back
       */
      console.log('[CHECKPOINT]', 'navigation-back');
      window.location.href = '../dashboard/index.html';
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    cleanup() {
      if (this.changesFeed) {
        this.changesFeed.cancel();
      }
    }
  }));
});
