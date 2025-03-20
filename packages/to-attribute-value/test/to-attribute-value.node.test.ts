import { dirname, resolve, join } from 'node:path';
import { stringify } from '../src/index.ts';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import pkg from '../package.json' with { type: 'json' };
import fs from 'node:fs/promises';
import assume from 'assume';

describe('@bento/to-attribute-value', function bento() {
  describe('#stringify', function stringifySuite() {
    it('is a function', function test() {
      assume(stringify).is.a('function');
    });

    it('defaults to undefined for empty values', function test() {
      assume(stringify()).equals(undefined);
    });

    it('returns undefined for undefined', function test() {
      assume(stringify(undefined)).equals(undefined);
    });

    it('returns undefined for null', function test() {
      assume(stringify(null)).equals(undefined);
    });

    it('returns the value for boolean', function test() {
      assume(stringify(true)).equals('true');
      assume(stringify(false)).equals(undefined);
    });

    it('returns the value for strings', function test() {
      assume(stringify('hello')).equals('hello');
      assume(stringify('false')).equals('false');
    });

    it('returns the string value for number values', function test() {
      assume(stringify(42)).equals('42');
    });

    it('returns the string value for arrays', function test() {
      assume(stringify([1, 2, 3])).equals('1 2 3');
    });

    it('can change the seperator', function test() {
      assume(stringify([1, 2, 3], ',')).equals('1,2,3');
    });

    it('returns the string value for objects', function test() {
      assume(stringify({ hello: 'world', 'another KEY': [1, 2, 3] })).equals('hello(world) another-key(1 2 3)');
    });

    it('uses JSON.stringify for unknown values', function test() {
      const value = new Date();

      assume(stringify(value)).equals(JSON.stringify(value));
    });

    it('does not include the value when JSON.stringify results in an empty object', function test() {
      const error = new Error('hello world');
      const empty = JSON.stringify(error);

      assume(empty).equals('{}');
      assume(stringify(error)).equals(undefined);
    });

    it('handles circular object references', function test() {
      const a: any = { b: null };
      const b = { a };

      a.b = b;

      assume(stringify(a)).equals('b(a([circular]))');
    });

    it('does not see primitive values as circular', function test() {
      assume(stringify({ a: [12, 12, 'foo', 'foo'] })).equals('a(12 12 foo foo)');
    });

    it('handles circular array references inside an object', function test() {
      const a: any = { b: null };
      const b = ['foo', a];

      a.b = b;

      assume(stringify(a)).equals('b(foo [circular])');
    });

    it('handles circular array references', function test() {
      const a: any[] = [null];
      a[0] = a;

      assume(stringify(a)).equals('[circular]');
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
