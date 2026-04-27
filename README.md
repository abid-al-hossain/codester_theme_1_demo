# Chronos

Chronos is a multi-era HTML theme built around one shared customization system instead of a single static visual style. The current workspace contains 20 layouts, 17 design eras, 16 preset palettes, and 70+ Google Fonts that can be mixed live through the shared customizer.

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

Build the project:

```bash
npm run build
```

Because the project uses Vite module entrypoints, use it through the development server or the production build.

## Project structure

- `index.html` - layout directory hub
- `layout-01.html` through `layout-20.html` - the 20 source layouts
- `src/style.css` - global design tokens, eras, utilities, and component styles
- `src/main.js` - shared page runtime for preview actions, date handling, and countdowns
- `src/customizer.js` - Alpine store and customization logic
- `src/customizer-html.js` - injected customizer markup
- `src/fonts.js` - curated Google Font catalog and default era font mapping

## Notes

- On any layout page, the customizer can generate a one-layout Vite package zip from that current page with the active era, colors, and fonts baked in, with or without the live customizer panel.
- Surprise Me can randomize fonts and colors for the current layout, and its settings panel can exclude specific font choices or exact color swatches from future surprises.
- Shared mobile-nav behavior now supports the layout-specific nav shells used by the dashboard, archive, and social layouts.
- Countdown blocks use either the layout-provided launch date or a rolling future fallback date, and switch to a neutral completed state once the launch window has passed.
