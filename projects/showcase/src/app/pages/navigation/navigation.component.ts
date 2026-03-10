import { Component } from '@angular/core';
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
  ],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  readonly tabs = ['Dashboard', 'Analytics', 'Reports', 'Settings'];

  readonly filterChips = ['All', 'Active', 'Paused', 'Draft', 'Archived'];
  selectedFilter = 'All';

  readonly actionChips = ['Add to cart', 'Save for later', 'Share', 'Compare'];

  progressValue = 65;
}
