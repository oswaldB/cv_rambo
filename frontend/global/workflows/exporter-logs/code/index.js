/**
 * Mega-fonction du workflow F-019-exporter-logs
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Exporter les logs d'erreurs en JSON depuis settings
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('logsExport', {
    errorsCount: 0,
    lastExport: null,
    isExporting: false
  });

  Alpine.data('workflowExporterLogs', () => ({
    initialized: false,
    errors: [],

    async init() {
      await this.initialiserExport();
    },

    async initialiserExport() {
      /**
       * @action Afficher l'écran Settings
       * @checkpoint settings-displayed, section "Gestion des erreurs" visible
       */
      
      // Observer quand on arrive sur l'écran settings
      const observer = new MutationObserver(() => {
        const settingsSection = document.querySelector('#settings-error-logs');
        if (settingsSection) {
          this.updateErrorCount();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      console.log('[CHECKPOINT]', 'settings-displayed', {
        section: 'Gestion des erreurs',
        status: 'listening'
      });

      this.initialized = true;
      
      // Mettre à jour le compteur initial
      await this.updateErrorCount();
    },

    async updateErrorCount() {
      const databases = Alpine.store('databases');
      if (!databases || !databases['error-logs']) return;

      try {
        const result = await databases['error-logs'].allDocs();
        Alpine.store('logsExport', {
          errorsCount: result.rows.length,
          lastExport: Alpine.store('logsExport')?.lastExport,
          isExporting: false
        });
      } catch (e) {
        console.log('[LOGS] Failed to count errors:', e.message);
      }
    },

    /**
     * @action Afficher le bouton "Exporter les logs"
     * @checkpoint export-button-visible, bouton avec compteur "X erreurs stockées"
     */
    renderExportButton() {
      const count = Alpine.store('logsExport')?.errorsCount || 0;
      
      console.log('[CHECKPOINT]', 'export-button-visible', {
        errorsCount: count,
        label: `Exporter les logs (${count} erreurs)`
      });

      return {
        count,
        label: count > 0 
          ? `Exporter les logs (${count} erreurs)` 
          : 'Exporter les logs (aucune erreur)'
      };
    },

    async exporterLogs() {
      try {
        /**
         * @action Cliquer sur le bouton d'export
         * @checkpoint export-triggered, l'utilisateur initie l'export
         */
        
        Alpine.store('logsExport', {
          errorsCount: Alpine.store('logsExport')?.errorsCount || 0,
          lastExport: null,
          isExporting: true
        });

        console.log('[CHECKPOINT]', 'export-triggered', {
          timestamp: new Date().toISOString()
        });

        /**
         * @action Récupérer toutes les erreurs depuis PouchDB
         * @checkpoint errors-fetched, db.allDocs({include_docs: true}) retourne les erreurs
         */
        
        const databases = Alpine.store('databases');
        if (!databases || !databases['error-logs']) {
          throw new Error('Error logs database not available');
        }

        const result = await databases['error-logs'].allDocs({
          include_docs: true
        });

        this.errors = result.rows.map(row => row.doc);

        console.log('[CHECKPOINT]', 'errors-fetched', {
          count: this.errors.length
        });

        if (this.errors.length === 0) {
          window.dispatchEvent(new CustomEvent('cv-rambo:show-info-toast', {
            detail: {
              title: 'INFORMATION',
              message: 'Aucune erreur à exporter'
            }
          }));
          return;
        }

        /**
         * @action Formater les données en JSON
         * @checkpoint json-formatted, objet JSON structuré avec {exportDate, appVersion, errors: []}
         */
        
        const exportData = {
          exportDate: new Date().toISOString(),
          appVersion: 'cv-rambo-v1.0.0',
          exportVersion: '1.0',
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          errors: this.errors
        };

        const jsonString = JSON.stringify(exportData, null, 2);

        console.log('[CHECKPOINT]', 'json-formatted', {
          appVersion: exportData.appVersion,
          errorsCount: exportData.errors.length
        });

        /**
         * @action Créer le fichier blob JSON
         * @checkpoint blob-created, new Blob([json], {type: 'application/json'})
         */
        
        const blob = new Blob([jsonString], { type: 'application/json' });

        console.log('[CHECKPOINT]', 'blob-created', {
          size: blob.size,
          type: blob.type
        });

        /**
         * @action Générer le nom de fichier avec timestamp
         * @checkpoint filename-ready, format cv-rambo-errors-YYYY-MM-DD.json
         */
        
        const date = new Date().toISOString().split('T')[0];
        const filename = `cv-rambo-errors-${date}.json`;

        console.log('[CHECKPOINT]', 'filename-ready', {
          filename
        });

        /**
         * @action Créer le lien de téléchargement
         * @checkpoint download-link-created, URL.createObjectURL(blob) généré
         */
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        console.log('[CHECKPOINT]', 'download-link-created', {
          url: url.substring(0, 50) + '...'
        });

        /**
         * @action Déclencher le téléchargement automatique
         * @checkpoint download-triggered, fichier sauvegardé dans le dossier Téléchargements
         */
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Nettoyer l'URL
        URL.revokeObjectURL(url);

        console.log('[CHECKPOINT]', 'download-triggered', {
          filename,
          location: 'Téléchargements'
        });

        /**
         * @action Afficher la confirmation
         * @checkpoint success-toast, message "Logs exportés avec succès" visible
         */
        
        Alpine.store('logsExport', {
          errorsCount: this.errors.length,
          lastExport: new Date().toISOString(),
          isExporting: false
        });

        window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
          detail: {
            title: 'EXPORT RÉUSSI',
            message: `${this.errors.length} erreurs exportées dans ${filename}`
          }
        }));

        console.log('[CHECKPOINT]', 'success-toast', {
          message: 'Logs exportés avec succès',
          count: this.errors.length
        });

        /**
         * @action Proposer la suppression des logs après export
         * @checkpoint delete-option-ready, bouton "Vider les logs" disponible
         */
        
        window.dispatchEvent(new CustomEvent('cv-rambo:logs-exported', {
          detail: {
            count: this.errors.length,
            filename
          }
        }));

        console.log('[CHECKPOINT]', 'delete-option-ready', {
          button: 'Vider les logs',
          available: true
        });

      } catch (error) {
        console.error('[ERROR] Export failed:', error);
        
        Alpine.store('logsExport', {
          errorsCount: Alpine.store('logsExport')?.errorsCount || 0,
          lastExport: null,
          isExporting: false
        });

        window.dispatchEvent(new CustomEvent('cv-rambo:show-error-toast', {
          detail: {
            title: 'EXPORT ÉCHOUÉ',
            message: error.message
          }
        }));
      }
    },

    /**
     * Helper: Vider les logs après export
     */
    async clearLogs() {
      const databases = Alpine.store('databases');
      if (!databases || !databases['error-logs']) return;

      try {
        const result = await databases['error-logs'].allDocs({ include_docs: true });
        
        for (const row of result.rows) {
          await databases['error-logs'].remove(row.doc._id, row.doc._rev);
        }

        Alpine.store('logsExport', {
          errorsCount: 0,
          lastExport: Alpine.store('logsExport')?.lastExport,
          isExporting: false
        });

        window.dispatchEvent(new CustomEvent('cv-rambo:show-success-toast', {
          detail: {
            title: 'LOGS VIDÉS',
            message: 'Toutes les erreurs ont été supprimées'
          }
        }));

      } catch (error) {
        console.error('[ERROR] Failed to clear logs:', error);
      }
    }
  }));
});
