# Chronos

Chronos is a multi-era HTML theme source project built around one shared customization system instead of a single fixed visual style. The current source workspace contains 20 layouts, 17 design eras, 16 preset palettes, and 70+ Google Fonts that can be mixed live through the shared customizer.

This phase is the product-finalization phase. The project is being refined in source first, and release packaging is intentionally deferred to a later shipping pass.

## Product scope

- 20 source layouts
- 17 eras: Modern, Gothic, Futuristic, Retro, Cyberpunk, Brutalist, Minimalist, Eco, Corporate, Artistic, Apocalyptic, Liquid, Jurassic, Pixelated, Ice Age, Volcanic, Magic
- 16 preset palettes plus custom color controls
- 70+ Google Fonts with separate heading, body, accent, and mono roles
- Shared customizer with per-layout persistence, reset, current-layout package download, and Surprise Me randomization with exclusions
- Vite 8 development and build workflow

## Tech stack

- Vite 8
- Tailwind CSS v4
- Alpine.js
- CSS custom properties for all era tokens

## Getting started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Build the source project:

```bash
npm run build
```

Because the source project uses Vite module entrypoints, use it through the development server or the production build. Do not treat the raw source HTML files as a finished shipping package yet.

## Project structure

- `index.html` - layout directory hub
- `layout-01.html` through `layout-20.html` - the 20 source layouts
- `src/style.css` - global design tokens, eras, utilities, and component styles
- `src/main.js` - shared page runtime for demo actions, date handling, and countdowns
- `src/customizer.js` - Alpine store and customization logic
- `src/customizer-html.js` - injected customizer markup
- `src/fonts.js` - curated Google Font catalog and default era font mapping

## Current finalization goals

- keep all visible product counts and version references truthful
- remove stale or misleading marketplace copy from source pages
- stabilize placeholder links and demo forms with explicit demo-only feedback
- keep the shared customizer behavior consistent across layouts
- align skip-link and mobile-nav shell behavior across outlier layouts
- keep exported packages and current-layout downloads aligned with the baked theme defaults
- reduce mobile layout regressions before the later shipping phase
- keep the magical-academy layout original rather than franchise-adjacent

## Notes

- Codester is the full-package delivery channel for buyers. The in-browser customizer is for previewing combinations before editing the downloaded source project.
- On any layout page, the customizer can generate a one-layout Vite package zip from that current page with the active era, colors, and fonts baked in, with or without the live customizer panel.
- The source project keeps demo content intentionally neutral where licensing, support, or marketplace-specific language would be premature.
- Surprise Me can randomize fonts and colors for the current layout, and its settings panel can exclude specific font choices or exact color swatches from future surprises.
- Shared mobile-nav behavior now supports the layout-specific nav shells used by the dashboard, archive, and social layouts.
- Countdown blocks use a fixed launch date and fall back to a neutral completed state once that launch window has passed.
- Release packaging, buyer-facing file structure, and deployment portability are separate concerns for the shipping phase.
