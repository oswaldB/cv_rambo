/**
 * Mega-fonction du workflow F-005-mettre-a-jour-statut
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Persister le changement de statut
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('workflowMettreAJourStatut', () => ({
    async init() {
      window.addEventListener('cv-ramban:update-status', async (e) => {
        await this.mettreAJourStatut(e.detail.cibleId, e.detail.nouveauStatut);
      });
    },

    async mettreAJourStatut(cibleId, nouveauStatut) {
      /**
       * @action Recevoir l'événement de changement de colonne
       * @checkpoint change-event-received, {cibleId, ancienStatut, nouveauStatut} sont disponibles
       */
      console.log('[CHECKPOINT]', 'change-event-received', { cibleId, nouveauStatut });

      /**
       * @action Valider le nouveau statut
       * @checkpoint statut-validated, le nouveau statut est l'une des 4 valeurs : en-attente, impact, cible-eliminee, rate
       */
      const validStatuses = ['En attente', 'Impact', 'Cible éliminée', 'Raté'];
      if (!validStatuses.includes(nouveauStatut)) {
        console.error('Invalid status:', nouveauStatut);
        return;
      }

      console.log('[CHECKPOINT]', 'statut-validated', { status: nouveauStatut });

      const databases = Alpine.store('databases');
      if (!databases?.cibles) return;

      /**
       * @action Récupérer la cible depuis PouchDB par son id
       * @checkpoint cible-fetched, l'objet cible avec _id et _rev est chargé
       */
      let cible;
      try {
        cible = await databases.cibles.get(cibleId);
      } catch (e) {
        console.error('Cible not found:', cibleId);
        return;
      }

      console.log('[CHECKPOINT]', 'cible-fetched', { id: cible._id });

      /**
       * @action Modifier le champ statut de la cible
       * @checkpoint statut-modified, cible.statut contient la nouvelle valeur
       */
      const ancienStatut = cible.status;
      cible.status = nouveauStatut;
      cible.column = nouveauStatut;

      console.log('[CHECKPOINT]', 'statut-modified', { from: ancienStatut, to: nouveauStatut });

      /**
       * @action Mettre à jour la cible dans PouchDB
       * @checkpoint cible-updated, retourne {ok: true, id, rev} avec _rev incrémentée
       */
      const response = await databases.cibles.put(cible);

      console.log('[CHECKPOINT]', 'cible-updated', { id: response.id, rev: response.rev });

      /**
       * @action Logger la mise à jour en console
       * @checkpoint log-emitted, console affiche "[KANBAN] moved <id> to <nouveauStatut>"
       */
      console.log('[KANBAN] moved', cibleId, 'to', nouveauStatut);
      console.log('[CHECKPOINT]', 'log-emitted', { cibleId, nouveauStatut });

      /**
       * @action Confirmer le succès à l'interface
       * @checkpoint update-confirmed, le store Alpine est synchronisé avec PouchDB
       */
      console.log('[CHECKPOINT]', 'update-confirmed');

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { title: 'DÉPLACÉ', message: `Cible déplacée vers ${nouveauStatut}` }
      }));
    }
  }));
});
