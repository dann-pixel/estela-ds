import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'buttons',
    loadComponent: () =>
      import('./pages/buttons/buttons.component').then(
        (m) => m.ButtonsComponent
      ),
  },
  {
    path: 'forms',
    loadComponent: () =>
      import('./pages/forms/forms.component').then((m) => m.FormsComponent),
  },
  {
    path: 'navigation',
    loadComponent: () =>
      import('./pages/navigation/navigation.component').then(
        (m) => m.NavigationComponent
      ),
  },
  {
    path: 'content',
    loadComponent: () =>
      import('./pages/content/content.component').then(
        (m) => m.ContentComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
