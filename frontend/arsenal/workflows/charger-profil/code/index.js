/**
 * Mega-fonction : charger-profil
 * Charge le profil utilisateur depuis PouchDB
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('profilLoader', () => ({
    profil: {
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      linkedin: '',
      cvTexte: '',
      competences: '',
      posteRecherche: ''
    },
    loading: false,
    profilId: null,

    async initProfil() {
      /**
       * @action Initialiser chargement profil
       * @checkpoint profil-init-started
       */
      this.loading = true;
      console.log('[CHECKPOINT]', 'profil-init-started');

      if (window.db) {
        await this.loadProfil();
      } else {
        window.addEventListener('db:ready', async () => {
          await this.loadProfil();
        }, { once: true });
      }
    },

    async loadProfil() {
      /**
       * @action Charger profil depuis PouchDB
       * @checkpoint profil-fetch-started
       */
      try {
        // Chercher document de type 'profil'
        const result = await window.db.find({
          selector: { type: 'profil' },
          limit: 1
        });

        if (result.docs.length > 0) {
          const doc = result.docs[0];
          this.profilId = doc._id;
          this.profil = {
            prenom: doc.prenom || '',
            nom: doc.nom || '',
            email: doc.email || '',
            telephone: doc.telephone || '',
            linkedin: doc.linkedin || '',
            cvTexte: doc.cvTexte || '',
            competences: doc.competences || '',
            posteRecherche: doc.posteRecherche || ''
          };
          console.log('[CHECKPOINT]', 'profil-loaded', { id: this.profilId });
        } else {
          // Nouveau profil - valeurs par défaut
          console.log('[CHECKPOINT]', 'profil-new', { reason: 'no-existing' });
        }

        console.log('[CHECKPOINT]', 'profil-rendered');

      } catch (err) {
        console.error('[CHECKPOINT]', 'profil-load-error', { error: err.message });
      } finally {
        this.loading = false;
      }
    }
  }));
});
