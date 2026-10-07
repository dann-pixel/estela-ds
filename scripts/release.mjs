// Utilidades de release de estela-angular.
//
//   node scripts/release.mjs check   → valida que package.json, ESTELA_VERSION y
//                                      changelog.json estén en la misma versión
//   node scripts/release.mjs notes   → imprime las notas de la versión actual (markdown)
//   node scripts/release.mjs version → imprime la versión actual
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const pkgVersion = JSON.parse(read('projects/estela/package.json')).version;
const apiVersion = read('projects/estela/src/public-api.ts').match(/ESTELA_VERSION = '([^']+)'/)?.[1];
const changelog = JSON.parse(read('projects/showcase/src/app/pages/changelog/changelog.json'));
const latest = changelog[0];

const LABELS = { added: 'Nuevo', changed: 'Cambios', fixed: 'Correcciones', removed: 'Eliminado' };

switch (process.argv[2]) {
  case 'check': {
    const errors = [];
    if (apiVersion !== pkgVersion) errors.push(`ESTELA_VERSION (${apiVersion}) ≠ package.json (${pkgVersion})`);
    if (latest?.version !== pkgVersion) errors.push(`changelog.json[0] (${latest?.version}) ≠ package.json (${pkgVersion})`);
    if (errors.length) {
      console.error('Versiones desincronizadas:\n- ' + errors.join('\n- '));
      process.exit(1);
    }
    console.log(`OK — v${pkgVersion}`);
    break;
  }
  case 'notes': {
    const lines = [latest.summary, ''];
    for (const type of Object.keys(LABELS)) {
      const items = latest.changes.filter((c) => c.type === type);
      if (!items.length) continue;
      lines.push(`## ${LABELS[type]}`, '', ...items.map((c) => `- ${c.text}`), '');
    }
    lines.push(
      '## Instalación',
      '',
      '```bash',
      `npm install https://github.com/dann-pixel/estela-ds/releases/download/v${pkgVersion}/estela-angular-${pkgVersion}.tgz`,
      '```',
    );
    console.log(lines.join('\n'));
    break;
  }
  case 'version':
    console.log(pkgVersion);
    break;
  default:
    console.error('Uso: node scripts/release.mjs <check|notes|version>');
    process.exit(1);
}
