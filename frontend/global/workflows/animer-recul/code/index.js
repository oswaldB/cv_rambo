/**
 * Mega-fonction du workflow F-012-animer-recul
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Animation recul des boutons style action movie
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('recoilEffect', {
    enabled: true,
    soundEnabled: false
  });

  Alpine.data('workflowAnimerRecul', () => ({
    initialized: false,
    observer: null,

    async init() {
      await this.initialiserRecul();
    },

    async initialiserRecul() {
      /**
       * @action Définir l'animation CSS de recul
       * @checkpoint recoil-keyframes-defined, @keyframes recoil avec transform: translateX/scale
       */
      
      const styles = document.createElement('style');
      styles.textContent = `
        @keyframes recoil {
          0% {
            transform: scale(1) translateX(0);
          }
          10% {
            transform: scale(0.95) translateX(-3px);
          }
          20% {
            transform: scale(0.9) translateX(-6px);
          }
          30% {
            transform: scale(0.92) translateX(-4px);
          }
          50% {
            transform: scale(0.98) translateX(-1px);
          }
          100% {
            transform: scale(1) translateX(0);
          }
        }
        
        @keyframes muzzle-flash {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
          }
          10% {
            box-shadow: 
              0 0 20px 5px rgba(255, 215, 0, 0.8),
              0 0 40px 10px rgba(255, 0, 0, 0.5);
          }
          30% {
            box-shadow: 
              0 0 10px 2px rgba(255, 215, 0, 0.4),
              0 0 20px 5px rgba(255, 0, 0, 0.2);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
          }
        }
        
        .recoil-animation {
          animation: 
            recoil 0.3s ease-out,
            muzzle-flash 0.3s ease-out;
        }
        
        .action-btn {
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        
        .action-btn:active {
          transform: scale(0.95);
        }
      `;

      const shadowRoot = Alpine.store('theme')?.shadowRoot;
      if (shadowRoot) {
        shadowRoot.appendChild(styles);
      } else {
        document.head.appendChild(styles);
      }

      console.log('[CHECKPOINT]', 'recoil-keyframes-defined', {
        animations: ['recoil', 'muzzle-flash'],
        duration: '0.3s',
        transforms: ['translateX', 'scale']
      });

      // Configurer le MutationObserver pour les nouveaux boutons
      this.setupMutationObserver();

      // Appliquer aux boutons existants
      this.applyToExistingButtons();

      this.initialized = true;

      Alpine.store('recoilEffect', {
        enabled: true,
        soundEnabled: false
      });
    },

    setupMutationObserver() {
      /**
       * @action Sélectionner tous les boutons d'action
       * @checkpoint buttons-selected, querySelectorAll sur les boutons avec classe .action-btn
       */
      
      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const buttons = node.matches?.('.action-btn, button, [role="button"]') 
                ? [node] 
                : node.querySelectorAll?.('.action-btn, button:not(.cv-rambo-toast button), [role="button"]') || [];
              
              buttons.forEach(btn => this.attachRecoil(btn));
            }
          });
        });
      });

      const target = Alpine.store('theme')?.shadowRoot || document.body;
      this.observer.observe(target, { childList: true, subtree: true });

      console.log('[CHECKPOINT]', 'buttons-selected', {
        selector: '.action-btn, button, [role="button"]',
        observer: 'MutationObserver'
      });
    },

    applyToExistingButtons() {
      const target = Alpine.store('theme')?.shadowRoot || document;
      const buttons = target.querySelectorAll('.action-btn, button:not(.cv-rambo-toast button), [role="button"]');
      
      buttons.forEach(btn => this.attachRecoil(btn));

      /**
       * @action Ajouter l'écouteur d'événement click sur chaque bouton
       * @checkpoint listeners-added, addEventListener('click') sur chaque bouton
       */
      console.log('[CHECKPOINT]', 'listeners-added', {
        buttonsAttached: buttons.length,
        event: 'click'
      });
    },

    attachRecoil(button) {
      if (button.dataset.recoilAttached) return;
      
      button.classList.add('action-btn');
      
      button.addEventListener('click', (e) => {
        /**
         * @action Détecter le clic sur un bouton d'action
         * @checkpoint click-detected, événement click déclenché sur un bouton
         */
        console.log('[CHECKPOINT]', 'click-detected', {
          button: button.textContent?.trim() || 'unnamed',
          timestamp: Date.now()
        });

        /**
         * @action Appliquer l'animation de recul au bouton cliqué
         * @checkpoint recoil-applied, classe .recoil-animation ajoutée au bouton
         */
        button.classList.remove('recoil-animation');
        void button.offsetWidth; // Force reflow
        button.classList.add('recoil-animation');

        console.log('[CHECKPOINT]', 'recoil-applied', {
          animation: 'recoil',
          duration: '0.3s',
          element: button.tagName
        });

        /**
         * @action Jouer l'effet sonore de "coup de feu" (optionnel)
         * @checkpoint sound-played, audio.play() déclenché si sound-effects activé
         */
        const soundEnabled = Alpine.store('recoilEffect')?.soundEnabled;
        if (soundEnabled) {
          this.playGunSound();
        }

        console.log('[CHECKPOINT]', 'sound-played', {
          played: soundEnabled,
          reason: soundEnabled ? 'enabled' : 'disabled'
        });

        /**
         * @action Retirer la classe d'animation après la fin
         * @checkpoint animation-cleared, classe .recoil-animation retirée après 300ms
         */
        setTimeout(() => {
          button.classList.remove('recoil-animation');
          
          console.log('[CHECKPOINT]', 'animation-cleared', {
            delay: '300ms',
            classRemoved: 'recoil-animation'
          });
        }, 300);

        /**
         * @action Continuer l'action du bouton normalement
         * @checkpoint action-continued, la fonction originale du bouton s'exécute
         */
        console.log('[CHECKPOINT]', 'action-continued', {
          propagation: 'normal',
          defaultPrevented: e.defaultPrevented
        });
      });

      button.dataset.recoilAttached = 'true';
    },

    playGunSound() {
      // Créer un son synthétique de coup de feu (8-bit style)
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        console.log('[SOUND] Gun sound failed to play:', e.message);
      }
    },

    /**
     * Helper: Activer/désactiver les effets sonores
     */
    toggleSound(enabled) {
      Alpine.store('recoilEffect', {
        enabled: true,
        soundEnabled: enabled
      });
    },

    /**
     * Helper: Désactiver complètement l'effet recul
     */
    disable() {
      if (this.observer) {
        this.observer.disconnect();
      }
      Alpine.store('recoilEffect', {
        enabled: false,
        soundEnabled: false
      });
    }
  }));
});
