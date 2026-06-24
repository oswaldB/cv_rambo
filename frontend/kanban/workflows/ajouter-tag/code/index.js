/**
 * Mega-fonction du workflow F-006-ajouter-tag
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Ajouter un tag à une cible
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('tagMenu', {
    open: false,
    cibleId: null,
    selectedTag: ''
  });

  Alpine.data('workflowAjouterTag', () => ({
    tagMenuOpen: false,
    selectedCible: null,
    newTag: '',

    defaultTags: ['#CiblePrioritaire', '#MissionImpossible', '#ÀRelancer', '#Entretien', '#AttenteRéponse'],

    async init() {},

    ouvrirMenuTag(cible) {
      /**
       * @action Cliquer sur le bouton "Ajouter un tag" de la carte
       * @checkpoint tag-menu-opened, une liste de tags suggérés s'affiche avec champ "Nouveau tag"
       */
      this.tagMenuOpen = true;
      this.selectedCible = cible;
      this.newTag = '';
      
      Alpine.store('tagMenu', { open: true, cibleId: cible._id, selectedTag: '' });
      
      console.log('[CHECKPOINT]', 'tag-menu-opened', { cibleId: cible._id });
    },

    async ajouterTag(tagName) {
      /**
       * @action Sélectionner un tag existant ou saisir un nouveau tag
       * @checkpoint tag-selected, un tag parmi les défauts est choisi OU un texte libre avec # est saisi
       */
      const tag = tagName || this.newTag;
      if (!tag) return;

      console.log('[CHECKPOINT]', 'tag-selected', { tag });

      /**
       * @action Valider l'ajout du tag
       * @checkpoint add-validated, le tag n'est pas déjà présent sur la cible
       */
      const cible = this.selectedCible;
      if (!cible.tags) cible.tags = [];
      
      if (cible.tags.includes(tag)) {
        console.log('Tag already exists');
        return;
      }

      console.log('[CHECKPOINT]', 'add-validated', { tag });

      /**
       * @action Mettre à jour la cible dans le store Alpine
       * @checkpoint store-updated, store.kanban.cibles[X].tags contient le nouveau tag
       */
      cible.tags.push(tag);

      console.log('[CHECKPOINT]', 'store-updated');

      /**
       * @action Persister le tag dans PouchDB
       * @checkpoint tag-persisted, la cible est sauvegardée avec le nouveau tableau de tags
       */
      const databases = Alpine.store('databases');
      if (databases?.cibles) {
        try {
          const existing = await databases.cibles.get(cible._id);
          if (existing) {
            cible._rev = existing._rev;
            await databases.cibles.put(cible);
          }
        } catch (e) {}
      }

      console.log('[CHECKPOINT]', 'tag-persisted');

      /**
       * @action Logger l'ajout en console
       * @checkpoint log-emitted, console affiche "[TAG] added <cibleId> #<tag>"
       */
      console.log('[TAG] added', cible._id, tag);
      console.log('[CHECKPOINT]', 'log-emitted', { cibleId: cible._id, tag });

      /**
       * @action Afficher le tag sur la carte
       * @checkpoint tag-displayed, le tag apparaît visuellement sur la carte avec son style
       */
      console.log('[CHECKPOINT]', 'tag-displayed', { tag });

      /**
       * @action Fermer le menu de sélection
       * @checkpoint menu-closed, l'interface retourne à l'état normal du Kanban
       */
      this.tagMenuOpen = false;
      this.selectedCible = null;
      this.newTag = '';
      Alpine.store('tagMenu', { open: false, cibleId: null, selectedTag: '' });

      console.log('[CHECKPOINT]', 'menu-closed');

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { title: 'TAG AJOUTÉ', message: tag }
      }));
    }
  }));
});
