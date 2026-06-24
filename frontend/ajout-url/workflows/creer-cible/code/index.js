/**
 * Mega-fonction : creer-cible (Ajout URL)
 * Gère la validation et création d'une nouvelle cible
 * Framework: Alpine.js
 * Source: specs/_app/frontend/ajout-url/workflows/creer-cible/specs/spec.md
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('cibleCreator', () => ({
    // State form
    url: '',
    isValid: false,
    validationError: false,
    validationMsg: '',
    siteType: null,
    
    // State submit
    isSubmitting: false,
    success: false,
    successMessage: '',
    error: null,
    createdCibleId: null,

    // Sites supportés
    supportedSites: {
      'linkedin.com': 'LinkedIn',
      'indeed.com': 'Indeed',
      'apec.fr': 'APEC',
      'welcometothejungle.com': 'Welcome to the Jungle',
      'glassdoor.com': 'Glassdoor',
      'monster.fr': 'Monster',
      'hellowork.com': 'HelloWork',
      'emploipublic.fr': 'Emploi Public'
    },

    validateUrl() {
      /**
       * @action Valider URL
       * @checkpoint validation-started
       */
      console.log('[CHECKPOINT]', 'validation-started', { url: this.url });
      
      if (!this.url) {
        this.isValid = false;
        this.validationError = false;
        this.validationMsg = '';
        this.siteType = null;
        return;
      }

      try {
        // Validation format URL
        const urlObj = new URL(this.url);
        
        // Vérifier protocole
        if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
          throw new Error('Le lien doit être HTTP ou HTTPS');
        }

        /**
         * @checkpoint url-valid
         */
        this.isValid = true;
        this.validationError = false;
        
        // Détecter type de site
        const hostname = urlObj.hostname.replace(/^www\./, '');
        this.siteType = this.detectSiteType(hostname);
        
        this.validationMsg = this.siteType 
          ? `✓ URL valide - ${this.siteType}` 
          : '✓ URL valide (site générique)';
        
        console.log('[CHECKPOINT]', 'url-valid', { 
          hostname, 
          siteType: this.siteType 
        });

      } catch (err) {
        /**
         * @checkpoint url-invalid
         */
        this.isValid = false;
        this.validationError = true;
        this.siteType = null;
        this.validationMsg = err.message || 'URL invalide';
        
        console.log('[CHECKPOINT]', 'url-invalid', { 
          error: err.message 
        });
      }
    },

    detectSiteType(hostname) {
      for (const [domain, name] of Object.entries(this.supportedSites)) {
        if (hostname.includes(domain)) {
          return name;
        }
      }
      return null;
    },

    async submit() {
      /**
       * @action Soumettre formulaire
       * @checkpoint submit-started
       */
      if (!this.isValid || this.isSubmitting) return;
      
      this.isSubmitting = true;
      this.error = null;
      
      console.log('[CHECKPOINT]', 'submit-started', { url: this.url });

      try {
        // Vérifier PouchDB prêt
        if (!window.db || !window.dbUtils) {
          throw new Error('Base de données non initialisée');
        }

        /**
         * @action Créer document cible
         * @checkpoint doc-created
         */
        const cible = await window.dbUtils.createCible(this.url, {
          siteType: this.siteType,
          detectedAt: new Date().toISOString(),
          source: 'manual-input'
        });
        
        this.createdCibleId = cible._id;
        
        console.log('[CHECKPOINT]', 'doc-created', { 
          id: cible._id,
          url: this.url 
        });

        /**
         * @action Déclencher sync
         * @checkpoint sync-triggered
         */
        console.log('[CHECKPOINT]', 'sync-triggered', { 
          cibleId: cible._id 
        });

        /**
         * @action Afficher succès
         * @checkpoint success-displayed
         */
        this.success = true;
        this.successMessage = `La cible "${this.siteType || 'Offre'}" a été ajoutée avec succès. Le workflow backend va maintenant générer le script.`;
        
        console.log('[CHECKPOINT]', 'success-displayed', { 
          cibleId: cible._id 
        });

      } catch (err) {
        /**
         * @checkpoint submit-error
         */
        this.error = err.message;
        console.error('[CHECKPOINT]', 'submit-error', { 
          error: err.message 
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    reset() {
      /**
       * @action Réinitialiser formulaire
       * @checkpoint form-reset
       */
      this.url = '';
      this.isValid = false;
      this.validationError = false;
      this.validationMsg = '';
      this.siteType = null;
      this.success = false;
      this.successMessage = '';
      this.error = null;
      this.createdCibleId = null;
      
      console.log('[CHECKPOINT]', 'form-reset');
    },

    goToDashboard() {
      /**
       * @action Naviguer vers dashboard
       * @checkpoint navigation-dashboard
       */
      console.log('[CHECKPOINT]', 'navigation-dashboard');
      window.location.href = '../dashboard/index.html';
    },

    goToDetail() {
      /**
       * @action Naviguer vers détail cible
       * @checkpoint navigation-detail
       */
      if (this.createdCibleId) {
        console.log('[CHECKPOINT]', 'navigation-detail', { 
          cibleId: this.createdCibleId 
        });
        window.location.href = `../detail-cible/index.html?id=${this.createdCibleId}`;
      }
    }
  }));
});
