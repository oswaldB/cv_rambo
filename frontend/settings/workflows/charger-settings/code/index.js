/**
 * Mega-fonction du workflow F-020-charger-settings
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('workflowChargerSettings', () => ({
    async chargerSettings() {
      console.log('[CHECKPOINT]', 'settings-loaded');
    }
  }));
});
