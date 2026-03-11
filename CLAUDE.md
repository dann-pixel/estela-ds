# Estela Design System — CLAUDE.md

## Descripción del proyecto

Sistema de diseño corporativo basado en **Angular Material v19 (Material Design 3)**. Monorepo con dos proyectos:

- **`projects/estela/`** — Angular Library distribuible (el tema + futuras componentes)
- **`projects/showcase/`** — App Angular de showroom (demo visual de los componentes)

---

## Comandos esenciales

Todos los comandos se ejecutan desde `estela-ds/`:

```bash
npm start              # Levanta el showcase en http://localhost:4200
npm run build:lib      # Compila solo la librería (dist/estela/)
npm run build:showcase # Compila solo el showcase (dist/showcase/)
npm run build          # Compila librería + showcase en secuencia
```

---

## Estructura del proyecto

```
estela-ds/
├── projects/
│   ├── estela/                          # Angular Library
│   │   ├── src/
│   │   │   ├── lib/theme/
│   │   │   │   ├── _palette.scss        # Paletas de color (reemplazar con brand Estela)
│   │   │   │   ├── _typography.scss     # Fuente tipográfica
│   │   │   │   └── _theme.scss          # Mixins light-theme() y dark-theme()
│   │   │   ├── index.scss               # Barrel SCSS (@forward lib/theme)
│   │   │   └── public-api.ts            # API TypeScript pública
│   │   ├── ng-package.json              # Configuración ng-packagr (incluye assets SCSS)
│   │   └── package.json                 # peerDeps: @angular/material, @angular/cdk
│   │
│   └── showcase/                        # Angular App (showroom)
│       └── src/
│           ├── app/
│           │   ├── app.component.*      # Shell: sidenav + router-outlet
│           │   ├── app.routes.ts        # Rutas lazy-loaded
│           │   └── pages/
│           │       ├── home/            # Paleta de colores + escala tipográfica
│           │       ├── buttons/         # Botones: Text, Filled, Outlined, Elevated, Icon
│           │       ├── forms/           # Input, Select, Checkbox, Radio, Slider, Slide Toggle
│           │       ├── navigation/      # Toolbar, Tabs, Chips, Badge, Progress Bar, Progress Spinner
│           │       └── content/         # Cards, Table, Dialog, Snack Bar, Expansion Panel, Alerts
│           ├── styles.scss              # Aplica el tema + estilos globales del showcase
│           └── index.html
├── angular.json                         # stylePreprocessorOptions apunta a projects/estela/src
├── package.json
└── tsconfig.json
```

---

## Convenciones de código

### Angular
- Usar **standalone components** (no NgModules)
- Importar solo los módulos de Material necesarios en cada componente
- Lazy loading en todas las rutas del showcase
- Señales (`signal`, `computed`) preferibles sobre `BehaviorSubject` para estado local

### SCSS / Tema
- Los **tokens de color** se acceden como CSS custom properties: `var(--mat-sys-primary)`, `var(--mat-sys-on-surface)`, etc.
- **No usar** colores hardcodeados; siempre usar variables del sistema de diseño
- Los mixins del tema son `light-theme()` y `dark-theme()` en `projects/estela/src/lib/theme/_theme.scss`
- El showcase importa el tema con `@use 'index' as estela` (resuelto por `stylePreprocessorOptions.includePaths`)

### Componentes del showcase
Cada página de showroom sigue este patrón:

```html
<div class="showcase-page">
  <div class="page-header">
    <h1>Nombre del componente</h1>
    <p>Descripción breve.</p>
    <a mat-stroked-button href="URL_DOCS" target="_blank">Angular Material Docs</a>
  </div>
  <div class="sections">
    <mat-card class="section-card" appearance="outlined">
      <mat-card-header>
        <mat-card-title>Variante</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="demo-label">LABEL</p>
        <div class="demo-row"><!-- ejemplos --></div>
      </mat-card-content>
    </mat-card>
  </div>
</div>
```

Las clases de layout (`showcase-page`, `page-header`, `sections`, `section-card`, `demo-row`, `demo-col`, `demo-label`, `form-row`, `spacer`) están definidas en `projects/showcase/src/styles.scss`.

---

## Cómo personalizar el tema

### Cambiar colores
Editar `projects/estela/src/lib/theme/_palette.scss`:

```scss
// Paletas base M3 — elegir la más cercana al color de marca
$estela-primary:  mat.$cyan-palette;   // ← cambiar por la paleta AM más cercana
$estela-tertiary: mat.$violet-palette; // ← cambiar por la paleta AM más cercana

// Luego ajustar los tokens exactos de la marca:
$brand-primary:            #00b5cc;   // ← color exacto del DS
$brand-primary-container:  #bfecf2;
// ... etc.
```

