import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * ThemeService — gestiona el cambio entre light y dark mode.
 *
 * Lógica de inicialización (en orden de prioridad):
 *   1. Preferencia guardada en localStorage ('estela-theme': 'light' | 'dark')
 *   2. Preferencia del OS (prefers-color-scheme: dark)
 *   3. Fallback: light
 *
 * El service aplica/quita la clase `.dark-theme` en <html>, que activa
 * el mixin dark-theme-setup() definido en styles.scss del showcase.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  readonly isDark = signal<boolean>(this.resolveInitialTheme());

  readonly icon    = computed(() => this.isDark() ? 'light_mode'           : 'dark_mode');
  readonly tooltip = computed(() => this.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');

  constructor() {
    // Sincroniza la clase en <html> y persiste en localStorage
    effect(() => {
      const dark = this.isDark();
      this.doc.documentElement.classList.toggle('dark-theme', dark);
      localStorage.setItem('estela-theme', dark ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.isDark.update((v) => !v);
  }

  private resolveInitialTheme(): boolean {
    const saved = localStorage.getItem('estela-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    // Sin preferencia guardada → respetar preferencia del OS
    return this.doc.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
  }
}
