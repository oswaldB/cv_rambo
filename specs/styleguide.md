# Styleguide — Pur Tailwind CSS

Ce styleguide définit les conventions visuelles du projet. Il repose **uniquement sur Tailwind CSS via CDN** : pas de build, pas de classes CSS maison, juste des utilities.

## 1. Setup de base

Inclure dans chaque page HTML :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              50:  '#eff6ff',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8'
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50 text-slate-800 font-sans">
  <!-- contenu -->
</body>
</html>
```

## 2. Palette de couleurs

| Rôle           | Classes Tailwind          | Usage                          |
|----------------|---------------------------|--------------------------------|
| Primary        | `bg-blue-600` `text-blue-600` `border-blue-600` | Actions principales, liens |
| Secondary      | `bg-slate-200` `text-slate-700` | Actions secondaires        |
| Success        | `bg-green-600` `text-green-600` | Validation, OK             |
| Warning        | `bg-amber-500` `text-amber-600` | Avertissements             |
| Danger         | `bg-red-600` `text-red-600`    | Erreurs, suppressions       |
| Info           | `bg-sky-500` `text-sky-600`    | Informations neutres         |
| Neutral        | `bg-slate-50` `text-slate-800` `border-slate-200` | Fonds, bordures |

**Convention** : `bg-{couleur}-500/600` pour les fonds, `text-{couleur}-600` pour les textes, `border-{couleur}-300/500` pour les bordures.

## 3. Typographie

| Niveau  | Classes Tailwind                                    | Exemple visuel           |
|---------|-----------------------------------------------------|--------------------------|
| H1      | `text-3xl font-bold text-slate-900`                 | Titre principal page     |
| H2      | `text-2xl font-semibold text-slate-900`             | Titre section            |
| H3      | `text-xl font-semibold text-slate-800`              | Sous-titre               |
| H4      | `text-lg font-medium text-slate-800`                | Titre carte              |
| Body    | `text-base text-slate-800`                          | Paragraphe standard      |
| Small   | `text-sm text-slate-600`                            | Texte secondaire         |
| Caption | `text-xs text-slate-500 uppercase tracking-wide`    | Label, légende           |

**Police par défaut** : `font-sans` (Tailwind = system stack). Pour un projet spécifique, override dans `tailwind.config.theme.extend.fontFamily`.

## 4. Espacements

Échelle standard à respecter :

| Token  | Classes        | Usage                          |
|--------|----------------|--------------------------------|
| xs     | `p-1` `m-1` `gap-1` | Padding interne très serré |
| sm     | `p-2` `m-2` `gap-2` | Petits éléments          |
| md     | `p-4` `m-4` `gap-4` | Standard                  |
| lg     | `p-6` `m-6` `gap-6` | Sections, cartes           |
| xl     | `p-8` `m-8` `gap-8` | Grands blocs              |

**Règle** : ne pas inventer de valeurs exotiques (`p-3.5`, `p-5`) sauf cas justifié. Rester sur la grille 4px.

## 5. Boutons

```html
<!-- Primary -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">
  Action principale
</button>

<!-- Secondary -->
<button class="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition">
  Action secondaire
</button>

<!-- Danger -->
<button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition">
  Supprimer
</button>

<!-- Disabled -->
<button disabled class="px-4 py-2 bg-slate-300 text-slate-500 rounded-md cursor-not-allowed">
  Indisponible
</button>
```

**Tailles** : `px-3 py-1 text-sm` (small), `px-4 py-2` (default), `px-6 py-3 text-lg` (large).

## 6. Inputs

```html
<!-- Text input standard -->
<div>
  <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email</label>
  <input type="email" id="email"
    class="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    placeholder="vous@exemple.fr">
</div>

<!-- Error state -->
<div>
  <label for="email" class="block text-sm font-medium text-red-700 mb-1">Email</label>
  <input type="email" id="email"
    class="w-full px-3 py-2 border border-red-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
    value="invalide">
  <p class="mt-1 text-sm text-red-600">Format email invalide.</p>
</div>
```

## 7. Cards

```html
<div class="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
  <h3 class="text-lg font-medium text-slate-900 mb-2">Titre carte</h3>
  <p class="text-sm text-slate-600">Contenu de la carte, descriptions, données.</p>
</div>
```

Variantes :
- **Hover** : ajouter `hover:shadow-md transition-shadow cursor-pointer`
- **Sélectionnée** : `border-blue-500 ring-2 ring-blue-200`

## 8. Toasts / Notifications

```html
<!-- Success -->
<div class="flex items-start p-4 bg-green-50 border border-green-200 rounded-md">
  <svg class="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
  <div class="flex-1">
    <p class="text-sm font-medium text-green-800">Opération réussie</p>
    <p class="text-sm text-green-700 mt-1">Les modifications ont été enregistrées.</p>
  </div>
