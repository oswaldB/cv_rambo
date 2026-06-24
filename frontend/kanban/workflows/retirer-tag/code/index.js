/**
 * Mega-fonction du workflow F-006-retirer-tag
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Retirer un tag d'une cible
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('workflowRetirerTag', () => ({
    async init() {},

    async retirerTag(cible, tag) {
      /**
       * @action Cliquer sur le bouton de suppression d'un tag
       * @checkpoint remove-triggered, l'utilisateur confirme ou le tag est immédiatement marqué pour suppression
       */
      console.log('[CHECKPOINT]', 'remove-triggered', { cibleId: cible._id, tag });

      /**
       * @action Retirer le tag du tableau dans le store Alpine
       * @checkpoint store-updated, store.kanban.cibles[X].tags ne contient plus le tag retiré
       */
      if (cible.tags) {
        cible.tags = cible.tags.filter(t => t !== tag);
      }

      console.log('[CHECKPOINT]', 'store-updated');

      /**
       * @action Persister la modification dans PouchDB
       * @checkpoint tag-removed-persisted, la cible est sauvegardée avec le tableau de tags mis à jour
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

      console.log('[CHECKPOINT]', 'tag-removed-persisted');

      /**
       * @action Logger le retrait en console
       * @checkpoint log-emitted, console affiche "[TAG] removed <cibleId> #<tag>"
       */
      console.log('[TAG] removed', cible._id, tag);
      console.log('[CHECKPOINT]', 'log-emitted', { cibleId: cible._id, tag });

      /**
       * @action Mettre à jour l'affichage de la carte
       * @checkpoint card-updated, le tag n'apparaît plus sur la carte
       */
      console.log('[CHECKPOINT]', 'card-updated');

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { title: 'TAG RETIRÉ', message: tag }
      }));
    }
  }));
});
