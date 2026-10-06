import { TestBed } from '@angular/core/testing';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideEstela } from 'estela-angular';
import { EstelaPaginatorIntl, provideEstelaIntl } from './estela-intl';

describe('EstelaPaginatorIntl', () => {
  const intl = new EstelaPaginatorIntl();

  it('formatea el rango en español', () => {
    expect(intl.getRangeLabel(0, 5, 12)).toBe('1 – 5 de 12');
    expect(intl.getRangeLabel(2, 5, 12)).toBe('11 – 12 de 12');
    expect(intl.getRangeLabel(0, 5, 0)).toBe('0 de 0');
  });
});

describe('provideEstela / provideEstelaIntl', () => {
  it('registra el locale por defecto', () => {
    TestBed.configureTestingModule({ providers: [provideEstela()] });
    expect(TestBed.inject(MAT_DATE_LOCALE)).toBe('es-CL');
  });

  it('provideEstelaIntl() registra los textos en español', () => {
    TestBed.configureTestingModule({ providers: [provideEstelaIntl()] });
    expect(TestBed.inject(MatPaginatorIntl).itemsPerPageLabel).toBe('Elementos por página');
  });

  it('permite cambiar el locale', () => {
    TestBed.configureTestingModule({ providers: [provideEstela({ dateLocale: 'es-AR' })] });
    expect(TestBed.inject(MAT_DATE_LOCALE)).toBe('es-AR');
  });
});
