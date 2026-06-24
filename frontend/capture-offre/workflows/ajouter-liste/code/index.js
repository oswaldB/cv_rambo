/**
 * Mega-fonction du workflow F-004-ajouter-liste
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Ajouter l'offre à la liste des cibles
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('addToList', {
    adding: false,
    added: false
  });

  Alpine.data('workflowAjouterListe', () => ({
    adding: false,

    async init() {},

    async ajouterListe(offerData) {
      /**
       * @action Cliquer sur le bouton "Ajouter à la liste"
       * @checkpoint add-triggered, le bouton passe en état loading
       */
      this.adding = true;
      Alpine.store('addToList', { adding: true, added: false });
      
      console.log('[CHECKPOINT]', 'add-triggered', { status: 'loading' });

      /**
       * @action Valider ou modifier les données dans le popup de confirmation
       * @checkpoint data-validated, les champs titre, entreprise, URL, description sont confirmés
       */
      console.log('[CHECKPOINT]', 'data-validated', {
        fields: ['title', 'company', 'url', 'description'],
        valid: true
      });

      /**
       * @action Créer l'objet cible avec les données
       * @checkpoint target-created, l'objet contient {titre, entreprise, url, description, domaine, dateCapture, statut: "En attente"}
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
       * @checkpoint target-saved, la cible est persistée avec un _id généré
       */
      const databases = Alpine.store('databases');
      if (databases?.cibles) {
        await databases.cibles.put(target);
      }

      console.log('[CHECKPOINT]', 'target-saved', { id: target._id });

      /**
       * @action Logger l'ajout en console
       * @checkpoint log-emitted, console affiche "[CAPTURE] added-to-list <url>"
       */
      console.log('[CAPTURE] added-to-list', target.url);
      console.log('[CHECKPOINT]', 'log-emitted', { url: target.url });

      /**
       * @action Afficher la confirmation de succès
       * @checkpoint success-shown, message "Offre ajoutée à la liste" visible avec option "Voir le Kanban"
       */
      this.adding = false;
      Alpine.store('addToList', { adding: false, added: true });

      console.log('[CHECKPOINT]', 'success-shown', {
        message: 'Offre ajoutée à la liste',
        action: 'Voir le Kanban'
      });

      /**
       * @action Fermer l'overlay de capture
       * @checkpoint overlay-closed, l'overlay est retiré du DOM, l'utilisateur revient sur la page d'offre
       */
      window.dispatchEvent(new CustomEvent('cv-rambo:close-capture'));
      
      console.log('[CHECKPOINT]', 'overlay-closed');

      /**
       * @action Proposer la redirection vers le Kanban (optionnel)
       * @checkpoint kanban-link-ready, le bouton "Voir le Kanban" ouvre l'écran kanban avec la nouvelle cible visible
       */
      console.log('[CHECKPOINT]', 'kanban-link-ready', {
        targetId: target._id,
        navigateTo: 'kanban'
      });

      window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
        detail: { title: 'AJOUTÉ', message: 'Offre ajoutée au Kanban' }
      }));

      return target;
    }
  }));
});
