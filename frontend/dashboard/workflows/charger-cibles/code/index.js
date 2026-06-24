/**
 * Mega-fonction : charger-cibles (Dashboard)
 * Charge et gère la liste des cibles depuis PouchDB
 * Framework: Alpine.js
 * Source: specs/_app/frontend/dashboard/workflows/charger-cibles/specs/spec.md
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('dashboardLoader', () => ({
    // State
    cibles: [],
    loading: false,
    error: null,
    currentFilter: null,
    
    // Stats
    stats: {
      new: 0,
      processing: 0,
      ready: 0,
      applied: 0,
      error: 0
    },
    
    // Change feed
    changesFeed: null,

    async loadCibles() {
      /**
       * @action Initialiser chargement
       * @checkpoint loading-started
       */
      this.loading = true;
      this.error = null;
      console.log('[CHECKPOINT]', 'loading-started');

      try {
        // Vérifier db disponible
        if (!window.db || !window.dbUtils) {
          throw new Error('PouchDB not initialized');
        }

        /**
         * @action Requête PouchDB
         * @checkpoint query-started
         */
        const result = await window.dbUtils.getCibles();
        console.log('[CHECKPOINT]', 'query-started');

        /**
         * @action Stocker résultat
         * @checkpoint cibles-loaded
         */
        this.cibles = result;
        console.log('[CHECKPOINT]', 'cibles-loaded', { count: result.length });

        /**
         * @action Calculer statistiques
         * @checkpoint stats-calculated
         */
        this.calculateStats();
        console.log('[CHECKPOINT]', 'stats-calculated', this.stats);

        /**
         * @action Configurer live updates
         * @checkpoint changes-watcher-started
         */
        this.setupChangesWatcher();
        console.log('[CHECKPOINT]', 'changes-watcher-started');

        /**
         * @checkpoint render-completed
         */
        console.log('[CHECKPOINT]', 'render-completed');

      } catch (err) {
        this.error = err.message;
        console.error('[CHECKPOINT]', 'loading-error', { error: err.message });
      } finally {
        this.loading = false;
      }
    },

    calculateStats() {
      this.stats = {
        new: this.cibles.filter(c => c.status === 'new').length,
        processing: this.cibles.filter(c => c.status === 'processing').length,
        ready: this.cibles.filter(c => c.status === 'script-ready').length,
        applied: this.cibles.filter(c => c.status === 'applied').length,
        error: this.cibles.filter(c => c.status === 'error').length
      };
    },

    setupChangesWatcher() {
      // Annuler ancien watcher
      if (this.changesFeed) {
        this.changesFeed.cancel();
      }

      // Configurer nouveau watcher
      this.changesFeed = window.db.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', (change) => {
        /**
         * @checkpoint change-detected
         */
        console.log('[CHECKPOINT]', 'change-detected', { 
          id: change.id, 
          deleted: change.deleted 
        });
        
        // Recharger les données
        this.refreshCibles();
      });
    },

    async refreshCibles() {
      /**
       * @action Rafraîchir données
       * @checkpoint refresh-started
       */
      try {
        const result = await window.dbUtils.getCibles();
        this.cibles = result;
        this.calculateStats();
        console.log('[CHECKPOINT]', 'refresh-completed', { count: result.length });
      } catch (err) {
        console.error('[CHECKPOINT]', 'refresh-error', { error: err.message });
      }
    },

    filterBy(status) {
      /**
       * @action Changer filtre
       * @checkpoint filter-changed
       */
      this.currentFilter = this.currentFilter === status ? null : status;
      console.log('[CHECKPOINT]', 'filter-changed', { filter: this.currentFilter });
    },

    get filteredCibles() {
      if (!this.currentFilter) {
        return this.cibles;
      }
      return this.cibles.filter(c => c.status === this.currentFilter);
    },

    async copyScript(cibleId) {
      /**
       * @action Copier script
       * @checkpoint copy-started
       */
      try {
        const cible = this.cibles.find(c => c._id === cibleId);
        if (!cible?.generatedScript) {
          throw new Error('Script not available');
        }

        await navigator.clipboard.writeText(cible.generatedScript);
        console.log('[CHECKPOINT]', 'copy-success', { cibleId });
        
        // Feedback utilisateur
        alert('Script copié dans le presse-papiers !');
        
      } catch (err) {
        console.error('[CHECKPOINT]', 'copy-error', { error: err.message });
        alert('Erreur lors de la copie: ' + err.message);
      }
    },

    viewCible(cibleId) {
      /**
       * @action Naviguer vers détail
       * @checkpoint navigation-started
       */
      console.log('[CHECKPOINT]', 'navigation-started', { cibleId });
      window.location.href = `../detail-cible/index.html?id=${encodeURIComponent(cibleId)}`;
    },

    cleanup() {
      if (this.changesFeed) {
        this.changesFeed.cancel();
      }
    }
  }));
});
