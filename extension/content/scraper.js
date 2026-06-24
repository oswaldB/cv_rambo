/**
 * Content script pour extension CV Rambo
 * Scrap les informations des offres d'emploi
 */

(function() {
  'use strict';

  // Détecteur de sites d'emploi
  const detectors = {
    linkedin: {
      pattern: /linkedin\.com\/jobs\/view/,
      extract: () => {
        const title = document.querySelector('h1')?.textContent?.trim() ||
                     document.querySelector('[class*="job-title"]')?.textContent?.trim();
        const company = document.querySelector('[class*="company-name"]')?.textContent?.trim() ||
                       document.querySelector('.jobs-unified-top-card__company-name')?.textContent?.trim();
        return { title, company, source: 'LinkedIn' };
      }
    },
    indeed: {
      pattern: /indeed\.com\/viewjob|indeed\.com\/jobs/,
      extract: () => {
        const title = document.querySelector('h1')?.textContent?.trim() ||
                     document.querySelector('[data-testid="job-title"]')?.textContent?.trim();
        const company = document.querySelector('[data-testid="company-name"]')?.textContent?.trim() ||
                       document.querySelector('.company')?.textContent?.trim();
        return { title, company, source: 'Indeed' };
      }
    },
    apec: {
      pattern: /apec\.fr\/.*\/offre-emploi/,
      extract: () => {
        const title = document.querySelector('h1')?.textContent?.trim();
        const company = document.querySelector('.company-name, [class*="entreprise"]')?.textContent?.trim();
        return { title, company, source: 'APEC' };
      }
    }
  };

  // Détecter le site actuel
  const url = window.location.href;
  let detector = null;

  for (const [name, config] of Object.entries(detectors)) {
    if (config.pattern.test(url)) {
      detector = config;
      console.log('[CV Rambo] Site détecté:', name);
      break;
    }
  }

  // Si on est sur une page d'offre, extraire les données
  if (detector) {
    const data = detector.extract();
    
    if (data.title) {
      // Stocker pour le popup
      chrome.storage.local.set({
        lastScraped: {
          url: url,
          title: data.title,
          company: data.company,
          source: data.source,
          timestamp: Date.now()
        }
      });
      
      console.log('[CV Rambo] Données extraites:', data);
      
      // Afficher une notification discrète
      showNotification(data);
    }
  }

  function showNotification(data) {
    // Créer une notification flottante
    const notif = document.createElement('div');
    notif.id = 'cv-rambo-notif';
    notif.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1a1a1a;
        border: 2px solid #FF0000;
        color: #fff;
        padding: 15px 20px;
        font-family: 'Courier New', monospace;
        z-index: 999999;
        box-shadow: 4px 4px 0 #FFD700;
        max-width: 300px;
      ">
        <div style="font-weight: bold; color: #FFD700; margin-bottom: 8px;">🔫 CV Rambo</div>
        <div style="font-size: 0.9rem; margin-bottom: 10px;">Offre détectée sur ${data.source}</div>
        <div style="font-size: 0.85rem; color: #aaa; margin-bottom: 12px;">${data.title}</div>
        <button id="cv-rambo-add" style="
          background: #FF0000;
          color: white;
          border: none;
          padding: 8px 15px;
          font-family: inherit;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
        ">➕ Ajouter à CV Rambo</button>
        <button id="cv-rambo-close" style="
          background: transparent;
          color: #888;
          border: none;
          margin-top: 8px;
          cursor: pointer;
          width: 100%;
          font-size: 0.8rem;
        ">✕ Fermer</button>
      </div>
    `;
    
    document.body.appendChild(notif);
    
    // Gestionnaires
    document.getElementById('cv-rambo-add').addEventListener('click', () => {
      window.open(`http://localhost:8080/ajout-url/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(data.title)}`, '_blank');
      notif.remove();
    });
    
    document.getElementById('cv-rambo-close').addEventListener('click', () => {
      notif.remove();
    });
    
    // Auto-supprimer après 10 secondes
    setTimeout(() => {
      if (document.getElementById('cv-rambo-notif')) {
        notif.remove();
      }
    }, 10000);
  }
})();
