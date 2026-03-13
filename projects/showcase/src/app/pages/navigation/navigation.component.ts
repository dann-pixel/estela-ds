import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule, MatBottomSheet } from '@angular/material/bottom-sheet';

// ── Bottom Sheet demo component ────────────────────────────────────────────
@Component({
  selector: 'app-demo-bottom-sheet',
  standalone: true,
  imports: [MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      <a mat-list-item (click)="close()">
        <mat-icon matListItemIcon>share</mat-icon>
        <span matListItemTitle>Compartir</span>
      </a>
      <a mat-list-item (click)="close()">
        <mat-icon matListItemIcon>link</mat-icon>
        <span matListItemTitle>Copiar enlace</span>
      </a>
      <a mat-list-item (click)="close()">
        <mat-icon matListItemIcon>edit</mat-icon>
        <span matListItemTitle>Editar nombre</span>
      </a>
      <a mat-list-item (click)="close()">
        <mat-icon matListItemIcon>delete</mat-icon>
        <span matListItemTitle>Eliminar</span>
      </a>
    </mat-nav-list>
  `,
})
export class DemoBottomSheetComponent {
  private readonly ref = inject(MatBottomSheet);
  close() { this.ref.dismiss(); }
}

// ── Main component ─────────────────────────────────────────────────────────
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatTabsModule,
    MatChipsModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatListModule,
    MatBottomSheetModule,
  ],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  private readonly bottomSheet = inject(MatBottomSheet);

  readonly tabs = ['Dashboard', 'Analytics', 'Reports', 'Settings'];

  readonly filterChips = ['All', 'Active', 'Paused', 'Draft', 'Archived'];
  selectedFilter = 'All';

  readonly actionChips = ['Add to cart', 'Save for later', 'Share', 'Compare'];

  progressValue = 65;

  readonly listItems = [
    { icon: 'inbox', label: 'Inbox', desc: '15 mensajes sin leer' },
    { icon: 'send', label: 'Enviados', desc: '128 mensajes' },
    { icon: 'drafts', label: 'Borradores', desc: '3 borradores' },
  ];

  readonly navListItems = [
    { icon: 'home', label: 'Dashboard' },
    { icon: 'analytics', label: 'Analytics' },
    { icon: 'settings', label: 'Configuración' },
    { icon: 'help', label: 'Ayuda y soporte' },
  ];

  openBottomSheet(): void {
    this.bottomSheet.open(DemoBottomSheetComponent);
  }
}
