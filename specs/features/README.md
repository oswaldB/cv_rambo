# Index des features

**Architecture** : PouchDB (frontend) ↔ CouchDB (serveur) + Workflow backend  
**Changement majeur** : L'utilisateur copie-colle un script généré par IA dans la console du site

---

## Features

| ID | Titre | Description | Statut |
|----|-------|-------------|--------|
| **F-001** | Arsenal CV dynamique | Gestion du profil candidat (PouchDB) | ✅ Spécifié |
| **F-002** | Mode Journaliste (Ollama) | IA pose questions pour enrichir le CV | ✅ Spécifié |
| **F-003** | Export CV (PDF/DOCX) | Génération CV formaté | ✅ Spécifié |
| **F-004** | Capture d'offre via URL | Ajout URL → Workflow scrape → Script généré | ✅ **ARCHITECTURE SPÉCIFIQUE** |
| **F-005** | Kanban des cibles | 4 colonnes glissables, suivi statuts | ✅ Spécifié |
| **F-006** | Tags sur les offres | #CiblePrioritaire, #React, etc. | ✅ Spécifié |
| **F-007** | Génération de Script IA | Puppeteer scrape → Ollama génère JS → User copie dans console | ✅ **NOUVEAU** |
| **F-010** | Mode Rafale | Génération batch de 10 scripts, exécution séquentielle | ✅ **NOUVEAU** |
| **F-011** | QG Tactique (Stats) | Tableau de bord candidatures | ✅ Spécifié |
| **F-012** | Design rétro 80s | Thème action movie | ✅ Spécifié |
| **F-013** | Stockage PouchDB/CouchDB | Offline-first + sync temps réel | ✅ **ARCHITECTURE SPÉCIFIQUE** |
| **F-016** | Filtrage Kanban | Par tags, statut, date | ✅ Spécifié |
| **F-017** | Onboarding | Tutoriel première utilisation | ✅ Spécifié |
| **F-018** | Notifications | Toasts, changements statut | ✅ Spécifié |
| **F-019** | Gestion erreurs | Logs, retry, fallback | ✅ Spécifié |
| **F-020** | Configuration | Paramètres utilisateur | ✅ Spécifié |

---

## Workflow de génération de scripts (NOUVEAU)

### Flow complet

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Ajout     │     │   PouchDB   │     │   CouchDB   │     │   Workflow  │
│   URL       │────▶│   (local)   │────▶│  (sync)     │────▶│   Backend   │
└─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                   │
                              ┌─────────────┐    ┌──────────────┬──┴───┐
                              │   Ollama    │◀───┤  Puppeteer   │      │
                              │  Génère JS  │    │  Scrape HTML │      │
                              └─────────────┘    └──────────────┘      │
                                                                       │
                              ┌─────────────┐                          │
                              │   CouchDB   │◀──────────────────────────┘
                              │  (update)   │  Script généré
                              └──────┬──────┘
                                     │ sync
                                     ▼
                              ┌─────────────┐
                              │   PouchDB   │
                              │  (notify)   │
                              └──────┬──────┘
                                     │
                                     ▼
                              ┌─────────────┐
                              │   UI Alert  │
                              │  "Script    │
                              │   prêt !"   │
                              └─────────────┘
```

### Exemple de Script Généré

```javascript
// Script généré par Ollama pour une offre LinkedIn
(function(){
  const data={
    firstName:"Oswald",
    lastName:"Bernard",
    email:"oswald@example.com",
    phone:"+33612345678"
  };
  
  const form=document.querySelector('form[role="form"]')||document.querySelector('form');
  if(!form){console.error("Formulaire non trouvé");return;}
  
  // Remplit les champs
  const fill=(sel,val)=>{
    const el=form.querySelector(sel)||document.querySelector(sel);
    if(el){el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));}
  };
  
  fill('[name="firstName"]',data.firstName);
  fill('[name="lastName"]',data.lastName);
  fill('[name="email"]',data.email);
  fill('[name="phone"]',data.phone);
  
  // Soumet
  const btn=form.querySelector('[type="submit"]');
  if(btn){btn.click();console.log("✅ Candidature envoyée !");}
  else{form.submit();}
})();
```

---

## Documentation par feature

### Features principales

- [F-004-capture-offre-via-url.md](./F-004-capture-offre-via-url.md) - Ajout URL et workflow
- [F-007-script-generation.md](./F-007-script-generation.md) - Génération scripts IA
- [F-010-mode-rafale-script.md](./F-010-mode-rafale-script.md) - Mode rafale batch
- [F-013-stockage-pouchdb-couchdb.md](./F-013-stockage-pouchdb-couchdb.md) - Architecture PouchDB/CouchDB

### Autres features (inchangées)

- [F-001-arsenal-cv.md](./F-001-arsenal-cv.md)
- [F-002-mode-journaliste.md](./F-002-mode-journaliste.md)
- [F-003-export-cv.md](./F-003-export-cv.md)
- [F-005-kanban.md](./F-005-kanban.md)
- [F-006-tags.md](./F-006-tags.md)
- [F-011-qg-tactique.md](./F-011-qg-tactique.md)
- [F-012-design.md](./F-012-design.md)
- [F-017-onboarding.md](./F-017-onboarding.md)
- [F-018-notifications.md](./F-018-notifications.md)
- [F-019-gestion-erreurs.md](./F-019-gestion-erreurs.md)
- [F-020-settings.md](./F-020-settings.md)

---

## Architecture vs Anciennes Spécifications

| Aspect | Ancien (Plugin Chrome) | Nouveau (PouchDB/Scripts) |
|--------|------------------------|---------------------------|
| **Stockage** | chrome.storage | PouchDB local + CouchDB |
| **Sync** | N/A | Bidirectionnelle temps réel |
| **Capture** | Content script injection | Ajout URL manuel |
| **Remplissage** | Injection automatique DOM | Script copié par utilisateur |
| **Contrôle** | Automatique | Manuel (user valide) |
| **Flexibilité** | Sites connus uniquement | Universel (IA adapte) |

---

## Points clés de l'architecture

1. **Offline-first** : PouchDB fonctionne sans connexion
2. **Sync temps réel** : CouchDB synchronise automatiquement
3. **Génération asynchrone** : L'IA travaille en arrière-plan
4. **Exécution manuelle** : L'utilisateur contrôle quand exécuter le script
5. **Pas d'extension** : Fonctionne sur tous les navigateurs
