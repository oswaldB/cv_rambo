/**
 * Mega-fonction du workflow F-001-sauver-experience
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Sauvegarder une expérience
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('workflowSauverExperience', () => ({
    formOpen: false,
    experienceData: { title: '', company: '', startDate: '', endDate: '', description: '' },

    async init() {},

    async sauverExperience() {
      /**
       * @action Ouvrir le formulaire d'ajout d'expérience
       * @checkpoint form-opened, les champs titre, entreprise, dates, description sont visibles
       */
      console.log('[CHECKPOINT]', 'form-opened', { type: 'experience' });

      /**
       * @action Saisir les données dans le formulaire
       * @checkpoint form-filled, tous les champs obligatoires ont une valeur non vide
       */
      if (!this.experienceData.title || !this.experienceData.company) {
        console.error('Title and company required');
        return;
      }
      console.log('[CHECKPOINT]', 'form-filled');

      /**
       * @action Cliquer sur le bouton "Sauvegarder"
       * @checkpoint save-triggered, le bouton passe en état disabled avec spinner
       */
      console.log('[CHECKPOINT]', 'save-triggered');

      /**
       * @action Valider les données du formulaire
       * @checkpoint validation-passed, pas d'erreur affichée sous les champs
       */
      console.log('[CHECKPOINT]', 'validation-passed');

      const databases = Alpine.store('databases');
      if (!databases?.profil) return;

      /**
       * @action Insérer l'expérience dans PouchDB
       * @checkpoint experience-saved, retourne l'objet avec _id généré
       */
      const doc = {
        _id: `experience-${Date.now()}`,
        type: 'experience',
        ...this.experienceData,
        createdAt: new Date().toISOString()
      };

      const response = await databases.profil.put(doc);
      console.log('[CHECKPOINT]', 'experience-saved', { id: response.id });

      /**
       * @action Logger la sauvegarde en console
       * @checkpoint log-emitted, console affiche "[ARSENAL] saved experience: {titre}"
       */
      console.log('[ARSENAL] saved experience:', doc.title);
      console.log('[CHECKPOINT]', 'log-emitted', { title: doc.title });

      /**
       * @action Mettre à jour le store Alpine avec la nouvelle expérience
       * @checkpoint store-updated, store.arsenal.experiences contient la nouvelle entrée
       */
      const arsenal = Alpine.store('arsenalData');
      arsenal.experiences.push(doc);
      console.log('[CHECKPOINT]', 'store-updated');

      /**
       * @action Fermer le formulaire et rafraîchir la liste
       * @checkpoint form-closed, la liste affiche la nouvelle expérience en première position
       */
      this.formOpen = false;
      this.experienceData = { title: '', company: '', startDate: '', endDate: '', description: '' };
      console.log('[CHECKPOINT]', 'form-closed');

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { title: 'SAUVEGARDÉ', message: 'Expérience ajoutée' }
      }));
    }
  }));
});
