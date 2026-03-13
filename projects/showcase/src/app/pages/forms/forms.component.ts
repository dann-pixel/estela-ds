import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith, map } from 'rxjs';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
  ],
  templateUrl: './forms.component.html',
})
export class FormsComponent {
  readonly form = new FormBuilder().group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    country: [''],
    message: [''],
  });

  readonly countries = ['Argentina', 'Chile', 'Colombia', 'México', 'Perú', 'Uruguay'];
  readonly radioOptions = ['Option A', 'Option B', 'Option C'];
  sliderValue = 40;

  // ── Autocomplete ────────────────────────────────────────────────
  readonly techOptions = ['Angular', 'React', 'Vue', 'Svelte', 'SolidJS', 'Astro', 'Nuxt', 'Next.js'];
  readonly autocompleteCtrl = new FormControl('');
  readonly filteredTechOptions = toSignal(
    this.autocompleteCtrl.valueChanges.pipe(
      startWith(''),
      map(v => {
        const val = (v ?? '').toLowerCase();
        return this.techOptions.filter(o => o.toLowerCase().includes(val));
      })
    ),
    { initialValue: [...this.techOptions] }
  );

  // ── Datepicker ──────────────────────────────────────────────────
  readonly dateCtrl = new FormControl<Date | null>(null);

  // ── Button Toggle ───────────────────────────────────────────────
  readonly viewModeCtrl = new FormControl('list');
  readonly sortCtrl = new FormControl('date');
}
