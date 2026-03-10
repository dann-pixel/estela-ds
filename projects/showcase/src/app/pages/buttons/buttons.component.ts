import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatDividerModule],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {}
