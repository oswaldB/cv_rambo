/**
 * Mega-fonction du workflow F-006-filtrer-par-tag
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Filtrer les cibles par tag
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('kanbanFilter', {
    active: false,
    selectedTag: null,
    filteredCount: 0
  });

  Alpine.data('workflowFiltrerParTag', () => ({
    activeFilter: null,

    async init() {},

    async filtrerParTag(tag) {
      /**
       * @action Afficher le Kanban avec tous les filtres disponibles
       * @checkpoint kanban-with-filters-displayed, barre de filtres en haut avec tags disponibles
       */
      console.log('[CHECKPOINT]', 'kanban-with-filters-displayed');

      /**
       * @action Cliquer sur un tag dans la barre de filtres
       * @checkpoint filter-selected, le tag cliqué devient actif visuellement
       */
      this.activeFilter = tag;
      Alpine.store('kanbanFilter', { active: true, selectedTag: tag, filteredCount: 0 });

      console.log('[CHECKPOINT]', 'filter-selected', { tag });

      /**
       * @action Filtrer les cibles dans le store Alpine
       * @checkpoint cibles-filtered, seules les cibles avec le tag sélectionné restent visibles
       */
      const kanban = Alpine.store('kanbanData');
      let count = 0;

      Object.keys(kanban.columns).forEach(columnName => {
        kanban.columns[columnName].forEach(cible => {
          const hasTag = cible.tags && cible.tags.includes(tag);
          cible.hidden = !hasTag;
          if (hasTag) count++;
        });
      });

      Alpine.store('kanbanFilter', { active: true, selectedTag: tag, filteredCount: count });

      console.log('[CHECKPOINT]', 'cibles-filtered', { tag, count });

      /**
       * @action Mettre à jour l'affichage des colonnes
       * @checkpoint columns-filtered, chaque colonne n'affiche que les cartes correspondant au filtre
       */
      console.log('[CHECKPOINT]', 'columns-filtered');

      /**
       * @action Afficher le nombre de résultats filtrés
       * @checkpoint count-displayed, indicateur "X cibles affichées" visible
       */
      console.log('[CHECKPOINT]', 'count-displayed', { count });

      /**
       * @action Logger le filtrage en console
       * @checkpoint log-emitted, console affiche "[TAG] filtered #<tag>"
       */
      console.log('[TAG] filtered', tag);
      console.log('[CHECKPOINT]', 'log-emitted', { tag });

      /**
       * @action Permettre la désactivation du filtre
       * @checkpoint filter-clear-ready, bouton "Réinitialiser" ou clic sur le tag actif pour tout afficher
       */
      console.log('[CHECKPOINT]', 'filter-clear-ready');
    },

    async reinitialiserFiltre() {
      /**
       * @action Désactiver le filtre pour voir toutes les cibles
       * @checkpoint filter-cleared, toutes les cibles sont à nouveau visibles dans leurs colonnes
       */
      this.activeFilter = null;
      
      const kanban = Alpine.store('kanbanData');
      Object.keys(kanban.columns).forEach(columnName => {
        kanban.columns[columnName].forEach(cible => {
          cible.hidden = false;
        });
      });

      Alpine.store('kanbanFilter', { active: false, selectedTag: null, filteredCount: 0 });

      console.log('[CHECKPOINT]', 'filter-cleared');
    }
  }));
});
