# Chronos

Chronos is a multi-era HTML theme built around one shared customization system instead of a single static visual style. The current workspace contains 20 layouts, 17 design eras, 16 preset palettes, and 70+ Google Fonts that can be mixed live through the shared customizer.

## Product scope

- 20 source layouts
- 17 eras: Modern, Gothic, Futuristic, Retro, Cyberpunk, Brutalist, Minimalist, Eco, Corporate, Artistic, Apocalyptic, Liquid, Jurassic, Pixelated, Ice Age, Volcanic, Magic
- 16 preset palettes plus custom color controls
- 70+ Google Fonts with separate heading, body, accent, and mono roles
- Shared customizer with per-layout persistence, reset, and Surprise Me randomization with exclusions
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

The project is ready to use after `npm install` and `npm run dev`. The preview images already included in `public/previews/` are used by the layout directory and customizer layout list.

Only run this optional command if you edit hero sections and want to regenerate those directory thumbnail images:

```bash
npm run previews
```

This command uses Playwright to open each layout locally and replace the generated JPG files in `public/previews/`. It is a maintenance tool for the full 20-layout demo project, not a required setup step.

Because the project uses Vite module entrypoints, use it through the development server or the production build.

## Project structure

- `index.html` - layout directory hub
- `layout-01.html` through `layout-20.html` - the 20 source layouts
- `src/style.css` - global design tokens, eras, utilities, and component styles
- `src/main.js` - shared page runtime for placeholder actions, date handling, and countdowns
- `src/customizer.js` - Alpine store and customization logic
- `src/customizer-html.js` - injected customizer markup
- `src/fonts.js` - curated Google Font catalog and default era font mapping
- `public/previews/` - included hero preview images used by the full layout directory and customizer layout list
- `scripts/generate-layout-previews.js` - optional source-only Playwright tool for regenerating the directory thumbnails after hero edits

## Surprise Me behavior

Surprise Me is not a small list of hidden preset palettes. It generates a fresh theme for the current layout by sampling color roles algorithmically, then repairing them against readability constraints before applying them.

- Color generation uses OKLCH-based sampling, harmony offsets, tone profiles, and contrast checks so primary, secondary, accent, background, section, surface, and text colors stay visually related instead of becoming random noise.
- The generator avoids repeating very recent hue buckets, which helps repeated clicks feel broader than cycling through a fixed palette list.
- Text and key foreground colors are checked against the generated background, section, and surface colors before the palette is accepted.
- Font randomization uses compatible style groups from `src/fonts.js`, so heading, body, accent, and mono choices are picked as a designed set instead of four unrelated fonts.
- Surprise Me settings can exclude exact fonts and per-token HEX ranges such as `000000-111111`; reversed ranges such as `111111-000000` are normalized automatically.
- If an exclusion is so broad that no readable replacement can be found for a role, the customizer keeps a safe existing value rather than forcing an unreadable palette.

Developer entry points:

- `src/customizer.js` contains the Surprise Me color generator, exclusion handling, contrast checks, persistence, and reset behavior.
- `src/fonts.js` contains the Google Font catalog, era defaults, and compatible `FONT_STYLE_GROUPS`.
- `public/theme-boot.js` applies saved theme state before the app scripts load, reducing default-theme flash.

## Known intentional behavior

- This public demo keeps package export disabled. Layout pages still show a disabled Download preview so buyers can see that the source product includes export controls.
- The demo repository keeps the source structure close to the product repository for parity, while the production demo build excludes the package export chunk.
- `theme-boot.js` is loaded as a classic script instead of a Vite module so saved theme state can apply before the main app bundle loads. Vite may warn that it cannot bundle this file without `type="module"`; that warning is expected for this architecture.
- Downloaded packages from the source product are single-layout Vite projects. They include the selected layout, active era, colors, fonts, runtime files, and optional customizer, but they do not include the full 20-layout directory.
- The optional preview generator and Playwright dependency are source-maintenance tools for this full project, not required files inside exported one-layout packages.

## Notes

- This demo keeps package export disabled for public preview. The source project includes the one-layout Vite package export workflow.
- Single-layout exported ZIPs from the source project do not include the preview generator, Playwright dependency, or `npm run previews`; those are only for maintaining the full source/demo directory thumbnails.
- Surprise Me can randomize fonts and colors for the current layout, and its settings panel can exclude specific font choices or per-token HEX ranges from future surprises.
- Shared mobile-nav behavior now supports the layout-specific nav shells used by the dashboard, archive, and social layouts.
- Countdown blocks use either the layout-provided launch date or a rolling future fallback date, and switch to a neutral completed state once the launch window has passed.
