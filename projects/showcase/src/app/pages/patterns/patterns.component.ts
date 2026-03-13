import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface BreadcrumbItem {
  label: string;
  route?: string;
}

@Component({
  selector: 'app-patterns',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './patterns.component.html',
  styleUrl: './patterns.component.scss',
})
export class PatternsComponent {
  readonly basicCrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Proyectos', route: '/content' },
    { label: 'Project Alpha' },
  ];

  readonly deepCrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Administración', route: '/content' },
    { label: 'Usuarios', route: '/content' },
    { label: 'Perfiles', route: '/content' },
    { label: 'Juan García' },
  ];
}
