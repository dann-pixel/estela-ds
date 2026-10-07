import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideEstelaStepperIntl } from 'estela-angular/intl';

// ── Dialog component (inline) ──────────────────────────────────
@Component({
  selector: 'app-demo-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div mat-dialog-title class="dialog-header">
      <mat-icon>info</mat-icon>
      <span>Confirm Action</span>
    </div>
    <mat-dialog-content>
      <p>Are you sure you want to proceed? This action cannot be undone.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button [mat-dialog-close]="true" cdkFocusInitial>Confirm</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 8px;
      mat-icon { color: var(--mat-sys-primary); }
    }
  `],
})
export class DemoDialogComponent {}

// ── Main component ─────────────────────────────────────────────
@Component({
  selector: 'app-content',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDividerModule,
    MatChipsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [provideEstelaStepperIntl()],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  readonly panelItems = [
    { title: 'What is Estela Design System?', content: 'Estela is an Angular Material-based design system that provides a consistent theme and component library for building products.' },
    { title: 'How do I install it?', content: 'Install the estela-angular package (npm install estela-angular-<version>.tgz or from the private registry), then add @use \'estela-angular/theme\' as estela; and @include estela.light-theme-setup(); to your styles.scss.' },
    { title: 'Can I customize the colors?', content: 'Yes — light-theme-setup() and dark-theme-setup() accept $primary and $tertiary palettes; exact brand tokens live in _palette.scss.' },
    { title: 'Does it support dark mode?', content: 'Yes — include dark-theme-setup() in styles.scss and toggle .dark-theme on <html> with ThemeService (exported by estela-angular).' },
  ];

  // ── Stepper ─────────────────────────────────────────────────
  readonly step1Group = this.fb.group({ firstName: ['', Validators.required] });
  readonly step2Group = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  readonly step3Group = this.fb.group({});

  readonly skeletonRows = [1, 2, 3];

  openSnackBar(message: string, action = 'Dismiss') {
    this.snackBar.open(message, action, { duration: 4000 });
  }

  openDialog() {
    this.dialog.open(DemoDialogComponent, { width: '400px' });
  }
}
