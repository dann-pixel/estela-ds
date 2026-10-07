import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ESTELA_VERSION } from 'estela-angular';
import changelog from './changelog.json';

type ChangeType = 'added' | 'changed' | 'fixed' | 'removed';

interface Release {
  version: string;
  date: string;
  title: string;
  summary: string;
  changes: { type: ChangeType; text: string }[];
}

/** Segmento de texto: los fragmentos entre `backticks` se muestran como <code>. */
interface TextSegment {
  text: string;
  code: boolean;
}

const TYPE_LABELS: Record<ChangeType, string> = {
  added: 'Nuevo',
  changed: 'Cambio',
  fixed: 'Corrección',
  removed: 'Eliminado',
};

const TYPE_ORDER: ChangeType[] = ['added', 'changed', 'fixed', 'removed'];

@Component({
  selector: 'app-changelog',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './changelog.component.html',
  styleUrl: './changelog.component.scss',
})
export class ChangelogComponent {
  readonly currentVersion = ESTELA_VERSION;
  readonly typeLabels = TYPE_LABELS;

  readonly releases = (changelog as Release[]).map(release => ({
    ...release,
    groups: TYPE_ORDER
      .map(type => ({
        type,
        items: release.changes.filter(c => c.type === type).map(c => this.segments(c.text)),
      }))
      .filter(group => group.items.length > 0),
  }));

  private segments(text: string): TextSegment[] {
    return text.split('`').map((part, i) => ({ text: part, code: i % 2 === 1 })).filter(s => s.text);
  }
}
