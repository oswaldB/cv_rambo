/**
 * Mega-fonction du workflow F-001-charger-profil
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Charger le profil depuis PouchDB
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('arsenalData', {
    loading: true,
    experiences: [],
    competences: [],
    projets: []
  });

  Alpine.data('workflowChargerProfil', () => ({
    loading: true,

    async init() {
      await this.chargerProfil();
    },

    async chargerProfil() {
      try {
        /**
         * @action Afficher l'écran Arsenal avec état de chargement
         * @checkpoint loading-displayed, spinner visible et message "Chargement du profil..."
         */
        this.loading = true;
        Alpine.store('arsenalData', { ...Alpine.store('arsenalData'), loading: true });

        console.log('[CHECKPOINT]', 'loading-displayed', { message: 'Chargement du profil...' });

        const databases = Alpine.store('databases');
        let experiences = [], competences = [], projets = [];

        /**
         * @action Récupérer toutes les expériences depuis PouchDB
         * @checkpoint experiences-loaded, retourne un tableau (vide ou peuplé)
         */
        if (databases?.profil) {
          const expResult = await databases.profil.allDocs({ include_docs: true });
          experiences = expResult.rows.filter(r => r.doc.type === 'experience').map(r => r.doc);
        }
        console.log('[CHECKPOINT]', 'experiences-loaded', { count: experiences.length });

        /**
         * @action Récupérer toutes les compétences depuis PouchDB
         * @checkpoint competences-loaded, retourne un tableau (vide ou peuplé)
         */
        if (databases?.profil) {
          const compResult = await databases.profil.allDocs({ include_docs: true });
          competences = compResult.rows.filter(r => r.doc.type === 'competence').map(r => r.doc);
        }
        console.log('[CHECKPOINT]', 'competences-loaded', { count: competences.length });

        /**
         * @action Récupérer tous les projets depuis PouchDB
         * @checkpoint projets-loaded, retourne un tableau (vide ou peuplé)
         */
        if (databases?.profil) {
          const projResult = await databases.profil.allDocs({ include_docs: true });
          projets = projResult.rows.filter(r => r.doc.type === 'projet').map(r => r.doc);
        }
        console.log('[CHECKPOINT]', 'projets-loaded', { count: projets.length });

        /**
         * @action Stocker les données dans le store Alpine global
         * @checkpoint store-populated, store.arsenal contient {experiences, competences, projets}
         */
        Alpine.store('arsenalData', {
          loading: false,
          experiences,
          competences,
          projets
        });

        console.log('[CHECKPOINT]', 'store-populated', {
          experiences: experiences.length,
          competences: competences.length,
          projets: projets.length
        });

        /**
         * @action Rendre l'interface avec les données chargées
         * @checkpoint ui-rendered, la liste des expériences s'affiche (ou état vide si aucune donnée)
         */
        this.loading = false;
        console.log('[CHECKPOINT]', 'ui-rendered', { hasData: experiences.length > 0 });

      } catch (error) {
        console.error('[ERROR] Failed to load profile:', error);
        window.dispatchEvent(new CustomEvent('cv-rambo:store-error', {
          detail: { error: { message: error.message, component: 'charger-profil' } }
        }));
      }
    }
  }));
});
