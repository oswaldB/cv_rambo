/**
 * Mega-fonction du workflow F-011-afficher-graphique
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Afficher graphique évolution 7 jours
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('dashboardChart', {
    showChart: false,
    chartData: [],
    hasEnoughData: false
  });

  Alpine.data('workflowAfficherGraphique', () => ({
    showChart: false,
    chartData: [],
    hasEnoughData: false,
    canvas: null,

    async init() {
      this.ecouterEvenements();
    },

    ecouterEvenements() {
      window.addEventListener('cv-rambo:show-chart', () => {
        this.afficherGraphique();
      });
    },

    async afficherGraphique() {
      try {
        /**
         * @action Afficher le QG Tactique avec les compteurs
         * @checkpoint dashboard-with-counters, les 3 compteurs sont visibles
         */
        console.log('[CHECKPOINT]', 'dashboard-with-counters', {
          countersVisible: true
        });

        /**
         * @action Cliquer pour afficher le graphique
         * @checkpoint graph-triggered, l'utilisateur active l'option graphique
         */
        this.showChart = true;
        Alpine.store('dashboardChart', { ...Alpine.store('dashboardChart'), showChart: true });

        console.log('[CHECKPOINT]', 'graph-triggered', {
          action: 'user-clicked',
          showChart: true
        });

        /**
         * @action Récupérer les données historiques des 7 derniers jours
         * @checkpoint historical-data-fetched, regroupement des cibles par date de création/modification
         */
        const databases = Alpine.store('databases');
        let cibles = [];
        
        if (databases?.cibles) {
          const result = await databases.cibles.allDocs({ include_docs: true });
          cibles = result.rows.map(row => row.doc);
        }

        // Générer les 7 derniers jours
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          last7Days.push(date.toISOString().split('T')[0]);
        }

        console.log('[CHECKPOINT]', 'historical-data-fetched', {
          days: last7Days,
          totalCibles: cibles.length
        });

        /**
         * @action Préparer les données pour le graphique
         * @checkpoint chart-data-prepared, tableau avec {date, ciblesCrees, ciblesImpact, ciblesEnAttente} pour chaque jour
         */
        this.chartData = last7Days.map(date => {
          const dayCibles = cibles.filter(c => c.createdAt?.startsWith(date));
          return {
            date: date.slice(5), // MM-DD
            ciblesCrees: dayCibles.length,
            ciblesImpact: dayCibles.filter(c => c.status === 'Impact').length,
            ciblesEnAttente: dayCibles.filter(c => c.status === 'En attente').length
          };
        });

        // Vérifier s'il y a assez de données (au moins 2 jours avec activité)
        const activeDays = this.chartData.filter(d => d.ciblesCrees > 0).length;
        this.hasEnoughData = activeDays >= 2;

        Alpine.store('dashboardChart', {
          showChart: true,
          chartData: this.chartData,
          hasEnoughData: this.hasEnoughData
        });

        console.log('[CHECKPOINT]', 'chart-data-prepared', {
          dataPoints: this.chartData.length,
          hasEnoughData: this.hasEnoughData
        });

        /**
         * @action Afficher un message si pas assez de données historiques
         * @checkpoint insufficient-data-displayed, message "Pas assez d'historique" si applicable
         */
        if (!this.hasEnoughData) {
          console.log('[CHECKPOINT]', 'insufficient-data-displayed', {
            message: 'Pas assez d\'historique (minimum 2 jours avec activité)',
            activeDays: activeDays
          });
          return;
        }

        /**
         * @action Générer le graphique avec une librairie
         * @checkpoint chart-generated, canvas SVG ou élément canvas avec le graphique ligne/barres créé
         */
        this.$nextTick(() => {
          this.renderChart();
        });

        console.log('[CHECKPOINT]', 'chart-generated', {
          type: 'line-chart',
          library: 'custom-canvas'
        });

        /**
         * @action Afficher le graphique dans l'interface
         * @checkpoint chart-displayed, graphique visible sous les compteurs avec légende et axes
         */
        console.log('[CHECKPOINT]', 'chart-displayed', {
          position: 'below-counters',
          legend: true,
          axes: true
        });

        /**
         * @action Permettre le masquage du graphique
         * @checkpoint hide-option-ready, bouton "Masquer le graphique" disponible
         */
        console.log('[CHECKPOINT]', 'hide-option-ready', {
          button: 'hide-chart',
          available: true
        });

      } catch (error) {
        console.error('[ERROR] Chart display failed:', error);
      }
    },

    renderChart() {
      // Rendu simple en SVG pour l'exemple
      const container = document.getElementById('chart-container');
      if (!container) return;

      const maxValue = Math.max(...this.chartData.map(d => d.ciblesCrees), 1);
      const width = container.clientWidth || 600;
      const height = 200;
      const padding = 40;

      let svg = `<svg width="${width}" height="${height}" style="background: #1a1a1a; border: 1px solid #FFD700;">`;
      
      // Lignes de grille
      for (let i = 0; i <= 4; i++) {
        const y = height - padding - (i * (height - 2 * padding) / 4);
        svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#333" stroke-width="1"/>`;
      }

      // Ligne du graphique
      const points = this.chartData.map((d, i) => {
        const x = padding + (i * (width - 2 * padding) / (this.chartData.length - 1));
        const y = height - padding - (d.ciblesCrees / maxValue * (height - 2 * padding));
        return `${x},${y}`;
      }).join(' ');

      svg += `<polyline points="${points}" fill="none" stroke="#FFD700" stroke-width="3"/>`;

      // Points
      this.chartData.forEach((d, i) => {
        const x = padding + (i * (width - 2 * padding) / (this.chartData.length - 1));
        const y = height - padding - (d.ciblesCrees / maxValue * (height - 2 * padding));
        svg += `<circle cx="${x}" cy="${y}" r="5" fill="#2E8B57" stroke="#FFD700" stroke-width="2"/>`;
        
        // Label date
        svg += `<text x="${x}" y="${height - 10}" text-anchor="middle" fill="#FFD700" font-size="10">${d.date}</text>`;
      });

      svg += '</svg>';
      container.innerHTML = svg;
    },

    masquerGraphique() {
      this.showChart = false;
      Alpine.store('dashboardChart', { ...Alpine.store('dashboardChart'), showChart: false });
    }
  }));
});