Angular Material v19 provee estas paletas predefinidas (único formato válido para `mat.theme()`):
`mat.$red-palette`, `mat.$green-palette`, `mat.$blue-palette`, `mat.$yellow-palette`,
`mat.$cyan-palette`, `mat.$magenta-palette`, `mat.$orange-palette`, `mat.$chartreuse-palette`,
`mat.$spring-green-palette`, `mat.$azure-palette`, `mat.$violet-palette`, `mat.$rose-palette`

**Estrategia de color**: se usa la paleta AM más cercana como base M3 (genera correctamente neutrals,
surfaces y elevation tokens), y luego se sobreescriben los tokens exactos de la marca con variables
SCSS en `_palette.scss`. Los overrides se aplican en `_theme.scss` vía `_brand-colors()` mixin.

### Letter-spacing (tracking)
M3 define `tracking` en cada rol tipográfico. El DS Estela usa **letter-spacing: 0** en todos
los componentes. Los 15 tokens `--mat-sys-*-tracking` se zeroan en `_typography-tokens()` de
`_theme.scss`. Afecta: botones (label-large), inputs (body-large, title-medium), chips
(label-small), tabs (title-small), toolbar, cards, etc.

### Shape (border radius)
El DS Estela usa **4px en todos los componentes**. Se controla sobreescribiendo todos los tokens
`--mat-sys-corner-*` de M3 en el mixin privado `_shape-tokens()` de `_theme.scss`.
No se modifica `--mat-sys-corner-none` (permanece en 0 por diseño).

### Elevation
El DS Estela **no usa sombras en componentes de superficie** (cards, buttons elevated, navigation bar).
Solo se preserva la elevación para elementos genuinamente en capa superior:

| Nivel | Estado | Usos |
|---|---|---|
| `--mat-sys-level1` | `none` ← zeroed | Cards elevated, botones elevated, nav bar |
| `--mat-sys-level2` | preservado | Menus, Select panels, Autocomplete |
| `--mat-sys-level3` | preservado | Dialogs, Snackbars, Bottom sheets |
| `--mat-sys-level4-5` | preservados | Navigation drawer open, capas extremas |

Los tokens se anulan en `_elevation-tokens()` en `_theme.scss`.

### Cambiar tipografía
Editar `projects/estela/src/lib/theme/_typography.scss`:

```scss
$estela-brand-family: Outfit;           // ← fuente para headings (sin comillas)
$estela-plain-family: 'Instrument Sans'; // ← fuente para body/labels (con comillas si tiene espacio)
```

**Importante:**
- `$estela-brand-family` debe ser un identificador SCSS sin comillas (fuentes sin espacios en el nombre)
- `$estela-plain-family` puede llevar comillas si el nombre de la fuente tiene espacios
- `mat.theme()` recibe ambas a través de un mapa `typography: (brand-family, plain-family)`
- Actualizar también los `<link>` de Google Fonts en `index.html` del proyecto consumidor
- Luego en `styles.scss` aplicar explícitamente: `body { font-family: var(--mat-sys-body-large-font), sans-serif; }` y `h1-h6 { font-family: var(--mat-sys-headline-large-font), sans-serif; }`

### Aplicar el tema (uso recomendado)
En el `styles.scss` del proyecto consumidor, llamar los mixins de setup **a nivel raíz** (no dentro de ningún selector):

```scss
@use 'index' as estela;

// Tema claro (requerido)
@include estela.light-theme-setup();

// Tema oscuro (opcional)
// @include estela.dark-theme-setup('.dark-theme');
```

**Por qué `light-theme-setup()` y no `light-theme()` directamente:**
Angular Material v19 difiere parte de su output CSS al cerrar el scope del selector. Si se llama
`light-theme()` dentro de `html { }`, los brand color overrides quedan en un bloque CSS anterior
al bloque que genera `mat.theme()`, y pierden en la cascada. Los mixins `*-setup()` emiten dos
bloques separados garantizando el orden correcto.

**Uso avanzado** (selector custom o dark mode condicional):
```scss
html { @include estela.light-theme(); }
html { @include estela.light-brand-overrides(); }   // ← bloque separado, SIEMPRE después

.dark-theme { @include estela.dark-theme(); }
.dark-theme { @include estela.dark-brand-overrides(); }
```

---

## Cómo agregar una nueva página al showcase

1. Crear la carpeta y archivos del componente en `projects/showcase/src/app/pages/<nombre>/`
2. Registrar la ruta lazy en `app.routes.ts`
3. Agregar el ítem en el array `navItems` de `app.component.ts`

