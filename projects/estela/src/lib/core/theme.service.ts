import { Injectable, inject, signal, computed, effect, DOCUMENT } from '@angular/core';
import { ESTELA_CONFIG } from './estela-config';

/**
 * ThemeService — gestiona el cambio entre light y dark mode.
 *
 * Lógica de inicialización (en orden de prioridad):
 *   1. Preferencia guardada en localStorage (`estela-theme`: 'light' | 'dark')
 *   2. Preferencia del OS (prefers-color-scheme: dark)
 *   3. Fallback: light
 *
 * Aplica/quita la clase `.dark-theme` en <html>, que activa los tokens
 * generados por `dark-theme-setup()`.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly config = inject(ESTELA_CONFIG);

  readonly isDark = signal<boolean>(this.resolveInitialTheme());

  readonly icon    = computed(() => this.isDark() ? 'light_mode'           : 'dark_mode');
  readonly tooltip = computed(() => this.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');

  constructor() {
    // Sincroniza la clase en <html> y persiste la preferencia
    effect(() => {
      const dark = this.isDark();
      this.doc.documentElement.classList.toggle(this.config.darkThemeClass, dark);
      this.storage()?.setItem(this.config.storageKey, dark ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.isDark.update((v) => !v);
  }

  private resolveInitialTheme(): boolean {
    const saved = this.storage()?.getItem(this.config.storageKey);
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    // Sin preferencia guardada → respetar preferencia del OS
    return this.doc.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  /** localStorage puede no existir (SSR) o lanzar (modo privado / storage bloqueado). */
  private storage(): Storage | null {
    try {
      return this.doc.defaultView?.localStorage ?? null;
    } catch {
      return null;
    }
  }
}
