import { Component, DOCUMENT, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { ESTELA_VERSION, ThemeService } from 'estela-angular';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Token {
  name: string;
  description: string;
}

// Los valores no se escriben a mano: se leen del CSS aplicado (ver colorTokens),
// así la tabla nunca queda desfasada respecto de _palette.scss.
const COLOR_TOKENS: Token[] = [
  { name: '--mat-sys-primary', description: 'Color principal del DS (relleno)' },
  { name: '--estela-primary-on-surface', description: 'Primary como texto/ícono sobre surface (AA)' },
  { name: '--mat-sys-tertiary', description: 'Color de acento' },
  { name: '--mat-sys-error', description: 'Error / destructivo' },
  { name: '--estela-success', description: 'Estado éxito' },
  { name: '--estela-warning', description: 'Estado advertencia' },
  { name: '--estela-info', description: 'Estado informativo' },
  { name: '--mat-sys-background', description: 'Fondo de app (Blue Gray 50)' },
  { name: '--mat-sys-surface', description: 'Fondo de cards y contenedores' },
  { name: '--mat-sys-on-surface', description: 'Texto principal' },
  { name: '--mat-sys-outline-variant', description: 'Bordes y divisores' },
];

@Component({
  selector: 'app-getting-started',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent {
  readonly theme = inject(ThemeService);
  readonly version = ESTELA_VERSION;
  private readonly doc = inject(DOCUMENT);
  readonly steps: Step[] = [
    {
      number: 1,
      title: 'Instala la librería',
      description: 'Instala el paquete estela-angular (tarball o registry privado).',
    },
    {
      number: 2,
      title: 'Registra los providers',
      description: 'provideEstela() configura íconos, locale e intl en español.',
    },
    {
      number: 3,
      title: 'Aplica el tema en styles.scss',
      description: 'Importa el DS y llama al mixin de setup para activar el tema.',
    },
    {
      number: 4,
      title: 'Listo — usa los tokens',
      description: 'Todos los tokens de color, tipografía y forma de M3 estarán disponibles como CSS custom properties.',
    },
  ];

  readonly features: Feature[] = [
    {
      icon: 'palette',
      title: 'M3 Theming',
      description: 'Basado en Material Design 3. Usa mat.theme() con tokens CSS custom properties (--mat-sys-*).',
    },
    {
      icon: 'color_lens',
      title: 'Paleta Blue Gray',
      description: 'Grises neutrales reemplazados por la paleta Blue Gray (50–900), más cálida y de marca.',
    },
    {
      icon: 'text_fields',
      title: 'Tipografía dual',
      description: 'Outfit para headings (brand-family) e Instrument Sans para cuerpo y labels (plain-family).',
    },
    {
      icon: 'crop_square',
      title: 'Bordes 4px',
      description: 'Todos los componentes usan border-radius 4px (los corner tokens de M3 se fijan en 4px). Switch, slider, badge y avatar se mantienen circulares.',
    },
    {
      icon: 'layers_clear',
      title: 'Sin sombras en superficie',
      description: 'Cards y botones elevados no tienen shadow. Solo se preserva elevación para dialogs y menús.',
    },
    {
      icon: 'format_size',
      title: 'Letter-spacing cero',
      description: 'Los 15 tokens de tracking de M3 están zeroeados. Sin espaciado extra en letras.',
    },
    {
      icon: 'smart_button',
      title: '7 colores de botón',
      description: 'Primary, Secondary, Error, Success, Warning, Info y Dark. Cada uno con Filled, Tonal y Text.',
    },
    {
      icon: 'label',
      title: 'Chips semánticos',
      description: '5 estados de status: No Iniciado, En Progreso, Completado, Cancelado, En Implementación.',
    },
    {
      icon: 'input',
      title: 'Form field condensed',
      description: 'Variante .form-field-sm de 40px — igual de alto que un botón, ideal para barras de filtro.',
    },
    {
      icon: 'dark_mode',
      title: 'Dark mode nativo',
      description: 'dark-theme-setup() genera todos los tokens dark. ThemeService aplica la clase en <html>. Cero cambios en los componentes.',
    },
    {
      icon: 'phone_android',
      title: 'Mobile responsive',
      description: 'Shell con BreakpointObserver: sidenav overlay en mobile, toolbar con hamburger, paddings adaptativos.',
    },
  ];

  /** Valores actuales de los tokens; se recalculan al cambiar de tema. */
  readonly colorTokens = computed(() => {
    this.theme.isDark();
    const style = getComputedStyle(this.doc.documentElement);
    return COLOR_TOKENS.map((t) => ({ ...t, value: style.getPropertyValue(t.name).trim() }));
  });
}
