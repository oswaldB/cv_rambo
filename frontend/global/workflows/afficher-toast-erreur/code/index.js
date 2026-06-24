/**
 * Mega-fonction du workflow F-018-afficher-toast-erreur
 * Source: specs/spec.md
 * Framework: Alpine.js (PAS de JS vanille)
 * Description: Afficher un toast d'erreur avec style rétro 80s
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('toastError', {
    visible: false,
    message: '',
    title: '',
    timeoutId: null
  });

  Alpine.data('workflowAfficherToastErreur', () => ({
    toast: null,
    visible: false,
    message: '',
    title: '',
    timeoutId: null,
    detailsVisible: false,
    DISPLAY_DURATION: 5000,

    async init() {
      await this.initialiserToastErreur();
    },

    async initialiserToastErreur() {
      /**
       * @action Détecter un événement d'erreur
       * @checkpoint error-event-detected, événement global "cv-rambo:show-error-toast" émis avec {message, title, error}
       */
      
      window.addEventListener('cv-rambo:show-error-toast', (event) => {
        this.afficherToast(event.detail);
      });

      console.log('[CHECKPOINT]', 'error-event-detected', {
        eventListener: 'cv-rambo:show-error-toast',
        status: 'listening'
      });
    },

    async afficherToast(data) {
      try {
        this.message = data.message || 'Une erreur est survenue';
        this.title = data.title || 'ERREUR';

        /**
         * @action Créer l'élément toast dans le DOM
         * @checkpoint toast-created, élément div avec classes .toast et .toast--error créé
         */
        
        // Supprimer l'ancien toast s'il existe
        if (this.toast) {
          this.toast.remove();
        }

        // Créer le conteneur de toast
        this.toast = document.createElement('div');
        this.toast.className = 'cv-rambo-toast cv-rambo-toast--error';
        this.toast.setAttribute('x-data', '{ visible: true }');
        this.toast.setAttribute('x-show', 'visible');
        this.toast.setAttribute('x-transition:enter', 'toast-enter');
        this.toast.setAttribute('x-transition:leave', 'toast-leave');

        // Structure HTML du toast
        this.toast.innerHTML = `
          <div class="cv-rambo-toast__content">
            <span class="cv-rambo-toast__icon">✗</span>
            <div class="cv-rambo-toast__text">
              <span class="cv-rambo-toast__title">${this.title}</span>
              <span class="cv-rambo-toast__message">${this.message}</span>
            </div>
            <button class="cv-rambo-toast__close" @click="visible = false">×</button>
          </div>
          <div class="cv-rambo-toast__progress" 
               :style="\`width: \${progress}%\`"
               x-data="{ progress: 100 }"
               x-init="setInterval(() => { if(progress > 0) progress -= 2 }, 100)"></div>
        `;

        console.log('[CHECKPOINT]', 'toast-created', {
          element: 'div.cv-rambo-toast',
          classes: ['cv-rambo-toast', 'cv-rambo-toast--error']
        });

        /**
         * @action Appliquer le style rétro au toast
         * @checkpoint toast-styled, fond rouge, icône ✗, typographie Bebas Neue appliqués
         */
        const styles = document.createElement('style');
        styles.textContent = `
          .cv-rambo-toast {
            position: fixed;
            top: 20px;
            right: 20px;
            min-width: 300px;
            max-width: 500px;
            background: linear-gradient(135deg, #8B0000 0%, #FF0000 100%);
            border: 3px solid #FFD700;
            border-left: 6px solid #FFD700;
            border-radius: 0;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 
                        0 0 40px rgba(255, 0, 0, 0.4),
                        inset 0 0 20px rgba(0, 0, 0, 0.3);
            font-family: 'Bebas Neue', Impact, sans-serif;
            z-index: 999999;
            overflow: hidden;
            animation: toast-shake 0.5s ease-out;
          }

          @keyframes toast-shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }

          @keyframes toast-enter {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes toast-leave {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
          }

          .toast-enter {
            animation: toast-enter 0.3s ease-out;
          }

          .toast-leave {
            animation: toast-leave 0.3s ease-in;
          }

          .cv-rambo-toast--error {
            background: linear-gradient(135deg, #8B0000 0%, #FF0000 100%);
          }

          .cv-rambo-toast__content {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            gap: 12px;
          }

          .cv-rambo-toast__icon {
            font-size: 24px;
            color: #FFD700;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
            flex-shrink: 0;
          }

          .cv-rambo-toast__text {
            display: flex;
            flex-direction: column;
            flex: 1;
          }

          .cv-rambo-toast__title {
            font-size: 18px;
            font-weight: bold;
            color: #FFD700;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
          }

          .cv-rambo-toast__message {
            font-size: 14px;
            color: #f5f5f5;
            font-family: 'Roboto Condensed', Arial, sans-serif;
            margin-top: 4px;
          }

          .cv-rambo-toast__close {
            background: none;
            border: 2px solid #FFD700;
            color: #FFD700;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          }

          .cv-rambo-toast__close:hover {
            background: #FFD700;
            color: #8B0000;
          }

          .cv-rambo-toast__progress {
            height: 3px;
            background: #FFD700;
            box-shadow: 0 0 5px rgba(255, 215, 0, 0.8);
            transition: width 0.1s linear;
          }
        `;

        // Injecter dans le shadow DOM si disponible, sinon dans document.head
        const shadowRoot = Alpine.store('theme')?.shadowRoot;
        if (shadowRoot) {
          shadowRoot.appendChild(styles);
          shadowRoot.appendChild(this.toast);
        } else {
          document.head.appendChild(styles);
          document.body.appendChild(this.toast);
        }

        console.log('[CHECKPOINT]', 'toast-styled', {
          style: 'retro-action-movie-80s',
          colors: ['#8B0000', '#FF0000', '#FFD700'],
          font: 'Bebas Neue',
          icon: '✗'
        });

        /**
         * @action Positionner le toast dans l'overlay
         * @checkpoint toast-positioned, position haut-droite ou bas-centre selon l'écran actif
         */
        this.toast.style.position = 'fixed';
        this.toast.style.top = '20px';
        this.toast.style.right = '20px';

        console.log('[CHECKPOINT]', 'toast-positioned', {
          position: 'top-right',
          top: '20px',
          right: '20px'
        });

        /**
         * @action Animer l'apparition du toast
         * @checkpoint toast-animated, animation fade-in + shake/vibration pour signaler l'erreur
         */
        this.toast.style.opacity = '1';
        this.toast.style.animation = 'toast-shake 0.5s ease-out, toast-enter 0.3s ease-out';

        this.visible = true;
        Alpine.store('toastError', {
          visible: true,
          message: this.message,
          title: this.title,
          timeoutId: null
        });

        console.log('[CHECKPOINT]', 'toast-animated', {
          animations: ['toast-shake', 'toast-enter'],
          duration: '0.5s'
        });

        /**
         * @action Logger l'affichage du toast
         * @checkpoint log-emitted, console affiche "[TOAST] error"
         */
        console.log('[TOAST] error', {
          title: this.title,
          message: this.message,
          timestamp: new Date().toISOString()
        });

        console.log('[CHECKPOINT]', 'log-emitted', {
          level: 'error',
          component: 'toast'
        });

        /**
         * @action Attendre 5 secondes
         * @checkpoint timeout-running, setTimeout de 5000ms actif
         */
        this.timeoutId = setTimeout(() => {
          this.fermerToast();
        }, this.DISPLAY_DURATION);

        console.log('[CHECKPOINT]', 'timeout-running', {
          duration: this.DISPLAY_DURATION,
          unit: 'ms'
        });

        /**
         * @action Permettre la fermeture manuelle du toast
         * @checkpoint manual-close-ready, clic sur ✗ ou swipe pour fermer avant le timeout
         */
        const closeBtn = this.toast.querySelector('.cv-rambo-toast__close');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            this.fermerToast();
          });
        }

        console.log('[CHECKPOINT]', 'manual-close-ready', {
          closeButton: true,
          clickHandler: 'attached'
        });

      } catch (error) {
        console.error('[ERROR] Failed to display error toast:', error);
      }
    },

    async fermerToast() {
      if (!this.toast) return;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      /**
       * @action Animer la disparition du toast
       * @checkpoint toast-fading, animation fade-out avant suppression
       */
      this.toast.style.animation = 'toast-leave 0.3s ease-in forwards';

      console.log('[CHECKPOINT]', 'toast-fading', {
        animation: 'toast-leave',
        duration: '0.3s'
      });

      // Attendre la fin de l'animation
      await new Promise(resolve => setTimeout(resolve, 300));

      /**
       * @action Retirer le toast du DOM
       * @checkpoint toast-removed, élément complètement supprimé
       */
      if (this.toast) {
        this.toast.remove();
        this.toast = null;
      }

      this.visible = false;
      Alpine.store('toastError', {
        visible: false,
        message: '',
        title: '',
        timeoutId: null
      });

      console.log('[CHECKPOINT]', 'toast-removed', {
        element: 'toast',
        status: 'removed-from-dom'
      });
    }
  }));
});
