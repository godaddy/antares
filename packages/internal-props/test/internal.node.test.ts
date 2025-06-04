import { useInternalProps, toInternalProps } from '@bento/internal-props';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import fs from 'node:fs/promises';
import assume from 'assume';

describe('@bento/internal-props', function internalPropsTests() {
  const [major] = pkg.version.split('.');

  describe('#useInternalProps', function useInternalPropsTests() {
    it('should separate internal props based on the prefix', function separateInternalProps() {
      const props = {
        'prefix-key1': 'value1',
        'prefix-key2': 'value2',
        otherKey: 'value3'
      };
      const prefix = 'prefix-';

      const [result, internal] = useInternalProps(props, prefix);

      assume(result).eqls({ otherKey: 'value3' });
      assume(internal).eqls({ key1: 'value1', key2: 'value2' });
    });

    it('should handle props without matching prefix', function handleNoMatchingPrefix() {
      const props = {
        otherKey: 'value1',
        anotherKey: 'value2'
      };
      const prefix = 'prefix-';

      const [result, internal] = useInternalProps(props, prefix);

      assume(result).eqls(props);
      assume(internal).eqls({});
    });

    it('should add a dash to the prefix if it does not end with one', function addDashToPrefix() {
      const props = {
        'prefix-key1': 'value1',
        'prefix-key2': 'value2'
      };
      const prefix = 'prefix';

      const [result, internal] = useInternalProps(props, prefix);

      assume(result).eqls({});
      assume(internal).eqls({ key1: 'value1', key2: 'value2' });
    });

    it('should handle empty props', function handleEmptyProps() {
      const props = {};
      const prefix = 'prefix-';

      const [result, internal] = useInternalProps(props, prefix);

      assume(result).eqls({});
      assume(internal).eqls({});
    });

    it('should apply the default prefix if none is provided', function applyDefaultPrefix() {
      const props = {
        [`$$bento-internal-${major}-key1`]: 'value1',
        [`$$bento-internal-${major}-key2`]: 'value2'
      };

      const [result, internal] = useInternalProps(props);

      assume(result).eqls({});
      assume(internal).eqls({ key1: 'value1', key2: 'value2' });
    });
  });

  describe('#toInternalProps', function toInternalPropsTests() {
    it('should prefix all keys with the given prefix', function prefixAllKeys() {
      const props = {
        key1: 'value1',
        key2: 'value2'
      };
      const prefix = 'prefix-';

      const result = toInternalProps(props, prefix);

      assume(result).eqls({
        'prefix-key1': 'value1',
        'prefix-key2': 'value2'
      });
    });

    it('should add a dash to the prefix if it does not end with one', function addDashToPrefixInToInternalProps() {
      const props = {
        key1: 'value1',
        key2: 'value2'
      };
      const prefix = 'prefix';

      const result = toInternalProps(props, prefix);

      assume(result).eqls({
        'prefix-key1': 'value1',
        'prefix-key2': 'value2'
      });
    });

    it('should handle empty props', function handleEmptyProps() {
      const props = {};
      const prefix = 'prefix-';

      const result = toInternalProps(props, prefix);

      assume(result).eqls({});
    });

    it('applies the default prefix if none is provided', function applyDefaultPrefix() {
      const props = {
        key1: 'value1',
        key2: 'value2'
      };

      const result = toInternalProps(props);

      assume(result).eqls({
        [`$$bento-internal-${major}-key1`]: 'value1',
        [`$$bento-internal-${major}-key2`]: 'value2'
      });
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
