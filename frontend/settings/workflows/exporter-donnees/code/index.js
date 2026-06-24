/**
 * Mega-fonction : exporter-donnees
 * Exporte toutes les données en JSON
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('dataExporter', () => ({
    stats: {
      cibles: 0,
      profils: 0
    },

    async initSettings() {
      await this.loadStats();
    },

    async loadStats() {
      if (!window.db) return;

      try {
        const allDocs = await window.db.allDocs({ include_docs: true });
        
        this.stats.cibles = allDocs.rows.filter(r => r.doc.type === 'cible').length;
        this.stats.profils = allDocs.rows.filter(r => r.doc.type === 'profil').length;

        console.log('[CHECKPOINT]', 'stats-loaded', this.stats);

      } catch (err) {
        console.error('[CHECKPOINT]', 'stats-error', { error: err.message });
      }
    },

    async exportData() {
      /**
       * @action Exporter données
       * @checkpoint export-started
       */
      if (!window.db) {
        alert('Base de données non initialisée');
        return;
      }

      console.log('[CHECKPOINT]', 'export-started');

      try {
        const result = await window.db.allDocs({ include_docs: true });
        const data = {
          exportedAt: new Date().toISOString(),
          version: '1.0.0',
          documents: result.rows.map(r => r.doc)
        };

        // Créer fichier téléchargeable
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `cv-rambo-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('[CHECKPOINT]', 'export-completed', { 
          count: data.documents.length 
        });

        alert(`Export terminé: ${data.documents.length} documents exportés`);

      } catch (err) {
        console.error('[CHECKPOINT]', 'export-error', { error: err.message });
        alert('Erreur: ' + err.message);
      }
    }
  }));
});
