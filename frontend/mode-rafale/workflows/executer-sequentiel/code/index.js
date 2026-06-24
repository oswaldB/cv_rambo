/**
 * Mega-fonction : executer-sequentiel
 * Execution sequentielle des cibles en mode rafale
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('rafaleExecutor', () => ({
    isExecuting: false,
    selectedCibles: [],
    currentIndex: 0,

    get currentCible() {
      return this.selectedCibles[this.currentIndex] || null;
    },

    startRafale() {
      /**
       * @action Demarrer rafale
       * @checkpoint rafale-started
       */
      if (this.selectedIds.length === 0) return;

      // Charger les cibles selectionnees
      this.selectedCibles = this.eligibleCibles.filter(c => 
        this.selectedIds.includes(c._id)
      );

      this.currentIndex = 0;
      this.isExecuting = true;

      console.log('[CHECKPOINT]', 'rafale-started', {
        count: this.selectedCibles.length
      });

      console.log('[CHECKPOINT]', 'sequence-init', {
        firstCible: this.currentCible?._id
      });
    },

    next() {
      /**
       * @action Passer a la cible suivante
       * @checkpoint next-triggered
       */
      if (this.currentIndex < this.selectedCibles.length - 1) {
        this.currentIndex++;
        console.log('[CHECKPOINT]', 'target-changed', {
          index: this.currentIndex,
          cibleId: this.currentCible?._id
        });
      }
    },

    prev() {
      /**
       * @action Revenir a la cible precedente
       * @checkpoint prev-triggered
       */
      if (this.currentIndex > 0) {
        this.currentIndex--;
        console.log('[CHECKPOINT]', 'target-changed', {
          index: this.currentIndex,
          cibleId: this.currentCible?._id
        });
      }
    },

    async copyCurrentScript() {
      /**
       * @action Copier script courant
       * @checkpoint copy-triggered
       */
      if (!this.currentCible?.generatedScript) {
        alert('Script non disponible');
        return;
      }

      try {
        await navigator.clipboard.writeText(this.currentCible.generatedScript);
        console.log('[CHECKPOINT]', 'rafale-script-copied', {
          cibleId: this.currentCible._id
        });
        alert('Script copie !');
      } catch (err) {
        console.error('[CHECKPOINT]', 'rafale-copy-error', { error: err.message });
      }
    },

    async markCurrentApplied() {
      /**
       * @action Marquer cible actuelle comme postulee
       * @checkpoint applied-triggered
       */
      if (!this.currentCible) return;

      try {
        await window.dbUtils.updateCible(this.currentCible._id, {
          status: 'applied',
          appliedAt: new Date().toISOString()
        });

        console.log('[CHECKPOINT]', 'rafale-applied', {
          cibleId: this.currentCible._id
        });

        // Passer automatiquement a la suivante apres 500ms
        if (this.currentIndex < this.selectedCibles.length - 1) {
          setTimeout(() => this.next(), 500);
        }

      } catch (err) {
        console.error('[CHECKPOINT]', 'rafale-apply-error', { error: err.message });
        alert('Erreur: ' + err.message);
      }
    }
  }));
});
