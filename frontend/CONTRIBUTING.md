# Contribuer à CV Rambo

## Structure des workflows

Chaque workflow suit le pattern **Mega-fonction** :

```javascript
// frontend/<ecran>/workflows/<nom>/code/index.js

document.addEventListener('alpine:init', () => {
  Alpine.data('workflowNom', () => ({
    // State
    data: null,
    loading: false,
    error: null,
    
    async init() {
      // Initialisation
    },
    
    async action() {
      /**
       * @action Description de l'action
       * @checkpoint nom-checkpoint
       */
      console.log('[CHECKPOINT]', 'nom-checkpoint', { data });
      
      // Code métier
      await window.dbUtils...;
    }
  }));
});
```

## Conventions

### Checkpoints obligatoires
- Format strict: `console.log('[CHECKPOINT]', 'nom', { data })`
- Un checkpoint par étape majeure
- Émettre avant et après opérations async

### Nomenclature
- Workflows: `verbe-nom` (ex: `charger-cibles`, `creer-cible`)
- Alpine.data: camelCase (ex: `cibleCreator`, `kanbanLoader`)
- Fichiers: `index.js` dans `code/`

### HTML Template
```html
<div x-data="{ ...pouchdbInitializer(), ...monWorkflow() }" 
     x-init="$data.init(); initMonWorkflow()">
  <!-- content -->
</div>
```

## Ajouter un écran

1. Créer dossier: `frontend/nouvel-ecran/`
2. Créer `index.html` avec layout standard (sidebar + main)
3. Créer workflows dans `workflows/<nom>/code/index.js`
4. Ajouter lien dans `global/index.html`
5. Mettre à jour `README.md`

## Tests

### Tests manuels
Voir `TESTING.md` pour la checklist.

### Tests E2E
```bash
cd tests
npm test              # Headless
npm run test:ui       # Mode interactif
```

### Scénarios de validation
Dans `scenarios-to-validate/`, scripts bash qui vérifient les checkpoints.

## Style CSS

Utiliser les variables globales:
```css
:root {
  --rambo-red: #FF0000;
  --camouflage-green: #2E8B57;
  --gunmetal-gray: #2F4F4F;
  --gold: #FFD700;
}
```

## PouchDB - Bonnes pratiques

- Toujours utiliser `window.dbUtils` pour les opérations CRUD
- Écouter les changements avec `db.changes()` pour UI temps réel
- Gérer les erreurs avec try/catch + console.error
- Utiliser les indexes pour les requêtes fréquentes
