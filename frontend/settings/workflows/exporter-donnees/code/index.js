/**
 * Mega-fonction du workflow F-020-exporter-donnees
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('workflowExporterDonnees', () => ({
    async exporterDonnees() {
      console.log('[CHECKPOINT]', 'data-exported');
    }
  }));
});
