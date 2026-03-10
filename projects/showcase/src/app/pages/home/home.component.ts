import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface ColorToken {
  name: string;
  var: string;
  onVar: string;
}

interface QuickLink {
  label: string;
  description: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly colorTokens: ColorToken[] = [
    { name: 'Primary', var: '--mat-sys-primary', onVar: '--mat-sys-on-primary' },
    { name: 'Primary Container', var: '--mat-sys-primary-container', onVar: '--mat-sys-on-primary-container' },
    { name: 'Secondary', var: '--mat-sys-secondary', onVar: '--mat-sys-on-secondary' },
    { name: 'Secondary Container', var: '--mat-sys-secondary-container', onVar: '--mat-sys-on-secondary-container' },
    { name: 'Tertiary', var: '--mat-sys-tertiary', onVar: '--mat-sys-on-tertiary' },
    { name: 'Tertiary Container', var: '--mat-sys-tertiary-container', onVar: '--mat-sys-on-tertiary-container' },
    { name: 'Error', var: '--mat-sys-error', onVar: '--mat-sys-on-error' },
    { name: 'Surface', var: '--mat-sys-surface', onVar: '--mat-sys-on-surface' },
    { name: 'Surface Variant', var: '--mat-sys-surface-variant', onVar: '--mat-sys-on-surface-variant' },
    { name: 'Outline', var: '--mat-sys-outline', onVar: '--mat-sys-surface' },
    { name: 'Outline Variant', var: '--mat-sys-outline-variant', onVar: '--mat-sys-on-surface' },
    { name: 'Inverse Surface', var: '--mat-sys-inverse-surface', onVar: '--mat-sys-inverse-on-surface' },
  ];

  readonly quickLinks: QuickLink[] = [
    { label: 'Buttons', description: 'Text, Filled, Outlined, Elevated, Icon', icon: 'smart_button', route: '/buttons' },
    { label: 'Forms', description: 'Input, Select, Checkbox, Radio, Slider, Toggle', icon: 'dynamic_form', route: '/forms' },
    { label: 'Navigation', description: 'Toolbar, Tabs, Chips, Badges, Progress', icon: 'navigation', route: '/navigation' },
    { label: 'Content', description: 'Cards, Table, Dialog, Alerts, Snack Bar, Expansion', icon: 'dashboard', route: '/content' },
  ];

  readonly typeScale = [
    { name: 'Display Large', class: 'mat-display-large', sample: 'Display Large' },
    { name: 'Display Medium', class: 'mat-display-medium', sample: 'Display Medium' },
    { name: 'Display Small', class: 'mat-display-small', sample: 'Display Small' },
    { name: 'Headline Large', class: 'mat-headline-large', sample: 'Headline Large' },
    { name: 'Headline Medium', class: 'mat-headline-medium', sample: 'Headline Medium' },
    { name: 'Headline Small', class: 'mat-headline-small', sample: 'Headline Small' },
    { name: 'Title Large', class: 'mat-title-large', sample: 'Title Large' },
    { name: 'Title Medium', class: 'mat-title-medium', sample: 'Title Medium' },
    { name: 'Title Small', class: 'mat-title-small', sample: 'Title Small' },
    { name: 'Body Large', class: 'mat-body-large', sample: 'Body Large — The quick brown fox jumps over the lazy dog.' },
    { name: 'Body Medium', class: 'mat-body-medium', sample: 'Body Medium — The quick brown fox jumps over the lazy dog.' },
    { name: 'Body Small', class: 'mat-body-small', sample: 'Body Small — The quick brown fox jumps over the lazy dog.' },
    { name: 'Label Large', class: 'mat-label-large', sample: 'Label Large' },
    { name: 'Label Medium', class: 'mat-label-medium', sample: 'Label Medium' },
    { name: 'Label Small', class: 'mat-label-small', sample: 'Label Small' },
  ];
}
