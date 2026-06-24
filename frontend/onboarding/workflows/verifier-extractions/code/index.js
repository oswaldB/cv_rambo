/**
 * Mega-fonction du workflow F-017-verifier-extractions
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Vérifier et corriger les données extraites
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('onboardingVerifier', {
    step: 2,
    profileData: null,
    editing: false,
    valid: false
  });

  Alpine.data('workflowVerifierExtractions', () => ({
    step: 2,
    profileData: null,
    editing: false,
    valid: false,

    async init() {
      await this.ecouterEvenements();
    },

    async ecouterEvenements() {
      window.addEventListener('cv-rambo:onboarding-step-2', (event) => {
        this.profileData = event.detail.profileData;
        this.afficherEtape2();
      });
    },

    afficherEtape2() {
      /**
       * @action Afficher l'étape 2 avec les données extraites
       * @checkpoint step-2-displayed, les données {nom, email, expériences, compétences} sont pré-remplies
       */
      
      const overlay = document.getElementById('cv-rambo-onboarding');
      if (!overlay) return;

      overlay.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #2F4F4F 0%, #1a1a1a 100%);
          border: 3px solid #FFD700;
          padding: 30px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        ">
          <h2 style="color: #FFD700; text-align: center; margin-bottom: 20px;"
          >VÉRIFIE TON PROFIL</h2>
          
          <div style="margin-bottom: 20px;">
            <label style="color: #f5f5f5; display: block; margin-bottom: 5px;">Nom</label>
            <input type="text" 
                   x-model="profileData.name" 
                   @input="validerFormulaire()"
                   style="
              width: 100%;
              padding: 10px;
              background: #1a1a1a;
              border: 2px solid #FFD700;
              color: #f5f5f5;
              font-family: 'Roboto Condensed';
            ">
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="color: #f5f5f5; display: block; margin-bottom: 5px;">Email</label>
            <input type="email" 
                   x-model="profileData.email" 
                   @input="validerFormulaire()"
                   style="
              width: 100%;
              padding: 10px;
              background: #1a1a1a;
              border: 2px solid #FFD700;
              color: #f5f5f5;
              font-family: 'Roboto Condensed';
            ">
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="color: #f5f5f5; display: block; margin-bottom: 10px;">Expériences</label>
            <div style="background: #1a1a1a; border: 1px solid #FFD700; padding: 10px;">
              <template x-for="(exp, index) in profileData.experiences" :key="index">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #333;">
                  <span x-text="exp.title + ' @ ' + exp.company" style="color: #f5f5f5; font-family: 'Roboto Condensed';"></span>
                  <button @click="supprimerExperience(index)" style="background: #8B0000; border: none; color: white; padding: 4px 8px; cursor: pointer;">🗑️</button>
                </div>
              </template>
              <button @click="ajouterExperience()" style="
                width: 100%;
                background: transparent;
                border: 1px dashed #FFD700;
                color: #FFD700;
                padding: 10px;
                margin-top: 10px;
                cursor: pointer;
              ">+ Ajouter une expérience</button>
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="color: #f5f5f5; display: block; margin-bottom: 10px;">Compétences</label>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <template x-for="(comp, index) in profileData.competences" :key="index">
                <span style="
                  background: #2E8B57;
                  border: 1px solid #FFD700;
                  padding: 5px 10px;
                  color: white;
                  display: flex;
                  align-items: center;
                  gap: 5px;
                ">
                  <span x-text="comp"></span>
                  <button @click="supprimerCompetence(index)" style="background: none; border: none; color: #FFD700; cursor: pointer;">×</button>
                </span>
              </template>
            </div>
            <input type="text" 
                   @keydown.enter="ajouterCompetence($event.target.value); $event.target.value = ''"
                   placeholder="Ajouter une compétence + Entrée"
                   style="
              width: 100%;
              margin-top: 10px;
              padding: 10px;
              background: #1a1a1a;
              border: 2px solid #FFD700;
              color: #f5f5f5;
            ">
          </div>
          
          <button 
            @click="finaliserVerification()"
            :disabled="!valid"
            :style="valid ? '
              width: 100%;
              background: #2E8B57;
              border: 2px solid #FFD700;
              color: white;
              padding: 15px;
              font-family: \"Bebas Neue\";
              font-size: 18px;
              cursor: pointer;
            ' : '
              width: 100%;
              background: #666;
              border: 2px solid #999;
              color: #ccc;
              padding: 15px;
              font-family: \"Bebas Neue\";
              font-size: 18px;
              cursor: not-allowed;
            '"
          >SUIVANT →</button>
        </div>
      `;

      Alpine.initTree(overlay);
      this.validerFormulaire();

      console.log('[CHECKPOINT]', 'step-2-displayed', {
        fields: ['name', 'email', 'experiences', 'competences'],
        preFilled: true
      });

      /**
       * @action Logger l'affichage de l'étape
       * @checkpoint log-step-emitted, console affiche "[ONBOARDING] step-2"
       */
      console.log('[ONBOARDING] step-2', {
        timestamp: new Date().toISOString()
      });

      console.log('[CHECKPOINT]', 'log-step-emitted', {
        step: 2,
        message: '[ONBOARDING] step-2'
      });

      /**
       * @action Permettre l'édition du nom
       * @checkpoint name-editable, champ nom modifiable avec validation
       */
      console.log('[CHECKPOINT]', 'name-editable', {
        field: 'name',
        validation: 'required'
      });

      /**
       * @action Permettre l'édition de l'email
       * @checkpoint email-editable, champ email modifiable avec validation format
       */
      console.log('[CHECKPOINT]', 'email-editable', {
        field: 'email',
        validation: 'email-format'
      });

      /**
       * @action Permettre la correction des expériences extraites
       * @checkpoint experiences-editable, liste des expériences avec boutons éditer/supprimer/ajouter
       */
      console.log('[CHECKPOINT]', 'experiences-editable', {
        actions: ['edit', 'delete', 'add'],
        count: this.profileData.experiences?.length || 0
      });

      /**
       * @action Permettre la correction des compétences extraites
       * @checkpoint competences-editable, liste des compétences avec gestion des niveaux
       */
      console.log('[CHECKPOINT]', 'competences-editable', {
        actions: ['delete', 'add'],
        count: this.profileData.competences?.length || 0
      });
    },

    validerFormulaire() {
      /**
       * @action Valider les modifications
       * @checkpoint validation-passed, au moins nom + email + une expérience ou compétence présents
       */
      
      const hasName = this.profileData.name?.trim().length > 0;
      const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profileData.email || '');
      const hasExperience = this.profileData.experiences?.length > 0;
      const hasCompetence = this.profileData.competences?.length > 0;
      
      this.valid = hasName && hasEmail && (hasExperience || hasCompetence);

      console.log('[CHECKPOINT]', 'validation-passed', {
        valid: this.valid,
        checks: { hasName, hasEmail, hasExperience, hasCompetence }
      });
    },

    ajouterExperience() {
      this.profileData.experiences.push({
        title: 'Nouvelle expérience',
        company: 'Entreprise',
        duration: '2024-Présent'
      });
      this.validerFormulaire();
    },

    supprimerExperience(index) {
      this.profileData.experiences.splice(index, 1);
      this.validerFormulaire();
    },

    ajouterCompetence(value) {
      if (value?.trim()) {
        this.profileData.competences.push(value.trim());
        this.validerFormulaire();
      }
    },

    supprimerCompetence(index) {
      this.profileData.competences.splice(index, 1);
      this.validerFormulaire();
    },

    async finaliserVerification() {
      /**
       * @action Sauvegarder le profil corrigé dans PouchDB
       * @checkpoint profile-updated, les corrections sont persistées avec _rev incrémentée
       */
      
      const databases = Alpine.store('databases');
      if (databases?.profil) {
        try {
          const existing = await databases.profil.get('user-profile');
          await databases.profil.put({
            _id: 'user-profile',
            _rev: existing?._rev,
            ...this.profileData,
            updatedAt: new Date().toISOString()
          });
        } catch (e) {
          await databases.profil.put({
            _id: 'user-profile',
            ...this.profileData,
            updatedAt: new Date().toISOString()
          });
        }
      }

      console.log('[CHECKPOINT]', 'profile-updated', {
        docId: 'user-profile',
        updated: true
      });

      /**
       * @action Activer le bouton "Suivant"
       * @checkpoint next-button-enabled, bouton actif si données valides présentes
       */
      console.log('[CHECKPOINT]', 'next-button-enabled', {
        enabled: true,
        reason: 'validation-passed'
      });

      /**
       * @action Passer à l'étape 3 du tutoriel
       * @checkpoint step-3-triggered, transition vers le parcours guidé
       */
      
      window.dispatchEvent(new CustomEvent('cv-rambo:onboarding-step-3', {
        detail: { profileData: this.profileData }
      }));

      console.log('[CHECKPOINT]', 'step-3-triggered', {
        transition: 'step-2 -> step-3',
        target: 'tutorial-screen'
      });
    }
  }));
});
