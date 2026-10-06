# estela-angular

Estela Design System for Angular Material 20 (M3): theme, utility classes, `ThemeService` and Spanish i18n.

```scss
// styles.scss
@use 'estela-angular/theme' as estela;

@include estela.light-theme-setup();
@include estela.dark-theme-setup();   // optional
@include estela.global-styles();
```

```ts
// app.config.ts
import { provideEstela } from 'estela-angular';
import { provideEstelaIntl } from 'estela-angular/intl';

providers: [provideEstela(), provideEstelaIntl()]
```

| Entry point | Contents |
|---|---|
| `estela-angular/theme` (SCSS) | `light-theme-setup()`, `dark-theme-setup()`, `global-styles()`, palette variables |
| `estela-angular` | `provideEstela()`, `ThemeService`, `ESTELA_CONFIG`, `ESTELA_VERSION` |
| `estela-angular/intl` | `provideEstelaIntl()` and per-component `provideEstela{Paginator,Datepicker,Stepper}Intl()` |

Full documentation: see the README at the root of the `estela-ds-angular` repository and the showcase's *Getting Started* page.
