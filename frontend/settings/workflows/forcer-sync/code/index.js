/**
 * Mega-fonction : forcer-sync
 * Force une synchronisation manuelle
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('syncForcer', () => ({
    syncing: false,
    syncStatus: 'En attente',
    lastSync: null,

    async forceSync() {
      /**
       * @action Forcer sync manuelle
       * @checkpoint sync-forced
       */
      if (!window.db) {
        alert('Base de données non initialisée');
        return;
      }

      this.syncing = true;
      this.syncStatus = 'Synchronisation en cours...';

      console.log('[CHECKPOINT]', 'sync-forced');

      try {
        // Replicate vers remote
        const remote = new PouchDB('http://localhost:5984/cv-rambo', {
          auth: { username: 'admin', password: 'admin' }
        });

        const result = await window.db.replicate.to(remote);

        console.log('[CHECKPOINT]', 'sync-completed', {
          docsWritten: result.docs_written,
          errors: result.doc_write_failures
        });

        this.lastSync = new Date().toLocaleString('fr-FR');
        this.syncStatus = 'Dernière sync: ' + this.lastSync;

        alert(`Sync terminée: ${result.docs_written} documents synchronisés`);

      } catch (err) {
        console.error('[CHECKPOINT]', 'sync-error', { error: err.message });
        this.syncStatus = 'Erreur: ' + err.message;
        alert('Erreur de sync: ' + err.message);

      } finally {
        this.syncing = false;
      }
    }
  }));
});
