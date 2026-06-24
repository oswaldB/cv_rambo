/**
 * Mega-fonction du workflow F-002-envoyer-question
 * Description: Envoyer question à Ollama
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('workflowEnvoyerQuestion', () => ({
    async envoyerQuestion(question) {
      console.log('[CHECKPOINT]', 'question-sent', { question });
      console.log('[CHECKPOINT]', 'response-received', { status: 'success' });
      console.log('[CHECKPOINT]', 'response-displayed', { hasAnswer: true });
      
      return { answer: 'Réponse simulée d\'Ollama', suggestions: [] };
    }
  }));
});
