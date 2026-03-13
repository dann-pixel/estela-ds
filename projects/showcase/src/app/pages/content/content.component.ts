import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
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

// ── Dialog component (inline) ──────────────────────────────────
@Component({
  selector: 'app-demo-dialog',
  standalone: true,
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
export interface TableRow {
  id: number;
  name: string;
  status: string;
  date: string;
  amount: number;
}

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
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
    DecimalPipe,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  readonly tableColumns = ['id', 'name', 'status', 'date', 'amount'];

  readonly tableData: TableRow[] = [
    { id: 1, name: 'Project Alpha', status: 'Active', date: '2025-01-15', amount: 12400 },
    { id: 2, name: 'Project Beta', status: 'Draft', date: '2025-02-03', amount: 8750 },
    { id: 3, name: 'Project Gamma', status: 'Paused', date: '2025-03-22', amount: 31200 },
    { id: 4, name: 'Project Delta', status: 'Active', date: '2025-04-10', amount: 5600 },
    { id: 5, name: 'Project Epsilon', status: 'Archived', date: '2025-05-30', amount: 19800 },
  ];

  readonly panelItems = [
    { title: 'What is Estela Design System?', content: 'Estela is an Angular Material-based design system that provides a consistent theme and component library for building products.' },
    { title: 'How do I install it?', content: 'Install via npm using: npm install git+https://github.com/your-org/estela-ds.git — then import the theme in your styles.scss.' },
    { title: 'Can I customize the colors?', content: 'Yes — override the $primary and $tertiary palette variables in the theme SCSS to match your brand colors.' },
    { title: 'Does it support dark mode?', content: 'Yes — use the dark-theme() mixin on a .dark-theme class or the prefers-color-scheme media query.' },
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
