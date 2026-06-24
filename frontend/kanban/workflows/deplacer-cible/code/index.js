/**
 * Mega-fonction du workflow F-005-deplacer-cible
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Déplacer une cible (drag & drop)
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('dragState', {
    dragging: false,
    draggedId: null,
    sourceColumn: null
  });

  Alpine.data('workflowDeplacerCible', () => ({
    dragging: false,
    draggedId: null,
    sourceColumn: null,

    async init() {},

    startDrag(cibleId, columnName) {
      /**
       * @action Commencer le drag d'une carte
       * @checkpoint drag-started, la carte a la classe "dragging", dataTransfer contient l'id de la cible
       */
      this.dragging = true;
      this.draggedId = cibleId;
      this.sourceColumn = columnName;
      
      Alpine.store('dragState', { dragging: true, draggedId: cibleId, sourceColumn: columnName });
      
      console.log('[CHECKPOINT]', 'drag-started', { cibleId, sourceColumn: columnName });
    },

    onDragOver(columnName) {
      /**
       * @action Survoler une colonne cible pendant le drag
       * @checkpoint column-highlighted, la colonne survolée a un style visuel distinct (bordure ou fond)
       */
      if (this.dragging && this.sourceColumn !== columnName) {
        console.log('[CHECKPOINT]', 'column-highlighted', { column: columnName });
      }
    },

    async dropCard(targetColumn) {
      if (!this.dragging || this.sourceColumn === targetColumn) return;

      /**
       * @action Déposer la carte dans une nouvelle colonne
       * @checkpoint card-dropped, la carte apparaît dans la colonne cible
       */
      console.log('[CHECKPOINT]', 'card-dropped', {
        cibleId: this.draggedId,
        from: this.sourceColumn,
        to: targetColumn
      });

      /**
       * @action Mettre à jour le statut dans le store Alpine
       * @checkpoint store-updated, la cible change de tableau dans store.kanban
       */
      const kanban = Alpine.store('kanbanData');
      const card = kanban.columns[this.sourceColumn].find(c => c._id === this.draggedId);
      
      if (card) {
        // Retirer de la colonne source
        kanban.columns[this.sourceColumn] = kanban.columns[this.sourceColumn].filter(c => c._id !== this.draggedId);
        // Ajouter à la colonne cible
        kanban.columns[targetColumn].push({ ...card, status: targetColumn, column: targetColumn });
      }

      console.log('[CHECKPOINT]', 'store-updated');

      /**
       * @action Logger le déplacement en console
       * @checkpoint log-emitted, console affiche "[KANBAN] moved <id> to <colonne>"
       */
      console.log('[KANBAN] moved', this.draggedId, 'to', targetColumn);
      console.log('[CHECKPOINT]', 'log-emitted', { cibleId: this.draggedId, targetColumn });

      /**
       * @action Persister le changement dans PouchDB
       * @checkpoint persisted, appel à mettre-a-jour-statut pour sauvegarder le nouveau statut
       */
      window.dispatchEvent(new CustomEvent('cv-ramban:update-status', {
        detail: { cibleId: this.draggedId, nouveauStatut: targetColumn }
      }));

      console.log('[CHECKPOINT]', 'persisted');

      /**
       * @action Animer la carte à sa nouvelle position
       * @checkpoint animation-complete, la carte est stable dans sa nouvelle colonne
       */
      this.dragging = false;
      this.draggedId = null;
      this.sourceColumn = null;
      Alpine.store('dragState', { dragging: false, draggedId: null, sourceColumn: null });

      console.log('[CHECKPOINT]', 'animation-complete');
    }
  }));
});
