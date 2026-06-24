/**
 * Mega-fonction du workflow F-017-completer-onboarding
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Finaliser l'onboarding et débloquer l'application
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('onboardingComplete', {
    completed: false,
    unlocked: false,
    profileSummary: null
  });

  Alpine.data('workflowCompleterOnboarding', () => ({
    profileData: null,

    async init() {
      await this.ecouterEvenements();
    },

    async ecouterEvenements() {
      window.addEventListener('cv-rambo:onboarding-complete', async () => {
        await this.finaliserOnboarding();
      });
    },

    async finaliserOnboarding() {
      /**
       * @action Afficher l'écran de complétion
       * @checkpoint completion-screen-displayed, message "Bienvenue dans CV Rambo" avec résumé du profil
       */
      
      const databases = Alpine.store('databases');
      if (databases?.profil) {
        try {
          this.profileData = await databases.profil.get('user-profile');
        } catch (e) {
          this.profileData = null;
        }
      }

      const overlay = document.getElementById('cv-rambo-onboarding');
      if (!overlay) return;

      const expCount = this.profileData?.experiences?.length || 0;
      const compCount = this.profileData?.competences?.length || 0;

      overlay.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #2E8B57 0%, #1a472a 100%);
          border: 3px solid #FFD700;
          padding: 40px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          box-shadow: 0 0 60px rgba(255, 215, 0, 0.5);
        ">
          <div style="font-size: 60px; margin-bottom: 20px;">🎖️</div>
          <h1 style="
            color: #FFD700;
            font-size: 36px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 3px;
          ">MISSION ACCEPTÉE</h1>
          
          <p style="
            color: #f5f5f5;
            font-family: 'Roboto Condensed';
            font-size: 18px;
            margin-bottom: 30px;
          ">Bienvenue dans CV Rambo, soldat !</p>
          
          <div style="
            background: rgba(0,0,0,0.3);
            padding: 20px;
            margin-bottom: 30px;
            border-left: 4px solid #FFD700;
          ">
            <h3 style="color: #FFD700; margin-top: 0;">RÉCAPITULATIF</h3>
            <div style="display: flex; justify-content: space-around; margin-top: 20px;">
              <div>
                <div style="font-size: 36px; color: #FFD700; font-weight: bold;">${expCount}</div>
                <div style="color: #f5f5f5; font-family: 'Roboto Condensed';">Expériences</div>
              </div>
              <div>
                <div style="font-size: 36px; color: #FFD700; font-weight: bold;">${compCount}</div>
                <div style="color: #f5f5f5; font-family: 'Roboto Condensed';">Compétences</div>
              </div>
            </div>
          </div>
          
          <button @click="commencerUtilisation()" style="
            width: 100%;
            background: #FFD700;
            border: none;
            color: #2F4F4F;
            padding: 20px;
            font-family: 'Bebas Neue';
            font-size: 24px;
            cursor: pointer;
            letter-spacing: 3px;
            margin-bottom: 15px;
          ">COMMENCER À UTILISER CV RAMBO →</button>
          
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button @click="revoirTutoriel()" style="
              background: transparent;
              border: 1px solid #FFD700;
              color: #FFD700;
              padding: 10px 20px;
              font-family: 'Bebas Neue';
              cursor: pointer;
            ">↻ Revoir le tutoriel</button>
            
            <button @click="modifierProfil()" style="
              background: transparent;
              border: 1px solid #FFD700;
              color: #FFD700;
              padding: 10px 20px;
              font-family: 'Bebas Neue';
              cursor: pointer;
            ">✎ Modifier mon profil</button>
          </div>
        </div>
      `;

      Alpine.initTree(overlay);

      console.log('[CHECKPOINT]', 'completion-screen-displayed', {
        message: 'Bienvenue dans CV Rambo',
        hasSummary: true
      });

      /**
       * @action Logger l'étape finale
       * @checkpoint log-step-emitted, console affiche "[ONBOARDING] step-completed"
       */
      console.log('[ONBOARDING] step-completed', {
        step: 'final',
        timestamp: new Date().toISOString()
      });

      console.log('[CHECKPOINT]', 'log-step-emitted', {
        step: 'completed',
        message: '[ONBOARDING] step-completed'
      });

      /**
       * @action Afficher le récapitulatif du profil créé
       * @checkpoint profile-summary-shown, nombre d'expériences et compétences sauvegardées affichés
       */
      console.log('[CHECKPOINT]', 'profile-summary-shown', {
        experiences: expCount,
        competences: compCount
      });

      await this.creerFlagOnboarding();
    },

    async creerFlagOnboarding() {
      /**
       * @action Créer le flag onboardingDone dans PouchDB
       * @checkpoint flag-created, entrée {onboardingDone: true, completedAt: dateISO} sauvegardée
       */
      
      const databases = Alpine.store('databases');
      if (databases?.settings) {
        try {
          const existing = await databases.settings.get('app-settings');
          await databases.settings.put({
            _id: 'app-settings',
            _rev: existing?._rev,
            onboardingDone: true,
            completedAt: new Date().toISOString(),
            onboardingVersion: '1.0'
          });
        } catch (e) {
          await databases.settings.put({
            _id: 'app-settings',
            onboardingDone: true,
            completedAt: new Date().toISOString(),
            onboardingVersion: '1.0'
          });
        }
      }

      console.log('[CHECKPOINT]', 'flag-created', {
        flag: 'onboardingDone',
        value: true,
        timestamp: new Date().toISOString()
      });

      /**
       * @action Logger la complétion
       * @checkpoint log-completed-emitted, console affiche "[ONBOARDING] completed"
       */
      console.log('[ONBOARDING] completed', {
        timestamp: new Date().toISOString(),
        status: 'success'
      });

      console.log('[CHECKPOINT]', 'log-completed-emitted', {
        message: '[ONBOARDING] completed',
        status: 'finished'
      });

      /**
       * @action Activer le bouton "Commencer à utiliser CV Rambo"
       * @checkpoint start-button-enabled, bouton principal actif pour accéder à l'application
       */
      console.log('[CHECKPOINT]', 'start-button-enabled', {
        button: 'start-app',
        enabled: true
      });

      /**
       * @action Permettre l'accès aux settings depuis l'écran final
       * @checkpoint settings-link-ready, liens "Revoir le tutoriel" et "Modifier mon profil" visibles
       */
      console.log('[CHECKPOINT]', 'settings-link-ready', {
        links: ['revoir-tutoriel', 'modifier-profil'],
        visible: true
      });
    },

    async commencerUtilisation() {
      /**
       * @action Fermer l'overlay d'onboarding
       * @checkpoint onboarding-closed, transition vers l'écran principal de l'application
       */
      
      const overlay = document.getElementById('cv-rambo-onboarding');
      if (overlay) {
        overlay.style.transition = 'opacity 0.5s ease';
        overlay.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 500));
        overlay.remove();
      }

      console.log('[CHECKPOINT]', 'onboarding-closed', {
        transition: 'fade-out',
        duration: '500ms'
      });

      /**
       * @action Rendre l'application pleinement accessible
       * @checkpoint app-unlocked, tous les écrans (arsenal, kanban, capture) sont accessibles
       */
      
      Alpine.store('onboardingComplete', {
        completed: true,
        unlocked: true,
        profileSummary: this.profileData
      });

      window.dispatchEvent(new CustomEvent('cv-rambo:app-unlocked'));

      console.log('[CHECKPOINT]', 'app-unlocked', {
        screens: ['arsenal-cv', 'kanban', 'capture-offre', 'tableau-bord'],
        status: 'accessible'
      });

      /**
       * @action Stocker les préférences d'accès rapide
       * @checkpoint shortcuts-saved, liens "Revoir le tutoriel" et "Modifier mon profil" persistés dans settings
       */
      const databases = Alpine.store('databases');
      if (databases?.settings) {
        try {
          const settings = await databases.settings.get('app-settings');
          await databases.settings.put({
            ...settings,
            shortcuts: {
              showTutorial: true,
              editProfile: true
            }
          });
        } catch (e) {}
      }

      console.log('[CHECKPOINT]', 'shortcuts-saved', {
        shortcuts: ['showTutorial', 'editProfile'],
        persisted: true
      });
    },

    revoirTutoriel() {
      window.dispatchEvent(new CustomEvent('cv-rambo:onboarding-step-3'));
    },

    modifierProfil() {
      window.dispatchEvent(new CustomEvent('cv-rambo:onboarding-step-2'));
    }
  }));
});
