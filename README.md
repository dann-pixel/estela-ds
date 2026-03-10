# Estela Design System

Angular Material v19 (M3) theme library. Provides brand colors, typography, shape, and elevation tokens — ready to apply to any Angular project.

---

## Requirements

- Angular **19+**
- `@angular/material` **19+**
- `@angular/cdk` **19+**

---

## Installation

Install directly from this repository:

```bash
npm install git+https://github.com/dann-pixel/estela-ds.git
```

---

## Setup

### 1. Add Google Fonts

Add both font families to your `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### 2. Add `includePaths` to `angular.json`

Point the SCSS preprocessor to the library source so imports resolve correctly:

```json
"architect": {
  "build": {
    "options": {
      "stylePreprocessorOptions": {
        "includePaths": ["node_modules/estela/src"]
      }
    }
  }
}
```

> Do the same under `"test"` if you run component tests with SCSS.

### 3. Apply the theme in `styles.scss`

```scss
@use 'index' as estela;

// Light theme (required)
@include estela.light-theme-setup();

// Apply base typography to native HTML elements
body {
  font-family: var(--mat-sys-body-large-font), sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--mat-sys-headline-large-font), sans-serif;
}
```

That's it. The theme is now active.

---

## Dark mode

Pass a CSS selector to `dark-theme-setup()`. Toggle the class on `<html>` from your app code.

```scss
@use 'index' as estela;

@include estela.light-theme-setup();
@include estela.dark-theme-setup('.dark-theme');
```

```ts
// Toggle dark mode
document.documentElement.classList.toggle('dark-theme');
```

---

## What the theme applies

| Token group | Value |
|---|---|
| Brand primary | `#00b5cc` (cyan) |
| Brand tertiary | `#4255ff` (indigo) |
| Border radius | `4px` on all components |
| Elevation (level 1) | `none` — surfaces use border, not shadow |
| Elevation (level 2–5) | preserved — menus, dialogs, snackbars |
| Letter-spacing | `0` on all type roles |

---

## Semantic color tokens

M3 does not define warning, success, or info roles natively. Estela exposes them as CSS custom properties:

```css
--estela-warning
--estela-warning-container
--estela-on-warning
--estela-on-warning-container

--estela-success
--estela-success-container
--estela-on-success
--estela-on-success-container

--estela-info
--estela-info-container
--estela-on-info
--estela-on-info-container
```

Error is handled natively by M3 via `--mat-sys-error` and `--mat-sys-error-container`.

Usage example:

```scss
.alert--success {
  background-color: var(--estela-success-container);
  color: var(--estela-on-success-container);
}
```

---

## Advanced usage

For custom selectors or fine-grained control, use the low-level mixins directly.
Call `light-brand-overrides()` in a **separate selector block** placed after `light-theme()` — this is required for brand colors to win the CSS cascade.

```scss
@use 'node_modules/estela/src/index' as estela;

// Block 1 — mat.theme() output
.my-shell { @include estela.light-theme(); }

// Block 2 — brand overrides (must come after)
.my-shell { @include estela.light-brand-overrides(); }
```

---

## Available mixins

| Mixin | Description |
|---|---|
| `light-theme-setup($selector?)` | Recommended. Applies full light theme. Default selector: `html` |
| `dark-theme-setup($selector?)` | Recommended. Applies full dark theme. Default selector: `.dark-theme` |
| `light-theme()` | Base light theme only (no brand overrides) |
| `dark-theme()` | Base dark theme only (no brand overrides) |
| `light-brand-overrides()` | Brand color overrides — use in a separate block after `light-theme()` |
| `dark-brand-overrides()` | Brand color overrides — use in a separate block after `dark-theme()` |
