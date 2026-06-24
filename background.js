/**
 * Background Script - Service Worker
 * Gère les événements de l'extension Chrome
 */

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectOverlay
  });
});

function injectOverlay() {
  if (document.getElementById('cv-rambo-container')) {
    document.getElementById('cv-rambo-container').remove();
  } else {
    const iframe = document.createElement('iframe');
    iframe.id = 'cv-rambo-container';
    iframe.src = chrome.runtime.getURL('frontend/index.html');
    iframe.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999999;
      border: none;
    `;
    document.body.appendChild(iframe);
  }
}

// Écouter les messages du content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'navigate') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (screen) => {
          const iframe = document.getElementById('cv-rambo-container');
          if (iframe) {
            iframe.src = chrome.runtime.getURL(`frontend/${screen}/index.html`);
          }
        },
        args: [request.screen]
      });
    });
  }
});

console.log('[CV RAMBO] Background service worker started');
