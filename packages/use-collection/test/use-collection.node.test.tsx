import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';

describe('@bento/use-collection', function bento() {
  it('exports all public APIs', async function test() {
    const mod = await import('../src/index');

    assume(mod.useSafeObjectRef).exists();
    assume(mod.useSafeObjectRef).is.a('function');

    assume(mod.useCollectionState).exists();
    assume(mod.useCollectionState).is.a('function');

    assume(mod.renderWithOptionalContext).exists();
    assume(mod.renderWithOptionalContext).is.a('function');

    assume(mod.useKeyboardDelegate).exists();
    assume(mod.useKeyboardDelegate).is.a('function');
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
