/*
 * Public API Surface of estela-angular
 *
 * El tema se importa desde SCSS (no desde acá):
 *   @use 'estela-angular/theme' as estela;
 *   @include estela.light-theme-setup();
 */

export const ESTELA_VERSION = '1.1.0';

export * from './lib/core/estela-config';
export * from './lib/core/provide-estela';
export * from './lib/core/theme.service';
