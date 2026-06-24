/**
 * Mega-fonction : tester-connexion
 * Teste la connexion CouchDB
 * Framework: Alpine.js
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('connectionTester', () => ({
    connectionStatus: 'offline', // offline, testing, online, error
    connectionStatusText: 'Hors ligne',
    testing: false,
    couchConfig: {
      url: 'http://localhost:5984',
      username: 'admin',
      password: 'admin'
    },

    initSettings() {
      this.updateConnectionStatus();
    },

    updateConnectionStatus() {
      // Check if sync is active from global sync component
      if (window.syncStatus) {
        this.connectionStatus = 'online';
        this.connectionStatusText = 'Connecté';
      }
    },

    async testConnection() {
      /**
       * @action Tester connexion CouchDB
       * @checkpoint test-started
       */
      this.testing = true;
      this.connectionStatus = 'testing';
      this.connectionStatusText = 'Test en cours...';

      console.log('[CHECKPOINT]', 'test-started', { url: this.couchConfig.url });

      try {
        const testDb = new PouchDB(this.couchConfig.url, {
          auth: {
            username: this.couchConfig.username,
            password: this.couchConfig.password
          }
        });

        // Test avec une requête info
        await testDb.info();

        /**
         * @checkpoint connection-ok
         */
        this.connectionStatus = 'online';
        this.connectionStatusText = 'Connecté';
        console.log('[CHECKPOINT]', 'connection-ok');

      } catch (err) {
        /**
         * @checkpoint connection-failed
         */
        this.connectionStatus = 'error';
        this.connectionStatusText = 'Erreur: ' + err.message;
        console.error('[CHECKPOINT]', 'connection-failed', { error: err.message });

      } finally {
        this.testing = false;
      }
    }
  }));
});
