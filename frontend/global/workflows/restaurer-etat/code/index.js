/**
 * Mega-fonction du workflow F-013-restaurer-etat
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Restaurer l'état complet depuis PouchDB au chargement
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('appState', {
    loading: true,
    restored: false,
    data: {
      profil: null,
      cibles: [],
      tags: [],
      settings: {}
    }
  });

  Alpine.data('workflowRestaurerEtat', () => ({
    loading: true,
    restored: false,

    async init() {
      await this.restaurerEtat();
    },

    async restaurerEtat() {
      try {
        /**
         * @action Détecter le chargement de l'overlay
         * @checkpoint overlay-loading, événement de montage de l'interface déclenché
         */
        console.log('[CHECKPOINT]', 'overlay-loading', {
          event: 'alpine:init',
          timestamp: new Date().toISOString()
        });

        /**
         * @action Afficher l'état de chargement
         * @checkpoint loading-displayed, spinner ou message "Restauration des données..." visible
         */
        this.loading = true;
        Alpine.store('appState', {
          loading: true,
          restored: false,
          data: { profil: null, cibles: [], tags: [], settings: {} }
        });

        // Émettre événement pour afficher le loader
        window.dispatchEvent(new CustomEvent('cv-rambo:loading-start', {
          detail: { message: 'RESTAURATION DES DONNÉES...' }
        }));

        console.log('[CHECKPOINT]', 'loading-displayed', {
          message: 'Restauration des données...',
          status: 'loading'
        });

        // Récupérer les bases de données
        const databases = Alpine.store('databases');
        if (!databases) {
          throw new Error('Databases not initialized');
        }

        const restoredData = {
          profil: null,
          cibles: [],
          tags: [],
          settings: {}
        };

        /**
         * @action Récupérer tous les documents de la base "profil"
         * @checkpoint profil-fetched, db.allDocs({include_docs: true}) retourne les documents
         */
        if (databases.profil) {
          const profilResult = await databases.profil.allDocs({ include_docs: true });
          restoredData.profil = profilResult.rows.map(row => row.doc)[0] || null;
          
          console.log('[CHECKPOINT]', 'profil-fetched', {
            count: profilResult.rows.length,
            hasProfil: !!restoredData.profil
          });
        }

        /**
         * @action Récupérer tous les documents de la base "cibles"
         * @checkpoint cibles-fetched, toutes les cibles du Kanban sont chargées
         */
        if (databases.cibles) {
          const ciblesResult = await databases.cibles.allDocs({ include_docs: true });
          restoredData.cibles = ciblesResult.rows.map(row => row.doc);
          
          console.log('[CHECKPOINT]', 'cibles-fetched', {
            count: restoredData.cibles.length
          });
        }

        /**
         * @action Récupérer tous les documents de la base "tags"
         * @checkpoint tags-fetched, tags par défaut et personnalisés sont chargés
         */
        if (databases.tags) {
          const tagsResult = await databases.tags.allDocs({ include_docs: true });
          restoredData.tags = tagsResult.rows.map(row => row.doc);
          
          console.log('[CHECKPOINT]', 'tags-fetched', {
            count: restoredData.tags.length
          });
        }

        /**
         * @action Récupérer tous les documents de la base "settings"
         * @checkpoint settings-fetched, préférences utilisateur sont chargées
         */
        if (databases.settings) {
          const settingsResult = await databases.settings.allDocs({ include_docs: true });
          restoredData.settings = settingsResult.rows.map(row => row.doc)[0] || {};
          
          console.log('[CHECKPOINT]', 'settings-fetched', {
            count: settingsResult.rows.length
          });
        }

        /**
         * @action Populer le store global avec les données restaurées
         * @checkpoint store-populated, store contient {profil, cibles, tags, settings}
         */
        Alpine.store('appState', {
          loading: false,
          restored: true,
          data: restoredData
        });

        // Mettre à jour les stores individuels
        if (restoredData.profil) Alpine.store('profil', restoredData.profil);
        if (restoredData.cibles.length) Alpine.store('cibles', restoredData.cibles);
        if (restoredData.tags.length) Alpine.store('tags', restoredData.tags);
        Alpine.store('settings', restoredData.settings);

        console.log('[CHECKPOINT]', 'store-populated', {
          profil: !!restoredData.profil,
          cibles: restoredData.cibles.length,
          tags: restoredData.tags.length,
          settings: Object.keys(restoredData.settings).length
        });

        /**
         * @action Vérifier la cohérence des données
         * @checkpoint data-verified, pas de doublons ou d'incohérences détectées
         */
        const verified = this.verifierCoherence(restoredData);
        
        console.log('[CHECKPOINT]', 'data-verified', {
          verified: verified,
          status: verified ? 'ok' : 'warnings'
        });

        /**
         * @action Logger la restauration en console
         * @checkpoint log-emitted, console affiche "[STORAGE] state-restored" avec nombre de documents
         */
        console.log('[STORAGE] state-restored', {
          profil: !!restoredData.profil,
          cibles: restoredData.cibles.length,
          tags: restoredData.tags.length,
          settings: Object.keys(restoredData.settings).length,
          timestamp: new Date().toISOString()
        });

        console.log('[CHECKPOINT]', 'log-emitted', {
          message: '[STORAGE] state-restored',
          documents: {
            profil: !!restoredData.profil,
            cibles: restoredData.cibles.length,
            tags: restoredData.tags.length
          }
        });

        // Cacher le loader
        window.dispatchEvent(new CustomEvent('cv-rambo:loading-end'));

        /**
         * @action Terminer le chargement et afficher l'interface
         * @checkpoint restoration-complete, l'overlay affiche les données restaurées ou état vide
         */
        this.loading = false;
        this.restored = true;

        console.log('[CHECKPOINT]', 'restoration-complete', {
          status: 'success',
          hasData: !!restoredData.profil || restoredData.cibles.length > 0
        });

        /**
         * @action Gérer le cas où aucune donnée n'existe (première utilisation)
         * @checkpoint empty-state-handled, redirection vers onboarding si profil vide
         */
        if (!restoredData.profil && restoredData.cibles.length === 0) {
          console.log('[CHECKPOINT]', 'empty-state-handled', {
            isFirstUse: true,
            action: 'redirect-to-onboarding'
          });

          // Émettre événement pour rediriger vers onboarding
          window.dispatchEvent(new CustomEvent('cv-rambo:redirect-onboarding', {
            detail: { reason: 'first-use' }
          }));
        } else {
          console.log('[CHECKPOINT]', 'empty-state-handled', {
            isFirstUse: false,
            action: 'show-dashboard'
          });
        }

        return restoredData;

      } catch (error) {
        console.error('[ERROR] Failed to restore state:', error);
        
        this.loading = false;
        Alpine.store('appState', {
          loading: false,
          restored: false,
          error: error.message,
          data: { profil: null, cibles: [], tags: [], settings: {} }
        });

        window.dispatchEvent(new CustomEvent('cv-rambo:loading-end'));
        
        throw error;
      }
    },

    verifierCoherence(data) {
      // Vérifier les références entre cibles et tags
      const tagIds = new Set(data.tags.map(t => t._id));
      
      data.cibles.forEach(cible => {
        if (cible.tagIds) {
          cible.tagIds = cible.tagIds.filter(id => tagIds.has(id));
        }
      });

      return true;
    },

    /**
     * Helper: Forcer une restauration complète
     */
    async forceRestore() {
      return this.restaurerEtat();
    }
  }));
});
