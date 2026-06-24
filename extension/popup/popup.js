/**
 * Popup script pour extension CV Rambo
 * Ajoute une cible directement à PouchDB via l'API
 */

const CV_RAMBO_URL = 'http://localhost:8080';
const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', async () => {
  const urlInput = document.getElementById('url-input');
  const titleInput = document.getElementById('title-input');
  const addBtn = document.getElementById('add-btn');
  const statusDiv = document.getElementById('status');
  const detectedInfo = document.getElementById('detected-info');
  const siteTypeSpan = document.getElementById('site-type');

  // Récupérer l'URL et titre de l'onglet actif
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (tab?.url) {
    urlInput.value = tab.url;
    
    // Détecter le type de site
    const siteType = detectSiteType(tab.url);
    if (siteType) {
      detectedInfo.style.display = 'block';
      siteTypeSpan.textContent = siteType;
    }
    
    // Essayer de récupérer le titre de l'offre
    if (tab.title && tab.title !== document.title) {
      // Nettoyer le titre (enlever suffixes comme "| LinkedIn")
      const cleanTitle = tab.title.split(/[|\-]/)[0].trim();
      titleInput.value = cleanTitle;
    }
  }

  // Gestion du bouton
  addBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    const title = titleInput.value.trim();

    if (!url) {
      showStatus('❌ URL requise', 'error');
      return;
    }

    if (!isValidUrl(url)) {
      showStatus('❌ URL invalide', 'error');
      return;
    }

    addBtn.disabled = true;
    showStatus('⏳ Ajout en cours...', 'loading');

    try {
      // Ajouter via l'API backend
      const response = await fetch(`${API_URL}/cibles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: url,
          title: title,
          siteType: detectSiteType(url),
          status: 'new',
          createdAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        showStatus('✅ Cible ajoutée ! Le script sera généré automatiquement.', 'success');
        
        // Réinitialiser après 2 secondes
        setTimeout(() => {
          urlInput.value = '';
          titleInput.value = '';
          statusDiv.className = 'status';
          statusDiv.style.display = 'none';
        }, 2000);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Erreur serveur');
      }

    } catch (err) {
      // Fallback: ouvrir l'app avec les paramètres
      showStatus('⚠️ Ouverture de CV Rambo...', 'loading');
      
      const encodedUrl = encodeURIComponent(url);
      const encodedTitle = encodeURIComponent(title);
      window.open(`${CV_RAMBO_URL}/ajout-url/index.html?url=${encodedUrl}&title=${encodedTitle}`, '_blank');
    }

    addBtn.disabled = false;
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function detectSiteType(url) {
    const patterns = {
      'LinkedIn': /linkedin\.com/i,
      'Indeed': /indeed\.com/i,
      'APEC': /apec\.fr/i,
      'Welcome to the Jungle': /welcometothejungle\.com/i,
      'Glassdoor': /glassdoor\.com/i,
      'Monster': /monster\.(fr|com)/i
    };

    for (const [name, pattern] of Object.entries(patterns)) {
      if (pattern.test(url)) return name;
    }
    return 'Générique';
  }
});
