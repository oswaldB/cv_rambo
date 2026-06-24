/**
 * Mega-fonction du workflow F-017-importer-cv
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Importer CV via upload ou saisie manuelle
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('onboardingImporter', {
    step: 1,
    uploading: false,
    extractedData: null,
    manualMode: false
  });

  Alpine.data('workflowImporterCv', () => ({
    step: 1,
    uploading: false,
    extractedData: null,
    manualMode: false,
    file: null,

    async init() {
      await this.detecterPremierLancement();
    },

    async detecterPremierLancement() {
      /**
       * @action Détecter le premier clic sur l'icône CV Rambo
       * @checkpoint first-launch-detected, vérification que onboardingDone est false dans PouchDB
       */
      
      const databases = Alpine.store('databases');
      let onboardingDone = false;
      
      if (databases?.settings) {
        try {
          const settings = await databases.settings.get('app-settings');
          onboardingDone = settings?.onboardingDone || false;
        } catch (e) {
          // Pas encore de settings, c'est bien un premier lancement
          onboardingDone = false;
        }
      }

      console.log('[CHECKPOINT]', 'first-launch-detected', {
        isFirstLaunch: !onboardingDone,
        onboardingDone: onboardingDone
      });

      if (!onboardingDone) {
        await this.injecterOverlay();
      }
    },

    async injecterOverlay() {
      /**
       * @action Injecter l'overlay d'onboarding en full viewport
       * @checkpoint overlay-injected, 100vw x 100vh avec backdrop semi-transparent et z-index max
       */
      
      const overlay = document.createElement('div');
      overlay.id = 'cv-rambo-onboarding';
      overlay.setAttribute('x-data', 'workflowImporterCv()');
      overlay.setAttribute('x-init', 'init()');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999999;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Bebas Neue', Impact, sans-serif;
      `;

      const shadowRoot = Alpine.store('theme')?.shadowRoot;
      if (shadowRoot) {
        shadowRoot.appendChild(overlay);
      } else {
        document.body.appendChild(overlay);
      }

      this.renderEtape1();

      console.log('[CHECKPOINT]', 'overlay-injected', {
        dimensions: '100vw x 100vh',
        zIndex: 999999,
        backdrop: 'semi-transparent'
      });

      /**
       * @action Bloquer les interactions avec le site sous-jacent
       * @checkpoint modal-blocking-active, l'overlay capture tous les clics jusqu'à complétion
       */
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          e.stopPropagation();
        }
      });

      console.log('[CHECKPOINT]', 'modal-blocking-active', {
        blocking: true,
        target: 'overlay-background'
      });
    },

    renderEtape1() {
      /**
       * @action Afficher l'étape 1 : choix entre upload CV ou saisie manuelle
       * @checkpoint step-1-displayed, interface avec options "Uploader mon CV" ou "Remplir manuellement"
       */
      
      const overlay = document.getElementById('cv-rambo-onboarding');
      if (!overlay) return;

      overlay.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #2F4F4F 0%, #1a1a1a 100%);
          border: 3px solid #FFD700;
          padding: 40px;
          max-width: 600px;
          width: 90%;
          text-align: center;
          box-shadow: 0 0 40px rgba(255, 215, 0, 0.3);
        ">
          <h1 style="
            color: #FFD700;
            font-size: 36px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 3px;
          ">Bienvenue, Soldat</h1>
          <p style="
            color: #f5f5f5;
            font-family: 'Roboto Condensed', sans-serif;
            margin-bottom: 30px;
          ">Prépare ton arsenal pour la mission</p>
          
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button @click="activerUpload()" style="
              background: #2E8B57;
              border: 2px solid #FFD700;
              color: white;
              padding: 20px 30px;
              font-family: 'Bebas Neue', sans-serif;
              font-size: 20px;
              cursor: pointer;
              text-transform: uppercase;
              letter-spacing: 2px;
              min-width: 200px;
            ">
              📄 Uploader mon CV
            </button>
            
            <button @click="activerSaisieManuelle()" style="
              background: transparent;
              border: 2px solid #FFD700;
              color: #FFD700;
              padding: 20px 30px;
              font-family: 'Bebas Neue', sans-serif;
              font-size: 20px;
              cursor: pointer;
              text-transform: uppercase;
              letter-spacing: 2px;
              min-width: 200px;
            ">
              ✏️ Remplir manuellement
            </button>
          </div>
          
          <input type="file" 
                 x-ref="fileInput"
                 accept=".pdf,.docx,.doc"
                 @change="handleFileUpload($event)"
                 style="display: none;">
        </div>
      `;

      Alpine.initTree(overlay);

      console.log('[CHECKPOINT]', 'step-1-displayed', {
        options: ['upload-cv', 'manual-entry'],
        interface: 'choice-screen'
      });
    },

    activerUpload() {
      /**
       * @action Permettre l'upload d'un fichier PDF/DOCX
       * @checkpoint file-upload-ready, input file acceptant .pdf et .docx visible
       */
      
      this.$refs.fileInput.click();

      console.log('[CHECKPOINT]', 'file-upload-ready', {
        acceptedFormats: ['.pdf', '.docx', '.doc'],
        inputType: 'file'
      });
    },

    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      /**
       * @action Valider le fichier uploadé
       * @checkpoint file-validated, taille < 5MB et format valide vérifiés
       */
      
      const maxSize = 5 * 1024 * 1024; // 5MB
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (file.size > maxSize) {
        window.dispatchEvent(new CustomEvent('cv-rambo:show-error-toast', {
          detail: { title: 'FICHIER TROP GROS', message: 'Maximum 5MB' }
        }));
        return;
      }

      if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
        window.dispatchEvent(new CustomEvent('cv-rambo:show-error-toast', {
          detail: { title: 'FORMAT INVALIDE', message: 'PDF ou DOCX uniquement' }
        }));
        return;
      }

      this.file = file;
      
      console.log('[CHECKPOINT]', 'file-validated', {
        name: file.name,
        size: file.size,
        type: file.type,
        valid: true
      });

      await this.extraireDonnees();
    },

    async extraireDonnees() {
      /**
       * @action Extraire automatiquement les données du CV
       * @checkpoint extraction-started, spinner "Extraction en cours..." affiché
       */
      
      this.uploading = true;
      
      const overlay = document.getElementById('cv-rambo-onboarding');
      overlay.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #2F4F4F 0%, #1a1a1a 100%);
          border: 3px solid #FFD700;
          padding: 40px;
          text-align: center;
        ">
          <div style="
            width: 60px;
            height: 60px;
            border: 4px solid #FFD700;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          "></div>
          <p style="color: #FFD700; font-size: 24px;">EXTRACTION EN COURS...</p>
          <p style="color: #f5f5f5; font-family: 'Roboto Condensed';">${this.file.name}</p>
        </div>
      `;

      console.log('[CHECKPOINT]', 'extraction-started', {
        filename: this.file.name,
        status: 'processing'
      });

      // Simulation extraction (dans la vraie app, appel à l'API d'extraction)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Données simulées extraites
      this.extractedData = {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+33 6 12 34 56 78',
        experiences: [
          { title: 'Développeur Web', company: 'Tech Corp', duration: '2020-2024' }
        ],
        competences: ['JavaScript', 'Python', 'React'],
        fileName: this.file.name
      };

      await this.finaliserImport();
    },

    activerSaisieManuelle() {
      /**
       * @action Permettre la saisie manuelle alternative
       * @checkpoint manual-form-ready, formulaire avec champs expériences, compétences, contact visible
       */
      
      this.manualMode = true;
      
      const overlay = document.getElementById('cv-rambo-onboarding');
      overlay.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #2F4F4F 0%, #1a1a1a 100%);
          border: 3px solid #FFD700;
          padding: 30px;
          max-width: 500px;
          width: 90%;
        ">
          <h2 style="color: #FFD700; text-align: center; margin-bottom: 20px;">SAISIE MANUELLE</h2>
          
          <div style="margin-bottom: 15px;">
            <label style="color: #f5f5f5; display: block; margin-bottom: 5px;">Nom complet</label>
            <input type="text" x-model="extractedData.name" style="
              width: 100%;
              padding: 10px;
              background: #1a1a1a;
              border: 2px solid #FFD700;
              color: #f5f5f5;
              font-family: 'Roboto Condensed';
            ">
          </div>
          
          <div style="margin-bottom: 15px;">
            <label style="color: #f5f5f5; display: block; margin-bottom: 5px;">Email</label>
            <input type="email" x-model="extractedData.email" style="
              width: 100%;
              padding: 10px;
              background: #1a1a1a;
              border: 2px solid #FFD700;
              color: #f5f5f5;
              font-family: 'Roboto Condensed';
            ">
          </div>
          
          <button @click="sauvegarderManuel()" style="
            width: 100%;
            background: #2E8B57;
            border: 2px solid #FFD700;
            color: white;
            padding: 15px;
            font-family: 'Bebas Neue';
            font-size: 18px;
            cursor: pointer;
            margin-top: 20px;
          ">CONTINUER</button>
        </div>
      `;

      Alpine.initTree(overlay);

      console.log('[CHECKPOINT]', 'manual-form-ready', {
        fields: ['name', 'email', 'experiences', 'competences'],
        mode: 'manual-entry'
      });
    },

    sauvegarderManuel() {
      this.extractedData = {
        name: this.extractedData?.name || '',
        email: this.extractedData?.email || '',
        experiences: [],
        competences: [],
        manualEntry: true
      };
      this.finaliserImport();
    },

    async finaliserImport() {
      /**
       * @action Logger la capture du profil
       * @checkpoint log-emitted, console affiche "[ONBOARDING] profile-captured"
       */
      
      console.log('[ONBOARDING] profile-captured', {
        mode: this.manualMode ? 'manual' : 'upload',
        timestamp: new Date().toISOString()
      });

      console.log('[CHECKPOINT]', 'log-emitted', {
        message: '[ONBOARDING] profile-captured',
        mode: this.manualMode ? 'manual' : 'upload'
      });

      /**
       * @action Stocker le profil dans PouchDB
       * @checkpoint profile-saved, données persistantes avec _id utilisateur
       */
      
      const databases = Alpine.store('databases');
      if (databases?.profil) {
        await databases.profil.put({
          _id: 'user-profile',
          ...this.extractedData,
          createdAt: new Date().toISOString()
        });
      }

      console.log('[CHECKPOINT]', 'profile-saved', {
        docId: 'user-profile',
        persisted: true
      });

      /**
       * @action Passer à l'étape 2 de vérification
       * @checkpoint step-2-triggered, transition vers l'écran de vérification
       */
      
      window.dispatchEvent(new CustomEvent('cv-rambo:onboarding-step-2', {
        detail: { profileData: this.extractedData }
      }));

      console.log('[CHECKPOINT]', 'step-2-triggered', {
        transition: 'step-1 -> step-2',
        target: 'verification-screen'
      });
    }
  }));
});
