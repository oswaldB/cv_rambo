/**
 * Mega-fonction du workflow F-020-importer-donnees
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('workflowImporterDonnees', () => ({
    async importerDonnees(data) {
      console.log('[CHECKPOINT]', 'data-imported');
    }
  }));
});
