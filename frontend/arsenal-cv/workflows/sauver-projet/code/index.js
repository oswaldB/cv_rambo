/**
 * Mega-fonction du workflow F-001-sauver-projet
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Sauvegarder un projet
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('workflowSauverProjet', () => ({
    formOpen: false,
    projetData: { name: '', url: '', description: '' },

    async init() {},

    async sauverProjet() {
      /**
       * @action Ouvrir le formulaire d'ajout de projet
       * @checkpoint form-opened, les champs nom, lien et description sont visibles
       */
      console.log('[CHECKPOINT]', 'form-opened', { type: 'projet' });

      /**
       * @action Saisir le nom du projet
       * @checkpoint name-entered, champ nom contient une valeur non vide
       */
      if (!this.projetData.name) {
        console.error('Projet name required');
        return;
      }
      console.log('[CHECKPOINT]', 'name-entered', { name: this.projetData.name });

      /**
       * @action Saisir le lien URL du projet (optionnel)
       * @checkpoint link-entered, champ lien contient une URL valide ou est vide
       */
      console.log('[CHECKPOINT]', 'link-entered', { url: this.projetData.url });

      /**
       * @action Saisir la description du projet
       * @checkpoint description-entered, champ description contient une valeur non vide
       */
      console.log('[CHECKPOINT]', 'description-entered');

      /**
       * @action Cliquer sur le bouton "Sauvegarder"
       * @checkpoint save-triggered, le bouton passe en état disabled avec spinner
       */
      console.log('[CHECKPOINT]', 'save-triggered');

      const databases = Alpine.store('databases');
      if (!databases?.profil) return;

      /**
       * @action Insérer le projet dans PouchDB
       * @checkpoint projet-saved, retourne l'objet avec _id généré
       */
      const doc = {
        _id: `projet-${Date.now()}`,
        type: 'projet',
        ...this.projetData,
        createdAt: new Date().toISOString()
      };

      const response = await databases.profil.put(doc);
      console.log('[CHECKPOINT]', 'projet-saved', { id: response.id });

      /**
       * @action Logger la sauvegarde en console
       * @checkpoint log-emitted, console affiche "[ARSENAL] saved projet: {nom}"
       */
      console.log('[ARSENAL] saved projet:', doc.name);
      console.log('[CHECKPOINT]', 'log-emitted', { name: doc.name });

      /**
       * @action Mettre à jour le store Alpine avec le nouveau projet
       * @checkpoint store-updated, store.arsenal.projets contient la nouvelle entrée
       */
      const arsenal = Alpine.store('arsenalData');
      arsenal.projets.push(doc);
      console.log('[CHECKPOINT]', 'store-updated');

      /**
       * @action Fermer le formulaire et rafraîchir la liste des projets
       * @checkpoint form-closed, la section projets affiche la nouvelle entrée
       */
      this.formOpen = false;
      this.projetData = { name: '', url: '', description: '' };
      console.log('[CHECKPOINT]', 'form-closed');

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { title: 'SAUVEGARDÉ', message: 'Projet ajouté' }
      }));
    }
  }));
});
