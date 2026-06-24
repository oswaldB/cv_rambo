/**
 * Mega-fonction du workflow F-020-sauver-setting
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('workflowSauverSetting', () => ({
    async sauverSetting(key, value) {
      console.log('[CHECKPOINT]', 'setting-saved', { key });
    }
  }));
});
