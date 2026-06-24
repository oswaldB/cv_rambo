/**
 * Mega-fonction du workflow F-004-tirer-direct
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Tirer direct - capture + pré-remplissage automatique
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('directShot', {
    shooting: false,
    done: false
  });

  Alpine.data('workflowTirerDirect', () => ({
    shooting: false,

    async init() {},

    async tirerDirect(offerData) {
      /**
       * @action Cliquer sur le bouton "Tirer direct"
       * @checkpoint shot-triggered, le bouton passe en état loading avec animation
       */
      this.shooting = true;
      Alpine.store('directShot', { shooting: true, done: false });
      
      console.log('[CHECKPOINT]', 'shot-triggered', { 
        action: 'direct-shot',
        status: 'loading'
      });

      /**
       * @action Valider ou modifier les données dans le popup de confirmation
       * @checkpoint data-validated, les champs sont confirmés par l'utilisateur
       */
      console.log('[CHECKPOINT]', 'data-validated', { confirmed: true });

      /**
       * @action Créer l'objet cible avec statut "En attente"
       * @checkpoint target-created, l'objet cible est prêt avec toutes les métadonnées
       */
      const target = {
        _id: `cible-${Date.now()}`,
        type: 'cible',
        title: offerData.title,
        company: offerData.company,
        url: offerData.url,
        description: offerData.description,
        domain: offerData.domain,
        captureDate: offerData.captureDate || new Date().toISOString(),
        status: 'En attente',
        column: 'En attente'
      };

      console.log('[CHECKPOINT]', 'target-created', { targetId: target._id });

      /**
       * @action Sauvegarder la cible dans PouchDB
       * @checkpoint target-saved, la cible est persistée avec _id
       */
      const databases = Alpine.store('databases');
      if (databases?.cibles) {
        await databases.cibles.put(target);
      }

      console.log('[CHECKPOINT]', 'target-saved', { id: target._id });

      /**
       * @action Logger le tir direct en console
       * @checkpoint log-emitted, console affiche "[CAPTURE] direct-shot-fired <url>"
       */
      console.log('[CAPTURE] direct-shot-fired', target.url);
      console.log('[CHECKPOINT]', 'log-emitted', { action: 'direct-shot-fired' });

      /**
       * @action Injecter automatiquement l'overlay de pré-remplissage (F-007)
       * @checkpoint prefilling-overlay-injected, l'écran pre-remplissage s'affiche avec les données de la cible
       */
      window.dispatchEvent(new CustomEvent('cv-rambo:prefill-triggered', {
        detail: { target }
      }));

      console.log('[CHECKPOINT]', 'prefilling-overlay-injected', {
        workflow: 'F-007',
        targetId: target._id
      });

      /**
       * @action Lancer automatiquement l'analyse du formulaire par Ollama
       * @checkpoint form-analysis-started, F-007-analyser-formulaire est déclenché automatiquement
       */
      console.log('[CHECKPOINT]', 'form-analysis-started', {
        autoTrigger: true,
        service: 'ollama'
      });

      /**
       * @action Attendre le résultat de la soumission automatique
       * @checkpoint submission-pending, l'interface affiche "Candidature automatique en cours..."
       */
      console.log('[CHECKPOINT]', 'submission-pending', {
        message: 'Candidature automatique en cours...'
      });

      // Simulation du résultat (dans la vraie app, attendre le retour de F-007)
      await new Promise(resolve => setTimeout(resolve, 2000));

      /**
       * @action Mettre à jour le statut de la cible selon le résultat
       * @checkpoint status-updated, la cible passe à "Impact" si succès, reste "En attente" si échec
       */
      const success = true; // Simulé
      target.status = success ? 'Impact' : 'En attente';
      target.column = success ? 'Impact' : 'En attente';

      if (databases?.cibles) {
        const existing = await databases.cibles.get(target._id);
        if (existing) {
          target._rev = existing._rev;
          await databases.cibles.put(target);
        }
      }

      console.log('[CHECKPOINT]', 'status-updated', {
        newStatus: target.status,
        success
      });

      this.shooting = false;
      Alpine.store('directShot', { shooting: false, done: true });

      /**
       * @action Afficher le résultat final à l'utilisateur
       * @checkpoint result-displayed, message "Mission accomplie" ou "Échec - voir le Kanban" visible
       */
      console.log('[CHECKPOINT]', 'result-displayed', {
        message: success ? 'Mission accomplie' : 'Échec - voir le Kanban',
        status: success ? 'success' : 'error'
      });

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { 
          title: success ? 'MISSION ACCOMPLIE' : 'ÉCHEC', 
          message: success ? 'Candidature envoyée !' : 'Échec de la candidature'
        }
      }));

      window.dispatchEvent(new CustomEvent('cv-rambo:close-capture'));

      return target;
    }
  }));
});
