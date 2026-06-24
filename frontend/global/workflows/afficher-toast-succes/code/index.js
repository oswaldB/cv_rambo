/**
 * Mega-fonction du workflow F-018-afficher-toast-succes
 * Source: specs/spec.md
 * Framework: Alpine.js (PAS de JS vanille)
 * Description: Afficher un toast de succès avec style rétro 80s
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('toastSuccess', {
    visible: false,
    message: '',
    title: '',
    timeoutId: null
  });

  Alpine.data('workflowAfficherToastSucces', () => ({
    toast: null,
    visible: false,
    message: '',
    title: '',
    timeoutId: null,
    DISPLAY_DURATION: 3000,

    async init() {
      await this.initialiserToastSucces();
    },

    async initialiserToastSucces() {
      /**
       * @action Détecter un événement de succès
       * @checkpoint success-event-detected, événement global "cv-rambo:show-success-toast" émis avec {message, title}
       */
      
      window.addEventListener('cv-rambo:show-success-toast', (event) => {
        this.afficherToast(event.detail);
      });

      console.log('[CHECKPOINT]', 'success-event-detected', {
        eventListener: 'cv-rambo:show-success-toast',
        status: 'listening'
      });
    },

    async afficherToast(data) {
      try {
        this.message = data.message || 'Action réussie';
        this.title = data.title || 'MISSION ACCOMPLIE';

        /**
         * @action Créer l'élément toast dans le DOM
         * @checkpoint toast-created, élément div avec classes .toast et .toast--success créé
         */
        
        // Supprimer l'ancien toast s'il existe
        if (this.toast) {
          this.toast.remove();
        }

        // Créer le conteneur de toast
        this.toast = document.createElement('div');
        this.toast.className = 'cv-rambo-toast cv-rambo-toast--success';
        this.toast.setAttribute('x-data', '{ visible: true }');
        this.toast.setAttribute('x-show', 'visible');
        this.toast.setAttribute('x-transition:enter', 'toast-enter');
        this.toast.setAttribute('x-transition:leave', 'toast-leave');

        // Structure HTML du toast
        this.toast.innerHTML = `
          <div class="cv-rambo-toast__content">
            <span class="cv-rambo-toast__icon">✓</span>
            <div class="cv-rambo-toast__text">
              <span class="cv-rambo-toast__title">${this.title}</span>
              <span class="cv-rambo-toast__message">${this.message}</span>
            </div>
            <button class="cv-rambo-toast__close" @click="visible = false">×</button>
          </div>
          <div class="cv-rambo-toast__progress" 
               :style="\`width: \${progress}%\`"
               x-data="{ progress: 100 }"
               x-init="setInterval(() => { if(progress > 0) progress -= 3.33 }, 100)"></div>
        `;

        console.log('[CHECKPOINT]', 'toast-created', {
          element: 'div.cv-rambo-toast',
          classes: ['cv-rambo-toast', 'cv-rambo-toast--success']
        });

        /**
         * @action Appliquer le style rétro au toast
         * @checkpoint toast-styled, fond vert, icône ✓, typographie Bebas Neue appliqués
         */
        const styles = document.createElement('style');
        styles.textContent = `
          .cv-rambo-toast {
            position: fixed;
            top: 20px;
            right: 20px;
            min-width: 300px;
            max-width: 500px;
            border: 3px solid #FFD700;
            border-left: 6px solid #FFD700;
            border-radius: 0;
            box-shadow: 0 0 20px rgba(46, 139, 87, 0.8), 
                        0 0 40px rgba(46, 139, 87, 0.4),
                        inset 0 0 20px rgba(0, 0, 0, 0.3);
            font-family: 'Bebas Neue', Impact, sans-serif;
            z-index: 999999;
            overflow: hidden;
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

          .cv-rambo-toast--success {
            background: linear-gradient(135deg, #1a472a 0%, #2E8B57 100%);
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
            color: #1a472a;
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
          colors: ['#1a472a', '#2E8B57', '#FFD700'],
          font: 'Bebas Neue',
          icon: '✓'
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
         * @checkpoint toast-animated, animation fade-in + slide depuis le bord
         */
        this.toast.style.opacity = '1';
        this.toast.style.animation = 'toast-enter 0.3s ease-out';

        this.visible = true;
        Alpine.store('toastSuccess', {
          visible: true,
          message: this.message,
          title: this.title,
          timeoutId: null
        });

        console.log('[CHECKPOINT]', 'toast-animated', {
          animation: 'toast-enter',
          duration: '0.3s'
        });

        /**
         * @action Logger l'affichage du toast
         * @checkpoint log-emitted, console affiche "[TOAST] success"
         */
        console.log('[TOAST] success', {
          title: this.title,
          message: this.message,
          timestamp: new Date().toISOString()
        });

        console.log('[CHECKPOINT]', 'log-emitted', {
          level: 'success',
          component: 'toast'
        });

        /**
         * @action Attendre 3 secondes
         * @checkpoint timeout-running, setTimeout de 3000ms actif
         */
        this.timeoutId = setTimeout(() => {
          this.fermerToast();
        }, this.DISPLAY_DURATION);

        console.log('[CHECKPOINT]', 'timeout-running', {
          duration: this.DISPLAY_DURATION,
          unit: 'ms'
        });

        // Permettre la fermeture manuelle
        const closeBtn = this.toast.querySelector('.cv-rambo-toast__close');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            this.fermerToast();
          });
        }

      } catch (error) {
        console.error('[ERROR] Failed to display success toast:', error);
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
      Alpine.store('toastSuccess', {
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