</div>

<!-- Error -->
<div class="flex items-start p-4 bg-red-50 border border-red-200 rounded-md">
  <svg class="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/></svg>
  <div class="flex-1">
    <p class="text-sm font-medium text-red-800">Erreur</p>
    <p class="text-sm text-red-700 mt-1">Une erreur est survenue, réessayez.</p>
  </div>
</div>
```

## 9. Modals

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
  <!-- Container -->
  <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
    <h2 class="text-xl font-semibold text-slate-900 mb-4">Titre modal</h2>
    <p class="text-sm text-slate-600 mb-6">Contenu de la modal.</p>
    <div class="flex justify-end gap-2">
      <button class="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300">Annuler</button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Confirmer</button>
    </div>
  </div>
</div>
```

## 10. Loaders / Skeletons

```html
<!-- Spinner -->
<div class="flex items-center justify-center">
  <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
</div>

<!-- Skeleton lines -->
<div class="space-y-3">
  <div class="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
  <div class="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
  <div class="h-4 bg-slate-200 rounded animate-pulse w-5/6"></div>
</div>
```

## 11. Tables

```html
<div class="overflow-x-auto border border-slate-200 rounded-lg">
  <table class="w-full text-sm text-left">
    <thead class="bg-slate-50 text-slate-700 uppercase text-xs">
      <tr>
        <th class="px-4 py-3">Colonne 1</th>
        <th class="px-4 py-3">Colonne 2</th>
        <th class="px-4 py-3 text-right">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200">
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3">Valeur 1</td>
        <td class="px-4 py-3">Valeur 2</td>
        <td class="px-4 py-3 text-right">
          <button class="text-blue-600 hover:underline">Éditer</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

## 12. Layout & Grids

```html
<!-- Container centré -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  Contenu
</div>

<!-- Grid responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white p-4 border rounded">Carte 1</div>
  <div class="bg-white p-4 border rounded">Carte 2</div>
  <div class="bg-white p-4 border rounded">Carte 3</div>
</div>

<!-- Stack vertical -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Flex horizontal aligné -->
<div class="flex items-center justify-between gap-4">
  <span>Gauche</span>
  <button>Droite</button>
</div>
```

## 13. Conventions de nommage

- **Utility-first** : privilégier les classes Tailwind directement dans le HTML
- **Extraction via `@apply`** : seulement si une combinaison est répétée 3+ fois dans le projet. Définir dans `<style>` ou un fichier CSS si build
- **Pas de classes custom** : ne pas créer de classes CSS `.btn-primary` à la main, utiliser les utilities
- **Cohérence couleurs** : toujours la même couleur pour le même rôle (primary = blue partout)

Exemple d'extraction justifiée :

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition;
  }
}
```

## 14. Accessibilité de base

- **`alt`** obligatoire sur toutes les `<img>` : `alt="description courte"`
- **`<label>`** toujours associé à un input via `for=""` et `id=""`
- **Focus visible** : garder les `focus:ring-2` sur tous les éléments interactifs
- **Contraste** : `text-slate-800` sur `bg-white` ✓, `text-slate-500` sur `bg-white` ✓ (≥ 4.5:1 pour le body)
- **ARIA** : `aria-label` sur les boutons icônes, `aria-live="polite"` sur les zones de notification

## 15. Responsive

Mobile-first : on code d'abord le mobile, on ajoute `sm:` `md:` `lg:` `xl:` pour les breakpoints supérieurs.

| Breakpoint | Largeur min | Usage                            |
|------------|-------------|----------------------------------|
| (default)  | 0px         | Mobile portrait                  |
| `sm:`      | 640px       | Mobile paysage / petite tablette |
| `md:`      | 768px       | Tablette                         |
| `lg:`      | 1024px      | Desktop                          |
| `xl:`      | 1280px      | Large desktop                    |

**Exemple** :

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- 1 col mobile, 2 tablette, 4 desktop -->
</div>

<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
  <!-- Titre adaptatif -->
</h1>
```

---

## 16. Pixel Art Rétro — Spécificités

### 16.1 Polices pixel

Utiliser des polices pixel pour les titres et éléments rétro :

| Usage | Police | CDN |
|-------|--------|-----|
| Titres | `Press Start 2P` | `https://fonts.googleapis.com/css2?family=Press+Start+2P` |
| Texte UI | `VT323` | `https://fonts.googleapis.com/css2?family=VT323` |
| Alternative | `Pixelify Sans` | `https://fonts.googleapis.com/css2?family=Pixelify+Sans` |

