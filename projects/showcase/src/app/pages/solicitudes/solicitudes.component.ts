import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Solicitud {
  numero: string;
  cliente: string;
  rut: string;
  servicios: number;
  estado: 'en-progreso' | 'no-iniciado' | 'completado' | 'cancelado' | 'en-implementacion';
  fechaCreacion: string;
  ultimaActividad: string;
}

const SOLICITUDES_DATA: Solicitud[] = [
  {
    numero: '1432455434',
    cliente: 'Comercializadora del Pacífico S.A.',
    rut: '54.325.345-2',
    servicios: 3,
    estado: 'en-progreso',
    fechaCreacion: '15/04/2025 15:10',
    ultimaActividad: 'Hace 4 d',
  },
  {
    numero: '1432455435',
    cliente: 'Distribuidora Norte Ltda.',
    rut: '76.123.456-7',
    servicios: 1,
    estado: 'no-iniciado',
    fechaCreacion: '16/04/2025 09:30',
    ultimaActividad: '–',
  },
  {
    numero: '1432455436',
    cliente: 'Inversiones del Sur SpA.',
    rut: '77.654.321-K',
    servicios: 4,
    estado: 'completado',
    fechaCreacion: '10/04/2025 11:00',
    ultimaActividad: 'Hace 9 d',
  },
  {
    numero: '1432455437',
    cliente: 'Minera Los Andes S.A.',
    rut: '91.234.567-3',
    servicios: 2,
    estado: 'cancelado',
    fechaCreacion: '08/04/2025 14:20',
    ultimaActividad: 'Hace 11 d',
  },
  {
    numero: '1432455438',
    cliente: 'Logística Central Chile Ltda.',
    rut: '82.345.678-9',
    servicios: 5,
    estado: 'en-implementacion',
    fechaCreacion: '14/04/2025 08:45',
    ultimaActividad: 'Hace 5 d',
  },
];

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss',
})
export class SolicitudesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchQuery = '';

  readonly displayedColumns = [
    'numero',
    'cliente',
    'rut',
    'servicios',
    'estado',
    'fechaCreacion',
    'ultimaActividad',
    'acciones',
  ];

  readonly dataSource = new MatTableDataSource<Solicitud>(SOLICITUDES_DATA);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  estadoLabel(estado: Solicitud['estado']): string {
    const labels: Record<Solicitud['estado'], string> = {
      'en-progreso':      'En Progreso',
      'no-iniciado':      'No Iniciado',
      completado:          'Completado',
      cancelado:           'Cancelado',
      'en-implementacion': 'En Implementación',
    };
    return labels[estado];
  }
}
