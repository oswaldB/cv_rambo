/**
 * Configuration CV Rambo
 * Variables injectables via Netlify env vars au build
 * ou surchargables via localStorage en dev
 */

(function() {
  'use strict';

  // Config par défaut (dev local)
  const DEFAULT_CONFIG = {
    couchdb: {
      url: 'http://localhost:5984',
      database: 'cv-rambo',
      username: 'admin',
      password: 'admin'
    }
  };

  // Charger depuis window.ENV (injecté par Netlify build)
  const envConfig = window.ENV || {};

  // Fusionner avec localStorage si présent (priorité utilisateur)
  let userConfig = {};
  try {
    const stored = localStorage.getItem('cvrambo-config');
    if (stored) {
      userConfig = JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Config localStorage invalide');
  }

  // Config finale
  window.CV_RAMBO_CONFIG = {
    couchdb: {
      url: envConfig.COUCHDB_URL || userConfig.couchdbUrl || DEFAULT_CONFIG.couchdb.url,
      database: envConfig.COUCHDB_DB || userConfig.couchdbDb || DEFAULT_CONFIG.couchdb.database,
      username: envConfig.COUCHDB_USER || userConfig.couchdbUser || DEFAULT_CONFIG.couchdb.username,
      password: envConfig.COUCHDB_PASSWORD || userConfig.couchdbPassword || DEFAULT_CONFIG.couchdb.password
    }
  };

  // Helper pour sauvegarder config utilisateur
  window.saveCouchDBConfig = function(url, db, user, pass) {
    const config = {
      couchdbUrl: url,
      couchdbDb: db,
      couchdbUser: user,
      couchdbPassword: pass
    };
    localStorage.setItem('cvrambo-config', JSON.stringify(config));
    window.location.reload();
  };

  console.log('[CONFIG] CV Rambo config loaded', {
    url: window.CV_RAMBO_CONFIG.couchdb.url,
    db: window.CV_RAMBO_CONFIG.couchdb.database
  });
})();
