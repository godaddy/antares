import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import fs from 'node:fs/promises';

describe('@bento/environment', function bento() {
  describe('Public API', function packageSuite() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    describe('#exports', function exportsSuite() {
      Object.keys(pkg.exports).forEach(function each(subpaths) {
        describe(`${subpaths}`, function subpathsSuite() {
          const exportPath = (pkg.exports as any)[subpaths];

          if (typeof exportPath === 'string') {
            return it(`exports ${subpaths} exists`, async function exportedTest() {
              const path = resolve(__dirname, '..', exportPath);
              await fs.access(path, fs.constants.F_OK);
            });
          }

          Object.keys(exportPath).forEach(function each(exported) {
            it(`conditional export "${exported}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
              const path = resolve(__dirname, '..', exportPath[exported]);
              await fs.access(path, fs.constants.F_OK);
            });
          });
        });
      });
    });
  });
});
