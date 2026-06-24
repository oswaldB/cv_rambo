/**
 * Mega-fonction : selectionner-cibles
 * Gestion de la sélection multiple pour mode rafale
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('rafaleSelector', () => ({
    eligibleCibles: [],
    selectedIds: [],
    MAX_SELECTION: 10,

    initRafale() {
      if (window.db) {
        this.loadEligibleCibles();
      } else {
        window.addEventListener('db:ready', () => this.loadEligibleCibles(), { once: true });
      }
    },

    async loadEligibleCibles() {
      /**
       * @action Charger cibles éligibles
       * @checkpoint eligible-loading-started
       */
      console.log('[CHECKPOINT]', 'eligible-loading-started');

      try {
        // Cibles éligibles: status 'new' ou 'script-ready'
        const allCibles = await window.dbUtils.getCibles();
        
        this.eligibleCibles = allCibles.filter(c => 
          c.status === 'new' || c.status === 'script-ready'
        );

        console.log('[CHECKPOINT]', 'eligible-loaded', {
          total: allCibles.length,
          eligible: this.eligibleCibles.length
        });

        // Configurer watcher
        window.db.changes({
          since: 'now',
          live: true,
          include_docs: true
        }).on('change', () => {
          this.refreshEligible();
        });

      } catch (err) {
        console.error('[CHECKPOINT]', 'eligible-error', { error: err.message });
      }
    },

    async refreshEligible() {
      try {
        const allCibles = await window.dbUtils.getCibles();
        this.eligibleCibles = allCibles.filter(c => 
          c.status === 'new' || c.status === 'script-ready'
        );
        
        // Nettoyer sélection si cible plus éligible
        this.selectedIds = this.selectedIds.filter(id => 
          this.eligibleCibles.some(c => c._id === id)
        );
      } catch (err) {
        console.error('[CHECKPOINT]', 'refresh-error', { error: err.message });
      }
    },

    toggleSelection(cibleId) {
      /**
       * @action Toggle sélection
       * @checkpoint selection-changed
       */
      const index = this.selectedIds.indexOf(cibleId);
      
      if (index > -1) {
        // Désélectionner
        this.selectedIds.splice(index, 1);
        console.log('[CHECKPOINT]', 'selection-removed', { cibleId });
      } else {
        // Sélectionner (vérifier limite)
        if (this.selectedIds.length >= this.MAX_SELECTION) {
          console.log('[CHECKPOINT]', 'selection-rejected', { reason: 'limit-reached' });
          alert(`Maximum ${this.MAX_SELECTION} cibles sélectionnables`);
          return;
        }
        this.selectedIds.push(cibleId);
        console.log('[CHECKPOINT]', 'selection-added', { cibleId });
      }
    },

    isSelected(cibleId) {
      return this.selectedIds.includes(cibleId);
    },

    get selectedCount() {
      return this.selectedIds.length;
    }
  }));
});
