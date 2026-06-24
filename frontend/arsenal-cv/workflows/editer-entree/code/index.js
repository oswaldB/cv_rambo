/**
 * Mega-fonction du workflow F-001-editer-entree
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Éditer une entrée existante
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('editEntry', {
    editing: false,
    entryType: null,
    entryData: null
  });

  Alpine.data('workflowEditerEntree', () => ({
    editing: false,
    entryType: null,
    entryData: null,
    formData: {},

    async init() {
      // Initialisé par l'appel depuis l'écran
    },

    async editerEntree(type, entryId) {
      /**
       * @action Cliquer sur le bouton d'édition d'une entrée
       * @checkpoint edit-clicked, l'entrée visée est identifiée par son _id
       */
      console.log('[CHECKPOINT]', 'edit-clicked', { type, entryId });

      const arsenal = Alpine.store('arsenalData');
      let entry = null;

      // Trouver l'entrée dans le store
      if (type === 'experience') {
        entry = arsenal.experiences.find(e => e._id === entryId);
      } else if (type === 'competence') {
        entry = arsenal.competences.find(c => c._id === entryId);
      } else if (type === 'projet') {
        entry = arsenal.projets.find(p => p._id === entryId);
      }

      /**
       * @action Charger les données de l'entrée depuis le store
       * @checkpoint data-loaded, les champs du formulaire sont pré-remplis avec les valeurs actuelles
       */
      if (entry) {
        this.entryData = entry;
        this.entryType = type;
        this.formData = { ...entry };
        this.editing = true;

        console.log('[CHECKPOINT]', 'data-loaded', { type, entryId });
      }

      /**
       * @action Ouvrir le formulaire d'édition
       * @checkpoint form-opened, le formulaire est visible avec les données pré-remplies
       */
      Alpine.store('editEntry', { editing: true, entryType: type, entryData: entry });
      console.log('[CHECKPOINT]', 'form-opened', { type });
    },

    async sauvegarderModifications() {
      /**
       * @action Cliquer sur le bouton "Sauvegarder les modifications"
       * @checkpoint save-triggered, le bouton passe en état disabled avec spinner
       */
      console.log('[CHECKPOINT]', 'save-triggered', { type: this.entryType });

      const databases = Alpine.store('databases');
      if (!databases?.profil) return;

      /**
       * @action Mettre à jour l'entrée dans PouchDB avec le même _id
       * @checkpoint entry-updated, retourne l'objet mis à jour avec _rev incrémentée
       */
      const updatedEntry = {
        ...this.entryData,
        ...this.formData,
        _id: this.entryData._id,
        type: this.entryType,
        updatedAt: new Date().toISOString()
      };

      try {
        const existing = await databases.profil.get(this.entryData._id);
        updatedEntry._rev = existing._rev;
      } catch (e) {}

      const response = await databases.profil.put(updatedEntry);

      console.log('[CHECKPOINT]', 'entry-updated', { id: response.id, rev: response.rev });

      /**
       * @action Logger la mise à jour en console
       * @checkpoint log-emitted, console affiche "[ARSENAL] updated: {type} {titre/nom}"
       */
      console.log('[ARSENAL] updated:', this.entryType, this.formData.title || this.formData.name);
      console.log('[CHECKPOINT]', 'log-emitted', { type: this.entryType });

      /**
       * @action Mettre à jour l'entrée dans le store Alpine
       * @checkpoint store-updated, l'entrée modifiée remplace l'ancienne dans le tableau correspondant
       */
      const arsenal = Alpine.store('arsenalData');
      if (this.entryType === 'experience') {
        const idx = arsenal.experiences.findIndex(e => e._id === updatedEntry._id);
        if (idx >= 0) arsenal.experiences[idx] = updatedEntry;
      } else if (this.entryType === 'competence') {
        const idx = arsenal.competences.findIndex(c => c._id === updatedEntry._id);
        if (idx >= 0) arsenal.competences[idx] = updatedEntry;
      } else if (this.entryType === 'projet') {
        const idx = arsenal.projets.findIndex(p => p._id === updatedEntry._id);
        if (idx >= 0) arsenal.projets[idx] = updatedEntry;
      }

      console.log('[CHECKPOINT]', 'store-updated', { type: this.entryType });

      /**
       * @action Fermer le formulaire et rafraîchir l'affichage
       * @checkpoint form-closed, la liste affiche les données mises à jour
       */
      this.editing = false;
      this.entryData = null;
      this.entryType = null;
      Alpine.store('editEntry', { editing: false, entryType: null, entryData: null });

      console.log('[CHECKPOINT]', 'form-closed');

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { title: 'MODIFIÉ', message: `${this.entryType} mise à jour` }
      }));
    }
  }));
});
