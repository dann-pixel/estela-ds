import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

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
  value: string;
  description: string;
}

@Component({
  selector: 'app-getting-started',
  standalone: true,
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
  readonly steps: Step[] = [
    {
      number: 1,
      title: 'Instala la librería',
      description: 'Instala el paquete directamente desde el repositorio de GitHub.',
    },
    {
      number: 2,
      title: 'Configura angular.json',
      description: 'Agrega el path de SCSS al compilador para que Angular resuelva los imports del DS.',
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
      description: 'Todos los componentes usan border-radius 4px. El DS zeroa los corner tokens de M3.',
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

  readonly colorTokens: Token[] = [
    { name: '--mat-sys-primary', value: '#00b5cc', description: 'Color principal del DS' },
    { name: '--mat-sys-secondary', value: '#4255ff', description: 'Color secundario / acento' },
    { name: '--mat-sys-error', value: '#b91c1c', description: 'Error / destructivo' },
    { name: '--estela-success', value: '#15803d', description: 'Estado éxito' },
    { name: '--estela-warning', value: '#c2410c', description: 'Estado advertencia' },
    { name: '--estela-info', value: '#0284c7', description: 'Estado informativo' },
    { name: '--mat-sys-background', value: '#F7F9FC', description: 'Fondo de app (Blue Gray 50)' },
    { name: '--mat-sys-surface', value: '#ffffff', description: 'Fondo de cards y contenedores' },
    { name: '--mat-sys-on-surface', value: '#1a2332', description: 'Texto principal' },
    { name: '--mat-sys-outline-variant', value: '#cfd8dc', description: 'Bordes y divisores' },
  ];
}
