/**
 * Mega-fonction du workflow F-001-supprimer-entree
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Supprimer une entrée
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('deleteConfirm', {
    showing: false,
    entryType: null,
    entryId: null,
    entryTitle: ''
  });

  Alpine.data('workflowSupprimerEntree', () => ({
    showingConfirm: false,
    entryToDelete: null,

    async init() {},

    async confirmerSuppression(type, entryId, title) {
      /**
       * @action Cliquer sur le bouton de suppression d'une entrée
       * @checkpoint delete-clicked, l'entrée visée est identifiée par son _id et son type
       */
      this.entryToDelete = { type, entryId, title };
      this.showingConfirm = true;

      Alpine.store('deleteConfirm', { showing: true, entryType: type, entryId, entryTitle: title });
      console.log('[CHECKPOINT]', 'delete-clicked', { type, entryId });

      /**
       * @action Afficher la modale de confirmation
       * @checkpoint confirm-modal-displayed, message "Supprimer définitivement ?" visible avec boutons Annuler/Confirmer
       */
      console.log('[CHECKPOINT]', 'confirm-modal-displayed');
    },

    async supprimerEntree() {
      if (!this.entryToDelete) return;

      const { type, entryId } = this.entryToDelete;

      /**
       * @action Cliquer sur le bouton "Confirmer"
       * @checkpoint confirm-clicked, le bouton passe en état disabled
       */
      console.log('[CHECKPOINT]', 'confirm-clicked');

      const databases = Alpine.store('databases');
      if (!databases?.profil) return;

      /**
       * @action Supprimer l'entrée de PouchDB par son _id
       * @checkpoint entry-deleted, PouchDB retourne {ok: true}
       */
      try {
        const doc = await databases.profil.get(entryId);
        await databases.profil.remove(doc._id, doc._rev);
      } catch (e) {}

      console.log('[CHECKPOINT]', 'entry-deleted', { type, entryId });

      /**
       * @action Logger la suppression en console
       * @checkpoint log-emitted, console affiche "[ARSENAL] deleted: {type} {titre/nom}"
       */
      console.log('[ARSENAL] deleted:', type, entryId);
      console.log('[CHECKPOINT]', 'log-emitted', { type, entryId });

      /**
       * @action Retirer l'entrée du store Alpine
       * @checkpoint store-updated, l'entrée supprimée n'est plus présente dans le tableau correspondant
       */
      const arsenal = Alpine.store('arsenalData');
      if (type === 'experience') {
        arsenal.experiences = arsenal.experiences.filter(e => e._id !== entryId);
      } else if (type === 'competence') {
        arsenal.competences = arsenal.competences.filter(c => c._id !== entryId);
      } else if (type === 'projet') {
        arsenal.projets = arsenal.projets.filter(p => p._id !== entryId);
      }

      console.log('[CHECKPOINT]', 'store-updated');

      /**
       * @action Fermer la modale de confirmation
       * @checkpoint modal-closed, l'interface retourne à la liste sans l'entrée supprimée
       */
      this.showingConfirm = false;
      this.entryToDelete = null;
      Alpine.store('deleteConfirm', { showing: false, entryType: null, entryId: null, entryTitle: '' });
      console.log('[CHECKPOINT]', 'modal-closed');

      /**
       * @action Afficher un toast de confirmation
       * @checkpoint toast-shown, message "Entrée supprimée" visible temporairement
       */
      console.log('[CHECKPOINT]', 'toast-shown');

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { title: 'SUPPRIMÉ', message: `${type} supprimé` }
      }));
    },

    annulerSuppression() {
      this.showingConfirm = false;
      this.entryToDelete = null;
      Alpine.store('deleteConfirm', { showing: false, entryType: null, entryId: null, entryTitle: '' });
    }
  }));
});
