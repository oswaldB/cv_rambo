/**
 * Mega-fonction : charger-kanban
 * Charge les cibles et les organise en colonnes
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('kanbanLoader', () => ({
    loading: false,
    columns: {
      'new': [],
      'script-ready': [],
      'applied': [],
      'error': []
    },
    changesFeed: null,

    initKanban() {
      if (window.db) {
        this.loadKanban();
      } else {
        window.addEventListener('db:ready', () => this.loadKanban(), { once: true });
      }
    },

    async loadKanban() {
      /**
       * @action Charger cibles pour Kanban
       * @checkpoint kanban-loading-started
       */
      this.loading = true;
      console.log('[CHECKPOINT]', 'kanban-loading-started');

      try {
        // Charger toutes les cibles
        const cibles = await window.dbUtils.getCibles();
        console.log('[CHECKPOINT]', 'cibles-loaded', { count: cibles.length });

        // Organiser par colonnes
        this.organizeColumns(cibles);
        console.log('[CHECKPOINT]', 'columns-organized', {
          new: this.columns.new.length,
          ready: this.columns['script-ready'].length,
          applied: this.columns.applied.length,
          error: this.columns.error.length
        });

        // Configurer live updates
        this.setupChangesWatcher();
        console.log('[CHECKPOINT]', 'kanban-ready');

      } catch (err) {
        console.error('[CHECKPOINT]', 'kanban-error', { error: err.message });
      } finally {
        this.loading = false;
      }
    },

    organizeColumns(cibles) {
      // Réinitialiser colonnes
      this.columns = {
        'new': [],
        'script-ready': [],
        'applied': [],
        'error': []
      };

      // Distribuer les cibles
      cibles.forEach(cible => {
        // Ignorer 'processing' dans Kanban (reste dans 'new')
        const col = cible.status === 'processing' ? 'new' : cible.status;
        if (this.columns[col]) {
          this.columns[col].push(cible);
        }
      });
    },

    setupChangesWatcher() {
      this.changesFeed = window.db.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', (change) => {
        if (change.doc.type === 'cible') {
          console.log('[CHECKPOINT]', 'kanban-change-detected', { id: change.id });
          this.refreshCibles();
        }
      });
    },

    async refreshCibles() {
      try {
        const cibles = await window.dbUtils.getCibles();
        this.organizeColumns(cibles);
      } catch (err) {
        console.error('[CHECKPOINT]', 'kanban-refresh-error', { error: err.message });
      }
    },

    viewCible(id) {
      window.location.href = `../detail-cible/index.html?id=${id}`;
    },

    async copyScript(cible) {
      if (!cible.generatedScript) return;
      try {
        await navigator.clipboard.writeText(cible.generatedScript);
        console.log('[CHECKPOINT]', 'script-copied', { cibleId: cible._id });
        alert('Script copié !');
      } catch (err) {
        console.error('[CHECKPOINT]', 'copy-error', { error: err.message });
      }
    },

    async markApplied(id) {
      try {
        await window.dbUtils.updateCible(id, {
          status: 'applied',
          appliedAt: new Date().toISOString()
        });
        console.log('[CHECKPOINT]', 'marked-applied', { cibleId: id });
      } catch (err) {
        console.error('[CHECKPOINT]', 'mark-error', { error: err.message });
      }
    },

    async retry(id) {
      try {
        await window.dbUtils.updateCible(id, {
          status: 'new',
          errorMessage: null
        });
        console.log('[CHECKPOINT]', 'retry-triggered', { cibleId: id });
      } catch (err) {
        console.error('[CHECKPOINT]', 'retry-error', { error: err.message });
      }
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR');
    },

    cleanup() {
      if (this.changesFeed) this.changesFeed.cancel();
    }
  }));
});
