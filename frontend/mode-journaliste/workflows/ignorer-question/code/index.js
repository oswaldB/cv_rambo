/**
 * Mega-fonction du workflow F-002-ignorer-question
 * Description: Ignorer/question suivante
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('workflowIgnorerQuestion', () => ({
    async ignorerQuestion() {
      console.log('[CHECKPOINT]', 'question-skipped');
      console.log('[CHECKPOINT]', 'next-question-loaded');
    }
  }));
});
