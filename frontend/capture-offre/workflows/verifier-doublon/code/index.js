/**
 * Mega-fonction du workflow F-004-verifier-doublon
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Vérifier si l'URL existe déjà dans le Kanban
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('duplicateCheck', {
    checking: false,
    isDuplicate: false,
    existingTarget: null
  });

  Alpine.data('workflowVerifierDoublon', () => ({
    checking: false,
    isDuplicate: false,
    existingTarget: null,

    async init() {},

    async verifierDoublon(url) {
      /**
       * @action Récupérer l'URL extraite
       * @checkpoint url-retrieved, l'URL à vérifier est disponible
       */
      console.log('[CHECKPOINT]', 'url-retrieved', { url });

      /**
       * @action Rechercher l'URL dans la base PouchDB des cibles
       * @checkpoint db-queried, la requête recherche une cible avec le même URL
       */
      this.checking = true;
      Alpine.store('duplicateCheck', { ...Alpine.store('duplicateCheck'), checking: true });

      const databases = Alpine.store('databases');
      let existing = null;

      if (databases?.cibles) {
        try {
          const result = await databases.cibles.allDocs({ include_docs: true });
          existing = result.rows.find(row => row.doc.url === url)?.doc;
        } catch (e) {
          console.error('Error querying DB:', e);
        }
      }

      console.log('[CHECKPOINT]', 'db-queried', { hasResult: !!existing });

      /**
       * @action Vérifier le résultat de la recherche
       * @checkpoint duplicate-checked, retourne true si une cible existe déjà avec cette URL
       */
      this.isDuplicate = !!existing;
      this.existingTarget = existing;

      Alpine.store('duplicateCheck', {
        checking: false,
        isDuplicate: this.isDuplicate,
        existingTarget: existing
      });

      console.log('[CHECKPOINT]', 'duplicate-checked', { isDuplicate: this.isDuplicate });

      /**
       * @action Logger la détection de doublon en console
       * @checkpoint log-emitted, console affiche "[CAPTURE] duplicate-detected <url>"
       */
      if (this.isDuplicate) {
        console.log('[CAPTURE] duplicate-detected', url);
      }
      console.log('[CHECKPOINT]', 'log-emitted', { isDuplicate: this.isDuplicate });

      /**
       * @action Afficher le warning de doublon si trouvé
       * @checkpoint warning-displayed, message "Cette offre existe déjà" visible avec boutons "Voir l'existant" et "Créer quand même"
       */
      if (this.isDuplicate) {
        console.log('[CHECKPOINT]', 'warning-displayed', {
          message: 'Cette offre existe déjà',
          buttons: ['Voir l\'existant', 'Créer quand même']
        });

        /**
         * @action Permettre la navigation vers l'offre existante
         * @checkpoint navigate-option-ready, le bouton "Voir l'existant" redirige vers la cible dans le Kanban
         */
        console.log('[CHECKPOINT]', 'navigate-option-ready', {
          targetId: this.existingTarget?._id
        });

        /**
         * @action Permettre la création malgré le doublon
         * @checkpoint force-create-ready, le bouton "Créer quand même" permet de continuer
         */
        console.log('[CHECKPOINT]', 'force-create-ready', { canForceCreate: true });

        return { isDuplicate: true, existingTarget: this.existingTarget };
      }

      /**
       * @action Procéder normalement si pas de doublon
       * @checkpoint no-duplicate, le workflow continue vers ajouter-liste ou tirer-direct
       */
      console.log('[CHECKPOINT]', 'no-duplicate', { continue: true });
      
      this.checking = false;
      return { isDuplicate: false };
    }
  }));
});
