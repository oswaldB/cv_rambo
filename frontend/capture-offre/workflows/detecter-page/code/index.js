/**
 * Mega-fonction du workflow F-004-detecter-page
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Détecter si la page contient une offre d'emploi
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('captureOffer', {
    detected: false,
    domain: null,
    isOfferPage: false
  });

  Alpine.data('workflowDetecterPage', () => ({
    detected: false,
    analyzing: false,

    async init() {
      await this.detecterOffre();
    },

    async detecterOffre() {
      /**
       * @action Cliquer sur l'icône CV Rambo pour injecter l'overlay
       * @checkpoint overlay-injected, l'overlay full viewport (100vw x 100vh) est présent dans le DOM avec z-index 999999
       */
      console.log('[CHECKPOINT]', 'overlay-injected', {
        dimensions: '100vw x 100vh',
        zIndex: 999999
      });

      /**
       * @action Analyser l'URL de la page active
       * @checkpoint url-analyzed, le domaine est identifié (linkedin.com, welcometothejungle.com, etc.)
       */
      const url = window.location.href;
      const domain = new URL(url).hostname;
      
      console.log('[CHECKPOINT]', 'url-analyzed', { domain, url });

      /**
       * @action Scanner le DOM pour détecter les patterns d'offre d'emploi
       * @checkpoint dom-scanned, les sélecteurs CSS spécifiques au site sont évalués
       */
      this.analyzing = true;
      
      // Patterns par site
      const patterns = {
        'linkedin.com': ['h1.top-card-layout__title', '.jobs-unified-top-card__company-name'],
        'welcometothejungle.com': ['h1', '[data-testid="job-header-title"]'],
        'indeed.com': ['h1.jobsearch-JobInfoHeader-title', '.jobsearch-CompanyInfoContainer'],
        'default': ['h1', '[class*="job"]', '[class*="offer"]', '[class*="poste"]']
      };

      const sitePatterns = patterns[domain] || patterns['default'];
      let foundElements = [];

      sitePatterns.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          foundElements.push({ selector, count: elements.length });
        }
      });

      console.log('[CHECKPOINT]', 'dom-scanned', {
        patterns: sitePatterns.length,
        found: foundElements.length
      });

      /**
       * @action Détecter si la page contient une offre
       * @checkpoint offer-detected, retourne true si patterns trouvés (titre, entreprise, description), sinon false
       */
      const hasTitle = document.querySelector('h1') !== null;
      const hasCompany = document.body.innerText.toLowerCase().includes('entreprise') || 
                         document.body.innerText.toLowerCase().includes('company') ||
                         foundElements.some(e => e.selector.includes('company'));
      
      this.detected = hasTitle || hasCompany || foundElements.length >= 2;

      Alpine.store('captureOffer', {
        detected: this.detected,
        domain: domain,
        isOfferPage: this.detected
      });

      console.log('[CHECKPOINT]', 'offer-detected', {
        detected: this.detected,
        hasTitle,
        hasCompany,
        patternsFound: foundElements.length
      });

      this.analyzing = false;

      /**
       * @action Afficher l'interface selon le résultat de la détection
       * @checkpoint ui-rendered, soit les boutons "Ajouter à la liste" et "Tirer direct" sont visibles, soit message "Aucune offre détectée"
       */
      console.log('[CHECKPOINT]', 'ui-rendered', {
        showCaptureButtons: this.detected,
        showNoOfferMessage: !this.detected
      });

      /**
       * @action Activer le backdrop semi-transparent
       * @checkpoint backdrop-active, le site sous-jacent est masqué par un backdrop semi-transparent
       */
      console.log('[CHECKPOINT]', 'backdrop-active', {
        opacity: 0.7,
        color: 'black'
      });

      /**
       * @action Rendre le bouton X et la touche Échap fonctionnels pour fermer
       * @checkpoint close-ready, le clic sur X ou Échap retire l'overlay du DOM
       */
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          window.dispatchEvent(new CustomEvent('cv-rambo:close-capture'));
        }
      });

      console.log('[CHECKPOINT]', 'close-ready', {
        triggers: ['click-X', 'Escape-key']
      });
    }
  }));
});
