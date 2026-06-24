/**
 * Mega-fonction du workflow F-011-calculer-stats
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Calculer les stats du QG Tactique
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('dashboardStats', {
    loading: true,
    bulletsFired: 0,
    hitRate: 0,
    ammoRemaining: 0,
    totalCibles: 0,
    lastUpdated: null
  });

  Alpine.data('workflowCalculerStats', () => ({
    loading: true,
    stats: {
      bulletsFired: 0,
      hitRate: 0,
      ammoRemaining: 0
    },

    async init() {
      await this.calculerStats();
    },

    async calculerStats() {
      try {
        /**
         * @action Afficher l'écran QG Tactique avec état de chargement
         * @checkpoint loading-displayed, spinner visible et message "Calcul des stats..."
         */
        this.loading = true;
        Alpine.store('dashboardStats', { ...Alpine.store('dashboardStats'), loading: true });

        console.log('[CHECKPOINT]', 'loading-displayed', {
          message: 'Calcul des stats...',
          status: 'loading'
        });

        /**
         * @action Récupérer toutes les cibles depuis PouchDB
         * @checkpoint cibles-fetched, tableau complet des cibles avec leurs statuts chargé
         */
        const databases = Alpine.store('databases');
        let cibles = [];
        
        if (databases?.cibles) {
          const result = await databases.cibles.allDocs({ include_docs: true });
          cibles = result.rows.map(row => row.doc);
        }

        console.log('[CHECKPOINT]', 'cibles-fetched', {
          count: cibles.length,
          source: 'pouchdb-cibles'
        });

        /**
         * @action Calculer le nombre de candidatures envoyées (balles tirées)
         * @checkpoint bullets-fired-calculated, nombre de cibles avec statut "Impact" + "Cible éliminée" + "Raté"
         */
        const bulletsFired = cibles.filter(c => 
          ['Impact', 'Cible éliminée', 'Raté', 'Postulé'].includes(c.status)
        ).length;

        console.log('[CHECKPOINT]', 'bullets-fired-calculated', {
          value: bulletsFired,
          statuses: ['Impact', 'Cible éliminée', 'Raté', 'Postulé']
        });

        /**
         * @action Calculer le taux de retour positif (taux de cibles touchées)
         * @checkpoint hit-rate-calculated, pourcentage = (entretiens obtenus / candidatures envoyées) × 100
         */
        const entretiens = cibles.filter(c => c.status === 'Entretien').length;
        const hitRate = bulletsFired > 0 ? Math.round((entretiens / bulletsFired) * 100) : 0;

        console.log('[CHECKPOINT]', 'hit-rate-calculated', {
          percentage: hitRate,
          entretiens: entretiens,
          bulletsFired: bulletsFired
        });

        /**
         * @action Calculer les munitions restantes (cibles en attente)
         * @checkpoint ammo-remaining-calculated, nombre de cibles avec statut "En attente"
         */
        const ammoRemaining = cibles.filter(c => 
          c.status === 'En attente' || !c.status
        ).length;

        console.log('[CHECKPOINT]', 'ammo-remaining-calculated', {
          value: ammoRemaining,
          status: 'En attente'
        });

        /**
         * @action Stocker les statistiques dans le store Alpine
         * @checkpoint stats-stored, store.dashboard contient {bulletsFired, hitRate, ammoRemaining}
         */
        this.stats = { bulletsFired, hitRate, ammoRemaining };
        Alpine.store('dashboardStats', {
          loading: false,
          bulletsFired,
          hitRate,
          ammoRemaining,
          totalCibles: cibles.length,
          lastUpdated: new Date().toISOString()
        });

        console.log('[CHECKPOINT]', 'stats-stored', {
          store: 'dashboardStats',
          values: this.stats
        });

        /**
         * @action Logger le calcul en console
         * @checkpoint log-emitted, console affiche "[DASHBOARD] stats-computed" avec les 3 valeurs
         */
        console.log('[DASHBOARD] stats-computed', {
          bulletsFired,
          hitRate: `${hitRate}%`,
          ammoRemaining,
          timestamp: new Date().toISOString()
        });

        console.log('[CHECKPOINT]', 'log-emitted', {
          message: '[DASHBOARD] stats-computed',
          values: this.stats
        });

        /**
         * @action Afficher les 3 compteurs dans l'interface
         * @checkpoint counters-displayed, les compteurs "Balles tirées", "Taux de cibles touchées", "Munitions restantes" sont visibles
         */
        this.loading = false;

        console.log('[CHECKPOINT]', 'counters-displayed', {
          counters: [
            'Balles tirées',
            'Taux de cibles touchées', 
            'Munitions restantes'
          ]
        });

        /**
         * @action Gérer le cas où aucune donnée n'existe
         * @checkpoint empty-state-displayed, message "Aucune donnée - commencez à candidater" visible si 0 cibles
         */
        if (cibles.length === 0) {
          console.log('[CHECKPOINT]', 'empty-state-displayed', {
            message: 'Aucune donnée - commencez à candidater',
            show: true
          });
        }

      } catch (error) {
        console.error('[ERROR] Stats calculation failed:', error);
        window.dispatchEvent(new CustomEvent('cv-rambo:store-error', {
          detail: { error: { message: error.message, component: 'calculer-stats' } }
        }));
      }
    },

    /**
     * Helper: Rafraîchir les stats
     */
    async refresh() {
      await this.calculerStats();
    }
  }));
});
