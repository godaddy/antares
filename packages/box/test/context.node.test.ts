import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'path';
import { Box, defaults } from '@bento/box';
import { fileURLToPath } from 'url';
import { describe, it } from 'vitest';
import fs from 'fs/promises';
import assume from 'assume';

describe('@bento/box', function bento() {
  function assertDefaults(slots: any, env: any) {
    assume(slots).is.a('object');
    assume(slots.override).equals(false);
    assume(slots.assigned).deep.equals({});
    assume(slots.namespace).deep.equals([]);

    assume(env).is.a('object');
    assume(env.components).deep.equals({});
    assume(env.sprite).equals('');
    assume(env.document).is.a('function');
    assume(env.window).is.a('function');

    //
    // These methods interact with the global scope
    //
    const doc = typeof document !== 'undefined' ? document : null;
    const win = typeof window !== 'undefined' ? window : null;

    global.window = {} as unknown as Window & typeof globalThis;
    global.document = { nodeType: 9, defaultView: global.window } as unknown as Document;

    assume(env.document()).deep.equals(global.document);
    assume(env.window()).deep.equals(global.window);

    if (doc) global.document = doc;
    if (win) global.window = win;
  }

  it('is a React context', function context() {
    assume(Box).is.a('object');
    assume(Box.Provider).is.a('object');
    assume(Box.Consumer).is.a('object');
  });

  it('provides default values', function defaults() {
    const { env, slots } = (Box as any)._currentValue;

    assertDefaults(slots, env);
  });

  describe('#defaults', function defaultsmethod() {
    it('provides default values', function fn() {
      const { env, slots } = defaults(document);

      assertDefaults(slots, env);
    });
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
