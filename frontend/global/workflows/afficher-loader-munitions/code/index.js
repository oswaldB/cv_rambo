/**
 * Mega-fonction du workflow F-012-afficher-loader-munitions
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Loader en forme de jauge de munitions style rétro 80s
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('ammoLoader', {
    visible: false,
    progress: 0,
    message: 'CHARGEMENT...',
    bullets: []
  });

  Alpine.data('workflowAfficherLoaderMunitions', () => ({
    loader: null,
    visible: false,
    progress: 0,
    message: 'CHARGEMENT...',
    TOTAL_BULLETS: 12,
    animationId: null,

    async init() {
      await this.initialiserLoader();
    },

    async initialiserLoader() {
      /**
       * @action Créer le composant loader de munitions
       * @checkpoint loader-component-created, élément DOM représentant un chargeur avec N balles
       */
      
      // Créer le conteneur du loader
      this.loader = document.createElement('div');
      this.loader.className = 'cv-rambo-loader cv-rambo-loader--ammo';
      this.loader.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        pointer-events: none;
      `;

      // Structure HTML du loader
      const bulletsHTML = Array(this.TOTAL_BULLETS).fill(0)
        .map((_, i) => `<div class="ammo-bullet ammo-bullet--${i}" data-index="${i}"></div>`)
        .join('');
      
      this.loader.innerHTML = `
        <div class="ammo-magazine">
          ${bulletsHTML}
        </div>
        <div class="ammo-text">
          <span class="ammo-message">CHARGEMENT...</span>
          <span class="ammo-percentage">0%</span>
        </div>
      `;

      console.log('[CHECKPOINT]', 'loader-component-created', {
        element: 'div.cv-rambo-loader',
        bullets: this.TOTAL_BULLETS,
        type: 'magazine'
      });

      /**
       * @action Styliser le loader avec le thème rétro
       * @checkpoint loader-styled, couleurs gunmetal-gray et gold appliquées
       */
      const styles = document.createElement('style');
      styles.textContent = `
        .cv-rambo-loader--ammo {
          font-family: 'Bebas Neue', Impact, sans-serif;
        }
        
        .ammo-magazine {
          display: flex;
          flex-direction: row;
          gap: 8px;
          padding: 20px;
          background: linear-gradient(135deg, #2F4F4F 0%, #1a1a1a 100%);
          border: 3px solid #FFD700;
          border-radius: 8px;
          box-shadow: 
            0 0 20px rgba(255, 215, 0, 0.5),
            inset 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .ammo-bullet {
          width: 16px;
          height: 40px;
          background: #333;
          border: 2px solid #666;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .ammo-bullet::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30%;
          background: linear-gradient(180deg, #FFD700 0%, #FFA500 100%);
          transform: translateY(-100%);
          transition: transform 0.3s ease;
        }
        
        .ammo-bullet--loaded {
          border-color: #FFD700;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
        }
        
        .ammo-bullet--loaded::before {
          transform: translateY(0);
        }
        
        .ammo-bullet--loading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: var(--fill-percent, 0%);
          background: linear-gradient(180deg, #FFD700 0%, #FFA500 100%);
          animation: bullet-fill 0.5s ease-out forwards;
        }
        
        @keyframes bullet-fill {
          from { height: 0; }
          to { height: var(--fill-percent, 100%); }
        }
        
        .ammo-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .ammo-message {
          font-size: 24px;
          color: #FFD700;
          text-transform: uppercase;
          letter-spacing: 4px;
          text-shadow: 
            0 0 10px rgba(255, 215, 0, 0.8),
            2px 2px 4px rgba(0, 0, 0, 0.8);
        }
        
        .ammo-percentage {
          font-size: 48px;
          color: #2E8B57;
          font-family: 'Bebas Neue', Impact, sans-serif;
          text-shadow: 
            0 0 20px rgba(46, 139, 87, 0.8),
            2px 2px 4px rgba(0, 0, 0, 0.8);
        }
        
        .cv-rambo-loader--enter {
          animation: loader-enter 0.5s ease-out;
        }
        
        .cv-rambo-loader--exit {
          animation: loader-exit 0.3s ease-in forwards;
        }
        
        @keyframes loader-enter {
          from { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.8);
          }
          to { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes loader-exit {
          from { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1);
          }
          to { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `;

      const shadowRoot = Alpine.store('theme')?.shadowRoot;
      if (shadowRoot) {
        shadowRoot.appendChild(styles);
      } else {
        document.head.appendChild(styles);
      }

      console.log('[CHECKPOINT]', 'loader-styled', {
        colors: ['gunmetal-gray', 'gold', 'camo-green'],
        style: 'retro-action-movie-80s'
      });

      // Écouter les événements de chargement
      window.addEventListener('cv-rambo:loading-start', (event) => {
        this.demarrerChargement(event.detail);
      });

      window.addEventListener('cv-rambo:loading-update', (event) => {
        this.mettreAJourProgression(event.detail);
      });

      window.addEventListener('cv-rambo:loading-end', () => {
        this.terminerChargement();
      });

      /**
       * @action Détecter le début d'une opération de chargement
       * @checkpoint loading-started, événement global "cv-rambo:loading-start" émis
       */
      console.log('[CHECKPOINT]', 'loading-started', {
        eventListeners: ['loading-start', 'loading-update', 'loading-end'],
        status: 'listening'
      });
    },

    async demarrerChargement(detail = {}) {
      this.message = detail.message || 'CHARGEMENT...';
      this.progress = 0;
      
      // Injecter dans le DOM
      const shadowRoot = Alpine.store('theme')?.shadowRoot;
      if (shadowRoot) {
        shadowRoot.appendChild(this.loader);
      } else {
        document.body.appendChild(this.loader);
      }

      this.loader.classList.add('cv-rambo-loader--enter');

      /**
       * @action Afficher le loader avec animation de "chargement des munitions"
       * @checkpoint loader-displayed, le chargeur apparaît avec animation d'apparition
       */
      this.visible = true;
      Alpine.store('ammoLoader', {
        visible: true,
        progress: 0,
        message: this.message,
        bullets: []
      });

      console.log('[CHECKPOINT]', 'loader-displayed', {
        animation: 'loader-enter',
        message: this.message
      });

      this.mettreAJourTexte();
    },

    async mettreAJourProgression(detail = {}) {
      this.progress = detail.progress || 0;
      
      /**
       * @action Animer la progression des munitions
       * @checkpoint bullets-animated, les balles se remplissent progressivement selon la progression
       */
      const bulletsLoaded = Math.floor((this.progress / 100) * this.TOTAL_BULLETS);
      const bullets = this.loader.querySelectorAll('.ammo-bullet');
      
      bullets.forEach((bullet, index) => {
        if (index < bulletsLoaded) {
          bullet.classList.add('ammo-bullet--loaded');
          bullet.classList.remove('ammo-bullet--loading');
        } else if (index === bulletsLoaded && this.progress % (100 / this.TOTAL_BULLETS) > 0) {
          // Balle en cours de chargement
          const partialProgress = (this.progress % (100 / this.TOTAL_BULLETS)) / (100 / this.TOTAL_BULLETS) * 100;
          bullet.style.setProperty('--fill-percent', `${partialProgress}%`);
          bullet.classList.add('ammo-bullet--loading');
        }
      });

      console.log('[CHECKPOINT]', 'bullets-animated', {
        loaded: bulletsLoaded,
        total: this.TOTAL_BULLETS,
        progress: `${this.progress}%`
      });

      /**
       * @action Mettre à jour le texte de progression
       * @checkpoint text-updated, message "Chargement... X%" visible avec style militaire
       */
      this.mettreAJourTexte();

      console.log('[CHECKPOINT]', 'text-updated', {
        message: this.message,
        percentage: `${this.progress}%`
      });
    },

    mettreAJourTexte() {
      const messageEl = this.loader.querySelector('.ammo-message');
      const percentageEl = this.loader.querySelector('.ammo-percentage');
      
      if (messageEl) messageEl.textContent = this.message;
      if (percentageEl) percentageEl.textContent = `${Math.round(this.progress)}%`;
    },

    async terminerChargement() {
      /**
       * @action Détecter la fin du chargement
       * @checkpoint loading-ended, événement "cv-rambo:loading-end" reçu ou opération terminée
       */
      console.log('[CHECKPOINT]', 'loading-ended', {
        status: 'completed',
        finalProgress: '100%'
      });

      // Animation de fin - toutes les balles chargées
      const bullets = this.loader.querySelectorAll('.ammo-bullet');
      bullets.forEach(bullet => {
        bullet.classList.add('ammo-bullet--loaded');
        bullet.classList.remove('ammo-bullet--loading');
      });

      this.progress = 100;
      this.mettreAJourTexte();

      // Attendre un court instant pour montrer le 100%
      await new Promise(resolve => setTimeout(resolve, 300));

      /**
       * @action Animer la disparition du loader
       * @checkpoint loader-hidden, fade out avec animation de "coup de feu" final
       */
      this.loader.classList.remove('cv-rambo-loader--enter');
      this.loader.classList.add('cv-rambo-loader--exit');

      console.log('[CHECKPOINT]', 'loader-hidden', {
        animation: 'loader-exit',
        effect: 'final-shot'
      });

      // Attendre la fin de l'animation
      await new Promise(resolve => setTimeout(resolve, 300));

      /**
       * @action Retirer le loader du DOM
       * @checkpoint loader-removed, élément complètement supprimé
       */
      if (this.loader) {
        this.loader.remove();
      }

      this.visible = false;
      Alpine.store('ammoLoader', {
        visible: false,
        progress: 0,
        message: '',
        bullets: []
      });

      console.log('[CHECKPOINT]', 'loader-removed', {
        status: 'removed-from-dom'
      });
    },

    /**
     * Helper: Afficher le loader avec une promesse
     */
    async showDuring(promise, message = 'CHARGEMENT...') {
      await this.demarrerChargement({ message });
      
      try {
        const result = await promise;
        await this.terminerChargement();
        return result;
      } catch (error) {
        await this.terminerChargement();
        throw error;
      }
    }
  }));
});