---

## Distribución de la librería

Los consumidores instalan el tema así:

```bash
npm install git+https://github.com/<org>/estela-ds.git
```

Y en su `styles.scss`:

```scss
@use 'node_modules/estela/src/lib/theme' as estela;
@include estela.light-theme-setup();
```

O bien, agregar a `angular.json`:

```json
"stylePreprocessorOptions": {
  "includePaths": ["node_modules/estela/src"]
}
```

Y luego importar simplemente:

```scss
@use 'index' as estela;
@include estela.light-theme-setup();
```

---

## Columnas sticky en mat-table

Angular Material v19 soporta columnas fijas (sticky) de forma nativa en `mat-table`.
No requiere librerías externas ni implementación custom.

### Sticky izquierda (`[sticky]`)
Fija la columna al borde izquierdo del scroll. Útil para columnas de identificador.

```html
<ng-container matColumnDef="numero" [sticky]="true">
  <th mat-header-cell *matHeaderCellDef>N°</th>
  <td mat-cell *matCellDef="let row">{{ row.numero }}</td>
</ng-container>
```

### Sticky derecha (`[stickyEnd]`)
Fija la columna al borde derecho del scroll. Útil para columnas de acciones.

```html
<ng-container matColumnDef="acciones" stickyEnd>
  <th mat-header-cell *matHeaderCellDef>Acciones</th>
  <td mat-cell *matCellDef="let row">
    <button mat-button>Ver detalle</button>
  </td>
</ng-container>
```

> ⚠️ Usar como atributo booleano (`stickyEnd`, `sticky`), nunca como property binding
> (`[stickyEnd]="true"`). El binding rompe el registro del `matColumnDef` en Angular Material v19.

### Requisitos para que funcione

1. **Wrapper con scroll horizontal** — el contenedor de la tabla debe tener `overflow-x: auto`
2. **Tabla con min-width** — para que la tabla desborde y el sticky sea visible:
   ```scss
   .table-wrapper {
     overflow-x: auto;
     table { min-width: 900px; }
   }
   ```
3. **Fondo explícito en la columna sticky** — AM aplica `position: sticky` automáticamente,
   pero el `background` debe ser explícito para tapar el contenido que se desplaza debajo:
   ```scss
   th.mat-column-acciones,
   td.mat-column-acciones {
     background: var(--mat-sys-surface);
     border-left: 1px solid var(--mat-sys-outline-variant); // separador visual opcional
   }
   ```

> AM agrega la clase `.mat-column-<columnDef>` a cada `th` y `td`, lo que permite estilar
> columnas específicas desde SCSS sin tocar el HTML.

---

## Versiones clave

| Paquete | Versión |
|---|---|
| Angular | 19.2 |
| Angular Material / CDK | 19.2 |
| TypeScript | ~5.7 |
| Node.js requerido | ≥ 20 |

---

---

## Best Practices & Recommendations

### Documentación oficial
- **Siempre usar v19**: https://v19.material.angular.dev/ (NO material.angular.io que es versión anterior)
- Consultar primero los ejemplos y patrones recomendados antes de implementar componentes
- Verificar M3 tokens y propiedades de accesibilidad

### Componentes disponibles en v19 M3
El showcase implementa estos componentes por categoría:

**Buttons & Indicators**
- Button (5 variantes: Text, Outlined, Filled, Elevated, Tonal)
- Icon Button (estándar, outlined, filled, tonal)

**Form Controls**
- Text Input (fill, outline)
- Select
- Checkbox
- Radio Button
- Slider
- Slide Toggle

**Navigation**
- Toolbar
- Tabs
- Chips (filter, choice, input, suggestion)
- Badge
- Progress Bar / Progress Spinner

**Content & Data**
- Card (elevated, outlined, filled appearances)
- Table (con Sort y Paginator)
- Dialog / Modal
- Snack Bar
- Expansion Panel

**Semantic Alerts**
- Info (usando `--mat-sys-primary-container`)
- Success (usando `--estela-success-container`)
- Warning (usando `--estela-warning-container`)
- Error (usando `--mat-sys-error-container`)

### Temas permitidos en M3
Angular Material v19 soporta light y dark theme. El proyecto implementa ambos:
- `light-theme()` - tema claro (aplicado por defecto)
- `dark-theme()` - tema oscuro (disponible para @media (prefers-color-scheme: dark))

### Nuevas características de v19
- M3 typography hierarchy completamente integrado
- CSS custom properties como `--mat-sys-*` para todos los tokens
- Standalone components como estándar (sin NgModules)
- Mejor soporte para responsive design
- Improved accessibility (WCAG 2.1 Level AA)
