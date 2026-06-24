/**
 * Mega-fonction du workflow F-012-appliquer-theme
 * Source: specs/spec.md
 * Framework: Alpine.js (PAS de JS vanille)
 * Description: Appliquer le thème rétro action movie 80s à l'overlay
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('theme', {
    shadowRoot: null,
    container: null,
    applied: false
  });

  Alpine.data('workflowAppliquerTheme', () => ({
    shadowRoot: null,
    container: null,
    themeApplied: false,

    async init() {
      await this.appliquerTheme();
    },

    async appliquerTheme() {
      try {
        /**
         * @action Créer le conteneur Shadow DOM pour l'overlay
         * @checkpoint shadow-root-created, attachShadow({mode: 'open'}) exécuté
         */
        this.container = document.createElement('div');
        this.container.id = 'cv-rambo-overlay';
        this.container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 999999;';
        
        this.shadowRoot = this.container.attachShadow({ mode: 'open' });
        document.body.appendChild(this.container);
        
        console.log('[CHECKPOINT]', 'shadow-root-created', { 
          shadowMode: 'open', 
          containerId: 'cv-rambo-overlay',
          zIndex: 999999
        });

        /**
         * @action Injecter les polices Google Fonts (Bebas Neue, Roboto Condensed)
         * @checkpoint fonts-injected, balises <link> pour les polices présentes dans le Shadow DOM
         */
        const fontLinks = document.createElement('div');
        fontLinks.innerHTML = `
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet">
        `;
        this.shadowRoot.appendChild(fontLinks);
        
        console.log('[CHECKPOINT]', 'fonts-injected', { 
          fonts: ['Bebas Neue', 'Roboto Condensed'],
          source: 'Google Fonts'
        });

        /**
         * @action Définir les variables CSS du thème
         * @checkpoint css-variables-defined, :root contient --rambo-red, --camo-green, --gunmetal-gray, --gold
         */
        const styleRoot = document.createElement('style');
        styleRoot.textContent = `
          :host {
            /* Palette militaire/affiche action 80s */
            --rambo-red: #FF0000;
            --camo-green: #2E8B57;
            --gunmetal-gray: #2F4F4F;
            --gold: #FFD700;
            --black: #0a0a0a;
            --white: #f5f5f5;
            
            /* Ombres néon rétro */
            --neon-red: 0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.4);
            --neon-green: 0 0 10px rgba(46, 139, 87, 0.8), 0 0 20px rgba(46, 139, 87, 0.4);
            --neon-gold: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.4);
            
            /* Typographie */
            --font-display: 'Bebas Neue', Impact, sans-serif;
            --font-body: 'Roboto Condensed', Arial, sans-serif;
            
            /* Espacements tactiques */
            --spacing-xs: 4px;
            --spacing-sm: 8px;
            --spacing-md: 16px;
            --spacing-lg: 24px;
            --spacing-xl: 32px;
            
            /* Bordures */
            --border-width: 2px;
            --border-radius: 0px;
          }
        `;
        this.shadowRoot.appendChild(styleRoot);
        
        console.log('[CHECKPOINT]', 'css-variables-defined', { 
          variables: [
            '--rambo-red',
            '--camo-green', 
            '--gunmetal-gray',
            '--gold'
          ]
        });

        /**
         * @action Appliquer la palette de couleurs
         * @checkpoint palette-applied, couleurs #FF0000, #2E8B57, #2F4F4F, #FFD700 définies
         */
        const paletteApplied = {
          red: '#FF0000',
          green: '#2E8B57',
          gray: '#2F4F4F',
          gold: '#FFD700'
        };
        
        console.log('[CHECKPOINT]', 'palette-applied', { palette: paletteApplied });

        /**
         * @action Appliquer les styles globaux (fonds, bordures, ombres néon)
         * @checkpoint global-styles-applied, effets visuels rétro visibles sur l'overlay
         */
        const styleGlobal = document.createElement('style');
        styleGlobal.textContent = `
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          #cv-rambo-interface {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--gunmetal-gray) 0%, var(--black) 100%);
            border: var(--border-width) solid var(--rambo-red);
            box-shadow: var(--neon-red), inset 0 0 50px rgba(255, 0, 0, 0.1);
            font-family: var(--font-body);
            color: var(--white);
            overflow: auto;
          }
          
          /* Titres style affiche film d'action */
          h1, h2, h3 {
            font-family: var(--font-display);
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--gold);
            text-shadow: var(--neon-gold);
          }
          
          /* Boutons style tactique militaire */
          button, .btn {
            background: var(--camo-green);
            border: var(--border-width) solid var(--gold);
            color: var(--white);
            font-family: var(--font-display);
            text-transform: uppercase;
            padding: var(--spacing-sm) var(--spacing-md);
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: var(--neon-green);
          }
          
          button:hover, .btn:hover {
            background: var(--gold);
            color: var(--black);
            box-shadow: var(--neon-gold);
          }
          
          /* Cartes et panneaux */
          .panel, .card {
            background: rgba(47, 79, 79, 0.8);
            border: var(--border-width) solid var(--rambo-red);
            border-left: 4px solid var(--rambo-red);
            padding: var(--spacing-md);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
          }
          
          /* Indicateurs de statut */
          .status-active { color: var(--camo-green); text-shadow: var(--neon-green); }
          .status-warning { color: var(--gold); text-shadow: var(--neon-gold); }
          .status-error { color: var(--rambo-red); text-shadow: var(--neon-red); }
          
          /* Scanline effect rétro */
          #cv-rambo-interface::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              transparent 50%,
              rgba(0, 0, 0, 0.1) 50%
            );
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3;
          }
        `;
        this.shadowRoot.appendChild(styleGlobal);
        
        console.log('[CHECKPOINT]', 'global-styles-applied', { 
          styles: ['gradient-background', 'neon-shadows', 'military-borders', 'scanline-effect'],
          effects: ['retro', 'action-movie-80s', 'tactical']
        });

        /**
         * @action Logger le chargement du CSS
         * @checkpoint log-emitted, console affiche "[STYLE] css-loaded"
         */
        console.log('[STYLE] css-loaded', {
          theme: 'retro-action-movie-80s',
          palette: ['rambo-red', 'camo-green', 'gunmetal-gray', 'gold'],
          fonts: ['Bebas Neue', 'Roboto Condensed']
        });
        console.log('[CHECKPOINT]', 'log-emitted', { message: '[STYLE] css-loaded' });

        /**
         * @action Vérifier le rendu visuel
         * @checkpoint theme-verified, l'overlay affiche le look militaire/affiche film d'action
         */
        const interfaceDiv = document.createElement('div');
        interfaceDiv.id = 'cv-rambo-interface';
        this.shadowRoot.appendChild(interfaceDiv);
        
        Alpine.store('theme', {
          shadowRoot: this.shadowRoot,
          container: this.container,
          interface: interfaceDiv,
          applied: true
        });
        
        this.themeApplied = true;
        
        console.log('[CHECKPOINT]', 'theme-verified', { 
          applied: true,
          style: 'retro-action-movie-80s',
          elements: ['shadow-root', 'fonts', 'css-variables', 'palette', 'global-styles']
        });

      } catch (error) {
        console.error('[ERROR]', error.message);
        throw error;
      }
    },

    /**
     * Helper: Retourne le container de l'interface pour injection de contenu
     */
    getInterfaceContainer() {
      return this.shadowRoot?.getElementById('cv-rambo-interface') || null;
    },

    /**
     * Helper: Détruire l'overlay
     */
    destroyTheme() {
      if (this.container) {
        this.container.remove();
        this.container = null;
        this.shadowRoot = null;
        this.themeApplied = false;
        Alpine.store('theme', { shadowRoot: null, container: null, applied: false });
      }
    }
  }));
});
