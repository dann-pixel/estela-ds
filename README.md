# Estela Design System — Angular

Angular Material v20 (M3) theme library. Provides brand colors, typography, shape and elevation tokens, DS utility classes (status chips, alerts, condensed form field), a `ThemeService` for dark mode and Spanish i18n for Material components.

Package name: **`estela-angular`** · Monorepo: `projects/estela` (library) + `projects/showcase` (demo app).

---

## Requirements

- Angular **20** (`@angular/core`, `@angular/common`)
- `@angular/material` and `@angular/cdk` **20**
- Node.js **≥ 20**

---

## Installation

The library is distributed as the `estela-angular` npm package (built from `dist/estela`).
It can't be installed with `npm install git+…` because the repo root is the monorepo, not the library.

**Option A — GitHub Release** (recommended): each release attaches the tarball.

```bash
npm install https://github.com/dann-pixel/estela-ds/releases/download/v1.1.1/estela-angular-1.1.1.tgz
```

**Option B — local tarball**:

```bash
# In this repo: builds the lib and writes dist/estela-angular-<version>.tgz
npm run pack:lib
```

```bash
# In your project (or attach the .tgz to a GitHub Release and install from its URL)
npm install /path/to/estela-ds-angular/dist/estela-angular-1.1.1.tgz
```

**Option C — private registry** (GitHub Packages, Verdaccio, etc.): `npm run build:lib`, then `cd dist/estela && npm publish`.

---

## Setup

### 1. Fonts in `index.html`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
```

### 2. Theme in `styles.scss`

No `includePaths` needed — the package exposes its SCSS as `estela-angular/theme`.
Call the mixins **at root level** (not inside a selector):

```scss
@use 'estela-angular/theme' as estela;

// Light theme (required)
@include estela.light-theme-setup();

// Dark theme (optional) — active when <html> has .dark-theme
@include estela.dark-theme-setup();

// Base typography, Material Symbols axes, .form-field-sm, .status-chip, .estela-alert
@include estela.global-styles();
```

### 3. Providers in `app.config.ts`

```ts
import { provideEstela } from 'estela-angular';
import { provideEstelaIntl } from 'estela-angular/intl';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEstela(),            // Material Symbols for <mat-icon>, MAT_DATE_LOCALE 'es-CL'
    provideEstelaIntl(),        // Paginator, Datepicker and Stepper texts in Spanish
    provideNativeDateAdapter(), // only if you use mat-datepicker
  ],
};
```

- `provideEstela({ dateLocale, darkThemeClass, storageKey })` accepts overrides.
- `estela-angular/intl` is a separate entry point because it pulls Paginator, Datepicker and Stepper into the bundle where it's registered. If those components only live in lazy routes, register `provideEstelaPaginatorIntl()` / `provideEstelaDatepickerIntl()` / `provideEstelaStepperIntl()` in those components' `providers` instead.
- The native date adapter parses typed dates with `Date.parse` (US order). If users type dates (`dd/mm/yyyy`), use a date-fns or Luxon adapter.

---

## Dark mode

```ts
import { ThemeService } from 'estela-angular';

readonly theme = inject(ThemeService);

theme.isDark();   // signal<boolean>
theme.toggle();   // toggles .dark-theme on <html> and persists in localStorage
theme.icon();     // 'dark_mode' | 'light_mode'
theme.tooltip();  // Spanish label for the toggle button
```

Initial value: `localStorage['estela-theme']` → `prefers-color-scheme` → light.
If you pass a custom selector to `dark-theme-setup('.my-dark')`, also pass `provideEstela({ darkThemeClass: 'my-dark' })`.

---

## What the theme applies

| Token group | Value |
|---|---|
| Brand primary | `#00b5cc` (cyan). As text/icon on light surfaces: `--estela-primary-on-surface` (`#006a92`, AA) |
| Brand tertiary | `#4255ff` (indigo) |
| Neutrals | Blue Gray ramp (`--mat-sys-surface*`, `--mat-sys-outline*`, `--mat-sys-background`) |
| Border radius | `4px` on all components. Switch, slider, badge and avatar stay circular |
| Elevation (level 1) | `none` — surfaces use border, not shadow |
| Elevation (level 2–5) | preserved — menus, dialogs, snackbars |
| Letter-spacing | `0` on all type roles |

---

## Semantic color tokens

M3 does not define warning, success or info roles. Estela exposes them as CSS custom properties (light + dark):

```css
--estela-{warning|success|info}
--estela-{warning|success|info}-container
--estela-on-{warning|success|info}
--estela-on-{warning|success|info}-container

--estela-chip-{default|info|success|error|warning}-container
--estela-chip-on-{default|info|success|error|warning}-container

--estela-dark, --estela-on-dark, --estela-dark-container, --estela-on-dark-container
```

Error is handled natively by M3 via `--mat-sys-error*`.

---

## Utility classes (`global-styles()`)

```html
<!-- Status chip -->
<mat-chip class="status-chip status-completado" disableRipple>Completado</mat-chip>
<!-- status-no-iniciado | status-en-progreso | status-completado | status-cancelado | status-en-implementacion -->

<!-- Alert -->
<div class="estela-alert estela-alert--success">
  <mat-icon>check_circle</mat-icon>
  <div class="alert-body"><strong>Listo</strong><span>Los cambios se guardaron.</span></div>
</div>
<!-- --info | --success | --warning | --error -->

<!-- 40px form field, aligned with buttons (use placeholder, no mat-label) -->
<mat-form-field class="form-field-sm">
  <input matInput placeholder="Buscar" />
</mat-form-field>
```

Each group can also be included separately: `base-styles()`, `form-field-sm()`, `status-chips()`, `alerts()`.

---

## Available mixins

| Mixin | Description |
|---|---|
| `light-theme-setup($selector: html, $primary?, $tertiary?, $density?)` | Recommended. Full light theme |
| `dark-theme-setup($selector: '.dark-theme', $primary?, $tertiary?)` | Recommended. Full dark theme (color only; typography/density are inherited from the light theme) |
| `global-styles()` | All utility classes + base typography |
| `light-theme()` / `dark-theme()` | Advanced: base M3 tokens only |
| `light-brand-overrides()` / `dark-brand-overrides()` | Advanced: all Estela overrides. **Required** after `light-theme()` / `dark-theme()`, in a separate block |

### Advanced usage (custom selector)

```scss
@use 'estela-angular/theme' as estela;

// Block 1 — mat.theme() output
.my-shell { @include estela.light-theme(); }
// Block 2 — Estela overrides (must be a separate block, after block 1)
.my-shell { @include estela.light-brand-overrides(); }
```

Angular Material defers part of `mat.theme()`'s output until the selector closes; overrides in the same block would lose the cascade.

---

## Development

```bash
npm start              # Showcase at http://localhost:4200 (uses the lib source directly)
npm run build          # Library + showcase
npm run pack:lib       # Library tarball in dist/
npm test               # Library + showcase unit tests (ChromeHeadless)
```

On macOS without Chrome on the PATH: `export CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.

Release:
1. Bump `version` in `projects/estela/package.json` **and** `ESTELA_VERSION` in `projects/estela/src/public-api.ts`
2. `npm run pack:lib`
3. `gh release create vX.Y.Z dist/estela-angular-X.Y.Z.tgz`
