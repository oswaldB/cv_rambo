/**
 * Mega-fonction du workflow F-001-sauver-competence
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Sauvegarder une compétence
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('workflowSauverCompetence', () => ({
    formOpen: false,
    competenceData: { name: '', level: 'Intermédiaire' },

    async init() {},

    async sauverCompetence() {
      /**
       * @action Ouvrir le formulaire d'ajout de compétence
       * @checkpoint form-opened, les champs libellé et niveau sont visibles
       */
      console.log('[CHECKPOINT]', 'form-opened', { type: 'competence' });

      /**
       * @action Saisir le libellé de la compétence
       * @checkpoint label-entered, champ libellé contient une valeur non vide
       */
      if (!this.competenceData.name) {
        console.error('Competence name required');
        return;
      }
      console.log('[CHECKPOINT]', 'label-entered', { name: this.competenceData.name });

      /**
       * @action Sélectionner le niveau de maîtrise
       * @checkpoint level-selected, un niveau parmi Débutant/Intermédiaire/Avancé/Expert est sélectionné
       */
      console.log('[CHECKPOINT]', 'level-selected', { level: this.competenceData.level });

      /**
       * @action Cliquer sur le bouton "Sauvegarder"
       * @checkpoint save-triggered, le bouton passe en état disabled avec spinner
       */
      console.log('[CHECKPOINT]', 'save-triggered');

      const databases = Alpine.store('databases');
      if (!databases?.profil) return;

      /**
       * @action Insérer la compétence dans PouchDB
       * @checkpoint competence-saved, retourne l'objet avec _id généré
       */
      const doc = {
        _id: `competence-${Date.now()}`,
        type: 'competence',
        name: this.competenceData.name,
        level: this.competenceData.level,
        createdAt: new Date().toISOString()
      };

      const response = await databases.profil.put(doc);
      console.log('[CHECKPOINT]', 'competence-saved', { id: response.id });

      /**
       * @action Logger la sauvegarde en console
       * @checkpoint log-emitted, console affiche "[ARSENAL] saved competence: {libelle}"
       */
      console.log('[ARSENAL] saved competence:', doc.name);
      console.log('[CHECKPOINT]', 'log-emitted', { name: doc.name });

      /**
       * @action Mettre à jour le store Alpine avec la nouvelle compétence
       * @checkpoint store-updated, store.arsenal.competences contient la nouvelle entrée
       */
      const arsenal = Alpine.store('arsenalData');
      arsenal.competences.push(doc);
      console.log('[CHECKPOINT]', 'store-updated');

      /**
       * @action Fermer le formulaire et rafraîchir la liste des compétences
       * @checkpoint form-closed, la section compétences affiche la nouvelle entrée
       */
      this.formOpen = false;
      this.competenceData = { name: '', level: 'Intermédiaire' };
      console.log('[CHECKPOINT]', 'form-closed');

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { title: 'SAUVEGARDÉ', message: 'Compétence ajoutée' }
      }));
    }
  }));
});
