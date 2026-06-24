/**
 * Mega-fonction : deplacer-carte
 * Gestion du drag & drop entre colonnes
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('dragDrop', () => ({
    draggedId: null,
    draggedFrom: null,
    dragOverColumn: null,

    dragStart(cibleId, fromColumn) {
      /**
       * @action Débuter drag
       * @checkpoint drag-started
       */
      this.draggedId = cibleId;
      this.draggedFrom = fromColumn;
      console.log('[CHECKPOINT]', 'drag-started', { cibleId, fromColumn });
    },

    dragEnd() {
      /**
       * @action Finir drag
       * @checkpoint drag-ended
       */
      console.log('[CHECKPOINT]', 'drag-ended');
      this.draggedId = null;
      this.draggedFrom = null;
      this.dragOverColumn = null;
    },

    async drop(toColumn) {
      /**
       * @action Déposer carte
       * @checkpoint drop-attempted
       */
      if (!this.draggedId || this.draggedFrom === toColumn) {
        this.dragOverColumn = null;
        return;
      }

      console.log('[CHECKPOINT]', 'drop-attempted', {
        cibleId: this.draggedId,
        from: this.draggedFrom,
        to: toColumn
      });

      try {
        // Vérifier transition valide
        const validTransitions = {
          'new': ['script-ready'],
          'script-ready': ['applied', 'new'],
          'applied': ['new'],
          'error': ['new']
        };

        if (!validTransitions[this.draggedFrom]?.includes(toColumn)) {
          console.log('[CHECKPOINT]', 'drop-rejected', { reason: 'invalid-transition' });
          return;
        }

        /**
         * @action Mettre à jour statut
         * @checkpoint status-changed
         */
        const updates = { status: toColumn };
        
        if (toColumn === 'applied') {
          updates.appliedAt = new Date().toISOString();
        }

        await window.dbUtils.updateCible(this.draggedId, updates);
        
        console.log('[CHECKPOINT]', 'status-changed', {
          cibleId: this.draggedId,
          newStatus: toColumn
        });

        /**
         * @action Sync automatique
         * @checkpoint synced
         */
        console.log('[CHECKPOINT]', 'synced', { cibleId: this.draggedId });

      } catch (err) {
        console.error('[CHECKPOINT]', 'drop-error', { error: err.message });
        alert('Erreur lors du déplacement');
      } finally {
        this.dragOverColumn = null;
      }
    }
  }));
});
