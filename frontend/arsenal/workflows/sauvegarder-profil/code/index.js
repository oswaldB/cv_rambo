/**
 * Mega-fonction : sauvegarder-profil
 * Sauvegarde le profil utilisateur dans PouchDB
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('profilSaver', () => ({
    isSaving: false,
    saveSuccess: false,
    saveError: null,

    async saveProfil() {
      /**
       * @action Sauvegarder profil
       * @checkpoint save-started
       */
      this.isSaving = true;
      this.saveSuccess = false;
      this.saveError = null;

      console.log('[CHECKPOINT]', 'save-started');

      try {
        // Validation basique
        if (!this.profil.prenom || !this.profil.nom) {
          throw new Error('Prénom et nom sont requis');
        }

        const profilDoc = {
          type: 'profil',
          prenom: this.profil.prenom,
          nom: this.profil.nom,
          email: this.profil.email,
          telephone: this.profil.telephone,
          linkedin: this.profil.linkedin,
          cvTexte: this.profil.cvTexte,
          competences: this.profil.competences,
          posteRecherche: this.profil.posteRecherche,
          updatedAt: new Date().toISOString()
        };

        if (this.profilId) {
          // Update
          profilDoc._id = this.profilId;
          const existing = await window.db.get(this.profilId);
          profilDoc._rev = existing._rev;
          await window.db.put(profilDoc);
        } else {
          // Create
          profilDoc._id = 'profil-' + Date.now();
          profilDoc.createdAt = new Date().toISOString();
          await window.db.put(profilDoc);
          this.profilId = profilDoc._id;
        }

        console.log('[CHECKPOINT]', 'profil-saved', { id: this.profilId });
        this.saveSuccess = true;

        // Masquer message après 3s
        setTimeout(() => this.saveSuccess = false, 3000);

      } catch (err) {
        console.error('[CHECKPOINT]', 'save-error', { error: err.message });
        this.saveError = err.message;
      } finally {
        this.isSaving = false;
      }
    }
  }));
});