Setup dans `tailwind.config` :

```javascript
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        'pixel-body': ['VT323', 'monospace'],
      }
    }
  }
}
```

### 16.2 Rendu pixel-perfect

Forcer le rendu pixelisé sur images et canvases :

```css
.pixel-art {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
```

```html
<img src="sprite.png" class="pixel-art w-8 h-8">
<canvas class="pixel-art w-full h-full"></canvas>
```

### 16.3 Palette rétro — 8-bit / 16-bit

Couleurs inspirées NES/SNES :

| Rôle | Hex | Classes |
|------|-----|---------|
| Retro Black | `#0d0d0d` | `bg-retro-black` |
| Retro White | `#f0f0d8` | `bg-retro-cream` |
| Retro Red | `#e74c3c` | `bg-retro-red` |
| Retro Blue | `#3498db` | `bg-retro-blue` |
| Retro Green | `#2ecc71` | `bg-retro-green` |
| Retro Yellow | `#f1c40f` | `bg-retro-yellow` |
| Retro Purple | `#9b59b6` | `bg-retro-purple` |
| Retro Orange | `#e67e22` | `bg-retro-orange` |

Setup dans config :

```javascript
colors: {
  retro: {
    black: '#0d0d0d',
    cream: '#f0f0d8',
    red: '#e74c3c',
    blue: '#3498db',
    green: '#2ecc71',
    yellow: '#f1c40f',
    purple: '#9b59b6',
    orange: '#e67e22',
    dark: '#2c3e50',
  }
}
```

### 16.4 Bordures pixel / 8-bit corners

Bordures carrées sans border-radius pour l'effet pixel :

```html
<!-- Bouton pixel -->
<button class="px-4 py-2 bg-retro-blue text-retro-cream font-pixel text-xs border-2 border-retro-black hover:bg-retro-blue/90 active:translate-y-0.5">
  START
</button>

<!-- Panel pixel avec ombre rétro -->
<div class="bg-retro-cream border-4 border-retro-black p-4 shadow-[4px_4px_0_0_#0d0d0d]">
  <h2 class="font-pixel text-retro-black">GAME OVER</h2>
</div>

<!-- Ombre rétro 8-bit -->
<div class="shadow-[4px_4px_0_0_rgba(13,13,13,1)]">
  Contenu avec ombre pixel
</div>
```

### 16.5 Effet CRT / Scanlines (optionnel)

```html
<!-- Overlay scanlines -->
<div class="fixed inset-0 pointer-events-none opacity-10 z-50"
     style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);">
</div>

<!-- Flicker subtil -->
<div class="fixed inset-0 pointer-events-none opacity-5 z-50 animate-pulse bg-white mix-blend-overlay"></div>
```

### 16.6 Grille pixel alignement

Tailles en multiples de 4px ou 8px pour l'alignement pixel :

| Token | Pixels | Usage |
|-------|--------|-------|
| `xs` | 4px | Mini espacements |
| `sm` | 8px | Standard UI |
| `md` | 16px | Sections |
| `lg` | 24px | Blocs |
| `xl` | 32px | Grands éléments |

```html
<!-- Sprites en tailles standard -->
<img class="w-8 h-8">   <!-- 32px sprite -->
<img class="w-16 h-16"> <!-- 64px sprite -->
<img class="w-32 h-32"> <!-- 128px sprite -->
```

### 16.7 Composants rétro

```html
<!-- HUD rétro -->
<div class="flex items-center gap-2 font-pixel text-xs">
  <span class="text-retro-red">♥</span>
  <span class="text-retro-cream">3/3</span>
</div>

<!-- Score display -->
<div class="font-pixel text-retro-yellow bg-retro-black px-2 py-1 border-2 border-retro-cream">
  SCORE: 000420
</div>

<!-- Inventory slot -->
<div class="w-12 h-12 bg-retro-dark border-2 border-retro-cream flex items-center justify-center">
  <img src="sword.png" class="w-8 h-8 pixel-art">
</div>
```

---

**Résumé des règles d'or** :
1. Tailwind CDN, pas de build
2. Polices pixel (`Press Start 2P`, `VT323`) pour UI/titres
3. `image-rendering: pixelated` sur tous les sprites
4. Palette rétro saturée, contrastée
5. Bordures carrées (`border-4`), pas de `rounded` (ou `rounded-none`)
6. Tailles en multiples de 4px/8px
7. Ombres 8-bit avec `shadow-[4px_4px_0_0_#color]`
8. Mobile-first, breakpoints `sm/md/lg/xl`

+> il me manque des aspects spécificiques à l'univers pixel art retro du theme demandé.
