import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import { parser } from '@bento/svg-parser';

describe('@bento/svg-parser', function bento() {
  it('is a function', function isFunction() {
    assume(parser).is.a('function');
  });

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
            Object.keys(exportPath[exported]).forEach(function each(key) {
              it(`conditional export "${exported}.${key}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
                const path = resolve(__dirname, '..', exportPath[exported][key]);
                await fs.access(path, fs.constants.F_OK);
              });
            });
          });
        });
      });
    });
  });
});
