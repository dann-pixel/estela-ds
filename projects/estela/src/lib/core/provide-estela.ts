import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ESTELA_CONFIG, ESTELA_DEFAULT_CONFIG, EstelaConfig } from './estela-config';

/**
 * Configuración base del DS Estela para una app Angular.
 *
 * - `<mat-icon>` usa Material Symbols Outlined por defecto
 * - MAT_DATE_LOCALE en español (es-CL por defecto)
 * - Config de ThemeService (clase dark y key de localStorage)
 *
 * Es liviano a propósito: los textos en español de Paginator, Datepicker y
 * Stepper van en providers aparte (entry point `estela-angular/intl`) porque importarlos
 * arrastra esos módulos de Material al bundle inicial.
 *
 * No provee un DateAdapter: agregar `provideNativeDateAdapter()` (o el de
 * date-fns / Luxon) si se usa mat-datepicker.
 *
 * @example
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideEstela()],
 * };
 */
export function provideEstela(config: Partial<EstelaConfig> = {}): EnvironmentProviders {
  const resolved: EstelaConfig = { ...ESTELA_DEFAULT_CONFIG, ...config };

  return makeEnvironmentProviders([
    { provide: ESTELA_CONFIG, useValue: resolved },
    { provide: MAT_DATE_LOCALE, useValue: resolved.dateLocale },
    provideAppInitializer(() => {
      inject(MatIconRegistry).setDefaultFontSetClass('material-symbols-outlined');
    }),
  ]);
}
