import { Component, inject, viewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ESTELA_VERSION, ThemeService } from 'estela-angular';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly sidenav = viewChild.required<MatSidenav>('sidenav');

  readonly theme = inject(ThemeService);
  readonly version = ESTELA_VERSION;

  private readonly bp = inject(BreakpointObserver);

  // Emite true cuando la pantalla es ≤ 768px (mobile / tablet portrait)
  readonly isMobile = toSignal(
    this.bp.observe('(max-width: 768px)').pipe(map((r) => r.matches)),
    { initialValue: false }
  );

  readonly navItems: NavItem[] = [
    { label: 'Getting Started', route: '/getting-started', icon: 'rocket_launch' },
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Buttons', route: '/buttons', icon: 'smart_button' },
    { label: 'Forms', route: '/forms', icon: 'dynamic_form' },
    { label: 'Navigation', route: '/navigation', icon: 'navigation' },
    { label: 'Content', route: '/content', icon: 'dashboard' },
    { label: 'Tables', route: '/tables', icon: 'table' },
    { label: 'Solicitudes', route: '/solicitudes', icon: 'assignment' },
    { label: 'Patterns', route: '/patterns', icon: 'widgets' },
    { label: 'Changelog', route: '/changelog', icon: 'history' },
  ];

  /** Cierra el drawer overlay al navegar en mobile */
  closeIfMobile(): void {
    if (this.isMobile()) this.sidenav().close();
  }
}
