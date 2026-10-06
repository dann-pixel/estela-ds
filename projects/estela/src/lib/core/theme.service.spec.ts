import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/core';
import { ThemeService } from './theme.service';
import { provideEstela } from './provide-estela';

describe('ThemeService', () => {
  let html: HTMLElement;

  beforeEach(() => {
    localStorage.removeItem('estela-theme');
    localStorage.removeItem('custom-key');
  });

  afterEach(() => {
    html?.classList.remove('dark-theme', 'my-dark');
  });

  function create(saved?: 'dark' | 'light', providers: unknown[] = []) {
    if (saved) localStorage.setItem('estela-theme', saved);
    TestBed.configureTestingModule({ providers: providers as never[] });
    html = TestBed.inject(DOCUMENT).documentElement;
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    return service;
  }

  it('respeta la preferencia guardada (dark)', () => {
    const service = create('dark');
    expect(service.isDark()).toBeTrue();
    expect(html.classList.contains('dark-theme')).toBeTrue();
  });

  it('respeta la preferencia guardada (light)', () => {
    const service = create('light');
    expect(service.isDark()).toBeFalse();
    expect(html.classList.contains('dark-theme')).toBeFalse();
  });

  it('toggle() alterna la clase y persiste la preferencia', () => {
    const service = create('light');
    service.toggle();
    TestBed.tick();
    expect(html.classList.contains('dark-theme')).toBeTrue();
    expect(localStorage.getItem('estela-theme')).toBe('dark');
    expect(service.icon()).toBe('light_mode');
  });

  it('usa la clase y la key configuradas en provideEstela()', () => {
    const service = create(undefined, [provideEstela({ darkThemeClass: 'my-dark', storageKey: 'custom-key' })]);
    if (service.isDark()) service.toggle();
    service.toggle();
    TestBed.tick();
    expect(html.classList.contains('my-dark')).toBeTrue();
    expect(localStorage.getItem('custom-key')).toBe('dark');
  });
});
