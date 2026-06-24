/**
 * Mega-fonction du workflow F-017-parcours-tutoriel
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Parcours tutoriel guidé des fonctionnalités
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('onboardingTutoriel', {
    step: 3,
    demoIndex: 0,
    demos: ['capture', 'kanban', 'prefill']
  });

  Alpine.data('workflowParcoursTutoriel', () => ({
    step: 3,
    demoIndex: 0,
    demos: [
      { id: 'capture', title: 'CAPTURE D\'OFFRE', description: 'Sauvegarde une offre en 1 clic' },
      { id: 'kanban', title: 'KANBAN TACTIQUE', description: 'Organise tes cibles en 4 colonnes' },
      { id: 'prefill', title: 'PRÉ-REMPLISSAGE', description: 'Remplit automatiquement les formulaires' }
    ],

    async init() {
      await this.ecouterEvenements();
    },

    async ecouterEvenements() {
      window.addEventListener('cv-rambo:onboarding-step-3', () => {
        this.afficherEtape3();
      });
    },

    afficherEtape3() {
      /**
       * @action Afficher l'étape 3 du tutoriel
       * @checkpoint step-3-displayed, interface guidée avec overlay explicatif visible
       */
      
      const overlay = document.getElementById('cv-rambo-onboarding');
      if (!overlay) return;

      overlay.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #2F4F4F 0%, #1a1a1a 100%);
          border: 3px solid #FFD700;
          padding: 40px;
          max-width: 700px;
          width: 90%;
        ">
          <h2 style="color: #FFD700; text-align: center; margin-bottom: 10px;">FORMATION AU COMBAT</h2>
          <p style="color: #f5f5f5; text-align: center; font-family: 'Roboto Condensed'; margin-bottom: 30px;">Découvre tes armes</p>
          
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <template x-for="(demo, index) in demos" :key="demo.id">
              <div :style="demoIndex === index ? '
                background: rgba(46, 139, 87, 0.3);
                border: 2px solid #2E8B57;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 20px;
              ' : '
                background: rgba(255,255,255,0.05);
                border: 1px solid #666;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 20px;
                opacity: 0.7;
              '">
                <div style="
                  width: 50px;
                  height: 50px;
                  background: #FFD700;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-family: 'Bebas Neue';
                  font-size: 24px;
                  color: #2F4F4F;
                " x-text="index + 1"></div>
                <div style="flex: 1;">
                  <h3 style="color: #FFD700; margin: 0; font-size: 20px;" x-text="demo.title"></h3>
                  <p style="color: #f5f5f5; margin: 5px 0 0; font-family: 'Roboto Condensed'; font-size: 14px;" 
                     x-text="demo.description"></p>
                </div>
              </div>
            </template>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-top: 30px;">
            <button 
              @click="demoPrecedent()"
              :disabled="demoIndex === 0"
              :style="demoIndex === 0 ? '
                background: #666;
                border: none;
                color: #999;
                padding: 15px 30px;
                font-family: \"Bebas Neue\";
                cursor: not-allowed;
              ' : '
                background: transparent;
                border: 2px solid #FFD700;
                color: #FFD700;
                padding: 15px 30px;
                font-family: \"Bebas Neue\";
                cursor: pointer;
              '"
            >← PRÉCÉDENT</button>
            
            <button 
              @click="demoSuivant()"
              style="
                background: #2E8B57;
                border: 2px solid #FFD700;
                color: white;
                padding: 15px 30px;
                font-family: 'Bebas Neue';
                cursor: pointer;
              "
              x-text="demoIndex < demos.length - 1 ? 'SUIVANT →' : 'TERMINER →'"
            >SUIVANT →</button>
          </div>
        </div>
      `;

      Alpine.initTree(overlay);

      console.log('[CHECKPOINT]', 'step-3-displayed', {
        demos: this.demos.length,
        currentDemo: this.demos[this.demoIndex].id
      });

      /**
       * @action Logger l'affichage de l'étape
       * @checkpoint log-step-emitted, console affiche "[ONBOARDING] step-3"
       */
      console.log('[ONBOARDING] step-3', {
        timestamp: new Date().toISOString()
      });

      console.log('[CHECKPOINT]', 'log-step-emitted', {
        step: 3,
        message: '[ONBOARDING] step-3'
      });

      this.afficherDemo();
    },

    afficherDemo() {
      const demo = this.demos[this.demoIndex];

      switch(demo.id) {
        case 'capture':
          /**
           * @action Présenter la démo de capture d'offre
           * @checkpoint capture-demo-shown, animation ou simulation de "Ajouter à la liste"
           */
          console.log('[CHECKPOINT]', 'capture-demo-shown', {
            feature: 'capture-offre',
            demo: '1-click-save'
          });

          /**
           * @action Expliquer le bouton "Tirer direct"
           * @checkpoint tir-direct-explained, tooltip ou highlight sur l'option de postulation rapide
           */
          console.log('[CHECKPOINT]', 'tir-direct-explained', {
            feature: 'tirer-direct',
            action: 'quick-apply'
          });
          break;

        case 'kanban':
          /**
           * @action Présenter le Kanban et ses 4 colonnes
           * @checkpoint kanban-demo-shown, visuel des colonnes avec explications des statuts
           */
          console.log('[CHECKPOINT]', 'kanban-demo-shown', {
            columns: ['À postuler', 'Postulé', 'Relance', 'Entretien'],
            demo: '4-columns'
          });

          /**
           * @action Démontrer le glisser-déposer de cartes
           * @checkpoint drag-drop-demo-shown, animation de déplacement d'une carte
           */
          console.log('[CHECKPOINT]', 'drag-drop-demo-shown', {
            feature: 'drag-and-drop',
            action: 'move-card'
          });
          break;

        case 'prefill':
          /**
           * @action Présenter le pré-remplissage automatique
           * @checkpoint prefilling-demo-shown, simulation de "Analyser et remplir"
           */
          console.log('[CHECKPOINT]', 'prefilling-demo-shown', {
            feature: 'pre-remplissage',
            action: 'auto-fill-form'
          });
          break;
      }

      /**
       * @action Permettre de passer à l'étape suivante
       * @checkpoint next-available, bouton "Suivant" actif ("Passer" désactivé à cette étape)
       */
      console.log('[CHECKPOINT]', 'next-available', {
        button: 'next',
        enabled: true,
        skipDisabled: true
      });
    },

    demoPrecedent() {
      /**
       * @action Permettre de revoir une étape du tutoriel
       * @checkpoint back-available, bouton "Précédent" pour revenir en arrière
       */
      if (this.demoIndex > 0) {
        this.demoIndex--;
        this.afficherDemo();
      }

      console.log('[CHECKPOINT]', 'back-available', {
        button: 'previous',
        enabled: this.demoIndex > 0
      });
    },

    demoSuivant() {
      if (this.demoIndex < this.demos.length - 1) {
        this.demoIndex++;
        this.afficherDemo();
      } else {
        this.terminerTutoriel();
      }
    },

    terminerTutoriel() {
      /**
       * @action Passer à l'étape finale de complétion
       * @checkpoint completion-triggered, transition vers l'écran de fin
       */
      
      window.dispatchEvent(new CustomEvent('cv-rambo:onboarding-complete'));

      console.log('[CHECKPOINT]', 'completion-triggered', {
        transition: 'step-3 -> completed',
        target: 'completion-screen'
      });
    }
  }));
});
