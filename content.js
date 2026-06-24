/**
 * Content Script
 * Injecté dans chaque page web visitée
 */

// Détecter les pages d'offres d'emploi
const jobPatterns = [
  /linkedin\.com\/jobs/,
  /indeed\.com\/viewjob/,
  /welcometothejungle\.com\/jobs/,
  /glassdoor\.com\/job/,
  /monster\.com\/job/
];

const isJobPage = jobPatterns.some(pattern => pattern.test(window.location.href));

if (isJobPage) {
  console.log('[CV RAMBO] Job page detected:', window.location.href);
  
  // Notifier le background script
  chrome.runtime.sendMessage({
    type: 'job-detected',
    url: window.location.href
  });
}

// Écouter les messages de l'iframe parent
window.addEventListener('message', (event) => {
  if (event.data.type === 'close-capture') {
    const iframe = document.getElementById('cv-rambo-container');
    if (iframe) iframe.remove();
  }
  if (event.data.type === 'navigate') {
    chrome.runtime.sendMessage(event.data);
  }
});
