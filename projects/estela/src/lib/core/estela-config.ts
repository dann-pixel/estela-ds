import { InjectionToken } from '@angular/core';

export interface EstelaConfig {
  /** Clase que activa el tema oscuro en <html>. Debe coincidir con el selector de `dark-theme-setup()`. */
  darkThemeClass: string;
  /** Key de localStorage donde se persiste la preferencia de tema. */
  storageKey: string;
  /** Locale para MAT_DATE_LOCALE (datepicker). */
  dateLocale: string;
}

export const ESTELA_DEFAULT_CONFIG: EstelaConfig = {
  darkThemeClass: 'dark-theme',
  storageKey: 'estela-theme',
  dateLocale: 'es-CL',
};

export const ESTELA_CONFIG = new InjectionToken<EstelaConfig>('ESTELA_CONFIG', {
  providedIn: 'root',
  factory: () => ESTELA_DEFAULT_CONFIG,
});
