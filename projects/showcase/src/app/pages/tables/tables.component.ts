import { AfterViewInit, Component, computed, signal, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideEstelaPaginatorIntl } from 'estela-angular/intl';

export interface ProjectRow {
  id: number;
  name: string;
  owner: string;
  status: string;
  date: string;
  amount: number;
  description: string;
}

const PROJECTS: ProjectRow[] = [
  { id: 1, name: 'Project Alpha',   owner: 'Ana Rojas',     status: 'Active',   date: '2025-01-15', amount: 12400, description: 'Migración del portal de clientes a Angular 20.' },
  { id: 2, name: 'Project Beta',    owner: 'Luis Pérez',    status: 'Draft',    date: '2025-02-03', amount: 8750,  description: 'Rediseño del flujo de onboarding.' },
  { id: 3, name: 'Project Gamma',   owner: 'Carla Soto',    status: 'Paused',   date: '2025-03-22', amount: 31200, description: 'Integración con el nuevo motor de pagos.' },
  { id: 4, name: 'Project Delta',   owner: 'Jorge Díaz',    status: 'Active',   date: '2025-04-10', amount: 5600,  description: 'Dashboard de métricas operacionales.' },
  { id: 5, name: 'Project Epsilon', owner: 'María Núñez',   status: 'Archived', date: '2025-05-30', amount: 19800, description: 'Auditoría de accesibilidad del sitio público.' },
  { id: 6, name: 'Project Zeta',    owner: 'Pedro Lagos',   status: 'Active',   date: '2025-06-12', amount: 22300, description: 'App móvil para seguimiento de solicitudes.' },
  { id: 7, name: 'Project Eta',     owner: 'Sofía Vidal',   status: 'Draft',    date: '2025-07-08', amount: 4100,  description: 'Prueba de concepto de firma electrónica.' },
  { id: 8, name: 'Project Theta',   owner: 'Diego Fuentes', status: 'Paused',   date: '2025-08-19', amount: 15750, description: 'Unificación de catálogos de productos.' },
];

@Component({
  selector: 'app-tables',
  imports: [
    DecimalPipe,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
  ],
  providers: [provideEstelaPaginatorIntl()],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
})
export class TablesComponent implements AfterViewInit {
  readonly projects = PROJECTS;

  // ── Básica: sort + paginator ────────────────────────────────
  readonly basicColumns = ['id', 'name', 'status', 'date', 'amount'];
  readonly basicData = new MatTableDataSource(PROJECTS);
  private readonly sort = viewChild.required('basicSort', { read: MatSort });
  private readonly paginator = viewChild.required(MatPaginator);

  ngAfterViewInit(): void {
    this.basicData.sort = this.sort();
    this.basicData.paginator = this.paginator();
  }

  // ── Densidad y estilo ───────────────────────────────────────
  readonly styleColumns = ['name', 'owner', 'status', 'amount'];
  readonly density = signal<'default' | 'compact'>('default');
  readonly striped = signal(true);
  readonly hover = signal(true);
  readonly styleClasses = computed(() => ({
    'estela-table-compact': this.density() === 'compact',
    'estela-table-striped': this.striped(),
    'estela-table-hover': this.hover(),
  }));

  // ── Selección ───────────────────────────────────────────────
  readonly selectColumns = ['select', 'name', 'owner', 'status'];
  readonly selection = new SelectionModel<ProjectRow>(true, []);
  readonly selectedCount = signal(0);

  constructor() {
    this.selection.changed.subscribe(() => this.selectedCount.set(this.selection.selected.length));
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.projects.length;
  }

  toggleAll(): void {
    if (this.isAllSelected()) this.selection.clear();
    else this.selection.select(...this.projects);
  }

  // ── Filas expandibles ───────────────────────────────────────
  readonly expandColumns = ['name', 'owner', 'status', 'expand'];
  readonly expanded = signal<ProjectRow | null>(null);

  toggleExpand(row: ProjectRow): void {
    this.expanded.update(current => (current === row ? null : row));
  }

  // ── Header sticky + footer de totales ───────────────────────
  readonly stickyColumns = ['name', 'owner', 'date', 'amount'];
  readonly totalAmount = PROJECTS.reduce((sum, p) => sum + p.amount, 0);

  // ── Filtro ──────────────────────────────────────────────────
  readonly filterColumns = ['name', 'owner', 'status'];
  readonly filterData = new MatTableDataSource(PROJECTS);

  applyFilter(event: Event): void {
    this.filterData.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }
}
