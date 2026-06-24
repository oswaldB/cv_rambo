# Workflow : copier-script

## Description
Copie le script généré dans le presse-papiers avec feedback visuel.

## Déclencheur
Clic sur bouton "📋 Copier le script"

## Entrées
- `script` : string - Code JavaScript à copier

## Sorties
- `success` : boolean
- `error` : string (si permission refusée)

## Étapes

```javascript
/**
 * @checkpoint Vérifier permission clipboard
 */
async function verifierPermission() {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API non supportée');
  }
  // Permission automatique en HTTPS, sinon demande
}

/**
 * @checkpoint Copier dans clipboard
 */
async function copierScript(script) {
  await navigator.clipboard.writeText(script);
  return true;
}

/**
 * @checkpoint Feedback visuel
 */
function afficherFeedback() {
  // Change texte bouton
  btn.textContent = '✅ Copié !';
  btn.classList.add('copied');
  
  // Toast
  showToast('Script copié ! Collez-le dans la console du site.');
  
  // Reset après 2s
  setTimeout(() => {
    btn.textContent = '📋 Copier le script';
    btn.classList.remove('copied');
  }, 2000);
}
```

## Fallback
Si Clipboard API non disponible :
```javascript
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
```

## Logs
- `[SCRIPT] copy-requested`
- `[SCRIPT] copy-success`
- `[SCRIPT] copy-failed <reason>`
