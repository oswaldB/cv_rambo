# Changelog

Toutes les modifications notables de ce projet seront documentées ici.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [1.0.0] - 2024-01-XX

### Ajouté
- ✅ Frontend complet avec Alpine.js + PouchDB
  - 7 écrans: Dashboard, Ajout URL, Détail, Kanban, Mode Rafale, Arsenal, Settings
  - 14 workflows métiers
  - Design rétro Rambo
  - Offline-first avec sync temps réel
  
- ✅ Backend Node.js + Express
  - API REST complète
  - Workflow génération automatique via Ollama
  - Service CouchDB avec changes feed
  - Logging avec Winston
  
- ✅ Extension navigateur
  - Détection automatique des offres d'emploi
  - Extraction titre/entreprise
  - Ajout rapide en un clic
  
- ✅ DevOps
  - Docker + Docker Compose
  - GitHub Actions CI/CD
  - Scripts backup/restore/health-check
  - Tests E2E Playwright
  
- ✅ Documentation
  - README complet
  - Guide de test
  - Guide contribution
  - CHANGELOG

### Technologies
- Alpine.js 3.x
- PouchDB 8.x
- Node.js 18+
- Express 4.x
- Ollama (IA locale)
- CouchDB
- Docker

## Roadmap

### [1.1.0] - Prochainement
- [ ] Authentification multi-utilisateur
- [ ] Dashboard analytics (graphiques)
- [ ] Templates de scripts personnalisables
- [ ] Import depuis CSV/JSON
- [ ] Mode "dark/light" automatique

### [1.2.0]
- [ ] Application mobile (Capacitor)
- [ ] Notifications push
- [ ] Intégration Calendry (prise RDV)
- [ ] Export PDF des candidatures

### [2.0.0]
- [ ] Support multi-langues (i18n)
- [ ] Plugin LinkedIn automatique
- [ ] IA avancée (fine-tuning modèle)
- [ ] SaaS avec hébergement cloud
