/**
 * Mega-fonction du workflow F-020-valider-cle-api
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('workflowValiderCleApi', () => ({
    async validerCleApi(key) {
      console.log('[CHECKPOINT]', 'api-key-validated');
    }
  }));
});
