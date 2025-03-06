import { stringify } from '../src/index.ts';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/as-attribute-value', function bento() {
  describe('#stringify', function stringifySuite() {
    it('is a function', function test() {
      assume(stringify).is.a('function');
    });

    it('returns undefined for undefined', function test() {
      assume(stringify(undefined)).equals(undefined);
    });

    it('returns undefined for null', function test() {
      assume(stringify(null)).equals(undefined);
    });

    it('returns the value for boolean', function test() {
      assume(stringify(true)).equals(true);
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
});
