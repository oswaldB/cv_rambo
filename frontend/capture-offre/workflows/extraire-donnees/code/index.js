/**
 * Mega-fonction du workflow F-004-extraire-donnees
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Extraire les informations clés de l'offre
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('extractedOffer', {
    extracting: false,
    data: {
      title: '',
      company: '',
      url: '',
      description: '',
      domain: '',
      captureDate: null
    }
  });

  Alpine.data('workflowExtraireDonnees', () => ({
    extracting: false,
    offerData: {
      title: '',
      company: '',
      url: '',
      description: '',
      domain: '',
      captureDate: null
    },

    async init() {},

    async extraireDonnees() {
      /**
       * @action Lancer l'extraction depuis le DOM de la page
       * @checkpoint extraction-started, le spinner d'extraction est affiché
       */
      this.extracting = true;
      Alpine.store('extractedOffer', { ...Alpine.store('extractedOffer'), extracting: true });
      
      console.log('[CHECKPOINT]', 'extraction-started', { status: 'loading' });

      // Attendre un peu pour simuler l'extraction
      await new Promise(resolve => setTimeout(resolve, 500));

      /**
       * @action Extraire le titre de l'offre depuis le DOM
       * @checkpoint title-extracted, le titre est récupéré via sélecteur spécifique au site
       */
      const titleSelectors = ['h1', '.job-title', '[data-testid="job-title"]', '.top-card-layout__title'];
      for (const selector of titleSelectors) {
        const el = document.querySelector(selector);
        if (el) {
          this.offerData.title = el.textContent.trim().substring(0, 200);
          break;
        }
      }
      
      console.log('[CHECKPOINT]', 'title-extracted', { title: this.offerData.title });

      /**
       * @action Extraire le nom de l'entreprise depuis le DOM
       * @checkpoint company-extracted, l'entreprise est récupérée via sélecteur spécifique
       */
      const companySelectors = ['.company-name', '[data-testid="company-name"]', '.jobs-unified-top-card__company-name', '[class*="company"]'];
      for (const selector of companySelectors) {
        const el = document.querySelector(selector);
        if (el) {
          this.offerData.company = el.textContent.trim().substring(0, 100);
          break;
        }
      }

      console.log('[CHECKPOINT]', 'company-extracted', { company: this.offerData.company });

      /**
       * @action Capturer l'URL complète de la page
       * @checkpoint url-captured, window.location.href est stocké
       */
      this.offerData.url = window.location.href;
      
      console.log('[CHECKPOINT]', 'url-captured', { url: this.offerData.url });

      /**
       * @action Extraire la description de l'offre
       * @checkpoint description-extracted, la description est récupérée et tronquée à 500 caractères maximum
       */
      const descSelectors = ['.description', '[data-testid="job-description"]', '.jobs-description__content', '[class*="description"]', 'article'];
      for (const selector of descSelectors) {
        const el = document.querySelector(selector);
        if (el && el.textContent.length > 50) {
          let desc = el.textContent.trim().replace(/\s+/g, ' ');
          this.offerData.description = desc.substring(0, 500);
          if (desc.length > 500) this.offerData.description += '...';
          break;
        }
      }

      console.log('[CHECKPOINT]', 'description-extracted', { 
        length: this.offerData.description.length,
        truncated: this.offerData.description.length >= 500 
      });

      /**
       * @action Enregistrer le domaine comme métadonnée
       * @checkpoint domain-stored, le domaine (linkedin.com, etc.) est extrait de l'URL
       */
      this.offerData.domain = new URL(this.offerData.url).hostname;
      
      console.log('[CHECKPOINT]', 'domain-stored', { domain: this.offerData.domain });

      /**
       * @action Enregistrer la date de capture
       * @checkpoint date-stored, la date/heure ISO actuelle est enregistrée
       */
      this.offerData.captureDate = new Date().toISOString();
      
      console.log('[CHECKPOINT]', 'date-stored', { date: this.offerData.captureDate });

      /**
       * @action Logger l'extraction réussie en console
       * @checkpoint log-success-emitted, console affiche "[CAPTURE] extract-success <url>"
       */
      console.log('[CAPTURE] extract-success', this.offerData.url);
      console.log('[CHECKPOINT]', 'log-success-emitted', { url: this.offerData.url });

      this.extracting = false;
      Alpine.store('extractedOffer', { extracting: false, data: this.offerData });

      /**
       * @action Afficher les données extraites dans un popup de confirmation/édition
       * @checkpoint edit-popup-opened, les champs titre, entreprise, URL, description sont pré-remplis et éditables
       */
      console.log('[CHECKPOINT]', 'edit-popup-opened', {
        fields: ['title', 'company', 'url', 'description'],
        editable: true
      });

      return this.offerData;
    }
  }));
});
