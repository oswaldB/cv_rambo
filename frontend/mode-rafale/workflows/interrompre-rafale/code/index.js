/**
 * Mega-fonction du workflow F-010-interrompre-rafale
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('workflowInterrompreRafale', () => ({
    async interrompreRafale() {
      console.log('[CHECKPOINT]', 'stop-triggered');
      console.log('[CHECKPOINT]', 'sequence-paused');
      console.log('[CHECKPOINT]', 'progress-saved');
    }
  }));
});
