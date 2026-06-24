# Contribution Guidelines

## Structure du projet

```
cv_rambo/
├── frontend/          # Application Alpine.js
├── backend/           # Serveur Node.js
├── specs/             # Spécifications
└── docs/              # Documentation
```

## Workflow de développement

1. Forker le repository
2. Créer une branche feature: `git checkout -b feature/nom-feature`
3. Commiter avec messages descriptifs
4. Pousser et créer une Pull Request

## Standards de code

- Alpine.js uniquement (pas de JS vanille)
- Checkpoints obligatoires dans chaque workflow
- Format: `console.log('[CHECKPOINT]', 'nom', { data })`

## Tests

```bash
./validate-all.sh
```

## Documentation

- Mettre à jour README.md
- Documenter les nouveaux workflows
- Ajouter des mockups si nouveau écran
