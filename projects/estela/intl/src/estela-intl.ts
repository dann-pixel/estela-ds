import { Injectable, Provider } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatStepperIntl } from '@angular/material/stepper';

/** Textos del paginador en español. */
@Injectable()
export class EstelaPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) return `0 de ${length}`;
    const start = page * pageSize;
    const end = Math.min(start + pageSize, length);
    return `${start + 1} – ${end} de ${length}`;
  };
}

/** Textos (aria-labels) del datepicker en español. */
@Injectable()
export class EstelaDatepickerIntl extends MatDatepickerIntl {
  override calendarLabel = 'Calendario';
  override openCalendarLabel = 'Abrir calendario';
  override closeCalendarLabel = 'Cerrar calendario';
  override prevMonthLabel = 'Mes anterior';
  override nextMonthLabel = 'Mes siguiente';
  override prevYearLabel = 'Año anterior';
  override nextYearLabel = 'Año siguiente';
  override prevMultiYearLabel = '24 años anteriores';
  override nextMultiYearLabel = '24 años siguientes';
  override switchToMonthViewLabel = 'Elegir fecha';
  override switchToMultiYearViewLabel = 'Elegir mes y año';
  override startDateLabel = 'Fecha de inicio';
  override endDateLabel = 'Fecha de término';
}

/** Textos del stepper en español. */
@Injectable()
export class EstelaStepperIntl extends MatStepperIntl {
  override optionalLabel = 'Opcional';
  override completedLabel = 'Completado';
  override editableLabel = 'Editable';
}

// -------------------------------------------------------------------------
// Providers
// -------------------------------------------------------------------------
// Cada uno importa el módulo de Material correspondiente. Registrarlos en
// app.config.ts los suma al bundle inicial; si esos componentes solo se usan
// en rutas lazy, registrarlos en los `providers` de esos componentes.

/** Paginator en español. */
export function provideEstelaPaginatorIntl(): Provider {
  return { provide: MatPaginatorIntl, useClass: EstelaPaginatorIntl };
}

/** Datepicker en español (aria-labels). El formato de fecha lo define MAT_DATE_LOCALE. */
export function provideEstelaDatepickerIntl(): Provider {
  return { provide: MatDatepickerIntl, useClass: EstelaDatepickerIntl };
}

/** Stepper en español. */
export function provideEstelaStepperIntl(): Provider {
  return { provide: MatStepperIntl, useClass: EstelaStepperIntl };
}

/** Paginator + Datepicker + Stepper en español. */
export function provideEstelaIntl(): Provider[] {
  return [provideEstelaPaginatorIntl(), provideEstelaDatepickerIntl(), provideEstelaStepperIntl()];
}
